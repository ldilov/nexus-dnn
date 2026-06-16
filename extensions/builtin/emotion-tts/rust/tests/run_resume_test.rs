mod fixtures;

use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::build_router_with_artifact_store;
use emotion_tts_extension::domain::{DeploymentId, RunId};
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, RunRow};
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

async fn setup() -> (axum::Router, Repos, DeploymentId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let store: Arc<dyn HostArtifactStore> = Arc::new(MemoryArtifactStore);
    let router = build_router_with_artifact_store(repos.clone(), queue, "0.1.0", store);

    let dep = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: "Resume Test".into(),
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

    (router, repos, dep)
}

async fn insert_run(repos: &Repos, dep: &DeploymentId, status: &str, kind: &str) -> RunId {
    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: kind.into(),
            status: status.into(),
            script_snapshot: "[Bob] Hello\n[Alice] Hi".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{\"temperature\":0.7}".into(),
            global_emotion_snapshot_json: Some("{\"mode\":\"none\"}".into()),
            output_format: "mp3".into(),
            speed_factor: 1.1,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "increment_per_line".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.1.0".into(),
            queued_at: now,
            started_at: None,
            finished_at: if status == "queued" { None } else { Some(now) },
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
            prebuilt_segments_json: None,
        })
        .await
        .unwrap();
    run_id
}

async fn parse(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn post_resume(router: &axum::Router, dep: &str, run_id: &str) -> (StatusCode, Value) {
    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("/deployments/{dep}/runs/{run_id}/resume"))
        .header("content-type", "application/json")
        .body(Body::from("{}"))
        .unwrap();
    parse(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn resume_of_cancelled_run_creates_new_run_with_original_run_id() {
    let (router, repos, dep) = setup().await;
    let original = insert_run(&repos, &dep, "cancelled", "batch").await;

    let (status, body) = post_resume(&router, dep.as_str(), original.as_str()).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let new_run_id_str = body["runId"].as_str().unwrap().to_string();
    assert_eq!(body["originalRunId"].as_str(), Some(original.as_str()));
    assert_ne!(new_run_id_str, original.as_str());

    let new_run_id = RunId::try_from(new_run_id_str.as_str()).unwrap();
    let new_row = repos.runs.get(&new_run_id).await.unwrap().unwrap();
    assert_eq!(new_row.status, "queued");
    assert_eq!(new_row.kind, "batch");
    assert_eq!(new_row.script_snapshot, "[Bob] Hello\n[Alice] Hi");
    assert_eq!(new_row.speed_factor, 1.1);
    assert_eq!(new_row.base_seed, 42);
    assert_eq!(
        new_row
            .original_run_id
            .as_ref()
            .map(|r| r.as_str().to_string()),
        Some(original.as_str().to_string())
    );
}

#[tokio::test]
async fn resume_chains_original_run_id_through_multiple_resumes() {
    let (router, repos, dep) = setup().await;
    let first = insert_run(&repos, &dep, "cancelled", "batch").await;

    let (_, body) = post_resume(&router, dep.as_str(), first.as_str()).await;
    let second_id = body["runId"].as_str().unwrap().to_string();

    let second = RunId::try_from(second_id.as_str()).unwrap();
    let mut row = repos.runs.get(&second).await.unwrap().unwrap();
    row.status = "failed".into();
    row.finished_at = Some(Utc::now().timestamp());
    repos
        .runs
        .update_status(&second, "failed", row.finished_at)
        .await
        .unwrap();

    let (status, body) = post_resume(&router, dep.as_str(), &second_id).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    let third_id = body["runId"].as_str().unwrap();
    let third = RunId::try_from(third_id).unwrap();
    let third_row = repos.runs.get(&third).await.unwrap().unwrap();
    assert_eq!(
        third_row
            .original_run_id
            .as_ref()
            .map(|r| r.as_str().to_string()),
        Some(first.as_str().to_string()),
        "chained resume preserves the earliest interrupted run id on the new row"
    );
}

#[tokio::test]
async fn resume_of_completed_run_returns_conflict() {
    let (router, repos, dep) = setup().await;
    let original = insert_run(&repos, &dep, "completed", "batch").await;

    let (status, body) = post_resume(&router, dep.as_str(), original.as_str()).await;
    assert_eq!(status, StatusCode::CONFLICT);
    assert!(body["category"].as_str().unwrap_or("").contains("conflict"));
}

#[tokio::test]
async fn resume_of_active_run_returns_conflict() {
    let (router, repos, dep) = setup().await;
    let original = insert_run(&repos, &dep, "running", "batch").await;

    let (status, _) = post_resume(&router, dep.as_str(), original.as_str()).await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn resume_of_test_line_run_is_rejected() {
    let (router, repos, dep) = setup().await;
    let original = insert_run(&repos, &dep, "cancelled", "test_line").await;

    let (status, _) = post_resume(&router, dep.as_str(), original.as_str()).await;
    assert_eq!(status, StatusCode::CONFLICT);
}

#[tokio::test]
async fn resume_of_unknown_run_returns_404() {
    let (router, _, dep) = setup().await;
    let ghost = RunId::new();
    let (status, _) = post_resume(&router, dep.as_str(), ghost.as_str()).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn resume_of_run_from_other_deployment_returns_404() {
    let (router, repos, dep_a) = setup().await;
    let dep_b = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: dep_b.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: "Other".into(),
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
    let run_in_b = insert_run(&repos, &dep_b, "cancelled", "batch").await;

    let (status, _) = post_resume(&router, dep_a.as_str(), run_in_b.as_str()).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn cancel_flips_deployment_partial_run_id() {
    let (router, repos, dep) = setup().await;
    let run_id = insert_run(&repos, &dep, "running", "batch").await;

    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/deployments/{}/runs/{}/cancel",
            dep.as_str(),
            run_id.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let (status, _) = parse(router.clone().oneshot(req).await.unwrap()).await;
    assert_eq!(status, StatusCode::ACCEPTED);

    let dep_row = repos.deployments.get(&dep).await.unwrap().unwrap();
    assert_eq!(
        dep_row
            .partial_run_id
            .as_ref()
            .map(|r| r.as_str().to_string()),
        Some(run_id.as_str().to_string())
    );
}

#[tokio::test]
async fn cancel_does_not_flip_partial_run_id_for_test_line() {
    let (router, repos, dep) = setup().await;
    let run_id = insert_run(&repos, &dep, "running", "test_line").await;

    let req = Request::builder()
        .method(Method::POST)
        .uri(format!(
            "/deployments/{}/runs/{}/cancel",
            dep.as_str(),
            run_id.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let (status, _) = parse(router.clone().oneshot(req).await.unwrap()).await;
    assert_eq!(status, StatusCode::ACCEPTED);

    let dep_row = repos.deployments.get(&dep).await.unwrap().unwrap();
    assert!(dep_row.partial_run_id.is_none());
}
