# Data Model — Spec 034

Additive-only schema changes. Two SQLite migrations, one YAML registry, six existing entities gain optional fields. No new tables.

---

## Migrations

### `011_deployment_engine_settings.sql`

Adds four nullable columns to `ext_emotion_tts__deployments`. Nullable so migration is safe against live rows; application-level defaults fill them on first read.

```sql
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN reference_preprocess_enabled INTEGER;
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN oas_enabled INTEGER;
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN compile_gpt_enabled INTEGER;
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN model_family TEXT;
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN oas_threshold_learned REAL;
ALTER TABLE ext_emotion_tts__deployments ADD COLUMN oas_samples_seen INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_deployments_model_family
    ON ext_emotion_tts__deployments (model_family)
    WHERE model_family IS NOT NULL;
```

Defaults on application read: `reference_preprocess_enabled = 1`, `oas_enabled = 1`, `compile_gpt_enabled = 0`, `model_family = "indextts-2"`, `oas_threshold_learned = NULL` (cold-start uses literature default 0.45).

### `012_voice_assets_preprocess.sql`

One nullable column on `ext_emotion_tts__voice_assets` pointing at the preprocessed artifact (if one was generated).

```sql
ALTER TABLE ext_emotion_tts__voice_assets ADD COLUMN preprocessed_artifact_ref TEXT;
ALTER TABLE ext_emotion_tts__voice_assets ADD COLUMN preprocessing_report_json TEXT;
```

`preprocessing_report_json` stores the per-stage pass/fail report from `ref_audio.py` (denoise, VAD, loudness, truncation) as a JSON blob. Schema documented under entity `VoiceAssetPreprocessing` below.

---

## Entities (updates to existing)

### `Deployment` (row in `ext_emotion_tts__deployments`)

Existing columns unchanged. New columns from migration 011:

| Column | Type | Semantics |
|---|---|---|
| `reference_preprocess_enabled` | `INTEGER` (0/1, nullable) | Deployment-level override for per-voice-asset preprocess toggle. Default `1` on read. |
| `oas_enabled` | `INTEGER` (0/1, nullable) | Capture attention + emit alignment scores. Default `1`. |
| `compile_gpt_enabled` | `INTEGER` (0/1, nullable) | Opt-in `torch.compile` for the GPT stage. Default `0`. |
| `model_family` | `TEXT` (nullable) | `family_id` from `recipes/families/*.yaml`. Default `"indextts-2"`. |
| `oas_threshold_learned` | `REAL` (nullable) | Rolling-MAD threshold; NULL triggers cold-start literature default 0.45. |
| `oas_samples_seen` | `INTEGER` NOT NULL default 0 | Rolling window size so we know when to switch from literature to rolling-MAD. |

**Transitions**:
- User toggles a switch in the UI → `PATCH /deployments/:id/engine-settings` → row update.
- Run completes with OAS enabled → worker POSTs learned threshold update to `PATCH /deployments/:id/oas-threshold` → row update.

### `VoiceAsset` (row in `ext_emotion_tts__voice_assets`)

New columns from migration 012:

| Column | Type | Semantics |
|---|---|---|
| `preprocessed_artifact_ref` | `TEXT` (nullable) | Host-artifact-store ref to the preprocessed clip. NULL if preprocessing was off or failed. |
| `preprocessing_report_json` | `TEXT` (nullable) | Serialised `VoiceAssetPreprocessing` report. |

**Transitions**:
- Voice asset uploaded with preprocessing on → worker runs pipeline → host store receives the preprocessed clip → row gets `preprocessed_artifact_ref` + `preprocessing_report_json`.
- User toggles preprocess off for a specific voice asset → row's `preprocessed_artifact_ref` is preserved (for history) but synthesis picks the original.

### `VoiceAssetPreprocessing` (JSON blob inside `preprocessing_report_json`)

```jsonc
{
  "pipeline_version": "1",
  "stages": [
    { "stage": "decode",     "status": "ok", "duration_ms": 8, "input_sample_rate": 48000, "output_sample_rate": 24000 },
    { "stage": "mono",       "status": "ok", "duration_ms": 2 },
    { "stage": "denoise",    "status": "ok", "duration_ms": 180, "engine": "rnnoise" },
    { "stage": "vad_trim",   "status": "ok", "duration_ms": 40,  "engine": "silero_vad", "trimmed_ms_leading": 320, "trimmed_ms_trailing": 140 },
    { "stage": "loudness",   "status": "ok", "duration_ms": 20, "lufs_before": -27.8, "lufs_after": -25.1 },
    { "stage": "peak_limit", "status": "ok", "duration_ms": 5,  "peak_before_dbfs": -2.1, "peak_after_dbfs": -1.0 },
    { "stage": "truncate",   "status": "ok", "duration_ms": 1,  "duration_before_ms": 42000, "duration_after_ms": 15000, "selection": "highest_activity_window" }
  ],
  "succeeded": true,
  "warnings": []
}
```

### `ModelFamily` (derived from `recipes/families/*.yaml`)

Descriptor fields:

