//! Contract tests for `POST /api/v1/model-store/downloads` +
//! `GET /api/v1/model-store/downloads/:job_id`
//! (spec 025-models-search-refactor, T024 + T063 + T080 + T081).
//!
//! Goal: cover the request-shape invariants and the state-machine
//! transitions that are observable without actually downloading
//! bytes. Target files point at deliberately-broken URLs so the
//! worker fails quickly; the tests check contracts, not the wire.

mod common;

use std::time::Duration;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_huggingface::{RepoFile, SearchResult};
use nexus_models_store::types::DownloadState;
use tower::ServiceExt;

use crate::common::{StubHf, gguf_result, harness_with};

async fn call(
    state: nexus_api::AppState,
    method: &str,
    uri: &str,
    body: Option<serde_json::Value>,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let req = Request::builder()
        .method(method)
        .uri(uri)
        .header("content-type", "application/json");
    let req = match body {
        Some(b) => req
            .body(Body::from(serde_json::to_vec(&b).unwrap()))
            .unwrap(),
        None => req.body(Body::empty()).unwrap(),
    };
    let response = router.oneshot(req).await.unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value = if bytes.is_empty() {
        serde_json::Value::Null
    } else {
        serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
    };
    (status, json)
}

fn variant_body(family_id: &str, variant_id: &str) -> serde_json::Value {
    serde_json::json!({
        "family_id": family_id,
        "target": { "kind": "variant", "variant_id": variant_id },
        "include_dependencies": false,
    })
}

fn bundle_body(family_id: &str) -> serde_json::Value {
    serde_json::json!({
        "family_id": family_id,
        "target": { "kind": "bundle" },
        "include_dependencies": true,
    })
}

fn sdxl_result() -> SearchResult {
    SearchResult {
        repo_id: "stabilityai/sdxl".into(),
        author: Some("stabilityai".into()),
        license: Some("openrail++".into()),
        downloads_30d: Some(500_000),
        last_modified: Some("2026-01-01T00:00:00Z".into()),
        files: vec![
            RepoFile {
                path: "sd_xl_base.safetensors".into(),
                size_bytes: Some(6_900_000_000),
            },
            RepoFile {
                path: "vae/diffusion_pytorch_model.safetensors".into(),
                size_bytes: Some(335_000_000),
            },
        ],
        formats: vec!["safetensors".into()],
        quantizations: vec![],
        pipeline_tag: Some("text-to-image".into()),
    }
}

