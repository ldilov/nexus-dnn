//! Spec 034 — per-deployment engine settings (T062).
//!
//! Exposes:
//!
//! * `GET  /deployments/:deployment_id/engine-settings`
//! * `PATCH /deployments/:deployment_id/engine-settings`
//! * `PATCH /deployments/:deployment_id/oas-threshold`
//!
//! Shape matches `contracts/http/engine_settings.yaml`. The PATCH endpoints
//! leave any field the caller omits unchanged (column COALESCE in the repo).

use std::sync::Arc;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, patch};
use axum::Router;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::domain::{DeploymentId, EmotionTtsError, Result};
use crate::storage::repo_traits::DeploymentRow;
use crate::storage::Repos;

pub fn router(repos: Repos) -> Router {
    Router::new()
        .route(
            "/deployments/{deployment_id}/engine-settings",
            get(fetch).patch(patch_settings),
        )
        .route(
            "/deployments/{deployment_id}/oas-threshold",
            patch(patch_oas_threshold),
        )
        .with_state(repos)
}

async fn fetch(State(repos): State<Repos>, Path(id): Path<String>) -> Response {
    match fetch_impl(&repos, &id).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn fetch_impl(repos: &Repos, raw_id: &str) -> Result<Value> {
    let id = DeploymentId::try_from(raw_id)?;
    let row = repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))?;
    Ok(engine_settings_json(&row))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct EngineSettingsPatch {
    #[serde(default)]
    reference_preprocess_enabled: Option<bool>,
    #[serde(default)]
    oas_enabled: Option<bool>,
    #[serde(default)]
    compile_gpt_enabled: Option<bool>,
    #[serde(default)]
    model_family: Option<String>,
}

async fn patch_settings(
    State(repos): State<Repos>,
    Path(id): Path<String>,
    Json(body): Json<EngineSettingsPatch>,
) -> Response {
    match patch_settings_impl(&repos, &id, body).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn patch_settings_impl(
    repos: &Repos,
    raw_id: &str,
    body: EngineSettingsPatch,
) -> Result<Value> {
    let id = DeploymentId::try_from(raw_id)?;
    // Ensure row exists — COALESCE would silently no-op against a missing row.
    if repos.deployments.get(&id).await?.is_none() {
        return Err(EmotionTtsError::not_found(format!("deployment {id}")));
    }
    repos
        .deployments
        .patch_engine_settings(
            &id,
            body.reference_preprocess_enabled,
            body.oas_enabled,
            body.compile_gpt_enabled,
            body.model_family.as_deref(),
        )
        .await?;
    let fresh = repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))?;
    Ok(engine_settings_json(&fresh))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct OasThresholdPatch {
    /// `None` clears calibration (returns the deployment to cold-start).
    /// `Some(value)` must be in [0.0, 1.0].
    #[serde(default)]
    threshold_learned: Option<f64>,
    samples_seen: i64,
}

async fn patch_oas_threshold(
    State(repos): State<Repos>,
    Path(id): Path<String>,
    Json(body): Json<OasThresholdPatch>,
) -> Response {
    match patch_oas_threshold_impl(&repos, &id, body).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

async fn patch_oas_threshold_impl(
    repos: &Repos,
    raw_id: &str,
    body: OasThresholdPatch,
) -> Result<()> {
    let id = DeploymentId::try_from(raw_id)?;
    if let Some(value) = body.threshold_learned {
        if !(0.0..=1.0).contains(&value) {
            return Err(EmotionTtsError::validation(format!(
                "thresholdLearned must be in [0.0, 1.0]; got {value}"
            )));
        }
    }
    if body.samples_seen < 0 {
        return Err(EmotionTtsError::validation(
            "samplesSeen must be >= 0".to_string(),
        ));
    }
    if repos.deployments.get(&id).await?.is_none() {
        return Err(EmotionTtsError::not_found(format!("deployment {id}")));
    }
    repos
        .deployments
        .set_oas_threshold(&id, body.threshold_learned, body.samples_seen)
        .await?;
    Ok(())
}

fn engine_settings_json(row: &DeploymentRow) -> Value {
    let (threshold_used, threshold_source) = match row.oas_threshold_learned {
        Some(v) => (v, "rolling_mad"),
        None => (0.45, "literature_default"),
    };
    json!({
        "deploymentId": row.deployment_id.as_str(),
        "referencePreprocessEnabled": row.reference_preprocess_enabled,
        "oasEnabled": row.oas_enabled,
        "compileGptEnabled": row.compile_gpt_enabled,
        "compileAvailable": Value::Null,
        "lastCompileFailureReason": Value::Null,
        "modelFamily": row.model_family,
        "oasThresholdUsed": threshold_used,
        "oasThresholdSource": threshold_source,
        "oasSamplesSeen": row.oas_samples_seen,
    })
}
