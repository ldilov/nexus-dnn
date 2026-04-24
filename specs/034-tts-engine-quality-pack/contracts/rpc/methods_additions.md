# RPC Method Additions — Spec 034

These methods are **additive** to the spec 031 RPC surface. Existing methods retain their contract.

---

## `voice.preprocess`

Runs the preprocessing pipeline on an audio artifact the host has already stored. Called by the Rust shim from the voice-asset upload path and from the `POST /voice-assets/:id/preprocess` endpoint.

### Request

```jsonc
{
  "jsonrpc": "2.0",
  "id": "…",
  "method": "voice.preprocess",
  "params": {
    "request_id": "req_…",
    "source_artifact_abs": "/absolute/path/to/original.wav",
    "output_artifact_abs": "/absolute/path/for/preprocessed.wav",
    "pipeline_version": "1"
  }
}
```

### Response

```jsonc
{
  "jsonrpc": "2.0",
  "id": "…",
  "result": {
    "succeeded": true,
    "report": { /* PreprocessingReport — see data-model.md */ }
  }
}
```

### Errors

- `-32602` Invalid params (missing required fields, non-existent source artifact).
- `-32010` (new) `preprocess_input_rejected` — source could not be decoded; `data.reason: "decode_failed" | "silent" | "too_short"`.
- `-32011` (new) `preprocess_partial` — pipeline succeeded but a non-critical stage was skipped; result still contains `succeeded: true` but `report.warnings` is non-empty.

---

## `capability.probe`

Replaces the previous (unspecified) capability discovery shim. Returns a structured snapshot of what the worker can currently do.

### Request

```jsonc
{ "jsonrpc": "2.0", "id": "…", "method": "capability.probe", "params": { "probes": ["compile_gpt", "attention_capture", "denoise"] } }
```

### Response

```jsonc
{
  "jsonrpc": "2.0",
  "id": "…",
  "result": {
    "compile_gpt":       { "available": true,  "detail": "torch.compile round-trip succeeded in 1240 ms" },
    "attention_capture": { "available": true,  "detail": "hooks registered on layers 10-14" },
    "denoise":           { "available": false, "detail": "rnnoise import failed: DLL load failed" }
  }
}
```

Unavailable probes return `available: false` with a human-readable `detail`. The shim writes these into the deployment row so the UI can reason about them without re-probing.

---

## `synthesize.batch` (extended)

Existing method; new optional fields in `params`. Backwards compatible — old callers omitting the new fields get current behaviour.

### New optional params

| Field | Type | Semantics |
|---|---|---|
| `model_family` | string | Family id. Worker loads the corresponding adapter if it isn't already the active one. Default: current worker family. |
| `enable_attention_capture` | bool | Enable OAS path for this batch. Default from deployment row. |
| `enable_compile` | bool | Use compiled GPT path if available. Default from deployment row. |
| `speaker_cache_hint` | object | `{ enabled: bool, budget_mb: integer }` — overrides the worker default for this batch. |

### New notification types emitted during synthesis

#### `progress` — `compile.started`

Fires when `torch.compile` begins on the first batch of a session.

```jsonc
{
  "method": "progress",
  "params": {
    "request_id": "req_…",
    "stage": "compile.started",
    "eta_ms": 25000,
    "message": "compiling GPT stage (one-time; future batches will be fast)"
  }
}
```

#### `progress` — `compile.complete` / `compile.failed`

Emitted when compilation settles or bails.

```jsonc
{ "method": "progress", "params": { "stage": "compile.complete", "duration_ms": 21400 } }
```

```jsonc
{ "method": "progress", "params": { "stage": "compile.failed", "duration_ms": 2100, "reason": "triton.ImportError: module not found" } }
```

#### `diagnostic` — `alignment`

Per-segment diagnostic, emitted after `segment_completed` if OAS is active.

```jsonc
{
  "method": "diagnostic",
  "params": {
    "run_id":          "run_…",
    "global_index":    3,
    "alignment_score": 0.41,
    "alignment_flag":  true,
    "threshold_used":  0.45,
    "threshold_source": "literature_default",
    "attention_map_artifact_ref": "artifact://diagnostics/0193e4f2.png"
  }
}
```

#### `preprocess_warning`

Fires from `voice.preprocess` when a stage is skipped (e.g., rnnoise DLL missing) but the pipeline still succeeded.

```jsonc
{
  "method": "preprocess_warning",
  "params": {
    "request_id": "req_…",
    "skipped_stage": "denoise",
    "reason": "rnnoise import failed"
  }
}
```

---

## `family.list`

Worker-side mirror of the HTTP families endpoint. Used by the Rust shim during capability reconciliation.

### Request

```jsonc
{ "jsonrpc": "2.0", "id": "…", "method": "family.list", "params": {} }
```

### Response

```jsonc
{
  "jsonrpc": "2.0",
  "id": "…",
  "result": {
    "active_family": "indextts-2",
    "known_families": [
      { "family_id": "indextts-2",   "engine_version": "0.1.3", "languages": ["zh","en"] },
      { "family_id": "indextts-2-5", "engine_version": null,    "languages": ["zh","en","ja","es"] }
    ]
  }
}
```

---

## `family.switch`

Switches the worker's active adapter to a different family. Triggers model load if not already resident. Safe to call mid-session.

### Request

```jsonc
{ "jsonrpc": "2.0", "id": "…", "method": "family.switch", "params": { "family_id": "indextts-2-5" } }
```

### Response

```jsonc
{
  "jsonrpc": "2.0",
  "id": "…",
  "result": { "switched": true, "load_duration_ms": 18400, "vram_delta_mb": 2300 }
}
```

### Errors

- `-32012` (new) `family_not_installed` — the descriptor exists but the host model-store reports the artifacts are missing.
- `-32013` (new) `family_incompatible` — engine version constraint unsatisfied.
