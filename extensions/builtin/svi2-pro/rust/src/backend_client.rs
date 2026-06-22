use std::sync::Arc;

use async_trait::async_trait;
use serde_json::Value as JsonValue;
use tokio::sync::Mutex;

use crate::domain::{Result, Svi2Error};
use crate::host_contract::{LeaseError, LeaseState, SharedLease};

pub mod methods {
    pub const PRESETS_LIST: &str = "svi2.presets.list";
    pub const RENDER_START: &str = "svi2.video.render.start";
    pub const RENDER_CANCEL: &str = "svi2.video.render.cancel";
    pub const HANDSHAKE: &str = "handshake";
    pub const ATTENTION_CAPABILITIES: &str = "svi2.attention.capabilities";
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

    /// For RPCs that legitimately run for hours (`render.start` blocks until
    /// the whole chain renders). The transport's 30s default would kill every
    /// real render during model load alone.
    pub async fn call_long_running(&self, method: &str, params: JsonValue) -> Result<JsonValue> {
        self.lease
            .send_rpc_with_timeout(method, params, LONG_RUNNING_RPC_TIMEOUT)
            .await
            .map_err(lease_error_to_domain)
    }
}

pub const LONG_RUNNING_RPC_TIMEOUT: std::time::Duration =
    std::time::Duration::from_secs(24 * 60 * 60);

pub fn lease_error_to_domain(err: LeaseError) -> Svi2Error {
    match err {
        LeaseError::Rpc { code, message } => Svi2Error::Rpc { code, message },
        LeaseError::Timeout => Svi2Error::Internal("worker rpc timed out".into()),
        LeaseError::WorkerCrashed => Svi2Error::RuntimeUnavailable("worker crashed".into()),
        LeaseError::Cancelled => Svi2Error::Cancelled,
        LeaseError::Transport(msg) => Svi2Error::Internal(format!("transport: {msg}")),
    }
}

#[async_trait]
pub trait LeaseFactory: Send + Sync {
    async fn acquire(&self) -> Result<SharedLease>;
}

/// Cached warm worker plus the count of renders currently using it. Both
/// live under one mutex so "release when the last render finishes" is atomic
/// against a new render starting — a worker is never killed mid-render.
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
        // silently leaks the worker process (and its tens of GiB of weights).
        if let Some(stale) = st.client.take() {
            let _ = stale.lease().release().await;
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        st.client = Some(client.clone());
        Ok(client)
    }

    /// Acquire the worker for a render AND count this render in-flight,
    /// atomically under one lock — so a concurrent [`Self::end_render`] cannot
    /// release the worker between acquiring it and registering the render.
    /// Pair every successful call with exactly one `end_render`.
    pub async fn acquire_for_render(&self) -> Result<BackendClient> {
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
        // Release the dead/failed lease before replacing it — dropping it
        // silently leaks the worker process (and its tens of GiB of weights).
        if let Some(stale) = st.client.take() {
            let _ = stale.lease().release().await;
        }
        let lease = self.factory.acquire().await?;
        let client = BackendClient::new(lease);
        st.client = Some(client.clone());
        st.active += 1;
        Ok(client)
    }

    /// Mark a render finished. When it was the LAST in-flight render, release
    /// the warm worker so its GPU memory is reclaimed while idle. A render
    /// that starts before this runs keeps `active > 0`, so the worker is never
    /// killed out from under a live render.
    pub async fn end_render(&self) {
        let to_release = {
            let mut st = self.state.lock().await;
            st.active = st.active.saturating_sub(1);
            if st.active == 0 {
                st.client.take()
            } else {
                None
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
    /// queries never boot the 30GB Python+GPU worker just to be answered.
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
    async fn worker_released_only_when_last_render_finishes() {
        let acquired = Arc::new(AtomicUsize::new(0));
        let released = Arc::new(AtomicUsize::new(0));
        let provider = LeaseProvider::new(Arc::new(FakeFactory {
            acquired: acquired.clone(),
            released: released.clone(),
        }));

        // First render acquires the worker (and counts itself in-flight).
        let _c1 = provider.acquire_for_render().await.unwrap();
        assert_eq!(acquired.load(Ordering::SeqCst), 1);

        // A second concurrent render reuses the same warm worker.
        let _c2 = provider.acquire_for_render().await.unwrap();
        assert_eq!(acquired.load(Ordering::SeqCst), 1, "warm worker reused");

        // First render finishes — one still active, worker NOT released.
        provider.end_render().await;
        assert_eq!(
            released.load(Ordering::SeqCst),
            0,
            "kept while a render is active"
        );
        assert!(provider.current().await.is_some());

        // Last render finishes — worker released (VRAM reclaimed while idle).
        provider.end_render().await;
        assert_eq!(released.load(Ordering::SeqCst), 1, "released when idle");
        assert!(provider.current().await.is_none(), "slot cleared");

        // The next render spawns a fresh worker.
        let _c3 = provider.acquire_for_render().await.unwrap();
        assert_eq!(
            acquired.load(Ordering::SeqCst),
            2,
            "fresh worker after idle release"
        );
    }

    #[tokio::test]
    async fn end_render_without_active_is_safe() {
        let acquired = Arc::new(AtomicUsize::new(0));
        let released = Arc::new(AtomicUsize::new(0));
        let provider = LeaseProvider::new(Arc::new(FakeFactory { acquired, released }));
        // No active renders — saturating_sub keeps it at 0, no panic, no release.
        provider.end_render().await;
        assert!(provider.current().await.is_none());
    }
}
