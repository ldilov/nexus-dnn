use serde::Serialize;

use crate::errors::WorkerResult;
use crate::pool::PoolKey;
use crate::transport::WorkerTransport;

pub const EVENT_BACKEND_STATE: &str = "backend.state";
pub const EVENT_BACKEND_CRASHED: &str = "backend.crashed";
pub const EVENT_BACKEND_HUNG: &str = "backend.hung";
pub const EVENT_POOL_EVICTED: &str = "pool.evicted";

#[derive(Debug, Serialize)]
pub struct BackendStateEvent<'a> {
    pub pool_key: &'a PoolKey,
    pub from: &'a str,
    pub to: &'a str,
    pub reason: &'a str,
}

#[derive(Debug, Serialize)]
pub struct BackendCrashedEvent<'a> {
    pub pool_key: &'a PoolKey,
    pub exit_code: i32,
    pub stderr_tail: Vec<String>,
    pub will_retry: bool,
}

#[derive(Debug, Serialize)]
pub struct PoolEvictedEvent<'a> {
    pub pool_key: &'a PoolKey,
    pub reason: &'a str,
}

pub async fn emit_backend_state(
    transport: &WorkerTransport,
    event: BackendStateEvent<'_>,
) -> WorkerResult<()> {
    transport.notify(EVENT_BACKEND_STATE, event).await
}

pub async fn emit_pool_evicted(
    transport: &WorkerTransport,
    event: PoolEvictedEvent<'_>,
) -> WorkerResult<()> {
    transport.notify(EVENT_POOL_EVICTED, event).await
}

pub async fn emit_backend_crashed(
    transport: &WorkerTransport,
    event: BackendCrashedEvent<'_>,
) -> WorkerResult<()> {
    transport.notify(EVENT_BACKEND_CRASHED, event).await
}
