use thiserror::Error;

pub type Result<T> = std::result::Result<T, EmotionTtsError>;

#[derive(Debug, Error)]
pub enum EmotionTtsError {
    #[error("validation failed: {0}")]
    Validation(String),

    #[error("resource not found: {0}")]
    NotFound(String),

    #[error("conflict: {0}")]
    Conflict(String),

    #[error("backend runtime unavailable: {0}")]
    RuntimeUnavailable(String),

    #[error("required model missing: {0}")]
    ModelMissing(String),

    #[error("rpc error (code {code}): {message}")]
    Rpc { code: i32, message: String },

    #[error("cancelled by client")]
    Cancelled,

    #[error("timeout waiting for {op}")]
    Timeout { op: String },

    #[error("internal error: {0}")]
    Internal(String),
}

impl EmotionTtsError {
    #[must_use]
    pub fn validation(msg: impl Into<String>) -> Self {
        Self::Validation(msg.into())
    }

    #[must_use]
    pub fn not_found(msg: impl Into<String>) -> Self {
        Self::NotFound(msg.into())
    }

    #[must_use]
    pub fn conflict(msg: impl Into<String>) -> Self {
        Self::Conflict(msg.into())
    }

    #[must_use]
    pub fn internal(msg: impl Into<String>) -> Self {
        Self::Internal(msg.into())
    }

    #[must_use]
    pub fn status_code(&self) -> u16 {
        match self {
            Self::Validation(_) => 400,
            Self::NotFound(_) => 404,
            Self::Conflict(_) => 409,
            Self::RuntimeUnavailable(_) | Self::ModelMissing(_) => 503,
            Self::Cancelled => 499,
            Self::Timeout { .. } => 504,
            Self::Rpc { .. } | Self::Internal(_) => 500,
        }
    }

    #[must_use]
    pub fn category(&self) -> &'static str {
        match self {
            Self::Validation(_) => "validation",
            Self::NotFound(_) => "not_found",
            Self::Conflict(_) => "conflict",
            Self::RuntimeUnavailable(_) => "runtime_unavailable",
            Self::ModelMissing(_) => "model_missing",
            Self::Rpc { .. } => "rpc_error",
            Self::Cancelled => "cancelled",
            Self::Timeout { .. } => "timeout",
            Self::Internal(_) => "internal",
        }
    }
}

impl From<sqlx::Error> for EmotionTtsError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => Self::NotFound("row not found".into()),
            other => Self::Internal(other.to_string()),
        }
    }
}

impl From<serde_json::Error> for EmotionTtsError {
    fn from(err: serde_json::Error) -> Self {
        Self::Internal(format!("json: {err}"))
    }
}

impl From<crate::domain::ids::IdError> for EmotionTtsError {
    fn from(err: crate::domain::ids::IdError) -> Self {
        Self::Validation(err.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn status_code_matrix() {
        assert_eq!(EmotionTtsError::validation("x").status_code(), 400);
        assert_eq!(EmotionTtsError::not_found("x").status_code(), 404);
        assert_eq!(EmotionTtsError::conflict("x").status_code(), 409);
        assert_eq!(EmotionTtsError::Cancelled.status_code(), 499);
        assert_eq!(EmotionTtsError::internal("x").status_code(), 500);
    }

    #[test]
    fn sqlx_row_not_found_maps_to_not_found() {
        let mapped: EmotionTtsError = sqlx::Error::RowNotFound.into();
        assert!(matches!(mapped, EmotionTtsError::NotFound(_)));
    }
}
