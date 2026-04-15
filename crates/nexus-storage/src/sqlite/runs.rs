use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_run(pool: &SqlitePool, r: &RunRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/runs/insert.sql"))
        .bind(&r.id)
        .bind(&r.workflow_id)
        .bind(&r.workflow_version)
        .bind(&r.status)
        .bind(&r.started_at)
        .bind(&r.completed_at)
        .bind(&r.error)
        .bind(&r.created_at)
        .bind(&r.run_label)
        .bind(&r.execution_profile)
        .bind(&r.predecessor_run_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_run(pool: &SqlitePool, id: &str) -> Result<RunRecord, StorageError> {
    sqlx::query(include_str!("../../queries/runs/get_by_id.sql"))
        .bind(id)
        .map(map_run_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "run".into(),
            id: id.into(),
        })
}

pub async fn list_runs(pool: &SqlitePool) -> Result<Vec<RunRecord>, StorageError> {
    Ok(sqlx::query(include_str!("../../queries/runs/list.sql"))
        .map(map_run_row)
        .fetch_all(pool)
        .await?)
}

pub async fn update_run_status(
    pool: &SqlitePool,
    id: &str,
    status: &str,
    error: Option<&str>,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/runs/update_status.sql"))
        .bind(status)
        .bind(error)
        .bind(id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "run".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn insert_node_execution(
    pool: &SqlitePool,
    r: &NodeExecutionRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/node_executions/insert.sql"))
        .bind(&r.run_id)
        .bind(&r.node_id)
        .bind(&r.status)
        .bind(&r.worker_id)
        .bind(&r.started_at)
        .bind(&r.completed_at)
        .bind(r.duration_ms)
        .bind(&r.error)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_node_executions_for_run(
    pool: &SqlitePool,
    run_id: &str,
) -> Result<Vec<NodeExecutionRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/node_executions/get_for_run.sql"
    ))
    .bind(run_id)
    .map(map_node_execution_row)
    .fetch_all(pool)
    .await?)
}

pub async fn update_node_execution(
    pool: &SqlitePool,
    run_id: &str,
    node_id: &str,
    status: &str,
    worker_id: Option<&str>,
    duration_ms: Option<i64>,
    error: Option<&str>,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/node_executions/update.sql"))
        .bind(status)
        .bind(worker_id)
        .bind(duration_ms)
        .bind(error)
        .bind(run_id)
        .bind(node_id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "node_execution".into(),
            id: format!("{run_id}/{node_id}"),
        });
    }
    Ok(())
}
