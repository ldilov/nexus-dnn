use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::{Duration, Instant};

use axum::{
    body::Body,
    extract::{DefaultBodyLimit, Multipart, Path, State},
    http::{header, HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use serde::Serialize;
use sha2::{Digest, Sha256};
use tokio::sync::Mutex as AsyncMutex;
use ulid::Ulid;

use crate::errors::{ExtensionError, ExtensionErrorCode};
use crate::planning::plan_render;
use crate::profile_install::{ProfileInstallService, ProfileInstallStatus};
use crate::runner::{CancelOutcome, RetrySpawnOutcome, Runner};
use crate::runtime_selection::{available_profiles, resolve_runtime_id};
use crate::schemas::{CreateRenderRequest, RenderPlan, RuntimeProfilePreference};
use crate::storage::{RenderRunRow, RenderSegmentRow, Repos};

/// Idempotency-Key TTL. Inside this window, a repeat POST /renders with
/// the same key returns the previously-created run instead of spawning
/// a duplicate. Matches the openapi-declared semantics (header was
/// declared in the route schema but never enforced until now).
const IDEMPOTENCY_TTL: Duration = Duration::from_secs(600);

/// Cap on the cache size — prevents unbounded memory growth from
/// pathological clients sending unique keys forever. Once the cache
/// hits the cap, the oldest entries get evicted on the next insert.
const IDEMPOTENCY_CAP: usize = 1024;

#[derive(Debug, Clone)]
pub struct IdempotencyEntry {
    run_id: String,
    runtime_profile: String,
    segment_count: u32,
    created_at: chrono::DateTime<chrono::Utc>,
    expires_at: Instant,
    /// `SipHash` fingerprint of the canonical request JSON.
    ///
    /// A repeat POST with the same `Idempotency-Key` but a different
    /// body returns 422 instead of silently mirroring the previous
    /// response (per the stripe-compatible / RFC-draft semantics).
    /// Non-cryptographic on purpose — the `Idempotency-Key` is already
    /// client-supplied uniqueness; this hash only catches accidental
    /// reuse of the same key with different payloads.
    request_hash: u64,
}

/// In-memory cache keyed by `Idempotency-Key` header. Restart drops it —
/// fine for the safety-net use case (preventing accidental double-
/// submits within seconds), bad for a multi-host deployment which we
/// don't have today.
type IdempotencyCache = Arc<AsyncMutex<HashMap<String, IdempotencyEntry>>>;

#[derive(Clone)]
pub struct ApiState {
    pub repos: Repos,
    pub runner: Runner,
    pub runs_dir: PathBuf,
    /// Directory holding operator-uploaded input images. Mirrors the
    /// runner's `RunnerConfig::inputs_dir` — the upload handler writes
    /// here, the runner reads from here. Keeping them as the same
    /// `PathBuf` instead of re-deriving from `runs_dir` keeps the
    /// "where to look" answer authoritative in one place.
    pub inputs_dir: PathBuf,
    pub extension_version: &'static str,
    pub profile_install: ProfileInstallService,
    pub idempotency: IdempotencyCache,
}

impl ApiState {
    /// Convenience: build state with a fresh empty idempotency cache.
    /// Callers that need to share a cache across rebuilds can construct
    /// the struct literal directly.
    #[must_use]
    pub fn new(
        repos: Repos,
        runner: Runner,
        runs_dir: PathBuf,
        inputs_dir: PathBuf,
        extension_version: &'static str,
        profile_install: ProfileInstallService,
    ) -> Self {
        Self {
            repos,
            runner,
            runs_dir,
            inputs_dir,
            extension_version,
            profile_install,
            idempotency: Arc::new(AsyncMutex::new(HashMap::new())),
        }
    }
}

pub fn router(state: ApiState) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/runtime-profiles", get(list_profiles))
        .route("/recipe/plan", post(create_plan))
        .route("/renders", post(create_render))
        .route("/renders/{run_id}", get(get_render))
        .route("/renders/{run_id}/cancel", post(cancel_render))
        .route("/renders/{run_id}/retry-segment", post(retry_segment))
        .route("/renders/{run_id}/segments", get(list_segments_handler))
        .route("/artifacts/{artifact_id}", get(serve_artifact))
        .route(
            "/input-images",
            post(upload_input_image).layer(DefaultBodyLimit::max(INPUT_IMAGE_BODY_LIMIT_BYTES)),
        )
        .route(
            "/profiles/{profile_id}/install",
            post(start_profile_install),
        )
        .route(
            "/profiles/{profile_id}/install",
            get(profile_install_status),
        )
        .with_state(Arc::new(state))
}

#[must_use]
pub fn http_routes() -> Vec<String> {
    vec![
        "/health".into(),
        "/runtime-profiles".into(),
        "/recipe/plan".into(),
        "/renders".into(),
        "/renders/{run_id}".into(),
        "/renders/{run_id}/cancel".into(),
        "/renders/{run_id}/retry-segment".into(),
        "/renders/{run_id}/segments".into(),
        "/artifacts/{artifact_id}".into(),
        "/input-images".into(),
        "/profiles/{profile_id}/install".into(),
    ]
}

/// Max bytes accepted by `POST /input-images`.
///
/// A single 4K PNG runs 5–8 MB; 8 MB is the sweet spot that covers
/// realistic reference images without inviting abuse. The body-limit
/// layer rejects oversized requests with 413 BEFORE the handler runs
/// (no buffer allocation).
pub const INPUT_IMAGE_BODY_LIMIT_BYTES: usize = 8 * 1024 * 1024;

async fn start_profile_install(
    State(state): State<Arc<ApiState>>,
    Path(profile_id): Path<String>,
) -> ApiResult<(StatusCode, Json<ProfileInstallStatus>)> {
    validate_profile_id(&profile_id)?;
    let status = state.profile_install.start(profile_id).await?;
    Ok((StatusCode::ACCEPTED, Json(status)))
}

async fn profile_install_status(
    State(state): State<Arc<ApiState>>,
    Path(profile_id): Path<String>,
) -> ApiResult<Json<ProfileInstallStatus>> {
    validate_profile_id(&profile_id)?;
    let status = state.profile_install.status(&profile_id).await?;
    Ok(Json(status))
}

/// Profile ids are an enum-like slug (`rtx40-fp8`, `rtx50-fp8`,
/// `rtx50-nvfp4`, `fake`). The actual allowlist is enforced
/// downstream in `runtime_selection::resolve_runtime_id`, but this
/// shape check rejects path-traversal / control characters / oversized
/// strings before any DB or filesystem operation touches them.
fn validate_profile_id(profile_id: &str) -> ApiResult<()> {
    if profile_id.is_empty() || profile_id.len() > 32 {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "profile_id length out of range (1..=32); got {} chars",
            profile_id.len()
        ))));
    }
    if !profile_id
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_' || c == '.')
    {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "profile_id '{profile_id}' contains characters outside [A-Za-z0-9._-]"
        ))));
    }
    Ok(())
}

