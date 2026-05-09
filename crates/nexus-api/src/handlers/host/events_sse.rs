//! Spec 044 — host-wide SSE adapter for `GET /api/v1/events/sse`.

use std::convert::Infallible;
use std::time::Duration;

use axum::Json;
use axum::extract::{Query, State};
use axum::http::{HeaderMap, StatusCode};
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::{IntoResponse, Response};
use futures_util::stream::Stream;
use nexus_events::types::NexusEvent;
use serde::Deserialize;
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;

use crate::AppState;

const KEEPALIVE_INTERVAL: Duration = Duration::from_secs(15);
const STREAM_BUFFER_CAPACITY: usize = 256;

#[derive(Debug, Clone, Deserialize, PartialEq, Eq)]
pub struct EventsSseQuery {
    #[serde(default)]
    pub run_id: Option<String>,
    #[serde(default)]
    pub event_type: Option<String>,
    #[serde(default)]
    pub source: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EventFilters {
    pub run_id: Option<String>,
    pub event_type: Option<String>,
    pub source_patterns: Vec<String>,
}

impl TryFrom<EventsSseQuery> for EventFilters {
    type Error = String;

    fn try_from(value: EventsSseQuery) -> Result<Self, Self::Error> {
        let source_patterns = parse_source_patterns(value.source.as_deref())?;
        Ok(Self {
            run_id: value.run_id.filter(|v| !v.trim().is_empty()),
            event_type: value.event_type.filter(|v| !v.trim().is_empty()),
            source_patterns,
        })
    }
}

impl EventFilters {
    pub fn matches(&self, event: &NexusEvent) -> bool {
        let run_ok = self.run_id.as_deref().is_none_or(|expected| {
            event_string_field(event, "run_id").as_deref() == Some(expected)
        });
        let kind_ok = self
            .event_type
            .as_deref()
            .is_none_or(|expected| event_kind(event).as_deref() == Some(expected));
        let source_ok = if self.source_patterns.is_empty() {
            true
        } else {
            event_source(event)
                .as_deref()
                .is_some_and(|actual| source_matches_any(&self.source_patterns, actual))
        };
        run_ok && kind_ok && source_ok
    }
}

pub async fn stream_events_sse(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<EventsSseQuery>,
) -> Response {
    let filters = match EventFilters::try_from(query) {
        Ok(filters) => filters,
        Err(error) => return json_error(StatusCode::BAD_REQUEST, error),
    };

    let last_event_id = headers
        .get("last-event-id")
        .and_then(|value| value.to_str().ok())
        .map(str::trim)
        .filter(|value| !value.is_empty());

    let subscription = state.event_bus.subscribe_from(last_event_id);
    let stream = build_event_stream(subscription, filters);

    Sse::new(stream)
        .keep_alive(KeepAlive::new().interval(KEEPALIVE_INTERVAL))
        .into_response()
}

fn parse_source_patterns(raw: Option<&str>) -> Result<Vec<String>, String> {
    match raw {
        None => Ok(Vec::new()),
        Some(value) => {
            let mut patterns = Vec::new();
            for candidate in value
                .split(',')
                .map(str::trim)
                .filter(|token| !token.is_empty())
            {
                if !is_valid_source_pattern(candidate) {
                    return Err(format!("invalid source glob: {candidate}"));
                }
                patterns.push(candidate.to_owned());
            }
            Ok(patterns)
        }
    }
}

fn is_valid_source_pattern(pattern: &str) -> bool {
    pattern
        .chars()
        .all(|ch| ch.is_ascii_alphanumeric() || matches!(ch, '_' | '-' | '.' | ':' | '*'))
}

fn source_matches_any(patterns: &[String], actual: &str) -> bool {
    patterns
        .iter()
        .any(|pattern| wildcard_match(pattern, actual))
}

fn wildcard_match(pattern: &str, actual: &str) -> bool {
    if pattern == "*" {
        return true;
    }

    let parts: Vec<&str> = pattern.split('*').collect();
    if parts.len() == 1 {
        return pattern == actual;
    }

    let anchored_start = !pattern.starts_with('*');
    let anchored_end = !pattern.ends_with('*');
    let mut cursor = 0usize;

    for (idx, part) in parts.iter().enumerate() {
        if part.is_empty() {
            continue;
        }

        if idx == 0 && anchored_start {
            if !actual[cursor..].starts_with(part) {
                return false;
            }
            cursor += part.len();
            continue;
        }

        if idx == parts.len() - 1 && anchored_end {
            return actual[cursor..].ends_with(part);
        }

        match actual[cursor..].find(part) {
            Some(offset) => {
                cursor += offset + part.len();
            }
            None => return false,
        }
    }

    !anchored_end || parts.last().is_none_or(|last| last.is_empty())
}

fn event_kind(event: &NexusEvent) -> Option<String> {
    event_string_field(event, "type")
}

fn event_source(event: &NexusEvent) -> Option<String> {
    event_string_field(event, "source").or_else(|| event_string_field(event, "target"))
}

fn event_string_field(event: &NexusEvent, field: &str) -> Option<String> {
    let value = serde_json::to_value(event).ok()?;
    value.get(field)?.as_str().map(str::to_owned)
}

fn build_event_stream(
    mut subscription: nexus_events::bus::EventSubscription,
    filters: EventFilters,
) -> impl Stream<Item = Result<Event, Infallible>> {
    let (tx, rx) = mpsc::channel(STREAM_BUFFER_CAPACITY);

    tokio::spawn(async move {
        loop {
            match subscription.recv_published().await {
                Ok(recorded) => {
                    if !filters.matches(&recorded.event) {
                        continue;
                    }
                    if tx.send(Ok(encode_event(&recorded))).await.is_err() {
                        break;
                    }
                }
                Err(tokio::sync::broadcast::error::RecvError::Lagged(missed)) => {
                    tracing::warn!(missed, "host events SSE subscriber lagged");
                }
                Err(tokio::sync::broadcast::error::RecvError::Closed) => break,
            }
        }
    });

    ReceiverStream::new(rx)
}

fn encode_event(recorded: &nexus_events::bus::PublishedEvent) -> Event {
    let name = event_kind(&recorded.event).unwrap_or_else(|| "unknown".to_owned());
    let data = serde_json::to_string(&recorded.event).unwrap_or_else(|_| "{}".to_owned());
    Event::default()
        .id(recorded.id.clone())
        .event(name)
        .data(data)
}

fn json_error(status: StatusCode, message: impl Into<String>) -> Response {
    (status, Json(serde_json::json!({ "error": message.into() }))).into_response()
}
