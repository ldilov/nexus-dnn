# P3: Submit routes + run-engine consumption point — Implementation Plan (nexus-dnn, 2026-06-23)

> **Cross-phase contracts:** All shared shapes/numbers/routes per `2026-06-23-recipes-00-CONTRACTS.md` —
> this plan does not re-derive them.

## Goal

Wire the `nexus-recipe` binding compiler (delivered in P2) into two HTTP submit surfaces and one run-engine
consumption point, so a recipe is validated and fanned-out before anything executes. Done looks like:
(1) `POST /api/v1/recipes/{id}/run` and the extended `POST /api/v1/deployments/{id}/runs` both accept
`{ control_values, preset_id? }`, run `compile_recipe_run`, and submit a run; (2) the run engine gains
`create_run_from_resolved` that persists the FROZEN resolved graph and makes `execute_run` plan from that frozen
snapshot instead of re-reading the head `workflows` row; (3) for the deployment surface the revision snapshot is
authoritative and the handler asserts the recipe pin matches it, rejecting on divergence. The legacy opaque
`inputs` blob path stays available behind a one-release deprecation flag.

## Current state (verified)

Re-read against current `main` (HEAD `edb5b870`, 2026-06-23). The 2026-06-14 design's run-engine/submit picture
holds; only line numbers drifted. CORRECTED anchors:

- **Run engine skeleton.** `DefaultRunEngine::create_run(workflow_id: &str) -> Result<String, RunError>` at
  `crates/nexus-run/src/engine.rs:42` reads the workflow row by id and inserts a `RunRecord` (status `created`).
  `execute_run(run_id)` at `engine.rs:79` re-reads the workflow via `get_workflow(run_record.workflow_id)`
  (`engine.rs:89-93`), runs `validate_dag` + `create_execution_plan`, then loops `execute_step`. `execute_step`
  (`engine.rs:204`) writes a literal `b"placeholder"` artifact via `create_artifact_for_step` (`engine.rs:313`).
  This is the skeleton the design names — real execution is extension-side; P3 must NOT make it a real executor.
- **`POST /runs` body is workflow-id only.** `CreateRunRequest { workflow_id: String }` at
  `crates/nexus-api/src/handlers/runs.rs:13-16`; handler `create_run` (`runs.rs:18`) calls
  `run_engine.create_run` then fire-and-forget `tokio::spawn(execute_run)` (`runs.rs:30-34`). No inputs field.
- **Deployment run handler + service.** Route `.route("/{id}/runs", post(run))` at
  `crates/nexus-api/src/handlers/deployments/handlers.rs:46` (design said `:44` — DRIFT, presets routes added at
  `:50-55`). `RunBody { revision_id: Option<String>, inputs: Option<Value>, run_id: String }` at `handlers.rs:278`;
  handler `run` at `handlers.rs:285`. It builds `DeploymentExecuteService` and calls
  `svc.execute(&did, rev.as_ref(), &inputs, &body.run_id)`, returning `202 ACCEPTED`. **run_id is CLIENT-SUPPLIED**
  and the engine is NEVER invoked here — the deployment path only records a deployment→run link + hash.
- **`execute.rs` hashes inputs, never threads them.** `DeploymentExecuteService::execute` at
  `crates/nexus-deployments/src/service/execute.rs:28` folds `inputs: &Value` into a JCS `context_payload`
  (`execute.rs:53-58`) → `sha256_jcs` → `execution_context_hash`. There is **no opaque inputs blob path** — inputs
  are hash-only, never persisted as a blob nor replayed. Correct the design where it implies a blob. Blocks on
  `restore_state` (`execute.rs:36-46`); inserts run_link `executed_from` + `record_run(...)`.
- **Revision pin columns exist.** `migrations/011_deployments.sql:49-57` — `base_workflow_ref`,
  `base_workflow_version_ref` (`:50`), `workflow_snapshot_id` (`:55`), `effective_workflow_hash` NOT NULL (`:57`).
  Migration 011 registered at `crates/nexus-storage/src/sqlite/migrations.rs:72`. The `runs` table gained
  `deployment_id` / `deployment_revision_id` / `execution_context_hash` (`011_deployments.sql:241-243`).
