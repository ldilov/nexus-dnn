# Data Model: llama.cpp Throughput Tier-1 Knobs

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

## Entity inventory

| Entity | Owner | Persistence | Mutability |
|---|---|---|---|
| `RuntimeTuning` | Extension Rust + TS mirror | Per-load, in-flight; persisted via `lastTuningByFamily` localStorage in the form | Immutable per request — caller constructs, callee reads |
| `AvailableModelDto` | Extension Rust + TS mirror | Derived per-request from host store; no persistence on extension side | Read-only at the response level |
| `InstalledArtifact` (host row type) | Host crate `nexus-models-store` | SQLite — host-owned `model_store_installed_artifacts` table | Mutated only by the host install pipeline |
| `ExtractedMetadata` (host) | Host crate `nexus-model-metadata` | Transient (returned from extractor) | Read-only after construction |
| `VramBudgetEstimate` | Frontend pure helper | Transient (recomputed on form change) | Read-only |
| `KnownBrokenModelMatcher` (verdict) | Frontend pure module | Transient | Read-only |
| `SamplerPreset` | Frontend value-map + form-local state | `lastTuningByFamily.activePreset` | Form-local |
| `WarningRule` | Frontend curated registry | Static module-level constant | Read-only |

---

## RuntimeTuning (extended)

### Rust (extension) — `extensions/builtin/local-llm/rust/src/chat/handlers.rs`

Existing 13 fields preserved. The struct already carries `#[serde(default)]` + `#[non_exhaustive]` (per Principle V); new fields ride the same discipline.

```rust
#[derive(Clone, Debug, Default, Deserialize, Serialize)]
#[non_exhaustive]
pub struct RuntimeTuning {
    pub n_gpu_layers: Option<u32>,
    pub threads: Option<u32>,
    pub flash_attn: Option<bool>,
    pub ctx_size: Option<u32>,
    pub cache_type_k: Option<String>,
    pub cache_type_v: Option<String>,
    pub mmap: Option<bool>,
    pub mlock: Option<bool>,
    pub n_batch: Option<u32>,
    pub n_ubatch: Option<u32>,
    pub n_parallel: Option<u32>,
    pub cont_batching: Option<bool>,
    pub seed: Option<i64>,

    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cache_reuse: Option<u32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cram_mb: Option<u32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub checkpoint_every_n_tokens: Option<u32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub n_cpu_moe: Option<u32>,

    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub min_p: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_multiplier: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_base: Option<f32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_allowed_length: Option<u32>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dry_penalty_last_n: Option<i32>,

    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub swa_full: Option<bool>,
}
```

### TypeScript mirror — `apps/web/src/services/local_llm_chat.ts`

```ts
export interface RuntimeTuning {
  n_gpu_layers?: number | null;
  threads?: number | null;
  flash_attn?: boolean | null;
  ctx_size?: number | null;
  cache_type_k?: string | null;
  cache_type_v?: string | null;
  mmap?: boolean | null;
  mlock?: boolean | null;
  n_batch?: number | null;
  n_ubatch?: number | null;
  n_parallel?: number | null;
  cont_batching?: boolean | null;
  seed?: number | null;

  cache_reuse?: number | null;
  cram_mb?: number | null;
  checkpoint_every_n_tokens?: number | null;
  n_cpu_moe?: number | null;

  min_p?: number | null;
  dry_multiplier?: number | null;
  dry_base?: number | null;
  dry_allowed_length?: number | null;
  dry_penalty_last_n?: number | null;

  swa_full?: boolean | null;
}
```

### Validation rules

