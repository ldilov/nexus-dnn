//! Contract test for spec 020 US3 — `GET /api/v1/host-models/{install_id}/dependents`.

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

async fn build_state() -> (AppState, tempfile::TempDir) {
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
        spawner: None,
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_bus: Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(
            1024,
        )),
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
    };

    (state, tmp)
}

async fn seed_install(state: &AppState, install_id: &str) {
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
                install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
                source_url, license_spdx, license_url, provenance_note, private_model, \
                owner_extension_id, param_count, created_at, updated_at) \
         VALUES ($1, 'llama', '3-8b', 'Q4_K_M', 'chat', '/tmp/x', '[]', 'sha', 'rev', 'ready', \
                 'huggingface', NULL, NULL, NULL, NULL, 0, NULL, NULL, 't', 't')",
    )
    .bind(install_id)
    .execute(state.db.pool())
    .await
    .expect("seed install");
}

async fn seed_lease(state: &AppState, install_id: &str, extension_id: &str) {
    use std::time::{SystemTime, UNIX_EPOCH};
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or_default();
    let lease_id = format!("lease_{extension_id}_{install_id}_{nanos}");
    sqlx::query(
        "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
                vram_reserved_bytes, acquired_at, released_at) \
         VALUES ($1, $2, $3, 'cuda:0', 0, 't', NULL)",
    )
    .bind(&lease_id)
    .bind(install_id)
    .bind(extension_id)
    .execute(state.db.pool())
    .await
    .expect("seed lease");
}

async fn call_dependents(state: AppState, install_id: &str) -> (StatusCode, serde_json::Value) {
    let app = nexus_api::router::build(state);
    let req = Request::builder()
        .uri(format!("/api/v1/host-models/{install_id}/dependents"))
        .body(Body::empty())
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
async fn returns_zero_dependents_for_fresh_install() {
    let (state, _tmp) = build_state().await;
    seed_install(&state, "hmi_fresh").await;
    let (status, json) = call_dependents(state, "hmi_fresh").await;
    assert_eq!(status, StatusCode::OK, "body = {json}");
    let data = &json["data"];
    assert_eq!(data["count"].as_u64(), Some(0));
    assert_eq!(data["extensions"].as_array().map(|a| a.len()), Some(0));
}

#[tokio::test]
async fn returns_leased_extensions_sorted() {
    let (state, _tmp) = build_state().await;
    seed_install(&state, "hmi_shared").await;
    seed_lease(&state, "hmi_shared", "zebra-ext").await;
    seed_lease(&state, "hmi_shared", "alpha-ext").await;
    seed_lease(&state, "hmi_shared", "alpha-ext").await;

    let (status, json) = call_dependents(state, "hmi_shared").await;
    assert_eq!(status, StatusCode::OK, "body = {json}");
    let data = &json["data"];
    assert_eq!(data["count"].as_u64(), Some(2));
    let exts = data["extensions"].as_array().expect("extensions array");
    assert_eq!(exts.len(), 2);
    assert_eq!(exts[0]["extension_id"].as_str(), Some("alpha-ext"));
    assert_eq!(exts[0]["kind"].as_str(), Some("lease"));
    assert_eq!(exts[1]["extension_id"].as_str(), Some("zebra-ext"));
}

#[tokio::test]
async fn returns_404_for_unknown_install() {
    let (state, _tmp) = build_state().await;
    let (status, json) = call_dependents(state, "hmi_does_not_exist").await;
    assert_eq!(status, StatusCode::NOT_FOUND, "body = {json}");
    assert_eq!(json["error"]["code"].as_str(), Some("NOT_FOUND"));
}
