//! `POST /api/v1/modules/{module_id}/deployments` sugar endpoint (FR-028).
//!
//! Resolves `{extension, recipe, default_workflow}` from the module identifier
//! plus optional `recipe_id` override, synthesizes a deterministic `SaveRequest`,
//! and delegates to [`DeploymentSaveService::save`]. The synthesized payload
//! folds runtime/model/parameter/workflow overrides into the workflow JSON so
//! [`EffectiveWorkflowHash`](nexus_deployments::hash::EffectiveWorkflowHash)
//! distinguishes per-instance variants (SC-004, T214 multi-instance hashes).

use std::sync::Arc;

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{Database, DeploymentMappers, RecipeRecord};
use serde_json::json;
use uuid::Uuid;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::envelope::{DeployFromModuleRequest, RecipeRef};
use super::module_id::{ModuleId, ModuleIdKind};

pub async fn create(
    State(state): State<AppState>,
    Path(module_id_raw): Path<String>,
    Json(body): Json<DeployFromModuleRequest>,
) -> Result<impl IntoResponse, ApiError> {
    let module_id = ModuleId::parse(module_id_raw).map_err(|_| {
        ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.invalid_id",
            "module_id does not match the expected shape",
        )
    })?;

    if module_id.is_draft() {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by /modules/user:draft:{uuid}/materialize",
        ));
    }

    let resolved = match module_id.kind() {
        ModuleIdKind::Extension { extension_id } => {
            resolve_extension_blueprint(&state, &extension_id, body.recipe_id.as_deref()).await?
        }
        ModuleIdKind::User { workflow_id } => resolve_user_blueprint(&state, &workflow_id).await?,
        ModuleIdKind::Blank => {
            return Err(ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "module.no_blueprint",
                "the blank module cannot be deployed — use the materialize endpoint",
            ));
        }
        ModuleIdKind::Draft { .. } => unreachable!("guarded above by is_draft()"),
    };

    let request = build_save_request(&module_id, &resolved, &body);

    let mappers = DeploymentMappers::new(state.db.pool().clone());
    let repo = Arc::new(SqliteDeploymentRepository::new(mappers));
    let svc = DeploymentSaveService::new(repo);
    let (saved, _events) = svc
        .save(request)
        .await
        .map_err(|e| ApiError::Internal(format!("deployment save failed: {e}")))?;

    Ok((StatusCode::CREATED, Json(ApiResponse::ok(saved))))
}

struct ResolvedBlueprint {
    source_kind: &'static str,
    extension_id: Option<String>,
    extension_version: Option<String>,
    recipe: Option<RecipeRef>,
    workflow_template_ref: Option<String>,
    workflow_id_for_source: Option<String>,
}

async fn resolve_extension_blueprint(
    state: &AppState,
    extension_id: &str,
    requested_recipe_id: Option<&str>,
) -> Result<ResolvedBlueprint, ApiError> {
    let ext = nexus_storage::sqlite::extensions::get_extension(state.db.pool(), extension_id)
        .await
        .map_err(|_| {
            ApiError::structured(
                StatusCode::NOT_FOUND,
                "module.not_found",
                "extension not found",
            )
        })?;

    if ext.status == "disabled" {
        return Err(ApiError::structured(
            StatusCode::CONFLICT,
            "module.disabled",
            "extension is disabled — enable it before deploying",
        ));
    }

    let all_recipes = state.db.list_recipes().await.map_err(ApiError::from)?;
    let mut for_ext: Vec<RecipeRecord> = all_recipes
        .into_iter()
        .filter(|r| r.extension_id == ext.id)
        .collect();
    if for_ext.is_empty() {
        return Err(ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "module.no_blueprint",
            "module has no blueprints",
        ));
    }
    for_ext.sort_by(|a, b| a.id.cmp(&b.id));

    let chosen = match requested_recipe_id {
        Some(req) => for_ext
            .iter()
            .find(|r| r.id == req)
            .cloned()
            .ok_or_else(|| {
                ApiError::structured(
                    StatusCode::UNPROCESSABLE_ENTITY,
                    "module.recipe_not_in_module",
                    "recipe_id is not in this module's blueprints",
                )
            })?,
        None => match ext.primary_recipe_id.as_ref() {
            Some(primary) => for_ext
                .iter()
                .find(|r| r.id == *primary)
                .cloned()
                .unwrap_or_else(|| for_ext[0].clone()),
            None => for_ext[0].clone(),
        },
    };

    let recipe_ref = RecipeRef {
        recipe_id: chosen.id.clone(),
        display_name: chosen.display_name.clone(),
        description: Some(chosen.summary.clone()).filter(|s| !s.is_empty()),
        step_count: 0,
        tags: Vec::new(),
        is_primary: ext
            .primary_recipe_id
            .as_deref()
            .is_some_and(|p| p == chosen.id),
    };

    Ok(ResolvedBlueprint {
        source_kind: "recipe",
        extension_id: Some(ext.id.clone()),
        extension_version: Some(ext.version.clone()),
        recipe: Some(recipe_ref),
        workflow_template_ref: Some(chosen.workflow_template_ref.clone()),
        workflow_id_for_source: ext.default_workflow_id.clone(),
    })
}

