//! `/api/v1/backends/{install_id}/lease` + release + uninstall.
//!
//! Phase 7 (US6) extracts `create_lease` helpers; Phase 9 (US8) replaces the
//! silent `let _ = remove_binary_directory` with a structured warn-log.

use std::sync::Arc;

use axum::Json;
use axum::extract::{Path, Query, State};
use axum::http::{HeaderMap, StatusCode};
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::channel::{
    ApiDialect, RuntimeAddress, RuntimeChannelDescriptor, RuntimeChannelKind, RuntimeEndpoint,
};
use nexus_backend_runtimes::lease::RuntimeLease;
use nexus_backend_runtimes::settings::AcceleratorProfile;
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest};

use super::{extension_from_headers, spawn_error_response, ulid_lite};

#[derive(Debug, Deserialize)]
pub struct LeaseBody {
    #[serde(default)]
    pub args: Vec<String>,
    #[serde(default)]
    pub env: std::collections::BTreeMap<String, String>,
    pub port_hint: Option<u16>,
    #[serde(default = "default_bind_mode")]
    pub bind_mode: RuntimeBindMode,
    pub family: Option<String>,
    pub accelerator: Option<AcceleratorProfile>,
}

fn default_bind_mode() -> RuntimeBindMode {
    RuntimeBindMode::LoopbackOnly
}

#[derive(Debug, Serialize)]
pub struct LeaseEnvelope {
    pub lease: RuntimeLease,
    pub progress_channel: String,
}

#[derive(Debug, Deserialize, Default)]
pub struct UninstallQuery {
    #[serde(default)]
    pub force: bool,
}

/// `POST /api/v1/backends/{installId}/lease` — spec 011 US3 T099.
pub async fn create_lease(
    State(state): State<AppState>,
    Path(install_id): Path<String>,
    headers: HeaderMap,
    Json(body): Json<LeaseBody>,
) -> axum::response::Response {
    let Some(extension_id) = extension_from_headers(&headers) else {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "MISSING_EXTENSION_HEADER",
            "validation",
            "X-Extension-Id header required".into(),
        )
        .into_response();
    };

    let pool = state.db.pool();
    let row_lookup = nexus_backend_runtimes::installs_store::load_by_id(pool, &install_id).await;
    let row = match row_lookup {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::internal(e.to_string()).into_response();
        }
    };

    if let Some(ref r) = row {
        match r.state.as_str() {
            "needs_repair" | "failed" => {
                return spawn_error_response(
                    nexus_backend_runtimes::error::BackendRuntimeError::RuntimeNeedsRepair(
                        r.install_id.clone(),
                    ),
                );
            }
            "installing" => {
                return spawn_error_response(
                    nexus_backend_runtimes::error::BackendRuntimeError::FamilyUnavailable {
                        family: r.family.clone(),
                        reason: "install in progress".into(),
                    },
                );
            }
            _ => {}
        }
    }

    let family = row
        .as_ref()
        .map(|r| r.family.clone())
        .or_else(|| body.family.clone())
        .unwrap_or_else(|| nexus_backend_runtimes::RuntimeFamily::LLAMA_CPP.to_string());
    let accelerator = body.accelerator.unwrap_or(AcceleratorProfile::Cpu);

    let spawn_request = SpawnRuntimeRequest {
        extension_id: extension_id.clone(),
        family: family.clone(),
        version_req: None,
        accelerator,
        args: body.args,
        env: body.env,
        port_hint: body.port_hint,
        bind_mode: body.bind_mode,
        install_id: Some(install_id.clone()),
    };

    if let Some(spawner) = state.spawner.as_ref() {
        match spawner.spawn(spawn_request).await {
            Ok(lease) => {
                let progress_channel = format!("runtime:lease:{}", lease.lease_id);
                let envelope = LeaseEnvelope {
                    lease,
                    progress_channel,
                };
                let mut resp = ApiResponse::ok(envelope).into_response();
                *resp.status_mut() = StatusCode::ACCEPTED;
                return resp;
            }
            Err(err) => return spawn_error_response(err),
        }
    }

    let lease_id = format!("lease_{}", ulid_lite());
    let port = body.port_hint.unwrap_or(0);
    let bind_host = match body.bind_mode {
        RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1".to_string(),
        _ => "0.0.0.0".to_string(),
    };
    let descriptor = RuntimeChannelDescriptor {
        kind: RuntimeChannelKind::HttpTcp,
        api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
        address: RuntimeAddress::Tcp {
            host: bind_host,
            port,
        },
        health: Some(RuntimeEndpoint::path("/health")),
        metrics: None,
        ready: false,
    };
    let lease = RuntimeLease {
        lease_id: lease_id.clone(),
        install_id: install_id.clone(),
        extension_id,
        pid: Some(0),
        log_channel_id: format!("runtime:lease:{lease_id}"),
        channel: descriptor,
        created_at: chrono::Utc::now().to_rfc3339(),
        released_at: None,
    };
    let progress_channel = format!("runtime:lease:{lease_id}");
    let envelope = LeaseEnvelope {
        lease,
        progress_channel,
    };

    let mut resp = ApiResponse::ok(envelope).into_response();
    *resp.status_mut() = StatusCode::ACCEPTED;
    resp
}

