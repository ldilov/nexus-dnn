use thiserror::Error;

pub type Result<T> = std::result::Result<T, Trellis2Error>;

#[derive(Debug, Error)]
pub enum Trellis2Error {
    #[error("validation failed: {0}")]
    Validation(String),

    #[error("resource not found: {0}")]
    NotFound(String),

    #[error("backend runtime unavailable: {0}")]
    RuntimeUnavailable(String),

    #[error("required model missing: {0}")]
    ModelMissing(String),

    #[error("rpc error (code {code}): {message}")]
    Rpc { code: i32, message: String },

    #[error("cancelled by client")]
    Cancelled,

    #[error("internal error: {0}")]
    Internal(String),
}

impl Trellis2Error {
    #[must_use]
    pub fn validation(msg: impl Into<String>) -> Self {
        Self::Validation(msg.into())
    }

    #[must_use]
    pub fn not_found(msg: impl Into<String>) -> Self {
        Self::NotFound(msg.into())
    }

    #[must_use]
    pub fn internal(msg: impl Into<String>) -> Self {
        Self::Internal(msg.into())
    }

    #[must_use]
    pub const fn status_code(&self) -> u16 {
        match self {
            Self::Validation(_) => 400,
            Self::NotFound(_) => 404,
            Self::RuntimeUnavailable(_) | Self::ModelMissing(_) => 503,
            Self::Cancelled => 499,
            Self::Rpc { .. } | Self::Internal(_) => 500,
        }
    }

    /// Client-safe message. `Internal`/`RuntimeUnavailable`/`Rpc` carry server
    /// detail (SQL, paths, worker internals) that must not leak — they return a
    /// fixed generic string; the caller logs the real `to_string()` server-side.
    #[must_use]
    pub fn client_message(&self) -> String {
        match self {
            Self::Internal(_) => "internal error".to_string(),
            Self::RuntimeUnavailable(_) => "runtime unavailable".to_string(),
            Self::Rpc { .. } => "generation failed".to_string(),
            other => other.to_string(),
        }
    }

    /// True when the detail is server-only and must be logged, not surfaced.
    #[must_use]
    pub const fn is_internal_detail(&self) -> bool {
        matches!(
            self,
            Self::Internal(_) | Self::RuntimeUnavailable(_) | Self::Rpc { .. }
        )
    }

    #[must_use]
    pub const fn category(&self) -> &'static str {
        match self {
            Self::Validation(_) => "validation",
            Self::NotFound(_) => "not_found",
            Self::RuntimeUnavailable(_) => "runtime_unavailable",
            Self::ModelMissing(_) => "model_missing",
            Self::Rpc { .. } => "rpc_error",
            Self::Cancelled => "cancelled",
            Self::Internal(_) => "internal",
        }
    }
}

impl From<sqlx::Error> for Trellis2Error {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => Self::NotFound("row not found".into()),
            other => Self::Internal(other.to_string()),
        }
    }
}

impl From<serde_json::Error> for Trellis2Error {
    fn from(err: serde_json::Error) -> Self {
        Self::Internal(format!("json: {err}"))
    }
}

impl From<crate::domain::ids::IdError> for Trellis2Error {
    fn from(err: crate::domain::ids::IdError) -> Self {
        Self::Validation(err.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn status_code_matrix() {
        assert_eq!(Trellis2Error::validation("x").status_code(), 400);
        assert_eq!(Trellis2Error::not_found("x").status_code(), 404);
        assert_eq!(Trellis2Error::Cancelled.status_code(), 499);
        assert_eq!(Trellis2Error::internal("x").status_code(), 500);
        assert_eq!(
            Trellis2Error::RuntimeUnavailable("x".into()).status_code(),
            503
        );
    }

    #[test]
    fn sqlx_row_not_found_maps_to_not_found() {
        let mapped: Trellis2Error = sqlx::Error::RowNotFound.into();
        assert!(matches!(mapped, Trellis2Error::NotFound(_)));
    }
}
