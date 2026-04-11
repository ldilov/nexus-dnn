#[derive(Debug, thiserror::Error)]
pub enum ArtifactError {
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
    #[error("artifact not found: {0}")]
    NotFound(String),
    #[error("artifact already exists: {0}")]
    AlreadyExists(String),
    #[error("hash mismatch: expected {expected}, got {actual}")]
    HashMismatch { expected: String, actual: String },
}
