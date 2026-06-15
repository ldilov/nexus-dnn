//! P3 Task 4 — `POST /api/v1/deployments/{id}/runs` accepts recipe control
//! values. When `control_values` are present the handler resolves the
//! deployment's source recipe, compiles it through the binding compiler, and
//! launches a run from the frozen graph (in addition to the legacy run-link /
//! context-hash bookkeeping). When only the legacy `inputs` blob is given the
//! pre-P3 path is preserved and no frozen graph is produced.

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::Database;
use nexus_storage::DeploymentMappers;
use nexus_storage::records::{
    ExtensionRecord, RecipeRecord, RunRecord, WorkflowRecord, WorkflowVersionRecord,
};
use serde_json::json;
use tower::ServiceExt;

mod common;
use common::{StubHf, harness_with};

const WORKFLOW_ID: &str = "wf-deploy-run";
const RECIPE_ID: &str = "recipe-deploy-1";
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
        title: "Deploy Run WF".into(),
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
        display_name: "Deploy Recipe".into(),
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

async fn seed_deployment(state: &nexus_api::AppState) -> String {
    let mappers = DeploymentMappers::new(state.db.pool().clone());
    let repo = Arc::new(SqliteDeploymentRepository::new(mappers));
    let svc = DeploymentSaveService::new(repo.clone());
    let request = SaveRequest {
        display_name: "Deploy".into(),
        slug: "deploy-1".into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "test".into(),
        save_mode: "manual".into(),
        source: SourceRef {
            workflow_id: Some(WORKFLOW_ID.into()),
            workflow_version: Some("1".into()),
            recipe_id: Some(RECIPE_ID.into()),
            recipe_version: Some("1".into()),
            extension_id: Some(EXTENSION_ID.into()),
            source_kind: "recipe".into(),
        },
        workflow_payload: json!({ "id": WORKFLOW_ID, "nodes": [], "edges": [] }),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let (saved, _events) = svc.save(request).await.expect("save deployment");
    saved.deployment_id.to_string()
}

async fn seed_recipe_chain(state: &nexus_api::AppState) {
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
}

async fn post(
    state: nexus_api::AppState,
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
async fn deployment_run_with_control_values_compiles_and_freezes_graph() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;
    seed_recipe_chain(&state).await;
    let deployment_id = seed_deployment(&state).await;

    let (status, body) = post(
        state.clone(),
        &format!("/api/v1/deployments/{deployment_id}/runs"),
        json!({ "control_values": { "text": "hello" } }),
    )
    .await;

    assert_eq!(status, StatusCode::ACCEPTED, "body: {body}");
    let run_id = body["data"]["run_id"]
        .as_str()
        .expect("run_id in response")
        .to_owned();
    assert!(!run_id.is_empty());

    let frozen = state
        .db
        .get_run_resolved_graph(&run_id)
        .await
        .expect("query frozen graph")
        .expect("frozen graph row exists for compiled run");
    assert_eq!(frozen.workflow_id, WORKFLOW_ID);
    assert_eq!(frozen.workflow_version, "1");
    let inputs: serde_json::Value =
        serde_json::from_str(&frozen.inputs_values_json).expect("inputs deserialize");
    assert_eq!(inputs.get("script"), Some(&json!("hello")));
}

#[tokio::test]
async fn deployment_run_legacy_inputs_path_has_no_frozen_graph() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;
    seed_recipe_chain(&state).await;
    let deployment_id = seed_deployment(&state).await;

    let legacy_run_id = "legacy-run-1";
    state
        .db
        .insert_run(&RunRecord {
            id: legacy_run_id.into(),
            workflow_id: WORKFLOW_ID.into(),
            workflow_version: "1".into(),
            status: "created".into(),
            started_at: None,
            completed_at: None,
            error: None,
            created_at: "t".into(),
            run_label: None,
            execution_profile: None,
            predecessor_run_id: None,
        })
        .await
        .expect("pre-create legacy run row");
    let (status, body) = post(
        state.clone(),
        &format!("/api/v1/deployments/{deployment_id}/runs"),
        json!({ "run_id": legacy_run_id, "inputs": { "script": "legacy" } }),
    )
    .await;

    assert_eq!(status, StatusCode::ACCEPTED, "body: {body}");
    assert_eq!(body["data"]["run_id"].as_str(), Some(legacy_run_id));
    assert!(
        state
            .db
            .get_run_resolved_graph(legacy_run_id)
            .await
            .expect("query frozen graph")
            .is_none(),
        "legacy inputs path must not produce a frozen graph"
    );
}
