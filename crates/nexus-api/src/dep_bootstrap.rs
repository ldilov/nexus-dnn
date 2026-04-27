//! Spec 035 — bootstrap wiring for the generic extension dependency installer.
//!
//! Provides the `Arc<...>` services that populate `AppState.dep_*` fields.
//!
//! Real adapters delegate to existing host crates for the **probe** path so an
//! already-installed prerequisite (runtime in `host_runtime_installs`, model
//! artifact in `model_store_installed_artifacts`) flips the dep gate green
//! immediately. The **action** path (running a runtime install pipeline,
//! starting a model download) requires richer context than this trait
//! surfaces (full `InstallCtx` with version manifest selection, full
//! `CreateJobParams` with variant + URL selection) so it returns a
//! categorised error pointing the user at the existing UI surface that owns
//! that orchestration (Backends page, Models Search page).

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use sqlx::SqlitePool;
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::runtime_installs_store;
use nexus_extension_deps::{
    DepError, HandlerRegistry, HandshakeError, ModelDownloadProgress, ModelStoreClient,
    RuntimeBootstrapResult, RuntimeBootstrapper, StepArtifact, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
};
use nexus_huggingface::{HuggingFaceCapability, SearchFilters, SearchReq};
use nexus_models_store::capabilities::CapabilityRegistry;
use nexus_models_store::downloads::{
    CreateJobParams, DownloadOrchestrator, InstallMap, JobStore, JobTargetInput, RequestedKind,
};
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId};
use nexus_models_store::types::{DependencyRole, DownloadState};

/// Build the default registry — registers all five built-in handlers.
pub fn default_dep_handler_registry() -> Arc<HandlerRegistry> {
    Arc::new(HandlerRegistry::default())
}

/// Wrap the crate-level `fetch_artifact` function in the trait-object closure
/// shape required by `StepContext::fetch_artifact`.
pub fn default_fetch_artifact() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

/// Real `RuntimeBootstrapper` — `probe` queries `host_runtime_installs` via
/// `runtime_installs_store::resolve_dependency` so an already-installed
/// runtime flips the gate green. `bootstrap` returns a categorised error
/// directing the user to the Backends page (the full install pipeline needs a
/// version manifest + InstallCtx that the dep installer's flat trait does not
/// surface).
pub struct RealRuntimeBootstrapper {
    pool: SqlitePool,
    python_asset: Option<nexus_backend_runtimes::family_python::PythonAsset>,
}

impl RealRuntimeBootstrapper {
    pub fn new(pool: SqlitePool) -> Self {
        Self::with_python_asset(pool, None)
    }

    /// Build a bootstrapper that knows how to install an embedded Python from
    /// the given asset. Hosts that have no pinned asset (REGISTRY empty + no
    /// `NEXUS_EMBEDDED_PYTHON_*` env override) pass `None`; the python-family
    /// `bootstrap` then falls back to the categorised "go to Backends page"
    /// error so the user gets a meaningful pointer.
    pub fn with_python_asset(
        pool: SqlitePool,
        python_asset: Option<nexus_backend_runtimes::family_python::PythonAsset>,
    ) -> Self {
        Self { pool, python_asset }
    }
}

#[async_trait]
impl RuntimeBootstrapper for RealRuntimeBootstrapper {
    async fn probe(
        &self,
        family: &str,
        version: Option<&str>,
        accelerator_profiles: &[String],
        target_dir: &std::path::Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        // Reject runtime families the host catalog does not recognise — keeps
        // probe results faithful to spec-032's canonical set instead of
        // returning false negatives for typos.
        let Some(canonical_family) = RuntimeFamily::canonical(family) else {
            tracing::debug!(
                target: "spec_035::probe",
                family,
                "probe: unknown runtime family — returning None"
            );
            return Ok(None);
        };

        // FR-033: the disk layout is the source of truth for probe(). Check the
        // filesystem at the dep-installer's per-extension target_dir FIRST so an
        // install completed via bootstrap_python (which doesn't insert into the
        // legacy `host_runtime_installs` table) is correctly recognised as
        // satisfied on the next /dependencies poll. Fall back to the DB query
        // for the legacy "user installed Python via the Backends page" path.
        if let RuntimeFamily::Python = canonical_family {
            let interpreter = nexus_backend_runtimes::family_python::python_exe_in(target_dir);
            // TRACE because this fires on every probe iteration; debug-level
            // tracing is reserved for "filesystem hit/miss" outcomes.
            tracing::trace!(
                target: "spec_035::probe",
                family,
                target_dir = %target_dir.display(),
                interpreter = %interpreter.display(),
                "probe: checking python interpreter on disk"
            );
            if interpreter.is_file() {
                let bytes_placed = tokio::fs::metadata(&interpreter)
                    .await
                    .map(|m| m.len())
                    .unwrap_or(0);
                // DEBUG, not INFO — the runner re-probes satisfied steps in
                // a tight loop while waiting for downstream steps, so an
                // INFO line per probe spams the terminal once any
                // long-running step (`package_set`, `model_artifact`) is
                // active. The first transition None→Satisfied is logged at
                // INFO from the bootstrap path; routine re-probes stay quiet.
                tracing::debug!(
                    target: "spec_035::probe",
                    family,
                    interpreter = %interpreter.display(),
                    bytes_placed,
                    "probe: filesystem hit — runtime satisfied"
                );
                return Ok(Some(RuntimeBootstrapResult {
                    install_dir: target_dir.to_path_buf(),
                    resolved_version:
                        nexus_backend_runtimes::family_python::builtin_assets::python_version()
                            .to_owned(),
                    resolved_profile: accelerator_profiles.iter().find(|p| !p.is_empty()).cloned(),
                    bytes_placed,
                }));
            }
        }

        // Filesystem miss — fall back to the legacy host_runtime_installs row
        // (Backends-page install path).
        let row = runtime_installs_store::resolve_dependency(
            &self.pool,
            family,
            version,
            accelerator_profiles,
        )
        .await
        .map_err(|e| DepError::Backend(format!("resolve_dependency: {e}")))?;

        match &row {
            Some(r) => tracing::info!(
                target: "spec_035::probe",
                family,
                install_root = %r.install_root,
                version = %r.version,
                accelerator = %r.accelerator,
                "probe: DB hit — runtime satisfied via host_runtime_installs"
            ),
            None => tracing::debug!(
                target: "spec_035::probe",
                family,
                version = ?version,
                "probe: filesystem miss + DB miss — runtime not satisfied"
            ),
        }

        Ok(row.map(|r| RuntimeBootstrapResult {
            install_dir: PathBuf::from(r.install_root),
            resolved_version: r.version,
            resolved_profile: Some(r.accelerator),
            // Install row does not track post-extract bytes; report 0 rather
            // than fabricating a value. Probe artifacts are about identity
            // and location, not size accounting.
            bytes_placed: 0,
        }))
    }

