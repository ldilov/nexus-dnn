//! P4 — `GET /api/v1/recipes/{id}/form` recipe-form projection route.
//!
//! Route-level coverage (`create_router` + `oneshot`): a pinned recipe returns
//! its projection plus one control-hint per control; an unknown recipe 404s; a
//! legacy recipe (projection: None) returns an empty projection + empty hints
//! without panicking. Pure-resolver coverage (`resolve_control_hints` over a
//! hand-built `WorkflowVersionSnapshot`): a node-config binding lifts
//! `minimum/maximum/multipleOf/enum`; an input-port binding lifts `kind`.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::handlers::recipes::resolve_control_hints;
use nexus_extension::OperatorDefinition;
use nexus_recipe::{Control, ControlKind, ControlMode, Output, RecipeProjection};
use nexus_storage::{Database, RecipeRecord, WorkflowRecord, WorkflowVersionRecord};
use nexus_workflow::WorkflowVersionSnapshot;
use tower::ServiceExt;

mod common;

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

fn recipe_record(id: &str, projection: Option<String>) -> RecipeRecord {
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
        workflow_id: Some("wf-1".into()),
        workflow_version: Some("v1".into()),
        projection,
        projection_schema_version: 1,
        status: "healthy".into(),
        status_reason: None,
        author_kind: "user".into(),
    }
}

/// One control with caller-supplied id/kind/bindings; everything else fixed.
fn control(control_id: &str, kind: ControlKind, bindings: Vec<String>) -> Control {
    Control {
        control_id: control_id.into(),
        kind,
        label: "L".into(),
        help_text: None,
        mode: ControlMode::Basic,
        default_value: serde_json::Value::Null,
        widget_hint: None,
        bindings,
    }
}