- **RunRecord** at `crates/nexus-storage/src/records.rs:100-113` — `id, workflow_id, workflow_version, status,
  started_at, completed_at, error, created_at, run_label, execution_profile, predecessor_run_id`. No frozen-graph
  column yet; the run-scoped snapshot is net-new P3 storage.
- **Recipe handlers** are GET-only and live in a FLAT module: `list_recipes`/`get_recipe` at
  `crates/nexus-api/src/handlers/recipes.rs:10/23`, routed at `crates/nexus-api/src/router.rs:234-235`. P3 promotes
  this flat file to a `handlers/recipes/` directory (CONTRACTS C7, step 7) and adds the net-new run route.
- **Migration numbering.** Per CONTRACTS C1 (the migration ledger), P3 owns **`028_run_resolved_graph.sql`**
  (`026`→P0, `027`→P1). Migrations are HAND-REGISTERED via `include_str!` in `migrations.rs` `run_migrations` —
  a new `.sql` is INERT until appended.

Upstream prerequisites that P3 CONSUMES (HARD preconditions — P3 cannot land if any is absent): the
`crates/nexus-recipe` crate exposing
`compile_recipe_run(projection, snapshot, control_values, preset_id) -> Result<ResolvedRun, BindingError>`,
the `ResolvedRun` type, the public `validate_node_config` wrapper (P2), the
`recipes.workflow_id`/`workflow_version` pin + cached `status` (P1), and from **P0**: the `workflow_versions`
table, the `nexus_workflow::WorkflowVersionSnapshot` type, AND the `get_workflow_version(workflow_id, version)`
storage read. **Per CONTRACTS C2, P0 owns `get_workflow_version` and P0 delivery is a HARD precondition** —
P3 does NOT add it as a fallback step. See Dependencies & sequencing.

## Approach

Three slices, sequenced P3a → P3b → P3c, each independently RED-testable:

- **P3c first (consumption point, run engine).** Add `create_run_from_resolved(resolved: &ResolvedRun)` to
  `DefaultRunEngine` that persists the frozen graph against the run and stores `resolved_inputs`, then make
  `execute_run` plan from the frozen snapshot rather than `get_workflow(workflow_id)`. This is the foundation both
  submit routes depend on, and the only piece testable purely in `nexus-run`/`nexus-storage`.
- **P3a (ad-hoc recipe run route).** New generic-by-`:id` host route `POST /recipes/{id}/run`. Handler loads the
  recipe → loads its pinned `workflow_versions` snapshot → `compile_recipe_run` → `create_run_from_resolved` →
  spawn `execute_run` → return run id. Host-owned rows only; zero extension-id literals.
- **P3b (deployment run route).** Extend `RunBody` and `DeploymentExecuteService::execute` to accept
  `{ control_values, preset_id? }`, route through `compile_recipe_run` with the **deployment revision snapshot as
  authoritative** for the graph, assert the recipe pin matches the revision snapshot (reject on divergence), then
  call `create_run_from_resolved`. Keep the legacy `inputs` blob accepted behind a deprecation flag for one release.

A new run-scoped snapshot store reuses the `workflow_versions` JSON shape (nodes/edges/inputs/outputs/stages +
resolved_inputs) keyed by `run_id`. Persist as a new migration `028_run_resolved_graph.sql` (CONTRACTS C1).
Two boundary tests run (CONTRACTS C7): the existing `cargo test -p nexus-recipe --test boundary_test` (walks only
`nexus-recipe/src`), and a **net-new nexus-api-side boundary test** stood up by P3 that walks the new
`handlers/recipes/` directory + the extended deployments run handler.

## Changes (ordered steps)

### P3c — run-engine consumption point

