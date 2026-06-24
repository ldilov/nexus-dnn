use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::RunResolvedGraphRecord;
use crate::row_mapping::map_run_resolved_graph_row;

pub async fn insert_run_resolved_graph(
    pool: &SqlitePool,
    r: &RunResolvedGraphRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/runs/insert_resolved_graph.sql"))
        .bind(&r.run_id)
        .bind(&r.workflow_id)
        .bind(&r.workflow_version)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.stages)
        .bind(&r.resolved_inputs)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_run_resolved_graph(
    pool: &SqlitePool,
    run_id: &str,
) -> Result<RunResolvedGraphRecord, StorageError> {
    sqlx::query(include_str!("../../queries/runs/get_resolved_graph.sql"))
        .bind(run_id)
        .map(map_run_resolved_graph_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "run_resolved_graph".into(),
            id: run_id.into(),
        })
}