#[derive(Serialize)]
struct HealthBody {
    status: &'static str,
    version: &'static str,
    extension_id: &'static str,
}

async fn health(State(state): State<Arc<ApiState>>) -> Json<HealthBody> {
    Json(HealthBody {
        status: "ok",
        version: state.extension_version,
        extension_id: "nexus.video.ltx23",
    })
}

#[derive(Serialize)]
struct RuntimeProfileSummary {
    runtime_id: &'static str,
    display_name: &'static str,
    installed: bool,
    healthy: bool,
    experimental: bool,
    status_message: String,
}

async fn list_profiles(State(state): State<Arc<ApiState>>) -> Json<Vec<RuntimeProfileSummary>> {
    let mut out = Vec::with_capacity(available_profiles().len());
    for p in available_profiles() {
        // `runtime_id` is `nexus.video.ltx23.<short>` — strip the
        // namespace to look up the install state via ProfileInstallService.
        let short = p.runtime_id.rsplit('.').next().unwrap_or("");
        let summary = if short == "fake" {
            RuntimeProfileSummary {
                runtime_id: p.runtime_id,
                display_name: p.display_name,
                installed: true,
                healthy: true,
                experimental: p.experimental,
                status_message: "ready".into(),
            }
        } else {
            // Real-runtime profile — check the on-disk sentinel via the
            // install service. Avoids hand-rolling another stat-the-
            // sentinel path and stays in sync with the install POST.
            let install_status = state.profile_install.status(short).await.ok();
            let installed = install_status.as_ref().is_some_and(|s| s.installed);
            let in_flight = install_status.as_ref().is_some_and(|s| s.in_flight);
            let status_message = match install_status.as_ref() {
                Some(s) if s.installed => "ready".to_string(),
                Some(s) if s.in_flight => s.phase.as_deref().unwrap_or("installing").to_string(),
                Some(s) if s.last_error.is_some() => {
                    format!("install error: {}", s.last_error.as_deref().unwrap_or("?"))
                }
                _ => "not installed".to_string(),
            };
            RuntimeProfileSummary {
                runtime_id: p.runtime_id,
                display_name: p.display_name,
                installed,
                // Healthy only when fully installed and not currently
                // reinstalling. The UI uses this to gate the "Generate
                // video" button.
                healthy: installed && !in_flight,
                experimental: p.experimental,
                status_message,
            }
        };
        out.push(summary);
    }
    Json(out)
}

async fn create_plan(
    State(_state): State<Arc<ApiState>>,
    Json(req): Json<CreateRenderRequest>,
) -> ApiResult<Json<RenderPlan>> {
    let runtime_id = resolve_runtime_id(req.runtime_profile);
    let plan = plan_render(&req, runtime_id)?;
    Ok(Json(plan))
}

#[derive(Serialize)]
struct CreateRenderResponse {
    id: String,
    status: &'static str,
    runtime_profile: String,
    segment_count: u32,
    created_at: String,
}

