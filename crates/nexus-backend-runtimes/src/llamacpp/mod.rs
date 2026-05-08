//! Llama.cpp backend adapter.
//!
//! Spec 042 requires every spawned `llama-server` process to run with
//! `--log-verbosity 1`. That setting unlocks the per-tensor histogram
//! and per-layer KV-cache info lines that
//! [`scraper_patterns::LlamacppScraperV1`] depends on for the
//! Model-load Lattice. The flag is added to
//! [`LaunchSpec::base_args`] inside `launch_spec` below; it is host-
//! managed and is not subject to extension parameter passthrough.

pub mod channel_builder;
mod install_ctx;
pub mod install_pipeline;
pub mod installs_store;
pub mod probe;
pub mod scraper_patterns;

use async_trait::async_trait;
use camino::Utf8PathBuf;
use sqlx::SqlitePool;
use std::collections::BTreeMap;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio_util::sync::CancellationToken;

use crate::adapter::{BackendAdapter, BackendCardSummary, ImplementationStatus, InstallRequest};
use crate::channel::{ChannelBuildCtx, RuntimeChannelDescriptor};
use crate::error::RuntimeAdapterError;
use crate::events::SharedPublisher;
use crate::launch_spec::LaunchSpec;
use crate::manifest::install::{InstallManifest, InstallStatus};
use crate::manifest::release_scanner::SharedScanner;
use crate::manifest::variants::{BackendVariantCatalog, project_variants};
use crate::manifest::version::VersionManifest;
use crate::resolver::MachineDescriptor;
use crate::settings::{AcceleratorProfile, RuntimeSettings};
use crate::settings_store;
use crate::spawn::SpawnRuntimeRequest;
use crate::state::RuntimeCardState;
use crate::validator::ValidationReport;

pub struct LlamaCppAdapter {
    version_manifest_path: PathBuf,
    runtimes_root: Utf8PathBuf,
    pool: SqlitePool,
    publisher: SharedPublisher,
    namespace: String,
    active_install: Arc<Mutex<Option<CancellationToken>>>,
    scanner: Option<SharedScanner>,
}

impl LlamaCppAdapter {
    pub fn new(
        version_manifest_path: PathBuf,
        runtimes_root: Utf8PathBuf,
        pool: SqlitePool,
        publisher: SharedPublisher,
        namespace: impl Into<String>,
    ) -> Self {
        Self {
            version_manifest_path,
            runtimes_root,
            namespace: namespace.into(),
            pool,
            publisher,
            active_install: Arc::new(Mutex::new(None)),
            scanner: None,
        }
    }

    pub fn with_scanner(mut self, scanner: SharedScanner) -> Self {
        self.scanner = Some(scanner);
        self
    }

    async fn load_version_manifest(&self) -> Result<VersionManifest, RuntimeAdapterError> {
        if let Some(scanner) = &self.scanner {
            match scanner.fetch_manifest().await {
                Ok(manifest) => return Ok(manifest),
                Err(err) => {
                    tracing::warn!(
                        error = %err,
                        "release scanner failed — falling back to on-disk version manifest"
                    );
                }
            }
        }
        let manifest =
            crate::manifest::version::load_from_path(&self.version_manifest_path).await?;
        Ok(manifest)
    }

    async fn emit_unavailable_if_transitioned(
        &self,
        install: &InstallManifest,
        new_status: InstallStatus,
        failure_category: Option<String>,
    ) {
        if new_status != InstallStatus::Broken || install.status == InstallStatus::Broken {
            return;
        }
        let reason = failure_category.unwrap_or_else(|| "unknown".into());
        let event = crate::events::BackendEvent::new(
            "install.unavailable",
            self.id(),
            serde_json::json!({ "reason": reason }),
        )
        .with_install(install.runtime_install_id.clone());
        self.publisher.publish(event).await;
    }
}

