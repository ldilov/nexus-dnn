//! Spawn request shape.
//!
//! The actual `Spawner` implementation lands in Phase 5 (US3); this module
//! defines only the request/response types so that `ReservedPolicy` and the
//! handler scaffolding can compile in Phase 2.

use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

use crate::channel::RuntimeChannelDescriptor;
use crate::lease::RuntimeLease;
use crate::settings::AcceleratorProfile;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RuntimeBindMode {
    Loopback,
    LoopbackOnly,
    UnixSocket,
    Any,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SpawnRuntimeRequest {
    pub extension_id: String,
    pub family: String,
    pub version_req: Option<String>,
    pub accelerator: AcceleratorProfile,
    #[serde(default)]
    pub args: Vec<String>,
    #[serde(default)]
    pub env: BTreeMap<String, String>,
    pub port_hint: Option<u16>,
    pub bind_mode: RuntimeBindMode,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SpawnRuntimeResponse {
    pub lease: RuntimeLease,
    pub channel: RuntimeChannelDescriptor,
    pub progress_channel: String,
}
