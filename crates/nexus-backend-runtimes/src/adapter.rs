use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;

use crate::channel::{ChannelBuildCtx, RuntimeChannelDescriptor};
use crate::error::RuntimeAdapterError;
use crate::launch_spec::LaunchSpec;
use crate::manifest::install::InstallManifest;
use crate::resolver::MachineDescriptor;
use crate::settings::{AcceleratorProfile, RuntimeSettings};
use crate::spawn::SpawnRuntimeRequest;
use crate::state::RuntimeCardState;
use crate::validator::ValidationReport;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case", tag = "status", content = "reason")]
pub enum ImplementationStatus {
    Available,
    Unavailable(String),
}

#[derive(Debug, Clone)]
pub struct InstallRequest {
    pub release_id: Option<String>,
    pub accelerator_profile: Option<AcceleratorProfile>,
}

#[derive(Debug, Clone)]
pub struct BackendCardSummary {
    pub id: String,
    pub display_name: String,
    pub implementation_status: ImplementationStatus,
    pub card_state: RuntimeCardState,
    pub install: Option<InstallManifest>,
    pub supported_profiles: Vec<AcceleratorProfile>,
    pub last_failure_category: Option<String>,
    pub unavailable_reason: Option<String>,
}

#[async_trait]
pub trait BackendAdapter: Send + Sync {
    fn id(&self) -> &'static str;
    fn display_name(&self) -> &'static str;
    fn implementation_status(&self) -> ImplementationStatus;
    async fn supported_profiles(&self, machine: &MachineDescriptor) -> Vec<AcceleratorProfile>;
    async fn current_summary(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<BackendCardSummary, RuntimeAdapterError>;
    async fn install(
        &self,
        request: InstallRequest,
        machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError>;
    async fn validate(&self) -> Result<ValidationReport, RuntimeAdapterError>;
    async fn repair(
        &self,
        machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError>;
    async fn get_settings(&self) -> Result<RuntimeSettings, RuntimeAdapterError>;
    async fn put_settings(&self, settings: RuntimeSettings) -> Result<(), RuntimeAdapterError>;

    /// Build the runtime channel descriptor advertised on every lease for
    /// this family (spec 011 US3 T064). Synchronous and pure over `ctx`.
    fn build_channel(&self, ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor;

    /// Resolve the binary path, base args, and base env the spawner should
    /// fork for this family (spec 011 US3 T064).
    async fn launch_spec(
        &self,
        install: &InstallManifest,
        request: &SpawnRuntimeRequest,
    ) -> Result<LaunchSpec, RuntimeAdapterError>;
}

#[derive(Clone, Default)]
pub struct AdapterRegistry {
    adapters: HashMap<String, Arc<dyn BackendAdapter>>,
}

impl AdapterRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn register(&mut self, adapter: Arc<dyn BackendAdapter>) {
        self.adapters.insert(adapter.id().to_string(), adapter);
    }

    pub fn get(&self, id: &str) -> Option<Arc<dyn BackendAdapter>> {
        self.adapters.get(id).cloned()
    }

    pub fn all(&self) -> Vec<Arc<dyn BackendAdapter>> {
        self.adapters.values().cloned().collect()
    }
}
