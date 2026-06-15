# P3 — Validated Submit + Run-Engine Consumer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the P2 `ResolvedRun` a place to go. Add a run-engine entry point that persists a frozen, validated graph and plans execution from it (not from the head workflow row), then expose two submit surfaces that compile a recipe through the binding compiler before launching: a new `POST /api/v1/recipes/{id}/run`, and the existing `POST /api/v1/deployments/{id}/runs` extended to accept control values.

**Architecture:** A new `run_resolved_graphs` table stores `{run_id → frozen workflow JSON + resolved input values}`. `DefaultRunEngine::create_run_from_resolved` inserts the run + frozen graph; `execute_run` prefers the frozen graph over `get_workflow(id)`. A shared `compile_and_launch` API helper loads a recipe's pinned workflow-version snapshot (P0), parses its projection (P1), runs `compile_recipe_run` (P2), and launches. Both routes call it. The deployment route additionally keeps its run-link/context-hash bookkeeping.

**Tech Stack:** Rust, `sqlx` (SQLite), `axum`, `serde_json`, `tokio`.

**Depends on:** P0 (`workflow_versions`, `get_workflow_version`), P1 (`recipes.projection`, `workflow_id`/`workflow_version` pin), P2 (`compile_recipe_run`, `ResolvedRun`, `snapshot_to_workflow`).

**Reality the design now reflects:** the host run engine is a skeleton — `execute_step` writes a placeholder artifact ([engine.rs:313](../../../crates/nexus-run/src/engine.rs)). Real operator execution is extension-side. P3 guarantees that whatever executes plans from the *validated, fanned-out* graph instead of the head row. `AppState.db` is a concrete `Arc<SqliteDatabase>` ([lib.rs:46](../../../crates/nexus-api/src/lib.rs)), so storage helpers take `&*state.db`.

---

### Task 1: `run_resolved_graphs` table + storage

**Files:**
- Create: `migrations/025_run_resolved_graphs.sql`
- Modify: `crates/nexus-storage/src/sqlite/migrations.rs` (register)
- Modify: `crates/nexus-storage/src/records.rs` (record struct)
- Modify: `crates/nexus-storage/src/row_mapping.rs` (mapper + import)
- Modify: `crates/nexus-storage/src/sqlite/runs.rs` (insert/get)
- Modify: `crates/nexus-storage/src/database.rs` (trait methods + import)
- Modify: `crates/nexus-storage/src/sqlite/mod.rs` (delegations + import)
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

- [ ] **Step 1: Migration**

Create `migrations/025_run_resolved_graphs.sql`:

```sql
CREATE TABLE IF NOT EXISTS run_resolved_graphs (
    run_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    workflow_version TEXT NOT NULL,
    workflow_json TEXT NOT NULL,
    inputs_values_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
```

Register in `crates/nexus-storage/src/sqlite/migrations.rs` before the final `Ok(())`:

```rust
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/025_run_resolved_graphs.sql"),
        false,
    )
    .await?;
```

- [ ] **Step 2: Record + mapper**

In `crates/nexus-storage/src/records.rs` (after `RunRecord`):

```rust
/// The frozen, validated execution graph + resolved input values for one run,
/// produced by the recipe binding compiler. When present, the run engine plans
/// from this instead of the live workflow head row.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ResolvedRunGraphRecord {
    pub run_id: String,
    pub workflow_id: String,
    pub workflow_version: String,
    pub workflow_json: String,
    pub inputs_values_json: String,
    pub created_at: String,
}
```

In `crates/nexus-storage/src/row_mapping.rs` add `ResolvedRunGraphRecord` to the `use crate::records::{...}` block, then:

```rust
pub fn map_resolved_run_graph_row(row: SqliteRow) -> ResolvedRunGraphRecord {
    ResolvedRunGraphRecord {
        run_id: row.get("run_id"),
        workflow_id: row.get("workflow_id"),
        workflow_version: row.get("workflow_version"),
        workflow_json: row.get("workflow_json"),
        inputs_values_json: row.get("inputs_values_json"),
        created_at: row.get("created_at"),
    }
}
```

