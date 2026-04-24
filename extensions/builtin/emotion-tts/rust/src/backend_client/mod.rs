//! Typed client on top of a host-issued [`BackendRuntimeLease`].
//!
//! The extension never frames bytes or owns a subprocess directly —
//! the host's lease abstracts that. This module provides:
//!
//! * [`BackendClient`] — wraps a shared lease, offers typed request builders.
//! * [`rpc`] — JSON-RPC method/params shapes + error mapping.
//! * [`notifications`] — broadcast fan-out over the lease notification stream.

pub mod notifications;
pub mod rpc;

use std::sync::Arc;

use crate::host_contract::SharedLease;
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
