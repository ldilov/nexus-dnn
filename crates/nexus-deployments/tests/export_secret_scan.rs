use nexus_deployments::error::DeploymentError;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::export::DeploymentExportService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

async fn fixture_repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    Arc::new(SqliteDeploymentRepository::new(DeploymentMappers::new(
        db.pool().clone(),
    )))
}

fn req_with(notes: Option<&str>) -> SaveRequest {
    SaveRequest {
        display_name: "x".into(),
        slug: "x".into(),
        workspace_id: None,
        description: notes.map(String::from),
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf1".into()),
            workflow_version: None,
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
    }
}

#[tokio::test]
async fn export_clean_deployment_succeeds_and_includes_integrity() {
    let repo = fixture_repo().await;
    let save = DeploymentSaveService::new(repo.clone());
    let (saved, _) = save.save(req_with(None)).await.unwrap();
    let exp = DeploymentExportService::new(repo);
    let env = exp.export(&saved.deployment_id).await.unwrap();
    assert_eq!(env.package_version, 1);
    assert_eq!(env.integrity.hash_algo, "sha256-jcs-rfc8785");
    assert_eq!(env.integrity.digest.len(), 64);
}

#[tokio::test]
async fn export_refuses_when_payload_contains_secret_pattern() {
    let repo = fixture_repo().await;
    let save = DeploymentSaveService::new(repo.clone());
    let (saved, _) = save
        .save(req_with(Some("here is my api_key=sk-test-1234")))
        .await
        .unwrap();
    let exp = DeploymentExportService::new(repo);
    let err = exp.export(&saved.deployment_id).await.unwrap_err();
    assert!(matches!(err, DeploymentError::ExportBlockedBySecret));
}
