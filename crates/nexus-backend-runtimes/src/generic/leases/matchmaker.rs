//! In-flight-RPC matchmaker. Correlates outbound JSON-RPC 2.0 requests
//! with inbound responses by their shared `id` field.
//!
//! The matchmaker is decoupled from the underlying transport: producers
//! allocate an id via [`Matchmaker::allocate`] and then write the request
//! frame themselves. A dedicated reader task delivers inbound response
//! frames to [`Matchmaker::resolve`], which wakes the matching awaiter.

use std::collections::HashMap;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::{Arc, Mutex};

use tokio::sync::oneshot;

use super::error::LeaseError;
use super::framer::RpcResponse;

/// Reason a pending RPC was terminated before a response arrived. Copy so
/// [`Matchmaker::fail_all`] can broadcast one reason to every waiter
/// without cloning [`LeaseError`] (which is not Clone).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MatchmakerFailure {
    /// Worker process crashed or closed stdout unexpectedly.
    WorkerCrashed,
    /// Lease was released cooperatively; any inflight requests are cancelled.
    Cancelled,
}

impl From<MatchmakerFailure> for LeaseError {
    fn from(f: MatchmakerFailure) -> Self {
        match f {
            MatchmakerFailure::WorkerCrashed => LeaseError::WorkerCrashed,
            MatchmakerFailure::Cancelled => LeaseError::Cancelled,
        }
    }
}

type PendingMap = HashMap<u64, oneshot::Sender<Result<RpcResponse, MatchmakerFailure>>>;

/// Allocates JSON-RPC ids and matches responses back to awaiters.
pub struct Matchmaker {
    next_id: AtomicU64,
    pending: Arc<Mutex<PendingMap>>,
}

impl Matchmaker {
    pub fn new() -> Self {
        Self {
            next_id: AtomicU64::new(1),
            pending: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    /// Reserve a fresh id + inflight slot. Returns the id the caller must
    /// use when writing the request frame, plus the receiver the caller
    /// awaits for the response.
    pub fn allocate(
        &self,
    ) -> (
        u64,
        oneshot::Receiver<Result<RpcResponse, MatchmakerFailure>>,
    ) {
        let id = self.next_id.fetch_add(1, Ordering::Relaxed);
        let (tx, rx) = oneshot::channel();
        self.pending
            .lock()
            .expect("matchmaker mutex poisoned")
            .insert(id, tx);
        (id, rx)
    }

    /// Remove an inflight slot without resolving it (e.g. on local timeout).
    /// The receiver hands back a closed-channel error on await.
    pub fn cancel(&self, id: u64) {
        self.pending
            .lock()
            .expect("matchmaker mutex poisoned")
            .remove(&id);
    }

    /// Deliver a response to whoever is awaiting its id. Responses for
    /// unknown ids are dropped silently (worker sent a late reply after a
    /// timeout cleared the slot).
    pub fn resolve(&self, resp: RpcResponse) {
        let sender = self
            .pending
            .lock()
            .expect("matchmaker mutex poisoned")
            .remove(&resp.id);
        if let Some(tx) = sender {
            let _ = tx.send(Ok(resp));
        }
    }

    /// Abort every inflight request with the given failure reason. Called
    /// by the lease shutdown path on worker crash or cooperative release.
    pub fn fail_all(&self, reason: MatchmakerFailure) {
        let drained: Vec<_> = self
            .pending
            .lock()
            .expect("matchmaker mutex poisoned")
            .drain()
            .collect();
        for (_, tx) in drained {
            let _ = tx.send(Err(reason));
        }
    }

    /// Current inflight count (test hook; not part of public API contract).
    #[cfg(test)]
    pub(crate) fn inflight(&self) -> usize {
        self.pending
            .lock()
            .expect("matchmaker mutex poisoned")
            .len()
    }
}

impl Default for Matchmaker {
    fn default() -> Self {
        Self::new()
    }
}
