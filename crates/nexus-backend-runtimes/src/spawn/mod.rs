mod host_env;
mod port;
mod supervise;

pub use host_env::build_host_env;
pub use port::{PortAllocator, RuntimeBindMode};

use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

use crate::channel::RuntimeChannelDescriptor;
use crate::lease::RuntimeLease;
use crate::settings::AcceleratorProfile;

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
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub install_id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SpawnRuntimeResponse {
    pub lease: RuntimeLease,
    pub channel: RuntimeChannelDescriptor,
    pub progress_channel: String,
}

use std::collections::BTreeSet;

use crate::error::{BackendRuntimeError, BackendRuntimeResult};
use crate::parameter_catalog::ParameterCatalog;
use crate::reserved_policy::{validate_args, validate_env};

/// Validate a spawn request's args + env against a backend's parameter
/// catalog. Returns `Ok(())` when extension-passthrough and unknown flags
/// pass through; returns `BackendRuntimeError` naming the offending flag on
pub fn validate_spawn_request(
    catalog: &ParameterCatalog,
    request: &SpawnRuntimeRequest,
) -> BackendRuntimeResult<()> {
    validate_args(catalog, &request.args)?;
    validate_env(catalog, &request.env)?;
    Ok(())
}

///
/// HTTP-status-friendly view of `BackendRuntimeError` for the API handler
///
/// variant MUST be a compile error until a status mapping is added here.
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
        BackendRuntimeError::HostGovernedDenied { flag } => (
            422,
            "HOST_GOVERNED_DENIED",
            format!("host-governed flag {flag} cannot be passed via raw argv/env"),
        ),
        BackendRuntimeError::FamilyUnavailable { family, reason } => (
            404,
            "FAMILY_UNAVAILABLE",
            format!("runtime family {family} unavailable: {reason}"),
        ),
        BackendRuntimeError::FamilyUnknown(family) => (
            404,
            "FAMILY_UNKNOWN",
            format!("runtime family {family} is not registered"),
        ),
        BackendRuntimeError::InstallNotFound(install_id) => (
            404,
            "INSTALL_NOT_FOUND",
            format!("install {install_id} not found"),
        ),
        BackendRuntimeError::InstallAlreadyExists { install_id } => (
            409,
            "INSTALL_ALREADY_EXISTS",
            format!("install {install_id} already exists"),
        ),
        BackendRuntimeError::RuntimeNeedsRepair(install_id) => (
            409,
            "RUNTIME_NEEDS_REPAIR",
            format!("install {install_id} requires repair"),
        ),
        BackendRuntimeError::IllegalTransition { from, to } => (
            409,
            "ILLEGAL_TRANSITION",
            format!("illegal state transition {from} -> {to}"),
        ),
        BackendRuntimeError::LeaseNotOwned { lease_id, .. } => (
            403,
            "LEASE_NOT_OWNED",
            format!("lease {lease_id} is owned by another extension"),
        ),
        BackendRuntimeError::DependencyUnmet { family, .. } => (
            409,
            "DEPENDENCY_UNMET",
            format!("dependency unmet for family {family}"),
        ),
        BackendRuntimeError::NoPortAvailable => (
            503,
            "NO_PORT_AVAILABLE",
            "ephemeral port range exhausted".to_string(),
        ),
        BackendRuntimeError::Storage(msg) => (500, "STORAGE_ERROR", msg.clone()),
        BackendRuntimeError::Io(err) => (500, "IO_ERROR", err.to_string()),
        BackendRuntimeError::Internal(msg) => (500, "INTERNAL", msg.clone()),
    }
}

/// Merge base env + extension env + host-managed env, with host always winning
/// `LLAMA_ARG_PORT`, and `LLAMA_ARG_LOG_FORMAT` so extension overrides cannot
/// subvert bind-mode policy, port allocation, or structured-log framing.
use std::collections::HashMap;
use std::sync::Arc;

use sqlx::SqlitePool;
use tokio::sync::RwLock;
use tokio::task::JoinHandle;

use crate::adapter::AdapterRegistry;
use crate::channel::{
    ApiDialect, ChannelBuildCtx, RuntimeAddress, RuntimeChannelKind, RuntimeEndpoint,
};
use crate::events::SharedPublisher;
use crate::manifest::install::{InstallManifest, InstallStatus};
use crate::runtime_installs_store;

/// Live runtime lease handle held in memory while the child is alive.
pub struct LeaseHandle {
    pub lease_id: String,
    pub port: u16,
    pub supervisor: tokio::sync::Mutex<Option<JoinHandle<()>>>,
    pub lease: Arc<RwLock<RuntimeLease>>,
    pub shutdown: Arc<tokio::sync::Notify>,
}

