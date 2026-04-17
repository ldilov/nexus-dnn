---
description: "Task list for spec 020 — Backends + Models page polish (Q1 / Q3 / Q4)"
---

# Tasks: Backends + Models page polish (Q1 / Q3 / Q4)

**Input**: Design documents from `/specs/020-backends-and-models-polish/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: Backend **contract tests are mandatory** for all 3 new endpoints (non-deferrable under Principle VI even with the design-heavy-UI carve-out). Frontend vitest/Playwright tests are **deferred** under the v1.1.2 carve-out invoked by this spec; a follow-up sprint is tracked in Phase 7.

**Organization**: Tasks grouped by user story (US1 = Q1 Install, US2 = Q1 View Details, US3 = Q3 HF on /models, US4 = Q4 draft nodes). Priority ordering matches spec.md: US1 (P1), US3 (P1), US2 (P2), US4 (P3).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no upstream-task dependency)
- **[Story]**: `[US1]`…`[US4]` when task serves a specific user story; omitted for Setup / Foundational / Polish
- All paths are absolute-relative to the repo root `D:\Workspace\repos\nexus-dnn\`.

## Path Conventions (from plan.md)

- Rust host handlers — `crates/nexus-api/src/handlers/backends/`
- Rust router — `crates/nexus-api/src/router.rs`
- Rust runtime manifest — `crates/nexus-backend-runtimes/src/manifest/`
- Rust models store (host install / dedup / leases) — `crates/nexus-models-store/src/`
- Rust contract tests — `crates/nexus-api/tests/`
- Frontend — `apps/web/src/{backends,models,views,hooks,nodes,api}/`
- Spec artifacts — `specs/020-backends-and-models-polish/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Branch hygiene + generated-code sync so every downstream task compiles.

