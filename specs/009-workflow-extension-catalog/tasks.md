---
description: "Implementation task list for Workflow Extension Catalog"
---

# Tasks: Workflow Extension Catalog

**Input**: `specs/009-workflow-extension-catalog/{spec.md, plan.md}`
**Tests**: Included (constitution VIII + IX; Playwright E2E required for the user-facing flows).

**Organization**: by user story (US1…US4) so each story can land and be evaluated independently, with a Foundational phase that makes attribution available before any UI work.

## Format: `[ID] [P?] [Story] Description`

- **[P]** — safe to run in parallel (independent files / no ordering dep)
- **[Story]** — US1…US4, `SETUP`, `FOUND`, or `POLISH`

## Path conventions

- Rust: `crates/{nexus-storage, nexus-core, nexus-api}/`
- Migration: `migrations/006_workflow_extension_attribution.sql`
- Frontend: `apps/web/src/{catalog, hooks, layout, App.tsx}`
- Spec: `specs/009-workflow-extension-catalog/`

---

## Phase 1: Setup

- [ ] **T001** [SETUP] Confirm branch `009-workflow-extension-catalog` is current; push `-u` if not yet tracking.
- [ ] **T002** [SETUP] [P] Run `./.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` so `CLAUDE.md` reflects the 006 migration + attribution DTO.

---

## Phase 2: Foundational — extension attribution on workflows

**⚠️ Gate**: no UI work starts until T014 is green. US1 grouping depends on the backend surfacing `extension_id` + `extension_version` + derived `status`.

### Backend

- [ ] **T010** [FOUND] Author `migrations/006_workflow_extension_attribution.sql` — three nullable `ALTER`s on `workflows` (`extension_id`, `extension_version`, `extension_version_first_seen`) + `idx_workflows_extension`. Include idempotency guards the same way migrations 004/005 do.
- [ ] **T011** [FOUND] Extend `crates/nexus-storage/src/records.rs::WorkflowRecord` with the three new fields; update `row_mapping.rs::map_workflow_row` to read them.
- [ ] **T012** [FOUND] Update SQL files in `crates/nexus-storage/queries/workflows/{insert.sql, update.sql, list.sql, get_by_id.sql}` to include the new columns.
- [ ] **T013** [FOUND] Extend `crates/nexus-core/src/app.rs::persist_workflow_records` — when seeding a workflow from an extension, stamp `extension_id`, `extension_version`, `extension_version_first_seen = COALESCE(existing, now())`. Respect the existing `user_edited_at` guard: re-persistence still skips edited rows, **but** perform a one-shot best-effort backfill by matching existing rows' `id` against the extension's shipped workflow ids and stamping attribution when it was NULL.
- [ ] **T014** [FOUND] Extend `crates/nexus-api/src/dto/workflows.rs::WorkflowDto` + `WorkflowSummaryDto` — add `extension_id: Option<String>`, `extension_version: Option<String>`, `extension_version_first_seen: Option<String>`, `status: WorkflowStatusDto`, `node_count: u32`, `stage_count: u32`. Derive `status` server-side in the handler (`extension_id.is_none() → User`; `user_edited_at.is_some() → Modified`; else `Stable`). Regenerate TS bindings with `cargo test -p nexus-api export_bindings`.

### Tests

- [ ] **T015** [P] [FOUND] `crates/nexus-storage/tests/migrate_006.rs` — fresh DB applies cleanly; DB with pre-existing workflow rows gets the columns as NULL and the index created.
- [ ] **T016** [P] [FOUND] `crates/nexus-core/tests/persist_attribution.rs` — seeding a new extension stamps attribution; re-running is a no-op; a user-edited row whose id matches an extension-shipped id gets a one-shot backfill but is not otherwise touched; an orphan row (no matching extension) stays NULL (FR-023).
- [ ] **T017** [P] [FOUND] `crates/nexus-api/tests/workflow_dto.rs` — `GET /workflows` returns the new fields; `status` is `User` when `extension_id` is NULL, `Modified` when `user_edited_at` is set, otherwise `Stable`.

**Checkpoint**: Foundation ready → UI stories unblocked. FR-001, FR-003, FR-004, FR-022, FR-023 green.

