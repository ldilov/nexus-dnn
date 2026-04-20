mod common;

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::handlers::extensions_local_llm::inference::RecordingInferenceBackend;
use nexus_models_store::downloads::InstalledArtifactRecord;
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId, VariantId};
use nexus_models_store::types::Format;
use tower::ServiceExt;

use crate::common::{harness_with, StubHf};

const FAMILY_ID: &str = "huggingface:t/proof-model";
const VARIANT_ID: &str = "Q8_0";
const MODEL_FILENAME: &str = "proof-model.Q8_0.gguf";

async fn post_json(
    state: nexus_api::AppState,
    uri: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri(uri)
                .method("POST")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value = if bytes.is_empty() {
        serde_json::Value::Null
    } else {
        serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
    };
    (status, json)
}

async fn put_json(
    state: nexus_api::AppState,
    uri: &str,
    body: serde_json::Value,
) -> StatusCode {
    let router = nexus_api::create_router(state);
    router
        .oneshot(
            Request::builder()
                .uri(uri)
                .method("PUT")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap()
        .status()
}

#[tokio::test]
async fn hyperparameters_reach_llamacpp_byte_for_byte() {
    let mut harness = harness_with(StubHf::with_results(vec![])).await;
    let recorder = RecordingInferenceBackend::new();
    harness.state.inference = Arc::new(recorder.clone());

    harness
        .install_map
        .record(InstalledArtifactRecord {
            artifact_id: ArtifactId::from("art_proof".to_string()),
            family_id: FamilyId::from(FAMILY_ID.to_string()),
            variant_id: Some(VariantId::from(VARIANT_ID.to_string())),
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "t/proof-model".into(),
            source_revision: Some("main".into()),
            filename: MODEL_FILENAME.into(),
            job_id: JobId::new(),
            sha256: None,
            size_bytes: Some(8_000_000_000),
        })
        .await
        .unwrap();

    let state = harness.state.clone();
    let (status, body) = post_json(
        state.clone(),
        "/api/v1/extensions/local-llm/chat/threads",
        serde_json::json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED, "create_thread: {body}");
    let thread_id = body["data"]["id"].as_str().expect("thread id").to_string();

    let bind_status = put_json(
        state.clone(),
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/active_model"
        ),
        serde_json::json!({
            "family_id": FAMILY_ID,
            "variant_id": VARIANT_ID,
        }),
    )
    .await;
    assert_eq!(bind_status, StatusCode::OK);

    let params_status = put_json(
        state.clone(),
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/generation_settings"
        ),
        serde_json::json!({
            "temperature": 1.7f32,
            "top_p": 0.9f32,
            "top_k": 40u32,
            "max_tokens": 16u32,
            "repeat_penalty": 1.1f32,
            "system_prompt": "You are a helpful assistant.",
        }),
    )
    .await;
    assert_eq!(params_status, StatusCode::OK);

    let (send_status, send_body) = post_json(
        state,
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/messages"
        ),
        serde_json::json!({ "content": "ping" }),
    )
    .await;
    assert_eq!(send_status, StatusCode::OK, "send_message: {send_body}");

    let captured = recorder.last_call().expect("recorder captured call");
    assert_eq!(captured.sampling.temperature.to_bits(), 1.7f32.to_bits());
    assert_eq!(captured.sampling.top_p.to_bits(), 0.9f32.to_bits());
    assert_eq!(captured.sampling.top_k, 40);
    assert_eq!(captured.sampling.max_tokens, 16);
    assert_eq!(captured.sampling.repeat_penalty.to_bits(), 1.1f32.to_bits());
    assert_eq!(
        captured.system_prompt.as_deref(),
        Some("You are a helpful assistant."),
    );
    assert_eq!(captured.user_content, "ping");
    assert!(
        captured
            .model_path
            .to_string_lossy()
            .ends_with(".gguf"),
        "model_path should end with .gguf, got {:?}",
        captured.model_path
    );
    assert!(
        captured
            .model_path
            .to_string_lossy()
            .contains(VARIANT_ID),
        "model_path should contain variant id, got {:?}",
        captured.model_path
    );
    assert_eq!(recorder.call_count(), 1);

    let proof = serde_json::json!({
        "spec": "026",
        "test": "chat_hyperparameters_reach_llamacpp",
        "captured": captured,
        "passed_at": chrono::Utc::now().to_rfc3339(),
    });
    std::fs::create_dir_all("target").ok();
    std::fs::write(
        "target/sc-026-proof.json",
        serde_json::to_string_pretty(&proof).unwrap(),
    )
    .expect("emit proof file");

    let round_trip: serde_json::Value = serde_json::from_slice(
        &std::fs::read("target/sc-026-proof.json").expect("proof file exists"),
    )
    .expect("proof file parses");
    assert_eq!(round_trip["spec"], "026");
    assert_eq!(
        round_trip["test"],
        "chat_hyperparameters_reach_llamacpp"
    );
}

#[tokio::test]
async fn send_message_with_dead_pointer_returns_410() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state.clone();

    let (status, body) = post_json(
        state.clone(),
        "/api/v1/extensions/local-llm/chat/threads",
        serde_json::json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED, "{body}");
    let thread_id = body["data"]["id"].as_str().unwrap().to_string();

    let bind_status = put_json(
        state.clone(),
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/active_model"
        ),
        serde_json::json!({
            "family_id": "huggingface:ghost/family",
            "variant_id": "Q8_0",
        }),
    )
    .await;
    assert_eq!(bind_status, StatusCode::OK);

    let (send_status, _) = post_json(
        state,
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/messages"
        ),
        serde_json::json!({ "content": "hi" }),
    )
    .await;
    assert_eq!(send_status, StatusCode::GONE);
}

#[tokio::test]
async fn send_message_without_active_model_returns_bad_request() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state.clone();
    let (status, body) = post_json(
        state.clone(),
        "/api/v1/extensions/local-llm/chat/threads",
        serde_json::json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED, "{body}");
    let thread_id = body["data"]["id"].as_str().unwrap().to_string();

    let (send_status, send_body) = post_json(
        state,
        &format!(
            "/api/v1/extensions/local-llm/chat/threads/{thread_id}/messages"
        ),
        serde_json::json!({ "content": "ping" }),
    )
    .await;
    assert_eq!(send_status, StatusCode::BAD_REQUEST);
    assert!(
        send_body["error"]["message"]
            .as_str()
            .unwrap_or("")
            .contains("no_active_model"),
        "expected no_active_model, got {send_body}"
    );
}
