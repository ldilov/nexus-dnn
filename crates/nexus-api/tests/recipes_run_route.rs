//! P3a — `POST /api/v1/recipes/{id}/run` ad-hoc recipe run route.
//!
//! Exercises the full handler end-to-end through `create_router` + `oneshot`:
//! a valid pin compiles and creates a run (frozen `run_resolved_graphs` row),
//! a locked-override is rejected 422 server-side, an unknown recipe 404s, a
//! broken pin 422s, and a legacy custom-UI recipe (projection: None) still
//! loads + runs post-migration (FR-10/FR-10.1 regression).

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_recipe::{Control, ControlKind, ControlMode, Output, RecipeProjection};
use nexus_storage::{Database, RecipeRecord, WorkflowRecord, WorkflowVersionRecord};
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

/// A binding-free single-control projection. The control's `mode` is the test's
/// variable; with no bindings it never fans out, so compile succeeds when the
/// user does not override a locked/hidden control.
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
            default_value: serde_json::json!(16),
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

async fn seed_pinned(h: &common::TestHarness, recipe: &RecipeRecord) {
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

async fn post_run(
    h: common::TestHarness,
    recipe_id: &str,
    body: serde_json::Value,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(h.state);
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!("/api/v1/recipes/{recipe_id}/run"))
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
async fn post_recipes_id_run_compiles_and_creates_run() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let db = h.state.db.clone();
    seed_pinned(&h, &recipe_record("r1", None)).await;

    let (status, body) = post_run(h, "r1", serde_json::json!({})).await;
    assert_eq!(status, StatusCode::CREATED, "body: {body}");

    let run_id = body["data"]["run_id"]
        .as_str()
        .expect("run_id in created response");
    assert_eq!(body["data"]["status"], "created");

    // OR-1: the run row exists and its frozen resolved graph was persisted.
    let frozen = db.get_run_resolved_graph(run_id).await;
    assert!(
        frozen.is_ok(),
        "run_resolved_graphs row must exist for the created run"
    );
}

#[tokio::test]
async fn post_recipes_id_run_rejects_locked_override() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = projection_with_control("steps", ControlMode::Locked);
    seed_pinned(&h, &recipe_record("r-locked", Some(proj))).await;

    let body = serde_json::json!({ "control_values": { "steps": 32 } });
    let (status, json) = post_run(h, "r-locked", body).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
    assert_eq!(json["error"]["code"], "BINDING_LOCKED_OVERRIDE");
}

#[tokio::test]
async fn post_recipes_id_run_404_unknown_recipe() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;

    let (status, _json) = post_run(h, "does-not-exist", serde_json::json!({})).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn post_recipes_id_run_422_broken_pin() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    // Recipe pins wf-1/v1 but no workflow_versions row is ever inserted.
    h.state
        .db
        .insert_recipe(&recipe_record("r-broken", None))
        .await
        .unwrap();

    let (status, json) = post_run(h, "r-broken", serde_json::json!({})).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
}

#[tokio::test]
async fn legacy_custom_recipe_ui_still_loads_and_runs_post_migration() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let db = h.state.db.clone();
    // Legacy / custom-UI recipe: projection is None (pre-P4/P7).
    seed_pinned(&h, &recipe_record("r-legacy", None)).await;

    // FR-10: the recipe still loads via GET.
    let loaded = db.get_recipe("r-legacy").await.unwrap();
    assert!(
        loaded.projection.is_none(),
        "legacy recipe has no projection"
    );

    // FR-10.1: empty projection + empty controls = base graph = valid run.
    let (status, body) = post_run(h, "r-legacy", serde_json::json!({})).await;
    assert_eq!(status, StatusCode::CREATED, "body: {body}");
    let run_id = body["data"]["run_id"].as_str().expect("run_id");
    assert!(db.get_run_resolved_graph(run_id).await.is_ok());
}