---

## Phase 3: User Story 1 — Browse workflows grouped by extension (Priority: P1) 🎯 MVP

**Goal**: Replace the flat workflow grid with a grouped catalog that mirrors recipes. Each extension gets a labeled group header; user-authored workflows get a "User Workflows" group.

**Independent Test**: Two extensions installed, each contributing ≥ 1 workflow → Workflows section shows two labeled groups plus "User Workflows" when relevant; no workflow appears under the wrong group; edited shipped workflows still sit under their extension group with a "Modified" badge.

### Frontend foundation (shared with US2/US3)

- [ ] **T101** [US1] NEW `apps/web/src/catalog/catalog_shell.tsx` + `catalog_shell.css.ts` — grouped layout primitive. Props: `groups: CatalogGroup[]`, `extensions: Record<id, ExtensionSummary>`, `renderCard: (item) => ReactNode`, `selectedId: string | null`, `onSelect(id)`. Renders group header (extension name + version + count) with a slot for a trailing action (used by US4). Spectral Graphite visuals (FR-021).
- [ ] **T102** [US1] NEW `apps/web/src/catalog/catalog_grouping.ts` — pure `groupByExtension(items, extensions)` → `CatalogGroup[]`; "User Workflows" group holds items with `extension_id === null`.

### Workflow catalog rewrite

- [ ] **T103** [US1] Rewrite `apps/web/src/catalog/workflow_catalog.tsx` — use `catalog_shell` + `groupByExtension`; render a `<WorkflowCard>` per item with title, id, version, node/stage counts (FR-018), status badge (Stable / Modified / User) (FR-017). Conflict badge when two extensions ship the same id (spec §Edge Cases).
- [ ] **T104** [US1] Remove the auto-select-first behavior in `apps/web/src/App.tsx` / workspace shell — the Workflows route renders the catalog until the user selects a workflow.

### Recipes parity

- [ ] **T105** [US1] Refactor `apps/web/src/catalog/recipe_catalog.tsx` to consume `catalog_shell` + `groupByExtension` — recipe grouping logic today is bespoke; lifting it here is what makes Recipes and Workflows feel cohesive (FR-008, SC-005).

### Tests

- [ ] **T110** [P] [US1] `apps/web/tests/workflow_catalog_grouping.spec.ts` (Playwright) — Acceptance Scenarios 1-4 from spec §US1.
- [ ] **T111** [P] [US1] `apps/web/tests/catalog_grouping.unit.ts` (Vitest) — `groupByExtension` correctly emits "User Workflows" bucket; handles empty input; preserves extension insertion order.

**Checkpoint**: US1 ⇒ FR-005, FR-006, FR-007, FR-008, FR-017, FR-018 green; SC-001 meetable.

---

## Phase 4: User Story 2 — Selection-first navigation (Priority: P1)

**Goal**: Catalog is the first view in Workflows. No workflow is auto-opened. Activating a card transitions to the editor; returning to Workflows shows the catalog again without losing editor state.

**Independent Test**: Navigate to Workflows → catalog renders, no graph/stage/trace is pre-rendered. Activate a card → stage view loads. Switch to graph/trace → same workflow stays selected. Return to Workflows → catalog again. Empty state when no workflows exist.

### Implementation

- [ ] **T201** [US2] NEW `apps/web/src/hooks/use_catalog_state.ts` — pure reducer: `{ selectedWorkflowId, selectedRecipeId, lastEditorView }`. Actions: `selectWorkflow`, `deselectWorkflow`, `setEditorView`. Persist to `sessionStorage` so tab-switch survives.
- [ ] **T202** [US2] Extend `apps/web/src/App.tsx` Workflows route — when `selectedWorkflowId === null`, render `<WorkflowCatalog />`; else render the editor tabs (stage / graph / trace) with a "Back to catalog" affordance that dispatches `deselectWorkflow`. Keep `<ReactFlowProvider>` mounted with `display: none` to preserve zoom/pan (FR-015).
- [ ] **T203** [US2] Empty state: `<WorkflowCatalog />` renders a "Install an extension or create a new workflow" panel when the API returns zero items (FR-016).
- [ ] **T204** [US2] Deep-link guard: when the user deep-links to a `workflow_id` that no longer exists, redirect to `/workflows` and render a non-blocking banner in the catalog (spec §Edge Cases).

