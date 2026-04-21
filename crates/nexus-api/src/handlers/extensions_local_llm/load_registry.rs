use std::collections::HashMap;
use std::sync::Arc;

use serde::Serialize;
use tokio::sync::RwLock;

use super::chat::ActiveModelBinding;

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
pub enum LoadState {
    Loading {
        family_id: String,
        variant_id: String,
        label: String,
    },
    Ready {
        binding: ActiveModelBinding,
        #[serde(skip_serializing_if = "Option::is_none")]
        lease_id: Option<String>,
        port: u16,
    },
    Failed {
        family_id: String,
        variant_id: String,
        reason: String,
    },
}

impl LoadState {
    pub fn phase(&self) -> &'static str {
        match self {
            LoadState::Loading { .. } => "loading",
            LoadState::Ready { .. } => "ready",
            LoadState::Failed { .. } => "failed",
        }
    }
}

#[derive(Default)]
pub struct ModelLoadRegistry {
    inner: RwLock<HashMap<String, LoadState>>,
}

impl ModelLoadRegistry {
    pub fn new() -> Arc<Self> {
        Arc::new(Self::default())
    }

    pub async fn get(&self, thread_id: &str) -> Option<LoadState> {
        self.inner.read().await.get(thread_id).cloned()
    }

    pub async fn set(&self, thread_id: impl Into<String>, state: LoadState) {
        self.inner.write().await.insert(thread_id.into(), state);
    }

    pub async fn clear(&self, thread_id: &str) -> Option<LoadState> {
        self.inner.write().await.remove(thread_id)
    }

    pub async fn ready_binding(&self, thread_id: &str) -> Option<ActiveModelBinding> {
        match self.inner.read().await.get(thread_id) {
            Some(LoadState::Ready { binding, .. }) => Some(binding.clone()),
            _ => None,
        }
    }
}
