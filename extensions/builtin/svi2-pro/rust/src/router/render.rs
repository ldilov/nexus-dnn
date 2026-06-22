use axum::extract::{Path, Query, State};
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use serde::Deserialize;
use serde_json::{json, Value as JsonValue};
use std::convert::Infallible;

use nexus_events::emitter::RunNodeEmitter;

use crate::backend_client::methods;
use crate::dispatcher::{spawn_render, RenderTask};
use crate::domain::{JobId, Result, Svi2Error};
use crate::router::AppState;
use crate::storage::RenderJobRow;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new()
        .route("/render/start", post(start))
        .route("/render/jobs", get(list_jobs))
        .route("/render/jobs/{job_id}", get(get_job))
        .route("/render/jobs/{job_id}/cancel", post(cancel))
        .route("/render/jobs/{job_id}/events", get(events))
}

#[derive(Debug, Deserialize)]
struct StartRequest {
    #[serde(default)]
    preset_id: Option<String>,
    params: JsonValue,
}

async fn start(State(state): State<AppState>, Json(body): Json<StartRequest>) -> Response {
    match start_impl(&state, body).await {
        Ok(job_id) => Json(json!({ "jobId": job_id.as_str() })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn start_impl(state: &AppState, body: StartRequest) -> Result<JobId> {
    // Fail fast if the worker can't start, before creating a job row. This
    // probe does not count as an in-flight render (no refcount).
    let _ = state.provider.spawn_if_needed().await?;

    let prepared = prepare_params(state, body.params);

    let params_json = serde_json::to_string(&prepared)?;
    let job_id = JobId::new();
    state
        .store
        .create_job(
            &job_id,
            body.preset_id.as_deref(),
            &params_json,
            &state.extension_version,
        )
        .await?;

    // Register the per-job event sink before returning `jobId` so a client
    // that opens the SSE stream immediately after `/render/start` always
    state.channels.register(job_id.as_str()).await;

    // When the host wired its event bus, publish per-node status for this run
    // so the deployment's Workflow Graph tab animates (spec 057). run_id = job_id.
    let emitter = state
        .event_bus
        .clone()
        .map(|bus| RunNodeEmitter::new(bus, job_id.as_str().to_string()));

    // Atomically (re)acquire the worker AND count this render in-flight, right
    // before spawning (no fallible await in between, so the count can't leak).
    let client = state.provider.acquire_for_render().await?;

    spawn_render(RenderTask {
        job_id: job_id.clone(),
        params: prepared,
        client,
        store: state.store.clone(),
        channels: state.channels.clone(),
        emitter,
        provider: state.provider.clone(),
    });

    Ok(job_id)
}

/// Inject a default `output_path` under the extension workspace when the
/// caller didn't pin one, so renders land in a host-managed dir the media
/// route can serve. Pure data shaping — no I/O.
fn prepare_params(state: &AppState, params: JsonValue) -> JsonValue {
    let mut obj = match params {
        JsonValue::Object(map) => map,
        other => {
            let mut map = serde_json::Map::new();
            map.insert("params".to_string(), other);
            map
        }
    };
    if !obj.contains_key("output_path") {
        let job_dir = JobId::new();
        let out = state
            .workspace_dir
            .join("renders")
            .join(job_dir.as_str())
            .join("out.mp4");
        obj.insert(
            "output_path".to_string(),
            JsonValue::String(out.to_string_lossy().to_string()),
        );
    }
    JsonValue::Object(obj)
}

#[derive(Debug, Deserialize)]
struct ListQuery {
    #[serde(default = "default_limit")]
    limit: i64,
}

const fn default_limit() -> i64 {
    25
}

async fn list_jobs(State(state): State<AppState>, Query(q): Query<ListQuery>) -> Response {
    match state.store.list_jobs(q.limit).await {
        Ok(rows) => {
            let jobs: Vec<_> = rows.into_iter().map(RenderJobRow::into_dto).collect();
            Json(json!({ "jobs": jobs })).into_response()
        }
        Err(err) => err.into_response(),
    }
}

async fn get_job(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    if let Err(err) = JobId::try_from(job_id.as_str()).map_err(Svi2Error::from) {
        return err.into_response();
    }
    match state.store.get_job(&job_id).await {
        Ok(row) => Json(row.into_dto()).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn cancel(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    match cancel_impl(&state, &job_id).await {
        Ok(()) => Json(json!({ "status": "cancelled" })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn cancel_impl(state: &AppState, job_id: &str) -> Result<()> {
    let _ = state.store.get_job(job_id).await?;
    if let Some(client) = state.provider.current().await {
        let _ = client
            .call(methods::RENDER_CANCEL, json!({ "job_id": job_id }))
            .await;
    }
    state
        .store
        .mark_cancelled(&JobId::try_from(job_id)?)
        .await?;
    Ok(())
}

fn is_terminal(method: &str) -> bool {
    method == "svi2.video.done" || method == "svi2.video.error"
}

async fn events(
    State(state): State<AppState>,
    Path(job_id): Path<String>,
) -> Sse<impl futures::Stream<Item = std::result::Result<Event, Infallible>>> {
    let subscription = state.channels.subscribe(&job_id).await;
    let fallback = if subscription.is_none() {
        state.store.get_job(&job_id).await.ok()
    } else {
        None
    };

    let stream = async_stream::stream! {
        if let Some(sub) = subscription {
            let mut done = false;
            for note in sub.backlog {
                if let Ok(payload) = serde_json::to_string(&json!({ "method": note.method, "params": note.params })) {
                    yield Ok(Event::default().data(payload));
                }
                if is_terminal(&note.method) {
                    done = true;
                }
            }
            if !done {
                if let Some(mut rx) = sub.live {
                    loop {
                        match rx.recv().await {
                            Ok(note) => {
                                let terminal = is_terminal(&note.method);
                                if let Ok(payload) = serde_json::to_string(&json!({ "method": note.method, "params": note.params })) {
                                    yield Ok(Event::default().data(payload));
                                }
                                if terminal {
                                    break;
                                }
                            }
                            Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => continue,
                            Err(tokio::sync::broadcast::error::RecvError::Closed) => break,
                        }
                    }
                }
            }
        } else if let Some(row) = fallback {
            // No live sink — the job finished and its buffer was reaped.
            // Replay the terminal frame from storage so a late subscriber
            let frame = terminal_frame(&row);
            if let Ok(payload) = serde_json::to_string(&frame) {
                yield Ok(Event::default().data(payload));
            }
        }
    };

    Sse::new(stream).keep_alive(KeepAlive::default())
}

fn terminal_frame(row: &crate::storage::RenderJobRow) -> JsonValue {
    match row.status.as_str() {
        "completed" => {
            let report = row
                .render_report_json
                .as_deref()
                .and_then(|s| serde_json::from_str::<JsonValue>(s).ok());
            json!({
                "method": "svi2.video.done",
                "params": { "output_path": row.output_path, "render_report": report }
            })
        }
        "failed" => {
            let code = row
                .error_category
                .as_deref()
                .and_then(|c| c.parse::<i64>().ok())
                .unwrap_or(-32603);
            json!({
                "method": "svi2.video.error",
                "params": { "code": code, "message": row.error_detail.clone().unwrap_or_default() }
            })
        }
        _ => json!({
            "method": "svi2.video.progress",
            "params": { "fraction": 0.0, "stage": row.status.clone() }
        }),
    }
}
