//! Spec 036 / US1 — voice-asset audio-edit routes.
//!
//! Mounted under `/voice-assets` by [`super::voice_assets::router`] so the
//! external surface is:
//!
//! * `POST   /voice-assets/{id}/edit?deploymentId=…`         — apply chain
//! * `DELETE /voice-assets/{id}/edit?deploymentId=…`         — clear chain
//! * `POST   /voice-assets/{id}/edit/preview?deploymentId=…` — stream preview
//!
//! Cross-deployment access on any of the three returns 404 (not 403) per
//! the [`super::guard`] contract — FR-016 / SC-008.

use std::path::PathBuf;
use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::post;
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};
use tokio_util::io::ReaderStream;

use crate::domain::{ChainDigest, EditChain, EmotionTtsError, Result, VoiceAssetId};
use crate::router::guard::{self, ScopedQuery};
use crate::router::voice_assets::VoiceAssetsState;
use crate::storage::audit_log_repo::{AuditEntry, TargetKind, SYSTEM_ACTOR};

const PREVIEW_DEFAULT_FORMAT: &str = "wav";
const PREVIEW_CONTENT_TYPE_WAV: &str = "audio/wav";
const PREVIEW_CONTENT_TYPE_MP3: &str = "audio/mpeg";

/// Sub-router mounted by [`crate::router::voice_assets::router`]. Exposes
/// the three audio-edit routes; the parent router supplies the shared
/// [`VoiceAssetsState`].
pub fn routes() -> Router<Arc<VoiceAssetsState>> {
    Router::new()
        .route("/{voice_asset_id}/edit", post(apply).delete(clear))
        .route("/{voice_asset_id}/edit/preview", post(preview))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
struct ApplyEditRequest {
    chain: EditChain,
    #[serde(default)]
    digest_before: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
struct PreviewRequest {
    chain: EditChain,
}

async fn apply(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
    Json(body): Json<ApplyEditRequest>,
) -> Response {
    match apply_impl(&state, &id, &query.deployment_id, body).await {
        Ok(ApplyOutcome::Ok(value)) => (StatusCode::OK, Json(value)).into_response(),
        Ok(ApplyOutcome::StaleDigest { current }) => stale_digest_response(&current),
        Err(err) => err.into_response(),
    }
}

/// Two-shape outcome of [`apply_impl`]. Stale-digest is modelled out-of-band of
/// the standard error envelope so the route can emit the OpenAPI
/// `StaleDigestError` body shape `{ error: { code, message, current_digest } }`
/// — UI clients need `current_digest` to reload and rebase their chain edits.
enum ApplyOutcome {
    Ok(Value),
    StaleDigest { current: ChainDigest },
}

fn stale_digest_response(current: &ChainDigest) -> Response {
    let body = json!({
        "error": {
            "code": "stale_digest",
            "message": "the persisted edit chain digest does not match the caller's expected value; reload and rebase",
            "current_digest": current.as_str(),
        }
    });
    (StatusCode::CONFLICT, Json(body)).into_response()
}

async fn clear(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
) -> Response {
    match clear_impl(&state, &id, &query.deployment_id).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

async fn preview(
    State(state): State<Arc<VoiceAssetsState>>,
    Path(id): Path<String>,
    Query(query): Query<ScopedQuery>,
    Json(body): Json<PreviewRequest>,
) -> Response {
    match preview_impl(&state, &id, &query.deployment_id, body.chain).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

async fn apply_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
    req: ApplyEditRequest,
) -> Result<ApplyOutcome> {
    let asset_id = VoiceAssetId::try_from(raw_id)?;
    let row = guarded_voice_asset(state, &asset_id, claimed_deployment_id).await?;
    req.chain.validate()?;

    let current = state.repos.voice_assets.read_edit_chain(&asset_id).await?;
    let current_digest = current.as_ref().map_or(ChainDigest::EMPTY, ChainDigest::of);
    if let Some(expected) = req.digest_before.as_deref() {
        if current_digest.as_str() != expected {
            return Ok(ApplyOutcome::StaleDigest {
                current: current_digest,
            });
        }
    }

    let new_digest = ChainDigest::of(&req.chain);
    if current_digest == new_digest {
        return Ok(ApplyOutcome::Ok(noop_apply_response(&row, &new_digest)));
    }

    let report = run_audio_edit_rpc(state, &asset_id, &row, &req.chain, &new_digest).await?;
    persist_apply(state, &asset_id, &req.chain, &report.derived_artifact_ref).await?;

    let operation_count = req.chain.operation_count();
    append_audit_entry(
        state,
        &row.deployment_id,
        asset_id.as_str(),
        &current_digest,
        &new_digest,
        operation_count,
    )
    .await?;
    emit_edited_event(asset_id.as_str(), operation_count, &report.derived_artifact_ref);

    Ok(ApplyOutcome::Ok(apply_response_json(&new_digest, &report)))
}

struct EditOutcome {
    derived_artifact_ref: String,
    source_duration_ms: u32,
    derived_duration_ms: u32,
    measured_lufs: Option<f32>,
    per_op_durations_ms: Vec<crate::backend_client::params::OpDuration>,
    warnings: Vec<String>,
}

async fn run_audio_edit_rpc(
    state: &VoiceAssetsState,
    asset_id: &VoiceAssetId,
    row: &crate::storage::repo_traits::VoiceAssetRow,
    chain: &EditChain,
    new_digest: &ChainDigest,
) -> Result<EditOutcome> {
    let provider = state.lease_provider.clone().ok_or_else(|| {
        EmotionTtsError::RuntimeUnavailable("lease provider not configured".into())
    })?;
    let client = provider.spawn_if_needed().await?;

    let source_abs = state.artifact_store.resolve_path(source_ref_for(row)).await?;
    let derived_path = derived_temp_path(asset_id, new_digest);
    let derived_abs = path_to_string(&derived_path)?;
    let request_id = make_request_id("edit", asset_id.as_str());

    let chain_value = serde_json::to_value(chain)?;
    let report = client
        .audio_edit(&request_id, &source_abs, &derived_abs, chain_value)
        .await?;
    let put = read_and_store_derived(state, &derived_path, &row.display_name).await?;
    Ok(EditOutcome {
        derived_artifact_ref: put.artifact_ref,
        source_duration_ms: report.source_duration_ms,
        derived_duration_ms: report.derived_duration_ms,
        measured_lufs: report.measured_lufs,
        per_op_durations_ms: report.per_op_durations_ms,
        warnings: report.warnings,
    })
}

async fn persist_apply(
    state: &VoiceAssetsState,
    asset_id: &VoiceAssetId,
    chain: &EditChain,
    derived_artifact_ref: &str,
) -> Result<()> {
    state
        .repos
        .voice_assets
        .write_edit_chain(asset_id, Some(chain))
        .await?;
    state
        .repos
        .voice_assets
        .set_derived_artifact_ref(asset_id, Some(derived_artifact_ref))
        .await?;
    Ok(())
}

fn apply_response_json(new_digest: &ChainDigest, outcome: &EditOutcome) -> Value {
    json!({
        "chain_digest": new_digest.as_str(),
        "derived_artifact_ref": outcome.derived_artifact_ref,
        "source_duration_ms": outcome.source_duration_ms,
        "derived_duration_ms": outcome.derived_duration_ms,
        "measured_lufs": outcome.measured_lufs,
        "per_op_durations_ms": outcome.per_op_durations_ms,
        "warnings": outcome.warnings,
    })
}

async fn clear_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
) -> Result<()> {
    let asset_id = VoiceAssetId::try_from(raw_id)?;
    let row = guarded_voice_asset(state, &asset_id, claimed_deployment_id).await?;
    let Some(chain) = state.repos.voice_assets.read_edit_chain(&asset_id).await? else {
        return Ok(());
    };
    let digest_before = ChainDigest::of(&chain);
    persist_clear(state, &asset_id).await?;
    append_audit_entry(
        state,
        &row.deployment_id,
        asset_id.as_str(),
        &digest_before,
        &ChainDigest::EMPTY,
        0,
    )
    .await?;
    emit_edited_event(asset_id.as_str(), 0, &row.audio_artifact_ref);
    Ok(())
}

async fn persist_clear(state: &VoiceAssetsState, asset_id: &VoiceAssetId) -> Result<()> {
    state
        .repos
        .voice_assets
        .write_edit_chain(asset_id, None)
        .await?;
    state
        .repos
        .voice_assets
        .set_derived_artifact_ref(asset_id, None)
        .await?;
    Ok(())
}

async fn preview_impl(
    state: &VoiceAssetsState,
    raw_id: &str,
    claimed_deployment_id: &str,
    chain: EditChain,
) -> Result<Response> {
    let asset_id = VoiceAssetId::try_from(raw_id)?;
    let row = guarded_voice_asset(state, &asset_id, claimed_deployment_id).await?;
    chain.validate()?;

    let provider = state.lease_provider.clone().ok_or_else(|| {
        EmotionTtsError::RuntimeUnavailable("lease provider not configured".into())
    })?;
    let client = provider.spawn_if_needed().await?;

    let source_abs = state.artifact_store.resolve_path(source_ref_for(&row)).await?;
    let request_id = make_request_id("edit-preview", asset_id.as_str());
    let chain_value = serde_json::to_value(&chain)?;

    let result = client
        .audio_edit_preview(&request_id, &source_abs, chain_value, None)
        .await?;

    stream_preview(&result.temp_path_abs, &result.format).await
}

async fn guarded_voice_asset(
    state: &VoiceAssetsState,
    asset_id: &VoiceAssetId,
    claimed_deployment_id: &str,
) -> Result<crate::storage::repo_traits::VoiceAssetRow> {
    let row = state
        .repos
        .voice_assets
        .get(asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("voice asset {asset_id}")))?;
    guard::assert_deployment_match(
        row.deployment_id.as_str(),
        claimed_deployment_id,
        || format!("voice asset {asset_id}"),
    )?;
    Ok(row)
}

fn source_ref_for(row: &crate::storage::repo_traits::VoiceAssetRow) -> &str {
    row.derived_artifact_ref
        .as_deref()
        .unwrap_or(&row.audio_artifact_ref)
}

fn derived_temp_path(asset_id: &VoiceAssetId, digest: &ChainDigest) -> PathBuf {
    std::env::temp_dir().join(format!(
        "emotion_tts_audio_edit_{asset_id}_{digest}.wav",
        asset_id = asset_id.as_str(),
        digest = digest.as_str()
    ))
}

fn path_to_string(path: &std::path::Path) -> Result<String> {
    path.to_str()
        .map(str::to_owned)
        .ok_or_else(|| EmotionTtsError::internal("non-utf8 derived path".to_string()))
}

fn make_request_id(prefix: &str, asset_id: &str) -> String {
    format!(
        "{prefix}-{asset_id}-{}",
        ulid::Ulid::new()
    )
}

async fn read_and_store_derived(
    state: &VoiceAssetsState,
    derived_path: &std::path::Path,
    display_name: &str,
) -> Result<crate::host_contract::ArtifactPut> {
    let bytes = tokio::fs::read(derived_path)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("read derived audio: {e}")))?;
    let _ = tokio::fs::remove_file(derived_path).await;
    let display = format!("{display_name}__edited.wav");
    let put = state
        .artifact_store
        .store(bytes, &display, Some("audio/wav"))
        .await?;
    Ok(put)
}

