use std::collections::HashMap;
use std::sync::Arc;

use futures::StreamExt;
use serde_json::{json, Value as JsonValue};
use tokio::sync::{broadcast, Mutex};

use crate::backend_client::{methods, BackendClient};
use crate::domain::JobId;
use crate::host_contract::NotificationEnvelope;
use crate::storage::Store;

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
        } = task;

        channels.register(job_id.as_str()).await;
        let _ = store.mark_running(&job_id).await;

        let mut stream = client.lease().subscribe_notifications().await;
        let relay_channels = channels.clone();
        let relay_job = job_id.as_str().to_string();
        let relay = tokio::spawn(async move {
            while let Some(note) = stream.next().await {
                // The worker emits its own terminal `done`/`error`
                // notification before `render.start` returns. We suppress
                // those here and let the dispatcher emit the authoritative
                // terminal frame *after* persisting the job — so an SSE
                // client never observes `done` ahead of the committed row.
                if note.method == "svi2.video.done" || note.method == "svi2.video.error" {
                    continue;
                }
                relay_channels.push(&relay_job, note).await;
            }
        });

        let outcome = client.call(methods::RENDER_START, params).await;

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
