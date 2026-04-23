//! The [`BackendRuntimeLease`] trait + [`LeaseNotification`] struct that
//! every lease transport (stdio today, named-pipe/websocket in the future)
//! implements.

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;

use super::error::LeaseError;
use crate::generic::enums::LeaseState;
use crate::generic::ids::RuntimeLeaseId;

/// One JSON-RPC 2.0 notification emitted by a runtime worker (no
/// `id` field, no expected response). Consumers subscribe via
/// [`BackendRuntimeLease::subscribe_notifications`] and MUST tolerate
/// `RecvError::Lagged` by logging; they MUST NOT panic.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct LeaseNotification {
    /// JSON-RPC method string (e.g. `"progress"`, `"log"`).
    pub method: String,
    /// Params payload; `null` is legal and is the default when the worker
    /// omits the field.
    #[serde(default)]
    pub params: serde_json::Value,
}

/// Live handle onto one runtime lease. Send-RPC dispatches a JSON-RPC 2.0
/// request and awaits the matching response; `subscribe_notifications` hands
/// out broadcast receivers for method-style notifications.
///
/// Implementations MUST be safe to call concurrently from many tasks — the
/// framer + matchmaker handle in-flight interleaving.
#[async_trait]
pub trait BackendRuntimeLease: Send + Sync + 'static {
    fn id(&self) -> RuntimeLeaseId;

    fn state(&self) -> LeaseState;

    /// Dispatch a JSON-RPC 2.0 request. Blocks until the worker replies or
    /// the configured timeout fires. Returns the `result` field on success.
    async fn send_rpc(
        &self,
        method: &str,
        params: serde_json::Value,
    ) -> Result<serde_json::Value, LeaseError>;

    /// Subscribe to worker notifications. Lagged subscribers MUST log and
    /// continue per FR-046; backlog capacity is `NOTIFICATION_BACKLOG_CAPACITY`
    /// (see [`super::notifications`] once it lands).
    fn subscribe_notifications(&self) -> broadcast::Receiver<LeaseNotification>;

    /// Cooperative release. Moves the lease through `stopping → released`
    /// and reaps the subprocess. Idempotent — subsequent calls return Ok.
    async fn release(&self) -> Result<(), LeaseError>;
}
