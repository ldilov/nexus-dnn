use std::path::{Path, PathBuf};
use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::{BoxStream, StreamExt};
use serde_json::Value as JsonValue;
use tokio_stream::wrappers::BroadcastStream;

use crate::backend_client::LeaseFactory as ExtLeaseFactory;
use crate::domain::{Result as ExtResult, Svi2Error};
use crate::host_contract::{
    BackendRuntimeLease as ExtLease, LeaseError as ExtLeaseError, LeaseState as ExtLeaseState,
    ModelArtifactLocator, NotificationEnvelope, NotificationStream, SharedLease,
};

use nexus_backend_runtimes::generic::enums::LeaseState as HostLeaseState;
use nexus_backend_runtimes::generic::ids::RuntimeLeaseId as HostLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::error::LeaseError as HostLeaseError;
use nexus_backend_runtimes::generic::leases::stdio_lease::StdioLease;
use nexus_backend_runtimes::generic::leases::BackendRuntimeLease as HostLease;

const HANDSHAKE_TIMEOUT_SECS: u64 = 120;

/// Spawns the svi2 video worker over stdio. The render profile (`fake`
/// for CI/offline, `rtx50-fp8` for GPU) is selected by the
/// `NEXUS_VIDEO_SVI2_RUNTIME` env the worker reads at startup.
pub struct Svi2LeaseFactory {
    extension_dir: PathBuf,
    extension_data_dir: PathBuf,
    profile: String,
    models_dir: Option<PathBuf>,
    model_locator: Option<Arc<dyn ModelArtifactLocator>>,
}

/// Model-store families the worker's `_ARTIFACT_FILENAMES` layout draws
/// from. Each family's blob dir already mirrors the relative paths the
/// worker resolves, so a per-file hardlink merge reproduces the layout.
const MODEL_FAMILIES: &[&str] = &[
    "huggingface:Kijai/WanVideo_comfy_fp8_scaled",
    "huggingface:epfl-vita/svi-model",
    "huggingface:Kijai/WanVideo_comfy",
    "huggingface:Wan-AI/Wan2.1-T2V-1.3B",
    "huggingface:QuantStack/Qwen-Image-Edit-2509-GGUF",
    "huggingface:Comfy-Org/Qwen-Image_ComfyUI",
    "huggingface:unsloth/Qwen2.5-VL-7B-Instruct-GGUF",
    "huggingface:AlexWortega/RIFE",
];

impl Svi2LeaseFactory {
    #[must_use]
    pub fn new(
        extension_dir: PathBuf,
        extension_data_dir: PathBuf,
        profile: impl Into<String>,
        models_dir: Option<PathBuf>,
    ) -> Self {
        Self {
            extension_dir,
            extension_data_dir,
            profile: profile.into(),
            models_dir,
            model_locator: None,
        }
    }

    #[must_use]
    pub fn with_model_locator(mut self, locator: Option<Arc<dyn ModelArtifactLocator>>) -> Self {
        self.model_locator = locator;
        self
    }

    /// Assemble `<extension_data_dir>/models` by hardlinking (copy fallback)
    /// every file from each installed family's blob dir, preserving relative
    /// paths. Idempotent — existing destination files are kept.
    async fn ensure_models_dir(&self) -> Option<PathBuf> {
        if let Some(explicit) = &self.models_dir {
            return Some(explicit.clone());
        }
        let locator = self.model_locator.as_ref()?;
        let merged = self.extension_data_dir.join("models");
        if let Err(e) = std::fs::create_dir_all(&merged) {
            tracing::warn!(target: "svi2_lease::models", error = %e, "models dir create failed");
            return None;
        }
        for family in MODEL_FAMILIES {
            match locator.locate_family(family).await {
                Some(root) => {
                    let (linked, failed) = merge_tree(&root, &merged);
                    tracing::info!(
                        target: "svi2_lease::models",
                        family,
                        root = %root.display(),
                        linked,
                        failed,
                        "merged model family into worker models dir"
                    );
                }
                None => {
                    tracing::warn!(
                        target: "svi2_lease::models",
                        family,
                        "model family not installed — worker may fail on its artifacts"
                    );
                }
            }
        }
        Some(merged)
    }
}

