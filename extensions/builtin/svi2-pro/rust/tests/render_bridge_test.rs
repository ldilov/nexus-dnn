mod fixtures;

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt;

use fixtures::mock_lease::{CrashingFactory, FailingFactory, MockRenderFactory};

async fn body_json(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

fn app(
    pool: sqlx::SqlitePool,
    factory: Arc<dyn svi2_pro_extension::backend_client::LeaseFactory>,
) -> axum::Router {
    let workspace = std::env::temp_dir().join(format!("svi2-test-{}", ulid::Ulid::new()));
    std::fs::create_dir_all(&workspace).unwrap();
    svi2_pro_extension::build_router_with_factory(pool, factory, workspace)
}

#[tokio::test]
async fn attention_capabilities_proxies_worker_when_running() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockRenderFactory));

    // Warm the worker via a route that legitimately spawns it; capabilities
    // itself must never spawn, so it only answers once a lease is up.
    let warm = router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/presets")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(warm.status(), StatusCode::OK);

    let resp = router
        .oneshot(
            Request::builder()
                .uri("/capabilities/attention")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert!(
        body["backends"].is_array(),
        "expected backends array, got: {body}"
    );
    assert_eq!(body["default"], "flash2");
    let ids: Vec<&str> = body["backends"]
        .as_array()
        .unwrap()
        .iter()
        .filter_map(|b| b["id"].as_str())
        .collect();
    assert!(ids.contains(&"sdpa"), "sdpa missing from {ids:?}");
    assert!(ids.contains(&"flash2"), "flash2 missing from {ids:?}");
}

#[tokio::test]
async fn attention_capabilities_returns_503_when_worker_not_running() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockRenderFactory));

    // No prior call warmed the worker, so the provider holds no lease. The
    // route must report unavailable without booting one.
    let resp = router
        .oneshot(
            Request::builder()
                .uri("/capabilities/attention")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, _body) = body_json(resp).await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
}

#[tokio::test]
async fn presets_route_proxies_worker() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockRenderFactory));

    let resp = router
        .oneshot(
            Request::builder()
                .uri("/presets")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["presets"][0]["id"], "svi-canonical");
}

#[tokio::test]
async fn fake_render_through_bridge_streams_sse_and_persists_job_and_report() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(MockRenderFactory));

    // 1. POST /render/start → { jobId }
    let start_body = serde_json::json!({
        "presetId": "svi-canonical",
        "params": { "prompts": ["a coherent motion prompt"], "ref_image_path": "ref.png", "num_clips": 2 }
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/render/start")
                .header("content-type", "application/json")
                .body(Body::from(start_body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK, "start response: {body}");
    let job_id = body["jobId"].as_str().expect("jobId present").to_string();

    // 2. GET /render/jobs/{id}/events (SSE) → drive the worker, collect frames.
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}/events"))
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
        methods.contains(&"svi2.video.clip.started".to_string()),
        "expected clip.started in {methods:?}"
    );
    assert!(
        methods.contains(&"svi2.video.clip.step".to_string()),
        "expected clip.step in {methods:?}"
    );
    assert_eq!(
        methods.last().map(String::as_str),
        Some("svi2.video.done"),
        "stream must end on done: {methods:?}"
    );

    // 3. The job + report are persisted (status succeeded).
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, job) = body_json(resp).await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(job["status"], "succeeded", "job: {job}");
    assert_eq!(job["renderReport"]["sha256"], "deadbeef");
    assert_eq!(job["outputPath"], "out.mp4");

    // 4. History list includes the job.
    let resp = router
        .oneshot(
            Request::builder()
                .uri("/render/jobs?limit=10")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, list) = body_json(resp).await;
    assert_eq!(list["jobs"].as_array().unwrap().len(), 1);
}

