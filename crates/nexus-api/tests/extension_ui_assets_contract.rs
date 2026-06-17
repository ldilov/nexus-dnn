mod common;

use std::path::{Path, PathBuf};
use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use common::{StubHf, harness_with_fixtures};
use http_body_util::BodyExt;
use serde_json::Value;
use tower::ServiceExt;

const FIXTURE_ID: &str = "nexus.test.custom-element";

fn fixture_path() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("tests")
        .join("fixtures")
        .join("custom-element-ext")
}

async fn call(
    state: nexus_api::AppState,
    method: &str,
    path: &str,
) -> (StatusCode, Vec<u8>, Option<String>) {
    let app = nexus_api::router::build(state);
    let req = Request::builder()
        .method(method)
        .uri(path)
        .body(Body::empty())
        .expect("request");
    let res = app.oneshot(req).await.expect("route");
    let status = res.status();
    let content_type = res
        .headers()
        .get(axum::http::header::CONTENT_TYPE)
        .and_then(|v| v.to_str().ok().map(str::to_string));
    let bytes = res
        .into_body()
        .collect()
        .await
        .expect("body")
        .to_bytes()
        .to_vec();
    (status, bytes, content_type)
}

#[tokio::test]
async fn serves_declared_file() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status, body, content_type) = call(
        harness.state,
        "GET",
        &format!("/api/v1/extensions/{FIXTURE_ID}/ui/fixture.js"),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    assert!(
        content_type
            .as_deref()
            .map(|ct| ct.starts_with("text/javascript"))
            .unwrap_or(false),
        "expected JS MIME, got {content_type:?}"
    );
    let text = String::from_utf8(body).expect("asset is utf8");
    assert!(
        text.contains("register"),
        "fixture should export register()"
    );
}

#[tokio::test]
async fn path_traversal_blocked() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status, body, _) = call(
        harness.state,
        "GET",
        &format!("/api/v1/extensions/{FIXTURE_ID}/ui/..%2Fmanifest.yaml"),
    )
    .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    let json: Value = serde_json::from_slice(&body).expect("error json");
    assert_eq!(json["code"], "path_escaped_root");
}

#[tokio::test]
async fn unknown_extension_returns_not_found() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status, body, _) = call(
        harness.state,
        "GET",
        "/api/v1/extensions/does.not.exist/ui/anything.js",
    )
    .await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    let json: Value = serde_json::from_slice(&body).expect("error json");
    assert_eq!(json["code"], "extension_not_found");
}

#[tokio::test]
async fn not_found_after_uninstall() {
    let harness_before =
        harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status_before, _, _) = call(
        harness_before.state,
        "GET",
        &format!("/api/v1/extensions/{FIXTURE_ID}/ui/fixture.js"),
    )
    .await;
    assert_eq!(
        status_before,
        StatusCode::OK,
        "asset served before uninstall"
    );

    let harness_after = harness_with_fixtures(Arc::new(StubHf::default()), &[]).await;
    let (status_after, body_after, _) = call(
        harness_after.state,
        "GET",
        &format!("/api/v1/extensions/{FIXTURE_ID}/ui/fixture.js"),
    )
    .await;
    assert_eq!(status_after, StatusCode::NOT_FOUND);
    let json: Value = serde_json::from_slice(&body_after).expect("error json");
    assert_eq!(json["code"], "extension_not_found");
}

#[tokio::test]
async fn list_extension_components_envelope() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status, body, _) = call(harness.state, "GET", "/api/v1/ui/extension-components").await;
    assert_eq!(status, StatusCode::OK);
    let json: Value = serde_json::from_slice(&body).expect("json");
    assert_eq!(json["schema_version"], "1");
    let components = json["components"].as_array().expect("components array");
    assert_eq!(components.len(), 1, "expected one custom element");
    let c = &components[0];
    assert_eq!(c["extension_id"], FIXTURE_ID);
    assert_eq!(c["tag"], "ext-fixture-widget");
    assert_eq!(c["entry"], "register");
    assert_eq!(
        c["asset_href"],
        format!("/api/v1/extensions/{FIXTURE_ID}/ui/fixture.js")
    );
}

#[tokio::test]
async fn duplicate_tag_across_extensions_fails_collection() {
    let dup_path = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("tests")
        .join("fixtures")
        .join("custom-element-dup");
    let harness =
        harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path(), &dup_path]).await;
    let host_tags: std::collections::HashSet<String> = std::collections::HashSet::new();
    use nexus_extension::ExtensionRegistry;
    let err = harness
        .state
        .extension_registry
        .collect_custom_elements(&host_tags)
        .expect_err("duplicate tag must be rejected");
    let msg = format!("{err}");
    assert!(
        msg.contains("duplicate custom element tag 'ext-fixture-widget'"),
        "unexpected error: {msg}"
    );
}

#[tokio::test]
async fn reload_returns_ok_for_installed_extension() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let (status, body, _) = call(
        harness.state,
        "POST",
        &format!("/api/v1/extensions/{FIXTURE_ID}/reload"),
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    let json: Value = serde_json::from_slice(&body).expect("json");
    assert_eq!(json["status"], "ok");
    assert_eq!(json["id"], FIXTURE_ID);
}

#[tokio::test]
async fn reload_returns_404_for_unknown_extension() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[]).await;
    let (status, body, _) = call(
        harness.state,
        "POST",
        "/api/v1/extensions/does.not.exist/reload",
    )
    .await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    let json: Value = serde_json::from_slice(&body).expect("json");
    assert_eq!(json["code"], "extension_not_found");
}

#[tokio::test]
async fn reload_of_extension_in_duplicate_tag_state_returns_409() {
    let dup_path = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("tests")
        .join("fixtures")
        .join("custom-element-dup");
    let harness =
        harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path(), &dup_path]).await;
    // Reloading the duplicate extension re-runs validation — the duplicate tag
    // is already present in the registry, so collect_custom_elements detects
    let (status, body, _) = call(
        harness.state,
        "POST",
        "/api/v1/extensions/nexus.test.custom-element-dup/reload",
    )
    .await;
    assert_eq!(status, StatusCode::CONFLICT);
    let json: Value = serde_json::from_slice(&body).expect("json");
    assert_eq!(json["code"], "duplicate_custom_element_tag");
}

#[tokio::test]
async fn reload_is_idempotent_across_repeated_calls() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[&fixture_path()]).await;
    let app = nexus_api::router::build(harness.state);

    let make_request = || {
        axum::http::Request::builder()
            .method("POST")
            .uri(format!("/api/v1/extensions/{FIXTURE_ID}/reload"))
            .body(axum::body::Body::empty())
            .expect("request")
    };

    let res1 = app
        .clone()
        .oneshot(make_request())
        .await
        .expect("first call");
    assert_eq!(res1.status(), StatusCode::OK);
    let res2 = app.oneshot(make_request()).await.expect("second call");
    assert_eq!(res2.status(), StatusCode::OK);
}

#[tokio::test]
async fn tag_absent_from_list_after_uninstall() {
    let harness = harness_with_fixtures(Arc::new(StubHf::default()), &[]).await;
    let (status, body, _) = call(harness.state, "GET", "/api/v1/ui/extension-components").await;
    assert_eq!(status, StatusCode::OK);
    let json: Value = serde_json::from_slice(&body).expect("json");
    assert_eq!(
        json["components"].as_array().unwrap().len(),
        0,
        "no extensions installed → no tags"
    );
}
