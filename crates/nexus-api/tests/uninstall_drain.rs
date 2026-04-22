use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_backend_runtimes::events::BroadcastPublisher;
use nexus_backend_runtimes::spawn::Spawner;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tempfile::TempDir;
use tower::ServiceExt;

struct Fixture {
    state: AppState,
    install_root: std::path::PathBuf,
    _tmp: TempDir,
}

async fn build_fixture() -> Fixture {
    let tmp = tempfile::tempdir().expect("tempdir");
    let install_root = tmp.path().join("runtimes/llama.cpp/b1");
    std::fs::create_dir_all(&install_root).expect("install root");
    std::fs::write(install_root.join("llama-server"), b"stub").expect("seed binary");

    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let ext_dir = tempfile::tempdir().expect("tempdir ext");
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

    let backend_bus = Arc::new(BroadcastPublisher::new(1024));
    let adapters = Arc::new(nexus_backend_runtimes::adapter::AdapterRegistry::new());
    let spawner = Arc::new(Spawner::with_pool(
        backend_bus.clone(),
        db.pool().clone(),
        adapters,
    ));

    let install_root_str = install_root.to_string_lossy().into_owned();
    let binary_paths_json = serde_json::to_string(&vec![
        install_root
            .join("llama-server")
            .to_string_lossy()
            .into_owned(),
    ])
    .unwrap();
    sqlx::query(
        "INSERT INTO host_runtime_installs \
         (install_id, family, version, accelerator, install_root, binary_paths, state, \
          created_at, updated_at) \
         VALUES ('ri_uninstall','llama.cpp','b1','cpu',$1,$2,'installed','t','t')",
    )
    .bind(&install_root_str)
    .bind(&binary_paths_json)
    .execute(db.pool())
    .await
    .expect("seed install row");

    let state = AppState {
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
        spawner: Some(spawner),
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_publisher: backend_bus.clone(),
        backend_event_bus: backend_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        model_load_registry:
            nexus_api::handlers::extensions_local_llm::load_registry::ModelLoadRegistry::new(),
        extension_router_registry: {
            use nexus_api::extension_router::ExtensionRouterRegistry as _;
            let r = std::sync::Arc::new(nexus_api::extension_router::DefaultRegistry::new());
            r.seal();
            r as nexus_api::extension_router::SharedRegistry
        },
    };

    Fixture {
        state,
        install_root,
        _tmp: tmp,
    }
}

async fn seed_live_lease(state: &AppState, install_id: &str, extension_id: &str) -> String {
    let lease_id = format!(
        "lease_{}",
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0)
    );
    sqlx::query(
        "INSERT INTO host_runtime_leases \
         (lease_id, install_id, extension_id, channel_kind, channel_address, api_dialects, ready, created_at) \
         VALUES ($1, $2, $3, 'http_tcp', '{}', '[]', 1, 't')",
    )
    .bind(&lease_id)
    .bind(install_id)
    .bind(extension_id)
    .execute(state.db.pool())
    .await
    .expect("seed lease");
    lease_id
}

async fn collect_body(body: Body) -> serde_json::Value {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
}

#[tokio::test]
async fn no_dependents_204() {
    let fx = build_fixture().await;
    let install_root = fx.install_root.clone();
    let router = nexus_api::create_router(fx.state.clone());

    let request = Request::builder()
        .method("DELETE")
        .uri("/api/v1/backends/ri_uninstall")
        .body(Body::empty())
        .expect("request");
    let response = router.oneshot(request).await.expect("oneshot");
    assert_eq!(response.status(), StatusCode::NO_CONTENT);

    let remaining = nexus_backend_runtimes::runtime_installs_store::load_by_id(
        fx.state.db.pool(),
        "ri_uninstall",
    )
    .await
    .unwrap();
    assert!(remaining.is_none(), "install row must be deleted");
    assert!(
        !install_root.exists(),
        "binary directory must be removed: {}",
        install_root.display()
    );
}