#[allow(clippy::too_many_lines)]
async fn create_render(
    State(state): State<Arc<ApiState>>,
    headers: HeaderMap,
    Json(req): Json<CreateRenderRequest>,
) -> ApiResult<(StatusCode, Json<CreateRenderResponse>)> {
    // Bound free-text + scene-array sizes before any planner work / DB
    // write so a giant prompt can't blow up the request_json column or
    // multiply across segments.
    req.validate_field_bounds()
        .map_err(ExtensionError::InvalidRequest)?;

    // Pre-flight the input-image artifact id against the inputs
    // directory. The runner soft-fails a stale id (renders text-only +
    // logs a warn) — fine for an in-flight breach, wrong for a fresh
    // submission. Catching it here turns "GPU-hour run silently ignored
    // your reference image" into an immediate, actionable 400. Uses the
    // exact resolver the runner uses so accept/reject can never diverge.
    if let Some(id) = req.input_image_artifact_id.clone() {
        let inputs_dir = state.inputs_dir.clone();
        let resolves = tokio::task::spawn_blocking(move || {
            crate::runner::resolve_input_image_path(&inputs_dir, &id).is_some()
        })
        .await
        .map_err(|e| ExtensionError::Internal(format!("input-image preflight join: {e}")))?;
        if !resolves {
            return Err(ApiError(ExtensionError::InvalidRequest(format!(
                "input_image_artifact_id '{}' does not resolve to an \
                 on-disk file; re-upload the reference image before \
                 submitting this render",
                req.input_image_artifact_id.as_deref().unwrap_or("")
            ))));
        }
    }

    let idempotency_key = headers
        .get("idempotency-key")
        .and_then(|v| v.to_str().ok())
        .map(str::to_string)
        .filter(|s| !s.is_empty());

    let request_hash = hash_create_render_request(&req);

    if let Some(ref key) = idempotency_key {
        if let Some(cached) = lookup_idempotent(&state.idempotency, key).await {
            if cached.request_hash != request_hash {
                // Same Idempotency-Key + different body → 422. Stripe-
                // compatible / RFC-draft semantics. Returning a stale
                // success here would silently mask a client typo.
                return Err(ApiError(ExtensionError::InvalidRequest(format!(
                    "Idempotency-Key '{key}' was previously used with a \
                     different request body; supply a fresh key or replay \
                     the original request"
                ))));
            }
            return Ok((
                StatusCode::ACCEPTED,
                Json(CreateRenderResponse {
                    id: cached.run_id,
                    status: "queued",
                    runtime_profile: cached.runtime_profile,
                    segment_count: cached.segment_count,
                    created_at: cached.created_at.to_rfc3339(),
                }),
            ));
        }
    }

    let runtime_id = resolve_runtime_id(req.runtime_profile);
    let plan = plan_render(&req, runtime_id)?;

    let run_id = Ulid::new().to_string();
    let now = Utc::now();
    let project_id = req
        .project_id
        .clone()
        .unwrap_or_else(|| format!("inline-{run_id}"));

    let plan_json = serde_json::to_string(&plan)
        .map_err(|e| ExtensionError::Internal(format!("plan serialise: {e}")))?;
    let request_json = serde_json::to_string(&req)
        .map_err(|e| ExtensionError::Internal(format!("request serialise: {e}")))?;

    let run = RenderRunRow {
        id: run_id.clone(),
        project_id,
        status: "queued".into(),
        runtime_profile: Some(plan.runtime_profile.clone()),
        requested_duration_seconds: f64::from(plan.requested_duration_seconds),
        planned_duration_seconds: Some(f64::from(plan.planned_duration_seconds)),
        width: i64::from(plan.width),
        height: i64::from(plan.height),
        base_fps: i64::from(plan.base_fps),
        output_fps: i64::from(plan.output_fps),
        segment_count: i64::from(plan.segment_count),
        seed: req.seed.and_then(|s| i64::try_from(s).ok()),
        quality_preset: format!("{:?}", req.quality_preset).to_lowercase(),
        render_mode: "external_segments".into(),
        request_json,
        plan_json: Some(plan_json),
        error_code: None,
        error_message: None,
        final_artifact_id: None,
        created_at: now,
        started_at: None,
        completed_at: None,
        cancelled_at: None,
        restart_count: 0,
        // Snapshot the supervisor's restart cap at insert time so the
        // UI badge ("restart 1/3") reflects what THIS run is allowed
        // even if the operator later retunes the env var.
        max_restart_count: i64::from(crate::runner::max_restarts_from_env_public()),
        last_breach_reason: None,
    };
    state.repos.insert_run(&run).await?;

    let segments: Vec<RenderSegmentRow> = plan
        .segments
        .iter()
        .map(|seg| RenderSegmentRow {
            id: format!("{run_id}-seg{}", seg.index),
            run_id: run_id.clone(),
            segment_index: i64::from(seg.index),
            status: "queued".into(),
            start_time_seconds: f64::from(seg.start_time_seconds),
            duration_seconds: f64::from(seg.duration_seconds),
            overlap_seconds: f64::from(seg.overlap_seconds),
            frame_count: i64::from(seg.frame_count),
            seed: i64::try_from(seg.seed).ok(),
            prompt: Some(req.prompt.clone()),
            negative_prompt: req.negative_prompt.clone(),
            preview_artifact_id: None,
            raw_video_artifact_id: None,
            error_code: None,
            error_message: None,
            started_at: None,
            completed_at: None,
        })
        .collect();
    state.repos.insert_segments(&segments).await?;

    let runtime_id_owned = runtime_id.to_string();
    state.runner.spawn_render(
        run_id.clone(),
        runtime_id.to_string(),
        plan.clone(),
        req.prompt.clone(),
        req.negative_prompt.clone(),
        req.style_prompt.clone(),
        req.character_prompt.clone(),
        req.input_image_artifact_id.clone(),
        req.advanced.clone(),
    );

    if let Some(key) = idempotency_key {
        store_idempotent(
            &state.idempotency,
            key,
            IdempotencyEntry {
                run_id: run_id.clone(),
                runtime_profile: runtime_id_owned.clone(),
                segment_count: plan.segment_count,
                created_at: now,
                expires_at: Instant::now() + IDEMPOTENCY_TTL,
                request_hash,
            },
        )
        .await;
    }

    Ok((
        StatusCode::ACCEPTED,
        Json(CreateRenderResponse {
            id: run_id,
            status: "queued",
            runtime_profile: runtime_id_owned,
            segment_count: plan.segment_count,
            created_at: now.to_rfc3339(),
        }),
    ))
}

