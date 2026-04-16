use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::execute::DeploymentExecuteService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::sync::Arc;

#[tokio::test]
async fn execute_creates_run_link_with_context_hash() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let repo: Arc<dyn DeploymentRepository> = Arc::new(SqliteDeploymentRepository::new(
        DeploymentMappers::new(db.pool().clone()),
    ));
    let save = DeploymentSaveService::new(repo.clone());

    sqlx::query("INSERT INTO workflows (id, title, version, nodes, edges, created_at, updated_at) VALUES ('wf1','S','1','[]','[]','2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')")
        .execute(db.pool()).await.unwrap();
    sqlx::query("INSERT INTO runs (id, workflow_id, workflow_version, status, created_at) VALUES ('run_seed','wf1','1','created','2026-04-15T00:00:00Z')")
        .execute(db.pool()).await.unwrap();

    let req = SaveRequest {
        display_name: "x".into(),
        slug: "x".into(),
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
        workflow_payload: json!({"nodes":[],"edges":[]}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let (saved, _) = save.save(req).await.unwrap();

    sqlx::query("INSERT INTO runs (id, workflow_id, workflow_version, status, created_at) VALUES ('run_real','wf1','1','created','2026-04-15T00:00:00Z')")
        .execute(db.pool()).await.unwrap();

    let exec = DeploymentExecuteService::new(repo.clone());
    let (result, events) = exec
        .execute(
            &saved.deployment_id,
            None,
            &json!({"prompt": "hi"}),
            "run_real",
        )
        .await
        .unwrap();
    assert_eq!(result.execution_context_hash.len(), 64);
    assert_eq!(result.revision_id, saved.revision_id);
    assert_eq!(events.len(), 1);

    let link_count: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM deployment_run_links WHERE deployment_id = ?")
            .bind(saved.deployment_id.as_str())
            .fetch_one(db.pool())
            .await
            .unwrap();
    assert_eq!(link_count, 1);
}