    async fn bootstrap(
        &self,
        family: &str,
        version: Option<&str>,
        accelerator_profiles: &[String],
        target_dir: &std::path::Path,
        cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        match RuntimeFamily::canonical(family) {
            Some(RuntimeFamily::Python) => {
                self.bootstrap_python(version, accelerator_profiles, target_dir, cancellation)
                    .await
            }
            _ => Err(DepError::Backend(format!(
                "runtime '{family}' is not installed; install it from the Backends page. \
                 The dep installer probes the host's runtime store but does not run the \
                 full install pipeline for this family yet."
            ))),
        }
    }
}

impl RealRuntimeBootstrapper {
    /// Drive `family_python::bootstrap::run` against `target_dir` using the
    /// pinned `PythonAsset`. The asset is a host-owned input — the dep installer
    /// is delegating to spec-032's family handler, not duplicating its logic.
    /// When no asset is configured (REGISTRY empty + no env override) we fall
    /// through to the categorised "go to Backends page" error so the user gets
    /// a meaningful pointer instead of a silent failure.
    async fn bootstrap_python(
        &self,
        version: Option<&str>,
        accelerator_profiles: &[String],
        target_dir: &std::path::Path,
        cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
        use nexus_backend_runtimes::family_python::{bootstrap as py_bootstrap, python_exe_in};
        use nexus_backend_runtimes::generic::ids::{
            AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
        };
        use nexus_backend_runtimes::generic::install_ctx::InstallCtx;

        let started = std::time::Instant::now();
        tracing::info!(
            target: "spec_035::bootstrap_python",
            target_dir = %target_dir.display(),
            version = ?version,
            accelerator_profiles = ?accelerator_profiles,
            "bootstrap_python: enter"
        );

        let asset = self.python_asset.as_ref().ok_or_else(|| {
            tracing::warn!(
                target: "spec_035::bootstrap_python",
                "no PythonAsset configured — failing with categorised pointer"
            );
            DepError::Backend(
                "embedded python asset not configured on this host (set \
                 NEXUS_EMBEDDED_PYTHON_URL/SHA256/SIZE/KIND or pin a release in \
                 family_python::builtin_assets::REGISTRY); install it from the Backends \
                 page if a different runtime install pipeline is preferred."
                    .to_owned(),
            )
        })?;
        tracing::info!(
            target: "spec_035::bootstrap_python",
            url = %asset.url,
            sha256_prefix = %asset.sha256.chars().take(12).collect::<String>(),
            kind = ?asset.kind,
            extract_dir = %asset.extract_dir.display(),
            "bootstrap_python: asset resolved"
        );

        let interpreter_pre = python_exe_in(target_dir);
        if interpreter_pre.is_file() {
            tracing::info!(
                target: "spec_035::bootstrap_python",
                interpreter = %interpreter_pre.display(),
                "bootstrap_python: interpreter already present pre-call — \
                 family_python::bootstrap::run will short-circuit (this is \
                 expected idempotent behaviour but may mask a prior partial install)"
            );
        }

        tokio::fs::create_dir_all(target_dir).await.map_err(|e| {
            DepError::Backend(format!("create target_dir {}: {e}", target_dir.display()))
        })?;
        let cache = target_dir.join(".cache");
        tokio::fs::create_dir_all(&cache)
            .await
            .map_err(|e| DepError::Backend(format!("create cache dir {}: {e}", cache.display())))?;
        tracing::debug!(
            target: "spec_035::bootstrap_python",
            target_dir = %target_dir.display(),
            cache = %cache.display(),
            "bootstrap_python: dirs ensured"
        );

        let publisher: SharedPublisher = Arc::new(BackendEventBus::new(64));
        let platform = PlatformId::try_from(host_platform_label())
            .map_err(|e| DepError::Backend(format!("host platform unsupported: {e}")))?;
        let accelerator_label = accelerator_profiles
            .iter()
            .find(|p| !p.is_empty())
            .map(|s| s.as_str())
            .unwrap_or("cpu");
        let accelerator = AcceleratorProfile::try_from(accelerator_label)
            .map_err(|e| DepError::Backend(format!("invalid accelerator profile: {e}")))?;

        let mut ctx = InstallCtx {
            install_id: RuntimeInstallId::new(),
            runtime_id: RuntimeId::try_from("nexus.dep.python")
                .map_err(|e| DepError::Backend(format!("synthetic runtime id: {e}")))?,
            release_id: ReleaseId::try_from("dep_installer")
                .map_err(|e| DepError::Backend(format!("synthetic release id: {e}")))?,
            platform,
            accelerator_profile: accelerator,
            partial_path: target_dir.to_path_buf(),
            install_path: target_dir.to_path_buf(),
            download_cache: cache,
            release_manifest: serde_json::Value::Null,
            extension_root: None,
            resolved_asset: None,
            downloaded_archive: None,
            artifact_hash: None,
            entrypoint_path: None,
            event_publisher: publisher,
            cancellation,
            phase_cached: false,
        };

        tracing::info!(
            target: "spec_035::bootstrap_python",
            "bootstrap_python: invoking family_python::bootstrap::run \
             (download + sha256 verify + archive extract)"
        );
        py_bootstrap::run(&mut ctx, Some(asset))
            .await
            .map_err(|e| {
                tracing::error!(
                    target: "spec_035::bootstrap_python",
                    phase = %e.phase,
                    category = %e.category.to_wire(),
                    detail = %e.detail,
                    "bootstrap_python: family_python::run failed"
                );
                DepError::Backend(format!("python bootstrap: {e}"))
            })?;

        let interpreter = python_exe_in(target_dir);
        let exists = interpreter.is_file();
        let bytes_placed = tokio::fs::metadata(&interpreter)
            .await
            .map(|m| m.len())
            .unwrap_or(0);
        tracing::info!(
            target: "spec_035::bootstrap_python",
            interpreter = %interpreter.display(),
            exists,
            bytes_placed,
            elapsed_ms = started.elapsed().as_millis() as u64,
            "bootstrap_python: complete"
        );

        if !exists {
            return Err(DepError::Backend(format!(
                "python bootstrap reported success but interpreter not found at {} \
                 (this means family_python::bootstrap::run short-circuited or the \
                 archive's expected layout doesn't match python_exe_in's lookup)",
                interpreter.display()
            )));
        }

        Ok(RuntimeBootstrapResult {
            install_dir: target_dir.to_path_buf(),
            resolved_version:
                nexus_backend_runtimes::family_python::builtin_assets::python_version().to_owned(),
            resolved_profile: Some(accelerator_label.to_owned()),
            bytes_placed,
        })
    }
}

