//! Compile-time contract coverage for the future `POST /api/v1/desktop/focus`
//! surface from spec 044. These tests stay ignored until router wiring and the
//! real desktop bridge land in a later batch.

use std::sync::{Arc, Mutex};

use axum::http::StatusCode;
use nexus_api::handlers::desktop::focus::{
    DesktopBridgeError, DesktopFocusBridge, handle_focus_request,
};
use serde_json::json;

struct StubBridge {
    connected: bool,
    fail_with: Option<DesktopBridgeError>,
    observed_routes: Arc<Mutex<Vec<String>>>,
}

impl StubBridge {
    fn connected() -> Self {
        Self {
            connected: true,
            fail_with: None,
            observed_routes: Arc::new(Mutex::new(Vec::new())),
        }
    }

    fn disconnected() -> Self {
        Self {
            connected: false,
            fail_with: None,
            observed_routes: Arc::new(Mutex::new(Vec::new())),
        }
    }
}

impl DesktopFocusBridge for StubBridge {
    fn is_desktop_connected(&self) -> bool {
        self.connected
    }

    fn focus_window_with_route(&self, route: &str) -> Result<(), DesktopBridgeError> {
        self.observed_routes.lock().unwrap().push(route.to_owned());
        if let Some(err) = self.fail_with {
            Err(err)
        } else {
            Ok(())
        }
    }
}

#[tokio::test]
async fn happy_path_desktop_connected_returns_focused() {
    let bridge = StubBridge::connected();
    let observed = bridge.observed_routes.clone();
    let (status, body) = handle_focus_request(
        json!({ "route": "/deployments/foo" }),
        Some(&bridge),
        "http://localhost:1420",
    );

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["status"], "focused");
    assert_eq!(body["route"], "/deployments/foo");
    assert_eq!(
        observed.lock().unwrap().as_slice(),
        ["/deployments/foo".to_owned()]
    );
}

#[tokio::test]
async fn fallback_when_desktop_not_connected() {
    let bridge = StubBridge::disconnected();
    let observed = bridge.observed_routes.clone();
    let (status, body) = handle_focus_request(
        json!({ "route": "/foo" }),
        Some(&bridge),
        "http://localhost:1420",
    );

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["status"], "fallback");
    assert_eq!(body["reason"], "desktop not connected");
    assert_eq!(body["fallback_url"], "http://localhost:1420/foo");
    assert!(observed.lock().unwrap().is_empty());
}

#[tokio::test]
async fn missing_route_field_returns_400() {
    let (status, body) = handle_focus_request(json!({}), None, "http://localhost:1420");

    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert_eq!(body, json!({ "error": "route field is required" }));
}

#[tokio::test]
async fn non_string_route_returns_400() {
    let (status, body) =
        handle_focus_request(json!({ "route": 123 }), None, "http://localhost:1420");

    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert_eq!(body, json!({ "error": "route field is required" }));
}

#[tokio::test]
async fn bridge_not_initialized_returns_503() {
    let (status, body) = handle_focus_request(
        json!({ "route": "/deployments/foo" }),
        None,
        "http://localhost:1420",
    );

    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
    assert_eq!(body, json!({ "error": "desktop bridge not initialized" }));
}

#[tokio::test]
async fn opaque_route_preservation_passes_verbatim_to_bridge() {
    let bridge = StubBridge::connected();
    let observed = bridge.observed_routes.clone();
    let route = "any-arbitrary-string-with-/and/?and=params";

    let (status, body) = handle_focus_request(
        json!({ "route": route }),
        Some(&bridge),
        "http://localhost:1420",
    );

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["status"], "focused");
    assert_eq!(body["route"], route);
    assert_eq!(observed.lock().unwrap().as_slice(), [route.to_owned()]);
}
