use std::sync::{Arc, Mutex};

use axum::http::StatusCode;
use nexus_api::handlers::desktop::focus::{
    DesktopBridgeError, DesktopFocusBridge, handle_focus_request,
};
use serde_json::json;

struct RecordingBridge {
    observed_routes: Arc<Mutex<Vec<String>>>,
}

impl RecordingBridge {
    fn new() -> Self {
        Self {
            observed_routes: Arc::new(Mutex::new(Vec::new())),
        }
    }
}

impl DesktopFocusBridge for RecordingBridge {
    fn is_desktop_connected(&self) -> bool {
        true
    }

    fn focus_window_with_route(&self, route: &str) -> Result<(), DesktopBridgeError> {
        self.observed_routes.lock().unwrap().push(route.to_owned());
        Ok(())
    }
}

#[test]
fn handler_source_has_no_extension_id_literals() {
    let source = std::fs::read_to_string(format!(
        "{}/src/handlers/desktop/focus.rs",
        env!("CARGO_MANIFEST_DIR")
    ))
    .expect("read desktop focus handler");

    for forbidden in ["ext:", "extension_id", "nexus.local"] {
        assert!(
            !source.contains(forbidden),
            "desktop focus handler must treat routes opaquely; found {forbidden:?}"
        );
    }
}

#[test]
fn route_passes_through_verbatim_without_pattern_matching() {
    let bridge = RecordingBridge::new();
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

#[test]
fn router_source_remains_unchanged_for_desktop_focus() {
    let source = std::fs::read_to_string(format!("{}/src/router.rs", env!("CARGO_MANIFEST_DIR")))
        .expect("read router source");
    assert!(
        !source.contains("/desktop/focus"),
        "desktop focus route must remain unmounted in this slice"
    );
}