async fn append_audit_entry(
    state: &VoiceAssetsState,
    deployment_id: &crate::domain::DeploymentId,
    target_id: &str,
    digest_before: &ChainDigest,
    digest_after: &ChainDigest,
    operation_count: u16,
) -> Result<()> {
    let entry = AuditEntry {
        entry_id: ulid::Ulid::new().to_string(),
        deployment_id: deployment_id.clone(),
        target_id: target_id.to_owned(),
        target_kind: TargetKind::VoiceAsset,
        digest_before: digest_before.clone(),
        digest_after: digest_after.clone(),
        operation_count,
        recorded_at: Utc::now(),
        actor: SYSTEM_ACTOR.to_string(),
    };
    state.repos.audio_edit_log.append(&entry).await
}

fn emit_edited_event(voice_asset_id: &str, operation_count: u16, derived_artifact_ref: &str) {
    tracing::info!(
        target: "extension.emotiontts.audio.edited",
        voice_asset_id = voice_asset_id,
        operation_count = operation_count,
        derived_artifact_ref = derived_artifact_ref,
        "audio edit applied",
    );
}

fn noop_apply_response(
    row: &crate::storage::repo_traits::VoiceAssetRow,
    digest: &ChainDigest,
) -> Value {
    let derived_ref = row
        .derived_artifact_ref
        .as_deref()
        .unwrap_or(row.audio_artifact_ref.as_str());
    json!({
        "chain_digest": digest.as_str(),
        "derived_artifact_ref": derived_ref,
        "source_duration_ms": row.duration_ms.unwrap_or(0),
        "derived_duration_ms": row.duration_ms.unwrap_or(0),
        "measured_lufs": Value::Null,
        "per_op_durations_ms": json!([]),
        "warnings": json!([]),
    })
}