| Field | Type | Semantics |
|---|---|---|
| `family_id` | string | Unique id. Used in `Deployment.model_family` and in cache keys. |
| `display_name` | string | UI label. |
| `model_family_ref` | string | Host model-store family reference (e.g., `"IndexTeam/IndexTTS-2"`). |
| `engine_version_constraint` | SemVer range | Version of `index-tts` Python package that this family is compatible with. |
| `supported_languages` | `[string]` | ISO 639-1 codes. |
| `expected_artifacts` | `[string]` | File names expected inside the model dir. |
| `default_generation` | object | Per-family generation defaults applied when a deployment is freshly created. |

Reconciliation against the host model-store produces a runtime `FamilyStatus` per descriptor:

| Value | Meaning |
|---|---|
| `available` | All expected artifacts present; compatible engine version detected; ready to synthesize. |
| `not_installed` | Host model-store does not have this family; UI shows "Install" CTA. |
| `partial` | Some expected artifacts missing; UI shows "Repair" CTA. |
| `incompatible` | Engine version does not satisfy `engine_version_constraint`; UI shows structured warning. |

### `AlignmentDiagnostics` (per-segment block in manifest)

Attached to each completed segment's manifest entry when OAS is enabled. Absent for unflagged segments if the user wants a lean manifest — but the score is ALWAYS stored (it's 8 bytes).

```jsonc
{
  "alignment_score": 0.67,
  "alignment_flag": false,
  "threshold_used": 0.45,
  "threshold_source": "literature_default",
  "per_head_scores": [0.72, 0.68, 0.65, 0.71, 0.59],
  "attention_map_artifact_ref": null
}
```

On a flagged segment:

```jsonc
{
  "alignment_score": 0.28,
  "alignment_flag": true,
  "threshold_used": 0.42,
  "threshold_source": "rolling_mad",
  "per_head_scores": [0.31, 0.29, 0.24, 0.33, 0.22],
  "attention_map_artifact_ref": "artifact://diagnostics/0193e4f2.png"
}
```

### `RunManifest` (existing entity, extended)

Top-level manifest gains:

| Field | Type | Semantics |
|---|---|---|
| `model_family` | string | Family id active for this run. |
| `preprocessing_report_ref` | `Option<ArtifactRef>` | Points at the voice-asset-level report if references were preprocessed for any utterance in this run. |
| `compile_active` | bool | Whether the compile path was used (after fallback resolution). |
| `oas_active` | bool | Whether attention capture was enabled. |
| `alignment_summary` | object | `{ min, median, p95, flagged_count, total_count }`. Always present when `oas_active`. |

Per-segment entry gains `AlignmentDiagnostics` block under `segment.diagnostics.alignment` (optional).

### `SpeakerPrefixCacheEntry` (in-memory only — NOT persisted)

In-worker data; documented here for completeness.

```python
@dataclass(frozen=True)
class SpeakerCacheKey:
    content_hash: str          # 64-char lowercase hex
    model_family: str
    runtime_version: str

@dataclass
class SpeakerCacheEntry:
    embedding: torch.Tensor    # opaque — worker-internal shape
    size_bytes: int
    created_at_ns: int
    last_hit_ns: int
```

**Eviction**: LRU by `last_hit_ns`; when total `size_bytes` exceeds `AdapterSettings.speaker_cache_mb * 1024 * 1024`, pop oldest entries until under budget. Freed tensors are `.cpu()`-moved and `del`'d.

### `CompileToggleState` (in-worker runtime, mirrored on `Deployment` row)

Runtime-only structure held by the adapter; persisted bits live on the deployment row:

| Field | Storage | Semantics |
|---|---|---|
| `compile_gpt_enabled` | Deployment row | User-facing toggle. |
| `compile_available` | In-worker | Capability-probe result (Triton import + trivial compile round-trip). |
| `compile_session_state` | In-worker | `"unknown" \| "available" \| "unavailable_this_session"`. Once a session fails, stays unavailable until worker restart (avoids thrash). |
| `last_compile_failure_reason` | Deployment row (nullable column — optional v2) | Persisted so users see why it failed across sessions. v1 holds it in-worker only. |

---

## Integrity rules

1. **Cache-key participation** — `model_family` is added to `CacheKeyInput` (existing `domain/cache_key.rs` struct). Two deployments on different families CANNOT hit each other's cache. Re-asserted in R-34-06.
2. **Manifest additive-only** — every new field is `Option<T>` / optional; historic manifests parse unchanged. Re-asserted in R-34-09.
3. **Family descriptor is read-only at runtime** — YAML is loaded at extension activation; no code path writes back. A new family requires an extension reload hook (spec 030).
4. **Preprocessed voice-asset is an additional artifact, never a replacement** — original is retained under `audio_artifact_ref`. User can toggle preprocessed on/off per-run without losing the ability to go back.
5. **OAS threshold is per-deployment** — intentionally not global. Different deployments have different speakers + text styles → different alignment distributions.
6. **Compile toggle state is NOT shared across workers** — if the host spawns two worker subprocesses, each probes independently. Avoids one worker's failure polluting another worker's state.

---

## Storage surface summary

- 2 new migrations (011, 012).
- 1 new YAML registry (`recipes/families/`), 2 stubs (2.0 + 2.5).
- 0 new tables.
- 0 new indexes beyond the partial index on `model_family`.
- 0 schema changes to the manifest (evolution happens inside the JSON blob).
- 0 host-side storage changes.
