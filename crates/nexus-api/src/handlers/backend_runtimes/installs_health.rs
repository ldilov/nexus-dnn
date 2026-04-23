use std::str::FromStr;
use std::time::Instant;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_backend_runtimes::generic::leases::BackendRuntimeLease;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct LeaseHealth {
    pub lease_id: String,
    pub state: &'static str,
    pub healthy: bool,
    pub latency_ms: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct HealthResponse {
    pub install_id: String,
    pub live_lease_count: usize,
    pub aggregate: &'static str,
    pub leases: Vec<LeaseHealth>,
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

    let installs = SqliteInstallsRepo::new(state.db.pool().clone());
    match installs.get(&install_id).await {
        Ok(Some(_)) => {}
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::NOT_FOUND,
                "install_not_found",
                "not_found",
                format!("install `{install_id_raw}` not found"),
            )
            .into_response();
        }
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "installs_storage_error",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    }

    let handles = state.lease_manager.handles_for_install(&install_id).await;

    let mut probes = Vec::with_capacity(handles.len());
    for lease in handles {
        let lease_id = lease.id().to_string();
        let state_str = lease.state().as_str();
        let started = Instant::now();
        let (healthy, err) = match lease.send_rpc("health", serde_json::Value::Null).await {
            Ok(v) => {
                let ok = v.get("ok").and_then(|b| b.as_bool()).unwrap_or(true);
                (ok, None)
            }
            Err(e) => (false, Some(e.to_string())),
        };
        let latency_ms = started.elapsed().as_millis() as u64;
        probes.push(LeaseHealth {
            lease_id,
            state: state_str,
            healthy,
            latency_ms,
            error: err,
        });
    }

    let aggregate = classify(&probes);
    ApiResponse::ok(HealthResponse {
        install_id: install_id_raw,
        live_lease_count: probes.len(),
        aggregate,
        leases: probes,
    })
    .into_response()
}

fn classify(probes: &[LeaseHealth]) -> &'static str {
    if probes.is_empty() {
        return "no_live_leases";
    }
    let all_ready = probes
        .iter()
        .all(|p| p.healthy && matches!(p.state, "ready" | "busy"));
    if all_ready { "healthy" } else { "degraded" }
}
