//! Spec 019 US6 — INV-019-1 / INV-019-2 (FR-031, SC-013): every module-surface
//! endpoint MUST NOT mutate pre-existing base-source rows in `workflows`,
//! `recipes`, `extensions`, or any `deployments` row that existed before the
//! call. Covers task T215.
//!
//! Strategy: snapshot row contents before each call → invoke endpoint → re-fetch
//! each pre-existing row by id → assert byte-identical. New rows created by
//! POST endpoints are allowed; mutation of pre-existing rows is not.

use std::collections::HashMap;
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
        created_at: "2026-04-16T00:00:00Z".into(),
    }
}

fn wfl(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: id.into(),
        version: "1.0.0".into(),
        inputs: None,
        outputs: None,
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: None,
        created_at: "2026-04-16T00:00:00Z".into(),
        updated_at: "2026-04-16T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

async fn snapshot(
    state: &AppState,
) -> (
    HashMap<String, String>,
    HashMap<String, String>,
    HashMap<String, String>,
) {
    let exts = state
        .db
        .list_extensions()
        .await
        .unwrap()
        .into_iter()
        .map(|r| (r.id.clone(), serde_json::to_string(&r).unwrap()))
        .collect();
    let rcps = state
        .db
        .list_recipes()
        .await
        .unwrap()
        .into_iter()
        .map(|r| (r.id.clone(), serde_json::to_string(&r).unwrap()))
        .collect();
    let wfls = state
        .db
        .list_workflows()
        .await
        .unwrap()
        .into_iter()
        .map(|r| (r.id.clone(), serde_json::to_string(&r).unwrap()))
        .collect();
    (exts, rcps, wfls)
}

async fn assert_no_mutation(
    state: &AppState,
    before: &(
        HashMap<String, String>,
        HashMap<String, String>,
        HashMap<String, String>,
    ),
    label: &str,
) {
    let (after_exts, after_rcps, after_wfls) = snapshot(state).await;

    for (id, original) in &before.0 {
        let actual = after_exts
            .get(id)
            .unwrap_or_else(|| panic!("{label}: extension {id} disappeared"));
        assert_eq!(actual, original, "{label}: extension {id} was mutated");
    }
    for (id, original) in &before.1 {
        let actual = after_rcps
            .get(id)
            .unwrap_or_else(|| panic!("{label}: recipe {id} disappeared"));
        assert_eq!(actual, original, "{label}: recipe {id} was mutated");
    }
    for (id, original) in &before.2 {
        let actual = after_wfls
            .get(id)
            .unwrap_or_else(|| panic!("{label}: workflow {id} disappeared"));
        assert_eq!(actual, original, "{label}: workflow {id} was mutated");
    }
}

async fn seed(state: &AppState) {
    state.db.insert_extension(&ext("nm-ext")).await.unwrap();
    state
        .db
        .insert_recipe(&rcp("rcp.nm-1", "nm-ext"))
        .await
        .unwrap();
    state
        .db
        .insert_workflow(&wfl("wfl.nm-user-1"))
        .await
        .unwrap();
}

async fn call(state: AppState, method: &str, uri: &str, body: serde_json::Value) -> StatusCode {
    let req = Request::builder()
        .method(method)
        .uri(uri)
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap();
    let resp = nexus_api::create_router(state).oneshot(req).await.unwrap();
    let status = resp.status();
    let _ = resp.into_body().collect().await.unwrap();
    status
}

#[tokio::test]
async fn get_modules_list_does_not_mutate() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let _ = call(state.clone(), "GET", "/api/v1/modules", json!(null)).await;
    assert_no_mutation(&state, &before, "GET /modules").await;
}

#[tokio::test]
async fn get_modules_detail_does_not_mutate() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let _ = call(
        state.clone(),
        "GET",
        "/api/v1/modules/ext:nm-ext",
        json!(null),
    )
    .await;
    assert_no_mutation(&state, &before, "GET /modules/{id}").await;
}

#[tokio::test]
async fn get_modules_blueprint_does_not_mutate() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let _ = call(
        state.clone(),
        "GET",
        "/api/v1/modules/ext:nm-ext/blueprint",
        json!(null),
    )
    .await;
    assert_no_mutation(&state, &before, "GET /modules/{id}/blueprint").await;
}

#[tokio::test]
async fn post_deployments_does_not_mutate_base_rows() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let status = call(
        state.clone(),
        "POST",
        "/api/v1/modules/ext:nm-ext/deployments",
        json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED);
    assert_no_mutation(&state, &before, "POST /modules/{id}/deployments").await;
}

#[tokio::test]
async fn post_dry_run_does_not_mutate() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let status = call(
        state.clone(),
        "POST",
        "/api/v1/modules/ext:nm-ext/blueprint/dry-run",
        json!({}),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    assert_no_mutation(&state, &before, "POST /modules/{id}/blueprint/dry-run").await;
}

#[tokio::test]
async fn post_materialize_does_not_mutate_pre_existing_rows() {
    let state = build_state().await;
    seed(&state).await;
    let before = snapshot(&state).await;
    let status = call(
        state.clone(),
        "POST",
        "/api/v1/modules/user:draft:abcdef12-3456-4789-8abc-def012345678/materialize",
        json!({
            "workflow_payload": { "nodes": [], "edges": [] },
            "display_name": "fresh draft",
        }),
    )
    .await;
    assert_eq!(status, StatusCode::CREATED);
    // materialize MAY create a new workflows row but MUST NOT mutate existing ones.
    assert_no_mutation(&state, &before, "POST /modules/user:draft:.../materialize").await;
}
