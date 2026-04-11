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
}

impl ApiError {
    fn status_code(&self) -> StatusCode {
        match self {
            Self::NotFound(_) => StatusCode::NOT_FOUND,
            Self::BadRequest(_) => StatusCode::BAD_REQUEST,
            Self::Conflict(_) => StatusCode::CONFLICT,
            Self::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::InvalidState(_) => StatusCode::CONFLICT,
        }
    }

    fn error_code(&self) -> &str {
        match self {
            Self::NotFound(_) => "NOT_FOUND",
            Self::BadRequest(_) => "BAD_REQUEST",
            Self::Conflict(_) => "CONFLICT",
            Self::Internal(_) => "INTERNAL_ERROR",
            Self::InvalidState(_) => "INVALID_STATE_TRANSITION",
        }
    }

    fn category(&self) -> &str {
        match self {
            Self::NotFound(_) => "not_found",
            Self::BadRequest(_) => "validation",
            Self::Conflict(_) => "conflict",
            Self::Internal(_) => "internal",
            Self::InvalidState(_) => "conflict",
        }
    }

    fn message(&self) -> String {
        match self {
            Self::NotFound(msg)
            | Self::BadRequest(msg)
            | Self::Conflict(msg)
            | Self::Internal(msg)
            | Self::InvalidState(msg) => msg.clone(),
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        ApiResponse::<()>::err(
            self.status_code(),
            self.error_code(),
            self.category(),
            self.message(),
        )
        .into_response()
    }
}
