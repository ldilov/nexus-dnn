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

fn ulid_lite() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let n = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or_default();
    format!("{n:032x}").to_uppercase()
}
