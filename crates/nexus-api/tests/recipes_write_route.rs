//! P6 — recipe write API + exposable-targets scan.
//!
//! Route-level coverage (`create_router` + `oneshot`) for `POST /recipes`,
//! `PUT /recipes/{id}`, `DELETE /recipes/{id}`, and
//! `GET /workflows/{id}/versions/{version}/exposable-targets`. Pure-scan
//! coverage (`scan_exposable_targets` over a hand-built snapshot) exercises the
//! node-config path without needing a populated operator registry.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::handlers::recipes::scan_exposable_targets;
use nexus_extension::OperatorDefinition;
use nexus_storage::{Database, RecipeRecord, WorkflowRecord, WorkflowVersionRecord};
use nexus_workflow::WorkflowVersionSnapshot;
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

fn version_record(workflow_id: &str, version: &str) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        label: Some("1.0.0".into()),
        canonical_hash: format!("hash-{version}"),
        operator_schema_hash: "ophash".into(),
        nodes: "[]".into(),
        edges: "[]".into(),
        inputs: Some(r#"[{"name":"speed","type":"string"}]"#.into()),
        outputs: Some("[]".into()),
        stages: Some("[]".into()),
        author_kind: "user".into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn recipe_record(id: &str, author_kind: &str) -> RecipeRecord {
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
        projection: Some(
            "{\"schema_version\":1,\"output\":{\"primary_artifact\":\"\",\"preview_style\":\"\"}}"
                .into(),
        ),
        projection_schema_version: 1,
        status: "healthy".into(),
        status_reason: None,
        author_kind: author_kind.into(),
    }
}

/// A projection with one control bound to the given target + a string default.
fn projection_json(binding: &str) -> serde_json::Value {
    serde_json::json!({
        "schema_version": 1,
        "sections": [],
        "controls": [{
            "control_id": "speed",
            "kind": "string",
            "label": "Speed",
            "mode": "basic",
            "default_value": "slow",
            "bindings": [binding]
        }],
        "presets": [],
        "output": {
            "primary_artifact": "",
            "secondary": [],
            "preview_style": "",
            "show_intermediate": false
        }
    })
}

fn write_body(display_name: &str, projection: serde_json::Value) -> serde_json::Value {
    serde_json::json!({
        "display_name": display_name,
        "summary": "a user recipe",
        "category": "audio",
        "workflow_id": "wf-1",
        "workflow_version": "v1",
        "projection": projection
    })
}

async fn seed_workflow(h: &common::TestHarness) {
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
}

async fn request(
    state: nexus_api::AppState,
    method: &str,
    uri: &str,
    body: Option<serde_json::Value>,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let mut builder = Request::builder().method(method).uri(uri);
    let req = match body {
        Some(b) => {
            builder = builder.header("content-type", "application/json");
            builder.body(Body::from(b.to_string())).unwrap()
        }
        None => builder.body(Body::empty()).unwrap(),
    };
    let resp = router.oneshot(req).await.unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null);
    (status, json)
}

#[tokio::test]
async fn create_recipe_persists_user_row() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    let body = write_body("My Recipe", projection_json("input:speed"));
    let (status, created) = request(state.clone(), "POST", "/api/v1/recipes", Some(body)).await;
    assert_eq!(status, StatusCode::CREATED, "body: {created}");
    let id = created["data"]["id"]
        .as_str()
        .expect("created id")
        .to_owned();
    assert_eq!(created["data"]["status"], "healthy");

    let stored = state.db.get_recipe(&id).await.unwrap();
    assert_eq!(stored.author_kind, "user");
    assert_eq!(stored.extension_id, None);
    assert_eq!(stored.workflow_id.as_deref(), Some("wf-1"));
    assert_eq!(stored.workflow_version.as_deref(), Some("v1"));
    assert!(stored.projection.is_some(), "projection persisted");
}

#[tokio::test]
async fn create_recipe_rejects_broken_binding() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    // No node `ghost` exists -> UnknownTarget at fan-out.
    let body = write_body("Bad", projection_json("node:ghost.config.steps"));
    let (status, json) = request(state.clone(), "POST", "/api/v1/recipes", Some(body)).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
    assert_eq!(json["error"]["code"], "BINDING_UNKNOWN_TARGET");

    assert!(
        state.db.list_recipes().await.unwrap().is_empty(),
        "nothing persists on a rejected save"
    );
}

#[tokio::test]
async fn create_recipe_rejects_unknown_pinned_version() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    let mut body = write_body("Bad pin", projection_json("input:speed"));
    body["workflow_version"] = serde_json::json!("v99");
    let (status, json) = request(state.clone(), "POST", "/api/v1/recipes", Some(body)).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
    assert_eq!(json["error"]["code"], "RECIPE_BROKEN_PIN");
}

#[tokio::test]
async fn update_recipe_edits_user_row() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    h.state
        .db
        .insert_recipe(&recipe_record("r-user", "user"))
        .await
        .unwrap();
    let state = h.state.clone();

    let body = write_body("Renamed", projection_json("input:speed"));
    let (status, updated) =
        request(state.clone(), "PUT", "/api/v1/recipes/r-user", Some(body)).await;
    assert_eq!(status, StatusCode::OK, "body: {updated}");
    assert_eq!(updated["data"]["display_name"], "Renamed");

    let stored = state.db.get_recipe("r-user").await.unwrap();
    assert_eq!(stored.display_name, "Renamed");
    assert_eq!(stored.author_kind, "user");
}

