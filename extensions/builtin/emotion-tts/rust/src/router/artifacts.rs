//! Artifacts router — surfaces every completed-utterance audio blob produced
//! by a deployment's runs as a flat, paginated list. Powers the host's
//! per-deployment "Artifacts" tab (spec 038).
//!
//! An "artifact" here is one row of `ext_emotion_tts__utterances` with a
//! non-NULL `audio_artifact_ref` (the row's source audio) joined to its
//! parent run for deployment scoping + ordering. The optional
//! `derived_artifact_ref` (spec 036 audio-edit chain output) takes
//! precedence when present — that's what `Play` and `Download` actually
//! serve so the user hears the edited version.
//!
//! Routes
//! ------
//!   GET    /deployments/{id}/artifacts                  — list (newest first)
//!   GET    /deployments/{id}/artifacts/{utteranceId}/download
//!   DELETE /deployments/{id}/artifacts/{utteranceId}    — soft-delete (clears
//!                                                          audio_artifact_ref
//!                                                          + derived_artifact_ref)
//!   DELETE /deployments/{id}/artifacts                  — bulk soft-delete
//!   GET    /deployments/{id}/artifacts.zip              — bulk download zip
//!
//! Soft-delete semantic: we cannot reach into the host's blob store to
//! actually purge bytes (the `HostArtifactStore` trait exposes only `store`
//! + `resolve_path`). Clearing the refs detaches the row from the listing —
//! the host's blob GC can reclaim the bytes whenever it runs.
//!
//! Boundary notes
//! --------------
//!   * Lives entirely under `extensions/builtin/emotion-tts/` — host code
//!     never sees these handlers.
//!   * The host generic `/api/v1/extensions/{extensionId}/...` mount point
//!     surfaces every route here without the host knowing the extension's
//!     id.
//!   * Returns 503 `not_configured` when the host did not wire a
//!     `HostArtifactStore` — same shape as the exports + voice-assets stub.

use std::io::{Cursor, Write};
use std::path::Path as StdPath;
use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{delete, get};
use axum::Router;
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::Row;
use tokio::fs::File;
use tokio_util::io::ReaderStream;
use zip::write::SimpleFileOptions;
use zip::CompressionMethod;

use crate::domain::{DeploymentId, EmotionTtsError, Result, UtteranceId};
use crate::host_contract::HostArtifactStore;
use crate::storage::Repos;

#[derive(Clone)]
pub struct ArtifactsState {
    pub repos: Repos,
    pub artifact_store: Option<Arc<dyn HostArtifactStore>>,
}

#[must_use]
pub fn router(state: ArtifactsState) -> Router {
    Router::new()
        .route(
            "/deployments/{deployment_id}/artifacts",
            get(list_artifacts).delete(delete_all_artifacts),
        )
        .route(
            "/deployments/{deployment_id}/artifacts.zip",
            get(download_zip),
        )
        .route(
            "/deployments/{deployment_id}/artifacts/{utterance_id}/download",
            get(download_artifact),
        )
        .route(
            "/deployments/{deployment_id}/artifacts/{utterance_id}",
            delete(delete_artifact),
        )
        .with_state(state)
}

#[derive(Debug, Deserialize)]
pub struct ListQuery {
    #[serde(default = "default_limit")]
    pub limit: i64,
}

fn default_limit() -> i64 {
    200
}

/// Optional subset filter for bulk operations (`DELETE /artifacts` and
/// `GET /artifacts.zip`). When `utteranceIds` is absent the operation
/// targets the entire deployment — preserving the original "delete all"
/// / "download all" semantics. When present it is a comma-separated list
/// of utterance ids; only those rows are affected. Empty / whitespace
/// entries are skipped, and unknown ids are silently ignored (404 would
/// be misleading when the row was already detached).
#[derive(Debug, Default, Deserialize)]
pub struct BulkSelectionQuery {
    #[serde(rename = "utteranceIds", default)]
    pub utterance_ids: Option<String>,
}

