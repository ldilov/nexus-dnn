//! Runs router — implements the six-endpoint shape from contracts/http/runs.yaml.
//!
//! The handlers are deliberately thin — heavy lifting lives in the
//! operator layer + queue. The router's job is request shaping, preflight,
//! and mapping domain errors into the JSON envelope.

use std::convert::Infallible;
use std::sync::Arc;
use std::time::Duration;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use futures::stream::Stream;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::backend_client::LeaseProvider;
use crate::domain::filenames::build_filename;
use crate::domain::parser::{parse_script, ParserMode};
use crate::domain::{DeploymentId, EmotionTtsError, Result, RunId};
use crate::host_contract::HostArtifactStore;
use crate::operators::mapping_resolve::{Input as MapInput, MappingResolveOperator};
use crate::operators::Operator;
use crate::queue::{RunClass, SharedQueue};
use crate::storage::repo_traits::RunRow;
use crate::storage::Repos;

#[derive(Clone)]
pub struct RunsState {
    pub repos: Repos,
    pub queue: SharedQueue,
    pub extension_version: String,
    pub run_channels: Arc<crate::dispatcher::RunChannelRegistry>,
    /// Spec 036 / US2 — needed by the per-utterance edit handler. `None`
    /// when the host boots without an artifact store / lease factory wired
    /// (CI tests that exercise other endpoints can leave these unset).
    pub artifact_store: Option<Arc<dyn HostArtifactStore>>,
    pub lease_provider: Option<Arc<LeaseProvider>>,
}

#[must_use]
pub fn router(state: RunsState) -> Router {
    let utterance_edit_state = Arc::new(crate::router::utterance_edit::UtteranceEditState {
        repos: state.repos.clone(),
        artifact_store: state.artifact_store.clone(),
        lease_provider: state.lease_provider.clone(),
    });
    Router::new()
        .route(
            "/deployments/{deployment_id}/runs",
            get(list_runs).post(create_run),
        )
        .route("/deployments/{deployment_id}/runs/{run_id}", get(get_run))
        .route(
            "/deployments/{deployment_id}/runs/{run_id}/cancel",
            post(cancel_run),
        )
        .route(
            "/deployments/{deployment_id}/runs/{run_id}/resume",
            post(resume_run),
        )
        .route(
            "/deployments/{deployment_id}/runs/{run_id}/progress",
            get(run_progress),
        )
        .route(
            "/deployments/{deployment_id}/runs/test-line",
            post(test_line),
        )
        .route("/runs/{run_id}/diagnostics", get(diagnostics))
        .with_state(state)
        .merge(crate::router::utterance_edit::routes(utterance_edit_state))
}

