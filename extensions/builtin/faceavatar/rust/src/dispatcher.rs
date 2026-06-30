use std::collections::HashMap;
use std::sync::Arc;

use futures::StreamExt;
use nexus_events::emitter::RunNodeEmitter;
use serde_json::{json, Value as JsonValue};
use tokio::sync::{broadcast, Mutex};

use crate::backend_client::{BackendClient, LeaseProvider};
use crate::domain::JobId;
use crate::host_contract::NotificationEnvelope;
use crate::node_events::{StageTracker, Transition};
use crate::storage::Store;

pub const DONE_METHOD: &str = "trellis2.generate.done";
pub const ERROR_METHOD: &str = "trellis2.generate.error";

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
            emitter.failed(*node, "generation failed");
        }
    }
}

const CHANNEL_CAPACITY: usize = 512;

/// Per-job event sink: a replay buffer of every frame seen so far plus a live
/// broadcast sender. A late SSE subscriber drains the buffer first, then tails
/// the live channel — so no frame is lost regardless of when the browser opens
/// the stream relative to the generation starting.
struct JobSink {
    buffer: Vec<NotificationEnvelope>,
    live: broadcast::Sender<NotificationEnvelope>,
    terminal: bool,
}

#[derive(Clone)]
pub struct GenerationChannels {
    inner: Arc<Mutex<HashMap<String, JobSink>>>,
}

pub struct JobSubscription {
    pub backlog: Vec<NotificationEnvelope>,
    pub live: Option<broadcast::Receiver<NotificationEnvelope>>,
}

impl GenerationChannels {
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
            if note.method == DONE_METHOD || note.method == ERROR_METHOD {
                sink.terminal = true;
            }
            sink.buffer.push(note.clone());
            let _ = sink.live.send(note);
        }
    }

    /// Atomically snapshot the backlog and subscribe to live frames. When the
    /// job already reached a terminal frame, `live` is `None` and the backlog
    /// alone is complete.
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

impl Default for GenerationChannels {
    fn default() -> Self {
        Self::new()
    }
}

/// Minimum plausible size (bytes) for a salvaged GLB — guards against marking a
/// truncated or empty export as a completed generation.
const MIN_SALVAGE_BYTES: u64 = 4096;

/// A completed GLB recovered from disk after a worker process-death crash.
struct SalvagedOutput {
    output_path: String,
    metadata_json: Option<String>,
    metadata_value: JsonValue,
}

/// After a worker *process* crash (stdout EOF → `WorkerCrashed`), the
/// generation may have finished writing its GLB to disk before the worker died
/// — only the RPC reply was lost. Look in the job's output dir for a completed
/// GLB and recover it instead of discarding a near-complete generation. Returns
/// `None` when nothing recoverable exists.
async fn salvage_completed_output(params: &JsonValue) -> Option<SalvagedOutput> {
    let base = params.get("output_path").and_then(JsonValue::as_str)?;
    if is_nontrivial_file(base).await {
        let dir = std::path::Path::new(base).parent();
        let metadata_value = dir.and_then(read_metadata).unwrap_or(JsonValue::Null);
        let metadata_json = serde_json::to_string(&metadata_value).ok();
        return Some(SalvagedOutput {
            output_path: base.to_string(),
            metadata_json,
            metadata_value,
        });
    }
    let dir = std::path::Path::new(base).parent()?;
    let newest = newest_glb(dir).await?;
    Some(SalvagedOutput {
        output_path: newest,
        metadata_json: None,
        metadata_value: JsonValue::Null,
    })
}

fn read_metadata(dir: &std::path::Path) -> Option<JsonValue> {
    let text = std::fs::read_to_string(dir.join("metadata.json")).ok()?;
    serde_json::from_str(&text).ok()
}

async fn is_nontrivial_file(path: &str) -> bool {
    matches!(
        tokio::fs::metadata(path).await,
        Ok(meta) if meta.is_file() && meta.len() >= MIN_SALVAGE_BYTES
    )
}

