use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::errors::WorkerResult;
use crate::pool::{PoolKey, PoolSnapshot, RuntimePool};

#[derive(Debug, Serialize)]
pub struct PoolListResponse {
    pub slots: Vec<PoolSnapshot>,
    pub cap: usize,
}

pub async fn handle_pool_list(pool: &Arc<RuntimePool>, cap: usize) -> WorkerResult<PoolListResponse> {
    Ok(PoolListResponse {
        slots: pool.list().await,
        cap,
    })
}

#[derive(Debug, Deserialize)]
pub struct RestartRequest {
    pub pool_key: PoolKey,
}

pub async fn handle_pool_restart(
    pool: &Arc<RuntimePool>,
    req: RestartRequest,
) -> WorkerResult<()> {
    pool.evict(&req.pool_key, "user_restart").await
}
