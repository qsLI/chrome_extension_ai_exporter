/* Plan: route gate, session discovery, selection UI, messaging/extraction, SPA reconciliation. */
(function () {
  "use strict";
  const P = "sa-batch-";
  const TYPE = {
    DEST: "BATCH_NOTION_DESTINATIONS",
    SEARCH: "BATCH_NOTION_SEARCH",
    EXPORT: "BATCH_NOTION_EXPORT",
    PROGRESS: "BATCH_NOTION_PROGRESS",
    OPEN: "BATCH_OPEN_CONVERSATION",
    EXTRACT: "BATCH_EXTRACT_CONVERSATION"
  };
  const AIMC = '[data-subtree="aimc"]';
  const FALLBACK_CONTENT = ".CKgc1d";
  const CONTENT = AIMC + ", " + FALLBACK_CONTENT;
  const ANSWER = '[data-container-id="main-col"]';
  const USER = 'span[jsname="y5v2y"], .iMqumd';
  const state = {
    selecting: false,
    exporting: false,
    links: new Map(),
    sessions: new Map(),
    selected: new Set(),
    timer: 0
  };

  function supported() {
    const u = new URL(location.href);
    return u.pathname === "/search" && (u.searchParams.get("udm") === "50" || u.searchParams.has("mtid"));
  }
  function visible(el) {
    if (!el || !el.isConnected) return false;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
  }
  function findRow(trigger) {
    const preferred = trigger.closest('[data-xid="threads-list-root"] [role="listitem"]');
    if (preferred && visible(preferred)) return preferred;
    let node = trigger;
    for (let depth = 0; node && depth < 8; depth += 1, node = node.parentElement) {
      const rect = node.getBoundingClientRect();
      if (visible(node) && rect.width >= 120 && rect.height >= 24 && rect.height <= 120) return node;
    }
    return visible(trigger) ? trigger : null;
  }
  function discover() {
    const links = new Map();
    document.querySelectorAll('[data-xid="threads-list-root"] button[data-thread-id]').forEach((trigger) => {
      const key = trigger.dataset.threadId?.trim();
      const row = findRow(trigger);
      if (!key || !row) return;
      const url = new URL(location.href);
      const rawTitle = trigger.querySelector(".Se0jFd")?.textContent ||
        trigger.getAttribute("aria-label") || trigger.textContent;
      const title = (rawTitle || "Google AI 会话")
        .replace(/, \d+ of \d+$/, "")
        .replace(/\s+/g, " ")
        .trim();
      const item = { trigger, row, url, key, title };
      links.set(key, item);
      state.sessions.set(key, { id: key, mtid: key, title, url: url.href });
    });
    return links;
  }
  function makeButton(text, classes, onClick) {
    const b = document.createElement("button");
    b.type = "button"; b.className = P + "button " + (classes || ""); b.textContent = text;
    b.addEventListener("click", onClick); return b;
  }
  function ensureLauncher() {
    let b = document.getElementById(P + "launcher");
    if (!b) {
      b = makeButton("批量导出到 Notion", P + "root " + P + "launcher", enterSelection);
      b.id = P + "launcher"; document.body.append(b);
    }
    b.disabled = !state.links.size;
    b.title = state.links.size ? "发现 " + state.links.size + " 个会话" : "未发现会话";
  }
  function enterSelection() {
    state.selecting = true; state.selected.clear(); document.body.classList.add(P + "selecting"); renderSelection();
  }
  function cancelSelection() {
    if (state.exporting) return;
    state.selecting = false; state.selected.clear(); document.body.classList.remove(P + "selecting");
    document.getElementById(P + "toolbar")?.remove(); removeChoices();
  }
  function removeChoices() {
    document.querySelectorAll("." + P + "choice").forEach((n) => n.remove());
    document.querySelectorAll("." + P + "choice-row").forEach((row) => row.classList.remove(P + "choice-row"));
  }
  function addChoice(item) {
    let label = Array.from(document.querySelectorAll("." + P + "choice"))
      .find((node) => node.dataset.key === item.key);
    if (label) {
      label.querySelector("input").checked = state.selected.has(item.key);
      if (label.parentElement !== item.row) {
        label.parentElement?.classList.remove(P + "choice-row");
        item.row.append(label);
      }
      item.row.classList.add(P + "choice-row");
      return;
    }
    label = document.createElement("label"); label.className = P + "choice"; label.dataset.key = item.key; label.title = "选择此会话";
    const input = document.createElement("input"), mark = document.createElement("span");
    input.type = "checkbox"; input.className = P + "checkbox"; input.checked = state.selected.has(item.key); mark.className = P + "checkmark";
    label.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("change", () => { input.checked ? state.selected.add(item.key) : state.selected.delete(item.key); updateToolbar(); });
    label.append(input, mark);
    item.row.classList.add(P + "choice-row");
    item.row.append(label);
  }
  function selectAll() {
    state.sessions.forEach((_item, key) => state.selected.add(key));
    document.querySelectorAll("." + P + "choice").forEach((n) => { n.querySelector("input").checked = state.selected.has(n.dataset.key); });
    updateToolbar();
  }
  function ensureToolbar() {
    let bar = document.getElementById(P + "toolbar"); if (bar) return bar;
    bar = document.createElement("div"); bar.id = P + "toolbar"; bar.className = P + "root " + P + "toolbar";
    const count = document.createElement("span"); count.className = P + "count";
    bar.append(
      count,
      makeButton("全选", P + "secondary", selectAll),
      makeButton("取消", P + "secondary", cancelSelection),
      makeButton("导出", P + "primary " + P + "export", loadDestinations)
    );
    document.body.append(bar); return bar;
  }
  function updateToolbar() {
    const bar = ensureToolbar();
    const count = bar.querySelector("." + P + "count");
    const countText = "已选择 " + state.selected.size + " / " + state.sessions.size;
    if (count.textContent !== countText) count.textContent = countText;
    bar.querySelector("." + P + "export").disabled = !state.selected.size || state.exporting;
  }
  function renderSelection() {
    if (!state.selecting) return;
    document.querySelectorAll("." + P + "choice").forEach((node) => {
      if (!state.links.has(node.dataset.key)) {
        node.parentElement?.classList.remove(P + "choice-row");
        node.remove();
      }
    });
    state.links.forEach(addChoice);
    updateToolbar();
  }

  function send(type, payload) {
    return new Promise((resolve, reject) => {
      let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
      try {
        const pending = chrome.runtime.sendMessage(Object.assign({ type, action: type }, payload || {}), (response) => {
          if (chrome.runtime.lastError) { if (!done) { done = true; reject(new Error(chrome.runtime.lastError.message)); } } else finish(response);
        });
        if (pending && typeof pending.then === "function") pending.then(finish).catch(reject);
      } catch (e) { reject(e); }
    });
  }
  function unwrap(r) {
    if (r?.resStatus === 0 && r.data !== undefined) return r.data;
    if (r?.status === "complete" && Array.isArray(r.results)) return r;
    if (r?.success === false) throw new Error(r.error || r.message || "请求失败");
    return r?.data ?? r;
  }
  function closeModal() { const d = document.getElementById(P + "modal"); if (d) { if (d.open) d.close(); d.remove(); } }
  function modal(title) {
    closeModal(); const d = document.createElement("dialog"), h = document.createElement("h2"), body = document.createElement("div");
    d.id = P + "modal";
    d.className = P + "root " + P + "modal";
    h.className = P + "modal-title";
    body.className = P + "modal-body";
    h.textContent = title;
    d.addEventListener("cancel", (e) => { if (state.exporting) e.preventDefault(); });
    d.append(h, body); document.body.append(d); d.showModal(); return body;
  }
  function showError(message) {
    const body = modal("批量导出"), p = document.createElement("p"); p.className = P + "error"; p.textContent = message || "操作失败";
    body.append(p, makeButton("关闭", P + "primary", closeModal));
  }
  async function loadDestinations() {
    if (!state.selected.size || state.exporting) return;
    let body = modal("选择 Notion 目标"); body.textContent = "正在加载目标…";
    try {
      const data = unwrap(await send(TYPE.DEST));
      const items = Array.isArray(data) ? data :
        data?.destinations || data?.items || data?.results || data?.databases || data?.pages || [];
      body.replaceChildren(); if (!items.length) throw new Error("没有可用的 Notion 页面或数据库");
      const spaces = data?.spaces || [];
      let selectedSpaceId = spaces[0]?.id || items[0]?.spaceId || "";
      let searchTimer = 0;
      let searchSequence = 0;
      const search = document.createElement("div");
      const input = document.createElement("input");
      const status = document.createElement("div");
      const list = document.createElement("div"); list.className = P + "destinations";
      search.className = P + "search";
      input.type = "search";
      input.className = P + "search-input";
      input.placeholder = "搜索 Notion 页面或数据库";
      input.setAttribute("aria-label", input.placeholder);
      status.className = P + "search-status";
      const renderItems = (entries, emptyText) => {
        list.replaceChildren();
        if (!entries.length) {
          status.textContent = emptyText || "没有匹配的页面或数据库";
          return;
        }
        status.textContent = "";
        entries.forEach((item, index) => {
        const target = {
          raw: item,
          id: item.id || item.blockId || item.targetBlockId || item.value || String(index),
          title: item.title || item.name || item.databaseName || item.record?.name || "未命名目标",
          kind: item.type || item.record?.type || "Notion"
        };
        const option = makeButton("", P + "destination", () => startExport(target));
        const strong = document.createElement("strong"), span = document.createElement("span");
          strong.textContent = target.title;
          span.textContent = target.kind === "collection_view" ? "数据库" : "页面";
          option.append(strong, span);
          list.append(option);
        });
      };
      const renderInitial = () => {
        const filtered = selectedSpaceId ? items.filter((item) => item.spaceId === selectedSpaceId) : items;
        renderItems(filtered, "当前工作区没有最近使用的页面或数据库");
      };
      if (spaces.length > 1) {
        const tabs = document.createElement("div"); tabs.className = P + "space-tabs";
        spaces.forEach((space) => {
          const tab = makeButton(space.name || "工作区", P + "space-tab", () => {
            selectedSpaceId = space.id;
            tabs.querySelectorAll("button").forEach((button) => button.classList.remove(P + "active"));
            tab.classList.add(P + "active");
            input.value = "";
            renderInitial();
          });
          if (space.id === selectedSpaceId) tab.classList.add(P + "active");
          tabs.append(tab);
        });
        body.append(tabs);
      }
      input.addEventListener("input", () => {
        clearTimeout(searchTimer);
        const query = input.value.trim();
        if (!query) {
          searchSequence += 1;
          renderInitial();
          return;
        }
        const sequence = ++searchSequence;
        status.textContent = "正在搜索…";
        list.replaceChildren();
        searchTimer = window.setTimeout(async () => {
          try {
            const result = unwrap(await send(TYPE.SEARCH, {spaceId: selectedSpaceId, query}));
            if (sequence !== searchSequence) return;
            renderItems(result?.destinations || result?.results || []);
          } catch (e) {
            if (sequence === searchSequence) status.textContent = e.message || "搜索失败";
          }
        }, 300);
      });
      search.append(input);
      body.append(search, status, list, makeButton("取消", P + "secondary", closeModal));
      renderInitial();
    } catch (e) { showError(e.message); }
  }
  function selectedSessions() {
    return Array.from(state.selected).map((key) => state.sessions.get(key)).filter(Boolean);
  }
  async function startExport(target) {
    const sessions = selectedSessions();
    state.exporting = true;
    updateToolbar();
    showProgress({ current: 0, total: sessions.length, message: "准备导出…" });
    try {
      const result = unwrap(await send(TYPE.EXPORT, {
        destination: target.raw,
        destinationId: target.id,
        originalThreadId: new URL(location.href).searchParams.get("mtid") || "",
        sessions,
        conversations: sessions
      }));
      if (result?.completed || ["complete", "success"].includes(result?.status)) { state.exporting = false; showProgress(result); }
    } catch (e) { state.exporting = false; showProgress({ status: "error", message: e.message, total: sessions.length }); updateToolbar(); }
  }
  function showProgress(message) {
    const data = message?.data && typeof message.data === "object" ? message.data : message || {};
    let dialog = document.getElementById(P + "modal");
    const body = dialog ? dialog.querySelector("." + P + "modal-body") : modal("导出进度");
    dialog = document.getElementById(P + "modal"); dialog.querySelector("." + P + "modal-title").textContent = "导出进度"; body.replaceChildren();
    const current = Number(data.current ?? data.completed ?? data.done ?? 0);
    const total = Number(data.total ?? state.selected.size);
    const status = String(data.status || data.state || data.phase || "running").toLowerCase();
    const text = document.createElement("p"), progress = document.createElement("progress"), summary = document.createElement("p");
    text.className = P + "progress-message"; text.textContent = data.message || (status === "error" ? "导出失败" : "正在导出…");
    progress.className = P + "progress"; progress.max = Math.max(total, 1); progress.value = Math.min(current, progress.max);
    summary.className = P + "progress-summary"; summary.textContent = current + " / " + total; body.append(text, progress, summary);
    if (["complete", "completed", "success", "done", "error", "failed"].includes(status)) {
      const succeeded = Number(data.succeeded ?? data.successCount ?? current);
      const failed = Number(data.failed ?? data.failureCount ?? (status === "error" ? 1 : 0));
      summary.textContent = "成功 " + succeeded + "，失败 " + failed + "，共 " + total;
      const failures = (data.results || []).filter((result) => !result.success);
      if (failures.length) {
        const details = document.createElement("ul"); details.className = P + "failure-list";
        failures.forEach((result, index) => {
          const item = document.createElement("li");
          const name = result.title || "第 " + (index + 1) + " 条";
          item.textContent = name + "：" + (result.error?.message || result.error || "未知错误");
          details.append(item);
        });
        body.append(details);
      }
      body.append(makeButton("关闭", P + "primary", () => { closeModal(); cancelSelection(); }));
    }
  }

  function escapeMd(text) { return text.replace(/([\\*_[\]<>])/g, "\\$1"); }
  function inline(node) {
    if (node.nodeType === Node.TEXT_NODE) return escapeMd(node.nodeValue || "");
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node; if (el.matches("script, style, button, svg, ." + P + "root")) return "";
    const value = Array.from(el.childNodes).map(inline).join(""), tag = el.tagName.toLowerCase();
    if (tag === "br") return "\n";
    if (tag === "a") return el.href ? "[" + (value.trim() || el.href) + "](" + el.href + ")" : value;
    if (["strong", "b"].includes(tag) && value.trim()) return "**" + value.trim() + "**";
    if (["em", "i"].includes(tag) && value.trim()) return "*" + value.trim() + "*";
    if (tag === "code" && el.parentElement?.tagName.toLowerCase() !== "pre") {
      return String.fromCharCode(96) + value.trim() + String.fromCharCode(96);
    }
    return value;
  }
  function toMarkdown(root) {
    const clone = root.cloneNode(true), tick = String.fromCharCode(96);
    clone.querySelectorAll("script, style, button, svg, ." + P + "root").forEach((n) => n.remove());
    clone.querySelectorAll("pre").forEach((n) => {
      const fenced = "\n\n" + tick.repeat(3) + "\n" + n.textContent.trim() + "\n" + tick.repeat(3) + "\n\n";
      n.replaceWith(document.createTextNode(fenced));
    });
    clone.querySelectorAll("li").forEach((n) => {
      n.insertBefore(document.createTextNode(n.parentElement?.tagName === "OL" ? "1. " : "- "), n.firstChild);
      n.append(document.createTextNode("\n"));
    });
    clone.querySelectorAll("h1, h2, h3, h4, h5, h6, p, div, blockquote, ul, ol, tr").forEach((n) => {
      const match = n.tagName.match(/^H([1-6])$/);
      if (match) n.insertBefore(document.createTextNode("#".repeat(Number(match[1])) + " "), n.firstChild);
      n.append(document.createTextNode("\n\n"));
    });
    return inline(clone).replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  function unique(selector, root) {
    const all = Array.from((root || document).querySelectorAll(selector));
    return all.filter((node, i) => !all.some((other, j) => j < i && other.contains(node)));
  }
  function extractionScopes() {
    const scopes = [];
    document.querySelectorAll(AIMC).forEach((aimc) => {
      let node = aimc.parentElement;
      for (let depth = 0; node && depth < 10; depth += 1, node = node.parentElement) {
        if (node.querySelector(USER) && node.querySelectorAll(AIMC).length === 1) {
          if (!scopes.includes(node)) scopes.push(node);
          break;
        }
      }
    });
    return scopes.length ? scopes : unique(FALLBACK_CONTENT);
  }
  function extract() {
    const turns = [], scopes = extractionScopes();
    scopes.forEach((root) => {
      const users = Array.from(root.querySelectorAll(USER)), answers = unique(ANSWER, root);
      for (let i = 0; i < Math.max(users.length, answers.length); i += 1) {
        const user = users[i] ? toMarkdown(users[i]) : "", answer = answers[i] ? toMarkdown(answers[i]) : "";
        if (user || answer) turns.push({ user, answer });
      }
    });
    const citations = [], seen = new Set();
    document.querySelectorAll(ANSWER + " ul.bTFeG li a[href]").forEach((a) => {
      if (!seen.has(a.href)) {
        seen.add(a.href);
        citations.push({ title: a.textContent.replace(/\s+/g, " ").trim() || a.href, url: a.href });
      }
    });
    const title = document.querySelector("h1")?.textContent?.trim() || document.title || "Google AI 会话";
    const sections = ["# " + escapeMd(title)];
    turns.forEach((turn) => {
      if (turn.user) sections.push("## 用户\n\n" + turn.user);
      if (turn.answer) sections.push("## Google AI\n\n" + turn.answer);
    });
    if (citations.length) sections.push("## 引用\n\n" + citations.map((c) => "- [" + escapeMd(c.title) + "](" + c.url + ")").join("\n"));
    const content = sections.join("\n\n").trim();
    return { success: turns.length > 0, title, url: location.href, markdown: content, content, turns, citations };
  }

  function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  function findScrollContainer(element) {
    let node = element;
    while (node && node !== document.body) {
      const overflowY = getComputedStyle(node).overflowY;
      if (["auto", "scroll"].includes(overflowY) && node.scrollHeight > node.clientHeight + 20) return node;
      node = node.parentElement;
    }
    return document.scrollingElement;
  }

  async function openConversation(threadId) {
    const currentThreadId = new URL(location.href).searchParams.get("mtid");
    if (currentThreadId === threadId && document.querySelector(CONTENT)?.innerText?.trim()) {
      return {success: true, url: location.href};
    }
    const selector = 'button[data-thread-id="' + CSS.escape(threadId) + '"]';
    const listDeadline = Date.now() + 20000;
    let trigger;
    let scrollTop = 0;
    while (Date.now() < listDeadline && !trigger) {
      trigger = document.querySelector(selector);
      if (trigger) break;
      const list = document.querySelector('[data-xid="threads-list-root"]');
      const scroller = findScrollContainer(list);
      if (list && scroller) {
        const step = Math.max(scroller.clientHeight * 0.8, 240);
        scrollTop = scrollTop > scroller.scrollHeight ? 0 : scrollTop + step;
        scroller.scrollTop = scrollTop;
      }
      await delay(200);
    }
    if (!trigger) throw new Error("未在会话列表中找到目标 session: " + threadId);
    trigger.click();
    const deadline = Date.now() + 60000;
    let previousContent = "";
    while (Date.now() < deadline) {
      const currentId = new URL(location.href).searchParams.get("mtid");
      const content = document.querySelector(CONTENT)?.innerText?.trim() || "";
      if (currentId === threadId && content && content === previousContent) {
        return {success: true, url: location.href};
      }
      previousContent = currentId === threadId ? content : "";
      await delay(200);
    }
    throw new Error("等待目标 session 加载超时: " + threadId);
  }

  chrome.runtime.onMessage.addListener((message, _sender, respond) => {
    const type = message?.type || message?.action;
    if (type === TYPE.OPEN) {
      openConversation(String(message.threadId || message.mtid || ""))
        .then(respond)
        .catch((error) => respond({success: false, error: error.message}));
      return true;
    }
    if (type === TYPE.EXTRACT) {
      try { respond(extract()); } catch (e) { respond({ success: false, error: e.message }); }
      return true;
    }
    if (type === TYPE.PROGRESS) {
      const data = message.data || message.payload || message, status = String(data.status || data.state || "").toLowerCase();
      if (["complete", "completed", "success", "done", "error", "failed"].includes(status)) state.exporting = false;
      showProgress(data); if (state.selecting) updateToolbar(); respond({ received: true });
    }
    return false;
  });
  function teardown() {
    state.selecting = false;
    state.exporting = false;
    state.selected.clear();
    state.links.clear();
    state.sessions.clear();
    document.body.classList.remove(P + "selecting");
    document.getElementById(P + "launcher")?.remove(); document.getElementById(P + "toolbar")?.remove(); closeModal(); removeChoices();
  }
  function scan() {
    state.timer = 0; if (!supported()) { teardown(); return; } state.links = discover();
    ensureLauncher(); renderSelection();
  }
  function schedule() { clearTimeout(state.timer); state.timer = window.setTimeout(scan, 120); }
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-thread-id", "aria-label"],
    childList: true,
    subtree: true
  });
  window.addEventListener("scroll", schedule, true);
  window.addEventListener("resize", schedule);
  window.addEventListener("popstate", schedule); window.addEventListener("hashchange", schedule);
  ["pushState", "replaceState"].forEach((name) => {
    const original = history[name];
    history[name] = function () {
      const result = original.apply(this, arguments);
      schedule();
      return result;
    };
  });
  scan();
})();
