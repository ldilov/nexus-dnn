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

async fn router_with_deployment() -> (axum::Router, DeploymentId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);
    let router = build_router_with_artifact_store(repos.clone(), queue, "0.1.0", store);
    let dep = seed_deployment(&repos, "Test").await;
    (router, dep)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn post_preset(router: &axum::Router, dep: &str, name: &str, vector: [f64; 8]) -> (StatusCode, Value) {
    let body = json!({
        "deploymentId": dep,
        "presetName": name,
        "vector": vector,
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri("/presets")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    parse_body(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn create_list_get_round_trip() {
    let (router, dep) = router_with_deployment().await;
    let v = [0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.1];

    let (status, body) = post_preset(&router, dep.as_str(), "Joyful", v).await;
    assert_eq!(status, StatusCode::CREATED);
    let preset_id = body["presetId"].as_str().unwrap().to_string();
    assert_eq!(body["presetName"].as_str().unwrap(), "Joyful");
    let returned = body["vector"].as_array().unwrap();
    assert_eq!(returned.len(), 8);
    assert!((returned[0].as_f64().unwrap() - 0.7).abs() < 1e-9);
    assert!((returned[6].as_f64().unwrap() - 0.2).abs() < 1e-9);

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/presets?deploymentId={}", dep.as_str()))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    let arr = body["presets"].as_array().unwrap();
    assert_eq!(arr.len(), 1);

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/presets/{preset_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["presetId"].as_str().unwrap(), preset_id);
}

#[tokio::test]
async fn case_insensitive_unique_name_per_deployment() {
    let (router, dep) = router_with_deployment().await;
    let v = [0.1; 8];

    let (status, _) = post_preset(&router, dep.as_str(), "Joyful", v).await;
    assert_eq!(status, StatusCode::CREATED);

    let (status, body) = post_preset(&router, dep.as_str(), "JOYFUL", v).await;
    assert_eq!(status, StatusCode::CONFLICT);
    assert!(body["message"].as_str().unwrap().contains("already exists"));

    let (status, _) = post_preset(&router, dep.as_str(), "joyful", v).await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn rejects_wrong_length_and_out_of_range_vectors() {
    let (router, dep) = router_with_deployment().await;

    let short_body = json!({
        "deploymentId": dep.as_str(),
        "presetName": "Short",
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri("/presets")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&short_body).unwrap()))
        .unwrap();
    let (status, _) = parse_body(router.clone().oneshot(req).await.unwrap()).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);

    let out_of_range = json!({
        "deploymentId": dep.as_str(),
        "presetName": "Hot",
        "vector": [1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri("/presets")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&out_of_range).unwrap()))
        .unwrap();
    let (status, _) = parse_body(router.clone().oneshot(req).await.unwrap()).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn patch_rename_and_replace_vector() {
    let (router, dep) = router_with_deployment().await;
    let (_, body) = post_preset(&router, dep.as_str(), "Neutral", [0.0; 8]).await;
    let preset_id = body["presetId"].as_str().unwrap().to_string();

    let patch = json!({
        "presetName": "Calm",
        "vector": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9],
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/presets/{preset_id}"))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&patch).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["presetName"].as_str().unwrap(), "Calm");
    let calm_val = body["vector"].as_array().unwrap()[7].as_f64().unwrap();
    assert!((calm_val - 0.9).abs() < 1e-9);
    assert_eq!(body["presetId"].as_str().unwrap(), preset_id);
}

#[tokio::test]
async fn patch_rename_respects_uniqueness() {
    let (router, dep) = router_with_deployment().await;
    let (_, _) = post_preset(&router, dep.as_str(), "Joyful", [0.1; 8]).await;
    let (_, body) = post_preset(&router, dep.as_str(), "Calm", [0.1; 8]).await;
    let calm_id = body["presetId"].as_str().unwrap();

    let patch = json!({ "presetName": "JOYFUL" });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/presets/{calm_id}"))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&patch).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn delete_removes_preset() {
    let (router, dep) = router_with_deployment().await;
    let (_, body) = post_preset(&router, dep.as_str(), "Tmp", [0.1; 8]).await;
    let preset_id = body["presetId"].as_str().unwrap().to_string();

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::DELETE)
                .uri(format!("/presets/{preset_id}"))
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
                .uri(format!("/presets/{preset_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}