/// Map cfg-detected host to the spec-032 `PlatformId` wire form.
fn host_platform_label() -> &'static str {
    if cfg!(all(target_os = "windows", target_arch = "x86_64")) {
        "windows-x64"
    } else if cfg!(all(target_os = "linux", target_arch = "x86_64")) {
        "linux-x64"
    } else if cfg!(all(target_os = "linux", target_arch = "aarch64")) {
        "linux-arm64"
    } else if cfg!(all(target_os = "macos", target_arch = "x86_64")) {
        "darwin-x64"
    } else if cfg!(all(target_os = "macos", target_arch = "aarch64")) {
        "darwin-arm64"
    } else {
        "unknown"
    }
}

/// Real `ModelStoreClient` driving the full host model-store pipeline:
/// probe queries `model_store_installed_artifacts`, `start_download`
/// resolves the family via the HuggingFace adapter and enqueues a real
/// download job, and `poll_job` reads back persisted job state. The
/// dep installer drives the entire model-acquisition flow — no detour
/// through the Models Search UI required.
pub struct RealModelStoreClient {
    install_map: InstallMap,
    orchestrator: Arc<DownloadOrchestrator>,
    huggingface: Option<Arc<dyn HuggingFaceCapability>>,
    /// Reserved for accelerator-aware variant selection once spec-025
    /// stamps accelerator profiles onto variant ids. The current
    /// snapshot-download path bypasses normalize_family + capabilities.
    #[allow(dead_code)]
    capability_registry: Option<Arc<CapabilityRegistry>>,
    download_job_store: Option<Arc<JobStore>>,
}

impl RealModelStoreClient {
    pub fn new(
        install_map: InstallMap,
        orchestrator: Arc<DownloadOrchestrator>,
        huggingface: Option<Arc<dyn HuggingFaceCapability>>,
        capability_registry: Option<Arc<CapabilityRegistry>>,
        download_job_store: Option<Arc<JobStore>>,
    ) -> Self {
        Self {
            install_map,
            orchestrator,
            huggingface,
            capability_registry,
            download_job_store,
        }
    }

    fn extract_repo(family_id: &str) -> Option<&str> {
        family_id.split_once(':').map(|(_, r)| r)
    }

    /// Build a snapshot-style file list for `family_id`. Queries HuggingFace
    /// directly and bypasses `normalize_family` because runtime configs
    /// (`config.yaml`, `*.json`) and tokenizer subfolders are essential for
    /// inference but the normalizer drops them as "Unknown" format. The
    /// dep installer needs every file the upstream repo exposes, in the
    /// same layout — the same approach `unified_downloader` takes in
    /// diodiogod/TTS-Audio-Suite.
    async fn snapshot_targets_from_huggingface(
        &self,
        family_id: &str,
    ) -> Result<Vec<JobTargetInput>, DepError> {
        let hf = self.huggingface.as_ref().ok_or_else(|| {
            DepError::Backend(
                "huggingface client not configured — cannot enumerate repo files".into(),
            )
        })?;
        let repo_id = Self::extract_repo(family_id).ok_or_else(|| {
            DepError::invalid_spec(
                "",
                "family_id",
                "expected '<provider>:<repo>' form (e.g. \
                 'huggingface:Owner/Repo')",
            )
        })?;
        let req = SearchReq {
            query: repo_id.to_owned(),
            filters: SearchFilters::default(),
            limit: 10,
            page: 1,
        };
        let page = hf
            .search(req)
            .await
            .map_err(|e| DepError::Backend(format!("huggingface search: {e}")))?;
        let raw = page
            .results
            .iter()
            .find(|r| r.repo_id == repo_id)
            .ok_or_else(|| {
                DepError::Backend(format!("model family not found upstream: {family_id}"))
            })?;

        let targets: Vec<JobTargetInput> = raw
            .files
            .iter()
            .filter(|f| !f.path.is_empty())
            .map(|f| JobTargetInput {
                artifact_id: ArtifactId::from(format!("{family_id}#{}", f.path)),
                filename: f.path.clone(),
                role: DependencyRole::Primary,
                download_url: format!(
                    "https://huggingface.co/{repo_id}/resolve/main/{}",
                    f.path
                ),
                expected_bytes: f.size_bytes,
                sha256: None,
            })
            .collect();

        if targets.is_empty() {
            return Err(DepError::Backend(format!(
                "repo {family_id} reports no downloadable files"
            )));
        }

        Ok(targets)
    }
}

#[async_trait]
impl ModelStoreClient for RealModelStoreClient {
    async fn is_family_installed(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        let family = FamilyId::from(family_id);
        let rows = self
            .install_map
            .list_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;

        // Pick the first row — `list_for_family` orders by `installed_at DESC`,
        // so this is the most recently installed artifact for the family. The
        // accelerator argument is not yet part of the install-map schema; a
        // follow-up can filter rows by `variant_id` once spec-025 stamps the
        // accelerator profile onto the variant id.
        Ok(rows.into_iter().next().map(|row| {
            self.orchestrator
                .sink_root()
                .join(&row.job_id)
                .join(&row.filename)
        }))
    }