fn projection_with(controls: Vec<Control>) -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: Vec::new(),
        controls,
        presets: Vec::new(),
        output: Output {
            primary_artifact: String::new(),
            secondary: Vec::new(),
            preview_style: String::new(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

async fn seed(h: &common::TestHarness, recipe: &RecipeRecord) {
    h.state
        .db
        .insert_workflow(&workflow_record("wf-1"))
        .await
        .unwrap();
    h.state
        .db
        .insert_workflow_version(&version_record("wf-1", "v1"))
        .await
        .unwrap();
    h.state
        .db
        .set_current_version("wf-1", "v1", "t")
        .await
        .unwrap();
    h.state.db.insert_recipe(recipe).await.unwrap();
}

async fn get_form(h: common::TestHarness, recipe_id: &str) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(h.state);
    let resp = router
        .oneshot(
            Request::builder()
                .method("GET")
                .uri(format!("/api/v1/recipes/{recipe_id}/form"))
                .body(Body::empty())
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
async fn get_recipe_form_returns_projection_and_hints() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = serde_json::to_string(&projection_with(vec![
        control("a", ControlKind::Int, Vec::new()),
        control("b", ControlKind::String, Vec::new()),
    ]))
    .unwrap();
    seed(&h, &recipe_record("r1", Some(proj))).await;

    let (status, body) = get_form(h, "r1").await;
    assert_eq!(status, StatusCode::OK, "body: {body}");

    assert!(body["data"]["projection"].is_object(), "body: {body}");
    let hints = body["data"]["control_hints"]
        .as_array()
        .expect("control_hints array");
    assert_eq!(hints.len(), 2, "one hint per control; body: {body}");
    let ids: Vec<&str> = hints
        .iter()
        .map(|h| h["control_id"].as_str().unwrap())
        .collect();
    assert!(ids.contains(&"a") && ids.contains(&"b"));
}

#[tokio::test]
async fn get_recipe_form_404_for_unknown_recipe() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let (status, _json) = get_form(h, "does-not-exist").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn get_recipe_form_handles_legacy_recipe_without_projection() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    h.state
        .db
        .insert_recipe(&recipe_record("r-legacy", None))
        .await
        .unwrap();

    let (status, body) = get_form(h, "r-legacy").await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert!(body["data"]["projection"].is_object(), "body: {body}");
    let hints = body["data"]["control_hints"].as_array().unwrap();
    assert!(hints.is_empty(), "legacy recipe has no hints; body: {body}");
}

fn operator(id: &str, version: &str, config_schema: serde_json::Value) -> OperatorDefinition {
    serde_json::from_value(serde_json::json!({
        "spec_version": "1.0",
        "operator": { "id": id, "version": version },
        "config_schema": config_schema,
    }))
    .unwrap()
}

fn snapshot_with(
    workflow_json: serde_json::Value,
    operators: &[OperatorDefinition],
) -> WorkflowVersionSnapshot {
    let workflow: nexus_workflow::Workflow = serde_json::from_value(workflow_json).unwrap();
    WorkflowVersionSnapshot::from_workflow("wf-1", "v1", "hash-v1", workflow, operators)
}

#[test]
fn control_hints_lift_min_max_step_enum_from_operator_config_schema() {
    let op = operator(
        "synth",
        "1.0.0",
        serde_json::json!({
            "type": "object",
            "properties": {
                "steps": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50,
                    "multipleOf": 2,
                    "enum": [4, 8, 16, 32]
                }
            }
        }),
    );
    let snapshot = snapshot_with(
        serde_json::json!({
            "id": "wf-1",
            "title": "T",
            "version": "1.0.0",
            "inputs": [],
            "outputs": [],
            "stages": [],
            "created_at": "t",
            "updated_at": "t",
            "nodes": [{
                "id": "gen",
                "operator": "synth@1.0.0",
                "inputs": {},
                "config": { "steps": 16 }
            }]
        }),
        &[op],
    );
    let binding = format!("node:{}", "gen.config.steps");
    let projection = projection_with(vec![control("steps", ControlKind::Int, vec![binding])]);

    let hints = resolve_control_hints(&projection, &snapshot);
    assert_eq!(hints.len(), 1);
    let hint = &hints[0];
    assert_eq!(hint.control_id, "steps");
    assert_eq!(hint.min, Some(1.0));
    assert_eq!(hint.max, Some(50.0));
    assert_eq!(hint.step, Some(2.0));
    assert_eq!(
        hint.enum_values,
        Some(vec![
            serde_json::json!(4),
            serde_json::json!(8),
            serde_json::json!(16),
            serde_json::json!(32),
        ])
    );
}

#[test]
fn control_hints_lift_input_port_type() {
    let snapshot = snapshot_with(
        serde_json::json!({
            "id": "wf-1",
            "title": "T",
            "version": "1.0.0",
            "inputs": [{ "name": "prompt", "type": "string" }],
            "outputs": [],
            "stages": [],
            "created_at": "t",
            "updated_at": "t",
            "nodes": []
        }),
        &[],
    );
    let binding = "input:prompt".to_string();
    let projection = projection_with(vec![control("prompt", ControlKind::String, vec![binding])]);

    let hints = resolve_control_hints(&projection, &snapshot);
    assert_eq!(hints.len(), 1);
    assert_eq!(hints[0].control_id, "prompt");
    assert_eq!(hints[0].kind.as_deref(), Some("string"));
}

#[test]
fn control_hint_emitted_for_binding_free_control() {
    let snapshot = snapshot_with(
        serde_json::json!({
            "id": "wf-1", "title": "T", "version": "1.0.0",
            "inputs": [], "outputs": [], "stages": [],
            "created_at": "t", "updated_at": "t", "nodes": []
        }),
        &[],
    );
    let projection = projection_with(vec![control("free", ControlKind::Bool, Vec::new())]);

    let hints = resolve_control_hints(&projection, &snapshot);
    assert_eq!(hints.len(), 1);
    assert_eq!(hints[0].control_id, "free");
    assert!(hints[0].min.is_none());
    assert!(hints[0].kind.is_none());
}
