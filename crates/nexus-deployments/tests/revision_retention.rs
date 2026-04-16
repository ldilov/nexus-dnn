use nexus_deployments::error::DeploymentError;
use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::execute::DeploymentExecuteService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

async fn fixture() -> (Arc<dyn DeploymentRepository>, SqliteDatabase) {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    sqlx::query("INSERT INTO workflows (id, title, version, nodes, edges, created_at, updated_at) VALUES ('wf1','S','1','[]','[]','2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')")
        .execute(db.pool()).await.unwrap();
    sqlx::query("INSERT INTO runs (id, workflow_id, workflow_version, status, created_at) VALUES ('run1','wf1','1','created','2026-04-15T00:00:00Z')")
        .execute(db.pool()).await.unwrap();
    let repo: Arc<dyn DeploymentRepository> = Arc::new(SqliteDeploymentRepository::new(
        DeploymentMappers::new(db.pool().clone()),
    ));
    (repo, db)
}

fn req(slug: &str) -> SaveRequest {
    SaveRequest {
        display_name: slug.into(),
        slug: slug.into(),
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

#[tokio::test]
async fn revision_referenced_by_run_is_undeletable() {
    let (repo, _db) = fixture().await;
    let save = DeploymentSaveService::new(repo.clone());
    let (saved, _) = save.save(req("a")).await.unwrap();

    let exec = DeploymentExecuteService::new(repo.clone());
    let _ = exec
        .execute(&saved.deployment_id, None, &json!({}), "run1")
        .await
        .unwrap();

    let err = repo.delete_revision(&saved.revision_id).await.unwrap_err();
    match err {
        DeploymentError::RevisionReferencedByRuns(n) => assert_eq!(n, 1),
        other => panic!("expected RevisionReferencedByRuns, got {other:?}"),
    }
}

#[tokio::test]
async fn many_revisions_persist_indefinitely() {
    let (repo, _db) = fixture().await;
    let save = DeploymentSaveService::new(repo.clone());
    for i in 0..25 {
        save.save(req(&format!("d-{i}"))).await.unwrap();
    }
    let list = repo
        .list(&nexus_deployments::repository::ListFilter {
            limit: Some(100),
            ..Default::default()
        })
        .await
        .unwrap();
    assert_eq!(list.len(), 25);
}
