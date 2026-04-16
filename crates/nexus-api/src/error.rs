use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

use crate::envelope::ApiResponse;

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("not found: {0}")]
    NotFound(String),

    #[error("bad request: {0}")]
    BadRequest(String),

    #[error("conflict: {0}")]
    Conflict(String),

    #[error("internal error: {0}")]
    Internal(String),

    #[error("invalid state transition: {0}")]
    InvalidState(String),

    #[error("{message}")]
    BadRequestDetailed {
        code: &'static str,
        message: String,
        details: serde_json::Value,
    },

    /// Generic structured error with an explicit status + code. Used by the
    /// modules aggregator (spec 019) to surface endpoint-specific codes like
    /// `module.recipe_not_in_module` (422) and `module.draft_id_not_allowed`
    /// (400) without expanding the enum variant zoo.
    #[error("{message}")]
    Structured {
        status: StatusCode,
        code: &'static str,
        message: String,
    },
}

impl ApiError {
    pub fn structured(
        status: StatusCode,
        code: &'static str,
        message: impl Into<String>,
    ) -> Self {
        Self::Structured {
            status,
            code,
            message: message.into(),
        }
    }
}

impl From<nexus_storage::StorageError> for ApiError {
    fn from(err: nexus_storage::StorageError) -> Self {
        match err {
            nexus_storage::StorageError::NotFound { entity, id } => {
                ApiError::NotFound(format!("{entity} {id} not found"))
            }
            other => ApiError::Internal(other.to_string()),
        }
    }
}

impl ApiError {
    fn status_code(&self) -> StatusCode {
        match self {
            Self::NotFound(_) => StatusCode::NOT_FOUND,
            Self::BadRequest(_) => StatusCode::BAD_REQUEST,
            Self::Conflict(_) => StatusCode::CONFLICT,
            Self::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::InvalidState(_) => StatusCode::CONFLICT,
            Self::BadRequestDetailed { .. } => StatusCode::BAD_REQUEST,
            Self::Structured { status, .. } => *status,
        }
    }

    fn error_code(&self) -> &str {
        match self {
            Self::NotFound(_) => "NOT_FOUND",
            Self::BadRequest(_) => "BAD_REQUEST",
            Self::Conflict(_) => "CONFLICT",
            Self::Internal(_) => "INTERNAL_ERROR",
            Self::InvalidState(_) => "INVALID_STATE_TRANSITION",
            Self::BadRequestDetailed { code, .. } => code,
            Self::Structured { code, .. } => code,
        }
    }

    fn category(&self) -> &str {
        match self {
            Self::NotFound(_) => "not_found",
            Self::BadRequest(_) => "validation",
            Self::Conflict(_) => "conflict",
            Self::Internal(_) => "internal",
            Self::InvalidState(_) => "conflict",
            Self::BadRequestDetailed { .. } => "validation",
            Self::Structured { .. } => "validation",
        }
    }

    fn message(&self) -> String {
        match self {
            Self::NotFound(msg)
            | Self::BadRequest(msg)
            | Self::Conflict(msg)
            | Self::Internal(msg)
            | Self::InvalidState(msg) => msg.clone(),
            Self::BadRequestDetailed { message, .. } => message.clone(),
            Self::Structured { message, .. } => message.clone(),
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        if let Self::BadRequestDetailed {
            code,
            message,
            details,
        } = &self
        {
            return ApiResponse::<()>::err_with_details(
                StatusCode::BAD_REQUEST,
                code,
                "validation",
                message.clone(),
                details.clone(),
            )
            .into_response();
        }
        ApiResponse::<()>::err(
            self.status_code(),
            self.error_code(),
            self.category(),
            self.message(),
        )
        .into_response()
    }
}
