//! Lease-revoked-mid-stream contract test.
//!
//! When the provider yields a `LeaseRevoked` item mid-stream, the
//! handler MUST emit a terminal SSE `error { code: "lease_revoked" }`
//! and close the connection per `contracts/draft_suggestions.events.md`.

use std::sync::Arc;

use http_body_util::BodyExt;
use nexus_api::handlers::draft_suggestions::{FakeStreamProvider, StreamItem};
use tower::ServiceExt;

use super::common::{build_app, build_post_request, happy_path_body, parse_sse};

#[tokio::test]
async fn lease_revoked_mid_stream_emits_error_terminal() {
    let provider = Arc::new(FakeStreamProvider::script(vec![
        StreamItem::Token("partial".into()),
        StreamItem::LeaseRevoked("backend crashed".into()),
    ]));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();
    assert_eq!(resp.status(), 200, "stream opened, then error mid-flight");

    let body = resp.into_body().collect().await.unwrap().to_bytes().to_vec();
    let events = parse_sse(&body);

    assert!(events.len() >= 3); // started + token + error
    let terminal = events.last().expect("terminal");
    assert_eq!(terminal.event, "error");
    assert_eq!(terminal.data["code"], "lease_revoked");
    assert_eq!(terminal.data["retryable"], true);
    // ui_message MUST NOT leak the internal "backend crashed" detail.
    let msg = terminal.data["message"].as_str().unwrap_or("");
    assert!(!msg.contains("backend crashed"), "internal detail leaked");
}

#[tokio::test]
async fn provider_error_emits_terminal_error_with_correct_code() {
    use nexus_api::handlers::draft_suggestions::DraftSuggestionError;

    let provider = Arc::new(FakeStreamProvider::script(vec![
        StreamItem::Token("starting".into()),
        StreamItem::Error(DraftSuggestionError::ModelUnavailable("model gone".into())),
    ]));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();
    let body = resp.into_body().collect().await.unwrap().to_bytes().to_vec();
    let events = parse_sse(&body);
    let terminal = events.last().expect("terminal");
    assert_eq!(terminal.event, "error");
    assert_eq!(terminal.data["code"], "model_unavailable");
}
