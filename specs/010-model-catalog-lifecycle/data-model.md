# Phase 1 Data Model: Model Catalog & Backend Lifecycle

**Feature**: 010-model-catalog-lifecycle | **Date**: 2026-04-15

## Schema Delta

Two migrations land in this feature:

### Host migration `crates/nexus-storage/migrations/NNN_host_hf_catalog.sql`

Owned by `nexus-huggingface`. Shared across all extensions that consume the HF capability (local-llm now; video-gen / image-gen / embeddings in future sprints).

```sql
-- Host-owned cache for Hugging Face Hub API responses
CREATE TABLE host_hf_catalog_cache (
    cache_key        TEXT PRIMARY KEY NOT NULL,          -- hash(endpoint, query, filters, page)
    response_body    TEXT NOT NULL,                       -- serialized HF API JSON
    etag             TEXT,
    fetched_at       TEXT NOT NULL,
    expires_at       TEXT NOT NULL
);
CREATE INDEX host_hf_idx_catalog_expires
    ON host_hf_catalog_cache(expires_at);
```

### Extension migration `extensions/builtin/local-llm/storage/migrations/006_model_hyperparameters.sql`

Extension-namespaced; registry of models installed by `local-llm` specifically. A future video-gen extension would own its own `ext_video_gen_model_installs` registry and call the same shared HF capability.

```sql
-- Extend installed-models registry with per-model limits and hyperparameter profile
ALTER TABLE ext_local_llm_model_installs ADD COLUMN model_limits TEXT;          -- JSON
ALTER TABLE ext_local_llm_model_installs ADD COLUMN hyperparameters TEXT;       -- JSON
ALTER TABLE ext_local_llm_model_installs ADD COLUMN routed_backend TEXT;        -- 'llamacpp' | 'trt-llm'
ALTER TABLE ext_local_llm_model_installs ADD COLUMN routing_signal TEXT;        -- 'gguf' | 'trt-prebuilt' | 'trt-architecture'

-- Extend runtime installs with explicit tri-state (backwards-compatible: 'installed' remains valid)
-- No schema change needed — `state` column already TEXT; new accepted value 'needs_repair' documented here.
-- Valid states: 'installing' | 'installed' | 'needs_repair' | 'failed'.

-- Audit trail for backend-state transitions (diagnoses phantom-state bugs)
CREATE TABLE ext_local_llm_backend_state_log (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    install_id       TEXT NOT NULL REFERENCES ext_local_llm_runtime_installs(id),
    from_state       TEXT,
    to_state         TEXT NOT NULL,
    trigger          TEXT NOT NULL,                       -- 'install_pipeline' | 'reconciler_probe' | 'user_action' | 'repair'
    detail           TEXT,                                -- free-form diagnostic
    occurred_at      TEXT NOT NULL
);
CREATE INDEX ext_local_llm_idx_state_log_install
    ON ext_local_llm_backend_state_log(install_id);
```

## Entities

### `RuntimeInstall` (existing, extended)

| Field | Type | Notes |
|-------|------|-------|
| id | TEXT PK | UUID |
| backend_family | TEXT | `llamacpp` \| `trt-llm` |
| version | TEXT | semver |
| install_root | TEXT | filesystem path |
| binary_paths | TEXT | JSON array |
| **state** | TEXT | **extended**: `installing` → `installed` → (`needs_repair`) \| `failed` |
| validation_result | TEXT | JSON |
| acceleration | TEXT | `cpu` \| `cuda` \| `metal` \| `rocm` |
| created_at, updated_at | TEXT | ISO-8601 |

**State transitions** (enforced by `installs_store.rs`):

```text
installing ──► installed
installing ──► failed
installed  ──► needs_repair   (reconciler only; never → not_installed)
needs_repair ──► installed    (repair flow)
```

### `InstalledModel` (existing `ext_local_llm_model_installs`, extended)

| Field | Type | Notes |
|-------|------|-------|
| id | TEXT PK | UUID |
| repo_id | TEXT | HF repo id, nullable for local imports |
| revision | TEXT | HF git revision |
| display_name | TEXT | user-visible |
| local_paths | TEXT | JSON array of files |
| size_bytes | INTEGER | total on disk |
| quantization_hint | TEXT | e.g. `Q4_K_M` |
| **model_limits** | TEXT (JSON) | **new**: `{max_ctx, vocab_size, hidden_size, n_heads, n_layers}` |
| **hyperparameters** | TEXT (JSON) | **new**: profile, see below |
| **routed_backend** | TEXT | **new**: which backend will serve this |
| **routing_signal** | TEXT | **new**: why it was routed this way |
| state | TEXT | `registered` \| `installing` \| `ready` \| `failed` |

**Hyperparameters JSON shape**:

```json
{
  "common": {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40,
    "repetition_penalty": 1.1,
    "max_context_length": 8192
  },
  "llamacpp": { "n_gpu_layers": 35, "n_batch": 512, "mlock": false, "mmap": true },
  "trt": { "max_input_len": 4096, "max_output_len": 4096, "enable_kv_cache_reuse": true }
}
```

Validation rules (enforced server-side in `manifest/hyperparameters.rs`):

- `0 < temperature <= 2.0`
- `0 < top_p <= 1.0`
- `0 < top_k`
- `max_context_length <= model_limits.max_ctx`
- `n_gpu_layers` in `[0, model_limits.n_layers]`
- Backend-specific keys ignored when `routed_backend` doesn't match.

### `HostHfCatalogCache` (new, host-owned)

Lives under `nexus-huggingface`. Not extension-namespaced — shared across all HF-capability consumers.

| Field | Type | Notes |
|-------|------|-------|
| cache_key | TEXT PK | SHA-256 of `(endpoint, query, filters, page)` |
| response_body | TEXT | serialized HF JSON |
| etag | TEXT | for conditional revalidation |
| fetched_at | TEXT | ISO-8601 |
| expires_at | TEXT | ISO-8601, default +10 min |

### `BackendStateLog` (new — audit only)

Append-only. Readable via diagnostics API (existing `diagnostics.rs`). Used only for debugging; no business logic depends on its contents.

### `ModelDownloadTask` (existing)

Unchanged schema. Added state-machine clarity:

```text
queued ──► downloading ──► verifying ──► installed
       │                │
       │                └─► cancelled
       └─► cancelled
       
downloading ──► failed   (checksum mismatch, disk full, net error)
```

## Relationships

```text
RuntimeInstall 1 ─── 0..* InstalledModel     (routed_backend references backend_family)
InstalledModel 1 ─── 0..1 Hyperparameters    (embedded column)
InstalledModel 1 ─── 0..* ModelDownloadTask  (historical)
RuntimeInstall 1 ─── 0..* BackendStateLog    (audit)
HfCatalogCache  ─── (standalone; not FK-linked)
```

## Invariants

- `RuntimeInstall.state` can only transition per the state-transition diagram above; any handler attempting `installed → not_installed` or `installed → installing` must be rejected.
- `InstalledModel.routed_backend` must reference a known `backend_family`; the router's decision is recorded at install time and only recomputed on explicit user action (avoids silent reroutes breaking existing loads).
- `InstalledModel.hyperparameters` must validate against `model_limits` on every write.
- A row in `ext_local_llm_model_installs` exists **if and only if** the artifact set on disk passed checksum verification — partial/failed downloads never create a row.
