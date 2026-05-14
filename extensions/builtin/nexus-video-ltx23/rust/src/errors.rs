use thiserror::Error;

pub type Result<T> = std::result::Result<T, ExtensionError>;

#[derive(Debug, Error)]
pub enum ExtensionError {
    #[error("invalid request: {0}")]
    InvalidRequest(String),

    #[error("plan validation failed: {0}")]
    PlanInvalid(String),

    #[error("runtime not available: {0}")]
    RuntimeUnavailable(String),

    #[error("driver too old: {0}")]
    DriverTooOld(String),

    #[error("gpu not supported: {0}")]
    GpuNotSupported(String),

    #[error("vram budget exceeded: {0}")]
    VramBudgetExceeded(String),

    #[error("model missing: {0}")]
    ModelMissing(String),

    #[error("render failed: {0}")]
    RenderFailed(String),

    #[error("render cancelled")]
    RenderCancelled,

    #[error("internal error: {0}")]
    Internal(String),

    #[error("not found: {0}")]
    NotFound(String),

    #[error("storage error: {0}")]
    Storage(String),
}

impl From<sqlx::Error> for ExtensionError {
    fn from(err: sqlx::Error) -> Self {
        Self::Storage(err.to_string())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize)]
pub enum ExtensionErrorCode {
    InvalidRequest,
    PlanInvalid,
    RuntimeUnavailable,
    DriverTooOld,
    GpuNotSupported,
    VramBudgetExceeded,
    ModelMissing,
    RenderFailed,
    RenderCancelled,
    Internal,
    NotFound,
    Storage,
}

impl ExtensionError {
    #[must_use]
    pub const fn code(&self) -> ExtensionErrorCode {
        match self {
            Self::InvalidRequest(_) => ExtensionErrorCode::InvalidRequest,
            Self::PlanInvalid(_) => ExtensionErrorCode::PlanInvalid,
            Self::RuntimeUnavailable(_) => ExtensionErrorCode::RuntimeUnavailable,
            Self::DriverTooOld(_) => ExtensionErrorCode::DriverTooOld,
            Self::GpuNotSupported(_) => ExtensionErrorCode::GpuNotSupported,
            Self::VramBudgetExceeded(_) => ExtensionErrorCode::VramBudgetExceeded,
            Self::ModelMissing(_) => ExtensionErrorCode::ModelMissing,
            Self::RenderFailed(_) => ExtensionErrorCode::RenderFailed,
            Self::RenderCancelled => ExtensionErrorCode::RenderCancelled,
            Self::Internal(_) => ExtensionErrorCode::Internal,
            Self::NotFound(_) => ExtensionErrorCode::NotFound,
            Self::Storage(_) => ExtensionErrorCode::Storage,
        }
    }
}
