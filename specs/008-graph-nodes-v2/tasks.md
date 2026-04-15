---
description: "Implementation task list for Graph Nodes (enhance-in-place, rev 2)"
---

# Tasks: Graph Nodes — Canonical Workflow & Node System

**Input**: `specs/008-graph-nodes-v2/{spec.md (rev 2), plan.md (rev 2), research.md, data-model.md, contracts/, quickstart.md}`
**Tests**: Included (TDD mandatory — constitution VIII + IX, replay determinism).
**Supersedes**: rev 1 tasks.md (which targeted a separate v2 crate).

**Organization**: by user story (US1…US6) so each story can land and be evaluated independently. US7 (migration CLI) from rev 1 is **deleted** — no migration needed.

## Format: `[ID] [P?] [Story] Description`

- **[P]** — safe to run in parallel (independent files / no ordering dep)
- **[Story]** — US1…US6, `SETUP`, `FOUND`, or `POLISH`

## Path conventions

- Rust crates: `crates/{nexus-workflow, nexus-api, nexus-run, nexus-storage, nexus-extension, nexus-sdk}/`
- Schemas: `schemas/*.schema.json` (replacing the current `operator-definition.json` / `recipe-definition.json`)
- Frontend: `apps/web/src/{api, hooks, views, nodes, layout}/`
- Fixtures / extensions: `extensions/builtin/local-llm/`
- Specs: `specs/008-graph-nodes-v2/`

---

## Phase 1: Setup (Shared Infrastructure)

- [ ] **T001** [SETUP] Create branch `feature/008-graph-nodes` from `develop`; push `-u`.
- [ ] **T002** [SETUP] [P] Add dev-deps to `nexus-workflow`: `jsonschema 0.45`, `blake3`, `proptest`, `pretty_assertions`. (serde, serde-saphyr, semver, thiserror, tracing already present.)
- [ ] **T003** [SETUP] [P] Copy JSON schemas from `specs/008-graph-nodes-v2/contracts/*.schema.json` to `schemas/*.schema.json`. Rename on copy: `workflow.v2.schema.json → workflow.schema.json`, `operator.v2.schema.json → operator.schema.json` (replacing the current `operator-definition.json` — delete the old file in the same commit), `recipe.v2.schema.json → recipe.schema.json` (replacing `recipe-definition.json`), `ui-metadata.v2.schema.json → ui-metadata.schema.json`.
- [ ] **T004** [SETUP] [P] Update extension loader (`crates/nexus-extension/src/registry.rs`) to read the new schema filenames.
- [ ] **T005** [SETUP] Run `./.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` on the new branch so `CLAUDE.md` reflects the in-place enhancement.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: storage, base types, parser shim, schema loader. Everything downstream waits on these.

**⚠️ Gate**: no user story starts until T020 is green.

- [ ] **T010** [FOUND] Author migration `migrations/006_workflow_core.sql` — tables `workflow_versions`, `node_bindings`, `subgraphs`; ALTER `workflows` to add `current_version_id`, `spec_version`, `source_kind`, `source_ref`, `labels` (all nullable for compat).
- [ ] **T011** [FOUND] Author migration `migrations/007_mutations_and_attempts.sql` — `graph_mutation_log`, `validation_results`, `node_attempts`.
- [ ] **T012** [FOUND] [P] Author migration `migrations/008_recipe_bindings.sql`.
- [ ] **T013** [FOUND] [P] Author migration `migrations/009_capability_and_attempt_backfill.sql` — `node_capability_declarations` + idempotent batched backfill from `node_executions` → `node_attempts`.
- [ ] **T014** [FOUND] Update `crates/nexus-storage/src/sqlite.rs::run_migrations` to include 006-009; swallow `duplicate column` like existing migrations do.
- [ ] **T015** [FOUND] [P] Extend `crates/nexus-workflow/src/types.rs` — `NodeSystemError`, `Severity`, `AvailabilityState`, `MappingState`, `NodeClass`, `Transport`, `ParameterScope`, `CapabilityKind`, `SpecVersion` enums.
- [ ] **T016** [FOUND] [P] Add `crates/nexus-workflow/src/model.rs` types — `WorkflowDocument` (rename of existing `Workflow` + new fields), `NodeBinding`, `Subgraph`, `NodeInputSource`, `ResourceProfile`, `WorkflowVersion`. Keep `Workflow` as a `pub use` alias for one release (deprecated).
- [ ] **T017** [FOUND] Author `crates/nexus-workflow/src/schema.rs` — loads + caches the 4 public JSON schemas; exposes `validate_workflow_doc`, `validate_operator_doc`, `validate_recipe_doc`, `validate_ui_metadata_doc`.
- [ ] **T018** [FOUND] Extend `crates/nexus-workflow/src/parser.rs` — **compat shim**: accept both the old `inputs: {from}|{value}` shape and the new `inputs.<name>.source: {kind, ref}` shape. New `crates/nexus-workflow/src/writer.rs` always emits the new shape.
- [ ] **T019** [FOUND] [P] Author `crates/nexus-workflow/src/version.rs::derive_version_id(parent, command, clock)` per `research.md Q7` (blake3 Merkle chain, second-level ts).
- [ ] **T020** [FOUND] `cargo check -p nexus-workflow -p nexus-storage` clean. `cargo test -p nexus-workflow --test schema` passing.

