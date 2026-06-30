mod fixtures;

use std::path::PathBuf;
use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt;

use fixtures::mock_lease::{CrashingFactory, FailingFactory, MockGenerationFactory};

async fn body_json(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

/// Build a router over a fresh workspace + a seeded photo's workspace-RELATIVE
/// ref, so `start` (which resolves the ref under the workspace) has a real file.
fn app_with_image(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn faceavatar_extension::backend_client::LeaseFactory>,
) -> (axum::Router, PathBuf, String) {
    let workspace = std::env::temp_dir().join(format!("faceavatar-test-{}", ulid::Ulid::new()));
    let uploads = workspace.join("uploads");
    std::fs::create_dir_all(&uploads).unwrap();
    std::fs::write(uploads.join("in.png"), b"PNGDATA").unwrap();
    let router = faceavatar_extension::build_router_with_factory(pool, factory, workspace.clone());
    (router, workspace, "uploads/in.png".to_string())
}

/// Seed `uploads/in.png` AND a `meshes/base.glb` so `/graft/start` (which
/// resolves both the image and `base_mesh` refs under the workspace) has real files.
fn app_with_image_and_mesh(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn faceavatar_extension::backend_client::LeaseFactory>,
) -> (axum::Router, PathBuf, String, String) {
    let (router, workspace, image_ref) = app_with_image(pool, factory);
    let meshes = workspace.join("meshes");
    std::fs::create_dir_all(&meshes).unwrap();
    std::fs::write(meshes.join("base.glb"), b"GLBDATA").unwrap();
    (router, workspace, image_ref, "meshes/base.glb".to_string())
}

fn app(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn faceavatar_extension::backend_client::LeaseFactory>,
) -> axum::Router {
    app_with_image(pool, factory).0
}

async fn sse_methods(router: &axum::Router, job_id: &str) -> Vec<String> {
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/generate/jobs/{job_id}/events"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let raw = resp.into_body().collect().await.unwrap().to_bytes();
    String::from_utf8(raw.to_vec())
        .unwrap()
        .lines()
        .filter_map(|l| l.strip_prefix("data:"))
        .filter_map(|d| serde_json::from_str::<Value>(d.trim()).ok())
        .filter_map(|v| v["method"].as_str().map(str::to_string))
        .collect()
}

async fn post_json(router: &axum::Router, uri: &str, body: Value) -> (StatusCode, Value) {
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(uri)
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    body_json(resp).await
}

#[tokio::test]
async fn capabilities_returns_503_when_worker_not_running() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));
    let resp = router
        .oneshot(
            Request::builder()
                .uri("/capabilities")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
}

#[tokio::test]
async fn generate_head_requires_image() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));
    let (status, _b) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({ "image": "", "params": {} }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn generate_head_rejects_image_ref_not_in_workspace() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));
    let (status, _b) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({ "image": "../etc/passwd", "params": {} }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "traversal ref rejected");
}

#[tokio::test]
async fn generate_head_streams_sse_and_persists_job_metadata_and_operation() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let (status, body) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({ "image": image_ref, "params": { "seed": 7, "expression": "neutral", "texture": false } }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "start response: {body}");
    let job_id = body["jobId"].as_str().expect("jobId present").to_string();

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"faceavatar.generate.progress".to_string()),
        "expected progress frame in {methods:?}"
    );
    assert_eq!(
        methods.last().map(String::as_str),
        Some("faceavatar.generate.done"),
        "stream must end on done: {methods:?}"
    );

    let job = store.get_job(&job_id).await.unwrap().into_dto();
    assert_eq!(job.status, "succeeded");
    assert_eq!(job.operation, "generate");
    assert_eq!(job.metadata.unwrap()["sha256"], "deadbeef");
    assert_eq!(job.glb_ref.as_deref(), Some("out.glb"));
}

