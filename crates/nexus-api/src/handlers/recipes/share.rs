//! P8 shareability bundle: `GET /recipes/{id}/bundle` (export) and
//! `POST /recipes/import` (validate + recreate the immutable version if absent +
//! create a user recipe). Generic by `{id}` over host-owned rows; zero
//! extension-id / node-id literals (boundary_test). Import never trusts the
//! client-supplied integrity digest — `validate_bundle` recomputes it.

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use nexus_extension::ExtensionRegistry;
use nexus_recipe::{
    BundleError, RecipeBundle, RecipeManifest, RecipeProjection, RecipeStatus,
    export_recipe_bundle, validate_bundle,
};
use nexus_storage::{Database, StorageError};
use nexus_workflow::operator_schema_hash;

use crate::AppState;
use crate::dto::{RecipeImportResultDto, RecipeWritePayloadDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::build_version_record;

use super::run::load_workflow_snapshot;
use super::write::create_user_recipe;

/// Map a [`BundleError`] to a structured 422 (CONTRACTS C4). All bundle faults
/// are client-input faults — never a 500.
fn bundle_error_to_api(err: BundleError) -> ApiError {
    let code = match &err {
        BundleError::UnsupportedVersion { .. } => "BUNDLE_UNSUPPORTED_VERSION",
        BundleError::IntegrityMismatch => "BUNDLE_INTEGRITY",
        BundleError::UnresolvableOperator { .. } => "BUNDLE_UNRESOLVABLE_OPERATOR",
        BundleError::SecretLeak => "BUNDLE_SECRET",
        BundleError::Serialization(_) => "BUNDLE_SERIALIZATION",
    };
    ApiError::structured(StatusCode::UNPROCESSABLE_ENTITY, code, err.to_string())
}

pub async fn export_recipe_bundle_handler(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RecipeBundle>, ApiError> {
    let operators = state.extension_registry.list_operators();
    let recipe = state.db.get_recipe(&id).await.map_err(|e| match e {
        StorageError::NotFound { .. } => ApiError::NotFound(format!("recipe {id} not found")),
        other => ApiError::Internal(other.to_string()),
    })?;

    let snapshot = load_workflow_snapshot(state.db.as_ref(), &recipe, &operators).await?;
    let projection = match recipe.projection.as_deref() {
        Some(json) => serde_json::from_str::<RecipeProjection>(json).map_err(|e| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_PROJECTION_PARSE",
                format!("projection parse failed: {e}"),
            )
        })?,
        None => RecipeProjection::empty(),
    };
    let status = RecipeStatus::from_str(&recipe.status).unwrap_or(RecipeStatus::Healthy);
    let manifest = RecipeManifest {
        display_name: recipe.display_name,
        summary: recipe.summary,
        category: recipe.category,
        recipe_version: recipe.version,
    };

    let bundle = export_recipe_bundle(
        manifest,
        projection,
        &snapshot,
        status,
        recipe.status_reason,
    )
    .map_err(bundle_error_to_api)?;
    Ok(ApiResponse::ok(bundle))
}

pub async fn import_recipe_bundle_handler(
    State(state): State<AppState>,
    Json(bundle): Json<RecipeBundle>,
) -> Result<ApiResponse<RecipeImportResultDto>, ApiError> {
    let operators = state.extension_registry.list_operators();
    validate_bundle(&bundle, &operators).map_err(bundle_error_to_api)?;

    let snap = &bundle.workflow_snapshot;
    let created_workflow_version = match state
        .db
        .get_workflow_version(&snap.workflow_id, &snap.version)
        .await
    {
        Ok(_) => false,
        Err(StorageError::NotFound { .. }) => {
            let workflow = snap.workflow.clone();
            let op_hash = operator_schema_hash(&workflow, &operators);
            let now = chrono::Utc::now().to_rfc3339();
            let mut record = build_version_record(
                &workflow,
                &snap.canonical_hash,
                &op_hash,
                "user",
                None,
                None,
                Some(&workflow.version),
                &now,
            )?;
            record.version = snap.version.clone();
            state
                .db
                .insert_workflow_version(&record)
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;
            true
        }
        Err(other) => return Err(ApiError::Internal(other.to_string())),
    };

    let payload = RecipeWritePayloadDto {
        display_name: bundle.recipe.display_name.clone(),
        summary: bundle.recipe.summary.clone(),
        category: bundle.recipe.category.clone(),
        workflow_id: snap.workflow_id.clone(),
        workflow_version: snap.version.clone(),
        projection: bundle.projection.clone(),
    };
    let created = create_user_recipe(
        state.db.as_ref(),
        &operators,
        payload,
        &bundle.recipe.recipe_version,
    )
    .await?;

    Ok(ApiResponse::ok(RecipeImportResultDto {
        recipe_id: created.id,
        created_workflow_version,
    }))
}
