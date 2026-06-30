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

/// Build a router over a fresh workspace and return it plus the workspace path
/// and a seeded image's workspace-RELATIVE ref, so `start` (which resolves the
/// ref under the workspace) has a real file to point at.
fn app_with_image(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn faceavatar_extension::backend_client::LeaseFactory>,
) -> (axum::Router, PathBuf, String) {
    let workspace = std::env::temp_dir().join(format!("trellis2-test-{}", ulid::Ulid::new()));
    let uploads = workspace.join("uploads");
    std::fs::create_dir_all(&uploads).unwrap();
    std::fs::write(uploads.join("in.png"), b"PNGDATA").unwrap();
    let router = faceavatar_extension::build_router_with_factory(pool, factory, workspace.clone());
    (router, workspace, "uploads/in.png".to_string())
}

fn app(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn faceavatar_extension::backend_client::LeaseFactory>,
) -> axum::Router {
    app_with_image(pool, factory).0
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
async fn start_requires_image() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));

    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(r#"{"image":"","params":{}}"#))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn start_rejects_image_ref_not_in_workspace() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockGenerationFactory));

    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(r#"{"image":"../etc/passwd","params":{}}"#))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "traversal ref rejected");
}

#[tokio::test]
async fn fake_generation_streams_sse_and_persists_job_and_metadata() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));

    let start_body = serde_json::json!({
        "image": image_ref,
        "params": { "seed": 7, "sparse_steps": 12, "texture": false }
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(start_body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "start response: {body}");
    let job_id = body["jobId"].as_str().expect("jobId present").to_string();

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
    assert_eq!(resp.status(), StatusCode::OK);
    let raw = resp.into_body().collect().await.unwrap().to_bytes();
    let text = String::from_utf8(raw.to_vec()).unwrap();

    let methods: Vec<String> = text
        .lines()
        .filter_map(|l| l.strip_prefix("data:"))
        .filter_map(|d| serde_json::from_str::<Value>(d.trim()).ok())
        .filter_map(|v| v["method"].as_str().map(str::to_string))
        .collect();

    assert!(
        methods.contains(&"trellis2.generate.progress".to_string()),
        "expected progress frame in {methods:?}"
    );
    assert_eq!(
        methods.last().map(String::as_str),
        Some("trellis2.generate.done"),
        "stream must end on done: {methods:?}"
    );

    let done_frame = text
        .lines()
        .filter_map(|l| l.strip_prefix("data:"))
        .filter_map(|d| serde_json::from_str::<Value>(d.trim()).ok())
        .find(|v| v["method"] == "trellis2.generate.done")
        .expect("done frame present");
    assert_eq!(done_frame["params"]["glbRef"], "out.glb");
    assert_eq!(done_frame["params"]["metadata"]["sha256"], "deadbeef");

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/generate/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, job) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(job["status"], "succeeded", "job: {job}");
    assert_eq!(job["metadata"]["sha256"], "deadbeef");
    assert_eq!(job["glbRef"], "out.glb");
    assert_eq!(job["inputImageRef"], image_ref);

    let resp = router
        .oneshot(
            Request::builder()
                .uri("/generate/jobs?limit=10")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, list) = body_json(resp).await;
    assert_eq!(list["jobs"].as_array().unwrap().len(), 1);
}

/// CRIT-1: client-supplied path aliases in `params` must be stripped; the host
/// sets `image` (absolute, from the resolved ref) and `output_path` itself.
#[tokio::test]
async fn start_strips_client_path_aliases() {
    let pool = fixtures::memory_pool().await;
    let (router, _workspace, image_ref) =
        app_with_image(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let start_body = serde_json::json!({
        "image": image_ref,
        "params": {
            "output_path": "/etc/evil.glb",
            "image_path": "/etc/shadow",
            "ref_image_path": "/etc/passwd",
            "seed": 1
        }
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(start_body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "{body}");
    let job_id = body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    let params: Value = serde_json::from_str(&job.params_json).unwrap();
    let out = params["output_path"].as_str().unwrap();
    let img = params["image"].as_str().unwrap();
    assert_ne!(out, "/etc/evil.glb", "client output_path must be stripped");
    assert!(
        out.replace('\\', "/").contains("/meshes/"),
        "host output_path under workspace, got {out}"
    );
    assert!(
        img.replace('\\', "/").ends_with("uploads/in.png"),
        "image is the resolved absolute ref, got {img}"
    );
    assert!(
        std::path::Path::new(img).is_absolute(),
        "image must be absolute for the worker, got {img}"
    );
    assert!(params.get("image_path").is_none());
    assert!(params.get("ref_image_path").is_none());
}

/// Seed `uploads/in.png` AND a `meshes/base.glb` so `/refine/start` (which
/// resolves both the image and mesh refs under the workspace) has real files.
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

#[tokio::test]
async fn refine_requires_mesh() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));

    let body = serde_json::json!({ "image": image_ref, "mesh": "", "params": {} });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/refine/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn refine_rejects_mesh_ref_not_in_workspace() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));

    let body = serde_json::json!({
        "image": image_ref,
        "mesh": "../etc/passwd",
        "params": {}
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/refine/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "traversal mesh ref rejected");
}

