use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{get, post};
use axum::Router;
use chrono::Utc;
use serde::Deserialize;
use serde_json::{json, Value};

use crate::domain::{DeploymentId, EmotionTtsError, MappingId, PresetId, Result, VoiceAssetId};
use crate::storage::repo_traits::CharacterMappingRow;
use crate::storage::Repos;

#[derive(Clone)]
pub struct MappingsState {
    pub repos: Repos,
}

#[must_use]
pub fn router(repos: Repos) -> Router {
    Router::new()
        .route("/", get(list).post(create))
        .route("/import", post(import))
        .route("/export", get(export))
        .route("/{mapping_id}", get(fetch).patch(patch_mapping).delete(delete_mapping))
        .route("/{mapping_id}/duplicate", post(duplicate))
        .with_state(Arc::new(MappingsState { repos }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ListQuery {
    deployment_id: String,
}

async fn list(
    State(state): State<Arc<MappingsState>>,
    Query(query): Query<ListQuery>,
) -> Response {
    let dep = match DeploymentId::try_from(query.deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.mappings.list_by_deployment(&dep).await {
        Ok(rows) => {
            let items: Vec<Value> = rows.iter().map(mapping_json).collect();
            (StatusCode::OK, Json(json!({ "mappings": items }))).into_response()
        }
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreateMappingBody {
    deployment_id: String,
    character_name: String,
    speaker_voice_asset_id: String,
    #[serde(default = "default_emotion_mode")]
    default_emotion_mode: String,
    #[serde(default)]
    default_emotion_voice_asset_id: Option<String>,
    #[serde(default)]
    default_vector_preset_id: Option<String>,
    #[serde(default)]
    default_qwen_template: Option<String>,
    #[serde(default)]
    default_speed_factor: Option<f64>,
    #[serde(default)]
    notes: Option<String>,
}

fn default_emotion_mode() -> String {
    "none".into()
}

async fn create(
    State(state): State<Arc<MappingsState>>,
    Json(body): Json<CreateMappingBody>,
) -> Response {
    match create_impl(&state, body).await {
        Ok(row) => (StatusCode::CREATED, Json(mapping_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn create_impl(state: &MappingsState, body: CreateMappingBody) -> Result<CharacterMappingRow> {
    let dep = DeploymentId::try_from(body.deployment_id.as_str())?;
    let name = body.character_name.trim().to_string();
    if name.is_empty() {
        return Err(EmotionTtsError::validation("characterName cannot be empty"));
    }
    if !matches!(
        body.default_emotion_mode.as_str(),
        "none" | "audio_ref" | "vector_preset" | "qwen_template"
    ) {
        return Err(EmotionTtsError::validation("defaultEmotionMode invalid"));
    }
    let name_lower = name.to_lowercase();
    if state
        .repos
        .mappings
        .find_by_character(&dep, &name_lower)
        .await?
        .is_some()
    {
        return Err(EmotionTtsError::Conflict(format!(
            "mapping for {name:?} already exists (FR-071 case-insensitive uniqueness)"
        )));
    }
    let speaker = VoiceAssetId::try_from(body.speaker_voice_asset_id.as_str())?;
    let emotion_va = body
        .default_emotion_voice_asset_id
        .as_deref()
        .map(VoiceAssetId::try_from)
        .transpose()?;
    let preset = body
        .default_vector_preset_id
        .as_deref()
        .map(PresetId::try_from)
        .transpose()?;

    let now = Utc::now().timestamp();
    let row = CharacterMappingRow {
        mapping_id: MappingId::new(),
        deployment_id: dep,
        character_name: name,
        character_name_lower: name_lower,
        speaker_voice_asset_id: speaker,
        default_emotion_mode: body.default_emotion_mode,
        default_emotion_voice_asset_id: emotion_va,
        default_vector_preset_id: preset,
        default_qwen_template: body.default_qwen_template,
        default_speed_factor: body.default_speed_factor,
        default_generation_overrides_json: "{}".into(),
        is_active: true,
        notes: body.notes,
        created_at: now,
        updated_at: now,
    };
    state.repos.mappings.insert(&row).await?;
    Ok(row)
}

async fn fetch(
    State(state): State<Arc<MappingsState>>,
    Path(id): Path<String>,
) -> Response {
    match fetch_impl(&state, &id).await {
        Ok(row) => (StatusCode::OK, Json(mapping_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn fetch_impl(state: &MappingsState, id: &str) -> Result<CharacterMappingRow> {
    let id = MappingId::try_from(id)?;
    state
        .repos
        .mappings
        .get(&id)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("mapping {id}")))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PatchMappingBody {
    character_name: Option<String>,
    speaker_voice_asset_id: Option<String>,
    default_emotion_mode: Option<String>,
    default_emotion_voice_asset_id: Option<Option<String>>,
    default_vector_preset_id: Option<Option<String>>,
    default_qwen_template: Option<Option<String>>,
    default_speed_factor: Option<Option<f64>>,
    notes: Option<Option<String>>,
}

async fn patch_mapping(
    State(state): State<Arc<MappingsState>>,
    Path(id): Path<String>,
    Json(body): Json<PatchMappingBody>,
) -> Response {
    match patch_impl(&state, &id, body).await {
        Ok(row) => (StatusCode::OK, Json(mapping_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn patch_impl(
    state: &MappingsState,
    id: &str,
    body: PatchMappingBody,
) -> Result<CharacterMappingRow> {
    let mid = MappingId::try_from(id)?;
    let mut row = state
        .repos
        .mappings
        .get(&mid)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("mapping {mid}")))?;

    if let Some(name) = body.character_name {
        let trimmed = name.trim().to_string();
        if trimmed.is_empty() {
            return Err(EmotionTtsError::validation("characterName cannot be empty"));
        }
        let new_lower = trimmed.to_lowercase();
        if new_lower != row.character_name_lower {
            if let Some(clash) = state
                .repos
                .mappings
                .find_by_character(&row.deployment_id, &new_lower)
                .await?
            {
                if clash.mapping_id != row.mapping_id {
                    return Err(EmotionTtsError::Conflict(format!(
                        "mapping for {trimmed:?} already exists (case-insensitive)"
                    )));
                }
            }
            row.character_name_lower = new_lower;
        }
        row.character_name = trimmed;
    }
    if let Some(speaker) = body.speaker_voice_asset_id {
        row.speaker_voice_asset_id = VoiceAssetId::try_from(speaker.as_str())?;
    }
    if let Some(mode) = body.default_emotion_mode {
        if !matches!(
            mode.as_str(),
            "none" | "audio_ref" | "vector_preset" | "qwen_template"
        ) {
            return Err(EmotionTtsError::validation("defaultEmotionMode invalid"));
        }
        row.default_emotion_mode = mode;
    }
    if let Some(emo) = body.default_emotion_voice_asset_id {
        row.default_emotion_voice_asset_id = emo
            .as_deref()
            .map(VoiceAssetId::try_from)
            .transpose()?;
    }
    if let Some(preset) = body.default_vector_preset_id {
        row.default_vector_preset_id = preset
            .as_deref()
            .map(PresetId::try_from)
            .transpose()?;
    }
    if let Some(tmpl) = body.default_qwen_template {
        row.default_qwen_template = tmpl;
    }
    if let Some(speed) = body.default_speed_factor {
        if let Some(v) = speed {
            if !(0.5..=2.0).contains(&v) {
                return Err(EmotionTtsError::validation("defaultSpeedFactor must be 0.5..=2.0"));
            }
        }
        row.default_speed_factor = speed;
    }
    if let Some(notes) = body.notes {
        row.notes = notes;
    }
    row.updated_at = Utc::now().timestamp();
    state.repos.mappings.update(&row).await?;
    Ok(row)
}

async fn delete_mapping(
    State(state): State<Arc<MappingsState>>,
    Path(id): Path<String>,
) -> Response {
    let id = match MappingId::try_from(id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.mappings.deactivate(&id).await {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(err) => err.into_response(),
    }
}

async fn duplicate(
    State(state): State<Arc<MappingsState>>,
    Path(id): Path<String>,
    Json(body): Json<DuplicateBody>,
) -> Response {
    match duplicate_impl(&state, &id, body).await {
        Ok(row) => (StatusCode::CREATED, Json(mapping_json(&row))).into_response(),
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct DuplicateBody {
    target_deployment_id: String,
    #[serde(default)]
    override_character_name: Option<String>,
}

async fn duplicate_impl(
    state: &MappingsState,
    id: &str,
    body: DuplicateBody,
) -> Result<CharacterMappingRow> {
    let mid = MappingId::try_from(id)?;
    let src = state
        .repos
        .mappings
        .get(&mid)
        .await?
        .ok_or_else(|| EmotionTtsError::not_found(format!("mapping {mid}")))?;

    let target_dep = DeploymentId::try_from(body.target_deployment_id.as_str())?;
    let name = body
        .override_character_name
        .unwrap_or_else(|| src.character_name.clone())
        .trim()
        .to_string();
    if name.is_empty() {
        return Err(EmotionTtsError::validation("duplicate name cannot be empty"));
    }
    let name_lower = name.to_lowercase();
    if state
        .repos
        .mappings
        .find_by_character(&target_dep, &name_lower)
        .await?
        .is_some()
    {
        return Err(EmotionTtsError::Conflict(format!(
            "target deployment already has mapping {name:?}"
        )));
    }

    let now = Utc::now().timestamp();
    let row = CharacterMappingRow {
        mapping_id: MappingId::new(),
        deployment_id: target_dep,
        character_name: name,
        character_name_lower: name_lower,
        speaker_voice_asset_id: src.speaker_voice_asset_id,
        default_emotion_mode: src.default_emotion_mode,
        default_emotion_voice_asset_id: src.default_emotion_voice_asset_id,
        default_vector_preset_id: src.default_vector_preset_id,
        default_qwen_template: src.default_qwen_template,
        default_speed_factor: src.default_speed_factor,
        default_generation_overrides_json: src.default_generation_overrides_json,
        is_active: true,
        notes: src.notes,
        created_at: now,
        updated_at: now,
    };
    state.repos.mappings.insert(&row).await?;
    Ok(row)
}

async fn export(
    State(state): State<Arc<MappingsState>>,
    Query(query): Query<ListQuery>,
) -> Response {
    let dep = match DeploymentId::try_from(query.deployment_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    match state.repos.mappings.list_by_deployment(&dep).await {
        Ok(rows) => {
            let items: Vec<Value> = rows.iter().map(mapping_json).collect();
            (
                StatusCode::OK,
                Json(json!({
                    "version": "1",
                    "deploymentId": dep.as_str(),
                    "mappings": items,
                })),
            )
                .into_response()
        }
        Err(err) => err.into_response(),
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ImportBody {
    target_deployment_id: String,
    mappings: Vec<ImportMapping>,
    #[serde(default)]
    conflict_strategy: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ImportMapping {
    character_name: String,
    speaker_voice_asset_id: String,
    #[serde(default = "default_emotion_mode")]
    default_emotion_mode: String,
    #[serde(default)]
    default_emotion_voice_asset_id: Option<String>,
    #[serde(default)]
    default_vector_preset_id: Option<String>,
    #[serde(default)]
    default_qwen_template: Option<String>,
    #[serde(default)]
    default_speed_factor: Option<f64>,
    #[serde(default)]
    notes: Option<String>,
}

async fn import(
    State(state): State<Arc<MappingsState>>,
    Json(body): Json<ImportBody>,
) -> Response {
    match import_impl(&state, body).await {
        Ok(v) => (StatusCode::CREATED, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn import_impl(state: &MappingsState, body: ImportBody) -> Result<Value> {
    let dep = DeploymentId::try_from(body.target_deployment_id.as_str())?;
    let strategy = body.conflict_strategy.unwrap_or_else(|| "error".into());

    let mut created: Vec<String> = Vec::new();
    let mut skipped: Vec<String> = Vec::new();
    let mut replaced: Vec<String> = Vec::new();

    let now = Utc::now().timestamp();
    for m in body.mappings {
        let name = m.character_name.trim().to_string();
        if name.is_empty() {
            return Err(EmotionTtsError::validation("mapping has empty characterName"));
        }
        let name_lower = name.to_lowercase();
        let existing = state
            .repos
            .mappings
            .find_by_character(&dep, &name_lower)
            .await?;

        if let Some(target) = existing {
            match strategy.as_str() {
                "skip" => {
                    skipped.push(name);
                    continue;
                }
                "replace" => {
                    let mut replaced_row = target;
                    replaced_row.speaker_voice_asset_id =
                        VoiceAssetId::try_from(m.speaker_voice_asset_id.as_str())?;
                    replaced_row.default_emotion_mode = m.default_emotion_mode;
                    replaced_row.default_emotion_voice_asset_id = m
                        .default_emotion_voice_asset_id
                        .as_deref()
                        .map(VoiceAssetId::try_from)
                        .transpose()?;
                    replaced_row.default_vector_preset_id = m
                        .default_vector_preset_id
                        .as_deref()
                        .map(PresetId::try_from)
                        .transpose()?;
                    replaced_row.default_qwen_template = m.default_qwen_template;
                    replaced_row.default_speed_factor = m.default_speed_factor;
                    replaced_row.notes = m.notes;
                    replaced_row.updated_at = now;
                    state.repos.mappings.update(&replaced_row).await?;
                    replaced.push(name);
                    continue;
                }
                _ => {
                    return Err(EmotionTtsError::Conflict(format!(
                        "mapping {name:?} already exists; use conflictStrategy=skip|replace"
                    )));
                }
            }
        }

        let row = CharacterMappingRow {
            mapping_id: MappingId::new(),
            deployment_id: dep.clone(),
            character_name: name.clone(),
            character_name_lower: name_lower,
            speaker_voice_asset_id: VoiceAssetId::try_from(m.speaker_voice_asset_id.as_str())?,
            default_emotion_mode: m.default_emotion_mode,
            default_emotion_voice_asset_id: m
                .default_emotion_voice_asset_id
                .as_deref()
                .map(VoiceAssetId::try_from)
                .transpose()?,
            default_vector_preset_id: m
                .default_vector_preset_id
                .as_deref()
                .map(PresetId::try_from)
                .transpose()?,
            default_qwen_template: m.default_qwen_template,
            default_speed_factor: m.default_speed_factor,
            default_generation_overrides_json: "{}".into(),
            is_active: true,
            notes: m.notes,
            created_at: now,
            updated_at: now,
        };
        state.repos.mappings.insert(&row).await?;
        created.push(name);
    }

    Ok(json!({
        "created": created,
        "skipped": skipped,
        "replaced": replaced,
    }))
}

fn mapping_json(row: &CharacterMappingRow) -> Value {
    json!({
        "mappingId": row.mapping_id.as_str(),
        "deploymentId": row.deployment_id.as_str(),
        "characterName": row.character_name,
        "speakerVoiceAssetId": row.speaker_voice_asset_id.as_str(),
        "defaultEmotionMode": row.default_emotion_mode,
        "defaultEmotionVoiceAssetId": row.default_emotion_voice_asset_id.as_ref().map(|v| v.as_str()),
        "defaultVectorPresetId": row.default_vector_preset_id.as_ref().map(|v| v.as_str()),
        "defaultQwenTemplate": row.default_qwen_template,
        "defaultSpeedFactor": row.default_speed_factor,
        "isActive": row.is_active,
        "notes": row.notes,
        "createdAt": row.created_at,
        "updatedAt": row.updated_at,
    })
}
