//! Tests for the `base_workflow_ref` / `base_workflow_version_ref` round-trip
//! on `RevisionRow` and the `source_recipe_id` projection on `DeploymentRow`.
//!
//! These are the TDD RED tests that drive the implementation:
//!   - `RevisionRow` must expose `base_workflow_ref` + `base_workflow_version_ref`.
//!   - `DeploymentRow` must expose `source_recipe_id` when the primary source link
//!     has `source_kind='recipe'`.

use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

async fn fresh_repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        db.pool().clone(),
    )))
}

fn base_req(slug: &str) -> SaveRequest {
    SaveRequest {
        display_name: slug.into(),
        slug: slug.into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: None,
            workflow_version: None,
            recipe_id: None,
            recipe_version: None,
            extension_id: None,
            source_kind: "workflow".into(),
        },
        workflow_payload: json!({"x": slug}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}

/// A revision saved with `workflow_id` + `workflow_version` must return both
/// values back through `fetch_revision`.
#[tokio::test]
async fn fetch_revision_returns_base_workflow_pin() {
    let repo = fresh_repo().await;
    let svc = DeploymentSaveService::new(repo.clone());

    let mut req = base_req("pin-test");
    req.source.workflow_id = Some("wf_abc123".into());
    req.source.workflow_version = Some("v7".into());
    req.source.source_kind = "user".into();

    let (saved, _) = svc.save(req).await.unwrap();
    let rev = repo.fetch_revision(&saved.revision_id).await.unwrap();

    assert_eq!(
        rev.base_workflow_ref.as_deref(),
        Some("wf_abc123"),
        "base_workflow_ref must round-trip"
    );
    assert_eq!(
        rev.base_workflow_version_ref.as_deref(),
        Some("v7"),
        "base_workflow_version_ref must round-trip"
    );
}

/// A revision saved without workflow pin columns must return `None` for both.
#[tokio::test]
async fn fetch_revision_base_pin_is_none_when_unset() {
    let repo = fresh_repo().await;
    let svc = DeploymentSaveService::new(repo.clone());

    let req = base_req("no-pin-test");
    let (saved, _) = svc.save(req).await.unwrap();
    let rev = repo.fetch_revision(&saved.revision_id).await.unwrap();

    assert!(
        rev.base_workflow_ref.is_none(),
        "base_workflow_ref must be None when not set"
    );
    assert!(
        rev.base_workflow_version_ref.is_none(),
        "base_workflow_version_ref must be None when not set"
    );
}

/// A deployment whose primary source link is `source_kind='recipe'` must expose
/// `source_recipe_id = Some(recipe_id)`.  A `source_kind='user'` deployment
/// must return `source_recipe_id = None`.
#[tokio::test]
async fn deployment_projects_source_recipe_id() {
    let repo = fresh_repo().await;
    let svc = DeploymentSaveService::new(repo.clone());

    // Recipe-sourced deployment.
    let mut recipe_req = base_req("recipe-dep");
    recipe_req.source.recipe_id = Some("rcp_42".into());
    recipe_req.source.source_kind = "recipe".into();
    let (recipe_saved, _) = svc.save(recipe_req).await.unwrap();

    // User-workflow-sourced deployment.
    let mut user_req = base_req("user-dep");
    user_req.source.workflow_id = Some("wf_99".into());
    user_req.source.source_kind = "user".into();
    let (user_saved, _) = svc.save(user_req).await.unwrap();

    // Advance both deployments to have a current_revision_id so the JOIN fires.
    repo.advance_current_revision(&recipe_saved.deployment_id, &recipe_saved.revision_id, None)
        .await
        .unwrap();
    repo.advance_current_revision(&user_saved.deployment_id, &user_saved.revision_id, None)
        .await
        .unwrap();

    let recipe_dep = repo
        .fetch_deployment(&recipe_saved.deployment_id)
        .await
        .unwrap();
    assert_eq!(
        recipe_dep.source_recipe_id.as_deref(),
        Some("rcp_42"),
        "recipe deployment must expose source_recipe_id"
    );
    assert!(
        recipe_dep.source_workflow_id.is_none(),
        "recipe deployment must not expose source_workflow_id"
    );

    let user_dep = repo
        .fetch_deployment(&user_saved.deployment_id)
        .await
        .unwrap();
    assert!(
        user_dep.source_recipe_id.is_none(),
        "user-workflow deployment must not expose source_recipe_id"
    );
    assert_eq!(
        user_dep.source_workflow_id.as_deref(),
        Some("wf_99"),
        "user-workflow deployment must expose source_workflow_id"
    );
}
