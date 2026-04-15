mod catalog;
mod host_models;
mod host_runtimes;
mod lease;
mod lifecycle;
mod observability;
mod settings;
mod uninstall;

pub use catalog::{detail, list};
pub use host_models::{
    create_model_lease, list_host_models, release_model_lease, resolve_host_models,
};
pub use host_runtimes::{list_host_runtimes, parameter_catalog};
pub use lease::{create_lease, release_lease};
pub use lifecycle::{install, repair, validate};
pub use observability::{diagnostics, logs};
pub use settings::{get_settings, put_settings};
pub use uninstall::uninstall_runtime;

use std::sync::Arc;

use axum::http::HeaderMap;

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::adapter::ImplementationStatus;
use nexus_backend_runtimes::error::{RuntimeAdapterError, SettingsError};

pub(super) fn registry(
    state: &AppState,
) -> Option<Arc<nexus_backend_runtimes::adapter::AdapterRegistry>> {
    state.backend_adapter_registry.clone()
}

pub(super) fn map_error(err: RuntimeAdapterError) -> ApiResponse<()> {
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

pub(super) fn unwired() -> ApiResponse<()> {
    ApiResponse::<()>::err(
        axum::http::StatusCode::SERVICE_UNAVAILABLE,
        "backends_not_wired",
        "internal",
        "backend adapter registry is not configured in this build".into(),
    )
}

pub(super) fn impl_status_str(status: &ImplementationStatus) -> (&'static str, Option<String>) {
    match status {
        ImplementationStatus::Available => ("available", None),
        ImplementationStatus::Unavailable(reason) => ("unavailable", Some(reason.clone())),
    }
}

pub(super) fn ulid_lite() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let n = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or_default();
    format!("{n:032x}").to_uppercase()
}

pub(super) fn extension_from_headers(headers: &HeaderMap) -> Option<String> {
    headers
        .get("X-Extension-Id")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string())
}

pub(super) fn spawn_error_response(
    err: nexus_backend_runtimes::error::BackendRuntimeError,
) -> axum::response::Response {
    use axum::http::StatusCode;
    use axum::response::IntoResponse;
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
