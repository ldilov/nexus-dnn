use std::collections::HashMap;
use std::sync::Arc;

use futures::StreamExt;
use nexus_events::emitter::RunNodeEmitter;
use serde_json::{json, Value as JsonValue};
use tokio::sync::{broadcast, Mutex};

use crate::backend_client::{methods, BackendClient};
use crate::domain::JobId;
use crate::host_contract::NotificationEnvelope;
use crate::node_events::{StageTracker, Transition};
use crate::storage::Store;

/// Publish one node transition on the run's emitter.
fn emit_transition(emitter: &RunNodeEmitter, transition: &Transition) {
    match transition {
        Transition::Started(node) => {
            emitter.started(*node);
        }
        Transition::Progress(node, percent) => {
            emitter.progress(*node, *percent, "");
        }
        Transition::Completed(node) => {
            emitter.completed(*node, Vec::new());
        }
        Transition::Failed(node) => {
            emitter.failed(*node, "render failed");
        }
    }
}

const CHANNEL_CAPACITY: usize = 512;

/// Per-job event sink: a replay buffer of every frame seen so far plus a
/// live broadcast sender. A late SSE subscriber drains the buffer first,
/// then tails the live channel — so no frame is lost regardless of when
/// the browser opens the stream relative to the render starting.
struct JobSink {
    buffer: Vec<NotificationEnvelope>,
    live: broadcast::Sender<NotificationEnvelope>,
    terminal: bool,
}

#[derive(Clone)]
pub struct RenderChannels {
    inner: Arc<Mutex<HashMap<String, JobSink>>>,
}

pub struct JobSubscription {
    pub backlog: Vec<NotificationEnvelope>,
    pub live: Option<broadcast::Receiver<NotificationEnvelope>>,
}

