//! Host-side `acquire_lease` API (T079).
//!
//! Resolves an install record, inserts a lease row in `starting` state,
//! spawns the stdio lease, runs the handshake, transitions to `ready`,
//! stamps PID. Consumers receive an `Arc<StdioLease>` that implements
//! [`BackendRuntimeLease`] for RPC + notification subscription.

use std::sync::Arc;

use super::LeaseRecord;
use super::error::LeaseError;
use super::handshake::do_handshake;
use super::repo::BackendRuntimeLeasesRepo;
use super::stdio_lease::StdioLease;
use super::trait_def::BackendRuntimeLease;
use crate::generic::enums::{InstallStatus, LeaseState, OwnerKind, Transport};
use crate::generic::family_handler::FamilyHandlerRegistry;
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};
use crate::generic::installs::BackendRuntimeInstallsRepo;
use crate::generic::settings::RuntimeSettings;

/// Options passed by the caller. The `owner_kind` + `owner_ref` pair
/// identifies who owns this lease for cross-resource accounting (A-07).
#[derive(Debug, Clone)]
pub struct AcquireOptions {
    pub owner_kind: OwnerKind,
    /// Caller-supplied opaque identifier (deployment_id, run_id, session uuid).
    pub owner_ref: String,
}

/// Resolve the install, spawn the worker, handshake, persist lease
/// state. Returns the live lease handle.
///
/// Caller responsibilities:
/// - Hold an `Arc<dyn BackendRuntimeInstallsRepo>`, `Arc<dyn BackendRuntimeLeasesRepo>`,
///   and an `Arc<FamilyHandlerRegistry>`.
/// - Pre-resolve the runtime family from the catalog (HTTP + pipeline
///   callers have it on hand via `CatalogEntry.runtime_family`).
/// - Provide [`RuntimeSettings`] (or `None` if defaults suffice) so
///   `spawn_launch_spec` can build the subprocess command.
///
/// On handshake failure the lease row is flipped to `failed/released`
/// before returning, and the subprocess is reaped.
pub async fn acquire_lease(
    install_id: RuntimeInstallId,
    runtime_family: crate::family::RuntimeFamily,
    options: AcquireOptions,
    installs_repo: &dyn BackendRuntimeInstallsRepo,
    leases_repo: &dyn BackendRuntimeLeasesRepo,
    family_handlers: &FamilyHandlerRegistry,
    settings: Option<RuntimeSettings>,
) -> Result<Arc<StdioLease>, LeaseError> {
    let install = installs_repo
        .get(&install_id)
        .await
        .map_err(|e| LeaseError::Internal(format!("installs.get: {e}")))?
        .ok_or(LeaseError::RuntimeUnavailable)?;

    if !matches!(install.status, InstallStatus::Validated) {
        return Err(LeaseError::RuntimeUnavailable);
    }

    let handler = family_handlers
        .get(runtime_family)
        .await
        .ok_or(LeaseError::RuntimeUnavailable)?;

    let effective_settings = settings.unwrap_or_else(|| default_settings_for(&install));
    let spec = handler.spawn_launch_spec(&install, &effective_settings);

    let lease_id = RuntimeLeaseId::new();
    let acquired_at = chrono::Utc::now().timestamp();
    let record = LeaseRecord {
        lease_id,
        runtime_install_id: install_id,
        owner_kind: options.owner_kind,
        owner_ref: options.owner_ref.clone(),
        transport: Transport::Stdio,
        endpoint_json: None,
        pid: None,
        state: LeaseState::Starting,
        crash_recovered: false,
        last_failure_category: None,
        acquired_at,
        released_at: None,
    };
    leases_repo
        .insert(&record)
        .await
        .map_err(|e| LeaseError::Internal(format!("leases.insert: {e}")))?;

    let lease = match StdioLease::spawn(spec, lease_id).await {
        Ok(l) => l,
        Err(e) => {
            // Spawn itself failed — mark the row released with a
            // worker-start failure.
            let _ = leases_repo
                .record_failed(
                    &lease_id,
                    crate::generic::enums::PipelineFailureCategory::WorkerStartFailed,
                    chrono::Utc::now().timestamp(),
                )
                .await;
            return Err(e);
        }
    };

    if let Some(pid) = lease.pid() {
        let _ = leases_repo.set_pid(&lease_id, Some(pid as i32)).await;
    }

    match do_handshake(&*lease as &dyn BackendRuntimeLease).await {
        Ok(_info) => {
            lease.set_state(LeaseState::Ready);
            let _ = leases_repo.update_state(&lease_id, LeaseState::Ready).await;
            Ok(lease)
        }
        Err(e) => {
            let _ = lease.release().await;
            let _ = leases_repo
                .record_failed(
                    &lease_id,
                    crate::generic::enums::PipelineFailureCategory::HandshakeFailed,
                    chrono::Utc::now().timestamp(),
                )
                .await;
            Err(e)
        }
    }
}

fn default_settings_for(install: &crate::generic::installs::InstallRecord) -> RuntimeSettings {
    RuntimeSettings {
        runtime_settings_id: String::new(),
        runtime_id: install.runtime_id.clone(),
        default_device: None,
        default_model_family_id: None,
        keep_warm_default: 1,
        idle_timeout_seconds: 0,
        env_overrides: serde_json::Value::Object(serde_json::Map::new()),
        created_at: 0,
        updated_at: 0,
    }
}
