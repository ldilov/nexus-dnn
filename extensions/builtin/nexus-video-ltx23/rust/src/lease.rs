use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::stdio_lease::StdioLease;
use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;

use crate::errors::{ExtensionError, Result};

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
        let lease = StdioLease::spawn(launch, lease_id).await.map_err(|e| {
            ExtensionError::RuntimeUnavailable(format!("worker spawn failed: {e}"))
        })?;

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

    let mut spec = LaunchSpec::new(venv_python)
        .with_arg("-u")
        .with_arg("-m")
        .with_arg("ltx_video_worker")
        .with_env("NEXUS_VIDEO_LTX23_RUNTIME", profile)
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
