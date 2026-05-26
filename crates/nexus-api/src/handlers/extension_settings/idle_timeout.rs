//! `PATCH /api/v1/extensions/:id/settings/idle_timeout` — set the lease
//! idle-reaper timeout for every runtime install contributed by the
//! caller's extension. `idle_timeout_seconds = 0` disables reaping for
//! the extension's installs.
//!
//! Boundary contract: this handler is generic by `:id`. The host
//! resolves the extension id → catalog entries → installs via the
//! storage repos; the `LeaseManager` API the handler invokes is keyed
//! by `RuntimeInstallId` and does NOT know what "extension" means.

use axum::extract::{Path, State};
use serde::{Deserialize, Serialize};
use std::time::Duration;

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::ids::SourceExtensionId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_extension::ExtensionRegistry;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(Debug, Deserialize)]
pub struct IdleTimeoutPatchRequest {
    /// Idle timeout in seconds. `0` disables reaping for every install
    /// contributed by this extension. Capped at 7 days to keep the
    /// in-memory `last_activity_at` from interacting with system clock
    /// surprises over arbitrarily long horizons.
    pub idle_timeout_seconds: u64,
}

#[derive(Debug, Serialize)]
pub struct IdleTimeoutPatchResponse {
    pub extension_id: String,
    pub idle_timeout_seconds: u64,
    pub installs_updated: usize,
}

/// 7 days. Generous upper bound — operators wanting longer should keep
/// reaping disabled entirely (`= 0`).
const MAX_IDLE_TIMEOUT_SECONDS: u64 = 7 * 24 * 60 * 60;

pub async fn patch_idle_timeout(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
    axum::Json(body): axum::Json<IdleTimeoutPatchRequest>,
) -> Result<ApiResponse<IdleTimeoutPatchResponse>, ApiError> {
    if body.idle_timeout_seconds > MAX_IDLE_TIMEOUT_SECONDS {
        return Err(ApiError::BadRequest(format!(
            "idle_timeout_seconds {} exceeds maximum {MAX_IDLE_TIMEOUT_SECONDS}",
            body.idle_timeout_seconds
        )));
    }

    // Validate the extension exists in the host's extension registry —
    // otherwise the request silently no-ops and operators can't tell
    // typos from "extension contributes no runtimes".
    if state.extension_registry.get_extension(&extension_id).is_none() {
        return Err(ApiError::NotFound(format!(
            "extension {extension_id} not found"
        )));
    }

    let source_ext_id: SourceExtensionId = extension_id.clone().into();
    let catalog: SqliteCatalogRepo = SqliteCatalogRepo::new(state.db.pool().clone());
    let installs_repo: SqliteInstallsRepo = SqliteInstallsRepo::new(state.db.pool().clone());

    let catalog_entries = catalog
        .list_by_source_extension(&source_ext_id)
        .await
        .map_err(|e| ApiError::Internal(format!("catalog list: {e}")))?;

    // Collect every install id contributed by any of this extension's
    // runtimes. Empty result is valid — extension contributes no
    // runtimes — the handler still records the request but reports 0
    // installs updated.
    let mut install_ids = Vec::new();
    for entry in &catalog_entries {
        let installs = installs_repo
            .list_by_runtime(&entry.runtime_id)
            .await
            .map_err(|e| ApiError::Internal(format!("installs list: {e}")))?;
        for install in installs {
            install_ids.push(install.runtime_install_id);
        }
    }

    let timeout = Duration::from_secs(body.idle_timeout_seconds);
    state
        .lease_manager
        .set_idle_timeout_for_installs(&install_ids, timeout)
        .await;

    Ok(ApiResponse::ok(IdleTimeoutPatchResponse {
        extension_id,
        idle_timeout_seconds: body.idle_timeout_seconds,
        installs_updated: install_ids.len(),
    }))
}