    async fn start_download(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<String, DepError> {
        let store = self.download_job_store.as_ref().ok_or_else(|| {
            DepError::Backend("download job store not initialised".into())
        })?;

        // Snapshot-download the entire repo. Multi-file ML families keep
        // configs, tokenizers, and additional weights alongside the
        // primary checkpoint; the normalizer's format-based filter drops
        // unknown-format files (configs, plain text, etc.) and the model
        // fails to load at runtime. Side-step normalize_family entirely
        // for dep-installer-driven installs.
        let targets = self.snapshot_targets_from_huggingface(family_id).await?;

        let source_repo = Self::extract_repo(family_id)
            .map(|r| r.to_owned())
            .unwrap_or_default();
        let params = CreateJobParams::builder(
            FamilyId::from(family_id.to_owned()),
            "huggingface",
            source_repo,
            RequestedKind::Bundle,
        )
        .targets(targets)
        .build();

        let job = match store.create(params).await {
            Ok(job) => job,
            Err(nexus_models_store::downloads::JobStoreError::Duplicate(existing)) => {
                self.orchestrator.enqueue(existing).await;
                return Ok(existing.to_string());
            }
            Err(e) => return Err(DepError::Backend(format!("job_store.create: {e}"))),
        };

        let job_id = job.job_id;
        self.orchestrator.enqueue(job_id).await;
        tracing::info!(
            target: "spec_035::model_store",
            family_id,
            job_id = %job_id,
            "model_store: download job created and enqueued"
        );
        Ok(job_id.to_string())
    }

    async fn poll_job(&self, job_id: &str) -> Result<ModelDownloadProgress, DepError> {
        let store = self.download_job_store.as_ref().ok_or_else(|| {
            DepError::Backend("download job store not initialised".into())
        })?;
        let uuid = uuid::Uuid::parse_str(job_id)
            .map_err(|e| DepError::Backend(format!("invalid job_id '{job_id}': {e}")))?;
        let id = JobId::from_uuid(uuid);

        let Some(job) = store
            .get(&id)
            .await
            .map_err(|e| DepError::Backend(format!("job_store.get: {e}")))?
        else {
            return Ok(ModelDownloadProgress::Failed {
                category: "job_not_found".into(),
                message: format!("download job {job_id} disappeared from the store"),
            });
        };

        let summary_message = job
            .targets
            .first()
            .map(|t| t.filename.clone())
            .unwrap_or_else(|| job.family_id.as_str().to_owned());

        match job.state {
            DownloadState::Queued | DownloadState::Downloading | DownloadState::Paused => {
                Ok(ModelDownloadProgress::InProgress {
                    current_bytes: job.progress_bytes,
                    // total_bytes=0 signals "unknown total" downstream — the UI
                    // renders an indeterminate bar in that case.
                    total_bytes: job.total_bytes.unwrap_or(0),
                    message: summary_message,
                })
            }
            DownloadState::Downloaded => {
                // Per-job sink directory contains the downloaded artifact(s).
                // Downstream steps (validation/worker handshake) and the
                // probe path (`is_family_installed`) expect this layout.
                let path = self
                    .orchestrator
                    .sink_root()
                    .join(job.job_id.to_string());
                Ok(ModelDownloadProgress::Completed {
                    path,
                    bytes_placed: job.progress_bytes,
                })
            }
            DownloadState::Failed => Ok(ModelDownloadProgress::Failed {
                category: "download_failed".into(),
                message: job
                    .error_reason
                    .unwrap_or_else(|| "download failed without diagnostic".into()),
            }),
            DownloadState::AuthRequired => Ok(ModelDownloadProgress::Failed {
                category: "auth_required".into(),
                message: "model repository requires authentication; configure HF token \
                          and retry"
                    .into(),
            }),
            DownloadState::Incompatible => Ok(ModelDownloadProgress::Failed {
                category: "incompatible".into(),
                message: "model artifacts are incompatible with this host's accelerators"
                    .into(),
            }),
            DownloadState::NotDownloaded => Ok(ModelDownloadProgress::InProgress {
                current_bytes: 0,
                total_bytes: job.total_bytes.unwrap_or(0),
                message: "queued".into(),
            }),
            // `DownloadState` is `#[non_exhaustive]`. Treat any future variant
            // as a transient in-progress state to keep the handler safe under
            // upstream evolution; the orchestrator will eventually flip the
            // job to a known terminal state.
            _ => Ok(ModelDownloadProgress::InProgress {
                current_bytes: job.progress_bytes,
                total_bytes: job.total_bytes.unwrap_or(0),
                message: format!("{:?}", job.state),
            }),
        }
    }
}

/// Real `WorkerHandshake` — spawns the extension's Python worker via the
/// embedded interpreter from the upstream `runtime` step, sends a
/// JSON-RPC `handshake` request over stdio NDJSON, and waits for a
/// successful response within the validation step's timeout.
///
/// Conventions (kept extension-id-agnostic):
/// * The worker's package config lives at `<extension_dir>/worker/pyproject.toml`.
/// * `[project.scripts]`'s first entry is `<dist>=<module>:<func>`; the
///   importable package root is the dotted prefix before `:` (i.e. for
///   `emotion-tts-worker = "emotion_tts_worker.main:main"` we run
///   `python -m emotion_tts_worker`). The package must ship a
///   `__main__.py` so `-m` is invokable.
/// * The Python interpreter is found by walking every upstream artifact's
///   `path` and trying `python_exe_in()`. The venv is found by walking
///   for any artifact whose path contains `pyvenv.cfg`. Both are required.
pub struct RealWorkerHandshake;

#[async_trait]
impl WorkerHandshake for RealWorkerHandshake {
    async fn run_handshake(
        &self,
        extension_id: &str,
        extension_dir: &std::path::Path,
        extension_data_dir: &std::path::Path,
        upstream_artifacts: &std::collections::HashMap<String, StepArtifact>,
        timeout: std::time::Duration,
        cancellation: CancellationToken,
    ) -> Result<(), HandshakeError> {
        // Log every upstream artifact's id + path so when the handshake
        // can't find what it needs, the next bug report shows exactly
        // what was on the table at validation time.
        let upstream_summary: Vec<String> = upstream_artifacts
            .iter()
            .map(|(id, art)| {
                format!(
                    "{id}=>{}",
                    art.path.as_ref().map(|p| p.display().to_string()).unwrap_or_else(|| "<no path>".into())
                )
            })
            .collect();
        tracing::info!(
            target: "spec_035::handshake",
            extension_id,
            extension_dir = %extension_dir.display(),
            extension_data_dir = %extension_data_dir.display(),
            upstream_count = upstream_artifacts.len(),
            upstream = ?upstream_summary,
            "handshake: resolving runtime + venv from upstream artifacts"
        );

        // Convention paths the runtime + package_set handlers write to.
        // Used as a fallback when upstream_artifacts is missing the
        // python or venv entry — happens on hosts built before the
        // runner's probe-skip-with-artifact propagation fix landed.
        let runtime_convention = extension_data_dir.join("runtime").join("python");
        let venv_convention = extension_data_dir
            .join("runtime")
            .join("packages")
            .join(".venv");

        // Resolve the BASE interpreter only as a sanity check that the
        // runtime step actually placed Python on disk. The handshake
        // invokes Python through the venv's own python (set further
        // below) so the editable `emotion_tts_worker` package — and
        // every other dep uv installed into the venv — is on
        // sys.path. Spawning the base interpreter directly would
        // produce `No module named emotion_tts_worker` because the
        // base interpreter doesn't see venv site-packages.
        let _base_python = match find_python_interpreter(upstream_artifacts) {
            Some(p) => p,
            None => {
                let candidate =
                    nexus_backend_runtimes::family_python::python_exe_in(&runtime_convention);
                if candidate.is_file() {
                    tracing::warn!(
                        target: "spec_035::handshake",
                        extension_id,
                        candidate = %candidate.display(),
                        "handshake: upstream artifacts missing python — falling back to convention path \
                         (rebuild + restart host to pick up the runner's probe-skip-with-artifact fix)"
                    );
                    candidate
                } else {
                    return Err(HandshakeError {
                        category: "interpreter_not_found".into(),
                        message: format!(
                            "no upstream artifact contains a Python interpreter and the convention \
                             fallback {} does not exist; upstream artifacts: {upstream_summary:?}",
                            candidate.display()
                        ),
                    });
                }
            }
        };
        let venv_dir = match find_venv_root(upstream_artifacts) {
            Some(p) => p,
            None => {
                if venv_convention.join("pyvenv.cfg").is_file() {
                    tracing::warn!(
                        target: "spec_035::handshake",
                        extension_id,
                        candidate = %venv_convention.display(),
                        "handshake: upstream artifacts missing venv — falling back to convention path"
                    );
                    venv_convention
                } else {
                    return Err(HandshakeError {
                        category: "venv_not_found".into(),
                        message: format!(
                            "no upstream artifact contains a `pyvenv.cfg` and the convention \
                             fallback {} does not exist; upstream artifacts: {upstream_summary:?}",
                            venv_convention.display()
                        ),
                    });
                }
            }
        };
        let worker_dir = extension_dir.join("worker");
        let pyproject_path = worker_dir.join("pyproject.toml");
        let module_name = match read_worker_module_from_pyproject(&pyproject_path) {
            Ok(m) => m,
            Err(err) => {
                return Err(HandshakeError {
                    category: "manifest_unreadable".into(),
                    message: format!(
                        "could not derive worker module from {}: {err}",
                        pyproject_path.display()
                    ),
                });
            }
        };

        // Resolve the venv's bin/Scripts dir + the venv-owned python.
        // uv-managed venvs always ship a Scripts/python.exe (windows) or
        // bin/python (unix) launcher that's pre-configured to use the
        // venv's site-packages. Spawning this is the *only* way to make
        // the editable `<package>` install (and every transitive dep)
        // visible to `python -m`. Falling back to the base interpreter
        // would produce `No module named <package>`.
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
            return Err(HandshakeError {
                category: "venv_python_missing".into(),
                message: format!(
                    "expected venv python at {} but the file does not exist; \
                     venv may be corrupt — re-run the package_set step",
                    venv_python.display()
                ),
            });
        }

