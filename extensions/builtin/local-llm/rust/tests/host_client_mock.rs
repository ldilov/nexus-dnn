use async_trait::async_trait;
use nexus_local_llm_chat_history::error::Result;
use nexus_local_llm_chat_history::host_client::HostDeploymentsClient;
use nexus_local_llm_chat_history::ids::DeploymentId;
use std::sync::{Arc, Mutex};

pub struct MockHostDeploymentsClient {
    state: Arc<Mutex<MockState>>,
}

#[derive(Default, Clone)]
struct MockState {
    current: Option<DeploymentId>,
    known: Vec<DeploymentId>,
}

impl MockHostDeploymentsClient {
    pub fn new() -> Self {
        Self {
            state: Arc::new(Mutex::new(MockState::default())),
        }
    }

    pub fn set_current(&self, current: Option<DeploymentId>) {
        self.state.lock().expect("mock state poisoned").current = current;
    }

    pub fn set_known(&self, known: Vec<DeploymentId>) {
        self.state.lock().expect("mock state poisoned").known = known;
    }
}

impl Default for MockHostDeploymentsClient {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl HostDeploymentsClient for MockHostDeploymentsClient {
    async fn current_deployment(&self) -> Result<Option<DeploymentId>> {
        Ok(self
            .state
            .lock()
            .expect("mock state poisoned")
            .current
            .clone())
    }

    async fn known_deployments(&self) -> Result<Vec<DeploymentId>> {
        Ok(self
            .state
            .lock()
            .expect("mock state poisoned")
            .known
            .clone())
    }
}

#[tokio::test]
async fn mock_returns_configured_current() {
    let mock = MockHostDeploymentsClient::new();
    assert_eq!(mock.current_deployment().await.unwrap(), None);
    mock.set_current(Some(DeploymentId::new("deploy-42")));
    assert_eq!(
        mock.current_deployment().await.unwrap(),
        Some(DeploymentId::new("deploy-42"))
    );
}

#[tokio::test]
async fn mock_returns_configured_known_set() {
    let mock = MockHostDeploymentsClient::new();
    assert!(mock.known_deployments().await.unwrap().is_empty());
    mock.set_known(vec![DeploymentId::new("a"), DeploymentId::new("b")]);
    let known = mock.known_deployments().await.unwrap();
    assert_eq!(known.len(), 2);
}
