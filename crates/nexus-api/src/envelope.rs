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

impl<T: Serialize> ApiResponse<T> {
    pub fn ok(data: T) -> Self {
        Self {
            data: Some(data),
            meta: Meta {
                timestamp: chrono::Utc::now().to_rfc3339(),
            },
            error: None,
            status: StatusCode::OK,
        }
    }

    pub fn created(data: T) -> Self {
        Self {
            data: Some(data),
            meta: Meta {
                timestamp: chrono::Utc::now().to_rfc3339(),
            },
            error: None,
            status: StatusCode::CREATED,
        }
    }
}

impl ApiResponse<()> {
    pub fn no_content() -> Self {
        Self {
            data: None,
            meta: Meta {
                timestamp: chrono::Utc::now().to_rfc3339(),
            },
            error: None,
            status: StatusCode::NO_CONTENT,
        }
    }

    pub fn err(status: StatusCode, code: &str, category: &str, message: String) -> Self {
        Self {
            data: None,
            meta: Meta {
                timestamp: chrono::Utc::now().to_rfc3339(),
            },
            error: Some(ErrorPayload {
                code: code.to_owned(),
                category: category.to_owned(),
                message,
                details: None,
            }),
            status,
        }
    }

    pub fn err_with_details(
        status: StatusCode,
        code: &str,
        category: &str,
        message: String,
        details: serde_json::Value,
    ) -> Self {
        Self {
            data: None,
            meta: Meta {
                timestamp: chrono::Utc::now().to_rfc3339(),
            },
            error: Some(ErrorPayload {
                code: code.to_owned(),
                category: category.to_owned(),
                message,
                details: Some(details),
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

    pub fn conflict(message: String) -> Self {
        Self::err(StatusCode::CONFLICT, "CONFLICT", "conflict", message)
    }

    pub fn internal(message: String) -> Self {
        Self::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "INTERNAL_ERROR",
            "internal",
            message,
        )
    }

    pub fn invalid_state(message: String) -> Self {
        Self::err(
            StatusCode::CONFLICT,
            "INVALID_STATE_TRANSITION",
            "conflict",
            message,
        )
    }
}

impl<T: Serialize> IntoResponse for ApiResponse<T> {
    fn into_response(self) -> Response {
        let status = self.status;
        if status.is_server_error() {
            if let Some(payload) = self.error.as_ref() {
                tracing::error!(
                    target: "nexus_api::handler",
                    status = %status,
                    code = %payload.code,
                    category = %payload.category,
                    message = %payload.message,
                    "handler returned {status}",
                );
            } else {
                tracing::error!(
                    target: "nexus_api::handler",
                    status = %status,
                    "handler returned {status} with no error payload",
                );
            }
        } else if status.is_client_error() {
            if let Some(payload) = self.error.as_ref() {
                tracing::warn!(
                    target: "nexus_api::handler",
                    status = %status,
                    code = %payload.code,
                    category = %payload.category,
                    message = %payload.message,
                    "handler returned {status}",
                );
            }
        }
        (status, axum::Json(self)).into_response()
    }
}
