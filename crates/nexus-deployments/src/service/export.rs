use crate::error::DeploymentError;
use crate::hash::{hex, sha256_jcs};
use crate::id::DeploymentId;
use crate::repository::DeploymentRepository;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::sync::Arc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportEnvelope {
    pub package_version: u32,
    pub deployment: Value,
    pub revisions: Vec<Value>,
    pub integrity: Integrity,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Integrity {
    pub hash_algo: String,
    pub digest: String,
}

const SECRET_PATTERNS: &[&str] = &[
    "api_key",
    "api-key",
    "apikey",
    "secret",
    "password",
    "private_key",
    "private-key",
    "bearer ",
];

pub struct DeploymentExportService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentExportService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn export(
        &self,
        deployment_id: &DeploymentId,
    ) -> Result<ExportEnvelope, DeploymentError> {
        let deployment = self.repo.fetch_deployment(deployment_id).await?;
        let revision_id = deployment
            .current_revision_id
            .clone()
            .ok_or_else(|| DeploymentError::RestoreBlocked("no revision".into()))?;
        let revision = self.repo.fetch_revision(&revision_id).await?;

        let deployment_value = serde_json::to_value(&deployment)?;
        let revision_value = serde_json::to_value(&revision)?;

        if contains_secret(&deployment_value) || contains_secret(&revision_value) {
            return Err(DeploymentError::ExportBlockedBySecret);
        }

        let body = json!({
            "deployment": deployment_value,
            "revisions": [revision_value],
        });
        let digest = hex(&sha256_jcs(&body)?);

        Ok(ExportEnvelope {
            package_version: 1,
            deployment: body["deployment"].clone(),
            revisions: vec![body["revisions"][0].clone()],
            integrity: Integrity {
                hash_algo: "sha256-jcs-rfc8785".into(),
                digest,
            },
        })
    }
}

fn contains_secret(value: &Value) -> bool {
    let serialized = value.to_string().to_lowercase();
    SECRET_PATTERNS.iter().any(|p| serialized.contains(p))
}
