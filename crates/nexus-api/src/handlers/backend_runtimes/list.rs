//! `GET /api/v1/backend-runtimes` — list catalog entries with optional
//! filters: `runtime_family`, `source_extension_id`, `implementation_status`.

use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Deserialize;

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::ids::SourceExtensionId;

use super::dto::{CatalogEntryDto, CatalogListResponse};
use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct ListParams {
    pub runtime_family: Option<String>,
    pub source_extension_id: Option<String>,
    pub implementation_status: Option<String>,
}

pub async fn list(
    State(state): State<AppState>,
    Query(params): Query<ListParams>,
) -> axum::response::Response {
    let repo = SqliteCatalogRepo::new(state.db.pool().clone());

    let raw = match params.source_extension_id.as_deref() {
        Some(ext_id) => {
            let ext = SourceExtensionId::from(ext_id);
            match repo.list_by_source_extension(&ext).await {
                Ok(rows) => rows,
                Err(e) => return repo_error_response(e).into_response(),
            }
        }
        None => match repo.list_all().await {
            Ok(rows) => rows,
            Err(e) => return repo_error_response(e).into_response(),
        },
    };

    let filtered: Vec<CatalogEntryDto> = raw
        .into_iter()
        .filter(|e| match params.runtime_family.as_deref() {
            Some(f) => e.runtime_family.as_str() == f,
            None => true,
        })
        .filter(|e| match params.implementation_status.as_deref() {
            Some(s) => e.implementation_status.as_str() == s,
            None => true,
        })
        .map(CatalogEntryDto::from)
        .collect();

    ApiResponse::ok(CatalogListResponse { runtimes: filtered }).into_response()
}

fn repo_error_response(
    e: nexus_backend_runtimes::generic::errors::GenericRepoError,
) -> ApiResponse<()> {
    ApiResponse::<()>::err(
        StatusCode::INTERNAL_SERVER_ERROR,
        "catalog_storage_error",
        "internal",
        e.to_string(),
    )
}
