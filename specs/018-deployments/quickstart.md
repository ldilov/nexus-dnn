# Quickstart — Deployments (018)

This walks through verifying the feature end-to-end locally once `/speckit.implement` has landed the code. It is also the smoke path the integration tests drive.

## Prerequisites

- `cargo` at the workspace MSRV (same as the rest of the repo).
- A local checkout on branch `018-deployments`.
- SQLite dev env (already in-tree via `sqlx` bundled feature).

## 1. Build the workspace after the split

```bash
cargo check --workspace
cargo build  --workspace
cargo test   --workspace
```

Expected:
- three new crates visible in `cargo metadata`: `nexus-models-store`, `nexus-deployments`, `nexus-provenance`.
- `cargo tree -p nexus-backend-runtimes` lists NONE of those three.
- `workspace_crate_graph.rs` passes (enforces SC-005 / SC-006).

## 2. Run the host with the new migration

Launch the host binary in its normal dev mode. On first boot it applies migration 011 and creates the new deployment tables plus the additive columns on `workflows`, `recipes`, `runs`.

## 3. Save a deployment from a chat-recipe session

Assuming a `chatllm` recipe is already loaded and tweaked:

```bash
curl -sS -X POST http://127.0.0.1:PORT/api/v1/deployments \
  -H 'Content-Type: application/json' \
  -d @specs/018-deployments/contracts/examples/create-request.json | jq
```

Expected response:
- `status: ok`, `data.deployment_id` returned, `revision_number: 1`, `effective_workflow_hash` set.
- A `deployment.created` and `deployment.revision.created` event observable in the event stream.
- No rows in `workflows`, `recipes`, or `extensions` changed (spot check by hash before/after).

## 4. List deployments

```bash
curl -sS "http://127.0.0.1:PORT/api/v1/deployments?tag=chat&limit=20" | jq
```

## 5. Load the deployment after a restart

Restart the host process, then:

```bash
curl -sS -X POST http://127.0.0.1:PORT/api/v1/deployments/$DEP_ID/load \
  -H 'Content-Type: application/json' \
  -d '{ "prefer": "exact" }' | jq
```

Expected: `restore_mode: "exact"`, `restore_state: "fully_restorable"`, and a recomputed `effective_workflow_hash` that matches the stored one (SC-002).

## 6. Execute the deployment

```bash
curl -sS -X POST http://127.0.0.1:PORT/api/v1/deployments/$DEP_ID/runs \
  -H 'Content-Type: application/json' \
  -d '{ "inputs": {}, "revision_id": null }' | jq
```

Expected: a `run_id` plus an `execution_context_hash`. Query the `runs` table and confirm `deployment_id`, `deployment_revision_id`, `execution_context_hash` are populated, and a `deployment_run_links` row with `link_kind=executed_from` exists (SC-007).

## 7. Create a second deployment of the same extension with different bindings

Repeat step 3 with a modified `runtime_binding.backend_family` (e.g., `tensorrt-llm`) and a different model locator. Confirm:
- Two distinct `deployment.id` values exist.
- Their `effective_workflow_hash` values differ.
- Archiving one does not change the other (SC-004).

## 8. Disable the source extension

Use the existing extension-management endpoint to disable `builtin.chatllm`. Re-call the deployment detail and validate endpoints — expect `restore_state` to degrade and at least one `extension`-category diagnostic (SC-003).

## 9. Export, then import on a clean host

```bash
curl -sS -X POST http://127.0.0.1:PORT/api/v1/deployments/$DEP_ID/export \
  -H 'Content-Type: application/json' \
  -d '{ "revisions": "current" }' > /tmp/dep.json

# Secret scan: the export file must not contain known secret patterns.
! grep -Ei 'api[_-]?key|secret|password|bearer [a-z0-9]' /tmp/dep.json
```

On a second host with the required extension missing, POST the file to `/api/v1/deployments/import` and confirm:
- Deployment is created in `degraded` or `stale` state.
- No new rows in `extensions`, `runtime_installs`, `runtime_settings`, or `host_models` (SC-008).

## 10. Regression check — source assets untouched

```bash
# Hash workflows table before the save test
# … run the full save/load/execute cycle …
# Re-hash — must be identical.
```

Covered by `crates/nexus-deployments/tests/save_no_source_mutation.rs` (SC-001).
