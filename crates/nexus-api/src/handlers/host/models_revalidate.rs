//! `POST /api/v1/host/models/revalidate` — spec 054 G2.
//!
//! Host-owned, generic model-store maintenance: sweeps every install-map row,
//! prunes those whose on-disk file vanished (via the shared
//! [`InstallMap::prune_missing`] self-heal path), and returns `{ checked,
//! pruned }`. Keyed by no extension id — operates only on host-owned model
//! store rows.

use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

use crate::AppState;

#[derive(Debug, Serialize)]
struct RevalidateResponse {
    checked: usize,
    pruned: usize,
}

#[derive(Debug, Serialize)]
struct ErrorBody {
    code: &'static str,
    message: String,
}

pub async fn revalidate_models(State(state): State<AppState>) -> Response {
    let (Some(install_map), Some(orchestrator)) = (
        state.install_map.as_ref(),
        state.download_orchestrator.as_ref(),
    ) else {
        let body = ErrorBody {
            code: "model_store_unavailable",
            message: "model store is not configured on this host".to_string(),
        };
        return (StatusCode::SERVICE_UNAVAILABLE, Json(body)).into_response();
    };

    match install_map.prune_missing(orchestrator.sink_root()).await {
        Ok(report) => (
            StatusCode::OK,
            Json(RevalidateResponse {
                checked: report.checked,
                pruned: report.pruned,
            }),
        )
            .into_response(),
        Err(err) => {
            tracing::error!(
                route = "/api/v1/host/models/revalidate",
                error.code = "revalidate_failed",
                error.detail = %err,
                "handler error",
            );
            let body = ErrorBody {
                code: "internal_error",
                message: "failed to revalidate installed models".to_string(),
            };
            (StatusCode::INTERNAL_SERVER_ERROR, Json(body)).into_response()
        }
    }
}