| Field | Range / Form rule | Source |
|---|---|---|
| `cache_reuse` | `Some(n)` where `n ∈ [64, 2048]`. `None` = off. | FR-001, FR-012 |
| `cram_mb` | `Some(n)` where `n ∈ [256, 32768]`. `None` = off. | FR-001, FR-013 |
| `checkpoint_every_n_tokens` | `Some(n)` where `n ∈ [1024, 65536]`. `None` = off. | FR-001, FR-013 |
| `n_cpu_moe` | `Some(n)` where `n ∈ [0, expert_layer_count ?? 64]`. `Some(0)` and `None` are both treated as off; `runtime_to_args` does NOT emit the flag for either. | FR-001, FR-002, FR-014 |
| `min_p` | `Some(p)` where `p ∈ (0.0, 1.0]`. `Some(0.0)` and `None` both suppress the flag. | FR-021, FR-022 |
| `dry_multiplier` | `Some(m)` where `m > 0.0`. `Some(0.0)` suppresses ALL DRY flags. | FR-022 |
| `dry_base` | `Some(b)` where `b ∈ (1.0, 5.0]`. Default `1.75` (Creative preset). | FR-021 |
| `dry_allowed_length` | `Some(n)` where `n ∈ [1, 16]`. Default `2`. | FR-021 |
| `dry_penalty_last_n` | `Some(n)` where `n ∈ [-1, 8192]`. `-1` = "use ctx_size". | FR-021 |
| `swa_full` | `Some(true)` only when cache-reuse override is on for a known-broken family. Form does not allow direct mutation. | FR-029, R8/R9 |

### Form-local state not on `RuntimeTuning`

These flags drive UI behaviour but are NOT serialised onto the `RuntimeTuning` payload:

| Flag | Scope | Persisted? | Resets when |
|---|---|---|---|
| `cache_reuse_override` | per-family | YES — `lastTuningByFamily[familyId].cache_reuse_override` | operator clicks "lock again" (or never; sticky once set) |
| `allow_low_top_k` | session-only (per-dialog-open) | NO | dialog closes, model switches, or a different family is loaded |
| `activePreset` | per-family | YES — `lastTuningByFamily[familyId].activePreset` | clearing all preset fields manually returns it to `null` |

**`allow_low_top_k` rationale (FR-027)**: the override toggle that unlocks `top_k` values below 40 is intentionally NOT persisted across dialog opens. Operators who want a sub-40 `top_k` MUST re-affirm the choice each session; this matches the FR-027 wording "off by default" and prevents the slowdown footgun from quietly persisting after a config import or a long break. Form-local state lives next to the form's other transient flags (focus, hover, expanded-section state) and is dropped when `RuntimeTuningForm` unmounts.

### State transitions (form-local)

```
sampler_preset_state:
  none ──click(chip)──▶ active(chip) ──manualEdit──▶ modified(chip)
                          ▲                              │
                          │                              ▼
                          │      ◀──confirm── confirmDialog
                          │                              │
                          └────────click(otherChip)──────┘ (also: click(chip) when modified opens confirmDialog)

cache_reuse_safety_lock:
  (broken-family) ──renderForm──▶ disabled
       disabled ──click("enable anyway")──▶ unlocked
       unlocked ──toggleOn──▶ on (cache_reuse=Some, swa_full=Some(true))
       unlocked ──toggleOff──▶ off (both fields cleared)

batch_size_auto_bump:
  (n_cpu_moe = 0) ──drag(>0)──▶ snap n_batch=max(current,2048), n_ubatch=max(current,2048), show callout
  (n_cpu_moe > 0) ──drag(0)──▶ clear callout, leave n_batch/n_ubatch alone (operator may still want their bumped values)
```

---

## AvailableModelDto (extended)

### Rust — `extensions/builtin/local-llm/rust/src/chat/handlers.rs`

```rust
#[derive(Debug, Serialize)]
pub struct AvailableModelDto {
    pub install_id: String,
    pub family_id: String,
    pub variant_id: String,
    pub display_name: String,
    pub size_bytes: i64,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub format: Option<String>,
    pub extraction_status: Option<String>,

    pub is_moe: bool,
    pub expert_layer_count: Option<u32>,
}
```

### TypeScript mirror

```ts
export interface AvailableModel {
  install_id: string;
  family_id: string;
  variant_id: string;
  display_name: string;
  size_bytes: number;
  layer_count: number | null;
  max_context: number | null;
  architecture: string | null;
  format: string | null;
  extraction_status: string | null;

  is_moe: boolean;
  expert_layer_count: number | null;
}
```

