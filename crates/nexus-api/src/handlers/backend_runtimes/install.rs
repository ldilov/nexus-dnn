//! `POST /api/v1/backend-runtimes/:runtime_id/install` (T064).
//!
//! v1 contract: validate the catalog entry exists + is `available`,
//! insert a `pending` install row keyed by
//! `(runtime_id, release_id, platform, accelerator_profile)`, return 202
//! with the new `runtime_install_id`.
//!
//! **Note**: the actual pipeline orchestrator spawn is deferred. This
//! handler creates the row so the SSE/get/retry endpoints have something
//! to address; the family-handler registry + version-manifest resolver
//! are wired in a follow-up task. Until then, installs stay in `pending`
//! and clients can observe but not progress them. Documented in the
//! 202 response payload as `pipeline_status: "queued"`.

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::enums::ImplementationStatus;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::installs::{
    BackendRuntimeInstallsRepo, InstallRecord, SqliteInstallsRepo,
};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize)]
pub struct InstallRequest {
    pub release_id: String,
    pub platform: String,
    pub accelerator_profile: String,
}

#[derive(Debug, Serialize)]
pub struct InstallResponse {
    pub runtime_install_id: String,
    /// `queued` — pipeline will run when the family-handler registry is
    /// wired into the host bootstrap. Until then the install row remains
    /// in `pending`. Intentionally exposed so clients can detect this.
    pub pipeline_status: &'static str,
}

pub async fn install(
    State(state): State<AppState>,
    Path(runtime_id_raw): Path<String>,
    axum::Json(req): axum::Json<InstallRequest>,
) -> axum::response::Response {
    let runtime_id = match RuntimeId::try_from(runtime_id_raw.as_str()) {
        Ok(id) => id,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_runtime_id",
                "bad_request",
                e.to_string(),
            )
            .into_response();
        }
    };

    let release_id = match ReleaseId::try_from(req.release_id.as_str()) {
        Ok(id) => id,
        Err(e) => {
            return bad_request("invalid_release_id", e.to_string());
        }
    };
    let platform = match PlatformId::try_from(req.platform.as_str()) {
        Ok(id) => id,
        Err(e) => return bad_request("invalid_platform", e.to_string()),
    };
    let profile = match AcceleratorProfile::try_from(req.accelerator_profile.as_str()) {
        Ok(id) => id,
        Err(e) => return bad_request("invalid_accelerator_profile", e.to_string()),
    };

    let catalog = SqliteCatalogRepo::new(state.db.pool().clone());
    let entry = match catalog.find_by_id(&runtime_id).await {
        Ok(Some(e)) => e,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::NOT_FOUND,
                "runtime_not_found",
                "not_found",
                format!("runtime `{runtime_id_raw}` not found"),
            )
            .into_response();
        }
        Err(e) => return repo_500("catalog_storage_error", e.to_string()),
    };

    if entry.implementation_status != ImplementationStatus::Available {
        return ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "runtime_unavailable",
            "conflict",
            format!(
                "runtime `{}` is currently `{}`, not available",
                runtime_id_raw,
                entry.implementation_status.as_str()
            ),
        )
        .into_response();
    }

    let installs = SqliteInstallsRepo::new(state.db.pool().clone());

    // Reject if a pending/in-flight install already exists for the same tuple.
    let in_flight = match installs.list_by_runtime(&runtime_id).await {
        Ok(rows) => rows.into_iter().any(|r| {
            r.release_id == release_id
                && r.platform == platform
                && r.accelerator_profile == profile
                && matches!(
                    r.status,
                    nexus_backend_runtimes::generic::enums::InstallStatus::Pending
                        | nexus_backend_runtimes::generic::enums::InstallStatus::Downloading
                        | nexus_backend_runtimes::generic::enums::InstallStatus::Validating
                )
        }),
        Err(e) => return repo_500("installs_storage_error", e.to_string()),
    };
    if in_flight {
        return ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "install_already_in_flight",
            "conflict",
            "an install is already in flight for this tuple".into(),
        )
        .into_response();
    }

    let install_id = RuntimeInstallId::new();
    let now = chrono::Utc::now().timestamp();
    let installs_root = state
        .host_install_paths
        .as_ref()
        .map(|p| p.installs_root.display().to_string())
        .unwrap_or_else(|| "./installs".to_string());
    let record = InstallRecord {
        runtime_install_id: install_id,
        runtime_id: runtime_id.clone(),
        release_id,
        platform,
        accelerator_profile: profile,
        install_path: format!("{installs_root}/backend-runtimes/{runtime_id_raw}/{install_id}"),
        entrypoint_path: None,
        artifact_hash: None,
        status: nexus_backend_runtimes::generic::enums::InstallStatus::Pending,
        current_phase: None,
        validated_at: None,
        last_failure_category: None,
        last_failure_detail: None,
        created_at: now,
        updated_at: now,
    };
    if let Err(e) = installs.insert(&record).await {
        return repo_500("installs_insert_failed", e.to_string());
    }

    // Spawn the pipeline if an extensions_dir is configured. Without it
    // the host cannot resolve the extension's version manifest, so the
    // install stays `pending` and clients should see `pipeline_status:
    // "unwired"` in the response (same effect as the legacy behaviour).
    let pipeline_status = if let Some(ext_dir) = state.extensions_dir.clone() {
        let req = super::pipeline_runner::PipelineRequest::from_catalog(
            install_id,
            &entry,
            record.release_id.clone(),
            record.platform.clone(),
            record.accelerator_profile.clone(),
            record.install_path.clone(),
            &ext_dir,
        );
        super::pipeline_runner::spawn_pipeline(state.clone(), req);
        "running"
    } else {
        "unwired"
    };

    let resp = InstallResponse {
        runtime_install_id: install_id.to_string(),
        pipeline_status,
    };
    // Override the envelope's default 200 to 202 Accepted (async start).
    let mut response = ApiResponse::ok(resp).into_response();
    *response.status_mut() = StatusCode::ACCEPTED;
    response
}

fn bad_request(code: &str, message: String) -> axum::response::Response {
    ApiResponse::<()>::err(StatusCode::BAD_REQUEST, code, "bad_request", message).into_response()
}

fn repo_500(code: &str, message: String) -> axum::response::Response {
    ApiResponse::<()>::err(StatusCode::INTERNAL_SERVER_ERROR, code, "internal", message)
        .into_response()
}
