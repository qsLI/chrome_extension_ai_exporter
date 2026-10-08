# Google AI Batch Notion Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Add selectable batch export from the Google AI Search session list to individual Notion pages.

**Architecture:** Add a dedicated Google-only content script for list selection, progress UI, and conversation extraction. Wrap the existing service worker and add a separate batch worker that loads Notion destinations, opens selected sessions one at a time in inactive tabs, requests extracted Markdown, writes each page through Notion Web Clipper APIs, and closes temporary tabs.

**Tech Stack:** Chrome Extension Manifest V3, vanilla JavaScript, Chrome tabs/cookies/runtime APIs, Notion Web Clipper API.

---

### Task 1: Add batch service worker

**Files:**
- Create: `batch/background.js`
- Create: `background-wrapper.js`
- Modify: `manifest.json`

- [ ] Load the original worker and batch worker from a wrapper.
- [ ] Return available Notion pages/databases from the authenticated Notion session.
- [ ] Process selected sessions serially in inactive tabs.
- [ ] Save each extracted Markdown document as an independent Notion page.
- [ ] Send progress events and always close temporary tabs.

### Task 2: Add session-list selection UI and extraction

**Files:**
- Create: `batch/content.js`
- Create: `batch/content.css`
- Modify: `manifest.json`

- [ ] Detect Google AI Mode routes and session links containing `mtid`.
- [ ] Add a batch button, selection checkboxes, select-all/cancel/export controls.
- [ ] Present a Notion destination picker and progress summary.
- [ ] Extract rendered turns using the existing Google AI selectors and convert them to Markdown.
- [ ] Handle SPA navigation and dynamically loaded session-list items.

### Task 3: Verification

**Files:**
- Verify: `manifest.json`, `background-wrapper.js`, and `batch/*.js`

- [ ] Parse the manifest and run `node --check` on every JavaScript file.
- [ ] Verify worker message contracts and failure cleanup paths.
- [ ] Verify no Free-plan quota check is reintroduced.
- [ ] Load the unpacked extension and smoke-test controls where browser state permits.

### Task 4: Fix selection against the live Google thread-list DOM

**Files:**
- Modify: `batch/content.js`
- Verify: `batch/content.css`

- [ ] Discover sessions from `[data-xid="threads-list-root"] button[data-thread-id]` instead of unrelated `mtid` links.
- [ ] Build each session URL by copying the current AI Mode URL and replacing `mtid` with `data-thread-id`.
- [ ] Anchor checkboxes to the real `[role="listitem"]` row and hide overlays outside the viewport.
- [ ] Keep selection state stable while Google replaces or virtualizes list rows.
- [ ] Run syntax/style checks through a subagent, then inspect the loaded extension with CDP.

### Task 5: Fix Notion destination loading HTTP 400

**Files:**
- Modify: `batch/background.js`

- [ ] Match the original extension's non-empty default `getWebClipperData` request body.
- [ ] Reuse the original `notion_web_clipper:<userId>` cache to send workspace and recent-block IDs.
- [ ] Preserve explicit request parameters while filling missing required maps.
- [ ] Run syntax and targeted static verification through a subagent.

### Task 6: Keep checkboxes clear of session titles

**Files:**
- Modify: `batch/content.css`

- [ ] Add left-side spacing to Google thread buttons only while selection mode is active.
- [ ] Keep the checkbox inside the reserved space without changing the normal list layout.
- [ ] Run CSS style checks through a subagent.

### Task 7: Keep checkboxes synchronized while scrolling

**Files:**
- Modify: `batch/content.js`
- Modify: `batch/content.css`

- [ ] Mount each checkbox inside its real thread-list row instead of `document.body`.
- [ ] Position the checkbox relative to the row so native scrolling moves both together.
- [ ] Remove stale row marker classes during reconciliation and teardown.
- [ ] Run syntax and style verification through a subagent.

### Task 8: Match the original Notion destination search UI

**Files:**
- Modify: `batch/content.js`
- Modify: `batch/content.css`
- Modify: `batch/background.js`

- [ ] Add a workspace-aware `searchWebClipperPages` background message.
- [ ] Add a debounced search box to the destination modal.
- [ ] Render page/database search results with loading, empty, and error states.
- [ ] Preserve the initial recent destination list when the query is cleared.
- [ ] Run syntax and style verification through a subagent.

### Task 9: Fix repeated export of the first selected session

**Files:**
- Modify: `batch/content.js`
- Modify: `batch/background.js` if runtime evidence requires it

- [ ] Compare generated session URLs with URLs produced by clicking real Google thread buttons.
- [ ] Remove or replace stale conversation-specific query parameters.
- [ ] Verify selected sessions retain distinct IDs and extraction waits for the requested thread.
- [ ] Run syntax and focused static verification through a subagent.

### Task 10: Diagnose and retry failed session switching

**Files:**
- Modify: `batch/background.js`
- Modify: `batch/content.js`

- [ ] Retry the open-session message until the temporary tab content script is ready.
- [ ] Bound each attempt and preserve the last concrete error.
- [ ] Show per-session failure details in the final progress dialog.
- [ ] Run syntax and focused static verification through a subagent.

### Task 11: Export sessions directly in the source tab

**Files:**
- Modify: `batch/content.js`
- Modify: `batch/background.js`

- [ ] Click and extract each selected thread in the fully rendered source tab.
- [ ] Wait for Google's SPA navigation and rendered conversation to stabilize before extraction.
- [ ] Restore the source tab's original thread after batch export.
- [ ] Remove temporary-tab dependency from the batch export path.
- [ ] Run syntax and focused static verification through a subagent.

### Task 12: Make source-tab session switching idempotent

**Files:**
- Modify: `batch/content.js`

- [ ] Return immediately when the requested thread is already rendered.
- [ ] Identify and scroll the actual sidebar scroll container for virtualized rows.
- [ ] Preserve the concrete source-side failure message through background retries.
- [ ] Run syntax and focused static verification through a subagent.
