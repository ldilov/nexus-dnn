//! Spec 019 US6 — `POST /api/v1/modules/user:draft:{uuid}/materialize` contract.
//! Covers tasks T049, T050, T051, T052, T053 (FR-BM04, SC-019, SC-020).

use std::sync::Arc;
use std::time::Duration;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::AppState;
use nexus_api::handlers::modules::draft_map::{DraftEntry, DraftMaterializeMap};
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use serde_json::json;
use tokio::time::Instant;
use tower::ServiceExt;

const DRAFT_UUID: &str = "abcdef12-3456-4789-8abc-def012345678";

async fn build_state() -> AppState {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));
    let ext_dir = tempfile::tempdir().unwrap();
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .unwrap();
    let artifact_dir = ext_dir.path().join("artifacts");
    std::fs::create_dir_all(&artifact_dir).unwrap();
    let artifact_store = Arc::new(FilesystemArtifactStore::new(artifact_dir));
    let scheduler = Arc::new(RoundRobinScheduler);
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
        extension_registry: Arc::new(registry),
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
        backend_event_publisher: backend_event_bus.clone(),
        backend_event_bus,
        draft_materialize_map: DraftMaterializeMap::new(),
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

async fn post_materialize(
    state: AppState,
    uuid: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
    let uri = format!("/api/v1/modules/user:draft:{uuid}/materialize");
    let req = Request::builder()
        .method("POST")
        .uri(uri)
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = nexus_api::create_router(state).oneshot(req).await.unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null);
    (status, json)
}

fn happy_body() -> serde_json::Value {
    json!({
        "workflow_payload": { "nodes": [{ "id": "n1", "op": "noop" }], "edges": [] },
        "display_name": "My First Module",
    })
}

#[tokio::test]
async fn materialize_happy_201() {
    let state = build_state().await;
    let (status, body) = post_materialize(state, DRAFT_UUID, happy_body()).await;
    assert_eq!(status, StatusCode::CREATED, "body: {body}");
    let module_id = body["data"]["module_id"].as_str().unwrap();
    assert!(
        module_id.starts_with("user:wfl_"),
        "module_id was {module_id}"
    );
    assert!(body["data"]["deployment_id"].is_string());
    assert!(body["data"]["deployment_revision_id"].is_string());
}

#[tokio::test]
async fn materialize_idempotent_same_body() {
    let state = build_state().await;
    let body = happy_body();

    let (status_a, body_a) = post_materialize(state.clone(), DRAFT_UUID, body.clone()).await;
    assert_eq!(status_a, StatusCode::CREATED);
    let module_id_a = body_a["data"]["module_id"].as_str().unwrap().to_string();
    let dep_id_a = body_a["data"]["deployment_id"]
        .as_str()
        .unwrap()
        .to_string();
    let rev_id_a = body_a["data"]["deployment_revision_id"]
        .as_str()
        .unwrap()
        .to_string();

    let (status_b, body_b) = post_materialize(state, DRAFT_UUID, body).await;
    assert_eq!(
        status_b,
        StatusCode::OK,
        "replay must return 200, got body: {body_b}"
    );
    assert_eq!(body_b["data"]["module_id"], module_id_a);
    assert_eq!(body_b["data"]["deployment_id"], dep_id_a);
    assert_eq!(body_b["data"]["deployment_revision_id"], rev_id_a);
}

#[tokio::test]
async fn materialize_409_on_body_diff() {
    let state = build_state().await;
    let (status_a, _) = post_materialize(state.clone(), DRAFT_UUID, happy_body()).await;
    assert_eq!(status_a, StatusCode::CREATED);

    let mutated = json!({
        "workflow_payload": { "nodes": [{ "id": "n1", "op": "different" }], "edges": [] },
        "display_name": "Different Name",
    });
    let (status_b, body_b) = post_materialize(state, DRAFT_UUID, mutated).await;
    assert_eq!(status_b, StatusCode::CONFLICT);
    assert_eq!(body_b["error"]["code"], "module.draft_uuid_conflict");
}

#[tokio::test]
async fn materialize_new_rows_after_ttl_expiry() {
    let state = build_state().await;

    // Inject a fake stale entry to simulate an expired idempotency record
    // (the real TTL is 10 min; we plant an entry that's already 11 min old).
    let fake_entry = DraftEntry {
        workflow_id: "wfl_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".into(),
        deployment_id: "dep_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".into(),
        deployment_revision_id: "rev_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".into(),
        body_hash: [0u8; 32],
        created_at: Instant::now() - Duration::from_secs(11 * 60),
    };
    state
        .draft_materialize_map
        .insert(DRAFT_UUID.into(), fake_entry)
        .await;

    let (status, body) = post_materialize(state, DRAFT_UUID, happy_body()).await;
    assert_eq!(
        status,
        StatusCode::CREATED,
        "expired entry must yield fresh 201, got: {body}"
    );
    let new_dep = body["data"]["deployment_id"].as_str().unwrap();
    assert!(
        !new_dep.starts_with("dep_aaaa"),
        "expected fresh deployment id, got cached: {new_dep}"
    );
}

#[tokio::test]
async fn materialize_400_on_bad_uuid() {
    let state = build_state().await;
    let (status, body) = post_materialize(state, "not-a-uuid", happy_body()).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert_eq!(body["error"]["code"], "module.draft_uuid_invalid");
}
