use std::sync::Arc;

use axum::extract::{Multipart, Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};
use sha2::{Digest, Sha256};

use crate::domain::{DeploymentId, EmotionTtsError, Result, VoiceAssetId};
use crate::host_contract::HostArtifactStore;
use crate::storage::repo_traits::VoiceAssetRow;
use crate::storage::Repos;

pub const MIN_DURATION_MS: i64 = 100;
pub const MAX_DURATION_MS: i64 = 5 * 60 * 1000;
pub const LONG_DURATION_WARN_MS: i64 = 30 * 1000;
pub const VERY_LONG_DURATION_WARN_MS: i64 = 60 * 1000;

#[derive(Clone)]
pub struct VoiceAssetsState {
    pub repos: Repos,
    pub artifact_store: Arc<dyn HostArtifactStore>,
}

#[must_use]
pub fn router(repos: Repos, artifact_store: Arc<dyn HostArtifactStore>) -> Router {
    Router::new()
        .route("/", post(upload).get(list))
        .route("/:voice_asset_id", get(fetch).delete(deactivate))
        .route("/probe", post(probe))
        .with_state(Arc::new(VoiceAssetsState {
            repos,
            artifact_store,
        }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ListQuery {
    deployment_id: String,
}

async fn list(
    State(state): State<Arc<VoiceAssetsState>>,
    Query(query): Query<ListQuery>,
) -> Response {
    let dep = match DeploymentId::try_from(query.deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.voice_assets.list_by_deployment(&dep).await {
        Ok(rows) => {
            let items: Vec<Value> = rows.iter().map(voice_asset_json).collect();
            (StatusCode::OK, Json(json!({ "voiceAssets": items }))).into_response()
        }
        Err(err) => err.into_response(),
    }
}

async fn fetch(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
) -> Response {
    let id = match VoiceAssetId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.voice_assets.get(&id).await {
        Ok(Some(row)) => (StatusCode::OK, Json(voice_asset_json(&row))).into_response(),
        Ok(None) => EmotionTtsError::not_found(format!("voice asset {id}")).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn deactivate(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
) -> Response {
    let id = match VoiceAssetId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.voice_assets.deactivate(&id).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

async fn upload(State(state): State<Arc<VoiceAssetsState>>, multipart: Multipart) -> Response {
    match upload_impl(&state, multipart).await {
        Ok(row) => (StatusCode::CREATED, Json(voice_asset_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn upload_impl(
    state: &VoiceAssetsState,
    mut multipart: Multipart,
) -> Result<VoiceAssetRow> {
    let mut deployment_id: Option<String> = None;
    let mut display_name: Option<String> = None;
    let mut kind: Option<String> = None;
    let mut reference_text: Option<String> = None;
    let mut audio_bytes: Option<Vec<u8>> = None;
    let mut audio_mime: Option<String> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| EmotionTtsError::validation(format!("multipart: {e}")))?
    {
        let name = field.name().map(String::from).unwrap_or_default();
        match name.as_str() {
            "deploymentId" => deployment_id = Some(field.text().await.map_err(multipart_err)?),
            "displayName" => display_name = Some(field.text().await.map_err(multipart_err)?),
            "kind" => kind = Some(field.text().await.map_err(multipart_err)?),
            "referenceText" => {
                reference_text = Some(field.text().await.map_err(multipart_err)?);
            }
            "audio" => {
                audio_mime = field.content_type().map(String::from);
                let bytes = field.bytes().await.map_err(multipart_err)?;
                audio_bytes = Some(bytes.to_vec());
            }
            _ => {
                let _ = field.bytes().await;
            }
        }
    }

    let deployment_id = deployment_id
        .ok_or_else(|| EmotionTtsError::validation("missing field: deploymentId"))?;
    let display_name = display_name
        .ok_or_else(|| EmotionTtsError::validation("missing field: displayName"))?;
    let kind = kind.unwrap_or_else(|| "speaker".into());
    if !matches!(kind.as_str(), "speaker" | "emotion" | "mixed") {
        return Err(EmotionTtsError::validation(format!(
            "kind must be speaker|emotion|mixed, got {kind:?}"
        )));
    }

    let dep = DeploymentId::try_from(deployment_id.as_str())?;
    let bytes = audio_bytes
        .ok_or_else(|| EmotionTtsError::validation("missing field: audio"))?;
    if bytes.is_empty() {
        return Err(EmotionTtsError::validation("audio payload is empty"));
    }

    let content_sha256 = hex::encode(Sha256::digest(&bytes));

    let put = state
        .artifact_store
        .store(bytes, &display_name, audio_mime.as_deref())
        .await?;

    let now = Utc::now().timestamp();
    let row = VoiceAssetRow {
        voice_asset_id: VoiceAssetId::new(),
        deployment_id: dep,
        display_name,
        kind,
        audio_artifact_ref: put.artifact_ref,
        content_sha256,
        reference_text,
        sample_rate: None,
        duration_ms: None,
        source_type: "upload".into(),
        notes: None,
        is_active: true,
        created_at: now,
        updated_at: now,
    };
    state.repos.voice_assets.insert(&row).await?;
    Ok(row)
}

async fn probe(
    State(state): State<Arc<VoiceAssetsState>>,
    Json(body): Json<ProbeBody>,
) -> Response {
    match probe_impl(&state, body).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ProbeBody {
    artifact_ref: Option<String>,
    absolute_path: Option<String>,
}

async fn probe_impl(state: &VoiceAssetsState, body: ProbeBody) -> Result<Value> {
    let path = if let Some(abs) = body.absolute_path {
        abs
    } else if let Some(reference) = body.artifact_ref {
        state.artifact_store.resolve_path(&reference).await?
    } else {
        return Err(EmotionTtsError::validation(
            "either absolutePath or artifactRef is required",
        ));
    };

    let probe = ffprobe_run(&path).await?;
    Ok(json!({
        "durationMs": probe.duration_ms,
        "sampleRate": probe.sample_rate,
        "channels": probe.channels,
        "warnings": warning_flags(probe.duration_ms),
    }))
}

struct ProbeResult {
    duration_ms: i64,
    sample_rate: Option<i64>,
    channels: Option<i64>,
}

async fn ffprobe_run(path: &str) -> Result<ProbeResult> {
    let bin = std::env::var("EMOTIONTTS_FFPROBE_BIN").unwrap_or_else(|_| "ffprobe".into());
    let output = tokio::process::Command::new(&bin)
        .args([
            "-v",
            "error",
            "-print_format",
            "json",
            "-show_format",
            "-show_streams",
            path,
        ])
        .output()
        .await
        .map_err(|e| EmotionTtsError::internal(format!("ffprobe spawn: {e}")))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr).to_string();
        return Err(EmotionTtsError::validation(format!(
            "ffprobe failed ({:?}): {}",
            output.status.code(),
            stderr
        )));
    }
    let parsed: Value = serde_json::from_slice(&output.stdout)
        .map_err(|e| EmotionTtsError::internal(format!("ffprobe json: {e}")))?;
    let duration_s = parsed
        .get("format")
        .and_then(|f| f.get("duration"))
        .and_then(Value::as_str)
        .and_then(|s| s.parse::<f64>().ok())
        .unwrap_or(0.0);
    let first_audio = parsed
        .get("streams")
        .and_then(Value::as_array)
        .and_then(|arr| arr.iter().find(|s| s.get("codec_type").and_then(Value::as_str) == Some("audio")));
    let sample_rate = first_audio
        .and_then(|s| s.get("sample_rate"))
        .and_then(Value::as_str)
        .and_then(|v| v.parse::<i64>().ok());
    let channels = first_audio.and_then(|s| s.get("channels")).and_then(Value::as_i64);
    Ok(ProbeResult {
        duration_ms: (duration_s * 1000.0).round() as i64,
        sample_rate,
        channels,
    })
}

fn multipart_err(e: axum::extract::multipart::MultipartError) -> EmotionTtsError {
    EmotionTtsError::validation(format!("multipart: {e}"))
}

fn warning_flags(duration_ms: i64) -> Value {
    let mut flags: Vec<&str> = Vec::new();
    if duration_ms < MIN_DURATION_MS {
        flags.push("too_short");
    }
    if duration_ms > MAX_DURATION_MS {
        flags.push("too_long");
    }
    if duration_ms > VERY_LONG_DURATION_WARN_MS {
        flags.push("very_long");
    } else if duration_ms > LONG_DURATION_WARN_MS {
        flags.push("long");
    }
    json!(flags)
}

fn voice_asset_json(row: &VoiceAssetRow) -> Value {
    json!({
        "voiceAssetId": row.voice_asset_id.as_str(),
        "deploymentId": row.deployment_id.as_str(),
        "displayName": row.display_name,
        "kind": row.kind,
        "audioArtifactRef": row.audio_artifact_ref,
        "contentSha256": row.content_sha256,
        "referenceText": row.reference_text,
        "sampleRate": row.sample_rate,
        "durationMs": row.duration_ms,
        "sourceType": row.source_type,
        "isActive": row.is_active,
        "createdAt": row.created_at,
        "updatedAt": row.updated_at,
    })
}
