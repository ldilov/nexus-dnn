use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use serde_json::{Value, json};

use crate::AppState;

pub const DEFAULT_DESKTOP_BASE_URL: &str = "http://localhost:1420";

/// Temporary seam for the future desktop bridge wiring. Batch B keeps the
/// HTTP handler generic, but the real bridge implementation is intentionally
/// out of scope and therefore not attached to `AppState` yet.
pub trait DesktopFocusBridge {
    fn is_desktop_connected(&self) -> bool;
    fn focus_window_with_route(&self, route: &str) -> Result<(), DesktopBridgeError>;
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, thiserror::Error)]
pub enum DesktopBridgeError {
    #[error("desktop bridge not initialized")]
    NotInitialized,

    #[error("desktop focus request failed")]
    CommandFailed,
}

pub async fn focus(
    State(_state): State<AppState>,
    Json(payload): Json<Value>,
) -> (StatusCode, Json<Value>) {
    let (status, body) = handle_focus_request(payload, None, DEFAULT_DESKTOP_BASE_URL);
    (status, Json(body))
}

pub fn handle_focus_request(
    payload: Value,
    bridge: Option<&dyn DesktopFocusBridge>,
    base_url: &str,
) -> (StatusCode, Value) {
    let Some(route) = payload.get("route").and_then(Value::as_str) else {
        return (
            StatusCode::BAD_REQUEST,
            json!({ "error": "route field is required" }),
        );
    };

    let Some(bridge) = bridge else {
        return (
            StatusCode::SERVICE_UNAVAILABLE,
            json!({ "error": "desktop bridge not initialized" }),
        );
    };

    if !bridge.is_desktop_connected() {
        return (
            StatusCode::OK,
            json!({
                "status": "fallback",
                "fallback_url": build_fallback_url(base_url, route),
                "reason": "desktop not connected",
            }),
        );
    }

    match bridge.focus_window_with_route(route) {
        Ok(()) => (
            StatusCode::OK,
            json!({
                "status": "focused",
                "route": route,
            }),
        ),
        Err(DesktopBridgeError::NotInitialized) => (
            StatusCode::SERVICE_UNAVAILABLE,
            json!({ "error": "desktop bridge not initialized" }),
        ),
        Err(DesktopBridgeError::CommandFailed) => (
            StatusCode::SERVICE_UNAVAILABLE,
            json!({ "error": "desktop focus request failed" }),
        ),
    }
}

fn build_fallback_url(base_url: &str, route: &str) -> String {
    let base = base_url.trim_end_matches('/');
    if route.starts_with('/') {
        format!("{base}{route}")
    } else {
        format!("{base}/{route}")
    }
}
