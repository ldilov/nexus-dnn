//! Spec 038 — contract smoke for the per-deployment artifacts router.
//!
//! Covers:
//!   * GET    /deployments/{id}/artifacts → 200 with newest-first list and
//!     soft-delete filtering of NULL audio refs
//!   * DELETE /deployments/{id}/artifacts/{utteranceId} → 204 + removed from
//!     subsequent list
//!   * DELETE /deployments/{id}/artifacts → 200 with `deleted` count
//!   * GET    /deployments/{id}/artifacts.zip → 200 with a real zip body
//!     containing one entry per non-deleted artifact
//!
//! Uses an on-disk `MemoryArtifactStore` that resolves to actual temp files
//! so the streaming / zip path exercises real I/O.

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::domain::{DeploymentId, RunId, UtteranceId};
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, RunRow, UtteranceRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use serde_json::Value;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

#[derive(Clone)]
struct DiskArtifactStore {
    root: PathBuf,
}

impl DiskArtifactStore {
    fn new() -> Self {
        let root = std::env::temp_dir().join(format!(
            "emotion-tts-artifacts-test-{}",
            Utc::now().timestamp_nanos_opt().unwrap_or(0)
        ));
        std::fs::create_dir_all(&root).expect("mkdir test root");
        Self { root }
    }
}

#[async_trait]
impl HostArtifactStore for DiskArtifactStore {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        _mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError> {
        let path = self.root.join(display_name);
        tokio::fs::write(&path, &bytes)
            .await
            .map_err(|e| HostContractError::Artifact(format!("write {display_name}: {e}")))?;
        Ok(ArtifactPut {
            artifact_ref: format!("artifact://disk/{display_name}"),
            content_sha256: "0".repeat(64),
            size_bytes: bytes.len() as u64,
        })
    }

