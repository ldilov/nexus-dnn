# Quickstart: Verifying Extension Modules locally

**Feature**: 019-extension-modules
**Prereqs**: 018-deployments merged; workspace checks out on branch `019-extension-modules`.

This walks a reviewer through exercising every user story end-to-end on a local machine.

## 0. Apply migrations

```bash
# From repo root
cargo run -p nexus-api -- --migrate
```

Expected: migration 012 applies cleanly, `PRAGMA table_info(extensions)` shows `primary_recipe_id`, `default_workflow_id`, `icon_kind`, `icon_symbol`, `icon_svg` columns.

## 1. Start backend + frontend

```bash
# Terminal 1 — API
cargo run -p nexus-api

# Terminal 2 — Web
cd apps/web
pnpm install   # or npm install
pnpm dev       # http://localhost:5173
```

Expected: browser opens to `http://localhost:5173`. Fonts load from `/fonts/*.woff2`. DevTools Network panel shows zero requests to `fonts.googleapis.com`, `fonts.gstatic.com`, `lh3.googleusercontent.com`, or any non-`localhost` origin (SC-021 sanity check).

## 2. Verify sidebar reshape (User Story 1, SC-001)

- Open the app.
- Observe sidebar. You should see in order: **Home**, **Modules**, **Deployments**, **Runs**, **Artifacts**, **Extensions**.
- You should NOT see any "Recipes" or "Workflows" top-level items.
- Hover each sidebar item — an icon is always visible; the active one is `font-variation-settings: 'FILL' 1` and glows with the primary-dim box-shadow.

Negative check: visit `/#/recipes` — the URL rewrites to `/#/modules` without a full page reload.

## 3. Verify Modules page (User Story 1, FR-005..FR-011)

- Click **Modules**.
- Verify the page header: `h1` text "Modules" in Inter with tight tracking; a mono-font subtitle like `ARCHIVE // 3 MODULES INDEXED`.
- Verify the bento grid shows all installed extensions as cards plus a **User Modules** group with a **Blank Module** card at its top.
- Verify each extension card shows: icon (from manifest or fallback glyph), display name, version in mono, description, tags, deployment-instance count, and two CTAs: `View Blueprint` + `Deploy Instance`.

## 4. Install a new extension (Story R-A, FR-IE01..FR-IE07, SC-017)

- Click **+ Install Extension** in the Modules header.
- A right-docked glass drawer slides in with a drag-and-drop zone.
- Drop `apps/web/fixtures/extensions/happy/cinema-engine.zip` (or use the file picker).
- Progress UI shows staging → validating → extracting → publishing.
- Success: new module card animates into the grid with a 200 ms slide; toast "Cinema Engine v4.2.0 installed".
- Click **Open Module** in the drawer footer → navigates to `/modules/ext:cinema-engine`.

Adversarial (SC-018):

```bash
# Any one of these ZIPs MUST fail with a specific code
curl -F "file=@tests/fixtures/zips/adv/path-traversal.zip" \
     -X POST http://localhost:3000/api/v1/extensions/install-from-zip
# → { "error": { "code": "zip.slip_attempt", … } }
```

## 5. Deploy an Instance (User Story 2, SC-003, SC-011)

- On the Modules page, click **Deploy Instance** on the Cinema Engine card.
- Observe: one POST to `/api/v1/modules/ext:cinema-engine/deployments` returning `{ module_id, deployment_id }`.
- URL changes to `/modules/ext:cinema-engine/.../deployments/<id>`; the Instance editor opens with the Graph tab active.
- Identity banner shows Instance ID (mono), module badge, revision 1.

Multi-blueprint extensions: on a module card with `blueprints.length > 1`, the CTA shows `(3) ▾` — clicking opens a quick-pick. Selecting a non-primary recipe then clicking Deploy Instance forwards `recipe_id` in the POST body.

## 6. View Blueprint (User Story 3, SC-005)

- On the Cinema Engine card, click **View Blueprint**.
- Route: `/modules/ext:cinema-engine/blueprint`.
- Verify: numbered step list, zero focusable form inputs (try Tab — focus skips every field).
- Two CTAs only: **Dry Run** and **Clone to Deployment**.
- Click **Dry Run** — a plan renders inline, no `runs` row is created (verify via the Runs sidebar: count unchanged).

## 7. Edit an Instance (User Story 4, FR-019..FR-025, SC-006)

