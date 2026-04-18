use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;

#[derive(Debug, Deserialize)]
pub struct RagRetrieveRequest {
    pub corpus_id: String,
    pub query: String,
    #[serde(default = "default_top_k")]
    pub top_k: u32,
    #[serde(default)]
    pub filters: serde_json::Value,
}

fn default_top_k() -> u32 {
    5
}

#[derive(Debug, Serialize)]
pub struct RagRetrieveResponse {
    pub hits: Vec<RagHit>,
}

#[derive(Debug, Serialize)]
pub struct RagHit {
    pub document_id: String,
    pub chunk_id: String,
    pub score: f32,
    pub excerpt: String,
}

pub async fn handle(_req: RagRetrieveRequest) -> WorkerResult<RagRetrieveResponse> {
    Ok(RagRetrieveResponse { hits: Vec::new() })
}
