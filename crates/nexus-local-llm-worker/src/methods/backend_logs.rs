use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;
use crate::pool::PoolKey;

#[derive(Debug, Deserialize)]
pub struct LogsTailRequest {
    pub pool_key: PoolKey,
    #[serde(default = "default_limit")]
    pub limit: u32,
}

fn default_limit() -> u32 {
    200
}

#[derive(Debug, Serialize)]
pub struct LogsTailResponse {
    pub lines: Vec<LogLine>,
}

#[derive(Debug, Serialize)]
pub struct LogLine {
    pub ts: String,
    pub stream: String,
    pub text: String,
}

pub async fn handle_logs_tail(_req: LogsTailRequest) -> WorkerResult<LogsTailResponse> {
    Ok(LogsTailResponse { lines: Vec::new() })
}
