//! Spec 030 T043 — panic isolation (FR-022).
//!
//! Confirms that when an extension's handler panics, the host process
//! survives, the dispatcher returns 500 to the panicking caller, and a
//! sibling extension continues to serve. This test exercises axum's
//! built-in panic catching (the dispatcher relies on it; spec.md edge
//! case says "caught by axum's default panic handler → 500").

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use axum::routing::get;
use http_body_util::BodyExt;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry, dispatch,
};
use tower::ServiceExt;
use tower_http::catch_panic::CatchPanicLayer;

fn build_app(registry: SharedRegistry) -> Router {
    Router::new()
        .route(
            "/api/v1/extensions/{ext_id}/{*rest}",
            get(dispatch),
        )
        .layer(CatchPanicLayer::new())
        .with_state(registry)
}

#[tokio::test]
async fn handler_panic_returns_500_and_does_not_kill_dispatcher() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let panicker = Router::new().route(
        "/explode",
        get(|| async {
            panic!("intentional handler panic for FR-022 test");
            #[allow(unreachable_code)]
            "unreachable"
        }),
    );
    let healthy = Router::new().route("/ping", get(|| async { "pong" }));

    registry
        .register(
            ExtensionId::parse("panicker").unwrap(),
            panicker,
            vec!["/explode".into()],
        )
        .unwrap();
    registry
        .register(
            ExtensionId::parse("healthy-sibling").unwrap(),
            healthy,
            vec!["/ping".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let bad = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/panicker/explode")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(
        bad.status(),
        StatusCode::INTERNAL_SERVER_ERROR,
        "panic must be caught by axum's panic layer → 500",
    );

    let good = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/healthy-sibling/ping")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(
        good.status(),
        StatusCode::OK,
        "sibling extension survives panic in unrelated extension",
    );
    let bytes = good.into_body().collect().await.unwrap().to_bytes();
    assert_eq!(std::str::from_utf8(&bytes).unwrap(), "pong");
}

#[tokio::test]
async fn dispatcher_state_intact_after_extension_panic() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let panicker = Router::new().route(
        "/boom",
        get(|| async {
            panic!("FR-022 — registry must remain queryable after this");
            #[allow(unreachable_code)]
            "x"
        }),
    );
    registry
        .register(
            ExtensionId::parse("panicker").unwrap(),
            panicker,
            vec!["/boom".into()],
        )
        .unwrap();
    registry.seal();

    let registry_clone = registry.clone();
    let app = build_app(registry);

    let _ = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/panicker/boom")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert!(
        registry_clone.contains("panicker"),
        "registry state preserved across handler panic",
    );
    assert!(registry_clone.is_sealed());
    let unknown = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/never-was/x")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(
        unknown.status(),
        StatusCode::NOT_FOUND,
        "dispatcher still routes unknown_extension correctly after sibling panic",
    );
}
