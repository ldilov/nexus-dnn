use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::BoxStream;
use serde_json::Value as JsonValue;
use thiserror::Error;

#[async_trait]
pub trait ModelArtifactLocator: Send + Sync {
    async fn locate_family(&self, family_id: &str) -> Option<PathBuf>;
}

#[async_trait]
pub trait HostStoragePool: Send + Sync {
    async fn acquire(&self) -> Result<sqlx::SqlitePool, HostContractError>;
}

#[derive(Debug, Clone, Copy, Eq, PartialEq)]
pub enum LeaseState {
    Starting,
    Ready,
    Busy,
    Stopping,
    Failed,
    Released,
}

#[derive(Debug, Error)]
pub enum LeaseError {
    #[error("rpc error (code {code}): {message}")]
    Rpc { code: i32, message: String },
    #[error("timeout waiting for response")]
    Timeout,
    #[error("worker crashed")]
    WorkerCrashed,
    #[error("cancelled")]
    Cancelled,
    #[error("transport error: {0}")]
    Transport(String),
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct NotificationEnvelope {
    pub method: String,
    pub params: JsonValue,
}

pub type NotificationStream = BoxStream<'static, NotificationEnvelope>;

#[async_trait]
pub trait BackendRuntimeLease: Send + Sync {
    fn state(&self) -> LeaseState;
    async fn send_rpc(&self, method: &str, params: JsonValue) -> Result<JsonValue, LeaseError>;
    /// Long-running RPC variant. The default delegates to [`Self::send_rpc`]
    /// (whatever timeout the transport applies); transports that enforce a
    /// short default timeout MUST override this so multi-minute calls like
    /// `generate.start` survive.
    async fn send_rpc_with_timeout(
        &self,
        method: &str,
        params: JsonValue,
        _timeout: std::time::Duration,
    ) -> Result<JsonValue, LeaseError> {
        self.send_rpc(method, params).await
    }
    async fn subscribe_notifications(&self) -> NotificationStream;
    async fn release(&self) -> Result<(), LeaseError>;
}

pub type SharedLease = Arc<dyn BackendRuntimeLease>;

#[derive(Debug, Error)]
pub enum HostContractError {
    #[error("storage unavailable: {0}")]
    Storage(String),
    #[error("lease unavailable: {0}")]
    Lease(String),
}

impl From<HostContractError> for crate::domain::FaceAvatarError {
    fn from(err: HostContractError) -> Self {
        Self::internal(err.to_string())
    }
}
