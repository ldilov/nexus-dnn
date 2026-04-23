//! Host-side handshake driver (T078). Sends the handshake RPC per
//! `contracts/rpc/handshake.md` and validates the worker's
//! `protocol_version`. Also surfaces `accepts_methods` +
//! `notification_methods` so the caller can record them on the lease
//! row for observability.

use std::time::Duration;

use serde::Deserialize;

use super::error::LeaseError;
use super::trait_def::BackendRuntimeLease;

/// Handshake envelope must complete within this window per FR-045.
/// Module-level const — the single source of truth; never inline at
/// call sites.
pub const HANDSHAKE_TIMEOUT: Duration = Duration::from_secs(60);

/// Protocol version the host speaks. Bumping this is a wire-breaking
/// change — coordinate with every worker implementation simultaneously.
pub const HOST_PROTOCOL_VERSION: &str = "1.0";

#[derive(Debug, Clone, Deserialize)]
pub struct HandshakeInfo {
    pub protocol_version: String,
    pub worker_version: String,
    #[serde(default)]
    pub accepts_methods: Vec<String>,
    #[serde(default)]
    pub notification_methods: Vec<String>,
}

/// Run the handshake against a freshly-spawned lease. On success the
/// caller flips the lease state to `Ready` and records the handshake
/// info on the lease row. On timeout or protocol mismatch, returns
/// the appropriate [`LeaseError`] so the caller can release the lease.
pub async fn do_handshake(lease: &dyn BackendRuntimeLease) -> Result<HandshakeInfo, LeaseError> {
    let response = tokio::time::timeout(
        HANDSHAKE_TIMEOUT,
        lease.send_rpc("handshake", serde_json::Value::Null),
    )
    .await
    .map_err(|_| LeaseError::Timeout)??;

    let info: HandshakeInfo = serde_json::from_value(response)
        .map_err(|e| LeaseError::Internal(format!("handshake decode: {e}")))?;

    if info.protocol_version != HOST_PROTOCOL_VERSION {
        return Err(LeaseError::Internal(format!(
            "protocol version mismatch: host speaks `{HOST_PROTOCOL_VERSION}`, worker speaks `{}`",
            info.protocol_version
        )));
    }
    Ok(info)
}
