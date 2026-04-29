# Worker JSON-RPC Contract — Audio Edit Methods

Two new method names are added to
`extensions/builtin/emotion-tts/rust/src/backend_client/rpc.rs::methods`:

```rust
pub const AUDIO_EDIT: &str = "audio.edit";
pub const AUDIO_EDIT_PREVIEW: &str = "audio.edit.preview";
```

Both methods flow through the existing `BackendClient::call` typed wrapper, are
serialized via the existing `LeaseProvider` lease, and reuse the standard error-
code → domain-error mapping in `lease_error_to_domain`.

---

## `audio.edit`

Apply an edit chain to a source artifact and write the derived audio to a
caller-supplied output path.

### Params (Rust → worker)

```rust
pub struct AudioEditParams {
    pub request_id: String,                 // ULID, used for trace span correlation
    pub source_artifact_abs: PathBuf,       // resolved absolute path
    pub output_artifact_abs: PathBuf,       // worker writes here
    pub chain: EditChain,                   // serde_json shape from data-model.md
}
```

### Result (worker → Rust)

```rust
pub struct AudioEditResult {
    pub chain_digest: String,                       // 64-hex SHA-256
    pub source_duration_ms: u32,
    pub derived_duration_ms: u32,
    pub measured_lufs: Option<f32>,                 // present iff chain has Normalize
    pub per_op_durations_ms: Vec<OpDuration>,       // by op id
    pub warnings: Vec<String>,
}

pub struct OpDuration { pub op_id: String, pub duration_ms: f32 }
```

### Errors

Worker returns standard JSON-RPC error envelopes mapped to extension errors:

| RPC code | Domain mapping | Trigger |
|----------|----------------|---------|
| `-32602` (`INVALID_PARAMS`) | `EmotionTtsError::validation` | Op out of range, chain too long, source missing |
| `-33020` (`SYNTHESIS_FAILED` — reused) | `EmotionTtsError::internal` | ffmpeg crash, codec unsupported, IO error |
| `-33010` (`VALIDATION_FAILED`) | `EmotionTtsError::validation` | Validation re-checked at worker fails |

Rust router translates `EmotionTtsError::validation` → HTTP 400, `internal` → 500.

---

## `audio.edit.preview`

Materialise an edit chain to a worker-local temp file. The result returns the
absolute temp path; the Rust router streams the bytes back to the client and
deletes the temp file after streaming completes.

### Params

```rust
pub struct AudioEditPreviewParams {
    pub request_id: String,
    pub source_artifact_abs: PathBuf,
    pub chain: EditChain,
    pub format_hint: Option<String>,    // "wav" | "mp3" — defaults to "wav"
}
```

### Result

```rust
pub struct AudioEditPreviewResult {
    pub temp_path_abs: PathBuf,
    pub format: String,            // "wav" | "mp3"
    pub byte_size: u64,
    pub derived_duration_ms: u32,
}
```

The Rust handler wraps the temp path in a RAII guard
(`PreviewTempGuard { path: PathBuf }`) whose `Drop` removes the file. The guard
travels through the streaming response future via `tokio_util::io::ReaderStream`
chained with a finaliser closure — same pattern the export ZIP streaming already
uses.

### Errors

Identical error mapping to `audio.edit`. Additionally:

| RPC code | Trigger |
|----------|---------|
| `-32603` (`INTERNAL_ERROR`) | Worker temp dir not writable (extremely rare; lease setup ensures it exists) |

---

## Worker-side handler shape (Python)

`extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/audio_edit.py`
exposes a pure-function pipeline:

```python
def apply_chain(
    source_abs: pathlib.Path,
    output_abs: pathlib.Path,
    chain: EditChain,
) -> AudioEditReport: ...
```

The pipeline is: probe codec → decode to PCM ndarray (sample_rate preserved) →
fold ops left-to-right → write output via soundfile (or ffmpeg re-encode if the
caller asked for the source's compressed format) → measure final LUFS / duration.

`handlers.py` registers `audio.edit` and `audio.edit.preview` against the
existing JSON-RPC dispatcher, calling `apply_chain` and returning the typed
report.

---

## Wire-protocol guarantees

- Parameters and results are framed as plain JSON, no binary body. Audio bytes
  for preview are delivered out-of-band via the host's HTTP streaming response
  reading the worker temp file.
- The `request_id` round-trips into tracing spans on both sides — same convention
  as `synthesize` (Spec 031 + the recent `5974ff8` correlation-id work).
- Cancellation is honoured via the existing `cancel` method; the worker's
  `apply_chain` polls the cancellation token between ops and aborts cleanly.
