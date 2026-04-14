# Contract — Backends REST API

**Feature**: 007-llm-backends-runtime
**Base path**: `/api/v1/llm/backends`
**Auth**: inherits host session auth (same as existing `/api/v1/*` handlers)
**Envelope**: all responses use the host-standard envelope `{ "status": "ok" | "error", "data": <T|null>, "error": <ErrorObject|null>, "meta": <object|null> }`.

Common `ErrorObject`:

```json
{
  "code": "string",
  "message": "string",
  "details": { "...arbitrary": "any" }
}
```

Common codes: `backend_not_found`, `backend_unavailable`, `invalid_request`, `install_in_progress`, `install_not_found`, `validation_failed`, `repair_failed`, `invalid_settings`, `conflict_with_managed_flag`.

---

## `GET /api/v1/llm/backends`

List backend families with card-level state.

**Response `data`**:

```json
{
  "backends": [
    {
      "id": "llama.cpp",
      "display_name": "llama.cpp",
      "implementation_status": "available",
      "card_state": "ready",
      "install": {
        "runtime_install_id": "rtinst_01HXX...",
        "release_id": "b7472",
        "platform": "windows-x64",
        "accelerator_profile": "cuda12",
        "installed_at": 1744598400000,
        "validated_at": 1744598460000
      },
      "supported_profiles_on_this_machine": ["cuda12", "cpu"],
      "last_failure_category": null
    },
    {
      "id": "tensorrt_llm",
      "display_name": "TensorRT-LLM",
      "implementation_status": "unavailable",
      "card_state": "unsupported",
      "unavailable_reason": "Native Windows support planned for a later slice.",
      "install": null,
      "supported_profiles_on_this_machine": [],
      "last_failure_category": null
    }
  ],
  "summary": { "installed": 1, "validated": 1, "issues": 0 }
}
```

---

## `GET /api/v1/llm/backends/{backendId}`

Return full backend detail including the Overview, Install Info, and current Diagnostics.

`404` with `error.code = backend_not_found` if unknown id.

---

## `POST /api/v1/llm/backends/{backendId}/install`

Kick off an install task.

**Request body**:

```json
{
  "release_id": "b7472",              
  "accelerator_profile": "cuda12"     
}
```

Both fields are optional. If omitted, the host chooses the default release from the version manifest and auto-detects the best accelerator profile per R10.

**Response `data`**:

```json
{
  "install_task_id": "itask_01HXX...",
  "phases": [
    "resolve","download","verify","extract","detect","validate","persist","complete"
  ]
}
```

- `409 install_in_progress` if another install task for the same backend is already active.
- `409 backend_unavailable` if the backend's adapter reports unavailable.

Progress is published on `llm.backend.install.progress`.

---

## `POST /api/v1/llm/backends/{backendId}/validate`

Run (or re-run) the 7-step validator against the current install.

**Response `data`**:

```json
{
  "runtime_install_id": "rtinst_01HXX...",
  "overall_ok": true,
  "checks": [
    { "check_id": "binary_exists",          "ok": true,  "message": "found llama-server.exe",  "duration_ms": 4 },
    { "check_id": "binary_version_probe",   "ok": true,  "message": "b7472",                    "duration_ms": 82 },
    { "check_id": "dependent_libraries",    "ok": true,  "message": "cudart64_12.dll loaded",   "duration_ms": 35 },
    { "check_id": "profile_matches_package","ok": true,  "message": "cuda12 matches manifest",  "duration_ms": 1 },
    { "check_id": "health_probe_starts",    "ok": true,  "message": "process up",               "duration_ms": 210 },
    { "check_id": "health_endpoint_reachable","ok": true,"message": "HTTP 200 /health",         "duration_ms": 140 },
    { "check_id": "health_probe_shutdown",  "ok": true,  "message": "exit 0",                   "duration_ms": 65 }
  ],
  "failure_category": null
}
```

`200` regardless of `overall_ok` (validation failure is not an API error). The adapter moves card state to `broken` or `installed_unvalidated` as appropriate.

---

## `POST /api/v1/llm/backends/{backendId}/repair`

Re-run install targeting the same release/profile without manual cleanup. Returns an install task id and uses the same progress/event topics as `install`.

---

## `GET /api/v1/llm/backends/{backendId}/settings`

Return current persisted runtime settings.

```json
{
  "runtime_settings_id": "rts_01HXX...",
  "backend": "llama.cpp",
  "install_ref": "rtinst_01HXX...",
  "threads": 12,
  "threads_batch": 12,
  "default_context": 8192,
  "parallel_requests": 2,
  "bind_address": "127.0.0.1",
  "port_mode": "auto",
  "fixed_port": null,
  "extra_args": [],
  "launch_spec_preview": {
    "binary": "<install_path>/llama-server.exe",
    "args": ["--host","127.0.0.1","--port","<auto>","--threads","12","--threads-batch","12","--ctx-size","8192","--parallel","2"]
  }
}
```

---

## `PUT /api/v1/llm/backends/{backendId}/settings`

Replace persisted runtime settings.

Validation errors return `400 invalid_settings` with per-field details. Attempting to include a managed flag in `extra_args` returns `400 conflict_with_managed_flag` naming the offending flag.

---

## `GET /api/v1/llm/backends/{backendId}/logs`

Query structured runtime log lines.

**Query params**: `source` (`all|host|extension|llama.cpp|tensorrt_llm`), `level` (`info|warn|error`), `since` (unix ms), `until` (unix ms), `cursor`, `limit` (default 500, max 5000).

**Response `data`**:

```json
{
  "lines": [
    {
      "timestamp": 1744598401234,
      "source": "llama.cpp",
      "runtime_id": "rtinst_01HXX...",
      "deployment_id": null,
      "severity": "info",
      "namespace": "extension.local-llm.llama.cpp",
      "message": "starting llama-server v b7472"
    }
  ],
  "next_cursor": "opaque"
}
```

---

## `GET /api/v1/llm/backends/{backendId}/diagnostics`

Return the most recent diagnostic record(s) for the backend.

```json
{
  "diagnostics": [
    {
      "category": "checksum_mismatch",
      "title": "Downloaded package did not match the expected checksum",
      "explanation": "The SHA-256 of the downloaded asset did not match the manifest.",
      "likely_cause": "Partial download or a mirror served an unexpected build.",
      "suggested_actions": [
        "Retry the install on a stable network",
        "Copy diagnostics and open an issue if the problem persists"
      ],
      "technical_details": {
        "expected_sha256": "abc...",
        "actual_sha256":   "xyz...",
        "asset_url": "https://github.com/..."
      },
      "event_refs": ["evt_..."],
      "created_at": 1744598399000
    }
  ]
}
```

---

## Error semantics summary

| Condition | HTTP | `error.code` |
|---|---|---|
| Unknown backend id | 404 | `backend_not_found` |
| Backend adapter reports unavailable | 409 | `backend_unavailable` |
| Another install task running | 409 | `install_in_progress` |
| Invalid request body / unknown fields | 400 | `invalid_request` |
| Invalid persisted-settings payload | 400 | `invalid_settings` |
| Extra-arg collides with managed flag | 400 | `conflict_with_managed_flag` |
| Repair attempted when no prior install | 409 | `install_not_found` |

---

## Idempotency

- `validate` is idempotent.
- `install` is **not** idempotent; duplicate requests while a task is running return `409 install_in_progress`. Subsequent requests after completion start a fresh task.
- `settings PUT` is idempotent (same body → same stored state).