1. **`migrations/028_run_resolved_graph.sql`** (new, CONTRACTS C1). Create `run_resolved_graphs` (host-generic):
   `run_id TEXT PRIMARY KEY REFERENCES runs(id) ON DELETE CASCADE`, `workflow_id TEXT NOT NULL`,
   `workflow_version TEXT NOT NULL`, `nodes TEXT NOT NULL`, `edges TEXT NOT NULL`, `inputs TEXT NOT NULL`,
   `outputs TEXT NOT NULL`, `stages TEXT NOT NULL`, `resolved_inputs TEXT NOT NULL`, `created_at TEXT NOT NULL`.
   Pure `CREATE TABLE` (no ALTER). Why: a run must carry the frozen graph + resolved inputs so execution sees the
   fanned-out values, not the head workflow.

2. **`crates/nexus-storage/src/sqlite/migrations.rs`** — append
   `execute_migration_statements(pool, include_str!("../../../../migrations/028_run_resolved_graph.sql"), false).await?;`
   in numeric order after P1's `027` block (which itself follows the 025 block at `~migrations.rs:157-162`). Why:
   migrations are inert until registered (the known prior root-cause class). `false` because it is a pure CREATE
   (CONTRACTS C1).

3. **`crates/nexus-storage/src/records.rs`** — add `RunResolvedGraphRecord` mirroring the table columns. Add
   `crates/nexus-storage/queries/runs/insert_resolved_graph.sql` + `get_resolved_graph.sql`. Extend the `Database`
   trait (`crates/nexus-storage/src/database.rs`) with `insert_run_resolved_graph(&RunResolvedGraphRecord)` and
   `get_run_resolved_graph(run_id) -> Result<RunResolvedGraphRecord, StorageError>`; implement on
   `SqliteDatabase` (`crates/nexus-storage/src/sqlite/`). Why: frozen-graph persistence is the storage contract
   `create_run_from_resolved` writes and `execute_run` reads.

4. **`crates/nexus-run/src/engine.rs`** — add
   `pub async fn create_run_from_resolved(&self, resolved: &ResolvedRun) -> Result<String, RunError>`. It mirrors
   `create_run` (insert `RunRecord` with `workflow_id`/`workflow_version` from the resolved run, status `created`,
   publish `RunCreated`) AND additionally writes a `RunResolvedGraphRecord` via `insert_run_resolved_graph`. Add a
   dependency on `nexus-recipe` in `crates/nexus-run/Cargo.toml` (both host crates — boundary-clean) so the engine
   can accept `&ResolvedRun`. Why: this is the §6.3 entry point that freezes the validated graph against the run.

5. **`crates/nexus-run/src/engine.rs`** — in `execute_run`, branch on the presence of a frozen graph: try
   `get_run_resolved_graph(run_id)`; if present, build the `nexus_workflow::Workflow` from that record (reuse a
   helper analogous to `parse_workflow_from_record`, `engine.rs:360`) and plan from it; only fall back to
   `get_workflow(run_record.workflow_id)` (`engine.rs:89-93`) when no frozen graph exists (legacy `create_run`
   path). Resolved inputs are read from `resolved_inputs` and made available to step execution context (the
   placeholder executor does not consume them yet, but the plumbing must carry them — design §6.3). Why: guarantees
   whatever executes sees the fanned-out values, not the mutable head graph.

### P3a — ad-hoc recipe run route

6. **`crates/nexus-api/Cargo.toml`** — add a `[dependencies]` path dep on `nexus-recipe` (host crate; allowed —
   not the `nexus-builtins` bridge). Why: handler needs `compile_recipe_run` + `ResolvedRun`.

