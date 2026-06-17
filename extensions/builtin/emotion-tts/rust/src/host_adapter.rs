//! Lives inside the extension crate so the host shell does not grow
//! emotion-tts-specific wiring code. The extension owns its own host-side
//! lease adapter — pulling in `nexus-backend-runtimes` for `StdioLease`
//! (the host's battle-tested JSON-RPC framer + matchmaker + notification
//! fanout) rather than reimplementing them. The extension's contract
//! `host_contract::BackendRuntimeLease` is satisfied by adapting the host
//! lease's surface.
//!
//! Path resolution mirrors the dep installer's convention paths
//! (`<extension_data_dir>/runtime/python/...` + `<extension_data_dir>/runtime/packages/.venv`)
//! so a successful spec-035 install is sufficient — no separate runtime install
//! ceremony required.

use std::path::{Path, PathBuf};
use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::{BoxStream, StreamExt};
use serde_json::Value as JsonValue;
use tokio_stream::wrappers::BroadcastStream;

use crate::backend_client::LeaseFactory as ExtLeaseFactory;
use crate::domain::{EmotionTtsError, Result as ExtResult, RuntimeLeaseId};
use crate::host_contract::{
    ArtifactPut, BackendRuntimeLease as ExtLease, HostArtifactStore as ExtArtifactStore,
    HostContractError, LeaseError as ExtLeaseError, LeaseState as ExtLeaseState,
    ModelArtifactLocator, NotificationEnvelope, NotificationStream, SharedLease,
};

/// Family id the worker's IndexTTS adapter expects. Hard-coded here because
/// EmotionTTS is single-family today; broaden when family.switch lands.
const INDEXTTS_FAMILY_ID: &str = "huggingface:IndexTeam/IndexTTS-2";

use nexus_backend_runtimes::generic::enums::LeaseState as HostLeaseState;
use nexus_backend_runtimes::generic::ids::RuntimeLeaseId as HostLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::error::LeaseError as HostLeaseError;
use nexus_backend_runtimes::generic::leases::stdio_lease::StdioLease;
use nexus_backend_runtimes::generic::leases::BackendRuntimeLease as HostLease;

/// Factory the recipe header's `/runtime/start` endpoint calls into. Each
/// `acquire()` spawns a fresh worker process, runs the JSON-RPC handshake,
/// and returns a long-lived lease that survives until the recipe header
/// hits `/runtime/stop` (or the host process exits).
pub struct EmotionTtsLeaseFactory {
    extension_dir: PathBuf,
    extension_data_dir: PathBuf,
    model_locator: Option<Arc<dyn ModelArtifactLocator>>,
}

impl EmotionTtsLeaseFactory {
    pub fn new(
        extension_dir: PathBuf,
        extension_data_dir: PathBuf,
        model_locator: Option<Arc<dyn ModelArtifactLocator>>,
    ) -> Self {
        Self {
            extension_dir,
            extension_data_dir,
            model_locator,
        }
    }
}

