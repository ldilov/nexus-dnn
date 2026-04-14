# Contract — Backend Event Stream

**Feature**: 007-llm-backends-runtime
**Transport**: host event stream (SSE) — same mechanism as workflow events (spec 005).
**Namespace**: `llm.backend.*`

All payloads are JSON and share a common envelope:

```json
{
  "event_id": "evt_01HXX...",
  "topic": "llm.backend.install.progress",
  "emitted_at": 1744598400123,
  "backend": "llama.cpp",
  "runtime_install_id": "rtinst_01HXX..." ,
  "install_task_id": "itask_01HXX...",
  "payload": { /* topic-specific */ }
}
```

`runtime_install_id` is present when an install record exists (i.e., after the `persist` phase or for validation/settings events). `install_task_id` is present for install/repair lifecycle events.

---

## Topics

### `llm.backend.install.progress`

Emitted at a bounded cadence (~4 Hz) during download and once per phase transition.

```json
{
  "phase": "download",
  "phase_index": 1,
  "total_phases": 8,
  "bytes_downloaded": 41943040,
  "bytes_total": 234881024,
  "elapsed_ms": 1820
}
```

### `llm.backend.install.completed`

```json
{
  "runtime_install_id": "rtinst_01HXX...",
  "release_id": "b7472",
  "platform": "windows-x64",
  "accelerator_profile": "cuda12",
  "binary_path": "C:\\...\\llama-server.exe",
  "elapsed_ms": 72000
}
```

### `llm.backend.install.failed`

```json
{
  "phase": "verify",
  "failure_category": "checksum_mismatch",
  "summary": "Downloaded package did not match the expected checksum",
  "remediation": ["Retry install", "Check network"],
  "local_package_path": "C:\\...\\tmp\\llama.cpp-b7472-windows-x64-cuda12.zip",
  "elapsed_ms": 25000
}
```

### `llm.backend.validation.completed`

```json
{
  "runtime_install_id": "rtinst_01HXX...",
  "overall_ok": true,
  "failure_category": null,
  "checks": [ { "check_id": "binary_exists", "ok": true } ]
}
```

### `llm.backend.settings.updated`

```json
{
  "runtime_settings_id": "rts_01HXX...",
  "backend": "llama.cpp",
  "generated_launch_preview_hash": "sha256:..."
}
```

### `llm.backend.log`

Emitted for each captured log line from installer subprocesses and wrapped runtime processes. Lines are also persisted (see `/logs`) and mirrored to the host log sink. Cadence is capped to prevent flooding; bursts above 200 lines/second per source are coalesced into batched events with a `batch` array.

```json
{
  "source": "llama.cpp",
  "runtime_id": "rtinst_01HXX...",
  "deployment_id": null,
  "severity": "info",
  "namespace": "extension.local-llm.llama.cpp",
  "message": "llama_model_loader: loaded meta data",
  "batch": null
}
```

---

## Ordering and delivery

- Events for a given `backend` and a given `install_task_id` are delivered in emission order.
- Cross-task ordering is best-effort — clients MUST use `emitted_at` for display ordering.
- Subscribers joining mid-stream SHOULD call the corresponding REST endpoint (`GET /backends/{id}` or `GET /logs`) to backfill before applying further events.

---

## Failure category vocabulary

The `failure_category` field uses exactly the vocabulary from FR-090:

`asset_resolution_failed`, `download_failed`, `checksum_mismatch`, `extraction_failed`, `required_binary_missing`, `dependency_load_failure`, `port_bind_failure`, `invalid_runtime_settings`, `runtime_validation_timeout`, `model_file_missing`, `model_incompatible`, `model_load_failure`, `cuda_mismatch`, `gpu_unavailable`, `out_of_memory`, `unexpected_process_exit`.
