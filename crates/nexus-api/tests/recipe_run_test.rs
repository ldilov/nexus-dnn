//! P3 — `POST /recipes/{id}/run` compiles a recipe's controls through the
//! binding compiler against its pinned workflow-version snapshot, persists the
//! frozen graph, and launches a run. Exercised via the `run_recipe` handler
//! against an in-memory `AppState` harness (the api crate has no full HTTP
//! test server; direct-call is the harness convention used across these tests).

use axum::Json;
use axum::extract::{Path, State};

use nexus_api::handlers::recipes::{RecipeRunRequest, run_recipe};
use nexus_storage::Database;
use nexus_storage::records::{
    ExtensionRecord, RecipeRecord, WorkflowRecord, WorkflowVersionRecord,
};

mod common;
use common::{StubHf, harness_with};

const WORKFLOW_ID: &str = "wf-recipe-run";
const RECIPE_ID: &str = "recipe-run-1";
const EXTENSION_ID: &str = "test.ext";

fn seed_extension() -> ExtensionRecord {
    ExtensionRecord {
        id: EXTENSION_ID.into(),
        name: Some("Test extension".into()),
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
        installed_at: "t".into(),
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

fn seed_workflow() -> WorkflowRecord {
    WorkflowRecord {
        id: WORKFLOW_ID.into(),
        title: "Recipe Run WF".into(),
        version: "0.1.0".into(),
        inputs: Some(r#"[{"name":"script","type":"string"}]"#.into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "t".into(),
        updated_at: "t".into(),
        user_edited_at: Some("t".into()),
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn seed_version() -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: WORKFLOW_ID.into(),
        version: "1".into(),
        canonical_hash: "hash1".into(),
        operator_schema_hash: None,
        inputs: Some(r#"[{"name":"script","type":"string"}]"#.into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        author_kind: "user".into(),
        extension_id: None,
        extension_version: None,
        created_at: "t".into(),
    }
}

const PROJECTION: &str = r#"{
  "schema_version": 1,
  "sections": [],
  "controls": [
    {
      "control_id": "text",
      "kind": "string",
      "label": "Text",
      "mode": "basic",
      "default_value": "default",
      "bindings": ["input:script"]
    }
  ],
  "presets": [],
  "output": {}
}"#;

fn seed_recipe() -> RecipeRecord {
    RecipeRecord {
        id: RECIPE_ID.into(),
        version: "1".into(),
        display_name: "Recipe Run".into(),
        summary: "test recipe".into(),
        category: "test".into(),
        extension_id: EXTENSION_ID.into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: WORKFLOW_ID.into(),
        thumbnail: None,
        input_summary: None,
        bindings: "[]".into(),
        workflow_id: Some(WORKFLOW_ID.into()),
        workflow_version: Some("1".into()),
        projection_schema_version: Some(1),
        projection: Some(PROJECTION.into()),
        status: Some("validated".into()),
        author_kind: "extension".into(),
        created_at: "t".into(),
    }
}

#[tokio::test]
async fn run_recipe_compiles_controls_and_persists_frozen_graph() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;

    state.db.insert_workflow(&seed_workflow()).await.unwrap();
    state
        .db
        .insert_workflow_version(&seed_version())
        .await
        .unwrap();
    state
        .db
        .set_workflow_current_version(WORKFLOW_ID, "1", "t")
        .await
        .unwrap();
    state.db.insert_extension(&seed_extension()).await.unwrap();
    state.db.insert_recipe(&seed_recipe()).await.unwrap();

    let mut control_values = std::collections::BTreeMap::new();
    control_values.insert("text".to_string(), serde_json::json!("hello"));

    let response = run_recipe(
        State(state.clone()),
        Path(RECIPE_ID.to_string()),
        Json(RecipeRunRequest {
            control_values,
            preset_id: None,
        }),
    )
    .await
    .expect("run_recipe");

    let created = response.data.expect("created run response");
    assert_eq!(created.status, "created");
    let run_id = created.run_id;
    assert!(!run_id.is_empty());

    let run = state.db.get_run(&run_id).await.expect("run row exists");
    assert_eq!(run.workflow_id, WORKFLOW_ID);
    assert_eq!(run.workflow_version, "1");

    let frozen = state
        .db
        .get_run_resolved_graph(&run_id)
        .await
        .expect("query frozen graph")
        .expect("frozen graph row exists");
    assert_eq!(frozen.workflow_id, WORKFLOW_ID);
    assert_eq!(frozen.workflow_version, "1");

    let _workflow: nexus_workflow::Workflow =
        serde_json::from_str(&frozen.workflow_json).expect("frozen workflow deserializes");

    let inputs: serde_json::Value =
        serde_json::from_str(&frozen.inputs_values_json).expect("inputs deserialize");
    assert_eq!(inputs.get("script"), Some(&serde_json::json!("hello")));
}

#[tokio::test]
async fn run_recipe_uses_default_when_no_control_value_given() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;

    state.db.insert_workflow(&seed_workflow()).await.unwrap();
    state
        .db
        .insert_workflow_version(&seed_version())
        .await
        .unwrap();
    state
        .db
        .set_workflow_current_version(WORKFLOW_ID, "1", "t")
        .await
        .unwrap();
    state.db.insert_extension(&seed_extension()).await.unwrap();
    state.db.insert_recipe(&seed_recipe()).await.unwrap();

    let response = run_recipe(
        State(state.clone()),
        Path(RECIPE_ID.to_string()),
        Json(RecipeRunRequest::default()),
    )
    .await
    .expect("run_recipe with defaults");

    let run_id = response.data.expect("created").run_id;
    let frozen = state
        .db
        .get_run_resolved_graph(&run_id)
        .await
        .unwrap()
        .expect("frozen graph");
    let inputs: serde_json::Value = serde_json::from_str(&frozen.inputs_values_json).unwrap();
    assert_eq!(inputs.get("script"), Some(&serde_json::json!("default")));
}