#[tokio::test]
async fn update_recipe_cannot_mutate_extension_row() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    h.state
        .db
        .insert_recipe(&recipe_record("r-ext", "extension"))
        .await
        .unwrap();
    let state = h.state.clone();

    let body = write_body("Hijacked", projection_json("input:speed"));
    let (status, json) = request(state.clone(), "PUT", "/api/v1/recipes/r-ext", Some(body)).await;
    assert_eq!(status, StatusCode::FORBIDDEN, "body: {json}");
    assert_eq!(json["error"]["code"], "RECIPE_NOT_USER_AUTHORED");

    let stored = state.db.get_recipe("r-ext").await.unwrap();
    assert_eq!(stored.display_name, "Demo", "extension row untouched");
}

#[tokio::test]
async fn delete_recipe_removes_user_row_but_not_extension_row() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    h.state
        .db
        .insert_recipe(&recipe_record("r-user", "user"))
        .await
        .unwrap();
    h.state
        .db
        .insert_recipe(&recipe_record("r-ext", "extension"))
        .await
        .unwrap();
    let state = h.state.clone();

    let (status, _) = request(state.clone(), "DELETE", "/api/v1/recipes/r-user", None).await;
    assert_eq!(status, StatusCode::NO_CONTENT);
    assert!(state.db.get_recipe("r-user").await.is_err(), "user deleted");

    let (status, _) = request(state.clone(), "DELETE", "/api/v1/recipes/r-ext", None).await;
    assert_eq!(status, StatusCode::NOT_FOUND, "extension delete is a no-op");
    assert!(state.db.get_recipe("r-ext").await.is_ok(), "extension kept");
}

#[tokio::test]
async fn created_user_recipe_survives_extension_rescan() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    let body = write_body("Survivor", projection_json("input:speed"));
    let (status, created) = request(state.clone(), "POST", "/api/v1/recipes", Some(body)).await;
    assert_eq!(status, StatusCode::CREATED);
    let id = created["data"]["id"].as_str().unwrap().to_owned();

    // An extension re-scan deletes only author_kind='extension' rows.
    state
        .db
        .delete_recipes_by_extension("ext.demo")
        .await
        .unwrap();

    assert!(
        state.db.get_recipe(&id).await.is_ok(),
        "user recipe survives extension re-scan"
    );
}

#[tokio::test]
async fn exposable_targets_route_lists_inputs() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    let (status, body) = request(
        state,
        "GET",
        "/api/v1/workflows/wf-1/versions/v1/exposable-targets",
        None,
    )
    .await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    assert_eq!(body["data"]["workflow_id"], "wf-1");
    let inputs = body["data"]["inputs"].as_array().expect("inputs array");
    assert_eq!(inputs.len(), 1);
    assert_eq!(inputs[0]["target"], "input:speed");
    assert_eq!(inputs[0]["kind"], "input");
    assert_eq!(inputs[0]["port_type"], "string");
}

#[tokio::test]
async fn exposable_targets_route_404_for_missing_version() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    seed_workflow(&h).await;
    let state = h.state.clone();

    let (status, _) = request(
        state,
        "GET",
        "/api/v1/workflows/wf-1/versions/v99/exposable-targets",
        None,
    )
    .await;
    assert_eq!(status, StatusCode::NOT_FOUND);
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
fn scan_lists_inputs_and_node_config_targets() {
    let op = operator(
        "synth",
        "1.0.0",
        serde_json::json!({
            "type": "object",
            "required": ["steps"],
            "properties": {
                "steps": { "type": "integer", "minimum": 1, "maximum": 50 },
                "sampler": { "type": "string", "default": "euler" }
            }
        }),
    );
    let snapshot = snapshot_with(
        serde_json::json!({
            "id": "wf-1", "title": "T", "version": "1.0.0",
            "inputs": [{ "name": "prompt", "type": "string" }],
            "outputs": [], "stages": [],
            "created_at": "t", "updated_at": "t",
            "nodes": [{
                "id": "gen",
                "operator": "synth@1.0.0",
                "inputs": {},
                "config": { "steps": 16 }
            }]
        }),
        &[op],
    );

    let scan = scan_exposable_targets(&snapshot);

    assert_eq!(scan.inputs.len(), 1);
    assert_eq!(scan.inputs[0].target, "input:prompt");

    assert_eq!(scan.node_configs.len(), 2);
    let steps = scan
        .node_configs
        .iter()
        .find(|t| t.label == "steps")
        .expect("steps target");
    assert_eq!(steps.target, "node:gen.config.steps");
    assert_eq!(steps.kind, "node_config");
    assert_eq!(steps.node_id.as_deref(), Some("gen"));
    assert!(steps.required, "steps is in the schema's required[]");
    assert_eq!(steps.current_default, Some(serde_json::json!(16)));

    let sampler = scan
        .node_configs
        .iter()
        .find(|t| t.label == "sampler")
        .expect("sampler target");
    assert!(!sampler.required);
    assert_eq!(sampler.current_default, Some(serde_json::json!("euler")));
}

#[test]
fn scan_skips_nodes_with_unknown_operator() {
    let snapshot = snapshot_with(
        serde_json::json!({
            "id": "wf-1", "title": "T", "version": "1.0.0",
            "inputs": [], "outputs": [], "stages": [],
            "created_at": "t", "updated_at": "t",
            "nodes": [{
                "id": "gen",
                "operator": "missing@1.0.0",
                "inputs": {},
                "config": null
            }]
        }),
        &[],
    );

    let scan = scan_exposable_targets(&snapshot);
    assert!(
        scan.node_configs.is_empty(),
        "unknown operator -> no targets"
    );
}
