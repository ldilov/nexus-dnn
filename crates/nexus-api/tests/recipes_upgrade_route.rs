//! P8 — recipe upgrade assistant routes.
//!
//! Route-level coverage for `GET /recipes/{id}/upgrade-preview` (read-only pin
//! diff + risk summary) and `POST /recipes/{id}/upgrade` (migration copy for a
//! clean upgrade, broken-binding report for a breaking one). Generic by `{id}`.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_storage::{Database, RecipeRecord, WorkflowRecord, WorkflowVersionRecord};
use tower::ServiceExt;

mod common;

fn workflow_record(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "T".into(),
        version: "1.0.0".into(),
        inputs: Some(r#"[{"name":"speed","type":"string"}]"#.into()),
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

/// Version record with caller-chosen input ports (empty = the bound port is gone).
fn version_record(workflow_id: &str, version: &str, inputs_json: &str) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        label: Some("1.0.0".into()),
        canonical_hash: format!("hash-{version}"),
        operator_schema_hash: "ophash".into(),
        nodes: "[]".into(),
        edges: "[]".into(),
        inputs: Some(inputs_json.into()),
        outputs: Some("[]".into()),
        stages: Some("[]".into()),
        author_kind: "extension".into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn recipe_record(id: &str, pinned_version: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.2.3".into(),
        display_name: "Voice Batch".into(),
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
        workflow_version: Some(pinned_version.into()),
        projection: Some(
            serde_json::json!({
                "schema_version": 1,
                "sections": [],
                "controls": [{
                    "control_id": "speed",
                    "kind": "string",
                    "label": "Speed",
                    "mode": "basic",
                    "default_value": "slow",
                    "bindings": ["input:speed"]
                }],
                "presets": [],
                "output": {
                    "primary_artifact": "audio",
                    "secondary": [],
                    "preview_style": "player",
                    "show_intermediate": false
                }
            })
            .to_string(),
        ),
        projection_schema_version: 1,
        status: "outdated".into(),
        status_reason: None,
        author_kind: "extension".into(),
    }
}

const HAS_SPEED: &str = r#"[{"name":"speed","type":"string"}]"#;
const NO_INPUTS: &str = "[]";

/// Seed wf-1 with v1 + v2 (v2 current). `v2_inputs` controls whether the bound
/// `speed` port still exists in the current version.
async fn seed(h: &common::TestHarness, v2_inputs: &str) {
    h.state
        .db
        .insert_workflow(&workflow_record("wf-1"))
        .await
        .unwrap();
    h.state
        .db
        .insert_workflow_version(&version_record("wf-1", "v1", HAS_SPEED))
        .await
        .unwrap();
    h.state
        .db
        .insert_workflow_version(&version_record("wf-1", "v2", v2_inputs))
        .await
        .unwrap();
    h.state
        .db
        .set_current_version("wf-1", "v2", "t")
        .await
        .unwrap();
    h.state
        .db
        .insert_recipe(&recipe_record("r-1", "v1"))
        .await
        .unwrap();
}

async fn request(
    state: nexus_api::AppState,
    method: &str,
    uri: &str,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let req = Request::builder()
        .method(method)
        .uri(uri)
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null);
    (status, json)
}

#[tokio::test]
async fn upgrade_preview_reports_outdated() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed(&h, HAS_SPEED).await;

    let (status, body) = request(
        h.state.clone(),
        "GET",
        "/api/v1/recipes/r-1/upgrade-preview",
    )
    .await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert_eq!(body["data"]["is_outdated"], true);
    assert_eq!(body["data"]["risk"], "outdated");
    assert_eq!(body["data"]["summary"], "outdated");
    assert_eq!(body["data"]["pinned_version"], "v1");
    assert_eq!(body["data"]["current_version"], "v2");
    assert!(
        body["data"]["broken_bindings"]
            .as_array()
            .unwrap()
            .is_empty(),
        "no breakage on a clean upgrade"
    );
}

#[tokio::test]
async fn upgrade_preview_flags_breaking_when_binding_target_removed() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed(&h, NO_INPUTS).await;

    let (status, body) = request(
        h.state.clone(),
        "GET",
        "/api/v1/recipes/r-1/upgrade-preview",
    )
    .await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert_eq!(body["data"]["risk"], "breaking");
    assert_eq!(body["data"]["summary"], "broken");
    let broken = body["data"]["broken_bindings"].as_array().unwrap();
    assert_eq!(broken.len(), 1);
    assert_eq!(broken[0]["control_id"], "speed");
    assert_eq!(broken[0]["target"], "input:speed");
}

#[tokio::test]
async fn upgrade_creates_migration_copy_for_clean_upgrade() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed(&h, HAS_SPEED).await;
    let state = h.state.clone();

    let (status, body) = request(state.clone(), "POST", "/api/v1/recipes/r-1/upgrade").await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    let new_id = body["data"]["new_recipe_id"]
        .as_str()
        .expect("new recipe id");
    assert_ne!(new_id, "r-1");
    assert!(
        body["data"]["broken_bindings"]
            .as_array()
            .unwrap()
            .is_empty()
    );

    let copy = state.db.get_recipe(new_id).await.unwrap();
    assert_eq!(copy.author_kind, "user");
    assert_eq!(copy.workflow_version.as_deref(), Some("v2"), "re-pinned");
    assert_eq!(copy.version, "1.2.4", "recipe_version patch-bumped");
    assert!(copy.display_name.contains("Voice Batch"));

    let original = state.db.get_recipe("r-1").await.unwrap();
    assert_eq!(
        original.workflow_version.as_deref(),
        Some("v1"),
        "source untouched"
    );
}

#[tokio::test]
async fn upgrade_breaking_returns_broken_bindings_without_copy() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed(&h, NO_INPUTS).await;
    let state = h.state.clone();

    let before = state.db.list_recipes().await.unwrap().len();
    let (status, body) = request(state.clone(), "POST", "/api/v1/recipes/r-1/upgrade").await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert!(
        body["data"]["new_recipe_id"].is_null(),
        "no copy on breakage"
    );
    assert_eq!(body["data"]["broken_bindings"].as_array().unwrap().len(), 1);
    assert_eq!(
        state.db.list_recipes().await.unwrap().len(),
        before,
        "nothing persisted"
    );
}