- From an existing Instance, switch among all four tabs (Recipe, Stage, Graph, Trace). Identity banner and active Instance are preserved across switches.
- On the Recipe tab, observe the segmented control `[Overlay | Blueprint]`. Use **Cmd/Ctrl+B** to toggle — fields dim + disable under Blueprint, re-enable under Overlay, dirty values preserved across toggles (SC-023).
- Edit `node_config.temperature` — a dirty indicator appears on the Overlay segment.
- Click **Save Draft** — a new revision with `save_mode=auto_draft` appears in the revision picker; `current_revision_id` does NOT advance.
- Click **Deploy Changes** — a new revision with `save_mode=save_as_version` lands; `current_revision_id` advances.

## 8. Revision Viewing + Revert (User Story 4 extension, FR-RV01..FR-RV06, SC-016)

- Open the revision picker (the "▾" next to the revision number on the identity banner).
- Pick a non-current revision.
- Observe: a `secondary_container`-colored banner reading `"Viewing revision N — read-only"`. All write affordances are disabled (try clicking — nothing happens; tooltip explains).
- Click **Make this the current revision**.
- If a dirty draft exists, a modal offers `[Save draft & revert] [Discard draft & revert] [Cancel]`.
- Choose **Save draft & revert** — network panel shows two POSTs to `/deployments/{id}/revisions` in order (auto_draft, then save_as_version).
- Editor returns to Editing mode pinned at the new current revision.

## 9. Blank Module zero-orphan (Story Q5, FR-BM01..FR-BM07, SC-019/SC-020)

- On the Modules page, click the **Blank Module** card (top of User Modules).
- URL: `/#/modules/user:draft:<uuid>`.
- No network request has fired (verify in DevTools Network tab — empty since nav).
- Reload the page. sessionStorage keeps the draft; editor re-hydrates to the same state.
- Make an edit; observe sessionStorage key `nexus.module.draft.<uuid>` updates (debounced ≤ 500 ms).
- Click **Save Draft**. Observe ONE POST to `/modules/user:draft:<uuid>/materialize` → 201. URL rewrites (history.replaceState) to `/#/modules/user:<workflow_id>`. sessionStorage key is cleared.

Repeat N times WITHOUT saving: SQL count of `workflows` before vs after is unchanged — zero orphans.

## 10. Local-first + a11y (SC-021, SC-008)

- DevTools Network: no non-localhost request fires during any of the flows above.
- Lighthouse → Accessibility: ≥ 95 on every module-surface page.
- axe-core scan (`pnpm test:e2e -- a11y_axe`): zero serious/critical violations on `/modules`, `/modules/{id}`, `/modules/{id}/blueprint`, `/deployments/{id}`.

## 11. Keyboard-only traversal (SC-009)

- Close the mouse. Using only `Tab` / `Shift+Tab` / arrow keys / `Enter` / `Space`:
  - Navigate the module grid (arrow keys between cards).
  - Activate Deploy Instance (`Enter` on focused CTA).
  - In the editor, move among tabs using `Left` / `Right` / `Home` / `End`.
  - Toggle Recipe segmented control with `Cmd/Ctrl+B`.
- A focus ring (2 px primary outline + primary-dim glow) is visible at all times.

## 12. Reduced motion (SC-010, SC-022)

```bash
# macOS: System Settings → Accessibility → Display → Reduce motion
# Windows: Settings → Ease of Access → Display → Show animations in Windows = Off
# DevTools: Rendering tab → Emulate CSS media feature prefers-reduced-motion = reduce
```

- Reload the app.
- Hover a module card — no glow transition fires (static).
- Switch tabs — no crossfade.
- Inspect `getComputedStyle(document.documentElement).getPropertyValue('--motion-card-hover-lift')` — returns `0s`.

## 13. Run the full CI battery locally

```bash
# Theme-leak scan
pnpm --filter @nexus/web run scan:theme

# Terminology compliance
pnpm --filter @nexus/web run scan:terminology

# Vitest
pnpm --filter @nexus/web test

# Playwright
pnpm --filter @nexus/web test:e2e

# Rust contract tests
cargo test --workspace
```

All should pass with zero failures.

## 14. Clean up

```bash
# Remove the ephemeral test extension
curl -X DELETE http://localhost:3000/api/v1/extensions/ext:cinema-engine
```

(Uses existing 018 extension-uninstall endpoint; no new delete surface introduced.)

---

**If any step above fails**, the spec's corresponding SC-0xx identifies which requirement is unmet. Open a follow-up issue referencing the SC id.
