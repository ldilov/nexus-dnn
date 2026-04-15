# Quickstart — Graph Nodes v2 end-to-end

Walks an engineer through running the v2 subsystem after Phase A lands. Assumes `cargo`, `node`, and the host binary are already buildable.

## 1. Prepare the workspace

```bash
git checkout -b feature/008-graph-nodes-v2 develop
cargo build -p nexus-workflow-v2 -p nexus-api -p nexus-run -p nexus-storage
cargo test -p nexus-workflow-v2 -p nexus-api --no-fail-fast
```

Expected: all tests green; the v1 regression suite untouched.

## 2. Run migrations

The host boots with `sqlx` running every migration in `migrations/`. Migrations 006–009 add v2 tables beside v1 — nothing is destroyed.

```bash
cargo run -p nexus-cli -- migrate status
```

Expected: migrations 001–009 all applied; `workflows` and `workflows_v2` both exist.

## 3. Load a v2 fixture

A dual-shipped `local-llm` extension writes both its v1 YAMLs and a new `extensions/builtin/local-llm/v2/workflows/local_chat_basic.yaml`. On host boot, `persist_workflow_records_v2` inserts the v2 seed version if no v2 row exists:

```bash
cargo run -p nexus-cli -- boot --once
curl -s localhost:8080/v2/workflows | jq .items[].id
# → ["local_chat_basic"]
```

## 4. Fetch the hydrated workflow

```bash
curl -s localhost:8080/v2/workflows/local_chat_basic | jq .
```

Expected: a `WorkflowV2Dto` with `specVersion: "0.2"`, `mappingState: "fully_mapped"`, `nodes[]`, `bindings[]`, and `capabilities_summary`.

## 5. Apply a mutation

Disconnect the prompt edge to verify validation fires correctly:

```bash
curl -s -X POST localhost:8080/v2/workflows/local_chat_basic/mutate \
  -H 'content-type: application/json' \
  -d '{
    "kind": "DisconnectBinding",
    "args": { "bindingId": "<paste-bindingId-from-step-4>" }
  }' | jq .
```

Expected response includes:

```json
{
  "new_version_id": "...",
  "validation_results": [
    { "severity": "error",
      "code": "required_input_missing",
      "node_id": "chat_turn",
      "message": "required input `prompt` on `chat_turn` is not connected",
      "source": "host_graph",
      "suggested_fix": { "kind": "connect_port", "args": { "targetNodeId": "chat_turn", "targetPort": "prompt" } } }
  ]
}
```

The Save button on the frontend stays disabled because `errors > 0`.

## 6. Reconnect with a ConnectPorts command

```bash
curl -s -X POST localhost:8080/v2/workflows/local_chat_basic/mutate \
  -H 'content-type: application/json' \
  -d '{
    "kind": "ConnectPorts",
    "args": {
      "sourceKind": "node_output",
      "sourceRef": "compose_prompt",
      "sourcePort": "prompt",
      "targetNodeId": "chat_turn",
      "targetPort": "prompt"
    }
  }' | jq .validation_results
```

Expected: empty array; `mapping_state` remains `fully_mapped`.

## 7. Inspect the mutation log

```bash
curl -s localhost:8080/v2/workflows/local_chat_basic/versions | jq '.items[0:3]'
```

Expected: the two mutations you just issued as the most recent entries.

## 8. Execute a v2 run

```bash
curl -s -X POST localhost:8080/runs \
  -H 'content-type: application/json' \
  -d '{ "workflow_id": "local_chat_basic", "inputs": { "user_prompt": "Hello" } }' | jq .run_id
```

The run engine sees `specVersion: "0.2"` on the workflow and dispatches to `engine_v2`. Each node gets a `node_attempts` row:

```bash
RUN_ID=...   # from previous step
curl -s localhost:8080/v2/runs/$RUN_ID/trace | jq '.attempts[] | {node_id, lifecycle_state, cache_decision, duration_ms: .metrics.duration_ms}'
```

Expected:
```
{ "node_id": "compose_prompt", "lifecycle_state": "completed", "cache_decision": "miss", "duration_ms": 3 }
{ "node_id": "chat_turn",      "lifecycle_state": "completed", "cache_decision": "miss", "duration_ms": 412 }
{ "node_id": "persist_output", "lifecycle_state": "completed", "cache_decision": "miss", "duration_ms": 1 }
```

Re-running the same workflow with the same inputs should cache-hit on nodes whose `(structural + model_load + inputs)` didn't change.

## 9. Verify events

```bash
curl -N localhost:8080/v2/events?subscribe=workflow,run,node_attempt
```

Expected: a stream of `v2.graph_mutation_applied`, `v2.validation_completed`, `v2.node_attempt_started/progressed/completed`, `v2.cache_decision_made` events.

## 10. Frontend smoke

```bash
cd apps/web && npm install && npm run dev
```

Open the Workflows tab. The workflow card shows "v2" + "Edited" badges after step 5. Opening it renders the graph; the inspector shows parameter-domain tabs (`Config / Runtime / Model / Generation / Debug`) — distinct from v1's flat config blob.

## 11. Rollback a version

```bash
curl -s -X POST localhost:8080/v2/workflows/local_chat_basic/revert | jq .
```

Expected: `current_version_id` resets to the extension-shipped seed version; `user_edited_at` clears; Save button re-enables only when you mutate again.

## 12. Clean up

```bash
git worktree remove ... # if used
cargo test -p nexus-workflow-v2 -p nexus-api -p nexus-run
cd apps/web && npx tsc --noEmit && npx vite build
```

All green → Phase A acceptance criteria (see `spec.md §17`) are met and you're ready for Phase B (dual-shipping operators + migration tool).