impl BulkSelectionQuery {
    fn parsed_ids(&self) -> Vec<UtteranceId> {
        let Some(raw) = self.utterance_ids.as_deref() else {
            return Vec::new();
        };
        raw.split(',')
            .map(str::trim)
            .filter(|s| !s.is_empty())
            .filter_map(|s| UtteranceId::try_from(s).ok())
            .collect()
    }
}

#[derive(Debug, Clone)]
struct ArtifactRow {
    utterance_id: String,
    run_id: String,
    global_index: i64,
    character_display: String,
    text: String,
    output_format: String,
    duration_ms: Option<i64>,
    finished_at: Option<i64>,
    audio_artifact_ref: String,
    derived_artifact_ref: Option<String>,
}

impl ArtifactRow {
    fn effective_ref(&self) -> &str {
        self.derived_artifact_ref
            .as_deref()
            .unwrap_or(&self.audio_artifact_ref)
    }

    fn to_json(&self) -> Value {
        let filename = build_filename(self);
        json!({
            "utteranceId": self.utterance_id,
            "runId": self.run_id,
            "globalIndex": self.global_index,
            "characterDisplay": self.character_display,
            "text": self.text,
            "outputFormat": self.output_format,
            "durationMs": self.duration_ms,
            "finishedAt": self.finished_at,
            "filename": filename,
            "edited": self.derived_artifact_ref.is_some(),
        })
    }
}

fn build_filename(row: &ArtifactRow) -> String {
    let safe_char: String = row
        .character_display
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || *c == '_' || *c == '-')
        .collect();
    let safe_char = if safe_char.is_empty() {
        "Narrator".to_string()
    } else {
        safe_char
    };
    format!(
        "{:04}_{}_{}.{}",
        row.global_index, safe_char, &row.utterance_id, row.output_format
    )
}

async fn fetch_artifacts(
    state: &ArtifactsState,
    deployment_id: &str,
    limit: i64,
) -> Result<Vec<ArtifactRow>> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let rows = sqlx::query(
        "SELECT u.utterance_id, u.run_id, u.global_index, u.character_display, u.text, \
                u.duration_ms, u.finished_at, u.audio_artifact_ref, u.derived_artifact_ref, \
                r.output_format \
         FROM ext_emotion_tts__utterances u \
         INNER JOIN ext_emotion_tts__runs r ON r.run_id = u.run_id \
         WHERE r.deployment_id = ? \
           AND u.audio_artifact_ref IS NOT NULL \
           AND u.status = 'completed' \
         ORDER BY COALESCE(u.finished_at, 0) DESC, u.global_index ASC \
         LIMIT ?",
    )
    .bind(dep.as_str())
    .bind(limit)
    .fetch_all(&state.repos.pool)
    .await
    .map_err(EmotionTtsError::from)?;

    let mut out = Vec::with_capacity(rows.len());
    for row in &rows {
        let utterance_id: String = row.try_get("utterance_id").map_err(EmotionTtsError::from)?;
        let run_id: String = row.try_get("run_id").map_err(EmotionTtsError::from)?;
        let global_index: i64 = row.try_get("global_index").map_err(EmotionTtsError::from)?;
        let character_display: String = row
            .try_get("character_display")
            .map_err(EmotionTtsError::from)?;
        let text: String = row.try_get("text").map_err(EmotionTtsError::from)?;
        let duration_ms: Option<i64> = row.try_get("duration_ms").map_err(EmotionTtsError::from)?;
        let finished_at: Option<i64> = row.try_get("finished_at").map_err(EmotionTtsError::from)?;
        let audio_artifact_ref: String = row
            .try_get("audio_artifact_ref")
            .map_err(EmotionTtsError::from)?;
        let derived_artifact_ref: Option<String> = row
            .try_get("derived_artifact_ref")
            .map_err(EmotionTtsError::from)?;
        let output_format: String = row.try_get("output_format").map_err(EmotionTtsError::from)?;
        out.push(ArtifactRow {
            utterance_id,
            run_id,
            global_index,
            character_display,
            text,
            output_format,
            duration_ms,
            finished_at,
            audio_artifact_ref,
            derived_artifact_ref,
        });
    }
    Ok(out)
}

