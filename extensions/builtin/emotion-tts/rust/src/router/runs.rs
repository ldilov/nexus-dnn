//! Runs router — implements the six-endpoint shape from contracts/http/runs.yaml.
//!
//! The handlers are deliberately thin — heavy lifting lives in the
//! operator layer + queue. The router's job is request shaping, preflight,
//! and mapping domain errors into the JSON envelope.

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::domain::filenames::build_filename;
use crate::domain::parser::{parse_script, ParserMode};
use crate::domain::{DeploymentId, EmotionTtsError, Result, RunId};
use crate::operators::mapping_resolve::{Input as MapInput, MappingResolveOperator};
use crate::operators::Operator;
use crate::queue::{RunClass, SharedQueue};
use crate::storage::Repos;
use crate::storage::repo_traits::RunRow;

#[derive(Clone)]
pub struct RunsState {
    pub repos: Repos,
    pub queue: SharedQueue,
    pub extension_version: String,
}

#[must_use]
pub fn router(state: RunsState) -> Router {
    Router::new()
        .route("/deployments/:deployment_id/runs", get(list_runs).post(create_run))
        .route("/deployments/:deployment_id/runs/:run_id", get(get_run))
        .route("/deployments/:deployment_id/runs/:run_id/cancel", post(cancel_run))
        .route("/deployments/:deployment_id/runs/test-line", post(test_line))
        .with_state(state)
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
    if body.script.trim().is_empty() {
        return Err(EmotionTtsError::validation("script cannot be empty"));
    }
    if !matches!(body.output_format.as_str(), "wav" | "mp3" | "flac") {
        return Err(EmotionTtsError::validation(format!(
            "unsupported output_format {:?}",
            body.output_format
        )));
    }
    if !(0.5..=2.0).contains(&body.speed_factor) {
        return Err(EmotionTtsError::validation("speed_factor must be 0.5..=2.0"));
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

    let parse = parse_script(&body.script, parser_mode);
    let mappings = state.repos.mappings.list_by_deployment(&dep).await?;
    let map_out = MappingResolveOperator
        .execute(MapInput {
            utterances: parse.utterances.clone(),
            mappings,
        })
        .await?;

    let predicted_filenames: Vec<String> = map_out
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
        return Err(EmotionTtsError::Conflict(format!(
            "unresolved characters: {:?}",
            map_out.unresolved_characters
        )));
    }

    let run_id = RunId::new();
    let now = Utc::now().timestamp();
    let row = RunRow {
        run_id: run_id.clone(),
        deployment_id: dep.clone(),
        kind: "batch".into(),
        status: "queued".into(),
        script_snapshot: body.script,
        parser_mode: body.parser_mode,
        generation_settings_json: body
            .generation
            .unwrap_or_else(|| json!({}))
            .to_string(),
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
    };
    state.repos.runs.insert(&row).await?;

    state
        .queue
        .enqueue(run_id.clone(), deployment_id, RunClass::Batch)
        .await;
    let position = state
        .queue
        .position_of(&run_id)
        .await
        .unwrap_or(-1);

    Ok(json!({
        "runId": run_id.as_str(),
        "queuePosition": position,
        "preflight": {
            "unresolvedCharacters": map_out.unresolved_characters,
            "predictedFilenames": predicted_filenames,
            "parserWarnings": parse.report.warnings.iter().map(warning_json).collect::<Vec<_>>(),
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
    Ok(run_detail_json(&row, &utterances))
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
    let _ = DeploymentId::try_from(deployment_id)?;
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
    Ok(json!({ "status": status }))
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
        generation_settings_json: body
            .generation
            .unwrap_or_else(|| json!({}))
            .to_string(),
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

fn run_detail_json(row: &RunRow, utterances: &[crate::storage::repo_traits::UtteranceRow]) -> Value {
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
    obj.insert("scriptSnapshot".into(), Value::String(row.script_snapshot.clone()));
    obj.insert("outputFormat".into(), Value::String(row.output_format.clone()));
    obj.insert("speedFactor".into(), json!(row.speed_factor));
    obj.insert("speedMode".into(), Value::String(row.speed_mode.clone()));
    obj.insert("cachePolicy".into(), Value::String(row.cache_policy.clone()));
    obj.insert("seedStrategy".into(), Value::String(row.seed_strategy.clone()));
    obj.insert("baseSeed".into(), json!(row.base_seed));
    obj.insert("utterances".into(), Value::Array(utt));
    base
}