**Checkpoint**: foundation ready → user stories can start in parallel.

---

## Phase 3: User Story 1 — Host-authoritative mutation engine (Priority: P1) 🎯 MVP

**Goal**: Mutate a workflow through typed commands; each mutation is validated, logged, Merkle-chained, and emits a typed event. `PUT /workflows/:id/graph` becomes a thin shim that translates to a batch of commands.

**Independent Test**: `POST /workflows/<id>/mutate` with a `ConnectPorts` command returns updated workflow + structured validation results; `GET /workflows/<id>/versions` shows the new mutation; SSE subscriber observes `graph_mutation_applied`.

### Tests for US1 (write first, must FAIL)

- [ ] **T101** [P] [US1] `crates/nexus-workflow/tests/schema.rs` — `local_chat_basic.yaml` parses; malformed fixture rejected.
- [ ] **T102** [P] [US1] `crates/nexus-workflow/tests/semantics.rs` — cycle rejection, required-input detection, unknown source/target, type mismatch — each returns a structured `ValidationResult`.
- [ ] **T103** [P] [US1] `crates/nexus-workflow/tests/compat.rs` — old-shape YAML and new-shape YAML round-trip to the same `WorkflowDocument`; writer always emits new shape.
- [ ] **T104** [P] [US1] `crates/nexus-workflow/tests/mutation.rs` — each of the 28 commands applies deterministically; inverse semantics checked where trivial.
- [ ] **T105** [P] [US1] `crates/nexus-workflow/tests/determinism.rs` — proptest: 10 000 random command sequences from the same seed yield identical `version_id` chain.
- [ ] **T106** [P] [US1] `crates/nexus-workflow/tests/shim.rs` — property test: 1 000 random `WorkflowDocument` payloads sent via `PUT /:id/graph` shim converge to the same state as the equivalent mutation command sequence.
- [ ] **T107** [P] [US1] `crates/nexus-api/tests/mutate_contract.rs` — `POST /workflows/:id/mutate` with `ConnectPorts` matches `contracts/api.v2.routes.md` shape.

### Implementation for US1