- [X] T001 Cut feature branch `020-backends-and-models-polish` from `main` (`git checkout -b 020-backends-and-models-polish`) and confirm the uncommitted session-19 work either landed on `main` or migrates cleanly onto the new branch (`git status` clean before first implementation commit)
- [X] T002 [P] Verify workspace builds green on the fresh branch: `cargo check --workspace` and `cd apps/web && pnpm install && pnpm tsc --noEmit`
- [X] T003 [P] Re-run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` from repo root and confirm `CLAUDE.md` picks up the real stack line (Rust 1.84 + TS 5.x + React 19 + @xyflow/react) without placeholder text
- [X] T004 [P] Skim `apps/web/src/models/ModelsPanel.tsx` and `apps/web/src/backends/install_modal.tsx` to confirm the pieces we reuse (`HfResultCard`, `InstallStreamEvent`, `AsyncIterable` contract) match what `research.md` §2 assumes; log any drift in `research.md` before writing code

**Checkpoint**: Branch cut, workspace green, reuse assumptions re-verified.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared TypeScript DTO types + Rust error wiring + router scaffolding every user story depends on.

**⚠️ CRITICAL**: No US1–US4 task starts until Phase 2 is complete.

- [X] T010 Add Rust DTOs for the three new endpoints in a single new file `crates/nexus-api/src/handlers/backends/dtos.rs` — `BackendVariantDto`, `BackendVariantsResponse`, `InstallHostModelRequest`, `DependentEntry`, `DependentKind`, `DependentsResponse` (structs + serde derives matching `data-model.md` verbatim). Re-export from `crates/nexus-api/src/handlers/backends/mod.rs`.
- [X] T011 [P] Extend `RuntimeAdapterError` / `map_error()` in `crates/nexus-api/src/handlers/backends/mod.rs` with one new variant + mapping: `CatalogUnavailable(String) → HTTP 404 code="catalog_unavailable"` (used by US1 variants endpoint when the version manifest yaml is missing/malformed — Q1-edge3)
- [X] T012 [P] Add frontend-side TS types mirroring T010 into `apps/web/src/api/client.ts` — `BackendVariant`, `BackendVariantsResponse`, `HostModelInstallRequest` (reuse existing `ModelInstallTaskDto` + extend with `already_installed: boolean`), `DependentEntry`, `DependentsResponse`. Export alongside the existing `HostModelView`/`HostModelsResponse` block.
- [X] T013 [P] Regenerate ts-rs DTOs if the project uses one-shot codegen — check `apps/web/src/api/generated/` for a `.gen.ts` or `.json` manifest, bump it so `ModelInstallTaskDto.already_installed` lands in generated output. If codegen is absent, skip and keep the hand-written types from T012.
- [X] T014 Scaffold the three new routes in `crates/nexus-api/src/router.rs` with `todo!()` handler bodies so the router compiles; this decouples US1/US3 contract tests from their handler implementations:
  - `GET /llm/backends/{backendId}/variants` → `backends::variants`
  - `POST /host-models` → `backends::install_host_model`
  - `GET /host-models/{install_id}/dependents` → `backends::list_host_model_dependents`
- [X] T015 [P] Add stub handler signatures for `variants`, `install_host_model`, `list_host_model_dependents` in `crates/nexus-api/src/handlers/backends/{catalog.rs,host_models.rs}` — return `ApiResponse::<()>::internal("not wired")` so the router compiles. Re-export from `mod.rs`. Real bodies land in US1/US3 tasks.
- [X] T016 [P] Add new API client fns in `apps/web/src/api/client.ts` — `fetchBackendVariants(backendId)`, `installHostModel(body)`, `fetchHostModelDependents(installId)` — each calling `apiFetch` with the new paths; unit smoke-check via `pnpm tsc --noEmit`.
- [X] T017 Confirm `crates/nexus-api/tests/` has a working contract-test harness (look for `common/mod.rs` + any existing `*_test.rs` that boot the router with an in-memory state). If no harness exists, add one at `crates/nexus-api/tests/common/mod.rs` that exposes `spawn_test_app() -> (reqwest::Client, String)` booting the full router with a seeded in-memory `nexus-storage`. Under ~150 LOC; model after existing router test if one exists.

**Checkpoint**: Router compiles with stub handlers, DTOs land on both sides, contract-test harness ready. US1, US3, US4 can now proceed in parallel.

---

## Phase 3: User Story 1 — Install llama.cpp with the right accelerator (Priority: P1) 🎯 MVP

**Goal**: Click **Install** on `BackendCard` → `VariantPickerDrawer` → POST → existing `InstallModal` streams progress → card re-renders `INSTALLED · UNVALIDATED`.

**Independent Test**: On fresh DB, open `/backends`, click Install on llama.cpp, select `cuda12`, watch the 8-phase progress modal, confirm the card re-renders as installed without a page reload.

### Tests for User Story 1 (mandatory — backend contract)

- [X] T100 [P] [US1] Write backend contract test `crates/nexus-api/tests/backends_variants_contract.rs` — boots router, calls `GET /api/v1/llm/backends/llama.cpp/variants`, asserts envelope shape matches `contracts/backends_variants.http` (200 happy path) + `404 catalog_unavailable` when the test harness seeds a registry with a missing manifest + `404 not_found` for unknown backend id. Must fail against the stub handler (T015).

### Implementation — Backend (Q1 variants endpoint)

- [X] T110 [US1] Extend `nexus_backend_runtimes::adapter::BackendAdapter` (in `crates/nexus-backend-runtimes/src/adapter.rs`) with a new trait method `fn variants(&self) -> Result<VersionManifest, RuntimeAdapterError>` (or a projection-ready `list_variants(&MachineDescriptor)` that already returns `Vec<BackendVariantDto>`-equivalent). Choose the projection-at-adapter approach to keep the handler a pure pass-through. Default impl returns `Err(RuntimeAdapterError::CatalogUnavailable(...))` so non-llamacpp adapters degrade gracefully.
- [X] T111 [US1] Implement `list_variants` on the llamacpp adapter (`crates/nexus-backend-runtimes/src/llamacpp/mod.rs`) — loads `VersionManifest` from its on-disk path via existing `manifest::version::load_from_path`, then calls a new pure helper (T112).
- [X] T112 [P] [US1] Add pure projection helper `project_variants(manifest: &VersionManifest, machine: &MachineDescriptor) -> Vec<BackendVariantDto>` in new file `crates/nexus-backend-runtimes/src/manifest/variants.rs`. Logic: iterate `manifest.releases.*.assets`, filter by `machine.platform` (include cross-platform rows too with `supported=false` + `disabled_reason`), mark one row `recommended = true` using the rule from `research.md` §3 "Variant filter rules" (CUDA13 > CUDA12 > CPU on NVIDIA; ROCm > CPU on AMD; CPU otherwise). Unit-test the helper with `#[cfg(test)] mod tests` — 4+ cases.
- [X] T113 [US1] Replace the `variants()` stub in `crates/nexus-api/src/handlers/backends/catalog.rs` with the real handler. Fetch adapter from registry, call `list_variants(&machine)`, wrap in `BackendVariantsResponse { variants, recommended_release_id }`, return via `ApiResponse::ok`. Map `CatalogUnavailable` via T011. T100 should turn green.