7. **Promote `handlers/recipes.rs` → `handlers/recipes/` directory (P3 is first writer, CONTRACTS C7).** Create
   `crates/nexus-api/src/handlers/recipes/mod.rs` + `recipes/router.rs` exposing `pub fn router() -> Router<...>`,
   and **move the existing GET handlers** (`list_recipes`/`get_recipe`, currently flat at `recipes.rs:10/23`) into
   `recipes/read.rs`. Add `recipes/run.rs` with `run_recipe(State, Path<String>, Json<RunRecipeBody>)`.
   `RunRecipeBody { control_values: serde_json::Value, preset_id: Option<String> }` (a map keyed by `control_id`).
   Flow: `db.get_recipe(id)` (404 on miss) → read `workflow_id` + `workflow_version` pin → load the
   `workflow_versions` snapshot via P0's `get_workflow_version(workflow_id, version)` into a
   `WorkflowVersionSnapshot` → `compile_recipe_run(projection, &snapshot, &control_values, preset_id.as_deref())`
   → map `BindingError` → `422 Unprocessable Entity` with the variant in the body (CONTRACTS C4) →
   `state.run_engine.create_run_from_resolved(&resolved)` → fire-and-forget `tokio::spawn(execute_run)` (mirror
   `runs.rs:30-34`) → return `ApiResponse::created(CreateRunResponseDto { run_id, status: "created",
   predecessor_run_id: None })`. P4/P5/P6/P8 add modules (`form.rs`/`presets.rs`/`write.rs`/`upgrade.rs`/`share.rs`)
   under this same dir and register via `recipes::router()`. Why: §6.1 ad-hoc validated submit over host-owned rows.

8. **`crates/nexus-api/src/router.rs`** — replace the flat recipe GET `.route("/recipes/...")` mounts
   (`router.rs:234-235`) with **exactly one** `.nest("/recipes", recipes::router())`; `recipes::router()` carries
   both the moved GET routes and `POST /recipes/{id}/run`. **No leftover flat `.route("/recipes/...")` double-mount
   survives** (CONTRACTS C7). Why: generic-by-id host route, single mount point; follows the install/idle_timeout
   host-overlay precedent. axum brace syntax `{id}`.

### P3b — deployment run route (pinned)

9. **`crates/nexus-api/src/handlers/deployments/handlers.rs`** — extend `RunBody` (`handlers.rs:278`) to:
   `{ revision_id: Option<String>, control_values: Option<Value>, preset_id: Option<String>, inputs: Option<Value>,
   run_id: String }`. In `run` (`handlers.rs:285`): if `control_values.is_some()`, route the recipe path; else if
   `inputs.is_some()`, route the LEGACY blob path behind the deprecation flag (emit a `tracing::warn!` deprecation
   line). Map `BindingError` → `422 Unprocessable Entity` with the variant in the body (CONTRACTS C4); map
   `PinMismatch` → `409`. Why: §6.2 — new validated path with one-release back-compat.

10. **`crates/nexus-deployments/src/service/execute.rs`** — add a recipe-aware method, e.g.
    `execute_recipe(&self, deployment_id, revision_id, recipe_id, control_values, preset_id, run_id)`. It fetches the
    revision (reusing the existing `fetch_revision` + restore-state guard, `execute.rs:35-51`), loads the deployment
    revision's workflow snapshot (authoritative graph via `workflow_snapshot_id` / `effective_workflow_hash`), loads
    the recipe's projection + its `workflow_version` pin, and **asserts the recipe pin matches the revision
    snapshot** — on divergence return a new `DeploymentError::PinMismatch { recipe_version, revision_version }`
    mapped to `409 CONFLICT`. Then `compile_recipe_run(projection, &revision_snapshot, control_values, preset_id)`,
    reuse the run_link + `record_run` + context-hash plumbing (`execute.rs:53-77`), and hand the `ResolvedRun` to the
    run engine via `create_run_from_resolved` (thread an engine handle in, or return the `ResolvedRun` to the handler
    which already holds `state.run_engine`). Keep `execute` (the legacy method) intact for the deprecated blob path.
    Why: revision snapshot is authoritative; recipe supplies controls/presets only; assert-match per §6.2.

