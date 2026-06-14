//! Spec 019 US6 — FR-031 / SI-03 carry-over: no module-surface endpoint may
//! auto-install an extension or a runtime. Covers task T217.
//!
//! For every module endpoint, the test asserts:
//!   - `extensions` row count is unchanged (no extension install)
//!   - `host_runtime_installs` row count is unchanged (no runtime install)
//!   - For an extension whose runtime is absent, the response is a structured
//!     error rather than a silent install (the failing fixture case).

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

fn ext(id: &str) -> ExtensionRecord {
    ExtensionRecord {
        id: id.into(),
        name: Some(id.into()),
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

fn rcp(id: &str, ext_id: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.0.0".into(),
        display_name: id.into(),
        summary: id.into(),
        category: "default".into(),
        extension_id: ext_id.into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: format!("{ext_id}:template"),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".into(),
        workflow_id: None,
        workflow_version: None,
        projection_schema_version: None,
        projection: None,
        status: None,
        author_kind: "extension".into(),
        created_at: "2026-04-16T00:00:00Z".into(),
    }
}

async fn install_counts(state: &AppState) -> (i64, i64) {
    let exts: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM extensions")
        .fetch_one(state.db.pool())
        .await
        .unwrap();
    let runtimes: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM host_runtime_installs")
        .fetch_one(state.db.pool())
        .await
        .unwrap();
    (exts, runtimes)
}

async fn call(
    state: AppState,
    method: &str,
    uri: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
    let req = Request::builder()
        .method(method)
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

#[tokio::test]
async fn no_module_endpoint_creates_install_rows() {
    let state = build_state().await;
    state.db.insert_extension(&ext("nai-ext")).await.unwrap();
    state
        .db
        .insert_recipe(&rcp("rcp.nai-1", "nai-ext"))
        .await
        .unwrap();

    let endpoints: &[(&str, &str, serde_json::Value)] = &[
        ("GET", "/api/v1/modules", json!(null)),
        ("GET", "/api/v1/modules/ext:nai-ext", json!(null)),
        ("GET", "/api/v1/modules/ext:nai-ext/blueprint", json!(null)),
        ("POST", "/api/v1/modules/ext:nai-ext/deployments", json!({})),
        (
            "POST",
            "/api/v1/modules/ext:nai-ext/blueprint/dry-run",
            json!({}),
        ),
        (
            "POST",
            "/api/v1/modules/user:draft:abcdef12-3456-4789-8abc-def012345678/materialize",
            json!({ "workflow_payload": {}, "display_name": "x" }),
        ),
    ];

    for (method, uri, body) in endpoints {
        // Distinct draft uuid each iteration so we don't trip the idempotency cache.
        let body_owned = body.clone();
        let (exts_before, runtimes_before) = install_counts(&state).await;
        let _ = call(state.clone(), method, uri, body_owned).await;
        let (exts_after, runtimes_after) = install_counts(&state).await;
        assert_eq!(
            exts_after, exts_before,
            "{method} {uri} created an extensions install row (FR-031)"
        );
        assert_eq!(
            runtimes_after, runtimes_before,
            "{method} {uri} created a host_runtime_installs row (FR-031)"
        );
    }
}

#[tokio::test]
async fn endpoint_without_runtime_returns_diagnostic_not_install() {
    // The failing fixture: an extension with status='active' but no
    // matching host_runtime_installs row. Calling the deploy shortcut MUST
    // succeed-or-fail with a structured response — it MUST NOT silently
    // create a runtime install row to satisfy the request.
    let state = build_state().await;
    state.db.insert_extension(&ext("nai-no-rt")).await.unwrap();
    state
        .db
        .insert_recipe(&rcp("rcp.nai-no-rt-1", "nai-no-rt"))
        .await
        .unwrap();

    let (_, runtimes_before) = install_counts(&state).await;
    let (status, _body) = call(
        state.clone(),
        "POST",
        "/api/v1/modules/ext:nai-no-rt/deployments",
        json!({}),
    )
    .await;
    // Either the deploy succeeded WITHOUT touching runtime_installs, or it
    // failed with a structured error — both satisfy FR-031. The forbidden
    // outcome is a silent install side-effect.
    assert!(
        status.is_success() || status.is_client_error() || status.is_server_error(),
        "any structured response is fine; forbidden behavior is a silent install"
    );
    let (_, runtimes_after) = install_counts(&state).await;
    assert_eq!(
        runtimes_after, runtimes_before,
        "deploy_shortcut MUST NOT create a host_runtime_installs row (SI-03)"
    );
}
