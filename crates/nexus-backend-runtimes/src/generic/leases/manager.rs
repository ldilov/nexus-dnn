//! In-process registry of live [`StdioLease`] handles.
//!
//! The SQLite leases repo persists lease rows for audit + crash recovery;
//! the `LeaseManager` holds the `Arc<StdioLease>` so the host can look
//! up a live lease by id and drive `send_rpc` / `release` / filter by
//! install_id. Manager state is purely runtime — on restart the crash
//! recovery sweep reaps orphaned rows (T027).
//!
//! Spec 051 PR-3 (Delta D — idle reaper). Each `Entry` carries
//! activity-tracking metadata (`last_activity_at`, `in_flight_count`,
//! `idle_reapable`, `OwnerKind`+`owner_ref`). Per-install idle timeouts
//! live in `idle_timeouts`. The reaper task scans entries on a fixed
//! tick and atomically (under the manager mutex) re-checks state +
//! `last_activity_at` + `in_flight_count` before release — the same
//! `tokio::sync::Mutex<HashMap>` guard provides the TOCTOU CAS the
//! Security gate mandated. Default `idle_timeout = 0` → never reap.

use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, Instant};

use tokio::sync::Mutex;

use super::error::LeaseError;
use super::stdio_lease::StdioLease;
use super::trait_def::BackendRuntimeLease;
use crate::generic::enums::OwnerKind;
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};

/// Caller-supplied metadata at register time. Carries enough context for
/// the reaper to make per-tenant decisions without leaking extension
/// shape into the manager itself.
#[derive(Debug, Clone)]
pub struct RegisterMeta {
    pub install_id: RuntimeInstallId,
    pub owner_kind: OwnerKind,
    pub owner_ref: String,
    /// `false` opts the lease out of idle reaping entirely (e.g.
    /// long-running operator-pinned leases). Default `true`.
    pub idle_reapable: bool,
}

impl RegisterMeta {
    /// Construct with `idle_reapable = true`. Most callers use this.
    pub fn new(install_id: RuntimeInstallId, owner_kind: OwnerKind, owner_ref: String) -> Self {
        Self {
            install_id,
            owner_kind,
            owner_ref,
            idle_reapable: true,
        }
    }

    pub fn with_idle_reapable(mut self, idle_reapable: bool) -> Self {
        self.idle_reapable = idle_reapable;
        self
    }
}

struct Entry {
    lease: Arc<StdioLease>,
    install_id: RuntimeInstallId,
    owner_kind: OwnerKind,
    owner_ref: String,
    idle_reapable: bool,
    last_activity_at: Instant,
    /// Counter not bool — multiple concurrent callers may bump activity
    /// (e.g. broker + diagnostics health probe). Reaper requires
    /// `in_flight_count == 0` to consider a lease idle.
    in_flight_count: u32,
}

/// Snapshot of an entry surfaced via diagnostics + tests. Cheap to
/// clone; carries no live handle.
#[derive(Debug, Clone)]
pub struct EntrySnapshot {
    pub lease_id: RuntimeLeaseId,
    pub install_id: RuntimeInstallId,
    pub owner_kind: OwnerKind,
    pub owner_ref: String,
    pub idle_reapable: bool,
    pub idle_for: Duration,
    pub in_flight_count: u32,
}

/// Clone-safe handle registry. Wrap in `Arc<LeaseManager>` to share
/// across HTTP handlers + lifecycle code.
#[derive(Default)]
pub struct LeaseManager {
    entries: Mutex<HashMap<RuntimeLeaseId, Entry>>,
    /// Per-install idle timeout. Default behaviour when an install has
    /// no entry: never reap (treat as `Duration::ZERO`).
    idle_timeouts: Mutex<HashMap<RuntimeInstallId, Duration>>,
}

impl LeaseManager {
    pub fn new() -> Self {
        Self::default()
    }

    /// Register a freshly-acquired lease with default metadata
    /// (`OwnerKind::Deployment`, empty `owner_ref`, `idle_reapable = true`).
    /// Existing call sites use this; new code should prefer
    /// [`register_with_meta`] so the reaper can attribute and gate per
    /// tenant.
    pub async fn register(&self, lease: Arc<StdioLease>, install_id: RuntimeInstallId) {
        self.register_with_meta(
            lease,
            RegisterMeta::new(install_id, OwnerKind::Deployment, String::new()),
        )
        .await;
    }

