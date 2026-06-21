//! `POST /api/v1/host/models/revalidate` — spec 054 G2.
//!
//! Host-owned, generic model-store maintenance — a reconcile between the
//! install-map rows and the download sink on disk via
//! [`InstallMap::reconcile_installed_with_sink`]:
//! * **prune** rows whose on-disk file vanished or truncated,
//! * **backfill** rows for sidecar-described sink bytes whose rows were lost, and
//! * **adopt** any remaining undeclared / sidecar-less on-disk file with a
//!   stable `job_id`-derived artifact id so it is listable AND deletable.
//!
//! Returns `{ checked, pruned, recorded }` (`recorded` = backfilled + adopted).
//! Keyed by no extension id — operates only on host-owned model store rows +
//! the host-owned download sink.

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
    recorded: usize,
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

    let sink_root = orchestrator.sink_root();
    let report = match install_map.reconcile_installed_with_sink(sink_root).await {
        Ok(report) => report,
        Err(err) => return revalidate_error(err),
    };

    (
        StatusCode::OK,
        Json(RevalidateResponse {
            checked: report.checked,
            pruned: report.pruned,
            recorded: report.backfilled + report.adopted_orphans,
        }),
    )
        .into_response()
}

fn revalidate_error(err: impl std::fmt::Display) -> Response {
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
