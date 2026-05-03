//! Per-thread inference cancellation registry.
//!
//! The browser POSTs `/v1/chat/completions` directly to the worker port
//! and the TCP disconnect from `controller.abort()` IS the existing
//! cancel pathway — llama.cpp drops the slot when the client disconnects.
//! This registry exists so the host has a callable surface for two
//! reasons future code may rely on:
//!
//! 1. The frontend can fire-and-forget a cancel POST when navigating
//!    away mid-stream so a future server-side instrumentation hook
//!    (latency capture, audit trail) sees an explicit cancel marker
//!    rather than only a TCP RST.
//! 2. When the worker gains a slot-cancel control endpoint upstream,
//!    swapping the in-memory flag for a real shutdown call against the
//!    worker is a one-line change here.
//!
//! Today the registry stores a coarse "cancelled" flag per thread that
//! the future plumbing can consult. It is intentionally not consulted
//! by the streaming path itself because the browser owns that side of
//! the connection.

use std::collections::HashMap;
use std::sync::Arc;

use tokio::sync::RwLock;

#[derive(Default)]
pub struct InferenceCancelRegistry {
    cancelled: RwLock<HashMap<String, ()>>,
}

impl InferenceCancelRegistry {
    pub fn new() -> Arc<Self> {
        Arc::new(Self::default())
    }

    pub async fn mark_cancelled(&self, thread_id: impl Into<String>) {
        self.cancelled.write().await.insert(thread_id.into(), ());
    }

    pub async fn take_cancelled(&self, thread_id: &str) -> bool {
        self.cancelled.write().await.remove(thread_id).is_some()
    }

    pub async fn is_cancelled(&self, thread_id: &str) -> bool {
        self.cancelled.read().await.contains_key(thread_id)
    }
}