/// CRIT-1 for refine: client path aliases are stripped; the host injects
/// absolute `mesh`/`mesh_path`/`image`/`face_image_path` and a host `output_path`.
#[tokio::test]
async fn refine_strips_client_path_aliases_and_injects_host_paths() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let body = serde_json::json!({
        "image": image_ref,
        "mesh": mesh_ref,
        "face_image": "uploads/in.png",
        "params": {
            "output_path": "/etc/evil.glb",
            "image_path": "/etc/shadow",
            "ref_image_path": "/etc/passwd",
            "mesh": "/etc/evil_mesh.glb",
            "mesh_path": "/etc/evil_mesh.glb",
            "face_image_path": "/etc/evil_face.png",
            "resolution": 1024,
            "max_views": 2,
            "seed": 3
        }
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/refine/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, resp_body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "{resp_body}");
    let job_id = resp_body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    let params: Value = serde_json::from_str(&job.params_json).unwrap();

    let out = params["output_path"].as_str().unwrap();
    assert_ne!(out, "/etc/evil.glb", "client output_path must be stripped");
    assert!(
        out.replace('\\', "/").contains("/meshes/"),
        "host output_path under workspace, got {out}"
    );

    let mesh = params["mesh"].as_str().unwrap();
    let mesh_path = params["mesh_path"].as_str().unwrap();
    assert_ne!(mesh, "/etc/evil_mesh.glb", "client mesh must be stripped");
    assert_eq!(mesh, mesh_path, "mesh and mesh_path are the same host path");
    assert!(
        mesh.replace('\\', "/").ends_with("meshes/base.glb"),
        "mesh is the resolved absolute ref, got {mesh}"
    );
    assert!(std::path::Path::new(mesh).is_absolute());

    let img = params["image"].as_str().unwrap();
    assert!(img.replace('\\', "/").ends_with("uploads/in.png"));
    assert!(std::path::Path::new(img).is_absolute());

    let face = params["face_image_path"].as_str().unwrap();
    assert_ne!(face, "/etc/evil_face.png", "client face path must be stripped");
    assert!(face.replace('\\', "/").ends_with("uploads/in.png"));
    assert!(std::path::Path::new(face).is_absolute());

    assert!(params.get("image_path").is_none());
    assert!(params.get("ref_image_path").is_none());
    assert!(params.get("face_image").is_none());
    assert_eq!(params["resolution"], 1024, "tunables pass through");
    assert_eq!(params["max_views"], 2);
}

#[tokio::test]
async fn refine_without_face_image_omits_face_path() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let body = serde_json::json!({ "image": image_ref, "mesh": mesh_ref, "params": {} });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/refine/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, resp_body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "{resp_body}");
    let job_id = resp_body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    let params: Value = serde_json::from_str(&job.params_json).unwrap();
    assert!(
        params.get("face_image_path").is_none(),
        "no face crop -> no face_image_path"
    );
    assert!(params["mesh"].as_str().unwrap().replace('\\', "/").ends_with("meshes/base.glb"));
}

#[tokio::test]
async fn project_requires_mesh() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));

    let body = serde_json::json!({ "image": image_ref, "mesh": "", "params": {} });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/project/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn project_rejects_mesh_ref_not_in_workspace() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(MockGenerationFactory));

    let body = serde_json::json!({
        "image": image_ref,
        "mesh": "../etc/passwd",
        "params": {}
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/project/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "traversal mesh ref rejected");
}