async fn stream_preview(temp_path_abs: &str, format: &str) -> Result<Response> {
    let path = PathBuf::from(temp_path_abs);
    let file = tokio::fs::File::open(&path)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("open preview temp file: {e}")))?;

    let guard = PreviewTempGuard {
        path: path.clone(),
    };
    let stream = guarded_stream(ReaderStream::new(file), guard);
    let body = Body::from_stream(stream);

    let content_type = match format {
        "mp3" | "mpeg" => PREVIEW_CONTENT_TYPE_MP3,
        _ => PREVIEW_CONTENT_TYPE_WAV,
    };

    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, content_type)
        .header(header::CACHE_CONTROL, "no-store")
        .body(body)
        .map_err(|e| EmotionTtsError::internal(format!("response builder: {e}")))
}

/// RAII cleanup for the worker-side preview temp file. When the response
/// body stream is dropped (after the bytes have been sent or the client
/// disconnected) the guard removes the file from disk so the worker's
/// scratch directory does not grow unbounded.
struct PreviewTempGuard {
    path: PathBuf,
}

impl Drop for PreviewTempGuard {
    fn drop(&mut self) {
        let _ = std::fs::remove_file(&self.path);
    }
}

fn guarded_stream<S>(stream: S, guard: PreviewTempGuard) -> impl futures::Stream<Item = S::Item>
where
    S: futures::Stream + Send + 'static,
    S::Item: Send + 'static,
{
    use futures::StreamExt;
    stream.chain(futures::stream::poll_fn(move |_| {
        let _keep_alive_until_eos = &guard;
        std::task::Poll::Ready(None)
    }))
}