#[tokio::test]
async fn render_failure_persists_error_fields_and_emits_error_frame() {
    let pool = fixtures::memory_pool().await;
    let router = app(pool, Arc::new(FailingFactory));

    let start_body = serde_json::json!({
        "params": { "prompts": ["x"], "ref_image_path": "ref.png" }
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/render/start")
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
                .uri(format!("/render/jobs/{job_id}/events"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let raw = resp.into_body().collect().await.unwrap().to_bytes();
    let text = String::from_utf8(raw.to_vec()).unwrap();
    assert!(
        text.contains("svi2.video.error"),
        "expected error frame: {text}"
    );

    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, job) = body_json(resp).await;
    assert_eq!(job["status"], "failed");
    assert_eq!(job["errorCode"], -32103);
}

async fn sse_methods(router: &axum::Router, job_id: &str) -> Vec<String> {
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}/events"))
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

async fn start_render_with(router: &axum::Router, params: Value) -> String {
    let body = serde_json::json!({ "params": params });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/render/start")
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

/// A worker process-crash (`WorkerCrashed`) AFTER the output is fully written
/// but BEFORE `render_report.json` is created (the real GB10 OOM signature)
/// must salvage the newest complete mp4 — Tier B — not discard the render.
#[tokio::test]
async fn worker_crash_salvages_newest_output_without_report() {
    let pool = fixtures::memory_pool().await;
    let workspace = std::env::temp_dir().join(format!("svi2-salvage-b-{}", ulid::Ulid::new()));
    let render_dir = workspace.join("renders").join("job");
    std::fs::create_dir_all(&render_dir).unwrap();
    // Sub-threshold base render is ignored; the completed upscale is recovered.
    std::fs::write(render_dir.join("out.mp4"), vec![0u8; 1024]).unwrap();
    std::thread::sleep(std::time::Duration::from_millis(50));
    std::fs::write(render_dir.join("out_swinir_l_x2.mp4"), vec![0u8; 8192]).unwrap();

    let router = svi2_pro_extension::build_router_with_factory(
        pool,
        Arc::new(CrashingFactory),
        workspace.clone(),
    );
    let out_path = render_dir.join("out.mp4").to_string_lossy().into_owned();
    let job_id = start_render_with(
        &router,
        serde_json::json!({ "prompts": ["x"], "ref_image_path": "ref.png", "output_path": out_path }),
    )
    .await;

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"svi2.video.done".to_string()),
        "expected salvage done frame: {methods:?}"
    );
    assert!(
        !methods.contains(&"svi2.video.error".to_string()),
        "salvaged render must not emit an error frame: {methods:?}"
    );

    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, job) = body_json(resp).await;
    assert_eq!(job["status"], "succeeded", "job: {job}");
    assert!(
        job["outputPath"]
            .as_str()
            .unwrap()
            .ends_with("out_swinir_l_x2.mp4"),
        "expected upscaled output salvaged, got {}",
        job["outputPath"]
    );
}

/// When `render_report.json` IS present (Tier A), salvage uses it verbatim —
/// authoritative output path plus the persisted report.
#[tokio::test]
async fn worker_crash_salvages_via_render_report() {
    let pool = fixtures::memory_pool().await;
    let workspace = std::env::temp_dir().join(format!("svi2-salvage-a-{}", ulid::Ulid::new()));
    let render_dir = workspace.join("renders").join("job");
    std::fs::create_dir_all(&render_dir).unwrap();
    let final_path = render_dir.join("out_final.mp4");
    std::fs::write(&final_path, vec![0u8; 8192]).unwrap();
    let report = serde_json::json!({
        "output_path": final_path.to_string_lossy(),
        "frames": 245,
        "upscale_factor": 2,
    });
    std::fs::write(
        render_dir.join("render_report.json"),
        serde_json::to_string(&report).unwrap(),
    )
    .unwrap();

    let router = svi2_pro_extension::build_router_with_factory(
        pool,
        Arc::new(CrashingFactory),
        workspace.clone(),
    );
    let out_path = render_dir.join("out.mp4").to_string_lossy().into_owned();
    let job_id = start_render_with(
        &router,
        serde_json::json!({ "prompts": ["x"], "ref_image_path": "ref.png", "output_path": out_path }),
    )
    .await;

    let methods = sse_methods(&router, &job_id).await;
    assert!(
        methods.contains(&"svi2.video.done".to_string()),
        "{methods:?}"
    );

    let resp = router
        .oneshot(
            Request::builder()
                .uri(format!("/render/jobs/{job_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (_, job) = body_json(resp).await;
    assert_eq!(job["status"], "succeeded", "job: {job}");
    assert!(
        job["outputPath"]
            .as_str()
            .unwrap()
            .ends_with("out_final.mp4"),
        "got {}",
        job["outputPath"]
    );
    assert_eq!(
        job["renderReport"]["frames"], 245,
        "report persisted: {job}"
    );
}

#[tokio::test]
async fn cancel_marks_job_cancelled() {
    let pool = fixtures::memory_pool().await;
    let store = svi2_pro_extension::storage::Store::new(pool.clone());
    let job_id = svi2_pro_extension::domain::JobId::new();
    store
        .create_job(&job_id, None, "{}", "0.1.0")
        .await
        .unwrap();
    store.mark_running(&job_id).await.unwrap();

    let router = app(pool, Arc::new(MockRenderFactory));
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!("/render/jobs/{job_id}/cancel"))
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
