# Data Model: Builtin Local LLM Chat & RAG Extension

**Spec**: 005
**Storage mechanism**: Spec-004 Extension Storage Contributions
**Namespace alias**: `local_llm`
**Effective prefix**: `ext_local_llm_`
**Migration profile**: `nexus_sqlite_v1`

---

## 1. Storage Contribution Manifest

```yaml
storage:
  namespace: local_llm
  migration_profile: nexus_sqlite_v1
  migrations:
    - file: "storage/migrations/001_backend_and_models.sql"
    - file: "storage/migrations/002_chat_sessions.sql"
    - file: "storage/migrations/003_rag.sql"
```

---

## 2. Entity Definitions

### 2.1 BackendProfile

A user-selectable runtime configuration binding a backend family, runtime mode, model, and generation defaults.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `name` | TEXT | no | User-facing profile name (e.g. "Balanced Local", "NVIDIA Optimized") |
| `backend_family` | TEXT | no | `llamacpp` or `tensorrt_llm` |
| `runtime_mode` | TEXT | no | `native`, `http_server`, `direct_api` (no `wsl_sidecar` — WSL2 is not a supported path) |
| `runtime_install_id` | TEXT | yes | FK -> `runtime_installs.id` |
| `model_install_id` | TEXT | yes | FK -> `model_installs.id` |
| `generation_defaults` | TEXT | yes | JSON: `{ temperature, top_p, top_k, max_tokens, repeat_penalty, stop_sequences }` |
| `cuda_requirement` | TEXT | yes | Required CUDA version (e.g. `12`, `12.4`, `13`). Host validates no conflicting profiles are active simultaneously. |
| `advanced_config` | TEXT | yes | JSON: backend-specific overrides (context size, threads, GPU layers, batch size, etc.) |
| `state` | TEXT | no | Current profile state (see state machine below) |
| `last_health_snapshot` | TEXT | yes | JSON: last normalized health payload |
| `last_health_at` | TEXT | yes | ISO 8601 timestamp |
| `last_error` | TEXT | yes | Last structured error JSON |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

**State machine**: `created -> validating -> ready -> degraded | failed | disabled`

- `created`: Profile exists but no runtime/model bound or started
- `validating`: Checking runtime install + model availability
- `ready`: Backend running, health passing, model loaded
- `degraded`: Backend running but health checks failing or partial capability loss
- `failed`: Backend start failed or crashed; diagnostics preserved
- `disabled`: User disabled this profile

---

### 2.2 RuntimeInstall

A managed installation record for a backend runtime binary or environment.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `backend_family` | TEXT | no | `llamacpp` or `tensorrt_llm` |
| `version` | TEXT | no | Upstream version/tag (e.g. `b8766`) |
| `source_url` | TEXT | yes | Download URL or manifest reference |
| `asset_name` | TEXT | yes | Selected release asset name |
| `checksum` | TEXT | yes | SHA-256 of downloaded archive |
| `install_root` | TEXT | no | Filesystem path to install directory |
| `platform` | TEXT | no | `windows`, `linux`, `macos` |
| `arch` | TEXT | no | `x64`, `arm64` |
| `acceleration` | TEXT | no | `cpu`, `cuda12`, `cuda13`, `vulkan`, `metal` |
| `environment_manifest` | TEXT | yes | JSON: Python version, package versions, CUDA toolkit, etc. |
| `binary_paths` | TEXT | yes | JSON array of discovered binaries |
| `state` | TEXT | no | Current install state |
| `validation_result` | TEXT | yes | JSON: last validation outcome |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

**State machine**: `installing -> installed -> validating -> ready | failed`

- `installing`: Archive download or environment setup in progress
- `installed`: Files on disk, not yet validated
- `validating`: Binary launchability or import checks running
- `ready`: Validated and usable
- `failed`: Install or validation failed; diagnostics preserved

---

### 2.3 ModelInstall

A locally registered model with repo identity, local paths, and backend compatibility.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `repo_id` | TEXT | yes | Hugging Face repo identifier (e.g. `Qwen/Qwen2.5-7B-Instruct-GGUF`) |
| `revision` | TEXT | yes | Git revision or commit hash |
| `display_name` | TEXT | no | User-facing model name |
| `backend_tags` | TEXT | yes | JSON array: `["gguf", "llamacpp", "q4_k_m"]` |
| `selected_files` | TEXT | yes | JSON array of selected filenames |
| `local_paths` | TEXT | no | JSON array of absolute local file paths |
| `source_mode` | TEXT | no | `hf_cache_ref`, `managed_copy`, `local_manual` |
| `size_bytes` | INTEGER | yes | Total size of model files |
| `quantization_hint` | TEXT | yes | Parsed or guessed quantization level |
| `state` | TEXT | no | Current model state |
| `last_used_at` | TEXT | yes | ISO 8601 |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