        tracing::info!(
            target: "spec_035::handshake",
            extension_id,
            venv_python = %venv_python.display(),
            venv_dir = %venv_dir.display(),
            module_name,
            timeout_secs = timeout.as_secs(),
            "handshake: spawning worker"
        );

        let mut cmd = tokio::process::Command::new(&venv_python);
        cmd.arg("-u") // unbuffered stdio so handshake response arrives promptly
            .arg("-m")
            .arg(&module_name)
            .current_dir(&worker_dir)
            .env("VIRTUAL_ENV", &venv_dir)
            // Strip ambient PYTHON* env so the user's global Python state
            // can't leak into the spawned worker.
            .env_remove("PYTHONHOME")
            .env_remove("PYTHONPATH")
            .env_remove("PYTHONSTARTUP")
            .stdin(std::process::Stdio::piped())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped());

        // Prepend venv bin to PATH so spawned subprocesses (ffmpeg, etc.)
        // resolve to the right binaries.
        if let Ok(existing_path) = std::env::var("PATH") {
            let new_path = if cfg!(windows) {
                format!("{};{}", venv_bin.display(), existing_path)
            } else {
                format!("{}:{}", venv_bin.display(), existing_path)
            };
            cmd.env("PATH", new_path);
        }

        let mut child = cmd.spawn().map_err(|err| HandshakeError {
            category: "worker_spawn_failed".into(),
            message: format!("failed to spawn '{}' -m {module_name}: {err}", venv_python.display()),
        })?;

        let mut stdin = child.stdin.take().expect("stdin piped");
        let stdout = child.stdout.take().expect("stdout piped");
        let stderr = child.stderr.take().expect("stderr piped");

        // Run the handshake under both the configured timeout and the
        // shared cancellation token. On either, kill the child cleanly.
        let outcome = tokio::select! {
            biased;
            _ = cancellation.cancelled() => {
                let _ = child.kill().await;
                return Err(HandshakeError {
                    category: "cancelled".into(),
                    message: "handshake cancelled by client".into(),
                });
            }
            res = tokio::time::timeout(
                timeout,
                run_handshake_protocol(&mut stdin, stdout, stderr),
            ) => res,
        };

