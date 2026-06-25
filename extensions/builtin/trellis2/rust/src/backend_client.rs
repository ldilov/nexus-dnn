use std::sync::Arc;

use async_trait::async_trait;
use serde_json::Value as JsonValue;
use tokio::sync::Mutex;

use crate::domain::{Result, Trellis2Error};
use crate::host_contract::{LeaseError, LeaseState, SharedLease};

pub mod methods {
    pub const HEALTH: &str = "trellis2.runtime.health";
    pub const GENERATE_START: &str = "trellis2.generate.start";
    pub const GENERATE_CANCEL: &str = "trellis2.generate.cancel";
    pub const RELEASE_MEMORY: &str = "runtime.release_memory";
}

#[derive(Clone)]
pub struct BackendClient {
    lease: SharedLease,
}

impl BackendClient {
    #[must_use]
    pub fn new(lease: SharedLease) -> Self {
        Self { lease }
    }

    #[must_use]
    pub fn lease(&self) -> &SharedLease {
        &self.lease
    }

    pub async fn call(&self, method: &str, params: JsonValue) -> Result<JsonValue> {
        self.lease
            .send_rpc(method, params)
            .await
            .map_err(lease_error_to_domain)
    }

    /// For RPCs that legitimately run for minutes (`generate.start` blocks until
    /// the whole mesh pipeline completes). The transport's short default would
    /// kill every real generation during model load alone.
    pub async fn call_long_running(&self, method: &str, params: JsonValue) -> Result<JsonValue> {
        self.lease
            .send_rpc_with_timeout(method, params, LONG_RUNNING_RPC_TIMEOUT)
            .await
            .map_err(lease_error_to_domain)
    }
}

pub const LONG_RUNNING_RPC_TIMEOUT: std::time::Duration =
    std::time::Duration::from_secs(60 * 60);

#[must_use]
pub fn lease_error_to_domain(err: LeaseError) -> Trellis2Error {
    match err {
        LeaseError::Rpc { code, message } => Trellis2Error::Rpc { code, message },
        LeaseError::Timeout => Trellis2Error::Internal("worker rpc timed out".into()),
        LeaseError::WorkerCrashed => Trellis2Error::RuntimeUnavailable("worker crashed".into()),
        LeaseError::Cancelled => Trellis2Error::Cancelled,
        LeaseError::Transport(msg) => Trellis2Error::Internal(format!("transport: {msg}")),
    }
}

#[async_trait]
pub trait LeaseFactory: Send + Sync {
    async fn acquire(&self) -> Result<SharedLease>;
}

/// Cached warm worker plus the count of generations currently using it. Both
/// live under one mutex so "release when the last generation finishes" is
/// atomic against a new generation starting — a worker is never killed mid-job.
struct ProviderState {
    client: Option<BackendClient>,
    active: usize,
}

pub struct LeaseProvider {
    factory: Arc<dyn LeaseFactory>,
    state: Mutex<ProviderState>,
}

impl LeaseProvider {
    #[must_use]
    pub fn new(factory: Arc<dyn LeaseFactory>) -> Self {
        Self {
            factory,
            state: Mutex::new(ProviderState {
                client: None,
                active: 0,
            }),
        }
    }