**State machine**: `registered -> downloading -> ready | failed | missing`

- `registered`: Metadata exists, files may not be present yet
- `downloading`: Download in progress
- `ready`: Files present and validated
- `failed`: Download or validation failed
- `missing`: Previously ready but files no longer found on disk

---

### 2.4 ModelDownloadTask

A first-class download operation with progress tracking.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `repo_id` | TEXT | no | Hugging Face repo |
| `revision` | TEXT | yes | Target revision |
| `requested_files` | TEXT | yes | JSON array of specific filenames to download |
| `download_mode` | TEXT | no | `single_file`, `filtered_snapshot`, `full_snapshot` |
| `backend_target` | TEXT | no | Target backend family |
| `model_install_id` | TEXT | yes | FK -> `model_installs.id` (linked on completion) |
| `status` | TEXT | no | `queued`, `running`, `paused`, `completed`, `failed`, `cancelled` |
| `bytes_downloaded` | INTEGER | yes | Progress |
| `bytes_total` | INTEGER | yes | Total size when known |
| `error` | TEXT | yes | Error message on failure |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

---

### 2.5 ChatThread

An ordered conversation history, host-owned and reusable.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `title` | TEXT | yes | User-visible title (auto-generated or manual) |
| `system_prompt` | TEXT | yes | Default system prompt for this thread |
| `message_count` | INTEGER | no | Cached count of messages |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |
| `archived_at` | TEXT | yes | ISO 8601, null if active |

---

### 2.6 ChatMessage

One message in a thread with role, content, metadata, and retry lineage.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `thread_id` | TEXT | no | FK -> `chat_threads.id` |
| `ordinal` | INTEGER | no | Position in thread (monotonically increasing) |
| `role` | TEXT | no | `system`, `user`, `assistant`, `tool` |
| `content_text` | TEXT | no | Message content |
| `metadata_json` | TEXT | yes | JSON: model used, generation params, stop reason, token counts |
| `retry_of_message_id` | TEXT | yes | FK -> `chat_messages.id` for retry lineage |
| `is_partial` | INTEGER | no | 1 if generation was stopped before completion |
| `created_at` | TEXT | no | ISO 8601 |

**Index**: `(thread_id, ordinal)` for ordered retrieval.

---

### 2.7 ChatSession

A live or recent interactive session bound to a backend profile.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `thread_id` | TEXT | no | FK -> `chat_threads.id` |
| `backend_profile_id` | TEXT | no | FK -> `backend_profiles.id` |
| `model_install_id` | TEXT | yes | FK -> `model_installs.id` (snapshot at session creation) |
| `state` | TEXT | no | Current session state |
| `generation_overrides` | TEXT | yes | JSON: per-session generation parameter overrides |
| `attached_corpus_ids` | TEXT | yes | JSON array of corpus IDs for RAG |
| `last_metrics_snapshot` | TEXT | yes | JSON: normalized backend metrics |
| `last_error` | TEXT | yes | Structured error JSON |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

**State machine**: `created -> starting -> ready -> streaming | idle -> degraded | stopped | failed`

- `created`: Session record exists, backend may not be running
- `starting`: Backend is starting or model is loading
- `ready`: Backend running, ready to accept chat requests
- `streaming`: Currently generating a response
- `idle`: Ready but no active generation
- `degraded`: Backend partially functional
- `stopped`: User stopped the session
- `failed`: Backend crashed or became unrecoverable

---

### 2.8 RagCorpus

A local retrieval corpus.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `name` | TEXT | no | User-visible corpus name |
| `description` | TEXT | yes | Purpose or content description |
| `state` | TEXT | no | `created`, `indexing`, `ready`, `degraded`, `failed` |
| `chunk_count` | INTEGER | yes | Total chunks after indexing |
| `document_count` | INTEGER | yes | Number of documents |
| `embedding_model_id` | TEXT | yes | FK -> `model_installs.id` for the embedding model used |
| `index_manifest_artifact_id` | TEXT | yes | FK -> artifacts table (host core) |
| `created_at` | TEXT | no | ISO 8601 |
| `updated_at` | TEXT | no | ISO 8601 |

