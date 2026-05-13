use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::{Duration, Instant};

use axum::{
    Json, Router,
    body::Body,
    extract::{Path, State},
    http::{HeaderMap, StatusCode, header},
    response::{IntoResponse, Response},
    routing::{get, post},
};
use chrono::Utc;
use serde::Serialize;
use tokio::sync::Mutex as AsyncMutex;
use ulid::Ulid;

use crate::errors::{ExtensionError, ExtensionErrorCode};
use crate::planning::plan_render;
use crate::profile_install::{ProfileInstallService, ProfileInstallStatus};
use crate::runner::{CancelOutcome, Runner};
use crate::runtime_selection::{available_profiles, resolve_runtime_id};
use crate::schemas::{CreateRenderRequest, RenderPlan, RuntimeProfilePreference};
use crate::storage::{Repos, RenderRunRow, RenderSegmentRow};

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
        extension_version: &'static str,
        profile_install: ProfileInstallService,
    ) -> Self {
        Self {
            repos,
            runner,
            runs_dir,
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
        .route("/profiles/{profile_id}/install", post(start_profile_install))
        .route("/profiles/{profile_id}/install", get(profile_install_status))
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
        "/profiles/{profile_id}/install".into(),
    ]
}

async fn start_profile_install(
    State(state): State<Arc<ApiState>>,
    Path(profile_id): Path<String>,
) -> ApiResult<(StatusCode, Json<ProfileInstallStatus>)> {
    let status = state.profile_install.start(profile_id).await?;
    Ok((StatusCode::ACCEPTED, Json(status)))
}

async fn profile_install_status(
    State(state): State<Arc<ApiState>>,
    Path(profile_id): Path<String>,
) -> ApiResult<Json<ProfileInstallStatus>> {
    let status = state.profile_install.status(&profile_id).await?;
    Ok(Json(status))
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
                Some(s) if s.in_flight => {
                    s.phase.as_deref().unwrap_or("installing").to_string()
                }
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
    let runtime_id = resolve_runtime_id(req.runtime_profile, false);
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
    let idempotency_key = headers
        .get("idempotency-key")
        .and_then(|v| v.to_str().ok())
        .map(str::to_string)
        .filter(|s| !s.is_empty());

    if let Some(ref key) = idempotency_key {
        if let Some(cached) = lookup_idempotent(&state.idempotency, key).await {
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

    let runtime_id = resolve_runtime_id(req.runtime_profile, false);
    let plan = plan_render(&req, runtime_id)?;

    let run_id = Ulid::new().to_string();
    let now = Utc::now();
    let project_id = req
        .project_id
        .clone()
        .unwrap_or_else(|| format!("inline-{run_id}"));

    let plan_json = serde_json::to_string(&plan).map_err(|e| {
        ExtensionError::Internal(format!("plan serialise: {e}"))
    })?;
    let request_json = serde_json::to_string(&req).map_err(|e| {
        ExtensionError::Internal(format!("request serialise: {e}"))
    })?;

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
async fn lookup_idempotent(
    cache: &IdempotencyCache,
    key: &str,
) -> Option<IdempotencyEntry> {
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

async fn store_idempotent(
    cache: &IdempotencyCache,
    key: String,
    entry: IdempotencyEntry,
) {
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
    let run = state.repos.get_run(&run_id).await?;
    let segments = state.repos.list_segments(&run_id).await?;
    let completed = u32::try_from(
        segments
            .iter()
            .filter(|s| s.status == "completed")
            .count(),
    )
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
        state
            .repos
            .update_run_status(&run_id, "cancelled", None, None, None)
            .await?;
    }
    Ok(StatusCode::ACCEPTED)
}

async fn list_segments_handler(
    State(state): State<Arc<ApiState>>,
    Path(run_id): Path<String>,
) -> ApiResult<Json<Vec<SegmentSummary>>> {
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
    let run = state.repos.get_run(&run_id).await?;
    if state.runner.is_render_in_flight(&run_id).await {
        return Err(ApiError(ExtensionError::InvalidRequest(format!(
            "cannot retry segment for run '{run_id}' while a full render is in flight; \
             cancel the run first or wait for it to terminate"
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
    let runtime_id = run
        .runtime_profile
        .clone()
        .unwrap_or_else(|| "fake".to_string());

    state
        .repos
        .update_segment_status(&run_id, i64::from(body.segment_index), "queued", None)
        .await?;

    state.runner.spawn_retry_segment(
        run_id,
        runtime_id,
        plan,
        body.segment_index,
        prompt,
        request.negative_prompt.clone(),
        request.style_prompt.clone(),
        request.character_prompt.clone(),
        request.advanced.clone(),
    );

    Ok(StatusCode::ACCEPTED)
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

async fn serve_artifact(
    State(state): State<Arc<ApiState>>,
    Path(artifact_id): Path<String>,
) -> ApiResult<Response> {
    let run_id = artifact_id
        .strip_prefix("ltx23-run-")
        .and_then(|s| s.strip_suffix("-final"))
        .ok_or_else(|| ExtensionError::NotFound(format!("artifact {artifact_id}")))?;

    let path = state.runs_dir.join(run_id).join("final.mp4");
    let bytes = tokio::fs::read(&path)
        .await
        .map_err(|e| ExtensionError::NotFound(format!("artifact file: {e}")))?;

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "video/mp4")
        .header(
            header::CONTENT_DISPOSITION,
            format!("inline; filename=\"{artifact_id}.mp4\""),
        )
        .body(Body::from(bytes))
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
            ExtensionError::VramBudgetExceeded(_) => {
                (StatusCode::PAYLOAD_TOO_LARGE, ExtensionErrorCode::VramBudgetExceeded)
            }
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
        store_idempotent(&cache, "stale".into(), mk_entry("run-x", Duration::from_millis(1))).await;
        tokio::time::sleep(Duration::from_millis(10)).await;
        assert!(lookup_idempotent(&cache, "stale").await.is_none());
    }

    #[tokio::test]
    async fn lookup_reaps_expired_entries_on_miss() {
        let cache = mk_cache();
        store_idempotent(&cache, "old".into(), mk_entry("run-old", Duration::from_millis(1))).await;
        store_idempotent(&cache, "fresh".into(), mk_entry("run-fresh", IDEMPOTENCY_TTL)).await;
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
                mk_entry(&format!("run-{i}"), IDEMPOTENCY_TTL + Duration::from_millis(i as u64)),
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