/// CRIT-1 for project: client path aliases are stripped; the host injects
/// absolute `mesh`/`mesh_path`/`image` and a host `output_path`, while projection
/// tunables (`azimuth`/`elevation`/`texture_size`/`residency`) pass through.
#[tokio::test]
async fn project_strips_client_path_aliases_and_injects_host_paths() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool.clone(), Arc::new(MockGenerationFactory));
    let store = faceavatar_extension::storage::Store::new(pool);

    let body = serde_json::json!({
        "image": image_ref,
        "mesh": mesh_ref,
        "params": {
            "output_path": "/etc/evil.glb",
            "image_path": "/etc/shadow",
            "ref_image_path": "/etc/passwd",
            "mesh": "/etc/evil_mesh.glb",
            "mesh_path": "/etc/evil_mesh.glb",
            "azimuth": 45.0,
            "elevation": -15.0,
            "texture_size": 4096,
            "residency": "balanced"
        }
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/project/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, resp_body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "{resp_body}");
    let job_id = resp_body["jobId"].as_str().unwrap().to_string();

    let job = store.get_job(&job_id).await.unwrap();
    let params: Value = serde_json::from_str(&job.params_json).unwrap();

    let out = params["output_path"].as_str().unwrap();
    assert_ne!(out, "/etc/evil.glb", "client output_path must be stripped");
    assert!(
        out.replace('\\', "/").contains("/meshes/"),
        "host output_path under workspace, got {out}"
    );

    let mesh = params["mesh"].as_str().unwrap();
    let mesh_path = params["mesh_path"].as_str().unwrap();
    assert_ne!(mesh, "/etc/evil_mesh.glb", "client mesh must be stripped");
    assert_eq!(mesh, mesh_path, "mesh and mesh_path are the same host path");
    assert!(
        mesh.replace('\\', "/").ends_with("meshes/base.glb"),
        "mesh is the resolved absolute ref, got {mesh}"
    );
    assert!(std::path::Path::new(mesh).is_absolute());

    let img = params["image"].as_str().unwrap();
    assert!(img.replace('\\', "/").ends_with("uploads/in.png"));
    assert!(std::path::Path::new(img).is_absolute());

    assert!(params.get("image_path").is_none());
    assert!(params.get("ref_image_path").is_none());
    assert_eq!(params["azimuth"], 45.0, "tunables pass through");
    assert_eq!(params["elevation"], -15.0);
    assert_eq!(params["texture_size"], 4096);
    assert_eq!(params["residency"], "balanced");
}

#[tokio::test]
async fn project_streams_sse_and_persists_done() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref, mesh_ref) =
        app_with_image_and_mesh(pool, Arc::new(MockGenerationFactory));

    let body = serde_json::json!({ "image": image_ref, "mesh": mesh_ref, "params": {} });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/project/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, resp_body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "{resp_body}");
    let job_id = resp_body["jobId"].as_str().unwrap().to_string();

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"trellis2.generate.progress".to_string()),
        "expected progress frame in {methods:?}"
    );
    assert_eq!(
        methods.last().map(String::as_str),
        Some("trellis2.generate.done"),
        "project stream must end on done: {methods:?}"
    );
}

#[tokio::test]
async fn generation_failure_persists_error_and_emits_error_frame() {
    let pool = fixtures::memory_pool().await;
    let (router, _ws, image_ref) = app_with_image(pool, Arc::new(FailingFactory));

    let start_body = serde_json::json!({ "image": image_ref, "params": {} });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(start_body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, body) = body_json(resp).await;
    let job_id = body["jobId"].as_str().unwrap().to_string();

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
    let text = String::from_utf8(raw.to_vec()).unwrap();
    assert!(
        text.contains("trellis2.generate.error"),
        "expected error frame: {text}"
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

async fn start_generation_with(router: &axum::Router, image: &str, params: Value) -> String {
    let body = serde_json::json!({ "image": image, "params": params });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/generate/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "start response: {body}");
    body["jobId"].as_str().expect("jobId present").to_string()
}

/// A worker process-crash (`WorkerCrashed`) after the GLB is written to the
/// HOST-chosen output_path but before the RPC reply (the GB10 OOM signature)
/// must salvage that GLB and expose it as a workspace-RELATIVE ref.
#[tokio::test]
async fn worker_crash_salvages_completed_glb_as_relative_ref() {
    let pool = fixtures::memory_pool().await;
    let (router, _workspace, image_ref) = app_with_image(pool, Arc::new(CrashingFactory));

    // CrashingLease writes the GLB to the host output_path, then "crashes".
    let job_id = start_generation_with(&router, &image_ref, serde_json::json!({})).await;

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"trellis2.generate.done".to_string()),
        "expected salvage done frame: {methods:?}"
    );
    assert!(
        !methods.contains(&"trellis2.generate.error".to_string()),
        "salvaged generation must not emit an error frame: {methods:?}"
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
    store.create_job(&job_id, "img", "{}").await.unwrap();
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

/// `POST /uploads` returns a workspace-RELATIVE `ref` (`uploads/<digest>.<ext>`)
/// that round-trips through `GET /media/{ref}`.
#[tokio::test]
async fn upload_returns_relative_ref_servable_by_media() {
    let pool = fixtures::memory_pool().await;
    let workspace = std::env::temp_dir().join(format!("trellis2-up-{}", ulid::Ulid::new()));
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
    assert!(media_ref.ends_with(".png"), "ref: {media_ref}");
    assert!(
        !media_ref.contains(':'),
        "ref must not be absolute: {media_ref}"
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