- [ ] **Step 3: SQLite functions**

Append to `crates/nexus-storage/src/sqlite/runs.rs` (it already uses `crate::records::*` and `crate::row_mapping::*` — confirm those imports exist at the top; if not, add them mirroring `sqlite/workflows.rs`):

```rust
pub async fn insert_run_resolved_graph(
    pool: &SqlitePool,
    r: &ResolvedRunGraphRecord,
) -> Result<(), StorageError> {
    sqlx::query(
        "INSERT OR REPLACE INTO run_resolved_graphs \
         (run_id, workflow_id, workflow_version, workflow_json, inputs_values_json, created_at) \
         VALUES (?, ?, ?, ?, ?, ?)",
    )
    .bind(&r.run_id)
    .bind(&r.workflow_id)
    .bind(&r.workflow_version)
    .bind(&r.workflow_json)
    .bind(&r.inputs_values_json)
    .bind(&r.created_at)
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn get_run_resolved_graph(
    pool: &SqlitePool,
    run_id: &str,
) -> Result<Option<ResolvedRunGraphRecord>, StorageError> {
    Ok(
        sqlx::query("SELECT * FROM run_resolved_graphs WHERE run_id = ?")
            .bind(run_id)
            .map(map_resolved_run_graph_row)
            .fetch_optional(pool)
            .await?,
    )
}
```

(Add `use crate::row_mapping::map_resolved_run_graph_row;` if `runs.rs` does not glob-import `row_mapping`.)

- [ ] **Step 4: Trait + delegations**

In `crates/nexus-storage/src/database.rs` add `ResolvedRunGraphRecord` to the import block and add methods (after the run methods):

```rust
    async fn insert_run_resolved_graph(
        &self,
        record: &ResolvedRunGraphRecord,
    ) -> Result<(), StorageError>;
    async fn get_run_resolved_graph(
        &self,
        run_id: &str,
    ) -> Result<Option<ResolvedRunGraphRecord>, StorageError>;
```

In `crates/nexus-storage/src/sqlite/mod.rs` add `ResolvedRunGraphRecord` to the import block and the delegations:

```rust
    async fn insert_run_resolved_graph(
        &self,
        r: &ResolvedRunGraphRecord,
    ) -> Result<(), StorageError> {
        runs::insert_run_resolved_graph(&self.pool, r).await
    }

    async fn get_run_resolved_graph(
        &self,
        run_id: &str,
    ) -> Result<Option<ResolvedRunGraphRecord>, StorageError> {
        runs::get_run_resolved_graph(&self.pool, run_id).await
    }
```

- [ ] **Step 5: Failing test**

Append to `crates/nexus-storage/src/sqlite/tests.rs`:

```rust
#[tokio::test]
async fn resolved_run_graph_roundtrip() {
    let db = setup_db().await;
    db.insert_run_resolved_graph(&crate::records::ResolvedRunGraphRecord {
        run_id: "r1".into(),
        workflow_id: "wf".into(),
        workflow_version: "1".into(),
        workflow_json: r#"{"id":"wf"}"#.into(),
        inputs_values_json: r#"{"script":"hi"}"#.into(),
        created_at: "t".into(),
    }).await.unwrap();

    let got = db.get_run_resolved_graph("r1").await.unwrap().unwrap();
    assert_eq!(got.workflow_version, "1");
    assert!(db.get_run_resolved_graph("missing").await.unwrap().is_none());
}
```

- [ ] **Step 6: Run + commit**

Run: `cargo test -p nexus-storage resolved_run_graph_roundtrip`
Expected: PASS.

```bash
git add migrations/025_run_resolved_graphs.sql crates/nexus-storage/src/sqlite/migrations.rs crates/nexus-storage/src/records.rs crates/nexus-storage/src/row_mapping.rs crates/nexus-storage/src/sqlite/runs.rs crates/nexus-storage/src/database.rs crates/nexus-storage/src/sqlite/mod.rs crates/nexus-storage/src/sqlite/tests.rs
git commit -m "feat(storage): run_resolved_graphs table for frozen run graphs (P3)"
```

---

### Task 2: Run engine consumes the frozen graph

