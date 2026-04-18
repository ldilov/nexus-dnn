# Phase 1 — Data Model

**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

Entities split by ownership. Host-owned entities are documented for reference only (their authoritative schema lives in host specs 017 / 020 / `nexus-models-store` / `nexus-backend-runtimes`).

---

## Host-owned (consumed via JSON-RPC, not linked)

### `Model`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | `ModelId` (string newtype) | ✓ | Stable across reinstalls. Canonical form e.g. `qwen2.5-7b-instruct-q4km`. |
| `format` | enum `GGUF` / `safetensors` / `onnx` / … | ✓ | Drives runtime compatibility matching. |
| `compatible_backends` | `Vec<VariantCodename>` | ✓ | e.g. `["llamacpp"]`. Extension filters runtime candidates with this. |
| `file_path` | abs path | ✓ | Absolute path on local filesystem. Treated as opaque by extension. |
| `size_bytes` | u64 | ✓ | |
| `checksum_sha256` | hex string | ✓ | Verified by host on install. Extension does not re-verify. |
| `metadata.context_length` | u32 | optional | Default 4096 if absent. |
| `metadata.architecture` | string | optional | For logging / advice only. |
| `metadata.chat_template` | string | optional | Falls back to `llama-server`'s embedded templates. |
| `metadata.recommended_ngl` | u32 | optional | GPU-layer hint. |
| `metadata.quantization` | enum | optional | For inspector UI. |

### `BackendRuntime`

| Field | Type | Required | Notes |
|---|---|---|---|
| `install_id` | `RuntimeInstallId` | ✓ | Per-install handle. |
| `codename` | `VariantCodename` | ✓ | e.g. `llamacpp`. |
| `variant` | string | ✓ | e.g. `cuda13`, `cpu`, `vulkan`. |
| `supported_formats` | `Vec<ModelFormat>` | ✓ | Must contain `Model.format` to be a match. |
| `binary_path` | abs path | ✓ | |
| `version` | `semver::Version` | ✓ | |
| `capabilities` | `BackendCapabilities` | ✓ | Struct of flags: `chat`, `embeddings`, `tools`, `vision`, … |
| `health` | enum `Installed` / `Broken` / `Updating` | ✓ | Extension filters for `Installed`. |

### `RuntimeLease` *(canonical — Q1 pivot adopted)*

Defined in `nexus-backend-runtimes::lease`:
```rust
pub struct RuntimeLease {
    pub lease_id: String,
    pub install_id: String,
    pub extension_id: String,
    pub pid: Option<u32>,
    pub log_channel_id: String,
    pub channel: RuntimeChannelDescriptor,
    pub created_at: String,
    pub released_at: Option<String>,
}
```
Extension holds exactly one `RuntimeLease` per pool slot. Proxy calls use `lease.channel.base_url`. Logs are retrieved via `lease.log_channel_id`. Release is synchronous on pool-slot drop; the extension's `LeaseGuard` (RAII) issues `host.runtimes.release_lease(lease_id)` in its `Drop` impl.

---

## Extension-owned

### `LeaseGuard` *(extension-side RAII wrapper around `RuntimeLease`)*

| Field | Type | Notes |
|---|---|---|
| `lease` | `RuntimeLease` | Issued by host via `acquire_lease`. |
| `state` | `LeaseState` | Mirror of host-pushed `backend.state` stream; extension is a passive observer. |
| `for_key` | `PoolKey` | `(variant, model_id)` — used to reverse-look-up from pool. |
| `last_observed_ok_at` | `Instant` | Updated on every `backend.state → Ready` event. |
| `release_tx` | `oneshot::Sender<()>` | Signals the lease-release task on `Drop`. |

`LeaseState` is a read-only mirror of the host's authoritative state machine (`Spawning | LoadingModel | Ready | Draining | Stopped | Crashed | Hung | Unhealthy`). The extension does not own this vocabulary; it merely records what the host reports.

Invariants:
- From `Ready`, HTTP proxy is permitted; any other state causes proxy calls to fail fast with `BackendUnavailable { retry_safe: true }`.
- On `Crashed` / `Hung` / `Unhealthy`, the pool slot is evicted and the lease is released. The next Operator invocation acquires a fresh lease — restart is NOT the extension's concern.
- `LeaseGuard::drop` MUST release the lease synchronously; a background task can double-release safely (host is idempotent on duplicate release).

### `RuntimePool`

| Field | Type | Notes |
|---|---|---|
| `slots` | `HashMap<PoolKey, PoolSlot>` | |
| `lru` | `VecDeque<PoolKey>` | Front = most recently used. |
| `cap` | `NonZeroUsize` | Default 2. From host settings. |
| `idle_timeout` | `Duration` | Default 10 min. From host settings. |

`PoolSlot` holds a `LeaseGuard`. When the slot is dropped (LRU eviction, idle timeout, model-removed event, shutdown), the guard's `Drop` releases the lease.

### `PoolKey`

```rust
#[derive(Clone, Hash, Eq, PartialEq)]
pub struct PoolKey {
    pub variant: VariantCodename,
    pub model_id: ModelId,
}
```

### `ChatSession` *(unchanged schema — documented for completeness)*

Tables `local_llm_chat_sessions`, `local_llm_chat_turns`, `local_llm_chat_turn_chunks` — unchanged since migration `002_chat_sessions.sql`. Extension reads/writes via `nexus-storage`'s existing pool.

### `RagCorpus` *(unchanged schema)*

Tables from `003_rag.sql` — `local_llm_rag_corpora`, `local_llm_rag_documents`, `local_llm_rag_chunks`, `local_llm_rag_embeddings`. Unchanged.

### `UserRuntimePreference`

Storage: host user-settings (per Research #5), not extension SQL.

```
key:   local-llm.runtime_preferences.<model_id>
value: { codename: VariantCodename, variant: string }
```

### `MigrationMarker`

On-disk file: `~/.nexus/local-llm/.migration_v1_rust` containing a single JSON object `{ "migrated_at": "<ISO8601>", "legacy_paths_scanned": [...], "binaries_registered": [...], "models_registered": [...] }`. Presence short-circuits the migration routine.

---

## Event Shapes (for Phase 1 contracts/events.md cross-reference)

All events carry `event_id`, `timestamp`, and `extension_id = "nexus.local-llm"`.

- `backend.state` — `{ pool_key, from, to, reason? }`
- `backend.crashed` — `{ pool_key, exit_code, stderr_tail: string[] }`
- `backend.hung` — `{ pool_key, last_probe_ok_at, probe_failures }`
- `backend.log_line` — `{ pool_key, stream: "stdout"|"stderr", line }`
- `pool.evicted` — `{ pool_key, reason: "lru_cap" | "idle_timeout" | "model_removed" | "user" }`
- Consumed: `model.removed` from host → triggers `pool.evicted(reason="model_removed")`

## Validation Rules

- `PoolKey.variant` MUST match a `BackendRuntime.variant` currently registered at spawn time; if not, `RuntimeMissing` error.
- `PoolKey.model_id` MUST resolve via `host.models.get`; if 404, `ModelMissing`.
- Pool size MUST never exceed `cap`; attempting to spawn on a full pool triggers LRU eviction of the idle slot farthest from the front.
- Every `ChildState` transition into `Unhealthy` disables auto-restart; only explicit user action recovers.
