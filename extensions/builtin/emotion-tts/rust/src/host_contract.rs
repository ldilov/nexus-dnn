//! Host contract surfaces.
//!
//! The extension crate is not a workspace member and does not import host
//! types directly. Instead it declares the shapes it expects the host to
//! implement; at extension-load time the host wraps its concrete types as
//! newtypes against these traits.
//!
//! Principle V / XIII: the extension depends on abstractions, never on the
//! host's runtime crates.

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::BoxStream;
use serde_json::Value as JsonValue;
use thiserror::Error;

use crate::domain::RuntimeLeaseId;

/// Resolves the on-disk path for an installed model family. Implemented
/// host-side by an adapter over the spec-035 model store. The lease factory
/// queries this at acquire-time so the worker can find IndexTTS-2 weights —
/// without it, the worker's Python entrypoint sees `EMOTIONTTS_MODEL_DIR_ABS`
/// missing and the IndexTTS adapter never gets constructed, which surfaces
/// as `model.load failed: adapter is not configured`.
#[async_trait]
pub trait ModelArtifactLocator: Send + Sync {
    /// Returns the absolute path to the model artifact root for `family_id`,
    /// or `None` if the family is not installed.
    async fn locate_family(&self, family_id: &str) -> Option<PathBuf>;
}

#[async_trait]
pub trait HostStoragePool: Send + Sync {
    async fn acquire(&self) -> Result<sqlx::SqlitePool, HostContractError>;
}

/// Host-provided artifact store — extensions hand bytes in, receive a
/// stable reference string (`artifact://…`) the host resolves to an
/// absolute path at synthesis time.
#[async_trait]
pub trait HostArtifactStore: Send + Sync {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError>;

    async fn resolve_path(&self, artifact_ref: &str) -> Result<String, HostContractError>;
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ArtifactPut {
    pub artifact_ref: String,
    pub content_sha256: String,
    pub size_bytes: u64,
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
    #[error("artifact store error: {0}")]
    Artifact(String),
}

impl From<HostContractError> for crate::domain::EmotionTtsError {
    fn from(err: HostContractError) -> Self {
        Self::internal(err.to_string())
    }
}
