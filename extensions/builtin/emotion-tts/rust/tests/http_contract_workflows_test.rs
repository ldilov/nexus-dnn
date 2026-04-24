mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with_artifact_store;
use emotion_tts_extension::domain::DeploymentId;
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::DeploymentRow;
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

async fn seed_deployment(repos: &Repos) -> DeploymentId {
    let id = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: id.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: "Workflow Test".into(),
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
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn router_with_deployment() -> (axum::Router, DeploymentId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);
    let router = build_router_with_artifact_store(repos.clone(), queue, "0.1.0", store);
    let dep = seed_deployment(&repos).await;
    (router, dep)
}

async fn parse(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn get_workflow(router: &axum::Router, dep: &str) -> (StatusCode, Value) {
    let req = Request::builder()
        .method(Method::GET)
        .uri(format!("/workflow?deploymentId={dep}"))
        .body(Body::empty())
        .unwrap();
    parse(router.clone().oneshot(req).await.unwrap()).await
}

async fn put_workflow(router: &axum::Router, dep: &str, workflow: Value) -> (StatusCode, Value) {
    let body = json!({ "deploymentId": dep, "workflow": workflow });
    let req = Request::builder()
        .method(Method::PUT)
        .uri("/workflow")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    parse(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn first_get_seeds_curated_workflow_not_customised() {
    let (router, dep) = router_with_deployment().await;
    let (status, body) = get_workflow(&router, dep.as_str()).await;

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["workflow"]["customised"].as_bool(), Some(false));
    assert_eq!(body["workflow"]["nodes"].as_array().unwrap().len(), 7);
    assert_eq!(body["workflow"]["edges"].as_array().unwrap().len(), 7);
    assert!(body["unmappableFields"].as_array().unwrap().is_empty());
}

#[tokio::test]
async fn second_get_returns_persisted_document() {
    let (router, dep) = router_with_deployment().await;

    let (_, first) = get_workflow(&router, dep.as_str()).await;
    let first_updated = first["workflow"]["nodes"].clone();

    let (status, second) = get_workflow(&router, dep.as_str()).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(second["workflow"]["nodes"], first_updated);
    assert_eq!(second["workflow"]["customised"].as_bool(), Some(false));
}

#[tokio::test]
async fn put_with_extra_node_flips_customised_and_persists() {
    let (router, dep) = router_with_deployment().await;
    let (_, seeded) = get_workflow(&router, dep.as_str()).await;

    let mut workflow = seeded["workflow"].clone();
    let nodes = workflow["nodes"].as_array_mut().unwrap();
    nodes.push(json!({
        "id": "loudness_normalize_1",
        "operatorId": "some.vendor.loudness.normalize@1.0.0",
        "config": {}
    }));

    let (status, body) = put_workflow(&router, dep.as_str(), workflow).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["workflow"]["customised"].as_bool(), Some(true));

    let (_, reload) = get_workflow(&router, dep.as_str()).await;
    assert_eq!(reload["workflow"]["customised"].as_bool(), Some(true));
    assert_eq!(reload["workflow"]["nodes"].as_array().unwrap().len(), 8);
}

#[tokio::test]
async fn customised_flag_is_recomputed_not_trusted_from_client() {
    let (router, dep) = router_with_deployment().await;
    let (_, seeded) = get_workflow(&router, dep.as_str()).await;

    let mut workflow = seeded["workflow"].clone();
    workflow["customised"] = json!(true);

    let (status, body) = put_workflow(&router, dep.as_str(), workflow).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(
        body["workflow"]["customised"].as_bool(),
        Some(false),
        "server MUST recompute customised from the document (FR-106), not trust the client"
    );
}

#[tokio::test]
async fn revert_to_curated_flips_customised_back_to_false() {
    let (router, dep) = router_with_deployment().await;
    let (_, seeded) = get_workflow(&router, dep.as_str()).await;
    let curated = seeded["workflow"].clone();

    let mut dirtied = curated.clone();
    dirtied["nodes"].as_array_mut().unwrap().push(json!({
        "id": "extra_1",
        "operatorId": "vendor.extra@1.0.0",
        "config": {}
    }));
    let (_, dirty_resp) = put_workflow(&router, dep.as_str(), dirtied).await;
    assert_eq!(dirty_resp["workflow"]["customised"].as_bool(), Some(true));

    let (_, clean_resp) = put_workflow(&router, dep.as_str(), curated).await;
    assert_eq!(clean_resp["workflow"]["customised"].as_bool(), Some(false));
}

#[tokio::test]
async fn put_rejects_malformed_workflow() {
    let (router, dep) = router_with_deployment().await;
    let (status, _) = put_workflow(&router, dep.as_str(), json!({ "garbage": true })).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}