/// Newest `*.glb` in `dir` whose size clears [`MIN_SALVAGE_BYTES`].
async fn newest_glb(dir: &std::path::Path) -> Option<String> {
    let mut entries = tokio::fs::read_dir(dir).await.ok()?;
    let mut best: Option<(std::time::SystemTime, String)> = None;
    while let Ok(Some(entry)) = entries.next_entry().await {
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("glb") {
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

pub struct GenerationTask {
    pub job_id: JobId,
    /// Worker RPC fired for this job — `trellis2.generate.start` for a base
    /// generation, `trellis2.refine.start` for a refine pass, or
    /// `trellis2.project.start` for a texture projection. All emit the shared
    /// `trellis2.generate.*` notifications, so the relay/terminal handling below
    /// is identical regardless of which one ran.
    pub method: &'static str,
    pub params: JsonValue,
    pub client: BackendClient,
    pub store: Store,
    pub channels: GenerationChannels,
    /// When `Some`, per-node status is published as the generation progresses
    /// (spec 057). `None` keeps the legacy behaviour (no graph overlay).
    pub emitter: Option<RunNodeEmitter>,
    /// Owns the in-flight generation count. On completion the task calls
    /// `end_generation`, which releases the worker (frees VRAM) once idle.
    pub provider: Arc<LeaseProvider>,
    /// Workspace root used to convert the worker's ABSOLUTE `output_path` into
    /// the workspace-RELATIVE `glbRef` exposed on the wire.
    pub workspace_dir: std::path::PathBuf,
}

/// Drives one generation to completion in the background. Subscribes to the
/// worker's notification stream, relays every frame into the per-job sink
/// (buffered + live), fires the long-running `generate.start` RPC, and persists
/// the terminal state.
pub fn spawn_generation(task: GenerationTask) {
    tokio::spawn(async move {
        let GenerationTask {
            job_id,
            method,
            params,
            client,
            store,
            channels,
            emitter,
            provider,
            workspace_dir,
        } = task;

        channels.register(job_id.as_str()).await;
        let _ = store.mark_running(&job_id).await;

        let tracker = Arc::new(Mutex::new(StageTracker::new()));

        let mut stream = client.lease().subscribe_notifications().await;
        let relay_channels = channels.clone();
        let relay_job = job_id.as_str().to_string();
        let relay_emitter = emitter.clone();
        let relay_tracker = tracker.clone();
        let relay = tokio::spawn(async move {
            let mut last_progress: Option<(&'static str, u8)> = None;
            while let Some(note) = stream.next().await {
                // INVARIANT: the outcome arm emits exactly one terminal frame;
                // this filter (load-bearing) drops the worker's duplicate.
                if note.method == DONE_METHOD || note.method == ERROR_METHOD {
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

        let outcome = client.call_long_running(method, params.clone()).await;

        relay.abort();

        match outcome {
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
                // Worker returns ABSOLUTE output_path; expose only the relative ref.
                let glb_ref = result
                    .get("output_path")
                    .and_then(JsonValue::as_str)
                    .map(|abs| crate::router::media::to_relative_ref(&workspace_dir, abs));
                let metadata = result.get("metadata").cloned();
                let metadata_json = metadata.as_ref().and_then(|m| serde_json::to_string(m).ok());
                let _ = store
                    .mark_completed(&job_id, glb_ref.as_deref(), metadata_json.as_deref())
                    .await;
                if let Some(em) = &emitter {
                    let transitions = { tracker.lock().await.on_success() };
                    for transition in &transitions {
                        emit_transition(em, transition);
                    }
                }
                // INVARIANT: exactly one terminal frame per generation (see relay filter).
                channels
                    .push(
                        job_id.as_str(),
                        NotificationEnvelope {
                            method: DONE_METHOD.to_string(),
                            params: json!({
                                "glbRef": glb_ref,
                                "metadata": metadata,
                            }),
                        },
                    )
                    .await;
            }
            Err(err) => {
                // Salvage a process-death crash whose GLB finished on disk (RPC
                // reply lost). A real `Rpc` error is never salvaged.
                let salvaged = if matches!(err, crate::domain::Trellis2Error::RuntimeUnavailable(_))
                {
                    salvage_completed_output(&params).await
                } else {
                    None
                };
                if let Some(salvage) = salvaged {
                    tracing::warn!(
                        job_id = %job_id.as_str(),
                        output = %salvage.output_path,
                        "worker crashed but a completed GLB was on disk — salvaged generation"
                    );
                    let glb_ref =
                        crate::router::media::to_relative_ref(&workspace_dir, &salvage.output_path);
                    let _ = store
                        .mark_completed(&job_id, Some(&glb_ref), salvage.metadata_json.as_deref())
                        .await;
                    if let Some(em) = &emitter {
                        let transitions = { tracker.lock().await.on_success() };
                        for transition in &transitions {
                            emit_transition(em, transition);
                        }
                    }
                    // INVARIANT: exactly one terminal frame per generation (see relay filter).
                    channels
                        .push(
                            job_id.as_str(),
                            NotificationEnvelope {
                                method: DONE_METHOD.to_string(),
                                params: json!({
                                    "glbRef": glb_ref,
                                    "metadata": salvage.metadata_value,
                                }),
                            },
                        )
                        .await;
                } else {
                    let (code, message) = match &err {
                        crate::domain::Trellis2Error::Rpc { code, message } => {
                            (*code, message.clone())
                        }
                        other => (-32603, other.to_string()),
                    };
                    let _ = store.mark_failed(&job_id, &format!("{code}|{message}")).await;
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
                                method: ERROR_METHOD.to_string(),
                                params: json!({ "code": code, "message": message }),
                            },
                        )
                        .await;
                }
            }
        }

        // Drop our lease handle, then signal the provider so it releases the
        // worker (frees VRAM) once no other generation is in flight.
        drop(client);
        provider.end_generation().await;

        // Retain the terminal buffer briefly so a late SSE subscriber can still
        // replay done/error before the sink is dropped.
        tokio::time::sleep(std::time::Duration::from_secs(30)).await;
        channels.remove(job_id.as_str()).await;
    });
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::node_events::{node, stage};
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
        emit_transition(&emitter, &Transition::Started(node::SPARSE));
        let published = bus.replay_after(None);
        assert_eq!(published.len(), 1);
        match &published[0].event {
            NexusEvent::NodeStarted { run_id, node_id } => {
                assert_eq!(run_id, "run-x");
                assert_eq!(node_id, "sparse_structure");
            }
            other => panic!("expected NodeStarted, got {other:?}"),
        }
    }

    #[test]
    fn progress_completed_failed_map_to_their_variants() {
        let (bus, emitter) = fixture();
        emit_transition(&emitter, &Transition::Progress(node::SHAPE, 42));
        emit_transition(&emitter, &Transition::Completed(node::EXPORT));
        emit_transition(&emitter, &Transition::Failed(node::SPARSE));
        let ev = bus.replay_after(None);
        assert!(matches!(
            ev[0].event,
            NexusEvent::NodeProgress { percent: 42, .. }
        ));
        assert!(matches!(ev[1].event, NexusEvent::NodeCompleted { .. }));
        assert!(matches!(ev[2].event, NexusEvent::NodeFailed { .. }));
    }

    #[test]
    fn stage_strings_match_node_events_module() {
        assert_eq!(stage::SPARSE, "sparse");
        assert_eq!(stage::EXPORT, "export");
    }
}
