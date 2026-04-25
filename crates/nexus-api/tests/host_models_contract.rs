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

async fn seed_install(db: &SqliteDatabase, install_id: &str, private: bool, owner: Option<&str>) {
    let now = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
         install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
         source_url, license_spdx, license_url, private_model, owner_extension_id, created_at, \
         updated_at) VALUES ($1,'llama','3-8b','Q4_K_M','default','/t','[]',$2,$2,'ready',\
         'huggingface','hf://meta/llama-3-8b','apache-2.0','https://spdx.org/licenses/Apache-2.0',\
         $3,$4,$5,$5)",
    )
    .bind(install_id)
    .bind(format!("sha-{install_id}"))
    .bind(private as i64)
    .bind(owner)
    .bind(&now)
    .execute(db.pool())
    .await
    .expect("seed install");
}

async fn collect_body(body: Body) -> serde_json::Value {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
}

async fn count_rows(db: &SqliteDatabase) -> i64 {
    use sqlx::Row;
    sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(db.pool())
        .await
        .unwrap()
        .try_get("n")
        .unwrap()
}

#[tokio::test]
async fn list_host_models_includes_license_source_and_sha() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let router = nexus_api::create_router(state);
    let request = Request::builder()
        .uri("/api/v1/host-models")
        .body(Body::empty())
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let first = &body["data"]["installs"][0];
    assert_eq!(first["install_id"], "pub-1");
    assert_eq!(first["license_spdx"], "apache-2.0");
    assert!(first["license_url"].is_string());
    assert!(first["sha256_root"].is_string());
    assert_eq!(first["source_kind"], "huggingface");
    assert!(first["source_url"].is_string());
    assert!(first["source_revision"].is_string());
}

#[tokio::test]
async fn private_model_hidden_from_anonymous_listing() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;
    seed_install(&state.db, "priv-1", true, Some("ext-alpha")).await;

    let router = nexus_api::create_router(state);
    let request = Request::builder()
        .uri("/api/v1/host-models")
        .body(Body::empty())
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    let body = collect_body(response.into_body()).await;
    let ids: Vec<&str> = body["data"]["installs"]
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v["install_id"].as_str().unwrap())
        .collect();
    assert!(ids.contains(&"pub-1"));
    assert!(!ids.contains(&"priv-1"));
}

#[tokio::test]
async fn resolve_endpoint_does_not_mutate_state() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let before = count_rows(&state.db).await;
    let db_handle = state.db.clone();
    let router = nexus_api::create_router(state);

    let payload = serde_json::json!({
        "dependencies": [
            { "family": "llama", "version": "3-8b", "allow_unpinned": true,
              "quantization": "Q4_K_M" },
            { "family": "missing-fam", "version": "v", "allow_unpinned": true }
        ]
    });
    let request = Request::builder()
        .method("POST")
        .uri("/api/v1/host-models/resolve")
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_vec(&payload).unwrap()))
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let data = &body["data"];
    assert_eq!(data["matched"].as_array().unwrap().len(), 1);
    assert_eq!(data["missing"].as_array().unwrap().len(), 1);

    let after = count_rows(&db_handle).await;
    assert_eq!(before, after);
}

#[tokio::test]
async fn lease_endpoints_mirror_runtime_lease_shape() {
    let state = build_state().await;
    seed_install(&state.db, "leasable-1", false, None).await;
    let db_handle = state.db.clone();
    let router = nexus_api::create_router(state);

    let acquire_payload = serde_json::json!({
        "extension_id": "ext.test",
        "device": "cuda:0",
        "vram_reserved_bytes": 1024,
        "device_budget_bytes": 12u64 * 1024 * 1024 * 1024,
    });
    let acquire_req = Request::builder()
        .method("POST")
        .uri("/api/v1/host-models/leasable-1/leases")
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_vec(&acquire_payload).unwrap()))
        .unwrap();
    let acquire_resp = router.clone().oneshot(acquire_req).await.unwrap();
    assert_eq!(acquire_resp.status(), StatusCode::OK);
    let acquire_body = collect_body(acquire_resp.into_body()).await;
    let lease_id = acquire_body["data"]["lease_id"]
        .as_str()
        .expect("lease_id")
        .to_string();
    assert!(lease_id.starts_with("ml-"));

    let release_req = Request::builder()
        .method("DELETE")
        .uri(format!("/api/v1/host-models/leases/{lease_id}"))
        .body(Body::empty())
        .unwrap();
    let release_resp = router.oneshot(release_req).await.unwrap();
    assert_eq!(release_resp.status(), StatusCode::OK);
    let release_body = collect_body(release_resp.into_body()).await;
    assert_eq!(release_body["data"]["lease_id"], lease_id);

    use sqlx::Row;
    let released: Option<String> =
        sqlx::query("SELECT released_at FROM host_model_leases WHERE lease_id = $1")
            .bind(&lease_id)
            .fetch_one(db_handle.pool())
            .await
            .unwrap()
            .try_get("released_at")
            .ok();
    assert!(released.is_some(), "released_at populated after DELETE");
}

#[tokio::test]
async fn host_runtimes_and_host_models_are_independent_top_level_lists() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let router = nexus_api::create_router(state);
    let resp_m = router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp_m.status(), StatusCode::OK);

    let resp_r = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/backends")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp_r.status(), StatusCode::OK);
}