/// `DELETE /api/v1/backends/{installId}` — spec 012 US6 T275.
pub async fn uninstall_runtime(
    State(state): State<AppState>,
    Path(install_id): Path<String>,
    Query(q): Query<UninstallQuery>,
) -> axum::response::Response {
    let pool = state.db.pool();
    let row = match nexus_backend_runtimes::installs_store::load_by_id(pool, &install_id).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return ApiResponse::<()>::not_found(format!("install {install_id} not found"))
                .into_response();
        }
        Err(e) => return ApiResponse::<()>::internal(e.to_string()).into_response(),
    };

    let (dependents, live_leases) = collect_uninstall_blockers(&state, &install_id).await;
    if !q.force
        && let Some(resp) = block_if_dependents(&dependents, &live_leases)
    {
        return resp;
    }

    if q.force
        && let Some(spawner) = state.spawner.as_ref()
    {
        drain_leases(
            spawner,
            &state.backend_event_bus,
            &install_id,
            &row.family,
            &live_leases,
        )
        .await;
    }

    let path = std::path::Path::new(&row.install_root);
    let _ = nexus_backend_runtimes::installs_store::remove_binary_directory(path).await;
    if let Err(e) = nexus_backend_runtimes::installs_store::delete_row(pool, &row.install_id).await
    {
        return ApiResponse::<()>::internal(e.to_string()).into_response();
    }
    let mut resp = ApiResponse::no_content().into_response();
    *resp.status_mut() = StatusCode::NO_CONTENT;
    resp
}

async fn collect_uninstall_blockers(
    state: &AppState,
    install_id: &str,
) -> (Vec<String>, Vec<String>) {
    let pool = state.db.pool();
    let dependents = nexus_backend_runtimes::installs_store::list_dependents(pool, install_id)
        .await
        .unwrap_or_default();
    let live_leases = match state.spawner.as_ref() {
        Some(s) => s.list_live_leases_for_install(install_id).await,
        None => Vec::new(),
    };
    (dependents, live_leases)
}

fn block_if_dependents(
    dependents: &[String],
    live_leases: &[String],
) -> Option<axum::response::Response> {
    if dependents.is_empty() && live_leases.is_empty() {
        return None;
    }
    let details = serde_json::json!({
        "dependents": dependents,
        "live_leases": live_leases,
        "hint": "retry with ?force=true",
    });
    Some(
        ApiResponse::<()>::err_with_details(
            axum::http::StatusCode::CONFLICT,
            "RUNTIME_IN_USE",
            "state",
            "runtime has active dependents".into(),
            details,
        )
        .into_response(),
    )
}

async fn drain_leases(
    spawner: &Arc<nexus_backend_runtimes::spawn::Spawner>,
    bus: &Arc<nexus_backend_runtimes::events::BroadcastPublisher>,
    install_id: &str,
    family: &str,
    live_leases: &[String],
) {
    use nexus_backend_runtimes::events::{BackendEvent, EventPublisher};
    let drains = live_leases
        .iter()
        .map(|lease_id| async move { (lease_id.clone(), spawner.shutdown(lease_id).await) });
    let results = futures_util::future::join_all(drains).await;
    for (lease_id, _outcome) in results {
        let evt = BackendEvent::new(
            "process.withdrawn",
            family,
            serde_json::json!({ "lease_id": lease_id }),
        )
        .with_install(install_id);
        bus.publish(evt).await;
    }
}

/// `DELETE /api/v1/backends/leases/{leaseId}` — spec 011 US3 T100.
pub async fn release_lease(
    State(state): State<AppState>,
    Path(lease_id): Path<String>,
    headers: HeaderMap,
) -> axum::response::Response {
    let Some(extension_id) = extension_from_headers(&headers) else {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "MISSING_EXTENSION_HEADER",
            "validation",
            "X-Extension-Id header required".into(),
        )
        .into_response();
    };

    let Some(spawner) = state.spawner.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "SPAWNER_UNAVAILABLE",
            "internal",
            "backend spawner not configured".into(),
        )
        .into_response();
    };
    match spawner.lookup_lease_owner(&lease_id).await {
        Ok(Some(owner)) if owner != extension_id => {
            return spawn_error_response(
                nexus_backend_runtimes::error::BackendRuntimeError::LeaseNotOwned {
                    lease_id,
                    owner,
                    caller: extension_id,
                },
            );
        }
        Ok(None) => {
            return ApiResponse::<()>::not_found(format!("lease {lease_id} not found"))
                .into_response();
        }
        Ok(Some(_)) => {}
        Err(e) => {
            return ApiResponse::<()>::internal(e.to_string()).into_response();
        }
    }

    if let Err(err) = spawner.shutdown(&lease_id).await {
        return spawn_error_response(err);
    }

    let mut resp = ApiResponse::no_content().into_response();
    *resp.status_mut() = StatusCode::NO_CONTENT;
    resp
}