    async fn resolve_path(&self, artifact_ref: &str) -> Result<String, HostContractError> {
        let name = artifact_ref
            .strip_prefix("artifact://disk/")
            .ok_or_else(|| HostContractError::Artifact(format!("bad ref {artifact_ref}")))?;
        let abs = self.root.join(name);
        Ok(abs.to_string_lossy().into_owned())
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
            host_extension_instance_ref: "instance_artifacts".into(),
            display_name: "Artifacts Test".into(),
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

async fn seed_run_with_artifacts(
    repos: &Repos,
    store: &DiskArtifactStore,
    dep: &DeploymentId,
    n: usize,
) -> Vec<UtteranceId> {
    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    repos
        .runs
        .insert(&RunRow {
            run_id: run_id.clone(),
            deployment_id: dep.clone(),
            kind: "batch".into(),
            status: "completed".into(),
            script_snapshot: "test script".into(),
            parser_mode: "dialogue".into(),
            generation_settings_json: "{}".into(),
            global_emotion_snapshot_json: None,
            output_format: "mp3".into(),
            speed_factor: 1.0,
            speed_mode: "preserve_pitch".into(),
            cache_policy: "use_cache".into(),
            seed_strategy: "fixed".into(),
            base_seed: 42,
            original_run_id: None,
            runtime_install_id: None,
            runtime_version: None,
            model_version: None,
            extension_version: "0.1.0".into(),
            queued_at: now,
            started_at: Some(now),
            finished_at: Some(now),
            error_category: None,
            error_detail: None,
            export_zip_stale_at: None,
            prebuilt_segments_json: None,
        })
        .await
        .unwrap();

    let mut ids = Vec::with_capacity(n);
    let mut rows = Vec::with_capacity(n);
    for i in 0..n {
        let utt_id = UtteranceId::new();
        let display_name = format!("seg-{}-{}.mp3", run_id.as_str(), i);
        let put = store
            .store(format!("audio-bytes-{i}").into_bytes(), &display_name, None)
            .await
            .expect("store");
        ids.push(utt_id.clone());
        rows.push(UtteranceRow {
            utterance_id: utt_id,
            run_id: run_id.clone(),
            global_index: (i + 1) as i64,
            character_display: "Bob".into(),
            character_sanitised: "Bob".into(),
            character_index: 1,
            text: format!("line {i}"),
            source_line_number: (i + 1) as i64,
            inline_overrides_json: "{}".into(),
            legacy_emotion_ref: None,
            resolved_mapping_id: None,
            resolved_speaker_voice_asset_id: None,
            resolved_emotion_mode: None,
            resolved_emotion_payload_json: None,
            resolved_seed: Some(42),
            resolved_generation_json: None,
            content_hash: None,
            status: "completed".into(),
            source_run_id: None,
            audio_artifact_ref: Some(put.artifact_ref),
            cache_hit: false,
            duration_ms: Some(1_000),
            started_at: Some(now),
            finished_at: Some(now + i as i64),
            failure_category: None,
            failure_detail: None,
            edit_chain_json: None,
            derived_artifact_ref: None,
            updated_at: Some(now),
        });
    }
    repos.utterances.insert_many(&rows).await.unwrap();
    ids
}

fn router_with(repos: Repos, store: Arc<DiskArtifactStore>) -> axum::Router {
    let queue = Arc::new(RuntimeQueue::new());
    build_router(
        repos,
        queue,
        "0.1.0",
        None,
        Some(store as Arc<dyn HostArtifactStore>),
    )
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

#[tokio::test]
async fn list_returns_artifacts_newest_first() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(DiskArtifactStore::new());
    let dep = seed_deployment(&repos).await;
    let _ids = seed_run_with_artifacts(&repos, &store, &dep, 3).await;
    let router = router_with(repos, store);

    let req = Request::builder()
        .method(Method::GET)
        .uri(format!("/deployments/{}/artifacts", dep.as_str()))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    let arts = body["artifacts"].as_array().unwrap();
    assert_eq!(arts.len(), 3);
    assert_eq!(body["total"].as_u64().unwrap(), 3);
    // Newest finished_at first → utterance index 3 then 2 then 1.
    assert_eq!(arts[0]["globalIndex"].as_i64().unwrap(), 3);
    assert_eq!(arts[2]["globalIndex"].as_i64().unwrap(), 1);
    assert_eq!(arts[0]["outputFormat"].as_str().unwrap(), "mp3");
    assert!(arts[0]["filename"].as_str().unwrap().ends_with(".mp3"));
}

#[tokio::test]
async fn delete_artifact_soft_removes_from_listing() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(DiskArtifactStore::new());
    let dep = seed_deployment(&repos).await;
    let ids = seed_run_with_artifacts(&repos, &store, &dep, 2).await;
    let router = router_with(repos, store);

    let target = ids[0].clone();
    let del_req = Request::builder()
        .method(Method::DELETE)
        .uri(format!(
            "/deployments/{}/artifacts/{}",
            dep.as_str(),
            target.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let resp = router.clone().oneshot(del_req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);

    // Re-list — only one survivor.
    let list_req = Request::builder()
        .method(Method::GET)
        .uri(format!("/deployments/{}/artifacts", dep.as_str()))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(list_req).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["artifacts"].as_array().unwrap().len(), 1);
}

#[tokio::test]
async fn delete_all_returns_count_and_clears() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(DiskArtifactStore::new());
    let dep = seed_deployment(&repos).await;
    seed_run_with_artifacts(&repos, &store, &dep, 4).await;
    let router = router_with(repos, store);

    let del = Request::builder()
        .method(Method::DELETE)
        .uri(format!("/deployments/{}/artifacts", dep.as_str()))
        .body(Body::empty())
        .unwrap();
    let resp = router.clone().oneshot(del).await.unwrap();
    let (status, body) = parse_body(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["deleted"].as_u64().unwrap(), 4);

    let list_req = Request::builder()
        .method(Method::GET)
        .uri(format!("/deployments/{}/artifacts", dep.as_str()))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(list_req).await.unwrap();
    let (_, body) = parse_body(resp).await;
    assert_eq!(body["artifacts"].as_array().unwrap().len(), 0);
}

#[tokio::test]
async fn zip_download_returns_real_archive() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let store = Arc::new(DiskArtifactStore::new());
    let dep = seed_deployment(&repos).await;
    seed_run_with_artifacts(&repos, &store, &dep, 2).await;
    let router = router_with(repos, store);

    let req = Request::builder()
        .method(Method::GET)
        .uri(format!("/deployments/{}/artifacts.zip", dep.as_str()))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let ct = resp
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");
    assert_eq!(ct, "application/zip");
    let cd = resp
        .headers()
        .get("content-disposition")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_string();
    assert!(cd.contains("attachment"));
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    // PK\x03\x04 — local file header magic.
    assert!(bytes.starts_with(b"PK\x03\x04"), "not a zip");

    // Inspect entries via the `zip` crate.
    let cursor = std::io::Cursor::new(bytes.to_vec());
    let mut archive = zip::ZipArchive::new(cursor).expect("read zip");
    assert_eq!(archive.len(), 2);
    let mut names = Vec::new();
    for i in 0..archive.len() {
        names.push(archive.by_index(i).unwrap().name().to_string());
    }
    assert!(names.iter().all(|n| n.ends_with(".mp3")));
}
