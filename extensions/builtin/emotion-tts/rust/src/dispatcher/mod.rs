//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;
pub(crate) mod export;
pub mod pool;
pub(crate) mod prepare;
pub(crate) mod run_loop;

pub use channels::{RegistrationGuard, RunChannelRegistry, RunEventReceiver, RunEventSender};
pub use events::RunEvent;
pub use pool::{LeaseProviderPool, PooledProvider};

use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use tokio::task::JoinHandle;

use crate::backend_client::LeaseProvider;
use crate::host_contract::HostArtifactStore;
use crate::queue::SharedQueue;
use crate::storage::Repos;

/// Hard upper bound on worker count regardless of `EMOTIONTTS_MAX_WORKERS`,
/// so a typo can't try to spawn hundreds of model copies.
pub const WORKER_CEILING_HARD_MAX: usize = 8;

/// The worker ceiling: how many concurrent TTS workers (each a full resident
/// model, ~N× VRAM) the runtime may host. Read from `EMOTIONTTS_MAX_WORKERS`
/// (default 4 — the UI offers 1..ceiling) and clamped to
/// `[1, WORKER_CEILING_HARD_MAX]`. This sizes the `LeaseProviderPool` with lazy
/// providers (no VRAM until used); how many actually run at once is set
/// per-start by the worker-count control (clamped to this ceiling), defaulting
/// to 1 so behaviour at rest is unchanged.
#[must_use]
pub fn worker_ceiling() -> usize {
    std::env::var("EMOTIONTTS_MAX_WORKERS")
        .ok()
        .and_then(|s| s.trim().parse::<usize>().ok())
        .unwrap_or(4)
        .clamp(1, WORKER_CEILING_HARD_MAX)
}

/// Spawn a background task that releases idle leases after
/// `EMOTIONTTS_LEASE_IDLE_SECS` seconds of inactivity (default 600).
///
/// The watcher ticks every 30 s and stops any pool provider whose
/// [`LeaseProvider::idle_for`] reports elapsed time ≥ the configured budget.
/// Releasing frees a worker's VRAM while the user is away; the next
/// `spawn_if_needed` call re-acquires at the cost of a cold-boot.
pub fn spawn_idle_watcher_pooled(pool: Arc<LeaseProviderPool>) -> JoinHandle<()> {
    let idle_secs: u64 = std::env::var("EMOTIONTTS_LEASE_IDLE_SECS")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(600);
    let idle = Duration::from_secs(idle_secs);
    tokio::spawn(async move {
        let mut tick = tokio::time::interval(Duration::from_secs(30));
        loop {
            tick.tick().await;
            for provider in pool.providers() {
                if let Some(elapsed) = provider.idle_for().await {
                    if elapsed >= idle {
                        if let Err(err) = provider.stop().await {
                            tracing::warn!(
                                target: "emotion_tts::dispatch",
                                error = %err,
                                "lease idle release failed"
                            );
                        } else {
                            tracing::info!(
                                target: "emotion_tts::dispatch",
                                idle_secs = elapsed.as_secs(),
                                "released idle lease"
                            );
                        }
                    }
                }
            }
        }
    })
}

/// Single-provider idle watcher — preserves the original signature for callers
/// that hold a bare `LeaseProvider`.
pub fn spawn_idle_watcher(lease_provider: Arc<LeaseProvider>) -> JoinHandle<()> {
    spawn_idle_watcher_pooled(Arc::new(LeaseProviderPool::single(lease_provider)))
}

/// Spawn the dispatcher over a single provider (serial). Kept for the e2e
/// tests and any caller without a pool; delegates to [`spawn_dispatcher_pooled`].
pub fn spawn_dispatcher(
    queue: SharedQueue,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    extension_version: impl Into<String>,
    output_root_base: PathBuf,
) -> JoinHandle<()> {
    spawn_dispatcher_pooled(
        queue,
        repos,
        Arc::new(LeaseProviderPool::single(lease_provider)),
        registry,
        artifact_store,
        extension_version,
        output_root_base,
    )
}

/// Spawn the dispatcher background task over a [`LeaseProviderPool`].
///
/// Concurrency is governed by the queue's `max_in_flight` cap: `pop_next`
/// yields at most that many runs at once, each handed a distinct pool provider.
/// When the cap is 1 (the default), this behaves exactly like the historical
/// serial dispatcher.
///
/// Returns the `JoinHandle` so the caller can `.abort()` it on shutdown (the
/// host has no shutdown hook today, so the handle is currently dropped — the
/// task lives for the process lifetime).
pub fn spawn_dispatcher_pooled(
    queue: SharedQueue,
    repos: Repos,
    pool: Arc<LeaseProviderPool>,
    registry: Arc<RunChannelRegistry>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    extension_version: impl Into<String>,
    output_root_base: PathBuf,
) -> JoinHandle<()> {
    let extension_version = extension_version.into();
    tokio::spawn(async move {
        loop {
            let Some(qrun) = queue.pop_next().await else {
                // `pop_next` returns `None` when nothing is runnable right now
                // (queue empty, or every slot busy). The 50ms sleep is the
                // latency floor between enqueue/free-slot and dispatch.
                tokio::time::sleep(Duration::from_millis(50)).await;
                continue;
            };
            let run_id = qrun.run_id.clone();
            // Borrow a worker for this run. Never blocks while the queue cap
            // stays ≤ the pool size, but awaited for safety.
            let pooled = pool.acquire().await;
            let provider = pooled.provider();
            let repos_c = repos.clone();
            let registry_c = registry.clone();
            let store_c = artifact_store.clone();
            let version_c = extension_version.clone();
            let base_c = output_root_base.clone();
            let queue_c = queue.clone();
            // Run concurrently: do NOT await here, so the loop pops the next
            // run (up to the cap) immediately. The pool guard `pooled` rides
            // with the task and returns the worker on completion.
            tokio::spawn(async move {
                let _guard = pooled;
                // Inner spawn panic-isolates `process_one` so a panic neither
                // kills the dispatcher nor leaks the in-flight slot.
                let inner = tokio::spawn(async move {
                    run_loop::process_one(
                        qrun, repos_c, provider, registry_c, store_c, version_c, base_c,
                    )
                    .await;
                });
                if let Err(err) = inner.await {
                    tracing::error!(
                        target: "emotion_tts::dispatch",
                        run_id = run_id.as_str(),
                        error = %err,
                        "dispatcher task panicked"
                    );
                }
                queue_c.complete_in_flight(&run_id).await;
            });
        }
    })
}