async fn list_artifacts(
    State(state): State<ArtifactsState>,
    Path(deployment_id): Path<String>,
    Query(query): Query<ListQuery>,
) -> Response {
    match fetch_artifacts(&state, &deployment_id, query.limit).await {
        Ok(rows) => {
            let items: Vec<Value> = rows.iter().map(ArtifactRow::to_json).collect();
            (
                StatusCode::OK,
                Json(json!({
                    "artifacts": items,
                    "total": items.len(),
                })),
            )
                .into_response()
        }
        Err(err) => err.into_response(),
    }
}

async fn fetch_one(
    state: &ArtifactsState,
    deployment_id: &str,
    utterance_id: &str,
) -> Result<ArtifactRow> {
    let dep = DeploymentId::try_from(deployment_id)?;
    let utt = UtteranceId::try_from(utterance_id)?;
    let row = sqlx::query(
        "SELECT u.utterance_id, u.run_id, u.global_index, u.character_display, u.text, \
                u.duration_ms, u.finished_at, u.audio_artifact_ref, u.derived_artifact_ref, \
                r.output_format \
         FROM ext_emotion_tts__utterances u \
         INNER JOIN ext_emotion_tts__runs r ON r.run_id = u.run_id \
         WHERE r.deployment_id = ? AND u.utterance_id = ?",
    )
    .bind(dep.as_str())
    .bind(utt.as_str())
    .fetch_optional(&state.repos.pool)
    .await
    .map_err(EmotionTtsError::from)?;

    let Some(row) = row else {
        // 404 (not 403) on cross-deployment access — same isolation contract
        // as the voice-asset routes.
        return Err(EmotionTtsError::not_found(format!(
            "artifact {utterance_id}"
        )));
    };

    let audio_ref: Option<String> = row
        .try_get("audio_artifact_ref")
        .map_err(EmotionTtsError::from)?;
    let Some(audio_ref) = audio_ref else {
        return Err(EmotionTtsError::not_found(format!(
            "artifact {utterance_id}"
        )));
    };

    let utterance_id: String = row.try_get("utterance_id").map_err(EmotionTtsError::from)?;
    let run_id: String = row.try_get("run_id").map_err(EmotionTtsError::from)?;
    let global_index: i64 = row.try_get("global_index").map_err(EmotionTtsError::from)?;
    let character_display: String = row
        .try_get("character_display")
        .map_err(EmotionTtsError::from)?;
    let text: String = row.try_get("text").map_err(EmotionTtsError::from)?;
    let duration_ms: Option<i64> = row.try_get("duration_ms").map_err(EmotionTtsError::from)?;
    let finished_at: Option<i64> = row.try_get("finished_at").map_err(EmotionTtsError::from)?;
    let derived_artifact_ref: Option<String> = row
        .try_get("derived_artifact_ref")
        .map_err(EmotionTtsError::from)?;
    let output_format: String = row.try_get("output_format").map_err(EmotionTtsError::from)?;

    Ok(ArtifactRow {
        utterance_id,
        run_id,
        global_index,
        character_display,
        text,
        output_format,
        duration_ms,
        finished_at,
        audio_artifact_ref: audio_ref,
        derived_artifact_ref,
    })
}

fn not_configured_response() -> Response {
    let body = json!({
        "status": "error",
        "category": "not_configured",
        "message": "artifact store not configured by host — \
                    ensure HostArtifactStore is wired into \
                    build_router_with_artifact_store at extension load time",
        "request_id": null,
    });
    (StatusCode::SERVICE_UNAVAILABLE, Json(body)).into_response()
}

