//! Error type for the Hugging Face capability.
//!
//! Variants map one-to-one to user-facing failure modes so consumer extensions
//! can translate them into HTTP status codes without leaking transport details.

use thiserror::Error;

#[derive(Debug, Error)]
pub enum HfError {
    #[error("hugging face hub unreachable")]
    Unreachable { retry_after_seconds: Option<u32> },

    #[error("hugging face rate limit hit; retry after {retry_after_seconds}s")]
    RateLimited { retry_after_seconds: u32 },

    #[error("model is gated; set HF_TOKEN environment variable to access")]
    GatedNeedsToken,

    #[error("repository not found: {0}")]
    RepoNotFound(String),

    #[error("checksum mismatch: expected {expected}, got {actual}")]
    ChecksumMismatch { expected: String, actual: String },

    #[error("download cancelled")]
    Cancelled,

    #[error("transport error: {0}")]
    Transport(#[from] reqwest::Error),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("database error: {0}")]
    Db(#[from] sqlx::Error),

    #[error("json parse error: {0}")]
    Parse(#[from] serde_json::Error),

    #[error("invalid response: {0}")]
    InvalidResponse(String),
}

impl HfError {
    pub fn is_unreachable(&self) -> bool {
        matches!(self, HfError::Unreachable { .. })
    }

    pub fn retry_after_seconds(&self) -> Option<u32> {
        match self {
            HfError::Unreachable {
                retry_after_seconds,
            } => *retry_after_seconds,
            HfError::RateLimited {
                retry_after_seconds,
            } => Some(*retry_after_seconds),
            _ => None,
        }
    }
}

pub type HfResult<T> = Result<T, HfError>;
