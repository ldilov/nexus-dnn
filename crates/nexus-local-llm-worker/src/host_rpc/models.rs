use serde::{Deserialize, Serialize};

use crate::errors::{WorkerError, WorkerResult};
use crate::ids::ModelId;
use crate::transport::WorkerTransport;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct HostModel {
    pub id: ModelId,
    pub format: String,
    #[serde(default)]
    pub compatible_backends: Vec<String>,
    pub file_path: String,
    #[serde(default)]
    pub size_bytes: u64,
    #[serde(default)]
    pub checksum_sha256: Option<String>,
    #[serde(default)]
    pub metadata: ModelMetadata,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ModelMetadata {
    #[serde(default)]
    pub context_length: Option<u32>,
    #[serde(default)]
    pub architecture: Option<String>,
    #[serde(default)]
    pub chat_template: Option<String>,
    #[serde(default)]
    pub recommended_ngl: Option<u32>,
    #[serde(default)]
    pub quantization: Option<String>,
}

#[derive(Debug, Serialize)]
struct GetRequest<'a> {
    model_id: &'a ModelId,
}

#[derive(Debug, Serialize)]
struct ListRequest<'a> {
    #[serde(skip_serializing_if = "Option::is_none")]
    format: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    compatible_backend: Option<&'a str>,
}

#[derive(Debug, Deserialize)]
struct ListResponse {
    items: Vec<HostModel>,
}

#[derive(Debug, Serialize)]
pub struct RegisterExistingRequest {
    pub legacy_path: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hint: Option<RegisterExistingHint>,
}

#[derive(Debug, Serialize)]
pub struct RegisterExistingHint {
    pub format: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterExistingResponse {
    pub model_id: ModelId,
    pub status: String,
}

pub struct ModelsClient<'a> {
    transport: &'a WorkerTransport,
}

impl<'a> ModelsClient<'a> {
    pub fn new(transport: &'a WorkerTransport) -> Self {
        Self { transport }
    }

    pub async fn get(&self, model_id: &ModelId) -> WorkerResult<HostModel> {
        self.transport
            .call("host.models.get", GetRequest { model_id })
            .await
            .map_err(|e| match e {
                WorkerError::HostProtocolError(msg) if msg.contains("ModelNotFound") => {
                    WorkerError::ModelMissing {
                        model_id: model_id.as_str().to_string(),
                    }
                }
                other => other,
            })
    }

    pub async fn list(
        &self,
        format: Option<&str>,
        compatible_backend: Option<&str>,
    ) -> WorkerResult<Vec<HostModel>> {
        let resp: ListResponse = self
            .transport
            .call(
                "host.models.list",
                ListRequest {
                    format,
                    compatible_backend,
                },
            )
            .await?;
        Ok(resp.items)
    }

    pub async fn register_existing(
        &self,
        req: RegisterExistingRequest,
    ) -> WorkerResult<RegisterExistingResponse> {
        self.transport
            .call("host.models.register_existing", req)
            .await
    }
}
