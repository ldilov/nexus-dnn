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
pub mod params;
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

    /// Spec 034 / US5 (T104) — typed wrapper for `family.list`.
    /// Dispatcher (T120 backlog) calls this once per reconciliation tick
    /// to find out which family the worker currently has loaded.
    pub async fn family_list(&self) -> Result<params::FamilyListResult> {
        self.call(
            rpc::methods::FAMILY_LIST,
            &serde_json::Map::<String, serde_json::Value>::new(),
        )
        .await
    }

    /// Spec 034 / US5 (T104) — typed wrapper for `family.switch`. Instructs
    /// the worker to unload the active weights and load ``family_id``.
    /// Errors map per contracts/rpc §family.switch (-32012 not_installed,
    /// -32013 incompatible).
    pub async fn family_switch(
        &self,
        family_id: impl Into<String>,
    ) -> Result<params::FamilySwitchResult> {
        let params = params::FamilySwitchParams {
            family_id: family_id.into(),
        };
        self.call(rpc::methods::FAMILY_SWITCH, &params).await
    }

    /// Spec 034 / US1 (T037) — typed wrapper for `voice.preprocess`.
    ///
    /// Runs the reference-audio preprocessing chain on the file at
    /// `source_artifact_abs`, writing the result to `output_artifact_abs`.
    /// Errors map to domain errors per the `-32010 / -32011` contract.
    pub async fn voice_preprocess(
        &self,
        request_id: impl Into<String>,
        source_artifact_abs: impl Into<String>,
        output_artifact_abs: impl Into<String>,
    ) -> Result<params::VoicePreprocessResult> {
        let params = params::VoicePreprocessParams {
            request_id: request_id.into(),
            source_artifact_abs: source_artifact_abs.into(),
            output_artifact_abs: output_artifact_abs.into(),
            pipeline_version: params::PreprocessingReport::default_pipeline_version().to_string(),
        };
        self.call(rpc::methods::VOICE_PREPROCESS, &params).await
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

struct LeaseSlot {
    client: Option<BackendClient>,
    last_activity: Option<std::time::Instant>,
}

impl Default for LeaseSlot {
    fn default() -> Self {
        Self {
            client: None,
            last_activity: None,
        }
    }
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
        let reuse = slot
            .client
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned();
        if let Some(existing) = reuse {
            slot.last_activity = Some(std::time::Instant::now());
            return Ok(existing);
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        slot.client = Some(client.clone());
        slot.last_activity = Some(std::time::Instant::now());
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

    /// Returns `Some(elapsed)` when a live lease exists, or `None` when no
    /// lease has been acquired. The idle-release watcher uses this to decide
    /// whether to call `stop()`.
    pub async fn idle_for(&self) -> Option<std::time::Duration> {
        let slot = self.state.lock().await;
        if slot.client.is_none() {
            return None;
        }
        slot.last_activity.map(|t| t.elapsed())
    }
}

/// A lease is serviceable iff a caller can still send RPCs through it
/// without hitting an immediate `InvalidState`. `Stopping`/`Failed`/
/// `Released` are dead ends and force a fresh spawn.
#[must_use]
const fn is_serviceable(state: LeaseState) -> bool {
    matches!(state, LeaseState::Starting | LeaseState::Ready | LeaseState::Busy)
}
