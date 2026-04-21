use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ChatHistoryError {
    #[error("not found: {0}")]
    NotFound(String),

    #[error("schema version mismatch: stored={stored} bundled={bundled}")]
    SchemaVersionMismatch { stored: u32, bundled: u32 },

    #[error("validation failed: {0}")]
    ValidationFailed(String),

    #[error("conflict: {0}")]
    Conflict(String),

    #[error("not implemented: {0}")]
    NotImplemented(&'static str),

    #[error("host client error: {0}")]
    HostClient(String),

    #[error(transparent)]
    Sqlx(#[from] sqlx::Error),

    #[error(transparent)]
    Json(#[from] serde_json::Error),
}

impl IntoResponse for ChatHistoryError {
    fn into_response(self) -> Response {
        let (status, body) = match &self {
            ChatHistoryError::NotFound(msg) => (
                StatusCode::NOT_FOUND,
                json!({ "error": "not_found", "message": msg }),
            ),
            ChatHistoryError::SchemaVersionMismatch { stored, bundled } => (
                StatusCode::SERVICE_UNAVAILABLE,
                json!({
                    "error": "schema_version_mismatch",
                    "stored_schema_version": stored,
                    "bundled_schema_version": bundled,
                    "message": "extension version mismatch — chat history stored by a newer build; please update"
                }),
            ),
            ChatHistoryError::ValidationFailed(msg) => (
                StatusCode::BAD_REQUEST,
                json!({ "error": "validation_failed", "message": msg }),
            ),
            ChatHistoryError::Conflict(msg) => (
                StatusCode::CONFLICT,
                json!({ "error": "conflict", "message": msg }),
            ),
            ChatHistoryError::NotImplemented(what) => (
                StatusCode::NOT_IMPLEMENTED,
                json!({ "error": "not_implemented", "message": what }),
            ),
            ChatHistoryError::HostClient(msg) => (
                StatusCode::BAD_GATEWAY,
                json!({ "error": "host_client_error", "message": msg }),
            ),
            ChatHistoryError::Sqlx(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                json!({ "error": "storage_error", "message": e.to_string() }),
            ),
            ChatHistoryError::Json(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                json!({ "error": "json_error", "message": e.to_string() }),
            ),
        };
        (status, Json(body)).into_response()
    }
}

pub type Result<T> = std::result::Result<T, ChatHistoryError>;
