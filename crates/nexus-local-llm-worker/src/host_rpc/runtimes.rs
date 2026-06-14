use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;
use crate::ids::{LeaseId, ModelId, RuntimeInstallId, VariantCodename};
use crate::transport::WorkerTransport;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BackendRuntime {
    pub install_id: RuntimeInstallId,
    pub codename: VariantCodename,
    pub variant: String,
    #[serde(default)]
    pub supported_formats: Vec<String>,
    pub binary_path: String,
    #[serde(default)]
    pub version: Option<String>,
    #[serde(default)]
    pub capabilities: BackendCapabilities,
    #[serde(default = "default_health")]
    pub health: RuntimeHealth,
}

fn default_health() -> RuntimeHealth {
    RuntimeHealth::Installed
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct BackendCapabilities {
    #[serde(default)]
    pub chat: bool,
    #[serde(default)]
    pub embeddings: bool,
    #[serde(default)]
    pub tools: bool,
    #[serde(default)]
    pub vision: bool,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "PascalCase")]
pub enum RuntimeHealth {
    Installed,
    Broken,
    Updating,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RuntimeLease {
    pub lease_id: LeaseId,
    pub install_id: RuntimeInstallId,
    pub extension_id: String,
    #[serde(default)]
    pub pid: Option<u32>,
    pub log_channel_id: String,
    pub channel: RuntimeChannelDescriptor,
    pub created_at: String,
    #[serde(default)]
    pub released_at: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RuntimeChannelDescriptor {
    pub base_url: String,
    #[serde(default)]
    pub protocol: Option<String>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct LeaseSettingsOverride {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub context_length: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub n_gpu_layers: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parallel: Option<u32>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub extra_args: Vec<String>,
}

#[derive(Debug, Serialize)]
struct ListRequest<'a> {
    #[serde(skip_serializing_if = "Option::is_none")]
    supports_format: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    codename: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    variant: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    health: Option<&'a str>,
}

#[derive(Debug, Deserialize)]
struct ListResponse {
    items: Vec<BackendRuntime>,
}

#[derive(Debug, Serialize)]
struct GetRequest<'a> {
    install_id: &'a RuntimeInstallId,
}

#[derive(Debug, Serialize)]
pub struct AcquireLeaseRequest {
    pub install_id: RuntimeInstallId,
    pub model_id: ModelId,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub settings_override: Option<LeaseSettingsOverride>,
}

#[derive(Debug, Serialize)]
struct ReleaseLeaseRequest<'a> {
    lease_id: &'a LeaseId,
}

#[derive(Debug, Deserialize)]
struct ReleaseLeaseResponse {
    #[serde(default)]
    released: bool,
}

#[derive(Debug, Serialize)]
pub struct RegisterExistingRuntimeRequest {
    pub legacy_path: String,
    pub variant_hint: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterExistingRuntimeResponse {
    pub install_id: RuntimeInstallId,
    pub status: String,
}

pub struct RuntimesClient<'a> {
    transport: &'a WorkerTransport,
}

impl<'a> RuntimesClient<'a> {
    pub fn new(transport: &'a WorkerTransport) -> Self {
        Self { transport }
    }

    pub async fn list(
        &self,
        supports_format: Option<&str>,
        codename: Option<&str>,
        variant: Option<&str>,
    ) -> WorkerResult<Vec<BackendRuntime>> {
        let resp: ListResponse = self
            .transport
            .call(
                "host.runtimes.list",
                ListRequest {
                    supports_format,
                    codename,
                    variant,
                    health: Some("Installed"),
                },
            )
            .await?;
        Ok(resp.items)
    }

    pub async fn get(&self, install_id: &RuntimeInstallId) -> WorkerResult<BackendRuntime> {
        self.transport
            .call("host.runtimes.get", GetRequest { install_id })
            .await
    }

    pub async fn acquire_lease(&self, req: AcquireLeaseRequest) -> WorkerResult<RuntimeLease> {
        self.transport
            .call("host.runtimes.acquire_lease", req)
            .await
    }

    pub async fn release_lease(&self, lease_id: &LeaseId) -> WorkerResult<bool> {
        let resp: ReleaseLeaseResponse = self
            .transport
            .call(
                "host.runtimes.release_lease",
                ReleaseLeaseRequest { lease_id },
            )
            .await?;
        Ok(resp.released)
    }

    pub async fn register_existing(
        &self,
        req: RegisterExistingRuntimeRequest,
    ) -> WorkerResult<RegisterExistingRuntimeResponse> {
        self.transport
            .call("host.runtimes.register_existing", req)
            .await
    }
}
