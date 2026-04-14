use axum::extract::State;

use crate::AppState;
use crate::dto::SystemInfoDto;
use crate::envelope::ApiResponse;

pub async fn system_info(State(state): State<AppState>) -> ApiResponse<SystemInfoDto> {
    let workspace_path = state
        .extensions_dir
        .as_ref()
        .map(|p| p.parent().unwrap_or(p).display().to_string());

    ApiResponse::ok(SystemInfoDto {
        host_version: "0.1.0".to_owned(),
        api_version: "0.1.0".to_owned(),
        protocol_version: "0.1.0".to_owned(),
        supported_runtime_families: vec![
            "python".to_owned(),
            "native".to_owned(),
            "builtin".to_owned(),
            "external_service".to_owned(),
        ],
        supported_spec_versions: vec!["0.1".to_owned()],
        workspace_path,
        platform: std::env::consts::OS.to_owned(),
    })
}