### Tests

- [ ] **T210** [P] [US2] `apps/web/tests/workflow_selection_first.spec.ts` (Playwright) — Acceptance Scenarios 1-4 from spec §US2.
- [ ] **T211** [P] [US2] `apps/web/tests/use_catalog_state.unit.ts` — reducer transitions; sessionStorage persistence.

**Checkpoint**: US2 ⇒ FR-013, FR-014, FR-015, FR-016 green; SC-003 meetable.

---

## Phase 5: User Story 3 — Search and filter (Priority: P2)

**Goal**: Shared search input + status/extension filters for both Workflows and Recipes catalogs. Group headers auto-hide when empty. Single clear-all action.

**Independent Test**: Type a fragment → only matching items remain, empty groups hidden. Toggle "Modified" → only user-edited items. Clear search → filter stays; clear both → full catalog. Same behavior on Recipes.

### Implementation

- [ ] **T301** [US3] NEW `apps/web/src/catalog/catalog_controls.tsx` + `catalog_controls.css.ts` — search input (`/` focuses, `Esc` clears), status multi-toggle, extension dropdown, "Clear all" pill. Emits `{ query, statusFilters, extensionFilter }` via `onChange`.
- [ ] **T302** [US3] Extend `use_catalog_state.ts` — add `query`, `statusFilters: Set<WorkflowStatus>`, `extensionFilter: string | null`; pure selector `visibleGroups(items, extensions, controls)` returns filtered groups with empty ones suppressed (FR-011).
- [ ] **T303** [US3] Wire `catalog_controls` into both `workflow_catalog.tsx` and `recipe_catalog.tsx`. Case-insensitive substring match on `title`, `id`, `description`, owning extension's human name (FR-009, spec §Assumptions).
- [ ] **T304** [US3] Empty-state for zero-results search: "No results for '<query>'" with a "Clear search" button (spec §Edge Cases).

### Tests

- [ ] **T310** [P] [US3] `apps/web/tests/catalog_search.spec.ts` (Playwright) — Acceptance Scenarios 1-4 from spec §US3, for both catalogs.
- [ ] **T311** [P] [US3] `apps/web/tests/catalog_filter.unit.ts` — `visibleGroups` selector: group suppression, multi-status filter, combined query + filter.
- [ ] **T312** [P] [US3] Perf test: populate 500 items across 10 extensions; assert typing latency < 100 ms (SC-006).

**Checkpoint**: US3 ⇒ FR-009, FR-010, FR-011, FR-012 green; SC-002, SC-005, SC-006 meetable.

---

## Phase 6: User Story 4 — Reveal extension source folder (Priority: P3)

**Goal**: Group header exposes an "Open extension folder" action that reveals the extension's directory in the host OS file manager, or copies the absolute path as a fallback. Graceful failure when the path is missing / permission denied.

**Independent Test**: Click the action on an extension group header → OS file manager opens at the extension directory, OR the absolute path lands in the clipboard with a visible confirmation. If the path is unreachable, a non-blocking error banner appears; catalog keeps working.

### Backend