/// SSE progress channel for a single run.
///
/// Frontend's `subscribeRunProgress` opens this stream after a successful
/// `POST /runs` and listens for per-segment events. The handler subscribes
/// to the per-run `RunChannelRegistry` channel registered by the
/// dispatcher and forwards `RunEvent::SegmentStarted`,
/// `SegmentCompleted`, `SegmentFailed`, and `RunTerminal` straight to the
/// client. If the dispatcher takes a while to register the channel
/// (cold-lease boot can be several minutes for the first run), the
/// handler retries every 100 ms and falls back to polling the run row
/// for an early terminal state. See `run_progress_stream` for details.
async fn run_progress(
    State(state): State<RunsState>,
    Path((raw_deployment_id, raw_run_id)): Path<(String, String)>,
) -> Response {
    let deployment_id = match DeploymentId::try_from(raw_deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    let run_id = match RunId::try_from(raw_run_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    // Validate the run exists before opening the stream — otherwise the
    // browser would treat a bare 404 as a transient SSE failure and
    match state.repos.runs.get(&run_id).await {
        Ok(Some(row)) if row.deployment_id == deployment_id => {}
        Ok(Some(_)) => {
            return EmotionTtsError::not_found(format!(
                "run {run_id} does not belong to deployment {deployment_id}"
            ))
            .into_response();
        }
        Ok(None) => {
            return EmotionTtsError::not_found(format!("run {run_id}")).into_response();
        }
        Err(err) => return err.into_response(),
    }

    let stream = run_progress_stream(state.clone(), run_id);
    Sse::new(stream)
        .keep_alive(KeepAlive::new().interval(Duration::from_secs(15)))
        .into_response()
}

fn run_progress_stream(
    state: RunsState,
    run_id: RunId,
) -> impl Stream<Item = std::result::Result<Event, Infallible>> {
    async_stream::stream! {
        // Try to find the per-run channel. If the dispatcher has not yet
        // popped this run, we briefly retry — there's a small window
        let mut maybe_rx = None;
        for i in 0..3000_u32 {
            if let Some(rx) = state.run_channels.subscribe(run_id.as_str()).await {
                maybe_rx = Some(rx);
                break;
            }
            if i % 5 == 0 {
                if let Ok(Some(row)) = state.repos.runs.get(&run_id).await {
                    if matches!(row.status.as_str(), "completed" | "failed" | "cancelled" | "partial") {
                        let payload = serde_json::json!({
                            "type": "run_terminal",
                            "run_id": run_id.as_str(),
                            "status": row.status,
                        });
                        yield Ok(Event::default().event(crate::dispatcher::events::SSE_RUN_TERMINAL).data(payload.to_string()));
                        return;
                    }
                }
            }
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        let Some(mut rx) = maybe_rx else {
            let payload = serde_json::json!({
                "type": "run_terminal",
                "run_id": run_id.as_str(),
                "status": "failed",
                "error": "dispatcher did not pick up run within 5 minutes",
            });
            yield Ok(Event::default().event(crate::dispatcher::events::SSE_RUN_TERMINAL).data(payload.to_string()));
            return;
        };
        // Late-subscribe replay: emit segment_started + segment_completed/
        // segment_failed events for every utterance row that already has a
        if let Ok(rows) = state.repos.utterances.list_by_run(&run_id).await {
            for row in rows {
                match row.status.as_str() {
                    "running" => {
                        let p = serde_json::json!({
                            "type": "segment_started",
                            "run_id": run_id.as_str(),
                            "utterance_id": row.utterance_id.as_str(),
                            "global_index": row.global_index,
                        });
                        yield Ok(Event::default().event(crate::dispatcher::events::SSE_SEGMENT_STARTED).data(p.to_string()));
                    }
                    "completed" => {
                        let p = serde_json::json!({
                            "type": "segment_completed",
                            "run_id": run_id.as_str(),
                            "utterance_id": row.utterance_id.as_str(),
                            "global_index": row.global_index,
                            "duration_ms": row.duration_ms.unwrap_or(0),
                        });
                        yield Ok(Event::default().event(crate::dispatcher::events::SSE_SEGMENT_COMPLETED).data(p.to_string()));
                    }
                    "failed" => {
                        let p = serde_json::json!({
                            "type": "segment_failed",
                            "run_id": run_id.as_str(),
                            "utterance_id": row.utterance_id.as_str(),
                            "global_index": row.global_index,
                            "failure_category": row.failure_category.unwrap_or_else(|| "unknown".into()),
                            "failure_detail": row.failure_detail,
                        });
                        yield Ok(Event::default().event(crate::dispatcher::events::SSE_SEGMENT_FAILED).data(p.to_string()));
                    }
                    _ => {}
                }
            }
        }
        loop {
            match rx.recv().await {
                Ok(event) => {
                    let name = event.sse_event_name();
                    let data = serde_json::to_string(&event)
                        .unwrap_or_else(|_| "{}".to_string());
                    yield Ok(Event::default().event(name).data(data));
                    if matches!(event, crate::dispatcher::RunEvent::RunTerminal { .. }) {
                        return;
                    }
                }
                Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => {
                    // Slow subscriber — drop the lagged frames and keep going.
                }
                Err(tokio::sync::broadcast::error::RecvError::Closed) => {
                    return;
                }
            }
        }
    }
}

/// Spec 034 US2 / T063 — reads alignment diagnostics for a completed run.
///
/// Returns the contract-correct shape even when no diagnostics have been
/// stored yet: an empty `segments` array + `summary: null`. Once T059/T061
/// wire attention capture into the dispatch path the segments will carry
/// per-utterance `AlignmentDiagnostics`; until then the endpoint is
/// discoverable-but-empty so the frontend can ship without blocking on
/// the full pipeline.
async fn diagnostics(State(state): State<RunsState>, Path(raw_run_id): Path<String>) -> Response {
    let run_id = match RunId::try_from(raw_run_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.runs.get(&run_id).await {
        Ok(Some(_run)) => (
            StatusCode::OK,
            Json(json!({
                "runId": run_id.as_str(),
                "segments": [],
                "summary": null,
            })),
        )
            .into_response(),
        Ok(None) => EmotionTtsError::not_found(format!("run {run_id}")).into_response(),
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
pub struct ListQuery {
    #[serde(default = "default_limit")]
    pub limit: i64,
    #[serde(default)]
    pub status: Option<String>,
}

fn default_limit() -> i64 {
    20
}

pub async fn list_runs(
    State(state): State<RunsState>,
    Path(deployment_id): Path<String>,
    Query(query): Query<ListQuery>,
) -> Response {
    match list_runs_impl(&state, &deployment_id, query.limit, query.status).await {
        Ok(body) => (StatusCode::OK, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn list_runs_impl(
    state: &RunsState,
    deployment_id: &str,
    limit: i64,
    status_filter: Option<String>,
) -> Result<Value> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let mut rows = state.repos.runs.list_by_deployment(&dep, limit).await?;
    if let Some(filter) = status_filter {
        rows.retain(|r| r.status == filter);
    }
    let summaries: Vec<Value> = rows.iter().map(run_summary_json).collect();
    Ok(json!({ "runs": summaries }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateRunBody {
    pub script: String,
    #[serde(default = "default_parser_mode")]
    pub parser_mode: String,
    pub output_format: String,
    #[serde(default = "default_speed")]
    pub speed_factor: f64,
    #[serde(default = "default_speed_mode")]
    pub speed_mode: String,
    #[serde(default = "default_seed_strategy")]
    pub seed_strategy: String,
    #[serde(default = "default_base_seed")]
    pub base_seed: i64,
    #[serde(default = "default_cache_policy")]
    pub cache_policy: String,
    #[serde(default)]
    pub global_emotion: Option<Value>,
    #[serde(default)]
    pub generation: Option<Value>,
    /// Phase 1 (storyboard queue → Generate). Optional explicit segment list
    /// `[{text, voice_asset_id, emotion?}]`. When present the dispatcher
    /// synthesises these verbatim and ignores `script` parsing / mappings.
    #[serde(default)]
    pub prebuilt_segments: Option<Value>,
}

fn default_parser_mode() -> String {
    "dialogue".into()
}
fn default_speed() -> f64 {
    1.0
}
fn default_speed_mode() -> String {
    "preserve_pitch".into()
}
fn default_seed_strategy() -> String {
    "increment_per_line".into()
}
fn default_base_seed() -> i64 {
    42
}
fn default_cache_policy() -> String {
    "use_cache".into()
}

pub async fn create_run(
    State(state): State<RunsState>,
    Path(deployment_id): Path<String>,
    Json(body): Json<CreateRunBody>,
) -> Response {
    match create_run_impl(&state, &deployment_id, body).await {
        Ok(resp) => (StatusCode::ACCEPTED, Json(resp)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn create_run_impl(
    state: &RunsState,
    deployment_id: &str,
    body: CreateRunBody,
) -> Result<Value> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let has_prebuilt = body
        .prebuilt_segments
        .as_ref()
        .and_then(|v| v.as_array())
        .is_some_and(|a| !a.is_empty());
    if !has_prebuilt && body.script.trim().is_empty() {
        return Err(EmotionTtsError::validation("script cannot be empty"));
    }
    if !matches!(body.output_format.as_str(), "wav" | "mp3" | "flac") {
        return Err(EmotionTtsError::validation(format!(
            "unsupported output_format {:?}",
            body.output_format
        )));
    }
    if !(0.5..=2.0).contains(&body.speed_factor) {
        return Err(EmotionTtsError::validation(
            "speed_factor must be 0.5..=2.0",
        ));
    }

    let parser_mode = match body.parser_mode.as_str() {
        "dialogue" => ParserMode::Dialogue,
        "raw_text" => ParserMode::RawText,
        "advanced_tagged" => ParserMode::AdvancedTagged,
        other => {
            return Err(EmotionTtsError::validation(format!(
                "unsupported parser_mode {other:?}"
            )));
        }
    };

    let (unresolved_characters, predicted_filenames, parser_warnings): (
        Vec<String>,
        Vec<String>,
        Vec<Value>,
    ) = if has_prebuilt {
        (Vec::new(), Vec::new(), Vec::new())
    } else {
        let parse = parse_script(&body.script, parser_mode);
        let mappings = state.repos.mappings.list_by_deployment(&dep).await?;
        let map_out = MappingResolveOperator
            .execute(MapInput {
                utterances: parse.utterances.clone(),
                mappings,
            })
            .await?;

        let predicted: Vec<String> = map_out
            .resolved
            .iter()
            .enumerate()
            .map(|(idx, r)| {
                build_filename(
                    (idx + 1) as i64,
                    &r.utterance.character_display,
                    r.character_index,
                    &body.output_format,
                )
                .filename
            })
            .collect();

        if !map_out.unresolved_characters.is_empty() {
            let names = map_out
                .unresolved_characters
                .iter()
                .map(|n| format!("\"{n}\""))
                .collect::<Vec<_>>()
                .join(", ");
            let count = map_out.unresolved_characters.len();
            return Err(EmotionTtsError::Conflict(format!(
                "{count} unmapped {} ({names}) — open the Mappings editor and map {} to a voice asset before running, \
                 or remove {} from the script. Lines without a [Character] prefix default to \"Narrator\", which also \
                 needs a mapping.",
                if count == 1 { "character" } else { "characters" },
                if count == 1 { "it" } else { "them" },
                if count == 1 { "the line" } else { "those lines" },
            )));
        }

        let warnings = parse
            .report
            .warnings
            .iter()
            .map(warning_json)
            .collect::<Vec<_>>();
        (map_out.unresolved_characters, predicted, warnings)
    };

    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    let row = RunRow {
        run_id: run_id.clone(),
        deployment_id: dep.clone(),
        kind: "batch".into(),
        status: "queued".into(),
        script_snapshot: body.script,
        parser_mode: body.parser_mode,
        generation_settings_json: body.generation.unwrap_or_else(|| json!({})).to_string(),
        global_emotion_snapshot_json: body.global_emotion.map(|v| v.to_string()),
        output_format: body.output_format,
        speed_factor: body.speed_factor,
        speed_mode: body.speed_mode,
        cache_policy: body.cache_policy,
        seed_strategy: body.seed_strategy,
        base_seed: body.base_seed,
        original_run_id: None,
        runtime_install_id: None,
        runtime_version: None,
        model_version: None,
        extension_version: state.extension_version.clone(),
        queued_at: now,
        started_at: None,
        finished_at: None,
        error_category: None,
        error_detail: None,
        export_zip_stale_at: None,
        prebuilt_segments_json: body.prebuilt_segments.as_ref().map(|v| v.to_string()),
    };
    state.repos.runs.insert(&row).await?;

    state
        .queue
        .enqueue(run_id.clone(), deployment_id, RunClass::Batch)
        .await;
    let position = state.queue.position_of(&run_id).await.unwrap_or(-1);

    Ok(json!({
        "runId": run_id.as_str(),
        "queuePosition": position,
        "preflight": {
            "unresolvedCharacters": unresolved_characters,
            "predictedFilenames": predicted_filenames,
            "parserWarnings": parser_warnings,
        }
    }))
}

fn warning_json(w: &crate::domain::parser::ParseWarning) -> Value {
    use crate::domain::parser::ParseWarningKind;
    let kind = match w.kind {
        ParseWarningKind::UnknownOverrideKey => "unknown_override_key",
        ParseWarningKind::MalformedTag => "malformed_tag",
        ParseWarningKind::EmptyCharacterName => "empty_character_name",
        ParseWarningKind::EmptyTextAfterTag => "empty_text_after_tag",
    };
    json!({
        "lineNumber": w.line_number,
        "kind": kind,
        "detail": w.detail,
    })
}

pub async fn get_run(
    State(state): State<RunsState>,
    Path((deployment_id, run_id)): Path<(String, String)>,
) -> Response {
    match get_run_impl(&state, &deployment_id, &run_id).await {
        Ok(body) => (StatusCode::OK, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn get_run_impl(state: &RunsState, deployment_id: &str, run_id: &str) -> Result<Value> {
    let _ = DeploymentId::try_from(deployment_id)?;
    let run_id = RunId::try_from(run_id)?;
    let row = state
        .repos
        .runs
        .get(&run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    let utterances = state
        .repos
        .utterances
        .list_by_run(&run_id)
        .await
        .unwrap_or_default();
    let mut body = run_detail_json(&row, &utterances);
    let export = state
        .repos
        .exports
        .get_latest_for_run(&run_id)
        .await
        .unwrap_or(None);
    if let Some(e) = export {
        if let Some(obj) = body.as_object_mut() {
            obj.insert(
                "exportArtifactRef".into(),
                Value::String(e.export_id.as_str().to_string()),
            );
        }
    }
    Ok(body)
}

pub async fn cancel_run(
    State(state): State<RunsState>,
    Path((deployment_id, run_id)): Path<(String, String)>,
) -> Response {
    match cancel_run_impl(&state, &deployment_id, &run_id).await {
        Ok(body) => (StatusCode::ACCEPTED, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn cancel_run_impl(state: &RunsState, deployment_id: &str, run_id: &str) -> Result<Value> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let run_id = RunId::try_from(run_id)?;
    let row = state
        .repos
        .runs
        .get(&run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    if is_terminal(&row.status) {
        return Err(EmotionTtsError::Conflict(format!(
            "run is already {}",
            row.status
        )));
    }
    let cancelled = state.queue.cancel(&run_id).await;
    let status = if cancelled { "cancelling" } else { "cancelled" };
    state
        .repos
        .runs
        .update_status(&run_id, "cancelled", Some(Utc::now().timestamp()))
        .await?;
    if row.kind == "batch" {
        state
            .repos
            .deployments
            .set_partial_run(&dep, Some(&run_id))
            .await?;
    }
    Ok(json!({ "status": status }))
}

pub async fn resume_run(
    State(state): State<RunsState>,
    Path((deployment_id, run_id)): Path<(String, String)>,
) -> Response {
    match resume_run_impl(&state, &deployment_id, &run_id).await {
        Ok(body) => (StatusCode::ACCEPTED, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn resume_run_impl(state: &RunsState, deployment_id: &str, run_id: &str) -> Result<Value> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let original_id = RunId::try_from(run_id)?;
    let original = state
        .repos
        .runs
        .get(&original_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {original_id}")))?;

    if original.deployment_id != dep {
        return Err(EmotionTtsError::not_found(format!(
            "run {original_id} does not belong to deployment {deployment_id}"
        )));
    }
    if original.kind != "batch" {
        return Err(EmotionTtsError::Conflict(format!(
            "only batch runs can be resumed (this run kind = {})",
            original.kind
        )));
    }
    if original.status == "completed" {
        return Err(EmotionTtsError::Conflict(
            "run already completed — nothing to resume".into(),
        ));
    }
    if !matches!(original.status.as_str(), "cancelled" | "failed" | "partial") {
        return Err(EmotionTtsError::Conflict(format!(
            "run is still {} — cancel it first",
            original.status
        )));
    }

    let resume_id = RunId::new();
    let now = Utc::now().timestamp();
    let resumed = RunRow {
        run_id: resume_id.clone(),
        deployment_id: dep.clone(),
        kind: "batch".into(),
        status: "queued".into(),
        script_snapshot: original.script_snapshot.clone(),
        parser_mode: original.parser_mode.clone(),
        generation_settings_json: original.generation_settings_json.clone(),
        global_emotion_snapshot_json: original.global_emotion_snapshot_json.clone(),
        output_format: original.output_format.clone(),
        speed_factor: original.speed_factor,
        speed_mode: original.speed_mode.clone(),
        cache_policy: original.cache_policy.clone(),
        seed_strategy: original.seed_strategy.clone(),
        base_seed: original.base_seed,
        original_run_id: Some(
            original
                .original_run_id
                .clone()
                .unwrap_or(original_id.clone()),
        ),
        runtime_install_id: original.runtime_install_id.clone(),
        runtime_version: None,
        model_version: None,
        extension_version: state.extension_version.clone(),
        queued_at: now,
        started_at: None,
        finished_at: None,
        error_category: None,
        error_detail: None,
        export_zip_stale_at: None,
        prebuilt_segments_json: original.prebuilt_segments_json.clone(),
    };
    state.repos.runs.insert(&resumed).await?;
    state
        .queue
        .enqueue(resume_id.clone(), dep.as_str().to_string(), RunClass::Batch)
        .await;
    let position = state.queue.position_of(&resume_id).await.unwrap_or(-1);

    state.repos.deployments.set_partial_run(&dep, None).await?;

    Ok(json!({
        "runId": resume_id.as_str(),
        "originalRunId": original_id.as_str(),
        "queuePosition": position,
    }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TestLineBody {
    pub line: String,
    pub output_format: String,
    #[serde(default)]
    pub global_emotion: Option<Value>,
    #[serde(default)]
    pub generation: Option<Value>,
}

pub async fn test_line(
    State(state): State<RunsState>,
    Path(deployment_id): Path<String>,
    Json(body): Json<TestLineBody>,
) -> Response {
    match test_line_impl(&state, &deployment_id, body).await {
        Ok(resp) => (StatusCode::ACCEPTED, Json(resp)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn test_line_impl(
    state: &RunsState,
    deployment_id: &str,
    body: TestLineBody,
) -> Result<Value> {
    let dep = DeploymentId::try_from(deployment_id)?;
    if body.line.trim().is_empty() {
        return Err(EmotionTtsError::validation("line cannot be empty"));
    }
    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    let row = RunRow {
        run_id: run_id.clone(),
        deployment_id: dep.clone(),
        kind: "test_line".into(),
        status: "queued".into(),
        script_snapshot: body.line,
        parser_mode: "dialogue".into(),
        generation_settings_json: body.generation.unwrap_or_else(|| json!({})).to_string(),
        global_emotion_snapshot_json: body.global_emotion.map(|v| v.to_string()),
        output_format: body.output_format,
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".into(),
        cache_policy: "use_cache".into(),
        seed_strategy: "fixed".into(),
        base_seed: 42,
        original_run_id: None,
        runtime_install_id: None,
        runtime_version: None,
        model_version: None,
        extension_version: state.extension_version.clone(),
        queued_at: now,
        started_at: None,
        finished_at: None,
        error_category: None,
        error_detail: None,
        export_zip_stale_at: None,
        prebuilt_segments_json: None,
    };
    state.repos.runs.insert(&row).await?;
    state
        .queue
        .enqueue_test_line(run_id.clone(), deployment_id)
        .await?;

    Ok(json!({
        "runId": run_id.as_str(),
        "etaSeconds": 5.0,
    }))
}

fn is_terminal(status: &str) -> bool {
    matches!(status, "completed" | "failed" | "cancelled" | "partial")
}

fn run_summary_json(row: &RunRow) -> Value {
    json!({
        "runId": row.run_id.as_str(),
        "deploymentId": row.deployment_id.as_str(),
        "kind": row.kind,
        "status": row.status,
        "originalRunId": row.original_run_id.as_ref().map(|r| r.as_str()),
        "queuedAt": row.queued_at,
        "startedAt": row.started_at,
        "finishedAt": row.finished_at,
    })
}

fn run_detail_json(
    row: &RunRow,
    utterances: &[crate::storage::repo_traits::UtteranceRow],
) -> Value {
    let utt: Vec<Value> = utterances
        .iter()
        .map(|u| {
            json!({
                "utteranceId": u.utterance_id.as_str(),
                "globalIndex": u.global_index,
                "characterDisplay": u.character_display,
                "characterSanitised": u.character_sanitised,
                "characterIndex": u.character_index,
                "text": u.text,
                "resolvedEmotionMode": u.resolved_emotion_mode,
                "cacheHit": u.cache_hit,
                "sourceRunId": u.source_run_id.as_ref().map(|r| r.as_str()),
                "audioArtifactRef": u.audio_artifact_ref,
                "durationMs": u.duration_ms,
                "status": u.status,
                "failureCategory": u.failure_category,
            })
        })
        .collect();
    let mut base = run_summary_json(row);
    let obj = base.as_object_mut().unwrap();
    obj.insert(
        "scriptSnapshot".into(),
        Value::String(row.script_snapshot.clone()),
    );
    obj.insert(
        "outputFormat".into(),
        Value::String(row.output_format.clone()),
    );
    obj.insert("speedFactor".into(), json!(row.speed_factor));
    obj.insert("speedMode".into(), Value::String(row.speed_mode.clone()));
    obj.insert(
        "cachePolicy".into(),
        Value::String(row.cache_policy.clone()),
    );
    obj.insert(
        "seedStrategy".into(),
        Value::String(row.seed_strategy.clone()),
    );
    obj.insert("baseSeed".into(), json!(row.base_seed));
    obj.insert("utterances".into(), Value::Array(utt));
    base
}
