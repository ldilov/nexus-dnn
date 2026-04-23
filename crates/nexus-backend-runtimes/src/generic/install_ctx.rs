//! Per-install context passed through the [`install_pipeline`](super::install_pipeline)
//! phases. Owns the staging path, the selected release manifest asset, and
//! the event-publisher / cancellation-token handles.

use std::collections::HashMap;
use std::path::PathBuf;

use tokio_util::sync::CancellationToken;

use crate::events::SharedPublisher;
use crate::generic::ids::{AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId};

/// Context threaded through every pipeline phase. Phases may mutate fields
/// that aren't marked pub(crate) if later phases depend on their output
/// (e.g. the resolved artifact hash post-download).
pub struct InstallCtx {
    pub install_id: RuntimeInstallId,
    pub runtime_id: RuntimeId,
    pub release_id: ReleaseId,
    pub platform: PlatformId,
    pub accelerator_profile: AcceleratorProfile,

    /// Staging path during the pipeline — has the `.partial/` suffix that
    /// is atomic-renamed to [`install_path`] after the final validate phase.
    pub partial_path: PathBuf,
    /// Final install path. Equal to the value persisted on the install row
    /// after the pipeline's concluding rename.
    pub install_path: PathBuf,
    /// Host-owned download cache root; family handlers may pull resolved
    /// assets here so subsequent installs can short-circuit on hit.
    pub download_cache: PathBuf,

    /// Raw version-manifest YAML or JSON. The resolve phase parses this
    /// into a [`super::version_manifest::VersionManifest`] and picks the
    /// matching `(release × platform × accelerator_profile)` target.
    pub release_manifest: serde_json::Value,
    /// Extension root on disk. Used by the resolve phase to convert
    /// relative `file://` URLs in the version manifest into absolute paths.
    pub extension_root: Option<PathBuf>,

    /// Asset selected by the resolve phase (T051). Subsequent phases
    /// (download, verify, extract) read from here.
    pub resolved_asset: Option<super::version_manifest::ResolvedAsset>,
    /// Path to the downloaded archive — set by the download phase, read
    /// by verify + extract.
    pub downloaded_archive: Option<PathBuf>,
    /// Post-download artifact hash, populated by the verify phase.
    pub artifact_hash: Option<String>,
    /// Resolved worker entrypoint, populated by the validate-env phase when
    /// the family handler knows exactly which executable to record.
    pub entrypoint_path: Option<PathBuf>,

    /// Backend-events publisher handle used to emit `PhaseEvent::*`.
    pub event_publisher: SharedPublisher,
    /// Cooperative cancellation token — phases check at boundaries and
    /// bail with `PipelineFailureCategory::Cancelled` when tripped.
    pub cancellation: CancellationToken,
}

/// Subprocess spawn description returned by
/// [`super::family_handler::RuntimeFamilyHandler::spawn_launch_spec`].
/// Immutable; the lease-acquire path builds a `tokio::process::Command`
/// from this.
#[derive(Debug, Clone)]
pub struct LaunchSpec {
    pub program: PathBuf,
    pub args: Vec<String>,
    pub env: HashMap<String, String>,
    pub working_dir: Option<PathBuf>,
}

impl LaunchSpec {
    pub fn new(program: PathBuf) -> Self {
        Self {
            program,
            args: Vec::new(),
            env: HashMap::new(),
            working_dir: None,
        }
    }

    pub fn with_arg(mut self, arg: impl Into<String>) -> Self {
        self.args.push(arg.into());
        self
    }

    pub fn with_env(mut self, key: impl Into<String>, value: impl Into<String>) -> Self {
        self.env.insert(key.into(), value.into());
        self
    }

    pub fn with_working_dir(mut self, dir: PathBuf) -> Self {
        self.working_dir = Some(dir);
        self
    }
}
