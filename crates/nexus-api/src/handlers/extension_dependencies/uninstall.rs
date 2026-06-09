//! `POST /api/v1/extensions/:id/uninstall` — spec 054 G5.
//!
//! Generic host-owned overlay (like `/install` and `/settings/idle_timeout`):
//! keyed by `:id`, zero extension-id literals, zero per-extension business
//! logic. The host resolves the extension id into host-owned resources —
//! catalog entries → runtime installs, install-map artifact refs, and the
//! per-extension data dir — and reverses the install:
//!
//! 1. release the extension's leases (BEFORE removing files, AC-5.2),
//! 2. remove the runtime/venv install dirs + extension data dir (AC-5.3),
//! 3. drop the extension's artifact refs then refcount-GC each affected
//!    job (delete models only this extension referenced, keep shared ones —
//!    AC-5.4),
//! 4. mark the extension state not-installed (AC-5.7),
//! 5. return `{ removed_models, kept_shared_models, freed_bytes }` (AC-5.5).
//!
//! Idempotent / safe on a never-installed or already-uninstalled extension:
//! every step no-ops cleanly on absent state (AC-5.6).

use std::sync::Arc;

use axum::extract::{Path, State};
use serde::Serialize;

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::ids::SourceExtensionId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_backend_runtimes::generic::leases::LeaseManager;
use nexus_extension::ExtensionRegistry;
use nexus_models_store::downloads::InstallMap;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

/// Structured summary returned to the caller (AC-5.5). `removed_models` and
/// `kept_shared_models` are the count of artifact jobs deleted (refcount hit
/// zero) versus retained (still referenced by another extension).
#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct UninstallSummary {
    pub extension_id: String,
    pub removed_models: usize,
    pub kept_shared_models: usize,
    pub freed_bytes: u64,
    pub leases_released: usize,
    pub install_dirs_removed: usize,
}

/// Host-owned handles the uninstall orchestration operates on. Carved out so
/// the reversal logic is unit-testable with tempdir-backed dirs + an in-memory
/// install map, without standing up the full axum stack.
pub struct UninstallDeps<'a> {
    pub catalog: &'a dyn BackendRuntimeCatalogRepo,
    pub installs: &'a dyn BackendRuntimeInstallsRepo,
    pub lease_manager: &'a LeaseManager,
    pub install_map: &'a InstallMap,
    pub sink_root: &'a std::path::Path,
    /// `<host_data_dir>/extensions/<extension_id>` — the venv (under
    /// `runtime/<family>`) and all other per-extension data live here.
    pub extension_data_dir: std::path::PathBuf,
}

