//! P5 — preset-packs HTTP surface: `GET/POST /recipes/{id}/presets`,
//! `DELETE /recipes/{id}/presets/{preset_id}`, `GET /recipes/{id}/explain`,
//! `GET /recipes/{id}/diff`.
//!
//! Route-level coverage through `create_router` + `oneshot`. The seeded
//! workflow version declares one input port (`speed: string`) and no nodes, so
//! a control bound to `input:speed` fans out and compiles cleanly.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_recipe::{
    Control, ControlKind, ControlMode, Output, Preset, PresetSource, RecipeProjection,
};
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
        author_kind: "user".into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-24T00:00:00Z".into(),
    }
}

fn recipe_record(id: &str, projection: Option<String>, author_kind: &str) -> RecipeRecord {
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
        author_kind: author_kind.into(),
    }
}

/// One control bound to `input:speed` (string), with a string default.
fn speed_control() -> Control {
    Control {
        control_id: "speed".into(),
        kind: ControlKind::String,
        label: "Speed".into(),
        help_text: None,
        mode: ControlMode::Basic,
        default_value: serde_json::json!("slow"),
        widget_hint: None,
        bindings: vec!["input:speed".into()],
    }
}

fn preset(preset_id: &str, source: PresetSource, values: serde_json::Value) -> Preset {
    Preset {
        preset_id: preset_id.into(),
        label: format!("{preset_id} label"),
        description: Some("d".into()),
        source,
        values: values.as_object().cloned().unwrap_or_default(),
    }
}

fn projection_with(controls: Vec<Control>, presets: Vec<Preset>) -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: Vec::new(),
        controls,
        presets,
        output: Output {
            primary_artifact: String::new(),
            secondary: Vec::new(),
            preview_style: String::new(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

fn proj_json(controls: Vec<Control>, presets: Vec<Preset>) -> String {
    serde_json::to_string(&projection_with(controls, presets)).unwrap()
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

async fn request(
    h: common::TestHarness,
    method: &str,
    uri: &str,
    body: Option<serde_json::Value>,
) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(h.state);
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
async fn get_presets_returns_all_sources() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![
        preset("ext-p", PresetSource::Extension, serde_json::json!({})),
        preset(
            "recipe-p",
            PresetSource::Recipe,
            serde_json::json!({ "speed": "fast" }),
        ),
        preset(
            "user-p",
            PresetSource::User,
            serde_json::json!({ "speed": "medium" }),
        ),
    ];
    let proj = proj_json(vec![speed_control()], presets);
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    let (status, body) = request(h, "GET", "/api/v1/recipes/r1/presets", None).await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    let items = body["data"]["items"].as_array().expect("items array");
    assert_eq!(items.len(), 3, "body: {body}");

    let by_id = |id: &str| items.iter().find(|p| p["preset_id"] == id).unwrap().clone();
    assert_eq!(by_id("ext-p")["source"], "extension");
    assert_eq!(by_id("ext-p")["control_count"], 0);
    assert_eq!(by_id("recipe-p")["source"], "recipe");
    assert_eq!(by_id("recipe-p")["control_count"], 1);
    assert_eq!(by_id("user-p")["source"], "user");
    assert_eq!(by_id("user-p")["control_count"], 1);
}

#[tokio::test]
async fn explain_endpoint_returns_graph_changes_for_preset() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![preset(
        "recipe-p",
        PresetSource::Recipe,
        serde_json::json!({ "speed": "fast" }),
    )];
    let proj = proj_json(vec![speed_control()], presets);
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    let (status, body) = request(
        h,
        "GET",
        "/api/v1/recipes/r1/explain?preset_id=recipe-p",
        None,
    )
    .await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    let entries = body["data"]["entries"].as_array().expect("entries array");
    let entry = entries
        .iter()
        .find(|e| e["control_id"] == "speed")
        .expect("speed entry");
    assert_eq!(entry["label"], "Speed");
    assert_eq!(entry["source"], "preset");
    assert_eq!(entry["final_value"], "fast");
    let targets = entry["targets"].as_array().unwrap();
    assert_eq!(targets, &vec![serde_json::json!("input:speed")]);
}

#[tokio::test]
async fn explain_unknown_preset_id_is_422() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![preset(
        "recipe-p",
        PresetSource::Recipe,
        serde_json::json!({ "speed": "fast" }),
    )];
    let proj = proj_json(vec![speed_control()], presets);
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    let (status, json) = request(
        h,
        "GET",
        "/api/v1/recipes/r1/explain?preset_id=does-not-exist",
        None,
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
    assert_eq!(json["error"]["code"], "BINDING_UNKNOWN_PRESET");
}

#[tokio::test]
async fn diff_endpoint_returns_per_control_provenance() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![preset(
        "recipe-p",
        PresetSource::Recipe,
        serde_json::json!({ "speed": "fast" }),
    )];
    let proj = proj_json(vec![speed_control()], presets);
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    let (status, body) =
        request(h, "GET", "/api/v1/recipes/r1/diff?preset_id=recipe-p", None).await;
    assert_eq!(status, StatusCode::OK, "body: {body}");
    let items = body["data"]["items"].as_array().expect("items array");
    let row = items
        .iter()
        .find(|d| d["control_id"] == "speed")
        .expect("speed row");
    assert_eq!(row["source"], "preset");
    assert_eq!(row["overridden"], true);
    assert_eq!(row["default_value"], "slow");
    assert_eq!(row["effective_value"], "fast");
}