### Implementation — Frontend (Q1 picker + install wiring)

- [X] T120 [P] [US1] Create `apps/web/src/backends/hooks/use_install_stream.ts` — exports `useInstallStream(backendId: string): AsyncIterable<InstallStreamEvent>` that wraps the existing `use_event_stream` / WS channel and filters `topic.startsWith("llm.backend.install.") && payload.backend_id === backendId`. Closes the iterator on unmount.
- [X] T121 [P] [US1] Create `apps/web/src/backends/variant_picker_drawer.css.ts` with vanilla-extract tokens: backdrop scrim, right-anchored drawer (400px wide, full height, slide-in), row list, recommended badge, primary/secondary button, inline error banner. Reuse color tokens from existing `backend_card.css.ts`; do not hardcode palette.
- [X] T122 [US1] Create `apps/web/src/backends/variant_picker_drawer.tsx` implementing `VariantPickerDrawer` per `data-model.md`. Props: `backendId`, `mode: "install" | "repair"`, `preselectedReleaseId?` (for repair), `onClose`, `onStarted(task)`. Body: on mount fetch `fetchBackendVariants(backendId)` via SWR (`swr` key: `["backend-variants", backendId]`); render rows with radio-select; disable unsupported rows with tooltip. Primary **Install** button posts `POST /llm/backends/{id}/install` with `{release_id, accelerator_profile}`, then calls `onStarted(task)` with the install task id. Escape + scrim click close. Must not render until SWR resolves. Surface envelope `error.message` inline on POST failure (+ `sonner` toast). ≤300 LOC.
- [X] T123 [US1] Rewire `apps/web/src/views/backends_view.tsx` — replace every `noop` in the `BackendCard` handler props with real implementations:
  - `onInstall(b)` → opens `VariantPickerDrawer` in `mode="install"`
  - `onRepair(b)` → opens `VariantPickerDrawer` in `mode="repair"` with `preselectedReleaseId = b.install?.release_id`
  - `onValidate(b)` → existing `POST /validate` + SWR revalidate
  - `onInstall` / `onRepair` completion path: on `onStarted(task)` close the drawer, mount the existing `InstallModal` with `eventsSource = useInstallStream(b.id)`, and on modal close fire SWR `mutate("host-backends")`.
  - Keep `onViewDetails` pointing to a placeholder for now — US2 wires the real drawer.
  - `onOpenSettings` / `onOpenDiagnostics` can stay no-op with a TODO-free `sonner.info("not yet wired")` call (no inline comment; no `// TODO`).
- [X] T124 [P] [US1] Replace the ad-hoc fetch at `apps/web/src/views/backends_view.tsx:6-23` with a proper SWR-backed `use_backends` hook in `apps/web/src/hooks/use_api.ts`; keyed `"host-backends"` so T123's `mutate("host-backends")` targets it.
- [X] T125 [US1] Verify the 8-phase `InstallModal` already exported from `apps/web/src/backends/install_modal.tsx` handles `llm.backend.install.completed` → `terminal="completed"` terminal state cleanly when mounted by T123; add a small fix only if a regression surfaces. No rewrite expected.
- [X] T126 [US1] Guard Q1-edge2 (install already in progress) in T122: on drawer open, if `fetchBackendVariants` returns a payload with an in-flight install marker or if SWR data for that backend shows `card_state: "installing"`, skip the picker and open `InstallModal` directly with the current stream.
- [X] T127 [US1] Guard Q1-edge3 (catalog unavailable) in T122: on `error.code === "catalog_unavailable"`, drawer renders an inline "Backend catalog unavailable" message with a retry button instead of the variant list.
- [X] T128 [US1] Remove the `noop` helper from `apps/web/src/views/backends_view.tsx` and add a one-line check in `crates/nexus-api/tests/` (or a repo-level script) that greps for `function noop` inside `apps/web/src/views/backends_view.tsx` and fails if found — satisfies SC-Q1-02 (lint-equivalent smoke check).

**Checkpoint**: Clicking Install on llama.cpp opens picker → POSTs → streams progress → card re-renders installed. Q1-edge1/2/3 all handled. US1 MVP complete; ready to demo.

---

## Phase 4: User Story 3 — Browse + install models from Hugging Face on `/models` (Priority: P1)

