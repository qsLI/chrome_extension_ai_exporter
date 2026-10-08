# AI Exporter Default Pro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Copy AI Exporter 4.5.1 into the specified directory and make every account state, including explicit Free accounts, behave as Pro.

**Architecture:** Preserve the unpacked Manifest V3 extension as-is, then patch all bundled entitlement checks consistently so every account state receives Pro behavior.

**Tech Stack:** Chrome Extension Manifest V3, bundled JavaScript, shell-based static verification.

---

### Task 1: Copy the unpacked extension

**Files:**
- Create: extension files copied from the installed AI Exporter 4.5.1 directory into the repository root

- [x] Copy all extension files without modifying the installed source.
- [x] Verify `manifest.json` exists and declares version `4.5.1`.

### Task 2: Default missing entitlement to Pro

**Files:**
- Modify: `content-scripts/content.js`
- Modify: `chunks/BWDg9IDt.js`
- Modify: `chunks/C0--tl9f.js`
- Modify: `chunks/CrJYfcRD.js`
- Modify: `chunks/pre5PA1v.js`

- [x] Replace direct `planSlug === "pro"` entitlement checks with semantics equivalent to `planSlug !== "free"`.
- [x] Replace direct `planSlug !== "pro"` Free checks with semantics equivalent to `planSlug === "free"`.
- [x] Preserve existing remote account loading while treating explicit Free accounts as Pro.

### Task 3: Verify the copied extension

**Files:**
- Verify: `manifest.json` and all copied JavaScript files

- [x] Parse `manifest.json` as JSON.
- [x] Run `node --check` for every JavaScript file.
- [x] Search for remaining direct Pro/Free comparisons and review every result.
- [x] Confirm the source installation directory remains unchanged.
