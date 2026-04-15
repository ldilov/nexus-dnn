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
        if let Some(h) = hint
            && h >= self.low
            && h <= self.high
            && !claimed.contains(&h)
        {
            claimed.insert(h);
            return Some(h);
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
pub fn build_host_env(
    base_env: &BTreeMap<String, String>,
    extension_env: &BTreeMap<String, String>,
    bind_mode: RuntimeBindMode,
    port: u16,
) -> BTreeMap<String, String> {
    let mut out: BTreeMap<String, String> = base_env.clone();
    for (k, v) in extension_env {
        out.insert(k.clone(), v.clone());
    }
    let host = match bind_mode {
        RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1",
        _ => "0.0.0.0",
    };
    out.insert("LLAMA_ARG_HOST".to_string(), host.to_string());
    out.insert("LLAMA_ARG_PORT".to_string(), port.to_string());
    out.insert("LLAMA_ARG_LOG_FORMAT".to_string(), "json".to_string());
    out
}

use std::collections::HashMap;
use std::process::Stdio;
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

/// Host-owned process spawner (spec 011 US3 T067).
///
/// Two constructors are provided:
/// - [`Spawner::new`] — test-oriented: publisher-only, HTTP-probe driven.
///   The spawner does not fork a real child; it treats the target port as an
///   externally-managed endpoint and uses the readiness probe plus port
///   reachability to drive `process.started`, `channel.ready`, and
///   `process.exited` events.
/// - [`Spawner::with_pool`] — production path carrying a database pool,
///   adapter registry, and port allocator. Reserved for handler integration.
pub struct Spawner {
    publisher: SharedPublisher,
    leases: Arc<tokio::sync::Mutex<HashMap<String, Arc<LeaseHandle>>>>,
    pool: Option<SqlitePool>,
    adapters: Option<Arc<AdapterRegistry>>,
    port_allocator: Arc<PortAllocator>,
}

impl Spawner {
    /// Minimal test/stub constructor. The produced spawner drives events off
    /// a TCP probe against the bound `port_hint` without forking a child.
    pub fn new(publisher: SharedPublisher) -> Self {
        Self {
            publisher,
            leases: Arc::new(tokio::sync::Mutex::new(HashMap::new())),
            pool: None,
            adapters: None,
            port_allocator: Arc::new(PortAllocator::ephemeral()),
        }
    }

    /// Production path constructor: carries a SQLite pool and an
    /// [`AdapterRegistry`] for real-fork spawns (spec 011 US3 T067).
    ///
    /// When both `pool` and `adapters` are present, [`Self::spawn`] takes the
    /// real-fork path: it looks up the install row, invokes the adapter's
    /// `launch_spec`, forks the binary with host-owned env, and supervises
    /// the child via `tokio::process::Child` plus a readiness probe.
    pub fn with_pool(
        publisher: SharedPublisher,
        pool: SqlitePool,
        adapters: Arc<AdapterRegistry>,
    ) -> Self {
        Self {
            publisher,
            leases: Arc::new(tokio::sync::Mutex::new(HashMap::new())),
            pool: Some(pool),
            adapters: Some(adapters),
            port_allocator: Arc::new(PortAllocator::ephemeral()),
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
        if self.pool.is_some() && self.adapters.is_some() {
            return self.spawn_real(request).await;
        }
        let port = request.port_hint.ok_or_else(|| {
            BackendRuntimeError::Internal("port_hint required in test mode".into())
        })?;
        let bind_host = match request.bind_mode {
            RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1".to_string(),
            _ => "0.0.0.0".to_string(),
        };

        let lease_id = format!("lease_{}", ulid::Ulid::new());
        let log_channel_id = format!("runtime:lease:{lease_id}");
        let descriptor = RuntimeChannelDescriptor {
            kind: RuntimeChannelKind::HttpTcp,
            api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
            address: RuntimeAddress::Tcp {
                host: bind_host.clone(),
                port,
            },
            health: Some(RuntimeEndpoint::path("/health")),
            metrics: None,
            ready: false,
        };

        let lease = RuntimeLease {
            lease_id: lease_id.clone(),
            install_id: format!("ri_{}", request.family.replace('.', "_")),
            extension_id: request.extension_id.clone(),
            pid: None,
            log_channel_id,
            channel: descriptor,
            created_at: chrono::Utc::now().to_rfc3339(),
            released_at: None,
        };
        let lease_arc = Arc::new(RwLock::new(lease.clone()));

        let publisher = self.publisher.clone();
        let started_evt = BackendEvent::new(
            "process.started",
            request.family.clone(),
            serde_json::json!({
                "lease_id": lease_id,
                "port": port,
                "host": bind_host,
            }),
        );
        publisher.publish(started_evt).await;

        let shutdown = Arc::new(tokio::sync::Notify::new());
        let shutdown_clone = shutdown.clone();
        let publisher_clone = publisher.clone();
        let lease_arc_clone = lease_arc.clone();
        let lease_id_clone = lease_id.clone();
        let family_clone = request.family.clone();
        let bind_host_clone = bind_host.clone();

        let handle = Arc::new(LeaseHandle {
            lease_id: lease_id.clone(),
            port,
            supervisor: tokio::sync::Mutex::new(None),
            lease: lease_arc,
            shutdown,
        });
        self.leases
            .lock()
            .await
            .insert(lease_id.clone(), handle.clone());

        let supervisor = tokio::spawn(async move {
            let health_url = format!("http://{bind_host_clone}:{port}/health");
            let client = reqwest::Client::builder()
                .timeout(std::time::Duration::from_secs(1))
                .build()
                .unwrap_or_else(|_| reqwest::Client::new());

            let mut consecutive_ok: u8 = 0;
            let mut ready_emitted = false;
            let mut consecutive_fail_after_ready: u8 = 0;

            loop {
                tokio::select! {
                    _ = shutdown_clone.notified() => {
                        break;
                    }
                    _ = tokio::time::sleep(std::time::Duration::from_millis(500)) => {}
                }

                let ok = client
                    .get(&health_url)
                    .send()
                    .await
                    .map(|r| r.status().is_success())
                    .unwrap_or(false);

                if !ready_emitted {
                    if ok {
                        consecutive_ok += 1;
                        if consecutive_ok >= 2 {
                            ready_emitted = true;
                            {
                                let mut w = lease_arc_clone.write().await;
                                w.channel.ready = true;
                            }
                            let evt = BackendEvent::new(
                                "channel.ready",
                                family_clone.clone(),
                                serde_json::json!({ "lease_id": lease_id_clone }),
                            );
                            publisher_clone.publish(evt).await;
                        }
                    } else {
                        consecutive_ok = 0;
                    }
                } else if ok {
                    consecutive_fail_after_ready = 0;
                } else {
                    consecutive_fail_after_ready += 1;
                    if consecutive_fail_after_ready >= 2 {
                        {
                            let mut w = lease_arc_clone.write().await;
                            w.channel.ready = false;
                            w.released_at = Some(chrono::Utc::now().to_rfc3339());
                        }
                        let evt = BackendEvent::new(
                            "process.exited",
                            family_clone.clone(),
                            serde_json::json!({ "lease_id": lease_id_clone }),
                        );
                        publisher_clone.publish(evt).await;
                        break;
                    }
                }
            }
        });

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
        if let Some(pool) = self.pool.as_ref() {
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
    /// supervisor to exit, waits for it to drain, and removes the lease from
    /// the in-memory registry.
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
            sup.abort();
            let _ = sup.await;
        }
        Ok(())
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
        let pool = self
            .pool
            .as_ref()
            .ok_or_else(|| BackendRuntimeError::Internal("pool missing".into()))?;
        let adapters = self
            .adapters
            .as_ref()
            .ok_or_else(|| BackendRuntimeError::Internal("adapters missing".into()))?;

        let row = match request.install_id.as_deref() {
            Some(id) => installs_store::load_by_id(pool, id).await?,
            None => installs_store::resolve_dependency(pool, &request.family, None, &[]).await?,
        };
        let row = row.ok_or_else(|| BackendRuntimeError::FamilyUnavailable {
            family: request.family.clone(),
            reason: "no install".into(),
        })?;

        match row.state.as_str() {
            "installed" => {}
            "needs_repair" | "failed" => {
                return Err(BackendRuntimeError::RuntimeNeedsRepair(row.install_id));
            }
            "installing" => {
                return Err(BackendRuntimeError::FamilyUnavailable {
                    family: request.family.clone(),
                    reason: "install in progress".into(),
                });
            }
            other => {
                return Err(BackendRuntimeError::FamilyUnavailable {
                    family: request.family.clone(),
                    reason: format!("unknown state: {other}"),
                });
            }
        }

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

        let port = self
            .port_allocator
            .claim(request.port_hint)
            .ok_or(BackendRuntimeError::NoPortAvailable)?;

        let launch = adapter
            .launch_spec(&install_manifest, &request)
            .await
            .map_err(|e| BackendRuntimeError::Internal(format!("launch_spec: {e}")))?;

        let host_env = build_host_env(&launch.base_env, &request.env, request.bind_mode, port);
        let bind_host = match request.bind_mode {
            RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1".to_string(),
            _ => "0.0.0.0".to_string(),
        };

        let mut cmd = tokio::process::Command::new(&launch.binary);
        cmd.args(launch.base_args.iter().chain(request.args.iter()))
            .envs(host_env.iter())
            .kill_on_drop(true)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped());
        if let Some(wd) = launch.working_dir.as_ref() {
            cmd.current_dir(wd);
        }
        let mut child = cmd.spawn().map_err(|e| {
            self.port_allocator.release(port);
            BackendRuntimeError::Internal(format!("spawn failed: {e}"))
        })?;
        let pid = child.id();

        let lease_id = format!("lease_{}", ulid::Ulid::new());
        let log_channel_id = format!("runtime:lease:{lease_id}");
        let now = chrono::Utc::now().to_rfc3339();

        let ctx = ChannelBuildCtx {
            bind_host: bind_host.clone(),
            port,
            metrics_enabled: false,
        };
        let mut descriptor = adapter.build_channel(&ctx);
        descriptor.ready = false;

        sqlx::query(
            "INSERT INTO host_runtime_leases \
             (lease_id, install_id, extension_id, pid, port, channel_kind, channel_address, \
              api_dialects, ready, created_at) \
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,$9)",
        )
        .bind(&lease_id)
        .bind(&row.install_id)
        .bind(&request.extension_id)
        .bind(pid.map(|p| p as i64))
        .bind(port as i64)
        .bind("http_tcp")
        .bind(serde_json::to_string(&descriptor.address).unwrap_or_else(|_| "{}".into()))
        .bind(serde_json::to_string(&descriptor.api_dialects).unwrap_or_else(|_| "[]".into()))
        .bind(&now)
        .execute(pool)
        .await?;

        let lease = RuntimeLease {
            lease_id: lease_id.clone(),
            install_id: row.install_id.clone(),
            extension_id: request.extension_id.clone(),
            pid,
            log_channel_id,
            channel: descriptor,
            created_at: now,
            released_at: None,
        };
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

        let started = BackendEvent::new(
            "process.started",
            request.family.clone(),
            serde_json::json!({ "lease_id": lease_id, "port": port, "pid": pid }),
        );
        self.publisher.publish(started).await;

        let stdout = child.stdout.take();
        let stderr = child.stderr.take();
        if let Some(out) = stdout {
            tokio::spawn(drain_stream(out));
        }
        if let Some(err) = stderr {
            tokio::spawn(drain_stream(err));
        }

        let port_lease = PortLease {
            port,
            allocator: self.port_allocator.clone(),
        };
        let supervisor = tokio::spawn(supervise_real(SupervisorCtx {
            pool: pool.clone(),
            publisher: self.publisher.clone(),
            lease_id: lease_id.clone(),
            family: request.family.clone(),
            bind_host,
            port_lease,
            live_leases: self.leases.clone(),
            lease_arc,
            child,
            shutdown,
        }));
        *handle.supervisor.lock().await = Some(supervisor);

        Ok(lease)
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

/// RAII guard that releases a host-claimed port back to the [`PortAllocator`]
/// on drop. This covers normal exit, early error exit, and supervisor panic —
/// all three paths release the port.
struct PortLease {
    port: u16,
    allocator: Arc<PortAllocator>,
}

impl Drop for PortLease {
    fn drop(&mut self) {
        self.allocator.release(self.port);
    }
}

struct SupervisorCtx {
    pool: SqlitePool,
    publisher: SharedPublisher,
    lease_id: String,
    family: String,
    bind_host: String,
    port_lease: PortLease,
    live_leases: Arc<tokio::sync::Mutex<HashMap<String, Arc<LeaseHandle>>>>,
    lease_arc: Arc<RwLock<RuntimeLease>>,
    child: tokio::process::Child,
    shutdown: Arc<tokio::sync::Notify>,
}

async fn supervise_real(mut ctx: SupervisorCtx) {
    let health_url = format!("http://{}:{}/health", ctx.bind_host, ctx.port_lease.port);
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(500))
        .build()
        .unwrap_or_else(|_| reqwest::Client::new());

    let mut readiness_done = false;
    loop {
        tokio::select! {
            _ = ctx.shutdown.notified() => {
                let _ = ctx.child.kill().await;
                break;
            }
            status = ctx.child.wait() => {
                let code = status.ok().and_then(|s: std::process::ExitStatus| s.code());
                let evt = BackendEvent::new(
                    "process.exited",
                    ctx.family.clone(),
                    serde_json::json!({ "lease_id": ctx.lease_id, "code": code }),
                );
                ctx.publisher.publish(evt).await;
                break;
            }
            _ = tokio::time::sleep(std::time::Duration::from_millis(500)) => {
                if !readiness_done {
                    let ok = client.get(&health_url).send().await
                        .map(|r| r.status().is_success())
                        .unwrap_or(false);
                    if ok {
                        readiness_done = true;
                        {
                            let mut w = ctx.lease_arc.write().await;
                            w.channel.ready = true;
                        }
                        let _ = sqlx::query(
                            "UPDATE host_runtime_leases SET ready = 1 WHERE lease_id = $1",
                        )
                        .bind(&ctx.lease_id)
                        .execute(&ctx.pool)
                        .await;
                        let evt = BackendEvent::new(
                            "channel.ready",
                            ctx.family.clone(),
                            serde_json::json!({ "lease_id": ctx.lease_id }),
                        );
                        ctx.publisher.publish(evt).await;
                    }
                }
            }
        }
    }

    {
        let mut w = ctx.lease_arc.write().await;
        w.channel.ready = false;
        w.released_at = Some(chrono::Utc::now().to_rfc3339());
    }
    let _ = sqlx::query(
        "UPDATE host_runtime_leases \
         SET released_at = datetime('now'), ready = 0 \
         WHERE lease_id = $1",
    )
    .bind(&ctx.lease_id)
    .execute(&ctx.pool)
    .await;
    ctx.live_leases.lock().await.remove(&ctx.lease_id);
}

async fn drain_stream<R>(mut reader: R)
where
    R: tokio::io::AsyncRead + Unpin + Send + 'static,
{
    let mut sink = tokio::io::sink();
    let _ = tokio::io::copy(&mut reader, &mut sink).await;
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
            install_id: None,
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
    fn host_env_forces_loopback_host_when_loopback_only() {
        let base = BTreeMap::from([("BASE".into(), "1".into())]);
        let ext = BTreeMap::from([
            ("CUSTOM".into(), "user".into()),
            ("LLAMA_ARG_HOST".into(), "0.0.0.0".into()),
            ("LLAMA_ARG_PORT".into(), "9".into()),
            ("LLAMA_ARG_LOG_FORMAT".into(), "text".into()),
        ]);
        let merged = build_host_env(&base, &ext, RuntimeBindMode::LoopbackOnly, 9123);
        assert_eq!(merged.get("BASE").map(String::as_str), Some("1"));
        assert_eq!(merged.get("CUSTOM").map(String::as_str), Some("user"));
        assert_eq!(
            merged.get("LLAMA_ARG_HOST").map(String::as_str),
            Some("127.0.0.1"),
            "host must override extension attempt",
        );
        assert_eq!(
            merged.get("LLAMA_ARG_PORT").map(String::as_str),
            Some("9123"),
        );
        assert_eq!(
            merged.get("LLAMA_ARG_LOG_FORMAT").map(String::as_str),
            Some("json"),
        );
    }

    #[test]
    fn host_env_uses_any_host_when_bind_mode_is_any() {
        let merged = build_host_env(
            &BTreeMap::new(),
            &BTreeMap::new(),
            RuntimeBindMode::Any,
            7000,
        );
        assert_eq!(
            merged.get("LLAMA_ARG_HOST").map(String::as_str),
            Some("0.0.0.0"),
        );
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