- [ ] **T110** [US1] `crates/nexus-workflow/src/command/mod.rs` — `MutationCommand` enum + pure `apply(state, cmd, clock) -> (state', version_id, events)`.
- [ ] **T111** [P] [US1] `command/topology.rs` — AddNode, RemoveNode, CloneNode, ReplaceOperator.
- [ ] **T112** [P] [US1] `command/wiring.rs` — ConnectPorts, DisconnectBinding, SetLiteralInput, ClearLiteralInput.
- [ ] **T113** [P] [US1] `command/parameters.rs` — UpdateNodeConfigValue, UpdateRuntimeBinding, UpdateModelParameter, UpdateRequestParameter, UpdateParameterMetadata.
- [ ] **T114** [P] [US1] `command/structure.rs` — AddStage/Remove/Rename/Reorder, AddSubgraph/Collapse/Expand, AddWorkflowInput/Output, RemoveWorkflowInput/Output, MoveNodeToStage/Subgraph, ReorderRecipeFields, RecomputeMappingState.
- [ ] **T120** [US1] `validate/layer1_schema.rs` — delegate to `schema.rs`.
- [ ] **T121** [US1] `validate/layer2_semantics.rs` — port today's `validate_workflow` into `ValidationResult`-emitting form (cycles, required inputs, binding targets, port compat, output bindings).
- [ ] **T122** [US1] `validate/layer3_config.rs` — per-node JSON-schema validation against operator `config` + `modelParameters` + `requestParameters` schemas.
- [ ] **T123** [US1] `validate/mod.rs` — layered runner; short-circuit on layer-1 failure; layer-4 stub in US1 (real adapters in US4).
- [ ] **T130** [US1] `crates/nexus-storage/queries/workflows/*.sql` — new statements: `insert_version`, `list_versions`, `insert_node_binding`, `insert_mutation`, `insert_validation_result`, `update_current_version`.
- [ ] **T131** [US1] `crates/nexus-storage/src/workflow_mutations.rs` — transactional `apply_mutation(workflow_id, parent_version_id, command) -> Result<MutationOutcome>` bundling version row + mutation log + validation results in one SQL tx.
- [ ] **T140** [P] [US1] Extend `crates/nexus-api/src/dto/workflows.rs` — add `WorkflowVersionDto`, `NodeBindingDto`, `MutationCommandDto`, `MutationOutcomeDto`, `ValidationResultDto`, `SuggestedFixDto`. Reshape `WorkflowNodeInputDto` to the `{source: ...}` form. Grow `WorkflowDto` with `spec_version`, `mapping_state`, `bindings`, `subgraphs`, `capabilities_summary`.
- [ ] **T141** [US1] Extend `crates/nexus-api/src/handlers/workflows.rs` — new handlers: `mutate_workflow` (`POST /:id/mutate`), `list_versions` (`GET /:id/versions`), `validate_workflow_payload` (`POST /validate`, rename from `validate-only`). Keep `update_workflow_graph` (`PUT /:id/graph`) **as a shim**: translates the payload diff into a batch of mutation commands and applies them via `apply_mutation` in a loop.
- [ ] **T142** [US1] `crates/nexus-api/src/router.rs` — register new routes; mark `PUT /:id/graph` with `#[deprecated(note = "SHIM-008 — remove at Phase D")]`.
- [ ] **T143** [US1] Extend `crates/nexus-events/src/types.rs` — add `GraphMutationApplied`, `ValidationCompleted`, `RecipeMappingChanged`.
- [ ] **T144** [US1] `cargo test -p nexus-api export_bindings` — regenerate TS; commit the reshaped `apps/web/src/api/generated/*.ts`.

**Checkpoint**: US1 complete ⇒ acceptance criteria §17.3, §17.6 pass; quickstart steps 1-7 succeed.

---

## Phase 4: User Story 2 — Structured validation with actionable suggestedFix (Priority: P1)

**Goal**: Every validation issue carries `{severity, code, message, nodeId?, bindingId?, path?, source, suggestedFix?}`. The inspector renders one-click fix actions (explicit conversion insertion, required-input wiring hint).

**Independent Test**: Remove a required input → response lists `required_input_missing` with `suggestedFix.kind === "connect_port"` referencing a compatible candidate source.

### Tests for US2 (write first, must FAIL)

- [ ] **T201** [P] [US2] `crates/nexus-workflow/tests/suggested_fix.rs` — for every validation code, assert `suggestedFix` is populated when a fix exists and absent when ambiguous.
- [ ] **T202** [P] [US2] Malformed YAML returns `source: "host_schema"` (not `host_graph`).

### Implementation for US2

- [ ] **T210** [US2] `crates/nexus-workflow/src/validate/fix_suggestions.rs` — pure `suggest_fix(&ValidationResult, &WorkflowDocument, &OperatorRegistry) -> Option<SuggestedFix>`. Heuristics: `required_input_missing` → find compatible upstream output; `type_mismatch` → registry lookup for conversion operator.
- [ ] **T211** [US2] Extend `layer2_semantics.rs` to call `suggest_fix` per result.
- [ ] **T212** [US2] `ValidationResultDto.suggested_fix` populated end-to-end; regenerate TS.

**Checkpoint**: US2 ⇒ §17.4.

---

## Phase 5: User Story 3 — Node-attempt execution model (Priority: P1)

**Goal**: Every run writes one `node_attempts` row per attempt per node with resolved config/inputs snapshot, cache_decision, structured failure. Events carry `attempt_id`. `node_executions` backfilled by migration 009.

**Independent Test**: Execute `local_chat_basic`; `GET /runs/:id/trace` returns `attempts[]` with `lifecycle_state: "completed"` and `cache_decision: "miss"` on first run, `hit` on a second identical run.

### Tests for US3 (write first, must FAIL)

