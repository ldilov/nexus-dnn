pub mod key;

pub use key::PoolKey;

use std::collections::HashMap;
use std::sync::Arc;
use std::time::Instant;

use tokio::sync::Mutex;
use tracing::{debug, info};

use crate::errors::{WorkerError, WorkerResult};
use crate::events::{PoolEvictedEvent, emit_pool_evicted};
use crate::host_rpc::HostClient;
use crate::host_rpc::runtimes::RuntimeLease;
use crate::ids::{LeaseId, ModelId, RuntimeInstallId, VariantCodename};
use crate::lease_client::{LeaseGuard, LeaseHandle};
use crate::resolver::{ResolvedRuntime, Resolver};

pub struct RuntimePool {
    host: HostClient,
    slots: Mutex<HashMap<PoolKey, PoolSlot>>,
    cap: usize,
    resolver: Resolver,
}

struct PoolSlot {
    guard: Arc<LeaseGuard>,
    last_used_at: Instant,
}

impl RuntimePool {
    pub fn new(host: HostClient, cap: usize) -> Arc<Self> {
        Arc::new(Self {
            resolver: Resolver::new(host.clone()),
            host,
            slots: Mutex::new(HashMap::new()),
            cap,
        })
    }

    pub async fn acquire(
        self: &Arc<Self>,
        model_id: &ModelId,
        variant_preference: Option<&VariantCodename>,
    ) -> WorkerResult<LeaseHandle> {
        let ResolvedRuntime { model, runtime } = self
            .resolver
            .resolve_for_model(model_id, variant_preference)
            .await?;

        let key = PoolKey {
            variant: runtime.codename.clone(),
            model_id: model.id.clone(),
        };

        {
            let mut slots = self.slots.lock().await;
            if let Some(slot) = slots.get_mut(&key) {
                slot.last_used_at = Instant::now();
                return Ok(LeaseHandle::new(slot.guard.clone(), key));
            }
        }

        self.evict_lru_if_full().await?;

        let guard = Arc::new(
            crate::lease_client::acquire_lease(self.host.clone(), &runtime.install_id, &model.id)
                .await?,
        );

        let mut slots = self.slots.lock().await;
        slots.insert(
            key.clone(),
            PoolSlot {
                guard: guard.clone(),
                last_used_at: Instant::now(),
            },
        );
        info!(%key, install_id = %runtime.install_id, "pool: new slot");
        Ok(LeaseHandle::new(guard, key))
    }

    pub async fn evict(&self, key: &PoolKey, reason: &str) -> WorkerResult<()> {
        let removed = {
            let mut slots = self.slots.lock().await;
            slots.remove(key)
        };
        if let Some(slot) = removed {
            debug!(%key, reason, "pool: evicting slot");
            slot.guard.initiate_release();
            let transport = self.host.transport();
            let _ = emit_pool_evicted(transport, PoolEvictedEvent { pool_key: key, reason }).await;
        }
        Ok(())
    }

    pub async fn evict_by_install(&self, install_id: &RuntimeInstallId, reason: &str) {
        let to_evict: Vec<PoolKey> = {
            let slots = self.slots.lock().await;
            slots
                .iter()
                .filter(|(_, s)| s.guard.lease().install_id == *install_id)
                .map(|(k, _)| k.clone())
                .collect()
        };
        for key in to_evict {
            let _ = self.evict(&key, reason).await;
        }
    }

    pub async fn evict_by_model(&self, model_id: &ModelId, reason: &str) {
        let to_evict: Vec<PoolKey> = {
            let slots = self.slots.lock().await;
            slots
                .iter()
                .filter(|(k, _)| k.model_id == *model_id)
                .map(|(k, _)| k.clone())
                .collect()
        };
        for key in to_evict {
            let _ = self.evict(&key, reason).await;
        }
    }

    pub async fn evict_by_lease(&self, lease_id: &LeaseId, reason: &str) {
        let to_evict: Vec<PoolKey> = {
            let slots = self.slots.lock().await;
            slots
                .iter()
                .filter(|(_, s)| s.guard.lease().lease_id == *lease_id)
                .map(|(k, _)| k.clone())
                .collect()
        };
        for key in to_evict {
            let _ = self.evict(&key, reason).await;
        }
    }

    pub async fn on_backend_state(
        &self,
        lease_id: &LeaseId,
        state: crate::lease_client::LeaseState,
    ) {
        let matching: Vec<(PoolKey, Arc<crate::lease_client::LeaseGuard>)> = {
            let slots = self.slots.lock().await;
            slots
                .iter()
                .filter(|(_, s)| s.guard.lease().lease_id == *lease_id)
                .map(|(k, s)| (k.clone(), s.guard.clone()))
                .collect()
        };
        for (_, guard) in &matching {
            guard.record_state(state);
        }
        if state.is_terminal() {
            let reason = match state {
                crate::lease_client::LeaseState::Crashed => "crashed",
                crate::lease_client::LeaseState::Hung => "hung",
                crate::lease_client::LeaseState::Unhealthy => "unhealthy",
                crate::lease_client::LeaseState::Stopped => "stopped",
                _ => "terminal",
            };
            for (key, _) in matching {
                let _ = self.evict(&key, reason).await;
            }
        }
    }

    pub async fn evict_idle(&self, idle_threshold: std::time::Duration) {
        let now = Instant::now();
        let to_evict: Vec<PoolKey> = {
            let slots = self.slots.lock().await;
            slots
                .iter()
                .filter(|(_, s)| now.duration_since(s.last_used_at) >= idle_threshold)
                .map(|(k, _)| k.clone())
                .collect()
        };
        for key in to_evict {
            let _ = self.evict(&key, "idle_timeout").await;
        }
    }

    pub async fn release_all(&self, reason: &str) {
        let keys: Vec<PoolKey> = {
            let slots = self.slots.lock().await;
            slots.keys().cloned().collect()
        };
        for key in keys {
            let _ = self.evict(&key, reason).await;
        }
    }

    pub async fn list(&self) -> Vec<PoolSnapshot> {
        let slots = self.slots.lock().await;
        slots
            .iter()
            .map(|(k, s)| PoolSnapshot {
                pool_key: k.clone(),
                lease: s.guard.lease().clone(),
                last_used_at_unix_ms: last_used_unix_ms(s.last_used_at),
            })
            .collect()
    }

    async fn evict_lru_if_full(&self) -> WorkerResult<()> {
        let evict_key = {
            let slots = self.slots.lock().await;
            if slots.len() < self.cap {
                None
            } else {
                slots
                    .iter()
                    .min_by_key(|(_, s)| s.last_used_at)
                    .map(|(k, _)| k.clone())
            }
        };
        if let Some(k) = evict_key {
            self.evict(&k, "lru_cap").await?;
        }
        Ok(())
    }
}

fn last_used_unix_ms(t: Instant) -> i64 {
    let now = Instant::now();
    let elapsed = now.duration_since(t).as_millis() as i64;
    chrono::Utc::now().timestamp_millis() - elapsed
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct PoolSnapshot {
    pub pool_key: PoolKey,
    pub lease: RuntimeLease,
    pub last_used_at_unix_ms: i64,
}

pub fn pool_slot_error(key: &PoolKey) -> WorkerError {
    WorkerError::PoolSlotNotFound {
        key: key.to_string(),
    }
}
