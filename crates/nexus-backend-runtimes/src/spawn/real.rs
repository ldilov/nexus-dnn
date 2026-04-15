//! Real-mode (`SpawnMode::Real`) helpers + `Spawner::spawn_real` per spec 015 US2.

use std::collections::BTreeMap;
use std::process::Stdio;
use std::sync::Arc;

use sqlx::SqlitePool;
use tokio::sync::RwLock;
use tokio::task::JoinHandle;

use crate::adapter::{AdapterRegistry, BackendAdapter};
use crate::channel::{ChannelBuildCtx, RuntimeChannelDescriptor};
use crate::error::BackendRuntimeError;
use crate::events::BackendEvent;
use crate::installs_store;
use crate::lease::RuntimeLease;

use super::host_env::{build_host_env, load_host_governed_injections};
use super::port::{PortAllocator, PortLease};
use super::supervise::{SupervisorCtx, drain_stream, supervise_real};
use super::{SpawnMode, SpawnRuntimeRequest, Spawner, bind_host_for, row_to_install_manifest};

/// All the inputs collected during real-mode spawn prep — held in one struct so
/// `spawn_real` can stay ≤ 25 LOC (per spec 015 FR-303).
pub(super) struct RealSpawnPrep {
    pool: SqlitePool,
    port_allocator: Arc<PortAllocator>,
    adapter: Arc<dyn BackendAdapter>,
    row: installs_store::RuntimeInstallRow,
    port: u16,
    pid: Option<u32>,
    bind_host: String,
    child: tokio::process::Child,
}

impl Spawner {
    /// Real-mode spawn: forks the runtime binary via the adapter, inserts a
    /// lease row, and hands a supervisor task to the shared publisher.
    pub(super) async fn spawn_real(
        &self,
        request: SpawnRuntimeRequest,
    ) -> Result<RuntimeLease, BackendRuntimeError> {
        let prep = self.prepare_real_spawn(&request).await?;
        let lease_id = format!("lease_{}", ulid::Ulid::new());
        let now = chrono::Utc::now().to_rfc3339();
        let descriptor = build_real_descriptor(&prep.adapter, &prep.bind_host, prep.port);
        let args = lease_row_args(&lease_id, &prep, &request, &descriptor, &now);
        insert_lease_row(&prep.pool, &args).await?;
        let lease = build_real_lease(&args);
        let lease_arc = Arc::new(RwLock::new(lease.clone()));
        let shutdown = Arc::new(tokio::sync::Notify::new());
        let handle = self
            .register_handle(&lease_id, prep.port, &lease_arc, &shutdown)
            .await;
        self.publish_started(&request, &lease_id, prep.port, prep.pid)
            .await;
        let supervisor = self
            .start_real_supervisor(prep, request.family, lease_id, lease_arc, shutdown)
            .await;
        *handle.supervisor.lock().await = Some(supervisor);
        Ok(lease)
    }

    /// Walk the request through resolve → validate → adapter lookup → launch →
    /// fork, collecting all inputs the supervisor needs. Returns early with the
    /// appropriate typed error at any failure point; releases the claimed port
    /// on fork failure via `fork_child`.
    async fn prepare_real_spawn(
        &self,
        request: &SpawnRuntimeRequest,
    ) -> Result<RealSpawnPrep, BackendRuntimeError> {
        let (pool, adapters, port_allocator) = self.unwrap_real_mode()?;
        let (row, adapter) = fetch_row_and_adapter(&pool, &adapters, request).await?;
        let port = port_allocator
            .claim(request.port_hint)
            .ok_or(BackendRuntimeError::NoPortAvailable)?;
        let launch = adapter
            .launch_spec(&row_to_install_manifest(&row), request)
            .await
            .map_err(|e| BackendRuntimeError::Internal(format!("launch_spec: {e}")))?;
        let host_env = build_host_env(&launch.base_env, &request.env, request.bind_mode, port);
        let host_governed_args = load_host_governed_injections(&pool, &row.family).await;
        let child = fork_child(
            &launch,
            &host_governed_args,
            request,
            &host_env,
            &port_allocator,
            port,
        )?;
        let pid = child.id();
        let bind_host = bind_host_for(request.bind_mode);
        Ok(RealSpawnPrep {
            pool,
            port_allocator,
            adapter,
            row,
            port,
            pid,
            bind_host,
            child,
        })
    }

