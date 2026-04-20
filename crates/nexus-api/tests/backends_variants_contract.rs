//! Contract test for spec 020 US1 — `GET /api/v1/llm/backends/{id}/variants`.
//!
//! Covers the three documented envelope shapes from
//! `specs/020-backends-and-models-polish/contracts/backends_variants.http`:
//!
//! * `200 OK` — happy path with a real llama.cpp adapter pointed at a seeded
//!   version manifest.
//! * `404 catalog_unavailable` — manifest missing/malformed on disk.
//! * `404 not_found` — backend id absent from the registry.
//! * `503 backends_not_wired` — adapter registry is `None` on AppState.

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_backend_runtimes::adapter::AdapterRegistry;
use nexus_backend_runtimes::events::BroadcastPublisher;
use nexus_backend_runtimes::llamacpp::LlamaCppAdapter;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tower::ServiceExt;

const VALID_MANIFEST: &str = r#"
backend: llama.cpp
default_release_id: b6859
releases:
  - release_id: b6859
    assets:
      - platform: windows-x64
        accelerator_profile: cpu
        url: https://example/win-cpu.zip
        archive_kind: zip
        size_bytes: 8423211
        checksum_sha256: deadbeef
      - platform: windows-x64
        accelerator_profile: cuda12
        url: https://example/win-cuda12.zip
        archive_kind: zip
        size_bytes: 312104488
        checksum_sha256: feedface
      - platform: linux-x64
        accelerator_profile: cpu
        url: https://example/linux-cpu.tar.gz
        archive_kind: tar.gz
        size_bytes: 7932111
        checksum_sha256: beefbeef
"#;

struct Harness {
    state: AppState,
    _tmp: tempfile::TempDir,
}

async fn build_harness(manifest: Option<&str>) -> Harness {
    let tmp = tempfile::tempdir().expect("tempdir");
    let manifest_path = tmp.path().join("version_manifest.yaml");
    if let Some(yaml) = manifest {
        std::fs::write(&manifest_path, yaml).expect("write manifest");
    }

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

    let backend_bus = Arc::new(BroadcastPublisher::new(1024));
    let runtimes_root =
        camino::Utf8PathBuf::from_path_buf(tmp.path().join("runtimes")).expect("utf8 temp path");
    let adapter = Arc::new(LlamaCppAdapter::new(
        manifest_path,
        runtimes_root,
        db.pool().clone(),
        backend_bus.clone(),
    ));
    let mut registry = AdapterRegistry::new();
    registry.register(adapter);

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
        backend_adapter_registry: Some(Arc::new(registry)),
        spawner: None,
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_bus: backend_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
    };

    Harness { state, _tmp: tmp }
}

async fn unwired_harness() -> Harness {
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
    let backend_bus = Arc::new(BroadcastPublisher::new(1024));

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
        backend_event_bus: backend_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
    };

    Harness { state, _tmp: tmp }
}

async fn call_variants(state: AppState, backend_id: &str) -> (StatusCode, serde_json::Value) {
    let app = nexus_api::router::build(state);
    let req = Request::builder()
        .uri(format!("/api/v1/llm/backends/{backend_id}/variants"))
        .body(Body::empty())
        .expect("build request");
    let res = app.oneshot(req).await.expect("route");
    let status = res.status();
    let body_bytes = res.into_body().collect().await.expect("body").to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&body_bytes).unwrap_or_else(|_| {
        panic!(
            "response is not valid json: {}",
            String::from_utf8_lossy(&body_bytes)
        )
    });
    (status, json)
}

#[tokio::test]
async fn returns_variants_for_registered_backend() {
    let harness = build_harness(Some(VALID_MANIFEST)).await;
    let (status, json) = call_variants(harness.state, "llama.cpp").await;
    assert_eq!(status, StatusCode::OK, "body = {json}");

    let data = &json["data"];
    assert!(data.is_object(), "missing data envelope: {json}");

    let variants = data["variants"].as_array().expect("variants array");
    assert_eq!(variants.len(), 3, "expected 3 variants, got {variants:?}");

    assert_eq!(
        data["recommended_release_id"].as_str(),
        Some("b6859"),
        "recommended_release_id present"
    );

    let first = &variants[0];
    assert!(first["release_id"].is_string());
    assert!(first["platform"].is_string());
    assert!(first["accelerator_profile"].is_string());
    assert!(first["label"].is_string());
    assert!(first["supported"].is_boolean());
    assert!(first["recommended"].is_boolean());
}

#[tokio::test]
async fn returns_404_not_found_for_unknown_backend() {
    let harness = build_harness(Some(VALID_MANIFEST)).await;
    let (status, json) = call_variants(harness.state, "tensorrt_llm").await;
    assert_eq!(status, StatusCode::NOT_FOUND, "body = {json}");

    let err = &json["error"];
    assert_eq!(err["code"].as_str(), Some("NOT_FOUND"));
    assert_eq!(err["category"].as_str(), Some("not_found"));
    assert!(
        err["message"]
            .as_str()
            .unwrap_or_default()
            .contains("tensorrt_llm"),
        "message references backend id"
    );
}

#[tokio::test]
async fn returns_404_catalog_unavailable_when_manifest_missing() {
    let harness = build_harness(None).await;
    let (status, json) = call_variants(harness.state, "llama.cpp").await;
    assert_eq!(status, StatusCode::NOT_FOUND, "body = {json}");

    let err = &json["error"];
    assert_eq!(err["code"].as_str(), Some("catalog_unavailable"));
}

#[tokio::test]
async fn returns_503_when_registry_not_wired() {
    let harness = unwired_harness().await;
    let (status, json) = call_variants(harness.state, "llama.cpp").await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE, "body = {json}");

    let err = &json["error"];
    assert_eq!(err["code"].as_str(), Some("backends_not_wired"));
}
