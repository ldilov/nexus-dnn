//! Host-shell deployment-detail surfaces: the Runs and Artifacts tabs fetch
//! `/deployments/{dep}/runs` + `/deployments/{dep}/artifacts` (and the artifact
//! verbs) through the generic extension mount. These tests drive the wired
//! router over a seeded store and assert the exact `RunRow`/`ArtifactRow` JSON
//! shapes the host UI consumes.

mod fixtures;

use std::path::{Path, PathBuf};
use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt;

use faceavatar_extension::domain::JobId;
use faceavatar_extension::storage::Store;
use fixtures::mock_lease::MockGenerationFactory;

const DEP: &str = "dep-1";

/// Build the router over a fresh workspace + store sharing one pool. Returns the
/// router, the `Store` (to seed jobs), and the workspace dir (to plant GLB
/// bytes at the same workspace-relative ref a completed job carries).
fn harness(pool: sqlx::SqlitePool) -> (axum::Router, Store, PathBuf) {
    let workspace = std::env::temp_dir().join(format!("faceavatar-ra-{}", ulid::Ulid::new()));
    std::fs::create_dir_all(&workspace).unwrap();
    let store = Store::new(pool.clone());
    let router = faceavatar_extension::build_router_with_factory(
        pool,
        Arc::new(MockGenerationFactory),
        workspace.clone(),
    );
    (router, store, workspace)
}

/// Seed a `completed` job whose GLB lives at `meshes/<job>/out.glb` under the
/// workspace, with real bytes on disk. Returns the job id.
async fn seed_completed(store: &Store, workspace: &Path, metadata: Option<&str>) -> String {
    let job_id = JobId::new();
    let rel = format!("meshes/{}/out.glb", job_id.as_str());
    let abs = workspace.join(&rel);
    std::fs::create_dir_all(abs.parent().unwrap()).unwrap();
    std::fs::write(&abs, b"GLBDATA").unwrap();
    store
        .create_job(&job_id, "generate", "uploads/in.png", "{}")
        .await
        .unwrap();
    store.mark_running(&job_id).await.unwrap();
    store
        .mark_completed(&job_id, Some(&rel), metadata)
        .await
        .unwrap();
    job_id.as_str().to_string()
}

async fn body_json(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

async fn get(router: &axum::Router, uri: &str) -> axum::response::Response {
    router
        .clone()
        .oneshot(Request::builder().uri(uri).body(Body::empty()).unwrap())
        .await
        .unwrap()
}

#[tokio::test]
async fn runs_lists_jobs_with_host_runrow_shape() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    seed_completed(
        &store,
        &workspace,
        Some(r#"{"vertices":12000,"faces":24000}"#),
    )
    .await;
    // A failed job should still show under Runs with its message as detail.
    let failed = JobId::new();
    store
        .create_job(&failed, "generate", "uploads/in.png", "{}")
        .await
        .unwrap();
    store.mark_running(&failed).await.unwrap();
    store
        .mark_failed(&failed, "-32101|MODEL_MISSING: weights gone")
        .await
        .unwrap();

    let (status, body) = body_json(get(&router, &format!("/deployments/{DEP}/runs")).await).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["total"], 2);

    let runs = body["runs"].as_array().unwrap();
    let failed_run = runs.iter().find(|r| r["status"] == "failed").unwrap();
    assert_eq!(failed_run["label"], "Identity head");
    assert_eq!(failed_run["detail"], "MODEL_MISSING: weights gone");
    assert!(failed_run["id"].is_string());

    let ok_run = runs.iter().find(|r| r["status"] == "succeeded").unwrap();
    assert_eq!(ok_run["label"], "Identity head");
    assert_eq!(ok_run["detail"], "12,000 verts · 24,000 faces");
    // startedAt/finishedAt are epoch MILLISECONDS; durationMs is the span.
    assert!(ok_run["startedAt"].as_i64().unwrap() > 0);
    assert!(ok_run["finishedAt"].as_i64().unwrap() > 0);
    assert!(ok_run["durationMs"].as_i64().unwrap() >= 0);
}

