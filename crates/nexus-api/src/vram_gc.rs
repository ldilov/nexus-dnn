//! Shared host-side VRAM-reclaim fan-out.
//!
//! `runtime.release_memory` is a generic worker JSON-RPC method (every
//! nexus worker implements it). This module owns the fan-out that drives
//! it across a set of lease handles — shared by the host-wide GC endpoint
//! (`handlers::host::gc`) and the per-install stop drain
//! (`handlers::backend_runtimes::installs_stop`) so neither handler module
//! depends on the other.

use std::sync::Arc;
use std::time::Duration;

use futures_util::future::join_all;

use nexus_backend_runtimes::generic::leases::BackendRuntimeLease;

/// Generic protocol method every nexus worker implements. NOT an
/// extension id — it is part of the worker JSON-RPC contract.
pub(crate) const RELEASE_MEMORY: &str = "runtime.release_memory";

/// Per-worker RPC budget. A worker mid-render may take a moment to drop
/// its model; past this we move on rather than block the whole sweep.
pub(crate) const RELEASE_MEMORY_TIMEOUT: Duration = Duration::from_secs(5);

/// Fan `runtime.release_memory` across every supplied lease handle
/// concurrently, each under [`RELEASE_MEMORY_TIMEOUT`]. Returns the count
/// of workers that acknowledged and the summed `freed_mb`. Errors and
/// timeouts are logged at `warn` and excluded from both totals — they do
/// not abort the sweep.
pub(crate) async fn fan_out_release_memory(
    handles: Vec<Arc<dyn BackendRuntimeLease>>,
) -> (usize, i64) {
    fan_out_release_memory_with_timeout(handles, RELEASE_MEMORY_TIMEOUT).await
}

async fn fan_out_release_memory_with_timeout(
    handles: Vec<Arc<dyn BackendRuntimeLease>>,
    per_worker_timeout: Duration,
) -> (usize, i64) {
    let calls = handles.into_iter().map(|handle| async move {
        let lease_id = handle.id();
        match tokio::time::timeout(
            per_worker_timeout,
            handle.send_rpc(RELEASE_MEMORY, serde_json::Value::Null),
        )
        .await
        {
            Ok(Ok(value)) => {
                let freed = value
                    .get("freed_mb")
                    .and_then(serde_json::Value::as_i64)
                    .unwrap_or(0);
                tracing::info!(lease_id = %lease_id, freed_mb = freed, "release_memory acked");
                Some(freed)
            }
            Ok(Err(e)) => {
                tracing::warn!(lease_id = %lease_id, error = %e, "release_memory rpc failed");
                None
            }
            Err(_) => {
                tracing::warn!(
                    lease_id = %lease_id,
                    timeout_ms = per_worker_timeout.as_millis() as u64,
                    "release_memory rpc timed out",
                );
                None
            }
        }
    });

    let outcomes = join_all(calls).await;
    let mut workers_notified = 0usize;
    let mut total_freed_mb = 0i64;
    for outcome in outcomes.into_iter().flatten() {
        workers_notified += 1;
        total_freed_mb += outcome;
    }
    (workers_notified, total_freed_mb)
}

#[cfg(test)]
mod tests {
    use super::*;
    use async_trait::async_trait;
    use nexus_backend_runtimes::generic::enums::LeaseState;
    use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
    use nexus_backend_runtimes::generic::leases::{LeaseError, LeaseNotification};
    use std::sync::Mutex;
    use tokio::sync::broadcast;

    enum Reply {
        Ok(i64),
        Crash,
    }

    /// Hand-rolled lease double recording every `send_rpc` method it
    /// receives. Hand-rolled (not mockall) because the trait carries a
    /// `broadcast::Receiver` which mockall cannot synthesise cleanly, and
    /// `LeaseError` is not `Clone` so a stored `Result` can't be replayed.
    struct FakeLease {
        id: RuntimeLeaseId,
        calls: Arc<Mutex<Vec<String>>>,
        reply: Reply,
        delay: Option<Duration>,
    }

    impl FakeLease {
        fn make(
            reply: Reply,
            delay: Option<Duration>,
            calls: Arc<Mutex<Vec<String>>>,
        ) -> Arc<dyn BackendRuntimeLease> {
            Arc::new(Self {
                id: RuntimeLeaseId::new(),
                calls,
                reply,
                delay,
            })
        }
    }

    #[async_trait]
    impl BackendRuntimeLease for FakeLease {
        fn id(&self) -> RuntimeLeaseId {
            self.id
        }
        fn state(&self) -> LeaseState {
            LeaseState::Ready
        }
        async fn send_rpc(
            &self,
            method: &str,
            _params: serde_json::Value,
        ) -> Result<serde_json::Value, LeaseError> {
            self.calls.lock().unwrap().push(method.to_string());
            if let Some(d) = self.delay {
                tokio::time::sleep(d).await;
            }
            match self.reply {
                Reply::Ok(freed) => Ok(serde_json::json!({ "freed_mb": freed })),
                Reply::Crash => Err(LeaseError::WorkerCrashed),
            }
        }
        fn subscribe_notifications(&self) -> broadcast::Receiver<LeaseNotification> {
            let (tx, rx) = broadcast::channel(1);
            drop(tx);
            rx
        }
        async fn release(&self) -> Result<(), LeaseError> {
            Ok(())
        }
    }

    #[tokio::test]
    async fn fan_out_empty_returns_zeros() {
        let (notified, freed) = fan_out_release_memory(Vec::new()).await;
        assert_eq!(notified, 0);
        assert_eq!(freed, 0);
    }

    #[tokio::test]
    async fn fan_out_sums_freed_and_sends_release_memory() {
        let calls = Arc::new(Mutex::new(Vec::new()));
        let handles = vec![
            FakeLease::make(Reply::Ok(100), None, calls.clone()),
            FakeLease::make(Reply::Ok(250), None, calls.clone()),
        ];
        let (notified, freed) = fan_out_release_memory(handles).await;
        assert_eq!(notified, 2);
        assert_eq!(freed, 350);
        let recorded = calls.lock().unwrap();
        assert_eq!(recorded.len(), 2);
        assert!(recorded.iter().all(|m| m == RELEASE_MEMORY));
    }

    #[tokio::test]
    async fn fan_out_partial_success_skips_errors() {
        let calls = Arc::new(Mutex::new(Vec::new()));
        let handles = vec![
            FakeLease::make(Reply::Ok(100), None, calls.clone()),
            FakeLease::make(Reply::Crash, None, calls.clone()),
        ];
        let (notified, freed) = fan_out_release_memory(handles).await;
        assert_eq!(notified, 1, "the erroring worker is excluded");
        assert_eq!(freed, 100);
    }

    #[tokio::test]
    async fn fan_out_timeout_does_not_abort_sweep() {
        let calls = Arc::new(Mutex::new(Vec::new()));
        let short = Duration::from_millis(50);
        let handles = vec![
            FakeLease::make(Reply::Ok(100), None, calls.clone()),
            FakeLease::make(Reply::Ok(999), Some(Duration::from_secs(5)), calls.clone()),
        ];
        let (notified, freed) = fan_out_release_memory_with_timeout(handles, short).await;
        assert_eq!(notified, 1, "slow worker times out, fast one still counts");
        assert_eq!(freed, 100);
    }
}