#[tokio::test]
async fn create_user_preset_on_user_recipe_persists() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = proj_json(vec![speed_control()], Vec::new());
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    let body = serde_json::json!({
        "label": "My Fast Preset",
        "description": "go fast",
        "values": { "speed": "fast" }
    });
    let (status, created) = request(h, "POST", "/api/v1/recipes/r1/presets", Some(body)).await;
    assert_eq!(status, StatusCode::CREATED, "body: {created}");
    assert_eq!(created["data"]["preset_id"], "my-fast-preset");
    assert_eq!(created["data"]["source"], "user");
    assert_eq!(created["data"]["control_count"], 1);

    // A fresh request must see the persisted preset.
    let hf2 = std::sync::Arc::new(common::StubHf::default());
    let h2 = common::harness_with(hf2).await;
    let proj2 = proj_json(vec![speed_control()], Vec::new());
    seed(&h2, &recipe_record("r2", Some(proj2), "user")).await;
    let post_body = serde_json::json!({ "label": "P2", "values": { "speed": "fast" } });
    let router = nexus_api::create_router(h2.state.clone());
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/recipes/r2/presets")
                .header("content-type", "application/json")
                .body(Body::from(post_body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CREATED);

    let router2 = nexus_api::create_router(h2.state);
    let resp2 = router2
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/recipes/r2/presets")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let bytes = resp2.into_body().collect().await.unwrap().to_bytes();
    let listed: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
    let items = listed["data"]["items"].as_array().unwrap();
    assert_eq!(items.len(), 1, "body: {listed}");
    assert_eq!(items[0]["source"], "user");
}

#[tokio::test]
async fn create_user_preset_on_extension_recipe_is_forbidden() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = proj_json(vec![speed_control()], Vec::new());
    seed(&h, &recipe_record("r-ext", Some(proj), "extension")).await;

    let body = serde_json::json!({ "label": "Nope", "values": { "speed": "fast" } });
    let (status, json) = request(h, "POST", "/api/v1/recipes/r-ext/presets", Some(body)).await;
    assert_eq!(status, StatusCode::FORBIDDEN, "body: {json}");
    assert_eq!(json["error"]["code"], "RECIPE_NOT_USER_AUTHORED");
}

#[tokio::test]
async fn create_broken_user_preset_is_rejected() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let proj = proj_json(vec![speed_control()], Vec::new());
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;

    // `nope` is not a control_id in the projection -> save-gate UnknownControl.
    let body = serde_json::json!({ "label": "Bad", "values": { "nope": "x" } });
    let (status, json) = request(h, "POST", "/api/v1/recipes/r1/presets", Some(body)).await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY, "body: {json}");
    assert_eq!(json["error"]["code"], "BINDING_UNKNOWN_CONTROL");
}

#[tokio::test]
async fn delete_user_preset_removes_only_user_presets() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![
        preset(
            "user-p",
            PresetSource::User,
            serde_json::json!({ "speed": "fast" }),
        ),
        preset(
            "recipe-p",
            PresetSource::Recipe,
            serde_json::json!({ "speed": "medium" }),
        ),
    ];
    let proj = proj_json(vec![speed_control()], presets);
    seed(&h, &recipe_record("r1", Some(proj), "user")).await;
    let state = h.state.clone();

    // Deleting the user preset succeeds.
    let router = nexus_api::create_router(state.clone());
    let resp = router
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri("/api/v1/recipes/r1/presets/user-p")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    // It is gone; the recipe preset remains.
    let router2 = nexus_api::create_router(state.clone());
    let resp2 = router2
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/recipes/r1/presets")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let bytes = resp2.into_body().collect().await.unwrap().to_bytes();
    let listed: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
    let items = listed["data"]["items"].as_array().unwrap();
    assert_eq!(items.len(), 1, "body: {listed}");
    assert_eq!(items[0]["preset_id"], "recipe-p");

    // Deleting a non-user preset is a 409.
    let router3 = nexus_api::create_router(state);
    let resp3 = router3
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri("/api/v1/recipes/r1/presets/recipe-p")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp3.status(), StatusCode::CONFLICT);
}

#[tokio::test]
async fn extension_rescan_leaves_user_presets_untouched() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let presets = vec![preset(
        "user-p",
        PresetSource::User,
        serde_json::json!({ "speed": "fast" }),
    )];
    let proj = proj_json(vec![speed_control()], presets);
    let recipe = recipe_record("r-user", Some(proj), "user");
    seed(&h, &recipe).await;

    // P1's delete is scoped to author_kind='extension'; targeting the same
    // extension_id the user recipe carries proves author_kind alone protects it.
    h.state
        .db
        .delete_recipes_by_extension("ext.demo")
        .await
        .unwrap();

    let loaded = h.state.db.get_recipe("r-user").await.unwrap();
    let projection: RecipeProjection =
        serde_json::from_str(loaded.projection.as_deref().unwrap()).unwrap();
    assert_eq!(projection.presets.len(), 1);
    assert_eq!(projection.presets[0].preset_id, "user-p");
    assert_eq!(projection.presets[0].source, PresetSource::User);
}