/// Look up a previously-cached idempotency key. Returns `None` when the
/// key is absent, expired, or the cache is empty. Expired entries are
/// reaped on read to keep memory bounded.
async fn lookup_idempotent(cache: &IdempotencyCache, key: &str) -> Option<IdempotencyEntry> {
    let mut guard = cache.lock().await;
    let now = Instant::now();
    if let Some(entry) = guard.get(key) {
        if entry.expires_at > now {
            let cached = entry.clone();
            drop(guard);
            return Some(cached);
        }
    }
    // Lazy reap of expired entries when we observe a miss.
    guard.retain(|_, e| e.expires_at > now);
    drop(guard);
    None
}

async fn store_idempotent(cache: &IdempotencyCache, key: String, entry: IdempotencyEntry) {
    let mut guard = cache.lock().await;
    // Evict oldest first when at cap (cheap O(n) scan; cap is small).
    if guard.len() >= IDEMPOTENCY_CAP {
        if let Some(oldest_key) = guard
            .iter()
            .min_by_key(|(_, e)| e.expires_at)
            .map(|(k, _)| k.clone())
        {
            guard.remove(&oldest_key);
        }
    }
    guard.insert(key, entry);
    drop(guard);
}

#[derive(Serialize)]
struct RenderStateResponse {
    id: String,
    project_id: String,
    status: String,
    runtime_profile: Option<String>,
    progress_percent: f32,
    segment_count: u32,
    completed_segments: u32,
    requested_duration_seconds: f64,
    planned_duration_seconds: Option<f64>,
    width: u32,
    height: u32,
    base_fps: u32,
    output_fps: u32,
    final_artifact_id: Option<String>,
    error_code: Option<String>,
    error_message: Option<String>,
    created_at: String,
    started_at: Option<String>,
    completed_at: Option<String>,
    segments: Vec<SegmentSummary>,
    /// Rung 7L observability: how many transparent restarts the VRAM
    /// supervisor has triggered so far on this run. 0 for the common
    /// case (no VRAM pressure); non-zero means at least one halt+resume.
    restart_count: u32,
    /// Snapshot of the supervisor cap this run is running under. UI
    /// renders "restart 1/3" as `restart_count`/`max_restart_count`.
    max_restart_count: u32,
    /// Most recent VRAM-supervisor breach reason (human-readable, e.g.
    /// `frag_ratio=0.42 exceeded max=0.30`). `None` for runs that
    /// never breached. UI renders this as a tooltip on the restart
    /// badge so the operator can see *why* the chain restarted.
    last_breach_reason: Option<String>,
}

#[derive(Serialize)]
struct SegmentSummary {
    index: u32,
    status: String,
    duration_seconds: f64,
    started_at: Option<String>,
    completed_at: Option<String>,
}

async fn get_render(
    State(state): State<Arc<ApiState>>,
    Path(run_id): Path<String>,
) -> ApiResult<Json<RenderStateResponse>> {
    validate_run_id(&run_id)?;
    let run = state.repos.get_run(&run_id).await?;
    let segments = state.repos.list_segments(&run_id).await?;
    let completed = u32::try_from(segments.iter().filter(|s| s.status == "completed").count())
        .unwrap_or(u32::MAX);

    #[allow(clippy::cast_precision_loss, clippy::cast_possible_truncation)]
    let progress = if run.segment_count > 0 {
        (f64::from(completed) / run.segment_count as f64).clamp(0.0, 1.0) as f32
    } else {
        0.0_f32
    };

    Ok(Json(RenderStateResponse {
        id: run.id,
        project_id: run.project_id,
        status: run.status,
        runtime_profile: run.runtime_profile,
        progress_percent: progress * 100.0,
        segment_count: u32::try_from(run.segment_count).unwrap_or(0),
        completed_segments: completed,
        requested_duration_seconds: run.requested_duration_seconds,
        planned_duration_seconds: run.planned_duration_seconds,
        width: u32::try_from(run.width).unwrap_or(0),
        height: u32::try_from(run.height).unwrap_or(0),
        base_fps: u32::try_from(run.base_fps).unwrap_or(0),
        output_fps: u32::try_from(run.output_fps).unwrap_or(0),
        final_artifact_id: run.final_artifact_id,
        error_code: run.error_code,
        error_message: run.error_message,
        created_at: run.created_at.to_rfc3339(),
        started_at: run.started_at.map(|t| t.to_rfc3339()),
        completed_at: run.completed_at.map(|t| t.to_rfc3339()),
        restart_count: u32::try_from(run.restart_count).unwrap_or(0),
        max_restart_count: u32::try_from(run.max_restart_count).unwrap_or(0),
        last_breach_reason: run.last_breach_reason,
        segments: segments
            .into_iter()
            .map(|s| SegmentSummary {
                index: u32::try_from(s.segment_index).unwrap_or(0),
                status: s.status,
                duration_seconds: s.duration_seconds,
                started_at: s.started_at.map(|t| t.to_rfc3339()),
                completed_at: s.completed_at.map(|t| t.to_rfc3339()),
            })
            .collect(),
    }))
}

