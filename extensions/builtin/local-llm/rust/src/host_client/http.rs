use super::HostDeploymentsClient;
use crate::error::{ChatHistoryError, Result};
use crate::ids::DeploymentId;
use async_trait::async_trait;
use serde::Deserialize;

pub struct HttpHostDeploymentsClient {
    base_url: String,
    http: reqwest::Client,
}

impl HttpHostDeploymentsClient {
    pub fn new(base_url: impl Into<String>) -> Self {
        Self {
            base_url: base_url.into(),
            http: reqwest::Client::new(),
        }
    }

    pub fn with_client(base_url: impl Into<String>, http: reqwest::Client) -> Self {
        Self {
            base_url: base_url.into(),
            http,
        }
    }
}

#[derive(Debug, Deserialize)]
struct DeploymentRecord {
    id: String,
    #[serde(default)]
    state: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum DeploymentListResponse {
    Wrapped { deployments: Vec<DeploymentRecord> },
    Flat(Vec<DeploymentRecord>),
}

impl DeploymentListResponse {
    fn into_records(self) -> Vec<DeploymentRecord> {
        match self {
            DeploymentListResponse::Wrapped { deployments } => deployments,
            DeploymentListResponse::Flat(list) => list,
        }
    }
}

#[async_trait]
impl HostDeploymentsClient for HttpHostDeploymentsClient {
    async fn current_deployment(&self) -> Result<Option<DeploymentId>> {
        let url = format!("{}/api/v1/deployments", self.base_url.trim_end_matches('/'));
        let resp = self
            .http
            .get(&url)
            .send()
            .await
            .map_err(|e| ChatHistoryError::HostClient(e.to_string()))?;

        if !resp.status().is_success() {
            return Ok(None);
        }

        let records = resp
            .json::<DeploymentListResponse>()
            .await
            .map_err(|e| ChatHistoryError::HostClient(e.to_string()))?
            .into_records();

        let current = records.into_iter().find(|r| {
            r.state
                .as_deref()
                .map(|s| matches!(s, "active" | "running" | "bound" | "ready"))
                .unwrap_or(false)
        });
        Ok(current.map(|r| DeploymentId::new(r.id)))
    }

    async fn known_deployments(&self) -> Result<Vec<DeploymentId>> {
        let url = format!("{}/api/v1/deployments", self.base_url.trim_end_matches('/'));
        let resp = self
            .http
            .get(&url)
            .send()
            .await
            .map_err(|e| ChatHistoryError::HostClient(e.to_string()))?;

        if !resp.status().is_success() {
            return Ok(Vec::new());
        }

        let records = resp
            .json::<DeploymentListResponse>()
            .await
            .map_err(|e| ChatHistoryError::HostClient(e.to_string()))?
            .into_records();

        Ok(records
            .into_iter()
            .map(|r| DeploymentId::new(r.id))
            .collect())
    }
}
