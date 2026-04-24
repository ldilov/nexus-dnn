//! Contract test for POST /voice-assets/:id/preprocess (spec 034 T039).
//!
//! Drives the real Axum router against an in-memory SQLite pool + mock lease
//! factory + mock host artifact store. The mock lease's `voice.preprocess`
//! handler writes deterministic bytes to the requested output path so the
//! handler's "read output, upload, persist" choreography is fully exercised.

mod fixtures;

use std::collections::HashMap;
use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::domain::{DeploymentId, Result as DomainResult, VoiceAssetId};
use emotion_tts_extension::host_contract::{
    ArtifactPut, HostArtifactStore, HostContractError, SharedLease,
};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, VoiceAssetRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tokio::sync::Mutex;
use tower::ServiceExt;

use fixtures::mock_backend::MockBackendRuntimeLease;

// ---------------------------------------------------------------------------
// Mock HostArtifactStore — bytes in a map keyed by ref, resolvable to an
// on-disk temp file so the handler's "read preprocessed bytes from an abs
// path" call succeeds.
// ---------------------------------------------------------------------------

#[derive(Default)]
struct InMemoryArtifactStore {
    store: Mutex<HashMap<String, String>>, // ref -> abs path
    counter: Mutex<u64>,
}

#[async_trait]
impl HostArtifactStore for InMemoryArtifactStore {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        _mime_hint: Option<&str>,
    ) -> std::result::Result<ArtifactPut, HostContractError> {
        let mut counter = self.counter.lock().await;
        *counter += 1;
        let id = *counter;
        drop(counter);

        let tmp_dir = std::env::temp_dir();
        let file = tmp_dir.join(format!("mock_artifact_{}_{}.bin", id, display_name));
        tokio::fs::write(&file, &bytes)
            .await
            .map_err(|e| HostContractError::Artifact(format!("write: {e}")))?;

        let artifact_ref = format!("artifact://mock/{id}");
        self.store
            .lock()
            .await
            .insert(artifact_ref.clone(), file.to_string_lossy().to_string());

        let mut hasher = Sha256::new();
        hasher.update(&bytes);
        Ok(ArtifactPut {
            artifact_ref,
            content_sha256: hex::encode(hasher.finalize()),
            size_bytes: bytes.len() as u64,
        })
    }

    async fn resolve_path(
        &self,
        artifact_ref: &str,
    ) -> std::result::Result<String, HostContractError> {
        self.store
            .lock()
            .await
            .get(artifact_ref)
            .cloned()
            .ok_or_else(|| HostContractError::Artifact(format!("unknown ref {artifact_ref}")))
    }
}

// ---------------------------------------------------------------------------
// Mock LeaseFactory wrapping the MockBackendRuntimeLease fixture.
// ---------------------------------------------------------------------------

struct MockLeaseFactory {
    lease: Arc<MockBackendRuntimeLease>,
}

#[async_trait]
impl LeaseFactory for MockLeaseFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        Ok(self.lease.clone() as SharedLease)
    }
}

// ---------------------------------------------------------------------------
// Fixture builders
// ---------------------------------------------------------------------------

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {}", m.name, e));
    }
    pool
}

