pub mod channel_builder;
pub mod install_pipeline;
pub mod installs_store;
pub mod probe;

use async_trait::async_trait;
use camino::Utf8PathBuf;
use sqlx::SqlitePool;
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio_util::sync::CancellationToken;

use crate::adapter::{
    BackendAdapter, BackendCardSummary, ImplementationStatus, InstallRequest,
};
use crate::error::RuntimeAdapterError;
use crate::events::{NAMESPACE_LLAMACPP, SharedPublisher};
use crate::manifest::install::{InstallManifest, InstallStatus};
use crate::manifest::version::VersionManifest;
use crate::resolver::MachineDescriptor;
use crate::settings::{AcceleratorProfile, RuntimeSettings};
use crate::settings_store;
use crate::state::RuntimeCardState;
use crate::validator::ValidationReport;

pub struct LlamaCppAdapter {
    version_manifest_path: PathBuf,
    runtimes_root: Utf8PathBuf,
    pool: SqlitePool,
    publisher: SharedPublisher,
    active_install: Arc<Mutex<Option<CancellationToken>>>,
}

impl LlamaCppAdapter {
    pub fn new(
        version_manifest_path: PathBuf,
        runtimes_root: Utf8PathBuf,
        pool: SqlitePool,
        publisher: SharedPublisher,
    ) -> Self {
        Self {
            version_manifest_path,
            runtimes_root,
            pool,
            publisher,
            active_install: Arc::new(Mutex::new(None)),
        }
    }

    async fn load_version_manifest(&self) -> Result<VersionManifest, RuntimeAdapterError> {
        let manifest = crate::manifest::version::load_from_path(&self.version_manifest_path).await?;
        Ok(manifest)
    }
}

#[async_trait]
impl BackendAdapter for LlamaCppAdapter {
    fn id(&self) -> &'static str {
        "llama.cpp"
    }

    fn display_name(&self) -> &'static str {
        "llama.cpp"
    }

    fn implementation_status(&self) -> ImplementationStatus {
        ImplementationStatus::Available
    }

    async fn supported_profiles(&self, machine: &MachineDescriptor) -> Vec<AcceleratorProfile> {
        machine.supported_profiles()
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
            last_failure_category: install.as_ref().and_then(|i| i.last_failure_category.clone()),
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
        let report = probe::run_validation(&install, self.publisher.clone()).await;
        let new_status = if report.overall_ok {
            InstallStatus::Ready
        } else {
            InstallStatus::Broken
        };
        installs_store::update_status(
            &self.pool,
            &install.runtime_install_id,
            new_status,
            report.failure_category.map(|c| format!("{c:?}")),
        )
        .await?;
        Ok(report)
    }

    async fn repair(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError> {
        let existing = installs_store::load_latest(&self.pool, self.id())
            .await?
            .ok_or_else(|| RuntimeAdapterError::InstallNotFound(self.id().into()))?;
        self.install(
            InstallRequest {
                release_id: Some(existing.release_id),
                accelerator_profile: Some(existing.accelerator_profile),
            },
            machine,
        )
        .await
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
            serde_json::json!({ "namespace": NAMESPACE_LLAMACPP, "backend": self.id() }),
        );
        self.publisher.publish(event).await;
        Ok(())
    }
}
