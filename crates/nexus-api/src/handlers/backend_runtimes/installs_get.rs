//! `GET /api/v1/backend-runtime-installs/:install_id` (T065).

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{
    BackendRuntimeInstallsRepo, InstallRecord, SqliteInstallsRepo,
};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct InstallDto {
    pub runtime_install_id: String,
    pub runtime_id: String,
    pub release_id: String,
    pub platform: String,
    pub accelerator_profile: String,
    pub install_path: String,
    pub entrypoint_path: Option<String>,
    pub artifact_hash: Option<String>,
    pub status: &'static str,
    pub current_phase: Option<String>,
    pub validated_at: Option<i64>,
    pub last_failure_category: Option<String>,
    pub last_failure_detail: Option<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

impl From<InstallRecord> for InstallDto {
    fn from(r: InstallRecord) -> Self {
        Self {
            runtime_install_id: r.runtime_install_id.to_string(),
            runtime_id: r.runtime_id.as_str().to_string(),
            release_id: r.release_id.as_str().to_string(),
            platform: r.platform.as_str().to_string(),
            accelerator_profile: r.accelerator_profile.as_str().to_string(),
            install_path: r.install_path,
            entrypoint_path: r.entrypoint_path,
            artifact_hash: r.artifact_hash,
            status: r.status.as_str(),
            current_phase: r.current_phase,
            validated_at: r.validated_at,
            last_failure_category: r.last_failure_category.map(|c| c.to_wire()),
            last_failure_detail: r.last_failure_detail,
            created_at: r.created_at,
            updated_at: r.updated_at,
        }
    }
}

pub async fn get(
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
    let repo = SqliteInstallsRepo::new(state.db.pool().clone());
    match repo.get(&install_id).await {
        Ok(Some(rec)) => ApiResponse::ok(InstallDto::from(rec)).into_response(),
        Ok(None) => ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "install_not_found",
            "not_found",
            format!("install `{install_id_raw}` not found"),
        )
        .into_response(),
        Err(e) => ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "installs_storage_error",
            "internal",
            e.to_string(),
        )
        .into_response(),
    }
}
