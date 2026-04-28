//! Regression tests for the cross-deployment data-bleed audit fix.
//!
//! Three sibling routers (`voice_assets`, `mappings`, `presets`) all expose
//! shared-id endpoints that previously returned, mutated, or destroyed rows
//! using only the path id — without verifying the row's `deployment_id`
//! matched the caller's claim. The fix adds a required `?deploymentId=...`
//! query parameter and returns 404 (NOT 403) on mismatch so existence is
//! not leaked across deployments.
//!
//! This file pins that contract: one regression per router covering one
//! unsafe verb. The matrix is intentionally narrow — the goal is to keep
//! the bleed closed, not to re-test happy-path CRUD.

mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with_artifact_store;
use emotion_tts_extension::domain::{DeploymentId, MappingId, PresetId, VoiceAssetId};
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::{
    CharacterMappingRow, DeploymentRow, VectorPresetRow, VoiceAssetRow,
};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use serde_json::Value;
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

async fn router_with_two_deployments() -> (axum::Router, Repos, DeploymentId, DeploymentId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);
    let router = build_router_with_artifact_store(repos.clone(), queue, "0.1.0", store);
    let dep_a = seed_deployment(&repos, "Deployment A").await;
    let dep_b = seed_deployment(&repos, "Deployment B").await;
    (router, repos, dep_a, dep_b)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

// -------------------------------------------------------------------------
// voice_assets — GET cross-deployment must 404, never 200.
// -------------------------------------------------------------------------

#[tokio::test]
async fn voice_asset_get_cross_deployment_returns_404() {
    let (router, repos, dep_a, dep_b) = router_with_two_deployments().await;

    let asset_id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: asset_id.clone(),
            deployment_id: dep_b.clone(),
            display_name: "secret_voice".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "artifact://mem/secret".into(),
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

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!(
                    "/voice-assets/{}?deploymentId={}",
                    asset_id.as_str(),
                    dep_a.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "cross-deployment GET must 404 (no row leakage), got {body:?}"
    );

    // Sanity: legitimate fetch with the owning deployment still works.
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!(
                    "/voice-assets/{}?deploymentId={}",
                    asset_id.as_str(),
                    dep_b.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
}

// -------------------------------------------------------------------------
// mappings — DELETE cross-deployment must 404 and leave the row intact.
// -------------------------------------------------------------------------

#[tokio::test]
async fn mapping_delete_cross_deployment_returns_404_and_does_not_mutate() {
    let (router, repos, dep_a, dep_b) = router_with_two_deployments().await;

    // Voice asset under deployment B (not strictly required for the bleed,
    // but the mapping's foreign reference must point somewhere valid).
    let voice_id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: voice_id.clone(),
            deployment_id: dep_b.clone(),
            display_name: "v".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "artifact://mem/v".into(),
            content_sha256: "a".repeat(64),
            reference_text: None,
            sample_rate: Some(24000),
            duration_ms: Some(1000),
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

    let mapping_id = MappingId::new();
    repos
        .mappings
        .insert(&CharacterMappingRow {
            mapping_id: mapping_id.clone(),
            deployment_id: dep_b.clone(),
            character_name: "Bob".into(),
            character_name_lower: "bob".into(),
            speaker_voice_asset_id: voice_id,
            default_emotion_mode: "none".into(),
            default_emotion_voice_asset_id: None,
            default_vector_preset_id: None,
            default_qwen_template: None,
            default_speed_factor: None,
            default_generation_overrides_json: "{}".into(),
            is_active: true,
            notes: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(format!(
                    "/mappings/{}?deploymentId={}",
                    mapping_id.as_str(),
                    dep_a.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "cross-deployment DELETE must 404"
    );

    // Confirm the row is still intact and active.
    let row = repos
        .mappings
        .get(&mapping_id)
        .await
        .unwrap()
        .expect("row must survive cross-deployment delete attempt");
    assert!(row.is_active, "cross-deployment DELETE must NOT deactivate");
}

// -------------------------------------------------------------------------
// presets — PATCH cross-deployment must 404 and leave the row intact.
// -------------------------------------------------------------------------

#[tokio::test]
async fn preset_patch_cross_deployment_returns_404_and_does_not_mutate() {
    let (router, repos, dep_a, dep_b) = router_with_two_deployments().await;

    let preset_id = PresetId::new();
    let now = Utc::now().timestamp();
    let original_vector = serde_json::to_string(&[0.1f64; 8]).unwrap();
    repos
        .presets
        .insert(&VectorPresetRow {
            preset_id: preset_id.clone(),
            deployment_id: dep_b.clone(),
            preset_name: "Joyful".into(),
            vector_json: original_vector.clone(),
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();

    let patch = serde_json::json!({
        "presetName": "Hijacked",
        "vector": [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!(
                    "/presets/{}?deploymentId={}",
                    preset_id.as_str(),
                    dep_a.as_str()
                ))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&patch).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "cross-deployment PATCH must 404"
    );

    // Confirm the row's name and vector are untouched.
    let row = repos
        .presets
        .get(&preset_id)
        .await
        .unwrap()
        .expect("row must survive cross-deployment patch attempt");
    assert_eq!(
        row.preset_name, "Joyful",
        "cross-deployment PATCH must NOT rename"
    );
    assert_eq!(
        row.vector_json, original_vector,
        "cross-deployment PATCH must NOT replace vector"
    );
}