fn content_type_for(format: &str) -> &'static str {
    match format {
        "wav" => "audio/wav",
        "mp3" => "audio/mpeg",
        "flac" => "audio/flac",
        _ => "application/octet-stream",
    }
}

async fn download_artifact(
    State(state): State<ArtifactsState>,
    Path((deployment_id, utterance_id)): Path<(String, String)>,
) -> Response {
    let Some(store) = state.artifact_store.as_ref().cloned() else {
        return not_configured_response();
    };

    let row = match fetch_one(&state, &deployment_id, &utterance_id).await {
        Ok(r) => r,
        Err(err) => return err.into_response(),
    };

    let abs_path = match store.resolve_path(row.effective_ref()).await {
        Ok(p) => p,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };

    let file = match File::open(&abs_path).await {
        Ok(f) => f,
        Err(err) => {
            return EmotionTtsError::internal(format!(
                "failed to open artifact at '{abs_path}': {err}"
            ))
            .into_response();
        }
    };
    let stream = ReaderStream::new(file);
    let body = Body::from_stream(stream);
    let filename = build_filename(&row);

    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, content_type_for(&row.output_format))
        .header(
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{filename}\""),
        )
        .body(body)
        .unwrap_or_else(|err| {
            EmotionTtsError::internal(format!("response builder: {err}")).into_response()
        })
}

async fn delete_artifact(
    State(state): State<ArtifactsState>,
    Path((deployment_id, utterance_id)): Path<(String, String)>,
) -> Response {
    // Resolve to confirm scope (404 on cross-deployment).
    if let Err(err) = fetch_one(&state, &deployment_id, &utterance_id).await {
        return err.into_response();
    }
    let utt = match UtteranceId::try_from(utterance_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };

    let result = sqlx::query(
        "UPDATE ext_emotion_tts__utterances \
         SET audio_artifact_ref = NULL, derived_artifact_ref = NULL, \
             updated_at = strftime('%s', 'now') \
         WHERE utterance_id = ?",
    )
    .bind(utt.as_str())
    .execute(&state.repos.pool)
    .await;

    match result {
        Ok(_) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => EmotionTtsError::from(err).into_response(),
    }
}

async fn delete_all_artifacts(
    State(state): State<ArtifactsState>,
    Path(deployment_id): Path<String>,
    Query(selection): Query<BulkSelectionQuery>,
) -> Response {
    let dep = match DeploymentId::try_from(deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };

    let selected_ids = selection.parsed_ids();
    let has_filter = selection.utterance_ids.is_some();

    // An explicit-but-empty selection would otherwise translate to "delete
    // everything"; treat it as a no-op so the UI bug "user clicked Delete
    // selected with nothing valid checked" never wipes the whole deployment.
    if has_filter && selected_ids.is_empty() {
        return (StatusCode::OK, Json(json!({ "deleted": 0 }))).into_response();
    }

    let mut sql = String::from(
        "UPDATE ext_emotion_tts__utterances \
         SET audio_artifact_ref = NULL, derived_artifact_ref = NULL, \
             updated_at = strftime('%s', 'now') \
         WHERE run_id IN (SELECT run_id FROM ext_emotion_tts__runs WHERE deployment_id = ?) \
           AND audio_artifact_ref IS NOT NULL",
    );
    if !selected_ids.is_empty() {
        sql.push_str(" AND utterance_id IN (");
        for i in 0..selected_ids.len() {
            if i > 0 {
                sql.push(',');
            }
            sql.push('?');
        }
        sql.push(')');
    }

    let mut q = sqlx::query(&sql).bind(dep.as_str());
    for id in &selected_ids {
        q = q.bind(id.as_str());
    }
    let result = q.execute(&state.repos.pool).await;

    match result {
        Ok(res) => (
            StatusCode::OK,
            Json(json!({ "deleted": res.rows_affected() })),
        )
            .into_response(),
        Err(err) => EmotionTtsError::from(err).into_response(),
    }
}