#[tokio::test]
async fn artifacts_lists_completed_jobs_with_host_artifactrow_shape() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    let job = seed_completed(&store, &workspace, None).await;
    // A failed job must NOT appear under Artifacts.
    let failed = JobId::new();
    store
        .create_job(&failed, "generate", "uploads/in.png", "{}")
        .await
        .unwrap();
    store.mark_failed(&failed, "boom").await.unwrap();

    let (status, body) =
        body_json(get(&router, &format!("/deployments/{DEP}/artifacts")).await).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["total"], 1);
    let a = &body["artifacts"][0];
    assert_eq!(a["utteranceId"], job);
    assert_eq!(a["runId"], job);
    assert_eq!(a["globalIndex"], 0);
    assert_eq!(a["characterDisplay"], "Face avatar");
    assert_eq!(a["text"], "uploads/in.png");
    assert_eq!(a["outputFormat"], "glb");
    assert_eq!(a["filename"], "out.glb");
    assert_eq!(a["edited"], false);
    assert!(a["finishedAt"].as_i64().unwrap() > 0);
}

#[tokio::test]
async fn artifact_download_streams_glb_bytes() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    let job = seed_completed(&store, &workspace, None).await;

    let resp = get(
        &router,
        &format!("/deployments/{DEP}/artifacts/{job}/download"),
    )
    .await;
    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.headers()[axum::http::header::CONTENT_TYPE],
        "model/gltf-binary"
    );
    let disp = resp.headers()[axum::http::header::CONTENT_DISPOSITION]
        .to_str()
        .unwrap()
        .to_string();
    assert!(disp.contains("out.glb"));
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    assert_eq!(&bytes[..], b"GLBDATA");
}

#[tokio::test]
async fn artifact_download_404_for_unknown_job() {
    let pool = fixtures::memory_pool().await;
    let (router, _store, _workspace) = harness(pool);
    let resp = get(
        &router,
        &format!("/deployments/{DEP}/artifacts/nope/download"),
    )
    .await;
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn delete_artifact_clears_ref_but_keeps_run() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    let job = seed_completed(&store, &workspace, None).await;

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/deployments/{DEP}/artifacts/{job}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);

    // Gone from artifacts...
    let (_s, arts) = body_json(get(&router, &format!("/deployments/{DEP}/artifacts")).await).await;
    assert_eq!(arts["total"], 0);
    // ...but the run row is still listed.
    let (_s, runs) = body_json(get(&router, &format!("/deployments/{DEP}/runs")).await).await;
    assert_eq!(runs["total"], 1);
    // The on-disk GLB is removed.
    let row = store.get_job(&job).await.unwrap();
    assert!(row.output_glb_ref.is_none());
}

#[tokio::test]
async fn delete_all_artifacts_reports_count() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    seed_completed(&store, &workspace, None).await;
    seed_completed(&store, &workspace, None).await;

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/deployments/{DEP}/artifacts"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["deleted"], 2);
}

#[tokio::test]
async fn artifacts_zip_bundles_glb_bytes() {
    let pool = fixtures::memory_pool().await;
    let (router, store, workspace) = harness(pool);
    seed_completed(&store, &workspace, None).await;

    let resp = get(&router, &format!("/deployments/{DEP}/artifacts.zip")).await;
    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.headers()[axum::http::header::CONTENT_TYPE],
        "application/zip"
    );
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    // Local-file-header signature `PK\x03\x04`.
    assert_eq!(&bytes[0..4], &[0x50, 0x4b, 0x03, 0x04]);
}

#[tokio::test]
async fn artifacts_zip_404_when_empty() {
    let pool = fixtures::memory_pool().await;
    let (router, _store, _workspace) = harness(pool);
    let resp = get(&router, &format!("/deployments/{DEP}/artifacts.zip")).await;
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}
