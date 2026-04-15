# Spec 008 — Graph Nodes: Canonical Workflow & Node System (enhance-in-place)

**Status:** Draft (rev 2 — enhance-in-place)
**Owner:** host-platform
**Target branch:** `feature/008-graph-nodes`
**Depends on:** 002 (vertical slice), 003 (frontend rework), 004 (extension storage), 005 (local-llm chat)
**Supersedes:** rev 1 of this doc (which proposed a parallel `nexus-workflow-v2` crate). No v2 crate, no `/v2/*` routes, no dual-ship, no migration tool. All changes land in the existing `nexus-workflow`, `nexus-api`, `nexus-run` crates under a single release cadence.

---

## 1. Summary

Evolve the existing `nexus-workflow` subsystem in place to add every capability demanded by `graph-nodes-system-requirements.md` while preserving every capability the platform has today (typed DAG, live editing, validation, canvas persistence, extension-contributed operators, run engine wiring). Delivered in four in-place phases behind a small parser compatibility shim so extensions and the frontend migrate on the same release, not on staggered releases.

---

## 2. Goals

1. **Single canonical model.** One `WorkflowDocument` shape, one set of routes, one extension contract, one planner. Recipe/stage/graph/trace views all project from the same document.
2. **Host-authoritative semantics.** All mutations go through typed host commands. The frontend never mutates the model as the source of truth.
3. **Extension portability.** Operators conform to the single `operator.schema.json` (v0.2). Third-party extensions don't need to pick a v1 or v2 flavor — there's only one.
4. **Headless execution first.** Structured metadata alone is sufficient to validate, edit, and run a workflow.
5. **Reproducibility.** A completed run resolves: workflow version, operator versions, resolved bindings, config snapshot, cache decisions, extension identities.
6. **Progressive UX without drift.** Recipe/stage views remain curated projections; graph edits that break recipe assumptions are surfaced honestly (partial / custom / unmappable).

## 3. Non-goals

- Arbitrary loops, implicit type coercion, extension-owned scheduler logic, graph rewriting during execution, multi-user concurrent editing — deferred past v0.
- Re-authoring shipped workflows from scratch: the parser accepts the old YAML shape indefinitely.

---

## 4. What we keep from today's implementation

| Area | Artifact | Treatment |
|---|---|---|
| Workflow model | `crates/nexus-workflow::{Workflow, NodeInstance, NodeInput, Edge, Stage}` | **Extended.** New fields added; existing fields stay serialization-stable. |
| YAML parser | `crates/nexus-workflow/src/parser.rs` | **Extended with compatibility shim** — accepts the old `inputs: {from}|{value}` shape AND the new `inputs.<name>.source: {kind, ref}` shape. Emits the new shape on re-write. |
| Validation | `validate_workflow` | **Rewritten into a 4-layer pipeline** that emits `ValidationResult { severity, code, ...}`. Old API returns layer-2 errors converted to the new shape for one release, then removed. |
| Storage | `workflows` table + `user_edited_at` | **Extended.** New columns added where sensible; new tables added beside. The `workflows` table itself is not replaced. |
| Edit protection | `persist_workflow_records` | **Unchanged behavior.** |
| DTO codegen | ts-rs into `apps/web/src/api/generated/` | **In-place update.** Existing DTOs gain new fields; optional fields are additive. A few DTOs get breaking reshape (e.g., `WorkflowNodeInputDto`) — frontend migrates in the same release. |
| Canvas state | `CanvasStateDto` + `005_workflow_canvas_state.sql` | **Unchanged.** |
| Run engine | `DefaultRunEngine`, event bus, artifact store, lineage_edges | **Extended.** `NodeExecutionRecord` is replaced by `node_attempts` via a data migration (one-way); event bus gains new families alongside existing ones. |
| Frontend canvas | `graph_view.tsx`, `apps/web/src/nodes/*`, `use_workflow_editor`, `use_canvas_state` | **Retargeted, not rebuilt.** Editor state dispatches typed mutation commands; node components render new badges/tabs. |

## 5. Delta — what changes vs today

