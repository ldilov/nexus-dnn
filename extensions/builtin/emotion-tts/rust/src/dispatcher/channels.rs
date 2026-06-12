//! Per-run broadcast channels used by the dispatcher to notify SSE
//! subscribers about segment-level progress.
//!
//! Lifecycle:
//! * dispatcher calls `register(run_id)` when it pops a run; obtains a
//!   sender + cleans up via the returned guard on drop.
//! * SSE handler calls `subscribe(run_id)` which returns
//!   `Some(receiver)` once the run is registered, or `None` if the
//!   dispatcher has not yet popped it (handler can re-poll briefly or
//!   surface a "queued" state).

use std::collections::HashMap;
use std::sync::Arc;

use tokio::sync::{broadcast, RwLock};

use crate::dispatcher::events::RunEvent;

const CAPACITY: usize = 256;

pub type RunEventSender = broadcast::Sender<RunEvent>;
pub type RunEventReceiver = broadcast::Receiver<RunEvent>;

#[derive(Clone, Default)]
pub struct RunChannelRegistry {
    inner: Arc<RwLock<HashMap<String, RunEventSender>>>,
}

impl RunChannelRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    /// Register a new channel for `run_id`. Returns a `RegistrationGuard`
    /// that removes the channel when dropped.
    pub async fn register(&self, run_id: impl Into<String>) -> (RunEventSender, RegistrationGuard) {
        let run_id = run_id.into();
        let (tx, _) = broadcast::channel(CAPACITY);
        self.inner.write().await.insert(run_id.clone(), tx.clone());
        (
            tx,
            RegistrationGuard {
                inner: self.inner.clone(),
                run_id,
            },
        )
    }

    pub async fn subscribe(&self, run_id: &str) -> Option<RunEventReceiver> {
        self.inner.read().await.get(run_id).map(|tx| tx.subscribe())
    }
}

/// Drop-guard that removes the channel from the registry.
pub struct RegistrationGuard {
    inner: Arc<RwLock<HashMap<String, RunEventSender>>>,
    run_id: String,
}

impl Drop for RegistrationGuard {
    fn drop(&mut self) {
        let inner = self.inner.clone();
        let run_id = std::mem::take(&mut self.run_id);
        if let Ok(handle) = tokio::runtime::Handle::try_current() {
            handle.spawn(async move {
                inner.write().await.remove(&run_id);
            });
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn subscribe_returns_none_for_unknown_run() {
        let registry = RunChannelRegistry::new();
        assert!(registry.subscribe("run_unknown").await.is_none());
    }

    #[tokio::test]
    async fn subscribe_returns_receiver_for_registered_run() {
        let registry = RunChannelRegistry::new();
        let (tx, _guard) = registry.register("run_a").await;
        let mut rx = registry.subscribe("run_a").await.expect("registered");
        tx.send(RunEvent::RunTerminal {
            run_id: "run_a".into(),
            status: "completed".into(),
        })
        .unwrap();
        let event = rx.recv().await.unwrap();
        assert_eq!(event.run_id(), "run_a");
    }

    #[tokio::test]
    async fn drop_guard_removes_channel() {
        let registry = RunChannelRegistry::new();
        let (_tx, guard) = registry.register("run_b").await;
        drop(guard);
        // Allow the spawned cleanup task to run.
        tokio::task::yield_now().await;
        tokio::time::sleep(std::time::Duration::from_millis(10)).await;
        assert!(registry.subscribe("run_b").await.is_none());
    }
}
