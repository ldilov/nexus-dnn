use std::path::PathBuf;
use std::sync::Arc;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::post;
use axum::Router;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::backend_client::LeaseProvider;
use crate::domain::{ChainDigest, EditChain, EmotionTtsError, Result, RunId, UtteranceId};
use crate::host_contract::HostArtifactStore;
use crate::router::guard;
use crate::storage::audio_edit_atomic::{self, build_audit_entry, CommitOutcome};
use crate::storage::audit_log_repo::{TargetKind, SYSTEM_ACTOR};
use crate::storage::repo_traits::{RunRow, UtteranceRow};
use crate::storage::Repos;

#[derive(Clone)]
pub struct UtteranceEditState {
    pub repos: Repos,
    pub artifact_store: Option<Arc<dyn HostArtifactStore>>,
    pub lease_provider: Option<Arc<LeaseProvider>>,
}

pub fn routes(state: Arc<UtteranceEditState>) -> Router {
    Router::new()
        .route(
            "/deployments/{deployment_id}/runs/{run_id}/utterances/{utterance_id}/edit",
            post(apply),
        )
        .with_state(state)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
struct ApplyEditRequest {
    chain: EditChain,
    #[serde(default)]
    digest_before: Option<String>,
}

enum ApplyOutcome {
    Ok(Value),
    StaleDigest { current: ChainDigest },
}

async fn apply(
    State(state): State<Arc<UtteranceEditState>>,
    Path((deployment_id, run_id, utterance_id)): Path<(String, String, String)>,
    Json(body): Json<ApplyEditRequest>,
) -> Response {
    match apply_impl(&state, &deployment_id, &run_id, &utterance_id, body).await {
        Ok(ApplyOutcome::Ok(value)) => (StatusCode::OK, Json(value)).into_response(),
        Ok(ApplyOutcome::StaleDigest { current }) => stale_digest_response(&current),
        Err(err) => err.into_response(),
    }
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

async fn apply_impl(
    state: &UtteranceEditState,
    raw_deployment_id: &str,
    raw_run_id: &str,
    raw_utterance_id: &str,
    req: ApplyEditRequest,
) -> Result<ApplyOutcome> {
    let utterance_id = UtteranceId::try_from(raw_utterance_id)?;
    let run_id = RunId::try_from(raw_run_id)?;
    let (run, utterance) = guarded_lookup(state, &utterance_id, &run_id, raw_deployment_id).await?;
    req.chain.validate()?;

    let current = state
        .repos
        .utterances
        .read_edit_chain(&utterance_id)
        .await?;
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
        return Ok(ApplyOutcome::Ok(noop_apply_response(
            &utterance,
            &new_digest,
        )));
    }

    let report =
        run_audio_edit_rpc(state, &utterance_id, &utterance, &req.chain, &new_digest).await?;

    let operation_count = req.chain.operation_count();
    let audit = build_audit_entry(
        ulid::Ulid::new().to_string(),
        run.deployment_id.clone(),
        utterance_id.as_str().to_owned(),
        TargetKind::Utterance,
        current_digest.clone(),
        new_digest.clone(),
        operation_count,
        SYSTEM_ACTOR.to_string(),
    );

    let outcome = audio_edit_atomic::commit_utterance_apply(
        &state.repos.pool,
        utterance_id.as_str(),
        run_id.as_str(),
        &current_digest,
        &req.chain,
        &report.derived_artifact_ref,
        &audit,
    )
    .await?;

    if let CommitOutcome::StaleDigest { current } = outcome {
        tracing::warn!(
            target: "extension.emotiontts.audio.edited",
            utterance_id = utterance_id.as_str(),
            orphaned_derived_artifact_ref = report.derived_artifact_ref.as_str(),
            "concurrent writer changed chain between RPC and commit; derived artifact orphaned",
        );
        return Ok(ApplyOutcome::StaleDigest { current });
    }

    emit_edited_event(
        utterance_id.as_str(),
        operation_count,
        &report.derived_artifact_ref,
    );
    Ok(ApplyOutcome::Ok(apply_response_json(&new_digest, &report)))
}

async fn guarded_lookup(
    state: &UtteranceEditState,
    utterance_id: &UtteranceId,
    run_id: &RunId,
    claimed_deployment_id: &str,
) -> Result<(RunRow, UtteranceRow)> {
    let utterance = state
        .repos
        .utterances
        .get(utterance_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("utterance {utterance_id}")))?;
    if utterance.run_id != *run_id {
        return Err(EmotionTtsError::not_found(format!(
            "utterance {utterance_id}"
        )));
    }
    let run = state
        .repos
        .runs
        .get(run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("run {run_id}")))?;
    guard::assert_deployment_match(run.deployment_id.as_str(), claimed_deployment_id, || {
        format!("utterance {utterance_id}")
    })?;
    Ok((run, utterance))
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
    state: &UtteranceEditState,
    utterance_id: &UtteranceId,
    utterance: &UtteranceRow,
    chain: &EditChain,
    new_digest: &ChainDigest,
) -> Result<EditOutcome> {
    let store = state.artifact_store.clone().ok_or_else(|| {
        EmotionTtsError::RuntimeUnavailable("artifact store not configured".into())
    })?;
    let provider = state.lease_provider.clone().ok_or_else(|| {
        EmotionTtsError::RuntimeUnavailable("lease provider not configured".into())
    })?;
    let client = provider.spawn_if_needed().await?;

    let source_ref = source_ref_for(utterance)?;
    let source_abs = store.resolve_path(source_ref).await?;
    let derived_path = derived_temp_path(utterance_id, new_digest);
    let derived_abs = path_to_string(&derived_path)?;
    let request_id = make_request_id("utterance-edit", utterance_id.as_str());

    let chain_value = serde_json::to_value(chain)?;
    let report = client
        .audio_edit(
            &request_id,
            &source_abs,
            &derived_abs,
            chain_value,
            new_digest.as_str(),
        )
        .await?;

    if report.chain_digest != new_digest.as_str() {
        return Err(EmotionTtsError::internal(format!(
            "worker chain digest {worker} != host {host}; canonical-JSON drift",
            worker = report.chain_digest,
            host = new_digest.as_str()
        )));
    }

    let put = read_and_store_derived(&store, &derived_path, utterance_id).await?;
    Ok(EditOutcome {
        derived_artifact_ref: put.artifact_ref,
        source_duration_ms: report.source_duration_ms,
        derived_duration_ms: report.derived_duration_ms,
        measured_lufs: report.measured_lufs,
        per_op_durations_ms: report.per_op_durations_ms,
        warnings: report.warnings,
    })
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

fn noop_apply_response(utterance: &UtteranceRow, digest: &ChainDigest) -> Value {
    let derived_ref = utterance
        .derived_artifact_ref
        .as_deref()
        .or(utterance.audio_artifact_ref.as_deref())
        .unwrap_or("");
    json!({
        "chain_digest": digest.as_str(),
        "derived_artifact_ref": derived_ref,
        "source_duration_ms": utterance.duration_ms.unwrap_or(0),
        "derived_duration_ms": utterance.duration_ms.unwrap_or(0),
        "measured_lufs": Value::Null,
        "per_op_durations_ms": json!([]),
        "warnings": json!([]),
    })
}

fn source_ref_for(utterance: &UtteranceRow) -> Result<&str> {
    utterance
        .derived_artifact_ref
        .as_deref()
        .or(utterance.audio_artifact_ref.as_deref())
        .ok_or_else(|| {
            EmotionTtsError::Conflict(format!(
                "utterance {} has no audio yet — cannot edit",
                utterance.utterance_id
            ))
        })
}

fn derived_temp_path(utterance_id: &UtteranceId, digest: &ChainDigest) -> PathBuf {
    std::env::temp_dir().join(format!(
        "emotion_tts_utterance_edit_{utterance_id}_{digest}.wav",
        utterance_id = utterance_id.as_str(),
        digest = digest.as_str()
    ))
}

fn path_to_string(path: &std::path::Path) -> Result<String> {
    path.to_str()
        .map(str::to_owned)
        .ok_or_else(|| EmotionTtsError::internal("non-utf8 derived path".to_string()))
}

fn make_request_id(prefix: &str, target_id: &str) -> String {
    format!("{prefix}-{target_id}-{}", ulid::Ulid::new())
}

async fn read_and_store_derived(
    store: &Arc<dyn HostArtifactStore>,
    derived_path: &std::path::Path,
    utterance_id: &UtteranceId,
) -> Result<crate::host_contract::ArtifactPut> {
    let bytes = tokio::fs::read(derived_path)
        .await
        .map_err(|e| EmotionTtsError::internal(format!("read derived audio: {e}")))?;
    let _ = tokio::fs::remove_file(derived_path).await;
    let display = format!("utterance_{utterance_id}__edited.wav");
    let put = store.store(bytes, &display, Some("audio/wav")).await?;
    Ok(put)
}

fn emit_edited_event(utterance_id: &str, operation_count: u16, derived_artifact_ref: &str) {
    tracing::info!(
        target: "extension.emotiontts.audio.edited",
        utterance_id = utterance_id,
        operation_count = operation_count,
        derived_artifact_ref = derived_artifact_ref,
        "audio edit applied",
    );
}
