use axum::Json;
use axum::extract::{Path, Query, State};
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::adapter::{ImplementationStatus, InstallRequest};
use nexus_backend_runtimes::error::{RuntimeAdapterError, SettingsError};
use nexus_backend_runtimes::resolver::MachineDescriptor;
use nexus_backend_runtimes::settings::{AcceleratorProfile, RuntimeSettings};
use nexus_backend_runtimes::state::RuntimeCardState;

#[derive(Debug, Serialize)]
pub struct BackendSummary {
    pub id: String,
    pub display_name: String,
    pub implementation_status: String,
    pub card_state: RuntimeCardState,
    pub install: Option<serde_json::Value>,
    pub supported_profiles_on_this_machine: Vec<String>,
    pub last_failure_category: Option<String>,
    pub unavailable_reason: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BackendListResponse {
    pub backends: Vec<BackendSummary>,
    pub summary: BackendSummaryChips,
}

#[derive(Debug, Serialize, Default)]
pub struct BackendSummaryChips {
    pub installed: u32,
    pub validated: u32,
    pub issues: u32,
}

#[derive(Debug, Deserialize, Default)]
pub struct InstallBody {
    pub release_id: Option<String>,
    pub accelerator_profile: Option<AcceleratorProfile>,
}

#[derive(Debug, Serialize)]
pub struct InstallResponse {
    pub install_task_id: String,
    pub runtime_install_id: String,
}

#[derive(Debug, Deserialize, Default)]
pub struct LogQuery {
    pub source: Option<String>,
    pub level: Option<String>,
    pub since: Option<i64>,
    pub until: Option<i64>,
    pub cursor: Option<String>,
    pub limit: Option<u32>,
}

fn registry(state: &AppState) -> Option<Arc<nexus_backend_runtimes::adapter::AdapterRegistry>> {
    state.backend_adapter_registry.clone()
}

fn map_error(err: RuntimeAdapterError) -> ApiResponse<()> {
    match err {
        RuntimeAdapterError::BackendNotFound(msg) => ApiResponse::<()>::err(
            axum::http::StatusCode::NOT_FOUND,
            "backend_not_found",
            "not_found",
            msg,
        ),
        RuntimeAdapterError::BackendUnavailable(msg) => ApiResponse::<()>::err(
            axum::http::StatusCode::CONFLICT,
            "backend_unavailable",
            "conflict",
            msg,
        ),
        RuntimeAdapterError::InstallInProgress(msg) => ApiResponse::<()>::err(
            axum::http::StatusCode::CONFLICT,
            "install_in_progress",
            "conflict",
            msg,
        ),
        RuntimeAdapterError::InstallNotFound(msg) => ApiResponse::<()>::err(
            axum::http::StatusCode::CONFLICT,
            "install_not_found",
            "conflict",
            msg,
        ),
        RuntimeAdapterError::Settings(SettingsError::ConflictWithManagedFlag(flag)) => {
            ApiResponse::<()>::err(
                axum::http::StatusCode::BAD_REQUEST,
                "conflict_with_managed_flag",
                "validation",
                flag,
            )
        }
        RuntimeAdapterError::Settings(SettingsError::Invalid(msg)) => ApiResponse::<()>::err(
            axum::http::StatusCode::BAD_REQUEST,
            "invalid_settings",
            "validation",
            msg,
        ),
        RuntimeAdapterError::Install(err) => ApiResponse::<()>::internal(err.to_string()),
        RuntimeAdapterError::Validation(err) => ApiResponse::<()>::internal(err.to_string()),
        RuntimeAdapterError::Io(err) => ApiResponse::<()>::internal(err.to_string()),
        RuntimeAdapterError::Storage(msg) => ApiResponse::<()>::internal(msg),
        RuntimeAdapterError::Unimplemented(msg) => ApiResponse::<()>::err(
            axum::http::StatusCode::NOT_IMPLEMENTED,
            "NOT_IMPLEMENTED",
            "internal",
            msg,
        ),
    }
}

fn unwired() -> ApiResponse<()> {
    ApiResponse::<()>::err(
        axum::http::StatusCode::SERVICE_UNAVAILABLE,
        "backends_not_wired",
        "internal",
        "backend adapter registry is not configured in this build".into(),
    )
}

fn impl_status_str(status: &ImplementationStatus) -> (&'static str, Option<String>) {
    match status {
        ImplementationStatus::Available => ("available", None),
        ImplementationStatus::Unavailable(reason) => ("unavailable", Some(reason.clone())),
    }
}

pub async fn list(State(state): State<AppState>) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let machine = MachineDescriptor::detect().await;
    let mut out = Vec::new();
    let mut chips = BackendSummaryChips::default();
    for adapter in registry.all() {
        match adapter.current_summary(&machine).await {
            Ok(summary) => {
                if summary.install.is_some() {
                    chips.installed += 1;
                }
                match summary.card_state {
                    RuntimeCardState::Ready => chips.validated += 1,
                    RuntimeCardState::Broken => chips.issues += 1,
                    _ => {}
                }
                let (status_label, reason) = impl_status_str(&summary.implementation_status);
                out.push(BackendSummary {
                    id: summary.id,
                    display_name: summary.display_name,
                    implementation_status: status_label.into(),
                    card_state: summary.card_state,
                    install: summary
                        .install
                        .as_ref()
                        .map(|m| serde_json::to_value(m).unwrap_or(serde_json::Value::Null)),
                    supported_profiles_on_this_machine: summary
                        .supported_profiles
                        .iter()
                        .map(|p| p.as_wire().to_string())
                        .collect(),
                    last_failure_category: summary.last_failure_category,
                    unavailable_reason: reason.or(summary.unavailable_reason),
                });
            }
            Err(err) => return map_error(err).into_response(),
        }
    }
    ApiResponse::ok(BackendListResponse {
        backends: out,
        summary: chips,
    })
    .into_response()
}

