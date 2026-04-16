use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{DeploymentMappers, SqliteDatabase};
use serde_json::json;
use sha2::{Digest, Sha256};
use sqlx::Row;
use sqlx::sqlite::SqlitePool;
use std::sync::Arc;

async fn snapshot_table(pool: &SqlitePool, table: &str) -> [u8; 32] {
    let rows = sqlx::query(&format!("SELECT rowid, * FROM {table} ORDER BY rowid"))
        .fetch_all(pool)
        .await
        .unwrap();
    let mut hasher = Sha256::new();
    hasher.update(format!("rows={}", rows.len()).as_bytes());
    for row in &rows {
        let rowid: i64 = row.try_get("rowid").unwrap_or(0);
        hasher.update(rowid.to_le_bytes());
        hasher.update(b"|");
    }
    let out = hasher.finalize();
    let mut bytes = [0u8; 32];
    bytes.copy_from_slice(&out);
    bytes
}

#[tokio::test]
async fn save_does_not_mutate_workflows_or_recipes() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let pool = db.pool().clone();

    sqlx::query("INSERT INTO workflows (id, title, version, nodes, edges, created_at, updated_at) VALUES ('wf1','Sample','1.0.0','[]','[]','2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')")
        .execute(&pool).await.unwrap();
    sqlx::query("INSERT INTO recipes (id, workflow_id, name, version, schema_json, prompt_template, default_inputs, created_at) VALUES ('rcp1','wf1','Sample','1.0.0','{}','t','{}','2026-04-15T00:00:00Z')")
        .execute(&pool).await.ok();

    let workflows_before = snapshot_table(&pool, "workflows").await;
    let recipes_before = snapshot_table(&pool, "recipes").await;

    let mappers = DeploymentMappers::new(pool.clone());
    let repo = Arc::new(SqliteDeploymentRepository::new(mappers));
    let service = DeploymentSaveService::new(repo);
    let request = SaveRequest {
        display_name: "Test".into(),
        slug: "test-001".into(),
        workspace_id: None,
        description: None,
        tags: vec![],
        created_from_surface: "api".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some("wf1".into()),
            workflow_version: Some("1.0.0".into()),
            recipe_id: Some("rcp1".into()),
            recipe_version: Some("1.0.0".into()),
            extension_id: None,
            source_kind: "workflow".into(),
        },
        workflow_payload: json!({"nodes": [], "edges": []}),
        runtime_binding: None,
        model_binding: None,
        parameters: vec![],
        artifacts: vec![],
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    };
    let _ = service.save(request).await.unwrap();

    let workflows_after = snapshot_table(&pool, "workflows").await;
    let recipes_after = snapshot_table(&pool, "recipes").await;
    assert_eq!(
        workflows_before, workflows_after,
        "workflows mutated by save"
    );
    assert_eq!(recipes_before, recipes_after, "recipes mutated by save");
}
