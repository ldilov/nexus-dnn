//! `POST /api/v1/services/text-completion` handler.

use std::sync::Arc;
use std::time::Duration;

use axum::Extension;
use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};
use serde_json::json;

use nexus_backend_runtimes::generic::leases::text_completion::ResponseFormat;

use super::errors::{TextCompletionError, status_code};
use super::service::TextCompletionService;

/// Soft upper bound on `timeout_ms`. Callers asking for more than a
/// minute likely have a runaway request; reject early to protect the
/// host event loop.
const MAX_TIMEOUT_MS: u32 = 60_000;

#[derive(Debug, Clone, Deserialize)]
pub struct TextCompletionRequest {
    #[serde(default)]
    pub system: String,
    pub user: String,
    pub max_tokens: u32,
    pub timeout_ms: u32,
    /// Optional structured-output constraint forwarded verbatim to the
    /// worker. Pre-Spec-050 callers omit this field and observe
    /// byte-identical request semantics.
    #[serde(default)]
    pub response_format: Option<ResponseFormat>,
}

#[derive(Debug, Clone, Serialize)]
pub struct TextCompletionResponse {
    pub text: String,
}

pub async fn complete(
    Extension(service): Extension<Arc<dyn TextCompletionService>>,
    Json(request): Json<TextCompletionRequest>,
) -> Response {
    if request.user.is_empty() {
        return validation_response("user must be non-empty");
    }
    if request.max_tokens == 0 {
        return validation_response("max_tokens must be > 0");
    }
    if request.timeout_ms == 0 {
        return validation_response("timeout_ms must be > 0");
    }
    if request.timeout_ms > MAX_TIMEOUT_MS {
        return validation_response("timeout_ms exceeds host upper bound");
    }

    let timeout = Duration::from_millis(request.timeout_ms as u64);
    match service
        .complete(
            request.system,
            request.user,
            request.max_tokens,
            timeout,
            request.response_format,
        )
        .await
    {
        Ok(text) => (StatusCode::OK, Json(TextCompletionResponse { text })).into_response(),
        Err(err) => error_response(&err),
    }
}

fn validation_response(message: &str) -> Response {
    (
        StatusCode::BAD_REQUEST,
        Json(json!({
            "code": "validation_error",
            "message": message,
        })),
    )
        .into_response()
}

fn error_response(err: &TextCompletionError) -> Response {
    let status = status_code(err);
    (
        status,
        Json(json!({
            "code": err.code().as_wire_str(),
            "message": err.ui_message(),
        })),
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use super::*;
    use async_trait::async_trait;
    use axum::body::to_bytes;

    struct FakeService {
        outcome: Result<String, TextCompletionError>,
    }

    #[async_trait]
    impl TextCompletionService for FakeService {
        async fn complete(
            &self,
            _system: String,
            _user: String,
            _max_tokens: u32,
            _timeout: Duration,
            _response_format: Option<ResponseFormat>,
        ) -> Result<String, TextCompletionError> {
            self.outcome.clone()
        }
    }

    fn ok_request() -> TextCompletionRequest {
        TextCompletionRequest {
            system: "be terse".into(),
            user: "hello".into(),
            max_tokens: 16,
            timeout_ms: 1000,
            response_format: None,
        }
    }

    #[test]
    fn request_without_response_format_field_deserializes() {
        let body = r#"{"user":"hi","max_tokens":8,"timeout_ms":500}"#;
        let req: TextCompletionRequest = serde_json::from_str(body).unwrap();
        assert!(req.response_format.is_none());
    }

    #[test]
    fn request_with_json_schema_round_trips() {
        let body = r#"{
            "user":"give json",
            "max_tokens":256,
            "timeout_ms":2000,
            "response_format":{
                "type":"json_schema",
                "schema":{"type":"object"},
                "name":"x"
            }
        }"#;
        let req: TextCompletionRequest = serde_json::from_str(body).unwrap();
        match req.response_format.expect("response_format must parse") {
            ResponseFormat::JsonSchema { name, .. } => assert_eq!(name, "x"),
        }
    }

    async fn body_text(resp: Response) -> (StatusCode, serde_json::Value) {
        let status = resp.status();
        let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
        let value: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
        (status, value)
    }

    #[tokio::test]
    async fn happy_path_returns_200_with_text() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Ok("hello world".into()),
        });
        let resp = complete(Extension(service), Json(ok_request())).await;
        let (status, body) = body_text(resp).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body["text"], "hello world");
    }

    #[tokio::test]
    async fn empty_user_returns_400_validation() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Ok("".into()),
        });
        let req = TextCompletionRequest {
            user: "".into(),
            ..ok_request()
        };
        let (status, body) = body_text(complete(Extension(service), Json(req)).await).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
        assert_eq!(body["code"], "validation_error");
    }

    #[tokio::test]
    async fn zero_max_tokens_returns_400() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Ok("".into()),
        });
        let req = TextCompletionRequest {
            max_tokens: 0,
            ..ok_request()
        };
        let (status, _) = body_text(complete(Extension(service), Json(req)).await).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
    }

    #[tokio::test]
    async fn excessive_timeout_returns_400() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Ok("".into()),
        });
        let req = TextCompletionRequest {
            timeout_ms: 60_001,
            ..ok_request()
        };
        let (status, body) = body_text(complete(Extension(service), Json(req)).await).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
        assert!(body["message"].as_str().unwrap().contains("timeout_ms"));
    }

    #[tokio::test]
    async fn no_eligible_backend_returns_503() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::NoEligibleBackend),
        });
        let (status, body) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
        assert_eq!(body["code"], "no_eligible_backend");
    }

    #[tokio::test]
    async fn timeout_returns_504() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::Timeout(1000)),
        });
        let (status, body) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::GATEWAY_TIMEOUT);
        assert_eq!(body["code"], "timeout");
    }

    #[tokio::test]
    async fn model_unavailable_returns_502() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::ModelUnavailable("nope".into())),
        });
        let (status, body) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::BAD_GATEWAY);
        assert_eq!(body["code"], "model_unavailable");
    }

    #[tokio::test]
    async fn lease_revoked_returns_502() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::LeaseRevoked("gone".into())),
        });
        let (status, body) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::BAD_GATEWAY);
        assert_eq!(body["code"], "lease_revoked");
    }

    #[tokio::test]
    async fn prompt_too_long_returns_400() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::PromptTooLong("overflow".into())),
        });
        let (status, _) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
    }

    #[tokio::test]
    async fn internal_returns_500_with_redacted_message() {
        let service: Arc<dyn TextCompletionService> = Arc::new(FakeService {
            outcome: Err(TextCompletionError::Internal("stack frame leak".into())),
        });
        let (status, body) = body_text(complete(Extension(service), Json(ok_request())).await).await;
        assert_eq!(status, StatusCode::INTERNAL_SERVER_ERROR);
        assert!(!body["message"].as_str().unwrap().contains("stack"));
    }
}