#[async_trait]
impl ExtLeaseFactory for EmotionTtsLeaseFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        // Resolve the IndexTTS-2 model directory BEFORE spawning so the
        // worker's Python entrypoint sees `EMOTIONTTS_MODEL_DIR_ABS` and
        let model_dir = match self.model_locator.as_ref() {
            Some(locator) => locator.locate_family(INDEXTTS_FAMILY_ID).await,
            None => None,
        };
        if model_dir.is_none() {
            return Err(EmotionTtsError::ModelMissing(format!(
                "IndexTTS-2 model artifacts not found for family `{INDEXTTS_FAMILY_ID}`. \
                 Run the dependency installer (Settings → Dependencies → Install all) \
                 to download the model, then retry."
            )));
        }
        let model_dir = model_dir.expect("checked above");

        let launch = build_launch_spec(&self.extension_dir, &self.extension_data_dir, &model_dir)
            .map_err(|e| {
            EmotionTtsError::RuntimeUnavailable(format!("worker spawn setup failed: {e}"))
        })?;

        let lease_id = HostLeaseId::new();
        let inner = StdioLease::spawn(launch, lease_id).await.map_err(|e| {
            EmotionTtsError::RuntimeUnavailable(format!("worker spawn failed: {e}"))
        })?;

        // Custom handshake with a longer budget than the host's default 60s.
        // The EmotionTTS worker pre-imports torch + scipy + sklearn +
        let handshake_timeout = std::time::Duration::from_secs(180);
        tracing::info!(
            target: "emotion_tts_lease",
            timeout_secs = handshake_timeout.as_secs(),
            "waiting for worker handshake (worker is doing pre-imports)…"
        );
        match inner
            .send_rpc_with_timeout("handshake", serde_json::json!({}), handshake_timeout)
            .await
        {
            Ok(_) => {
                tracing::info!(
                    target: "emotion_tts_lease",
                    "handshake response received"
                );
            }
            Err(e) => {
                let _ = inner.release().await;
                return Err(EmotionTtsError::RuntimeUnavailable(format!(
                    "worker handshake failed: {}. The worker spawned but \
                     either crashed during pre-imports or didn't reach its \
                     asyncio loop within 180s — see worker stderr for the \
                     `[warm]` import-progress lines and any traceback.",
                    format_lease_error(&e)
                )));
            }
        }

        // Eager model.load: keep state=Starting until weights are in VRAM.
        // The user explicitly asked "when I start backend I want to load
        tracing::info!(
            target: "emotion_tts_lease",
            timeout_secs = MODEL_LOAD_TIMEOUT.as_secs(),
            "handshake ok; loading model — first-run cold path can take 2-5 minutes"
        );

        // Subscribe to notifications BEFORE issuing the RPC so we capture
        // every `model.load.progress` frame the worker emits. Without this
        let mut notifications = inner.subscribe_notifications();
        let progress_kill = tokio_util::sync::CancellationToken::new();
        let progress_kill_child = progress_kill.clone();
        let progress_task = tokio::spawn(async move {
            loop {
                tokio::select! {
                    _ = progress_kill_child.cancelled() => break,
                    msg = notifications.recv() => match msg {
                        Ok(note) => {
                            if note.method == "model.load.progress" {
                                let stage = note.params.get("stage")
                                    .and_then(|v| v.as_str()).unwrap_or("?");
                                let pct = note.params.get("pct")
                                    .and_then(|v| v.as_f64()).unwrap_or(0.0);
                                let detail = note.params.get("detail")
                                    .and_then(|v| v.as_str());
                                tracing::info!(
                                    target: "emotion_tts_lease::load_progress",
                                    stage,
                                    pct = format!("{:.1}%", pct * 100.0),
                                    detail = detail.unwrap_or(""),
                                    "model.load.progress"
                                );
                            } else {
                                tracing::debug!(
                                    target: "emotion_tts_lease",
                                    method = %note.method,
                                    "worker notification"
                                );
                            }
                        }
                        Err(tokio::sync::broadcast::error::RecvError::Lagged(n)) => {
                            tracing::warn!(
                                target: "emotion_tts_lease",
                                dropped_frames = n,
                                "notification subscriber lagged"
                            );
                        }
                        Err(tokio::sync::broadcast::error::RecvError::Closed) => break,
                    }
                }
            }
        });

        let load_start = std::time::Instant::now();
        let outcome = inner
            .send_rpc_with_timeout("model.load", serde_json::json!({}), MODEL_LOAD_TIMEOUT)
            .await;
        progress_kill.cancel();
        let _ = progress_task.await;

        match outcome {
            Ok(_) => {
                tracing::info!(
                    target: "emotion_tts_lease",
                    elapsed_ms = load_start.elapsed().as_millis() as u64,
                    "model loaded; transitioning lease Starting → Ready"
                );
                inner.set_state(HostLeaseState::Ready);
            }
            Err(e) => {
                let surfaced = format_lease_error(&e);
                tracing::error!(
                    target: "emotion_tts_lease",
                    error = %surfaced,
                    elapsed_ms = load_start.elapsed().as_millis() as u64,
                    "model.load failed; releasing lease"
                );
                let _ = inner.release().await;
                return Err(EmotionTtsError::RuntimeUnavailable(format!(
                    "model.load failed: {surfaced}. The worker spawned and \
                     handshook successfully but couldn't load IndexTTS-2 \
                     weights — see the worker stderr in the host log for \
                     the full traceback."
                )));
            }
        }

        Ok(Arc::new(EmotionTtsLeaseAdapter::new(inner)) as SharedLease)
    }
}

/// IndexTTS-2 first-run cold path: scipy/sklearn imports (~50s pre-warmed
/// in parallel via the worker's daemon thread) + IndexTTS2 weight load
/// (~60-180s). 600s gives generous headroom for slow disk + first-time HF
/// download of wav2vec2-bert / seamless feature extractors.
const MODEL_LOAD_TIMEOUT: std::time::Duration = std::time::Duration::from_secs(600);

