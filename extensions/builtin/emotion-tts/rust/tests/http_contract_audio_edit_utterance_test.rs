//! T040 — spec 036 / US2 contract smoke for the per-utterance audio-edit route
//! `POST /deployments/{deployment_id}/runs/{run_id}/utterances/{utterance_id}/edit`.
//!
//! Covers:
//!   * happy-path apply → 200 with `chain_digest` + `derived_artifact_ref`
//!   * cross-deployment apply → 404 (FR-016 / SC-008, never 403)
//!   * stale digest → 409 with the contract `{ error: { code: "stale_digest", ..., current_digest } }` body
//!   * unknown utterance → 404
//!
//! Reuses the `MockEditLease` shape from `http_contract_audio_edit_voice_asset_test.rs`
//! (intentional duplication — three near-identical lines is cheaper than premature
//! abstraction per CLAUDE.md guidance).

mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::domain::{DeploymentId, RunId, RuntimeLeaseId, UtteranceId};
use emotion_tts_extension::host_contract::{
    ArtifactPut, BackendRuntimeLease, HostArtifactStore, HostContractError, LeaseError, LeaseState,
    NotificationEnvelope, NotificationStream, SharedLease,
};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, RunRow, UtteranceRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use futures::stream;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

struct MemoryArtifactStore;

#[async_trait]
impl HostArtifactStore for MemoryArtifactStore {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        _mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError> {
        Ok(ArtifactPut {
            artifact_ref: format!("artifact://mem/{display_name}/{}", bytes.len()),
            content_sha256: "0".repeat(64),
            size_bytes: bytes.len() as u64,
        })
    }

    async fn resolve_path(&self, _artifact_ref: &str) -> Result<String, HostContractError> {
        Ok("/dev/null".into())
    }
}

struct MockEditLease {
    id: RuntimeLeaseId,
}

impl MockEditLease {
    fn new() -> Arc<Self> {
        Arc::new(Self {
            id: RuntimeLeaseId::new(),
        })
    }
}

#[async_trait]
impl BackendRuntimeLease for MockEditLease {
    fn id(&self) -> RuntimeLeaseId {
        self.id.clone()
    }

    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }

    async fn send_rpc(&self, method: &str, params: Value) -> Result<Value, LeaseError> {
        match method {
            "audio.edit" => {
                let output_path = params
                    .get("output_artifact_abs")
                    .and_then(Value::as_str)
                    .ok_or_else(|| LeaseError::Rpc {
                        code: -32602,
                        message: "missing output_artifact_abs".into(),
                    })?
                    .to_string();
                tokio::fs::write(&output_path, b"derived-segment-bytes")
                    .await
                    .map_err(|e| LeaseError::Transport(format!("write derived: {e}")))?;
                Ok(json!({
                    "chain_digest": "0".repeat(64),
                    "source_duration_ms": 1_500,
                    "derived_duration_ms": 1_400,
                    "measured_lufs": null,
                    "per_op_durations_ms": [
                        { "op_id": "abc", "duration_ms": 8.5 }
                    ],
                    "warnings": [],
                }))
            }
            "handshake" => Ok(json!({
                "protocol_version": "1.0",
                "worker_version": "0.0.0-test",
                "model_family_id": "indextts-2",
            })),
            other => Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {other}"),
            }),
        }
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        Box::pin(stream::iter(Vec::<NotificationEnvelope>::new()))
    }

    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

struct StaticLeaseFactory(SharedLease);

#[async_trait]
impl LeaseFactory for StaticLeaseFactory {
    async fn acquire(&self) -> emotion_tts_extension::domain::Result<SharedLease> {
        Ok(self.0.clone())
    }
}

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

async fn seed_deployment(repos: &Repos, name: &str) -> DeploymentId {
    let id = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: id.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: name.into(),
            backend_runtime_preference: Some("indextts.python".into()),
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
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn seed_run(repos: &Repos, dep: &DeploymentId) -> RunId {
    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "completed".into(),
            script_snapshot: "Narrator: hi".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "wav".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "fixed".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.0.0-test".into(),
            queued_at: now,
            started_at: Some(now),
            finished_at: Some(now),
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
        })
        .await
        .unwrap();
    run_id
}

