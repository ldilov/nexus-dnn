//! Spec 019 US6 — `POST /api/v1/modules/{module_id}/deployments` contract.
//! Covers tasks T044, T045, T046, T047, T048, T214.

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
        backend_event_bus: Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(
            1024,
        )),
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        inference: std::sync::Arc::new(nexus_api::handlers::extensions_local_llm::inference::StubInferenceBackend),
    }
}

fn make_extension(
    id: &str,
    name: &str,
    primary_recipe: Option<&str>,
    status: &str,
) -> ExtensionRecord {
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
        status: status.into(),
        directory: "/tmp/ext".into(),
        installed_at: "2026-04-16T00:00:00Z".into(),
        recipe_count: Some(1),
        ui_contribution_count: None,
        validation_errors: None,
        primary_recipe_id: primary_recipe.map(str::to_owned),
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

async fn post(
    state: AppState,
    uri: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
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

#[tokio::test]
async fn deploy_default_blueprint_201() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("solo", "Solo", None, "active"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.solo-1", "solo", "Solo Recipe"))
        .await
        .unwrap();

    let (status, body) = post(state, "/api/v1/modules/ext:solo/deployments", json!({})).await;
    assert_eq!(status, StatusCode::CREATED, "body: {body}");
    assert!(body["data"]["deployment_id"].is_string());
    assert!(body["data"]["revision_id"].is_string());
    assert!(body["data"]["effective_workflow_hash"].is_string());
}

#[tokio::test]
async fn deploy_with_recipe_id_override() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension(
            "multi",
            "Multi",
            Some("rcp.multi-1"),
            "active",
        ))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.multi-1", "multi", "First"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.multi-2", "multi", "Second"))
        .await
        .unwrap();

    let (status, body) = post(
        state,
        "/api/v1/modules/ext:multi/deployments",
        json!({ "recipe_id": "rcp.multi-2" }),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED, "body: {body}");
    assert!(body["data"]["deployment_id"].is_string());
}

#[tokio::test]
async fn deploy_422_on_foreign_recipe_id() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("solo", "Solo", None, "active"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.solo-1", "solo", "Solo Recipe"))
        .await
        .unwrap();

    let (status, body) = post(
        state,
        "/api/v1/modules/ext:solo/deployments",
        json!({ "recipe_id": "rcp.does-not-belong" }),
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
    assert_eq!(body["error"]["code"], "module.recipe_not_in_module");
}

#[tokio::test]
async fn deploy_400_on_draft_id() {
    let state = build_state().await;
    let (status, body) = post(
        state,
        "/api/v1/modules/user:draft:abcdef12-3456-4789-8abc-def012345678/deployments",
        json!({}),
    )
    .await;
    // The draft path collides with the materialize router prefix; the route
    // matches /modules/{module_id}/deployments so the draft id is rejected
    // here with 400, not the materialize endpoint.
    assert_eq!(status, StatusCode::BAD_REQUEST, "body: {body}");
    assert_eq!(body["error"]["code"], "module.draft_id_not_allowed");
}

#[tokio::test]
async fn deploy_409_on_disabled_extension() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension(
            "disabled-ext",
            "Disabled",
            None,
            "disabled",
        ))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe(
            "rcp.disabled-1",
            "disabled-ext",
            "Disabled Recipe",
        ))
        .await
        .unwrap();

    let (status, body) = post(
        state,
        "/api/v1/modules/ext:disabled-ext/deployments",
        json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::CONFLICT);
    assert_eq!(body["error"]["code"], "module.disabled");
}

#[tokio::test]
async fn multi_instance_distinct_hashes() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("multi-inst", "MultiInst", None, "active"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.mi-1", "multi-inst", "Recipe"))
        .await
        .unwrap();

    let (status_a, body_a) = post(
        state.clone(),
        "/api/v1/modules/ext:multi-inst/deployments",
        json!({
            "runtime_binding_overrides": { "profile": "fast" },
            "model_binding_overrides": { "model": "alpha" },
        }),
    )
    .await;
    assert_eq!(status_a, StatusCode::CREATED);
    let hash_a = body_a["data"]["effective_workflow_hash"]
        .as_str()
        .unwrap()
        .to_string();
    let dep_a = body_a["data"]["deployment_id"]
        .as_str()
        .unwrap()
        .to_string();

    let (status_b, body_b) = post(
        state,
        "/api/v1/modules/ext:multi-inst/deployments",
        json!({
            "runtime_binding_overrides": { "profile": "slow" },
            "model_binding_overrides": { "model": "beta" },
        }),
    )
    .await;
    assert_eq!(status_b, StatusCode::CREATED);
    let hash_b = body_b["data"]["effective_workflow_hash"]
        .as_str()
        .unwrap()
        .to_string();
    let dep_b = body_b["data"]["deployment_id"]
        .as_str()
        .unwrap()
        .to_string();

    assert_ne!(hash_a, hash_b, "different overrides must hash differently");
    assert_ne!(dep_a, dep_b, "deployments must have distinct ids");
}
