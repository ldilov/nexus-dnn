use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::load::DeploymentLoadService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::{MappingState, RestoreState};
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

#[tokio::test]
async fn load_returns_fully_restorable_for_clean_deployment() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let repo: Arc<dyn DeploymentRepository> = Arc::new(SqliteDeploymentRepository::new(
        DeploymentMappers::new(db.pool().clone()),
    ));
    let save = DeploymentSaveService::new(repo.clone());
    let req = SaveRequest {
        display_name: "load-1".into(),
        slug: "load-1".into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf1".into()),
            workflow_version: Some("1".into()),
            recipe_id: None,
            recipe_version: None,
            extension_id: None,
            source_kind: "workflow".into(),
        },
        workflow_payload: json!({"x": 1}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let (saved, _) = save.save(req).await.unwrap();

    let load = DeploymentLoadService::new(repo);
    let (result, events) = load.load(&saved.deployment_id, None).await.unwrap();
    assert_eq!(result.restore_state, RestoreState::FullyRestorable);
    assert_eq!(
        result.revision.effective_workflow_hash,
        saved.effective_workflow_hash
    );
    assert_eq!(events.len(), 1);
}
