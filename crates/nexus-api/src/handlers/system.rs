use axum::extract::State;
use serde_json::json;

use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn system_info(State(state): State<AppState>) -> ApiResponse<serde_json::Value> {
    let workspace_path = state
        .extensions_dir
        .as_ref()
        .map(|p| p.parent().unwrap_or(p).display().to_string());

    ApiResponse::ok(json!({
        "host_version": "0.1.0",
        "api_version": "0.1.0",
        "protocol_version": "0.1.0",
        "supported_runtime_families": ["python", "native", "builtin", "external_service"],
        "supported_spec_versions": ["0.1"],
        "workspace_path": workspace_path,
        "platform": std::env::consts::OS
    }))
}
