//! Spec 036 / US5 — read-only audit-log endpoint.
//!
//! `GET /audit/{target_kind}/{target_id}?deploymentId=…&limit=…`
//!
//! Cross-deployment access AND access to deleted/non-existent targets both
//! return 404 (FR-016 guard contract — never leak target existence across
//! deployments). FR-030 preserves audit entries at the storage layer
//! (`audit_log_repo` has no FK to the target row, see
//! `audio_edit_audit_log_sequence_test::audit_log_survives_target_deletion`),
//! but the public HTTP endpoint requires the target row to confirm
//! deployment membership before exposing entries. Forensic recovery of
//! orphaned entries is a storage-layer / DB-shell concern, not a public
//! API surface.
//! See FR-029, FR-030, FR-031, FR-032.

use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::domain::{DeploymentId, EmotionTtsError, Result, UtteranceId, VoiceAssetId};
use crate::router::guard;
use crate::storage::audit_log_repo::{AuditEntry, TargetKind};
use crate::storage::Repos;

const DEFAULT_LIMIT: u32 = 50;
const MAX_LIMIT: u32 = 200;

pub fn router(repos: Repos) -> Router {
    let state = Arc::new(repos);
    Router::new()
        .route("/audit/{target_kind}/{target_id}", get(list))
        .with_state(state)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct AuditQuery {
    deployment_id: String,
    #[serde(default)]
    limit: Option<u32>,
}

#[derive(Debug, Serialize)]
struct AuditEntryView {
    entry_id: String,
    target_id: String,
    target_kind: TargetKind,
    digest_before: String,
    digest_after: String,
    operation_count: u16,
    recorded_at: String,
    actor: String,
}

impl From<AuditEntry> for AuditEntryView {
    fn from(entry: AuditEntry) -> Self {
        Self {
            entry_id: entry.entry_id,
            target_id: entry.target_id,
            target_kind: entry.target_kind,
            digest_before: entry.digest_before.as_str().to_owned(),
            digest_after: entry.digest_after.as_str().to_owned(),
            operation_count: entry.operation_count,
            recorded_at: entry.recorded_at.to_rfc3339(),
            actor: entry.actor,
        }
    }
}

async fn list(
    State(repos): State<Arc<Repos>>,
    Path((target_kind_raw, target_id)): Path<(String, String)>,
    Query(query): Query<AuditQuery>,
) -> Response {
    match list_impl(&repos, &target_kind_raw, &target_id, &query).await {
        Ok(entries) => {
            let body = json!({ "entries": entries });
            (StatusCode::OK, Json(body)).into_response()
        }
        Err(err) => err.into_response(),
    }
}

async fn list_impl(
    repos: &Repos,
    target_kind_raw: &str,
    target_id: &str,
    query: &AuditQuery,
) -> Result<Vec<AuditEntryView>> {
    let target_kind = TargetKind::parse(target_kind_raw)?;
    let deployment_id = DeploymentId::try_from(query.deployment_id.as_str())?;
    let limit = clamp_limit(query.limit);

    enforce_target_scope(repos, target_kind, target_id, &deployment_id).await?;

    let entries = repos
        .audio_edit_log
        .list_for_target(&deployment_id, target_kind, target_id, limit)
        .await?;
    Ok(entries.into_iter().map(AuditEntryView::from).collect())
}

fn clamp_limit(raw: Option<u32>) -> u32 {
    let requested = raw.unwrap_or(DEFAULT_LIMIT);
    requested.clamp(1, MAX_LIMIT)
}

async fn enforce_target_scope(
    repos: &Repos,
    target_kind: TargetKind,
    target_id: &str,
    claimed_deployment: &DeploymentId,
) -> Result<()> {
    match target_kind {
        TargetKind::VoiceAsset => assert_voice_asset_scope(repos, target_id, claimed_deployment).await,
        TargetKind::Utterance => assert_utterance_scope(repos, target_id, claimed_deployment).await,
    }
}

async fn assert_voice_asset_scope(
    repos: &Repos,
    target_id: &str,
    claimed_deployment: &DeploymentId,
) -> Result<()> {
    let asset_id = VoiceAssetId::try_from(target_id)?;
    let row = repos
        .voice_assets
        .get(&asset_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("voice asset {asset_id}")))?;
    guard::assert_deployment_match(
        row.deployment_id.as_str(),
        claimed_deployment.as_str(),
        || format!("voice asset {asset_id}"),
    )
}

async fn assert_utterance_scope(
    repos: &Repos,
    target_id: &str,
    claimed_deployment: &DeploymentId,
) -> Result<()> {
    let utterance_id = UtteranceId::try_from(target_id)?;
    let utterance = repos
        .utterances
        .get(&utterance_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("utterance {utterance_id}")))?;
    let run = repos
        .runs
        .get(&utterance.run_id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("utterance {utterance_id}")))?;
    guard::assert_deployment_match(
        run.deployment_id.as_str(),
        claimed_deployment.as_str(),
        || format!("utterance {utterance_id}"),
    )
}