async fn resolve_user_blueprint(
    state: &AppState,
    workflow_id: &str,
) -> Result<ResolvedBlueprint, ApiError> {
    let workflows = state.db.list_workflows().await.map_err(ApiError::from)?;
    let wfl = workflows
        .into_iter()
        .find(|w| w.id == workflow_id)
        .ok_or_else(|| {
            ApiError::structured(
                StatusCode::NOT_FOUND,
                "module.not_found",
                "user workflow not found",
            )
        })?;
    Ok(ResolvedBlueprint {
        source_kind: "user",
        extension_id: None,
        extension_version: None,
        recipe: None,
        workflow_template_ref: None,
        workflow_id_for_source: Some(wfl.id),
    })
}

fn build_save_request(
    module_id: &ModuleId,
    resolved: &ResolvedBlueprint,
    body: &DeployFromModuleRequest,
) -> SaveRequest {
    let recipe_id = resolved.recipe.as_ref().map(|r| r.recipe_id.clone());
    let display_name = body
        .display_name
        .clone()
        .or_else(|| resolved.recipe.as_ref().map(|r| r.display_name.clone()))
        .unwrap_or_else(|| module_id.as_str().to_string());

    let workflow_payload = json!({
        "module_id": module_id.as_str(),
        "extension_id": resolved.extension_id,
        "extension_version": resolved.extension_version,
        "recipe_id": recipe_id,
        "workflow_template_ref": resolved.workflow_template_ref,
        "workflow_patch": body.workflow_patch.clone().unwrap_or(serde_json::Value::Null),
        "runtime_binding_overrides": body
            .runtime_binding_overrides
            .clone()
            .unwrap_or(serde_json::Value::Null),
        "model_binding_overrides": body
            .model_binding_overrides
            .clone()
            .unwrap_or(serde_json::Value::Null),
        "parameter_overlays": body
            .parameter_overlays
            .clone()
            .unwrap_or(serde_json::Value::Null),
    });

    let kebab = display_name
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() {
                c.to_ascii_lowercase()
            } else {
                '-'
            }
        })
        .collect::<String>();
    let slug = format!("{kebab}-{}", Uuid::new_v4().simple());

    SaveRequest {
        display_name,
        slug,
        workspace_id: None,
        description: None,
        tags: Vec::new(),
        created_from_surface: "modules".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: resolved.workflow_id_for_source.clone(),
            workflow_version: None,
            recipe_id,
            recipe_version: None,
            extension_id: resolved.extension_id.clone(),
            source_kind: resolved.source_kind.into(),
        },
        workflow_payload,
        runtime_binding: None,
        model_binding: None,
        parameters: Vec::new(),
        artifacts: Vec::new(),
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}