/// Recursively link `src` into `dst`, returning `(linked, failed)` counts.
/// Hardlink first (same volume, zero copy); fall back to a byte copy.
fn merge_tree(src: &Path, dst: &Path) -> (u64, u64) {
    let mut linked = 0u64;
    let mut failed = 0u64;
    let mut stack = vec![src.to_path_buf()];
    while let Some(dir) = stack.pop() {
        let entries = match std::fs::read_dir(&dir) {
            Ok(entries) => entries,
            Err(_) => {
                failed += 1;
                continue;
            }
        };
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                stack.push(path);
                continue;
            }
            let Ok(rel) = path.strip_prefix(src) else {
                failed += 1;
                continue;
            };
            let target = dst.join(rel);
            if target.exists() {
                continue;
            }
            if let Some(parent) = target.parent() {
                let _ = std::fs::create_dir_all(parent);
            }
            let ok = std::fs::hard_link(&path, &target).is_ok()
                || std::fs::copy(&path, &target).is_ok();
            if ok {
                linked += 1;
            } else {
                failed += 1;
                tracing::warn!(
                    target: "svi2_lease::models",
                    src = %path.display(),
                    dst = %target.display(),
                    "failed to link model file"
                );
            }
        }
    }
    (linked, failed)
}

#[async_trait]
impl ExtLeaseFactory for Svi2LeaseFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        let models_dir = self.ensure_models_dir().await;
        let launch = build_launch_spec(
            &self.extension_dir,
            &self.extension_data_dir,
            &self.profile,
            models_dir.as_deref(),
        )
        .map_err(|e| Svi2Error::RuntimeUnavailable(format!("worker spawn setup failed: {e}")))?;

        let lease_id = HostLeaseId::new();
        let inner = StdioLease::spawn(launch, lease_id)
            .await
            .map_err(|e| Svi2Error::RuntimeUnavailable(format!("worker spawn failed: {e}")))?;

        let timeout = std::time::Duration::from_secs(HANDSHAKE_TIMEOUT_SECS);
        match inner
            .send_rpc_with_timeout("handshake", serde_json::json!({}), timeout)
            .await
        {
            Ok(_) => inner.set_state(HostLeaseState::Ready),
            Err(e) => {
                let _ = inner.release().await;
                return Err(Svi2Error::RuntimeUnavailable(format!(
                    "worker handshake failed: {}",
                    format_lease_error(&e)
                )));
            }
        }

        Ok(Arc::new(Svi2LeaseAdapter::new(inner)) as SharedLease)
    }
}

fn format_lease_error(e: &HostLeaseError) -> String {
    match e {
        HostLeaseError::Rpc {
            code,
            message,
            data,
        } => {
            let detail = data
                .as_ref()
                .and_then(|d| d.get("detail"))
                .and_then(|v| v.as_str());
            match detail {
                Some(d) if !d.is_empty() => format!("rpc error code={code}: {message}: {d}"),
                _ => format!("rpc error code={code}: {message}"),
            }
        }
        other => other.to_string(),
    }
}

struct Svi2LeaseAdapter {
    inner: Arc<StdioLease>,
}

impl Svi2LeaseAdapter {
    fn new(inner: Arc<StdioLease>) -> Self {
        Self { inner }
    }
}

#[async_trait]
impl ExtLease for Svi2LeaseAdapter {
    fn state(&self) -> ExtLeaseState {
        map_state_host_to_ext(self.inner.state())
    }

    async fn send_rpc(&self, method: &str, params: JsonValue) -> Result<JsonValue, ExtLeaseError> {
        self.inner
            .send_rpc(method, params)
            .await
            .map_err(map_error_host_to_ext)
    }

    async fn send_rpc_with_timeout(
        &self,
        method: &str,
        params: JsonValue,
        timeout: std::time::Duration,
    ) -> Result<JsonValue, ExtLeaseError> {
        self.inner
            .send_rpc_with_timeout(method, params, timeout)
            .await
            .map_err(map_error_host_to_ext)
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        let rx = self.inner.subscribe_notifications();
        let stream = BroadcastStream::new(rx).filter_map(|item| async move {
            match item {
                Ok(note) => Some(NotificationEnvelope {
                    method: note.method,
                    params: note.params,
                }),
                Err(err) => {
                    tracing::warn!(
                        target: "svi2_lease::adapter",
                        error = %err,
                        "notification subscriber lagged — frames dropped"
                    );
                    None
                }
            }
        });
        Box::pin(stream) as BoxStream<'static, NotificationEnvelope>
    }

