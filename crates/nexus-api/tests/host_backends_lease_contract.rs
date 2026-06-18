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
    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let ext_dir = tempfile::tempdir().expect("tempdir");
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (extension_registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .expect("empty extension registry");

    let artifact_dir = ext_dir.path().join("artifacts");
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

    let backend_event_bus = Arc::new(nexus_backend_runtimes::events::BackendEventBus::new(1024));

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
        civitai: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        civitai_token_store: None,
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
        family_handlers:
            nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry::new(),
        pipeline_events: {
            let (tx, _) = tokio::sync::broadcast::channel(nexus_api::PIPELINE_EVENT_CAPACITY);
            std::sync::Arc::new(tx)
        },
        lease_manager: std::sync::Arc::new(
            nexus_backend_runtimes::generic::leases::LeaseManager::new(),
        ),
        dep_handler_registry: None,
        dep_install_state: std::sync::Arc::new(dashmap::DashMap::new()),
        dep_runtime_bootstrapper: None,
        dep_model_store: None,
        dep_worker_handshake: None,
        dep_fetch_artifact: None,
        dep_host_data_dir: None,
    }
}

fn lease_body() -> Body {
    Body::from(
        serde_json::to_vec(&serde_json::json!({
            "args": ["--model", "/tmp/model.gguf", "-ngl", "999"],
            "env": { "LLAMA_ARG_THREADS": "8" },
            "bind_mode": "loopback",
            "port_hint": null
        }))
        .expect("json"),
    )
}

async fn collect_body(body: Body) -> serde_json::Value {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
}

#[tokio::test]
async fn happy_path_returns_202_with_lease_envelope() {
    let state = build_state().await;
    let router = nexus_api::create_router(state);

    let request = Request::builder()
        .method("POST")
        .uri("/api/v1/backends/ri_9f3a1c2e/lease")
        .header("Content-Type", "application/json")
        .header("X-Extension-Id", "ext.test")
        .body(lease_body())
        .expect("request");

    let response = router.oneshot(request).await.expect("oneshot");

    assert_eq!(
        response.status(),
        StatusCode::ACCEPTED,
        "expected 202 Accepted for a valid spawn request"
    );

    let body = collect_body(response.into_body()).await;

    assert_eq!(
        body["data"]["lease"]["install_id"], "ri_9f3a1c2e",
        "install_id must echo the path param"
    );
    assert_eq!(
        body["data"]["lease"]["extension_id"], "ext.test",
        "extension_id must reflect X-Extension-Id header"
    );

    let lease_id = body["data"]["lease"]["lease_id"].as_str().unwrap_or("");
    assert!(
        !lease_id.is_empty(),
        "lease_id must be present and non-empty"
    );

    assert!(
        body["data"]["lease"]["pid"].is_number(),
        "pid must be a number"
    );

    let channel = &body["data"]["lease"]["channel"];
    assert_eq!(
        channel["kind"]["kind"], "http_tcp",
        "channel.kind is an internally-tagged enum serialized as {{\"kind\":\"http_tcp\"}}"
    );

    let dialects = channel["api_dialects"]
        .as_array()
        .expect("api_dialects must be an array");
    assert!(
        dialects
            .iter()
            .any(|d| d["dialect"].as_str() == Some("open_ai_compatible")),
        "api_dialects must contain open_ai_compatible (internally-tagged)"
    );
    assert!(
        dialects
            .iter()
            .any(|d| d["dialect"].as_str() == Some("native_llama_server")),
        "api_dialects must contain native_llama_server (internally-tagged)"
    );

    assert!(
        channel["address"]["host"].is_string(),
        "channel.address.host must be present"
    );
    assert!(
        channel["address"]["port"].is_number(),
        "channel.address.port must be present"
    );

    assert_eq!(
        channel["health"]["path"], "/health",
        "health path must be /health per spec"
    );

    assert_eq!(
        channel["ready"], false,
        "channel must not be ready at spawn time"
    );

    let progress_channel = body["data"]["progress_channel"].as_str().unwrap_or("");
    assert!(
        progress_channel.starts_with("runtime:lease:"),
        "progress_channel must be 'runtime:lease:<lease_id>', got {progress_channel}"
    );
}

#[tokio::test]
async fn needs_repair_install_returns_409_runtime_needs_repair() {
    let state = build_state().await;
    sqlx::query(
        "INSERT INTO host_runtime_installs \
         (install_id, family, version, accelerator, install_root, binary_paths, state, \
          created_at, updated_at) \
         VALUES ('ri_needs_repair','llama.cpp','b1','cpu','/tmp','[]','needs_repair','t','t')",
    )
    .execute(state.db.pool())
    .await
    .expect("seed needs_repair row");
    let router = nexus_api::create_router(state);

    let request = Request::builder()
        .method("POST")
        .uri("/api/v1/backends/ri_needs_repair/lease")
        .header("Content-Type", "application/json")
        .header("X-Extension-Id", "ext.test")
        .body(lease_body())
        .expect("request");

    let response = router.oneshot(request).await.expect("oneshot");

    assert_eq!(
        response.status(),
        StatusCode::CONFLICT,
        "expected 409 Conflict when install is in needs_repair state"
    );

    let body = collect_body(response.into_body()).await;

    assert_eq!(
        body["error"]["code"], "RUNTIME_NEEDS_REPAIR",
        "error code must be RUNTIME_NEEDS_REPAIR per contract spec"
    );
    assert_eq!(
        body["error"]["category"], "state",
        "error category must be 'state'"
    );
    assert!(
        body["data"].is_null(),
        "data must be null on error response"
    );
}
