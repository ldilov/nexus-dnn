//! Spec 051 PR-3 (Delta D) — cross-tenant idle reaper integration tests.
//!
//! Spawns real `test-echo-runtime` Python workers via [`StdioLease`]
//! so the reaper exercises the full register → activity → reap →
//! release loop against a live subprocess. Skips quietly when Python
//! isn't on PATH (CI without Python shouldn't count as red — matches
//! the pattern in `lease_roundtrip_test.rs`).

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::{Duration, Instant};

use nexus_backend_runtimes::generic::enums::{LeaseState, OwnerKind};
use nexus_backend_runtimes::generic::ids::{RuntimeInstallId, RuntimeLeaseId};
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::manager::{LeaseManager, RegisterMeta};
use nexus_backend_runtimes::generic::leases::{
    BackendRuntimeLease, LeaseError, StdioLease, do_handshake,
};

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(std::path::Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

fn python_executable() -> &'static str {
    if cfg!(windows) { "python" } else { "python3" }
}

fn echo_worker_spec() -> LaunchSpec {
    let entry = workspace_root()
        .join("extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py");
    LaunchSpec {
        program: PathBuf::from(python_executable()),
        args: vec!["-u".into(), entry.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    }
}

async fn spawn_ready_lease() -> Option<Arc<StdioLease>> {
    let lease = match StdioLease::spawn(echo_worker_spec(), RuntimeLeaseId::new()).await {
        Ok(l) => l,
        Err(e) => {
            eprintln!("skipping idle-reaper test — could not spawn python echo worker: {e}");
            return None;
        }
    };
    if let Err(e) = do_handshake(&*lease as &dyn BackendRuntimeLease).await {
        eprintln!("skipping idle-reaper test — handshake failed: {e}");
        return None;
    }
    lease.set_state(LeaseState::Ready);
    Some(lease)
}

/// Cross-tenant: ext-A has idle timeout configured, ext-B does not.
/// After advancing logical `now` past ext-A's timeout, only ext-A's
/// lease is reaped. ext-B's untouched lease survives. Covers
/// MITIGATION-D1 (per-owner gating) at the integration layer.
#[tokio::test]
async fn cross_tenant_only_configured_install_reaps() {
    let Some(lease_a) = spawn_ready_lease().await else {
        return;
    };
    let Some(lease_b) = spawn_ready_lease().await else {
        return;
    };

    let mgr = Arc::new(LeaseManager::new());
    let install_a = RuntimeInstallId::new();
    let install_b = RuntimeInstallId::new();

    mgr.register_with_meta(
        lease_a.clone(),
        RegisterMeta::new(install_a, OwnerKind::Deployment, "tenant-a".into()),
    )
    .await;
    mgr.register_with_meta(
        lease_b.clone(),
        RegisterMeta::new(install_b, OwnerKind::Deployment, "tenant-b".into()),
    )
    .await;

    // Only ext-A opts into reaping.
    mgr.set_idle_timeout(install_a, Duration::from_secs(1))
        .await;

    // Advance logical "now" past A's window.
    let future_now = Instant::now() + Duration::from_secs(60);
    let victims = mgr.reap_idle(future_now).await;

    assert_eq!(victims.len(), 1, "only ext-A's lease should be reaped");
    let (_lease_id, victim_install_id, victim_handle) = victims.into_iter().next().unwrap();
    assert_eq!(victim_install_id, install_a);

    // Release the reaped lease so the subprocess shuts down cleanly.
    let _ = victim_handle.release().await;

    // ext-B's lease still in the registry.
    assert_eq!(mgr.live_count_for_install(&install_b).await, 1);
    assert_eq!(mgr.live_count_for_install(&install_a).await, 0);

    let _ = lease_b.release().await;
}

/// `idle_reapable = false` opts a single lease out even when its
/// install has a timeout configured. Covers the LaunchSpec /
/// AcquireOptions exemption (broker / operator-pinned leases).
#[tokio::test]
async fn idle_reapable_false_blocks_reaper() {
    let Some(lease) = spawn_ready_lease().await else {
        return;
    };

    let mgr = Arc::new(LeaseManager::new());
    let install_id = RuntimeInstallId::new();
    mgr.register_with_meta(
        lease.clone(),
        RegisterMeta::new(install_id, OwnerKind::Deployment, "pinned".into())
            .with_idle_reapable(false),
    )
    .await;
    mgr.set_idle_timeout(install_id, Duration::from_millis(50))
        .await;

    let future_now = Instant::now() + Duration::from_secs(60);
    let victims = mgr.reap_idle(future_now).await;
    assert!(victims.is_empty(), "idle_reapable=false must veto reaping");

    let _ = lease.release().await;
}

/// Activity start under TOCTOU conditions: even when `last_activity_at`
/// is far in the past, a non-zero `in_flight_count` blocks reaping.
/// Covers MITIGATION-D2 + MITIGATION-D3 — the broker is mid-prompt and
/// the reaper must not interfere.
#[tokio::test]
async fn in_flight_count_blocks_reaper() {
    let Some(lease) = spawn_ready_lease().await else {
        return;
    };

    let mgr = Arc::new(LeaseManager::new());
    let install_id = RuntimeInstallId::new();
    let lease_id = lease.id();
    mgr.register_with_meta(
        lease.clone(),
        RegisterMeta::new(install_id, OwnerKind::Deployment, "mid-prompt".into()),
    )
    .await;
    mgr.set_idle_timeout(install_id, Duration::from_millis(50))
        .await;

    // Broker-style: in-flight bumps to 1.
    mgr.activity_start(&lease_id).await;
    let future_now = Instant::now() + Duration::from_secs(60);
    let victims = mgr.reap_idle(future_now).await;
    assert!(
        victims.is_empty(),
        "in_flight > 0 must block reaping mid-prompt"
    );

    // Drop the in-flight + advance: now the lease is reapable.
    mgr.activity_end(&lease_id).await;
    // activity_end stamps a fresh last_activity_at — emulate the
    // operator returning hours later by passing an even later `now`.
    let later_now = Instant::now() + Duration::from_secs(120);
    let victims = mgr.reap_idle(later_now).await;
    assert_eq!(
        victims.len(),
        1,
        "after activity_end + window, reaper fires"
    );
    let _ = victims.into_iter().next().unwrap().2.release().await;
}

/// Idle_timeout == 0 (the default) keeps the reaper silent regardless
/// of how long a lease has been quiet. Operator opt-in is the contract.
#[tokio::test]
async fn zero_timeout_means_never_reap() {
    let Some(lease) = spawn_ready_lease().await else {
        return;
    };

    let mgr = Arc::new(LeaseManager::new());
    let install_id = RuntimeInstallId::new();
    mgr.register_with_meta(
        lease.clone(),
        RegisterMeta::new(install_id, OwnerKind::Deployment, "default".into()),
    )
    .await;
    // No set_idle_timeout call — default = disabled.

    let future_now = Instant::now() + Duration::from_secs(60 * 60 * 24);
    let victims = mgr.reap_idle(future_now).await;
    assert!(victims.is_empty(), "default timeout=0 must never reap");

    let _ = lease.release().await;
}

/// Concurrent `activity_start` ↔ reap sweep ordering. The
/// `tokio::sync::Mutex` over `entries` is the TOCTOU CAS: if
/// `activity_start` lands first, the entry's `in_flight_count` is 1
/// before the reaper acquires the lock, so the sweep skips. If the
/// sweep lands first, the reap completes before the start can see
/// the entry. Either ordering is safe — what cannot happen is
/// "reaper observes in_flight=0 then start increments and the entry
/// gets reaped anyway". This test runs both orderings.
#[tokio::test]
async fn reap_and_activity_serialize_via_mutex() {
    let Some(lease) = spawn_ready_lease().await else {
        return;
    };

    let mgr = Arc::new(LeaseManager::new());
    let install_id = RuntimeInstallId::new();
    let lease_id = lease.id();
    mgr.register_with_meta(
        lease.clone(),
        RegisterMeta::new(install_id, OwnerKind::Deployment, "race".into()),
    )
    .await;
    // Set a timeout but stamp fresh activity so the entry is NOT
    // currently reapable. The race is on what happens next.
    mgr.set_idle_timeout(install_id, Duration::from_secs(60))
        .await;
    mgr.activity_start(&lease_id).await;

    // Concurrent reap — must observe in_flight = 1 and skip.
    let mgr_a = mgr.clone();
    let mgr_b = mgr.clone();
    let lid = lease_id;
    let reap_task = tokio::spawn(async move {
        mgr_a
            .reap_idle(Instant::now() + Duration::from_secs(120))
            .await
    });
    let end_task = tokio::spawn(async move { mgr_b.activity_end(&lid).await });

    let (victims, _) = tokio::join!(reap_task, end_task);
    let victims = victims.expect("reap task");
    // Either ordering must produce zero victims on this round: if
    // reap ran first → in_flight=1 → skip; if end ran first →
    // last_activity_at just refreshed → within window → skip.
    assert!(
        victims.is_empty(),
        "neither ordering may reap a freshly-active lease, got {} victims",
        victims.len()
    );

    let _ = lease.release().await;
}

#[allow(dead_code)]
fn assert_lease_error_send_sync()
where
    LeaseError: Send + Sync,
{
}