#[async_trait]
impl BackendAdapter for LlamaCppAdapter {
    fn id(&self) -> &'static str {
        crate::family::RuntimeFamily::LLAMA_CPP
    }

    fn display_name(&self) -> &'static str {
        crate::family::RuntimeFamily::LLAMA_CPP
    }

    fn implementation_status(&self) -> ImplementationStatus {
        ImplementationStatus::Available
    }

    async fn supported_profiles(&self, machine: &MachineDescriptor) -> Vec<AcceleratorProfile> {
        machine.supported_profiles()
    }

    async fn list_variants(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<BackendVariantCatalog, RuntimeAdapterError> {
        let manifest = self.load_version_manifest().await.map_err(|e| match e {
            RuntimeAdapterError::Install(inner) => {
                RuntimeAdapterError::CatalogUnavailable(inner.to_string())
            }
            RuntimeAdapterError::Io(inner) => {
                RuntimeAdapterError::CatalogUnavailable(inner.to_string())
            }
            other => other,
        })?;
        Ok(project_variants(&manifest, machine))
    }

    async fn current_summary(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<BackendCardSummary, RuntimeAdapterError> {
        let install = installs_store::load_latest(&self.pool, self.id()).await?;
        let card_state = match &install {
            Some(row) => RuntimeCardState::from(row.status),
            None => {
                if machine.platform == "unsupported" {
                    RuntimeCardState::Unsupported
                } else {
                    RuntimeCardState::NotInstalled
                }
            }
        };
        Ok(BackendCardSummary {
            id: self.id().into(),
            display_name: self.display_name().into(),
            implementation_status: ImplementationStatus::Available,
            card_state,
            last_failure_category: install
                .as_ref()
                .and_then(|i| i.last_failure_category.clone()),
            install,
            supported_profiles: machine.supported_profiles(),
            unavailable_reason: None,
        })
    }

    async fn install(
        &self,
        request: InstallRequest,
        machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError> {
        let mut guard = self.active_install.lock().await;
        if guard.is_some() {
            return Err(RuntimeAdapterError::InstallInProgress(self.id().into()));
        }
        let token = CancellationToken::new();
        *guard = Some(token.clone());
        drop(guard);

        let manifest = self.load_version_manifest().await?;
        let outcome = install_pipeline::run(
            &manifest,
            machine,
            request,
            &self.runtimes_root,
            &self.pool,
            self.publisher.clone(),
            token,
        )
        .await;
        *self.active_install.lock().await = None;
        Ok(outcome?)
    }

    async fn validate(&self) -> Result<ValidationReport, RuntimeAdapterError> {
        let install = installs_store::load_latest(&self.pool, self.id())
            .await?
            .ok_or_else(|| RuntimeAdapterError::InstallNotFound(self.id().into()))?;
        let report = probe::run_validation(&install, self.publisher.clone(), &self.namespace).await;
        let new_status = if report.overall_ok {
            InstallStatus::Ready
        } else {
            InstallStatus::Broken
        };
        let failure_category_str = report.failure_category.map(|c| format!("{c:?}"));
        installs_store::update_status(
            &self.pool,
            &install.runtime_install_id,
            new_status,
            failure_category_str.clone(),
        )
        .await?;
        self.emit_unavailable_if_transitioned(&install, new_status, failure_category_str)
            .await;
        Ok(report)
    }

    async fn repair(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError> {
        let existing = installs_store::load_latest(&self.pool, self.id())
            .await?
            .ok_or_else(|| RuntimeAdapterError::InstallNotFound(self.id().into()))?;
        let manifest = self
            .install(
                InstallRequest {
                    release_id: Some(existing.release_id),
                    accelerator_profile: Some(existing.accelerator_profile),
                },
                machine,
            )
            .await?;
        let event =
            crate::events::BackendEvent::new("install.repaired", self.id(), serde_json::json!({}))
                .with_install(manifest.runtime_install_id.clone());
        self.publisher.publish(event).await;
        Ok(manifest)
    }

    async fn get_settings(&self) -> Result<RuntimeSettings, RuntimeAdapterError> {
        match settings_store::load(&self.pool, self.id()).await? {
            Some(s) => Ok(s),
            None => Ok(RuntimeSettings::llamacpp_defaults()),
        }
    }

    async fn put_settings(&self, settings: RuntimeSettings) -> Result<(), RuntimeAdapterError> {
        settings_store::upsert(&self.pool, &settings).await?;
        let event = crate::events::BackendEvent::new(
            "llm.backend.settings.updated",
            self.id(),
            serde_json::json!({ "namespace": self.namespace, "backend": self.id() }),
        );
        self.publisher.publish(event).await;
        Ok(())
    }

    fn build_channel(&self, ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor {
        channel_builder::build(ctx)
    }

    async fn launch_spec(
        &self,
        install: &InstallManifest,
        _request: &SpawnRuntimeRequest,
    ) -> Result<LaunchSpec, RuntimeAdapterError> {
        let binary_name = if cfg!(windows) {
            "llama-server.exe"
        } else {
            "llama-server"
        };
        let install_root = PathBuf::from(&install.install_path);
        let candidate = install_root.join(binary_name);
        let binary = if candidate.exists() {
            candidate
        } else if !install.binary_path.is_empty() {
            PathBuf::from(&install.binary_path)
        } else {
            candidate
        };
        let base_env = build_base_env_for_gpu_arch().await;
        Ok(LaunchSpec {
            binary,
            base_args: vec!["--log-verbosity".into(), "1".into()],
            base_env,
            working_dir: None,
        })
    }
}

/// Process-lifetime cache for the host's max GPU compute capability major.
/// Detected once via `nvidia-smi --query-gpu=compute_cap` and reused for every
/// subsequent spawn so we don't pay the ~50ms subprocess cost per launch.
static COMPUTE_CAP_MAJOR_CACHE: tokio::sync::OnceCell<Option<u8>> =
    tokio::sync::OnceCell::const_new();

async fn cached_compute_cap_major() -> Option<u8> {
    *COMPUTE_CAP_MAJOR_CACHE
        .get_or_init(crate::resolver::detect_gpu_compute_cap_major)
        .await
}

/// Inject `GGML_CUDA_FORCE_CUBLAS=1` when the host has a Blackwell-or-newer GPU
/// (compute_cap_major >= 10). On those architectures the cuBLAS path tends to
/// outperform MMQ for quantized matmul (Blackwell B100/B200 sm_100 + RTX 50
/// series sm_120). Pre-Blackwell cards keep the MMQ default by emitting no
/// override.
async fn build_base_env_for_gpu_arch() -> BTreeMap<String, String> {
    base_env_for_compute_cap(cached_compute_cap_major().await)
}

fn base_env_for_compute_cap(compute_cap_major: Option<u8>) -> BTreeMap<String, String> {
    let mut env = BTreeMap::new();
    if matches!(compute_cap_major, Some(major) if major >= 10) {
        env.insert("GGML_CUDA_FORCE_CUBLAS".to_string(), "1".to_string());
    }
    env
}

#[cfg(test)]
mod base_env_tests {
    use super::base_env_for_compute_cap;

    #[test]
    fn no_compute_cap_emits_empty_env() {
        let env = base_env_for_compute_cap(None);
        assert!(env.is_empty());
    }

    #[test]
    fn ada_lovelace_keeps_mmq_default() {
        // sm_89 / Ada Lovelace (RTX 4090) — MMQ path is faster, no override.
        let env = base_env_for_compute_cap(Some(8));
        assert!(!env.contains_key("GGML_CUDA_FORCE_CUBLAS"));
    }

    #[test]
    fn hopper_keeps_mmq_default() {
        // sm_90 / Hopper (H100) — major == 9, still under threshold.
        let env = base_env_for_compute_cap(Some(9));
        assert!(!env.contains_key("GGML_CUDA_FORCE_CUBLAS"));
    }

    #[test]
    fn blackwell_datacenter_forces_cublas() {
        // sm_100 / Blackwell (B100/B200).
        let env = base_env_for_compute_cap(Some(10));
        assert_eq!(
            env.get("GGML_CUDA_FORCE_CUBLAS").map(String::as_str),
            Some("1")
        );
    }

    #[test]
    fn blackwell_consumer_forces_cublas() {
        // sm_120 / consumer Blackwell (RTX 50 series).
        let env = base_env_for_compute_cap(Some(12));
        assert_eq!(
            env.get("GGML_CUDA_FORCE_CUBLAS").map(String::as_str),
            Some("1")
        );
    }

    #[test]
    fn future_archs_keep_cublas_override() {
        let env = base_env_for_compute_cap(Some(15));
        assert_eq!(
            env.get("GGML_CUDA_FORCE_CUBLAS").map(String::as_str),
            Some("1")
        );
    }
}
