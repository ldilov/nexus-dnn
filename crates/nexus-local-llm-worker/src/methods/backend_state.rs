use serde::{Deserialize, Serialize};

use crate::errors::{WorkerError, WorkerResult};
use crate::pool::{PoolKey, RuntimePool};
use std::sync::Arc;

#[derive(Debug, Deserialize)]
pub struct StateGetRequest {
    pub pool_key: PoolKey,
}

#[derive(Debug, Serialize)]
pub struct StateGetResponse {
    pub state: String,
    pub since: String,
}

pub async fn handle_state_get(
    pool: &Arc<RuntimePool>,
    req: StateGetRequest,
) -> WorkerResult<StateGetResponse> {
    let slots = pool.list().await;
    if slots.iter().any(|s| s.pool_key == req.pool_key) {
        Ok(StateGetResponse {
            state: "Ready".into(),
            since: chrono::Utc::now().to_rfc3339(),
        })
    } else {
        Err(WorkerError::PoolSlotNotFound {
            key: req.pool_key.to_string(),
        })
    }
}