        match outcome {
            Ok(Ok(())) => {
                // Send shutdown so the worker exits cleanly. Best-effort —
                // if the pipe is broken we just kill below.
                use tokio::io::AsyncWriteExt;
                let _ = stdin
                    .write_all(b"{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"shutdown\",\"params\":null}\n")
                    .await;
                drop(stdin);
                let _ = tokio::time::timeout(
                    std::time::Duration::from_secs(2),
                    child.wait(),
                )
                .await;
                let _ = child.kill().await;
                tracing::info!(
                    target: "spec_035::handshake",
                    extension_id,
                    "handshake: success"
                );
                Ok(())
            }
            Ok(Err(err)) => {
                let _ = child.kill().await;
                Err(err)
            }
            Err(_elapsed) => {
                let _ = child.kill().await;
                Err(HandshakeError {
                    category: "handshake_timeout".into(),
                    message: format!(
                        "worker handshake did not complete within {}s",
                        timeout.as_secs()
                    ),
                })
            }
        }
    }
}

async fn run_handshake_protocol(
    stdin: &mut tokio::process::ChildStdin,
    stdout: tokio::process::ChildStdout,
    stderr: tokio::process::ChildStderr,
) -> Result<(), HandshakeError> {
    use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};

    // Drain stderr in the background so the worker doesn't block on a
    // full pipe. Captured stderr is included in error messages on
    // protocol failures.
    let stderr_handle = tokio::spawn(async move {
        let mut buf = String::new();
        let mut reader = BufReader::new(stderr);
        // Cap captured stderr at 8 KiB so a chatty worker doesn't pin
        // memory; we only need the first error message anyway.
        let mut tmp = String::new();
        while buf.len() < 8192 {
            tmp.clear();
            match reader.read_line(&mut tmp).await {
                Ok(0) => break,
                Ok(_) => buf.push_str(&tmp),
                Err(_) => break,
            }
        }
        buf
    });

    let request = serde_json::json!({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "handshake",
        "params": {
            "client": "nexus-host",
            "protocolVersion": "1.0",
        }
    });
    let line = format!("{request}\n");
    if let Err(err) = stdin.write_all(line.as_bytes()).await {
        let stderr_text = stderr_handle.await.unwrap_or_default();
        return Err(HandshakeError {
            category: "stdin_write_failed".into(),
            message: format!(
                "failed to write handshake request to worker stdin: {err}; \
                 worker stderr: {stderr_text}"
            ),
        });
    }
    if let Err(err) = stdin.flush().await {
        let stderr_text = stderr_handle.await.unwrap_or_default();
        return Err(HandshakeError {
            category: "stdin_flush_failed".into(),
            message: format!(
                "failed to flush handshake request: {err}; worker stderr: {stderr_text}"
            ),
        });
    }

    let mut reader = BufReader::new(stdout);
    let mut response_line = String::new();
    match reader.read_line(&mut response_line).await {
        Ok(0) => {
            let stderr_text = stderr_handle.await.unwrap_or_default();
            return Err(HandshakeError {
                category: "worker_exited".into(),
                message: format!(
                    "worker stdout closed before handshake response; stderr: {stderr_text}"
                ),
            });
        }
        Err(err) => {
            let stderr_text = stderr_handle.await.unwrap_or_default();
            return Err(HandshakeError {
                category: "stdout_read_failed".into(),
                message: format!(
                    "failed to read handshake response: {err}; worker stderr: {stderr_text}"
                ),
            });
        }
        Ok(_) => {}
    }

    let parsed: serde_json::Value = match serde_json::from_str(response_line.trim()) {
        Ok(v) => v,
        Err(err) => {
            let stderr_text = stderr_handle.await.unwrap_or_default();
            return Err(HandshakeError {
                category: "handshake_protocol_error".into(),
                message: format!(
                    "worker handshake response was not valid JSON: {err}; \
                     raw response: {response_line:?}; stderr: {stderr_text}"
                ),
            });
        }
    };

    if parsed.get("error").is_some() {
        return Err(HandshakeError {
            category: "handshake_rejected".into(),
            message: format!("worker returned JSON-RPC error: {parsed}"),
        });
    }
    if parsed.get("result").is_none() {
        return Err(HandshakeError {
            category: "handshake_protocol_error".into(),
            message: format!(
                "worker handshake response had neither result nor error: {parsed}"
            ),
        });
    }
    Ok(())
}

fn find_python_interpreter(
    upstream: &std::collections::HashMap<String, StepArtifact>,
) -> Option<PathBuf> {
    for artifact in upstream.values() {
        let Some(path) = artifact.path.as_ref() else {
            continue;
        };
        let candidate = nexus_backend_runtimes::family_python::python_exe_in(path);
        if candidate.is_file() {
            return Some(candidate);
        }
    }
    None
}

fn find_venv_root(
    upstream: &std::collections::HashMap<String, StepArtifact>,
) -> Option<PathBuf> {
    for artifact in upstream.values() {
        let Some(path) = artifact.path.as_ref() else {
            continue;
        };
        if path.join("pyvenv.cfg").is_file() {
            return Some(path.clone());
        }
    }
    None
}

/// Read `[project.scripts]` from the worker's pyproject.toml and return
/// the importable package root of the first script entry.
///
/// `emotion-tts-worker = "emotion_tts_worker.main:main"` →
/// returns `"emotion_tts_worker"`.
fn read_worker_module_from_pyproject(path: &std::path::Path) -> Result<String, String> {
    let body = std::fs::read_to_string(path).map_err(|e| e.to_string())?;
    let parsed: toml::Value = toml::from_str(&body).map_err(|e| e.to_string())?;
    let scripts = parsed
        .get("project")
        .and_then(|p| p.get("scripts"))
        .and_then(|s| s.as_table())
        .ok_or_else(|| "missing [project.scripts] table".to_owned())?;
    let (_dist_name, target) = scripts
        .iter()
        .next()
        .ok_or_else(|| "[project.scripts] is empty".to_owned())?;
    let target_str = target
        .as_str()
        .ok_or_else(|| "[project.scripts] first entry is not a string".to_owned())?;
    let module_path = target_str
        .split(':')
        .next()
        .ok_or_else(|| format!("script target '{target_str}' has no module"))?;
    let package_root = module_path
        .split('.')
        .next()
        .ok_or_else(|| format!("script target '{target_str}' has empty module path"))?;
    if package_root.is_empty() {
        return Err(format!("script target '{target_str}' resolves to empty package"));
    }
    Ok(package_root.to_owned())
}

