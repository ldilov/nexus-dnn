use eventsource_stream::Eventsource;
use futures_util::Stream;
use futures_util::StreamExt;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::pin::Pin;

use crate::errors::{WorkerError, WorkerResult};
use crate::proxy::sse_mapper::{OperatorStreamEvent, map_sse_chunk};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionRequest {
    pub model: String,
    pub messages: Vec<ChatMessage>,
    #[serde(default)]
    pub stream: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub temperature: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub top_p: Option<f32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub top_k: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_tokens: Option<u32>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub stop: Vec<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub seed: Option<u64>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub tools: Vec<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

pub type OperatorEventStream =
    Pin<Box<dyn Stream<Item = WorkerResult<OperatorStreamEvent>> + Send>>;

pub async fn stream_chat_completions(
    client: &Client,
    base_url: &str,
    body: ChatCompletionRequest,
) -> WorkerResult<OperatorEventStream> {
    let url = format!("{}/v1/chat/completions", base_url.trim_end_matches('/'));
    let resp = client
        .post(&url)
        .json(&body)
        .send()
        .await
        .map_err(|e| WorkerError::BackendUnavailable {
            reason: format!("{e}"),
        })?;

    if !resp.status().is_success() {
        return Err(WorkerError::BackendUnavailable {
            reason: format!("upstream returned {}", resp.status()),
        });
    }

    let sse = resp.bytes_stream().eventsource();
    let mapped = sse.map(|item| match item {
        Ok(evt) => map_sse_chunk(&evt.data),
        Err(e) => Err(WorkerError::BackendUnavailable {
            reason: format!("sse: {e}"),
        }),
    });

    Ok(Box::pin(mapped))
}
