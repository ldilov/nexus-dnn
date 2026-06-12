//! Spec 030 — US1 + US3 + US4 integration coverage.
//!
//! Exercises the generic dispatcher in isolation against synthetic
//! extensions registered for ids the host code never names. Validates
//! SC-001, SC-004, SC-005, SC-006, SC-008.

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use axum::routing::get;
use http_body_util::BodyExt;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry, dispatch,
};
use serde_json::Value;
use tower::ServiceExt;

fn make_synthetic_router(reply: &'static str) -> Router {
    Router::new().route("/ping", get(move || async move { reply }))
}

fn build_app(registry: SharedRegistry) -> Router {
    Router::new()
        .route(
            "/api/v1/extensions/{ext_id}/{*rest}",
            get(dispatch).post(dispatch),
        )
        .with_state(registry)
}

async fn body_string(resp: axum::response::Response) -> String {
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    String::from_utf8(bytes.to_vec()).unwrap()
}

async fn body_json(resp: axum::response::Response) -> Value {
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

#[tokio::test]
async fn sc_001_synthetic_extension_pings_through_dispatcher() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let id = ExtensionId::parse("synth-one").unwrap();
    registry
        .register(id, make_synthetic_router("pong"), vec!["/ping".into()])
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    for _ in 0..50 {
        let req = Request::builder()
            .uri("/api/v1/extensions/synth-one/ping")
            .body(Body::empty())
            .unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
        assert_eq!(body_string(resp).await, "pong");
    }
}

#[tokio::test]
async fn sc_006_unknown_extension_returns_structured_404() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/does-not-exist/anything")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    let body = body_json(resp).await;
    assert_eq!(body["error"], "unknown_extension");
    assert_eq!(body["extension_id"], "does-not-exist");
}

#[tokio::test]
async fn sc_004_two_extensions_coexist_no_crossover() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("alpha").unwrap(),
            make_synthetic_router("from-alpha"),
            vec!["/ping".into()],
        )
        .unwrap();
    registry
        .register(
            ExtensionId::parse("beta").unwrap(),
            make_synthetic_router("from-beta"),
            vec!["/ping".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    for i in 0..50 {
        let (uri, expected) = if i % 2 == 0 {
            ("/api/v1/extensions/alpha/ping", "from-alpha")
        } else {
            ("/api/v1/extensions/beta/ping", "from-beta")
        };
        let req = Request::builder().uri(uri).body(Body::empty()).unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
        assert_eq!(body_string(resp).await, expected);
    }
}

#[tokio::test]
async fn sc_004_swapped_registration_order_still_correct() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("beta").unwrap(),
            make_synthetic_router("from-beta"),
            vec![],
        )
        .unwrap();
    registry
        .register(
            ExtensionId::parse("alpha").unwrap(),
            make_synthetic_router("from-alpha"),
            vec![],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let r1 = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/alpha/ping")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(body_string(r1).await, "from-alpha");

    let r2 = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/beta/ping")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(body_string(r2).await, "from-beta");
}

#[tokio::test]
async fn sc_005_registration_failure_returns_503_sibling_unaffected() {
    for run in 0..10 {
        let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
        registry
            .register(
                ExtensionId::parse("alpha").unwrap(),
                make_synthetic_router("alive"),
                vec![],
            )
            .unwrap();
        registry
            .register_failure(
                ExtensionId::parse("broken-x").unwrap(),
                "could not connect to deployment api".into(),
            )
            .unwrap();
        registry.seal();
        let app = build_app(registry);

        let bad = app
            .clone()
            .oneshot(
                Request::builder()
                    .uri("/api/v1/extensions/broken-x/anything")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(
            bad.status(),
            StatusCode::SERVICE_UNAVAILABLE,
            "run {run}: expected 503 for failed-registration extension",
        );
        let body = body_json(bad).await;
        assert_eq!(body["error"], "registration_failed", "run {run}");
        assert_eq!(body["extension_id"], "broken-x", "run {run}");
        assert_eq!(
            body["reason"], "could not connect to deployment api",
            "run {run}",
        );

        let good = app
            .oneshot(
                Request::builder()
                    .uri("/api/v1/extensions/alpha/ping")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(good.status(), StatusCode::OK, "run {run}: sibling 200");
        assert_eq!(body_string(good).await, "alive", "run {run}");
    }
}

#[tokio::test]
async fn sc_008_inspection_api_returns_correct_states() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("alpha").unwrap(),
            make_synthetic_router("x"),
            vec!["/ping".into()],
        )
        .unwrap();
    registry
        .register_failure(ExtensionId::parse("broken-x").unwrap(), "bad".into())
        .unwrap();

    assert!(registry.contains("alpha"));
    assert!(registry.contains("broken-x"));
    assert!(!registry.contains("missing"));
    let mut ids = registry.list_ids();
    ids.sort();
    assert_eq!(ids, vec!["alpha", "broken-x"]);
}
