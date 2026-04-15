use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_operator(pool: &SqlitePool, r: &OperatorRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/operators/insert.sql"))
        .bind(&r.id)
        .bind(&r.version)
        .bind(&r.extension_id)
        .bind(&r.display_name)
        .bind(&r.description)
        .bind(&r.category)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.config_schema)
        .bind(&r.execution_mode)
        .bind(r.cacheable)
        .bind(r.resumable)
        .bind(&r.resource_hints)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_operators(pool: &SqlitePool) -> Result<Vec<OperatorRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/operators/list.sql"))
            .map(map_operator_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn list_operators_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<Vec<OperatorRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/operators/list_by_extension.sql"
    ))
    .bind(extension_id)
    .map(map_operator_row)
    .fetch_all(pool)
    .await?)
}

pub async fn get_operator(
    pool: &SqlitePool,
    id: &str,
    version: &str,
) -> Result<OperatorRecord, StorageError> {
    sqlx::query(include_str!("../../queries/operators/get_by_id.sql"))
        .bind(id)
        .bind(version)
        .map(map_operator_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "operator".into(),
            id: format!("{id}@{version}"),
        })
}
