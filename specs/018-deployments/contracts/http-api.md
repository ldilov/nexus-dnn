# Contract — HTTP API (§21)

**Mount point**: `/api/v1/deployments` (lives in `nexus-api::handlers::deployments`, wired in `nexus-api::router`).
**Authn**: inherits host auth middleware (same as the rest of `/api/v1/*`). Default-deny per constitution.
**Envelope**: consistent `ApiResponse` enum already used by `nexus-api` (ok/error).
**Error mapping**: every `DeploymentError` variant maps to a stable HTTP status + code (defined in `nexus-api::handlers::deployments::error`).

All payload JSON sent to / returned from these endpoints is RFC 8785 JCS-canonicalizable (no non-deterministic key orders, no raw secrets — SI-05).

---

## POST `/api/v1/deployments` — Create deployment

Create from current editor/session context. FR-001, FR-013, FR-014.

Request body:
```json
{
  "display_name": "Qwen GGUF tuned for long-context chat",
  "slug": "qwen-long-ctx",
  "workspace_id": null,
  "description": "optional",
  "tags": ["chat", "long-context"],
  "created_from_surface": "recipe_view",
  "save_mode": "create",
  "include_ui_state": true,
  "snapshot_mode": "hybrid",
  "source": {
    "workflow_id": "workflow.chat.basic",
    "workflow_version": "wf_v12",
    "recipe_id": "recipe.chat.basic",
    "recipe_version": "rcp_v3",
    "extension_id": "builtin.chatllm"
  },
  "runtime_binding": {
    "profile_id": "profile.local.cuda0",
    "runtime_adapter_id": "builtin.chatllm.llama_cpp",
    "runtime_install_id": "rtinstall_llama_cpp_cuda12_win64_01",
    "runtime_settings_id": "rtsettings_llama_cpp_user_default",
    "backend_family": "llama.cpp"
  },
  "model_binding": {
    "model_source_kind": "local_file",
    "model_locator": "models/Qwen3-14B-Q4_K_M.gguf",
    "model_format": "gguf",
    "quantization": "Q4_K_M",
    "capability_class": "chat"
  },
  "parameters": [
    { "scope": "runtime",     "binding_target": "runtime:llama_server",           "logical_key": "threads",     "data_type": "integer", "value_json": 12 },
    { "scope": "model_load",  "binding_target": "node:model_loader_1.config",     "logical_key": "gpu_layers",  "data_type": "integer", "value_json": 40 },
    { "scope": "request",     "binding_target": "node:chat_generate_1.config",    "logical_key": "temperature", "data_type": "number",  "value_json": 0.7 }
  ],
  "artifacts": []
}
```

Response `201`:
```json
{ "status": "ok",
  "data": {
    "deployment_id": "dep_...",
    "revision_id":   "rev_...",
    "revision_number": 1,
    "state": "saved",
    "restore_state": "fully_restorable",
    "effective_workflow_hash": "<sha256-hex>",
    "mapping_state": "fully_mapped"
  }
}
```

Error codes: `400 deployment.invalid_request`, `409 deployment.slug_conflict`, `422 deployment.validation_failed`.

Invariants:
- Never mutates `workflows` / `recipes` / `extensions` rows (regression test).
- All hashes use SHA-256 over RFC 8785 JCS.

---

## GET `/api/v1/deployments` — List

Filters (querystring): `workspace_id`, `tag` (repeatable), `state`, `restore_state`, `backend_family`, `model_format`, `source_recipe_id`, `source_workflow_id`, `source_extension_id`, `archived=true|false`, `favorite=true|false`, `q` (free-text on display_name/notes), `cursor`, `limit`.

Response `200`:
```json
{ "status": "ok",
  "data": {
    "items": [
      { "id": "dep_...",
        "display_name": "…",
        "slug": "…",
        "state": "ready",
        "restore_state": "fully_restorable",
        "current_revision_id": "rev_...",
        "backend_family": "llama.cpp",
        "model_format": "gguf",
        "mapping_state": "partially_mapped",
        "updated_at": "…",
        "last_run": { "id": "run_...", "status": "succeeded", "finished_at": "…" },
        "tags": ["chat"],
        "is_favorite": false,
        "is_archived": false }
    ],
    "next_cursor": null
  }
}
```

