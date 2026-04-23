//! Spec 030 T011 — HTTP-level contract test for the enriched
//! `/api/v1/extensions` listing endpoint per FR-030 / FR-031.
//!
//! Spins up the full host router with a populated `ExtensionRouterRegistry`
//! covering all three states (`ok`, `registration_failed`,
//! `not_registered`), seeds matching `extensions` rows, hits the endpoint
//! through axum, and asserts each item carries the documented fields.

mod common;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::extension_router::{ExtensionId, ExtensionRouterRegistry};
use nexus_storage::Database;
use nexus_storage::records::ExtensionRecord;
use serde_json::Value;
use tower::ServiceExt;

use common::{StubHf, harness_with};

fn synthetic_router() -> Router {
    Router::new().route("/ping", axum::routing::get(|| async { "pong" }))
}

fn record(id: &str) -> ExtensionRecord {
    ExtensionRecord {
        id: id.into(),
        name: Some(id.to_string()),
        version: "0.1.0".into(),
        description: None,
        publisher: None,
        host_api_compat: ">=0.1.0".into(),
        protocol_compat: ">=0.1.0".into(),
        runtime_family: "native".into(),
        entrypoint: "n/a".into(),
        capabilities: None,
        status: "active".into(),
        directory: format!("/tmp/{id}"),
        installed_at: "2026-04-22T00:00:00Z".into(),
        recipe_count: Some(0),
        ui_contribution_count: Some(0),
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

#[tokio::test]
async fn list_endpoint_surfaces_all_three_registry_states() {
    let h = harness_with(StubHf::with_results(vec![])).await;

    h.state
        .db
        .insert_extension(&record("ok-ext"))
        .await
        .unwrap();
    h.state
        .db
        .insert_extension(&record("failed-ext"))
        .await
        .unwrap();
    h.state
        .db
        .insert_extension(&record("absent-ext"))
        .await
        .unwrap();

    let mut state = h.state.clone();
    let registry = std::sync::Arc::new(nexus_api::extension_router::DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("ok-ext").unwrap(),
            synthetic_router(),
            vec!["/ping".into(), "/health".into()],
        )
        .unwrap();
    registry
        .register_failure(
            ExtensionId::parse("failed-ext").unwrap(),
            "could not connect to upstream".into(),
        )
        .unwrap();
    registry.seal();
    state.extension_router_registry = registry;

    let app = nexus_api::create_router(state);
    let req = Request::builder()
        .uri("/api/v1/extensions")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);

    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json: Value = serde_json::from_slice(&bytes).unwrap();
    let items = json["data"]["items"].as_array().expect("items array");
    assert_eq!(items.len(), 3);

    let by_id = |id: &str| -> &Value {
        items
            .iter()
            .find(|item| item["id"].as_str() == Some(id))
            .unwrap_or_else(|| panic!("missing id {id} in {items:?}"))
    };

    let ok = by_id("ok-ext");
    assert_eq!(ok["registry_state"], "ok");
    assert_eq!(ok["http_routes"][0], "/ping");
    assert_eq!(ok["http_routes"][1], "/health");
    assert!(ok.get("registration_failure_reason").is_none());

    let failed = by_id("failed-ext");
    assert_eq!(failed["registry_state"], "registration_failed");
    assert_eq!(
        failed["registration_failure_reason"],
        "could not connect to upstream",
    );
    assert!(
        failed.get("http_routes").is_none()
            || failed["http_routes"].as_array().map(|a| a.is_empty()) == Some(true),
    );

    let absent = by_id("absent-ext");
    assert_eq!(absent["registry_state"], "not_registered");
    assert!(absent.get("http_routes").is_none());
    assert!(absent.get("registration_failure_reason").is_none());
}
