//! Local-only ApiResponse envelope for the LLM extension's chat handlers.
//!
//! Mirrors the host's `nexus_api::envelope::ApiResponse` shape so the
//! extension's HTTP responses remain wire-compatible with the legacy
//! `/extensions/local-llm/chat/*` routes that pre-CP2 callers expect.
//! Self-contained to avoid an extension → host crate dependency.

use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Meta {
    pub timestamp: String,
}

#[derive(Debug, Serialize)]
pub struct ErrorPayload {
    pub code: String,
    pub category: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
pub struct ApiResponse<T: Serialize> {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    pub meta: Meta,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<ErrorPayload>,
    #[serde(skip)]
    status: StatusCode,
}

fn now_meta() -> Meta {
    Meta {
        timestamp: chrono::Utc::now().to_rfc3339(),
    }
}

impl<T: Serialize> ApiResponse<T> {
    pub fn ok(data: T) -> Self {
        Self {
            data: Some(data),
            meta: now_meta(),
            error: None,
            status: StatusCode::OK,
        }
    }
}

impl ApiResponse<()> {
    pub fn no_content() -> Self {
        Self {
            data: None,
            meta: now_meta(),
            error: None,
            status: StatusCode::NO_CONTENT,
        }
    }

    pub fn err(status: StatusCode, code: &str, category: &str, message: String) -> Self {
        Self {
            data: None,
            meta: now_meta(),
            error: Some(ErrorPayload {
                code: code.to_owned(),
                category: category.to_owned(),
                message,
                details: None,
            }),
            status,
        }
    }

    pub fn not_found(message: String) -> Self {
        Self::err(StatusCode::NOT_FOUND, "NOT_FOUND", "not_found", message)
    }

    pub fn bad_request(message: String) -> Self {
        Self::err(
            StatusCode::BAD_REQUEST,
            "BAD_REQUEST",
            "validation",
            message,
        )
    }

    pub fn internal(message: String) -> Self {
        Self::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "INTERNAL_ERROR",
            "internal",
            message,
        )
    }
}

impl<T: Serialize> IntoResponse for ApiResponse<T> {
    fn into_response(self) -> Response {
        let status = self.status;
        (status, axum::Json(self)).into_response()
    }
}