/// Stub kept for tests that exercise the validation handler against a
/// mock — never used in production wiring.
pub struct StubWorkerHandshake;

#[async_trait]
impl WorkerHandshake for StubWorkerHandshake {
    async fn run_handshake(
        &self,
        _extension_id: &str,
        _extension_dir: &std::path::Path,
        _extension_data_dir: &std::path::Path,
        _upstream_artifacts: &std::collections::HashMap<String, StepArtifact>,
        _timeout: std::time::Duration,
        _cancellation: CancellationToken,
    ) -> Result<(), HandshakeError> {
        Err(HandshakeError {
            category: "validation_unavailable".into(),
            message: "worker-handshake validation is not yet wired through the dep \
                      installer; the extension activates and the worker handshakes \
                      via the existing lease path on first use"
                .into(),
        })
    }
}

/// Convenience bundle — every `Option<Arc<dyn ...>>` field on `AppState`
/// populated with the default registry + real probe adapters + handshake stub.
pub struct DefaultDepBootstrap {
    pub handler_registry: Arc<HandlerRegistry>,
    pub runtime_bootstrapper: Arc<dyn RuntimeBootstrapper>,
    pub model_store: Arc<dyn ModelStoreClient>,
    pub worker_handshake: Arc<dyn WorkerHandshake>,
    pub fetch_artifact: Arc<FetchArtifact>,
    pub host_data_dir: PathBuf,
}

impl DefaultDepBootstrap {
    pub fn new(
        host_data_dir: PathBuf,
        pool: SqlitePool,
        install_map: InstallMap,
        orchestrator: Arc<DownloadOrchestrator>,
        huggingface: Option<Arc<dyn HuggingFaceCapability>>,
        capability_registry: Option<Arc<CapabilityRegistry>>,
        download_job_store: Option<Arc<JobStore>>,
    ) -> Self {
        Self {
            handler_registry: default_dep_handler_registry(),
            runtime_bootstrapper: Arc::new(RealRuntimeBootstrapper::new(pool)),
            model_store: Arc::new(RealModelStoreClient::new(
                install_map,
                orchestrator,
                huggingface,
                capability_registry,
                download_job_store,
            )),
            worker_handshake: Arc::new(RealWorkerHandshake),
            fetch_artifact: default_fetch_artifact(),
            host_data_dir,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use flate2::Compression;
    use flate2::write::GzEncoder;
    use nexus_backend_runtimes::family_python::{PythonAsset, python_exe_in};
    use sha2::{Digest, Sha256};
    use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
    use std::fs;
    use std::path::Path;
    use std::str::FromStr;

    /// Build a minimal `python/{bin/python3 | python.exe}` tar.gz fixture so
    /// `family_python::bootstrap::run` succeeds offline. Returns
    /// (archive_path, sha256_hex, size_bytes).
    fn build_python_archive_fixture(archive_dir: &Path) -> (std::path::PathBuf, String, u64) {
        fs::create_dir_all(archive_dir).expect("mkdir archive dir");
        let archive_path = archive_dir.join("cpython-fixture.tar.gz");
        let file = fs::File::create(&archive_path).expect("create archive");
        let enc = GzEncoder::new(file, Compression::fast());
        let mut tar = tar::Builder::new(enc);

        let entry = if cfg!(windows) {
            "python/python.exe"
        } else {
            "python/bin/python3"
        };
        let payload = b"#!stub\n";
        let mut header = tar::Header::new_gnu();
        header.set_size(payload.len() as u64);
        header.set_mode(0o755);
        header.set_cksum();
        tar.append_data(&mut header, entry, &payload[..])
            .expect("append entry");
        let enc = tar.into_inner().expect("finish tar");
        enc.finish().expect("finish gz");

        let bytes = fs::read(&archive_path).expect("read archive");
        let mut hasher = Sha256::new();
        hasher.update(&bytes);
        let sha = format!("{:x}", hasher.finalize());
        let size = bytes.len() as u64;
        (archive_path, sha, size)
    }

    fn file_url(path: &Path) -> String {
        let display = path.display().to_string().replace('\\', "/");
        if cfg!(windows) {
            format!("file:///{display}")
        } else {
            format!("file://{display}")
        }
    }

    async fn fresh_pool_with_runtime_installs() -> SqlitePool {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        // Minimum schema for runtime_installs_store::resolve_dependency.
        sqlx::query(
            "CREATE TABLE host_runtime_installs (
                install_id TEXT PRIMARY KEY,
                family TEXT NOT NULL,
                version TEXT NOT NULL,
                accelerator TEXT NOT NULL,
                install_root TEXT NOT NULL,
                binary_paths TEXT NOT NULL DEFAULT '[]',
                state TEXT NOT NULL,
                validation_result TEXT,
                last_failure_category TEXT,
                source_url TEXT,
                checksum TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )",
        )
        .execute(&pool)
        .await
        .unwrap();
        pool
    }

    #[tokio::test]
    async fn runtime_probe_unknown_family_returns_none() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "totally-fake-runtime",
                None,
                &[],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();
        assert!(result.is_none());
    }

