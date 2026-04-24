use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::domain::{DeploymentId, EmotionTtsError, PresetId, Result};
use crate::storage::repo_traits::VectorPresetRow;
use crate::storage::Repos;

#[derive(Clone)]
pub struct PresetsState {
    pub repos: Repos,
}

#[must_use]
pub fn router(repos: Repos) -> Router {
    Router::new()
        .route("/", get(list).post(create))
        .route("/:preset_id", get(fetch).patch(patch_preset).delete(delete_preset))
        .with_state(Arc::new(PresetsState { repos }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ListQuery {
    deployment_id: String,
}

async fn list(State(state): State<Arc<PresetsState>>, Query(q): Query<ListQuery>) -> Response {
    let dep = match DeploymentId::try_from(q.deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.presets.list_by_deployment(&dep).await {
        Ok(rows) => {
            let items: Vec<Value> = rows.iter().map(preset_json).collect();
            (StatusCode::OK, Json(json!({ "presets": items }))).into_response()
        }
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreateBody {
    deployment_id: String,
    preset_name: String,
    vector: Vec<f64>,
}

async fn create(State(state): State<Arc<PresetsState>>, Json(body): Json<CreateBody>) -> Response {
    match create_impl(&state, body).await {
        Ok(row) => (StatusCode::CREATED, Json(preset_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn create_impl(state: &PresetsState, body: CreateBody) -> Result<VectorPresetRow> {
    let dep = DeploymentId::try_from(body.deployment_id.as_str())?;
    let name = validate_name(&body.preset_name)?;
    let vector = validate_vector(&body.vector)?;

    if find_by_name_ci(state, &dep, &name).await?.is_some() {
        return Err(EmotionTtsError::conflict(format!(
            "preset named {name:?} already exists in this deployment"
        )));
    }

    let now = Utc::now().timestamp();
    let row = VectorPresetRow {
        preset_id: PresetId::new(),
        deployment_id: dep,
        preset_name: name,
        vector_json: serde_json::to_string(&vector).expect("vector serialises"),
        created_at: now,
        updated_at: now,
    };
    state.repos.presets.insert(&row).await?;
    Ok(row)
}

async fn fetch(State(state): State<Arc<PresetsState>>, Path(id): Path<String>) -> Response {
    match fetch_impl(&state, &id).await {
        Ok(row) => (StatusCode::OK, Json(preset_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn fetch_impl(state: &PresetsState, id: &str) -> Result<VectorPresetRow> {
    let id = PresetId::try_from(id)?;
    state
        .repos
        .presets
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("preset {id}")))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PatchBody {
    preset_name: Option<String>,
    vector: Option<Vec<f64>>,
}

async fn patch_preset(
    State(state): State<Arc<PresetsState>>,
    Path(id): Path<String>,
    Json(body): Json<PatchBody>,
) -> Response {
    match patch_impl(&state, &id, body).await {
        Ok(row) => (StatusCode::OK, Json(preset_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn patch_impl(state: &PresetsState, id: &str, body: PatchBody) -> Result<VectorPresetRow> {
    let pid = PresetId::try_from(id)?;
    let mut row = state
        .repos
        .presets
        .get(&pid)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("preset {pid}")))?;

    if let Some(name) = body.preset_name {
        let trimmed = validate_name(&name)?;
        if !trimmed.eq_ignore_ascii_case(&row.preset_name) {
            if let Some(clash) = find_by_name_ci(state, &row.deployment_id, &trimmed).await? {
                if clash.preset_id != row.preset_id {
                    return Err(EmotionTtsError::conflict(format!(
                        "preset named {trimmed:?} already exists in this deployment"
                    )));
                }
            }
        }
        row.preset_name = trimmed;
    }
    if let Some(vector) = body.vector {
        let v = validate_vector(&vector)?;
        row.vector_json = serde_json::to_string(&v).expect("vector serialises");
    }
    row.updated_at = Utc::now().timestamp();

    state.repos.presets.delete(&row.preset_id).await?;
    state.repos.presets.insert(&row).await?;
    Ok(row)
}

async fn delete_preset(
    State(state): State<Arc<PresetsState>>,
    Path(id): Path<String>,
) -> Response {
    let pid = match PresetId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.presets.delete(&pid).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

fn validate_name(raw: &str) -> Result<String> {
    let trimmed = raw.trim();
    if trimmed.is_empty() {
        return Err(EmotionTtsError::validation("presetName cannot be empty"));
    }
    if trimmed.chars().count() > 120 {
        return Err(EmotionTtsError::validation("presetName too long (max 120 chars)"));
    }
    Ok(trimmed.to_string())
}

fn validate_vector(v: &[f64]) -> Result<[f64; 8]> {
    if v.len() != 8 {
        return Err(EmotionTtsError::validation(
            "vector must have exactly 8 elements",
        ));
    }
    let mut out = [0.0f64; 8];
    for (i, x) in v.iter().enumerate() {
        if !x.is_finite() || !(0.0..=1.0).contains(x) {
            return Err(EmotionTtsError::validation(format!(
                "vector[{i}] must be a finite number in [0.0, 1.0]"
            )));
        }
        out[i] = *x;
    }
    Ok(out)
}

async fn find_by_name_ci(
    state: &PresetsState,
    dep: &DeploymentId,
    name: &str,
) -> Result<Option<VectorPresetRow>> {
    let rows = state.repos.presets.list_by_deployment(dep).await?;
    Ok(rows
        .into_iter()
        .find(|r| r.preset_name.eq_ignore_ascii_case(name)))
}

fn preset_json(row: &VectorPresetRow) -> Value {
    let vector: Value = serde_json::from_str(&row.vector_json).unwrap_or_else(|_| json!([]));
    json!({
        "presetId": row.preset_id.as_str(),
        "deploymentId": row.deployment_id.as_str(),
        "presetName": row.preset_name,
        "vector": vector,
        "createdAt": row.created_at,
        "updatedAt": row.updated_at,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn validate_vector_rejects_wrong_length() {
        assert!(validate_vector(&[0.1; 7]).is_err());
        assert!(validate_vector(&[0.1; 9]).is_err());
        assert!(validate_vector(&[0.1; 8]).is_ok());
    }

    #[test]
    fn validate_vector_rejects_out_of_range() {
        let mut v = [0.1; 8];
        v[3] = 1.5;
        assert!(validate_vector(&v).is_err());
        v[3] = -0.01;
        assert!(validate_vector(&v).is_err());
        v[3] = f64::NAN;
        assert!(validate_vector(&v).is_err());
    }

    #[test]
    fn validate_name_trims_and_rejects_empty() {
        assert_eq!(validate_name("  Joyful  ").unwrap(), "Joyful");
        assert!(validate_name("   ").is_err());
    }

    #[test]
    fn validate_name_rejects_too_long() {
        let long = "a".repeat(121);
        assert!(validate_name(&long).is_err());
    }
}
