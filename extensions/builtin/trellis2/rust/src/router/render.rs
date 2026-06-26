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
use crate::dispatcher::{spawn_generation, GenerationTask, DONE_METHOD, ERROR_METHOD};
use crate::domain::{JobId, Result, Trellis2Error};
use crate::router::AppState;
use crate::storage::GenerationJobRow;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/generate/start", post(start))
        .route("/refine/start", post(start_refine))
        .route("/generate/jobs", get(list_jobs))
        .route("/generate/jobs/{job_id}", get(get_job).delete(delete_job))
        .route("/generate/jobs/{job_id}/cancel", post(cancel))
        .route("/generate/jobs/{job_id}/events", get(events))
}

#[derive(Debug, Deserialize)]
struct StartRequest {
    /// Host artifact id of the input image (required, soft FK).
    image: String,
    #[serde(default)]
    params: JsonValue,
}

async fn start(State(state): State<AppState>, Json(body): Json<StartRequest>) -> Response {
    match start_impl(&state, body).await {
        Ok(job_id) => Json(json!({ "jobId": job_id.as_str() })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn start_impl(state: &AppState, body: StartRequest) -> Result<JobId> {
    if body.image.trim().is_empty() {
        return Err(Trellis2Error::validation("image artifact ref is required"));
    }

    // Resolve the workspace-RELATIVE image ref to ABSOLUTE via the media guard;
    // the worker's contract is absolute paths.
    let image_abs = crate::router::media::resolve_under_root(&state.workspace_dir, &body.image)
        .await
        .map_err(|_| Trellis2Error::validation("image ref not found in workspace"))?;
    let image_abs = image_abs.to_string_lossy().to_string();

    let prepared = prepare_params(state, &image_abs, body.params);
    let params_json = serde_json::to_string(&prepared)?;

    // Acquire (may spawn the worker) BEFORE any DB row, so a spawn failure
    // orphans nothing; the guard releases the refcount on any early-return.
    let client = state.provider.acquire_for_generation().await?;
    let guard = GenerationGuard::new(state.provider.clone());

    let job_id = JobId::new();
    state
        .store
        .create_job(&job_id, &body.image, &params_json)
        .await?;

    // Register the per-job event sink before returning `jobId` so a client that
    // opens the SSE stream immediately after start always sees every frame.
    state.channels.register(job_id.as_str()).await;

    // When the host wired its event bus, publish per-node status for this run so
    // the deployment's Workflow Graph tab animates (spec 057). run_id = job_id.
    let emitter = state
        .event_bus
        .clone()
        .map(|bus| RunNodeEmitter::new(bus, job_id.as_str().to_string()));

    // The spawned task now owns the refcount; disarm so the guard doesn't
    // release it. `spawn_generation` calls `end_generation` on exit.
    guard.disarm();
    spawn_generation(GenerationTask {
        job_id: job_id.clone(),
        method: methods::GENERATE_START,
        params: prepared,
        client,
        store: state.store.clone(),
        channels: state.channels.clone(),
        emitter,
        provider: state.provider.clone(),
        workspace_dir: state.workspace_dir.clone(),
    });

    Ok(job_id)
}

/// Releases one acquired-but-not-yet-spawned generation refcount on drop, so an
/// error between `acquire_for_generation` and `spawn_generation` never leaks the
/// worker lease. Call [`Self::disarm`] once the spawned task owns the refcount.
struct GenerationGuard {
    provider: Option<std::sync::Arc<crate::backend_client::LeaseProvider>>,
}

impl GenerationGuard {
    const fn new(provider: std::sync::Arc<crate::backend_client::LeaseProvider>) -> Self {
        Self {
            provider: Some(provider),
        }
    }
    fn disarm(mut self) {
        self.provider = None;
    }
}

impl Drop for GenerationGuard {
    fn drop(&mut self) {
        if let Some(provider) = self.provider.take() {
            tokio::spawn(async move { provider.end_generation().await });
        }
    }
}

/// Build the worker `generate.start` params: carry the caller's params, STRIP any
/// client-supplied path aliases, then set the host-chosen ABSOLUTE `image` and
/// `output_path`. Stripping is the CRIT-1 fix — the worker honours
/// `output_path`/`image_path`/`ref_image_path`, so they must never come from the
/// client. Pure data shaping — no I/O.
fn prepare_params(state: &AppState, image_abs: &str, params: JsonValue) -> JsonValue {
    let mut obj = match params {
        JsonValue::Object(map) => map,
        JsonValue::Null => serde_json::Map::new(),
        other => {
            let mut map = serde_json::Map::new();
            map.insert("params".to_string(), other);
            map
        }
    };
    obj.remove("output_path");
    obj.remove("image_path");
    obj.remove("ref_image_path");
    obj.remove("image");

    obj.insert(
        "image".to_string(),
        JsonValue::String(image_abs.to_string()),
    );
    let job_dir = JobId::new();
    let out = state
        .workspace_dir
        .join("meshes")
        .join(job_dir.as_str())
        .join("out.glb");
    obj.insert(
        "output_path".to_string(),
        JsonValue::String(out.to_string_lossy().to_string()),
    );
    JsonValue::Object(obj)
}

#[derive(Debug, Deserialize)]
struct RefineRequest {
    /// Host artifact id of the source image (required, soft FK) — the same image
    /// conditioning that produced the input mesh.
    image: String,
    /// Workspace-relative ref of the input GLB to re-synthesize (required).
    mesh: String,
    /// Optional 2nd-view face crop ref, biasing the new detail toward the face.
    #[serde(default)]
    face_image: Option<String>,
    #[serde(default)]
    params: JsonValue,
}

async fn start_refine(State(state): State<AppState>, Json(body): Json<RefineRequest>) -> Response {
    match start_refine_impl(&state, body).await {
        Ok(job_id) => Json(json!({ "jobId": job_id.as_str() })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn start_refine_impl(state: &AppState, body: RefineRequest) -> Result<JobId> {
    if body.image.trim().is_empty() {
        return Err(Trellis2Error::validation("image artifact ref is required"));
    }
    if body.mesh.trim().is_empty() {
        return Err(Trellis2Error::validation("mesh ref is required"));
    }

    // Resolve every client-supplied ref to ABSOLUTE through the media guard
    // (rejects `..`/absolute); the worker's contract is absolute paths.
    let image_abs = crate::router::media::resolve_under_root(&state.workspace_dir, &body.image)
        .await
        .map_err(|_| Trellis2Error::validation("image ref not found in workspace"))?;
    let image_abs = image_abs.to_string_lossy().to_string();

    let mesh_abs = crate::router::media::resolve_under_root(&state.workspace_dir, &body.mesh)
        .await
        .map_err(|_| Trellis2Error::validation("mesh ref not found in workspace"))?;
    let mesh_abs = mesh_abs.to_string_lossy().to_string();

    let face_abs = match body.face_image.as_deref().map(str::trim).filter(|s| !s.is_empty()) {
        Some(face_ref) => {
            let abs = crate::router::media::resolve_under_root(&state.workspace_dir, face_ref)
                .await
                .map_err(|_| Trellis2Error::validation("face image ref not found in workspace"))?;
            Some(abs.to_string_lossy().to_string())
        }
        None => None,
    };

    let prepared = prepare_refine_params(
        state,
        &image_abs,
        &mesh_abs,
        face_abs.as_deref(),
        body.params,
    );
    let params_json = serde_json::to_string(&prepared)?;

    // Acquire (may spawn the worker) BEFORE any DB row, so a spawn failure
    // orphans nothing; the guard releases the refcount on any early-return.
    let client = state.provider.acquire_for_generation().await?;
    let guard = GenerationGuard::new(state.provider.clone());

    let job_id = JobId::new();
    state
        .store
        .create_job(&job_id, &body.image, &params_json)
        .await?;

    state.channels.register(job_id.as_str()).await;

    let emitter = state
        .event_bus
        .clone()
        .map(|bus| RunNodeEmitter::new(bus, job_id.as_str().to_string()));

    guard.disarm();
    spawn_generation(GenerationTask {
        job_id: job_id.clone(),
        method: methods::REFINE_START,
        params: prepared,
        client,
        store: state.store.clone(),
        channels: state.channels.clone(),
        emitter,
        provider: state.provider.clone(),
        workspace_dir: state.workspace_dir.clone(),
    });

    Ok(job_id)
}

/// Build the worker `refine.start` params: carry the caller's params, STRIP every
/// client-supplied path alias, then set the host-chosen ABSOLUTE `mesh`, `image`,
/// optional `face_image_path`, and a fresh `output_path`. Stripping is the same
/// CRIT-1 guard as generate — the worker honours these path keys, so they must
/// never come from the client. Pure data shaping — no I/O.
fn prepare_refine_params(
    state: &AppState,
    image_abs: &str,
    mesh_abs: &str,
    face_abs: Option<&str>,
    params: JsonValue,
) -> JsonValue {
    let mut obj = match params {
        JsonValue::Object(map) => map,
        JsonValue::Null => serde_json::Map::new(),
        other => {
            let mut map = serde_json::Map::new();
            map.insert("params".to_string(), other);
            map
        }
    };
    obj.remove("output_path");
    obj.remove("image_path");
    obj.remove("ref_image_path");
    obj.remove("image");
    obj.remove("mesh");
    obj.remove("mesh_path");
    obj.remove("face_image");
    obj.remove("face_image_path");

    obj.insert("image".to_string(), JsonValue::String(image_abs.to_string()));
    obj.insert("mesh".to_string(), JsonValue::String(mesh_abs.to_string()));
    obj.insert(
        "mesh_path".to_string(),
        JsonValue::String(mesh_abs.to_string()),
    );
    if let Some(face) = face_abs {
        obj.insert(
            "face_image_path".to_string(),
            JsonValue::String(face.to_string()),
        );
    }

    let job_dir = JobId::new();
    let out = state
        .workspace_dir
        .join("meshes")
        .join(job_dir.as_str())
        .join("out.glb");
    obj.insert(
        "output_path".to_string(),
        JsonValue::String(out.to_string_lossy().to_string()),
    );
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
            let jobs: Vec<_> = rows.into_iter().map(GenerationJobRow::into_dto).collect();
            Json(json!({ "jobs": jobs })).into_response()
        }
        Err(err) => err.into_response(),
    }
}

async fn get_job(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    if let Err(err) = JobId::try_from(job_id.as_str()).map_err(Trellis2Error::from) {
        return err.into_response();
    }
    match state.store.get_job(&job_id).await {
        Ok(row) => Json(row.into_dto()).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn delete_job(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    if let Err(err) = JobId::try_from(job_id.as_str()).map_err(Trellis2Error::from) {
        return err.into_response();
    }
    match state.store.delete_job(&job_id).await {
        Ok(_) => {
            // Drop any live event sink for this job; the GLB stays on disk.
            state.channels.remove(&job_id).await;
            Json(json!({ "status": "deleted" })).into_response()
        }
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
    let id = JobId::try_from(job_id)?;
    let _ = state.store.get_job(id.as_str()).await?;
    if let Some(client) = state.provider.current().await {
        // Generate/refine share one jobs table; the row doesn't record which RPC
        // ran. Best-effort cancel both — the worker ignores the non-matching id.
        let _ = client
            .call(methods::GENERATE_CANCEL, json!({ "job_id": id.as_str() }))
            .await;
        let _ = client
            .call(methods::REFINE_CANCEL, json!({ "job_id": id.as_str() }))
            .await;
    }
    state.store.mark_cancelled(&id).await?;
    Ok(())
}

fn is_terminal(method: &str) -> bool {
    method == DONE_METHOD || method == ERROR_METHOD
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
            // No live sink — the job finished and its buffer was reaped. Replay
            // the terminal frame from storage so a late subscriber still settles.
            let frame = terminal_frame(&row);
            if let Ok(payload) = serde_json::to_string(&frame) {
                yield Ok(Event::default().data(payload));
            }
        }
    };

    Sse::new(stream).keep_alive(KeepAlive::default())
}

fn terminal_frame(row: &crate::storage::GenerationJobRow) -> JsonValue {
    match row.status.as_str() {
        "completed" => {
            let metadata = row
                .metadata_json
                .as_deref()
                .and_then(|s| serde_json::from_str::<JsonValue>(s).ok());
            json!({
                "method": DONE_METHOD,
                "params": { "glbRef": row.output_glb_ref, "metadata": metadata }
            })
        }
        "failed" => {
            let (code, message) = split_persisted_error(row.error_detail.as_deref());
            json!({
                "method": ERROR_METHOD,
                "params": { "code": code, "message": message }
            })
        }
        _ => json!({
            "method": "trellis2.generate.progress",
            "params": { "stage": row.status.clone(), "step": 0, "total": 0 }
        }),
    }
}

/// Failures are stored as `"<code>|<message>"`; recover the numeric code for the
/// replayed error frame. A plain string falls back to the generic -32603.
fn split_persisted_error(detail: Option<&str>) -> (i64, String) {
    let raw = detail.unwrap_or_default();
    if let Some((code, msg)) = raw.split_once('|') {
        if let Ok(code) = code.trim().parse::<i64>() {
            return (code, msg.to_string());
        }
    }
    (-32603, raw.to_string())
}
