use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::broadcast;

use crate::diagnostics::FailureCategory;

pub const NAMESPACE_LLAMACPP: &str = "extension.local-llm.llama.cpp";
pub const NAMESPACE_TENSORRT_LLM: &str = "extension.local-llm.tensorrt_llm";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackendEvent {
    pub event_id: String,
    pub topic: String,
    pub emitted_at: i64,
    pub backend: String,
    pub runtime_install_id: Option<String>,
    pub install_task_id: Option<String>,
    pub payload: serde_json::Value,
}

impl BackendEvent {
    pub fn new(
        topic: impl Into<String>,
        backend: impl Into<String>,
        payload: serde_json::Value,
    ) -> Self {
        Self {
            event_id: format!("evt_{}", ulid::Ulid::new()),
            topic: topic.into(),
            emitted_at: chrono::Utc::now().timestamp_millis(),
            backend: backend.into(),
            runtime_install_id: None,
            install_task_id: None,
            payload,
        }
    }

    pub fn with_task(mut self, task_id: impl Into<String>) -> Self {
        self.install_task_id = Some(task_id.into());
        self
    }

    pub fn with_install(mut self, install_id: impl Into<String>) -> Self {
        self.runtime_install_id = Some(install_id.into());
        self
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct InstallProgressPayload {
    pub phase: String,
    pub phase_index: u32,
    pub total_phases: u32,
    pub bytes_downloaded: u64,
    pub bytes_total: Option<u64>,
    pub elapsed_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstallFailedPayload {
    pub phase: String,
    pub failure_category: FailureCategory,
    pub summary: String,
    pub remediation: Vec<String>,
    pub local_package_path: Option<String>,
    pub elapsed_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LogLinePayload {
    pub source: String,
    pub runtime_id: Option<String>,
    pub deployment_id: Option<String>,
    pub severity: String,
    pub namespace: String,
    pub message: String,
}

#[async_trait]
pub trait EventPublisher: Send + Sync {
    async fn publish(&self, event: BackendEvent);
}

#[derive(Clone)]
pub struct BroadcastPublisher {
    sender: broadcast::Sender<BackendEvent>,
}

impl BroadcastPublisher {
    pub fn new(capacity: usize) -> Self {
        let (sender, _) = broadcast::channel(capacity);
        Self { sender }
    }

    pub fn subscribe(&self) -> broadcast::Receiver<BackendEvent> {
        self.sender.subscribe()
    }
}

#[async_trait]
impl EventPublisher for BroadcastPublisher {
    async fn publish(&self, event: BackendEvent) {
        let _ = self.sender.send(event);
    }
}

pub type SharedPublisher = Arc<dyn EventPublisher>;
