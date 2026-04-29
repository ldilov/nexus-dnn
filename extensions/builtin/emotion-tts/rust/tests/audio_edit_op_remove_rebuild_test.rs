//! T059 — spec 036 / US4 contract assertion that removing an op from a
//! voice-asset edit chain rebuilds the derived audio with a fresh digest
//! that matches the from-scratch chain digest (SC-007 at the wire layer).
//!
//! Audio-identity (cross-correlation ≥ 0.99) is a worker-level invariant
//! exercised in pytest. Here we assert the contract-level flow: digest
//! arithmetic, two successful applies on the same asset, and an audit log
//! that records the `before → after` digest pair for both transitions.

mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::domain::{
    ChainDigest, DeploymentId, EditChain, EditOp, OperationId, RuntimeLeaseId, VoiceAssetId,
};
use emotion_tts_extension::host_contract::{
    ArtifactPut, BackendRuntimeLease, HostArtifactStore, HostContractError, LeaseError, LeaseState,
    NotificationEnvelope, NotificationStream, SharedLease,
};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::audit_log_repo::TargetKind;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, VoiceAssetRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use futures::stream;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

/// Test stub: no real bytes are persisted; `content_sha256` is a 64-zero
/// placeholder so any future SHA-equality assertion against this store would
/// trivially pass (or fail loudly when zero-hash collides with itself).
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
                    "per_op_durations_ms": [],
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

async fn build_test_router() -> (axum::Router, Repos, DeploymentId, VoiceAssetId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);

    let lease = MockEditLease::new() as SharedLease;
    let factory: Arc<dyn LeaseFactory> = Arc::new(StaticLeaseFactory(lease));
    let provider = Arc::new(LeaseProvider::new(factory));

    let router = build_router(repos.clone(), queue, "0.0.0-test", Some(provider), Some(store));

    let dep = seed_deployment(&repos, "Deployment A").await;
    let asset = seed_voice_asset(&repos, &dep, "alice_voice").await;
    (router, repos, dep, asset)
}

fn trim_op() -> EditOp {
    EditOp::Trim {
        id: OperationId::new(),
        start_ms: 0,
        end_ms: 1_500,
    }
}

fn normalize_op() -> EditOp {
    EditOp::Normalize {
        id: OperationId::new(),
        target_lufs: -16.0,
    }
}

fn speed_op() -> EditOp {
    EditOp::Speed {
        id: OperationId::new(),
        factor: 1.10,
    }
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).expect("response body must be valid JSON");
    (status, body)
}

async fn apply_chain(
    router: &axum::Router,
    asset: &VoiceAssetId,
    dep: &DeploymentId,
    chain: &EditChain,
) -> (StatusCode, Value) {
    let chain_value = serde_json::to_value(chain).unwrap();
    let body = json!({ "chain": chain_value });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/voice-assets/{asset}/edit?deploymentId={dep}",
            asset = asset.as_str(),
            dep = dep.as_str()
        ))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    parse_body(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn removing_op_yields_digest_matching_from_scratch_chain() {
    let trim = trim_op();
    let normalize = normalize_op();
    let speed = speed_op();

    let chain_a = EditChain {
        version: 1,
        ops: vec![trim.clone(), normalize.clone(), speed.clone()],
    };
    let chain_b = EditChain {
        version: 1,
        ops: vec![trim, speed],
    };

    let digest_a = ChainDigest::of(&chain_a);
    let digest_b = ChainDigest::of(&chain_b);

    assert_ne!(
        digest_a.as_str(),
        digest_b.as_str(),
        "removing an op must change the chain digest"
    );
    assert_eq!(
        chain_b.operation_count(),
        chain_a.operation_count() - 1,
        "chain B should have exactly one fewer op than chain A"
    );
}

#[tokio::test]
async fn apply_then_remove_op_persists_rebuilt_chain_with_audit_trail() {
    let (router, repos, dep, asset) = build_test_router().await;

    let trim = trim_op();
    let normalize = normalize_op();
    let speed = speed_op();
    let chain_a = EditChain {
        version: 1,
        ops: vec![trim.clone(), normalize.clone(), speed.clone()],
    };
    let chain_b = EditChain {
        version: 1,
        ops: vec![trim, speed],
    };

    let digest_a = ChainDigest::of(&chain_a);
    let digest_b = ChainDigest::of(&chain_b);

    let (status_a, body_a) = apply_chain(&router, &asset, &dep, &chain_a).await;
    assert_eq!(status_a, StatusCode::OK, "first apply must 200; body={body_a}");
    assert_eq!(
        body_a["chain_digest"].as_str().unwrap(),
        digest_a.as_str(),
        "first apply should report digest_a"
    );

    let (status_b, body_b) = apply_chain(&router, &asset, &dep, &chain_b).await;
    assert_eq!(
        status_b,
        StatusCode::OK,
        "rebuild after op removal must 200; body={body_b}"
    );
    assert_eq!(
        body_b["chain_digest"].as_str().unwrap(),
        digest_b.as_str(),
        "rebuild apply should report digest_b == ChainDigest::of(&chain_b)"
    );

    let entries = repos
        .audio_edit_log
        .list_for_target(&dep, TargetKind::VoiceAsset, asset.as_str(), 10)
        .await
        .expect("list audit entries");
    assert_eq!(
        entries.len(),
        2,
        "two applies must record exactly two audit entries"
    );

    let newest = &entries[0];
    let oldest = &entries[1];

    assert_eq!(newest.digest_before.as_str(), digest_a.as_str());
    assert_eq!(newest.digest_after.as_str(), digest_b.as_str());
    assert_eq!(newest.operation_count, chain_b.operation_count());

    assert_eq!(oldest.digest_before.as_str(), ChainDigest::EMPTY.as_str());
    assert_eq!(oldest.digest_after.as_str(), digest_a.as_str());
    assert_eq!(oldest.operation_count, chain_a.operation_count());
}