- [ ] **T401** [US4] Extend `ExtensionDto` to include `source_path: Option<String>` (absolute path to the extension's on-disk root, resolved by `nexus-core`). Already known to the host — this just surfaces it to the client.
- [ ] **T402** [US4] NEW route `POST /extensions/:id/reveal` — calls an OS-specific reveal (`open`/`explorer`/`xdg-open` on the extension's root). Returns `{ revealed: bool, path: string }`. If the reveal fails, still returns the path (client falls back to clipboard).

### Frontend

- [ ] **T410** [US4] Extend `catalog_shell.tsx` group header to accept a `headerAction` slot; wire an "Open folder" button that calls `POST /extensions/:id/reveal`, then falls back to `navigator.clipboard.writeText(path)` with a toast confirmation (FR-019).
- [ ] **T411** [US4] Non-blocking error banner when the reveal fails and clipboard also fails (FR-020).

### Tests

- [ ] **T420** [P] [US4] `apps/web/tests/extension_reveal.spec.ts` (Playwright) — Acceptance Scenarios 1-2 from spec §US4 using a mocked `POST /extensions/:id/reveal`.

**Checkpoint**: US4 ⇒ FR-019, FR-020 green.

---

## Phase 7: Polish

- [ ] **T801** [P] [POLISH] Update `README.md` with a short "Workflow Catalog" section (constitution VI).
- [ ] **T802** [P] [POLISH] `docs/CODEMAPS/` — refresh via the `update-codemaps` skill so the catalog folder is indexed.
- [ ] **T803** [POLISH] `cargo fmt` + `cargo clippy --all-targets -- -D warnings` clean.
- [ ] **T804** [POLISH] Frontend: `npx tsc --noEmit && npx vite build` clean. Regenerated ts-rs types committed.
- [ ] **T805** [POLISH] Execute every user-story Independent Test end-to-end on a fresh DB; fix any drift.
- [ ] **T806** [POLISH] Coverage gate: `cargo tarpaulin --packages nexus-api --packages nexus-core --packages nexus-storage --out Xml`; fail PR below 80%.
- [ ] **T807** [POLISH] A11y sweep: keyboard-only navigation of catalog controls (`/`, `Tab`, `Enter`, `Esc`) works; visible focus rings on group headers and cards.
- [ ] **T808** [POLISH] Upgrade-path verification (SC-007): install from a pre-006 snapshot DB, apply migration, confirm zero workflow rows lost and run-history counts match pre/post.

---

## Dependencies & execution order

```
Setup (T001-T002)
   ↓
Foundational (T010-T017)                 ← attribution columns, DTO, status derivation
   ↓
┌─ US1 (T101-T111) ─ MVP                  ← grouped catalog + recipes parity
│     ↓
│   US2 (T201-T211)                       ← selection-first flow (depends on US1 catalog)
│     ↓
│   US3 (T301-T312)                       ← shared search/filter
│     ↓
│   US4 (T401-T420)                       ← reveal folder action
└──
   ↓
Polish (T801-T808)
```

### Parallel opportunities at a glance

- **Foundational tests**: T015 + T016 + T017 parallel (separate crates).
- **US1**: T101 (shell) is the only blocker for T103 (workflow) and T105 (recipes); T103 + T105 can run in parallel once T101 + T102 land.
- **US2**: T201 blocks T202; T203 + T204 parallel after T202.
- **US3**: T301 blocks T303; T302 parallel to T301.
- **Tests** marked [P] always parallel within a story.
- **Polish**: T801 + T802 parallel; T803 + T804 parallel.

---

## Parallel Example — US1

```bash
# Two devs or two agent workers can split:
#  dev A  — T101 (catalog_shell) → T103 (workflow_catalog rewrite) → T110 (Playwright)
#  dev B  — T102 (groupByExtension) → T105 (recipe_catalog refactor) → T111 (unit tests)
```

Both converge on the same `catalog_shell` interface; no cross-file contention.

---

## Exit criteria per story

| Story | Exit criterion |
|---|---|
| **Foundational** | FR-001, FR-003, FR-004, FR-022, FR-023 pass; `GET /workflows` returns attribution + status for every row on a fresh install. |
| **US1** | Spec §US1 Acceptance Scenarios 1-4 green; SC-001 meetable. |
| **US2** | Spec §US2 Acceptance Scenarios 1-4 green; SC-003 meetable. |
| **US3** | Spec §US3 Acceptance Scenarios 1-4 green; SC-002, SC-005, SC-006 meetable. |
| **US4** | Spec §US4 Acceptance Scenarios 1-2 green. |
| **Polish** | All SCs confirmed; SC-007 validated on an upgrade-from-005 DB snapshot. |

When **Foundational + US1 + US2** land, we're at the MVP. US3 + US4 are quality-of-life additions that can ship in the next release if scope pressure demands. The Recipes-parity work in T105 is inside US1 because it's what makes SC-005 ("same interaction model across catalogs") achievable from day one — deferring it would create a window where the two catalogs feel mismatched.
