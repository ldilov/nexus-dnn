//! Spec 019 US6 — `POST /api/v1/modules/{id}/blueprint/dry-run` contract.
//! Covers task T054 (FR-029): dry-run MUST NOT create a `runs` row or
//! persist any side effects.

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
use nexus_storage::{Database, ExtensionRecord, RecipeRecord, SqliteDatabase};
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use serde_json::json;
use tower::ServiceExt;

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
    let backend_event_bus =
        Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(1024));

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

fn make_extension(id: &str, name: &str) -> ExtensionRecord {
    ExtensionRecord {
        id: id.into(),
        name: Some(name.into()),
        version: "1.0.0".into(),
        description: None,
        publisher: None,
        host_api_compat: "1.0".into(),
        protocol_compat: "1.0".into(),
        runtime_family: "python".into(),
        entrypoint: "worker.py".into(),
        capabilities: None,
        status: "active".into(),
        directory: "/tmp/ext".into(),
        installed_at: "2026-04-16T00:00:00Z".into(),
        recipe_count: Some(1),
        ui_contribution_count: None,
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

fn make_recipe(id: &str, ext_id: &str, display: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.0.0".into(),
        display_name: display.into(),
        summary: format!("{display} summary"),
        category: "default".into(),
        extension_id: ext_id.into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: format!("{ext_id}:template"),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".into(),
        created_at: "2026-04-16T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn dry_run_no_runs_row_created() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("dryrun-ext", "DryRun"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.dr-1", "dryrun-ext", "Recipe"))
        .await
        .unwrap();

    let runs_before = state.db.list_runs().await.unwrap().len();

    let req = Request::builder()
        .method("POST")
        .uri("/api/v1/modules/ext:dryrun-ext/blueprint/dry-run")
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&json!({})).unwrap()))
        .unwrap();
    let resp = nexus_api::create_router(state.clone())
        .oneshot(req)
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let body: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
    assert!(
        body["data"]["plan_id"]
            .as_str()
            .unwrap()
            .starts_with("plan_")
    );

    let runs_after = state.db.list_runs().await.unwrap().len();
    assert_eq!(
        runs_after, runs_before,
        "dry-run MUST NOT create a runs row (FR-029)"
    );
}
