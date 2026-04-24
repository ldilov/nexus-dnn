# RPC Notification Additions — Spec 034

Additive to spec 031's notifications catalogue.

---

## `compile.started`

Sent once per session when `torch.compile` begins on the GPT stage.

```jsonc
{
  "jsonrpc": "2.0",
  "method": "compile.started",
  "params": {
    "request_id":   "req_…",
    "family_id":    "indextts-2",
    "eta_ms":       25000,
    "message":      "Compiling GPT stage — one-time cost per session."
  }
}
```

## `compile.complete`

```jsonc
{
  "jsonrpc": "2.0",
  "method": "compile.complete",
  "params": {
    "request_id":  "req_…",
    "duration_ms": 21400
  }
}
```

## `compile.failed`

Fallback path. Extension stays on uncompiled inference until worker restart.

```jsonc
{
  "jsonrpc": "2.0",
  "method": "compile.failed",
  "params": {
    "request_id":     "req_…",
    "duration_ms":    2100,
    "reason":         "triton.ImportError: module not found",
    "fallback_active": true
  }
}
```

## `diagnostic.alignment`

Per-segment alignment diagnostic. Emitted after each `segment_completed` when OAS is active.

```jsonc
{
  "jsonrpc": "2.0",
  "method": "diagnostic.alignment",
  "params": {
    "run_id":                    "run_…",
    "global_index":              3,
    "alignment_score":           0.41,
    "alignment_flag":            true,
    "threshold_used":            0.45,
    "threshold_source":          "literature_default",
    "per_head_scores":           [0.44, 0.38, 0.35, 0.47, 0.41],
    "attention_map_artifact_ref": "artifact://diagnostics/0193e4f2.png"
  }
}
```

On unflagged segments, `attention_map_artifact_ref` is absent.

## `preprocess.stage_completed`

Fires once per pipeline stage during `voice.preprocess` (for long-running pipelines; we emit for stages taking > 50 ms so the UI can show progress).

```jsonc
{
  "jsonrpc": "2.0",
  "method": "preprocess.stage_completed",
  "params": {
    "request_id":  "req_…",
    "stage":       "denoise",
    "status":      "ok",
    "duration_ms": 180,
    "engine":      "rnnoise"
  }
}
```

## `preprocess_warning`

Non-critical stage skipped; pipeline still succeeds.

```jsonc
{
  "jsonrpc": "2.0",
  "method": "preprocess_warning",
  "params": {
    "request_id":    "req_…",
    "skipped_stage": "denoise",
    "reason":        "rnnoise import failed: DLL load failed while importing _rnnoise"
  }
}
```

## `speaker_cache.hit` / `speaker_cache.miss`

Observability for the speaker-prefix cache. Sampled — worker emits at most once per 25 segments to avoid notification flood.

```jsonc
{
  "jsonrpc": "2.0",
  "method": "speaker_cache.hit",
  "params": {
    "run_id":           "run_…",
    "content_hash":     "abc…",
    "entries_in_cache": 42,
    "total_bytes":      180_000_000
  }
}
```

---

## Notes on evolution

- All notification names are namespaced (`compile.*`, `preprocess.*`, `diagnostic.*`, `speaker_cache.*`) so future additions don't collide with spec 031's flat notification names.
- Clients that don't recognise a notification method silently drop it. The Rust `backend_client::notifications::fanout` already dispatches on unknown methods with a debug-level log.
- Every `request_id` field connects the notification back to a `synthesize.batch` or `voice.preprocess` call; the Rust shim is responsible for routing to the correct subscriber.
