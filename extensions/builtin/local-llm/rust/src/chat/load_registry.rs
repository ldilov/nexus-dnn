//! In-memory registry tracking the load state of a model on each chat
//! thread. Migrated from the host's
//! `crates/nexus-api/src/handlers/extensions_local_llm/load_registry.rs`
//! per spec 030 CP2.

use std::collections::HashMap;
use std::sync::Arc;

use serde::Serialize;
use tokio::sync::RwLock;

use super::handlers::ActiveModelBinding;

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

    pub async fn find_ready(&self) -> Option<LoadState> {
        self.inner
            .read()
            .await
            .values()
            .find(|state| matches!(state, LoadState::Ready { .. }))
            .cloned()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::chat::handlers::ActiveModelBinding;

    fn ready_state(family: &str) -> LoadState {
        LoadState::Ready {
            binding: ActiveModelBinding {
                family_id: family.to_string(),
                variant_id: "v1".to_string(),
                artifact_id: format!("{family}-artifact"),
                absolute_path: "/tmp/model.gguf".to_string(),
                label: format!("{family} label"),
            },
            lease_id: None,
            port: 8080,
        }
    }

    fn loading_state(family: &str) -> LoadState {
        LoadState::Loading {
            family_id: family.to_string(),
            variant_id: "v1".to_string(),
            label: format!("{family} label"),
        }
    }

    fn failed_state(family: &str) -> LoadState {
        LoadState::Failed {
            family_id: family.to_string(),
            variant_id: "v1".to_string(),
            reason: "bad".to_string(),
        }
    }

    #[tokio::test]
    async fn find_ready_returns_none_when_empty() {
        let registry = ModelLoadRegistry::new();
        assert!(registry.find_ready().await.is_none());
    }

    #[tokio::test]
    async fn find_ready_returns_first_ready_entry() {
        let registry = ModelLoadRegistry::new();
        registry.set("thread-loading", loading_state("alpha")).await;
        registry.set("thread-ready", ready_state("beta")).await;

        let found = registry.find_ready().await.expect("should find a ready entry");
        match found {
            LoadState::Ready { binding, .. } => {
                assert_eq!(binding.family_id, "beta");
            }
            other => panic!("expected Ready, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn find_ready_skips_failed_and_idle() {
        let registry = ModelLoadRegistry::new();
        registry.set("thread-failed", failed_state("alpha")).await;
        registry.set("thread-loading", loading_state("beta")).await;
        assert!(registry.find_ready().await.is_none());
    }
}