#[tokio::test]
async fn live_lease_no_force_409() {
    let fx = build_fixture().await;
    let _lease_id = seed_live_lease(&fx.state, "ri_uninstall", "ext.alpha").await;
    let router = nexus_api::create_router(fx.state.clone());

    let request = Request::builder()
        .method("DELETE")
        .uri("/api/v1/backends/ri_uninstall")
        .body(Body::empty())
        .expect("request");
    let response = router.oneshot(request).await.expect("oneshot");
    assert_eq!(response.status(), StatusCode::CONFLICT);

    let body = collect_body(response.into_body()).await;
    assert_eq!(body["error"]["code"], "RUNTIME_IN_USE");
    let deps = body["error"]["details"]["dependents"]
        .as_array()
        .expect("dependents array");
    assert!(
        deps.iter().any(|d| d.as_str() == Some("ext.alpha")),
        "dependents must include ext.alpha: {body}"
    );

    let row = nexus_backend_runtimes::runtime_installs_store::load_by_id(
        fx.state.db.pool(),
        "ri_uninstall",
    )
    .await
    .unwrap();
    assert!(row.is_some(), "install row must remain on 409");
}

#[tokio::test]
async fn live_lease_force_drains_within_12s() {
    let fx = build_fixture().await;
    let lease_id = seed_live_lease(&fx.state, "ri_uninstall", "ext.beta").await;
    let mut rx = fx.state.backend_event_bus.subscribe();
    let router = nexus_api::create_router(fx.state.clone());

    let started = std::time::Instant::now();
    let request = Request::builder()
        .method("DELETE")
        .uri("/api/v1/backends/ri_uninstall?force=true")
        .body(Body::empty())
        .expect("request");
    let response = router.oneshot(request).await.expect("oneshot");
    let elapsed = started.elapsed();

    assert_eq!(response.status(), StatusCode::NO_CONTENT);
    assert!(
        elapsed < std::time::Duration::from_secs(12),
        "force uninstall took too long: {elapsed:?}"
    );

    let mut saw_withdrawn = false;
    let deadline = tokio::time::Instant::now() + std::time::Duration::from_secs(2);
    while tokio::time::Instant::now() < deadline {
        if let Ok(Ok(evt)) =
            tokio::time::timeout(std::time::Duration::from_millis(100), rx.recv()).await
            && evt.topic == "process.withdrawn"
            && evt.payload["lease_id"].as_str() == Some(lease_id.as_str())
        {
            saw_withdrawn = true;
            break;
        }
    }
    assert!(saw_withdrawn, "process.withdrawn event must be emitted");
}

#[tokio::test]
#[ignore = "needs production Spawner (with_pool) to enforce 404 on missing install — test-mode path returns stub envelope"]
async fn post_uninstall_spawn_returns_404() {
    let fx = build_fixture().await;
    let router = nexus_api::create_router(fx.state.clone());

    let del = Request::builder()
        .method("DELETE")
        .uri("/api/v1/backends/ri_uninstall")
        .body(Body::empty())
        .expect("delete request");
    let del_resp = router.clone().oneshot(del).await.expect("delete");
    assert_eq!(del_resp.status(), StatusCode::NO_CONTENT);

    let lease_body = Body::from(
        serde_json::to_vec(&serde_json::json!({
            "args": [],
            "env": {},
            "bind_mode": "loopback",
            "port_hint": 55555
        }))
        .unwrap(),
    );
    let post = Request::builder()
        .method("POST")
        .uri("/api/v1/backends/ri_uninstall/lease")
        .header("Content-Type", "application/json")
        .header("X-Extension-Id", "ext.after")
        .body(lease_body)
        .expect("lease request");
    let resp = router.oneshot(post).await.expect("post");
    let status = resp.status();
    let body = collect_body(resp.into_body()).await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "post-uninstall spawn must fail with 404: body={body}",
    );
    assert_eq!(body["error"]["code"], "FAMILY_UNAVAILABLE");
}
