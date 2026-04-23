use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use nexus_backend_runtimes::generic::ids::RuntimeId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};

use crate::AppState;
use crate::envelope::ApiResponse;

use super::installs_get::InstallDto;

#[derive(Debug, Deserialize)]
pub struct ListParams {
    pub runtime_id: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct InstallsListResponse {
    pub installs: Vec<InstallDto>,
}

pub async fn list(
    State(state): State<AppState>,
    Query(params): Query<ListParams>,
) -> axum::response::Response {
    let Some(raw) = params.runtime_id.as_deref() else {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "missing_runtime_id",
            "bad_request",
            "`runtime_id` query parameter is required".to_string(),
        )
        .into_response();
    };
    let runtime_id = match RuntimeId::try_from(raw) {
        Ok(id) => id,
        Err(_) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_runtime_id",
                "bad_request",
                format!("`{raw}` is not a valid runtime id"),
            )
            .into_response();
        }
    };

    let repo = SqliteInstallsRepo::new(state.db.pool().clone());
    match repo.list_by_runtime(&runtime_id).await {
        Ok(records) => {
            let installs: Vec<InstallDto> = records.into_iter().map(InstallDto::from).collect();
            ApiResponse::ok(InstallsListResponse { installs }).into_response()
        }
        Err(e) => ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "installs_storage_error",
            "internal",
            e.to_string(),
        )
        .into_response(),
    }
}