async fn seed_deployment(repos: &Repos) -> DeploymentId {
    let id = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: id.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: "Preproc Test".into(),
            backend_runtime_preference: None,
            default_output_format: "mp3".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: true,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn seed_voice_asset(
    repos: &Repos,
    store: &Arc<InMemoryArtifactStore>,
    dep: &DeploymentId,
) -> VoiceAssetId {
    let put = store
        .store(vec![1, 2, 3, 4, 5], "original.wav", Some("audio/wav"))
        .await
        .unwrap();
    let id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: id.clone(),
            deployment_id: dep.clone(),
            display_name: "bob_voice".into(),
            kind: "speaker".into(),
            audio_artifact_ref: put.artifact_ref,
            content_sha256: put.content_sha256,
            reference_text: None,
            sample_rate: Some(48_000),
            duration_ms: Some(42_000),
            source_type: "upload".into(),
            notes: None,
            is_active: true,
            preprocessed_artifact_ref: None,
            preprocessing_report_json: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

fn successful_preprocess_handler() -> MockBackendRuntimeLease {
    let mut lease = MockBackendRuntimeLease::new();
    lease.set_handler("voice.preprocess", move |params: Value| {
        let output_abs = params
            .get("output_artifact_abs")
            .and_then(|v| v.as_str())
            .unwrap_or("");
        if !output_abs.is_empty() {
            std::fs::write(output_abs, b"PROCESSED_WAV_BYTES").ok();
        }
        Ok(json!({
            "succeeded": true,
            "report": {
                "pipeline_version": "1",
                "stages": [
                    { "stage": "decode",     "status": "ok", "duration_ms": 8,
                      "input_sample_rate": 48000, "output_sample_rate": 24000 },
                    { "stage": "mono",       "status": "ok", "duration_ms": 1 },
                    { "stage": "denoise",    "status": "skipped", "reason": "rnnoise import failed" },
                    { "stage": "vad_trim",   "status": "ok", "duration_ms": 40,
                      "engine": "silero_vad" },
                    { "stage": "loudness",   "status": "ok", "duration_ms": 20,
                      "lufs_before": -35.2, "lufs_after": -25.0 },
                    { "stage": "peak_limit", "status": "ok", "duration_ms": 3 },
                    { "stage": "truncate",   "status": "ok", "duration_ms": 1,
                      "duration_before_ms": 42000, "duration_after_ms": 15000,
                      "selection": "highest_activity_window" }
                ],
                "succeeded": true,
                "warnings": ["denoise: rnnoise import failed"]
            }
        }))
    });
    lease
}

async fn build_test_router(
    repos: Repos,
    store: Arc<InMemoryArtifactStore>,
    lease: MockBackendRuntimeLease,
) -> axum::Router {
    let factory = Arc::new(MockLeaseFactory { lease: Arc::new(lease) });
    let provider = Arc::new(LeaseProvider::new(factory));
    let queue = Arc::new(RuntimeQueue::new());
    build_router(repos, queue, "0.2.0", Some(provider), Some(store))
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[tokio::test]
async fn post_preprocess_returns_202_with_report_on_first_run() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(InMemoryArtifactStore::default());
    let dep = seed_deployment(&repos).await;
    let asset = seed_voice_asset(&repos, &store, &dep).await;

    let router = build_test_router(repos.clone(), store, successful_preprocess_handler()).await;

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/voice-assets/{}/preprocess", asset))
                .header("content-type", "application/json")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::ACCEPTED);
    let body_bytes = to_bytes(response.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(body["status"], "reprocessed");
    assert_eq!(body["report"]["pipeline_version"], "1");
    assert_eq!(body["report"]["stages"][0]["stage"], "decode");
    assert_eq!(body["report"]["stages"][2]["status"], "skipped");
    assert_eq!(body["report"]["stages"][2]["reason"], "rnnoise import failed");
    assert_eq!(body["report"]["warnings"][0], "denoise: rnnoise import failed");

    // Post-condition: the asset row now carries the preprocessed ref + report.
    let row = repos.voice_assets.get(&asset).await.unwrap().unwrap();
    assert!(row.preprocessed_artifact_ref.is_some());
    let report_json = row.preprocessing_report_json.as_ref().unwrap();
    assert!(report_json.contains("\"pipeline_version\":\"1\""));
    assert!(report_json.contains("silero_vad"));
}

#[tokio::test]
async fn post_preprocess_returns_200_unchanged_on_second_call() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(InMemoryArtifactStore::default());
    let dep = seed_deployment(&repos).await;
    let asset = seed_voice_asset(&repos, &store, &dep).await;

    let router1 = build_test_router(repos.clone(), store.clone(), successful_preprocess_handler()).await;
    let first = router1
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/voice-assets/{}/preprocess", asset))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(first.status(), StatusCode::ACCEPTED);

    // Second call — should return 200 + status=unchanged without hitting the
    // worker again. A handler that returns an error would prove the worker is
    // not reached; but the simplest way is a new router whose lease handler is
    // guaranteed to panic if called.
    let mut panic_lease = MockBackendRuntimeLease::new();
    panic_lease.set_handler("voice.preprocess", |_| {
        panic!("second call must NOT invoke worker — idempotence broken")
    });
    let router2 = build_test_router(repos.clone(), store, panic_lease).await;
    let second = router2
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/voice-assets/{}/preprocess", asset))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(second.status(), StatusCode::OK);
    let body_bytes = to_bytes(second.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(body["status"], "unchanged");
    assert_eq!(body["report"]["pipeline_version"], "1");
}

#[tokio::test]
async fn post_preprocess_missing_asset_returns_404() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(InMemoryArtifactStore::default());
    let router = build_test_router(repos, store, successful_preprocess_handler()).await;

    let fake_id = VoiceAssetId::new();
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/voice-assets/{}/preprocess", fake_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn post_preprocess_maps_rpc_input_rejected_to_400() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(InMemoryArtifactStore::default());
    let dep = seed_deployment(&repos).await;
    let asset = seed_voice_asset(&repos, &store, &dep).await;

    let mut lease = MockBackendRuntimeLease::new();
    lease.set_handler("voice.preprocess", |_| {
        Err(emotion_tts_extension::host_contract::LeaseError::Rpc {
            code: -32010,
            message: "decode_failed".into(),
        })
    });

    let router = build_test_router(repos, store, lease).await;
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/voice-assets/{}/preprocess", asset))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    // -32010 maps to Validation in rpc::lease_error_to_domain, which surfaces
    // as 400 from EmotionTtsError::into_response (status_code matrix in
    // domain/errors.rs).
    assert_eq!(response.status(), StatusCode::BAD_REQUEST);
}
