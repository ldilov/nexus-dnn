//! Preset-packs HTTP surface (P5). Generic by `{id}` + `control_id` only: zero
//! extension-id literals, zero node-id shapes (enforced by
//! `tests/recipes_boundary_test.rs`). List/explain/diff are pure reads over a
//! compiled `ResolvedRun`; create/delete mutate a USER recipe's projection.

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use nexus_extension::ExtensionRegistry;
use nexus_recipe::{
    ControlValues, Preset, PresetSource, RecipeProjection, ValueSource, compile_recipe_run,
    diff_vs_defaults, explain_preset,
};
use nexus_storage::{Database, RecipeRecord};
use serde::Deserialize;
use std::collections::BTreeMap;

use crate::AppState;
use crate::dto::{
    ControlDiffDto, CreateUserPresetBody, ListResponseDto, PresetDto, PresetExplainEntryDto,
    PresetExplanationDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::run::{binding_error_to_api, load_workflow_snapshot, resolve_and_compile};

/// Serialize a [`PresetSource`] to its snake_case wire string.
fn preset_source_str(source: PresetSource) -> &'static str {
    match source {
        PresetSource::Extension => "extension",
        PresetSource::Recipe => "recipe",
        PresetSource::User => "user",
    }
}

/// Serialize a [`ValueSource`] to its snake_case wire string.
fn value_source_str(source: ValueSource) -> &'static str {
    match source {
        ValueSource::Default => "default",
        ValueSource::Preset => "preset",
        ValueSource::User => "user",
    }
}

/// Load + parse a recipe's projection (returns the record too for callers that
/// need `author_kind`). `NotFound` -> 404; parse failure -> structured 422; a
/// recipe with no projection yields `RecipeProjection::empty()`.
async fn load_recipe_projection(
    db: &impl Database,
    id: &str,
) -> Result<(RecipeRecord, RecipeProjection), ApiError> {
    let record = db.get_recipe(id).await.map_err(|e| match e {
        nexus_storage::StorageError::NotFound { .. } => {
            ApiError::NotFound(format!("recipe {id} not found"))
        }
        other => ApiError::Internal(other.to_string()),
    })?;
    let projection = match record.projection.as_deref() {
        Some(json_str) => serde_json::from_str::<RecipeProjection>(json_str).map_err(|e| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_PROJECTION_PARSE",
                format!("projection parse failed: {e}"),
            )
        })?,
        None => RecipeProjection::empty(),
    };
    Ok((record, projection))
}

/// `control_id -> label` map from a projection's controls, for joining labels
/// onto explain entries (defaults to the control_id when absent).
fn label_map(projection: &RecipeProjection) -> BTreeMap<String, String> {
    projection
        .controls
        .iter()
        .map(|c| (c.control_id.clone(), c.label.clone()))
        .collect()
}

