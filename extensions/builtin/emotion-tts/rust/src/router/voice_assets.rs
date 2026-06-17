use std::sync::Arc;

use axum::body::Body;
use axum::extract::{DefaultBodyLimit, Multipart, Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use tokio_util::io::ReaderStream;

use crate::backend_client::LeaseProvider;
use crate::domain::{DeploymentId, EmotionTtsError, Result, VoiceAssetId};
use crate::host_contract::HostArtifactStore;
use crate::storage::repo_traits::VoiceAssetRow;
use crate::storage::Repos;

pub const MIN_DURATION_MS: i64 = 100;
pub const MAX_DURATION_MS: i64 = 5 * 60 * 1000;
pub const LONG_DURATION_WARN_MS: i64 = 30 * 1000;
pub const VERY_LONG_DURATION_WARN_MS: i64 = 60 * 1000;
pub const UPLOAD_BODY_LIMIT_BYTES: usize = 64 * 1024 * 1024;

#[derive(Clone)]
pub struct VoiceAssetsState {
    pub repos: Repos,
    pub artifact_store: Arc<dyn HostArtifactStore>,
    /// Spec 034 US1 — needed by the `/preprocess` handler. `None` when the
    /// host boots without a lease factory (e.g. in CI contract tests that
    /// supply their own mock).
    pub lease_provider: Option<Arc<LeaseProvider>>,
}

#[must_use]
pub fn router(
    repos: Repos,
    artifact_store: Arc<dyn HostArtifactStore>,
    lease_provider: Option<Arc<LeaseProvider>>,
) -> Router {
    let state = Arc::new(VoiceAssetsState {
        repos,
        artifact_store,
        lease_provider,
    });
    Router::new()
        .route(
            "/",
            post(upload)
                .get(list)
                .layer(DefaultBodyLimit::max(UPLOAD_BODY_LIMIT_BYTES)),
        )
        .route(
            "/{voice_asset_id}",
            get(fetch).delete(deactivate).patch(rename),
        )
        .route("/{voice_asset_id}/audio", get(stream_audio))
        .route("/{voice_asset_id}/preprocess", post(preprocess))
        .route("/probe", post(probe))
        .merge(crate::router::audio_edit::routes())
        .with_state(state)
}

async fn preprocess(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
) -> Response {
    match preprocess_impl(&state, &id, &query.deployment_id).await {
        Ok((status, body)) => (status, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn preprocess_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
) -> Result<(StatusCode, Value)> {
    let asset_id = VoiceAssetId::try_from(raw_id)?;

    // Cross-deployment isolation: the voice asset must belong to the
    // caller's claimed deployment. Returns 404 on mismatch — same shape
    let row = state
        .repos
        .voice_assets
        .get(&asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("voice asset {asset_id}")))?;
    guard::assert_deployment_match(row.deployment_id.as_str(), claimed_deployment_id, || {
        format!("voice asset {asset_id}")
    })?;

    if let Some(existing_json) = &row.preprocessing_report_json {
        if let Ok(existing) = serde_json::from_str::<
            crate::backend_client::params::PreprocessingReport,
        >(existing_json)
        {
            if existing.pipeline_version
                == crate::backend_client::params::PreprocessingReport::default_pipeline_version()
            {
                return Ok((
                    StatusCode::OK,
                    json!({
                        "status": "unchanged",
                        "report": existing,
                    }),
                ));
            }
        }
    }

    let provider = state.lease_provider.clone().ok_or_else(|| {
        EmotionTtsError::RuntimeUnavailable("lease provider not configured".into())
    })?;

    let client = provider.spawn_if_needed().await?;
    let source_abs = state
        .artifact_store
        .resolve_path(&row.audio_artifact_ref)
        .await?;

    let tmp_dir = std::env::temp_dir();
    let out_path = tmp_dir.join(format!("emotion_tts_preprocessed_{}.wav", asset_id));
    let out_abs = out_path
        .to_str()
        .ok_or_else(|| EmotionTtsError::internal("non-utf8 temp path".to_string()))?
        .to_string();

    let request_id = format!(
        "preprocess-{asset_id}-{}",
        Utc::now().timestamp_nanos_opt().unwrap_or(0)
    );
    let result = client
        .voice_preprocess(&request_id, &source_abs, &out_abs)
        .await?;

    let bytes = tokio::fs::read(&out_path)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("read preprocessed output: {e}")))?;
    let _ = tokio::fs::remove_file(&out_path).await;

    let display = format!("{}__preprocessed.wav", row.display_name);
    let put = state
        .artifact_store
        .store(bytes, &display, Some("audio/wav"))
        .await?;

    let report_json = serde_json::to_string(&result.report)
        .map_err(|e| EmotionTtsError::internal(format!("serialise report: {e}")))?;
    state
        .repos
        .voice_assets
        .set_preprocessed(&asset_id, Some(&put.artifact_ref), Some(&report_json))
        .await?;

    Ok((
        StatusCode::ACCEPTED,
        json!({
            "status": "reprocessed",
            "report": result.report,
        }),
    ))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ListQuery {
    deployment_id: String,
}

use crate::router::guard::{self, ScopedQuery};

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
    Query(query): Query<ScopedQuery>,
) -> Response {
    let id = match VoiceAssetId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.voice_assets.get(&id).await {
        Ok(Some(row)) => {
            // Cross-deployment isolation. 404-not-403 contract; see `guard`.
            if let Err(err) = guard::assert_deployment_match(
                row.deployment_id.as_str(),
                &query.deployment_id,
                || format!("voice asset {id}"),
            ) {
                return err.into_response();
            }
            (StatusCode::OK, Json(voice_asset_json(&row))).into_response()
        }
        Ok(None) => EmotionTtsError::not_found(format!("voice asset {id}")).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn stream_audio(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
) -> Response {
    match stream_audio_impl(&state, &id, &query.deployment_id).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

async fn stream_audio_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
) -> Result<Response> {
    let asset_id = VoiceAssetId::try_from(raw_id)?;
    let row = state
        .repos
        .voice_assets
        .get(&asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("voice asset {asset_id}")))?;
    guard::assert_deployment_match(row.deployment_id.as_str(), claimed_deployment_id, || {
        format!("voice asset {asset_id}")
    })?;
    let abs_path = state
        .artifact_store
        .resolve_path(&row.audio_artifact_ref)
        .await?;
    let file = tokio::fs::File::open(&abs_path)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("open voice audio '{abs_path}': {e}")))?;
    let stream = ReaderStream::new(file);
    let body = Body::from_stream(stream);
    let content_type = content_type_for_audio(&row.audio_artifact_ref);
    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, content_type)
        .header(header::CACHE_CONTROL, "private, max-age=300")
        .header(header::ACCEPT_RANGES, "bytes")
        .body(body)
        .map_err(|e| EmotionTtsError::internal(format!("response builder: {e}")))
}