11. **`crates/nexus-deployments/src/error.rs`** — add `PinMismatch { recipe_version: String, revision_version:
    String }` variant; map to `409` in `handlers.rs` `err_to_response`. Why: divergence must reject, not silently pick
    one pin.

### Cross-cutting

12. **Two boundary tests (CONTRACTS C7 — scoped per crate; the nexus-recipe test does NOT walk nexus-api files):**
    - `crates/nexus-recipe/tests/boundary_test.rs` — walks **only** `crates/nexus-recipe/src`; FORBIDDEN ext-id
      literal list + no-node-id-shaped-constant (`node:<id>.config`, `_1.config.`) assertion. Established in P1/P2;
      P3 leaves its scope unchanged.
    - **`crates/nexus-api/tests/recipes_boundary_test.rs`** (NEW — P3 stands it up as the first recipe-handler
      writer). Walks the new `handlers/recipes/` directory modules (`mod.rs`/`router.rs`/`read.rs`/`run.rs`) **plus
      the extended deployments run handler** (`deployments/handlers.rs run`, `execute.rs execute_recipe`) for the
      FORBIDDEN ext-id literal list + node-id-shaped constants. Mirrors
      `crates/nexus-deployments/tests/preset_boundary.rs`. **P4/P6/P8 extend THIS test** for their handler modules.
    Why: §8 hard gate, with the boundary surface scoped to the crate that owns each file.

### FR-10 / FR-10.1 — submit contract (P3 OWNS, CONTRACTS C8)

13. **Submit-contract guarantee.** Any recipe UI — generated form (P4) OR a custom/legacy extension UI — MUST submit
    through `POST /api/v1/recipes/{id}/run` (or the extended deployment route), which runs `compile_recipe_run`. No
    UI may construct a run payload that bypasses the compiler: there is no alternate submit endpoint that skips
    binding validation/fan-out. This makes it *physically impossible* for any UI to invent params or skip validation.
    The `custom_ui` reference stored in `projection` (CONTRACTS C6) only selects the rendering bundle; submission
    still funnels through this one validated route. Why: FR-10/FR-10.1 — uniform validated submit regardless of UI.

14. **OR-1 (validate at run) — named acceptance item.** P3 is the run-side leg of the OR-1 spanning item
    (P3 run + P5 preset-save + P6 builder-save, CONTRACTS C8). Every `POST /recipes/{id}/run` and recipe-path
    `POST /deployments/{id}/runs` MUST run `compile_recipe_run` before any run row is created; a rejected compile
    returns `422` and persists nothing.

## TDD test plan

Write all RED first. Rust = `cargo test -p <crate>`.

### P3c — run engine (RED → GREEN)

- `nexus-storage`: `inserts_and_reads_run_resolved_graph` — insert a `RunResolvedGraphRecord`, read it back, assert
  round-trip equality of nodes/edges/inputs/resolved_inputs. RED until step 3 storage lands.
- `nexus-storage`: `migration_028_creates_run_resolved_graphs_table` — run `run_migrations` on a fresh in-memory DB,
  assert the table exists (PRAGMA table_info). RED until steps 1-2. Also add the `migration_028_*` registration
  test per the CONTRACTS C1 per-migration registration rule.
- `nexus-run`: `create_run_from_resolved_persists_frozen_graph` — call `create_run_from_resolved` with a `ResolvedRun`
  whose graph differs from any head workflow; assert a `RunRecord` exists AND `get_run_resolved_graph(run_id)`
  returns the frozen nodes (not the head graph). RED until step 4.
- `nexus-run`: `execute_run_plans_from_frozen_graph_not_head` — seed a head `workflows` row with graph A; create a run
  via `create_run_from_resolved` with frozen graph B (different node set); run `execute_run`; assert the node
  executions / plan correspond to B, NOT A. This is the design's central §6.3 assertion. RED until step 5.
- `nexus-run`: `execute_run_falls_back_to_head_for_legacy_create_run` — a run created via the old `create_run` (no
  frozen graph) still plans from `get_workflow`. Guards the fallback branch. RED until step 5.

