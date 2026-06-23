use std::collections::HashMap;
use std::sync::Arc;

use futures::StreamExt;
use nexus_events::emitter::RunNodeEmitter;
use serde_json::{json, Value as JsonValue};
use tokio::sync::{broadcast, Mutex};

use crate::backend_client::{methods, BackendClient, LeaseProvider};
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

/// Minimum plausible size (bytes) for a salvaged mp4 — guards against marking
/// a truncated or empty encode as a completed render.
const MIN_SALVAGE_BYTES: u64 = 4096;

/// A completed render output recovered from disk after a worker process-death
/// crash. `report_json` is the verbatim `render_report.json` when present.
struct SalvagedOutput {
    output_path: String,
    report_json: Option<String>,
    report_value: JsonValue,
}

/// After a worker *process* crash (stdout EOF → `WorkerCrashed`), the render
/// may have finished writing its output to disk before the worker died — only
/// the RPC reply was lost. Look in the job's render dir for a completed output
/// and recover it instead of discarding a near-complete render.
///
/// Tier A: `render_report.json` (the worker writes it only on a fully
/// successful render) is authoritative — use its `output_path` and the report
/// verbatim. Tier B: no report, but the newest non-trivial `*.mp4` in the dir
/// is the final encode (the pipeline writes base → upscaled → interpolated in
/// order, so newest = final). Returns `None` when nothing recoverable exists.
async fn salvage_completed_output(params: &JsonValue) -> Option<SalvagedOutput> {
    let base = params.get("output_path").and_then(JsonValue::as_str)?;
    let dir = std::path::Path::new(base).parent()?;

    let report_path = dir.join("render_report.json");
    if let Ok(text) = tokio::fs::read_to_string(&report_path).await {
        if let Ok(value) = serde_json::from_str::<JsonValue>(&text) {
            if let Some(out) = value.get("output_path").and_then(JsonValue::as_str) {
                if is_nontrivial_file(out).await {
                    return Some(SalvagedOutput {
                        output_path: out.to_string(),
                        report_json: Some(text),
                        report_value: value,
                    });
                }
            }
        }
    }

    let newest = newest_mp4(dir).await?;
    Some(SalvagedOutput {
        output_path: newest,
        report_json: None,
        report_value: JsonValue::Null,
    })
}

async fn is_nontrivial_file(path: &str) -> bool {
    matches!(
        tokio::fs::metadata(path).await,
        Ok(meta) if meta.is_file() && meta.len() >= MIN_SALVAGE_BYTES
    )
}

/// Newest `*.mp4` in `dir` whose size clears [`MIN_SALVAGE_BYTES`].
async fn newest_mp4(dir: &std::path::Path) -> Option<String> {
    let mut entries = tokio::fs::read_dir(dir).await.ok()?;
    let mut best: Option<(std::time::SystemTime, String)> = None;
    while let Ok(Some(entry)) = entries.next_entry().await {
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("mp4") {
            continue;
        }
        let Ok(meta) = entry.metadata().await else {
            continue;
        };
        if !meta.is_file() || meta.len() < MIN_SALVAGE_BYTES {
            continue;
        }
        let Ok(modified) = meta.modified() else {
            continue;
        };
        let is_newer = match &best {
            Some((seen, _)) => modified > *seen,
            None => true,
        };
        if is_newer {
            best = Some((modified, path.to_string_lossy().into_owned()));
        }
    }
    best.map(|(_, p)| p)
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
    /// Owns the in-flight render count. On completion the task calls
    /// `end_render`, which releases the worker (frees VRAM) once idle.
    pub provider: Arc<LeaseProvider>,
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
            provider,
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

        let outcome = client
            .call_long_running(methods::RENDER_START, params.clone())
            .await;

        relay.abort();

        match outcome {
            // A cooperative cancel resolves the long-running call with a
            // `cancelled` reply instead of an error. Honour it as terminal —
            Ok(result) if result.get("status").and_then(JsonValue::as_str) == Some("cancelled") => {
                let _ = store.mark_cancelled(&job_id).await;
                if let Some(em) = &emitter {
                    let transitions = { tracker.lock().await.on_failure() };
                    for transition in &transitions {
                        emit_transition(em, transition);
                    }
                }
            }
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
                // Salvage a process-death crash whose output finished on disk
                // (RPC reply lost). A real `Rpc` error is never salvaged.
                let salvaged = if matches!(err, crate::domain::Svi2Error::RuntimeUnavailable(_)) {
                    salvage_completed_output(&params).await
                } else {
                    None
                };
                if let Some(salvage) = salvaged {
                    tracing::warn!(
                        job_id = %job_id.as_str(),
                        output = %salvage.output_path,
                        "worker crashed but a completed output was on disk — salvaged render"
                    );
                    let _ = store
                        .mark_completed(
                            &job_id,
                            Some(&salvage.output_path),
                            salvage.report_json.as_deref(),
                        )
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
                                    "output_path": salvage.output_path,
                                    "render_report": salvage.report_value,
                                }),
                            },
                        )
                        .await;
                } else {
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
        }

        // Drop our lease handle, then signal the provider so it releases the
        // worker (frees VRAM) once no other render is in flight.
        drop(client);
        provider.end_render().await;

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
        assert!(matches!(
            ev[0].event,
            NexusEvent::NodeProgress { percent: 42, .. }
        ));
        assert!(matches!(ev[1].event, NexusEvent::NodeCompleted { .. }));
        assert!(matches!(ev[2].event, NexusEvent::NodeFailed { .. }));
    }
}
