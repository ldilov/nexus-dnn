//! Bounded pool of [`LeaseProvider`]s for parallel run execution.
//!
//! Each provider keeps its own single-slot "acquire-once, stay-warm" lifecycle,
//! so a pool of N providers backs up to N concurrent workers (= N resident
//! models = N× VRAM). Extras beyond the primary are built lazily and only
//! acquire their worker on first use, so an *unused* pool costs nothing.
//!
//! The dispatcher borrows a distinct provider per in-flight run via
//! [`LeaseProviderPool::acquire`]; the guard returns it on drop. The number of
//! providers (the worker ceiling) is fixed at construction; how many run
//! concurrently is governed independently by the queue's `max_in_flight` cap.

use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::sync::Mutex as StdMutex;

use tokio::sync::{OwnedSemaphorePermit, Semaphore};

use crate::backend_client::{LeaseFactory, LeaseProvider};
use crate::domain::{EmotionTtsError, Result};

pub struct LeaseProviderPool {
    primary: Arc<LeaseProvider>,
    all: Vec<Arc<LeaseProvider>>,
    available: Arc<StdMutex<Vec<Arc<LeaseProvider>>>>,
    sem: Arc<Semaphore>,
    /// Monotonic counter that fences background warm tasks against a later
    /// Stop/Restart (or a newer Start). A warm task captures the generation it
    /// was spawned under and bails the moment it observes a higher value — so
    /// it can never re-acquire a worker that a `stop_all` just released.
    start_generation: AtomicU64,
}

impl LeaseProviderPool {
    /// Single-provider pool (ceiling 1) — preserves the historical serial
    /// behaviour and needs no factory. Used by `spawn_dispatcher` and tests.
    #[must_use]
    pub fn single(primary: Arc<LeaseProvider>) -> Self {
        Self::from_providers(primary.clone(), vec![primary])
    }

    /// Pool of `ceiling` providers: the existing `primary` plus `ceiling - 1`
    /// extras built from `factory`. Extras acquire their worker only on first
    /// use, so an unused pool costs no VRAM.
    #[must_use]
    pub fn with_ceiling(
        factory: Arc<dyn LeaseFactory>,
        primary: Arc<LeaseProvider>,
        ceiling: usize,
    ) -> Self {
        let ceiling = ceiling.max(1);
        let mut all = Vec::with_capacity(ceiling);
        all.push(primary.clone());
        for _ in 1..ceiling {
            all.push(Arc::new(LeaseProvider::new(factory.clone())));
        }
        Self::from_providers(primary, all)
    }

    fn from_providers(primary: Arc<LeaseProvider>, all: Vec<Arc<LeaseProvider>>) -> Self {
        let n = all.len().max(1);
        Self {
            primary,
            available: Arc::new(StdMutex::new(all.clone())),
            sem: Arc::new(Semaphore::new(n)),
            all,
            start_generation: AtomicU64::new(0),
        }
    }

    /// Bump the start generation and return the new value. `start()` captures
    /// this before spawning its warm task; `stop_impl`/`restart_impl` call it
    /// to invalidate any in-flight warm. SeqCst so the warm loop's `generation`
    /// load is guaranteed to observe a concurrent bump.
    pub fn next_generation(&self) -> u64 {
        self.start_generation.fetch_add(1, Ordering::SeqCst) + 1
    }

    /// The current start generation. A warm task compares this against the
    /// value it captured and bails if they differ (a newer Start, Stop, or
    /// Restart has superseded it).
    #[must_use]
    pub fn generation(&self) -> u64 {
        self.start_generation.load(Ordering::SeqCst)
    }

    /// The primary provider — the one shared with the HTTP routes for one-off
    /// ops (handshake, voice preprocess, audio edit) and warmed by
    /// `/runtime/start`.
    #[must_use]
    pub fn primary(&self) -> Arc<LeaseProvider> {
        self.primary.clone()
    }

    /// Every provider in the pool (for idle-release sweeps and stop-all).
    #[must_use]
    pub fn providers(&self) -> &[Arc<LeaseProvider>] {
        &self.all
    }

    /// Number of workers this pool can host (the ceiling).
    #[must_use]
    pub fn size(&self) -> usize {
        self.all.len()
    }

    /// Snapshot of how many providers are `(warming, warm)` right now, derived
    /// from each live provider's lease state without sending a worker RPC:
    /// `Ready` ⇒ warm, `Starting` ⇒ warming, every other state (and providers
    /// with no lease yet) counts as neither.
    pub async fn warm_counts(&self) -> (usize, usize) {
        let mut warming = 0;
        let mut warm = 0;
        for provider in &self.all {
            if let Some(client) = provider.current().await {
                match client.lease().state() {
                    crate::host_contract::LeaseState::Ready => warm += 1,
                    crate::host_contract::LeaseState::Starting => warming += 1,
                    _ => {}
                }
            }
        }
        (warming, warm)
    }

