//! `POST /api/v1/host/models/revalidate` — spec 054 G2.
//!
//! Host-owned, generic model-store maintenance — a two-way reconcile between
//! the install-map rows and the download sink on disk:
//! * **prune** rows whose on-disk file vanished (via [`InstallMap::prune_missing`]), and
//! * **backfill** rows for sink bytes whose rows were lost (via
//!   [`InstallMap::backfill_install_map_from_sink`]).
//!
//! Returns `{ checked, pruned, recorded }`. Keyed by no extension id — operates
//! only on host-owned model store rows + the host-owned download sink.

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
    let prune = match install_map.prune_missing(sink_root).await {
        Ok(report) => report,
        Err(err) => return revalidate_error(err),
    };
    let backfill = match install_map.backfill_install_map_from_sink(sink_root).await {
        Ok(report) => report,
        Err(err) => return revalidate_error(err),
    };

    (
        StatusCode::OK,
        Json(RevalidateResponse {
            checked: prune.checked,
            pruned: prune.pruned,
            recorded: backfill.recorded,
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