- [ ] **T301** [P] [US3] `crates/nexus-run/tests/engine.rs` — plan correctness, attempt recording, cache miss → hit on second identical run.
- [ ] **T302** [P] [US3] Structured failure path: forced `model_unavailable` → assert `failure.category`, `retryable`, `details`.
- [ ] **T303** [P] [US3] Retry policy: retryable failure produces `attempt_index 1, 2, 3` in order.
- [ ] **T304** [P] [US3] `crates/nexus-storage/tests/migrate_009.rs` — backfill from `node_executions` → `node_attempts` is idempotent; re-running doesn't duplicate rows.

### Implementation for US3

- [ ] **T310** [US3] Extend `crates/nexus-run/src/engine.rs` — fold attempt-model logic into `DefaultRunEngine::execute_run` (no separate `engine_v2` since there is no v2).
- [ ] **T311** [US3] `crates/nexus-run/src/attempt.rs` — `NodeAttempt` struct + `lifecycle_transition(state, event)` enforcement.
- [ ] **T312** [US3] `crates/nexus-workflow/src/cache.rs::derive_cache_key(node, resolved_inputs)` per `research.md Q1`.
- [ ] **T313** [US3] `crates/nexus-storage/queries/workflows/node_attempts_*.sql` + `Database::insert_node_attempt`, `get_run_trace`.
- [ ] **T314** [US3] `crates/nexus-api/src/handlers/runs.rs` — `GET /runs/:id/trace` (new handler).
- [ ] **T315** [US3] Extend `crates/nexus-events/src/types.rs` — `NodeAttemptStarted / Progressed / Completed / Failed`, `CacheDecisionMade`.

**Checkpoint**: US3 ⇒ §17.5.

---

## Phase 6: User Story 4 — Extension operator contract (parameter groups, capabilities, node classes) (Priority: P1)

**Goal**: Single `operator.schema.json` (v0.2). Extensions upgrade their YAMLs; parser synthesizes defaults for fields absent from legacy YAMLs so upgrades are incremental per operator, not all-or-nothing.

**Independent Test**: Author a throw-away `extensions/test-op/` with one operator YAML (with `parameterGroups`, `capabilities`, `nodeClass`) → on boot it appears in `/operators` without host source changes.

### Tests for US4 (write first, must FAIL)

- [ ] **T401** [P] [US4] `crates/nexus-extension/tests/operator_contract.rs` — dynamic fixture extension loaded, operator parsed, indexed.
- [ ] **T402** [P] [US4] An operator YAML missing `parameterGroups` parses; parser synthesizes a default `config` group containing all declared fields; `capabilities: []`, `nodeClass: ["pure_transform"]`.
- [ ] **T403** [P] [US4] Loading an extension with an invalid `specVersion` yields a structured `ExtensionLoadError` and does not poison the registry.

### Implementation for US4

- [ ] **T410** [US4] Reshape `crates/nexus-extension/src/operator.rs` — `OperatorDefinition` gains `node_class`, `parameter_groups`, `capabilities`; parser synthesizes defaults when fields are absent.
- [ ] **T411** [US4] `crates/nexus-extension/src/registry.rs` — indexed by `(id, semver)`; lookup surfaces availability state.
- [ ] **T412** [US4] Extend `crates/nexus-api/src/handlers/operators.rs` — response shape grows; no new route.
- [ ] **T413** [P] [US4] Upgrade `extensions/builtin/local-llm/operators/*.yaml` in place — add `parameterGroups` + `capabilities` + `nodeClass`. Operators: `chat_turn`, `prompt_compose`, `output_persist`, `embed_text`, `rag_retrieve`.
- [ ] **T414** [P] [US4] Upgrade `extensions/builtin/local-llm/workflows/*.yaml` — add `specVersion: "0.2"`. YAMLs work under both the compat-shim parser (legacy shape) and the new writer (after first re-save).
- [ ] **T415** [P] [US4] Upgrade `extensions/builtin/local-llm/recipes/*.yaml` — add `mapsTo` per field.
- [ ] **T416** [US4] `crates/nexus-sdk` — extend `operator!` macro, add `recipe_binding!`, add `TypedPort<T>`, `validation_hook` trait.
- [ ] **T417** [US4] `validate/layer4_runtime.rs` — dispatch model-file-exists + backend-compat checks to local-llm's adapter via the existing worker protocol (stubs from US1 replaced with real calls).

**Checkpoint**: US4 ⇒ §17.7.

---

## Phase 7: User Story 5 — Subgraphs + recipe mapping state + capability surface (Priority: P2)

