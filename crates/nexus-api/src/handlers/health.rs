use axum::extract::State;

use crate::AppState;
use crate::dto::HealthDto;
use crate::envelope::ApiResponse;

pub async fn health_check(State(state): State<AppState>) -> ApiResponse<HealthDto> {
    let raw = (state.health_status_fn)();
    let (status, details) = match &raw {
        serde_json::Value::Object(map) => {
            let status = map
                .get("status")
                .and_then(|v| v.as_str())
                .unwrap_or("unknown")
                .to_owned();
            // Any remaining fields are returned under `details` so the
            // contract stays structurally stable while still surfacing them.
            let mut rest = map.clone();
            rest.remove("status");
            let details = if rest.is_empty() {
                None
            } else {
                Some(serde_json::Value::Object(rest))
            };
            (status, details)
        }
        serde_json::Value::String(s) => (s.clone(), None),
        other => (other.to_string(), None),
    };
    ApiResponse::ok(HealthDto { status, details })
}
