//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;
pub(crate) mod run_loop;

pub use channels::{RegistrationGuard, RunChannelRegistry, RunEventReceiver, RunEventSender};
pub use events::RunEvent;

use std::sync::Arc;

use tokio::task::JoinHandle;

use crate::backend_client::LeaseProvider;
use crate::queue::SharedQueue;
use crate::storage::Repos;

/// Spawn the dispatcher background task. Returns the `JoinHandle` so the
/// caller can `.abort()` it on shutdown (host has no shutdown hook today,
/// so the handle is currently dropped — the task lives for the process
/// lifetime).
pub fn spawn_dispatcher(
    queue: SharedQueue,
    repos: Repos,
    lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
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
            let version_c = extension_version.clone();
            // Isolate each run in its own task so a panic does not kill
            // the dispatcher.
            let join = tokio::spawn(async move {
                run_loop::process_one(qrun, repos_c, lease_c, registry_c, version_c).await;
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
