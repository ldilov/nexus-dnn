//! Host contract surfaces.
//!
//! The extension crate is not a workspace member and does not import host
//! types directly. Instead it declares the shapes it expects the host to
//! implement; at extension-load time the host wraps its concrete types as
//! newtypes against these traits.
//!
//! Principle V / XIII: the extension depends on abstractions, never on the
//! host's runtime crates.

use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::BoxStream;
use serde_json::Value as JsonValue;
use thiserror::Error;

use crate::domain::RuntimeLeaseId;

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
    #[error("lease in state {state:?}, cannot perform {op}")]
    InvalidState { state: LeaseState, op: &'static str },
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
    fn id(&self) -> RuntimeLeaseId;
    fn state(&self) -> LeaseState;
    async fn send_rpc(&self, method: &str, params: JsonValue) -> Result<JsonValue, LeaseError>;
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

impl From<HostContractError> for crate::domain::EmotionTtsError {
    fn from(err: HostContractError) -> Self {
        Self::internal(err.to_string())
    }
}
