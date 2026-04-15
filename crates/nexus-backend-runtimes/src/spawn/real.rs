//! Real-mode (`SpawnMode::Real`) helpers extracted per spec 015 US2.

use std::collections::BTreeMap;
use std::process::Stdio;
use std::sync::Arc;

use sqlx::SqlitePool;

use crate::channel::{ChannelBuildCtx, RuntimeChannelDescriptor};
use crate::error::BackendRuntimeError;
use crate::installs_store;
use crate::lease::RuntimeLease;

use super::SpawnRuntimeRequest;
use super::port::PortAllocator;
use super::supervise::drain_stream;

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

#[allow(clippy::too_many_arguments)]
pub(super) async fn insert_lease_row(
    pool: &SqlitePool,
    lease_id: &str,
    row: &installs_store::RuntimeInstallRow,
    request: &SpawnRuntimeRequest,
    pid: Option<u32>,
    port: u16,
    descriptor: &RuntimeChannelDescriptor,
    now: &str,
) -> Result<(), BackendRuntimeError> {
    let address_json = serde_json::to_string(&descriptor.address)
        .map_err(|e| BackendRuntimeError::Internal(format!("serialize channel address: {e}")))?;
    let dialects_json = serde_json::to_string(&descriptor.api_dialects)
        .map_err(|e| BackendRuntimeError::Internal(format!("serialize api_dialects: {e}")))?;
    sqlx::query(
        "INSERT INTO host_runtime_leases \
         (lease_id, install_id, extension_id, pid, port, channel_kind, channel_address, \
          api_dialects, ready, created_at) \
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,$9)",
    )
    .bind(lease_id)
    .bind(&row.install_id)
    .bind(&request.extension_id)
    .bind(pid.map(|p| p as i64))
    .bind(port as i64)
    .bind("http_tcp")
    .bind(address_json)
    .bind(dialects_json)
    .bind(now)
    .execute(pool)
    .await?;
    Ok(())
}

pub(super) fn build_real_lease(
    lease_id: &str,
    row: &installs_store::RuntimeInstallRow,
    request: &SpawnRuntimeRequest,
    pid: Option<u32>,
    descriptor: &RuntimeChannelDescriptor,
    now: &str,
) -> RuntimeLease {
    RuntimeLease {
        lease_id: lease_id.to_string(),
        install_id: row.install_id.clone(),
        extension_id: request.extension_id.clone(),
        pid,
        log_channel_id: format!("runtime:lease:{lease_id}"),
        channel: descriptor.clone(),
        created_at: now.to_string(),
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