GREEN: implement steps 1-5. Note the placeholder executor still writes `b"placeholder"` — assert on the PLAN /
node-execution graph, never on artifact bytes.

### P3a — recipe run route (RED → GREEN)

- `nexus-api`: `post_recipes_id_run_compiles_and_creates_run` — seed a recipe with a valid pin + a `workflow_versions`
  snapshot; POST `{ control_values, preset_id: null }`; assert `201` + a run id, and that a `run_resolved_graphs` row
  exists for it. RED until steps 6-8.
- `nexus-api`: `post_recipes_id_run_rejects_locked_override` — POST control_values that target a `locked` control;
  assert `422` with a `LockedOverride`-shaped error in the body (server-side enforcement, not just client;
  CONTRACTS C4). RED.
- `nexus-api`: `post_recipes_id_run_404_unknown_recipe` — unknown id → `404`. RED.
- `nexus-api`: `post_recipes_id_run_422_broken_pin` — recipe whose pinned `workflow_version` snapshot is missing →
  `422` (CONTRACTS C4). RED.
- `nexus-api`: `legacy_custom_recipe_ui_still_loads_and_runs_post_migration` — a recipe carrying a `custom_ui`
  reference (legacy/custom UI) still resolves via `GET /recipes/{id}` AND submits successfully through
  `POST /recipes/{id}/run` → `compile_recipe_run` (FR-10/FR-10.1 regression, CONTRACTS C8). RED.

GREEN: implement steps 6-8.

### P3b — deployment run route (RED → GREEN)

- `nexus-deployments`: `execute_recipe_uses_revision_snapshot_as_authoritative` — revision snapshot graph A, recipe
  pinned to the same version; assert the compiled `ResolvedRun` graph derives from A. RED until step 10.
- `nexus-deployments`: `execute_recipe_rejects_pin_divergence` — recipe pin version ≠ revision snapshot version →
  `PinMismatch` (→ `409`). RED until steps 10-11.
- `nexus-api`: `post_deployments_id_runs_recipe_path` — POST `{ control_values, preset_id, run_id }`; assert `202` +
  run-link recorded + frozen graph persisted. RED until steps 9-10.
- `nexus-api`: `post_deployments_id_runs_legacy_inputs_blob_still_accepted` — POST `{ inputs, run_id }` (no
  control_values) → `202`, and a deprecation `warn` is emitted; behavior matches today's `execute`. RED until step 9.

GREEN: implement steps 9-11.

### Boundary (RED → GREEN)

- `cargo test -p nexus-recipe --test boundary_test` — unchanged scope (walks only `nexus-recipe/src`); must stay
  green. Does NOT walk nexus-api files (CONTRACTS C7).
- `cargo test -p nexus-api --test recipes_boundary_test` — NEW (step 12). Asserts no extension-id literals and no
  node-id-shaped constants in the new `handlers/recipes/` modules + the extended deployments run handler. RED until
  step 12 + clean handler code.

## Acceptance criteria

