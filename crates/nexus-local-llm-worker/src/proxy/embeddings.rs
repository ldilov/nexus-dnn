use reqwest::Client;
use serde::{Deserialize, Serialize};

use crate::errors::{WorkerError, WorkerResult};

#[derive(Debug, Clone, Serialize)]
pub struct EmbeddingsRequest {
    pub model: String,
    pub input: Vec<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct EmbeddingsResponse {
    pub data: Vec<EmbeddingItem>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct EmbeddingItem {
    pub embedding: Vec<f32>,
}

pub async fn post_embeddings(
    client: &Client,
    base_url: &str,
    req: EmbeddingsRequest,
) -> WorkerResult<EmbeddingsResponse> {
    let url = format!("{}/v1/embeddings", base_url.trim_end_matches('/'));
    let resp = client.post(&url).json(&req).send().await.map_err(|e| {
        WorkerError::BackendUnavailable {
            reason: format!("{e}"),
        }
    })?;
    if !resp.status().is_success() {
        return Err(WorkerError::BackendUnavailable {
            reason: format!("upstream returned {}", resp.status()),
        });
    }
    resp.json::<EmbeddingsResponse>()
        .await
        .map_err(|e| WorkerError::HostProtocolError(format!("embeddings json: {e}")))
}
