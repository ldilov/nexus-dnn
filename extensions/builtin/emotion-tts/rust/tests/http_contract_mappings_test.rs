//! T091 — mappings contract smoke.
//!
//! Only the invariants that will bite users in production:
//! FR-071 case-insensitive uniqueness, CRUD round-trip, duplicate across
//! deployments, and import conflictStrategy=skip.

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
            host_extension_instance_ref: "instance_01".into(),
            display_name: name.into(),
            backend_runtime_preference: Some("indextts.python".into()),
            default_output_format: "mp3".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn seed_voice_asset(repos: &Repos, dep: &DeploymentId) -> VoiceAssetId {
    let id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: id.clone(),
            deployment_id: dep.clone(),
            display_name: "bob_voice".into(),
            kind: "speaker".into(),
            audio_artifact_ref: "artifact://mem/x".into(),
            content_sha256: "a".repeat(64),
            reference_text: None,
            sample_rate: Some(24000),
            duration_ms: Some(2000),
            source_type: "upload".into(),
            notes: None,
            is_active: true,
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
    let dep = seed_deployment(&repos, "Test Deployment").await;
    let voice = seed_voice_asset(&repos, &dep).await;
    (router, repos, dep, voice)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn post_mapping(
    router: &axum::Router,
    dep_id: &str,
    voice_id: &str,
    name: &str,
) -> (StatusCode, Value) {
    let body = json!({
        "deploymentId": dep_id,
        "characterName": name,
        "speakerVoiceAssetId": voice_id,
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri("/mappings")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.clone().oneshot(req).await.unwrap();
    parse_body(resp).await
}

#[tokio::test]
async fn create_mapping_then_list_and_get() {
    let (router, _repos, dep, voice) = router_with_repos().await;

    let (status, body) = post_mapping(&router, dep.as_str(), voice.as_str(), "Bob").await;
    assert_eq!(status, StatusCode::CREATED);
    let mapping_id = body["mappingId"].as_str().unwrap().to_string();

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/mappings?deploymentId={}", dep.as_str()))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    let mappings = body["mappings"].as_array().unwrap();
    assert_eq!(mappings.len(), 1);
    assert_eq!(mappings[0]["characterName"].as_str().unwrap(), "Bob");

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/mappings/{mapping_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["mappingId"].as_str().unwrap(), mapping_id);
}

#[tokio::test]
async fn case_insensitive_uniqueness_blocks_collision() {
    let (router, _repos, dep, voice) = router_with_repos().await;

    let (status, _) = post_mapping(&router, dep.as_str(), voice.as_str(), "Bob").await;
    assert_eq!(status, StatusCode::CREATED);

    let (status, body) = post_mapping(&router, dep.as_str(), voice.as_str(), "BOB").await;
    assert_eq!(status, StatusCode::CONFLICT);
    assert!(body["message"].as_str().unwrap().contains("already exists"));

    let (status, _) = post_mapping(&router, dep.as_str(), voice.as_str(), "bob").await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn patch_mapping_respects_uniqueness_on_rename() {
    let (router, _repos, dep, voice) = router_with_repos().await;
    let (_, body1) = post_mapping(&router, dep.as_str(), voice.as_str(), "Bob").await;
    let (_, body2) = post_mapping(&router, dep.as_str(), voice.as_str(), "Alice").await;

    let alice_id = body2["mappingId"].as_str().unwrap();
    let _ = body1;

    let patch_body = json!({ "characterName": "BOB" });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/mappings/{alice_id}"))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&patch_body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn duplicate_into_other_deployment_works() {
    let (router, repos, dep_src, voice) = router_with_repos().await;
    let dep_dst = seed_deployment(&repos, "Audiobook Project").await;

    let (_, body) = post_mapping(&router, dep_src.as_str(), voice.as_str(), "Bob").await;
    let mapping_id = body["mappingId"].as_str().unwrap();

    let dup_body = json!({ "targetDeploymentId": dep_dst.as_str() });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/mappings/{mapping_id}/duplicate"))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&dup_body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CREATED);
    assert_eq!(body["deploymentId"].as_str().unwrap(), dep_dst.as_str());
    assert_eq!(body["characterName"].as_str().unwrap(), "Bob");
    assert_ne!(body["mappingId"].as_str().unwrap(), mapping_id);
}

#[tokio::test]
async fn import_skip_strategy_preserves_existing() {
    let (router, _repos, dep, voice) = router_with_repos().await;
    let (_, _) = post_mapping(&router, dep.as_str(), voice.as_str(), "Bob").await;

    let import_body = json!({
        "targetDeploymentId": dep.as_str(),
        "conflictStrategy": "skip",
        "mappings": [
            { "characterName": "Bob", "speakerVoiceAssetId": voice.as_str() },
            { "characterName": "Alice", "speakerVoiceAssetId": voice.as_str() },
        ],
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/mappings/import")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&import_body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CREATED);
    assert_eq!(body["created"].as_array().unwrap().len(), 1);
    assert_eq!(body["created"][0].as_str().unwrap(), "Alice");
    assert_eq!(body["skipped"][0].as_str().unwrap(), "Bob");
}

#[tokio::test]
async fn soft_delete_marks_is_active_false_and_hides_from_list() {
    let (router, _repos, dep, voice) = router_with_repos().await;
    let (_, body) = post_mapping(&router, dep.as_str(), voice.as_str(), "Bob").await;
    let mapping_id = body["mappingId"].as_str().unwrap();

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(format!("/mappings/{mapping_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/mappings?deploymentId={}", dep.as_str()))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert!(body["mappings"].as_array().unwrap().is_empty());
}