/// Client-supplied path aliases must be stripped; the host sets `image`
/// (absolute) and `output_path` itself.
#[tokio::test]
async fn generate_head_strips_client_path_aliases() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let (status, body) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({
            "image": image_ref,
            "params": { "output_path": "/etc/evil.glb", "image_path": "/etc/shadow", "seed": 1 }
        }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{body}");
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    let params: Value = serde_json::from_str(&job.params_json).unwrap();
    let out = params["output_path"].as_str().unwrap();
    let img = params["image"].as_str().unwrap();
    assert_ne!(out, "/etc/evil.glb", "client output_path stripped");
    assert!(
        out.replace('\\', "/").contains("/meshes/"),
        "host output_path, got {out}"
    );
    assert!(img.replace('\\', "/").ends_with("uploads/in.png"));
    assert!(std::path::Path::new(img).is_absolute());
    assert!(params.get("image_path").is_none());
}

#[tokio::test]
async fn graft_head_requires_base_mesh() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));
    let (status, _b) = post_json(
        &router,
        "/graft/start",
        serde_json::json!({ "image": image_ref, "base_mesh": "", "params": {} }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn graft_head_rejects_base_mesh_ref_not_in_workspace() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));
    let (status, _b) = post_json(
        &router,
        "/graft/start",
        serde_json::json!({ "image": image_ref, "base_mesh": "../etc/passwd", "params": {} }),
    )
    .await;
    assert_eq!(
        status,
        StatusCode::BAD_REQUEST,
        "traversal base_mesh ref rejected"
    );
}

/// graft strips client path aliases and injects absolute
/// `base_mesh`/`base_mesh_path`/`image` + a host `output_path`, while graft knobs
/// pass through.
#[tokio::test]
async fn graft_head_strips_aliases_injects_host_paths_and_persists_operation() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let (status, body) = post_json(
        &router,
        "/graft/start",
        serde_json::json!({
            "image": image_ref,
            "base_mesh": mesh_ref,
            "params": {
                "output_path": "/etc/evil.glb",
                "image_path": "/etc/shadow",
                "base_mesh": "/etc/evil_mesh.glb",
                "base_mesh_path": "/etc/evil_mesh.glb",
                "seam": "neck",
                "keep_hair": true,
                "blend_ring": 0.4,
                "align": "landmark",
                "texture_blend": true,
                "seed": 3
            }
        }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{body}");
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    assert_eq!(job.operation, "graft");
    let params: Value = serde_json::from_str(&job.params_json).unwrap();

    let out = params["output_path"].as_str().unwrap();
    assert_ne!(out, "/etc/evil.glb", "client output_path stripped");
    assert!(
        out.replace('\\', "/").contains("/meshes/"),
        "host output_path, got {out}"
    );

    let mesh = params["base_mesh"].as_str().unwrap();
    let mesh_path = params["base_mesh_path"].as_str().unwrap();
    assert_ne!(mesh, "/etc/evil_mesh.glb", "client base_mesh stripped");
    assert_eq!(
        mesh, mesh_path,
        "base_mesh and base_mesh_path are the same host path"
    );
    assert!(
        mesh.replace('\\', "/").ends_with("meshes/base.glb"),
        "resolved abs ref, got {mesh}"
    );
    assert!(std::path::Path::new(mesh).is_absolute());

    let img = params["image"].as_str().unwrap();
    assert!(img.replace('\\', "/").ends_with("uploads/in.png"));
    assert!(std::path::Path::new(img).is_absolute());

    assert!(params.get("image_path").is_none());
    // Graft knobs pass through untouched.
    assert_eq!(params["seam"], "neck");
    assert_eq!(params["keep_hair"], true);
    assert_eq!(params["blend_ring"], 0.4);
    assert_eq!(params["align"], "landmark");
    assert_eq!(params["texture_blend"], true);
}

#[tokio::test]
async fn graft_head_streams_sse_and_persists_done() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool, Arc::new(MockGenerationFactory));

    let (status, body) = post_json(
        &router,
        "/graft/start",
        serde_json::json!({ "image": image_ref, "base_mesh": mesh_ref, "params": {} }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{body}");
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"faceavatar.generate.progress".to_string()),
        "{methods:?}"
    );
    assert_eq!(
        methods.last().map(String::as_str),
        Some("faceavatar.generate.done"),
        "graft stream must end on done: {methods:?}"
    );
}