### Source

- `is_moe` — the host row's `model_store_installed_artifacts.is_moe` column (0/1 or NULL); the extension surfaces it as `bool` (NULL → `false`).
- `expert_layer_count` — the host row's `model_store_installed_artifacts.expert_layer_count` column (INTEGER or NULL); surfaced as `Option<u32>` / `number | null` unchanged.

### Frontend usage

- `is_moe === false` → MoE offload slider HIDDEN (FR-014 + SC-004).
- `is_moe === true` AND `expert_layer_count !== null` → slider visible with `max = expert_layer_count`.
- `is_moe === true` AND `expert_layer_count === null` → slider visible with `max = 64` (fallback) and an "exact layer count unknown" note.

---

## InstalledArtifact (host row, extended)

### Schema delta (`migrations/021_installed_artifact_moe_metadata.sql`)

```sql
ALTER TABLE model_store_installed_artifacts ADD COLUMN is_moe INTEGER;
ALTER TABLE model_store_installed_artifacts ADD COLUMN expert_layer_count INTEGER;
```

Both columns nullable; default `NULL`. No new indexes — neither column is filtered on in any current query path (the local-llm extension reads them per-row alongside the existing columns).

### Rust row struct — `crates/nexus-models-store/src/model.rs`

```rust
pub struct InstalledArtifact {
    pub install_id: String,
    pub family_id: String,
    pub variant_id: String,
    pub display_name: String,
    pub size_bytes: i64,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub format: Option<String>,
    pub extraction_status: Option<ExtractionStatus>,
    pub extracted_at: Option<i64>,

    pub is_moe: Option<bool>,
    pub expert_layer_count: Option<u32>,
}
```

### Migration discipline

- **Append-only**: migration ID 021 is the next free ID after 020 (`deployments_soft_delete.sql`).
- **Idempotent**: `ALTER TABLE … ADD COLUMN` is naturally idempotent under SQLite when wrapped in the existing migration runner's `IF NOT EXISTS` shim. Confirm by running migration twice on a fresh DB → second run is a no-op.
- **Reversible** (for the round-trip test): the migration runner's reverse handler drops the columns; reverse direction is exercised by `installed_artifacts_migration_is_additive_and_reversible` (FR-008).

### Re-probe trigger (FR-007)

```text
read_installed_artifact(install_id):
  row = sqlx::query_as!(...).fetch_one(...);
  if row.is_moe IS NULL AND row.extraction_status = 'success':
    spawn re_probe_moe_metadata(install_id) [non-blocking];
    return row as-is for this read;
  else:
    return row;

re_probe_moe_metadata(install_id):
  metadata = nexus_model_metadata::extract_any(row.path, install_id);
  sqlx::query!("UPDATE model_store_installed_artifacts
                SET is_moe = ?, expert_layer_count = ?
                WHERE install_id = ?", ...).execute(...);
```

The re-probe is fire-and-forget on the host's existing tokio runtime; the read returns the legacy NULL state for the first call and the cached value on subsequent calls.

---

## ExtractedMetadata (host) — extended

### Rust — `crates/nexus-model-metadata/src/model.rs`

```rust
pub struct ExtractedMetadata {
    pub install_id: String,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub format: Option<String>,
    pub extraction_status: ExtractionStatus,

    pub is_moe: Option<bool>,
    pub expert_layer_count: Option<u32>,
}
```

### Extraction algorithm (`crates/nexus-model-metadata/src/gguf.rs`)

```text
extract(path, install_id):
  let header = read_gguf_header(path)?;
  let arch = header.get_string("general.architecture");
  let layer_count = header.get_u32(format!("{arch}.block_count"));
  let expert_count = header.get_u32(format!("{arch}.expert_count")).unwrap_or(0);

  let is_moe = if expert_count > 0 {
    Some(true)
  } else if MOE_ARCHITECTURES.contains(arch.as_str()) {
    Some(true)
  } else if /* readable header but no MoE indicator */ {
    Some(false)
  } else {
    None
  };

  let expert_layer_count = match is_moe {
    Some(true) => layer_count,
    Some(false) => None,
    None => None,
  };

  ExtractedMetadata { ..., is_moe, expert_layer_count, extraction_status: status_from(...) }
```