fn content_type_for_audio(reference: &str) -> &'static str {
    let lower = reference.to_lowercase();
    if lower.ends_with(".wav") {
        "audio/wav"
    } else if lower.ends_with(".mp3") {
        "audio/mpeg"
    } else if lower.ends_with(".flac") {
        "audio/flac"
    } else if lower.ends_with(".ogg") || lower.ends_with(".opus") {
        "audio/ogg"
    } else if lower.ends_with(".m4a") || lower.ends_with(".mp4") {
        "audio/mp4"
    } else if lower.ends_with(".webm") {
        "audio/webm"
    } else {
        "application/octet-stream"
    }
}

async fn deactivate(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
) -> Response {
    let id = match VoiceAssetId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    // Read-then-validate-then-mutate. Same 404-on-mismatch contract as `fetch`.
    match state.repos.voice_assets.get(&id).await {
        Ok(Some(row)) => {
            if let Err(err) = guard::assert_deployment_match(
                row.deployment_id.as_str(),
                &query.deployment_id,
                || format!("voice asset {id}"),
            ) {
                return err.into_response();
            }
        }
        Ok(None) => {
            return EmotionTtsError::not_found(format!("voice asset {id}")).into_response();
        }
        Err(err) => return err.into_response(),
    }
    match state.repos.voice_assets.deactivate(&id).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct RenameBody {
    display_name: String,
}

pub const MAX_DISPLAY_NAME_LEN: usize = 200;

async fn rename(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
    Json(body): Json<RenameBody>,
) -> Response {
    match rename_impl(&state, &id, &query.deployment_id, body).await {
        Ok(value) => (StatusCode::OK, Json(value)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn rename_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
    body: RenameBody,
) -> Result<Value> {
    let trimmed = body.display_name.trim();
    if trimmed.is_empty() {
        return Err(EmotionTtsError::validation("displayName must not be empty"));
    }
    if trimmed.chars().count() > MAX_DISPLAY_NAME_LEN {
        return Err(EmotionTtsError::validation(format!(
            "displayName must be ≤ {MAX_DISPLAY_NAME_LEN} chars"
        )));
    }
    let asset_id = VoiceAssetId::try_from(raw_id)?;
    let row = state
        .repos
        .voice_assets
        .get(&asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("voice asset {asset_id}")))?;
    guard::assert_deployment_match(row.deployment_id.as_str(), claimed_deployment_id, || {
        format!("voice asset {asset_id}")
    })?;
    state
        .repos
        .voice_assets
        .update_display_name(&asset_id, trimmed)
        .await?;
    let updated = state
        .repos
        .voice_assets
        .get(&asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::internal("voice asset vanished after rename"))?;
    Ok(voice_asset_json(&updated))
}

async fn upload(State(state): State<Arc<VoiceAssetsState>>, multipart: Multipart) -> Response {
    match upload_impl(&state, multipart).await {
        Ok(row) => {
            // Spec 034 FR-200: preprocessing defaults to ON for new uploads.
            // Fire-and-forget — the upload response returns immediately and the
            spawn_background_preprocess(
                state.clone(),
                row.voice_asset_id.clone(),
                row.deployment_id.as_str().to_string(),
            );
            (StatusCode::CREATED, Json(voice_asset_json(&row))).into_response()
        }
        Err(err) => err.into_response(),
    }
}

fn spawn_background_preprocess(
    state: Arc<VoiceAssetsState>,
    asset_id: VoiceAssetId,
    deployment_id: String,
) {
    if state.lease_provider.is_none() {
        // No runtime configured — leave preprocessed_artifact_ref NULL. The
        // user can manually POST /preprocess later once a runtime is attached.
        return;
    }
    tokio::spawn(async move {
        match preprocess_impl(&state, asset_id.as_str(), &deployment_id).await {
            Ok(_) => {}
            Err(err) => {
                tracing::warn!(
                    voice_asset = %asset_id,
                    error = %err,
                    "background voice-asset preprocessing failed (upload succeeded anyway)",
                );
            }
        }
    });
}

async fn upload_impl(state: &VoiceAssetsState, mut multipart: Multipart) -> Result<VoiceAssetRow> {
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

    let deployment_id =
        deployment_id.ok_or_else(|| EmotionTtsError::validation("missing field: deploymentId"))?;
    let display_name =
        display_name.ok_or_else(|| EmotionTtsError::validation("missing field: displayName"))?;
    let kind = kind.unwrap_or_else(|| "speaker".into());
    if !matches!(kind.as_str(), "speaker" | "emotion" | "mixed") {
        return Err(EmotionTtsError::validation(format!(
            "kind must be speaker|emotion|mixed, got {kind:?}"
        )));
    }

    let dep = DeploymentId::try_from(deployment_id.as_str())?;
    let bytes = audio_bytes.ok_or_else(|| EmotionTtsError::validation("missing field: audio"))?;
    if bytes.is_empty() {
        return Err(EmotionTtsError::validation("audio payload is empty"));
    }

    let content_sha256 = hex::encode(Sha256::digest(&bytes));

    let put = state
        .artifact_store
        .store(bytes, &display_name, audio_mime.as_deref())
        .await?;

    let probe = match state.artifact_store.resolve_path(&put.artifact_ref).await {
        Ok(path) => ffprobe_run(&path).await.ok(),
        Err(_) => None,
    };

    let now = Utc::now().timestamp();

    // Auto-trim: IndexTTS works best with 10-30s clips; longer references drift
    // off-distribution and produce muddier output. Rather than shipping a
    const AUTO_TRIM_MS: i64 = 30_000;
    let duration_ms = probe.as_ref().map(|p| p.duration_ms);
    let edit_chain_json = match duration_ms {
        Some(d) if d > AUTO_TRIM_MS => Some(format!(
            r#"{{"version":1,"ops":[{{"id":"{op_id}","mode":"trim","start_ms":0,"end_ms":{end}}}]}}"#,
            op_id = crate::domain::audio_edit::OperationId::new().as_str(),
            end = AUTO_TRIM_MS,
        )),
        _ => None,
    };

    let row = VoiceAssetRow {
        voice_asset_id: VoiceAssetId::new(),
        deployment_id: dep,
        display_name,
        kind,
        audio_artifact_ref: put.artifact_ref,
        content_sha256,
        reference_text,
        sample_rate: probe.as_ref().and_then(|p| p.sample_rate),
        duration_ms,
        source_type: "upload".into(),
        notes: None,
        is_active: true,
        preprocessed_artifact_ref: None,
        preprocessing_report_json: None,
        edit_chain_json,
        derived_artifact_ref: None,
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
    artifact_ref: String,
}

async fn probe_impl(state: &VoiceAssetsState, body: ProbeBody) -> Result<Value> {
    if body.artifact_ref.trim().is_empty() {
        return Err(EmotionTtsError::validation("artifactRef is required"));
    }
    let path = state
        .artifact_store
        .resolve_path(&body.artifact_ref)
        .await?;
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
        .and_then(|arr| {
            arr.iter()
                .find(|s| s.get("codec_type").and_then(Value::as_str) == Some("audio"))
        });
    let sample_rate = first_audio
        .and_then(|s| s.get("sample_rate"))
        .and_then(Value::as_str)
        .and_then(|v| v.parse::<i64>().ok());
    let channels = first_audio
        .and_then(|s| s.get("channels"))
        .and_then(Value::as_i64);
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
    let report: Option<Value> = row
        .preprocessing_report_json
        .as_deref()
        .and_then(|raw| serde_json::from_str(raw).ok());
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
        "preprocessedArtifactRef": row.preprocessed_artifact_ref,
        "preprocessingReport": report,
        "derivedArtifactRef": row.derived_artifact_ref,
        "createdAt": row.created_at,
        "updatedAt": row.updated_at,
    })
}
