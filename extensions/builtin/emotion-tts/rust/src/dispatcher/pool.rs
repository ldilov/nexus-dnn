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

use std::sync::Arc;
use std::sync::Mutex as StdMutex;

use tokio::sync::{OwnedSemaphorePermit, Semaphore};

use crate::backend_client::{LeaseFactory, LeaseProvider};

pub struct LeaseProviderPool {
    primary: Arc<LeaseProvider>,
    all: Vec<Arc<LeaseProvider>>,
    available: Arc<StdMutex<Vec<Arc<LeaseProvider>>>>,
    sem: Arc<Semaphore>,
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
        }
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
