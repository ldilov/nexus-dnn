use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_artifact(pool: &SqlitePool, r: &ArtifactRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/artifacts/insert.sql"))
        .bind(&r.id)
        .bind(&r.artifact_type)
        .bind(&r.run_id)
        .bind(&r.node_id)
        .bind(&r.port_name)
        .bind(&r.content_hash)
        .bind(r.size_bytes)
        .bind(&r.blob_path)
        .bind(&r.metadata)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_artifact(pool: &SqlitePool, id: &str) -> Result<ArtifactRecord, StorageError> {
    sqlx::query(include_str!("../../queries/artifacts/get_by_id.sql"))
        .bind(id)
        .map(map_artifact_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "artifact".into(),
            id: id.into(),
        })
}

pub async fn list_artifacts_for_run(
    pool: &SqlitePool,
    run_id: &str,
) -> Result<Vec<ArtifactRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/artifacts/list_for_run.sql"))
            .bind(run_id)
            .map(map_artifact_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn list_artifacts_filtered(
    pool: &SqlitePool,
    run_id: Option<&str>,
    artifact_type: Option<&str>,
    node_id: Option<&str>,
) -> Result<Vec<ArtifactRecord>, StorageError> {
    let mut sql = String::from("SELECT * FROM artifacts WHERE 1=1");
    if run_id.is_some() {
        sql.push_str(" AND run_id = ?");
    }
    if artifact_type.is_some() {
        sql.push_str(" AND artifact_type = ?");
    }
    if node_id.is_some() {
        sql.push_str(" AND node_id = ?");
    }

    let mut query = sqlx::query(&sql);
    if let Some(v) = run_id {
        query = query.bind(v);
    }
    if let Some(v) = artifact_type {
        query = query.bind(v);
    }
    if let Some(v) = node_id {
        query = query.bind(v);
    }

    Ok(query.map(map_artifact_row).fetch_all(pool).await?)
}

pub async fn insert_lineage_edge(
    pool: &SqlitePool,
    r: &LineageEdgeRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/lineage/insert.sql"))
        .bind(&r.output_artifact_id)
        .bind(&r.input_artifact_id)
        .bind(&r.run_id)
        .bind(&r.node_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_lineage_for_artifact(
    pool: &SqlitePool,
    artifact_id: &str,
) -> Result<Vec<LineageEdgeRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/lineage/get_for_artifact.sql"))
            .bind(artifact_id)
            .bind(artifact_id)
            .map(map_lineage_edge_row)
            .fetch_all(pool)
            .await?,
    )
}
