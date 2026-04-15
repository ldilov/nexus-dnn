//! Spawner orchestrator + spawn pipeline.
//!
//! Submodules per spec 015 US1: `port`, `host_env`, `supervise`.
//! Real-mode spawn lives here for now (split into `real`/`stub` arrives in
//! Phase 6 method-split).

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

use self::host_env::load_host_governed_injections;
use self::port::PortLease;
use self::supervise::{SupervisorCtx, supervise_real};

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
        BackendRuntimeError::RuntimeNeedsRepair(install_id) => (
            409,
            "RUNTIME_NEEDS_REPAIR",
            format!("install {install_id} requires repair"),
        ),
        BackendRuntimeError::LeaseNotOwned { lease_id, .. } => (
            403,
            "LEASE_NOT_OWNED",
            format!("lease {lease_id} is owned by another extension"),
        ),
        BackendRuntimeError::NoPortAvailable => (
            503,
            "NO_PORT_AVAILABLE",
            "ephemeral port range exhausted".to_string(),
        ),
        _ => (500, "INTERNAL", error.to_string()),
    }
}

/// Merge base env + extension env + host-managed env, with host always winning
/// (spec 011 US4 T079). The host forcibly stamps `LLAMA_ARG_HOST`,
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
use crate::events::{BackendEvent, SharedPublisher};
use crate::installs_store;
use crate::manifest::install::{InstallManifest, InstallStatus};

/// Live runtime lease handle held in memory while the child is alive.
pub struct LeaseHandle {
    pub lease_id: String,
    pub port: u16,
    pub supervisor: tokio::sync::Mutex<Option<JoinHandle<()>>>,
    pub lease: Arc<RwLock<RuntimeLease>>,
    pub shutdown: Arc<tokio::sync::Notify>,
}

/// Spawn-mode discriminator (spec 015 US3). Replaces the implicit
/// `Option<pool> + Option<adapters>` pair with an explicit type-level
/// distinction. `publisher` stays on the `Spawner` because both modes
/// share the same broadcast (single-owner clarity per spec FR-304).
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