    /// Register a freshly-acquired lease with caller-supplied metadata.
    pub async fn register_with_meta(&self, lease: Arc<StdioLease>, meta: RegisterMeta) {
        let id = lease.id();
        let entry = Entry {
            lease,
            install_id: meta.install_id,
            owner_kind: meta.owner_kind,
            owner_ref: meta.owner_ref,
            idle_reapable: meta.idle_reapable,
            last_activity_at: Instant::now(),
            in_flight_count: 0,
        };
        self.entries.lock().await.insert(id, entry);
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

    /// Bump in-flight count and refresh `last_activity_at`. Called at
    /// the entry of any lease use (broker `complete()`, draft-suggestions
    /// adapter). Pairs 1:1 with [`activity_end`]. No-op if the lease is
    /// absent (already reaped) so callers can fire-and-forget.
    pub async fn activity_start(&self, lease_id: &RuntimeLeaseId) {
        let mut guard = self.entries.lock().await;
        if let Some(entry) = guard.get_mut(lease_id) {
            entry.in_flight_count = entry.in_flight_count.saturating_add(1);
            entry.last_activity_at = Instant::now();
        }
    }

    /// Decrement in-flight count and stamp `last_activity_at`. Pairs
    /// with [`activity_start`]. No-op if absent. Saturates at zero so
    /// an unbalanced end never underflows.
    pub async fn activity_end(&self, lease_id: &RuntimeLeaseId) {
        let mut guard = self.entries.lock().await;
        if let Some(entry) = guard.get_mut(lease_id) {
            entry.in_flight_count = entry.in_flight_count.saturating_sub(1);
            entry.last_activity_at = Instant::now();
        }
    }

    /// Set the idle timeout for a single install. `Duration::ZERO`
    /// disables reaping for that install. Per-install scope keeps the
    /// manager generic — the host's PATCH route resolves the caller's
    /// extension id into one or more install ids via the catalog.
    pub async fn set_idle_timeout(&self, install_id: RuntimeInstallId, timeout: Duration) {
        let mut guard = self.idle_timeouts.lock().await;
        if timeout.is_zero() {
            guard.remove(&install_id);
        } else {
            guard.insert(install_id, timeout);
        }
    }

    /// Convenience: apply the same timeout to every install in a batch
    /// (used by the PATCH route after catalog lookup).
    pub async fn set_idle_timeout_for_installs(
        &self,
        install_ids: &[RuntimeInstallId],
        timeout: Duration,
    ) {
        let mut guard = self.idle_timeouts.lock().await;
        for id in install_ids {
            if timeout.is_zero() {
                guard.remove(id);
            } else {
                guard.insert(*id, timeout);
            }
        }
    }

    /// Read the configured idle timeout for an install. `None` →
    /// reaping disabled.
    pub async fn idle_timeout(&self, install_id: &RuntimeInstallId) -> Option<Duration> {
        self.idle_timeouts.lock().await.get(install_id).copied()
    }

    /// Atomic reap sweep. Examines every entry; for each whose timeout
    /// is configured AND idle_reapable AND in_flight_count == 0 AND
    /// `last_activity_at` is older than the timeout, removes the entry
    /// from the map and collects the handle. Subsequent `lease.release()`
    /// calls happen OUTSIDE the manager lock so a slow worker shutdown
    /// can't block other lease operations.
    ///
    /// Returns `(lease_id, install_id)` pairs for every reaped lease —
    /// the caller (reaper task) emits a tracing event per id.
    ///
    /// **TOCTOU**: the entries map and the timeouts map are both locked
    /// for the duration of the scan. Any concurrent `activity_start`
    /// blocks until the sweep completes; any reaped entry's last view
    /// of `last_activity_at` is the one used for the decision.
    pub async fn reap_idle(
        &self,
        now: Instant,
    ) -> Vec<(RuntimeLeaseId, RuntimeInstallId, Arc<StdioLease>)> {
        let timeouts = self.idle_timeouts.lock().await.clone();
        if timeouts.is_empty() {
            return Vec::new();
        }
        let mut guard = self.entries.lock().await;
        let mut victims: Vec<(RuntimeLeaseId, RuntimeInstallId, Arc<StdioLease>)> = Vec::new();
        guard.retain(|lease_id, entry| {
            let Some(timeout) = timeouts.get(&entry.install_id) else {
                return true;
            };
            if !Self::should_reap(
                entry.idle_reapable,
                entry.in_flight_count,
                entry.last_activity_at,
                *timeout,
                now,
            ) {
                return true;
            }
            victims.push((*lease_id, entry.install_id, entry.lease.clone()));
            false
        });
        victims
    }

    /// Spawn the background reaper task. Returns a `JoinHandle` so the
    /// host can abort it on shutdown. Ticks every `interval` and reaps
    /// idle leases; emits a `tracing::info` per reaped id.
    pub fn start_reaper_task(
        self: Arc<Self>,
        interval: Duration,
    ) -> tokio::task::JoinHandle<()> {
        tokio::spawn(async move {
            let mut ticker = tokio::time::interval(interval);
            ticker.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
            loop {
                ticker.tick().await;
                let now = Instant::now();
                let victims = self.reap_idle(now).await;
                for (lease_id, install_id, lease) in victims {
                    tracing::info!(
                        lease_id = %lease_id,
                        install_id = %install_id,
                        "reaping idle lease",
                    );
                    if let Err(e) = lease.release().await {
                        tracing::warn!(
                            lease_id = %lease_id,
                            error = %e,
                            "idle-lease release failed",
                        );
                    }
                }
            }
        })
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
    pub async fn handles_for_install(&self, install_id: &RuntimeInstallId) -> Vec<Arc<StdioLease>> {
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

    /// Pure decision used by [`reap_idle`]. Extracted so the gating
    /// rules can be unit-tested without spawning real workers.
    pub(crate) fn should_reap(
        idle_reapable: bool,
        in_flight_count: u32,
        last_activity_at: Instant,
        timeout: Duration,
        now: Instant,
    ) -> bool {
        if !idle_reapable || in_flight_count > 0 || timeout.is_zero() {
            return false;
        }
        now.saturating_duration_since(last_activity_at) >= timeout
    }

    /// Snapshot every entry — diagnostic + integration-test surface.
    pub async fn snapshot_entries(&self) -> Vec<EntrySnapshot> {
        let now = Instant::now();
        self.entries
            .lock()
            .await
            .iter()
            .map(|(id, e)| EntrySnapshot {
                lease_id: *id,
                install_id: e.install_id,
                owner_kind: e.owner_kind,
                owner_ref: e.owner_ref.clone(),
                idle_reapable: e.idle_reapable,
                idle_for: now.saturating_duration_since(e.last_activity_at),
                in_flight_count: e.in_flight_count,
            })
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn t0() -> Instant {
        Instant::now()
    }

    #[test]
    fn reaps_when_idle_past_timeout() {
        let now = t0();
        let last = now - Duration::from_secs(60);
        assert!(LeaseManager::should_reap(true, 0, last, Duration::from_secs(30), now));
    }

    #[test]
    fn skips_when_in_flight_nonzero() {
        let now = t0();
        let last = now - Duration::from_secs(60);
        assert!(!LeaseManager::should_reap(true, 1, last, Duration::from_secs(30), now));
    }

    #[test]
    fn skips_when_not_idle_reapable() {
        let now = t0();
        let last = now - Duration::from_secs(60);
        assert!(!LeaseManager::should_reap(false, 0, last, Duration::from_secs(30), now));
    }

    #[test]
    fn skips_when_timeout_zero() {
        let now = t0();
        let last = now - Duration::from_secs(3600);
        assert!(!LeaseManager::should_reap(true, 0, last, Duration::ZERO, now));
    }

    #[test]
    fn skips_when_within_timeout_window() {
        let now = t0();
        let last = now - Duration::from_secs(10);
        assert!(!LeaseManager::should_reap(true, 0, last, Duration::from_secs(30), now));
    }

    #[test]
    fn boundary_exactly_at_timeout_reaps() {
        let now = t0();
        let last = now - Duration::from_secs(30);
        assert!(LeaseManager::should_reap(true, 0, last, Duration::from_secs(30), now));
    }

    #[tokio::test]
    async fn idle_timeout_setter_removes_zero() {
        let mgr = LeaseManager::new();
        let install_id = RuntimeInstallId::new();
        mgr.set_idle_timeout(install_id, Duration::from_secs(30)).await;
        assert_eq!(mgr.idle_timeout(&install_id).await, Some(Duration::from_secs(30)));
        mgr.set_idle_timeout(install_id, Duration::ZERO).await;
        assert_eq!(mgr.idle_timeout(&install_id).await, None);
    }

    #[tokio::test]
    async fn batch_setter_applies_uniformly() {
        let mgr = LeaseManager::new();
        let a = RuntimeInstallId::new();
        let b = RuntimeInstallId::new();
        mgr.set_idle_timeout_for_installs(&[a, b], Duration::from_secs(10))
            .await;
        assert_eq!(mgr.idle_timeout(&a).await, Some(Duration::from_secs(10)));
        assert_eq!(mgr.idle_timeout(&b).await, Some(Duration::from_secs(10)));
        mgr.set_idle_timeout_for_installs(&[a, b], Duration::ZERO)
            .await;
        assert_eq!(mgr.idle_timeout(&a).await, None);
        assert_eq!(mgr.idle_timeout(&b).await, None);
    }

    #[tokio::test]
    async fn reap_idle_empty_when_no_timeouts_configured() {
        let mgr = LeaseManager::new();
        let victims = mgr.reap_idle(Instant::now()).await;
        assert!(victims.is_empty());
    }

    #[tokio::test]
    async fn activity_helpers_no_op_when_lease_absent() {
        let mgr = LeaseManager::new();
        let id = RuntimeLeaseId::new();
        // Must not panic / underflow on missing entry.
        mgr.activity_start(&id).await;
        mgr.activity_end(&id).await;
    }
}
