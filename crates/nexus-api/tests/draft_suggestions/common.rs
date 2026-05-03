//! Shared test helpers for the Draft AI suggestion stream contract
//! tests. Builds an axum app from the handler's
//! `router(provider)` and exposes a small SSE parser so individual test
//! files stay focused on their scenario assertions.

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, Response};
use http_body_util::BodyExt;
use nexus_api::handlers::draft_suggestions::{
    SuggestionStreamProvider, router as draft_suggestions_router,
};
use serde_json::Value;

pub fn build_app(provider: Arc<dyn SuggestionStreamProvider>) -> Router {
    draft_suggestions_router::<()>(provider)
}

pub fn happy_path_body() -> Value {
    serde_json::json!({
        "cursor_line": 3,
        "intent": "complete-line",
        "context": {
            "draft_text": "alpha\nbeta\ngamma\n",
            "active_line_text": "gamma",
            "preceding_lines": 5
        },
        "max_tokens": 96
    })
}

pub fn build_post_request(draft_id: &str, body: Value) -> Request<Body> {
    Request::builder()
        .method("POST")
        .uri(format!("/api/v1/modules/drafts/{draft_id}/suggestions"))
        .header("content-type", "application/json")
        .body(Body::from(serde_json::to_vec(&body).unwrap()))
        .unwrap()
}

pub async fn collect_body_bytes(resp: Response<Body>) -> (axum::http::StatusCode, Vec<u8>) {
    let status = resp.status();
    let body = resp.into_body().collect().await.unwrap().to_bytes().to_vec();
    (status, body)
}

#[derive(Debug)]
pub struct SseEvent {
    pub event: String,
    pub data: Value,
}

/// Minimal SSE parser: splits on `\n\n`, extracts `event:` + `data:` lines.
/// Skips comment frames (`:` lines) which the production stream uses for
/// keep-alives.
pub fn parse_sse(bytes: &[u8]) -> Vec<SseEvent> {
    let text = std::str::from_utf8(bytes).expect("utf-8 SSE body");
    let mut events = Vec::new();
    for chunk in text.split("\n\n") {
        let mut event_name: Option<String> = None;
        let mut data_lines: Vec<String> = Vec::new();
        for line in chunk.lines() {
            if let Some(rest) = line.strip_prefix("event:") {
                event_name = Some(rest.trim().to_string());
            } else if let Some(rest) = line.strip_prefix("data:") {
                data_lines.push(rest.trim_start().to_string());
            }
        }
        if let Some(name) = event_name {
            let data_str = data_lines.join("\n");
            let data = if data_str.is_empty() {
                Value::Null
            } else {
                serde_json::from_str(&data_str).unwrap_or(Value::String(data_str))
            };
            events.push(SseEvent { event: name, data });
        }
    }
    events
}
