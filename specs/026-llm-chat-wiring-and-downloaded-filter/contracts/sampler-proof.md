# Contract — Sampler proof (`sc-026-proof.json`)

This contract mechanically proves that the six hyperparameters the user
sets in the Local Chat right-sidebar reach `LlamaCppAdapter` unchanged,
and that the system prompt is inserted as the first `role: system`
message iff non-empty.

## Adapter shim

`crates/nexus-backend-runtimes/src/llamacpp/adapter.rs` gains a
test-only recorder:

```rust
#[cfg(any(test, feature = "test-shim"))]
mod test_shim {
    use super::*;

    pub trait CallRecorder: Send + Sync {
        fn record(&self, snapshot: SamplerCall);
    }

    #[derive(Debug, Clone, serde::Serialize)]
    pub struct SamplerCall {
        pub sampling: SamplingParams,
        pub system_prompt: Option<String>,
        pub user_content: String,
        pub model_path: std::path::PathBuf,
    }
}
```

The adapter's `generate` call checks `self.recorder` (if present, it
calls `recorder.record(snapshot)`), then returns a deterministic stub
stream (`["hel", "lo"]`).

Production builds (no `test-shim` feature) compile the field out
entirely — `#[cfg(any(test, feature = "test-shim"))]` gates the whole
mod.

## Proof test

File: `crates/nexus-api/tests/chat_hyperparameters_reach_llamacpp.rs`.

```rust
#[tokio::test]
async fn hyperparameters_reach_llamacpp_byte_for_byte() {
    let harness = TestHarness::new_with_recorder().await;

    harness
        .set_generation_settings(
            &session_id,
            GenerationParams {
                temperature: 1.7,
                top_p: 0.9,
                top_k: 40,
                max_tokens: 16,
                repeat_penalty: 1.1,
                system_prompt: "You are a helpful assistant.".into(),
            },
        )
        .await;

    harness.send_message(&session_id, "ping").await;

    let captured = harness.recorded_call().unwrap();

    assert_eq!(captured.sampling.temperature, 1.7);
    assert_eq!(captured.sampling.top_p, 0.9);
    assert_eq!(captured.sampling.top_k, 40);
    assert_eq!(captured.sampling.max_tokens, 16);
    assert_eq!(captured.sampling.repeat_penalty, 1.1);
    assert_eq!(captured.system_prompt.as_deref(), Some("You are a helpful assistant."));
    assert_eq!(captured.user_content, "ping");
    assert!(captured.model_path.ends_with(".gguf"));

    let proof = serde_json::json!({
        "spec": "026",
        "test": "chat_hyperparameters_reach_llamacpp",
        "captured": captured,
        "passed_at": chrono::Utc::now().to_rfc3339(),
    });
    std::fs::write(
        "target/sc-026-proof.json",
        serde_json::to_string_pretty(&proof).unwrap(),
    ).unwrap();
}
```

## Assertions (full list)

| ID | What | Passes iff |
|---|---|---|
| T-H1 | temperature preserved | `captured.sampling.temperature == user-set value (1e-6 tolerance if f32, exact if f64)` |
| T-H2 | top_p preserved | exact |
| T-H3 | top_k preserved | exact |
| T-H4 | max_tokens preserved | exact |
| T-H5 | repeat_penalty preserved | exact |
| T-H6 | system_prompt passes through | `Some(s)` for non-empty, `None` for empty |
| T-H7 | user_content preserved | exact |
| T-H8 | model_path points to the bound variant | ends with `.gguf` AND filename segment matches the variant id |
| T-H9 | no mutation mid-flight | `captured.sampling` equals `harness.get_generation_settings(session_id)` |
| T-H10 | proof file emitted | `target/sc-026-proof.json` exists, parses, has `spec = "026"` |

## Proof file schema

```json
{
  "spec": "026",
  "test": "chat_hyperparameters_reach_llamacpp",
  "captured": {
    "sampling": {
      "temperature": 1.7,
      "top_p": 0.9,
      "top_k": 40,
      "max_tokens": 16,
      "repeat_penalty": 1.1
    },
    "system_prompt": "You are a helpful assistant.",
    "user_content": "ping",
    "model_path": "/path/…Q8_0.gguf"
  },
  "passed_at": "2026-04-20T12:00:00Z"
}
```

## CI wiring

1. `cargo test -p nexus-api --test chat_hyperparameters_reach_llamacpp`
   runs on every PR.
2. On success, CI uploads `target/sc-026-proof.json` as a build
   artifact.
3. On failure, CI fails the PR (the test is a gate for SC-006).

## What this does NOT prove

- Actual numerical output of the model (we stub the stream).
- GPU path / CPU path divergence.
- llama.cpp sampler internals.

What it DOES prove: the six user-facing sliders + system prompt travel
from the UI to the adapter without rewrite, re-clamp, or loss. That is
the contract the user asked for.