async fn cancel_render(
    State(state): State<Arc<ApiState>>,
    Path(run_id): Path<String>,
) -> ApiResult<StatusCode> {
    validate_run_id(&run_id)?;
    let run = state.repos.get_run(&run_id).await?;
    if matches!(run.status.as_str(), "completed" | "failed" | "cancelled") {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "cannot cancel run in terminal state '{}'",
            run.status
        ))));
    }
    // Signal the live render task first so the worker gets the cancel RPC
    // while it's still in-flight. The task itself flips the DB row to
    // "cancelled" once the worker acks (or the grace window expires), so
    // we only update the DB here as a fallback when no live task exists —
    // queued-but-never-spawned runs can still be marked cancelled.
    let outcome = state.runner.cancel(&run_id).await;
    if matches!(outcome, CancelOutcome::NotInFlight) {
        // Race guard: between `get_run` and this write the task may have
        // terminated naturally (completed/failed). The conditional-update
        // variant refuses to overwrite a terminal row.
        state
            .repos
            .update_run_status_if_not_terminal(&run_id, "cancelled")
            .await?;
    }
    Ok(StatusCode::ACCEPTED)
}

async fn list_segments_handler(
    State(state): State<Arc<ApiState>>,
    Path(run_id): Path<String>,
) -> ApiResult<Json<Vec<SegmentSummary>>> {
    validate_run_id(&run_id)?;
    let segments = state.repos.list_segments(&run_id).await?;
    Ok(Json(
        segments
            .into_iter()
            .map(|s| SegmentSummary {
                index: u32::try_from(s.segment_index).unwrap_or(0),
                status: s.status,
                duration_seconds: s.duration_seconds,
                started_at: s.started_at.map(|t| t.to_rfc3339()),
                completed_at: s.completed_at.map(|t| t.to_rfc3339()),
            })
            .collect(),
    ))
}

async fn retry_segment(
    State(state): State<Arc<ApiState>>,
    Path(run_id): Path<String>,
    Json(body): Json<RetrySegmentRequest>,
) -> ApiResult<StatusCode> {
    validate_run_id(&run_id)?;
    let run = state.repos.get_run(&run_id).await?;
    // Only failed segments are legitimate retry targets. Retrying a
    // segment of a completed/cancelled run would race the published
    // final.mp4 + corrupt the published artifact set.
    if matches!(run.status.as_str(), "completed" | "cancelled") {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "cannot retry segment on run '{run_id}' in terminal state '{}'",
            run.status
        ))));
    }
    if state.runner.is_render_in_flight(&run_id).await {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "cannot retry segment for run '{run_id}' while a full render or another retry \
             is in flight; cancel the run first or wait for it to terminate"
        ))));
    }
    let plan = parse_plan_for_retry(&run)?;
    let segment_count = plan.segments.len();
    let seg_index = usize::try_from(body.segment_index).map_err(|_| {
        ExtensionError::InvalidRequest(format!(
            "segment_index {} not addressable",
            body.segment_index
        ))
    })?;
    if seg_index >= segment_count {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "segment_index {} out of range; run has {segment_count} segments",
            body.segment_index
        ))));
    }
    let request = parse_request_for_retry(&run)?;
    let prompt = body
        .prompt_override
        .clone()
        .unwrap_or_else(|| request.prompt.clone());
    // Silent "fake" fallback when runtime_profile is null was a data-
    // corruption hazard — would re-render with placeholder MP4s over a
    // real run. Refuse the retry with a clear message instead.
    let runtime_id = run.runtime_profile.clone().ok_or_else(|| {
        ExtensionError::InvalidRequest(format!(
            "run '{run_id}' has no runtime_profile stored; cannot retry safely \
             (would risk overwriting real artifacts with the fake pipeline)"
        ))
    })?;

    state
        .repos
        .update_segment_status(&run_id, i64::from(body.segment_index), "queued", None)
        .await?;

    let spawn_outcome = state
        .runner
        .spawn_retry_segment(
            run_id,
            runtime_id,
            plan,
            body.segment_index,
            prompt,
            request.negative_prompt.clone(),
            request.style_prompt.clone(),
            request.character_prompt.clone(),
            request.input_image_artifact_id.clone(),
            request.advanced.clone(),
        )
        .await;

    match spawn_outcome {
        RetrySpawnOutcome::Accepted => Ok(StatusCode::ACCEPTED),
        RetrySpawnOutcome::Duplicate => Err(ApiError(ExtensionError::InvalidRequest(
            "a retry for this segment is already in flight".into(),
        ))),
    }
}

/// Non-cryptographic fingerprint over the request body.
///
/// Used by the idempotency cache to distinguish "same key, same body"
/// (legitimate retry) from "same key, different body" (client bug /
/// collision). Returns 0 when JSON serialisation fails; the caller
/// still stores the entry, but every comparison against a freshly-
/// computed 0 hash would falsely match — that's acceptable because
/// (a) `serde_json` on our Serialize-derived types essentially never
/// fails, and (b) the idempotency check is best-effort, not a
/// security boundary.
fn hash_create_render_request(req: &CreateRenderRequest) -> u64 {
    use std::hash::{DefaultHasher, Hash, Hasher};
    let Ok(canonical) = serde_json::to_string(req) else {
        return 0;
    };
    let mut hasher = DefaultHasher::new();
    canonical.hash(&mut hasher);
    hasher.finish()
}

