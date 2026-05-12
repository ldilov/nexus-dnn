//! Happy-path contract test for
//! `POST /api/v1/modules/drafts/{draft_id}/suggestions`.
//!
//! Invariants (per `contracts/draft_suggestions.events.md`):
//! - First event is `stream_started` with a UUID stream_id and a lease_id.
//! - Token deltas in arrival order concatenate to `complete.final_text`.
//! - Exactly one terminal event closes the stream (`complete` here).

use std::sync::Arc;

use nexus_api::handlers::draft_suggestions::{FakeStreamProvider, StreamItem};
use tower::ServiceExt;

use super::common::{
    build_app, build_post_request, collect_body_bytes, happy_path_body, parse_sse,
};

#[tokio::test]
async fn happy_path_emits_started_tokens_then_complete() {
    let provider = Arc::new(
        FakeStreamProvider::script(vec![
            StreamItem::Token("hello ".into()),
            StreamItem::Token("world".into()),
            StreamItem::Done,
        ])
        .with_lease_id("test-lease-abc"),
    );
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .expect("response");

    assert_eq!(resp.status(), 200);
    let content_type = resp
        .headers()
        .get("content-type")
        .map(|v| v.to_str().unwrap_or("").to_string())
        .unwrap_or_default();
    assert!(
        content_type.starts_with("text/event-stream"),
        "expected SSE content-type, got {content_type:?}"
    );

    let (_, body) = collect_body_bytes(resp).await;
    let events = parse_sse(&body);

    assert!(
        events.len() >= 4,
        "expected ≥4 events (started + 2 tokens + complete), got {}",
        events.len()
    );
    assert_eq!(events[0].event, "stream_started");
    assert_eq!(events[0].data["lease_id"], "test-lease-abc");
    assert!(
        events[0].data["stream_id"].is_string(),
        "stream_id should be a UUID string"
    );

    assert_eq!(events[1].event, "token");
    assert_eq!(events[1].data["delta"], "hello ");
    assert_eq!(events[2].event, "token");
    assert_eq!(events[2].data["delta"], "world");

    let terminal = events.last().expect("terminal event");
    assert_eq!(terminal.event, "complete");
    assert_eq!(terminal.data["final_text"], "hello world");
    assert_eq!(terminal.data["tokens_emitted"], 2);
}

#[tokio::test]
async fn empty_token_deltas_are_filtered() {
    let provider = Arc::new(FakeStreamProvider::script(vec![
        StreamItem::Token("".into()),
        StreamItem::Token("real".into()),
        StreamItem::Token("".into()),
        StreamItem::Done,
    ]));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();
    let (_, body) = collect_body_bytes(resp).await;
    let events = parse_sse(&body);

    let token_count = events.iter().filter(|e| e.event == "token").count();
    assert_eq!(
        token_count, 1,
        "empty deltas must be filtered (contract: forbidden)"
    );
}

#[tokio::test]
async fn validation_failure_returns_400_with_typed_envelope() {
    let provider = Arc::new(FakeStreamProvider::script(vec![StreamItem::Done]));
    let app = build_app(provider);

    let bad_body = serde_json::json!({
        "cursor_line": 0,
        "context": {
            "draft_text": "x",
            "active_line_text": "x",
            "preceding_lines": 5
        },
        "max_tokens": 96
    });

    let resp = app
        .oneshot(build_post_request("draft-1", bad_body))
        .await
        .unwrap();

    assert_eq!(resp.status(), 400);
    let (_, body) = collect_body_bytes(resp).await;
    let json: serde_json::Value = serde_json::from_slice(&body).unwrap();
    assert_eq!(json["code"], "validation_error");
    assert!(json["details"]["cursor_line"].is_string());
}
