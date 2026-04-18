# Contract — Host APIs Consumed by `nexus.local-llm`

**Direction**: extension → host, over `nexus-protocol::StdioTransport` (JSON-RPC 2.0).
**Stability**: frozen for this spec. Changes to request/response shapes require an amendment.
**Note**: The extension MUST NOT link any host crate to reach these APIs. All calls ride JSON-RPC.

---

## Namespace `host.models.*`

### `host.models.get`
```jsonc
// Request
{ "model_id": "<ModelId>" }

// Response (success)
{
  "id": "qwen2.5-7b-instruct-q4km",
  "format": "GGUF",
  "compatible_backends": ["llamacpp"],
  "file_path": "C:/Users/.../models/.../qwen2.5-7b-instruct-q4km.gguf",
  "size_bytes": 4368439296,
  "checksum_sha256": "…",
  "metadata": {
    "context_length": 32768,
    "architecture": "qwen2",
    "chat_template": "<chatml-ish>",
    "recommended_ngl": 33,
    "quantization": "Q4_K_M"
  }
}

// Error codes
// - ModelNotFound
// - ModelMetadataIncomplete (file_path or format missing)
```

### `host.models.list`
```jsonc
// Request (all filters optional; AND-combined)
{ "format": "GGUF", "compatible_backend": "llamacpp", "page": 0, "page_size": 50 }
// Response
{ "items": [ Model, ... ], "next_page": 1 | null }
```

### `host.models.register_existing` — **migration-only**
```jsonc
// Request
{ "legacy_path": "<abs>", "hint": { "format": "GGUF" }? }
// Response
{ "model_id": "<ModelId>", "status": "registered" | "already_present" }
```

### Consumed event `model.removed`
```jsonc
// Payload pushed from host to extension
{ "model_id": "<ModelId>", "reason": "user_uninstall" | "corruption" | "admin" }
```

---

## Namespace `host.runtimes.*`

### `host.runtimes.list`
```jsonc
// Request — filters optional, AND-combined
{ "supports_format": "GGUF", "codename": "llamacpp"?, "variant": "cuda13"?, "health": "Installed"? }
// Response
{ "items": [ BackendRuntime, ... ] }
```

### `host.runtimes.get`
```jsonc
// Request
{ "install_id": "<RuntimeInstallId>" }
// Response
BackendRuntime

// Error codes: RuntimeNotFound
```

### `host.runtimes.register_existing` — **migration-only**
```jsonc
{ "legacy_path": "<abs path to bin/llama-server[.exe]>", "variant_hint": "cuda13" | "cpu" | … }
// Response
{ "install_id": "<RuntimeInstallId>", "status": "registered" | "already_present" }
```

### `host.runtimes.acquire_lease` *(canonical — Q1 pivot adopted)*
```jsonc
// Request
{
  "install_id": "<RuntimeInstallId>",
  "model_id": "<ModelId>",
  "settings_override": {
    "context_length": 8192?,
    "n_gpu_layers": 33?,
    "parallel": 2?,
    "extra_args": []?
  }?
}

// Response
RuntimeLease  // per data-model.md

// Error codes:
// - RuntimeMissing, ModelMissing, IncompatibleRuntime, InsufficientResources, LeaseCapExceeded
```

### `host.runtimes.release_lease`
```jsonc
{ "lease_id": "<string>" } → { "released": true }
```

### Consumed events `backend.state` (scoped to lease)
```jsonc
{
  "lease_id": "<string>",
  "state": "Spawning"|"LoadingModel"|"Ready"|"Draining"|"Stopped"|"Crashed"|"Hung",
  "since": "<ISO8601>",
  "detail": { ... }
}
```

---

## Namespace `host.settings.*`

### `host.settings.get`
```jsonc
{ "key": "local-llm.runtime_preferences.<model_id>" }
// Response
{ "value": { "codename": "llamacpp", "variant": "cuda13" } | null }
```

### `host.settings.set`
```jsonc
{ "key": "local-llm.runtime_preferences.<model_id>", "value": { ... } }
// Response
{ "ok": true }
```

### `host.settings.observe` (optional; SWR-style)
```jsonc
{ "key_glob": "local-llm.*" } → event stream of { key, value }
```

---

## Namespace `host.log.*`

### `host.log.emit`
```jsonc
{
  "level": "trace"|"debug"|"info"|"warn"|"error",
  "target": "local_llm::supervisor",
  "fields": { "correlation_id": "...", "pool_key": "...", ... },
  "message": "..."
}
```

Extension structured logs (tracing) drain through this sink in addition to stderr.

---

## Error Envelope

Every non-streaming response error follows:
```jsonc
{
  "error": {
    "code": "<StableCode>",
    "message": "<human>",
    "retry_safe": true|false,
    "details": { ... }?
  }
}
```

Codes catalog (host-side, observed by extension — surface-level only):
`ModelNotFound`, `ModelMetadataIncomplete`, `RuntimeNotFound`, `RuntimeMissing`, `IncompatibleRuntime`, `InsufficientResources`, `LeaseCapExceeded`, `LeaseNotFound`, `SettingNotFound`, `SettingInvalid`.

---

## Frozen Snapshot

Contract tests under `contracts/tests/` exercise each request/response pair with canonical payload fixtures. Any drift in host behaviour breaks those tests and surfaces as an extension-spec regression.