Sharpened from the §11 P3 row ("Both routes run a validated recipe; engine plans from frozen graph; revision-pin
precedence enforced"):

1. `POST /api/v1/recipes/{id}/run` with `{ control_values, preset_id? }` compiles via `compile_recipe_run`,
   persists a frozen `run_resolved_graphs` row, submits via `create_run_from_resolved`, and returns a run id.
   Locked/hidden control overrides are rejected server-side.
2. `POST /api/v1/deployments/{id}/runs` accepts `{ control_values, preset_id? }`, treats the deployment revision
   snapshot as authoritative for the graph, asserts the recipe pin matches the revision snapshot, and rejects
   divergence with `409`. The legacy `inputs` blob is still accepted behind a deprecation flag (one release) and
   emits a deprecation warning.
3. `create_run_from_resolved` freezes the resolved graph against the run; `execute_run` plans from that FROZEN
   snapshot, NOT `get_workflow(workflow_id)`; the legacy `create_run` path still falls back to the head graph.
4. Migration `028_run_resolved_graphs` is registered in `run_migrations` (numeric order, after `027`) and green on a
   fresh DB (CONTRACTS C1).
5. Both boundary tests green (CONTRACTS C7): `cargo test -p nexus-recipe --test boundary_test` (scope unchanged,
   `nexus-recipe/src` only) AND the NEW `cargo test -p nexus-api --test recipes_boundary_test` (new
   `handlers/recipes/` dir + extended deployments run handler) — zero extension-id literals / node-id-shaped
   constants.
6. The host run engine remains a skeleton (placeholder artifacts); no real operator execution is added.
7. `handlers/recipes.rs` is promoted to a `handlers/recipes/` directory; **exactly one**
   `.nest("/recipes", recipes::router())` survives with no leftover flat `.route("/recipes/...")` mount
   (CONTRACTS C7).
8. **FR-10/FR-10.1:** every recipe UI (generated or custom) submits only through the validated
   `POST /recipes/{id}/run` → `compile_recipe_run` path — no bypass route exists; a legacy custom recipe UI still
   loads and runs post-migration (regression test). **OR-1 (run-side):** a rejected compile returns `422` and
   persists no run row (CONTRACTS C4/C8).

## Dependencies & sequencing

- **Upstream (HARD preconditions — must be merged before P3, CONTRACTS C2):** **P0** delivers the
  `workflow_versions` table + `WorkflowVersionSnapshot` type + the `get_workflow_version(workflow_id, version)`
  storage read — P3 does NOT supply `get_workflow_version` itself and adds no fallback step for it. P1
  (`recipes.workflow_id`/`workflow_version` pin + cached `status` + recipe-table migration), P2
  (`crates/nexus-recipe`, `compile_recipe_run`, `ResolvedRun`, public `validate_node_config`).
- **Downstream:** P4 (RecipeForm) consumes the `POST /recipes/{id}/run` route + the run-progress transition;
  P4/P5/P6/P8 add modules under the `handlers/recipes/` directory P3 promotes (CONTRACTS C7).
- **Intra-phase order:** P3c (steps 1-5) → P3a (6-8) → P3b (9-11) → cross-cutting/boundary + FR-10/OR-1
  (12-14). P3a and P3b both depend on P3c's `create_run_from_resolved`. P3b additionally depends on P3a's compile
  pattern (reuse, don't re-derive).

## Cross-phase contracts

PRODUCES:

- Route `POST /api/v1/recipes/{id}/run` — body `{ control_values: object, preset_id?: string }`, returns
  `CreateRunResponseDto { run_id, status, predecessor_run_id: null }` (201).
- Extended route `POST /api/v1/deployments/{id}/runs` — body
  `{ revision_id?: string, control_values?: object, preset_id?: string, inputs?: object (deprecated), run_id: string }`,
  returns `{ run_id, deployment_revision_id, execution_context_hash }` (202); `409` on pin mismatch.
- `nexus_run::DefaultRunEngine::create_run_from_resolved(&ResolvedRun) -> Result<String, RunError>`.
- Storage: table `run_resolved_graphs` (migration `028`, CONTRACTS C1), `RunResolvedGraphRecord`, `Database` methods
  `insert_run_resolved_graph` / `get_run_resolved_graph`.
- `DeploymentError::PinMismatch { recipe_version, revision_version }` (→ 409); `BindingError` → 422 (CONTRACTS C4).
- `DeploymentExecuteService::execute_recipe(...)`.
- The `handlers/recipes/` directory promotion (`mod.rs` + `router.rs` exposing `recipes::router()`; `read.rs`/`run.rs`)
  + the nexus-api-side boundary test, both extended by P4/P5/P6/P8 (CONTRACTS C7).

CONSUMES (from P0/P1/P2):

- `nexus_recipe::compile_recipe_run(projection, snapshot, control_values, preset_id) -> Result<ResolvedRun,
  BindingError>` and the `ResolvedRun` type.
- `nexus_workflow::WorkflowVersionSnapshot` (P0) + a `get_workflow_version(workflow_id, version)` storage read.
- `recipes.workflow_id` / `recipes.workflow_version` pin columns + recipe `projection` (P1).
- Existing `CreateRunResponseDto`, `ApiError` mapping, deployment `fetch_revision` + run_link/record_run/context-hash
  plumbing (`execute.rs:53-77`), revision pin columns (`011_deployments.sql:50/55/57`).

## Boundary discipline

- `crates/nexus-recipe` and all new handlers are generic by `control_id` + path string — **zero extension-id
  literals, zero hardcoded node ids** (`.claude/rules/host-extension-boundary.md`).
- New routes (`/recipes/{id}/run`, the extended `/deployments/{id}/runs`) are generic-by-`:id` over host-owned rows
  (recipes, workflows, workflow_versions, runs) — follow the host-overlay precedent (install `router.rs:179`,
  idle_timeout `router.rs:197`). axum brace syntax `{id}`.
- `nexus-api` and `nexus-run` may depend on `nexus-recipe` and `nexus-workflow` (host crates). They must NOT route
  through `crates/nexus-builtins` (the sole extension-coupling bridge).
- New migration `028` is a host-generic table — no extension-named tables in `migrations/` (CONTRACTS C1).
- Boundary gate: TWO scoped tests (CONTRACTS C7) — `cargo test -p nexus-recipe --test boundary_test` (walks only
  `nexus-recipe/src`) AND the NEW `cargo test -p nexus-api --test recipes_boundary_test` for the `handlers/recipes/`
  dir + extended deployments run handler (mirror `crates/nexus-deployments/tests/preset_boundary.rs` /
  `crates/nexus-extension-deps/tests/boundary_test.rs`). The nexus-recipe test never `include_str!`s nexus-api files.
- Edit from repo root: the comment-write hook blocks >2-line body comments and breaks when shell cwd drifts off
  repo root.

## Risks & mitigations

- **P0/P1/P2 not yet merged** → P3 has no compiler/snapshot to consume. Mitigation: gate P3 start on the upstream
  acceptance rows (HARD preconditions per CONTRACTS C2 — including P0's `get_workflow_version`); do NOT start P3
  until they land.
- **Deployment engine wiring.** `DeploymentExecuteService` does not hold a run-engine handle today and the handler
  supplies a client `run_id`. Mitigation: prefer returning the `ResolvedRun` to the handler (which already holds
  `state.run_engine`) and call `create_run_from_resolved` there, rather than injecting the engine into the service —
  keeps the service storage-only and avoids a circular dep.
- **Frozen-graph divergence from `RunRecord.workflow_version`.** The run row stores a version string; the frozen
  graph may be a user/recipe-resolved variant. Mitigation: `run_resolved_graphs` carries its own
  `workflow_id`/`workflow_version`; `execute_run` always prefers the frozen row when present.
- **Legacy blob removal.** The deprecation flag must be removed in a later release. Mitigation: tag the warn line and
  the `inputs` field with a `// deprecated: remove after one release` note and a tracking item.
- **Placeholder executor masks input flow.** Tests must assert on plan/graph, not artifacts, or they will pass
  vacuously. Mitigation: the test names above assert node-execution graph identity, not bytes.

## Out of scope

- Making the host run engine a real operator executor (it stays a skeleton; real execution is extension-side).
- The generated `RecipeForm` UI and `GET /recipes/{id}/form` (P4).
- Preset packs / explain-diff (P5), recipe builder + write API (P6), EmotionTTS migration (P7), outdated/upgrade +
  shareability (P8).
- Defining the compiler, `ResolvedRun`, `WorkflowVersionSnapshot`, or the workflow_versions/pin migrations (P0-P2).
- svi2-pro / local-llm force-routing onto the host contract.