    fn unwrap_real_mode(
        &self,
    ) -> Result<(SqlitePool, Arc<AdapterRegistry>, Arc<PortAllocator>), BackendRuntimeError> {
        match &self.mode {
            SpawnMode::Real {
                pool,
                adapters,
                port_allocator,
            } => Ok((pool.clone(), adapters.clone(), port_allocator.clone())),
            SpawnMode::Stub { .. } => Err(BackendRuntimeError::Internal(
                "spawn_real called on stub Spawner".into(),
            )),
        }
    }

    async fn start_real_supervisor(
        &self,
        mut prep: RealSpawnPrep,
        family: String,
        lease_id: String,
        lease_arc: Arc<RwLock<RuntimeLease>>,
        shutdown: Arc<tokio::sync::Notify>,
    ) -> JoinHandle<()> {
        spawn_stream_drainers(&mut prep.child);
        let ctx = SupervisorCtx {
            pool: prep.pool,
            publisher: self.publisher.clone(),
            lease_id,
            family,
            bind_host: prep.bind_host,
            port_lease: PortLease {
                port: prep.port,
                allocator: prep.port_allocator,
            },
            live_leases: self.leases.clone(),
            lease_arc,
            child: prep.child,
            shutdown,
        };
        tokio::spawn(supervise_real(ctx))
    }