/// Host-owned process spawner (spec 011 US3 T067; spec 015 US3 added `SpawnMode`).
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
    /// and an [`AdapterRegistry`] for real-fork spawns (spec 011 US3 T067).
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

    async fn spawn_stub(
        &self,
        request: SpawnRuntimeRequest,
    ) -> Result<RuntimeLease, BackendRuntimeError> {
        let port = request.port_hint.ok_or_else(|| {
            BackendRuntimeError::Internal("port_hint required in test mode".into())
        })?;
        let bind_host = bind_host_for(request.bind_mode);
        let lease_id = format!("lease_{}", ulid::Ulid::new());
        let lease = build_test_lease(&request, port, &bind_host, &lease_id);
        let lease_arc = Arc::new(RwLock::new(lease.clone()));
        let shutdown = Arc::new(tokio::sync::Notify::new());

        let handle = Arc::new(LeaseHandle {
            lease_id: lease_id.clone(),
            port,
            supervisor: tokio::sync::Mutex::new(None),
            lease: lease_arc.clone(),
            shutdown: shutdown.clone(),
        });
        self.leases
            .lock()
            .await
            .insert(lease_id.clone(), handle.clone());

        emit_test_started(&self.publisher, &request, &lease_id, port, &bind_host).await;
        let supervisor = spawn_test_supervisor(
            self.publisher.clone(),
            lease_arc,
            shutdown,
            lease_id,
            request.family.clone(),
            bind_host,
            port,
        );
        *handle.supervisor.lock().await = Some(supervisor);
        Ok(lease)
    }

    /// Look up the lease row's owning extension id (spec 011 US3 T100).
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
    /// force kill (spec 012 US6 T276b). The call awaits supervisor drain
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

    /// Production real-fork spawn path (spec 011 US3 T067). Invoked only when
    /// the spawner was constructed with [`Self::with_pool`]. Looks up the
    /// install row, runs reserved-policy validation against the family's
    /// parameter catalog, claims a host port, invokes the adapter's
    /// `launch_spec`, forks the child with host-owned env, inserts the lease
    /// row, and starts a supervisor task that emits `process.started`,
    /// `channel.ready`, and `process.exited` events while mirroring state
    /// into `host_runtime_leases`.
    async fn spawn_real(
        &self,
        request: SpawnRuntimeRequest,
    ) -> Result<RuntimeLease, BackendRuntimeError> {
        let (pool, adapters, port_allocator) = match &self.mode {
            SpawnMode::Real {
                pool,
                adapters,
                port_allocator,
            } => (pool, adapters, port_allocator),
            SpawnMode::Stub { .. } => {
                return Err(BackendRuntimeError::Internal(
                    "spawn_real called on stub Spawner".into(),
                ));
            }
        };
        let row = resolve_install_row(pool, &request).await?;
        validate_install_row(&row, &request.family)?;
        let adapter =
            adapters
                .get(&row.family)
                .ok_or_else(|| BackendRuntimeError::FamilyUnavailable {
                    family: row.family.clone(),
                    reason: "adapter not registered".into(),
                })?;
        let install_manifest = row_to_install_manifest(&row);
        let catalog = crate::parameter_catalog::catalog_for(&row.family)?;
        validate_spawn_request(&catalog, &request)?;
        let port = port_allocator
            .claim(request.port_hint)
            .ok_or(BackendRuntimeError::NoPortAvailable)?;
        let launch = adapter
            .launch_spec(&install_manifest, &request)
            .await
            .map_err(|e| BackendRuntimeError::Internal(format!("launch_spec: {e}")))?;
        let host_governed_args = load_host_governed_injections(pool, &row.family).await;
        let host_env = build_host_env(&launch.base_env, &request.env, request.bind_mode, port);
        let bind_host = bind_host_for(request.bind_mode);
        let mut child = fork_child(
            &launch,
            &host_governed_args,
            &request,
            &host_env,
            port_allocator,
            port,
        )?;
        let pid = child.id();
        let lease_id = format!("lease_{}", ulid::Ulid::new());
        let now = chrono::Utc::now().to_rfc3339();
        let descriptor = build_real_descriptor(&adapter, &bind_host, port);
        insert_lease_row(
            pool,
            &lease_id,
            &row,
            &request,
            pid,
            port,
            &descriptor,
            &now,
        )
        .await?;
        let lease = build_real_lease(&lease_id, &row, &request, pid, &descriptor, &now);
        let lease_arc = Arc::new(RwLock::new(lease.clone()));
        let shutdown = Arc::new(tokio::sync::Notify::new());
        let handle = self
            .register_handle(&lease_id, port, &lease_arc, &shutdown)
            .await;
        self.publish_started(&request, &lease_id, port, pid).await;
        spawn_stream_drainers(&mut child);
        let supervisor = tokio::spawn(supervise_real(SupervisorCtx {
            pool: pool.clone(),
            publisher: self.publisher.clone(),
            lease_id: lease_id.clone(),
            family: request.family.clone(),
            bind_host,
            port_lease: PortLease {
                port,
                allocator: port_allocator.clone(),
            },
            live_leases: self.leases.clone(),
            lease_arc,
            child,
            shutdown,
        }));
        *handle.supervisor.lock().await = Some(supervisor);
        Ok(lease)
    }

    async fn register_handle(
        &self,
        lease_id: &str,
        port: u16,
        lease_arc: &Arc<RwLock<RuntimeLease>>,
        shutdown: &Arc<tokio::sync::Notify>,
    ) -> Arc<LeaseHandle> {
        let handle = Arc::new(LeaseHandle {
            lease_id: lease_id.to_string(),
            port,
            supervisor: tokio::sync::Mutex::new(None),
            lease: lease_arc.clone(),
            shutdown: shutdown.clone(),
        });
        self.leases
            .lock()
            .await
            .insert(lease_id.to_string(), handle.clone());
        handle
    }

    async fn publish_started(
        &self,
        request: &SpawnRuntimeRequest,
        lease_id: &str,
        port: u16,
        pid: Option<u32>,
    ) {
        let evt = BackendEvent::new(
            "process.started",
            request.family.clone(),
            serde_json::json!({ "lease_id": lease_id, "port": port, "pid": pid }),
        );
        self.publisher.publish(evt).await;
    }

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

use self::real::{
    build_real_descriptor, build_real_lease, fork_child, insert_lease_row, resolve_install_row,
    spawn_stream_drainers, validate_install_row,
};
use self::stub::{build_test_lease, emit_test_started, spawn_test_supervisor};
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

fn row_to_install_manifest(row: &installs_store::RuntimeInstallRow) -> InstallManifest {
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
