//! Spec 028 — T014. Contract tests for
//! `GET /api/host/models/{install_id}/metadata` (see
//! `specs/028-gguf-layer-metadata/contracts/host_models_metadata.openapi.yaml`).
//!
//! The handler is T027; until it lands every test is `#[ignore]`-gated
//! so the suite stays green. Remove `#[ignore]` when T027 merges.

mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use tower::ServiceExt;

use crate::common::{
    harness_with, insert_installed_artifact_fixture, InstalledArtifactFixture, StubHf,
};

async fn get_metadata(
    state: nexus_api::AppState,
    install_id: &str,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let uri = format!("/api/host/models/{install_id}/metadata");
    let response = router
        .oneshot(
            Request::builder()
                .uri(uri)
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
    let json: serde_json::Value = if bytes.is_empty() {
        serde_json::Value::Null
    } else {
        serde_json::from_slice(&bytes).expect("valid json")
    };
    (status, json)
}

#[tokio::test]
async fn gguf_full_metadata_returns_complete_record() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let install_id = "hf:meta-llama/Llama-3.1-8B-Instruct-GGUF:q4_k_m";
    insert_installed_artifact_fixture(
        harness.state.db.pool(),
        &InstalledArtifactFixture {
            artifact_id: install_id.to_string(),
            family_id: "llama-3.1-8b-instruct".to_string(),
            format: "gguf",
            layer_count: Some(32),
            max_context: Some(131_072),
            architecture: Some("llama".to_string()),
            hidden_size: Some(4096),
            extraction_status: Some("ok"),
        },
    )
    .await
    .expect("seed fixture");

    let (status, body) = get_metadata(harness.state, install_id).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["install_id"], install_id);
    assert_eq!(body["format"], "gguf");
    assert_eq!(body["layer_count"], 32);
    assert_eq!(body["max_context"], 131_072);
    assert_eq!(body["architecture"], "llama");
    assert_eq!(body["hidden_size"], 4096);
    assert_eq!(body["extraction_status"], "ok");
    assert!(body["extracted_at"].is_i64(), "extracted_at must be i64");
}

#[tokio::test]
async fn safetensors_full_metadata() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let install_id = "hf:Qwen/Qwen2.5-7B-Instruct";
    insert_installed_artifact_fixture(
        harness.state.db.pool(),
        &InstalledArtifactFixture {
            artifact_id: install_id.to_string(),
            family_id: "qwen2.5-7b-instruct".to_string(),
            format: "safetensors",
            layer_count: Some(28),
            max_context: Some(32_768),
            architecture: Some("qwen2".to_string()),
            hidden_size: Some(3584),
            extraction_status: Some("ok"),
        },
    )
    .await
    .expect("seed fixture");

    let (status, body) = get_metadata(harness.state, install_id).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["install_id"], install_id);
    assert_eq!(body["format"], "safetensors");
    assert_eq!(body["layer_count"], 28);
    assert_eq!(body["max_context"], 32_768);
    assert_eq!(body["architecture"], "qwen2");
    assert_eq!(body["hidden_size"], 3584);
    assert_eq!(body["extraction_status"], "ok");
    assert!(body["extracted_at"].is_i64());
}

#[tokio::test]
async fn pytorch_partial_returns_partial_fields() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let install_id = "hf:legacy/old-model";
    insert_installed_artifact_fixture(
        harness.state.db.pool(),
        &InstalledArtifactFixture {
            artifact_id: install_id.to_string(),
            family_id: "legacy-old-model".to_string(),
            format: "pytorch_index",
            layer_count: Some(24),
            max_context: None,
            architecture: Some("llama".to_string()),
            hidden_size: None,
            extraction_status: Some("partial"),
        },
    )
    .await
    .expect("seed fixture");

    let (status, body) = get_metadata(harness.state, install_id).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["install_id"], install_id);
    assert_eq!(body["format"], "pytorch_index");
    assert_eq!(body["layer_count"], 24);
    assert!(body["max_context"].is_null());
    assert_eq!(body["architecture"], "llama");
    assert!(body["hidden_size"].is_null());
    assert_eq!(body["extraction_status"], "partial");
    assert!(body["extracted_at"].is_i64());
}

#[tokio::test]
async fn failed_extraction_returns_all_nulls() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let install_id = "hf:unsafe/pickle-only";
    insert_installed_artifact_fixture(
        harness.state.db.pool(),
        &InstalledArtifactFixture {
            artifact_id: install_id.to_string(),
            family_id: "unsafe-pickle-only".to_string(),
            format: "unknown",
            layer_count: None,
            max_context: None,
            architecture: None,
            hidden_size: None,
            extraction_status: Some("failed"),
        },
    )
    .await
    .expect("seed fixture");

    let (status, body) = get_metadata(harness.state, install_id).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["install_id"], install_id);
    assert_eq!(body["format"], "unknown");
    assert!(body["layer_count"].is_null());
    assert!(body["max_context"].is_null());
    assert!(body["architecture"].is_null());
    assert!(body["hidden_size"].is_null());
    assert_eq!(body["extraction_status"], "failed");
    assert!(body["extracted_at"].is_i64());
}

#[tokio::test]
async fn unknown_install_id_returns_404() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let (status, _body) = get_metadata(harness.state, "does-not-exist").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}
