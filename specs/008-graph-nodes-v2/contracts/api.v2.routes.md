# Graph Nodes v2 — HTTP Routes Contract

All routes are mounted under `/v2/…` and served from `crates/nexus-api/src/handlers/workflows_v2.rs`. DTOs are ts-rs-exported to `apps/web/src/api/generated/v2/`. v1 routes continue to work unchanged; v2 is additive.

Error envelope (all routes on error): `{ error: { code: string, message: string, details?: JsonValue } }`.

---

## Workflows

### `GET /v2/workflows`

List v2 workflows with summary metadata.

**Response 200:**
```json
{
  "items": [
    {
      "id": "local_chat_basic",
      "title": "Local Chat",
      "current_version_id": "...",
      "spec_version": "0.2",
      "source_kind": "extension_template",
      "user_edited_at": null,
      "mapping_state": "fully_mapped",
      "validation_summary": { "errors": 0, "warnings": 1, "info": 0 },
      "capabilities_summary": ["gpu.compute", "filesystem.read"],
      "updated_at": "..."
    }
  ]
}
```

### `GET /v2/workflows/:id`

Hydrated workflow at current version.

**Response 200:** `WorkflowV2Dto` — full document as defined in `data-model.md §10`.
**404** if workflow id unknown or only has a v1 row.

### `GET /v2/workflows/:id/versions`

**Response 200:**
```json
{
  "items": [
    {
      "version_id": "...",
      "parent_version_id": "...",
      "command": { "kind": "ConnectPorts", "args": { ... } },
      "applied_at": "...",
      "applied_by": "user:local",
      "mapping_state": "fully_mapped",
      "validation_summary": { "errors": 0, "warnings": 0, "info": 0 }
    }
  ]
}
```

### `POST /v2/workflows/:id/mutate`

Apply a mutation command. Atomic: the command, new version, validation results, and event emission all commit together or not at all.

**Request:** `MutationCommandDto`
```json
{ "kind": "ConnectPorts",
  "args": {
    "source_ref": "compose_prompt",
    "source_port": "prompt",
    "target_node_id": "chat_turn",
    "target_port": "prompt"
  }
}
```

**Response 200:**
```json
{
  "workflow": { /* WorkflowV2Dto */ },
  "new_version_id": "...",
  "validation_results": [
    { "severity": "error", "code": "required_input_missing", "node_id": "chat_turn",
      "message": "required input `backend_profile` on `chat_turn` is not connected",
      "source": "host_graph",
      "suggested_fix": { "kind": "connect_port", "args": { ... } } }
  ]
}
```

**Error 400 `mutation_rejected`** when a hard invariant fails (unknown operator, cycle, type mismatch without conversion). Soft validation issues (warnings/info) return 200 with the `validation_results` populated.

### `POST /v2/workflows/:id/revert`

Clears `user_edited_at`, re-points `current_version_id` to the extension-shipped seed version (recreated from YAML if it was lost). Subsequent mutations are not deleted — the history is preserved, the pointer moves.

**Response 200:** `{ workflow: WorkflowV2Dto }`.

### `POST /v2/workflows/validate`

Stateless validation of a hypothetical payload. Does **not** persist.

**Request:** `WorkflowV2Dto` (entire document).
**Response 200:** `{ validation_results: [ ValidationResultDto, ... ], mapping_state: "..." }`.

---

## Operators

### `GET /v2/operators`

**Response 200:**
```json
{
  "items": [
    {
      "id": "llm.chat.generate",
      "version": "1.2.0",
      "display_name": "LLM Chat Generate",
      "category": "LLM",
      "node_class": ["inference", "llm"],
      "execution": { "mode": "job", "cacheable": true, "resumable": false, "determinism": "bounded" },
      "inputs": [ /* PortSpecV2Dto */ ],
      "outputs": [ /* PortSpecV2Dto */ ],
      "parameter_groups": { "config": {...}, "runtime": {...}, "model": {...}, "generation": {...} },
      "capabilities": ["gpu.compute"],
      "resources": { "gpu": true, "min_vram_mb": 6000 },
      "ui": { /* opaque, validated by ui-metadata.v2.schema.json */ }
    }
  ]
}
```

---

## Recipes

### `POST /v2/recipes/:id/instantiate`

Create a new v2 workflow from a recipe template with the supplied bindings.

**Request:**
```json
{ "title": "My chat", "bindings": { "temperature": 0.3, "system_prompt": "…" } }
```
**Response 201:** `{ workflow: WorkflowV2Dto }`.

---

## Runs

### `GET /v2/runs/:id/trace`

Aggregated run trace: attempts, lineage, cache decisions, events.

**Response 200:**
```json
{
  "run_id": "...",
  "workflow_version_id": "...",
  "attempts": [ /* NodeAttemptDto */ ],
  "artifacts": [ /* ArtifactDto */ ],
  "lineage": [ /* LineageEdgeV2Dto */ ],
  "events": [ /* NodeEventDto */ ]
}
```

---

## Events (SSE)

### `GET /v2/events?subscribe=workflow,run,node_attempt,recipe_mapping`

Server-sent events stream. Each event:
```
event: v2.graph_mutation_applied
data: { "workflow_id": "...", "version_id": "...", "command": { ... } }
```

v2 event families:
- `v2.graph_mutation_applied`
- `v2.validation_completed`
- `v2.recipe_mapping_changed`
- `v2.node_attempt_started`
- `v2.node_attempt_progressed`
- `v2.node_attempt_completed`
- `v2.node_attempt_failed`
- `v2.cache_decision_made`
- `v2.capability_surface_changed`

v1 events continue to be emitted in parallel during coexistence.

---

## Status codes & semantics

| Code | Meaning |
|---|---|
| 200 | Command or query succeeded; payload may include soft validation warnings |
| 201 | New workflow created (instantiate) |
| 400 `mutation_rejected` | Hard invariant failed |
| 404 `not_found` | Unknown workflow/version/operator/recipe |
| 409 `version_conflict` | `parent_version_id` in request doesn't match server's `current_version_id` |
| 422 `schema_rejected` | Payload failed Layer 1 schema validation |
| 503 `runtime_adapter_unavailable` | Layer 4 validation could not reach an extension worker |