**Goal**: Recipe view degrades honestly. Subgraphs collapse/expand. Workflow header lists elevated capabilities (fs/net/gpu/process/model-registry) introduced by any node.

**Independent Test**: Edit a recipe-bound parameter via `/workflows/:id/mutate`; `recipe_mapping_results` recomputes; response carries `mapping_state: "partially_mapped"` with a per-field diagnostic.

### Tests for US5 (write first, must FAIL)

- [ ] **T501** [P] [US5] `crates/nexus-workflow/tests/mapping.rs` — recompute: `fully_mapped → partially_mapped` when user overrides a recipe-bound field; back to `fully_mapped` on reset.
- [ ] **T502** [P] [US5] `crates/nexus-workflow/tests/subgraphs.rs` — `AddSubgraph` + `CollapseSubgraph` keep `contained_node_ids` non-overlapping; planner still topo-orders all nodes.
- [ ] **T503** [P] [US5] `crates/nexus-api/tests/capability_summary.rs` — workflow containing a `gpu.compute` operator surfaces the capability in `GET /workflows/:id`.

### Implementation for US5

- [ ] **T510** [US5] `crates/nexus-workflow/src/mapping.rs::recompute(workflow, recipe_bindings)`; aggregates to workflow-level state.
- [ ] **T511** [US5] Extend `apply()` to call `recompute` after every command that touches a recipe-bound field; emit `RecipeMappingChanged` on state transition.
- [ ] **T512** [US5] Populate `Subgraph` in `model.rs`; validator rejects overlapping `contained_node_ids`.
- [ ] **T513** [US5] `crates/nexus-workflow/src/capability.rs::aggregate(workflow, operator_registry) -> Vec<CapabilityKind>`.
- [ ] **T514** [US5] `GET /workflows/:id` response includes `capabilities_summary`, `mapping_state`, `recipe_mapping_results[]`.

**Checkpoint**: US5 ⇒ §17.8.

---

## Phase 8: User Story 6 — Frontend command dispatcher + parameter-domain inspector + mapping badges (Priority: P2)

**Goal**: Editor state emits typed mutation commands (not whole-payload PUTs). Inspector separates parameters into tabs by `scope`. Mapping + availability badges render on operator nodes. Capability summary chip renders on the toolbar.

**Independent Test**: Drag an edge on a shipped workflow → SSE stream emits `graph_mutation_applied` with `ConnectPorts`. Open the inspector on `chat_turn` → Temperature appears under "Generation", quant/GPU-layers under "Model".

### Tests for US6 (write first, must FAIL)

- [ ] **T601** [P] [US6] `apps/web/tests/graph.spec.ts` (Playwright) — drag an edge; observe SSE emits `graph_mutation_applied` with `ConnectPorts`.
- [ ] **T602** [P] [US6] `apps/web/tests/inspector.spec.ts` — parameter-domain tab labels render; fields land in the correct tab by `scope`.

### Implementation for US6

- [ ] **T610** [US6] Refactor `apps/web/src/hooks/use_workflow_editor.ts` — reducer dispatches mutation commands; `dirty` derived from pending command queue length.
- [ ] **T611** [US6] NEW `apps/web/src/hooks/use_mutations.ts` — typed client; optimistic update then reconcile with server response.
- [ ] **T612** [US6] Extend `apps/web/src/views/graph_view.tsx` — wire `onConnect / onEdgesDelete / onNodesDelete` through `use_mutations` instead of the old whole-payload PUT. Existing `__inputs__`/`__outputs__` translation stays in the canvas layer.
- [ ] **T613** [US6] NEW `apps/web/src/layout/right_inspector_tabs.tsx` — tabbed inspector driven by `operator.parameterGroups`; `scope` → tab mapping.
- [ ] **T614** [US6] Extend `apps/web/src/nodes/operator_node.tsx` — show availability badge + mapping badge (driven by new `node.data` fields).
- [ ] **T615** [US6] Extend `apps/web/src/catalog/workflow_catalog.tsx` — "Edited" badge unchanged; new "Partially mapped" / "Custom" chips per workflow mapping_state.
- [ ] **T616** [US6] Extend `apps/web/src/views/graph_toolbar.tsx` — capabilities chip driven by `workflow.capabilities_summary`.

**Checkpoint**: US6 ⇒ quickstart step 10 green; §17.9 passes.

---

## Phase 9: Polish & Phase D shim removal