#[tokio::test]
async fn generation_failure_persists_error_and_emits_error_frame() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(FailingFactory));

    let (_status, body) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({ "image": image_ref, "params": {} }),
    )
    .await;
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"faceavatar.generate.error".to_string()),
        "expected error frame: {methods:?}"
    );

    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/generate/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, job) = body_json(resp).await;
    assert_eq!(job["status"], "failed");
    assert_eq!(job["errorCode"], -32101, "job: {job}");
    assert!(job["errorMessage"]
        .as_str()
        .unwrap()
        .contains("MODEL_MISSING"));
}

/// A worker process-crash after the GLB is written to the HOST-chosen
/// `output_path` but before the RPC reply must salvage that GLB.
#[tokio::test]
async fn worker_crash_salvages_completed_glb_as_relative_ref() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(CrashingFactory));

    let (status, body) = post_json(
        &router,
        "/generate/start",
        serde_json::json!({ "image": image_ref, "params": {} }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "{body}");
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"faceavatar.generate.done".to_string()),
        "salvage done: {methods:?}"
    );
    assert!(
        !methods.contains(&"faceavatar.generate.error".to_string()),
        "no error frame: {methods:?}"
    );

    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/generate/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, job) = body_json(resp).await;
    assert_eq!(job["status"], "succeeded", "job: {job}");
    let glb = job["glbRef"].as_str().unwrap();
    assert!(
        glb.starts_with("meshes/") && glb.ends_with("out.glb"),
        "relative salvaged ref, got {glb}"
    );
    assert!(!glb.contains(':'), "ref must be relative, got {glb}");
}

#[tokio::test]
async fn cancel_marks_job_cancelled() {
    let pool = fixtures::memory_pool().await;
    let store = faceavatar_extension::storage::Store::new(pool.clone());
    let job_id = faceavatar_extension::domain::JobId::new();
    store
        .create_job(&job_id, "generate", "img", "{}")
        .await
        .unwrap();
    store.mark_running(&job_id).await.unwrap();

    let router = app(pool, Arc::new(MockGenerationFactory));
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!("/generate/jobs/{job_id}/cancel"))
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["status"], "cancelled");

    let dto = store.get_job(job_id.as_str()).await.unwrap().into_dto();
    assert_eq!(dto.status, "cancelled");
}

#[tokio::test]
async fn cancel_rejects_invalid_job_id() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/jobs/bad..id/cancel")
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "invalid id rejected");
}

/// `POST /uploads` returns a workspace-RELATIVE `ref` that round-trips through
/// `GET /media/{ref}`.
#[tokio::test]
async fn upload_returns_relative_ref_servable_by_media() {
    let pool = fixtures::memory_pool().await;
    let workspace = std::env::temp_dir().join(format!("faceavatar-up-{}", ulid::Ulid::new()));
    std::fs::create_dir_all(&workspace).unwrap();
    let router = faceavatar_extension::build_router_with_factory(
        pool,
        Arc::new(MockGenerationFactory),
        workspace,
    );

    let boundary = "X-BOUNDARY";
    let body = format!(
        "--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"in.png\"\r\nContent-Type: image/png\r\n\r\nPNGDATA\r\n--{boundary}--\r\n"
    );
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/uploads")
                .header(
                    "content-type",
                    format!("multipart/form-data; boundary={boundary}"),
                )
                .body(Body::from(body))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, json) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "upload: {json}");
    let media_ref = json["ref"].as_str().expect("ref present").to_string();
    assert!(
        media_ref.starts_with("uploads/"),
        "relative ref: {media_ref}"
    );
    assert!(
        std::path::Path::new(&media_ref)
            .extension()
            .is_some_and(|e| e.eq_ignore_ascii_case("png")),
        "ref: {media_ref}"
    );

    let encoded = urlencoding::encode(&media_ref).into_owned();
    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/media/{encoded}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(
        resp.status(),
        StatusCode::OK,
        "media must serve uploaded ref"
    );
}
