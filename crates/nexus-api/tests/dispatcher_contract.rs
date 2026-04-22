//! Spec 030 — T010 dedicated contract test pinned to
//! `contracts/host_extensions_dispatch.openapi.yaml`.
//!
//! Covers the 5 documented response shapes of the generic dispatcher:
//!   1. 200 forward — extension router answers normally; body + headers
//!      pass through.
//!   2. 404 unknown_extension — `ext_id` not registered; structured
//!      error body.
//!   3. 503 registration_failed — provider failed at startup; structured
//!      error body with reason.
//!   4. extension-defined 404 — extension router doesn't match the
//!      sub-path; the dispatcher MUST NOT rewrite the response.
//!   5. extension-defined 405 — extension router rejects the verb; the
//!      dispatcher MUST forward unchanged.

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode, header};
use axum::routing::{get, post};
use http_body_util::BodyExt;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry, dispatch,
};
use serde_json::Value;
use tower::ServiceExt;

fn build_app(registry: SharedRegistry) -> Router {
    Router::new()
        .route(
            "/api/v1/extensions/{ext_id}/{*rest}",
            get(dispatch).post(dispatch).put(dispatch).delete(dispatch),
        )
        .with_state(registry)
}

fn ok_router() -> Router {
    Router::new()
        .route(
            "/answer",
            get(|| async {
                (
                    [("x-from-extension", "yes")],
                    axum::Json(serde_json::json!({ "answer": 42 })),
                )
            }),
        )
        .route(
            "/only-post",
            post(|| async { axum::Json(serde_json::json!({ "received": true })) }),
        )
}

async fn body_json(resp: axum::response::Response) -> Value {
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(Value::Null)
}

#[tokio::test]
async fn case_1_200_forward_preserves_body_and_headers() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("contract-ok").unwrap(),
            ok_router(),
            vec!["/answer".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/contract-ok/answer")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();

    assert_eq!(resp.status(), StatusCode::OK, "200 forward");
    assert_eq!(
        resp.headers()
            .get("x-from-extension")
            .and_then(|v| v.to_str().ok()),
        Some("yes"),
        "extension custom header survived dispatcher",
    );
    let body = body_json(resp).await;
    assert_eq!(body["answer"], 42);
}

#[tokio::test]
async fn case_2_404_unknown_extension_structured_body() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/never-registered/anything")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();

    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    let body = body_json(resp).await;
    assert_eq!(body["error"], "unknown_extension");
    assert_eq!(body["extension_id"], "never-registered");
}

#[tokio::test]
async fn case_3_503_registration_failed_structured_body() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register_failure(
            ExtensionId::parse("broken-init").unwrap(),
            "could not connect to upstream model store".into(),
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/broken-init/anything")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();

    assert_eq!(resp.status(), StatusCode::SERVICE_UNAVAILABLE);
    let body = body_json(resp).await;
    assert_eq!(body["error"], "registration_failed");
    assert_eq!(body["extension_id"], "broken-init");
    assert_eq!(body["reason"], "could not connect to upstream model store");
}

#[tokio::test]
async fn case_4_extension_defined_404_passes_through_unchanged() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let extension = Router::new().route(
        "/known",
        get(|| async { (StatusCode::OK, "ok") }),
    );
    registry
        .register(
            ExtensionId::parse("contract-ok").unwrap(),
            extension,
            vec!["/known".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/contract-ok/unknown-subpath")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();

    assert_eq!(
        resp.status(),
        StatusCode::NOT_FOUND,
        "extension's own 404 is forwarded",
    );
    let body = body_json(resp).await;
    assert_ne!(
        body["error"], "unknown_extension",
        "extension-defined 404 MUST NOT be wrapped as unknown_extension",
    );
}

#[tokio::test]
async fn case_5_extension_defined_405_passes_through_unchanged() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("contract-ok").unwrap(),
            ok_router(),
            vec!["/only-post".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .method("GET")
        .uri("/api/v1/extensions/contract-ok/only-post")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();

    assert_eq!(
        resp.status(),
        StatusCode::METHOD_NOT_ALLOWED,
        "extension's 405 is forwarded by the dispatcher unchanged",
    );
}

#[tokio::test]
async fn fr_013_request_body_passes_through_byte_for_byte() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let echo = Router::new().route(
        "/echo",
        post(|body: String| async move { body }),
    );
    registry
        .register(
            ExtensionId::parse("contract-ok").unwrap(),
            echo,
            vec!["/echo".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let payload = "spec-030 byte-for-byte body preservation check";
    let req = Request::builder()
        .method("POST")
        .uri("/api/v1/extensions/contract-ok/echo")
        .header(header::CONTENT_TYPE, "text/plain")
        .body(Body::from(payload))
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    assert_eq!(std::str::from_utf8(&bytes).unwrap(), payload);
}

#[tokio::test]
async fn fr_013_query_string_preserved_byte_for_byte() {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let echo = Router::new().route(
        "/q",
        get(|uri: axum::http::Uri| async move {
            uri.query().unwrap_or("").to_owned()
        }),
    );
    registry
        .register(
            ExtensionId::parse("contract-ok").unwrap(),
            echo,
            vec!["/q".into()],
        )
        .unwrap();
    registry.seal();
    let app = build_app(registry);

    let req = Request::builder()
        .uri("/api/v1/extensions/contract-ok/q?k=v%20w&z=1&list=a%2Cb")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    assert_eq!(
        std::str::from_utf8(&bytes).unwrap(),
        "k=v%20w&z=1&list=a%2Cb",
    );
}