async fn download_zip(
    State(state): State<ArtifactsState>,
    Path(deployment_id): Path<String>,
    Query(selection): Query<BulkSelectionQuery>,
) -> Response {
    let Some(store) = state.artifact_store.as_ref().cloned() else {
        return not_configured_response();
    };

    let selected_ids = selection.parsed_ids();
    let has_filter = selection.utterance_ids.is_some();
    // Mirror `delete_all_artifacts` semantics: an explicit-but-empty
    // selection short-circuits rather than 404. Use 204 No Content (rather
    // than the JSON `{deleted: 0}` shape used by the DELETE endpoint),
    // because this is a binary-download endpoint — emitting JSON here
    // would surprise clients reading `Content-Disposition` / piping bytes.
    if has_filter && selected_ids.is_empty() {
        return StatusCode::NO_CONTENT.into_response();
    }

    let rows = match fetch_artifacts(&state, &deployment_id, 10_000).await {
        Ok(r) => r,
        Err(err) => return err.into_response(),
    };

    let rows: Vec<ArtifactRow> = if selected_ids.is_empty() {
        rows
    } else {
        let allow: std::collections::HashSet<&str> =
            selected_ids.iter().map(|id| id.as_str()).collect();
        rows.into_iter()
            .filter(|r| allow.contains(r.utterance_id.as_str()))
            .collect()
    };

    if rows.is_empty() {
        return EmotionTtsError::not_found(format!(
            "no artifacts for deployment {deployment_id}"
        ))
        .into_response();
    }

    // Build the zip in-memory. ZipWriter is sync; use spawn_blocking so the
    // axum runtime doesn't stall when the deployment has many artifacts.
    let mut blob_paths = Vec::with_capacity(rows.len());
    for row in &rows {
        let abs = match store.resolve_path(row.effective_ref()).await {
            Ok(p) => p,
            Err(err) => return EmotionTtsError::from(err).into_response(),
        };
        blob_paths.push((build_filename(row), abs));
    }

    let zip_bytes = match tokio::task::spawn_blocking(move || build_zip(&blob_paths)).await {
        Ok(Ok(bytes)) => bytes,
        Ok(Err(err)) => return err.into_response(),
        Err(err) => {
            return EmotionTtsError::internal(format!("zip task failed: {err}")).into_response();
        }
    };

    let download_filename = format!("emotion-tts-deployment-{deployment_id}-artifacts.zip");
    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/zip")
        .header(
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{download_filename}\""),
        )
        .body(Body::from(zip_bytes))
        .unwrap_or_else(|err| {
            EmotionTtsError::internal(format!("response builder: {err}")).into_response()
        })
}

fn build_zip(entries: &[(String, String)]) -> Result<Vec<u8>> {
    let mut buffer: Vec<u8> = Vec::with_capacity(1024 * 1024);
    {
        let mut writer = zip::ZipWriter::new(Cursor::new(&mut buffer));
        let options = SimpleFileOptions::default()
            .compression_method(CompressionMethod::Deflated)
            .large_file(false);
        for (name, abs_path) in entries {
            let bytes = std::fs::read(StdPath::new(abs_path))
                .map_err(|e| EmotionTtsError::internal(format!("read {abs_path}: {e}")))?;
            writer
                .start_file(name, options)
                .map_err(|e| EmotionTtsError::internal(format!("zip start_file: {e}")))?;
            writer
                .write_all(&bytes)
                .map_err(|e| EmotionTtsError::internal(format!("zip write: {e}")))?;
        }
        writer
            .finish()
            .map_err(|e| EmotionTtsError::internal(format!("zip finish: {e}")))?;
    }
    Ok(buffer)
}
