use std::sync::Arc;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::domain::{DeploymentId, EmotionTtsError, Result};
use crate::storage::repo_traits::DeploymentRow;
use crate::storage::Repos;

#[derive(Clone)]
pub struct DeploymentsState {
    pub repos: Repos,
}

#[must_use]
pub fn router(repos: Repos) -> Router {
    Router::new()
        .route("/", get(list_deployments).post(create_deployment))
        .route("/:deployment_id", get(get_deployment).patch(patch_deployment).delete(delete_deployment))
        .route("/:deployment_id/resume", post(resume))
        .with_state(Arc::new(DeploymentsState { repos }))
}

async fn list_deployments(State(state): State<Arc<DeploymentsState>>) -> Response {
    match state.repos.deployments.list().await {
        Ok(rows) => {
            let deployments: Vec<Value> = rows.iter().map(deployment_json).collect();
            (StatusCode::OK, Json(json!({ "deployments": deployments }))).into_response()
        }
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreateDeploymentBody {
    display_name: String,
    #[serde(default)]
    host_extension_instance_ref: Option<String>,
    #[serde(default)]
    backend_runtime_preference: Option<String>,
    #[serde(default = "default_format")]
    default_output_format: String,
    #[serde(default = "default_speed")]
    default_speed_factor: f64,
}

fn default_format() -> String {
    "mp3".into()
}
fn default_speed() -> f64 {
    1.0
}

async fn create_deployment(
    State(state): State<Arc<DeploymentsState>>,
    Json(body): Json<CreateDeploymentBody>,
) -> Response {
    match create_impl(&state, body).await {
        Ok(row) => (StatusCode::CREATED, Json(deployment_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn create_impl(
    state: &DeploymentsState,
    body: CreateDeploymentBody,
) -> Result<DeploymentRow> {
    if body.display_name.trim().is_empty() {
        return Err(EmotionTtsError::validation("displayName cannot be empty"));
    }
    if !matches!(body.default_output_format.as_str(), "wav" | "mp3" | "flac") {
        return Err(EmotionTtsError::validation("defaultOutputFormat must be wav|mp3|flac"));
    }
    if !(0.5..=2.0).contains(&body.default_speed_factor) {
        return Err(EmotionTtsError::validation("defaultSpeedFactor must be 0.5..=2.0"));
    }

    let now = Utc::now().timestamp();
    let row = DeploymentRow {
        deployment_id: DeploymentId::new(),
        host_extension_instance_ref: body
            .host_extension_instance_ref
            .unwrap_or_else(|| "default".into()),
        display_name: body.display_name,
        backend_runtime_preference: body.backend_runtime_preference,
        default_output_format: body.default_output_format,
        default_speed_factor: body.default_speed_factor,
        default_generation_overrides_json: "{}".into(),
        most_recent_run_id: None,
        created_at: now,
        updated_at: now,
    };
    state.repos.deployments.insert(&row).await?;
    Ok(row)
}

async fn get_deployment(
    State(state): State<Arc<DeploymentsState>>,
    Path(id): Path<String>,
) -> Response {
    match get_impl(&state, &id).await {
        Ok(row) => (StatusCode::OK, Json(deployment_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn get_impl(state: &DeploymentsState, id: &str) -> Result<DeploymentRow> {
    let id = DeploymentId::try_from(id)?;
    state
        .repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PatchDeploymentBody {
    display_name: Option<String>,
    backend_runtime_preference: Option<String>,
    default_output_format: Option<String>,
    default_speed_factor: Option<f64>,
    default_generation_overrides: Option<Value>,
}

async fn patch_deployment(
    State(state): State<Arc<DeploymentsState>>,
    Path(id): Path<String>,
    Json(body): Json<PatchDeploymentBody>,
) -> Response {
    match patch_impl(&state, &id, body).await {
        Ok(row) => (StatusCode::OK, Json(deployment_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn patch_impl(
    state: &DeploymentsState,
    id: &str,
    body: PatchDeploymentBody,
) -> Result<DeploymentRow> {
    let id = DeploymentId::try_from(id)?;
    let mut row = state
        .repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))?;

    if let Some(name) = body.display_name {
        if name.trim().is_empty() {
            return Err(EmotionTtsError::validation("displayName cannot be empty"));
        }
        row.display_name = name;
    }
    if let Some(pref) = body.backend_runtime_preference {
        row.backend_runtime_preference = Some(pref);
    }
    if let Some(fmt) = body.default_output_format {
        if !matches!(fmt.as_str(), "wav" | "mp3" | "flac") {
            return Err(EmotionTtsError::validation("defaultOutputFormat must be wav|mp3|flac"));
        }
        row.default_output_format = fmt;
    }
    if let Some(speed) = body.default_speed_factor {
        if !(0.5..=2.0).contains(&speed) {
            return Err(EmotionTtsError::validation("defaultSpeedFactor must be 0.5..=2.0"));
        }
        row.default_speed_factor = speed;
    }
    if let Some(overrides) = body.default_generation_overrides {
        row.default_generation_overrides_json = overrides.to_string();
    }
    row.updated_at = Utc::now().timestamp();
    state.repos.deployments.update(&row).await?;
    Ok(row)
}

async fn delete_deployment(
    State(state): State<Arc<DeploymentsState>>,
    Path(id): Path<String>,
) -> Response {
    match delete_impl(&state, &id).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

async fn delete_impl(state: &DeploymentsState, id: &str) -> Result<()> {
    let id = DeploymentId::try_from(id)?;
    state
        .repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))?;
    state.repos.deployments.delete(&id).await?;
    Ok(())
}

async fn resume(State(state): State<Arc<DeploymentsState>>, Path(id): Path<String>) -> Response {
    match resume_impl(&state, &id).await {
        Ok(body) => (StatusCode::ACCEPTED, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn resume_impl(state: &DeploymentsState, id: &str) -> Result<Value> {
    let id = DeploymentId::try_from(id)?;
    let row = state
        .repos
        .deployments
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("deployment {id}")))?;
    let has_recent = row.most_recent_run_id.is_some();
    Ok(json!({
        "deploymentId": row.deployment_id.as_str(),
        "mostRecentRunId": row.most_recent_run_id.map(|r| r.into_inner()),
        "resumable": has_recent,
    }))
}

fn deployment_json(row: &DeploymentRow) -> Value {
    json!({
        "deploymentId": row.deployment_id.as_str(),
        "hostExtensionInstanceRef": row.host_extension_instance_ref,
        "displayName": row.display_name,
        "backendRuntimePreference": row.backend_runtime_preference,
        "defaultOutputFormat": row.default_output_format,
        "defaultSpeedFactor": row.default_speed_factor,
        "defaultGenerationOverridesJson": row.default_generation_overrides_json,
        "mostRecentRunId": row.most_recent_run_id.as_ref().map(|r| r.as_str()),
        "createdAt": row.created_at,
        "updatedAt": row.updated_at,
    })
}