**Files:**
- Modify: `crates/nexus-run/src/engine.rs` (add `ResolvedRunInput` + `create_run_from_resolved`; branch `execute_run`)
- Modify: `crates/nexus-run/src/lib.rs` (re-export `ResolvedRunInput` if engine types are re-exported there)

- [ ] **Step 1: Add the input struct + entry point**

In `crates/nexus-run/src/engine.rs`, add near the top (after imports):

```rust
/// A validated, frozen run request from the recipe binding compiler. The engine
/// stores `workflow_json` (graph with overrides applied) and plans from it.
pub struct ResolvedRunInput {
    pub workflow_id: String,
    pub workflow_version: String,
    pub workflow_json: String,
    pub inputs_values_json: String,
}
```

Add the method inside `impl<W: WorkerManager + 'static> DefaultRunEngine<W>` (next to `create_run`):

```rust
    pub async fn create_run_from_resolved(
        &self,
        input: &ResolvedRunInput,
    ) -> Result<String, RunError> {
        let run_id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let record = RunRecord {
            id: run_id.clone(),
            workflow_id: input.workflow_id.clone(),
            workflow_version: input.workflow_version.clone(),
            status: "created".to_owned(),
            started_at: None,
            completed_at: None,
            error: None,
            created_at: now.clone(),
            run_label: None,
            execution_profile: None,
            predecessor_run_id: None,
        };
        self.db
            .insert_run(&record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.db
            .insert_run_resolved_graph(&nexus_storage::records::ResolvedRunGraphRecord {
                run_id: run_id.clone(),
                workflow_id: input.workflow_id.clone(),
                workflow_version: input.workflow_version.clone(),
                workflow_json: input.workflow_json.clone(),
                inputs_values_json: input.inputs_values_json.clone(),
                created_at: now,
            })
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::RunCreated {
            run_id: run_id.clone(),
            workflow_id: input.workflow_id.clone(),
        });

        Ok(run_id)
    }
```

- [ ] **Step 2: Branch `execute_run` to prefer the frozen graph**

In `execute_run`, replace the block that fetches + parses the workflow (lines 89-95) with:

```rust
        let workflow = match self
            .db
            .get_run_resolved_graph(run_id)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?
        {
            Some(frozen) => serde_json::from_str::<nexus_workflow::Workflow>(&frozen.workflow_json)
                .map_err(|e| RunError::WorkflowError(e.to_string()))?,
            None => {
                let workflow_record = self
                    .db
                    .get_workflow(&run_record.workflow_id)
                    .await
                    .map_err(|e| RunError::WorkflowNotFound(e.to_string()))?;
                parse_workflow_from_record(&workflow_record)?
            }
        };
```

- [ ] **Step 3: Re-export (if applicable)**

If `crates/nexus-run/src/lib.rs` re-exports engine types (e.g. `pub use engine::DefaultRunEngine;`), add `ResolvedRunInput`:

```rust
pub use engine::{DefaultRunEngine, ResolvedRunInput};
```

- [ ] **Step 4: Build**

