//! P3b — `POST /api/v1/deployments/{id}/runs` recipe-run route.
//!
//! The deployment run route now accepts `{ control_values, preset_id? }` and
//! fans out via the recipe binding compiler against the deployment revision's
//! authoritative pinned host workflow version, asserting the recipe pin matches
//! the revision before submitting through the run engine. The legacy
//! `{ inputs, run_id }` blob path is still accepted behind a deprecation warn.
//!
//! RED-first: these exercise the full handler end-to-end through
//! `create_router` + `oneshot`.
//!   - recipe path → 202 + a frozen `run_resolved_graphs` row + a run link.
//!   - recipe pin ≠ revision pin → 409.
//!   - control_values target a `locked` control → 422.
//!   - legacy `{ inputs, run_id }` (no control_values) → 202, no recipe compile.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_recipe::{Control, ControlKind, ControlMode, Output, RecipeProjection};
use nexus_storage::{
    Database, DeploymentMappers, RecipeRecord, WorkflowRecord, WorkflowVersionRecord,
};
use serde_json::json;
use std::sync::Arc;
use tower::ServiceExt;

mod common;

const WF_ID: &str = "wf-dep-1";
const WF_VER: &str = "v1";

fn workflow_record(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "T".into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-06-24T00:00:00Z".into(),
        updated_at: "2026-06-24T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn version_record(workflow_id: &str, version: &str) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        label: Some("1.0.0".into()),
        canonical_hash: format!("hash-{version}"),
        operator_schema_hash: "ophash".into(),
        nodes: "[]".into(),
        edges: "[]".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        stages: Some("[]".into()),
        author_kind: "user".into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn recipe_record(
    id: &str,
    workflow_version: Option<&str>,
    projection: Option<String>,
) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.0.0".into(),
        display_name: "Demo".into(),
        summary: "S".into(),
        category: "audio".into(),
        extension_id: Some("ext.demo".into()),
        extension_version: Some("1.0.0".into()),
        workflow_template_ref: "workflows/main.yaml".into(),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".into(),
        created_at: "2026-06-24T00:00:00Z".into(),
        workflow_id: Some(WF_ID.into()),
        workflow_version: workflow_version.map(str::to_owned),
        projection,
        projection_schema_version: 1,
        status: "healthy".into(),
        status_reason: None,
        author_kind: "user".into(),
    }
}

/// A binding-free single-control projection; `mode` is the test variable.
fn projection_with_control(control_id: &str, mode: ControlMode) -> String {
    let projection = RecipeProjection {
        schema_version: 1,
        sections: Vec::new(),
        controls: vec![Control {
            control_id: control_id.into(),
            kind: ControlKind::Int,
            label: "Steps".into(),
            help_text: None,
            mode,
            default_value: json!(16),
            widget_hint: None,
            bindings: Vec::new(),
        }],
        presets: Vec::new(),
        output: Output {
            primary_artifact: String::new(),
            secondary: Vec::new(),
            preview_style: String::new(),
            show_intermediate: false,
        },
        custom_ui: None,
    };
    serde_json::to_string(&projection).unwrap()
}

fn dep_repo(h: &common::TestHarness) -> Arc<dyn DeploymentRepository> {
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        h.state.db.pool().clone(),
    )))
}

/// Seed the host workflow + pinned version + the recipe, returning a deployment
/// whose primary source is `source_kind='recipe'` and whose revision is pinned
/// to `WF_ID/WF_VER`. `recipe_pin` is the recipe's own `workflow_version` — set
/// it `!= WF_VER` to drive the pin-divergence path.
async fn seed_recipe_deployment(
    h: &common::TestHarness,
    recipe_id: &str,
    recipe_pin: Option<&str>,
    projection: Option<String>,
) -> nexus_deployments::service::save::SavedDeployment {
    h.state
        .db
        .insert_workflow(&workflow_record(WF_ID))
        .await
        .unwrap();
    h.state
        .db
        .insert_workflow_version(&version_record(WF_ID, WF_VER))
        .await
        .unwrap();
    h.state
        .db
        .set_current_version(WF_ID, WF_VER, "t")
        .await
        .unwrap();
    h.state
        .db
        .insert_recipe(&recipe_record(recipe_id, recipe_pin, projection))
        .await
        .unwrap();

    let repo = dep_repo(h);
    let svc = DeploymentSaveService::new(repo);
    let req = SaveRequest {
        display_name: recipe_id.into(),
        slug: recipe_id.into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some(WF_ID.into()),
            workflow_version: Some(WF_VER.into()),
            recipe_id: Some(recipe_id.into()),
            recipe_version: Some("1.0.0".into()),
            extension_id: None,
            source_kind: "recipe".into(),
        },
        workflow_payload: json!({"nodes": [], "edges": []}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let (saved, _) = svc.save(req).await.unwrap();
    saved
}

async fn post_runs(
    h: common::TestHarness,
    deployment_id: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(h.state);
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!("/api/v1/deployments/{deployment_id}/runs"))
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null);
    (status, json)
}