**Goal**: `/models` surfaces a Hugging Face search alongside the installed grid; install writes to `host_model_installs` with `owner_extension_id = NULL`, dedups on SHA, and the "Shared by N extension(s)" chip shows accurate counts.

**Independent Test**: Search `llama-3-8b`, filter GGUF, click Install on top result → row appears in `/host-models` + the local-llm extension sees the same row on next activation without re-download; chip reads `Shared by 1`.

### Tests for User Story 3 (mandatory — backend contract)

- [X] T200 [P] [US3] Write `crates/nexus-api/tests/host_models_install_contract.rs` — covers: `201 CREATED` on new install, `200 OK + already_installed=true` on SHA match, `403 model_private` on private-flagged collision (Q3-edge3), `429 hf_rate_limited` when upstream returns 429 (mocked). Asserts envelope shape against `contracts/host_models_install.http`. Must fail against T015 stub.
- [X] T201 [P] [US3] Write `crates/nexus-api/tests/host_model_dependents_contract.rs` — covers: zero dependents (fresh install), 2 dependents (1 lease + 1 declared_dep), `404 not_found` for unknown install_id. Asserts envelope shape against `contracts/host_model_dependents.http`. Seeds `host_model_leases` + synthetic extension manifest rows via the T017 harness.

### Implementation — Backend (Q3 host-scope install)

- [X] T210 [US3] Audit `nexus-models-store::install` in `crates/nexus-models-store/src/install/` to confirm (a) the existing install pipeline accepts `owner_extension_id: Option<String>` and (b) `dedup::find_existing_by_key` returns the full row + `private_model` flag. Capture findings in a 5-line note at the top of `host_models.rs`; fix any Option<String> gap here if present.
- [X] T211 [US3] Implement `install_host_model` handler in `crates/nexus-api/src/handlers/backends/host_models.rs`. Flow:
  1. Parse `InstallHostModelRequest`.
  2. Resolve HF repo → compute expected SHA via existing resolver.
  3. Call `dedup::find_existing_by_key(sha)`; if hit and `!private_model`, return `HTTP 200 OK` with `ModelInstallTaskDto { already_installed: true, install_id: Some(...), routed_backend, task_id: "itask_noop_..." }`.
  4. If hit and `private_model && owner_extension_id != caller`, return `HTTP 403 code="model_private"`.
  5. Otherwise kick off install via `nexus-models-store::install::pipeline::start(InstallRequest { owner_extension_id: None, ... })`, return `HTTP 201 CREATED` with the real task id.
  6. Map HF-429 to `HTTP 429 code="hf_rate_limited"` via a new `RuntimeAdapterError::HfRateLimited(u32)` variant (adds to T011 envelope map).
- [X] T212 [P] [US3] Implement `list_host_model_dependents` handler in `crates/nexus-api/src/handlers/backends/host_models.rs`. Query: JOIN `host_model_leases` on `install_id` (kind="lease") UNION extensions whose manifest declares a compatible model dep (kind="declared_dep"), dedup by `extension_id` preferring `lease`, left-JOIN `extensions` for `display_name`. Return `DependentsResponse`. 404 on unknown install_id.
- [X] T213 [US3] Extend `ModelInstallTaskDto` (wherever it lives — likely `crates/nexus-models-store/src/dto.rs` or generated TS bindings) with `already_installed: bool` (default `false`). Update `InstalledSection` / `ModelsPanel.tsx` consumers to read the new field (non-breaking — default `false`).
- [X] T214 [US3] Wire the new routes in `crates/nexus-api/src/router.rs` swapping stubs for real handlers — T200 + T201 go green.

### Implementation — Frontend (Q3 host-scope HF panel)