`MOE_ARCHITECTURES` is the curated set: `{ "mixtral", "qwen2moe", "qwen3moe", "deepseek2", "dbrx", "gptoss", "glm4_moe" }`. Adding a new family is a one-line change; the reader does not need to know what each arch does, only that it's MoE.

---

## VramBudgetEstimate (frontend) — `apps/web/src/layout/local_llm/vram_budget.ts`

### Inputs

```ts
interface VramBudgetInputs {
  modelSizeBytes: number;
  nGpuLayers: number;          // operator-set; clamped to [0, totalLayers]
  totalLayers: number;          // model.layer_count ?? 32 fallback
  nCpuMoe: number;              // operator-set; 0 means "no MoE offload"
  expertLayerCount: number;     // model.expert_layer_count ?? 64 fallback
  hostVramBytes?: number;       // optional; null/undefined when host VRAM unknown
}
```

### Output

```ts
interface VramBudgetEstimate {
  gpuBytesUsed: number;
  gpuBytesRemaining: number | null;
}
```

### Formula

```ts
const MOE_FRACTION_OF_MODEL = 0.85;

const gpuLayerFraction = nGpuLayers / Math.max(1, totalLayers);
const moeOffloadFraction = (nCpuMoe / Math.max(1, expertLayerCount)) * MOE_FRACTION_OF_MODEL;
const gpuBytesUsed = modelSizeBytes * gpuLayerFraction * (1 - moeOffloadFraction);
const gpuBytesRemaining = hostVramBytes != null ? hostVramBytes - gpuBytesUsed : null;
```

### Golden cases (pinned by `vram_budget_helper_golden_inputs` test, FR-019)