#[tokio::test]
async fn post_deployments_id_runs_recipe_path() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let db = h.state.db.clone();
    let saved = seed_recipe_deployment(&h, "rcp-ok", Some(WF_VER), None).await;
    let dep_id = saved.deployment_id.to_string();
    let repo = dep_repo(&h);

    let body = json!({
        "control_values": {},
        "preset_id": serde_json::Value::Null,
        "revision_id": saved.revision_id.to_string(),
    });
    let (status, json) = post_runs(h, &dep_id, body).await;
    assert_eq!(status, StatusCode::ACCEPTED, "body: {json}");

    let run_id = json["data"]["run_id"]
        .as_str()
        .expect("run_id in 202 response");

    // The run engine froze the resolved graph.
    assert!(
        db.get_run_resolved_graph(run_id).await.is_ok(),
        "run_resolved_graphs row must exist for the created run"
    );

    // The deployment run link was recorded.
    let links: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM deployment_run_links WHERE deployment_id = ? AND run_id = ?",
    )
    .bind(&dep_id)
    .bind(run_id)
    .fetch_one(db.pool())
    .await
    .unwrap();
    assert_eq!(links, 1, "a deployment run link must be recorded");

    let _ = repo;
}

#[tokio::test]
async fn post_deployments_id_runs_recipe_blocked_when_not_restorable() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let db = h.state.db.clone();
    let saved = seed_recipe_deployment(&h, "rcp-blocked", Some(WF_VER), None).await;
    let dep_id = saved.deployment_id.to_string();

    // Force the deployment into a restore_state that must reject execute BEFORE
    // any compile/freeze (mirrors DeploymentExecuteService restore guard).
    sqlx::query("UPDATE deployments SET restore_state = 'not_restorable' WHERE id = ?")
        .bind(&dep_id)
        .execute(db.pool())
        .await
        .unwrap();

    let body = json!({ "control_values": {}, "revision_id": saved.revision_id.to_string() });
    let (status, json) = post_runs(h, &dep_id, body).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");

    // OR-1: the run engine must never have been reached — no frozen graph rows.
    let frozen: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM run_resolved_graphs")
        .fetch_one(db.pool())
        .await
        .unwrap();
    assert_eq!(
        frozen, 0,
        "a rejected submit must not freeze a resolved run graph"
    );
}

#[tokio::test]
async fn post_deployments_id_runs_rejects_pin_divergence() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    // Recipe pins a different version than the revision's base_workflow_version_ref.
    let saved = seed_recipe_deployment(&h, "rcp-diverge", Some("v-other"), None).await;
    let dep_id = saved.deployment_id.to_string();

    let body = json!({ "control_values": {}, "revision_id": saved.revision_id.to_string() });
    let (status, json) = post_runs(h, &dep_id, body).await;
    assert_eq!(status, StatusCode::CONFLICT, "body: {json}");
}

#[tokio::test]
async fn post_deployments_id_runs_recipe_locked_override() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = projection_with_control("steps", ControlMode::Locked);
    let saved = seed_recipe_deployment(&h, "rcp-locked", Some(WF_VER), Some(proj)).await;
    let dep_id = saved.deployment_id.to_string();

    let body = json!({
        "control_values": { "steps": 32 },
        "revision_id": saved.revision_id.to_string(),
    });
    let (status, json) = post_runs(h, &dep_id, body).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
}

#[tokio::test]
async fn post_deployments_id_runs_legacy_inputs_blob_still_accepted() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let db = h.state.db.clone();
    let saved = seed_recipe_deployment(&h, "rcp-legacy", Some(WF_VER), None).await;
    let dep_id = saved.deployment_id.to_string();

    // Legacy path supplies its own run_id; the FK to runs(id) must be satisfied.
    sqlx::query(
        "INSERT INTO runs (id, workflow_id, workflow_version, status, created_at) VALUES (?, ?, ?, 'created', '2026-06-24T00:00:00Z')",
    )
    .bind("run_legacy")
    .bind(WF_ID)
    .bind(WF_VER)
    .execute(db.pool())
    .await
    .unwrap();

    let body = json!({ "inputs": { "prompt": "hi" }, "run_id": "run_legacy" });
    let (status, json) = post_runs(h, &dep_id, body).await;
    assert_eq!(status, StatusCode::ACCEPTED, "body: {json}");
    assert_eq!(json["data"]["run_id"], "run_legacy");

    // Legacy path does NOT freeze a resolved graph (no recipe compile).
    assert!(
        db.get_run_resolved_graph("run_legacy").await.is_err(),
        "legacy inputs-blob path must not compile a recipe graph"
    );
}
