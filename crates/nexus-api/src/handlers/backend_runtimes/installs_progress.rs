//! `GET /api/v1/backend-runtime-installs/:install_id/progress` (T066).
//!
//! SSE stream of [`PhaseEvent`]s scoped to a single `install_id`.
//! Subscribes to the global `state.pipeline_events` broadcast channel,
//! filters by install id, serialises each event as an SSE `data:` frame
//! with `event: phase`. Emits a keep-alive comment every 15 s to keep
//! HTTP proxies from reaping the long-lived connection. Closes on the
//! first terminal event (`Complete` + `Completed`, or any `Failed`),
//! sending a final `event: done` with the terminal state so clients
//! can unwrap a summary before the stream ends.

use std::convert::Infallible;
use std::str::FromStr;
use std::time::Duration;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::sse::{Event, KeepAlive, Sse};
use futures_util::stream::{Stream, StreamExt};
use tokio_stream::wrappers::BroadcastStream;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::install_pipeline::{PhaseEvent, PhaseState};

use super::pipeline_runner::is_terminal_event;
use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn progress(
    State(state): State<AppState>,
    Path(install_id_raw): Path<String>,
) -> axum::response::Response {
    let install_id = match RuntimeInstallId::from_str(&install_id_raw) {
        Ok(id) => id,
        Err(_) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_install_id",
                "bad_request",
                format!("`{install_id_raw}` is not a valid ULID"),
            )
            .into_response();
        }
    };

    let rx = state.pipeline_events.subscribe();
    let stream = event_stream(install_id, rx);
    Sse::new(stream)
        .keep_alive(
            KeepAlive::new()
                .interval(Duration::from_secs(15))
                .text("heartbeat"),
        )
        .into_response()
}

/// Transform the broadcast receiver into an SSE event stream. Drops
/// `PhaseEvent`s not matching our install_id; logs `Lagged` without
/// killing the stream per FR-046; ends the stream on the terminal
/// event so axum closes the HTTP response.
fn event_stream(
    target: RuntimeInstallId,
    rx: tokio::sync::broadcast::Receiver<PhaseEvent>,
) -> impl Stream<Item = Result<Event, Infallible>> {
    BroadcastStream::new(rx)
        .take_while(move |_| std::future::ready(true))
        .filter_map(move |item| {
            let target = target;
            async move {
                match item {
                    Ok(event) if event.install_id == target => Some(event),
                    Ok(_) => None,
                    Err(tokio_stream::wrappers::errors::BroadcastStreamRecvError::Lagged(n)) => {
                        tracing::warn!(
                            install_id = %target,
                            lagged = n,
                            "pipeline-events subscriber lagged (SSE progress stream)",
                        );
                        None
                    }
                }
            }
        })
        .scan(false, move |terminated, event| {
            if *terminated {
                return std::future::ready(None);
            }
            if is_terminal_event(&event) {
                *terminated = true;
                let (first, done) = terminal_frames(&event);
                std::future::ready(Some(futures_util::stream::iter(vec![
                    Ok::<_, Infallible>(first),
                    Ok::<_, Infallible>(done),
                ])))
            } else {
                std::future::ready(Some(futures_util::stream::iter(vec![Ok::<_, Infallible>(
                    encode_phase(&event),
                )])))
            }
        })
        .flatten()
}

fn encode_phase(event: &PhaseEvent) -> Event {
    Event::default()
        .event("phase")
        .json_data(event)
        .unwrap_or_else(|_| Event::default().event("phase").data("<encode-failed>"))
}

/// Terminal boundary: emit the last phase event as usual, then a
/// synthetic `event: done` carrying `{install_id, terminal: "..."}` so
/// clients don't have to parse the last phase event to know the stream
/// ended.
fn terminal_frames(event: &PhaseEvent) -> (Event, Event) {
    let phase = encode_phase(event);
    let terminal_state = match event.state {
        PhaseState::Failed => "failed",
        PhaseState::Completed => "validated",
        PhaseState::Started => "unknown",
    };
    let done_payload = serde_json::json!({
        "install_id": event.install_id.to_string(),
        "terminal": terminal_state,
    });
    let done = Event::default()
        .event("done")
        .json_data(done_payload)
        .unwrap_or_else(|_| Event::default().event("done").data("{}"));
    (phase, done)
}
