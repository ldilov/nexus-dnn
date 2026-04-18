pub mod chat;
pub mod embeddings;
pub mod sse_mapper;

use reqwest::Client;
use std::time::Duration;

pub fn build_client() -> Client {
    Client::builder()
        .timeout(Duration::from_secs(300))
        .build()
        .expect("reqwest client build")
}

pub use chat::{ChatCompletionRequest, stream_chat_completions};
pub use embeddings::{EmbeddingsRequest, EmbeddingsResponse, post_embeddings};
pub use sse_mapper::{OperatorStreamEvent, map_sse_chunk};
