//! Runtime leases.
//!
//! A lease is an extension-scoped claim over a running runtime process.
//! The host owns the process lifecycle; the extension owns the request
//! semantics. Leases are persisted to `host_runtime_leases` but always
//! marked released on host startup (no live process survives a restart).

use serde::{Deserialize, Serialize};

use crate::channel::RuntimeChannelDescriptor;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeLease {
    pub lease_id: String,
    pub install_id: String,
    pub extension_id: String,
    pub pid: Option<u32>,
    pub log_channel_id: String,
    pub channel: RuntimeChannelDescriptor,
    pub created_at: String,
    pub released_at: Option<String>,
}

impl RuntimeLease {
    pub fn is_live(&self) -> bool {
        self.released_at.is_none()
    }
}