/// Render a host-side `LeaseError` into a user-readable string, including
/// the JSON-RPC `data.detail` field when present. The host's `Display` impl
/// ignores `data` — necessary general-purpose behavior — so we reach into it
/// here to surface the worker's actual diagnostic on `model_load_failed`.
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
                _ => match data {
                    Some(d) => format!("rpc error code={code}: {message} (data: {d})"),
                    None => format!("rpc error code={code}: {message}"),
                },
            }
        }
        other => other.to_string(),
    }
}

/// Wraps the host's `StdioLease` and exposes it through the extension's
/// `BackendRuntimeLease` trait. Pure mapping: every method delegates to the
/// inner lease and translates the host's types to the extension's.
struct EmotionTtsLeaseAdapter {
    inner: Arc<StdioLease>,
    // Extension-side lease id minted at adapter construction. The host's
    // RuntimeLeaseId is a UUID; the extension's is a ULID-shaped newtype
    ext_id: RuntimeLeaseId,
}

impl EmotionTtsLeaseAdapter {
    fn new(inner: Arc<StdioLease>) -> Self {
        Self {
            inner,
            ext_id: RuntimeLeaseId::new(),
        }
    }
}

#[async_trait]
impl ExtLease for EmotionTtsLeaseAdapter {
    fn id(&self) -> RuntimeLeaseId {
        self.ext_id.clone()
    }

    fn state(&self) -> ExtLeaseState {
        map_state_host_to_ext(self.inner.state())
    }

