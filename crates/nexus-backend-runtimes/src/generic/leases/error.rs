//! Typed errors for the lease subsystem (data-model.md §8).

use thiserror::Error;

/// Error returned by [`super::trait_def::BackendRuntimeLease::send_rpc`] and
/// [`super::trait_def::BackendRuntimeLease::release`].
///
/// The variants are tuned for the callers in the install pipeline and the
/// lease matchmaker — particularly `WorkerCrashed`, `PayloadTooLarge`, and
/// `CrashRecovered`, which drive distinct recovery paths.
#[derive(Debug, Error)]
pub enum LeaseError {
    #[error("rpc error code={code}: {message}")]
    Rpc {
        code: i32,
        message: String,
        data: Option<serde_json::Value>,
    },
    #[error("worker crashed")]
    WorkerCrashed,
    #[error("runtime unavailable")]
    RuntimeUnavailable,
    #[error("timed out")]
    Timeout,
    #[error("payload too large")]
    PayloadTooLarge,
    #[error("crash-recovered lease handle")]
    CrashRecovered,
    #[error("cancelled")]
    Cancelled,
    #[error("internal: {0}")]
    Internal(String),
}

impl From<serde_json::Error> for LeaseError {
    fn from(e: serde_json::Error) -> Self {
        LeaseError::Internal(format!("serialization: {e}"))
    }
}
