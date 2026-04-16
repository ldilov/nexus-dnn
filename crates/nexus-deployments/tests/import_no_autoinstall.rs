use nexus_deployments::repository::DeploymentRepository;
use nexus_deployments::service::export::{ExportEnvelope, Integrity};
use nexus_deployments::service::import::DeploymentImportService;
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use sqlx::Row;
use std::sync::Arc;

#[tokio::test]
async fn import_with_missing_dependency_lands_in_stale_state_no_autoinstall() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let pool = db.pool().clone();

    let extensions_before: i64 = sqlx::query("SELECT COUNT(*) AS c FROM extensions")
        .fetch_one(&pool)
        .await
        .unwrap()
        .try_get("c")
        .unwrap();

    let envelope = ExportEnvelope {
        package_version: 1,
        deployment: json!({"display_name": "imported"}),
        revisions: vec![json!({
            "effective_workflow_hash": "a".repeat(64),
            "mapping_state": "custom"
        })],
        integrity: Integrity {
            hash_algo: "sha256-jcs-rfc8785".into(),
            digest: "0".repeat(64),
        },
    };

    let repo: Arc<dyn DeploymentRepository> = Arc::new(SqliteDeploymentRepository::new(
        DeploymentMappers::new(pool.clone()),
    ));
    let svc = DeploymentImportService::new(repo);
    let (result, _events) = svc
        .import(envelope, vec!["builtin.chatllm".into()])
        .await
        .unwrap();

    assert_eq!(result.state, "stale");
    assert_eq!(result.diagnostics_count, 1);

    let extensions_after: i64 = sqlx::query("SELECT COUNT(*) AS c FROM extensions")
        .fetch_one(&pool)
        .await
        .unwrap()
        .try_get("c")
        .unwrap();
    assert_eq!(
        extensions_before, extensions_after,
        "import must NOT auto-install extensions (SC-008)"
    );
}