    async fn send_rpc(&self, method: &str, params: JsonValue) -> Result<JsonValue, ExtLeaseError> {
        self.inner
            .send_rpc(method, params)
            .await
            .map_err(map_error_host_to_ext)
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        let rx = self.inner.subscribe_notifications();
        // BroadcastStream surfaces lagged-receiver errors; log + skip per FR-046.
        let stream = BroadcastStream::new(rx).filter_map(|item| async move {
            match item {
                Ok(note) => Some(NotificationEnvelope {
                    method: note.method,
                    params: note.params,
                }),
                Err(err) => {
                    tracing::warn!(
                        target: "emotion_tts_lease::adapter",
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

/// Build the `python -m emotion_tts_worker` launch spec from the extension's
/// dep-installer convention paths.
fn build_launch_spec(
    extension_dir: &Path,
    extension_data_dir: &Path,
    model_dir: &Path,
) -> Result<LaunchSpec, String> {
    let venv_dir = extension_data_dir
        .join("runtime")
        .join("packages")
        .join(".venv");
    if !venv_dir.join("pyvenv.cfg").is_file() {
        return Err(format!(
            "venv not found at {} — run the dependency installer first \
             (Settings → Dependencies → Install all)",
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
            "venv python missing at {} — venv may be corrupt; reinstall the `pkgs` step",
            venv_python.display()
        ));
    }

    let worker_dir = extension_dir.join("worker");
    if !worker_dir.is_dir() {
        return Err(format!(
            "worker source dir missing at {} — extension may be partially extracted",
            worker_dir.display()
        ));
    }

    if !model_dir.is_dir() {
        return Err(format!(
            "model dir {} does not exist or is not a directory — model store \
             reported it as installed but the path is gone; re-run the `models` \
             dep step to recover",
            model_dir.display()
        ));
    }

    // Same module name the dep installer's validation step uses. Hard-coded
    // here rather than re-reading pyproject.toml because the worker's
    let module_name = "emotion_tts_worker";

    let mut spec = LaunchSpec::new(venv_python)
        .with_arg("-u") // unbuffered stdio
        .with_arg("-m")
        .with_arg(module_name)
        .with_working_dir(worker_dir)
        .with_env("VIRTUAL_ENV", venv_dir.to_string_lossy().to_string())
        // Tell the worker entrypoint where IndexTTS-2 weights live. Without
        // this the worker's `__main__.py` skips IndexTtsAdapter construction
        .with_env(
            "EMOTIONTTS_MODEL_DIR_ABS",
            model_dir.to_string_lossy().to_string(),
        );

    // Prepend venv bin to PATH so subprocesses (ffmpeg, etc.) resolve correctly.
    if let Ok(existing_path) = std::env::var("PATH") {
        let new_path = if cfg!(windows) {
            format!("{};{}", venv_bin.display(), existing_path)
        } else {
            format!("{}:{}", venv_bin.display(), existing_path)
        };
        spec = spec.with_env("PATH", new_path);
    }

    // Neutralize ambient PYTHON* so the user's global Python state can't
    // leak into the worker import path. `LaunchSpec` doesn't expose
    spec = spec
        .with_env("PYTHONPATH", "")
        .with_env("PYTHONHOME", "")
        .with_env("PYTHONSTARTUP", "");

    // Short-circuit phone-homes that some upstream IndexTTS-2 transitive
    // deps make at module-import time (notably `modelscope`, which
    spec = spec
        .with_env("MODELSCOPE_DOMAIN", "modelscope.cn")
        .with_env("MODELSCOPE_API_TOKEN", "")
        // Tell modelscope to use the local cache only — bypasses the
        // initial hub-list call. The lib still resolves locally-cached
        .with_env("MODELSCOPE_OFFLINE", "1")
        // Fall-back hint that several HF-style libs honor.
        .with_env("HF_HUB_DISABLE_TELEMETRY", "1")
        // Suppress tqdm + HF progress bars — they write to stdout (or
        // stderr on a tty, but Windows pipe stdio fools the tty check),
        .with_env("TQDM_DISABLE", "1")
        .with_env("HF_HUB_DISABLE_PROGRESS_BARS", "1")
        .with_env("TRANSFORMERS_VERBOSITY", "error")
        // OpenMP duplicate-runtime workaround. PyTorch's MKL + scipy's
        // OpenBLAS each ship their own copy of `libiomp5md.dll` on
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
        // `LeaseState` is `#[non_exhaustive]` on the host side. Any future
        // variant maps to Failed so the recipe header surfaces a clear
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
            // The worker encodes the actual failure cause in `data.detail`
            // (see `ModelLoadFailedError.rpc_error()` in model_loader.py).
            let detail = data
                .as_ref()
                .and_then(|d| d.get("detail"))
                .and_then(|v| v.as_str())
                .map(str::to_owned);
            let merged = match detail {
                Some(d) if !d.is_empty() => format!("{message}: {d}"),
                _ => match data {
                    Some(d) => format!("{message} (data: {d})"),
                    None => message,
                },
            };
            ExtLeaseError::Rpc {
                code,
                message: merged,
            }
        }
        HostLeaseError::WorkerCrashed => ExtLeaseError::WorkerCrashed,
        HostLeaseError::RuntimeUnavailable => {
            ExtLeaseError::Transport("runtime unavailable".into())
        }
        HostLeaseError::Timeout => ExtLeaseError::Timeout,
        HostLeaseError::PayloadTooLarge => ExtLeaseError::Transport("payload too large".into()),
        HostLeaseError::CrashRecovered => ExtLeaseError::WorkerCrashed,
        HostLeaseError::Cancelled => ExtLeaseError::Cancelled,
        HostLeaseError::Internal(msg) => ExtLeaseError::Transport(msg),
    }
}

// ---------------------------------------------------------------------------
// HostArtifactStore adapter: bridges the host's `nexus_artifact::ArtifactStore`

use nexus_artifact::{ArtifactStore as HostArtifactStoreTrait, FilesystemArtifactStore};
use sha2::{Digest, Sha256};

/// Host-side artifact store wrapper. Uses the concrete
/// `FilesystemArtifactStore` rather than `Arc<dyn ArtifactStore>` because
/// the host trait's async-fn methods aren't dyn-compatible (no
/// `#[async_trait]` macro on the trait). If the host adds a second concrete
/// store, generalize via a wrapper enum or add `#[async_trait]` upstream.
pub struct HostArtifactStoreAdapter {
    inner: Arc<FilesystemArtifactStore>,
}

impl HostArtifactStoreAdapter {
    pub fn new(inner: Arc<FilesystemArtifactStore>) -> Self {
        Self { inner }
    }
}

#[async_trait]
impl ExtArtifactStore for HostArtifactStoreAdapter {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        _mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError> {
        // Compute the artifact id from the content hash so identical files
        // dedupe to one blob. Format: lowercase 64-char hex of sha256.
        let mut hasher = Sha256::new();
        hasher.update(&bytes);
        let artifact_id = format!("{:x}", hasher.finalize());
        let size_bytes = bytes.len() as u64;

        // Allocate a temp file under (run_id, node_id, port_name) — the host
        // store treats those as path components; for an out-of-pipeline
        let safe = display_name
            .chars()
            .map(|c| {
                if c.is_ascii_alphanumeric() || c == '-' || c == '_' || c == '.' {
                    c
                } else {
                    '_'
                }
            })
            .collect::<String>();
        let temp_path = self
            .inner
            .allocate_write_target("voice-asset-upload", &safe, &artifact_id)
            .await
            .map_err(|e| HostContractError::Artifact(format!("allocate_write_target: {e}")))?;

        // Write bytes to temp.
        tokio::fs::write(&temp_path, &bytes)
            .await
            .map_err(|e| HostContractError::Artifact(format!("write temp: {e}")))?;

        // Finalize: rename temp → blob. If blob already exists (same hash
        // uploaded earlier), the host returns AlreadyExists; treat that as
        let artifact_ref = match self.inner.finalize(&temp_path, &artifact_id).await {
            Ok(r) => r,
            Err(e) => {
                let msg = format!("{e}");
                if msg.contains("already exists") || msg.contains("AlreadyExists") {
                    let _ = tokio::fs::remove_file(&temp_path).await;
                    let prefix = &artifact_id[..2.min(artifact_id.len())];
                    format!("blobs/{prefix}/{artifact_id}")
                } else {
                    return Err(HostContractError::Artifact(format!("finalize: {e}")));
                }
            }
        };

        Ok(ArtifactPut {
            artifact_ref,
            content_sha256: artifact_id,
            size_bytes,
        })
    }

    async fn resolve_path(&self, artifact_ref: &str) -> Result<String, HostContractError> {
        // Absolute paths are worker run-outputs on disk — serve in place.
        // Relative `blobs/<prefix>/<id>` refs come from `store()`.
        if Path::new(artifact_ref).is_absolute() {
            return Ok(artifact_ref.to_string());
        }
        let id = artifact_ref
            .rsplit('/')
            .next()
            .filter(|s| !s.is_empty())
            .ok_or_else(|| {
                HostContractError::Artifact(format!("malformed artifact_ref: {artifact_ref}"))
            })?;
        let path = self
            .inner
            .blob_path(id)
            .await
            .map_err(|e| HostContractError::Artifact(format!("blob_path({id}): {e}")))?;
        Ok(path.to_string_lossy().to_string())
    }
}

#[cfg(test)]
mod artifact_store_tests {
    use std::sync::Arc;

    use nexus_artifact::{ArtifactStore, FilesystemArtifactStore};

    use super::HostArtifactStoreAdapter;
    use crate::host_contract::HostArtifactStore;

    /// Regression for the download/play 500: run-utterance audio is written by
    /// the worker to an absolute path on disk and stored verbatim as the ref —
    /// `resolve_path` must serve it in place, not strip it to a blob id and miss.
    #[tokio::test]
    async fn resolve_path_passes_absolute_worker_outputs_through() {
        let dir = tempfile::tempdir().expect("tempdir");
        let adapter =
            HostArtifactStoreAdapter::new(Arc::new(FilesystemArtifactStore::new(dir.path().into())));

        let abs = std::env::temp_dir().join("002_2_Bella_001.mp3");
        let abs_str = abs.to_string_lossy().to_string();
        let resolved = adapter
            .resolve_path(&abs_str)
            .await
            .expect("absolute worker outputs resolve to themselves");
        assert_eq!(resolved, abs_str);
    }

    /// `blobs/<prefix>/<id>` refs minted by `store()` still resolve to the
    /// on-disk blob — the absolute-path branch must not regress that path.
    #[tokio::test]
    async fn resolve_path_resolves_store_blob_refs() {
        let dir = tempfile::tempdir().expect("tempdir");
        let store = Arc::new(FilesystemArtifactStore::new(dir.path().into()));
        store.initialize().await.expect("init store");
        let adapter = HostArtifactStoreAdapter::new(store);

        let put = adapter
            .store(b"hello".to_vec(), "voice.wav", Some("audio/wav"))
            .await
            .expect("store bytes");
        assert!(put.artifact_ref.starts_with("blobs/"));

        let resolved = adapter
            .resolve_path(&put.artifact_ref)
            .await
            .expect("blob ref resolves");
        assert!(
            std::path::Path::new(&resolved).is_file(),
            "blob ref resolves to an on-disk file: {resolved}"
        );
    }
}
