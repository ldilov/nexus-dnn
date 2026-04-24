//! Broadcast fan-out for lease notifications.
//!
//! Multiple run-progress subscribers (HTTP SSE, internal operators) can
//! read the same stream. The inner [`tokio::sync::broadcast`] drops a
//! slow subscriber instead of stalling the sender.

use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;

use crate::host_contract::NotificationEnvelope;

pub const DEFAULT_CAPACITY: usize = 1024;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "method", rename_all = "snake_case")]
pub enum ProgressEvent {
    Progress(serde_json::Value),
    SegmentStarted(serde_json::Value),
    SegmentCompleted(serde_json::Value),
    SegmentFailed(serde_json::Value),
    Warning(serde_json::Value),
    Log(serde_json::Value),
    ModelLoadProgress(serde_json::Value),
    #[serde(other)]
    Unknown,
}

impl From<NotificationEnvelope> for ProgressEvent {
    fn from(env: NotificationEnvelope) -> Self {
        match env.method.as_str() {
            "progress" => Self::Progress(env.params),
            "segment_started" => Self::SegmentStarted(env.params),
            "segment_completed" => Self::SegmentCompleted(env.params),
            "segment_failed" => Self::SegmentFailed(env.params),
            "warning" => Self::Warning(env.params),
            "log" => Self::Log(env.params),
            "model.load.progress" => Self::ModelLoadProgress(env.params),
            _ => Self::Unknown,
        }
    }
}

pub struct NotificationFanout {
    tx: broadcast::Sender<ProgressEvent>,
}

impl NotificationFanout {
    #[must_use]
    pub fn new() -> Self {
        Self::with_capacity(DEFAULT_CAPACITY)
    }

    #[must_use]
    pub fn with_capacity(cap: usize) -> Self {
        let (tx, _) = broadcast::channel(cap);
        Self { tx }
    }

    pub fn publish(&self, event: ProgressEvent) {
        let _ = self.tx.send(event);
    }

    #[must_use]
    pub fn subscribe(&self) -> broadcast::Receiver<ProgressEvent> {
        self.tx.subscribe()
    }

    #[must_use]
    pub fn sender(&self) -> broadcast::Sender<ProgressEvent> {
        self.tx.clone()
    }
}

impl Default for NotificationFanout {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn broadcasts_to_multiple_subscribers() {
        let fanout = NotificationFanout::with_capacity(8);
        let mut a = fanout.subscribe();
        let mut b = fanout.subscribe();

        fanout.publish(ProgressEvent::Progress(serde_json::json!({"pct": 50})));

        let ra = a.recv().await.unwrap();
        let rb = b.recv().await.unwrap();
        assert!(matches!(ra, ProgressEvent::Progress(_)));
        assert!(matches!(rb, ProgressEvent::Progress(_)));
    }

    #[test]
    fn classifies_notification_methods() {
        let env = NotificationEnvelope {
            method: "segment_completed".into(),
            params: serde_json::json!({"idx": 1}),
        };
        assert!(matches!(ProgressEvent::from(env), ProgressEvent::SegmentCompleted(_)));
    }

    #[test]
    fn unknown_method_classifies_as_unknown() {
        let env = NotificationEnvelope {
            method: "unheard_of".into(),
            params: serde_json::json!({}),
        };
        assert!(matches!(ProgressEvent::from(env), ProgressEvent::Unknown));
    }
}