/// Run IDs must be safe to use as filesystem path components and as
/// JSON-RPC `request_id` values. The HTTP layer already constrains
/// callers to a `Path<String>` extracted from the URL, but downstream
/// the value flows into `cfg.runs_dir.join(run_id)` so we enforce the
/// shape explicitly: ULID-class characters plus a couple of legacy
/// fixtures (test runs use `run_test_*`).
fn validate_run_id(run_id: &str) -> ApiResult<()> {
    if run_id.is_empty() || run_id.len() > 64 {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "run_id length out of range (1..=64); got {} chars",
            run_id.len()
        ))));
    }
    let ok = run_id
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-');
    if !ok {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "run_id '{run_id}' contains characters outside [A-Za-z0-9_-]"
        ))));
    }
    Ok(())
}

fn parse_plan_for_retry(run: &RenderRunRow) -> ApiResult<RenderPlan> {
    let plan_json = run.plan_json.as_deref().ok_or_else(|| {
        ExtensionError::InvalidRequest(format!(
            "run '{}' has no stored plan; cannot retry segment",
            run.id
        ))
    })?;
    serde_json::from_str(plan_json).map_err(|e| {
        ExtensionError::Internal(format!("deserialise plan for run '{}': {e}", run.id)).into()
    })
}

fn parse_request_for_retry(run: &RenderRunRow) -> ApiResult<CreateRenderRequest> {
    serde_json::from_str(&run.request_json).map_err(|e| {
        ExtensionError::Internal(format!("deserialise request for run '{}': {e}", run.id)).into()
    })
}

#[derive(serde::Deserialize)]
struct RetrySegmentRequest {
    segment_index: u32,
    prompt_override: Option<String>,
}

/// Accepted MIME types for the input-image upload route.
///
/// Mirrors the `image_to_long_video.yaml` recipe declaration. Every
/// allowed type also has a `magic_signature` arm in `sniff_image_kind`
/// so a renamed `.exe` posing as `image/png` is rejected before the
/// bytes hit disk.
const ACCEPTED_INPUT_MIMES: &[&str] = &["image/png", "image/jpeg", "image/webp"];

/// Decoded image kind, in step with `ACCEPTED_INPUT_MIMES`.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum InputImageKind {
    Png,
    Jpeg,
    Webp,
}

impl InputImageKind {
    const fn mime(self) -> &'static str {
        match self {
            Self::Png => "image/png",
            Self::Jpeg => "image/jpeg",
            Self::Webp => "image/webp",
        }
    }

    const fn extension(self) -> &'static str {
        match self {
            Self::Png => "png",
            Self::Jpeg => "jpg",
            Self::Webp => "webp",
        }
    }
}

/// Probe the first few bytes for an image signature.
///
/// Returns `Some(kind)` when the magic bytes match a supported format.
/// Rejecting an unrecognised payload at this layer (rather than letting
/// PIL decide later in the worker) gives the operator an actionable 400
/// instead of an opaque worker crash.
fn sniff_image_kind(bytes: &[u8]) -> Option<InputImageKind> {
    if bytes.starts_with(b"\x89PNG\r\n\x1a\n") {
        return Some(InputImageKind::Png);
    }
    if bytes.starts_with(b"\xFF\xD8\xFF") {
        return Some(InputImageKind::Jpeg);
    }
    if bytes.len() >= 12 && &bytes[0..4] == b"RIFF" && &bytes[8..12] == b"WEBP" {
        return Some(InputImageKind::Webp);
    }
    None
}

#[derive(Serialize)]
struct UploadInputImageResponse {
    artifact_id: String,
    mime: &'static str,
    byte_length: u64,
    sha256: String,
}

