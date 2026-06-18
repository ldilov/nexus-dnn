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
    DepError, HandlerRegistry, HandshakeError, ModelDownloadProgress, ModelPartialState,
    ModelStoreClient, RuntimeBootstrapResult, RuntimeBootstrapper, StepArtifact, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
};
use nexus_huggingface::{HfError, HuggingFaceCapability, RepoFile, SearchFilters, SearchReq};
use nexus_models_store::capabilities::CapabilityRegistry;
use nexus_models_store::downloads::{
    CreateJobParams, DownloadOrchestrator, InstallMap, JobStore, JobTargetInput, RequestedKind,
    TargetState,
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
        let Some(canonical_family) = RuntimeFamily::canonical(family) else {
            tracing::debug!(
                target: "extension_install::probe",
                family,
                "probe: unknown runtime family — returning None"
            );
            return Ok(None);
        };

        if let RuntimeFamily::Python = canonical_family {
            let interpreter = nexus_backend_runtimes::family_python::python_exe_in(target_dir);
            // TRACE because this fires on every probe iteration; debug-level
            // tracing is reserved for "filesystem hit/miss" outcomes.
            tracing::trace!(
                target: "extension_install::probe",
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
                tracing::debug!(
                    target: "extension_install::probe",
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
                target: "extension_install::probe",
                family,
                install_root = %r.install_root,
                version = %r.version,
                accelerator = %r.accelerator,
                "probe: DB hit — runtime satisfied via host_runtime_installs"
            ),
            None => tracing::debug!(
                target: "extension_install::probe",
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
            target: "extension_install::bootstrap_python",
            target_dir = %target_dir.display(),
            version = ?version,
            accelerator_profiles = ?accelerator_profiles,
            "bootstrap_python: enter"
        );

        // Resolve the interpreter asset. An explicit override (env-configured
        // `NEXUS_EMBEDDED_PYTHON_*`) always wins; otherwise pick the registry
        let asset: nexus_backend_runtimes::family_python::PythonAsset = match self
            .python_asset
            .as_ref()
        {
            Some(a) => a.clone(),
            None => {
                nexus_backend_runtimes::family_python::builtin_assets::for_current_target_matching(
                    version,
                )
                .ok_or_else(|| {
                    tracing::warn!(
                        target: "extension_install::bootstrap_python",
                        version = ?version,
                        "no PythonAsset matches this host target + version range — \
                         failing with categorised pointer"
                    );
                    DepError::Backend(
                        "embedded python asset not configured on this host (set \
                             NEXUS_EMBEDDED_PYTHON_URL/SHA256/SIZE/KIND or pin a release in \
                             family_python::builtin_assets::REGISTRY); install it from the \
                             Backends page if a different runtime install pipeline is preferred."
                            .to_owned(),
                    )
                })?
            }
        };
        let resolved_version = asset
            .url
            .split("cpython-")
            .nth(1)
            .and_then(|s| s.split('+').next())
            .map(str::to_owned)
            .unwrap_or_else(|| {
                nexus_backend_runtimes::family_python::builtin_assets::python_version().to_owned()
            });
        tracing::info!(
            target: "extension_install::bootstrap_python",
            url = %asset.url,
            sha256_prefix = %asset.sha256.chars().take(12).collect::<String>(),
            kind = ?asset.kind,
            extract_dir = %asset.extract_dir.display(),
            "bootstrap_python: asset resolved"
        );

        let interpreter_pre = python_exe_in(target_dir);
        if interpreter_pre.is_file() {
            tracing::info!(
                target: "extension_install::bootstrap_python",
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
            target: "extension_install::bootstrap_python",
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
            target: "extension_install::bootstrap_python",
            "bootstrap_python: invoking family_python::bootstrap::run \
             (download + sha256 verify + archive extract)"
        );
        py_bootstrap::run(&mut ctx, Some(&asset))
            .await
            .map_err(|e| {
                tracing::error!(
                    target: "extension_install::bootstrap_python",
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
            target: "extension_install::bootstrap_python",
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
            resolved_version,
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

    /// `detail()` with a bounded retry on transient Hub failures
    /// (`Unreachable` — which includes 5xx — and `RateLimited`). Honors the
    /// error's `retry_after` hint capped at 10s so a flaky Hub stalls a step
    /// by seconds, not by the full advisory window. Non-transient errors
    /// (404, auth, parse) return immediately.
    async fn detail_with_retry(
        hf: &dyn HuggingFaceCapability,
        repo_id: &str,
    ) -> Result<nexus_huggingface::RepoMetadata, HfError> {
        const ATTEMPTS: u32 = 3;
        const MAX_BACKOFF_SECS: u64 = 10;
        let mut last_err = None;
        for attempt in 1..=ATTEMPTS {
            match hf.detail(repo_id, None).await {
                Ok(meta) => return Ok(meta),
                Err(err) => {
                    let retry_after = match &err {
                        HfError::Unreachable {
                            retry_after_seconds,
                        } => retry_after_seconds.unwrap_or(5),
                        HfError::RateLimited {
                            retry_after_seconds,
                        } => *retry_after_seconds,
                        _ => return Err(err),
                    };
                    tracing::warn!(
                        target: "extension_install::model_artifact",
                        repo_id,
                        attempt,
                        error = %err,
                        "hf detail transient failure — retrying"
                    );
                    if attempt < ATTEMPTS {
                        let secs = u64::from(retry_after).clamp(1, MAX_BACKOFF_SECS);
                        tokio::time::sleep(std::time::Duration::from_secs(secs)).await;
                    }
                    last_err = Some(err);
                }
            }
        }
        Err(last_err.expect("loop ran at least once"))
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
        selection: &nexus_extension_deps::FileSelection,
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
        let files: Vec<RepoFile> = match Self::detail_with_retry(hf.as_ref(), repo_id).await {
            Ok(meta) => meta.siblings,
            Err(HfError::RepoNotFound(_)) => {
                return Err(DepError::Backend(format!(
                    "model family not found upstream: {family_id}"
                )));
            }
            Err(detail_err) => {
                // Resilience fallback: one search attempt keeps installs
                // alive if the detail endpoint regresses while search works.
                tracing::warn!(
                    target: "extension_install::model_artifact",
                    repo_id,
                    error = %detail_err,
                    unrestricted_selection = selection.is_unrestricted(),
                    "hf detail enumeration failed after retries — falling back to search. \
                     Search may return a partial file list; for an UNRESTRICTED (whole-repo) \
                     selection the per-file verify is disabled (it cannot enumerate the repo \
                     without the network), so a partial download would still probe Satisfied \
                     (pre-existing limitation). Pin an explicit files[] selection in the \
                     extension's model_artifact step once the repo's file list is stable to \
                     make the install heal on re-run."
                );
                let req = SearchReq {
                    query: repo_id.to_owned(),
                    filters: SearchFilters::default(),
                    limit: 10,
                    page: 1,
                };
                let page = hf.search(req).await.map_err(|e| {
                    DepError::Backend(format!(
                        "huggingface detail: {detail_err}; search fallback: {e}"
                    ))
                })?;
                page.results
                    .into_iter()
                    .find(|r| r.repo_id == repo_id)
                    .map(|r| r.files)
                    .ok_or_else(|| {
                        DepError::Backend(format!("model family not found upstream: {family_id}"))
                    })?
            }
        };

        let non_empty_paths: Vec<&str> = files
            .iter()
            .map(|f| f.path.as_str())
            .filter(|p| !p.is_empty())
            .collect();
        let selected: std::collections::HashSet<&str> =
            selection.filter(non_empty_paths)?.into_iter().collect();

        let targets: Vec<JobTargetInput> = files
            .iter()
            .filter(|f| selected.contains(f.path.as_str()))
            .map(|f| JobTargetInput {
                artifact_id: ArtifactId::from(format!("{family_id}#{}", f.path)),
                filename: f.path.clone(),
                role: DependencyRole::Primary,
                download_url: format!("https://huggingface.co/{repo_id}/resolve/main/{}", f.path),
                expected_bytes: f.size_bytes,
                sha256: f.sha256.clone(),
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

        let sink_root = self.orchestrator.sink_root();
        for row in rows {
            let present = self
                .install_map
                .reconcile_row_present(&row, sink_root)
                .await
                .map_err(|e| DepError::Backend(format!("install_map.reconcile: {e}")))?;
            if present {
                return Ok(Some(sink_root.join(&row.job_id).join(&row.filename)));
            }
        }
        Ok(None)
    }

    async fn start_download(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
        selection: &nexus_extension_deps::FileSelection,
    ) -> Result<String, DepError> {
        let store = self
            .download_job_store
            .as_ref()
            .ok_or_else(|| DepError::Backend("download job store not initialised".into()))?;

        let targets = self
            .snapshot_targets_from_huggingface(family_id, selection)
            .await?;

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
            target: "extension_install::model_store",
            family_id,
            job_id = %job_id,
            "model_store: download job created and enqueued"
        );
        Ok(job_id.to_string())
    }

    async fn family_partial_state(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<ModelPartialState>, DepError> {
        let Some(store) = self.download_job_store.as_ref() else {
            return Ok(None);
        };
        let family = FamilyId::from(family_id);
        let Some(job_id) = store
            .latest_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("job_store.latest_for_family: {e}")))?
        else {
            return Ok(None);
        };
        let Some(job) = store
            .get(&job_id)
            .await
            .map_err(|e| DepError::Backend(format!("job_store.get: {e}")))?
        else {
            return Ok(None);
        };

        let files_total = u32::try_from(job.targets.len()).unwrap_or(u32::MAX);

        let sink_dir = self.orchestrator.sink_root().join(job.job_id.to_string());
        let mut present: u32 = 0;
        for target in &job.targets {
            if target.state != TargetState::Downloaded {
                continue;
            }
            if tokio::fs::metadata(sink_dir.join(&target.filename))
                .await
                .is_ok()
            {
                present = present.saturating_add(1);
            }
        }

        Ok(Some(ModelPartialState {
            present_bytes: job.progress_bytes,
            total_bytes: job.total_bytes.unwrap_or(0),
            files_present: present,
            files_total,
        }))
    }

    async fn family_integrity(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<nexus_extension_deps::ArtifactIntegrity>, DepError> {
        let family = FamilyId::from(family_id);
        let rows = self
            .install_map
            .list_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;
        if rows.is_empty() {
            return Ok(None);
        }

        let sink_root = self.orchestrator.sink_root();
        let mut bad: Vec<String> = Vec::new();
        let mut sized_checks: u32 = 0;
        for row in &rows {
            let path = sink_root.join(&row.job_id).join(&row.filename);
            match tokio::fs::metadata(&path).await {
                Err(_) => bad.push(format!("{} is missing", row.filename)),
                Ok(meta) => {
                    if let Some(expected) = row.size_bytes.filter(|b| *b > 0) {
                        sized_checks = sized_checks.saturating_add(1);
                        if meta.len() != expected {
                            bad.push(format!(
                                "{} is {} bytes, expected {expected}",
                                row.filename,
                                meta.len()
                            ));
                        }
                    }
                }
            }
        }

        // Nothing verifiable (no recorded sizes and every file present) — report
        // `None` rather than a false "ok", so the UI shows no misleading badge.
        if bad.is_empty() && sized_checks == 0 {
            return Ok(None);
        }
        if bad.is_empty() {
            return Ok(Some(nexus_extension_deps::ArtifactIntegrity {
                ok: true,
                detail: None,
            }));
        }
        let count = bad.len();
        Ok(Some(nexus_extension_deps::ArtifactIntegrity {
            ok: false,
            detail: Some(format!(
                "{count} file(s) failed integrity check: {}",
                bad.join("; ")
            )),
        }))
    }

    async fn verify_files_present(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
        selection: &nexus_extension_deps::FileSelection,
    ) -> Result<Vec<String>, DepError> {
        // Whole-repo selections can only be enumerated with a network call, which
        // probe() forbids — report "all present" and lean on family_integrity for
        if selection.is_unrestricted() {
            return Ok(Vec::new());
        }

        let family = FamilyId::from(family_id);
        let candidates: Vec<String> = if !selection.files.is_empty() {
            selection.files.clone()
        } else {
            let rows = self
                .install_map
                .list_for_family(&family)
                .await
                .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;
            let known: Vec<String> = rows.into_iter().map(|r| r.filename).collect();
            match selection.filter(known.iter().map(String::as_str)) {
                Ok(matched) => matched.into_iter().map(str::to_owned).collect(),
                // The glob matched nothing in the (sparse) install_map. For a
                // verify that means the glob-declared files were never
                Err(DepError::Backend(_)) => {
                    let pattern = selection
                        .include
                        .first()
                        .or_else(|| selection.exclude.first())
                        .cloned()
                        .unwrap_or_else(|| "<glob selection>".to_owned());
                    return Ok(vec![format!("<unsatisfied glob: {pattern}>")]);
                }
                Err(other) => return Err(other),
            }
        };

        let sink_root = self.orchestrator.sink_root();
        let mut missing: Vec<String> = Vec::new();
        for filename in candidates {
            let artifact_id = ArtifactId::from(format!("{family_id}#{filename}"));
            let row = self
                .install_map
                .find_by_artifact(&artifact_id)
                .await
                .map_err(|e| DepError::Backend(format!("install_map.find_by_artifact: {e}")))?;
            let present = match row {
                None => false,
                Some(row) => {
                    let path = row.install_path(sink_root);
                    match tokio::fs::metadata(&path).await {
                        Ok(meta) => meta.len() > 0,
                        Err(e) if e.kind() == std::io::ErrorKind::NotFound => false,
                        Err(e) => {
                            tracing::warn!(
                                target: "extension_install::model_artifact",
                                path = %path.display(),
                                error = %e,
                                "verify_files_present: metadata failed (treating as absent)"
                            );
                            false
                        }
                    }
                }
            };
            if !present {
                missing.push(filename);
            }
        }
        Ok(missing)
    }

    async fn record_reference(
        &self,
        extension_id: &str,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<(), DepError> {
        let family = FamilyId::from(family_id);
        let rows = self
            .install_map
            .list_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;
        let Some(job_id) = rows.into_iter().next().map(|r| r.job_id) else {
            tracing::warn!(
                target: "extension_install::model_store",
                extension_id,
                family_id,
                "record_reference: no install-map row for family — skipping ref"
            );
            return Ok(());
        };
        self.install_map
            .add_ref(&job_id, extension_id)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.add_ref: {e}")))?;
        tracing::info!(
            target: "extension_install::model_store",
            extension_id,
            family_id,
            job_id = %job_id,
            "model_store: recorded Foundry ownership ref"
        );
        Ok(())
    }

    async fn purge_family(
        &self,
        extension_id: &str,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<(), DepError> {
        let family = FamilyId::from(family_id);
        let rows = self
            .install_map
            .list_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;

        let mut job_ids: Vec<String> = rows.into_iter().map(|r| r.job_id).collect();
        job_ids.sort();
        job_ids.dedup();

        let sink_root = self.orchestrator.sink_root();
        let mut freed_bytes: u64 = 0;
        for job_id in &job_ids {
            self.install_map
                .remove_ref(job_id, extension_id)
                .await
                .map_err(|e| DepError::Backend(format!("install_map.remove_ref: {e}")))?;
            let outcome = self
                .install_map
                .gc_artifact_if_unreferenced(job_id, sink_root)
                .await
                .map_err(|e| DepError::Backend(format!("install_map.gc: {e}")))?;
            freed_bytes = freed_bytes.saturating_add(outcome.freed_bytes);
        }

        tracing::info!(
            target: "extension_install::model_store",
            extension_id,
            family_id,
            jobs = job_ids.len(),
            freed_bytes,
            "model_store: purged family for forced reinstall"
        );
        Ok(())
    }

    async fn poll_job(&self, job_id: &str) -> Result<ModelDownloadProgress, DepError> {
        let store = self
            .download_job_store
            .as_ref()
            .ok_or_else(|| DepError::Backend("download job store not initialised".into()))?;
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
                let path = self.orchestrator.sink_root().join(job.job_id.to_string());
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
                message: "model artifacts are incompatible with this host's accelerators".into(),
            }),
            DownloadState::NotDownloaded => Ok(ModelDownloadProgress::InProgress {
                current_bytes: 0,
                total_bytes: job.total_bytes.unwrap_or(0),
                message: "queued".into(),
            }),
            // `DownloadState` is `#[non_exhaustive]`. Treat any future variant
            // as a transient in-progress state to keep the handler safe under
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
///   importable package root is the dotted prefix before `:` (e.g.
///   `<my-worker> = "<my_worker_pkg>.main:main"` invokes
///   `python -m <my_worker_pkg>`). The package must ship a
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
        let upstream_summary: Vec<String> = upstream_artifacts
            .iter()
            .map(|(id, art)| {
                format!(
                    "{id}=>{}",
                    art.path
                        .as_ref()
                        .map(|p| p.display().to_string())
                        .unwrap_or_else(|| "<no path>".into())
                )
            })
            .collect();
        tracing::info!(
            target: "extension_install::handshake",
            extension_id,
            extension_dir = %extension_dir.display(),
            extension_data_dir = %extension_data_dir.display(),
            upstream_count = upstream_artifacts.len(),
            upstream = ?upstream_summary,
            "handshake: resolving runtime + venv from upstream artifacts"
        );

        let runtime_convention = extension_data_dir.join("runtime").join("python");
        let venv_convention = extension_data_dir
            .join("runtime")
            .join("packages")
            .join(".venv");

        let _base_python = match find_python_interpreter(upstream_artifacts) {
            Some(p) => p,
            None => {
                let candidate =
                    nexus_backend_runtimes::family_python::python_exe_in(&runtime_convention);
                if candidate.is_file() {
                    tracing::warn!(
                        target: "extension_install::handshake",
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
                        target: "extension_install::handshake",
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
            target: "extension_install::handshake",
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
            message: format!(
                "failed to spawn '{}' -m {module_name}: {err}",
                venv_python.display()
            ),
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
                    .write_all(
                        b"{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"shutdown\",\"params\":null}\n",
                    )
                    .await;
                drop(stdin);
                let _ = tokio::time::timeout(std::time::Duration::from_secs(2), child.wait()).await;
                let _ = child.kill().await;
                tracing::info!(
                    target: "extension_install::handshake",
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

    // The worker is allowed to emit JSON-RPC *notifications* (frames with
    // `method` but no `id`) at any point — log lines, progress events,
    let mut reader = BufReader::new(stdout);
    const MAX_NOTIFICATIONS_BEFORE_RESPONSE: usize = 64;
    for attempt in 0..=MAX_NOTIFICATIONS_BEFORE_RESPONSE {
        let mut line = String::new();
        match reader.read_line(&mut line).await {
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

        let parsed: serde_json::Value = match serde_json::from_str(line.trim()) {
            Ok(v) => v,
            Err(err) => {
                let stderr_text = stderr_handle.await.unwrap_or_default();
                return Err(HandshakeError {
                    category: "handshake_protocol_error".into(),
                    message: format!(
                        "worker frame was not valid JSON: {err}; \
                         raw frame: {line:?}; stderr: {stderr_text}"
                    ),
                });
            }
        };

        // Notification (method without id) — log and keep reading.
        if parsed.get("id").is_none() && parsed.get("method").is_some() {
            tracing::debug!(
                target: "extension_install::handshake",
                frame = %parsed,
                attempt,
                "handshake: skipping notification while waiting for response"
            );
            continue;
        }

        // Anything else with our handshake id (or no id) is a candidate
        // response. Validate shape.
        if let Some(error_obj) = parsed.get("error") {
            return Err(HandshakeError {
                category: "handshake_rejected".into(),
                message: format!("worker returned JSON-RPC error: {error_obj}"),
            });
        }
        if parsed.get("result").is_some() {
            return Ok(());
        }

        // Frame had neither method+no-id (notification) nor result/error
        // (response). Treat as malformed.
        return Err(HandshakeError {
            category: "handshake_protocol_error".into(),
            message: format!("worker frame is neither notification nor response: {parsed}"),
        });
    }

    Err(HandshakeError {
        category: "handshake_timeout".into(),
        message: format!(
            "worker emitted {MAX_NOTIFICATIONS_BEFORE_RESPONSE} notifications without ever \
             sending a handshake response — protocol deadlock"
        ),
    })
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

fn find_venv_root(upstream: &std::collections::HashMap<String, StepArtifact>) -> Option<PathBuf> {
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
/// `<dist-name> = "<package>.main:main"` → returns `"<package>"`.
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
        return Err(format!(
            "script target '{target_str}' resolves to empty package"
        ));
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

    // --- G3 download-progress (HF size capture + poll_job total) ---

    use nexus_huggingface::{
        DownloadSpec, DownloadedArtifact, HfError, HfResult, RepoFile, RepoMetadata, SearchPage,
        SearchResult,
    };

    /// HF stub whose search siblings carry real `size_bytes` so the snapshot
    /// job's summed `expected_bytes` is non-zero (AC-3.1). `with_sizes=false`
    /// drops sizes from search and surfaces them only via `detail()` to
    /// exercise the detail-fallback merge path.
    struct SizedHfStub {
        repo_id: String,
        files: Vec<(String, u64)>,
        sizes_in_search: bool,
    }

    #[async_trait]
    impl HuggingFaceCapability for SizedHfStub {
        async fn search(&self, req: SearchReq) -> HfResult<SearchPage> {
            let files = self
                .files
                .iter()
                .map(|(path, bytes)| RepoFile {
                    path: path.clone(),
                    size_bytes: self.sizes_in_search.then_some(*bytes),
                    sha256: None,
                })
                .collect();
            Ok(SearchPage {
                query: req.query,
                page: 1,
                has_next: false,
                results: vec![SearchResult {
                    repo_id: self.repo_id.clone(),
                    author: None,
                    license: None,
                    downloads_30d: None,
                    last_modified: None,
                    files,
                    formats: vec![],
                    quantizations: vec![],
                    pipeline_tag: None,
                }],
            })
        }

        async fn detail(&self, repo_id: &str, revision: Option<&str>) -> HfResult<RepoMetadata> {
            Ok(RepoMetadata {
                repo_id: repo_id.to_owned(),
                revision: revision.unwrap_or("main").to_owned(),
                author: None,
                license: None,
                pipeline_tag: None,
                library_name: None,
                tags: vec![],
                siblings: self
                    .files
                    .iter()
                    .map(|(path, bytes)| RepoFile {
                        path: path.clone(),
                        size_bytes: Some(*bytes),
                        sha256: None,
                    })
                    .collect(),
                config: None,
                downloads: None,
                last_modified: None,
            })
        }

        async fn download(&self, _spec: DownloadSpec) -> HfResult<DownloadedArtifact> {
            Err(HfError::Cancelled)
        }
    }

    struct FlakyDetailHfStub {
        repo_id: String,
        files: Vec<(String, u64)>,
        detail_failures_remaining: std::sync::atomic::AtomicU32,
        detail_error_is_transient: bool,
        search_calls: std::sync::atomic::AtomicU32,
    }

    #[async_trait]
    impl HuggingFaceCapability for FlakyDetailHfStub {
        async fn search(&self, req: SearchReq) -> HfResult<SearchPage> {
            self.search_calls
                .fetch_add(1, std::sync::atomic::Ordering::SeqCst);
            Ok(SearchPage {
                query: req.query,
                page: 1,
                has_next: false,
                results: vec![SearchResult {
                    repo_id: self.repo_id.clone(),
                    author: None,
                    license: None,
                    downloads_30d: None,
                    last_modified: None,
                    files: self
                        .files
                        .iter()
                        .map(|(path, bytes)| RepoFile {
                            path: path.clone(),
                            size_bytes: Some(*bytes),
                            sha256: None,
                        })
                        .collect(),
                    formats: vec![],
                    quantizations: vec![],
                    pipeline_tag: None,
                }],
            })
        }

        async fn detail(&self, repo_id: &str, revision: Option<&str>) -> HfResult<RepoMetadata> {
            let remaining = self
                .detail_failures_remaining
                .load(std::sync::atomic::Ordering::SeqCst);
            if remaining > 0 {
                self.detail_failures_remaining
                    .fetch_sub(1, std::sync::atomic::Ordering::SeqCst);
                return Err(if self.detail_error_is_transient {
                    // What a Hub 500 now classifies as.
                    HfError::Unreachable {
                        retry_after_seconds: Some(1),
                    }
                } else {
                    HfError::InvalidResponse("unexpected status 418 I'm a teapot".into())
                });
            }
            Ok(RepoMetadata {
                repo_id: repo_id.to_owned(),
                revision: revision.unwrap_or("main").to_owned(),
                author: None,
                license: None,
                pipeline_tag: None,
                library_name: None,
                tags: vec![],
                siblings: self
                    .files
                    .iter()
                    .map(|(path, bytes)| RepoFile {
                        path: path.clone(),
                        size_bytes: Some(*bytes),
                        sha256: None,
                    })
                    .collect(),
                config: None,
                downloads: None,
                last_modified: None,
            })
        }

        async fn download(&self, _spec: DownloadSpec) -> HfResult<DownloadedArtifact> {
            Err(HfError::Cancelled)
        }
    }

    /// Regression (svi2-pro reinstall halt) — a transient Hub failure on the
    /// enumeration call no longer fails the step: detail retries and recovers.
    /// Real ~2s wall time: paused-clock mode starves the sqlx pool's acquire
    /// timeout, so the 1s retry_after backoffs run on the real clock.
    #[tokio::test]
    async fn snapshot_recovers_from_transient_detail_failures() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let hf = Arc::new(FlakyDetailHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![("lora.safetensors".into(), 1_000_000)],
            detail_failures_remaining: std::sync::atomic::AtomicU32::new(2),
            detail_error_is_transient: true,
            search_calls: std::sync::atomic::AtomicU32::new(0),
        });
        let client = client_with_hf(pool, hf.clone(), tmp.path().to_path_buf());

        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .expect("transient detail failures must be retried, not fatal");
        assert_eq!(targets.len(), 1);
        assert_eq!(
            hf.search_calls.load(std::sync::atomic::Ordering::SeqCst),
            0,
            "happy path must not touch the flaky search endpoint"
        );
    }

    /// Resilience — if detail hard-fails (non-transient), the legacy search
    /// enumeration still completes the step.
    #[tokio::test]
    async fn snapshot_falls_back_to_search_when_detail_hard_fails() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let hf = Arc::new(FlakyDetailHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![("lora.safetensors".into(), 1_000_000)],
            detail_failures_remaining: std::sync::atomic::AtomicU32::new(u32::MAX),
            detail_error_is_transient: false,
            search_calls: std::sync::atomic::AtomicU32::new(0),
        });
        let client = client_with_hf(pool, hf.clone(), tmp.path().to_path_buf());

        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .expect("search fallback must keep the install alive");
        assert_eq!(targets.len(), 1);
        assert_eq!(
            hf.search_calls.load(std::sync::atomic::Ordering::SeqCst),
            1,
            "fallback goes through search exactly once"
        );
    }

    async fn model_store_pool() -> Arc<SqlitePool> {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        for migration in [
            include_str!("../../../migrations/013_model_store_download_jobs.sql"),
            include_str!("../../../migrations/014_model_store_installed_artifacts.sql"),
            include_str!("../../../migrations/015_installed_artifact_extraction_metadata.sql"),
            include_str!("../../../migrations/021_installed_artifact_moe_metadata.sql"),
            include_str!("../../../migrations/022_model_store_artifact_refs.sql"),
        ] {
            for stmt in migration.split(';') {
                let trimmed = stmt.trim();
                if trimmed.is_empty() {
                    continue;
                }
                sqlx::query(trimmed).execute(&pool).await.unwrap();
            }
        }
        Arc::new(pool)
    }

    fn client_with_hf(
        pool: Arc<SqlitePool>,
        hf: Arc<dyn HuggingFaceCapability>,
        sink_root: PathBuf,
    ) -> RealModelStoreClient {
        let install_map = InstallMap::new(pool.clone());
        let store = Arc::new(JobStore::new(pool.clone()));
        let orchestrator = Arc::new(DownloadOrchestrator::new(
            JobStore::new(pool),
            install_map.clone(),
            sink_root,
            reqwest::Client::new(),
            nexus_models_store::downloads::TokenStore::new(None),
            nexus_models_store::downloads::TokenStore::new(None),
        ));
        RealModelStoreClient::new(install_map, orchestrator, Some(hf), None, Some(store))
    }

    /// AC-3.1 — a multi-file snapshot whose HF siblings carry sizes produces
    /// targets summing to a non-zero expected_bytes total.
    #[tokio::test]
    async fn snapshot_targets_sum_nonzero_when_hf_listing_has_sizes() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let hf = Arc::new(SizedHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![
                ("model.safetensors".into(), 4_000_000_000),
                ("config.json".into(), 1_024),
            ],
            sizes_in_search: true,
        });
        let client = client_with_hf(pool, hf, tmp.path().to_path_buf());

        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .unwrap();
        let total: u64 = targets.iter().filter_map(|t| t.expected_bytes).sum();
        assert_eq!(targets.len(), 2);
        assert_eq!(total, 4_000_001_024, "summed expected_bytes must be > 0");
    }

    fn mega_repo_stub() -> Arc<SizedHfStub> {
        Arc::new(SizedHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![
                ("config.json".into(), 1_024),
                (
                    "transformer/diffusion_pytorch_model.safetensors".into(),
                    8_000_000_000,
                ),
                ("text_encoder/model.safetensors".into(), 2_000_000_000),
                (
                    "vae/diffusion_pytorch_model.safetensors".into(),
                    300_000_000,
                ),
                ("variant_fp8/model.safetensors".into(), 9_000_000_000),
            ],
            sizes_in_search: true,
        })
    }

    fn selection(
        files: &[&str],
        include: &[&str],
        exclude: &[&str],
    ) -> nexus_extension_deps::FileSelection {
        nexus_extension_deps::FileSelection {
            files: files.iter().map(|s| s.to_string()).collect(),
            include: include.iter().map(|s| s.to_string()).collect(),
            exclude: exclude.iter().map(|s| s.to_string()).collect(),
        }
    }

    /// AC-2.1 / AC-2.3 — `files` exact allowlist yields only those targets and
    /// the summed expected_bytes reflects only the selected subset.
    #[tokio::test]
    async fn snapshot_filters_by_exact_files() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());
        let sel = selection(
            &[
                "config.json",
                "transformer/diffusion_pytorch_model.safetensors",
            ],
            &[],
            &[],
        );

        let targets = client
            .snapshot_targets_from_huggingface("huggingface:Owner/Repo", &sel)
            .await
            .unwrap();
        let names: Vec<&str> = targets.iter().map(|t| t.filename.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "config.json",
                "transformer/diffusion_pytorch_model.safetensors"
            ]
        );
        let total: u64 = targets.iter().filter_map(|t| t.expected_bytes).sum();
        assert_eq!(
            total, 8_000_001_024,
            "byte total covers only selected files"
        );
    }

    /// AC-2.1 — `include` globs keep matching files only.
    #[tokio::test]
    async fn snapshot_filters_by_include_globs() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());
        let sel = selection(&[], &["transformer/**", "text_encoder/**"], &[]);

        let targets = client
            .snapshot_targets_from_huggingface("huggingface:Owner/Repo", &sel)
            .await
            .unwrap();
        let names: Vec<&str> = targets.iter().map(|t| t.filename.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
            ]
        );
    }

    /// AC-2.1 — `exclude` globs drop matching files (include-all default).
    #[tokio::test]
    async fn snapshot_filters_by_exclude_globs() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());
        let sel = selection(&[], &[], &["variant_fp8/**", "vae/**"]);

        let targets = client
            .snapshot_targets_from_huggingface("huggingface:Owner/Repo", &sel)
            .await
            .unwrap();
        let names: Vec<&str> = targets.iter().map(|t| t.filename.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "config.json",
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
            ]
        );
    }

    /// AC-2.4 — no selection produces the SAME target set as the whole repo
    /// (backward compatible — other extensions with no selection are unaffected).
    #[tokio::test]
    async fn snapshot_no_selection_matches_whole_repo() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());

        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .unwrap();
        let names: Vec<&str> = targets.iter().map(|t| t.filename.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "config.json",
                "transformer/diffusion_pytorch_model.safetensors",
                "text_encoder/model.safetensors",
                "vae/diffusion_pytorch_model.safetensors",
                "variant_fp8/model.safetensors",
            ],
            "no-selection target set equals the full repo listing"
        );
    }

    /// AC-2.2 — a selection that matches nothing is an explicit error, never a
    /// silent zero-file install.
    #[tokio::test]
    async fn snapshot_empty_match_is_error() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());
        let sel = selection(&["does/not/exist.safetensors"], &[], &[]);

        let err = client
            .snapshot_targets_from_huggingface("huggingface:Owner/Repo", &sel)
            .await
            .unwrap_err();
        let msg = err.to_string();
        assert!(
            msg.contains("matched no files"),
            "expected an explicit empty-match error, got: {msg}"
        );
    }

    /// AC-3.1 — when search omits sizes, the detail() fallback merges them in.
    #[tokio::test]
    async fn snapshot_targets_fall_back_to_detail_sizes() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let hf = Arc::new(SizedHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![("model.gguf".into(), 7_000_000_000)],
            sizes_in_search: false,
        });
        let client = client_with_hf(pool, hf, tmp.path().to_path_buf());

        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .unwrap();
        let total: u64 = targets.iter().filter_map(|t| t.expected_bytes).sum();
        assert_eq!(total, 7_000_000_000, "detail fallback supplies sizes");
    }

    /// AC-3.2 — poll_job reports a non-zero total once known; current_bytes is
    /// monotonic across two polls after a progress bump.
    #[tokio::test]
    async fn poll_job_reports_nonzero_total_and_monotonic_current() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let hf = Arc::new(SizedHfStub {
            repo_id: "Owner/Repo".into(),
            files: vec![("model.safetensors".into(), 5_000_000_000)],
            sizes_in_search: true,
        });
        let client = client_with_hf(pool.clone(), hf, tmp.path().to_path_buf());

        // Build the job via the store directly (no orchestrator enqueue) so the
        // background worker can't race a network GET to a terminal state.
        let targets = client
            .snapshot_targets_from_huggingface(
                "huggingface:Owner/Repo",
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .unwrap();
        let store = JobStore::new(pool.clone());
        let params = CreateJobParams::builder(
            FamilyId::from("huggingface:Owner/Repo"),
            "huggingface",
            "Owner/Repo",
            RequestedKind::Bundle,
        )
        .targets(targets)
        .build();
        let job = store.create(params).await.unwrap();
        let job_id = job.job_id.to_string();

        let first = client.poll_job(&job_id).await.unwrap();
        let (c0, t0) = match first {
            ModelDownloadProgress::InProgress {
                current_bytes,
                total_bytes,
                ..
            } => (current_bytes, total_bytes),
            other => panic!("expected InProgress, got {other:?}"),
        };
        assert_eq!(t0, 5_000_000_000, "total_bytes known from summed sizes");

        let uuid = uuid::Uuid::parse_str(&job_id).unwrap();
        let job = store.get(&JobId::from_uuid(uuid)).await.unwrap().unwrap();
        let artifact = job.targets[0].artifact_id.clone();
        store
            .update_target_progress(&JobId::from_uuid(uuid), &artifact, 1_000_000)
            .await
            .unwrap();

        let second = client.poll_job(&job_id).await.unwrap();
        let (c1, t1) = match second {
            ModelDownloadProgress::InProgress {
                current_bytes,
                total_bytes,
                ..
            } => (current_bytes, total_bytes),
            other => panic!("expected InProgress, got {other:?}"),
        };
        assert_eq!(t1, 5_000_000_000);
        assert!(c1 >= c0, "current_bytes monotonic: {c1} >= {c0}");
    }

    /// Seed an install-map row + write its on-disk file under the sink so
    /// `verify_files_present` sees a "present" declared file.
    async fn seed_present_file(
        install_map: &InstallMap,
        sink_root: &std::path::Path,
        family_id: &str,
        job_id: &nexus_models_store::ids::JobId,
        filename: &str,
        contents: &[u8],
    ) {
        use nexus_models_store::downloads::InstalledArtifactRecord;
        use nexus_models_store::types::Format;
        install_map
            .record(InstalledArtifactRecord {
                artifact_id: ArtifactId::from(format!("{family_id}#{filename}")),
                family_id: FamilyId::from(family_id),
                variant_id: None,
                format: Format::Safetensors,
                source_provider: "huggingface".into(),
                source_repo: "Owner/Repo".into(),
                source_revision: Some("main".into()),
                filename: filename.into(),
                job_id: *job_id,
                sha256: None,
                size_bytes: Some(contents.len() as u64),
            })
            .await
            .unwrap();
        let path = sink_root.join(job_id.to_string()).join(filename);
        if let Some(parent) = path.parent() {
            tokio::fs::create_dir_all(parent).await.unwrap();
        }
        tokio::fs::write(path, contents).await.unwrap();
    }

    /// End-to-end heal: bytes survive in the store sink with a valid sidecar
    /// but the install_map row was lost (terminal-job prune / fresh DB). Before
    /// backfill, verify_files_present reports the declared file MISSING (a
    /// re-download would fire). After backfill_install_map_from_sink adopts the
    /// orphaned file, verify reports it PRESENT — no re-download.
    #[tokio::test]
    async fn backfill_then_verify_reports_present_no_redownload() {
        use nexus_models_store::ids::JobId;
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());

        // Orphaned sink state: file + sidecar on disk, NO install_map row.
        let job_id = JobId::new();
        let dir = sink_root.join(job_id.to_string());
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("t2v.safetensors"), b"real-weights")
            .await
            .unwrap();
        let manifest = nexus_models_store::downloads::ManifestSidecar {
            family_id: "huggingface:Owner/Repo".into(),
            source_repo: "Owner/Repo".into(),
            accelerator: None,
            files: vec!["t2v.safetensors".into()],
            created_at: "2026-06-16T00:00:00Z".into(),
        };
        nexus_models_store::downloads::legibility::write_manifest(
            sink_root,
            &job_id.to_string(),
            &manifest,
        )
        .await
        .unwrap();

        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&["t2v.safetensors"], &[], &[]);

        // Before backfill: the row is missing, so verify reports the file absent.
        let before = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert_eq!(
            before,
            vec!["t2v.safetensors"],
            "without a row, verify reports the file missing (would re-download)"
        );

        // Adopt the orphaned sink bytes back into the install map.
        let report = install_map
            .backfill_install_map_from_sink(sink_root)
            .await
            .unwrap();
        assert_eq!(report.recorded, 1);

        // After backfill: verify sees the file present — no re-download.
        let after = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert!(
            after.is_empty(),
            "after backfill the declared file is present, got {after:?}"
        );
    }

    /// Unrestricted selections always report "all present" — enumerating a
    /// whole-repo snapshot requires the network and is forbidden in probe().
    #[tokio::test]
    async fn verify_files_present_unrestricted_is_always_empty() {
        let tmp = tempfile::tempdir().unwrap();
        let pool = model_store_pool().await;
        let client = client_with_hf(pool, mega_repo_stub(), tmp.path().to_path_buf());
        let missing = client
            .verify_files_present(
                "huggingface:Owner/Repo",
                None,
                &nexus_extension_deps::FileSelection::default(),
            )
            .await
            .unwrap();
        assert!(missing.is_empty(), "got {missing:?}");
    }

    /// An explicit `files[]` selection where every declared file is on disk
    /// reports nothing missing.
    #[tokio::test]
    async fn verify_files_present_explicit_all_present_is_empty() {
        use nexus_models_store::ids::JobId;
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());
        let job_id = JobId::new();
        for f in ["i2v.safetensors", "t2v.safetensors"] {
            seed_present_file(
                &install_map,
                sink_root,
                "huggingface:Owner/Repo",
                &job_id,
                f,
                b"weights",
            )
            .await;
        }
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&["i2v.safetensors", "t2v.safetensors"], &[], &[]);
        let missing = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert!(
            missing.is_empty(),
            "all declared files present, got {missing:?}"
        );
    }

    /// A declared file with no install-map row (never downloaded) is reported
    /// missing — the partial-family-install root cause.
    #[tokio::test]
    async fn verify_files_present_reports_undownloaded_declared_file() {
        use nexus_models_store::ids::JobId;
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());
        let job_id = JobId::new();
        // Only the I2V file was ever downloaded; the T2V file is absent.
        seed_present_file(
            &install_map,
            sink_root,
            "huggingface:Owner/Repo",
            &job_id,
            "i2v.safetensors",
            b"weights",
        )
        .await;
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&["i2v.safetensors", "t2v.safetensors"], &[], &[]);
        let missing = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert_eq!(missing, vec!["t2v.safetensors"]);
    }

    /// A declared file whose row exists but whose on-disk bytes vanished (or
    /// were truncated to zero) is reported missing.
    #[tokio::test]
    async fn verify_files_present_reports_zero_size_or_vanished_file() {
        use nexus_models_store::ids::JobId;
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());
        let job_id = JobId::new();
        seed_present_file(
            &install_map,
            sink_root,
            "huggingface:Owner/Repo",
            &job_id,
            "t2v.safetensors",
            b"weights",
        )
        .await;
        // Truncate to zero bytes on disk — row stays, file is empty.
        tokio::fs::write(
            sink_root.join(job_id.to_string()).join("t2v.safetensors"),
            b"",
        )
        .await
        .unwrap();
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&["t2v.safetensors"], &[], &[]);
        let missing = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert_eq!(missing, vec!["t2v.safetensors"]);
    }

    /// Glob-selection partial install: an `include` glob that matches nothing
    /// in a sparse install_map must report the glob-declared files ABSENT (so
    /// probe returns NotSatisfied and the step heals) — NOT propagate the
    /// empty-match Backend error as a fatal failure out of probe().
    #[tokio::test]
    async fn verify_files_present_glob_no_matches_reports_missing_not_error() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        // install_map is empty — the T2V weights the glob targets were never
        // downloaded, so there are no rows for the glob to match.
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&[], &["transformer/**"], &[]);
        let missing = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .expect("empty glob match must NOT be a fatal error");
        assert!(
            !missing.is_empty(),
            "a glob matching no installed rows reports the declared files absent, got {missing:?}"
        );
    }

    /// Glob-selection with all matched rows present on disk reports nothing
    /// missing — the glob branch doesn't false-flag a complete install.
    #[tokio::test]
    async fn verify_files_present_glob_all_present_is_empty() {
        use nexus_models_store::ids::JobId;
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());
        let job_id = JobId::new();
        seed_present_file(
            &install_map,
            sink_root,
            "huggingface:Owner/Repo",
            &job_id,
            "transformer/model.safetensors",
            b"weights",
        )
        .await;
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&[], &["transformer/**"], &[]);
        let missing = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .unwrap();
        assert!(
            missing.is_empty(),
            "all glob-matched files present, got {missing:?}"
        );
    }

    /// A genuinely invalid glob stays a real error — the empty-match rescue
    /// must not swallow `InvalidSpec`.
    #[tokio::test]
    async fn verify_files_present_invalid_glob_is_error() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = model_store_pool().await;
        let install_map = InstallMap::new(pool.clone());
        // Seed a row so the install_map is non-empty (so the failure can only
        // come from glob compilation, not the empty-match guard).
        seed_present_file(
            &install_map,
            sink_root,
            "huggingface:Owner/Repo",
            &nexus_models_store::ids::JobId::new(),
            "transformer/model.safetensors",
            b"weights",
        )
        .await;
        let client = client_with_hf(pool, mega_repo_stub(), sink_root.to_path_buf());
        let sel = selection(&[], &["transformer/["], &[]);
        let err = client
            .verify_files_present("huggingface:Owner/Repo", None, &sel)
            .await
            .expect_err("an uncompilable glob is a real InvalidSpec error");
        assert!(matches!(err, DepError::InvalidSpec { .. }), "got {err:?}");
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