    #[tokio::test]
    async fn runtime_probe_canonical_family_with_no_install_returns_none() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe("python", None, &[], std::path::Path::new("/tmp"))
            .await
            .unwrap();
        assert!(result.is_none());
    }

    #[tokio::test]
    async fn runtime_probe_returns_install_dir_when_installed() {
        let pool = fresh_pool_with_runtime_installs().await;
        sqlx::query(
            "INSERT INTO host_runtime_installs (install_id, family, version, accelerator, install_root, state, created_at, updated_at) \
             VALUES ('id1', 'python', '3.11.13', 'cpu', '/opt/runtimes/py311', 'installed', '2026-04-25T00:00:00Z', '2026-04-25T00:00:00Z')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();

        let result = result.expect("expected matching install");
        assert_eq!(result.install_dir, PathBuf::from("/opt/runtimes/py311"));
        assert_eq!(result.resolved_version, "3.11.13");
        assert_eq!(result.resolved_profile.as_deref(), Some("cpu"));
    }

    #[tokio::test]
    async fn runtime_probe_returns_none_when_version_predicate_excludes_installed_row() {
        // A row exists for python 3.10.x but the manifest asks for >=3.11. The
        // resolver MUST reject the row and return None — otherwise the dep gate
        // would flip green for an incompatible runtime.
        let pool = fresh_pool_with_runtime_installs().await;
        sqlx::query(
            "INSERT INTO host_runtime_installs (install_id, family, version, accelerator, install_root, state, created_at, updated_at) \
             VALUES ('id-py310', 'python', '3.10.14', 'cpu', '/opt/runtimes/py310', 'installed', '2026-04-25T00:00:00Z', '2026-04-25T00:00:00Z')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();
        assert!(
            result.is_none(),
            "version predicate '>=3.11' must reject installed 3.10.14 row, got: {result:?}"
        );
    }

    #[tokio::test]
    async fn runtime_bootstrap_returns_categorised_error_pointing_at_backends_ui() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let err = bootstrapper
            .bootstrap(
                "python",
                None,
                &[],
                std::path::Path::new("/tmp"),
                CancellationToken::new(),
            )
            .await
            .unwrap_err();

        let msg = err.to_string();
        assert!(msg.contains("Backends page"), "msg = {msg}");
        assert!(msg.contains("python"), "msg = {msg}");
    }

    /// RED test for the runtime auto-install path. With a real `PythonAsset`
    /// configured, `bootstrap("python", ...)` MUST extract the asset into
    /// `target_dir` and return a `RuntimeBootstrapResult` describing the
    /// install — not a categorised "go to Backends page" error. Without this,
    /// the dep installer's user flow has a dead end (Python step fails →
    /// Backends page has no compatible Python option → user is stuck).
    #[tokio::test]
    async fn runtime_bootstrap_python_extracts_asset_and_returns_install_dir() {
        let pool = fresh_pool_with_runtime_installs().await;
        let tmp = tempfile::tempdir().expect("tmp");
        let fixture_dir = tmp.path().join("fixtures");
        let (archive_path, sha256, size) = build_python_archive_fixture(&fixture_dir);
        let asset = PythonAsset::pbs_install_only(file_url(&archive_path), &sha256, size);
        let target_dir = tmp.path().join("install");

        let bootstrapper = RealRuntimeBootstrapper::with_python_asset(pool, Some(asset));
        let result = bootstrapper
            .bootstrap(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                &target_dir,
                CancellationToken::new(),
            )
            .await
            .expect("bootstrap should succeed when asset is configured");

        assert_eq!(result.install_dir, target_dir);
        assert!(result.bytes_placed > 0, "expected bytes_placed > 0");
        let python_exe = python_exe_in(&target_dir);
        assert!(
            python_exe.is_file(),
            "expected python interpreter at {} after bootstrap",
            python_exe.display()
        );
    }

    /// Per FR-033 — disk layout is the source of truth for `probe()`. After a
    /// successful `bootstrap_python` (which extracts to `target_dir/python/...`
    /// but does NOT insert into `host_runtime_installs`), the next probe
    /// against the same `target_dir` MUST return `Satisfied` so the UI can
    /// flip the step from `pending` to `ok` without a host restart.
    #[tokio::test]
    async fn runtime_probe_returns_satisfied_after_bootstrap_via_filesystem() {
        let pool = fresh_pool_with_runtime_installs().await;
        let tmp = tempfile::tempdir().expect("tmp");
        let fixture_dir = tmp.path().join("fixtures");
        let (archive_path, sha256, size) = build_python_archive_fixture(&fixture_dir);
        let asset = PythonAsset::pbs_install_only(file_url(&archive_path), &sha256, size);
        let target_dir = tmp.path().join("install");

        let bootstrapper = RealRuntimeBootstrapper::with_python_asset(pool, Some(asset));
        bootstrapper
            .bootstrap(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                &target_dir,
                CancellationToken::new(),
            )
            .await
            .expect("bootstrap ok");

        // The legacy DB row is intentionally NOT inserted by bootstrap_python.
        // Probe must still flip Satisfied via filesystem inspection of
        // target_dir, otherwise the UI will spin in PENDING forever.
        let probed = bootstrapper
            .probe("python", Some(">=3.11"), &["cpu".into()], &target_dir)
            .await
            .expect("probe ok");
        let probed = probed.expect("expected filesystem hit after bootstrap");
        assert_eq!(probed.install_dir, target_dir);
        assert!(
            probed.bytes_placed > 0,
            "expected bytes_placed > 0, got {}",
            probed.bytes_placed
        );
    }

    /// Regression: when no `PythonAsset` is configured (REGISTRY empty + no
    /// env override) the existing categorised error MUST still fire so the
    /// user gets a meaningful pointer rather than a silent panic.
    #[tokio::test]
    async fn runtime_bootstrap_python_without_asset_keeps_categorised_error() {
        let pool = fresh_pool_with_runtime_installs().await;
        let tmp = tempfile::tempdir().expect("tmp");
        let target_dir = tmp.path().join("install");

        let bootstrapper = RealRuntimeBootstrapper::with_python_asset(pool, None);
        let err = bootstrapper
            .bootstrap("python", None, &[], &target_dir, CancellationToken::new())
            .await
            .unwrap_err();
        let msg = err.to_string();
        assert!(msg.contains("python"), "msg = {msg}");
    }

    #[tokio::test]
    async fn worker_handshake_returns_validation_unavailable_category() {
        let stub = StubWorkerHandshake;
        let err = stub
            .run_handshake(
                "ext.example",
                std::path::Path::new("/tmp"),
                std::path::Path::new("/tmp/data"),
                &std::collections::HashMap::new(),
                std::time::Duration::from_secs(1),
                CancellationToken::new(),
            )
            .await
            .unwrap_err();
        assert_eq!(err.category, "validation_unavailable");
    }
}