/// `POST /api/v1/extensions/nexus.video.ltx23/input-images`
///
/// Accepts a single `image` multipart field, writes it to
/// `<inputs_dir>/ltx23-input-<ulid>.<ext>`, and returns the
/// server-issued artifact id. The artifact id is then submitted as
/// `CreateRenderRequest::input_image_artifact_id` on `POST /renders`
/// and resolved back to the on-disk path by the runner.
///
/// Mirrors the multipart pattern of
/// `extensions/builtin/emotion-tts/rust/src/router/voice_assets.rs::upload`,
/// scaled down for a single image (8 MB cap vs 64 MB for audio).
async fn upload_input_image(
    State(state): State<Arc<ApiState>>,
    mut multipart: Multipart,
) -> ApiResult<(StatusCode, Json<UploadInputImageResponse>)> {
    let mut payload: Option<Vec<u8>> = None;
    let mut declared_mime: Option<String> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| ExtensionError::InvalidRequest(format!("multipart: {e}")))?
    {
        let name = field.name().map(String::from).unwrap_or_default();
        if name == "image" {
            declared_mime = field.content_type().map(String::from);
            let bytes = field
                .bytes()
                .await
                .map_err(|e| ExtensionError::InvalidRequest(format!("read field 'image': {e}")))?;
            payload = Some(bytes.to_vec());
        } else {
            // Drain unrecognised fields so multipart parsing stays
            // happy; ignore their content. Same posture as emotion-tts.
            let _ = field.bytes().await;
        }
    }

    let bytes =
        payload.ok_or_else(|| ExtensionError::InvalidRequest("missing field: image".into()))?;
    if bytes.is_empty() {
        return Err(ApiError(ExtensionError::InvalidRequest(
            "image payload is empty".into(),
        )));
    }

    let declared = declared_mime.as_deref().unwrap_or("");
    if !declared.is_empty() && !ACCEPTED_INPUT_MIMES.contains(&declared) {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "Content-Type '{declared}' is not an accepted image type; \
             allowed: {ACCEPTED_INPUT_MIMES:?}"
        ))));
    }

    let kind = sniff_image_kind(&bytes).ok_or_else(|| {
        ExtensionError::InvalidRequest(
            "payload does not start with a recognised image signature (PNG/JPEG/WEBP)".into(),
        )
    })?;
    if !declared.is_empty() && declared != kind.mime() {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "Content-Type '{declared}' disagrees with payload magic bytes \
             ({}); refusing upload",
            kind.mime()
        ))));
    }

    let artifact_id = format!("ltx23-input-{}", Ulid::new());
    let dest = state
        .inputs_dir
        .join(format!("{artifact_id}.{}", kind.extension()));

    tokio::fs::write(&dest, &bytes).await.map_err(|e| {
        ExtensionError::Internal(format!("persist input image to {}: {e}", dest.display()))
    })?;

    let sha256 = hex_lower(Sha256::digest(&bytes).as_slice());
    #[allow(clippy::cast_possible_truncation)]
    let byte_length = bytes.len() as u64;

    Ok((
        StatusCode::CREATED,
        Json(UploadInputImageResponse {
            artifact_id,
            mime: kind.mime(),
            byte_length,
            sha256,
        }),
    ))
}

/// Hex-encode bytes without pulling a fourth crate (`hex`).
fn hex_lower(bytes: &[u8]) -> String {
    let mut out = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        use std::fmt::Write;
        write!(&mut out, "{b:02x}").expect("write to string never fails");
    }
    out
}

async fn serve_artifact(
    State(state): State<Arc<ApiState>>,
    Path(artifact_id): Path<String>,
) -> ApiResult<Response> {
    let run_id = artifact_id
        .strip_prefix("ltx23-run-")
        .and_then(|s| s.strip_suffix("-final"))
        .ok_or_else(|| ExtensionError::NotFound(format!("artifact {artifact_id}")))?;
    // Defense-in-depth: validate the extracted run_id before joining it
    // onto runs_dir. axum URL-decodes path segments, so without this a
    // request like `/artifacts/ltx23-run-..%2F..%2Fetc%2Fpasswd-final`
    // would otherwise read outside the sandbox.
    validate_run_id(run_id)?;

    let path = state.runs_dir.join(run_id).join("final.mp4");
    // Belt + braces: after the join, canonicalise and verify the result
    // is still a descendant of runs_dir. Catches any traversal that
    // slipped past validate_run_id (none should — but the cost is one
    // syscall on a path that exists).
    let canonical = tokio::fs::canonicalize(&path)
        .await
        .map_err(|e| ExtensionError::NotFound(format!("artifact file: {e}")))?;
    let runs_root = tokio::fs::canonicalize(&state.runs_dir)
        .await
        .map_err(|e| ExtensionError::Internal(format!("runs_dir canonicalize: {e}")))?;
    if !canonical.starts_with(&runs_root) {
        return Err(ApiError(ExtensionError::NotFound(format!(
            "artifact {artifact_id}"
        ))));
    }

    // Stream the response body instead of reading the whole file into
    // memory. A multi-minute LTX render lands at ~50-200 MB; the
    // previous `tokio::fs::read` would heap-spike per request, which
    // is especially painful when the UI auto-replays the preview.
    let file = tokio::fs::File::open(&canonical)
        .await
        .map_err(|e| ExtensionError::NotFound(format!("artifact file: {e}")))?;
    let metadata = file
        .metadata()
        .await
        .map_err(|e| ExtensionError::Internal(format!("artifact stat: {e}")))?;
    let content_length = metadata.len();
    let stream = tokio_util::io::ReaderStream::new(file);

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "video/mp4")
        .header(header::CONTENT_LENGTH, content_length.to_string())
        .header(header::ACCEPT_RANGES, "bytes")
        .header(
            header::CONTENT_DISPOSITION,
            format!("inline; filename=\"{artifact_id}.mp4\""),
        )
        .body(Body::from_stream(stream))
        .map_err(|e| ExtensionError::Internal(format!("response build: {e}")))?)
}

#[allow(dead_code)]
pub(crate) const fn _resolved_runtime_unused(_p: RuntimeProfilePreference) {}

type ApiResult<T> = std::result::Result<T, ApiError>;

struct ApiError(ExtensionError);