- [X] T220 [P] [US3] Extract `HfResultCard` from `apps/web/src/models/ModelsPanel.tsx:84-155` into `apps/web/src/models/hf_result_card.tsx` — same props, zero `extensionId` reference. Import from `ModelsPanel.tsx` for backward-compat.
- [X] T221 [P] [US3] Create `apps/web/src/models/hf_search_panel.css.ts` — search input, filter chips (format / license), result grid (2-col at ≥900px, 1-col below), empty/error states, progress modal reuse. Reuse existing `models_view.css.ts` tokens.
- [X] T222 [US3] Create `apps/web/src/models/hf_search_panel.tsx` — host-scope panel. Props: none (fully self-contained). State: `query`, `format` (default `"gguf"` via family filter), `license`, debounced 300ms. Calls `hfSearch({ q, format, license, limit: 20, page: 1 })`. Renders `HfResultCard` (from T220) with an `onInstall(repoId, files)` that POSTs to `installHostModel(...)`. On dedup (`response.already_installed`) skip modal + toast "already installed — shared with N extension(s)". On new install, open the existing `InstallModal` wired to a new `useHostModelInstallStream(taskId)` hook (T223). On complete: `mutate("host-models")`. ≤300 LOC.
- [X] T223 [US3] Create `apps/web/src/models/hooks/use_host_model_install_stream.ts` that mirrors `use_install_stream` but filters on `topic.startsWith("hf.model.install.") && payload.task_id === taskId`. Stream feeds the `InstallModal` already built in `apps/web/src/backends/install_modal.tsx`.
- [X] T224 [US3] Edit `apps/web/src/views/models_view.tsx` — mount `<HfSearchPanel />` below the installed-models grid under an `<h2>Hugging Face</h2>` heading. Keep existing installed-grid behavior untouched.
- [X] T225 [P] [US3] Add "Shared by N extension(s)" chip to `ModelCard` inside `models_view.tsx`. Use an `IntersectionObserver`-driven lazy `fetchHostModelDependents(install_id)` call; render skeleton while loading. Cache per-row in component state keyed by `install_id` to avoid refetch on scroll churn.
- [X] T226 [US3] Q3-edge1 (HF 429): `HfSearchPanel` surfaces the envelope `retry after Xs` via `sonner.error`; input stays editable; previous results stay rendered.
- [X] T227 [US3] Q3-edge2 (offline): `HfSearchPanel` detects network error (fetch rejects / `navigator.onLine === false`) and shows a persistent in-panel message "Hugging Face unreachable — check your network" with a retry button.
- [X] T228 [US3] Q3-edge3 (private model collision): on `403 model_private`, show `sonner.error("This model is private to another extension.")`; do not open `InstallModal`; result card flips back to its default install button.

**Checkpoint**: `/models` page shows host-installed grid + HF search/install; dedup works; private-flag refuses gracefully; dependents chip renders accurate N on installed rows.

---

## Phase 5: User Story 2 — View Details drawer on backend cards (Priority: P2)

**Goal**: Click **View Details** → right drawer with install metadata + live `LogConsole` + action row (Validate / Repair / Uninstall / Open Settings).

**Independent Test**: On an installed backend, click View Details; drawer opens with correct metadata from `/backends/{id}` and the log console receives live lines as the runtime emits them.

### Tests for User Story 2 (no new backend contract — reuses existing endpoints)

- [X] T300 [US2] No new backend contract — `GET /llm/backends/{id}`, `DELETE /backends/{installId}`, `POST /llm/backends/{id}/validate`, `GET /llm/backends/{id}/logs` all pre-exist. Note in `tasks.md` (here) that US2 is UI-only and intentionally carries no new Rust test.

### Implementation — Frontend

