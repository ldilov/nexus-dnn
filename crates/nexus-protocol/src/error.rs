#[derive(Debug, thiserror::Error)]
pub enum ProtocolError {
    #[error("serialization failed: {0}")]
    Serialization(#[from] serde_json::Error),

    #[error("transport error: {0}")]
    Transport(String),

    #[error("protocol version mismatch: expected {expected}, got {actual}")]
    VersionMismatch { expected: String, actual: String },

    #[error("unexpected response for request {request_id}")]
    UnexpectedResponse { request_id: u64 },

    #[error("connection closed")]
    ConnectionClosed,
}
