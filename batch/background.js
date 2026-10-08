(function registerBatchNotionWorker() {
  "use strict";

  const NOTION_ORIGINS = ["https://app.notion.com", "https://www.notion.so"];
  const TAB_LOAD_TIMEOUT_MS = 60000;
  const EXTRACTION_TIMEOUT_MS = 60000;
  const EXTRACTION_RETRY_DELAY_MS = 500;
  const OPEN_SESSION_TIMEOUT_MS = 65000;
  const PAGE_CREATION_DELAY_MS = 2000;
  const NOTION_CACHE_PREFIX = "notion_web_clipper:";

  function emptyClipperRequest() {
    return {
      addToSpaceBlockIds: {},
      recentSpaceBlockIds: {},
      addToBlockProperties: {}
    };
  }

  function clipperRequestFromCache(cached) {
    const request = emptyClipperRequest();
    if (!cached || typeof cached !== "object") {
      return request;
    }
    if (cached.addToSpaceId) {
      request.addToSpaceId = cached.addToSpaceId;
    }
    for (const [spaceId, block] of Object.entries(cached.addToSpaceBlocks || {})) {
      if (block && block.record && block.record.id) {
        request.addToSpaceBlockIds[spaceId] = block.record.id;
      }
    }
    for (const [spaceId, blocks] of Object.entries(cached.recentSpaceBlocks || {})) {
      request.recentSpaceBlockIds[spaceId] = (blocks || [])
        .map((block) => block && block.record && block.record.id)
        .filter(Boolean);
    }
    request.addToBlockProperties = cached.addToBlockProperties || {};
    return request;
  }

  async function getClipperRequest(userId, overrides) {
    let cached;
    try {
      const key = NOTION_CACHE_PREFIX + userId;
      const stored = await chrome.storage.local.get(key);
      cached = stored && stored[key];
    } catch (_error) {
      cached = null;
    }
    const request = clipperRequestFromCache(cached);
    return Object.assign(request, overrides || {});
  }

  async function cacheClipperData(clipperData) {
    if (!clipperData || !clipperData.userId) {
      return;
    }
    await chrome.storage.local.set({
      [NOTION_CACHE_PREFIX + clipperData.userId]: clipperData
    });
    await chrome.storage.local.remove("notion_web_clipper");
  }

  function diagnosticError(error, fallbackCode) {
    const message = error instanceof Error ? error.message : String(error || "Unknown error");
    return {
      code: error && error.code ? error.code : fallbackCode,
      message,
      stack: error instanceof Error ? error.stack : undefined
    };
  }

  function createError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  async function getNotionSession() {
    for (const origin of NOTION_ORIGINS) {
      const cookies = await chrome.cookies.getAll({url: origin});
      const userCookie = cookies.find((cookie) => cookie.name === "notion_user_id");
      if (userCookie) {
        return {
          origin,
          userId: userCookie.value,
          cookieHeader: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ")
        };
      }
    }
    throw createError("NOTION_NOT_AUTHENTICATED", "No notion_user_id cookie was found for app.notion.com or www.notion.so");
  }

  async function notionRequest(session, endpoint, body) {
    let response;
    try {
      response = await fetch(`${session.origin}/api/v3/${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cookie": session.cookieHeader,
          "X-Notion-Active-User-Header": session.userId
        },
        body: JSON.stringify(body || {})
      });
    } catch (error) {
      throw createError("NOTION_NETWORK_ERROR", `${endpoint} request failed: ${error.message}`);
    }

    const responseText = await response.text();
    let result = null;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      throw createError(
        "NOTION_INVALID_RESPONSE",
        `${endpoint} returned non-JSON HTTP ${response.status}: ${responseText.slice(0, 300)}`
      );
    }

    if (!response.ok) {
      throw createError(
        "NOTION_HTTP_ERROR",
        `${endpoint} returned HTTP ${response.status}: ${result.message || responseText.slice(0, 300)}`
      );
    }
    return result;
  }

  function destinationFromBlock(block, spaceId, spaceName) {
    const record = block && block.record;
    if (!record || (record.type !== "page" && record.type !== "collection_view")) {
      return null;
    }

    const destination = {
      id: record.id,
      name: record.name || "Untitled",
      type: record.type,
      spaceId: spaceId || record.space_id,
      spaceName: spaceName || "",
      targetBlockId: record.id
    };
    if (record.type === "collection_view") {
      destination.collectionId = record.collectionId || block.collectionId;
      const urlProperties = record.urlProperties || block.urlProperties || [];
      destination.urlPropertyId = urlProperties[0] && urlProperties[0].id;
    }
    return destination;
  }

  function collectDestinations(clipperData) {
    const spaces = new Map((clipperData.spaces || []).map((space) => [
      space.record && space.record.id,
      space.record && space.record.name
    ]));
    const destinations = [];
    const seen = new Set();

    for (const [spaceId, blocks] of Object.entries(clipperData.previewSpaceBlocks || {})) {
      for (const block of blocks || []) {
        const destination = destinationFromBlock(block, spaceId, spaces.get(spaceId));
        if (destination && !seen.has(destination.id)) {
          seen.add(destination.id);
          destinations.push(destination);
        }
      }
    }
    return destinations;
  }

  async function loadDestinations(message) {
    const session = await getNotionSession();
    const request = await getClipperRequest(session.userId, message.requestParams);
    const clipperData = await notionRequest(session, "getWebClipperData", request);
    if (!clipperData || !clipperData.previewSpaceBlocks) {
      throw createError("NOTION_DESTINATIONS_INVALID", "getWebClipperData did not return previewSpaceBlocks");
    }
    await cacheClipperData(clipperData);
    return {
      success: true,
      userId: session.userId,
      spaces: (clipperData.spaces || []).map((space) => ({
        id: space.record && space.record.id,
        name: space.record && space.record.name
      })).filter((space) => space.id),
      destinations: collectDestinations(clipperData)
    };
  }

  async function searchDestinations(message) {
    const query = String(message.query || "").trim();
    const spaceId = String(message.spaceId || "").trim();
    if (!query || !spaceId) {
      return {success: true, destinations: []};
    }
    const session = await getNotionSession();
    const result = await notionRequest(session, "searchWebClipperPages", {
      spaceId,
      query,
      limit: 20
    });
    const destinations = (result.results || [])
      .map((block) => destinationFromBlock(block, spaceId, ""))
      .filter(Boolean);
    return {success: true, destinations};
  }

  function waitForTabComplete(tabId) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (error) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeoutId);
        chrome.tabs.onUpdated.removeListener(onUpdated);
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
      const onUpdated = (updatedTabId, changeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          finish();
        }
      };
      const timeoutId = setTimeout(() => {
        finish(createError("TAB_LOAD_TIMEOUT", `Tab ${tabId} did not finish loading within ${TAB_LOAD_TIMEOUT_MS}ms`));
      }, TAB_LOAD_TIMEOUT_MS);

      chrome.tabs.onUpdated.addListener(onUpdated);
      chrome.tabs.get(tabId).then((tab) => {
        if (tab.status === "complete") {
          finish();
        }
      }).catch((error) => {
        finish(createError("TAB_LOOKUP_FAILED", `Could not inspect tab ${tabId}: ${error.message}`));
      });
    });
  }

  async function extractConversation(tabId) {
    const deadline = Date.now() + EXTRACTION_TIMEOUT_MS;
    let lastError;

    while (Date.now() < deadline) {
      const remaining = deadline - Date.now();
      let timeoutId;
      try {
        const response = await Promise.race([
          chrome.tabs.sendMessage(tabId, {type: "BATCH_EXTRACT_CONVERSATION"}),
          new Promise((_resolve, reject) => {
            timeoutId = setTimeout(() => reject(createError("EXTRACTION_TIMEOUT", "Extraction attempt timed out")), remaining);
          })
        ]);
        const result = response && response.data ? response.data : response;
        if (result && result.success !== false && typeof result.markdown === "string") {
          return {
            title: String(result.title || "Untitled conversation"),
            markdown: result.markdown,
            url: String(result.url || "")
          };
        }
        lastError = createError(
          "EXTRACTION_INVALID_RESPONSE",
          result && result.error ? result.error : "markdown is missing"
        );
      } catch (error) {
        lastError = error;
      } finally {
        clearTimeout(timeoutId);
      }

      const retryDelay = Math.min(EXTRACTION_RETRY_DELAY_MS, deadline - Date.now());
      if (retryDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    const detail = lastError && lastError.message ? `: ${lastError.message}` : "";
    throw createError(
      "EXTRACTION_TIMEOUT",
      `Could not extract conversation from tab ${tabId} within ${EXTRACTION_TIMEOUT_MS}ms${detail}`
    );
  }

  function validateDestination(destination) {
    if (!destination || !destination.spaceId || !destination.targetBlockId) {
      throw createError("INVALID_DESTINATION", "Destination must include spaceId and targetBlockId");
    }
    return destination;
  }

  function safeFileName(title) {
    const cleaned = title.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim();
    return `${cleaned || "Untitled conversation"}.md`;
  }

  async function saveConversation(session, destination, conversation, fallbackUrl) {
    const addPayload = {
      type: "block",
      blockId: destination.targetBlockId,
      spaceId: destination.spaceId,
      items: [{
        type: "title_and_url",
        title: conversation.title,
        url: conversation.url || fallbackUrl
      }],
      from: "chrome"
    };
    if (destination.collectionId) {
      addPayload.collectionId = destination.collectionId;
    }
    if (destination.urlPropertyId) {
      addPayload.property = destination.urlPropertyId;
    }

    const created = await notionRequest(session, "addWebClipperURLs", addPayload);
    const pageId = created && created.createdBlockIds && created.createdBlockIds[0];
    if (!pageId) {
      throw createError("NOTION_PAGE_CREATE_FAILED", "addWebClipperURLs did not return a created block ID");
    }

    await new Promise((resolve) => setTimeout(resolve, PAGE_CREATION_DELAY_MS));
    const fileName = safeFileName(conversation.title);
    const upload = await notionRequest(session, "getUploadFileUrl", {
      bucket: "temporary",
      name: encodeURI(fileName),
      contentType: "text/markdown"
    });
    if (!upload.signedPutUrl || !upload.url || !upload.signedToken) {
      throw createError("NOTION_UPLOAD_URL_INVALID", "getUploadFileUrl returned incomplete upload data");
    }

    const putResponse = await fetch(upload.signedPutUrl, {
      method: "PUT",
      headers: {"Content-Type": "text/markdown"},
      body: conversation.markdown
    });
    if (!putResponse.ok) {
      throw createError("NOTION_UPLOAD_FAILED", `Markdown PUT returned HTTP ${putResponse.status}`);
    }

    await notionRequest(session, "enqueueTask", {
      task: {
        eventName: "importFile",
        request: {
          fileURL: upload.url,
          fileName,
          importType: "ReplaceBlock",
          block: {id: pageId, spaceId: destination.spaceId},
          spaceId: destination.spaceId,
          signedToken: upload.signedToken
        }
      }
    });

    return {
      pageId,
      title: conversation.title,
      url: `${session.origin}/p/${pageId.replace(/-/g, "")}`
    };
  }

  function normalizeSessions(message) {
    const input = message.sessions || message.urls || message.sessionUrls || [];
    if (!Array.isArray(input)) {
      throw createError("INVALID_SESSIONS", "sessions must be an array of URLs or objects containing a url");
    }
    return input.map((item, index) => {
      const url = typeof item === "string" ? item : item && item.url;
      if (!url || !/^https?:\/\//i.test(url)) {
        throw createError("INVALID_SESSION_URL", `Session ${index + 1} does not contain a valid HTTP(S) URL`);
      }
      return {
        url,
        title: typeof item === "object" ? item.title : "",
        threadId: typeof item === "object" ? item.mtid || item.id || item.threadId : ""
      };
    });
  }

  async function openConversation(tabId, threadId) {
    if (!threadId) {
      throw createError("SESSION_ID_MISSING", "Selected session does not contain a thread ID");
    }
    const currentTab = await chrome.tabs.get(tabId);
    try {
      if (new URL(currentTab.url).searchParams.get("mtid") === threadId) {
        return {success: true, url: currentTab.url};
      }
    } catch (_error) {
      // Continue with content-script navigation when Chrome reports a transient URL.
    }
    const deadline = Date.now() + OPEN_SESSION_TIMEOUT_MS;
    let lastError;
    while (Date.now() < deadline) {
      try {
        const result = await chrome.tabs.sendMessage(tabId, {
          type: "BATCH_OPEN_CONVERSATION",
          threadId
        });
        if (result && result.success !== false) return result;
        lastError = createError(
          "SESSION_OPEN_FAILED",
          result && result.error ? result.error : "Could not open selected session"
        );
      } catch (error) {
        lastError = error;
      }
      await new Promise((resolve) => setTimeout(resolve, EXTRACTION_RETRY_DELAY_MS));
    }
    const detail = lastError && lastError.message ? ": " + lastError.message : "";
    throw createError("SESSION_OPEN_TIMEOUT", "Could not open selected session" + detail);
  }

  async function sendProgress(tabId, progress) {
    if (typeof tabId !== "number") {
      return;
    }
    try {
      await chrome.tabs.sendMessage(tabId, {type: "BATCH_NOTION_PROGRESS", ...progress});
    } catch (error) {
      // The initiating page may have navigated or closed; export should continue.
    }
  }

  async function exportSessions(message, sender) {
    const destination = validateDestination(message.destination || message.saveParams);
    const sessions = normalizeSessions(message);
    const sourceTabId = Number.isInteger(message.sourceTabId) ? message.sourceTabId : sender.tab && sender.tab.id;
    if (!Number.isInteger(sourceTabId)) {
      throw createError("SOURCE_TAB_MISSING", "Could not identify the Google AI source tab");
    }
    const notionSession = await getNotionSession();
    const results = [];

    await sendProgress(sourceTabId, {
      status: "running",
      phase: "started",
      current: 0,
      total: sessions.length,
      message: "Preparing batch export"
    });
    for (let index = 0; index < sessions.length; index += 1) {
      const session = sessions[index];
      await sendProgress(sourceTabId, {
        status: "running",
        phase: "processing",
        current: index + 1,
        total: sessions.length,
        title: session.title,
        url: session.url,
        message: `Exporting ${index + 1} of ${sessions.length}`
      });

      try {
        await openConversation(sourceTabId, session.threadId);
        const conversation = await extractConversation(sourceTabId);
        const saved = await saveConversation(notionSession, destination, conversation, session.url);
        const result = {success: true, sourceUrl: session.url, ...saved};
        results.push(result);
        await sendProgress(sourceTabId, {
          status: "running",
          phase: "item_success",
          current: index + 1,
          total: sessions.length,
          message: `Exported ${index + 1} of ${sessions.length}`,
          result
        });
      } catch (error) {
        const result = {
          success: false,
          title: session.title,
          threadId: session.threadId,
          sourceUrl: session.url,
          error: diagnosticError(error, "BATCH_ITEM_FAILED")
        };
        results.push(result);
        await sendProgress(sourceTabId, {
          status: "running",
          phase: "item_error",
          current: index + 1,
          total: sessions.length,
          message: `Failed to export ${index + 1} of ${sessions.length}: ${result.error.message}`,
          result
        });
      }
    }

    if (message.originalThreadId) {
      try {
        await openConversation(sourceTabId, message.originalThreadId);
      } catch (error) {
        await sendProgress(sourceTabId, {
          status: "running",
          phase: "restore_error",
          current: sessions.length,
          total: sessions.length,
          error: diagnosticError(error, "RESTORE_SESSION_FAILED")
        });
      }
    }

    const succeeded = results.filter((result) => result.success).length;
    const summary = {
      success: succeeded === results.length,
      status: "complete",
      completed: results.length,
      total: results.length,
      succeeded,
      failed: results.length - succeeded,
      results
    };
    await sendProgress(sourceTabId, {message: "Batch export complete", ...summary});
    return summary;
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const supportedTypes = [
      "BATCH_NOTION_DESTINATIONS",
      "BATCH_NOTION_SEARCH",
      "BATCH_NOTION_EXPORT"
    ];
    if (!message || !supportedTypes.includes(message.type)) {
      return false;
    }

    let operation;
    if (message.type === "BATCH_NOTION_DESTINATIONS") {
      operation = loadDestinations(message);
    } else if (message.type === "BATCH_NOTION_SEARCH") {
      operation = searchDestinations(message);
    } else {
      operation = exportSessions(message, sender);
    }
    operation.then(sendResponse).catch((error) => {
      const diagnostic = diagnosticError(error, "BATCH_NOTION_FAILED");
      sendResponse({success: false, error: diagnostic.message, diagnostic});
    });
    return true;
  });
}());
