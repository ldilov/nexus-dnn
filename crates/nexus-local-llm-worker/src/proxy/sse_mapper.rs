use serde::Deserialize;

use crate::errors::{WorkerError, WorkerResult};

#[derive(Debug, Clone, serde::Serialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum OperatorStreamEvent {
    Chunk {
        delta: String,
        token_count: u32,
    },
    Done {
        finish_reason: String,
        usage: UsageInfo,
    },
    Error {
        code: String,
        message: String,
    },
}

#[derive(Debug, Clone, Default, serde::Serialize, serde::Deserialize)]
pub struct UsageInfo {
    #[serde(default)]
    pub prompt_tokens: u32,
    #[serde(default)]
    pub completion_tokens: u32,
    #[serde(default)]
    pub total_tokens: u32,
}

#[derive(Debug, Deserialize)]
struct UpstreamChunk {
    #[serde(default)]
    choices: Vec<UpstreamChoice>,
    #[serde(default)]
    usage: Option<UsageInfo>,
}

#[derive(Debug, Deserialize)]
struct UpstreamChoice {
    #[serde(default)]
    delta: Option<UpstreamDelta>,
    #[serde(default)]
    finish_reason: Option<String>,
}

#[derive(Debug, Deserialize)]
struct UpstreamDelta {
    #[serde(default)]
    content: Option<String>,
}

pub fn map_sse_chunk(data: &str) -> WorkerResult<OperatorStreamEvent> {
    if data.trim() == "[DONE]" {
        return Ok(OperatorStreamEvent::Done {
            finish_reason: "stop".into(),
            usage: UsageInfo::default(),
        });
    }

    let chunk: UpstreamChunk = serde_json::from_str(data)
        .map_err(|e| WorkerError::HostProtocolError(format!("sse json: {e}")))?;

    if let Some(first) = chunk.choices.first() {
        if let Some(finish_reason) = &first.finish_reason {
            return Ok(OperatorStreamEvent::Done {
                finish_reason: finish_reason.clone(),
                usage: chunk.usage.unwrap_or_default(),
            });
        }
        if let Some(delta) = first.delta.as_ref().and_then(|d| d.content.as_ref()) {
            return Ok(OperatorStreamEvent::Chunk {
                delta: delta.clone(),
                token_count: 1,
            });
        }
    }

    Ok(OperatorStreamEvent::Chunk {
        delta: String::new(),
        token_count: 0,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn content_delta_becomes_chunk_event() {
        let data = r#"{"choices":[{"delta":{"content":"hello"}}]}"#;
        match map_sse_chunk(data).expect("ok") {
            OperatorStreamEvent::Chunk { delta, .. } => assert_eq!(delta, "hello"),
            other => panic!("expected Chunk, got {other:?}"),
        }
    }

    #[test]
    fn finish_reason_stop_becomes_done_event() {
        let data = r#"{"choices":[{"finish_reason":"stop"}],"usage":{"prompt_tokens":7,"completion_tokens":11,"total_tokens":18}}"#;
        match map_sse_chunk(data).expect("ok") {
            OperatorStreamEvent::Done { finish_reason, usage } => {
                assert_eq!(finish_reason, "stop");
                assert_eq!(usage.prompt_tokens, 7);
                assert_eq!(usage.completion_tokens, 11);
                assert_eq!(usage.total_tokens, 18);
            }
            other => panic!("expected Done, got {other:?}"),
        }
    }

    #[test]
    fn finish_reason_length_preserved() {
        let data = r#"{"choices":[{"finish_reason":"length"}]}"#;
        match map_sse_chunk(data).expect("ok") {
            OperatorStreamEvent::Done { finish_reason, .. } => assert_eq!(finish_reason, "length"),
            other => panic!("expected Done, got {other:?}"),
        }
    }

    #[test]
    fn openai_done_sentinel_emits_terminal_done() {
        match map_sse_chunk("[DONE]").expect("ok") {
            OperatorStreamEvent::Done { finish_reason, .. } => assert_eq!(finish_reason, "stop"),
            other => panic!("expected Done, got {other:?}"),
        }
    }

    #[test]
    fn empty_choices_array_yields_empty_chunk() {
        let data = r#"{"choices":[]}"#;
        match map_sse_chunk(data).expect("ok") {
            OperatorStreamEvent::Chunk { delta, token_count } => {
                assert!(delta.is_empty());
                assert_eq!(token_count, 0);
            }
            other => panic!("expected empty Chunk, got {other:?}"),
        }
    }

    #[test]
    fn malformed_json_surfaces_protocol_error() {
        let err = map_sse_chunk("not json at all").expect_err("should fail");
        assert_eq!(err.stable_code(), "HostProtocolError");
    }
}