**State machine**: `created -> indexing -> ready | degraded | failed`

---

### 2.9 RagDocument

A document included in a corpus.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `corpus_id` | TEXT | no | FK -> `rag_corpora.id` |
| `source_artifact_id` | TEXT | yes | FK -> artifacts table (host core) |
| `source_path` | TEXT | yes | Original file path if local import |
| `normalized_text_artifact_id` | TEXT | yes | FK -> extracted text artifact |
| `metadata_json` | TEXT | yes | JSON: title, author, date, custom fields |
| `chunk_count` | INTEGER | yes | Number of chunks from this document |
| `created_at` | TEXT | no | ISO 8601 |

---

### 2.10 RetrievalTrace

A retrieval output record, always pointing to a typed artifact.

| Field | Type | Nullable | Description |
|-------|------|:--------:|-------------|
| `id` | TEXT | PK | UUID |
| `session_id` | TEXT | yes | FK -> `chat_sessions.id` (for interactive chat) |
| `run_id` | TEXT | yes | FK -> runs table (host core, for workflow execution) |
| `corpus_id` | TEXT | no | FK -> `rag_corpora.id` |
| `query_text` | TEXT | no | The query that triggered retrieval |
| `top_k` | INTEGER | no | Number of chunks requested |
| `trace_artifact_id` | TEXT | no | FK -> artifacts table (host core) |
| `created_at` | TEXT | no | ISO 8601 |

---

## 3. Migration Files

### Migration 001: Backend and Models

```sql
-- storage/migrations/001_backend_and_models.sql
CREATE TABLE ext_local_llm_runtime_installs (
    id TEXT PRIMARY KEY NOT NULL,
    backend_family TEXT NOT NULL,
    version TEXT NOT NULL,
    source_url TEXT,
    asset_name TEXT,
    checksum TEXT,
    install_root TEXT NOT NULL,
    platform TEXT NOT NULL,
    arch TEXT NOT NULL,
    acceleration TEXT NOT NULL,
    environment_manifest TEXT,
    binary_paths TEXT,
    state TEXT NOT NULL DEFAULT 'installing',
    validation_result TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_model_installs (
    id TEXT PRIMARY KEY NOT NULL,
    repo_id TEXT,
    revision TEXT,
    display_name TEXT NOT NULL,
    backend_tags TEXT,
    selected_files TEXT,
    local_paths TEXT NOT NULL,
    source_mode TEXT NOT NULL,
    size_bytes INTEGER,
    quantization_hint TEXT,
    state TEXT NOT NULL DEFAULT 'registered',
    last_used_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_model_download_tasks (
    id TEXT PRIMARY KEY NOT NULL,
    repo_id TEXT NOT NULL,
    revision TEXT,
    requested_files TEXT,
    download_mode TEXT NOT NULL,
    backend_target TEXT NOT NULL,
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    status TEXT NOT NULL DEFAULT 'queued',
    bytes_downloaded INTEGER,
    bytes_total INTEGER,
    error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_backend_profiles (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    backend_family TEXT NOT NULL,
    runtime_mode TEXT NOT NULL,
    runtime_install_id TEXT REFERENCES ext_local_llm_runtime_installs(id),
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    generation_defaults TEXT,
    advanced_config TEXT,
    state TEXT NOT NULL DEFAULT 'created',
    last_health_snapshot TEXT,
    last_health_at TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_profiles_state ON ext_local_llm_backend_profiles(state);
CREATE INDEX ext_local_llm_idx_models_state ON ext_local_llm_model_installs(state);
CREATE INDEX ext_local_llm_idx_downloads_status ON ext_local_llm_model_download_tasks(status);
```

### Migration 002: Chat Sessions

