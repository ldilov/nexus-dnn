use camino::Utf8PathBuf;
use sqlx::SqlitePool;
use tokio_util::sync::CancellationToken;

use crate::adapter::InstallRequest;
use crate::events::SharedPublisher;
use crate::manifest::version::VersionManifest;
use crate::resolver::MachineDescriptor;

/// Bag of inputs threaded through the llama.cpp install pipeline. Replaces the
/// previous 9-argument `run_inner` signature.
pub(super) struct InstallCtx<'a> {
    pub manifest: &'a VersionManifest,
    pub machine: &'a MachineDescriptor,
    pub request: InstallRequest,
    pub runtimes_root: &'a Utf8PathBuf,
    pub pool: &'a SqlitePool,
    pub publisher: SharedPublisher,
    pub cancel: CancellationToken,
    pub task_id: &'a str,
}
