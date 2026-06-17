//! Runtime lifecycle endpoints (US2).
//!
//! `GET /runtime/health` — proxies to the worker's `health` RPC.
//! `GET /runtime/handshake` — returns the cached handshake record.
//! `POST /runtime/start` — eager spawn (normally auto-spawned by first task);
//!   optional `{ numWorkers }` sets the concurrent-worker cap for the session.
//! `POST /runtime/stop` — release the shared lease and cancel every queued run.
//! `POST /runtime/restart` — stop + spawn fresh.
//!
//! The queue-cascade on stop converts every queued/running run to `cancelled`
//! with category `runtime_stopped` per the Q1 lifecycle semantics.

use std::sync::Arc;

use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::backend_client::rpc::methods;
use crate::backend_client::LeaseProvider;
use crate::dispatcher::LeaseProviderPool;
use crate::domain::{EmotionTtsError, Result};
use crate::queue::SharedQueue;

#[derive(Clone)]
pub struct RuntimeState {
    pub provider: Arc<LeaseProvider>,
    pub pool: Arc<LeaseProviderPool>,
    pub queue: SharedQueue,
}

#[must_use]
pub fn router(state: RuntimeState) -> Router {
    Router::new()
        .route("/runtime/health", get(health))
        .route("/runtime/handshake", get(handshake))
        .route("/runtime/start", post(start))
        .route("/runtime/stop", post(stop))
        .route("/runtime/restart", post(restart))
        .with_state(state)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HealthResponse {
    pub badge: String,
    pub model_loaded: bool,
    pub uptime_seconds: i64,
    pub vram_used_mb: i64,
    pub vram_total_mb: i64,
    pub last_error_category: Option<String>,
}

async fn health(State(state): State<RuntimeState>) -> Response {
    match health_impl(&state).await {
        Ok(body) => (StatusCode::OK, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn health_impl(state: &RuntimeState) -> Result<Value> {
    let workers_ceiling = crate::dispatcher::worker_ceiling();
    let workers_active = state.queue.current_max_in_flight();
    let (workers_warming, workers_warm) = state.pool.warm_counts().await;
    let Some(client) = state.provider.current().await else {
        return Ok(json!({
            "badge": "stopped",
            "modelLoaded": false,
            "uptimeSeconds": 0,
            "vramUsedMb": 0,
            "vramTotalMb": 0,
            "lastErrorCategory": null,
            "workersCeiling": workers_ceiling,
            "workersActive": workers_active,
            "workersWarm": workers_warm,
            "workersWarming": workers_warming,
        }));
    };
    // The badge is derived from the lease state, which lives in the host and
    // survives a browser reload. The worker HEALTH rpc is best-effort: while
    let badge = lease_state_to_badge(client.lease().state());
    let resp: Value = client
        .call(methods::HEALTH, &json!({}))
        .await
        .unwrap_or(Value::Null);
    Ok(json!({
        "badge": badge,
        "modelLoaded": resp.get("model_loaded").and_then(Value::as_bool).unwrap_or(false),
        "uptimeSeconds": resp.get("uptime_seconds").and_then(Value::as_i64).unwrap_or(0),
        "vramUsedMb": resp.get("vram_used_mb").and_then(Value::as_i64).unwrap_or(0),
        "vramTotalMb": resp.get("vram_total_mb").and_then(Value::as_i64).unwrap_or(0),
        "lastErrorCategory": resp.get("last_error_category").cloned().unwrap_or(Value::Null),
        "workersCeiling": workers_ceiling,
        "workersActive": workers_active,
        "workersWarm": workers_warm,
        "workersWarming": workers_warming,
    }))
}

async fn handshake(State(state): State<RuntimeState>) -> Response {
    match handshake_impl(&state).await {
        Ok(body) => (StatusCode::OK, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn handshake_impl(state: &RuntimeState) -> Result<Value> {
    let client = state
        .provider
        .current()
        .await
        .ok_or_else(|| EmotionTtsError::RuntimeUnavailable("runtime not started".into()))?;
    let raw: Value = client
        .call(
            methods::HANDSHAKE,
            &json!({
                "protocol_version": "1.0",
                "client": "emotion-tts-extension",
                "client_version": env!("CARGO_PKG_VERSION"),
            }),
        )
        .await?;
    if let Ok(parsed) = serde_json::from_value::<crate::backend_client::HandshakeInfo>(raw.clone())
    {
        state.provider.set_cached_handshake(parsed).await;
    }
    Ok(normalize_handshake(&raw))
}

fn normalize_handshake(raw: &Value) -> Value {
    json!({
        "protocolVersion": raw.get("protocol_version").cloned().unwrap_or(Value::Null),
        "workerVersion": raw.get("worker_version").cloned().unwrap_or(Value::Null),
        "runtimeId": raw.get("runtime_id").cloned().unwrap_or(Value::Null),
        "pythonVersion": raw.get("python_version").cloned().unwrap_or(Value::Null),
        "torchVersion": raw.get("torch_version").cloned().unwrap_or(Value::Null),
        "cudaAvailable": raw.get("cuda_available").cloned().unwrap_or(Value::Bool(false)),
        "device": raw.get("device").cloned().unwrap_or(Value::Null),
        "modelFamilyId": raw.get("model_family_id").cloned().unwrap_or(Value::Null),
        "modelPresent": raw.get("model_present").cloned().unwrap_or(Value::Bool(false)),
        "capabilities": raw.get("capabilities").cloned().unwrap_or_else(|| json!([])),
    })
}

/// Optional `POST /runtime/start` body. `numWorkers` selects how many TTS
/// workers may run concurrently this session (each a full resident model,
/// ~N× VRAM), clamped to `[1, EMOTIONTTS_MAX_WORKERS]`. Absent ⇒ 1.
/// `warmup` (default `true`) preloads EVERY configured worker (the full
/// `EMOTIONTTS_MAX_WORKERS` ceiling, ~ceiling× VRAM) in the background so all
/// workers are resident; set `false` to keep them lazy.
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct StartRequest {
    #[serde(default)]
    num_workers: Option<usize>,
    #[serde(default = "default_true")]
    warmup: bool,
}

impl Default for StartRequest {
    fn default() -> Self {
        Self {
            num_workers: None,
            warmup: default_true(),
        }
    }
}

const fn default_true() -> bool {
    true
}

async fn start(State(state): State<RuntimeState>, body: Option<Json<StartRequest>>) -> Response {
    let req = body.map(|Json(b)| b).unwrap_or_default();
    let ceiling = crate::dispatcher::worker_ceiling();
    let requested = req.num_workers.unwrap_or(1).clamp(1, ceiling);
    let active = state.queue.set_max_in_flight(requested);

    if req.warmup {
        // Preload warms the FULL pool ceiling — every configured worker —
        // independent of the concurrent-worker cap, so "preload all" holds.
        let pool = state.pool.clone();
        let warm = pool.size();
        // Capture the generation BEFORE spawning. A concurrent Stop/Restart (or
        // a newer Start) bumps it, and the warm loop bails before re-acquiring a
        let gen = pool.next_generation();
        tokio::spawn(async move {
            // A worker is truly warm only when its model is resident, not when its
            // process exists — so send + await an idempotent `model.load` first.
            let mut loaded = 0usize;
            for (idx, provider) in pool.providers()[..warm].iter().enumerate() {
                if pool.generation() != gen {
                    tracing::info!(
                        target: "emotion_tts::dispatch",
                        loaded,
                        "runtime warmup superseded by a newer start/stop; bailing"
                    );
                    return;
                }
                let client = match provider.spawn_if_needed().await {
                    Ok(client) => client,
                    Err(err) => {
                        tracing::error!(
                            target: "emotion_tts::dispatch",
                            provider = idx,
                            error = %err,
                            "runtime warmup: provider spawn failed"
                        );
                        continue;
                    }
                };
                if pool.generation() != gen {
                    tracing::info!(
                        target: "emotion_tts::dispatch",
                        loaded,
                        "runtime warmup superseded by a newer start/stop; bailing"
                    );
                    return;
                }
                match client
                    .call::<_, Value>(methods::MODEL_LOAD, &json!({}))
                    .await
                {
                    Ok(_) => loaded += 1,
                    Err(err) => {
                        tracing::error!(
                            target: "emotion_tts::dispatch",
                            provider = idx,
                            error = %err,
                            "runtime warmup: model.load failed; worker is not warm"
                        );
                    }
                }
            }
            tracing::info!(
                target: "emotion_tts::dispatch",
                workers = loaded,
                "runtime warmup complete"
            );
        });
        return (
            StatusCode::ACCEPTED,
            Json(json!({
                "status": "started",
                "workers": active,
                "workersCeiling": ceiling,
            })),
        )
            .into_response();
    }

    match state.provider.spawn_if_needed().await {
        Ok(_) => (
            StatusCode::ACCEPTED,
            Json(json!({
                "status": "started",
                "workers": active,
                "workersCeiling": ceiling,
            })),
        )
            .into_response(),
        Err(err) => err.into_response(),
    }
}

async fn stop(State(state): State<RuntimeState>) -> Response {
    match stop_impl(&state).await {
        Ok(body) => (StatusCode::ACCEPTED, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn stop_impl(state: &RuntimeState) -> Result<Value> {
    let snapshot = state.queue.snapshot().await;
    let mut cancelled: Vec<String> = Vec::new();
    for id in &snapshot.in_flight {
        if state.queue.cancel(id).await {
            cancelled.push(id.as_str().to_string());
        }
    }
    if let Some(id) = &snapshot.test_slot {
        if state.queue.cancel(id).await {
            cancelled.push(id.as_str().to_string());
        }
    }
    for id in &snapshot.pending {
        if state.queue.cancel(id).await {
            cancelled.push(id.as_str().to_string());
        }
    }

    // Bump the start generation BEFORE releasing so any in-flight background
    // warm task sees a newer generation and bails instead of re-acquiring a
    state.pool.next_generation();
    state.pool.stop_all().await?;
    Ok(json!({
        "status": "stopped",
        "cancelledRunIds": cancelled,
    }))
}

async fn restart(State(state): State<RuntimeState>) -> Response {
    match restart_impl(&state).await {
        Ok(_) => (StatusCode::ACCEPTED, Json(json!({ "status": "restarted" }))).into_response(),
        Err(err) => err.into_response(),
    }
}

/// Stop the whole pool, then re-spawn ONLY the primary. The extra pool
/// providers are intentionally left cold: they re-warm lazily on the next
/// parallel run (or eagerly on the next `start` with `warmup`). Restart does
/// not re-run warmup — this is deliberate, not a missing step.
async fn restart_impl(state: &RuntimeState) -> Result<()> {
    // Same generation fence as `stop_impl`: invalidate any in-flight warm
    // before releasing, so it can't repopulate a slot we just cleared.
    state.pool.next_generation();
    state.pool.stop_all().await?;
    state.provider.spawn_if_needed().await?;
    Ok(())
}

fn lease_state_to_badge(state: crate::host_contract::LeaseState) -> &'static str {
    match state {
        crate::host_contract::LeaseState::Starting => "starting",
        crate::host_contract::LeaseState::Ready => "ready",
        crate::host_contract::LeaseState::Busy => "running",
        crate::host_contract::LeaseState::Stopping => "stopping",
        crate::host_contract::LeaseState::Failed => "failed",
        crate::host_contract::LeaseState::Released => "stopped",
    }
}
