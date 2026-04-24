//! Contract tests for the runs router (T034-T036).
//!
//! Boots the router against an in-memory SQLite pool with the extension's
//! own migrations applied and the ULID-backed queue.

use std::sync::Arc;

use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with;
use emotion_tts_extension::domain::{DeploymentId, MappingId, VoiceAssetId};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::{CharacterMappingRow, DeploymentRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

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
            display_name: "Test Deployment".into(),
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

async fn seed_mapping(repos: &Repos, dep: &DeploymentId, name: &str) -> MappingId {
    let id = MappingId::new();
    let now = Utc::now().timestamp();
    repos
        .mappings
        .insert(&CharacterMappingRow {
            mapping_id: id.clone(),
            deployment_id: dep.clone(),
            character_name: name.to_string(),
            character_name_lower: name.to_lowercase(),
            speaker_voice_asset_id: VoiceAssetId::new(),
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
    id
}

async fn router_with_repos() -> (axum::Router, Repos) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let router = build_router_with(repos.clone(), queue, "0.1.0");
    (router, repos)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

#[tokio::test]
async fn post_run_returns_202_with_preflight_payload() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;
    seed_mapping(&repos, &dep, "Alice").await;

    let body = json!({
        "script": "[Bob] Hello\n[Alice] There",
        "outputFormat": "mp3",
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();

    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::ACCEPTED);

    assert!(body.get("runId").unwrap().is_string());
    let preflight = body.get("preflight").unwrap();
    let unresolved = preflight.get("unresolvedCharacters").unwrap().as_array().unwrap();
    assert!(unresolved.is_empty());
    let predicted = preflight.get("predictedFilenames").unwrap().as_array().unwrap();
    assert_eq!(predicted.len(), 2);
    assert!(predicted[0].as_str().unwrap().ends_with("_Bob_001.mp3"));
    assert!(predicted[1].as_str().unwrap().ends_with("_Alice_001.mp3"));
}

#[tokio::test]
async fn preflight_surfaces_parser_warnings() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;

    let body = json!({
        "script": "[Bob|unknown_key:5] hi",
        "outputFormat": "mp3",
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let warnings = body["preflight"]["parserWarnings"].as_array().unwrap();
    assert_eq!(warnings.len(), 1);
    assert_eq!(warnings[0]["kind"].as_str().unwrap(), "unknown_override_key");
}

#[tokio::test]
async fn post_run_conflicts_on_unresolved_characters() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;

    let body = json!({
        "script": "[Morgan] Hey",
        "outputFormat": "mp3",
    });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();

    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::CONFLICT);
    assert!(body["message"].as_str().unwrap().contains("Morgan"));
}

#[tokio::test]
async fn post_run_rejects_empty_script() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    let body = json!({ "script": "   ", "outputFormat": "mp3" });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn post_run_rejects_unsupported_format() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    let body = json!({ "script": "[Bob] hi", "outputFormat": "ogg" });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn post_run_rejects_speed_out_of_range() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;
    let body = json!({ "script": "[Bob] hi", "outputFormat": "mp3", "speedFactor": 5.0 });
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{}/runs", dep.as_str()))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn get_run_returns_full_run_shape() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;

    let post = json!({
        "script": "[Bob] hi",
        "outputFormat": "mp3",
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/deployments/{}/runs", dep.as_str()))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&post).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, body) = parse_body(resp).await;
    let run_id = body["runId"].as_str().unwrap().to_string();

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/deployments/{}/runs/{}", dep.as_str(), run_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["runId"].as_str().unwrap(), run_id);
    assert_eq!(body["kind"].as_str().unwrap(), "batch");
    assert_eq!(body["status"].as_str().unwrap(), "queued");
    assert_eq!(body["outputFormat"].as_str().unwrap(), "mp3");
    assert!(body["utterances"].is_array());
}

#[tokio::test]
async fn get_run_404_for_unknown_run() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    let fake_run = emotion_tts_extension::domain::RunId::new();
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!(
                    "/deployments/{}/runs/{}",
                    dep.as_str(),
                    fake_run.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn cancel_run_flips_status() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;

    let post = json!({ "script": "[Bob] hi", "outputFormat": "mp3" });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/deployments/{}/runs", dep.as_str()))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&post).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, body) = parse_body(resp).await;
    let run_id = body["runId"].as_str().unwrap().to_string();

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!(
                    "/deployments/{}/runs/{}/cancel",
                    dep.as_str(),
                    run_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let status_str = body["status"].as_str().unwrap();
    assert!(status_str == "cancelling" || status_str == "cancelled");
}

#[tokio::test]
async fn cancel_unknown_run_404() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    let fake = emotion_tts_extension::domain::RunId::new();
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!(
                    "/deployments/{}/runs/{}/cancel",
                    dep.as_str(),
                    fake.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _) = parse_body(resp).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn list_runs_filters_by_status() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;
    seed_mapping(&repos, &dep, "Bob").await;

    for _ in 0..3 {
        router
            .clone()
            .oneshot(
                Request::builder()
                    .method(Method::POST)
                    .uri(format!("/deployments/{}/runs", dep.as_str()))
                    .header("content-type", "application/json")
                    .body(Body::from(
                        serde_json::to_vec(&json!({
                            "script": "[Bob] hi",
                            "outputFormat": "mp3",
                        }))
                        .unwrap(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();
    }

    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!(
                    "/deployments/{}/runs?status=queued&limit=50",
                    dep.as_str()
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["runs"].as_array().unwrap().len(), 3);
}

#[tokio::test]
async fn test_line_endpoint_accepts_202() {
    let (router, repos) = router_with_repos().await;
    let dep = seed_deployment(&repos).await;

    let body = json!({ "line": "[Bob] hi", "outputFormat": "mp3" });
    let resp = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri(format!("/deployments/{}/runs/test-line", dep.as_str()))
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    assert!(body["runId"].as_str().unwrap().len() > 0);
}