/// `Option<pool> + Option<adapters>` pair with an explicit type-level
/// distinction. `publisher` stays on the `Spawner` because both modes
pub enum SpawnMode {
    Stub {
        port_allocator: Arc<PortAllocator>,
    },
    Real {
        pool: SqlitePool,
        adapters: Arc<AdapterRegistry>,
        port_allocator: Arc<PortAllocator>,
    },
}

///
/// Two constructors are provided:
/// - [`Spawner::new`] — test-oriented: publisher-only, HTTP-probe driven.
///   Uses a stub `SpawnMode::Stub` that does not fork a real child.
/// - [`Spawner::with_pool`] — production path carrying a database pool,
///   adapter registry, and port allocator (`SpawnMode::Real`).
pub struct Spawner {
    publisher: SharedPublisher,
    leases: Arc<tokio::sync::Mutex<HashMap<String, Arc<LeaseHandle>>>>,
    mode: SpawnMode,
}

impl Spawner {
    /// Minimal test/stub constructor (`SpawnMode::Stub`). The produced spawner
    /// drives events off a TCP probe against the bound `port_hint` without
    /// forking a child.
    pub fn new(publisher: SharedPublisher) -> Self {
        Self {
            publisher,
            leases: Arc::new(tokio::sync::Mutex::new(HashMap::new())),
            mode: SpawnMode::Stub {
                port_allocator: Arc::new(PortAllocator::ephemeral()),
            },
        }
    }

    /// Production path constructor (`SpawnMode::Real`): carries a SQLite pool
    pub fn with_pool(
        publisher: SharedPublisher,
        pool: SqlitePool,
        adapters: Arc<AdapterRegistry>,
    ) -> Self {
        Self {
            publisher,
            leases: Arc::new(tokio::sync::Mutex::new(HashMap::new())),
            mode: SpawnMode::Real {
                pool,
                adapters,
                port_allocator: Arc::new(PortAllocator::ephemeral()),
            },
        }
    }

    /// Fetch a snapshot of the lease state by id.
    pub async fn lease_state(&self, lease_id: &str) -> Option<RuntimeLease> {
        let guard = self.leases.lock().await;
        let handle = guard.get(lease_id)?.clone();
        drop(guard);
        let lease = handle.lease.read().await;
        Some(lease.clone())
    }

    /// Spawn a runtime for the given request.
    ///
    /// In the test-oriented path this probes `port_hint` via HTTP `/health`,
    /// emits `process.started` immediately, `channel.ready` after two
    /// consecutive 200 responses, and `process.exited` once the endpoint
    /// stops responding after it had become ready.
    pub async fn spawn(
        &self,
        request: SpawnRuntimeRequest,
    ) -> Result<RuntimeLease, BackendRuntimeError> {
        match self.mode {
            SpawnMode::Real { .. } => self.spawn_real(request).await,
            SpawnMode::Stub { .. } => self.spawn_stub(request).await,
        }
    }

    ///
    /// Returns `Ok(None)` when no row exists. Callers compare against the
    /// caller's `X-Extension-Id` to enforce ownership before
    /// [`Self::shutdown`].
    pub async fn lookup_lease_owner(
        &self,
        lease_id: &str,
    ) -> Result<Option<String>, BackendRuntimeError> {
        if let SpawnMode::Real { pool, .. } = &self.mode {
            let row =
                sqlx::query("SELECT extension_id FROM host_runtime_leases WHERE lease_id = $1")
                    .bind(lease_id)
                    .fetch_optional(pool)
                    .await?;
            if let Some(row) = row {
                use sqlx::Row;
                let owner: String = row
                    .try_get("extension_id")
                    .map_err(|e| BackendRuntimeError::Storage(e.to_string()))?;
                return Ok(Some(owner));
            }
        }
        let guard = self.leases.lock().await;
        let Some(handle) = guard.get(lease_id).cloned() else {
            return Ok(None);
        };
        drop(guard);
        let lease = handle.lease.read().await;
        Ok(Some(lease.extension_id.clone()))
    }

