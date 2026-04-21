pub mod http;

use crate::error::Result;
use crate::ids::DeploymentId;
use async_trait::async_trait;

#[async_trait]
pub trait HostDeploymentsClient: Send + Sync {
    async fn current_deployment(&self) -> Result<Option<DeploymentId>>;

    async fn known_deployments(&self) -> Result<Vec<DeploymentId>>;
}

pub use http::HttpHostDeploymentsClient;
