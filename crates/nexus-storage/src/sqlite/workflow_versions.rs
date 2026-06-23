use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::WorkflowVersionRecord;
use crate::row_mapping::map_workflow_version_row;

pub async fn insert_workflow_version(
    pool: &SqlitePool,
    r: &WorkflowVersionRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/workflow_versions/insert.sql"))
        .bind(&r.workflow_id)
        .bind(&r.version)
        .bind(&r.label)
        .bind(&r.canonical_hash)
        .bind(&r.operator_schema_hash)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.stages)
        .bind(&r.author_kind)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_workflow_versions(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<Vec<WorkflowVersionRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/workflow_versions/list_by_workflow.sql"
    ))
    .bind(workflow_id)
    .map(map_workflow_version_row)
    .fetch_all(pool)
    .await?)
}

pub async fn get_workflow_version(
    pool: &SqlitePool,
    workflow_id: &str,
    version: &str,
) -> Result<WorkflowVersionRecord, StorageError> {
    sqlx::query(include_str!("../../queries/workflow_versions/get_one.sql"))
        .bind(workflow_id)
        .bind(version)
        .map(map_workflow_version_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "workflow_version".into(),
            id: format!("{workflow_id}@{version}"),
        })
}

pub async fn latest_workflow_version_for_author(
    pool: &SqlitePool,
    workflow_id: &str,
    author_kind: &str,
) -> Result<Option<WorkflowVersionRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/workflow_versions/latest_by_author.sql"
    ))
    .bind(workflow_id)
    .bind(author_kind)
    .map(map_workflow_version_row)
    .fetch_optional(pool)
    .await?)
}

pub async fn count_workflow_versions(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<i64, StorageError> {
    let count: i64 = sqlx::query_scalar(include_str!(
        "../../queries/workflow_versions/count_by_workflow.sql"
    ))
    .bind(workflow_id)
    .fetch_one(pool)
    .await?;
    Ok(count)
}

pub async fn set_current_version(
    pool: &SqlitePool,
    workflow_id: &str,
    version: &str,
    updated_at: &str,
) -> Result<(), StorageError> {
    sqlx::query("UPDATE workflows SET current_version = ?, updated_at = ? WHERE id = ?")
        .bind(version)
        .bind(updated_at)
        .bind(workflow_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_current_version(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<Option<String>, StorageError> {
    let value: Option<String> =
        sqlx::query_scalar("SELECT current_version FROM workflows WHERE id = ?")
            .bind(workflow_id)
            .fetch_optional(pool)
            .await?
            .flatten();
    Ok(value)
}
