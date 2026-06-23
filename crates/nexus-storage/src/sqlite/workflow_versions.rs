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
    let res = sqlx::query("UPDATE workflows SET current_version = ?, updated_at = ? WHERE id = ?")
        .bind(version)
        .bind(updated_at)
        .bind(workflow_id)
        .execute(pool)
        .await?;
    if res.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "workflow".into(),
            id: workflow_id.into(),
        });
    }
    Ok(())
}

/// Allocate the next monotonic `vN` and append it as one immutable row, then
/// advance the head — all in a single transaction. Allocation is a single
/// `INSERT ... SELECT count+1 ... RETURNING`, so the version number is computed
/// under the INSERT's write lock; concurrent callers serialize and each gets a
/// distinct version (no `(workflow_id, version)` PK collision). Rolls back if
/// the head `workflows` row is missing. `record.version` is ignored — the
/// server owns the id.
pub async fn append_workflow_version(
    pool: &SqlitePool,
    r: &WorkflowVersionRecord,
    head_updated_at: &str,
) -> Result<String, StorageError> {
    let mut tx = pool.begin().await?;

    let version: String = sqlx::query_scalar(
        "INSERT INTO workflow_versions \
         (workflow_id, version, label, canonical_hash, operator_schema_hash, \
          nodes, edges, inputs, outputs, stages, author_kind, extension_id, \
          extension_version, created_at) \
         SELECT ?, 'v' || (COALESCE((SELECT COUNT(*) FROM workflow_versions WHERE workflow_id = ?), 0) + 1), \
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? \
         RETURNING version",
    )
    .bind(&r.workflow_id)
    .bind(&r.workflow_id)
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
    .fetch_one(&mut *tx)
    .await?;

    let res = sqlx::query("UPDATE workflows SET current_version = ?, updated_at = ? WHERE id = ?")
        .bind(&version)
        .bind(head_updated_at)
        .bind(&r.workflow_id)
        .execute(&mut *tx)
        .await?;
    if res.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "workflow".into(),
            id: r.workflow_id.clone(),
        });
    }

    tx.commit().await?;
    Ok(version)
}

/// Re-point a workflow head to an immutable version's content in ONE atomic
/// UPDATE: rewrite the content columns from `r`, set `current_version` to its
/// id, clear `user_edited_at`, and stamp `updated_at`. Single statement, so the
/// content and the head pointer can never split-brain on partial failure.
/// `head_version` is the human-facing version string written to `workflows.version`.
pub async fn revert_head_to_version(
    pool: &SqlitePool,
    r: &WorkflowVersionRecord,
    head_version: &str,
    now: &str,
) -> Result<(), StorageError> {
    let res = sqlx::query(
        "UPDATE workflows SET version = ?, inputs = ?, outputs = ?, nodes = ?, edges = ?, \
         stages = ?, updated_at = ?, user_edited_at = NULL, current_version = ? WHERE id = ?",
    )
    .bind(head_version)
    .bind(&r.inputs)
    .bind(&r.outputs)
    .bind(&r.nodes)
    .bind(&r.edges)
    .bind(&r.stages)
    .bind(now)
    .bind(&r.version)
    .bind(&r.workflow_id)
    .execute(pool)
    .await?;
    if res.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "workflow".into(),
            id: r.workflow_id.clone(),
        });
    }
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
