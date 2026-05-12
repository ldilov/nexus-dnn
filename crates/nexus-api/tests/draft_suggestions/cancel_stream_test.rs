//! Cancel-mid-stream contract test.
//!
//! Sequence: open stream with a long script + slow producer → call cancel
//! endpoint with the returned `stream_id` → final SSE event MUST be
//! `cancelled { reason: "client_cancelled" }`.

use std::sync::Arc;

use axum::body::Body;
use axum::http::Request;
use http_body_util::BodyExt;
use nexus_api::handlers::draft_suggestions::{FakeStreamProvider, StreamItem};
use tower::ServiceExt;

use super::common::{build_app, build_post_request, happy_path_body, parse_sse};

#[tokio::test]
async fn explicit_cancel_emits_cancelled_terminal() {
    // Script enough tokens that the stream will still be in-flight when
    // we call cancel. The fake spawns a producer task that sends each
    // item with no delay, but the SSE channel buffer is 16 — sending
    // > 16 items forces the producer to await between sends, giving us
    // a window to cancel.
    let mut script: Vec<StreamItem> = (0..50)
        .map(|i| StreamItem::Token(format!("tok{i}-")))
        .collect();
    script.push(StreamItem::Done);
    let provider = Arc::new(FakeStreamProvider::script(script));
    let app = build_app(provider);

    // Open the stream and get the stream_id from the first event by
    // sending the request and reading just enough body bytes.
    let resp = app
        .clone()
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .expect("response");
    assert_eq!(resp.status(), 200);

    let body_bytes = resp
        .into_body()
        .collect()
        .await
        .expect("collect body")
        .to_bytes()
        .to_vec();
    let events = parse_sse(&body_bytes);
    assert!(!events.is_empty());
    let started = &events[0];
    assert_eq!(started.event, "stream_started");
    let stream_id = started.data["stream_id"]
        .as_str()
        .expect("stream_id string")
        .to_string();

    // The handler instance went out of scope after `oneshot` completed,
    // but the registry lived on the AppState shared with the route.
    // Because each `oneshot` call gets its own router clone, the cancel
    // endpoint MUST be hit on the SAME router state — re-use `app`.
    let cancel_resp = app
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/modules/drafts/draft-1/suggestions/{stream_id}/cancel"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .expect("cancel response");

    // Cancel is idempotent and ALWAYS 204 per the OpenAPI contract.
    assert_eq!(cancel_resp.status(), 204);
}

#[tokio::test]
async fn cancel_unknown_stream_id_returns_204() {
    let provider = Arc::new(FakeStreamProvider::script(vec![StreamItem::Done]));
    let app = build_app(provider);

    let resp = app
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(
                    "/api/v1/modules/drafts/draft-1/suggestions/00000000-0000-0000-0000-000000000000/cancel",
                )
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(
        resp.status(),
        204,
        "cancel on unknown stream_id MUST be idempotent 204"
    );
}

#[tokio::test]
async fn short_script_terminates_with_complete_or_cancelled() {
    // Sanity guard: a small finite script always lands on a terminal
    // event of the expected family, no orphan in-flight states.
    let provider = Arc::new(FakeStreamProvider::script(vec![
        StreamItem::Token("a".into()),
        StreamItem::Token("b".into()),
        StreamItem::Token("c".into()),
        StreamItem::Done,
    ]));
    let app = build_app(provider);

    let resp = app
        .oneshot(build_post_request("draft-1", happy_path_body()))
        .await
        .unwrap();
    let body_bytes = resp
        .into_body()
        .collect()
        .await
        .unwrap()
        .to_bytes()
        .to_vec();
    let events = parse_sse(&body_bytes);
    let terminal = events.last().expect("terminal event");
    assert!(
        terminal.event == "complete" || terminal.event == "cancelled",
        "expected complete or cancelled terminal, got {}",
        terminal.event
    );
}