| Case | modelSize | nGpuLayers | totalLayers | nCpuMoe | expertLayerCount | hostVram | gpuBytesUsed (≈) | gpuBytesRemaining (≈) |
|---|---|---|---|---|---|---|---|---|
| Dense 7B all-GPU | 4.7 GB | 32 | 32 | 0 | 0 (use fallback 64 internally; doesn't matter at nCpuMoe=0) | 24 GB | 4.7 GB | 19.3 GB |
| Mixtral 8x7B no offload | 26 GB | 32 | 32 | 0 | 32 | 24 GB | 26 GB | -2 GB (UI clamps to "exceeded") |
| GPT-OSS-120B with 28-layer offload | 65 GB | 40 | 40 | 28 | 40 | 24 GB | ~26 GB | ~-2 GB (UI shows "exceeded") |

The third row is the "fits-by-design" target — the formula intentionally returns a number that's directionally larger than what really fits because the operator should bump `n_cpu_moe` further. Real-world fit confirmation is by the Load button succeeding, not by the read-out.

---

## KnownBrokenModelMatcher (frontend) — `apps/web/src/layout/local_llm/known_broken_models.ts`

### Verdict shape

```ts
interface KnownBrokenVerdict {
  broken: boolean;
  reason?: string;
  upstreamIssue?: string;
}

export function isKnownBrokenForCacheReuse(familyId: string): KnownBrokenVerdict;
```

### Curated list

| Family pattern | Reason | Upstream issue |
|---|---|---|
| starts-with `gemma-3-` | Gemma 3 SWA + cache-reuse interaction is broken without `--swa-full`. | [#21468](https://github.com/ggml-org/llama.cpp/issues/21468) |
| includes `qwen3-next` (case-insensitive) | Qwen3-Next SWA hybrid breaks cache-reuse. | [#18497](https://github.com/ggml-org/llama.cpp/issues/18497) |

Adding a new pattern is a one-line addition. The matcher is pure (no side effects, no I/O); the same matcher drives FR-029 (auto `--swa-full`).

---

## SamplerPreset (frontend) — `apps/web/src/layout/local_llm/sampler_presets.ts`

```ts
export type SamplerPresetId = 'chat' | 'code' | 'creative';

export const SAMPLER_PRESETS: Record<SamplerPresetId, Partial<RuntimeTuning>> = {
  chat: {
    dry_multiplier: null,
    min_p: null,
    // top_k unchanged from form default
  },
  code: {
    dry_multiplier: null,
    min_p: 0.10,
    // top_k clamped to 40 in the form layer (out-of-band)
    // temperature: 0.2 — also out-of-band; lives on existing samplers tray, not RuntimeTuning
  },
  creative: {
    dry_multiplier: 0.8,
    dry_base: 1.75,
    dry_allowed_length: 2,
    min_p: 0.02,
  },
};
```

### State machine

| State | Trigger | Next state |
|---|---|---|
| `none` | click chip X | `active(X)` |
| `active(X)` | manual edit of any field in `SAMPLER_PRESETS[X]` | `modified(X)` |
| `active(X)` | click chip Y (Y ≠ X) | `active(Y)` |
| `modified(X)` | click chip X | open confirm dialog → on confirm: `active(X)` (re-applies preset, drops manual edits) |
| `modified(X)` | click chip Y | `active(Y)` (no confirm; switching to a different chip implicitly accepts losing the manual edits) |

### Persistence

`lastTuningByFamily[familyId].activePreset: SamplerPresetId | null`. Re-opening for the same family replays the chip state; manual modifications are not persisted as "modified" (the dot indicator resets on re-open — operator's persisted state IS the preset value-map plus their manual delta).

---

## WarningRule (frontend) — `apps/web/src/layout/local_llm/warning_rules.ts`

```ts
interface WarningRule {
  id: string;
  predicate: (form: RuntimeTuning, model: AvailableModel | null) => boolean;
  render: {
    severity: 'info' | 'warning' | 'error';
    copy: string;
    action?: {
      label: string;
      apply: (form: RuntimeTuning) => Partial<RuntimeTuning>;
    };
  };
}

export const WARNING_RULES: WarningRule[];
```

### Registered rules

| id | Predicate | Severity | Action |
|---|---|---|---|
| `gemma3-flash-q8` | model is Gemma 3 family AND `flash_attn === true` AND (`cache_type_k === 'q8_0'` OR `cache_type_v === 'q8_0'`) | warning | "Force FP16 KV" → `{ cache_type_k: 'fp16', cache_type_v: 'fp16' }` |
| `top-k-zero` | `top_k <= 0` | info | (clamping is at the input layer, not the rule layer; the chip is informational) |
| `n-parallel-advisory` | `n_parallel > 1` | info | none |
| `cpu-batch-regression` | `n_gpu_layers === 0 && n_batch > 1024` | warning | none |

The `swa-full-auto` rule is NOT in this registry — it's an argv-time mutation triggered by the cache-reuse override, not a render-time chip. Its inline note next to the override checkbox is rendered directly by the form, not by the warning-rule iterator.

---

## Migration cross-reference

| Migration | Owner | Tables touched | Spec |
|---|---|---|---|
| `migrations/014_model_store_installed_artifacts.sql` | host | `model_store_installed_artifacts` (CREATE) | spec 025 |
| `migrations/015_installed_artifact_extraction_metadata.sql` | host | `model_store_installed_artifacts` (ADD: layer_count, max_context, architecture, hidden_size, extraction_status, extracted_at) | spec 028 |
| `migrations/021_installed_artifact_moe_metadata.sql` | host | `model_store_installed_artifacts` (ADD: is_moe, expert_layer_count) | **spec 039 (this spec)** |
| `extensions/builtin/local-llm/storage/migrations/008_chat_history_persistence.sql` | extension | `ext_local_llm__*` chat tables | spec 029 |

Spec 039 does NOT add an extension-side migration. The latest extension migration remains 008.
