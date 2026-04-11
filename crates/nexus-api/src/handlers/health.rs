use axum::extract::State;

use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn health_check(State(state): State<AppState>) -> ApiResponse<serde_json::Value> {
    let health = (state.health_status_fn)();
    ApiResponse::ok(serde_json::to_value(health).unwrap_or_default())
}
