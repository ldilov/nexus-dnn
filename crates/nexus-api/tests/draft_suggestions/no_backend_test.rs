//! Pre-stream lease failure contract test.
//!
//! When the provider returns `NoEligibleBackend` from `open_stream`,
//! the endpoint MUST return HTTP 503 with body
//! `{ code: "no_backend_leasable", ... }` per
//! `contracts/draft_suggestions.openapi.yaml`. The SSE stream MUST NOT
//! open — 503 is reserved for the pre-stream case.

use std::sync::Arc;

use http_body_util::BodyExt;
use nexus_api::handlers::draft_suggestions::{DraftSuggestionError, FakeStreamProvider};
use tower::ServiceExt;

use super::common::{build_app, build_post_request, happy_path_body};

#[tokio::test]
async fn no_eligible_backend_returns_503_with_typed_envelope() {
    let provider = Arc::new(FakeStreamProvider::with_open_error(
        DraftSuggestionError::NoEligibleBackend,
    ));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();

    assert_eq!(resp.status(), 503);
    let content_type = resp
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_string();
    assert!(
        content_type.contains("application/json"),
        "503 body MUST be JSON, not SSE; got {content_type:?}"
    );

    let body = resp.into_body().collect().await.unwrap().to_bytes().to_vec();
    let json: serde_json::Value = serde_json::from_slice(&body).unwrap();
    assert_eq!(json["code"], "no_backend_leasable");
    assert!(json["message"].is_string());
    // Generic CTA per the OpenAPI fragment — host knows nothing about
    // which extension provides the backend.
    assert_eq!(json["cta"]["href"], "/backends");
}

#[tokio::test]
async fn lease_acquisition_failed_also_returns_503_no_backend() {
    let provider = Arc::new(FakeStreamProvider::with_open_error(
        DraftSuggestionError::LeaseAcquisitionFailed("connection refused".into()),
    ));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();
    assert_eq!(resp.status(), 503);

    let body = resp.into_body().collect().await.unwrap().to_bytes().to_vec();
    let json: serde_json::Value = serde_json::from_slice(&body).unwrap();
    assert_eq!(json["code"], "no_backend_leasable");
    // ui_message MUST NOT leak the internal "connection refused".
    let msg = json["message"].as_str().unwrap_or("");
    assert!(!msg.contains("connection refused"), "internal detail leaked");
}
