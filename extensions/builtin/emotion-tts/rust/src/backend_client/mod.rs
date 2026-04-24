//! Typed client on top of a host-issued [`BackendRuntimeLease`].
//!
//! The extension never frames bytes or owns a subprocess directly —
//! the host's lease abstracts that. This module provides:
//!
//! * [`BackendClient`] — wraps a shared lease, offers typed request builders.
//! * [`LeaseProvider`] — lazy acquisition/release shim around a pluggable
//!   factory so the extension can drive the Q1 stay-warm-until-Stop lifecycle.
//! * [`rpc`] — JSON-RPC method/params shapes + error mapping.
//! * [`notifications`] — broadcast fan-out over the lease notification stream.

pub mod notifications;
pub mod rpc;

use std::sync::Arc;

use async_trait::async_trait;
use tokio::sync::Mutex;

use crate::host_contract::{LeaseState, SharedLease};
use crate::domain::{EmotionTtsError, Result};

#[derive(Clone)]
pub struct BackendClient {
    lease: SharedLease,
    fanout: Arc<notifications::NotificationFanout>,
}

impl BackendClient {
    #[must_use]
    pub fn new(lease: SharedLease) -> Self {
        let fanout = Arc::new(notifications::NotificationFanout::new());
        Self { lease, fanout }
    }

    #[must_use]
    pub fn lease(&self) -> &SharedLease {
        &self.lease
    }

    #[must_use]
    pub fn notifications(&self) -> &Arc<notifications::NotificationFanout> {
        &self.fanout
    }

    pub async fn call<P: serde::Serialize, R: serde::de::DeserializeOwned>(
        &self,
        method: &str,
        params: &P,
    ) -> Result<R> {
        let json_params = serde_json::to_value(params)?;
        let response = self
            .lease
            .send_rpc(method, json_params)
            .await
            .map_err(rpc::lease_error_to_domain)?;
        serde_json::from_value::<R>(response)
            .map_err(|err| EmotionTtsError::internal(format!("decode response for {method}: {err}")))
    }
}

/// Factory contract the host implements to mint new leases on demand.
///
/// Kept as a trait so the extension can test against a mock (see
/// `rust/tests/fixtures/mock_backend.rs`) without importing the host's
/// concrete `backend-runtime-installs` crate (Principle XIII).
#[async_trait]
pub trait LeaseFactory: Send + Sync {
    async fn acquire(&self) -> Result<SharedLease>;
}

/// Lazy lease holder implementing the Q1 lifecycle: acquire once on first
/// task, stay warm until explicit stop, never auto-release.
pub struct LeaseProvider {
    factory: Arc<dyn LeaseFactory>,
    state: Mutex<LeaseSlot>,
}

#[derive(Default)]
struct LeaseSlot {
    client: Option<BackendClient>,
}

impl LeaseProvider {
    #[must_use]
    pub fn new(factory: Arc<dyn LeaseFactory>) -> Self {
        Self {
            factory,
            state: Mutex::new(LeaseSlot::default()),
        }
    }

    pub async fn spawn_if_needed(&self) -> Result<BackendClient> {
        let mut slot = self.state.lock().await;
        if let Some(existing) = &slot.client {
            if is_serviceable(existing.lease().state()) {
                return Ok(existing.clone());
            }
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        slot.client = Some(client.clone());
        Ok(client)
    }

    pub async fn current(&self) -> Option<BackendClient> {
        self.state.lock().await.client.clone()
    }

    pub async fn stop(&self) -> Result<()> {
        let mut slot = self.state.lock().await;
        if let Some(client) = slot.client.take() {
            client
                .lease()
                .release()
                .await
                .map_err(rpc::lease_error_to_domain)?;
        }
        Ok(())
    }

    pub async fn restart(&self) -> Result<BackendClient> {
        self.stop().await?;
        self.spawn_if_needed().await
    }
}

/// A lease is serviceable iff a caller can still send RPCs through it
/// without hitting an immediate `InvalidState`. `Stopping`/`Failed`/
/// `Released` are dead ends and force a fresh spawn.
#[must_use]
const fn is_serviceable(state: LeaseState) -> bool {
    matches!(state, LeaseState::Starting | LeaseState::Ready | LeaseState::Busy)
}
