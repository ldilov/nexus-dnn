#![forbid(unsafe_code)]

pub mod config;
pub mod dispatch;
pub mod errors;
pub mod events;
pub mod host_rpc;
pub mod ids;
pub mod lease_client;
pub mod logging;
pub mod methods;
pub mod migration;
pub mod notifications;
pub mod operators;
pub mod pool;
pub mod proxy;
pub mod resolver;
pub mod transport;

pub use config::WorkerConfig;
pub use errors::{WorkerError, WorkerResult};
pub use ids::{ChildPid, CorrelationId, LeaseId, ModelId, Port, RuntimeInstallId, VariantCodename};

use std::path::PathBuf;

use anyhow::Result;
use tracing::{Instrument, info, info_span};

use crate::host_rpc::HostClient;
use crate::operators::OperatorCtx;
use crate::pool::RuntimePool;
use crate::transport::WorkerTransport;

pub async fn run() -> Result<()> {
    logging::init();
    let config = WorkerConfig::from_env_or_defaults();
    let root_span = info_span!(
        "worker",
        extension_id = logging::EXTENSION_ID,
        worker_pid = logging::worker_pid()
    );
    let _entered = root_span.enter();
    info!(
        pool_cap = %config.pool_cap,
        idle_timeout_secs = config.idle_timeout.as_secs(),
        acquire_lease_timeout_secs = config.acquire_lease_timeout.as_secs(),
        "nexus-local-llm-worker starting"
    );
    drop(_entered);
    run_scoped(config).instrument(root_span).await
}

async fn run_scoped(config: WorkerConfig) -> Result<()> {

    let transport = WorkerTransport::from_stdio();
    let host = HostClient::new(transport.clone());
    let pool_cap_usize = config.pool_cap.get();
    let pool = RuntimePool::new(host.clone(), pool_cap_usize);

    let data_root = resolve_data_root();
    if let Err(e) = migration::run_if_needed(&host, &data_root).await {
        tracing::warn!(error = %e, "migration routine reported a non-fatal error");
    }

    let idle_pool = pool.clone();
    let idle_timeout = config.idle_timeout;
    tokio::spawn(async move {
        let mut ticker = tokio::time::interval(std::time::Duration::from_secs(30));
        ticker.tick().await;
        loop {
            ticker.tick().await;
            idle_pool.evict_idle(idle_timeout).await;
        }
    });

    let (shutdown_tx, shutdown_rx) = tokio::sync::oneshot::channel::<()>();
    let _notif_handle =
        notifications::NotificationConsumer::spawn(transport.clone(), pool.clone(), shutdown_tx);

    let ctx = OperatorCtx::new(host, pool.clone());
    info!("worker ready: dispatching");
    let dispatcher = dispatch::run(transport.clone(), ctx, pool_cap_usize);
    tokio::select! {
        result = dispatcher => { result?; }
        _ = shutdown_rx => {
            info!("host.shutdown received; draining");
        }
    }
    let drain = pool.release_all("shutdown");
    if tokio::time::timeout(std::time::Duration::from_secs(2), drain)
        .await
        .is_err()
    {
        tracing::warn!("shutdown drain exceeded 2s deadline; forcing exit");
    }
    Ok(())
}

fn resolve_data_root() -> PathBuf {
    if let Ok(custom) = std::env::var("NEXUS_LOCAL_LLM_DATA_ROOT") {
        return PathBuf::from(custom);
    }
    dirs_home().join(".nexus").join("local-llm")
}

fn dirs_home() -> PathBuf {
    if let Ok(h) = std::env::var("USERPROFILE") {
        return PathBuf::from(h);
    }
    if let Ok(h) = std::env::var("HOME") {
        return PathBuf::from(h);
    }
    PathBuf::from(".")
}
