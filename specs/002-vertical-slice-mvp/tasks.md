# Tasks: Vertical Slice MVP

**Input**: Design documents from `specs/002-vertical-slice-mvp/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/, research.md, quickstart.md
**Builds on**: Sprint 001 (001-arch-core-setup) — all existing crates, types, traits, and tests remain

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US8)
- Exact file paths included in descriptions

---

## Phase 1: Setup (New Schemas, Migration, Frontend Dependencies)

**Purpose**: Add new JSON schemas, database migration, and install frontend packages for the vertical slice.

- [ ] T001 [P] Create `schemas/recipe-definition.json` — JSON Schema for recipe definitions per contracts/recipe-schema.md
- [ ] T002 [P] Create `schemas/ui-contribution.json` — JSON Schema for UI contributions per contracts/ui-contribution-schema.md
- [ ] T003 [P] Create `migrations/002_recipes_contributions.sql` — add recipes and ui_contributions tables, ALTER extensions (recipe_count, ui_contribution_count, validation_errors), ALTER runs (run_label, execution_profile) per data-model.md
- [ ] T004 Update `apps/web/package.json` — add @vanilla-extract/css, @vanilla-extract/sprinkles, @vanilla-extract/recipes, @vanilla-extract/vite-plugin, @xyflow/react, @dagrejs/dagre dependencies
- [ ] T005 Update `apps/web/vite.config.ts` — add vanilla-extract vite plugin to plugins array

**Checkpoint**: `cargo check` passes. `cd apps/web && npm install` succeeds. Migration SQL is valid.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: API envelope, new storage records/queries, new extension types — shared across all stories.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T006 Implement ApiResponse<T> envelope in `crates/nexus-api/src/envelope.rs` — generic struct with data, meta (timestamp), error fields, IntoResponse impl, convenience constructors (ok, created, paginated, err), status code from error category per contracts/response-envelope.md
- [x] T007 Refactor all existing handlers in `crates/nexus-api/src/handlers/*.rs` to return ApiResponse<T> instead of Json<Value> — health, extensions, operators, workflows, runs, artifacts (update each file)
- [x] T008 [P] Implement RecipeRecord struct in `crates/nexus-storage/src/records.rs` — id, version, display_name, summary, category, extension_id, extension_version, workflow_template_ref, thumbnail, input_summary, bindings, created_at per data-model.md
- [x] T009 [P] Implement UIContributionRecord struct in `crates/nexus-storage/src/records.rs` — id, kind, extension_id, display_name, description, target, supported_types, priority, metadata, availability per data-model.md
- [x] T010 Implement recipe CRUD methods on Database trait in `crates/nexus-storage/src/database.rs` — insert_recipe, get_recipe, list_recipes, list_recipes_by_extension, delete_recipes_by_extension
- [x] T011 Implement UI contribution CRUD methods on Database trait in `crates/nexus-storage/src/database.rs` — insert_ui_contribution, list_ui_contributions, list_ui_contributions_by_kind, list_ui_contributions_by_extension, delete_ui_contributions_by_extension
- [x] T012 Implement recipe CRUD in SqliteDatabase in `crates/nexus-storage/src/sqlite.rs` — SQL queries for the new recipe methods
- [x] T013 Implement UI contribution CRUD in SqliteDatabase in `crates/nexus-storage/src/sqlite.rs` — SQL queries for the new UI contribution methods
- [x] T014 [P] Implement recipe types in `crates/nexus-extension/src/recipe.rs` — RecipeDefinition, RecipeInfo, RecipeFieldBinding serde structs matching the recipe YAML format, parse_recipe_definition function
- [x] T015 [P] Implement UI contribution types in `crates/nexus-extension/src/ui_contribution.rs` — UIContribution, UIContributionKind enum, parse_ui_contribution function, validate against JSON Schema
- [x] T016 [P] Implement tool projection types in `crates/nexus-extension/src/tool_projection.rs` — Tool struct, build_tool_projection function that assembles tools from operators and recipes
- [x] T017 Update `crates/nexus-extension/src/lib.rs` — add pub mod recipe, pub mod ui_contribution, pub mod tool_projection, re-export new types
- [x] T018 Run migration `002_recipes_contributions.sql` in `crates/nexus-storage/src/sqlite.rs` — update SqliteDatabase::new to run both migrations sequentially

**Checkpoint**: `cargo check` passes. New storage methods compile. Extension types parse recipe and UI contribution YAML correctly.

---

## Phase 3: User Story 1 — Extension Discovery, Validation & UI Contribution Indexing (Priority: P1)

**Goal**: Extensions with recipes and UI contributions are discovered, validated, indexed, and exposed through API.

**Independent Test**: Place image-basic example extension in extensions dir. Start host. Query /extensions, /operators, /recipes, /ui/contributions and verify all records appear.

### Implementation for User Story 1

- [x] T019 [US1] Update InMemoryExtensionRegistry in `crates/nexus-extension/src/registry.rs` — add recipe parsing from manifest recipe file refs, UI contribution parsing from manifest, count tracking (recipe_count, ui_contribution_count), validation_errors population on failure
- [x] T020 [US1] Update ExtensionRegistry trait in `crates/nexus-extension/src/registry.rs` — add list_recipes, get_recipe, list_ui_contributions, list_ui_contributions_by_kind methods
- [x] T021 [US1] Implement extension enable/disable state transitions in `crates/nexus-extension/src/registry.rs` — enable_extension (disabled->active, re-index), disable_extension (active->disabled, preserve history), quarantine_extension (active->quarantined)
- [x] T022 [US1] Update ExtensionStatus enum in `crates/nexus-extension/src/manifest.rs` — add Valid, Quarantined variants to the existing enum (or create it if needed), update state transition validation
- [x] T023 [US1] Implement recipe API handlers in `crates/nexus-api/src/handlers/recipes.rs` — GET /recipes (list all), GET /recipes/{id} (get by id) returning ApiResponse per contracts/host-api-v2.md
- [x] T024 [US1] Implement UI contributions API handlers in `crates/nexus-api/src/handlers/ui_contributions.rs` — GET /ui/contributions (with kind/extensionId/targetType filters), GET /ui/contributions/viewers, /commands, /inspectors, /widgets per contracts/host-api-v2.md
- [x] T025 [US1] Implement extension refresh handler in `crates/nexus-api/src/handlers/extensions.rs` — POST /extensions/refresh (rescan all, return discovery report)
- [x] T026 [US1] Implement extension enable/disable handlers in `crates/nexus-api/src/handlers/extensions.rs` — POST /extensions/{id}/enable, POST /extensions/{id}/disable with state transition validation per contracts/host-api-v2.md
- [x] T027 [US1] Update existing GET /extensions handler in `crates/nexus-api/src/handlers/extensions.rs` — include recipe_count, ui_contribution_count, validation_errors in response
- [x] T028 [US1] Mount new routes in `crates/nexus-api/src/router.rs` — /recipes, /recipes/{id}, /ui/contributions, /ui/contributions/viewers, /ui/contributions/commands, /ui/contributions/inspectors, /ui/contributions/widgets, /extensions/refresh, /extensions/{id}/enable, /extensions/{id}/disable
- [x] T029 [US1] Wire recipe and UI contribution indexing into app startup in `crates/nexus-core/src/app.rs` — after extension discovery, persist recipes and UI contributions to database

**Checkpoint**: Start host with example extension. GET /recipes returns recipe. GET /ui/contributions returns viewer + command. POST /extensions/{id}/disable transitions to disabled. POST /extensions/refresh re-scans.

---

## Phase 4: User Story 2 — Worker Launch, Handshake & Protocol Lifecycle (Priority: P1)

**Goal**: Workers report richer handshake info, validate_config works, structured failures propagate correctly.

**Independent Test**: Start host with example extension. Verify worker handshake includes session_id and runtime_info. Send invalid config and verify structured validation response.

### Implementation for User Story 2

- [x] T030 [P] [US2] Extend handshake response handling in `crates/nexus-worker/src/process.rs` — parse and store session_id, runtime_info, supported_methods from handshake response
- [x] T031 [US2] Implement validate_config call in `crates/nexus-worker/src/process.rs` — send validate_config request to worker, return validation result with errors
- [x] T032 [US2] Implement structured failure mapping in `crates/nexus-worker/src/process.rs` — map worker error responses (code, category, message, retryable, details) to WorkerError variants
- [x] T033 [US2] Update WorkerInfo in `crates/nexus-worker/src/manager.rs` — add session_id, runtime_family, supported_methods fields
- [x] T034 [US2] Update Python SDK handshake response in `sdk/python/nexus_sdk/worker.py` — return session_id (uuid4), runtime_info (python version, platform), supported_methods list
- [x] T035 [US2] Update Python SDK error responses in `sdk/python/nexus_sdk/worker.py` — return structured errors with code, category, message, retryable flag

**Checkpoint**: Worker handshake includes full identity. validate_config returns structured validation. Worker failures include retryable flag.

---

## Phase 5: User Story 3 — Workflow Validation, Execution & Run Lifecycle (Priority: P1)

**Goal**: Validate-only endpoint, workflow update, run retry, structured execution errors.

**Independent Test**: POST /workflows/validate with valid and invalid YAML. PUT /workflows/{id} updates version. POST /runs/{id}/retry creates new run from failed predecessor.

### Implementation for User Story 3

- [x] T036 [US3] Implement /workflows/validate handler in `crates/nexus-api/src/handlers/workflows.rs` — POST /workflows/validate accepts YAML, validates without persisting, returns valid bool + node_count + stage_count + errors + warnings per contracts/host-api-v2.md
- [x] T037 [US3] Implement /workflows/{id} PUT handler in `crates/nexus-api/src/handlers/workflows.rs` — update existing workflow with new YAML, validate, increment version, persist per contracts/host-api-v2.md
- [x] T038 [US3] Implement run retry in `crates/nexus-run/src/engine.rs` — retry_run method: verify original run is failed/cancelled, create new run with same workflow + inputs (or overrides), link as predecessor
- [x] T039 [US3] Implement /runs/{id}/retry handler in `crates/nexus-api/src/handlers/runs.rs` — POST /runs/{id}/retry with optional input_overrides, return new run with predecessor_run_id per contracts/host-api-v2.md
- [x] T040 [US3] Update RunRecord in `crates/nexus-storage/src/records.rs` — add run_label, execution_profile, predecessor_run_id optional fields
- [x] T041 [US3] Update run insert/query in `crates/nexus-storage/src/sqlite.rs` — handle new RunRecord fields in INSERT and SELECT queries
- [x] T042 [US3] Mount new routes in `crates/nexus-api/src/router.rs` — POST /workflows/validate, PUT /workflows/{id}, POST /runs/{id}/retry

**Checkpoint**: Validate-only returns structured validation. PUT updates workflow. Retry creates new run from failed predecessor.

---

## Phase 6: User Story 4 — Artifact Registration, Browsing & Provenance (Priority: P1)

**Goal**: Artifact listing with filters, viewer candidates in detail, streamable content.

**Independent Test**: Execute workflow. GET /artifacts?run_id= returns artifacts. GET /artifacts/{id} includes viewer_candidates. GET /artifacts/{id}/content streams payload.

### Implementation for User Story 4

- [x] T043 [US4] Implement artifact listing handler in `crates/nexus-api/src/handlers/artifacts.rs` — GET /artifacts with optional run_id, artifact_type, node_id filters per contracts/host-api-v2.md
- [x] T044 [US4] Update artifact detail handler in `crates/nexus-api/src/handlers/artifacts.rs` — include viewer_candidates field in response: query UI contributions with kind=artifact_viewer, match supported_types against artifact type, order by priority
- [x] T045 [US4] Rename GET /artifacts/{id}/blob to also support GET /artifacts/{id}/content in `crates/nexus-api/src/router.rs` — add alias route
- [x] T046 [US4] Mount artifact list route in `crates/nexus-api/src/router.rs` — GET /artifacts

**Checkpoint**: Artifacts listable with filters. Detail includes viewer candidates from UI contributions. Content streamable.

---

## Phase 7: User Story 5 — Event Streaming & Structured Observability (Priority: P2)

**Goal**: Extension discovery, validation, and worker lifecycle events added to the event stream.

**Independent Test**: Subscribe to WebSocket. Trigger extension refresh. Verify extension.discovered, extension.validated events appear. Crash a worker and verify worker.unhealthy event.

### Implementation for User Story 5

- [x] T047 [P] [US5] Add extension lifecycle events to NexusEvent enum in `crates/nexus-events/src/types.rs` — ExtensionDiscovered { extension_id }, ExtensionValidated { extension_id, valid: bool }, ExtensionActivated { extension_id }, ExtensionDisabled { extension_id }, ExtensionQuarantined { extension_id }
- [x] T048 [US5] Emit extension events during discovery in `crates/nexus-extension/src/registry.rs` — publish ExtensionDiscovered, ExtensionValidated, ExtensionActivated events through EventBus (add EventBus parameter to from_directory and enable/disable methods)
- [x] T049 [US5] Emit worker lifecycle events in `crates/nexus-worker/src/manager.rs` — publish WorkerStarted, WorkerUnhealthy events (WorkerHealthChanged already exists, verify it covers all transitions)
- [x] T050 [US5] Update WebSocket handler in `crates/nexus-api/src/ws.rs` — ensure new event types are serialized and streamed correctly

**Checkpoint**: WebSocket stream includes extension and worker lifecycle events alongside run events.

---

## Phase 8: User Story 6 — Complete Host API Surface (Priority: P2)

**Goal**: System info, tools projection, and all response envelopes finalized.

**Independent Test**: GET /system/info returns host metadata. GET /tools returns normalized operators + recipes. All responses use consistent envelope.

### Implementation for User Story 6

- [x] T051 [US6] Implement /system/info handler in `crates/nexus-api/src/handlers/system.rs` — returns host_version, api_version, protocol_version, supported_runtime_families, supported_spec_versions, workspace_path, platform per contracts/host-api-v2.md
- [x] T052 [US6] Implement /tools handler in `crates/nexus-api/src/handlers/tools.rs` — builds tool projection from operators and recipes using build_tool_projection, supports q and category query filters per contracts/host-api-v2.md
- [x] T053 [P] [US6] Create handlers/mod.rs entries for new handler modules in `crates/nexus-api/src/handlers/mod.rs` — add system, tools, recipes, ui_contributions modules
- [x] T054 [US6] Mount /system/info and /tools routes in `crates/nexus-api/src/router.rs`
- [x] T055 [US6] Verify all endpoints return consistent ApiResponse envelope — spot-check health, extensions, operators, workflows, runs, artifacts, tools, recipes, ui/contributions responses

**Checkpoint**: All 30+ endpoints return consistent envelope. /system/info and /tools work correctly.

---

## Phase 9: User Story 7 — Frontend Shell, Token System & Core Views (Priority: P2)

**Goal**: Professional dark-themed three-zone shell with token system, stage view, graph view, run trace, artifact browser.

**Independent Test**: Open browser. Verify three-zone shell renders. Catalogs populated from host APIs. Stage view shows workflow. Graph view shows DAG. Run trace shows live progress.

### Implementation for User Story 7

- [x] T056 [P] [US7] Create design token contract in `apps/web/src/theme/tokens.css.ts` — createThemeContract with semantic tokens for colors (surface, text, accent, error, success, warning, border), typography (fontFamily, fontSizes, fontWeights, lineHeights), spacing (xxs through xxxl), radius (sm, md, lg, xl), shadows, blur, motion, z-index per frontend design doc
- [x] T057 [P] [US7] Create dark theme in `apps/web/src/theme/dark-theme.css.ts` — createTheme implementing the token contract with dark color palette
- [x] T058 [P] [US7] Create light theme placeholder in `apps/web/src/theme/light-theme.css.ts` — createTheme with light palette (can be minimal stub)
- [x] T059 [P] [US7] Create sprinkles utility in `apps/web/src/theme/sprinkles.css.ts` — defineProperties with responsive conditions, create type-safe atomic utilities for padding, margin, color, background, fontSize, fontWeight, borderRadius, display, flexDirection, alignItems, justifyContent, gap
- [x] T060 [P] [US7] Create component recipes in `apps/web/src/theme/recipes.css.ts` — recipe-based styles for button (variants: primary, secondary, ghost), panel (variants: raised, flat, outline), badge (variants: success, warning, error, info, neutral)
- [x] T061 [P] [US7] Create button component in `apps/web/src/components/button.tsx` — uses recipe variants, token-based styles, no inline colors
- [x] T062 [P] [US7] Create input component in `apps/web/src/components/input.tsx` — token-based input, select, and textarea primitives
- [x] T063 [P] [US7] Create panel component in `apps/web/src/components/panel.tsx` — container with recipe variants (raised, flat, outline)
- [x] T064 [P] [US7] Create status badge component in `apps/web/src/components/status_badge.tsx` — colored badge for run/node/extension states
- [x] T065 [US7] Create three-zone shell layout in `apps/web/src/layout/shell.tsx` — CSS Grid with left rail, center canvas, right inspector zones
- [x] T066 [US7] Create left rail in `apps/web/src/layout/left_rail.tsx` — navigation tabs (Workflows, Tools, Recipes, Extensions), renders active catalog panel
- [x] T067 [US7] Create top bar in `apps/web/src/layout/top_bar.tsx` — workflow title, run controls (Run, Cancel), view switcher (Stage, Graph, Trace, Artifacts)
- [x] T068 [US7] Create right inspector in `apps/web/src/layout/right_inspector.tsx` — renders selected item detail (node config, artifact metadata, run diagnostics)
- [x] T069 [US7] Rewrite stage view in `apps/web/src/views/stage_view.tsx` — token-based, renders stages as columns with nodes, shows per-node run status, uses panel and badge components
- [x] T070 [US7] Create graph view in `apps/web/src/views/graph_view.tsx` — React Flow with dagre layout, read-only (nodesDraggable=false, nodesConnectable=false), stage grouping as background sections, node status coloring during runs
- [x] T071 [US7] Create run trace view in `apps/web/src/views/run_trace_view.tsx` — timeline of node state transitions and progress messages from event stream, live-updating
- [x] T072 [US7] Create artifact browser in `apps/web/src/views/artifact_browser.tsx` — list artifacts by run, select to see detail with viewer candidates from UI contributions, preview for image types
- [x] T073 [US7] Rewrite extension list in `apps/web/src/catalog/extension_list.tsx` — token-based, shows status badges, recipe/operator/contribution counts
- [x] T074 [US7] Create tool catalog in `apps/web/src/catalog/tool_catalog.tsx` — fetches from /tools, shows operators and recipes with category grouping, search filter
- [x] T075 [US7] Create recipe catalog in `apps/web/src/catalog/recipe_catalog.tsx` — fetches from /recipes, shows recipe cards with display name, summary, category
- [x] T076 [US7] Update API client in `apps/web/src/api/client.ts` — add fetchSystemInfo, fetchTools, fetchRecipes, fetchRecipe, fetchUIContributions, refreshExtensions, enableExtension, disableExtension, validateWorkflow, updateWorkflow, retryRun, fetchArtifacts methods; update all methods to handle envelope response (extract data from {data, meta, error})
- [x] T077 [US7] Rewrite main app entry in `apps/web/src/App.tsx` — replace inline scaffold with shell layout, wire view switcher, apply dark theme class to root element
- [x] T078 [US7] Rebuild frontend and verify embedding in `apps/web/` — run npm run build, verify cargo build includes updated dist/

**Checkpoint**: Browser shows professional dark-themed shell. Catalogs populated. Stage view, graph view, run trace, artifact browser all functional.

---

## Phase 10: User Story 8 — Example Image Extension & End-to-End Demo (Priority: P2)

**Goal**: Real image processing extension with resize + grayscale operators, recipe, UI contributions, and complete workflow.

**Independent Test**: Install image-basic extension. Start host. Select recipe. Provide image. Execute. Watch progress. Inspect output with provenance.

### Implementation for User Story 8

- [x] T079 [P] [US8] Create image-basic manifest in `extensions/examples/image-basic/manifest.yaml` — extension id example.image.basic, Python runtime, operators (resize, grayscale), recipes (basic_transform), UI contributions (image_viewer, run_transform_command)
- [x] T080 [P] [US8] Create resize operator definition in `extensions/examples/image-basic/operators/resize.yaml` — inputs: image (image/rgb), outputs: image_out (image/rgb), config: width (int), height (int), resample_method (string, default "lanczos")
- [x] T081 [P] [US8] Create grayscale operator definition in `extensions/examples/image-basic/operators/grayscale.yaml` — inputs: image (image/rgb), outputs: image_out (image/grayscale), config: none required
- [x] T082 [P] [US8] Create recipe definition in `extensions/examples/image-basic/recipes/basic_transform.yaml` — maps sourceImage to input:source_image, targetWidth and targetHeight to resize node config per contracts/recipe-schema.md
- [x] T083 [P] [US8] Create image viewer UI contribution in `extensions/examples/image-basic/ui/image_viewer.yaml` — kind artifact_viewer, supported_types [image/rgb, image/grayscale], priority 10
- [x] T084 [P] [US8] Create command UI contribution in `extensions/examples/image-basic/ui/run_transform_command.yaml` — kind command, display_name "Run Basic Image Transform", invocation recipe_id
- [x] T085 [US8] Create workflow template in `extensions/examples/image-basic/workflows/basic_transform.yaml` — 3 stages (Preparation, Transform, Export), resize_1 -> grayscale_1 -> output, uses image/rgb and image/grayscale port types
- [x] T086 [US8] Create Python worker in `extensions/examples/image-basic/worker/main.py` — uses nexus_sdk BaseWorker, registers resize_handler (Pillow Image.resize) and grayscale_handler (Pillow Image.convert('L')), reads input images from artifact refs, writes output images to artifact write targets, reports progress
- [x] T087 [P] [US8] Create requirements.txt in `extensions/examples/image-basic/worker/requirements.txt` — Pillow>=12.0

**Checkpoint**: Install image-basic. Start host. Operators, recipe, viewer, command all indexed. Execute workflow with a test image. Output artifact viewable with provenance.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Documentation updates, integration tests, CI readiness.

- [x] T088 [P] Update `docs/getting-started.md` — add image-basic extension example alongside hello-world
- [x] T089 [P] Update `docs/extension-guide.md` — add recipe and UI contribution authoring sections
- [x] T090 [P] Update `docs/api-reference.md` — add all new sprint 002 endpoints (system/info, tools, recipes, ui/contributions, refresh, enable, disable, validate, retry, artifacts list)
- [x] T091 [P] Add integration test `crates/nexus-core/tests/recipe_indexing.rs` — test recipe discovery, validation, and API response
- [x] T092 [P] Add integration test `crates/nexus-core/tests/ui_contribution_indexing.rs` — test UI contribution discovery, filtering by kind, viewer candidate resolution
- [x] T093 [P] Add integration test `crates/nexus-core/tests/api_envelope.rs` — test that all endpoints return consistent {data, meta, error} envelope
- [x] T094 Run `cargo fmt --check` across entire workspace and fix formatting
- [x] T095 Run `cargo clippy` across entire workspace and fix all warnings
- [x] T096 Run `cargo test` across entire workspace and verify all tests pass
- [x] T097 Run `cd apps/web && npm run build` and verify frontend builds without errors
- [x] T098 Verify end-to-end: health, extension discovery, workflow submit, run execute, event stream, artifact browse per quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — extension indexing enhancements
- **US2 (Phase 4)**: Depends on Phase 2 — worker protocol enhancements
- **US3 (Phase 5)**: Depends on US1 — needs recipes for validate endpoint context
- **US4 (Phase 6)**: Depends on US1 — needs UI contributions for viewer candidates
- **US5 (Phase 7)**: Depends on US1 + US2 — needs extension + worker events
- **US6 (Phase 8)**: Depends on US1 + US3 + US4 — needs all new types for projection
- **US7 (Phase 9)**: Depends on US6 — needs complete API to populate frontend
- **US8 (Phase 10)**: Depends on US1 + US2 + US3 — needs extension system + execution
- **Polish (Phase 11)**: Depends on all user stories

### User Story Dependencies

```text
Phase 2 (Foundational)
  ├── US1 (extensions + recipes + UI contributions) ← independent
  ├── US2 (worker protocol enhancements)            ← independent
  │     └── US3 (workflow validate + retry)          ← depends on US1
  │     └── US4 (artifact browsing + viewers)        ← depends on US1
  │           └── US5 (event streaming)              ← depends on US1 + US2
  │                 └── US6 (API surface)            ← depends on US1 + US3 + US4
  │                       └── US7 (frontend)         ← depends on US6
  │                             └── US8 (example)    ← depends on US1 + US2 + US3
  └── Polish                                         ← depends on all
```

### Parallel Opportunities

**Phase 1** — T001, T002, T003 are parallelizable
**Phase 2** — T008, T009, T014, T015, T016 are parallelizable
**Phase 3 (US1)** — None significant (sequential dependency chain)
**Phase 4 (US2)** — T030 is parallelizable with T034, T035
**Phase 7 (US5)** — T047 is parallelizable
**Phase 9 (US7)** — T056-T064 are ALL parallelizable (independent component files)
**Phase 10 (US8)** — T079-T084, T087 are ALL parallelizable (independent YAML/Python files)
**Phase 11** — T088-T093 are all parallelizable

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Phase 1: Setup (schemas, migration, frontend deps)
2. Phase 2: Foundational (envelope, storage, extension types)
3. Phase 3: US1 (recipe/contribution indexing, API endpoints)
4. Phase 4: US2 (worker protocol enhancements)
5. **STOP AND VALIDATE**: Extensions indexed with recipes + UI contributions, worker handshake enriched

### Full Execution Pipeline

6. Phase 5: US3 (validate-only, workflow update, run retry)
7. Phase 6: US4 (artifact browsing with viewer candidates)
8. Phase 7: US5 (extension + worker lifecycle events)
9. Phase 8: US6 (system info, tools projection, API completeness)

### Frontend + Demo

10. Phase 9: US7 (token system, shell, views)
11. Phase 10: US8 (image-basic example extension)
12. Phase 11: Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story
- Each user story is independently testable at its checkpoint
- All API handlers MUST return ApiResponse<T> envelope after Phase 2
- The frontend is a full rewrite from inline styles to vanilla-extract tokens
- The image-basic extension replaces hello-world as the primary demo
- No test tasks generated (not explicitly requested)
