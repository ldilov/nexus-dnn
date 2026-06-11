//! Per-run node-status emitter.
//!
//! `RunNodeEmitter` is the generic, extension-agnostic capability an
//! extension run uses to drive its deployment's Workflow Graph overlay: it
//! publishes `NexusEvent::Node*` variants keyed by `(run_id, node_id)` onto the
//! orchestration [`EventBus`], which `/api/v1/events` streams and the frontend
//! overlay already consumes.
//!
//! It holds zero extension-specific knowledge — the run_id and the workflow
//! node ids are supplied by the caller (constitution Principle V / the
//! host↔extension boundary rule). Producers map their own domain stages to
//! workflow node ids before calling these methods.

use std::sync::Arc;

use crate::bus::{EventBus, PublishedEvent};
use crate::types::NexusEvent;

/// Publishes node-status events for a single run, keyed by `(run_id, node_id)`.
///
/// Cheap to clone — it is an `Arc` to the bus plus the run id — so a producer
/// can hand copies to per-stage callbacks.
#[derive(Clone)]
pub struct RunNodeEmitter {
    bus: Arc<dyn EventBus>,
    run_id: String,
}

impl RunNodeEmitter {
    /// Bind an emitter to one run on the given bus.
    pub fn new(bus: Arc<dyn EventBus>, run_id: impl Into<String>) -> Self {
        Self {
            bus,
            run_id: run_id.into(),
        }
    }

    /// The run this emitter publishes for.
    #[must_use]
    pub fn run_id(&self) -> &str {
        &self.run_id
    }

    /// A node has been assigned to a worker but not yet started.
    pub fn scheduled(
        &self,
        node_id: impl Into<String>,
        worker_id: impl Into<String>,
    ) -> PublishedEvent {
        self.bus.publish(NexusEvent::NodeScheduled {
            run_id: self.run_id.clone(),
            node_id: node_id.into(),
            worker_id: worker_id.into(),
        })
    }

    /// A node has begun executing.
    pub fn started(&self, node_id: impl Into<String>) -> PublishedEvent {
        self.bus.publish(NexusEvent::NodeStarted {
            run_id: self.run_id.clone(),
            node_id: node_id.into(),
        })
    }

    /// Incremental progress for a running node. `percent` is clamped to 0–100.
    pub fn progress(
        &self,
        node_id: impl Into<String>,
        percent: u8,
        message: impl Into<String>,
    ) -> PublishedEvent {
        self.bus.publish(NexusEvent::NodeProgress {
            run_id: self.run_id.clone(),
            node_id: node_id.into(),
            percent: percent.min(100),
            message: message.into(),
        })
    }

    /// A node finished successfully, optionally producing artifacts.
    pub fn completed(
        &self,
        node_id: impl Into<String>,
        artifact_ids: Vec<String>,
    ) -> PublishedEvent {
        self.bus.publish(NexusEvent::NodeCompleted {
            run_id: self.run_id.clone(),
            node_id: node_id.into(),
            artifact_ids,
        })
    }

    /// A node failed terminally.
    pub fn failed(&self, node_id: impl Into<String>, error: impl Into<String>) -> PublishedEvent {
        self.bus.publish(NexusEvent::NodeFailed {
            run_id: self.run_id.clone(),
            node_id: node_id.into(),
            error: error.into(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bus::BroadcastEventBus;
    use serde_json::Value;

    fn wire(event: &NexusEvent) -> Value {
        serde_json::to_value(event).expect("event serializes")
    }

    #[test]
    fn started_emits_node_started_keyed_by_run_and_node() {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus, "run-1");

        // publish() returns the PublishedEvent synchronously and also lands it
        // in the replay buffer + broadcast channel that /api/v1/events streams.
        let published = emitter.started("clip_diffusion");

        let json = wire(&published.event);
        assert_eq!(json["type"], "node_started");
        assert_eq!(json["run_id"], "run-1");
        assert_eq!(json["node_id"], "clip_diffusion");
    }

    #[test]
    fn published_event_lands_in_the_replay_buffer() {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus.clone(), "run-1b");

        emitter.started("anchor_encode");

        let replayed = bus.replay_after(None);
        assert_eq!(replayed.len(), 1);
        assert_eq!(wire(&replayed[0].event)["node_id"], "anchor_encode");
    }

    #[test]
    fn progress_clamps_percent_and_carries_message() {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus.clone(), "run-2");

        let published = emitter.progress("anchor_encode", 250, "encoding");

        match published.event {
            NexusEvent::NodeProgress {
                run_id,
                node_id,
                percent,
                message,
            } => {
                assert_eq!(run_id, "run-2");
                assert_eq!(node_id, "anchor_encode");
                assert_eq!(percent, 100, "percent clamps to 100");
                assert_eq!(message, "encoding");
            }
            other => panic!("expected NodeProgress, got {other:?}"),
        }
    }

    #[test]
    fn lifecycle_serializes_to_the_overlay_wire_shape() {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus, "run-3");

        assert_eq!(wire(&emitter.started("mux").event)["type"], "node_started");
        assert_eq!(
            wire(&emitter.completed("mux", vec!["art-1".into()]).event)["type"],
            "node_completed"
        );
        assert_eq!(wire(&emitter.failed("mux", "boom").event)["type"], "node_failed");
        let scheduled = wire(&emitter.scheduled("mux", "worker-7").event);
        assert_eq!(scheduled["type"], "node_scheduled");
        assert_eq!(scheduled["worker_id"], "worker-7");
    }

    #[test]
    fn run_id_is_exposed() {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus, "run-4");
        assert_eq!(emitter.run_id(), "run-4");
    }
}