```sql
-- storage/migrations/002_chat_sessions.sql
CREATE TABLE ext_local_llm_chat_threads (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    system_prompt TEXT,
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived_at TEXT
);

CREATE TABLE ext_local_llm_chat_messages (
    id TEXT PRIMARY KEY NOT NULL,
    thread_id TEXT NOT NULL REFERENCES ext_local_llm_chat_threads(id),
    ordinal INTEGER NOT NULL,
    role TEXT NOT NULL,
    content_text TEXT NOT NULL,
    metadata_json TEXT,
    retry_of_message_id TEXT REFERENCES ext_local_llm_chat_messages(id),
    is_partial INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_chat_sessions (
    id TEXT PRIMARY KEY NOT NULL,
    thread_id TEXT NOT NULL REFERENCES ext_local_llm_chat_threads(id),
    backend_profile_id TEXT NOT NULL REFERENCES ext_local_llm_backend_profiles(id),
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    state TEXT NOT NULL DEFAULT 'created',
    generation_overrides TEXT,
    attached_corpus_ids TEXT,
    last_metrics_snapshot TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_messages_thread ON ext_local_llm_chat_messages(thread_id, ordinal);
CREATE INDEX ext_local_llm_idx_sessions_state ON ext_local_llm_chat_sessions(state);
CREATE INDEX ext_local_llm_idx_sessions_thread ON ext_local_llm_chat_sessions(thread_id);
```

### Migration 003: RAG

```sql
-- storage/migrations/003_rag.sql
CREATE TABLE ext_local_llm_rag_corpora (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    state TEXT NOT NULL DEFAULT 'created',
    chunk_count INTEGER,
    document_count INTEGER,
    embedding_model_id TEXT REFERENCES ext_local_llm_model_installs(id),
    index_manifest_artifact_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_rag_documents (
    id TEXT PRIMARY KEY NOT NULL,
    corpus_id TEXT NOT NULL REFERENCES ext_local_llm_rag_corpora(id),
    source_artifact_id TEXT,
    source_path TEXT,
    normalized_text_artifact_id TEXT,
    metadata_json TEXT,
    chunk_count INTEGER,
    created_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_retrieval_traces (
    id TEXT PRIMARY KEY NOT NULL,
    session_id TEXT REFERENCES ext_local_llm_chat_sessions(id),
    run_id TEXT,
    corpus_id TEXT NOT NULL REFERENCES ext_local_llm_rag_corpora(id),
    query_text TEXT NOT NULL,
    top_k INTEGER NOT NULL,
    trace_artifact_id TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_rag_docs_corpus ON ext_local_llm_rag_documents(corpus_id);
CREATE INDEX ext_local_llm_idx_traces_session ON ext_local_llm_retrieval_traces(session_id);
CREATE INDEX ext_local_llm_idx_traces_run ON ext_local_llm_retrieval_traces(run_id);
```

---

## 4. Relationship Diagram

```text
BackendProfile
  ├── runtime_install_id -> RuntimeInstall
  ├── model_install_id -> ModelInstall
  └── <referenced by> ChatSession.backend_profile_id

RuntimeInstall
  └── <referenced by> BackendProfile.runtime_install_id

ModelInstall
  ├── <referenced by> BackendProfile.model_install_id
  ├── <referenced by> ChatSession.model_install_id
  ├── <referenced by> RagCorpus.embedding_model_id
  └── <linked from> ModelDownloadTask.model_install_id

ModelDownloadTask
  └── model_install_id -> ModelInstall

ChatThread
  ├── <contains> ChatMessage[] (ordered by ordinal)
  └── <referenced by> ChatSession.thread_id

ChatMessage
  ├── thread_id -> ChatThread
  └── retry_of_message_id -> ChatMessage (self-ref for retry lineage)

ChatSession
  ├── thread_id -> ChatThread
  ├── backend_profile_id -> BackendProfile
  ├── model_install_id -> ModelInstall
  └── <referenced by> RetrievalTrace.session_id

RagCorpus
  ├── embedding_model_id -> ModelInstall
  ├── <contains> RagDocument[]
  └── <referenced by> RetrievalTrace.corpus_id

RagDocument
  └── corpus_id -> RagCorpus

RetrievalTrace
  ├── session_id -> ChatSession
  ├── corpus_id -> RagCorpus
  └── trace_artifact_id -> artifacts (host core table)
```

---

## 5. Cross-References to Host Core Tables

Extension tables reference host core tables via TEXT foreign keys (not enforced by SQLite FK constraints across namespaces):

| Extension Field | Host Core Table | Purpose |
|-----------------|-----------------|---------|
| `RagCorpus.index_manifest_artifact_id` | `artifacts.id` | Links corpus index to host artifact |
| `RagDocument.source_artifact_id` | `artifacts.id` | Links document source to host artifact |
| `RagDocument.normalized_text_artifact_id` | `artifacts.id` | Links extracted text to host artifact |
| `RetrievalTrace.trace_artifact_id` | `artifacts.id` | Links retrieval trace to host artifact |
| `RetrievalTrace.run_id` | `runs.id` | Links trace to workflow run |
