//! Contract tests for `GET /api/v1/model-store/backends`
//! (spec 025-models-search-refactor, T025 + T050 + T051).

mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_models_store::model::BackendStatus;
use tower::ServiceExt;

use crate::common::{StubHf, harness_with, harness_with_extra};

async fn get_backends_body(state: nexus_api::AppState) -> serde_json::Value {
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/model-store/backends")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

/// T-B1 — default registry has exactly one `llama.cpp` entry with
/// `supported_formats = ["gguf", "ggml"]` (FR-050, FR-051, FR-053).
#[tokio::test]
async fn t_b1_llama_cpp_is_the_sole_default_backend() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let body = get_backends_body(harness.state).await;

    let backends = body["data"]["backends"].as_array().unwrap();
    assert_eq!(backends.len(), 1);
    assert_eq!(backends[0]["backend_id"], "llama.cpp");
    assert_eq!(backends[0]["status"], "enabled");
    assert_eq!(
        backends[0]["supported_formats"],
        serde_json::json!(["gguf", "ggml"])
    );
}

/// T-B2 — SC-004 mechanical proof. Registering a second adapter makes
/// `/backends` return two entries without any page-code edits.
#[tokio::test]
async fn t_b2_second_backend_appears_without_page_changes() {
    let harness =
        harness_with_extra(StubHf::with_results(vec![]), Some(BackendStatus::Enabled)).await;
    let body = get_backends_body(harness.state).await;

    let backends = body["data"]["backends"].as_array().unwrap();
    assert_eq!(backends.len(), 2);
    let ids: Vec<&str> = backends
        .iter()
        .map(|b| b["backend_id"].as_str().unwrap())
        .collect();
    assert!(ids.contains(&"llama.cpp"));
    assert!(ids.contains(&"diffusers"));
}

/// T-B3 — experimental backends surface their status verbatim so the
/// frontend can paint a distinguishing label (FR-051).
#[tokio::test]
async fn t_b3_experimental_status_is_preserved_in_response() {
    let harness = harness_with_extra(
        StubHf::with_results(vec![]),
        Some(BackendStatus::Experimental),
    )
    .await;
    let body = get_backends_body(harness.state).await;
    let backends = body["data"]["backends"].as_array().unwrap();
    let diffusers = backends
        .iter()
        .find(|b| b["backend_id"] == "diffusers")
        .expect("diffusers adapter present");
    assert_eq!(diffusers["status"], "experimental");
}
