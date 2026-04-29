//! Contract tests for the OAS HTTP handlers (spec 034 T062 + T063).
//!
//! Uses the real router built against an in-memory SQLite pool — no mock
//! lease needed because these endpoints only touch the deployments and
//! runs repos.

use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with;
use emotion_tts_extension::domain::{DeploymentId, RunId};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, RunRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use std::sync::Arc;
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
            display_name: "OAS HTTP Test".into(),
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
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn seed_run(repos: &Repos, dep: &DeploymentId) -> RunId {
    let id = RunId::new();
    let now = Utc::now().timestamp();
    repos
        .runs
        .insert(&RunRow {
            run_id: id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "completed".into(),
            script_snapshot: "".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "mp3".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "deterministic".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.2.0".into(),
            queued_at: now,
            started_at: Some(now),
            finished_at: Some(now),
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
        })
        .await
        .unwrap();
    id
}

async fn build_test_router() -> (axum::Router, Repos) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let router = build_router_with(repos.clone(), queue, "0.2.0");
    (router, repos)
}

// ---------------------------------------------------------------------------
// T062 — engine-settings
// ---------------------------------------------------------------------------

#[tokio::test]
async fn get_engine_settings_returns_documented_defaults() {
    let (router, repos) = build_test_router().await;
    let dep = seed_deployment(&repos).await;

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/deployments/{dep}/engine-settings"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    assert_eq!(body["deploymentId"], dep.as_str());
    assert_eq!(body["referencePreprocessEnabled"], true);
    assert_eq!(body["oasEnabled"], true);
    assert_eq!(body["compileGptEnabled"], false);
    assert_eq!(body["modelFamily"], "indextts-2");
    assert_eq!(body["oasThresholdUsed"], 0.45);
    assert_eq!(body["oasThresholdSource"], "literature_default");
    assert_eq!(body["oasSamplesSeen"], 0);
}

#[tokio::test]
async fn patch_engine_settings_updates_individual_fields() {
    let (router, repos) = build_test_router().await;
    let dep = seed_deployment(&repos).await;

    let response = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/deployments/{dep}/engine-settings"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({ "oasEnabled": false, "compileGptEnabled": true }).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    assert_eq!(body["oasEnabled"], false);
    assert_eq!(body["compileGptEnabled"], true);
    // Unspecified fields left alone.
    assert_eq!(body["referencePreprocessEnabled"], true);
    assert_eq!(body["modelFamily"], "indextts-2");
}

#[tokio::test]
async fn patch_engine_settings_unknown_deployment_returns_404() {
    let (router, _repos) = build_test_router().await;
    let missing = DeploymentId::new();
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/deployments/{missing}/engine-settings"))
                .header("content-type", "application/json")
                .body(Body::from("{}".to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn patch_oas_threshold_persists_rolling_value() {
    let (router, repos) = build_test_router().await;
    let dep = seed_deployment(&repos).await;

    let response = router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/deployments/{dep}/oas-threshold"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({ "thresholdLearned": 0.37, "samplesSeen": 250 }).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::NO_CONTENT);

    // Re-GET and assert the row picked up the new threshold.
    let row = repos.deployments.get(&dep).await.unwrap().unwrap();
    assert_eq!(row.oas_threshold_learned, Some(0.37));
    assert_eq!(row.oas_samples_seen, 250);
}

#[tokio::test]
async fn patch_oas_threshold_rejects_out_of_range() {
    let (router, repos) = build_test_router().await;
    let dep = seed_deployment(&repos).await;

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::PATCH)
                .uri(format!("/deployments/{dep}/oas-threshold"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({ "thresholdLearned": 1.5, "samplesSeen": 10 }).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::BAD_REQUEST);
}

// ---------------------------------------------------------------------------
// T063 — diagnostics
// ---------------------------------------------------------------------------

#[tokio::test]
async fn get_diagnostics_returns_empty_shape_for_completed_run() {
    let (router, repos) = build_test_router().await;
    let dep = seed_deployment(&repos).await;
    let run = seed_run(&repos, &dep).await;

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/runs/{run}/diagnostics"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    assert_eq!(body["runId"], run.as_str());
    assert!(body["segments"].is_array());
    assert_eq!(body["segments"].as_array().unwrap().len(), 0);
    assert!(body["summary"].is_null());
}

#[tokio::test]
async fn get_diagnostics_unknown_run_returns_404() {
    let (router, _repos) = build_test_router().await;
    let missing = RunId::new();
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri(format!("/runs/{missing}/diagnostics"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}
