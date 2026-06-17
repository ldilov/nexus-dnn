use std::sync::Arc;

use async_trait::async_trait;
use serde_json::Value as JsonValue;
use tokio::sync::Mutex;

use crate::domain::{Result, Svi2Error};
use crate::host_contract::{LeaseError, LeaseState, SharedLease};

pub mod methods {
    pub const PRESETS_LIST: &str = "svi2.presets.list";
    pub const RENDER_START: &str = "svi2.video.render.start";
    pub const RENDER_CANCEL: &str = "svi2.video.render.cancel";
    pub const HANDSHAKE: &str = "handshake";
    pub const ATTENTION_CAPABILITIES: &str = "svi2.attention.capabilities";
}

#[derive(Clone)]
pub struct BackendClient {
    lease: SharedLease,
}

impl BackendClient {
    #[must_use]
    pub fn new(lease: SharedLease) -> Self {
        Self { lease }
    }

    #[must_use]
    pub fn lease(&self) -> &SharedLease {
        &self.lease
    }

    pub async fn call(&self, method: &str, params: JsonValue) -> Result<JsonValue> {
        self.lease
            .send_rpc(method, params)
            .await
            .map_err(lease_error_to_domain)
    }

    /// For RPCs that legitimately run for hours (`render.start` blocks until
    /// the whole chain renders). The transport's 30s default would kill every
    /// real render during model load alone.
    pub async fn call_long_running(&self, method: &str, params: JsonValue) -> Result<JsonValue> {
        self.lease
            .send_rpc_with_timeout(method, params, LONG_RUNNING_RPC_TIMEOUT)
            .await
            .map_err(lease_error_to_domain)
    }
}

pub const LONG_RUNNING_RPC_TIMEOUT: std::time::Duration =
    std::time::Duration::from_secs(24 * 60 * 60);

pub fn lease_error_to_domain(err: LeaseError) -> Svi2Error {
    match err {
        LeaseError::Rpc { code, message } => Svi2Error::Rpc { code, message },
        LeaseError::Timeout => Svi2Error::Internal("worker rpc timed out".into()),
        LeaseError::WorkerCrashed => Svi2Error::RuntimeUnavailable("worker crashed".into()),
        LeaseError::Cancelled => Svi2Error::Cancelled,
        LeaseError::Transport(msg) => Svi2Error::Internal(format!("transport: {msg}")),
    }
}

#[async_trait]
pub trait LeaseFactory: Send + Sync {
    async fn acquire(&self) -> Result<SharedLease>;
}

pub struct LeaseProvider {
    factory: Arc<dyn LeaseFactory>,
    state: Mutex<Option<BackendClient>>,
}

impl LeaseProvider {
    #[must_use]
    pub fn new(factory: Arc<dyn LeaseFactory>) -> Self {
        Self {
            factory,
            state: Mutex::new(None),
        }
    }

    pub async fn spawn_if_needed(&self) -> Result<BackendClient> {
        let mut slot = self.state.lock().await;
        if let Some(existing) = slot
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned()
        {
            return Ok(existing);
        }
        // Release the dead/failed lease before replacing it — dropping it
        // silently leaks the worker process (and its tens of GiB of weights).
        if let Some(stale) = slot.take() {
            let _ = stale.lease().release().await;
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        *slot = Some(client.clone());
        Ok(client)
    }

    pub async fn current(&self) -> Option<BackendClient> {
        self.state.lock().await.clone()
    }

    pub async fn stop(&self) -> Result<()> {
        let mut slot = self.state.lock().await;
        if let Some(client) = slot.take() {
            client
                .lease()
                .release()
                .await
                .map_err(lease_error_to_domain)?;
        }
        Ok(())
    }
}

#[must_use]
const fn is_serviceable(state: LeaseState) -> bool {
    matches!(
        state,
        LeaseState::Starting | LeaseState::Ready | LeaseState::Busy
    )
}
