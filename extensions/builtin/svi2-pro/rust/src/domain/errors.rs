use thiserror::Error;

pub type Result<T> = std::result::Result<T, Svi2Error>;

#[derive(Debug, Error)]
pub enum Svi2Error {
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

impl Svi2Error {
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
    pub fn status_code(&self) -> u16 {
        match self {
            Self::Validation(_) => 400,
            Self::NotFound(_) => 404,
            Self::RuntimeUnavailable(_) | Self::ModelMissing(_) => 503,
            Self::Cancelled => 499,
            Self::Rpc { .. } | Self::Internal(_) => 500,
        }
    }

    #[must_use]
    pub fn category(&self) -> &'static str {
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

impl From<sqlx::Error> for Svi2Error {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => Self::NotFound("row not found".into()),
            other => Self::Internal(other.to_string()),
        }
    }
}

impl From<serde_json::Error> for Svi2Error {
    fn from(err: serde_json::Error) -> Self {
        Self::Internal(format!("json: {err}"))
    }
}

impl From<crate::domain::ids::IdError> for Svi2Error {
    fn from(err: crate::domain::ids::IdError) -> Self {
        Self::Validation(err.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn status_code_matrix() {
        assert_eq!(Svi2Error::validation("x").status_code(), 400);
        assert_eq!(Svi2Error::not_found("x").status_code(), 404);
        assert_eq!(Svi2Error::Cancelled.status_code(), 499);
        assert_eq!(Svi2Error::internal("x").status_code(), 500);
        assert_eq!(Svi2Error::RuntimeUnavailable("x".into()).status_code(), 503);
    }

    #[test]
    fn sqlx_row_not_found_maps_to_not_found() {
        let mapped: Svi2Error = sqlx::Error::RowNotFound.into();
        assert!(matches!(mapped, Svi2Error::NotFound(_)));
    }
}
