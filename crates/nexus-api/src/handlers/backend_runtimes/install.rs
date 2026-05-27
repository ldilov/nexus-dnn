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

    // Spawn the pipeline if we can resolve the contributing extension's
    // on-disk directory. Builtin extensions live under the host's
    // builtin_extensions_dir (typically `<repo>/extensions/builtin/<id>`),
    // user-installed extensions live under `extensions_dir` (typically
    // `~/.nexus/extensions/<id>`). The extension registry knows the
    // canonical path for each activated extension regardless of source,
    // so we prefer that. Falls back to the legacy `extensions_dir`
    // join when the registry has no entry (e.g. fixture installs in
    // unit tests).
    let registry_dir = <nexus_extension::InMemoryExtensionRegistry as nexus_extension::ExtensionRegistry>::get_extension(
        state.extension_registry.as_ref(),
        entry.source_extension_id.as_str(),
    )
    .map(|ext| ext.directory);

    let ext_root_opt = registry_dir.clone().or_else(|| {
        state
            .extensions_dir
            .as_ref()
            .map(|d| d.join(entry.source_extension_id.as_str()))
    });

    let pipeline_status = if let Some(extension_root) = ext_root_opt {
        let req = super::pipeline_runner::PipelineRequest {
            install_id,
            runtime_id: entry.runtime_id.clone(),
            runtime_family: entry.runtime_family,
            release_id: record.release_id.clone(),
            platform: record.platform.clone(),
            accelerator_profile: record.accelerator_profile.clone(),
            install_path: record.install_path.clone(),
            extension_root,
            version_manifest_path: entry.version_manifest_path.clone(),
            worker_entrypoint_path: entry.worker_entrypoint.clone(),
        };
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
