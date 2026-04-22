//! Contract test for `POST /api/v1/host-models`.
//!
//! The endpoint currently returns `501 NOT_IMPLEMENTED` while the host-install
//! pipeline is wired up. These tests pin the envelope shape so the frontend
//! contract stays stable and a future implementation can only broaden
//! behavior — not silently shift error codes.

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tower::ServiceExt;

async fn build_state() -> AppState {
    let tmp = tempfile::tempdir().expect("tempdir");
    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (extension_registry, _) =
        InMemoryExtensionRegistry::from_directory(tmp.path(), &host_ver, &proto_ver)
            .await
            .expect("empty extension registry");

    let artifact_dir = tmp.path().join("artifacts");
    std::fs::create_dir_all(&artifact_dir).expect("artifact dir");
    let artifact_store = Arc::new(FilesystemArtifactStore::new(artifact_dir));

    let scheduler: Arc<RoundRobinScheduler> = Arc::new(RoundRobinScheduler);
    let run_engine = Arc::new(DefaultRunEngine::new(
        db.clone(),
        worker_manager.clone(),
        artifact_store.clone(),
        event_bus.clone(),
        scheduler.clone(),
    ));

    let backend_event_bus =
        Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(1024));

    AppState {
        health_status_fn: Arc::new(|| serde_json::json!({ "status": "ok" })),
        db,
        event_bus,
        extension_registry: Arc::new(extension_registry),
        run_engine,
        worker_manager,
        scheduler,
        artifact_store,
        extensions_dir: None,
        storage_manager: None,
        backend_adapter_registry: None,
        spawner: None,
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_publisher: backend_event_bus.clone(),
        backend_event_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        extension_router_registry: {
            use nexus_api::extension_router::ExtensionRouterRegistry as _;
            let r = std::sync::Arc::new(nexus_api::extension_router::DefaultRegistry::new());
            r.seal();
            r as nexus_api::extension_router::SharedRegistry
        },
    }
}

async fn call_install(state: AppState, body: serde_json::Value) -> (StatusCode, serde_json::Value) {
    let app = nexus_api::router::build(state);
    let req = Request::builder()
        .method("POST")
        .uri("/api/v1/host-models")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .expect("build request");
    let res = app.oneshot(req).await.expect("route");
    let status = res.status();
    let body_bytes = res.into_body().collect().await.expect("body").to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&body_bytes).unwrap_or_else(|_| {
        panic!(
            "response not valid json: {}",
            String::from_utf8_lossy(&body_bytes)
        )
    });
    (status, json)
}

#[tokio::test]
async fn returns_503_when_huggingface_or_paths_missing() {
    let state = build_state().await;
    let (status, json) = call_install(
        state,
        serde_json::json!({
            "source": "huggingface",
            "repo_id": "TheBloke/Llama-3-8B-GGUF",
            "files": ["llama-3-8b.Q4_K_M.gguf"]
        }),
    )
    .await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE, "body = {json}");
    let code = json["error"]["code"].as_str().unwrap_or("");
    assert!(
        code == "huggingface_unwired" || code == "host_install_unwired",
        "expected service-unavailable code, got {code}",
    );
}

#[tokio::test]
async fn rejects_path_traversal() {
    let state = build_state().await;
    let (status, json) = call_install(
        state,
        serde_json::json!({
            "source": "huggingface",
            "repo_id": "x/y",
            "files": ["../../etc/passwd"]
        }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "body = {json}");
    assert_eq!(json["error"]["code"].as_str(), Some("invalid_request"));
}

#[tokio::test]
async fn rejects_empty_repo_id() {
    let state = build_state().await;
    let (status, json) = call_install(
        state,
        serde_json::json!({
            "source": "huggingface",
            "repo_id": "",
            "files": ["a.gguf"]
        }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "body = {json}");
    assert_eq!(json["error"]["code"].as_str(), Some("invalid_request"));
}

#[tokio::test]
async fn rejects_non_huggingface_source() {
    let state = build_state().await;
    let (status, json) = call_install(
        state,
        serde_json::json!({
            "source": "local_fs",
            "repo_id": "x",
            "files": ["a.gguf"]
        }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "body = {json}");
    assert_eq!(json["error"]["code"].as_str(), Some("invalid_request"));
}

#[tokio::test]
async fn rejects_empty_files_list() {
    let state = build_state().await;
    let (status, json) = call_install(
        state,
        serde_json::json!({
            "source": "huggingface",
            "repo_id": "x",
            "files": []
        }),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST, "body = {json}");
    assert_eq!(json["error"]["code"].as_str(), Some("invalid_request"));
}
