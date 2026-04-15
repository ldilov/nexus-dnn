use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Query, State};
use axum::response::IntoResponse;
use futures_util::{SinkExt, StreamExt};
use nexus_backend_runtimes::events::BackendEvent;
use serde::Deserialize;

use crate::AppState;

/// Query filter for `/api/v1/backends/events`. Empty filter matches every event.
#[derive(Debug, Deserialize, Default)]
pub struct BackendEventFilter {
    pub family: Option<String>,
    pub runtime_install_id: Option<String>,
}

/// Pure predicate: `true` if `event` passes the filter (absent filter fields = wildcard).
pub fn matches_filter(event: &BackendEvent, filter: &BackendEventFilter) -> bool {
    if let Some(ref f) = filter.family
        && event.backend != *f
    {
        return false;
    }
    if let Some(ref rid) = filter.runtime_install_id
        && event.runtime_install_id.as_deref() != Some(rid.as_str())
    {
        return false;
    }
    true
}

/// Upgrades the HTTP request to a WebSocket that streams [`BackendEvent`] JSON.
pub async fn backend_events_ws(
    State(state): State<AppState>,
    Query(filter): Query<BackendEventFilter>,
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_backend_socket(socket, state, filter))
}

async fn handle_backend_socket(socket: WebSocket, state: AppState, filter: BackendEventFilter) {
    let (mut sender, _receiver) = socket.split();
    let mut subscription = state.backend_event_bus.subscribe();

    loop {
        match subscription.recv().await {
            Ok(event) => {
                if !matches_filter(&event, &filter) {
                    continue;
                }
                let Ok(json) = serde_json::to_string(&event) else {
                    continue;
                };
                if sender.send(Message::Text(json.into())).await.is_err() {
                    break;
                }
            }
            Err(tokio::sync::broadcast::error::RecvError::Lagged(n)) => {
                let warning = serde_json::json!({ "type": "lagged", "missed": n }).to_string();
                if sender.send(Message::Text(warning.into())).await.is_err() {
                    break;
                }
            }
            Err(tokio::sync::broadcast::error::RecvError::Closed) => break,
        }
    }
}