| Concern | Today | After |
|---|---|---|
| Workflow schema | no `specVersion` | `specVersion: "0.2"` (seed value; old YAMLs treated as 0.1 and accepted unchanged by the shim) |
| Node inputs | `Record<name, {from} | {value}>` | `inputs[name].source = { kind, ref, transport }` — parser accepts both; writer emits the new shape |
| Parameters | flat `config` + literal inputs | `config` (structural) + `runtimeBindings` + `modelParameters` + `requestParameters` + `ui` |
| Bindings | anonymous edge tuples | `bindingId`, `declaredType`, `resolvedType`, `validationState`, `createdBy/At`, optional `conversionRef` |
| Validation | flat strings | `{severity, code, message, nodeId?, edgeId?, path?, source, suggestedFix?}` |
| Mutation API | whole-workflow `PUT /:id/graph` | typed `POST /workflows/:id/mutate` commands (28 kinds); `PUT /:id/graph` kept for one release as a shim that translates to a batch of commands, then removed |
| Execution record | one row per run per node | `node_attempts` with snapshots, cache decision, structured failure (data migration from `node_executions`) |
| Failures | `error: String` | structured `{category, code, message, details, retryable}` over 10 categories |
| Lineage | `lineage_edges(output, input)` | + `attempt_id`, `binding_id`, `operator_version`, `extension_id`, `cache_decision` |
| Recipe bindings | in-memory `Vec<RecipeFieldBinding>` | persisted `recipe_bindings` table with `mapsTo`, `mappingState`, `visibility`, `scope` per field |
| Capabilities | per-extension manifest | per-operator declaration + `workflow.capabilities_summary` rollup |
| Cache | cacheable bool on operator | `cache_key = hash(structural + model_load + inputs)` — `runtime + request + ui_only` excluded |
| Subgraphs | — | first-class, per-workflow (cross-workflow reuse deferred to P2) |

---

## 6. Architecture

### 6.1 Crate layout

No new crates. All changes in place:

```
crates/
  nexus-workflow/            # extended: new model fields, command engine, 4-layer validator
  nexus-api/
    src/dto/workflows.rs     # DTOs grow; a few reshape
    src/handlers/workflows.rs
      └─ new: /workflows/:id/mutate, /workflows/:id/versions
      └─ kept for 1 release: PUT /:id/graph shim
  nexus-run/
    src/engine.rs            # extended: attempt model, cache-key derivation
  nexus-storage/
    queries/workflows/       # SQL gains new statements for versions + mutations
    migrations 006_*–009_*   # additive tables + one data migration for node_executions
  nexus-extension/           # operator definition schema reshaped in place
```

The `nexus-workflow` crate retains its name, its public path, and its import sites. `WorkflowVersion`, `NodeAttempt`, `MutationCommand`, `Subgraph`, `ValidationResult`, `RecipeBinding`, `CapabilityDeclaration` are new *types in that crate*, not new crates.

### 6.2 Schemas

Four public JSON schemas (replace the existing single `operator-definition.json`):

| File | Purpose |
|---|---|
| `schemas/workflow.schema.json` | Workflow document (pins `specVersion: "0.2"` for new docs; accepts absent for legacy). |
| `schemas/operator.schema.json` | Operator definition with parameter groups, capabilities, node classes. Replaces today's `operator-definition.json`. |
| `schemas/recipe.schema.json` | Recipe with `mapsTo` field bindings. Replaces today's `recipe-definition.json`. |
| `schemas/ui-metadata.schema.json` | UI hints (widgets, preview, collapsed state). |

Plus internal-but-stable payload schemas: `graph-mutation-commands.schema.json`, `validation-result.schema.json`, `node-event.schema.json`, `execution-plan.schema.json`, `run-trace.schema.json`.

Every schema has a round-trip test against every builtin fixture, plus malformed-input rejection tests.

---

## 7. Data model

### 7.1 New SQLite migrations

All additive except `009` which does a one-way data migration.

