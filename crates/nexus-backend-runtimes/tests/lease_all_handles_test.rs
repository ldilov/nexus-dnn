//! `LeaseManager::all_live_handles()` — host-wide GC fan-out surface.
//!
//! Spawns real `test-echo-runtime` Python workers via [`StdioLease`] and
//! asserts `all_live_handles().len() == live_count()` across multiple
//! installs. Skips quietly when Python isn't on PATH (matches the pattern
//! in `lease_idle_reaper_test.rs`).

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;

use nexus_backend_runtimes::generic::enums::{LeaseState, OwnerKind};
use nexus_backend_runtimes::generic::ids::{RuntimeInstallId, RuntimeLeaseId};
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::manager::{LeaseManager, RegisterMeta};
use nexus_backend_runtimes::generic::leases::{BackendRuntimeLease, StdioLease, do_handshake};

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
            eprintln!("skipping all-handles test — could not spawn python echo worker: {e}");
            return None;
        }
    };
    if let Err(e) = do_handshake(&*lease as &dyn BackendRuntimeLease).await {
        eprintln!("skipping all-handles test — handshake failed: {e}");
        return None;
    }
    lease.set_state(LeaseState::Ready);
    Some(lease)
}

#[tokio::test]
async fn all_live_handles_len_equals_live_count() {
    let Some(lease_a) = spawn_ready_lease().await else {
        return;
    };
    let Some(lease_b) = spawn_ready_lease().await else {
        let _ = lease_a.release().await;
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

    let handles = mgr.all_live_handles().await;
    assert_eq!(handles.len(), mgr.live_count().await);
    assert_eq!(handles.len(), 2, "two leases across two installs");

    // Handles span both installs — confirm it is not install-scoped.
    let a_only = mgr.handles_for_install(&install_a).await;
    assert_eq!(a_only.len(), 1);
    assert!(handles.len() > a_only.len());

    let _ = lease_a.release().await;
    let _ = lease_b.release().await;
}