async fn seed_utterance(repos: &Repos, run_id: &RunId) -> UtteranceId {
    let utt_id = UtteranceId::new();
    repos
        .utterances
        .insert_many(&[UtteranceRow {
            utterance_id: utt_id.clone(),
            run_id: run_id.clone(),
            global_index: 1,
            character_display: "Narrator".into(),
            character_sanitised: "Narrator".into(),
            character_index: 1,
            text: "hi".into(),
            source_line_number: 1,
            inline_overrides_json: "{}".into(),
            legacy_emotion_ref: None,
            resolved_mapping_id: None,
            resolved_speaker_voice_asset_id: None,
            resolved_emotion_mode: Some("none".into()),
            resolved_emotion_payload_json: None,
            resolved_seed: None,
            resolved_generation_json: None,
            content_hash: None,
            status: "completed".into(),
            source_run_id: None,
            audio_artifact_ref: Some("artifact://mem/source/seg1.wav".into()),
            cache_hit: false,
            duration_ms: Some(1_500),
            started_at: None,
            finished_at: None,
            failure_category: None,
            failure_detail: None,
            edit_chain_json: None,
            derived_artifact_ref: None,
            updated_at: None,
        }])
        .await
        .unwrap();
    utt_id
}

async fn build_test_router() -> (
    axum::Router,
    Repos,
    DeploymentId,
    DeploymentId,
    RunId,
    UtteranceId,
) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);

    let lease = MockEditLease::new() as SharedLease;
    let factory: Arc<dyn LeaseFactory> = Arc::new(StaticLeaseFactory(lease));
    let provider = Arc::new(LeaseProvider::new(factory));

    let router = build_router(repos.clone(), queue, "0.0.0-test", Some(provider), Some(store));

    let dep_a = seed_deployment(&repos, "Deployment A").await;
    let dep_b = seed_deployment(&repos, "Deployment B").await;
    let run = seed_run(&repos, &dep_a).await;
    let utt = seed_utterance(&repos, &run).await;
    (router, repos, dep_a, dep_b, run, utt)
}

fn sample_chain(start_ms: u32, end_ms: u32) -> Value {
    json!({
        "version": 1,
        "ops": [
            {
                "id": "abcdefghijklmnopqrstuvwxyz0123",
                "mode": "trim",
                "start_ms": start_ms,
                "end_ms": end_ms,
            }
        ],
    })
}

fn edit_path(dep: &DeploymentId, run: &RunId, utt: &UtteranceId) -> String {
    format!(
        "/deployments/{dep}/runs/{run}/utterances/{utt}/edit",
        dep = dep.as_str(),
        run = run.as_str(),
        utt = utt.as_str()
    )
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

#[tokio::test]
async fn apply_edit_chain_to_utterance_returns_200() {
    let (router, _repos, dep_a, _dep_b, run, utt) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_200) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(edit_path(&dep_a, &run, &utt))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert!(body["chain_digest"].as_str().is_some(), "missing chain_digest");
    assert!(
        body["derived_artifact_ref"].as_str().is_some(),
        "missing derived_artifact_ref"
    );
    assert_eq!(body["source_duration_ms"], json!(1_500));
    assert_eq!(body["derived_duration_ms"], json!(1_400));
}

#[tokio::test]
async fn apply_edit_chain_cross_deployment_returns_404_not_403() {
    let (router, _repos, _dep_a, dep_b, run, utt) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_200) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(edit_path(&dep_b, &run, &utt))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(
        resp.status(),
        StatusCode::NOT_FOUND,
        "cross-deployment apply must 404 (never 403) — FR-016 / SC-008"
    );
}

#[tokio::test]
async fn apply_edit_chain_stale_digest_returns_409_with_current_digest() {
    let (router, _repos, dep_a, _dep_b, run, utt) = build_test_router().await;
    let body = json!({
        "chain": sample_chain(0, 1_200),
        "digest_before": "deadbeef".repeat(8),
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri(edit_path(&dep_a, &run, &utt))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CONFLICT, "body: {body}");
    assert_eq!(body["error"]["code"], "stale_digest");
    let current = body["error"]["current_digest"]
        .as_str()
        .expect("current_digest must be present");
    assert_eq!(current.len(), 64, "current_digest must be a 64-char hex");
}

#[tokio::test]
async fn apply_edit_chain_unknown_utterance_returns_404() {
    let (router, _repos, dep_a, _dep_b, run, _utt) = build_test_router().await;
    let bogus = UtteranceId::new();
    let body = json!({ "chain": sample_chain(0, 1_200) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(edit_path(&dep_a, &run, &bogus))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}