pub async fn detail(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    let machine = MachineDescriptor::detect().await;
    match adapter.current_summary(&machine).await {
        Ok(summary) => {
            let (status_label, reason) = impl_status_str(&summary.implementation_status);
            ApiResponse::ok(BackendSummary {
                id: summary.id,
                display_name: summary.display_name,
                implementation_status: status_label.into(),
                card_state: summary.card_state,
                install: summary
                    .install
                    .as_ref()
                    .map(|m| serde_json::to_value(m).unwrap_or(serde_json::Value::Null)),
                supported_profiles_on_this_machine: summary
                    .supported_profiles
                    .iter()
                    .map(|p| p.as_wire().to_string())
                    .collect(),
                last_failure_category: summary.last_failure_category,
                unavailable_reason: reason.or(summary.unavailable_reason),
            })
            .into_response()
        }
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn install(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
    Json(body): Json<InstallBody>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    let machine = MachineDescriptor::detect().await;
    let req = InstallRequest {
        release_id: body.release_id,
        accelerator_profile: body.accelerator_profile,
    };
    match adapter.install(req, &machine).await {
        Ok(manifest) => ApiResponse::created(InstallResponse {
            install_task_id: format!("itask_{}", ulid_lite()),
            runtime_install_id: manifest.runtime_install_id,
        })
        .into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn validate(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    match adapter.validate().await {
        Ok(report) => ApiResponse::ok(report).into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn repair(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    let machine = MachineDescriptor::detect().await;
    match adapter.repair(&machine).await {
        Ok(manifest) => ApiResponse::ok(manifest).into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn get_settings(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    match adapter.get_settings().await {
        Ok(settings) => ApiResponse::ok(settings).into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn put_settings(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
    Json(settings): Json<RuntimeSettings>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    match adapter.put_settings(settings).await {
        Ok(()) => ApiResponse::no_content().into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

#[derive(Debug, Serialize)]
pub struct LogsResponse {
    pub lines: Vec<serde_json::Value>,
    pub next_cursor: Option<String>,
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

#[derive(Debug, Serialize)]
pub struct DiagnosticsResponse {
    pub diagnostics: Vec<serde_json::Value>,
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
/// for (spec 011 US1 + Phase 9 T096). Reads directly from
/// `host_runtime_installs`; does NOT route through extension state.
pub async fn list_host_runtimes(State(state): State<AppState>) -> axum::response::Response {
    let pool = state.db.pool();
    let rows = match nexus_backend_runtimes::installs_store::list_all(pool).await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::err(
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                "RUNTIMES_LIST_FAILED",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    let mut installs = Vec::with_capacity(rows.len());
    for row in rows {
        let dependents =
            nexus_backend_runtimes::installs_store::list_dependents(pool, &row.install_id)
                .await
                .unwrap_or_default();
        installs.push(HostRuntimeInstallView {
            install_id: row.install_id,
            family: row.family,
            version: row.version,
            accelerator: row.accelerator,
            install_root: row.install_root,
            state: row.state,
            created_at: row.created_at,
            updated_at: row.updated_at,
            dependents,
        });
    }

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
/// parameter catalog for a runtime family (spec 011 US5 T085).
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

fn ulid_lite() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let n = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or_default();
    format!("{n:032x}").to_uppercase()
}

use axum::http::{HeaderMap, StatusCode};
use nexus_backend_runtimes::channel::{
    ApiDialect, RuntimeAddress, RuntimeChannelDescriptor, RuntimeChannelKind, RuntimeEndpoint,
};
use nexus_backend_runtimes::lease::RuntimeLease;
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest};

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

fn extension_from_headers(headers: &HeaderMap) -> Option<String> {
    headers
        .get("X-Extension-Id")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string())
}

fn spawn_error_response(
    err: nexus_backend_runtimes::error::BackendRuntimeError,
) -> axum::response::Response {
    let (status, code, msg) = nexus_backend_runtimes::spawn::http_status_for(&err);
    let status = StatusCode::from_u16(status).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
    let category = match code {
        "RUNTIME_NEEDS_REPAIR" | "LEASE_NOT_OWNED" => "state",
        "FAMILY_UNAVAILABLE" => "not_found",
        "RESERVED_LAUNCH_SETTING" | "MANAGED_SPAWN_DISALLOWED" => "validation",
        "NO_PORT_AVAILABLE" => "resource",
        _ => "internal",
    };
    ApiResponse::<()>::err(status, code, category, msg).into_response()
}

/// `POST /api/v1/backends/{installId}/lease` — spec 011 US3 T099.
///
/// Validates the `X-Extension-Id` header and returns a 202 Accepted envelope
/// carrying the newly-issued lease descriptor. When the configured
/// [`Spawner`] has a pool + adapter registry, this triggers a real fork;
/// otherwise a stub envelope is returned for integration-test contexts.
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

#[derive(Debug, Deserialize, Default)]
pub struct UninstallQuery {
    #[serde(default)]
    pub force: bool,
}

/// `DELETE /api/v1/backends/{installId}` — spec 012 US6 T275.
///
/// Returns 409 `RUNTIME_IN_USE` with dependent ids when live leases exist
/// unless `?force=true`. On the force path, drains each live lease with a
/// 10s grace, emits `process.withdrawn` per lease, removes the binary
/// directory, and deletes the install row. Returns 204 on success.
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
///
/// Releases an active runtime lease. Returns 204 on success, 400 on missing
/// header, 403 when the extension does not own the lease.
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
