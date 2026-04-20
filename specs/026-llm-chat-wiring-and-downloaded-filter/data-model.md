# Data Model — Spec 026

## Entities

### Reused

- `InstalledArtifactRow` (from spec 025,
  `crates/nexus-models-store/src/downloads/install_map.rs`). Fields:
  `artifact_id`, `family_id`, `variant_id`, `format`, `filename`,
  `size_bytes`, `sha256`, `source_provider`, `source_repo`,
  `source_revision`, `installed_at`, `job_id`. Table:
  `model_store_installed_artifacts` (migration 014, frozen).

- `Thread` (extension, table `threads` in extension DB). Existing
  fields: `thread_id TEXT PK`, `title TEXT`, `created_at TEXT`,
  `updated_at TEXT`, `archived INTEGER`.

### New (Rust side)

```rust
pub struct InstalledArtifactDto {
    pub artifact_id: String,
    pub family_id: String,
    pub variant_id: String,
    pub format: String,
    pub filename: String,
    pub size_bytes: Option<u64>,
    pub source_repo: String,
    pub source_revision: Option<String>,
    pub installed_at: String,
}

pub struct InstalledIndexDto {
    pub family_ids: Vec<String>,
    pub installed: Vec<InstalledArtifactDto>,
    pub truncated: bool,
}
```

Serde: `rename_all = "snake_case"`. Derives:
`Debug, Clone, Serialize, Deserialize`.

No new domain enums. `format` stays a free string on the wire to match
the existing `Format` enum's snake-case serialisation.

### New (extension side, Python)

```python
class GenerationParams(BaseModel):
    temperature: float = 0.8
    top_p: float = 0.95
    top_k: int = 40
    max_tokens: int = 4096
    repeat_penalty: float = 1.1
    system_prompt: str = "You are a helpful assistant."

class ActiveModelBinding(BaseModel):
    family_id: str
    variant_id: str
    artifact_id: str
    absolute_path: str
    label: str

class Thread(BaseModel):
    thread_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    archived: bool
    generation_settings: GenerationParams | None
    active_model_family_id: str | None
    active_model_variant_id: str | None

class DownloadedModel(BaseModel):
    family_id: str
    variant_id: str
    artifact_id: str
    label: str
    format: str
    size_bytes: int | None
    installed_at: datetime
```

## Schema changes

### Host (Rust) — no migration

Spec 025 already shipped migration 014
(`model_store_installed_artifacts`). Reuse as-is.

### Extension — one additive migration

File: `extensions/builtin/local-llm/storage/migrations/002_generation_settings.sql`

```sql
-- idempotent
ALTER TABLE threads ADD COLUMN generation_settings TEXT;
ALTER TABLE threads ADD COLUMN active_model_family_id TEXT;
ALTER TABLE threads ADD COLUMN active_model_variant_id TEXT;
```

SQLite tolerates duplicate column errors when re-run via the
extension's migration runner idempotency guard (existing behaviour).

## Validation rules

- `GenerationParams.temperature ∈ [0.0, 2.0]`; the adapter clamps to
  SIL backend limits but the API accepts the spec's range.
- `GenerationParams.top_p ∈ [0.0, 1.0]`.
- `GenerationParams.top_k ∈ [1, 100]`.
- `GenerationParams.max_tokens ∈ [1, 32768]`.
- `GenerationParams.repeat_penalty ∈ [0.0, 2.0]`.
- `GenerationParams.system_prompt` ≤ 8192 chars; empty string ⇒ omit
  the `role: system` turn.
- `ActiveModelBinding.absolute_path` MUST exist on disk at send-time;
  FR-014 covers the dead-pointer case.

## State transitions

### Thread lifecycle

```
Created ─(user deletes)─> Archived
Created ─(user picks model)─> Created with bound model
Created with bound model ─(model uninstalled)─> Created with dangling binding
```

No hard delete in this spec; archive is soft-delete as in the existing
schema.

### GenerationParams per message

Each persisted message freezes the `GenerationParams` active at send
time into its own metadata column (`messages.params_snapshot TEXT`).
Retroactive changes to the thread's `generation_settings` do not rewrite
snapshots. FR-021.

## DTO ↔ domain mapping

| Rust domain (`nexus-models-store`) | Rust DTO (`nexus-api`) | Wire (JSON) |
|---|---|---|
| `InstalledArtifactRow` | `InstalledArtifactDto` | `snake_case` |
| `Vec<InstalledArtifactRow> + truncated flag` | `InstalledIndexDto` | same |

| Python domain (extension) | Python DTO | Wire |
|---|---|---|
| `GenerationParams` | same (pydantic `.dict()`) | JSON-RPC params |
| `ActiveModelBinding` | same | JSON-RPC params |
| `Thread` | same | JSON-RPC result |

No Rust ↔ Python translation happens at any point; the only shared
wire shape is the REST DTO (`InstalledIndexDto`) which the extension
consumes over HTTP.