/// T-J1 — `kind=variant` produces a job whose target list has exactly
/// the artifact(s) backing the requested variant (FR-081, FR-102).
#[tokio::test]
async fn t_j1_variant_job_targets_exactly_that_variant() {
    let results = vec![gguf_result(
        "acme/llama",
        &[("Q4_K_M", 1_000), ("Q5_K_M", 1_500)],
    )];
    let harness = harness_with(StubHf::with_results(results)).await;

    let body = variant_body("huggingface:acme/llama", "huggingface:acme/llama@Q5_K_M");
    let (status, json) = call(
        harness.state,
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let targets = json["data"]["targets"].as_array().unwrap();
    assert_eq!(targets.len(), 1);
    assert_eq!(targets[0]["filename"], "model.Q5_K_M.gguf");
    assert_eq!(json["data"]["requested_kind"], "variant");
    assert_eq!(json["data"]["include_dependencies"], false);
}

/// T-J2 — `kind=bundle` resolves to primary + every required
/// dependency (FR-042 + Clarify Q1). Tested with an SDXL fixture —
/// the dependency detector must flag the VAE as Required.
#[tokio::test]
async fn t_j2_bundle_job_includes_primary_plus_required_deps() {
    let harness = harness_with(StubHf::with_results(vec![sdxl_result()])).await;
    let body = bundle_body("huggingface:stabilityai/sdxl");
    let (status, json) = call(
        harness.state,
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let targets = json["data"]["targets"].as_array().unwrap();
    assert!(
        targets.len() >= 2,
        "primary + vae at minimum, got {}",
        targets.len()
    );
    let filenames: Vec<&str> = targets
        .iter()
        .map(|t| t["filename"].as_str().unwrap())
        .collect();
    assert!(filenames.iter().any(|f| f.contains("sd_xl_base")));
    assert!(
        filenames
            .iter()
            .any(|f| f.contains("diffusion_pytorch_model"))
    );
    assert_eq!(json["data"]["include_dependencies"], true);
}

/// T-J3 — a second POST for the same `(family_id, target)` before the
/// first terminates is idempotent: returns the FULL DownloadJob DTO
/// for the existing job (same `job_id`, same `family_id`, populated
/// `state` field). This is the post-fix contract — the previous stub
/// response `{ existing: true, job_id }` left the frontend with an
/// undefined-everywhere DownloadJob that broke the progress-bar
/// state machine. The host now always returns the canonical DTO so
/// the client can reconcile state on duplicate posts.
#[tokio::test]
async fn t_j3_duplicate_active_request_returns_existing_job_dto() {
    let results = vec![gguf_result("acme/llama", &[("Q4_K_M", 1)])];
    let harness = harness_with(StubHf::with_results(results)).await;

    let body = variant_body("huggingface:acme/llama", "huggingface:acme/llama@Q4_K_M");
    let (_, first) = call(
        harness.state.clone(),
        "POST",
        "/api/v1/model-store/downloads",
        Some(body.clone()),
    )
    .await;
    let first_id = first["data"]["job_id"].as_str().unwrap().to_owned();

    let (status, second) = call(
        harness.state.clone(),
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    // Same job_id as the original — idempotency preserved.
    assert_eq!(second["data"]["job_id"], first_id);
    // Full DTO shape — these fields are what the frontend relies on
    // to drive the progress state machine.
    assert_eq!(
        second["data"]["family_id"], "huggingface:acme/llama",
        "duplicate response must carry the canonical family_id"
    );
    assert!(
        second["data"]["state"].is_string(),
        "duplicate response must carry the current download state"
    );
    assert!(
        second["data"]["targets"].is_array(),
        "duplicate response must carry the targets array"
    );
}

/// I1 — `include_dependencies: true` with `kind=variant` MUST be
/// rejected with 422. Complementary check to T-J2.
#[tokio::test]
async fn t_j3b_invalid_include_dependencies_with_variant_rejected() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let body = serde_json::json!({
        "family_id": "huggingface:x/y",
        "target": { "kind": "variant", "variant_id": "huggingface:x/y@Q4" },
        "include_dependencies": true,
    });
    let (status, json) = call(
        harness.state,
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
    assert_eq!(json["error"]["code"], "invalid_request");
}

/// Complementary: bundle with `include_dependencies: false` is also
/// 422 (data-model.md §5 validation).
#[tokio::test]
async fn t_j3c_bundle_without_include_dependencies_rejected() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let body = serde_json::json!({
        "family_id": "huggingface:x/y",
        "target": { "kind": "bundle" },
        "include_dependencies": false,
    });
    let (status, _json) = call(
        harness.state,
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
}

/// T-J7 — progress monotonicity: the status endpoint never reports a
/// smaller `progress_bytes` than a prior read (SC-007 safety property).
#[tokio::test]
async fn t_j7_progress_is_monotonic_non_decreasing() {
    let results = vec![gguf_result("acme/llama", &[("Q4_K_M", 1)])];
    let harness = harness_with(StubHf::with_results(results)).await;
    let body = variant_body("huggingface:acme/llama", "huggingface:acme/llama@Q4_K_M");
    let (_, created) = call(
        harness.state.clone(),
        "POST",
        "/api/v1/model-store/downloads",
        Some(body),
    )
    .await;
    let job_id = created["data"]["job_id"].as_str().unwrap();

    let uri = format!("/api/v1/model-store/downloads/{job_id}");
    let mut last: i64 = -1;
    for _ in 0..3 {
        let (status, snap) = call(harness.state.clone(), "GET", &uri, None).await;
        assert_eq!(status, StatusCode::OK);
        let p = snap["data"]["progress_bytes"].as_i64().unwrap_or(0);
        assert!(p >= last, "progress regressed from {last} to {p}");
        last = p;
        tokio::time::sleep(Duration::from_millis(50)).await;
    }
}

/// T-J8 — crash-safe rehydration (FR-083). A job persisted mid-stream
/// in `downloading` is flipped to `paused` by
/// `recover_startup_state`. The test inserts a row directly via the
/// JobStore, runs rehydration, and asserts the new state.
#[tokio::test]
async fn t_j8_startup_rehydration_flips_downloading_to_paused() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let params = nexus_models_store::downloads::CreateJobParams::builder(
        nexus_models_store::ids::FamilyId::from("hf:test/model"),
        "huggingface",
        "test/model",
        nexus_models_store::downloads::RequestedKind::Variant,
    )
    .target(nexus_models_store::downloads::JobTargetInput {
        artifact_id: nexus_models_store::ids::ArtifactId::from("hf:test/model#m.gguf"),
        filename: "m.gguf".into(),
        role: nexus_models_store::types::DependencyRole::Primary,
        download_url: "https://invalid.example/m.gguf".into(),
        expected_bytes: Some(1_000_000),
        sha256: None,
    })
    .build();
    let job = harness.job_store.create(params).await.unwrap();
    harness
        .job_store
        .update_state(&job.job_id, DownloadState::Downloading, None)
        .await
        .unwrap();

    harness.orchestrator.recover_startup_state().await.unwrap();

    let reloaded = harness.job_store.get(&job.job_id).await.unwrap().unwrap();
    assert_eq!(reloaded.state, DownloadState::Paused);
    assert!(
        reloaded
            .error_reason
            .as_deref()
            .unwrap_or("")
            .contains("host restart"),
        "error_reason should explain the rehydration"
    );
}
