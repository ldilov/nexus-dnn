//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;
pub(crate) mod export;
pub(crate) mod prepare;
pub(crate) mod run_loop;

pub use channels::{RegistrationGuard, RunChannelRegistry, RunEventReceiver, RunEventSender};
pub use events::RunEvent;

use std::sync::Arc;

use tokio::task::JoinHandle;

use crate::backend_client::LeaseProvider;
use crate::host_contract::HostArtifactStore;
use crate::queue::SharedQueue;
use crate::storage::Repos;

/// Spawn a background task that releases the lease after
/// `EMOTIONTTS_LEASE_IDLE_SECS` seconds of inactivity (default 600).
///
/// The watcher ticks every 30 s and calls [`LeaseProvider::stop`] once
/// [`LeaseProvider::idle_for`] reports elapsed time ≥ the configured budget.
/// Releasing frees ~5 GB of VRAM while the user is away; the next
/// `spawn_if_needed` call re-acquires at the cost of a cold-boot.
pub fn spawn_idle_watcher(lease_provider: Arc<LeaseProvider>) -> JoinHandle<()> {
    let idle_secs: u64 = std::env::var("EMOTIONTTS_LEASE_IDLE_SECS")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(600);
    let idle = std::time::Duration::from_secs(idle_secs);
    tokio::spawn(async move {
        let mut tick = tokio::time::interval(std::time::Duration::from_secs(30));
        loop {
            tick.tick().await;
            if let Some(elapsed) = lease_provider.idle_for().await {
                if elapsed >= idle {
                    if let Err(err) = lease_provider.stop().await {
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
    })
}

/// Spawn the dispatcher background task. Returns the `JoinHandle` so the
/// caller can `.abort()` it on shutdown (host has no shutdown hook today,
/// so the handle is currently dropped — the task lives for the process
/// lifetime).
pub fn spawn_dispatcher(
    queue: SharedQueue,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    extension_version: impl Into<String>,
) -> JoinHandle<()> {
    let extension_version = extension_version.into();
    tokio::spawn(async move {
        loop {
            let Some(qrun) = queue.pop_next().await else {
                // `RuntimeQueue::pop_next` returns `None` when the queue
                // is empty and nothing is in flight. The 50ms sleep is
                // the latency floor between enqueue and dispatch — a
                // future cleanup can convert pop_next into a blocking
                // call (await the inner Notify directly) to drop the
                // sleep entirely.
                tokio::time::sleep(std::time::Duration::from_millis(50)).await;
                continue;
            };
            let run_id = qrun.run_id.clone();
            let repos_c = repos.clone();
            let lease_c = lease_provider.clone();
            let registry_c = registry.clone();
            let store_c = artifact_store.clone();
            let version_c = extension_version.clone();
            // Isolate each run in its own task so a panic does not kill
            // the dispatcher.
            let join = tokio::spawn(async move {
                run_loop::process_one(qrun, repos_c, lease_c, registry_c, store_c, version_c)
                    .await;
            });
            if let Err(err) = join.await {
                tracing::error!(
                    target: "emotion_tts::dispatch",
                    run_id = run_id.as_str(),
                    error = %err,
                    "dispatcher task panicked"
                );
            }
            queue.complete_in_flight(&run_id).await;
        }
    })
}