impl From<ExtensionError> for ApiError {
    fn from(err: ExtensionError) -> Self {
        Self(err)
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, code) = match &self.0 {
            ExtensionError::InvalidRequest(_) | ExtensionError::PlanInvalid(_) => {
                (StatusCode::BAD_REQUEST, self.0.code())
            }
            ExtensionError::NotFound(_) => (StatusCode::NOT_FOUND, ExtensionErrorCode::NotFound),
            ExtensionError::RuntimeUnavailable(_)
            | ExtensionError::DriverTooOld(_)
            | ExtensionError::GpuNotSupported(_)
            | ExtensionError::ModelMissing(_) => (StatusCode::SERVICE_UNAVAILABLE, self.0.code()),
            ExtensionError::VramBudgetExceeded(_) => (
                StatusCode::PAYLOAD_TOO_LARGE,
                ExtensionErrorCode::VramBudgetExceeded,
            ),
            ExtensionError::RenderCancelled => {
                (StatusCode::CONFLICT, ExtensionErrorCode::RenderCancelled)
            }
            ExtensionError::RenderFailed(_)
            | ExtensionError::Internal(_)
            | ExtensionError::Storage(_) => (StatusCode::INTERNAL_SERVER_ERROR, self.0.code()),
        };

        (
            status,
            Json(serde_json::json!({
                "code": code,
                "message": self.0.to_string(),
            })),
        )
            .into_response()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn validate_run_id_accepts_ulid_shape() {
        assert!(validate_run_id("01JABCDEFGHJKMNPQRSTVWXYZ0").is_ok());
        assert!(validate_run_id("run_test_001").is_ok());
        assert!(validate_run_id("abc-def_123").is_ok());
    }

    #[test]
    fn validate_run_id_rejects_path_traversal() {
        assert!(validate_run_id("../escape").is_err());
        assert!(validate_run_id("with/slash").is_err());
        assert!(validate_run_id("with\\back").is_err());
        assert!(validate_run_id("has.dot").is_err());
        assert!(validate_run_id("has space").is_err());
    }

    #[test]
    fn validate_run_id_rejects_empty_or_oversized() {
        assert!(validate_run_id("").is_err());
        assert!(validate_run_id(&"x".repeat(65)).is_err());
    }

    fn mk_cache() -> IdempotencyCache {
        Arc::new(AsyncMutex::new(HashMap::new()))
    }

    fn mk_entry(run_id: &str, ttl: Duration) -> IdempotencyEntry {
        IdempotencyEntry {
            run_id: run_id.into(),
            runtime_profile: "nexus.video.ltx23.fake".into(),
            segment_count: 1,
            created_at: chrono::Utc::now(),
            expires_at: Instant::now() + ttl,
            request_hash: 0,
        }
    }

    #[tokio::test]
    async fn lookup_idempotent_returns_cached_entry_inside_ttl() {
        let cache = mk_cache();
        store_idempotent(&cache, "key-abc".into(), mk_entry("run-1", IDEMPOTENCY_TTL)).await;
        let hit = lookup_idempotent(&cache, "key-abc").await;
        assert_eq!(hit.map(|e| e.run_id), Some("run-1".into()));
    }

    #[tokio::test]
    async fn lookup_idempotent_misses_after_ttl_expires() {
        let cache = mk_cache();
        // 1ms TTL → guaranteed-expired by the time we look it up.
        store_idempotent(
            &cache,
            "stale".into(),
            mk_entry("run-x", Duration::from_millis(1)),
        )
        .await;
        tokio::time::sleep(Duration::from_millis(10)).await;
        assert!(lookup_idempotent(&cache, "stale").await.is_none());
    }

    #[tokio::test]
    async fn lookup_reaps_expired_entries_on_miss() {
        let cache = mk_cache();
        store_idempotent(
            &cache,
            "old".into(),
            mk_entry("run-old", Duration::from_millis(1)),
        )
        .await;
        store_idempotent(
            &cache,
            "fresh".into(),
            mk_entry("run-fresh", IDEMPOTENCY_TTL),
        )
        .await;
        tokio::time::sleep(Duration::from_millis(10)).await;
        // Miss on an unrelated key triggers a reap pass.
        assert!(lookup_idempotent(&cache, "absent").await.is_none());
        // Stale entry should be gone; fresh one should remain.
        let guard = cache.lock().await;
        let old_gone = !guard.contains_key("old");
        let fresh_kept = guard.contains_key("fresh");
        drop(guard);
        assert!(old_gone);
        assert!(fresh_kept);
    }

    #[tokio::test]
    async fn store_evicts_oldest_when_at_cap() {
        let cache = mk_cache();
        // Fill the cache to cap; the inserted entries have monotonic
        // expiry instants, so the "oldest" is the first inserted.
        for i in 0..IDEMPOTENCY_CAP {
            store_idempotent(
                &cache,
                format!("k{i}"),
                mk_entry(
                    &format!("run-{i}"),
                    IDEMPOTENCY_TTL + Duration::from_millis(i as u64),
                ),
            )
            .await;
        }
        assert_eq!(cache.lock().await.len(), IDEMPOTENCY_CAP);

        // One more push triggers eviction.
        store_idempotent(
            &cache,
            "overflow".into(),
            mk_entry("run-overflow", IDEMPOTENCY_TTL * 2),
        )
        .await;
        let guard = cache.lock().await;
        let len = guard.len();
        let k0_gone = !guard.contains_key("k0");
        let overflow_present = guard.contains_key("overflow");
        drop(guard);
        assert_eq!(len, IDEMPOTENCY_CAP);
        assert!(k0_gone, "oldest entry should have been evicted");
        assert!(overflow_present);
    }
}
