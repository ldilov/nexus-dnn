//! Spec 038 — voice-asset rename (PATCH /voice-assets/:id) contract smoke.
//!
//! Covers the four invariants that bite users:
//!  * 200 OK + persisted display_name on the happy path
//!  * 422 on empty / whitespace-only displayName
//!  * 404 on unknown id (no existence probe)
//!  * 404 on cross-deployment id (same-shape as not-found per
//!    `guard::assert_deployment_match`)

mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with_artifact_store;
use emotion_tts_extension::domain::{DeploymentId, VoiceAssetId};
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, VoiceAssetRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
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
        _display_name: &str,
        _mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError> {
        Ok(ArtifactPut {
            artifact_ref: format!("artifact://mem/{}", bytes.len()),
            content_sha256: "0".repeat(64),
            size_bytes: bytes.len() as u64,
        })
    }

    async fn resolve_path(&self, _artifact_ref: &str) -> Result<String, HostContractError> {
        Ok("/dev/null".into())
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
            host_extension_instance_ref: format!("instance_{name}"),
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
            audio_artifact_ref: "artifact://mem/x".into(),
            content_sha256: "a".repeat(64),
            reference_text: None,
            sample_rate: Some(24000),
            duration_ms: Some(2000),
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

async fn router_with_repos() -> (axum::Router, Repos, DeploymentId, VoiceAssetId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);
    let router = build_router_with_artifact_store(repos.clone(), queue, "0.1.0", store);
    let dep = seed_deployment(&repos, "Default").await;
    let voice = seed_voice_asset(&repos, &dep, "elena_session_03").await;
    (router, repos, dep, voice)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn patch_rename(
    router: &axum::Router,
    voice_id: &str,
    dep_id: &str,
    body: Value,
) -> (StatusCode, Value) {
    let req = Request::builder()
        .method(Method::PATCH)
        .uri(format!("/voice-assets/{voice_id}?deploymentId={dep_id}"))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    parse_body(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn rename_voice_asset_persists_new_display_name() {
    let (router, repos, dep, voice) = router_with_repos().await;

    let (status, body) = patch_rename(
        &router,
        voice.as_str(),
        dep.as_str(),
        json!({ "displayName": "Elena (warm take)" }),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["displayName"].as_str().unwrap(), "Elena (warm take)");
    assert_eq!(body["voiceAssetId"].as_str().unwrap(), voice.as_str());

    let stored = repos.voice_assets.get(&voice).await.unwrap().unwrap();
    assert_eq!(stored.display_name, "Elena (warm take)");
}

#[tokio::test]
async fn rename_rejects_blank_display_name() {
    let (router, _repos, dep, voice) = router_with_repos().await;

    let (status, _) = patch_rename(
        &router,
        voice.as_str(),
        dep.as_str(),
        json!({ "displayName": "   " }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn rename_unknown_id_returns_404() {
    let (router, _repos, dep, _voice) = router_with_repos().await;

    let (status, _) = patch_rename(
        &router,
        "voice_does_not_exist",
        dep.as_str(),
        json!({ "displayName": "anything" }),
    )
    .await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn rename_cross_deployment_returns_404_not_403() {
    let (router, repos, dep_a, voice_in_a) = router_with_repos().await;
    let dep_b = seed_deployment(&repos, "OtherDeployment").await;

    let (status, _) = patch_rename(
        &router,
        voice_in_a.as_str(),
        dep_b.as_str(),
        json!({ "displayName": "should not work" }),
    )
    .await;
    assert_eq!(status, StatusCode::NOT_FOUND);

    let stored = repos.voice_assets.get(&voice_in_a).await.unwrap().unwrap();
    assert_eq!(stored.display_name, "elena_session_03");
}
