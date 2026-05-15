use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Duration;

use async_trait::async_trait;
use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::stdio_lease::StdioLease;
use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;

use crate::errors::{ExtensionError, Result};

/// Abstraction the runner depends on to acquire a fresh lease.
///
/// The production implementation (`LtxLeaseFactory`) spawns a Python
/// worker subprocess; integration tests substitute a `FakeLeaseAcquirer`
/// that hands out broadcast-channel-backed doubles. Returning the
/// trait-object handle (`Arc<dyn BackendRuntimeLease>`) keeps the runner
/// transport-agnostic — future named-pipe or websocket leases plug in
/// without touching the orchestration loop.
#[async_trait]
pub trait LeaseAcquirer: Send + Sync + 'static {
    async fn acquire_lease(&self, profile: &str) -> Result<Arc<dyn BackendRuntimeLease>>;
}

#[async_trait]
impl LeaseAcquirer for LtxLeaseFactory {
    async fn acquire_lease(&self, profile: &str) -> Result<Arc<dyn BackendRuntimeLease>> {
        let lease = self.acquire(profile).await?;
        Ok(lease)
    }
}

const HANDSHAKE_TIMEOUT: Duration = Duration::from_secs(60);

#[derive(Clone)]
pub struct LtxLeaseFactory {
    extension_dir: PathBuf,
    extension_data_dir: PathBuf,
}

impl LtxLeaseFactory {
    #[must_use]
    pub const fn new(extension_dir: PathBuf, extension_data_dir: PathBuf) -> Self {
        Self {
            extension_dir,
            extension_data_dir,
        }
    }

    pub async fn acquire(&self, profile: &str) -> Result<Arc<StdioLease>> {
        let launch = build_launch_spec(&self.extension_dir, &self.extension_data_dir, profile)
            .map_err(ExtensionError::RuntimeUnavailable)?;

        let lease_id = RuntimeLeaseId::new();
        let lease = StdioLease::spawn(launch, lease_id)
            .await
            .map_err(|e| ExtensionError::RuntimeUnavailable(format!("worker spawn failed: {e}")))?;

        // Custom handshake — minimal worker has no slow torch pre-import, so the
        // default 60s budget is generous.
        tokio::time::timeout(
            HANDSHAKE_TIMEOUT,
            lease.send_rpc("handshake", serde_json::Value::Null),
        )
        .await
        .map_err(|_| ExtensionError::RuntimeUnavailable("handshake timeout".into()))?
        .map_err(|e| ExtensionError::RuntimeUnavailable(format!("handshake failed: {e}")))?;

        Ok(lease)
    }
}

fn build_launch_spec(
    extension_dir: &Path,
    extension_data_dir: &Path,
    profile: &str,
) -> std::result::Result<LaunchSpec, String> {
    let venv_dir = extension_data_dir
        .join("runtime")
        .join("packages")
        .join(".venv");
    if !venv_dir.join("pyvenv.cfg").is_file() {
        return Err(format!(
            "venv not found at {} — run the dependency installer first",
            venv_dir.display()
        ));
    }

    let venv_bin = if cfg!(windows) {
        venv_dir.join("Scripts")
    } else {
        venv_dir.join("bin")
    };
    let venv_python = if cfg!(windows) {
        venv_bin.join("python.exe")
    } else {
        venv_bin.join("python")
    };
    if !venv_python.is_file() {
        return Err(format!(
            "venv python missing at {} — venv may be corrupt; reinstall the pkgs step",
            venv_python.display()
        ));
    }

    // Walk up from extension_data_dir to surface the host data root so the
    // worker's diffusers pipeline can resolve <host_data_dir>/models/Lightricks/
    // LTX-2.3-<quant>/ for real profiles. NEXUS_VIDEO_LTX23_MODEL_DIR can
    // override this for tests or future per-profile install plumbing.
    let host_data_root = extension_data_dir
        .parent()
        .and_then(|p| p.parent())
        .unwrap_or(extension_data_dir);

    let mut spec = LaunchSpec::new(venv_python)
        .with_arg("-u")
        .with_arg("-m")
        .with_arg("ltx_video_worker")
        .with_env("NEXUS_VIDEO_LTX23_RUNTIME", profile)
        .with_env(
            "NEXUS_HOST_DATA_DIR",
            host_data_root.to_string_lossy().to_string(),
        )
        .with_env("PYTHONIOENCODING", "utf-8")
        .with_env("PYTHONUNBUFFERED", "1");

    spec.working_dir = Some(extension_dir.to_path_buf());

    let prepend_path = if cfg!(windows) {
        format!("{};", venv_bin.display())
    } else {
        format!("{}:", venv_bin.display())
    };
    if let Ok(existing) = std::env::var("PATH") {
        spec = spec.with_env("PATH", format!("{prepend_path}{existing}"));
    } else {
        spec = spec.with_env("PATH", prepend_path);
    }

    Ok(spec)
}
