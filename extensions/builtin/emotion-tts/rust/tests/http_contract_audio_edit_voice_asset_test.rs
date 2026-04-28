//! T021 — spec 036 / US1 contract smoke for the three voice-asset audio-edit
//! routes (`POST /edit`, `DELETE /edit`, `POST /edit/preview`).
//!
//! Covers:
//!   * happy-path apply → 200 with `chain_digest` + `derived_artifact_ref`
//!   * cross-deployment apply → 404 (FR-016 / SC-008, never 403)
//!   * happy-path clear → 204
//!   * cross-deployment clear → 404
//!   * happy-path preview → 200 with audio bytes (audio/wav)
//!   * cross-deployment preview → 404
//!
//! Uses a `ChannelLease`-style mock that intercepts `audio.edit` +
//! `audio.edit.preview` and returns canned JSON / writes a tiny WAV-shaped
//! file to the temp path it returns.

mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::domain::{DeploymentId, RuntimeLeaseId, VoiceAssetId};
use emotion_tts_extension::host_contract::{
    ArtifactPut, BackendRuntimeLease, HostArtifactStore, HostContractError, LeaseError, LeaseState,
    NotificationEnvelope, NotificationStream, SharedLease,
};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, VoiceAssetRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use futures::stream;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

const PREVIEW_BYTES: &[u8] = b"RIFF\x00\x00\x00\x00WAVEfmt mock-preview-bytes";

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
                tokio::fs::write(&output_path, b"derived-audio-bytes")
                    .await
                    .map_err(|e| LeaseError::Transport(format!("write derived: {e}")))?;
                Ok(json!({
                    "chain_digest": "0".repeat(64),
                    "source_duration_ms": 2_000,
                    "derived_duration_ms": 1_800,
                    "measured_lufs": null,
                    "per_op_durations_ms": [
                        { "op_id": "abc", "duration_ms": 12.5 }
                    ],
                    "warnings": [],
                }))
            }
            "audio.edit.preview" => {
                let tmp = std::env::temp_dir()
                    .join(format!("emotion_tts_audio_edit_preview_{}.wav", uuid_like()));
                tokio::fs::write(&tmp, PREVIEW_BYTES)
                    .await
                    .map_err(|e| LeaseError::Transport(format!("write preview: {e}")))?;
                Ok(json!({
                    "temp_path_abs": tmp.to_string_lossy(),
                    "format": "wav",
                    "byte_size": PREVIEW_BYTES.len(),
                    "derived_duration_ms": 1_800,
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

fn uuid_like() -> String {
    use std::sync::atomic::{AtomicU64, Ordering};
    static COUNTER: AtomicU64 = AtomicU64::new(1);
    let n = COUNTER.fetch_add(1, Ordering::Relaxed);
    format!("{n}-{}", std::process::id())
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

async fn seed_voice_asset(repos: &Repos, dep: &DeploymentId, name: &str) -> VoiceAssetId {
    let id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: id.clone(),
            deployment_id: dep.clone(),
            display_name: name.into(),
            kind: "speaker".into(),
            audio_artifact_ref: format!("artifact://mem/source/{name}"),
            content_sha256: "a".repeat(64),
            reference_text: None,
            sample_rate: Some(24_000),
            duration_ms: Some(2_000),
            source_type: "upload".into(),
            notes: None,
            is_active: true,
            preprocessed_artifact_ref: None,
            preprocessing_report_json: None,
            edit_chain_json: None,
            derived_artifact_ref: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn build_test_router() -> (axum::Router, Repos, DeploymentId, DeploymentId, VoiceAssetId) {
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
    let asset = seed_voice_asset(&repos, &dep_a, "alice_voice").await;
    (router, repos, dep_a, dep_b, asset)
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

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

#[tokio::test]
async fn apply_edit_chain_to_voice_asset_returns_200() {
    let (router, _repos, dep_a, _dep_b, asset) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_500) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_a.as_str()
        ))
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
    assert_eq!(body["source_duration_ms"], json!(2_000));
    assert_eq!(body["derived_duration_ms"], json!(1_800));
}

#[tokio::test]
async fn apply_edit_chain_cross_deployment_returns_404_not_403() {
    let (router, _repos, _dep_a, dep_b, asset) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_500) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_b.as_str()
        ))
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
async fn clear_edit_chain_returns_204() {
    let (router, _repos, dep_a, _dep_b, asset) = build_test_router().await;

    // First apply something so there's a chain to clear.
    let apply = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_a.as_str()
        ))
        .header("content-type", "application/json")
        .body(Body::from(
            serde_json::to_vec(&json!({ "chain": sample_chain(0, 1_500) })).unwrap(),
        ))
        .unwrap();
    let resp = router.clone().oneshot(apply).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let req = Request::builder()
        .method(Method::DELETE)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_a.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);
}

#[tokio::test]
async fn clear_edit_chain_cross_deployment_returns_404() {
    let (router, _repos, _dep_a, dep_b, asset) = build_test_router().await;
    let req = Request::builder()
        .method(Method::DELETE)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_b.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn preview_edit_chain_streams_audio_bytes() {
    let (router, _repos, dep_a, _dep_b, asset) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_500) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit/preview?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_a.as_str()
        ))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let ct = resp
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_string();
    assert!(
        ct == "audio/wav" || ct == "audio/mpeg",
        "content-type must be audio/wav or audio/mpeg, got {ct:?}"
    );
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    assert!(!bytes.is_empty(), "preview must stream non-empty audio bytes");
    assert_eq!(bytes.as_ref(), PREVIEW_BYTES);
}

#[tokio::test]
async fn preview_edit_chain_cross_deployment_returns_404() {
    let (router, _repos, _dep_a, dep_b, asset) = build_test_router().await;
    let body = json!({ "chain": sample_chain(0, 1_500) });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit/preview?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep_b.as_str()
        ))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}
