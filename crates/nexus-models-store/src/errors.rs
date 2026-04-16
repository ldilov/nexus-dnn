use std::path::PathBuf;

use thiserror::Error;

#[derive(Debug, Error)]
pub enum ModelStoreError {
    #[error("model install not found: {0}")]
    InstallNotFound(String),

    #[error("install {install_id} has active leases held by {extensions:?}")]
    LeasedByExtensions {
        install_id: String,
        extensions: Vec<String>,
    },

    #[error("checksum mismatch for {file}: expected {expected}, got {actual}")]
    ChecksumMismatch {
        file: PathBuf,
        expected: String,
        actual: String,
    },

    #[error("insufficient VRAM on {device}: requested {requested}, available {available}")]
    InsufficientResources {
        device: String,
        requested: u64,
        available: u64,
    },

    #[error("source unreachable ({source_url}): {detail}")]
    SourceUnreachable { source_url: String, detail: String },

    #[error("manifest invalid: {0}")]
    ManifestInvalid(String),

    #[error("storage error: {0}")]
    Storage(String),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

impl From<sqlx::Error> for ModelStoreError {
    fn from(e: sqlx::Error) -> Self {
        Self::Storage(e.to_string())
    }
}

pub type ModelStoreResult<T> = Result<T, ModelStoreError>;
