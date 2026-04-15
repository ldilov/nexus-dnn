use axum::extract::{Path, State};
use axum::response::IntoResponse;
use serde::Serialize;

use crate::AppState;
use crate::envelope::ApiResponse;

use super::registry;

#[derive(Debug, Serialize)]
pub struct HostRuntimeInstallView {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub accelerator: String,
    pub install_root: String,
    pub state: String,
    pub created_at: String,
    pub updated_at: String,
    pub dependents: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct HostRuntimesResponse {
    pub installs: Vec<HostRuntimeInstallView>,
    pub available_families: Vec<String>,
}

/// `GET /api/v1/backends` — list every host-managed runtime install with its
/// active dependents, alongside the families the host advertises adapters
/// `host_runtime_installs`; does NOT route through extension state.
pub async fn list_host_runtimes(State(state): State<AppState>) -> axum::response::Response {
    let pool = state.db.pool();
    // (previously: list_all + per-row list_dependents in a loop).
    let rows = match nexus_backend_runtimes::runtime_installs_store::list_all_with_dependents(pool)
        .await
    {
        Ok(r) => r,
        Err(e) => {
            crate::handlers::errors::log_handler_error(
                &e,
                "GET /backends",
                "RUNTIMES_LIST_FAILED",
                None,
            );
            return ApiResponse::<()>::err(
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "RUNTIMES_LIST_FAILED",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    let installs: Vec<HostRuntimeInstallView> = rows
        .into_iter()
        .map(|(row, dependents)| HostRuntimeInstallView {
            install_id: row.install_id,
            family: row.family,
            version: row.version,
            accelerator: row.accelerator,
            install_root: row.install_root,
            state: row.state,
            created_at: row.created_at,
            updated_at: row.updated_at,
            dependents,
        })
        .collect();

    let available_families = registry(&state)
        .map(|r| {
            r.all()
                .iter()
                .map(|a| a.id().to_string())
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();

    ApiResponse::ok(HostRuntimesResponse {
        installs,
        available_families,
    })
    .into_response()
}

/// `GET /api/v1/backends/{family}/parameters` — return the versioned launch
///
/// 200 with the catalog on a known family. 404 `FAMILY_UNKNOWN` otherwise.
/// The catalog is advisory: extensions may still pass unknown flags through
/// at spawn time — they get classified as `extension-passthrough`.
pub async fn parameter_catalog(
    State(_state): State<AppState>,
    Path(family): Path<String>,
) -> axum::response::Response {
    let canon = nexus_backend_runtimes::RuntimeFamily::canonical(family.as_str());
    match canon {
        Some(nexus_backend_runtimes::RuntimeFamily::LlamaCpp) => {
            match nexus_backend_runtimes::parameter_catalog::llamacpp_catalog() {
                Ok(catalog) => ApiResponse::ok((*catalog).clone()).into_response(),
                Err(e) => ApiResponse::<()>::err(
                    axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                    "CATALOG_LOAD_FAILED",
                    "internal",
                    e.to_string(),
                )
                .into_response(),
            }
        }
        _ => ApiResponse::<()>::err(
            axum::http::StatusCode::NOT_FOUND,
            "FAMILY_UNKNOWN",
            "not_found",
            format!("no parameter catalog for runtime family {family}"),
        )
        .into_response(),
    }
}