    /// Register an in-memory `LeaseHandle` for later shutdown lookup.
    pub(super) async fn register_handle(
        &self,
        lease_id: &str,
        port: u16,
        lease_arc: &Arc<RwLock<RuntimeLease>>,
        shutdown: &Arc<tokio::sync::Notify>,
    ) -> Arc<super::LeaseHandle> {
        let handle = Arc::new(super::LeaseHandle {
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

    pub(super) async fn publish_started(
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
}

/// Resolve an install row, validate its state, and look up its adapter in one
/// shot. Extracted so `Spawner::prepare_real_spawn` stays ≤ 25 LOC.
async fn fetch_row_and_adapter(
    pool: &SqlitePool,
    adapters: &Arc<AdapterRegistry>,
    request: &SpawnRuntimeRequest,
) -> Result<(installs_store::RuntimeInstallRow, Arc<dyn BackendAdapter>), BackendRuntimeError> {
    let row = resolve_install_row(pool, request).await?;
    validate_install_row(&row, &request.family)?;
    let adapter =
        adapters
            .get(&row.family)
            .ok_or_else(|| BackendRuntimeError::FamilyUnavailable {
                family: row.family.clone(),
                reason: "adapter not registered".into(),
            })?;
    let catalog = crate::parameter_catalog::catalog_for(&row.family)?;
    super::validate_spawn_request(&catalog, request)?;
    Ok((row, adapter))
}

/// Build `LeaseRowArgs` from the prep + request + descriptor + timestamp.
pub(super) fn lease_row_args<'a>(
    lease_id: &'a str,
    prep: &'a RealSpawnPrep,
    request: &'a SpawnRuntimeRequest,
    descriptor: &'a RuntimeChannelDescriptor,
    now: &'a str,
) -> LeaseRowArgs<'a> {
    LeaseRowArgs {
        lease_id,
        row: &prep.row,
        request,
        pid: prep.pid,
        port: prep.port,
        descriptor,
        now,
    }
}

pub(super) async fn resolve_install_row(
    pool: &SqlitePool,
    request: &SpawnRuntimeRequest,
) -> Result<installs_store::RuntimeInstallRow, BackendRuntimeError> {
    let row = match request.install_id.as_deref() {
        Some(id) => installs_store::load_by_id(pool, id).await?,
        None => installs_store::resolve_dependency(pool, &request.family, None, &[]).await?,
    };
    row.ok_or_else(|| BackendRuntimeError::FamilyUnavailable {
        family: request.family.clone(),
        reason: "no install".into(),
    })
}

pub(super) fn validate_install_row(
    row: &installs_store::RuntimeInstallRow,
    family: &str,
) -> Result<(), BackendRuntimeError> {
    match row.state.as_str() {
        "installed" => Ok(()),
        "needs_repair" | "failed" => Err(BackendRuntimeError::RuntimeNeedsRepair(
            row.install_id.clone(),
        )),
        "installing" => Err(BackendRuntimeError::FamilyUnavailable {
            family: family.to_string(),
            reason: "install in progress".into(),
        }),
        other => Err(BackendRuntimeError::FamilyUnavailable {
            family: family.to_string(),
            reason: format!("unknown state: {other}"),
        }),
    }
}

pub(super) fn fork_child(
    launch: &crate::launch_spec::LaunchSpec,
    host_governed_args: &[String],
    request: &SpawnRuntimeRequest,
    host_env: &BTreeMap<String, String>,
    port_allocator: &Arc<PortAllocator>,
    port: u16,
) -> Result<tokio::process::Child, BackendRuntimeError> {
    let mut cmd = tokio::process::Command::new(&launch.binary);
    cmd.args(
        launch
            .base_args
            .iter()
            .chain(host_governed_args.iter())
            .chain(request.args.iter()),
    )
    .envs(host_env.iter())
    .kill_on_drop(true)
    .stdout(Stdio::piped())
    .stderr(Stdio::piped());
    if let Some(wd) = launch.working_dir.as_ref() {
        cmd.current_dir(wd);
    }
    cmd.spawn().map_err(|e| {
        port_allocator.release(port);
        BackendRuntimeError::Internal(format!("spawn failed: {e}"))
    })
}

pub(super) fn build_real_descriptor(
    adapter: &Arc<dyn crate::adapter::BackendAdapter>,
    bind_host: &str,
    port: u16,
) -> RuntimeChannelDescriptor {
    let ctx = ChannelBuildCtx {
        bind_host: bind_host.to_string(),
        port,
        metrics_enabled: false,
    };
    let mut descriptor = adapter.build_channel(&ctx);
    descriptor.ready = false;
    descriptor
}

/// Inputs to `insert_lease_row` + `build_real_lease` — groups what was
/// previously an 8-arg signature (per spec 015 SC-306 post-impl fix).
pub(super) struct LeaseRowArgs<'a> {
    pub lease_id: &'a str,
    pub row: &'a installs_store::RuntimeInstallRow,
    pub request: &'a SpawnRuntimeRequest,
    pub pid: Option<u32>,
    pub port: u16,
    pub descriptor: &'a RuntimeChannelDescriptor,
    pub now: &'a str,
}

pub(super) async fn insert_lease_row(
    pool: &SqlitePool,
    args: &LeaseRowArgs<'_>,
) -> Result<(), BackendRuntimeError> {
    let address_json = serde_json::to_string(&args.descriptor.address)
        .map_err(|e| BackendRuntimeError::Internal(format!("serialize channel address: {e}")))?;
    let dialects_json = serde_json::to_string(&args.descriptor.api_dialects)
        .map_err(|e| BackendRuntimeError::Internal(format!("serialize api_dialects: {e}")))?;
    sqlx::query(
        "INSERT INTO host_runtime_leases \
         (lease_id, install_id, extension_id, pid, port, channel_kind, channel_address, \
          api_dialects, ready, created_at) \
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,$9)",
    )
    .bind(args.lease_id)
    .bind(&args.row.install_id)
    .bind(&args.request.extension_id)
    .bind(args.pid.map(|p| p as i64))
    .bind(args.port as i64)
    .bind("http_tcp")
    .bind(address_json)
    .bind(dialects_json)
    .bind(args.now)
    .execute(pool)
    .await?;
    Ok(())
}

pub(super) fn build_real_lease(args: &LeaseRowArgs<'_>) -> RuntimeLease {
    RuntimeLease {
        lease_id: args.lease_id.to_string(),
        install_id: args.row.install_id.clone(),
        extension_id: args.request.extension_id.clone(),
        pid: args.pid,
        log_channel_id: format!("runtime:lease:{}", args.lease_id),
        channel: args.descriptor.clone(),
        created_at: args.now.to_string(),
        released_at: None,
    }
}

pub(super) fn spawn_stream_drainers(child: &mut tokio::process::Child) {
    if let Some(out) = child.stdout.take() {
        tokio::spawn(drain_stream(out));
    }
    if let Some(err) = child.stderr.take() {
        tokio::spawn(drain_stream(err));
    }
}