- [ ] **T801** [P] [POLISH] `docs/CODEMAPS/graph-nodes.md` — refresh via `update-codemaps` skill.
- [ ] **T802** [P] [POLISH] Update top-level `README.md` with "Graph Nodes" section (required by constitution VI).
- [ ] **T803** [POLISH] `cargo fmt` + `cargo clippy --all-targets -- -D warnings` clean.
- [ ] **T804** [POLISH] `apps/web`: `npx tsc --noEmit && npx vite build` clean.
- [ ] **T805** [POLISH] Execute `specs/008-graph-nodes-v2/quickstart.md` end-to-end on a clean DB; fix any doc drift (including renaming `localhost:8080/v2/...` → `localhost:8080/...`).
- [ ] **T806** [POLISH] Coverage gate: `cargo tarpaulin --packages nexus-workflow --packages nexus-api --out Xml`; fail PR if < 80%.
- [ ] **T807** [POLISH] `crates/nexus-workflow/tests/regression.rs` — keep one fixture per fixed bug (starting with: the `__inputs__` leak from v1).
- [ ] **T808** [POLISH] Housekeeping: prune `graph_mutation_log` older than 50 versions back per workflow.
- [ ] **T809** [POLISH] Security review sweep — layer-4 adapter timeouts fail-closed; mutation validation before any DB write.
- [ ] **T810** [POLISH] **Phase D — shim removal.** Delete `PUT /workflows/:id/graph` shim handler + router entry + tests. Drop `node_executions` table via a new migration `010_drop_node_executions.sql`. Remove `Workflow` alias (keep only `WorkflowDocument`). Confirm `rg "SHIM-008"` returns zero across the repo. This is its own PR after Phases A-C have baked for ≥ 1 release on `develop`.

---

## Dependencies & execution order

```
Setup (T001-T005)
   ↓
Foundational (T010-T020)              ← blocks every user story
   ↓
┌─ US1 (T101-T144) ─ MVP               ← everything else depends on mutation engine + DTOs
│     ↓
│   US2 (T201-T212)                    ← needs US1 ValidationResult
│     ↓
│   US3 (T301-T315)                    ← needs US1 workflow_versions + engine hook
│
│   US4 (T401-T417)                    ← can start after US1 (registry bits) + US3 (engine routing)
│
│   US5 (T501-T514)                    ← needs US4 operator capability metadata + US1 mutations
│
│   US6 (T601-T616)                    ← needs US1 DTOs + US5 badges
└──
   ↓
Polish (T801-T809)
   ↓
Phase D shim removal (T810)            ← ≥ 1 release after T805 ships to develop
```

### Parallel opportunities at a glance

- **Setup**: T002 + T003 + T004 parallel after T001.
- **Foundational**: T012 + T013 parallel to T010 + T011; T015 + T016 + T019 parallel to T017 + T018.
- **US1 commands**: T111 + T112 + T113 + T114 parallel (separate files, same enum).
- **US4 YAMLs**: T413 + T414 + T415 parallel.
- **US5 components**: T510 / T512 / T513 parallel (separate files).
- **Polish**: T801 + T802 parallel; T803 + T804 parallel.

---

## Parallel Example — US1 command implementation

```bash
cargo test -p nexus-workflow command::topology   # T111 (AddNode/Remove/Clone/ReplaceOperator)
cargo test -p nexus-workflow command::wiring     # T112 (Connect/Disconnect/Set/ClearLiteral)
cargo test -p nexus-workflow command::parameters # T113 (Update*Value/RuntimeBinding/Model/Request/Metadata)
cargo test -p nexus-workflow command::structure  # T114 (Stages/Subgraphs/WorkflowIO/RecipeFields/Recompute)
```

All land in `apply()` (T110) through the same enum — no cross-file contention.

---

## Exit criteria per story

| Story | Exit |
|---|---|
| **US1** | `spec.md §17.3 + §17.6` (mutation round-trip, deterministic version chain) |
| **US2** | `§17.4` (structured validation with suggestedFix) |
| **US3** | `§17.5` (node-attempt model + migration 009) |
| **US4** | `§17.7` (third-party operator works without host source changes) |
| **US5** | `§17.8` (recipe mapping + subgraph + capability summary) |
| **US6** | `§17.9` (quickstart §10 green end-to-end) |
| **Phase D** | `§17.10` (shim removed; `node_executions` dropped) |

When US1-US4 land, we're at the end of **Phase B**. US5-US6 close **Phase C**. T810 closes **Phase D**. No v1/v2 parity matrix, no migration CLI, no dual-ship — because there is no v2.
