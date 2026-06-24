//! P8 — recipe shareability bundle routes.
//!
//! Route-level coverage for `GET /recipes/{id}/bundle` (export) and
//! `POST /recipes/import` (validate + recreate the version if absent + create a
//! user recipe). The round-trip exports from one store and imports into a clean
//! one, asserting the immutable version is recreated and the recipe compiles.

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
        author_kind: "extension".into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn recipe_record(id: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.0.0".into(),
        display_name: "Voice".into(),
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
        status: "healthy".into(),
        status_reason: None,
        author_kind: "extension".into(),
    }
}

async fn seed(h: &common::TestHarness) {
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
    h.state
        .db
        .insert_recipe(&recipe_record("r-1"))
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
async fn export_bundle_then_import_into_clean_store() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let source = common::harness_with(hf).await;
    seed(&source).await;

    let (status, body) = request(
        source.state.clone(),
        "GET",
        "/api/v1/recipes/r-1/bundle",
        None,
    )
    .await;
    assert_eq!(status, StatusCode::OK, "export body: {body}");
    let bundle = body["data"].clone();
    assert_eq!(bundle["package_version"], 1);
    assert_eq!(bundle["workflow_snapshot"]["version"], "v1");

    // Import into a fresh store that has neither the version nor the recipe.
    let hf2 = std::sync::Arc::new(common::StubHf::default());
    let dest = common::harness_with(hf2).await;
    let (status, imported) = request(
        dest.state.clone(),
        "POST",
        "/api/v1/recipes/import",
        Some(bundle),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "import body: {imported}");
    assert_eq!(imported["data"]["created_workflow_version"], true);
    let new_id = imported["data"]["recipe_id"].as_str().expect("recipe id");

    let stored = dest.state.db.get_recipe(new_id).await.unwrap();
    assert_eq!(stored.author_kind, "user");
    assert_eq!(stored.workflow_version.as_deref(), Some("v1"));
    assert!(
        dest.state
            .db
            .get_workflow_version("wf-1", "v1")
            .await
            .is_ok(),
        "version recreated in clean store"
    );
}

#[tokio::test]
async fn import_rejects_tampered_bundle() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let source = common::harness_with(hf).await;
    seed(&source).await;

    let (_, body) = request(
        source.state.clone(),
        "GET",
        "/api/v1/recipes/r-1/bundle",
        None,
    )
    .await;
    let mut bundle = body["data"].clone();
    bundle["recipe"]["display_name"] = serde_json::json!("Tampered");

    let hf2 = std::sync::Arc::new(common::StubHf::default());
    let dest = common::harness_with(hf2).await;
    let (status, imported) = request(
        dest.state.clone(),
        "POST",
        "/api/v1/recipes/import",
        Some(bundle),
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {imported}");
    assert_eq!(imported["error"]["code"], "BUNDLE_INTEGRITY");
}
