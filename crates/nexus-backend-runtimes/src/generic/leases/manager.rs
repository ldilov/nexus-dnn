//! In-process registry of live [`StdioLease`] handles.
//!
//! The SQLite leases repo persists lease rows for audit + crash recovery;
//! the `LeaseManager` holds the `Arc<StdioLease>` so the host can look
//! up a live lease by id and drive `send_rpc` / `release` / filter by
//! install_id. Manager state is purely runtime — on restart the crash
//! recovery sweep reaps orphaned rows (T027).

use std::collections::HashMap;
use std::sync::Arc;

use tokio::sync::Mutex;

use super::error::LeaseError;
use super::stdio_lease::StdioLease;
use super::trait_def::BackendRuntimeLease;
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};

struct Entry {
    lease: Arc<StdioLease>,
    install_id: RuntimeInstallId,
}

/// Clone-safe handle registry. Wrap in `Arc<LeaseManager>` to share
/// across HTTP handlers + lifecycle code.
#[derive(Default)]
pub struct LeaseManager {
    entries: Mutex<HashMap<RuntimeLeaseId, Entry>>,
}

impl LeaseManager {
    pub fn new() -> Self {
        Self::default()
    }

    /// Register a freshly-acquired lease so subsequent lookups + drains
    /// can find it.
    pub async fn register(&self, lease: Arc<StdioLease>, install_id: RuntimeInstallId) {
        let id = lease.id();
        self.entries
            .lock()
            .await
            .insert(id, Entry { lease, install_id });
    }

    /// Fetch the live handle for a lease id. Returns `None` if the
    /// lease has already been released or never existed.
    pub async fn get(&self, lease_id: &RuntimeLeaseId) -> Option<Arc<StdioLease>> {
        self.entries
            .lock()
            .await
            .get(lease_id)
            .map(|e| e.lease.clone())
    }

    /// Release one lease and drop it from the registry. Idempotent —
    /// releasing a lease that's already gone returns `Ok(())`.
    pub async fn release(&self, lease_id: &RuntimeLeaseId) -> Result<(), LeaseError> {
        let entry = self.entries.lock().await.remove(lease_id);
        if let Some(e) = entry {
            e.lease.release().await?;
        }
        Ok(())
    }

    /// Drain every live lease bound to the given install. Returns the
    /// count of leases released. Used by `POST /install/:id/stop` and
    /// by the extension-deactivate cascade (T080).
    pub async fn release_all_for_install(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Result<usize, LeaseError> {
        let to_release = {
            let mut guard = self.entries.lock().await;
            let mut collected = Vec::new();
            guard.retain(|id, entry| {
                if entry.install_id == *install_id {
                    collected.push((*id, entry.lease.clone()));
                    false
                } else {
                    true
                }
            });
            collected
        };
        let n = to_release.len();
        for (_, lease) in to_release {
            if let Err(e) = lease.release().await {
                tracing::warn!(error = %e, "lease release failed during drain");
            }
        }
        Ok(n)
    }

    /// Drain every live lease bound to any install in `install_ids`.
    /// Used by the deactivate cascade where the caller has already
    /// resolved the extension's install list from the catalog.
    pub async fn release_all_for_installs(
        &self,
        install_ids: &[RuntimeInstallId],
    ) -> Result<usize, LeaseError> {
        let mut total = 0;
        for install_id in install_ids {
            total += self.release_all_for_install(install_id).await?;
        }
        Ok(total)
    }

    /// Snapshot every live lease handle bound to the given install.
    /// Returned clones are independent of the manager's internal lock —
    /// callers may await against each lease without holding registry
    /// state. Used by the `GET /install/:id/health` endpoint (T084).
    pub async fn handles_for_install(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Vec<Arc<StdioLease>> {
        self.entries
            .lock()
            .await
            .values()
            .filter(|e| e.install_id == *install_id)
            .map(|e| e.lease.clone())
            .collect()
    }

    /// Non-authoritative live count — useful for deciding whether a
    /// `DELETE /install/:id` uninstall should 409.
    pub async fn live_count_for_install(&self, install_id: &RuntimeInstallId) -> usize {
        self.entries
            .lock()
            .await
            .values()
            .filter(|e| e.install_id == *install_id)
            .count()
    }

    /// Current live-lease count across all installs. Diagnostic only.
    pub async fn live_count(&self) -> usize {
        self.entries.lock().await.len()
    }
}
