//! Notification fanout for lease subscribers.
//!
//! JSON-RPC 2.0 notifications from a runtime worker (frames with `method`
//! and no `id`) are published on a Tokio broadcast channel so multiple
//! observers can receive them concurrently. The reader task calls
//! [`NotificationFanout::publish`] from a single thread; subscribers call
//! [`NotificationFanout::subscribe`] and consume via the returned receiver.
//!
//! Per FR-046, subscribers that observe `RecvError::Lagged(n)` MUST log a
//! structured `tracing::warn!` rather than panic; [`receive_with_lag_log`]
//! wraps that pattern.

use tokio::sync::broadcast;
use tokio::sync::broadcast::error::RecvError;
use tracing::warn;

use super::LeaseNotification;
use crate::generic::ids::RuntimeLeaseId;

/// Capacity of the per-lease notification backlog. Sized to absorb a few
/// hundred progress frames per second during heavy synthesis runs without
/// dropping; subscribers that fall behind by more than this many messages
/// observe a `Lagged(n)` hiccup which is logged at warn level (FR-046).
pub const NOTIFICATION_BACKLOG_CAPACITY: usize = 1024;

/// Fan-out for one lease's notification stream.
#[derive(Clone)]
pub struct NotificationFanout {
    sender: broadcast::Sender<LeaseNotification>,
    lease_id: RuntimeLeaseId,
}

impl NotificationFanout {
    pub fn new(lease_id: RuntimeLeaseId) -> Self {
        let (sender, _) = broadcast::channel(NOTIFICATION_BACKLOG_CAPACITY);
        Self { sender, lease_id }
    }

    /// Create a fanout with a custom capacity. Prefer [`new`] unless you
    /// have a measured reason to deviate — tests use this for lag-behaviour
    /// exercises.
    pub fn with_capacity(lease_id: RuntimeLeaseId, capacity: usize) -> Self {
        let (sender, _) = broadcast::channel(capacity);
        Self { sender, lease_id }
    }

    pub fn lease_id(&self) -> RuntimeLeaseId {
        self.lease_id
    }

    /// Enqueue a notification for every live subscriber. Returns the count
    /// of subscribers delivered to; drops silently when no one is listening.
    pub fn publish(&self, n: LeaseNotification) -> usize {
        self.sender.send(n).unwrap_or(0)
    }

    pub fn subscribe(&self) -> broadcast::Receiver<LeaseNotification> {
        self.sender.subscribe()
    }

    /// Current subscriber count. Non-authoritative (subscribers may drop
    /// between observation and use) — intended for metrics/diagnostics.
    pub fn subscriber_count(&self) -> usize {
        self.sender.receiver_count()
    }
}

/// Idiomatic receive that logs the `Lagged` skip and yields the next
/// message, matching FR-046. Returns `None` when the sender has been
/// dropped (end of stream).
pub async fn receive_with_lag_log(
    lease_id: RuntimeLeaseId,
    rx: &mut broadcast::Receiver<LeaseNotification>,
) -> Option<LeaseNotification> {
    loop {
        match rx.recv().await {
            Ok(n) => return Some(n),
            Err(RecvError::Closed) => return None,
            Err(RecvError::Lagged(n)) => {
                warn!(
                    lease_id = %lease_id,
                    lagged = n,
                    capacity = NOTIFICATION_BACKLOG_CAPACITY,
                    "lease notification subscriber lagged — dropped frames"
                );
            }
        }
    }
}