Run: `cargo build -p nexus-run`
Expected: builds. (Behavior verified end-to-end in Task 3's integration test.)

- [ ] **Step 5: Commit**

```bash
git add crates/nexus-run/src/engine.rs crates/nexus-run/src/lib.rs
git commit -m "feat(run): create_run_from_resolved + execute_run plans from frozen graph (P3)"
```

---

### Task 3: `compile_and_launch` helper + `POST /recipes/{id}/run`

**Files:**
- Modify: `crates/nexus-api/Cargo.toml` (add `nexus-recipe`)
- Create: `crates/nexus-api/src/recipe_run.rs`
- Modify: `crates/nexus-api/src/lib.rs` (declare module)
- Modify: `crates/nexus-api/src/handlers/recipes.rs` (add `run_recipe` handler)
- Modify: `crates/nexus-api/src/router.rs` (register `POST /recipes/{id}/run`)
- Test: `crates/nexus-api/tests/recipe_run_test.rs`

- [ ] **Step 1: Add the dependency**

In `crates/nexus-api/Cargo.toml` `[dependencies]`: `nexus-recipe = { path = "../nexus-recipe" }`.

- [ ] **Step 2: The shared helper**

Create `crates/nexus-api/src/recipe_run.rs`:

```rust
use std::collections::BTreeMap;

use serde_json::Value;

use nexus_recipe::{compile_recipe_run, snapshot_to_workflow, RecipeProjection};
use nexus_run::ResolvedRunInput;
use nexus_storage::records::RecipeRecord;
use nexus_storage::Database;

use crate::AppState;
use crate::error::ApiError;

/// Compile a recipe's controls through the binding compiler against its pinned
/// workflow-version snapshot, persist the frozen graph, and launch execution.
/// Returns the new run id. Generic — no extension-id knowledge.
pub async fn compile_and_launch(
    state: &AppState,
    recipe: &RecipeRecord,
    control_values: BTreeMap<String, Value>,
    preset_id: Option<String>,
) -> Result<String, ApiError> {
    let workflow_id = recipe
        .workflow_id
        .as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned to a workflow".into()))?;
    let version = recipe
        .workflow_version
        .as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned to a workflow version".into()))?;

    let projection: RecipeProjection = match recipe.projection.as_deref() {
        Some(p) => serde_json::from_str(p)
            .map_err(|e| ApiError::BadRequest(format!("invalid recipe projection: {e}")))?,
        None => RecipeProjection::default(),
    };

    let version_rec = state
        .db
        .get_workflow_version(workflow_id, version)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let head = state
        .db
        .get_workflow(workflow_id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let workflow = snapshot_to_workflow(&head.title, &version_rec)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let operators = state.extension_registry.list_operators();

    let resolved = compile_recipe_run(
        &projection,
        &workflow,
        version,
        &operators,
        &control_values,
        preset_id.as_deref(),
    )
    .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let workflow_json = serde_json::to_string(&resolved.resolved_workflow)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let inputs_values_json = serde_json::to_string(&resolved.resolved_inputs)
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let run_id = state
        .run_engine
        .create_run_from_resolved(&ResolvedRunInput {
            workflow_id: resolved.workflow_id,
            workflow_version: resolved.workflow_version,
            workflow_json,
            inputs_values_json,
        })
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let engine = state.run_engine.clone();
    let rid = run_id.clone();
    tokio::spawn(async move {
        if let Err(e) = engine.execute_run(&rid).await {
            tracing::error!(run_id = %rid, error = %e, "recipe run execution failed");
        }
    });

    Ok(run_id)
}
```

Declare it in `crates/nexus-api/src/lib.rs`: `pub mod recipe_run;`.

- [ ] **Step 3: The handler**

In `crates/nexus-api/src/handlers/recipes.rs`, add:

```rust
use std::collections::BTreeMap;
use axum::extract::{Path, State};
use axum::Json;
use serde_json::Value;

use crate::dto::CreateRunResponseDto;

#[derive(serde::Deserialize, Default)]
pub struct RecipeRunRequest {
    #[serde(default)]
    pub control_values: BTreeMap<String, Value>,
    #[serde(default)]
    pub preset_id: Option<String>,
}

pub async fn run_recipe(
    State(state): State<crate::AppState>,
    Path(id): Path<String>,
    Json(body): Json<RecipeRunRequest>,
) -> Result<crate::envelope::ApiResponse<CreateRunResponseDto>, crate::error::ApiError> {
    let recipe = state
        .db
        .get_recipe(&id)
        .await
        .map_err(|e| crate::error::ApiError::NotFound(e.to_string()))?;
    let run_id =
        crate::recipe_run::compile_and_launch(&state, &recipe, body.control_values, body.preset_id)
            .await?;
    Ok(crate::envelope::ApiResponse::created(CreateRunResponseDto {
        run_id,
        status: "created".to_owned(),
        predecessor_run_id: None,
    }))
}
```

(`use nexus_storage::Database;` is already in `recipes.rs`. Confirm `CreateRunResponseDto` is exported from `crate::dto`.)

- [ ] **Step 4: Register the route**

In `crates/nexus-api/src/router.rs`, in the recipes route group (where `GET /recipes/{id}` is registered, ~line 239), add:

```rust
        .route("/{id}/run", post(handlers::recipes::run_recipe))
```

(Ensure `post` is imported in that scope — copy from the workflows group style.)

- [ ] **Step 5: Integration test**

Create `crates/nexus-api/tests/recipe_run_test.rs`. Bootstrap `AppState` from an existing api integration test under `crates/nexus-api/tests/`. Seed: a workflow + a `workflow_versions` row ("1") + `current_version`="1"; a recipe pinned to (`wf`, "1") with a `projection` exposing one control bound to `input:script`; an operator registry (empty is fine if the workflow has no nodes). Then:

```rust
// 1. POST /recipes/{id}/run  body { "control_values": { "text": "hello" } } -> 201, returns run_id
// 2. Poll GET /runs/{run_id} until status leaves "created" (or assert run row exists)
// 3. Assert db.get_run_resolved_graph(run_id) is Some and its workflow_json deserializes,
//    and resolved inputs_values_json contains "script":"hello"
```

Implement with the harness's real HTTP calls (or direct `compile_and_launch` against a test `AppState` if building the full router in-test is heavy). The key assertion: a `run_resolved_graph` row exists with the fanned-out value.

- [ ] **Step 6: Run + commit**

Run: `cargo test -p nexus-api --test recipe_run_test`
Expected: PASS.

```bash
git add crates/nexus-api/Cargo.toml crates/nexus-api/src/recipe_run.rs crates/nexus-api/src/lib.rs crates/nexus-api/src/handlers/recipes.rs crates/nexus-api/src/router.rs crates/nexus-api/tests/recipe_run_test.rs
git commit -m "feat(api): POST /recipes/{id}/run — compile + validate + launch (P3)"
```

---

### Task 4: Extend `POST /deployments/{id}/runs` with control values

**Files:**
- Modify: `crates/nexus-api/src/handlers/deployments/handlers.rs:263-302` (`RunBody` + `run`)
- Test: extend `crates/nexus-api/tests/recipe_run_test.rs` or a new `deployment_run_test.rs`

**Pin precedence decision (documented):** a deployment revision carries its own workflow pin (`base_workflow_version_ref` / `workflow_snapshot_id`, [repository.rs:30-37](../../../crates/nexus-deployments/src/repository.rs)). P3 compiles against the **recipe's** pinned workflow version (P1) for consistency with `/recipes/{id}/run`; reconciling the revision's independent snapshot with the recipe pin is a documented follow-up (note it in the design's Complexity Tracking). The deployment route keeps its run-link + context-hash bookkeeping via `DeploymentExecuteService::execute`.

- [ ] **Step 1: Extend `RunBody` (back-compat preserved)**

In `crates/nexus-api/src/handlers/deployments/handlers.rs`:

```rust
#[derive(Debug, Deserialize, Default)]
struct RunBody {
    revision_id: Option<String>,
    /// Legacy opaque inputs (deprecated). When `control_values` is empty this is
    /// forwarded to the deployment context as before.
    #[serde(default)]
    inputs: Option<Value>,
    #[serde(default)]
    control_values: std::collections::BTreeMap<String, Value>,
    #[serde(default)]
    preset_id: Option<String>,
    run_id: String,
}
```

- [ ] **Step 2: Compile when control values are present**

Rewrite the `run` handler body so that, when `control_values` is non-empty, it resolves the deployment's source recipe, compiles + launches via the shared helper, then records the deployment run-link/hash with the resulting `run_id`:

```rust
async fn run(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<RunBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(e) => return err_to_response(DeploymentError::RestoreBlocked(e.to_string())),
    };

    // New path: compile a recipe from control values, launch, then record.
    let run_id = if !body.control_values.is_empty() {
        let deployment = match repo.fetch_deployment(&did).await {
            Ok(d) => d,
            Err(e) => return err_to_response(e),
        };
        // `source_recipe_id` accessor: confirm the exact field on the Deployment
        // struct returned by fetch_deployment (crates/nexus-deployments/src/repository.rs:169).
        let Some(recipe_id) = deployment.source_recipe_id.clone() else {
            return err_to_response(DeploymentError::RestoreBlocked(
                "deployment has no source recipe to compile".into(),
            ));
        };
        let recipe = match state.db.get_recipe(&recipe_id).await {
            Ok(r) => r,
            Err(e) => return err_to_response(DeploymentError::RestoreBlocked(e.to_string())),
        };
        match crate::recipe_run::compile_and_launch(
            &state,
            &recipe,
            body.control_values.clone(),
            body.preset_id.clone(),
        )
        .await
        {
            Ok(rid) => rid,
            Err(e) => {
                return (StatusCode::BAD_REQUEST, Json(ApiResponse::<()>::error(e.to_string())))
                    .into_response();
            }
        }
    } else {
        body.run_id.clone()
    };

    // Deployment bookkeeping (run-link + context hash) using the chosen run_id.
    let svc = DeploymentExecuteService::new(repo);
    let rev = body
        .revision_id
        .as_deref()
        .and_then(|s| DeploymentRevisionId::from_str(s).ok());
    let context_inputs = if body.control_values.is_empty() {
        body.inputs.clone().unwrap_or(serde_json::json!({}))
    } else {
        serde_json::to_value(&body.control_values).unwrap_or(serde_json::json!({}))
    };
    match svc.execute(&did, rev.as_ref(), &context_inputs, &run_id).await {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct R {
                run_id: String,
                deployment_revision_id: String,
                execution_context_hash: String,
            }
            (
                StatusCode::ACCEPTED,
                Json(ApiResponse::ok(R {
                    run_id: res.run_id,
                    deployment_revision_id: res.revision_id.to_string(),
                    execution_context_hash: res.execution_context_hash,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}
```

(Confirm `ApiResponse::error` exists; if the envelope uses a different error constructor, match it. Confirm `deployment.source_recipe_id` — read `repository.rs` around line 169 for the exact struct/field; do not guess.)

- [ ] **Step 3: Test**

Add a test: seed a deployment whose `source_recipe_id` points to a pinned recipe (reuse Task 3's seeding), `POST /deployments/{id}/runs` with `control_values`, assert 202 + a `run_resolved_graph` row exists for the returned `run_id`. Also assert the legacy path (only `inputs`) still returns 202 without a resolved graph.

- [ ] **Step 4: Run + commit**

Run: `cargo test -p nexus-api --test recipe_run_test` (and the deployment test)
Expected: PASS.

```bash
git add crates/nexus-api/src/handlers/deployments/handlers.rs crates/nexus-api/tests/
git commit -m "feat(api): deployment runs compile recipe control values (P3)"
```

---

## Final verification

- [ ] **Tests + lint**

Run: `cargo test -p nexus-storage -p nexus-run -p nexus-api && cargo fmt && cargo clippy -p nexus-storage -p nexus-run -p nexus-api -- -D warnings`
Expected: green.

- [ ] **Boundary gate**

Run: `grep -rn "emotion-tts\|svi2\|local-llm\|local_llm" crates/nexus-api/src/recipe_run.rs crates/nexus-run/src/engine.rs`
Expected: zero hits.

---

## Self-review notes

- `ResolvedRun` consumer (the critical gap) → Task 2 `create_run_from_resolved` + frozen-graph `execute_run`. ✅
- Frozen graph storage → Task 1. ✅
- `POST /recipes/{id}/run` compiles + validates + launches → Task 3. ✅
- `POST /deployments/{id}/runs` accepts control values via the shared helper, keeps bookkeeping → Task 4. ✅
- **Host engine still produces placeholder artifacts** — by design; P3 only guarantees the validated graph reaches whatever executes. Real execution stays extension-side (EmotionTTS adopts this in P7).
- **Revision-pin vs recipe-pin**: P3 compiles against the recipe pin; deployment-revision snapshot reconciliation is a documented follow-up (Task 4 note).
- **Confirm before coding**: `deployment.source_recipe_id` accessor (repository.rs:169) and `ApiResponse::error` constructor — read, don't guess.
- `resolved_inputs` are stored but unused by the placeholder engine; they exist for the real executor + P7 parity.
