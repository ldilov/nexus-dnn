use std::collections::HashMap;
use std::sync::Arc;

use async_trait::async_trait;
use emotion_tts_extension::domain::RuntimeLeaseId;
use emotion_tts_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
};
use futures::stream::{self, StreamExt};
use serde_json::Value;
use tokio::sync::Mutex;

pub type MockHandler = Arc<dyn Fn(Value) -> Result<Value, LeaseError> + Send + Sync>;

pub struct MockBackendRuntimeLease {
    id: RuntimeLeaseId,
    state: Mutex<LeaseState>,
    handlers: HashMap<String, MockHandler>,
    notifications: Mutex<Vec<NotificationEnvelope>>,
}

impl MockBackendRuntimeLease {
    #[must_use]
    pub fn new() -> Self {
        Self {
            id: RuntimeLeaseId::new(),
            state: Mutex::new(LeaseState::Ready),
            handlers: HashMap::new(),
            notifications: Mutex::new(Vec::new()),
        }
    }

    pub fn set_handler(
        &mut self,
        method: impl Into<String>,
        handler: impl Fn(Value) -> Result<Value, LeaseError> + Send + Sync + 'static,
    ) {
        self.handlers.insert(method.into(), Arc::new(handler));
    }

    #[allow(dead_code)]
    pub async fn push_notification(&self, env: NotificationEnvelope) {
        self.notifications.lock().await.push(env);
    }
}

impl Default for MockBackendRuntimeLease {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl BackendRuntimeLease for MockBackendRuntimeLease {
    fn id(&self) -> RuntimeLeaseId {
        self.id.clone()
    }

    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }

    async fn send_rpc(&self, method: &str, params: Value) -> Result<Value, LeaseError> {
        match self.handlers.get(method) {
            Some(h) => h(params),
            None => Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {method}"),
            }),
        }
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        let pending = self.notifications.lock().await.clone();
        stream::iter(pending).boxed()
    }

    async fn release(&self) -> Result<(), LeaseError> {
        *self.state.lock().await = LeaseState::Released;
        Ok(())
    }
}
