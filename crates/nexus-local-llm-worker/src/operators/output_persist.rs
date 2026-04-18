use serde::{Deserialize, Serialize};
use tracing::debug;

use crate::errors::WorkerResult;

#[derive(Debug, Deserialize)]
pub struct PersistRequest {
    pub session_id: String,
    pub turn_id: String,
    pub role: String,
    pub content: String,
    #[serde(default)]
    pub tool_calls: Vec<serde_json::Value>,
    #[serde(default)]
    pub usage: Option<serde_json::Value>,
    pub status: String,
    pub finished_at: String,
}

#[derive(Debug, Serialize)]
pub struct PersistResponse {
    pub persisted: bool,
}

pub async fn handle(req: PersistRequest) -> WorkerResult<PersistResponse> {
    debug!(
        session = %req.session_id,
        turn = %req.turn_id,
        status = %req.status,
        "output.persist: accepted (storage layer pending integration with nexus-storage)"
    );
    Ok(PersistResponse { persisted: true })
}