    /// Gracefully stop a running lease.
    ///
    /// Idempotent: returns `Ok(())` if the lease is unknown. Signals the
    /// supervisor, which drives a SIGTERM plus 10s grace window before a
    /// bounded by grace + force.
    pub async fn shutdown(&self, lease_id: &str) -> Result<(), BackendRuntimeError> {
        let handle = {
            let mut guard = self.leases.lock().await;
            guard.remove(lease_id)
        };
        let Some(handle) = handle else {
            return Ok(());
        };
        handle.shutdown.notify_waiters();
        let sup = handle.supervisor.lock().await.take();
        if let Some(sup) = sup {
            let bounded = tokio::time::timeout(std::time::Duration::from_secs(11), sup).await;
            if bounded.is_err() {
                tracing::warn!(lease_id = %lease_id, "supervisor did not drain within 10s grace + 1s slack");
            }
        }
        Ok(())
    }

    /// Return the lease ids currently bound to the given install.
    ///
    /// Reads the live in-memory map when present (test mode) and augments
    /// with the un-released lease rows from `host_runtime_leases` when a
    /// pool is configured (production).
    pub async fn list_live_leases_for_install(&self, install_id: &str) -> Vec<String> {
        let mut out = self.collect_memory_leases(install_id).await;
        if let SpawnMode::Real { pool, .. } = &self.mode {
            out.extend(query_unreleased_leases(pool, install_id).await);
        }
        dedup_preserve_order(&out)
    }

    async fn collect_memory_leases(&self, install_id: &str) -> Vec<String> {
        let guard = self.leases.lock().await;
        let mut out = Vec::new();
        for (lease_id, handle) in guard.iter() {
            let lease = handle.lease.read().await;
            if lease.install_id == install_id && lease.released_at.is_none() {
                out.push(lease_id.clone());
            }
        }
        out
    }

    /// the spawner was constructed with [`Self::with_pool`]. Looks up the
    /// install row, runs reserved-policy validation against the family's
    /// parameter catalog, claims a host port, invokes the adapter's
    /// `launch_spec`, forks the child with host-owned env, inserts the lease
    /// row, and starts a supervisor task that emits `process.started`,
    /// `channel.ready`, and `process.exited` events while mirroring state
    /// into `host_runtime_leases`.
    /// Builds a channel descriptor for the given request.
    pub fn build_descriptor(ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor {
        RuntimeChannelDescriptor {
            kind: RuntimeChannelKind::HttpTcp,
            api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
            address: RuntimeAddress::Tcp {
                host: ctx.bind_host.clone(),
                port: ctx.port,
            },
            health: Some(RuntimeEndpoint::path("/health")),
            metrics: ctx
                .metrics_enabled
                .then(|| RuntimeEndpoint::path("/metrics")),
            ready: false,
        }
    }
}

mod real;
mod stub;

fn bind_host_for(mode: RuntimeBindMode) -> String {
    match mode {
        RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1".to_string(),
        _ => "0.0.0.0".to_string(),
    }
}

fn dedup_preserve_order(items: &[String]) -> Vec<String> {
    let mut seen: BTreeSet<&str> = BTreeSet::new();
    let mut out = Vec::with_capacity(items.len());
    for item in items {
        if seen.insert(item.as_str()) {
            out.push(item.clone());
        }
    }
    out
}

async fn query_unreleased_leases(pool: &SqlitePool, install_id: &str) -> Vec<String> {
    use sqlx::Row;
    let rows = sqlx::query(
        "SELECT lease_id FROM host_runtime_leases \
         WHERE install_id = $1 AND released_at IS NULL",
    )
    .bind(install_id)
    .fetch_all(pool)
    .await;
    match rows {
        Ok(rows) => rows
            .into_iter()
            .filter_map(|r| r.try_get::<String, _>("lease_id").ok())
            .collect(),
        Err(_) => Vec::new(),
    }
}

pub(super) fn row_to_install_manifest(
    row: &runtime_installs_store::RuntimeInstallRow,
) -> InstallManifest {
    let binary_path = serde_json::from_str::<Vec<String>>(&row.binary_paths)
        .ok()
        .and_then(|v| v.into_iter().next())
        .unwrap_or_default();
    let accel = match row.accelerator.as_str() {
        "cuda12" => AcceleratorProfile::Cuda12,
        "cuda13" => AcceleratorProfile::Cuda13,
        _ => AcceleratorProfile::Cpu,
    };
    InstallManifest {
        runtime_install_id: row.install_id.clone(),
        backend: row.family.clone(),
        release_id: row.version.clone(),
        platform: String::new(),
        accelerator_profile: accel,
        source_url: row.source_url.clone().unwrap_or_default(),
        checksum_sha256: row.checksum.clone(),
        install_path: row.install_root.clone(),
        binary_path,
        status: InstallStatus::Ready,
        installed_at: 0,
        validated_at: None,
        last_failure_category: row.last_failure_category.clone(),
    }
}

#[cfg(test)]
mod tests;
