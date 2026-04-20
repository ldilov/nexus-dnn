use thiserror::Error;

pub type WorkerResult<T> = Result<T, WorkerError>;

#[derive(Debug, Error)]
#[non_exhaustive]
pub enum WorkerError {
    #[error("backend unavailable: {reason}")]
    BackendUnavailable { reason: String },

    #[error("backend busy: parallel capacity exceeded")]
    BackendBusy,

    #[error("model not found: {model_id}")]
    ModelMissing { model_id: String },

    #[error("model metadata incomplete: missing `{field}`")]
    ModelMetadataIncomplete { field: String },

    #[error("runtime missing: install `{install_id}` not available")]
    RuntimeMissing { install_id: String },

    #[error("incompatible runtime for format `{format}`")]
    IncompatibleRuntime { format: String },

    #[error("operation cancelled")]
    Cancelled,

    #[error("capability `{capability}` not supported by active runtime")]
    CapabilityUnavailable { capability: String },

    #[error("corpus not found: {corpus_id}")]
    CorpusNotFound { corpus_id: String },

    #[error("pool slot not found for key `{key}`")]
    PoolSlotNotFound { key: String },

    #[error("restart denied for pool key `{key}`: {reason}")]
    RestartDenied { key: String, reason: String },

    #[error("lease not found: {lease_id}")]
    LeaseNotFound { lease_id: String },

    #[error("timeout acquiring lease for install `{install_id}`")]
    LeaseAcquireTimeout { install_id: String },

    #[error("host protocol error: {0}")]
    HostProtocolError(String),

    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    #[error("serialization error: {0}")]
    Serde(#[from] serde_json::Error),

    #[error("not implemented: {method}")]
    NotImplemented { method: String },
}

impl WorkerError {
    pub fn retry_safe(&self) -> bool {
        match self {
            WorkerError::BackendUnavailable { .. }
            | WorkerError::BackendBusy
            | WorkerError::Cancelled
            | WorkerError::LeaseAcquireTimeout { .. } => true,

            WorkerError::ModelMissing { .. }
            | WorkerError::ModelMetadataIncomplete { .. }
            | WorkerError::RuntimeMissing { .. }
            | WorkerError::IncompatibleRuntime { .. }
            | WorkerError::CapabilityUnavailable { .. }
            | WorkerError::CorpusNotFound { .. }
            | WorkerError::PoolSlotNotFound { .. }
            | WorkerError::RestartDenied { .. }
            | WorkerError::LeaseNotFound { .. }
            | WorkerError::HostProtocolError(_)
            | WorkerError::Io(_)
            | WorkerError::Serde(_)
            | WorkerError::NotImplemented { .. } => false,
        }
    }

    pub fn stable_code(&self) -> &'static str {
        match self {
            WorkerError::BackendUnavailable { .. } => "BackendUnavailable",
            WorkerError::BackendBusy => "BackendBusy",
            WorkerError::ModelMissing { .. } => "ModelMissing",
            WorkerError::ModelMetadataIncomplete { .. } => "ModelMetadataIncomplete",
            WorkerError::RuntimeMissing { .. } => "RuntimeMissing",
            WorkerError::IncompatibleRuntime { .. } => "IncompatibleRuntime",
            WorkerError::Cancelled => "Cancelled",
            WorkerError::CapabilityUnavailable { .. } => "CapabilityUnavailable",
            WorkerError::CorpusNotFound { .. } => "CorpusNotFound",
            WorkerError::PoolSlotNotFound { .. } => "PoolSlotNotFound",
            WorkerError::RestartDenied { .. } => "RestartDenied",
            WorkerError::LeaseNotFound { .. } => "LeaseNotFound",
            WorkerError::LeaseAcquireTimeout { .. } => "LeaseAcquireTimeout",
            WorkerError::HostProtocolError(_) => "HostProtocolError",
            WorkerError::Io(_) => "IoError",
            WorkerError::Serde(_) => "SerdeError",
            WorkerError::NotImplemented { .. } => "NotImplemented",
        }
    }
}
