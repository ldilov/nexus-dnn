use std::fmt;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};

use serde::{Deserialize, Serialize};
use tokio::sync::watch;
use tracing::{error, info, warn};

use crate::errors::WorkerResult;
use crate::host_rpc::HostClient;
use crate::host_rpc::runtimes::{
    AcquireLeaseRequest, LeaseSettingsOverride, RuntimeLease, RuntimesClient,
};
use crate::ids::{ModelId, RuntimeInstallId};
use crate::pool::PoolKey;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
#[non_exhaustive]
pub enum LeaseState {
    Spawning,
    LoadingModel,
    Ready,
    Draining,
    Stopped,
    Crashed,
    Hung,
    Unhealthy,
}

impl LeaseState {
    pub fn is_serving(self) -> bool {
        matches!(self, LeaseState::Ready)
    }

    pub fn is_terminal(self) -> bool {
        matches!(
            self,
            LeaseState::Stopped | LeaseState::Crashed | LeaseState::Hung | LeaseState::Unhealthy
        )
    }
}

impl fmt::Display for LeaseState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            LeaseState::Spawning => "Spawning",
            LeaseState::LoadingModel => "LoadingModel",
            LeaseState::Ready => "Ready",
            LeaseState::Draining => "Draining",
            LeaseState::Stopped => "Stopped",
            LeaseState::Crashed => "Crashed",
            LeaseState::Hung => "Hung",
            LeaseState::Unhealthy => "Unhealthy",
        };
        f.write_str(s)
    }
}

pub async fn acquire_lease(
    host: HostClient,
    install_id: &RuntimeInstallId,
    model_id: &ModelId,
) -> WorkerResult<LeaseGuard> {
    let client = RuntimesClient::new(host.transport());
    let lease = client
        .acquire_lease(AcquireLeaseRequest {
            install_id: install_id.clone(),
            model_id: model_id.clone(),
            settings_override: Some(LeaseSettingsOverride::default()),
        })
        .await
        .map_err(|e| map_acquire_error(e, install_id))?;
    info!(lease_id = %lease.lease_id, "lease acquired");
    Ok(LeaseGuard::new(host, lease))
}

fn map_acquire_error(
    e: crate::errors::WorkerError,
    install_id: &RuntimeInstallId,
) -> crate::errors::WorkerError {
    use crate::errors::WorkerError;
    let msg = match &e {
        WorkerError::HostProtocolError(s) => s.clone(),
        _ => return e,
    };
    let lower = msg.to_ascii_lowercase();
    if lower.contains("backendbusy")
        || lower.contains("leasecapexceeded")
        || lower.contains("insufficientresources")
    {
        WorkerError::BackendBusy
    } else if lower.contains("incompatibleruntime") {
        WorkerError::IncompatibleRuntime {
            format: "unknown".into(),
        }
    } else if lower.contains("runtimenotfound") || lower.contains("runtimemissing") {
        WorkerError::RuntimeMissing {
            install_id: install_id.as_str().to_string(),
        }
    } else if lower.contains("modelnotfound") || lower.contains("modelmissing") {
        WorkerError::ModelMissing {
            model_id: String::new(),
        }
    } else {
        e
    }
}

pub struct LeaseGuard {
    host: HostClient,
    lease: RuntimeLease,
    released: AtomicBool,
    state_tx: watch::Sender<LeaseState>,
    state_rx: watch::Receiver<LeaseState>,
}

impl LeaseGuard {
    pub fn new(host: HostClient, lease: RuntimeLease) -> Self {
        let (tx, rx) = watch::channel(LeaseState::Ready);
        Self {
            host,
            lease,
            released: AtomicBool::new(false),
            state_tx: tx,
            state_rx: rx,
        }
    }

    pub fn lease(&self) -> &RuntimeLease {
        &self.lease
    }

    pub fn channel_base_url(&self) -> &str {
        &self.lease.channel.base_url
    }

    pub fn state(&self) -> LeaseState {
        *self.state_rx.borrow()
    }

    pub fn subscribe(&self) -> watch::Receiver<LeaseState> {
        self.state_rx.clone()
    }

    pub fn record_state(&self, next: LeaseState) {
        let _ = self.state_tx.send(next);
    }

    pub async fn wait_until_ready(&self, timeout: std::time::Duration) -> WorkerResult<()> {
        let deadline = tokio::time::Instant::now() + timeout;
        let mut rx = self.state_rx.clone();
        loop {
            let current = *rx.borrow_and_update();
            if current.is_serving() {
                return Ok(());
            }
            if current.is_terminal() {
                return Err(crate::errors::WorkerError::BackendUnavailable {
                    reason: format!("lease terminal state: {current}"),
                });
            }
            let remaining = deadline.saturating_duration_since(tokio::time::Instant::now());
            if remaining.is_zero() {
                return Err(crate::errors::WorkerError::LeaseAcquireTimeout {
                    install_id: self.lease.install_id.as_str().to_string(),
                });
            }
            match tokio::time::timeout(remaining, rx.changed()).await {
                Ok(Ok(_)) => continue,
                Ok(Err(_)) => {
                    return Err(crate::errors::WorkerError::BackendUnavailable {
                        reason: "lease state channel closed".into(),
                    });
                }
                Err(_) => {
                    return Err(crate::errors::WorkerError::LeaseAcquireTimeout {
                        install_id: self.lease.install_id.as_str().to_string(),
                    });
                }
            }
        }
    }

    pub fn initiate_release(&self) {
        if self.released.swap(true, Ordering::SeqCst) {
            return;
        }
        let host = self.host.clone();
        let lease_id = self.lease.lease_id.clone();
        tokio::spawn(async move {
            let client = RuntimesClient::new(host.transport());
            match client.release_lease(&lease_id).await {
                Ok(_) => info!(%lease_id, "lease released"),
                Err(e) => warn!(%lease_id, error = %e, "failed to release lease"),
            }
        });
    }
}

impl Drop for LeaseGuard {
    fn drop(&mut self) {
        if !self.released.swap(true, Ordering::SeqCst) {
            let host = self.host.clone();
            let lease_id = self.lease.lease_id.clone();
            tokio::spawn(async move {
                let client = RuntimesClient::new(host.transport());
                if let Err(e) = client.release_lease(&lease_id).await {
                    error!(%lease_id, error = %e, "failed to release lease on drop");
                }
            });
        }
    }
}

#[derive(Clone)]
pub struct LeaseHandle {
    guard: Arc<LeaseGuard>,
    pool_key: PoolKey,
}

impl LeaseHandle {
    pub fn new(guard: Arc<LeaseGuard>, pool_key: PoolKey) -> Self {
        Self { guard, pool_key }
    }

    pub fn pool_key(&self) -> &PoolKey {
        &self.pool_key
    }

    pub fn lease(&self) -> &RuntimeLease {
        self.guard.lease()
    }

    pub fn channel_base_url(&self) -> &str {
        self.guard.channel_base_url()
    }

    pub fn state(&self) -> LeaseState {
        self.guard.state()
    }

    pub fn subscribe(&self) -> watch::Receiver<LeaseState> {
        self.guard.subscribe()
    }
}
