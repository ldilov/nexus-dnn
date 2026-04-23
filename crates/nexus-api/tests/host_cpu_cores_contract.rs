//! Spec 028 — T015. Contract tests for `GET /api/host/cpu/cores`
//! (see `specs/028-gguf-layer-metadata/contracts/host_cpu_cores.openapi.yaml`).
//!
//! The handler is T028; until it lands every test is `#[ignore]`-gated.

mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde::Deserialize;
use tower::ServiceExt;

use crate::common::{StubHf, harness_with};

#[derive(Debug, Deserialize)]
struct CpuCoreFacts {
    physical: u32,
    logical: u32,
    detection_ok: bool,
}

async fn get_cpu_cores(state: nexus_api::AppState) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/host/cpu/cores")
                .body(Body::empty())
                .expect("build request"),
        )
        .await
        .expect("router oneshot");
    let status = response.status();
    let bytes = response
        .into_body()
        .collect()
        .await
        .expect("collect body")
        .to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&bytes).expect("valid json response");
    (status, json)
}

#[tokio::test]
async fn cpu_cores_returns_typical_shape() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let (status, body) = get_cpu_cores(harness.state).await;
    assert_eq!(status, StatusCode::OK);

    let facts: CpuCoreFacts =
        serde_json::from_value(body.clone()).expect("parses into CpuCoreFacts");
    assert!(facts.physical > 0, "physical > 0 on dev host");
    assert!(facts.logical > 0, "logical > 0 on dev host");
    assert!(
        facts.detection_ok,
        "detection should succeed on a normal dev host; got false"
    );
}

#[tokio::test]
async fn cpu_cores_fallback_shape_is_valid() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let (status, body) = get_cpu_cores(harness.state).await;
    assert_eq!(status, StatusCode::OK);

    let facts: CpuCoreFacts = serde_json::from_value(body)
        .expect("JSON must always parse into CpuCoreFacts, even on fallback");
    assert!(facts.physical >= 1);
    assert!(facts.logical >= 1);
    let _ = facts.detection_ok;
}