---

## GET `/api/v1/deployments/{id}` — Detail

Returns current-revision summary + compatibility summary + dirty-change summary + runtime/model context summary + recent run history (last N, default 10). FR-032.

---

## GET `/api/v1/deployments/{id}/revisions/{revisionId}`

Returns full revision payload (snapshots, source links, parameters, bindings, validation id).

---

## PATCH `/api/v1/deployments/{id}` — Metadata

Updatable: `display_name`, `description`, `tags` (replace or {add,remove}), `is_archived`, `is_favorite`, `notes_markdown`. No revision fields mutable here.

---

## POST `/api/v1/deployments/{id}/revisions` — Save new revision

Same body shape as create (minus `slug`). `save_mode ∈ { update, save_as_version, auto_draft }`. Appends; advances `current_revision_id` atomically.

---

## POST `/api/v1/deployments/{id}/validate`

Recomputes availability/compatibility. Persists a new `deployment_validations` row + its diagnostics. Returns the validation payload.

---

## POST `/api/v1/deployments/{id}/load`

Body: `{ "prefer": "exact" | "rebase" | "degraded" | "auto", "revision_id": "rev_...|null" }`.

Response `200`:
```json
{ "status": "ok",
  "data": {
    "session_id": "sess_...",
    "revision_id": "rev_...",
    "restore_mode": "exact",
    "restore_state": "fully_restorable",
    "diagnostics": [ { "severity": "warning", "category": "model", "code": "model.hash_unknown", "message": "…", "subject_ref": "node:model_loader_1.config" } ]
  }
}
```

Invariants: never auto-installs missing extensions/runtimes (SC-008). Never silently substitutes backend family/model.

---

## POST `/api/v1/deployments/{id}/runs` — Execute

Body: `{ "revision_id": "rev_...|null (uses current)", "inputs": { … }, "execution_policy_overrides": { … } }`.

Response `202`:
```json
{ "status": "ok",
  "data": {
    "run_id": "run_...",
    "deployment_revision_id": "rev_...",
    "execution_context_hash": "<sha256-hex>"
  }
}
```

Post-condition: `runs.deployment_id`, `runs.deployment_revision_id`, `runs.execution_context_hash` populated; `deployment_run_links` row with `link_kind=executed_from`; `deployments.last_run_id` advanced.

---

## POST `/api/v1/deployments/{id}/clone`

Produces a new deployment with revision_number=1 copying the chosen revision. `deployment_source_links` records `source_kind=cloned_deployment` pointing at the origin.

---

## POST `/api/v1/deployments/{id}/export`

Body: `{ "revisions": [rev_ids] | "current", "include_ui_state": true|false }`.
Response body: single JSON document conforming to R-07 envelope.
**Security**: export writer runs secret-pattern scan and refuses to emit any value matching the list; returns `422 deployment.export_blocked_by_secret`.

---

## POST `/api/v1/deployments/import`

Body: export envelope.
Behavior: schema-validated. Missing extension/runtime/model → deployment created in `degraded` or `stale` with diagnostics; NEVER writes `extensions` / `runtime_installs` / `runtime_settings` / `host_models`.

Response `201`:
```json
{ "status": "ok",
  "data": { "deployment_id": "dep_...", "state": "stale", "diagnostics_count": 3 }
}
```

---

## Events (§24, FR-033)

Emitted via `nexus-events`:
- `deployment.created`
- `deployment.updated`
- `deployment.revision.created`
- `deployment.validated`
- `deployment.loaded`
- `deployment.restore.degraded`
- `deployment.archived`
- `deployment.deleted`
- `deployment.run.created`
- `deployment.compatibility.changed`

Each event carries `deployment_id`, `deployment_revision_id` (where applicable), and a correlation id.
