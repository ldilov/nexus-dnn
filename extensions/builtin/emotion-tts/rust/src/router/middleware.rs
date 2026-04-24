//! Router middleware: request-id propagation, tracing span wrapper, JSON error envelope.

use axum::http::{HeaderName, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde::Serialize;

use crate::domain::EmotionTtsError;

pub const REQUEST_ID_HEADER: HeaderName = HeaderName::from_static("x-request-id");

#[derive(Debug, Serialize)]
pub struct ErrorEnvelope {
    pub status: &'static str,
    pub category: &'static str,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

impl ErrorEnvelope {
    #[must_use]
    pub fn from_error(err: &EmotionTtsError, request_id: Option<String>) -> Self {
        Self {
            status: "error",
            category: err.category(),
            message: err.to_string(),
            request_id,
        }
    }
}

impl IntoResponse for EmotionTtsError {
    fn into_response(self) -> Response {
        let status = StatusCode::from_u16(self.status_code()).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
        let body = ErrorEnvelope::from_error(&self, None);
        (status, Json(body)).into_response()
    }
}

#[must_use]
pub fn new_request_id() -> String {
    ulid::Ulid::new().to_string()
}

#[must_use]
pub fn request_id_value(id: &str) -> HeaderValue {
    HeaderValue::from_str(id).unwrap_or_else(|_| HeaderValue::from_static("invalid"))
}
