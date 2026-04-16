//! Spec 019 US6 contract tests — verify `GET /api/v1/modules`,
//! `GET /api/v1/modules/{id}`, and `GET /api/v1/modules/{id}/blueprint`
//! shape + ordering + error responses.

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
use nexus_storage::{Database, ExtensionRecord, RecipeRecord, SqliteDatabase, WorkflowRecord};
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tower::ServiceExt;

async fn build_state() -> AppState {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));
    let ext_dir = tempfile::tempdir().unwrap();
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (registry, _) = InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
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
        backend_event_bus: Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(1024)),
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
    }
}

fn make_extension(id: &str, name: &str, primary_recipe: Option<&str>) -> ExtensionRecord {
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

fn make_user_workflow(id: &str, title: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: title.into(),
        version: "1.0.0".into(),
        inputs: None,
        outputs: None,
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: None,
        created_at: "2026-04-16T00:00:00Z".into(),
        updated_at: "2026-04-16T00:00:00Z".into(),
        user_edited_at: Some("2026-04-16T00:00:00Z".into()),
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

async fn get(state: AppState, uri: &str) -> (StatusCode, serde_json::Value) {
    let req = Request::builder().uri(uri).body(Body::empty()).unwrap();
    let resp = nexus_api::create_router(state).oneshot(req).await.unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value =
        serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null);
    (status, json)
}

#[tokio::test]
async fn list_shape_and_ordering() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("ext.zzz", "Zeta", None))
        .await
        .unwrap();
    state
        .db
        .insert_extension(&make_extension("ext.aaa", "Alpha", None))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.zzz-1", "ext.zzz", "Zeta Recipe"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.aaa-1", "ext.aaa", "Alpha Recipe"))
        .await
        .unwrap();
    state
        .db
        .insert_workflow(&make_user_workflow("wfl.user-1", "My Flow"))
        .await
        .unwrap();

    let (status, body) = get(state, "/api/v1/modules").await;
    assert_eq!(status, StatusCode::OK);
    let modules = body["data"]["modules"].as_array().unwrap();
    assert_eq!(modules.len(), 3, "two extension modules + one user module");

    // Extension modules come first, sorted by display_name ASC.
    assert_eq!(modules[0]["display_name"], "Alpha");
    assert_eq!(modules[0]["source_kind"], "extension");
    assert_eq!(modules[1]["display_name"], "Zeta");
    assert_eq!(modules[1]["source_kind"], "extension");
    // User modules next.
    assert_eq!(modules[2]["source_kind"], "user");
}

#[tokio::test]
async fn list_filters_by_kind() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("ext.solo", "Solo", None))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.solo-1", "ext.solo", "Solo Recipe"))
        .await
        .unwrap();
    state
        .db
        .insert_workflow(&make_user_workflow("wfl.user-1", "My Flow"))
        .await
        .unwrap();

    let (_, ext_only) = get(state.clone(), "/api/v1/modules?kind=extension").await;
    let modules = ext_only["data"]["modules"].as_array().unwrap();
    assert_eq!(modules.len(), 1);
    assert_eq!(modules[0]["source_kind"], "extension");

    let (_, user_only) = get(state, "/api/v1/modules?kind=user").await;
    let modules = user_only["data"]["modules"].as_array().unwrap();
    assert_eq!(modules.len(), 1);
    assert_eq!(modules[0]["source_kind"], "user");
}

#[tokio::test]
async fn blueprints_ordered_primary_first() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("ext.multi", "Multi", Some("rcp.multi-2")))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.multi-1", "ext.multi", "First lexical"))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.multi-2", "ext.multi", "Pinned primary"))
        .await
        .unwrap();

    let (_, body) = get(state, "/api/v1/modules").await;
    let blueprints = body["data"]["modules"][0]["blueprints"].as_array().unwrap();
    assert_eq!(blueprints.len(), 2);
    assert_eq!(blueprints[0]["recipe_id"], "rcp.multi-2");
    assert_eq!(blueprints[0]["is_primary"], true);
    assert_eq!(blueprints[1]["recipe_id"], "rcp.multi-1");
    assert_eq!(blueprints[1]["is_primary"], false);
}

#[tokio::test]
async fn detail_404_on_missing_module() {
    let state = build_state().await;
    let (status, body) = get(state, "/api/v1/modules/ext:does-not-exist").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert_eq!(body["error"]["code"], "module.not_found");
}

#[tokio::test]
async fn detail_rejects_draft_id() {
    let state = build_state().await;
    let (status, body) = get(
        state,
        "/api/v1/modules/user:draft:abcdef12-3456-4789-8abc-def012345678",
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert_eq!(body["error"]["code"], "module.draft_id_not_allowed");
}

#[tokio::test]
async fn blueprint_rejects_foreign_recipe_id() {
    let state = build_state().await;
    // module_id shape: `ext:{extension_id}` — so the stored extension id must
    // not itself contain a colon prefix we'd misparse. Using "solo" here.
    state
        .db
        .insert_extension(&make_extension("solo", "Solo", None))
        .await
        .unwrap();
    state
        .db
        .insert_recipe(&make_recipe("rcp.solo-1", "solo", "Solo Recipe"))
        .await
        .unwrap();

    let (status, body) = get(
        state,
        "/api/v1/modules/ext:solo/blueprint?recipe_id=does-not-belong",
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
    assert_eq!(body["error"]["code"], "module.recipe_not_in_module");
}

#[tokio::test]
async fn list_excludes_extensions_without_recipes() {
    let state = build_state().await;
    state
        .db
        .insert_extension(&make_extension("ext.empty", "Empty", None))
        .await
        .unwrap();

    let (_, body) = get(state, "/api/v1/modules").await;
    let modules = body["data"]["modules"].as_array().unwrap();
    assert!(modules.is_empty(), "extensions with 0 recipes are suppressed");
}
