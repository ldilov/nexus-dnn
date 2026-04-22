//! Spec 030 — FR-030 / FR-031 contract test for the enriched
//! `/api/v1/extensions` listing endpoint.
//!
//! Validates that each item carries `registry_state ∈ {ok,
//! registration_failed, not_registered}` plus optional `http_routes` and
//! `registration_failure_reason`. Uses a custom registry preloaded with
//! all three states; bypasses the heavy `harness_with` builder by going
//! straight through the dispatcher path's component types.

use std::sync::Arc;

use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, Registration,
};
use axum::Router;
use axum::routing::get;

fn synthetic() -> Router {
    Router::new().route("/x", get(|| async { "x" }))
}

#[test]
fn registry_state_ok_includes_http_routes() {
    let reg = DefaultRegistry::new();
    reg.register(
        ExtensionId::parse("alpha").unwrap(),
        synthetic(),
        vec!["/a".into(), "/b".into()],
    )
    .unwrap();
    reg.seal();

    let entry = reg.get("alpha").expect("registered");
    match entry {
        Registration::Ok { http_routes, .. } => {
            assert_eq!(http_routes, vec!["/a".to_owned(), "/b".to_owned()]);
        }
        _ => panic!("expected Ok variant"),
    }
}

#[test]
fn registry_state_failed_includes_reason() {
    let reg = DefaultRegistry::new();
    reg.register_failure(
        ExtensionId::parse("broken").unwrap(),
        "could not connect to host api".into(),
    )
    .unwrap();
    reg.seal();

    match reg.get("broken").expect("present") {
        Registration::Failed { reason, .. } => {
            assert_eq!(reason, "could not connect to host api");
        }
        _ => panic!("expected Failed variant"),
    }
}

#[test]
fn registry_state_not_registered_returns_none() {
    let reg = DefaultRegistry::new();
    reg.seal();
    assert!(reg.get("nobody-here").is_none());
}

#[test]
fn dto_serialises_with_required_fields_only() {
    use nexus_api::dto::ExtensionDto;
    let dto = ExtensionDto {
        id: "alpha".into(),
        name: Some("Alpha".into()),
        version: "0.1.0".into(),
        description: None,
        publisher: None,
        runtime_family: "native".into(),
        status: "active".into(),
        source: "external".into(),
        source_path: None,
        capabilities: vec![],
        recipe_count: None,
        ui_contribution_count: None,
        validation_errors: vec![],
        installed_at: "2026-04-22T00:00:00Z".into(),
        registry_state: "ok".into(),
        http_routes: vec!["/chat/threads".into()],
        registration_failure_reason: None,
    };
    let json = serde_json::to_value(&dto).unwrap();
    assert_eq!(json["registry_state"], "ok");
    assert_eq!(json["http_routes"][0], "/chat/threads");
    assert!(json.get("registration_failure_reason").is_none());
}

#[test]
fn dto_serialises_failed_with_reason_field_present() {
    use nexus_api::dto::ExtensionDto;
    let dto = ExtensionDto {
        id: "broken".into(),
        name: None,
        version: "0".into(),
        description: None,
        publisher: None,
        runtime_family: "native".into(),
        status: "active".into(),
        source: "external".into(),
        source_path: None,
        capabilities: vec![],
        recipe_count: None,
        ui_contribution_count: None,
        validation_errors: vec![],
        installed_at: "2026-04-22T00:00:00Z".into(),
        registry_state: "registration_failed".into(),
        http_routes: vec![],
        registration_failure_reason: Some("boom".into()),
    };
    let json = serde_json::to_value(&dto).unwrap();
    assert_eq!(json["registry_state"], "registration_failed");
    assert_eq!(json["registration_failure_reason"], "boom");
    assert!(json.get("http_routes").is_none());
}

#[test]
fn dto_serialises_not_registered_omits_optional_fields() {
    use nexus_api::dto::ExtensionDto;
    let dto = ExtensionDto {
        id: "alpha".into(),
        name: None,
        version: "0".into(),
        description: None,
        publisher: None,
        runtime_family: "native".into(),
        status: "active".into(),
        source: "external".into(),
        source_path: None,
        capabilities: vec![],
        recipe_count: None,
        ui_contribution_count: None,
        validation_errors: vec![],
        installed_at: "2026-04-22T00:00:00Z".into(),
        registry_state: "not_registered".into(),
        http_routes: vec![],
        registration_failure_reason: None,
    };
    let json = serde_json::to_value(&dto).unwrap();
    assert_eq!(json["registry_state"], "not_registered");
    assert!(json.get("http_routes").is_none());
    assert!(json.get("registration_failure_reason").is_none());
}

