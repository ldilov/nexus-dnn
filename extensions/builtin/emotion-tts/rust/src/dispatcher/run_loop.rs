//! Single-run handler — pulled out so it can be tested independently
//! and so the outer loop can panic-isolate each iteration.

use std::sync::Arc;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::{RunChannelRegistry, RunEvent};
use crate::queue::QueuedRun;
use crate::storage::Repos;

#[allow(clippy::too_many_arguments)]
pub(crate) async fn process_one(
    qrun: QueuedRun,
    _repos: Repos,
    _lease_provider: Arc<LeaseProvider>,
    registry: Arc<RunChannelRegistry>,
    extension_version: String,
) {
    let _ = extension_version;
    let run_id_str = qrun.run_id.as_str().to_string();
    let (tx, _guard) = registry.register(run_id_str.clone()).await;
    // Placeholder: emit a single failed run_terminal so SSE doesn't
    // hang. Replaced in Task 7+ with real dispatch.
    let _ = tx.send(RunEvent::RunTerminal {
        run_id: run_id_str,
        status: "failed".to_string(),
    });
}