```
006_workflow_core.sql
  - workflow_versions (id, workflow_id, parent_version_id, command_id, mapping_state, validation_summary, created_at, created_by)
  - node_bindings    (id, workflow_version_id, source_kind, source_ref, source_port, target_node_id, target_port,
                       declared_type, resolved_type, transport, conversion_ref, validation_state, created_by, created_at)
  - subgraphs        (id, workflow_version_id, label, contained_node_ids, exposed_inputs, exposed_outputs, ui)
  - (workflows gains: current_version_id, spec_version, source_kind, source_ref, labels — additive ALTER)

007_mutations_and_attempts.sql
  - graph_mutation_log (id, workflow_id, parent_version_id, resulting_version_id, command_kind, command_json, applied_at, applied_by)
  - validation_results (id, workflow_version_id, severity, code, message, node_id, binding_id, path, source, suggested_fix_json)
  - node_attempts      (id, run_id, node_id, attempt_index, worker_id, lifecycle_state, started_at, ended_at,
                         resolved_config_json, resolved_inputs_json, outputs_json, cache_decision, failure_json, metrics_json)

008_recipe_bindings.sql
  - recipe_bindings          (id, recipe_id, field_id, maps_to_kind, maps_to_ref, visibility, scope, default_source_json, validation_rules_json)
  - recipe_mapping_results   (id, workflow_version_id, recipe_id, field_id, mapping_state, diagnostic_json)

009_capability_and_attempt_backfill.sql
  - node_capability_declarations (id, operator_id, operator_version, capability, details_json)
  - data migration: rows from node_executions are backfilled into node_attempts with attempt_index=1 and lifecycle_state derived from status. node_executions is kept read-only for one release, then dropped.
```

The existing `workflows` table keeps its id and is extended with columns, not replaced.

### 7.2 Rust types (in `crates/nexus-workflow`)

`WorkflowDocument` (the existing `Workflow` struct renamed in a single commit; import sites move):

```rust
pub struct WorkflowDocument {
  pub spec_version: SpecVersion,        // defaults to V0_1 when parsing legacy YAML
  pub id: String, pub version: String, pub title: String,
  pub source: WorkflowSource,
  pub mapping_state: MappingState,
  pub inputs: Vec<WorkflowPort>,
  pub outputs: Vec<WorkflowOutputBinding>,
  pub stages: Vec<Stage>,
  pub subgraphs: Vec<Subgraph>,
  pub nodes: Vec<NodeInstance>,
  pub bindings: Vec<NodeBinding>,
  pub annotations: Map<String, JsonValue>,
}

pub enum NodeInputSource {
  WorkflowInput { ref_: String },
  NodeOutput { node: String, port: String },
  Literal { value: JsonValue },
  RecipeBinding { field_id: String },
  PreviousRunArtifact { run_id: String, artifact_id: String }, // future
  RuntimeContext { key: String },                               // restricted
}
```

The existing `NodeInput::Reference { from }` and `NodeInput::Literal { value }` become sugar over `NodeInputSource::{NodeOutput, Literal}` during parse; the writer emits `NodeInputSource` canonically. See `research.md §Q4`.

---

## 8. API surface

All existing routes remain. New routes added; one legacy route is kept for a single release as a shim.

