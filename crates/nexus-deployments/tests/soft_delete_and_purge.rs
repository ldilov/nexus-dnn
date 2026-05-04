use nexus_deployments::error::DeploymentError;
use nexus_deployments::id::DeploymentId;
use nexus_deployments::repository::{DeploymentRepository, ListFilter};
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use std::str::FromStr;
use std::sync::Arc;

async fn fresh_repo() -> Arc<dyn DeploymentRepository> {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let mappers = DeploymentMappers::new(db.pool().clone());
    Arc::new(SqliteDeploymentRepository::new(mappers))
}

fn req(slug: &str) -> SaveRequest {
    SaveRequest {
        display_name: format!("Display {slug}"),
        slug: slug.into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "test".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf.test".into()),
            workflow_version: Some("v1".into()),
            recipe_id: None,
            recipe_version: None,
            extension_id: None,
            source_kind: "user".into(),
        },
        workflow_payload: json!({"nodes": [], "edges": []}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}

async fn make_one(repo: &Arc<dyn DeploymentRepository>, slug: &str) -> DeploymentId {
    let svc = DeploymentSaveService::new(repo.clone());
    let (saved, _) = svc.save(req(slug)).await.unwrap();
    saved.deployment_id
}

#[tokio::test]
async fn soft_delete_hides_row_from_default_list() {
    let repo = fresh_repo().await;
    let id = make_one(&repo, "soft-delete-me").await;

    let pre = repo.list(&ListFilter::default()).await.unwrap();
    assert_eq!(pre.len(), 1, "deployment should be visible before delete");

    repo.soft_delete(&id).await.unwrap();

    let post = repo.list(&ListFilter::default()).await.unwrap();
    assert!(
        post.is_empty(),
        "soft-deleted deployment must not appear in default listing"
    );
}

#[tokio::test]
async fn soft_delete_visible_with_include_deleted_flag() {
    let repo = fresh_repo().await;
    let id = make_one(&repo, "tombstone-me").await;
    repo.soft_delete(&id).await.unwrap();

    let with_deleted = repo
        .list(&ListFilter {
            include_deleted: Some(true),
            ..Default::default()
        })
        .await
        .unwrap();
    assert_eq!(with_deleted.len(), 1);
    let row = &with_deleted[0];
    assert_eq!(row.id, id);
    assert!(
        row.deleted_at.is_some(),
        "deleted_at should be populated on tombstoned row"
    );
}

#[tokio::test]
async fn purge_after_soft_delete_removes_row_permanently() {
    let repo = fresh_repo().await;
    let id = make_one(&repo, "purge-me").await;
    repo.soft_delete(&id).await.unwrap();
    repo.purge(&id).await.unwrap();

    let with_deleted = repo
        .list(&ListFilter {
            include_deleted: Some(true),
            ..Default::default()
        })
        .await
        .unwrap();
    assert!(
        with_deleted.is_empty(),
        "purged deployment should be gone from every listing"
    );

    let fetched = repo.fetch_deployment(&id).await;
    assert!(matches!(fetched, Err(DeploymentError::NotFound(_))));
}

#[tokio::test]
async fn purge_without_soft_delete_returns_conflict() {
    let repo = fresh_repo().await;
    let id = make_one(&repo, "still-live").await;

    let result = repo.purge(&id).await;
    assert!(
        matches!(result, Err(DeploymentError::PurgeRequiresSoftDeleteFirst)),
        "purging a live row must require soft-delete first; got {result:?}"
    );

    // Row should still be present.
    let live = repo.list(&ListFilter::default()).await.unwrap();
    assert_eq!(live.len(), 1);
}

#[tokio::test]
async fn delete_unknown_id_returns_not_found() {
    let repo = fresh_repo().await;
    let unknown = DeploymentId::from_str("dpl_does_not_exist").unwrap();

    let soft = repo.soft_delete(&unknown).await;
    assert!(matches!(soft, Err(DeploymentError::NotFound(_))));

    let purge = repo.purge(&unknown).await;
    assert!(matches!(purge, Err(DeploymentError::NotFound(_))));
}

#[tokio::test]
async fn soft_delete_is_idempotent_on_second_call() {
    let repo = fresh_repo().await;
    let id = make_one(&repo, "double-delete").await;

    repo.soft_delete(&id).await.unwrap();
    let second = repo.soft_delete(&id).await;
    // Second soft-delete on an already-tombstoned row reports NotFound
    // (the UPDATE matched no live row). The handler treats this as 404.
    assert!(matches!(second, Err(DeploymentError::NotFound(_))));
}
