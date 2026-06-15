use std::collections::BTreeMap;

use serde_json::Value;

use nexus_extension::ExtensionRegistry;
use nexus_recipe::{RecipeProjection, compile_recipe_run, snapshot_to_workflow};
use nexus_run::ResolvedRunInput;
use nexus_storage::Database;
use nexus_storage::records::RecipeRecord;

use crate::AppState;
use crate::error::ApiError;

/// Compile a recipe's controls through the binding compiler against its pinned
/// workflow-version snapshot, persist the frozen graph, and launch execution.
/// Returns the new run id. Generic — no extension-id knowledge.
pub async fn compile_and_launch(
    state: &AppState,
    recipe: &RecipeRecord,
    control_values: BTreeMap<String, Value>,
    preset_id: Option<String>,
) -> Result<String, ApiError> {
    let workflow_id = recipe
        .workflow_id
        .as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned to a workflow".into()))?;
    let version = recipe
        .workflow_version
        .as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned to a workflow version".into()))?;

    let projection: RecipeProjection = match recipe.projection.as_deref() {
        Some(p) => serde_json::from_str(p)
            .map_err(|e| ApiError::BadRequest(format!("invalid recipe projection: {e}")))?,
        None => RecipeProjection::default(),
    };

    let version_rec = state
        .db
        .get_workflow_version(workflow_id, version)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let head = state
        .db
        .get_workflow(workflow_id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let workflow = snapshot_to_workflow(&head.title, &version_rec)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let operators = state.extension_registry.list_operators();

    let resolved = compile_recipe_run(
        &projection,
        &workflow,
        version,
        &operators,
        &control_values,
        preset_id.as_deref(),
    )
    .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let workflow_json = serde_json::to_string(&resolved.resolved_workflow)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let inputs_values_json = serde_json::to_string(&resolved.resolved_inputs)
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let run_id = state
        .run_engine
        .create_run_from_resolved(&ResolvedRunInput {
            workflow_id: resolved.workflow_id,
            workflow_version: resolved.workflow_version,
            workflow_json,
            inputs_values_json,
        })
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let engine = state.run_engine.clone();
    let rid = run_id.clone();
    tokio::spawn(async move {
        if let Err(e) = engine.execute_run(&rid).await {
            tracing::error!(run_id = %rid, error = %e, "recipe run execution failed");
        }
    });

    Ok(run_id)
}
