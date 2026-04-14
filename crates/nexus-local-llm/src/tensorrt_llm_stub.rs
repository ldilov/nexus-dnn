use async_trait::async_trait;

use crate::adapter::{
    BackendAdapter, BackendCardSummary, ImplementationStatus, InstallRequest,
};
use crate::error::RuntimeAdapterError;
use crate::manifest::install::InstallManifest;
use crate::resolver::MachineDescriptor;
use crate::settings::{AcceleratorProfile, RuntimeSettings};
use crate::state::RuntimeCardState;
use crate::validator::ValidationReport;

pub struct TensorRtLlmStub {
    reason: String,
}

impl TensorRtLlmStub {
    pub fn new() -> Self {
        Self {
            reason: "Native Windows support planned for a later slice.".to_string(),
        }
    }
}

impl Default for TensorRtLlmStub {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl BackendAdapter for TensorRtLlmStub {
    fn id(&self) -> &'static str {
        "tensorrt_llm"
    }

    fn display_name(&self) -> &'static str {
        "TensorRT-LLM"
    }

    fn implementation_status(&self) -> ImplementationStatus {
        ImplementationStatus::Unavailable(self.reason.clone())
    }

    async fn supported_profiles(&self, _machine: &MachineDescriptor) -> Vec<AcceleratorProfile> {
        Vec::new()
    }

    async fn current_summary(
        &self,
        _machine: &MachineDescriptor,
    ) -> Result<BackendCardSummary, RuntimeAdapterError> {
        Ok(BackendCardSummary {
            id: self.id().into(),
            display_name: self.display_name().into(),
            implementation_status: ImplementationStatus::Unavailable(self.reason.clone()),
            card_state: RuntimeCardState::Unsupported,
            install: None,
            supported_profiles: Vec::new(),
            last_failure_category: None,
            unavailable_reason: Some(self.reason.clone()),
        })
    }

    async fn install(
        &self,
        _request: InstallRequest,
        _machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError> {
        Err(RuntimeAdapterError::BackendUnavailable(self.reason.clone()))
    }

    async fn validate(&self) -> Result<ValidationReport, RuntimeAdapterError> {
        Err(RuntimeAdapterError::BackendUnavailable(self.reason.clone()))
    }

    async fn repair(
        &self,
        _machine: &MachineDescriptor,
    ) -> Result<InstallManifest, RuntimeAdapterError> {
        Err(RuntimeAdapterError::BackendUnavailable(self.reason.clone()))
    }

    async fn get_settings(&self) -> Result<RuntimeSettings, RuntimeAdapterError> {
        Err(RuntimeAdapterError::BackendUnavailable(self.reason.clone()))
    }

    async fn put_settings(&self, _settings: RuntimeSettings) -> Result<(), RuntimeAdapterError> {
        Err(RuntimeAdapterError::BackendUnavailable(self.reason.clone()))
    }
}
