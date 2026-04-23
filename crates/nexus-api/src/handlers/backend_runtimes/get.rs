//! `GET /api/v1/backend-runtimes/:runtime_id`.

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::ids::RuntimeId;

use super::dto::CatalogEntryDto;
use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn get(
    State(state): State<AppState>,
    Path(runtime_id_raw): Path<String>,
) -> axum::response::Response {
    let runtime_id = match RuntimeId::try_from(runtime_id_raw.as_str()) {
        Ok(id) => id,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_runtime_id",
                "bad_request",
                e.to_string(),
            )
            .into_response();
        }
    };

    let repo = SqliteCatalogRepo::new(state.db.pool().clone());
    match repo.find_by_id(&runtime_id).await {
        Ok(Some(entry)) => ApiResponse::ok(CatalogEntryDto::from(entry)).into_response(),
        Ok(None) => ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "runtime_not_found",
            "not_found",
            format!("runtime `{runtime_id_raw}` not found"),
        )
        .into_response(),
        Err(e) => ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "catalog_storage_error",
            "internal",
            e.to_string(),
        )
        .into_response(),
    }
}
