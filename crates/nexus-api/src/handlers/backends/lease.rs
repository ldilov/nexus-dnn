//! `/api/v1/backends/{install_id}/lease` + release + uninstall.
//!
//! Phase 7 (US6) extracts `create_lease` helpers; Phase 9 (US8) replaces the
//! silent `let _ = remove_binary_directory` with a structured warn-log.

use axum::Json;
use axum::extract::{Path, State};
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

/// `POST /api/v1/backends/{installId}/lease` — spec 011 US3 T099. US6
/// orchestrator: delegates to validate_install_for_lease + build_spawn_request
/// + stub_lease.
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
    let row = match nexus_backend_runtimes::installs_store::load_by_id(pool, &install_id).await {
        Ok(r) => r,
        Err(e) => return ApiResponse::<()>::internal(e.to_string()).into_response(),
    };

    if let Err(err) = validate_install_for_lease(row.as_ref()) {
        return spawn_error_response(err);
    }

    let spawn_request = build_spawn_request(
        extension_id.clone(),
        install_id.clone(),
        row.as_ref(),
        &body,
    );

    if let Some(spawner) = state.spawner.as_ref() {
        return match spawner.spawn(spawn_request).await {
            Ok(lease) => {
                let progress_channel = format!("runtime:lease:{}", lease.lease_id);
                let mut resp = ApiResponse::ok(LeaseEnvelope {
                    lease,
                    progress_channel,
                })
                .into_response();
                *resp.status_mut() = StatusCode::ACCEPTED;
                resp
            }
            Err(err) => spawn_error_response(err),
        };
    }

    let envelope = stub_lease(install_id, extension_id, &body);
    let mut resp = ApiResponse::ok(envelope).into_response();
    *resp.status_mut() = StatusCode::ACCEPTED;
    resp
}

/// Pure precondition check (framework-free).
fn validate_install_for_lease(
    row: Option<&nexus_backend_runtimes::installs_store::RuntimeInstallRow>,
) -> Result<(), nexus_backend_runtimes::error::BackendRuntimeError> {
    use nexus_backend_runtimes::error::BackendRuntimeError;
    let Some(r) = row else {
        return Ok(());
    };
    match r.state.as_str() {
        "needs_repair" | "failed" => Err(BackendRuntimeError::RuntimeNeedsRepair(
            r.install_id.clone(),
        )),
        "installing" => Err(BackendRuntimeError::FamilyUnavailable {
            family: r.family.clone(),
            reason: "install in progress".into(),
        }),
        _ => Ok(()),
    }
}

fn build_spawn_request(
    extension_id: String,
    install_id: String,
    row: Option<&nexus_backend_runtimes::installs_store::RuntimeInstallRow>,
    body: &LeaseBody,
) -> SpawnRuntimeRequest {
    let family = row
        .map(|r| r.family.clone())
        .or_else(|| body.family.clone())
        .unwrap_or_else(|| nexus_backend_runtimes::RuntimeFamily::LLAMA_CPP.to_string());
    let accelerator = body.accelerator.unwrap_or(AcceleratorProfile::Cpu);
    SpawnRuntimeRequest {
        extension_id,
        family,
        version_req: None,
        accelerator,
        args: body.args.clone(),
        env: body.env.clone(),
        port_hint: body.port_hint,
        bind_mode: body.bind_mode,
        install_id: Some(install_id),
    }
}

/// Stub envelope for integration-test contexts (no spawner configured).
fn stub_lease(install_id: String, extension_id: String, body: &LeaseBody) -> LeaseEnvelope {
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
        install_id,
        extension_id,
        pid: Some(0),
        log_channel_id: format!("runtime:lease:{lease_id}"),
        channel: descriptor,
        created_at: chrono::Utc::now().to_rfc3339(),
        released_at: None,
    };
    LeaseEnvelope {
        lease,
        progress_channel: format!("runtime:lease:{lease_id}"),
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
