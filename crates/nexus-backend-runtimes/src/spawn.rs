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

use std::collections::BTreeSet;
use std::sync::Mutex;

use crate::error::{BackendRuntimeError, BackendRuntimeResult};
use crate::parameter_catalog::ParameterCatalog;
use crate::reserved_policy::{validate_args, validate_env};

/// Validate a spawn request's args + env against a backend's parameter
/// catalog. Returns `Ok(())` when extension-passthrough and unknown flags
/// pass through; returns `BackendRuntimeError` naming the offending flag on
/// the first reserved-policy collision (spec 011 US4 T077).
pub fn validate_spawn_request(
    catalog: &ParameterCatalog,
    request: &SpawnRuntimeRequest,
) -> BackendRuntimeResult<()> {
    validate_args(catalog, &request.args)?;
    validate_env(catalog, &request.env)?;
    Ok(())
}

/// Process-wide allocator for host-claimed ephemeral ports (spec 011 US3 T066).
///
/// `port_hint` is advisory — callers get back whatever port the allocator
/// could claim in `[low, high]`. Released ports become reusable.
#[derive(Debug)]
pub struct PortAllocator {
    low: u16,
    high: u16,
    cursor: Mutex<u16>,
    claimed: Mutex<BTreeSet<u16>>,
}

impl PortAllocator {
    pub fn new(low: u16, high: u16) -> Self {
        assert!(low <= high && low > 0, "invalid port range");
        Self {
            low,
            high,
            cursor: Mutex::new(low),
            claimed: Mutex::new(BTreeSet::new()),
        }
    }

    pub fn ephemeral() -> Self {
        Self::new(49152, 65535)
    }

    pub fn claim(&self, hint: Option<u16>) -> Option<u16> {
        let mut claimed = self.claimed.lock().expect("PortAllocator poisoned");
        if let Some(h) = hint {
            if h >= self.low && h <= self.high && !claimed.contains(&h) {
                claimed.insert(h);
                return Some(h);
            }
        }
        let mut cursor = self.cursor.lock().expect("PortAllocator poisoned");
        let span = (self.high - self.low + 1) as u32;
        for _ in 0..span {
            let candidate = *cursor;
            *cursor = if candidate == self.high {
                self.low
            } else {
                candidate + 1
            };
            if !claimed.contains(&candidate) {
                claimed.insert(candidate);
                return Some(candidate);
            }
        }
        None
    }

    pub fn release(&self, port: u16) {
        let mut claimed = self.claimed.lock().expect("PortAllocator poisoned");
        claimed.remove(&port);
    }

    #[cfg(test)]
    pub fn is_claimed(&self, port: u16) -> bool {
        self.claimed
            .lock()
            .expect("PortAllocator poisoned")
            .contains(&port)
    }
}

/// HTTP-status-friendly view of `BackendRuntimeError` for the API handler
/// layer (spec 011 US4 T080). Returns `(status_code, error_code, message)`.
pub fn http_status_for(error: &BackendRuntimeError) -> (u16, &'static str, String) {
    match error {
        BackendRuntimeError::ReservedLaunchSetting { flag } => (
            422,
            "RESERVED_LAUNCH_SETTING",
            format!("flag {flag} is host-managed"),
        ),
        BackendRuntimeError::ManagedSpawnDisallowed { flag } => (
            422,
            "MANAGED_SPAWN_DISALLOWED",
            format!("flag {flag} is not allowed for managed spawn"),
        ),
        BackendRuntimeError::FamilyUnavailable { family, reason } => (
            404,
            "FAMILY_UNAVAILABLE",
            format!("runtime family {family} unavailable: {reason}"),
        ),
        BackendRuntimeError::RuntimeNeedsRepair(install_id) => (
            409,
            "RUNTIME_NEEDS_REPAIR",
            format!("install {install_id} requires repair"),
        ),
        _ => (500, "INTERNAL", error.to_string()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::parameter_catalog::llamacpp_catalog;

    fn req_with_args(args: Vec<String>) -> SpawnRuntimeRequest {
        SpawnRuntimeRequest {
            extension_id: "ext.test".into(),
            family: "llama.cpp".into(),
            version_req: None,
            accelerator: AcceleratorProfile::Cpu,
            args,
            env: BTreeMap::new(),
            port_hint: None,
            bind_mode: RuntimeBindMode::LoopbackOnly,
        }
    }

    #[test]
    fn validate_passes_unknown_flag_through() {
        let catalog = llamacpp_catalog().unwrap();
        let req = req_with_args(vec!["--novel-future-flag".into(), "42".into()]);
        assert!(validate_spawn_request(&catalog, &req).is_ok());
    }

    #[test]
    fn validate_rejects_host_injected_port() {
        let catalog = llamacpp_catalog().unwrap();
        let req = req_with_args(vec!["--port".into(), "9999".into()]);
        let err = validate_spawn_request(&catalog, &req).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ReservedLaunchSetting { .. }
        ));
    }

    #[test]
    fn validate_rejects_managed_spawn_disallowed() {
        let catalog = llamacpp_catalog().unwrap();
        let req = req_with_args(vec!["--help".into()]);
        let err = validate_spawn_request(&catalog, &req).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ManagedSpawnDisallowed { .. }
        ));
    }

    #[test]
    fn allocator_honors_hint_when_free() {
        let alloc = PortAllocator::new(50000, 50010);
        let p = alloc.claim(Some(50005)).unwrap();
        assert_eq!(p, 50005);
        assert!(alloc.is_claimed(50005));
    }

    #[test]
    fn allocator_skips_hint_when_taken_and_picks_next_free() {
        let alloc = PortAllocator::new(50000, 50010);
        alloc.claim(Some(50005));
        let p = alloc.claim(Some(50005)).unwrap();
        assert_ne!(p, 50005);
        assert!((50000..=50010).contains(&p));
    }

    #[test]
    fn allocator_release_makes_port_available() {
        let alloc = PortAllocator::new(50000, 50001);
        let p1 = alloc.claim(None).unwrap();
        let _p2 = alloc.claim(None).unwrap();
        assert!(alloc.claim(None).is_none(), "range exhausted");
        alloc.release(p1);
        assert_eq!(alloc.claim(Some(p1)).unwrap(), p1);
    }

    #[test]
    fn http_status_maps_each_error_variant() {
        let (status, code, _) = http_status_for(&BackendRuntimeError::ReservedLaunchSetting {
            flag: "--port".into(),
        });
        assert_eq!(status, 422);
        assert_eq!(code, "RESERVED_LAUNCH_SETTING");

        let (status, code, _) = http_status_for(&BackendRuntimeError::ManagedSpawnDisallowed {
            flag: "--help".into(),
        });
        assert_eq!(status, 422);
        assert_eq!(code, "MANAGED_SPAWN_DISALLOWED");

        let (status, code, _) = http_status_for(&BackendRuntimeError::FamilyUnavailable {
            family: "foo".into(),
            reason: "no adapter".into(),
        });
        assert_eq!(status, 404);
        assert_eq!(code, "FAMILY_UNAVAILABLE");

        let (status, code, _) =
            http_status_for(&BackendRuntimeError::RuntimeNeedsRepair("ri_x".into()));
        assert_eq!(status, 409);
        assert_eq!(code, "RUNTIME_NEEDS_REPAIR");
    }
}
