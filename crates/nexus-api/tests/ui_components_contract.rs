mod common;

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use common::{StubHf, harness_with};
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt;

async fn get_catalog() -> (StatusCode, Value) {
    let hf = Arc::new(StubHf::default());
    let harness = harness_with(hf).await;
    let app = nexus_api::router::build(harness.state);
    let req = Request::builder()
        .uri("/api/v1/ui/components")
        .body(Body::empty())
        .expect("request");
    let res = app.oneshot(req).await.expect("route");
    let status = res.status();
    let bytes = res.into_body().collect().await.expect("body").to_bytes();
    let json: Value = serde_json::from_slice(&bytes).expect("valid json");
    (status, json)
}

#[tokio::test]
async fn catalog_shape() {
    let (status, body) = get_catalog().await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["schema_version"], "1");
    let components = body["components"]
        .as_array()
        .expect("components is an array");
    assert!(!components.is_empty(), "catalog must have entries");

    for entry in components {
        let name = entry["name"].as_str().expect("name is string");
        assert!(!name.is_empty(), "name non-empty");
        assert!(
            entry["display_name"].as_str().is_some(),
            "{name}: display_name required"
        );
        let category = entry["category"].as_str().expect("category");
        assert!(
            matches!(
                category,
                "layout" | "data" | "input" | "display" | "feedback" | "shell" | "domain"
            ),
            "{name}: unexpected category {category}"
        );
        let schema = &entry["props_schema"];
        assert_eq!(
            schema["version"], "2020-12",
            "{name}: props_schema.version pinned"
        );
        assert_eq!(
            schema["schema"]["type"], "object",
            "{name}: schema top-level type must be object"
        );
        let examples = entry["examples"]
            .as_array()
            .unwrap_or_else(|| panic!("{name}: examples array"));
        assert!(!examples.is_empty(), "{name}: at least one example");
        for ex in examples {
            assert!(ex["yaml"].as_str().is_some(), "{name}: example.yaml string");
            assert!(
                ex["title"].as_str().is_some(),
                "{name}: example.title string"
            );
        }
    }
}

#[tokio::test]
async fn every_registered_name_is_unique() {
    let (_, body) = get_catalog().await;
    let mut names: Vec<&str> = body["components"]
        .as_array()
        .unwrap()
        .iter()
        .map(|c| c["name"].as_str().unwrap())
        .collect();
    names.sort();
    let before = names.len();
    names.dedup();
    assert_eq!(before, names.len(), "duplicate name in wire response");
}

#[test]
fn empty_registry_returns_ok_envelope() {
    use nexus_api::handlers::ui_components::{
        CATALOG_SCHEMA_VERSION, CatalogEnvelope, catalog_entries_empty, validate_catalog,
    };

    validate_catalog(&catalog_entries_empty()).expect("empty is valid");
    let envelope = CatalogEnvelope {
        schema_version: CATALOG_SCHEMA_VERSION.to_string(),
        components: catalog_entries_empty(),
    };
    let body = serde_json::to_value(&envelope).unwrap();
    assert_eq!(body["schema_version"], "1");
    assert_eq!(body["components"].as_array().unwrap().len(), 0);
}
