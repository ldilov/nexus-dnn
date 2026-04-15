//! `/llm/backends/{id}/install|validate|repair` — adapter lifecycle.

use axum::Json;
use axum::extract::{Path, State};
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::adapter::InstallRequest;
use nexus_backend_runtimes::resolver::MachineDescriptor;
use nexus_backend_runtimes::settings::AcceleratorProfile;

use super::{map_error, registry, ulid_lite, unwired};

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
