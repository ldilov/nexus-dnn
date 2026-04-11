use crate::process::StructuredExecutionError;

#[derive(Debug, thiserror::Error)]
pub enum WorkerError {
    #[error("failed to spawn worker: {0}")]
    SpawnFailed(String),

    #[error("handshake failed: {0}")]
    HandshakeFailed(String),

    #[error("protocol version mismatch: expected {expected}, got {actual}")]
    ProtocolMismatch { expected: String, actual: String },

    #[error("worker process crashed with exit code {code:?}")]
    ProcessCrashed { code: Option<i32> },

    #[error("health check failed: {0}")]
    HealthCheckFailed(String),

    #[error("send failed: {0}")]
    SendFailed(String),

    #[error("receive failed: {0}")]
    ReceiveFailed(String),

    #[error("worker not found: {0}")]
    NotFound(String),

    #[error("execution failed: {0}")]
    ExecutionFailed(String),

    #[error("structured execution failure: [{code}] {message}", code = .0.code, message = .0.message)]
    StructuredFailure(StructuredExecutionError),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("protocol error: {0}")]
    Protocol(#[from] nexus_protocol::error::ProtocolError),
}