/// Reverse an extension install. Generic by `extension_id` — no extension
/// literals, no per-extension branching. Steps run in the order leases →
/// files → model GC so nothing is removed while a worker still holds it.
pub async fn perform_uninstall(
    extension_id: &str,
    deps: UninstallDeps<'_>,
) -> Result<UninstallSummary, ApiError> {
    let source_ext_id: SourceExtensionId = extension_id.into();

    // Resolve extension id → catalog entries → install ids. Empty is valid
    // (extension contributes no runtimes / never installed) — AC-5.6.
    let catalog_entries = deps
        .catalog
        .list_by_source_extension(&source_ext_id)
        .await
        .map_err(|e| ApiError::Internal(format!("catalog list: {e}")))?;

    let mut install_ids = Vec::new();
    let mut install_records = Vec::new();
    for entry in &catalog_entries {
        let installs = deps
            .installs
            .list_by_runtime(&entry.runtime_id)
            .await
            .map_err(|e| ApiError::Internal(format!("installs list: {e}")))?;
        for install in installs {
            install_ids.push(install.runtime_install_id);
            install_records.push(install);
        }
    }

    // 1) Release leases BEFORE touching files (AC-5.2). The manager is keyed
    //    by RuntimeInstallId and stays extension-agnostic.
    let leases_released = deps
        .lease_manager
        .release_all_for_installs(&install_ids)
        .await
        .map_err(|e| ApiError::Internal(format!("lease release: {e}")))?;

    // 2) Remove on-disk install dirs + their catalog/install rows, then the
    //    whole per-extension data dir (venv + everything else) — AC-5.3.
    let mut install_dirs_removed = 0usize;
    for install in &install_records {
        let path = std::path::Path::new(&install.install_path);
        if path.exists() {
            if let Err(e) = tokio::fs::remove_dir_all(path).await {
                tracing::warn!(
                    target: "extension_uninstall",
                    install_path = %install.install_path,
                    error = %e,
                    "failed to remove runtime install dir"
                );
            } else {
                install_dirs_removed += 1;
            }
        }
        if let Err(e) = deps.installs.delete(&install.runtime_install_id).await {
            tracing::warn!(
                target: "extension_uninstall",
                install_id = %install.runtime_install_id,
                error = %e,
                "failed to delete install row"
            );
        }
    }

    if deps.extension_data_dir.exists()
        && let Err(e) = tokio::fs::remove_dir_all(&deps.extension_data_dir).await
    {
        tracing::warn!(
            target: "extension_uninstall",
            data_dir = %deps.extension_data_dir.display(),
            error = %e,
            "failed to remove extension data dir"
        );
    }

    // 3) Drop artifact refs then refcount-GC each affected job (AC-5.4).
    let affected_jobs = deps
        .install_map
        .remove_refs_for_extension(extension_id)
        .await
        .map_err(|e| ApiError::Internal(format!("remove refs: {e}")))?;

    let mut removed_models = 0usize;
    let mut kept_shared_models = 0usize;
    let mut freed_bytes = 0u64;
    for job_id in &affected_jobs {
        let outcome = deps
            .install_map
            .gc_artifact_if_unreferenced(job_id, deps.sink_root)
            .await
            .map_err(|e| ApiError::Internal(format!("gc {job_id}: {e}")))?;
        if outcome.deleted {
            removed_models += 1;
            freed_bytes = freed_bytes.saturating_add(outcome.freed_bytes);
        } else {
            kept_shared_models += 1;
        }
    }

    tracing::info!(
        target: "extension_uninstall",
        %extension_id,
        leases_released,
        install_dirs_removed,
        removed_models,
        kept_shared_models,
        freed_bytes,
        "extension uninstalled"
    );

    Ok(UninstallSummary {
        extension_id: extension_id.to_string(),
        removed_models,
        kept_shared_models,
        freed_bytes,
        leases_released,
        install_dirs_removed,
    })
}

pub async fn uninstall_extension(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<UninstallSummary>, ApiError> {
    // Validate the extension is registered so typos return 404 rather than a
    // silent zero-result uninstall. A registered-but-never-installed extension
    // is still a valid uninstall target (idempotent no-op, AC-5.6).
    if state
        .extension_registry
        .get_extension(&extension_id)
        .is_none()
    {
        return Err(ApiError::NotFound(format!(
            "extension {extension_id} not found"
        )));
    }

    let install_map = state
        .install_map
        .as_ref()
        .ok_or_else(|| ApiError::Internal("model store is not configured on this host".into()))?;
    let orchestrator = state.download_orchestrator.as_ref().ok_or_else(|| {
        ApiError::Internal("download orchestrator is not configured on this host".into())
    })?;
    let host_data_dir = state
        .dep_host_data_dir
        .as_ref()
        .ok_or_else(|| ApiError::Internal("host data dir not configured".into()))?;

    let catalog: Arc<dyn BackendRuntimeCatalogRepo> =
        Arc::new(SqliteCatalogRepo::new(state.db.pool().clone()));
    let installs: Arc<dyn BackendRuntimeInstallsRepo> =
        Arc::new(SqliteInstallsRepo::new(state.db.pool().clone()));

    let extension_data_dir = host_data_dir.join("extensions").join(&extension_id);

    let summary = perform_uninstall(
        &extension_id,
        UninstallDeps {
            catalog: catalog.as_ref(),
            installs: installs.as_ref(),
            lease_manager: state.lease_manager.as_ref(),
            install_map,
            sink_root: orchestrator.sink_root(),
            extension_data_dir,
        },
    )
    .await?;

    // AC-5.7 — flip the in-memory dep-install state so the gate/list no longer
    // reports an active/complete install for this extension.
    state.dep_install_state.remove(&extension_id);

    Ok(ApiResponse::ok(summary))
}