    async fn release(&self) -> Result<(), ExtLeaseError> {
        self.inner.release().await.map_err(map_error_host_to_ext)
    }
}

const MODULE_NAME: &str = "svi2_video_worker";

fn build_launch_spec(
    extension_dir: &Path,
    extension_data_dir: &Path,
    profile: &str,
    models_dir: Option<&Path>,
) -> Result<LaunchSpec, String> {
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
            "venv python missing at {} — reinstall the `pkgs` step",
            venv_python.display()
        ));
    }

    let worker_dir = extension_dir.join("worker");
    if !worker_dir.is_dir() {
        return Err(format!(
            "worker source dir missing at {}",
            worker_dir.display()
        ));
    }

    let mut spec = LaunchSpec::new(venv_python)
        .with_arg("-u")
        .with_arg("-m")
        .with_arg(MODULE_NAME)
        .with_working_dir(worker_dir)
        .with_env("VIRTUAL_ENV", venv_dir.to_string_lossy().to_string())
        .with_env("NEXUS_VIDEO_SVI2_RUNTIME", profile.to_string());

    if let Some(models_dir) = models_dir {
        let dir = models_dir.to_string_lossy().to_string();
        // The worker's resolve_models_dir reads SVI2_MODELS_DIR; the
        // NEXUS_-prefixed name is kept for older worker revisions.
        spec = spec
            .with_env("SVI2_MODELS_DIR", dir.clone())
            .with_env("NEXUS_VIDEO_SVI2_MODELS_DIR", dir);
    }

    if let Ok(existing_path) = std::env::var("PATH") {
        let new_path = if cfg!(windows) {
            format!("{};{}", venv_bin.display(), existing_path)
        } else {
            format!("{}:{}", venv_bin.display(), existing_path)
        };
        spec = spec.with_env("PATH", new_path);
    }

    spec = spec
        .with_env("PYTHONPATH", "")
        .with_env("PYTHONHOME", "")
        .with_env("TQDM_DISABLE", "1")
        .with_env("HF_HUB_DISABLE_PROGRESS_BARS", "1")
        .with_env("HF_HUB_DISABLE_TELEMETRY", "1")
        .with_env("KMP_DUPLICATE_LIB_OK", "TRUE");

    Ok(spec)
}

fn map_state_host_to_ext(s: HostLeaseState) -> ExtLeaseState {
    match s {
        HostLeaseState::Starting => ExtLeaseState::Starting,
        HostLeaseState::Ready => ExtLeaseState::Ready,
        HostLeaseState::Busy => ExtLeaseState::Busy,
        HostLeaseState::Stopping => ExtLeaseState::Stopping,
        HostLeaseState::Failed => ExtLeaseState::Failed,
        HostLeaseState::Released => ExtLeaseState::Released,
        _ => ExtLeaseState::Failed,
    }
}

fn map_error_host_to_ext(e: HostLeaseError) -> ExtLeaseError {
    match e {
        HostLeaseError::Rpc {
            code,
            message,
            data,
        } => {
            let detail = data
                .as_ref()
                .and_then(|d| d.get("detail"))
                .and_then(|v| v.as_str())
                .map(str::to_owned);
            let merged = match detail {
                Some(d) if !d.is_empty() => format!("{message}: {d}"),
                _ => message,
            };
            ExtLeaseError::Rpc {
                code,
                message: merged,
            }
        }
        HostLeaseError::WorkerCrashed => ExtLeaseError::WorkerCrashed,
        // A Failed/Released lease (e.g. after the worker died) surfaces as
        // WorkerCrashed → Svi2Error::RuntimeUnavailable, not an opaque Internal.
        HostLeaseError::RuntimeUnavailable => ExtLeaseError::WorkerCrashed,
        HostLeaseError::Timeout => ExtLeaseError::Timeout,
        HostLeaseError::PayloadTooLarge => ExtLeaseError::Transport("payload too large".into()),
        HostLeaseError::CrashRecovered => ExtLeaseError::WorkerCrashed,
        HostLeaseError::Cancelled => ExtLeaseError::Cancelled,
        HostLeaseError::Internal(msg) => ExtLeaseError::Transport(msg),
    }
}