| Method | Path | Purpose | Lifecycle |
|---|---|---|---|
| GET | `/workflows` | list | unchanged (response gains new summary fields) |
| GET | `/workflows/:id` | hydrated workflow | unchanged (response grows) |
| POST | `/workflows/:id/mutate` | apply `MutationCommand`; returns new version + validation + events | **new** |
| POST | `/workflows/:id/revert` | clear `user_edited_at` | unchanged |
| POST | `/workflows/validate` | validate a payload without persisting | **new** (renamed from `validate-only`) |
| GET | `/workflows/:id/versions` | mutation log for audit | **new** |
| PUT | `/workflows/:id/graph` | legacy whole-payload update | **shim for 1 release** → translates to a batch of commands, then removed |
| GET | `/operators` | operator catalog | unchanged (shape grows) |
| POST | `/recipes/:id/instantiate` | create a workflow from recipe template with bindings | **new** (formalizes today's implicit flow) |
| GET | `/runs/:id/trace` | run trace incl. attempts, lineage, cache decisions | **new** |
| GET | `/events` | SSE | existing event families + new ones |

Mutation commands: 28 kinds (enumerated in `contracts/graph-mutation-commands.schema.json`). Every command is validated, appended to `graph_mutation_log`, produces a new `workflow_versions` row (CoW), and emits a typed `graph_mutation_applied` event.

---

## 9. Validation pipeline (4 layers)

Same as rev 1. Layer 1 (schema) → Layer 2 (graph semantics, reused logic from today's `validate_workflow`) → Layer 3 (operator config JSON schema) → Layer 4 (extension-adapter runtime checks). Each result: `{severity, code, message, nodeId?, bindingId?, path?, source, suggestedFix?}`. Save button disables until layers 1-3 return `error = 0`; layer 4 surfaces as pre-run diagnostics.

---

## 10. Extension contract

Single `operator.schema.json` (v0.2). Extensions rev their operator YAMLs in one release; no dual-publish. Compat: the parser accepts operator YAMLs lacking `parameterGroups` and synthesizes a default group containing all fields under `config`; `capabilities: []`; `nodeClass: ["pure_transform"]` — this lets the local-llm extension upgrade incrementally per operator.

Recipe contract gains `mapsTo: {kind, path}` on every field. Legacy recipes (no `mapsTo`) are treated as binding `{kind: "node_literal_input", path: "<auto-derived>"}` when the field name matches an operator literal input.

SDK helpers in `nexus-sdk`: `operator!` macro (extended), `recipe_binding!` macro (new), `TypedPort<T>` (new), `validation_hook` trait (new). No v2 suffix — these replace the existing helpers in the same release.

---

## 11. Execution lifecycle (node-attempt model)

One row per attempt per node per run. Lifecycle: `pending → blocked → cache_hit | scheduled → starting → running → produced_output → validating_outputs → completed | failed | cancelled | skipped`. Fields: resolved config snapshot, resolved inputs snapshot, cache_decision, structured failure `{category, code, message, details, retryable}`, metrics.

Events carry `attempt_id`. Lineage edges gain `attempt_id`, `binding_id`, `operator_version`, `extension_id`, `cache_decision`.

Migration 009 backfills `node_executions` → `node_attempts` with `attempt_index = 1` and maps `status → lifecycle_state`. `node_executions` stays read-only for one release; dropped in Phase D.

---

## 12. Frontend impact

Keep all canvas code from spec 003. Single-release switch (behind no flag — the types change for real in a PR). Changes:

- `apps/web/src/api/generated/` — existing DTOs grow; `WorkflowNodeInputDto` reshapes from `{from}|{value}` to `{source: {...}}`. One PR migrates all call sites.
- `apps/web/src/hooks/use_workflow_editor.ts` — reducer dispatches typed mutation commands (kept actions are compatible; `connect`, `disconnect`, `setLiteral` now call `/workflows/:id/mutate` with the typed command instead of a whole-payload PUT).
- `apps/web/src/views/graph_view.tsx` — no rebuild. Extends to render subgraph collapsed/expanded state.
- New panels: parameter domain tabs (`Config / Runtime / Model / Generation / Debug`) in the right inspector; mapping + availability badges on operator nodes; capability summary chip on the toolbar.
- Recipe view honors `recipe_mapping_results`: partial/custom/unmappable banners replace silent drift.

Canvas node types (`operator / boundary / reroute / note`) retained.

---

## 13. Phased rollout (in place)

**Phase A — compat shim + scaffolding (week 1).**
- Parser accepts both old `inputs: {from}|{value}` and new `inputs.<name>.source: {...}`.
- Migration 006 lands (tables only; no writes yet).
- Operator/recipe schemas added at `schemas/*.schema.json`; existing files renamed, extension loader reads new names.
- No behavioral change. Existing runs, edits, and extension YAMLs keep working.

**Phase B — mutation engine + attempts + structured validation (weeks 2-3).**
- Migration 007-009 land; data migration from `node_executions` runs once at host boot.
- `POST /workflows/:id/mutate` ships. `PUT /:id/graph` becomes a shim.
- 4-layer validator replaces `validate_workflow`; old flat-string errors gone.
- `engine_v2` logic folds into `DefaultRunEngine::execute_run` (no separate engine) — selects attempt model for all runs.
- Event bus emits new families alongside existing ones.

**Phase C — frontend cutover + parameter-domain UX (week 4).**
- Frontend migrates to new DTO shapes in a single PR.
- Inspector tabs, mapping badges, capability chip, recipe-degradation banners land.
- `local-llm` operators are upgraded in place (YAMLs gain `parameterGroups`, `capabilities`, `nodeClass`).

**Phase D — shim removal (week 5).**
- `PUT /:id/graph` shim deleted.
- `node_executions` table dropped.
- `validate-only` route alias removed (callers use `/workflows/validate`).
- Legacy operator YAMLs without `parameterGroups` rejected (they no longer exist in the tree anyway).

No telemetry-driven delay. No dual-run matrix. No cross-workflow name collisions. Rollback within Phase D is a single-commit revert of the shim removal; Phases A-C are additive or behind the parser shim so they can be rolled back as a normal revert.

---

## 14. Observability & events

Existing events continue. New event families (carry `workflow_version_id`, `run_id?`, `attempt_id?`):
- `graph_mutation_applied`, `validation_completed`, `recipe_mapping_changed`
- `node_attempt_started / progressed / completed / failed`
- `cache_decision_made`, `capability_surface_changed`

(Names carry no `v2.` prefix — there is no v2.)

---

## 15. Testing

| Layer | What | Where |
|---|---|---|
| Schema | 4 public + 5 internal schemas, golden fixtures, malformed rejection | `crates/nexus-workflow/tests/schema.rs` |
| Graph semantics | cycle / required input / operator unavailable / recipe mapping recompute | `crates/nexus-workflow/tests/semantics.rs` |
| Compat shim | old-shape YAML parses identically to new-shape YAML; writer emits new shape | `crates/nexus-workflow/tests/compat.rs` |
| Mutation | 28 commands deterministic; replay produces identical version-id chain | `crates/nexus-workflow/tests/mutation.rs` + `tests/determinism.rs` (proptest) |
| Execution | plan correctness, cache hit, retry, attempt recording, structured failure | `crates/nexus-run/tests/engine.rs` |
| Migration | `node_executions → node_attempts` backfill idempotent | `crates/nexus-storage/tests/migrate_009.rs` |
| Extension | third-party operator adds without host code changes, unavailable extension inspectable | `crates/nexus-extension/tests/operator_contract.rs` |
| Frontend | canvas renders new workflow shape, mutation commands round-trip, inspector tabs correct | `apps/web/tests/graph.spec.ts` (Playwright) |

Target: 80% line coverage on `nexus-workflow`, `nexus-api` before Phase D.

---

## 16. Phased requirements (from §36 of the requirements doc)

### P0 — must land in Phase B
- single canonical workflow model (this)
- versioned operator definitions (schema v0.2)
- typed ports + host-side edge validation with binding identity
- deterministic host mutations + mutation log
- recipe fields bind to canonical graph fields (`mapsTo`)
- node availability + mapping state tracking
- structured parameter domains
- host-owned planning, cache, lineage, and output registration
- extension-safe operator contribution model
- node-attempt events + persistence

### P1 — Phase C
- subgraphs/components (in-workflow)
- deployment entity integration (hooks into spec 007)
- richer validation diagnostics (severity + suggestedFix)
- advanced recipe mapping degradation model
- model-load vs request parameter UX separation

### P2 — post-Phase D
- reusable graph components across workflows
- richer type descriptor registry
- streaming + remote worker contract
- collaborative editing & branching

---

## 17. Acceptance criteria (per phase)

**Phase A.**
1. `cargo test -p nexus-workflow --test compat` green: a workflow YAML in the old input shape parses identically to the same workflow in the new shape.
2. Migrations 006-009 apply cleanly on a fresh DB and on a DB with existing runs.

**Phase B.**
3. `POST /workflows/local_chat_basic/mutate` with `ConnectPorts` returns `{new_version_id, validation_results, workflow}` and emits `graph_mutation_applied`.
4. Removing a required input returns `{severity:"error", code:"required_input_missing", suggestedFix:{...}}` — not a flat string.
5. Running a workflow records one `node_attempts` row per node per attempt, with snapshots + cache_decision + structured failure on error.
6. Replaying the same mutation sequence from the same base version yields identical `workflow_versions.id` chain (determinism).

**Phase C.**
7. Third-party extension adds an operator YAML with `parameterGroups` + `capabilities`; it appears in `/operators` and can be used in a workflow without host source changes.
8. Recipe mapping recomputes on relevant mutations; `partially_mapped` / `custom` banners surface in the UI.
9. Running `quickstart.md` end-to-end succeeds against the upgraded host and frontend.

**Phase D.**
10. `PUT /:id/graph` shim removed; `node_executions` table dropped; no call sites or tests reference them.

---

## 18. Open questions

All inherited from rev 1 and resolved in `research.md` — decisions carry over unchanged: cache key (Q1), undo granularity (Q2), subgraph reuse (Q3), workflow I/O modeling (Q4), conversion UX (Q5), deterministic version hashing (Q7). **Q6 (ts-rs namespace) is now moot** — no `*V2Dto` suffix, no subfolder; DTOs grow in place.

---

## 19. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Breaking DTO reshape (`WorkflowNodeInputDto`) breaks frontend | frontend build red | Land shim + frontend migration in the **same PR**. CI runs `cargo test export_bindings` and `npx tsc --noEmit` together. |
| `PUT /:id/graph` shim has subtle semantic drift from the typed commands | hidden corruption of edits | Shim is a thin translator: it reconstructs the mutation sequence against the current version and replays; property test (`tests/shim.rs`) asserts round-trip equivalence on 1k random payloads. |
| Data migration 009 fails on large production DBs | run history lost | Migration 009 is idempotent and batches (1000 rows / tx); runs once at boot; dry-run mode prints the diff in logs. Original `node_executions` kept read-only for one release. |
| Extensions lag on `parameterGroups` adoption | partial UX regression in inspector | Parser synthesizes a default `config` group for operators without one. Inspector renders a single "Config" tab for those. |
| Compat shim becomes permanent | tech-debt tail | Shim is **time-boxed to Phase D** (week 5). Track with a TODO pinned to the deletion PR number; `rg "SHIM-008"` in CI tops-out at zero after Phase D. |

---

## 20. References

- `C:\Users\lazar\Downloads\graph-nodes-system-requirements.md` — requirements doc driving this spec.
- `specs/002-vertical-slice-mvp/`, `specs/003-frontend-rework/`, `specs/004-extension-storage-contributions/`, `specs/005-local-llm-chat-extension/` — prior groundwork.
- `specs/008-graph-nodes-v2/{research.md, data-model.md, contracts/, quickstart.md}` — feature details; unchanged from rev 1 (semantics are identical; only naming/coexistence machinery dropped).

---

## 21. Diff vs rev 1 (for reviewers)

**Dropped:**
- `nexus-workflow-v2` crate — all work lands in `nexus-workflow`.
- `/v2/*` routes — existing routes evolve; one shim route for a single release.
- Dual-ship of local-llm operators/recipes/workflows.
- `graph.useV2` frontend feature flag.
- `nexus migrate workflow --to v2` CLI and telemetry-driven Phase D gate.
- `*V2Dto` naming and `apps/web/src/api/generated/v2/` subfolder.
- "v2" event-family prefix.

**Kept (unchanged semantics):**
- Every feature from the requirements doc.
- 4 additive SQLite migrations (006-009; now with a data migration in 009).
- All 4 public JSON schemas and 5 internal payload schemas.
- Mutation command set (28 kinds).
- 4-layer validation pipeline with structured results.
- Node-attempt model with 10-category structured failures.
- Subgraphs, recipe mapping states, capability surface.
- Cache-key derivation (`structural + model_load + inputs`).
- Deterministic version hashing (blake3 Merkle chain).

**Added:**
- Parser compatibility shim (Phase A).
- `PUT /:id/graph` route shim (one-release lifetime).
- `node_executions → node_attempts` data migration (009).
- Shim deletion milestone as Phase D exit criterion.
