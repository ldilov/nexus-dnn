//! Error types for the dependency installer.
//!
//! [`DepError`] is the single error type returned by every public API in this crate.

use thiserror::Error;

#[derive(Debug, Error)]
pub enum DepError {
    #[error("invalid spec for step '{step_id}': {field}: {reason}")]
    InvalidSpec {
        step_id: String,
        field: String,
        reason: String,
    },

    #[error("unknown step type: '{step_type}'")]
    UnknownStepType { step_type: String },

    #[error("cycle detected in requires graph: {cycle}")]
    CycleDetected { cycle: String },

    #[error("step '{step_id}' requires '{missing}' which does not exist")]
    MissingRequires { step_id: String, missing: String },

    #[error("duplicate step id: '{step_id}'")]
    DuplicateStepId { step_id: String },

    #[error("sha256 mismatch")]
    Sha256Mismatch,

    #[error("unsupported archive format: '{format}'")]
    UnsupportedArchive { format: String },

    #[error("no source declared for platform '{platform}'")]
    UnsupportedPlatform { platform: String },

    #[error("install cancelled")]
    Cancelled,

    #[error("io: {0}")]
    Io(#[from] std::io::Error),

    #[error("http: {0}")]
    Http(#[from] reqwest::Error),

    #[error("yaml: {0}")]
    Yaml(#[from] serde_yaml::Error),

    #[error("json: {0}")]
    Json(#[from] serde_json::Error),

    #[error("backend: {0}")]
    Backend(String),
}

impl DepError {
    /// Convenience constructor for handler-side spec validation failures.
    pub fn invalid_spec(
        step_id: impl Into<String>,
        field: impl Into<String>,
        reason: impl Into<String>,
    ) -> Self {
        Self::InvalidSpec {
            step_id: step_id.into(),
            field: field.into(),
            reason: reason.into(),
        }
    }

    /// Returns true if the error is a cooperative cancellation (not a real failure).
    pub fn is_cancelled(&self) -> bool {
        matches!(self, Self::Cancelled)
    }
}