- [X] T310 [P] [US2] Create `apps/web/src/backends/backend_detail_drawer.css.ts` — right-anchored drawer (460px wide, full height), header (name + card_state chip), metadata grid (release_id / platform / accelerator / installed_at / validated_at / checksum), log-console slot (flex-1), action row (sticky bottom). Reuse existing `backends_view.css.ts` tokens.
- [X] T311 [US2] Create `apps/web/src/backends/backend_detail_drawer.tsx`. Props: `backendId`, `onClose`. Body:
  - SWR: `["backend-detail", backendId]` → `GET /llm/backends/{id}`.
  - Mount existing `LogConsole` from `apps/web/src/backends/log_console.tsx`, wired to `GET /llm/backends/{id}/logs` + live WS tail (reuse existing subscription).
  - Action row (visibility matrix per `card_state`):
    - `installed_unvalidated | ready` → Validate + Uninstall + Open Settings
    - `broken` → Repair (opens `VariantPickerDrawer` mode="repair") + Uninstall + Diagnostics
    - `installing | updating` → action row hidden; modal takeover expected
  - Uninstall confirms via a small inline confirm (sonner promise toast pattern), then `DELETE /api/v1/backends/{installId}` (from the install's `runtime_install_id`), closes drawer, fires `mutate("host-backends")`.
  - ≤350 LOC.
- [X] T312 [US2] Rewire `onViewDetails` in `apps/web/src/views/backends_view.tsx` from the US1 placeholder to mount `BackendDetailDrawer`. Ensure only one drawer is open at a time (mutually exclusive with `VariantPickerDrawer` — a small `useState<DrawerKind | null>` in `BackendsView`).
- [X] T313 [US2] Surface validate-failure category inline (FR-Q1-04 acceptance scenario 2): on validate 200 with `overall_ok: false`, render a red banner quoting `failure_category` at the top of the drawer and keep the card state synced via SWR revalidation.
- [X] T314 [US2] Q1-edge6 (drawer mid-install): while a backend is in `installing` or `updating`, `BackendDetailDrawer` renders the live `InstallModal` contents inline instead of the metadata grid (reuses the same stream).

**Checkpoint**: View Details works on all card states; metadata, logs, and actions all live. Uninstall with confirm fires and rolls the card back to NOT INSTALLED.

---

## Phase 6: User Story 4 — DAG editor draft nodes (Priority: P3)

**Goal**: Freshly dropped operator nodes render with an orange dashed border and suppress required-port validation until wired.

**Independent Test**: Drop a node → orange dashed border + no errors in the panel. Wire all required ports → border becomes solid + validation runs. Delete a required edge on a live node → node stays live, normal error appears.

### Tests for User Story 4

- [X] T400 [US4] No new backend contract — pure-frontend change. Spec's design-heavy-UI carve-out explicitly defers per-component vitest tests; no new test tasks here.

### Implementation — Frontend

- [X] T410 [P] [US4] Create `apps/web/src/hooks/use_draft_nodes.ts` — exports `useDraftNodes(workflowId: string)` returning `{ isDraft(id), markDraft(id), promote(id), draftIds(): Set<string> }`. State kept in a ref-backed `Map<string, "draft"|"live">`. Clears on `workflowId` change (`useEffect(..., [workflowId])`). Auto-promotion helper `computePromotions(workflow, specs) -> string[]` that returns node ids whose `required: true` inputs are now all connected; caller iterates + `promote(id)`. Unit-test the pure helpers (no React) via vitest — allowed under the carve-out because the helpers are pure logic, not component integration.
- [X] T411 [P] [US4] Extend `apps/web/src/views/graph_view.css.ts` with a `.nodeDraft` recipe: `border: 1.5px dashed <amber-500>`, `opacity: 0.85`. Confirm the recipe name doesn't collide; if a `.nodeDraft` already exists per spec mention in FR-Q4-02, verify its tokens still match.
- [X] T412 [US4] Edit `apps/web/src/views/graph_view.tsx`:
  - Mount `useDraftNodes(workflow.id)`.
  - On `onNodesChange` of type `add` (or the React Flow add hook), call `markDraft(newNode.id)` for every newly-dropped operator node.
  - After every `onEdgesChange`, call `computePromotions` and fire `promote(id)` for returned ids.
  - Pass `isDraft(node.id)` as `className: draft && styles.nodeDraft` to the React Flow node object.
  - In the save path (`updateWorkflowGraph` call), if any node is still `draft`, block the save and `sonner.error("N nodes are still draft — wire them or mark them live before saving.")`. Highlight draft nodes with a pulsing variant of `.nodeDraft` via a state prop.
- [X] T413 [US4] Edit `apps/web/src/nodes/operator_node.tsx`:
  - Accept new optional `isDraft: boolean` via `OperatorNodeData`.
  - When `isDraft`, suppress the existing "required input disconnected" error rendering and don't emit into the global errors panel.
  - Render subtle "draft" label badge in the node header.
- [X] T414 [US4] Add a right-click "Mark as live" menu item to `apps/web/src/views/canvas_context_menu.tsx` — shows only when the targeted node is draft; dispatches `promote(id)`. Keyboard-accessible via arrow-keys inside the context menu (existing pattern).
- [X] T415 [US4] Q4-edge1 (save with drafts): the T412 save-guard lists every draft node id in the toast + flashes their borders for 1s. Use a ref-backed pulse set so the pulse animation doesn't trigger a re-render storm.
- [X] T416 [US4] Verify FR-Q4-03 explicitly: live-node demotion is never automatic. Add an assertion inside `use_draft_nodes.ts` (`if (prev === "live") return prev`) and a small vitest covering it.

**Checkpoint**: Drop → draft → wire → live transition works; live nodes never demote; save blocks on drafts with a clear error listing node ids.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Docs, deferred frontend tests, code review, quickstart validation.

- [X] T500 [P] Update `crates/nexus-api/README.md` — add the 3 new routes to the endpoint list (variants, host-models install, dependents) with one-line descriptions.
- [X] T501 [P] Update the root `README.md` to link spec 020 under "Recent specs" and note the new `/models` HF panel.
- [X] T502 [P] Run `cargo fmt --all` and `cargo clippy --workspace --all-targets -- -D warnings` across the touched crates; fix any newly-introduced warning.
- [X] T503 [P] Run `cd apps/web && pnpm tsc --noEmit && pnpm eslint .` and fix anything the touched files introduced.
- [X] T504 Execute the `quickstart.md` walkthrough end-to-end on a fresh DB; capture SC metrics (SC-Q1-01 under 90 s install; SC-Q3-01 under 1.5 s HF search P95; SC-Q3-02 under 500 ms dedup; SC-Q4-02 under 100 ms live-node validation) into an inline PR comment.
- [X] T505 [P] Use the **code-reviewer** agent on the Rust side (`crates/nexus-api/src/handlers/backends/**`, `crates/nexus-backend-runtimes/src/manifest/variants.rs`) and the **rust-reviewer** agent on the adapter trait change (T110) to confirm no principle violations.
- [X] T506 [P] Use the **security-reviewer** agent on T211 (host-model install) — it touches the download pipeline + dedup; confirm no path-traversal, no TOCTOU on the SHA check, and that `private_model` access control can't be bypassed by a race between `dedup` and `install`.
- [X] T507 [P] Use the **code-reviewer** agent on the TypeScript side (`apps/web/src/backends/**`, `apps/web/src/models/hf_search_panel.tsx`, `apps/web/src/views/graph_view.tsx`).
- [X] T508 Book a follow-up sprint ticket: "Frontend coverage for spec 020 — VariantPickerDrawer + HfSearchPanel + use_draft_nodes unit + Playwright install happy-path". Link it from `spec.md` § Test strategy. This is the Principle VI carve-out's mandatory follow-up.
- [X] T509 Flip SC-Q1-02 enforcement from the T128 grep into a CI-integrated check (repo-level `pnpm scan:noop` or equivalent) so `noop` handlers can't sneak back into `backends_view.tsx` or `backend_card.tsx`.
- [X] T510 [P] Sweep `apps/web/src/models/ModelsPanel.tsx` for any reference to the old per-extension HF flow that is now dead once US3 is live. Delete dead code only if no in-tree caller remains (check `component_registry.tsx`). If `local-llm` extension still mounts it, keep but annotate the follow-up delete task instead of touching it in this spec.
- [X] T511 Squash any intermediate broken commits on the branch before merge (Principle IX — every `main` merge must pass full `cargo test --workspace`).

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─┐
                 ├─► Phase 2 (Foundational) ─┬─► Phase 3 (US1 — Q1 Install)   ─┐
                 │                           ├─► Phase 4 (US3 — Q3 HF)         ├─► Phase 7 (Polish)
                 │                           ├─► Phase 5 (US2 — View Details) ─┤
                 │                           └─► Phase 6 (US4 — Draft nodes)  ─┘
```

- Phase 2 blocks all US phases (T010 + T014 scaffolding).
- Phase 5 (US2) has a soft dependency on US1: `BackendDetailDrawer` shares the `VariantPickerDrawer` in `mode="repair"`, so US2 starts cleanest after US1 T122 lands. If staffed in parallel, US2 can stub out the repair CTA and fill it in after US1's T122 is done.
- Phases 3, 4, 6 are fully independent of each other.

### User Story Dependencies

- **US1 (P1)**: Foundational only. Delivers MVP.
- **US3 (P1)**: Foundational only. Can ship alongside US1 in parallel.
- **US2 (P2)**: Foundational + benefits from US1's `VariantPickerDrawer` for Repair wiring.
- **US4 (P3)**: Foundational only; fully frontend-isolated.

### Within Each Story

- Backend contract tests (T100, T200, T201) MUST fail against stubs before handler implementation starts (Principle VI).
- Rust handler work precedes or runs in parallel with the frontend client wiring for the same story (frontend can mock with MSW if handler lags).
- Drawer/panel components ship behind the completed handler (no client-side mocks left in repo).

### Parallel Opportunities

- **Setup** T002, T003, T004 in parallel.
- **Foundational** T011, T012, T013, T015, T016 in parallel after T010 + T014 land.
- **US1 handler + US1 frontend** in parallel once T113 compiles: T120/T121/T122/T124 (frontend) run alongside T110–T113 (backend).
- **US1 + US3 + US4** in parallel across three developers after Phase 2.
- **Polish** T500–T503, T505–T507, T510 all parallelizable.

---

## Parallel Example: User Story 1 (MVP) — 3-dev lane

```bash
# Dev A — backend (Rust)
Task: T100 Write backends_variants_contract.rs
Task: T112 project_variants helper + tests
Task: T110 + T111 adapter trait + llamacpp impl
Task: T113 real variants handler

# Dev B — frontend picker (TS)
Task: T120 use_install_stream hook
Task: T121 variant_picker_drawer.css.ts
Task: T122 variant_picker_drawer.tsx
Task: T126 + T127 edge-case branches

# Dev C — frontend wiring (TS)
Task: T124 use_backends SWR hook
Task: T123 rewire BackendsView handlers
Task: T125 + T128 InstallModal sanity + noop guard
```

All three lanes finish → T123 integrates → US1 MVP demoable.

---

## Implementation Strategy

### MVP first (US1 only)

1. Phase 1 (Setup) — 1 dev, ~30 min.
2. Phase 2 (Foundational) — 1 dev, ~2 hrs; needs parallel front+back.
3. Phase 3 (US1 Install) — ~1 day with the 3-lane parallelism above.
4. **STOP + VALIDATE**: manual quickstart steps 1–6. Deploy/demo.

### Incremental delivery

1. US1 lands → demo → merge to main.
2. US3 lands alongside or just after → demo → merge.
3. US2 lands on top of US1's drawer primitive → demo → merge.
4. US4 lands as polish → demo → merge.
5. Phase 7 runs on the composed branch before the final PR to main.

### Parallel team strategy

- Up to 3 devs on US1 (backend Rust / frontend picker / frontend wiring).
- Dev D picks up US3 backend (T200, T201, T210–T214) in parallel to US1.
- Dev E picks up US4 entirely in parallel (frontend-only, no backend touchpoints).
- US2 starts once US1 T122 (VariantPickerDrawer) is merged so Repair wiring has a real target.

---

## Traceability

| Spec section | Task ids |
|---|---|
| FR-Q1-01 (picker populated from `/backends/{id}`) | T100, T110–T113, T122 |
| FR-Q1-02 (recommended badge from MachineDescriptor) | T112, T122 |
| FR-Q1-03 (picker → InstallModal) | T120, T122, T123, T125 |
| FR-Q1-04 (View Details drawer) | T310, T311 |
| FR-Q1-05 (Repair → picker preselected) | T122, T311 |
| FR-Q1-06 (Uninstall DELETE + mutate) | T311 |
| FR-Q3-01 (single `/models` surface) | T224 |
| FR-Q3-02 (reuse `hfSearch` + `HfResultCard`) | T220, T222 |
| FR-Q3-03 (client-side format filter) | T222 |
| FR-Q3-04 (no `installed_by` column) | research.md §1 (no task — deferred) |
| FR-Q3-05 (dedup end-user visible) | T211, T222, T228 |
| FR-Q3-06 (Shared by N chip) | T201, T212, T225 |
| FR-Q4-01 (per-node draft flag) | T410, T412 |
| FR-Q4-02 (orange dashed border + suppress errors) | T411, T413 |
| FR-Q4-03 (no auto-demotion) | T416 |
| FR-Q4-04 (save rejects drafts) | T412, T415 |
| FR-Q4-05 (pure-frontend, no server change) | Phase 6 (no backend tasks) |
| SC-Q1-01 (90 s install) | T504 |
| SC-Q1-02 (no noop) | T128, T509 |
| SC-Q3-01 (1.5 s HF search) | T504 |
| SC-Q3-02 (500 ms dedup) | T211, T504 |
| SC-Q3-03 (shared-by N accurate) | T201, T212, T225 |
| SC-Q4-01 / SC-Q4-02 | T412, T413, T504 |

---

## Notes

- [P] tasks = different files, no upstream-task dependency.
- [Story] labels drive traceability; setup / foundational / polish deliberately have no story label.
- Commit after each task or logical group; every commit must keep `cargo check --workspace` green (Principle IX).
- Stop at every phase checkpoint to validate the story independently.
- No `// TODO` / `// FIXME` markers allowed in production code (Principle IV). If the work is incomplete, land the follow-up task in this tasks.md or the Phase 7 sprint — not a comment.
- `unwrap()` / `expect()` only in tests or proven-unreachable branches (Principle VII).
- Draft node state is intentionally non-persisted; a page reload wipes it, which is acceptable because a loaded-from-server workflow has no unfinished drops by definition.
