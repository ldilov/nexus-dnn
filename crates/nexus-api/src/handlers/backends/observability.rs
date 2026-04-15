//! `/llm/backends/{id}/logs` + `/diagnostics`.

use axum::extract::{Path, Query, State};
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use crate::AppState;
use crate::envelope::ApiResponse;

use super::{map_error, registry, unwired};

#[derive(Debug, Deserialize, Default)]
pub struct LogQuery {
    pub source: Option<String>,
    pub level: Option<String>,
    pub since: Option<i64>,
    pub until: Option<i64>,
    pub cursor: Option<String>,
    pub limit: Option<u32>,
}

#[derive(Debug, Serialize)]
pub struct LogsResponse {
    pub lines: Vec<serde_json::Value>,
    pub next_cursor: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct DiagnosticsResponse {
    pub diagnostics: Vec<serde_json::Value>,
}

pub async fn logs(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
    Query(query): Query<LogQuery>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    if registry.get(&backend_id).is_none() {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    }
    let pool = state.db.pool().clone();
    let store_query = nexus_backend_runtimes::log_store::LogQuery {
        source: query.source.filter(|s| s != "all"),
        severity: query.level.filter(|s| s != "all"),
        since: query.since,
        until: query.until,
        limit: query.limit.unwrap_or(500),
    };
    match nexus_backend_runtimes::log_store::fetch(&pool, &store_query).await {
        Ok(lines) => ApiResponse::ok(LogsResponse {
            lines: lines
                .into_iter()
                .map(|l| serde_json::to_value(l).unwrap_or(serde_json::Value::Null))
                .collect(),
            next_cursor: None,
        })
        .into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn diagnostics(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    if registry.get(&backend_id).is_none() {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    }
    ApiResponse::ok(DiagnosticsResponse {
        diagnostics: Vec::new(),
    })
    .into_response()
}