#[derive(Debug, Deserialize)]
pub(crate) struct ExplainParams {
    pub preset_id: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct DiffParams {
    pub preset_id: Option<String>,
    pub control_values: Option<String>,
}

/// Parse a JSON-object query string into [`ControlValues`]; empty when absent.
/// A malformed object string -> structured 422.
fn parse_control_values(raw: Option<&str>) -> Result<ControlValues, ApiError> {
    match raw {
        Some(s) => {
            let map: serde_json::Map<String, serde_json::Value> =
                serde_json::from_str(s).map_err(|e| {
                    ApiError::structured(
                        StatusCode::UNPROCESSABLE_ENTITY,
                        "CONTROL_VALUES_PARSE",
                        format!("control_values must be a JSON object: {e}"),
                    )
                })?;
            Ok(map.into_iter().collect())
        }
        None => Ok(ControlValues::new()),
    }
}

/// `GET /recipes/{id}/presets` — all presets (extension+recipe+user) for the rail.
pub(crate) async fn list_presets(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ListResponseDto<PresetDto>>, ApiError> {
    let (_record, projection) = load_recipe_projection(state.db.as_ref(), &id).await?;
    let items = projection
        .presets
        .iter()
        .map(|p| PresetDto {
            preset_id: p.preset_id.clone(),
            label: p.label.clone(),
            description: p.description.clone(),
            source: preset_source_str(p.source).to_owned(),
            control_count: p.values.len() as u32,
        })
        .collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

/// `GET /recipes/{id}/explain?preset_id=…` — what a preset changes in the graph.
pub(crate) async fn explain_preset_handler(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<ExplainParams>,
) -> Result<ApiResponse<PresetExplanationDto>, ApiError> {
    let (_record, projection) = load_recipe_projection(state.db.as_ref(), &id).await?;
    let labels = label_map(&projection);

    let operators = state.extension_registry.list_operators();
    let resolved = resolve_and_compile(
        state.db.as_ref(),
        &operators,
        &id,
        &ControlValues::new(),
        Some(&params.preset_id),
    )
    .await?;

    let explanation = explain_preset(&resolved);
    let entries = explanation
        .entries
        .into_iter()
        .map(|e| PresetExplainEntryDto {
            label: labels
                .get(&e.control_id)
                .cloned()
                .unwrap_or_else(|| e.control_id.clone()),
            control_id: e.control_id,
            final_value: e.final_value,
            targets: e.targets,
            source: value_source_str(e.source).to_owned(),
        })
        .collect();
    Ok(ApiResponse::ok(PresetExplanationDto { entries }))
}

/// `GET /recipes/{id}/diff?preset_id=…&control_values=…` — per-control provenance.
pub(crate) async fn diff_preset_handler(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(params): Query<DiffParams>,
) -> Result<ApiResponse<ListResponseDto<ControlDiffDto>>, ApiError> {
    let control_values = parse_control_values(params.control_values.as_deref())?;
    let (_record, projection) = load_recipe_projection(state.db.as_ref(), &id).await?;

    let operators = state.extension_registry.list_operators();
    let resolved = resolve_and_compile(
        state.db.as_ref(),
        &operators,
        &id,
        &control_values,
        params.preset_id.as_deref(),
    )
    .await?;

    let items = diff_vs_defaults(&resolved, &projection)
        .into_iter()
        .map(|d| ControlDiffDto {
            control_id: d.control_id,
            default_value: d.default_value,
            effective_value: d.effective_value,
            source: value_source_str(d.source).to_owned(),
            overridden: d.overridden,
        })
        .collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

/// Slugify a label into a preset_id: lowercase, ASCII-alphanumeric kept,
/// every other run collapsed to a single `-`, ends trimmed. Returns `None` when
/// the label has no usable slug chars (e.g. entirely non-ASCII) — the caller
/// then rejects with a 422 rather than colliding on a fallback id.
fn slugify(label: &str) -> Option<String> {
    let mut slug = String::new();
    let mut last_dash = false;
    for ch in label.chars() {
        if ch.is_ascii_alphanumeric() {
            slug.push(ch.to_ascii_lowercase());
            last_dash = false;
        } else if !last_dash {
            slug.push('-');
            last_dash = true;
        }
    }
    let trimmed = slug.trim_matches('-');
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_owned())
    }
}

/// `POST /recipes/{id}/presets` — create a USER preset, validated through the
/// compiler before it is persisted.
pub(crate) async fn create_user_preset(
    State(state): State<AppState>,
    Path(id): Path<String>,
    axum::Json(body): axum::Json<CreateUserPresetBody>,
) -> Result<ApiResponse<PresetDto>, ApiError> {
    let (record, mut projection) = load_recipe_projection(state.db.as_ref(), &id).await?;
    if record.author_kind != "user" {
        return Err(ApiError::structured(
            StatusCode::FORBIDDEN,
            "RECIPE_NOT_USER_AUTHORED",
            "only user-authored recipes accept user presets",
        ));
    }

    let preset_id = slugify(&body.label).ok_or_else(|| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "PRESET_LABEL_UNSLUGGABLE",
            "label has no usable characters for a preset id",
        )
    })?;
    if projection.preset(&preset_id).is_some() {
        return Err(ApiError::structured(
            StatusCode::CONFLICT,
            "PRESET_ID_CONFLICT",
            format!("a preset with id {preset_id} already exists"),
        ));
    }

    let candidate = Preset {
        preset_id: preset_id.clone(),
        label: body.label,
        description: body.description,
        source: PresetSource::User,
        values: body.values,
    };

    // Save-gate (CONTRACTS C4): compile a temp projection selecting the candidate
    // by id, so it MAY set locked/hidden controls (not validated as user values).
    let operators = state.extension_registry.list_operators();
    let mut temp = projection.clone();
    temp.presets.push(candidate.clone());
    let snapshot = load_workflow_snapshot(state.db.as_ref(), &record, &operators).await?;
    compile_recipe_run(&temp, &snapshot, &ControlValues::new(), Some(&preset_id))
        .map_err(binding_error_to_api)?;

    let dto = PresetDto {
        preset_id: candidate.preset_id.clone(),
        label: candidate.label.clone(),
        description: candidate.description.clone(),
        source: preset_source_str(candidate.source).to_owned(),
        control_count: candidate.values.len() as u32,
    };
    projection.presets.push(candidate);
    let json = serde_json::to_string(&projection).map_err(|e| ApiError::Internal(e.to_string()))?;
    state
        .db
        .update_recipe_projection(&id, &json)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::created(dto))
}

/// `DELETE /recipes/{id}/presets/{preset_id}` — delete a USER preset.
pub(crate) async fn delete_user_preset(
    State(state): State<AppState>,
    Path((id, preset_id)): Path<(String, String)>,
) -> Result<ApiResponse<()>, ApiError> {
    let (record, mut projection) = load_recipe_projection(state.db.as_ref(), &id).await?;
    if record.author_kind != "user" {
        return Err(ApiError::structured(
            StatusCode::FORBIDDEN,
            "RECIPE_NOT_USER_AUTHORED",
            "only user-authored recipes accept preset deletion",
        ));
    }

    let target = projection
        .preset(&preset_id)
        .ok_or_else(|| ApiError::NotFound(format!("preset {preset_id} not found")))?;
    if target.source != PresetSource::User {
        return Err(ApiError::structured(
            StatusCode::CONFLICT,
            "PRESET_NOT_USER_OWNED",
            "only user-owned presets may be deleted",
        ));
    }

    projection.presets.retain(|p| p.preset_id != preset_id);
    let json = serde_json::to_string(&projection).map_err(|e| ApiError::Internal(e.to_string()))?;
    state
        .db
        .update_recipe_projection(&id, &json)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(()))
}