impl RenderChannels {
    #[must_use]
    pub fn new() -> Self {
        Self {
            inner: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub async fn register(&self, job_id: &str) {
        let mut map = self.inner.lock().await;
        map.entry(job_id.to_string()).or_insert_with(|| {
            let (live, _rx) = broadcast::channel(CHANNEL_CAPACITY);
            JobSink {
                buffer: Vec::new(),
                live,
                terminal: false,
            }
        });
    }

    async fn push(&self, job_id: &str, note: NotificationEnvelope) {
        let mut map = self.inner.lock().await;
        if let Some(sink) = map.get_mut(job_id) {
            if note.method == "svi2.video.done" || note.method == "svi2.video.error" {
                sink.terminal = true;
            }
            sink.buffer.push(note.clone());
            let _ = sink.live.send(note);
        }
    }

    /// Atomically snapshot the backlog and subscribe to live frames. When
    /// the job already reached a terminal frame, `live` is `None` and the
    /// backlog alone is complete.
    pub async fn subscribe(&self, job_id: &str) -> Option<JobSubscription> {
        let map = self.inner.lock().await;
        let sink = map.get(job_id)?;
        let live = if sink.terminal {
            None
        } else {
            Some(sink.live.subscribe())
        };
        Some(JobSubscription {
            backlog: sink.buffer.clone(),
            live,
        })
    }

    pub async fn remove(&self, job_id: &str) {
        self.inner.lock().await.remove(job_id);
    }
}

impl Default for RenderChannels {
    fn default() -> Self {
        Self::new()
    }
}

pub struct RenderTask {
    pub job_id: JobId,
    pub params: JsonValue,
    pub client: BackendClient,
    pub store: Store,
    pub channels: RenderChannels,
    /// When `Some`, per-node status is published as the render progresses
    /// (spec 057). `None` keeps the legacy behaviour (no graph overlay).
    pub emitter: Option<RunNodeEmitter>,
}

/// Drives one render to completion in the background. Subscribes to the
/// worker's notification stream, relays every frame into the per-job sink
/// (buffered + live), fires the long-running `render.start` RPC, and
/// persists the terminal state. The worker's `render.start` returns only
/// after emitting `svi2.video.done`, so the RPC result carries the report.
pub fn spawn_render(task: RenderTask) {
    tokio::spawn(async move {
        let RenderTask {
            job_id,
            params,
            client,
            store,
            channels,
            emitter,
        } = task;

        channels.register(job_id.as_str()).await;
        let _ = store.mark_running(&job_id).await;

        // Shared per-run stage tracker: the relay task feeds worker
        // notifications in as they arrive; the outcome arm closes it out.
        let tracker = Arc::new(Mutex::new(StageTracker::new()));

        let mut stream = client.lease().subscribe_notifications().await;
        let relay_channels = channels.clone();
        let relay_job = job_id.as_str().to_string();
        let relay_emitter = emitter.clone();
        let relay_tracker = tracker.clone();
        let relay = tokio::spawn(async move {
            // Suppress repeated identical progress so a busy diffusion loop
            // doesn't flood the bus (FR-010).
            let mut last_progress: Option<(&'static str, u8)> = None;
            while let Some(note) = stream.next().await {
                // The worker emits its own terminal `done`/`error`
                // notification before `render.start` returns. We suppress
                // those here and let the dispatcher emit the authoritative
                // terminal frame *after* persisting the job — so an SSE
                // client never observes `done` ahead of the committed row.
                if note.method == "svi2.video.done" || note.method == "svi2.video.error" {
                    continue;
                }
                if let Some(em) = &relay_emitter {
                    let transitions = {
                        let mut t = relay_tracker.lock().await;
                        t.on_notification(&note.method, &note.params)
                    };
                    for transition in &transitions {
                        if let Transition::Progress(node, percent) = transition {
                            if last_progress == Some((*node, *percent)) {
                                continue;
                            }
                            last_progress = Some((*node, *percent));
                        }
                        emit_transition(em, transition);
                    }
                }
                relay_channels.push(&relay_job, note).await;
            }
        });

        let outcome = client.call_long_running(methods::RENDER_START, params).await;

        relay.abort();

        match outcome {
            Ok(result) => {
                let output_path = result
                    .get("output_path")
                    .and_then(JsonValue::as_str)
                    .map(str::to_string);
                let report = result.get("render_report").cloned();
                let report_json = report.as_ref().and_then(|r| serde_json::to_string(r).ok());
                let _ = store
                    .mark_completed(&job_id, output_path.as_deref(), report_json.as_deref())
                    .await;
                if let Some(em) = &emitter {
                    let transitions = { tracker.lock().await.on_success() };
                    for transition in &transitions {
                        emit_transition(em, transition);
                    }
                }
                channels
                    .push(
                        job_id.as_str(),
                        NotificationEnvelope {
                            method: "svi2.video.done".to_string(),
                            params: json!({
                                "output_path": output_path,
                                "render_report": report,
                            }),
                        },
                    )
                    .await;
            }
            Err(err) => {
                let (code, message) = match &err {
                    crate::domain::Svi2Error::Rpc { code, message } => (*code, message.clone()),
                    other => (-32603, other.to_string()),
                };
                let _ = store
                    .mark_failed(&job_id, Some(&code.to_string()), &message)
                    .await;
                if let Some(em) = &emitter {
                    let transitions = { tracker.lock().await.on_failure() };
                    for transition in &transitions {
                        emit_transition(em, transition);
                    }
                }
                channels
                    .push(
                        job_id.as_str(),
                        NotificationEnvelope {
                            method: "svi2.video.error".to_string(),
                            params: json!({ "code": code, "message": message }),
                        },
                    )
                    .await;
            }
        }

        // Retain the terminal buffer briefly so a late SSE subscriber can
        // still replay done/error before the sink is dropped.
        tokio::time::sleep(std::time::Duration::from_secs(30)).await;
        channels.remove(job_id.as_str()).await;
    });
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::node_events::node;
    use nexus_events::bus::{BroadcastEventBus, EventBus};
    use nexus_events::types::NexusEvent;

    fn fixture() -> (Arc<BroadcastEventBus>, RunNodeEmitter) {
        let bus = Arc::new(BroadcastEventBus::default());
        let emitter = RunNodeEmitter::new(bus.clone(), "run-x");
        (bus, emitter)
    }

    #[test]
    fn started_transition_publishes_node_started_keyed_by_run() {
        let (bus, emitter) = fixture();
        emit_transition(&emitter, &Transition::Started(node::DIFFUSION));
        let published = bus.replay_after(None);
        assert_eq!(published.len(), 1);
        match &published[0].event {
            NexusEvent::NodeStarted { run_id, node_id } => {
                assert_eq!(run_id, "run-x");
                assert_eq!(node_id, "clip_diffusion");
            }
            other => panic!("expected NodeStarted, got {other:?}"),
        }
    }

    #[test]
    fn progress_completed_failed_map_to_their_variants() {
        let (bus, emitter) = fixture();
        emit_transition(&emitter, &Transition::Progress(node::ANCHOR, 42));
        emit_transition(&emitter, &Transition::Completed(node::MUX));
        emit_transition(&emitter, &Transition::Failed(node::DIFFUSION));
        let ev = bus.replay_after(None);
        assert!(matches!(ev[0].event, NexusEvent::NodeProgress { percent: 42, .. }));
        assert!(matches!(ev[1].event, NexusEvent::NodeCompleted { .. }));
        assert!(matches!(ev[2].event, NexusEvent::NodeFailed { .. }));
    }
}