    pub async fn spawn_if_needed(&self) -> Result<BackendClient> {
        let mut st = self.state.lock().await;
        if let Some(existing) = st
            .client
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned()
        {
            return Ok(existing);
        }
        // Release the dead/failed lease before replacing it — dropping it
        // silently leaks the worker process (and its GiB of weights).
        if let Some(stale) = st.client.take() {
            let _ = stale.lease().release().await;
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        st.client = Some(client.clone());
        Ok(client)
    }

    /// Acquire the worker for a generation AND count it in-flight, atomically
    /// under one lock — so a concurrent [`Self::end_generation`] cannot release
    /// the worker between acquiring it and registering the job. Pair every
    /// successful call with exactly one `end_generation`.
    pub async fn acquire_for_generation(&self) -> Result<BackendClient> {
        let mut st = self.state.lock().await;
        if let Some(existing) = st
            .client
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned()
        {
            st.active += 1;
            return Ok(existing);
        }
        if let Some(stale) = st.client.take() {
            let _ = stale.lease().release().await;
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        st.client = Some(client.clone());
        st.active += 1;
        Ok(client)
    }

    /// Mark a generation finished. When it was the LAST in-flight job, release
    /// the warm worker so its GPU memory is reclaimed while idle. A job that
    /// starts before this runs keeps `active > 0`, so the worker is never killed
    /// out from under a live generation.
    pub async fn end_generation(&self) {
        let to_release = {
            let mut st = self.state.lock().await;
            if st.active == 0 {
                None
            } else {
                st.active -= 1;
                if st.active == 0 {
                    st.client.take()
                } else {
                    None
                }
            }
        };
        if let Some(client) = to_release {
            let _ = client.lease().release().await;
        }
    }

    pub async fn current(&self) -> Option<BackendClient> {
        self.state.lock().await.client.clone()
    }

    /// Peeks the cached lease without ever spawning a worker. Returns the
    /// client only when an already-running lease is serviceable, so metadata
    /// queries never boot the Python+GPU worker just to be answered.
    pub async fn current_if_ready(&self) -> Option<BackendClient> {
        self.state
            .lock()
            .await
            .client
            .as_ref()
            .filter(|c| is_serviceable(c.lease().state()))
            .cloned()
    }

    pub async fn stop(&self) -> Result<()> {
        let taken = {
            let mut st = self.state.lock().await;
            st.client.take()
        };
        if let Some(client) = taken {
            client
                .lease()
                .release()
                .await
                .map_err(lease_error_to_domain)?;
        }
        Ok(())
    }
}

#[must_use]
const fn is_serviceable(state: LeaseState) -> bool {
    matches!(
        state,
        LeaseState::Starting | LeaseState::Ready | LeaseState::Busy
    )
}

#[cfg(test)]
mod release_when_idle_tests {
    use super::*;
    use crate::host_contract::{
        BackendRuntimeLease, LeaseError as HcLeaseError, NotificationStream,
    };
    use std::sync::atomic::{AtomicUsize, Ordering};

    struct FakeLease {
        released: Arc<AtomicUsize>,
    }

    #[async_trait]
    impl BackendRuntimeLease for FakeLease {
        fn state(&self) -> LeaseState {
            LeaseState::Ready
        }
        async fn send_rpc(
            &self,
            _method: &str,
            _params: JsonValue,
        ) -> std::result::Result<JsonValue, HcLeaseError> {
            Ok(JsonValue::Null)
        }
        async fn send_rpc_with_timeout(
            &self,
            _method: &str,
            _params: JsonValue,
            _timeout: std::time::Duration,
        ) -> std::result::Result<JsonValue, HcLeaseError> {
            Ok(JsonValue::Null)
        }
        async fn subscribe_notifications(&self) -> NotificationStream {
            Box::pin(futures::stream::empty())
        }
        async fn release(&self) -> std::result::Result<(), HcLeaseError> {
            self.released.fetch_add(1, Ordering::SeqCst);
            Ok(())
        }
    }

    struct FakeFactory {
        acquired: Arc<AtomicUsize>,
        released: Arc<AtomicUsize>,
    }

    #[async_trait]
    impl LeaseFactory for FakeFactory {
        async fn acquire(&self) -> Result<SharedLease> {
            self.acquired.fetch_add(1, Ordering::SeqCst);
            Ok(Arc::new(FakeLease {
                released: self.released.clone(),
            }) as SharedLease)
        }
    }

    #[tokio::test]
    async fn worker_released_only_when_last_generation_finishes() {
        let acquired = Arc::new(AtomicUsize::new(0));
        let released = Arc::new(AtomicUsize::new(0));
        let provider = LeaseProvider::new(Arc::new(FakeFactory {
            acquired: acquired.clone(),
            released: released.clone(),
        }));

        let _c1 = provider.acquire_for_generation().await.unwrap();
        assert_eq!(acquired.load(Ordering::SeqCst), 1);

        let _c2 = provider.acquire_for_generation().await.unwrap();
        assert_eq!(acquired.load(Ordering::SeqCst), 1, "warm worker reused");

        provider.end_generation().await;
        assert_eq!(
            released.load(Ordering::SeqCst),
            0,
            "kept while a job is active"
        );
        assert!(provider.current().await.is_some());

        provider.end_generation().await;
        assert_eq!(released.load(Ordering::SeqCst), 1, "released when idle");
        assert!(provider.current().await.is_none(), "slot cleared");

        let _c3 = provider.acquire_for_generation().await.unwrap();
        assert_eq!(
            acquired.load(Ordering::SeqCst),
            2,
            "fresh worker after idle release"
        );
    }

    #[tokio::test]
    async fn end_generation_without_active_is_safe() {
        let acquired = Arc::new(AtomicUsize::new(0));
        let released = Arc::new(AtomicUsize::new(0));
        let provider = LeaseProvider::new(Arc::new(FakeFactory { acquired, released }));
        provider.end_generation().await;
        assert!(provider.current().await.is_none());
    }
}