    /// Stop every provider in the pool, freeing each worker's VRAM via its
    /// lease release. Best-effort: a failure on one provider never skips the
    /// rest — all are attempted and the first error is returned afterward.
    pub async fn stop_all(&self) -> Result<()> {
        let mut first_err: Option<EmotionTtsError> = None;
        for provider in &self.all {
            if let Err(err) = provider.stop().await {
                tracing::warn!(
                    target: "emotion_tts::dispatch",
                    error = %err,
                    "pool stop_all: provider stop failed (continuing)"
                );
                first_err.get_or_insert(err);
            }
        }
        match first_err {
            Some(err) => Err(err),
            None => Ok(()),
        }
    }

    /// Borrow a distinct provider for the duration of one run. Blocks only if
    /// every provider is already lent out — which never happens while the
    /// queue's `max_in_flight` cap stays ≤ the pool size. The provider returns
    /// to the pool when the returned guard drops.
    pub async fn acquire(&self) -> PooledProvider {
        let permit = self
            .sem
            .clone()
            .acquire_owned()
            .await
            .expect("pool semaphore never closed");
        let provider = self
            .available
            .lock()
            .expect("pool mutex poisoned")
            .pop()
            .unwrap_or_else(|| self.primary.clone());
        PooledProvider {
            provider: Some(provider),
            available: self.available.clone(),
            _permit: permit,
        }
    }
}

/// RAII guard returning a borrowed provider to the pool on drop.
pub struct PooledProvider {
    provider: Option<Arc<LeaseProvider>>,
    available: Arc<StdMutex<Vec<Arc<LeaseProvider>>>>,
    _permit: OwnedSemaphorePermit,
}

impl PooledProvider {
    /// Clone the borrowed provider handle (the guard still owns the slot).
    #[must_use]
    pub fn provider(&self) -> Arc<LeaseProvider> {
        self.provider
            .clone()
            .expect("pooled provider taken before drop")
    }
}

impl Drop for PooledProvider {
    fn drop(&mut self) {
        if let Some(p) = self.provider.take() {
            if let Ok(mut avail) = self.available.lock() {
                avail.push(p);
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::atomic::{AtomicUsize, Ordering};

    use async_trait::async_trait;

    use super::*;
    use crate::domain::{Result, RuntimeLeaseId};
    use crate::host_contract::{
        BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    };

    /// Lease that records each `release()` against a shared counter and
    /// always reports `Ready`, so the provider's reuse path treats it as live.
    struct CountingLease {
        id: RuntimeLeaseId,
        released: Arc<AtomicUsize>,
    }

    #[async_trait]
    impl BackendRuntimeLease for CountingLease {
        fn id(&self) -> RuntimeLeaseId {
            self.id.clone()
        }
        fn state(&self) -> LeaseState {
            LeaseState::Ready
        }
        async fn send_rpc(
            &self,
            _method: &str,
            _params: serde_json::Value,
        ) -> std::result::Result<serde_json::Value, LeaseError> {
            Ok(serde_json::Value::Null)
        }
        async fn subscribe_notifications(&self) -> NotificationStream {
            use futures::stream::StreamExt;
            futures::stream::iter(Vec::<NotificationEnvelope>::new()).boxed()
        }
        async fn release(&self) -> std::result::Result<(), LeaseError> {
            self.released.fetch_add(1, Ordering::SeqCst);
            Ok(())
        }
    }

    /// Factory minting a distinct `CountingLease` per acquire, all sharing one
    /// `released` counter so the test can assert how many were stopped.
    struct CountingLeaseFactory {
        released: Arc<AtomicUsize>,
    }

    #[async_trait]
    impl LeaseFactory for CountingLeaseFactory {
        async fn acquire(&self) -> Result<crate::host_contract::SharedLease> {
            Ok(Arc::new(CountingLease {
                id: RuntimeLeaseId::new(),
                released: self.released.clone(),
            }))
        }
    }

    #[tokio::test]
    async fn stop_all_releases_every_live_provider_not_just_primary() {
        let released = Arc::new(AtomicUsize::new(0));
        let factory = Arc::new(CountingLeaseFactory {
            released: released.clone(),
        });
        let primary = Arc::new(LeaseProvider::new(factory.clone()));
        let pool = LeaseProviderPool::with_ceiling(factory, primary, 3);
        assert_eq!(pool.size(), 3);

        for provider in pool.providers() {
            provider
                .spawn_if_needed()
                .await
                .expect("force provider live");
        }

        pool.stop_all().await.expect("stop_all");

        assert_eq!(
            released.load(Ordering::SeqCst),
            3,
            "stop_all must drain ALL providers, not just the primary"
        );
    }

    #[tokio::test]
    async fn warm_counts_reflects_ready_providers() {
        let released = Arc::new(AtomicUsize::new(0));
        let factory = Arc::new(CountingLeaseFactory {
            released: released.clone(),
        });
        let primary = Arc::new(LeaseProvider::new(factory.clone()));
        let pool = LeaseProviderPool::with_ceiling(factory, primary, 3);

        assert_eq!(pool.warm_counts().await, (0, 0), "cold pool: nothing warm");

        pool.providers()[0]
            .spawn_if_needed()
            .await
            .expect("warm one");
        assert_eq!(
            pool.warm_counts().await,
            (0, 1),
            "one Ready provider ⇒ warm=1"
        );

        for provider in pool.providers() {
            provider.spawn_if_needed().await.expect("warm all");
        }
        assert_eq!(pool.warm_counts().await, (0, 3), "all Ready ⇒ warm=3");
    }
}
