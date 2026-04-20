pub mod installed;
pub mod models;
pub mod runtimes;
pub mod settings;

use std::sync::Arc;

use crate::transport::WorkerTransport;

#[derive(Clone)]
pub struct HostClient {
    transport: Arc<WorkerTransport>,
}

impl HostClient {
    pub fn new(transport: Arc<WorkerTransport>) -> Self {
        Self { transport }
    }

    pub fn transport(&self) -> &Arc<WorkerTransport> {
        &self.transport
    }
}

pub use installed::{InstalledArtifact, InstalledClient, InstalledIndex};
pub use models::{HostModel, ModelMetadata, ModelsClient};
pub use runtimes::{
    BackendCapabilities, BackendRuntime, LeaseSettingsOverride, RuntimeChannelDescriptor,
    RuntimeHealth, RuntimeLease, RuntimesClient,
};
pub use settings::{SettingsClient, SettingsKey};
