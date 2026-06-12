//! Runtime lifecycle endpoints (US2).
//!
//! `GET /runtime/health` — proxies to the worker's `health` RPC.
//! `GET /runtime/handshake` — returns the cached handshake record.
//! `POST /runtime/start` — eager spawn (normally auto-spawned by first task).
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
use crate::domain::{EmotionTtsError, Result};
use crate::queue::SharedQueue;

#[derive(Clone)]
pub struct RuntimeState {
    pub provider: Arc<LeaseProvider>,
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
    let Some(client) = state.provider.current().await else {
        return Ok(json!({
            "badge": "stopped",
            "modelLoaded": false,
            "uptimeSeconds": 0,
            "vramUsedMb": 0,
            "vramTotalMb": 0,
            "lastErrorCategory": null,
        }));
    };
    let resp: Value = client.call(methods::HEALTH, &json!({})).await?;
    let badge = lease_state_to_badge(client.lease().state());
    Ok(json!({
        "badge": badge,
        "modelLoaded": resp.get("model_loaded").and_then(Value::as_bool).unwrap_or(false),
        "uptimeSeconds": resp.get("uptime_seconds").and_then(Value::as_i64).unwrap_or(0),
        "vramUsedMb": resp.get("vram_used_mb").and_then(Value::as_i64).unwrap_or(0),
        "vramTotalMb": resp.get("vram_total_mb").and_then(Value::as_i64).unwrap_or(0),
        "lastErrorCategory": resp.get("last_error_category").cloned().unwrap_or(Value::Null),
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

async fn start(State(state): State<RuntimeState>) -> Response {
    match state.provider.spawn_if_needed().await {
        Ok(_) => (StatusCode::ACCEPTED, Json(json!({ "status": "started" }))).into_response(),
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
    if let Some(id) = &snapshot.in_flight {
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

    state.provider.stop().await?;
    Ok(json!({
        "status": "stopped",
        "cancelledRunIds": cancelled,
    }))
}

async fn restart(State(state): State<RuntimeState>) -> Response {
    match state.provider.restart().await {
        Ok(_) => (StatusCode::ACCEPTED, Json(json!({ "status": "restarted" }))).into_response(),
        Err(err) => err.into_response(),
    }
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
