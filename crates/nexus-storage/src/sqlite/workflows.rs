use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_workflow(pool: &SqlitePool, r: &WorkflowRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/workflows/insert.sql"))
        .bind(&r.id)
        .bind(&r.title)
        .bind(&r.version)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.stages)
        .bind(&r.created_at)
        .bind(&r.updated_at)
        .bind(&r.user_edited_at)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.extension_version_first_seen)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_workflow(pool: &SqlitePool, id: &str) -> Result<WorkflowRecord, StorageError> {
    sqlx::query(include_str!("../../queries/workflows/get_by_id.sql"))
        .bind(id)
        .map(map_workflow_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "workflow".into(),
            id: id.into(),
        })
}

pub async fn list_workflows(pool: &SqlitePool) -> Result<Vec<WorkflowRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/workflows/list.sql"))
            .map(map_workflow_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn update_workflow(pool: &SqlitePool, r: &WorkflowRecord) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/workflows/update.sql"))
        .bind(&r.title)
        .bind(&r.version)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.stages)
        .bind(&r.updated_at)
        .bind(&r.user_edited_at)
        .bind(&r.id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "workflow".into(),
            id: r.id.clone(),
        });
    }
    Ok(())
}

pub async fn delete_workflow(pool: &SqlitePool, id: &str) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/workflows/delete.sql"))
        .bind(id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "workflow".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn clear_workflow_user_edit(pool: &SqlitePool, id: &str) -> Result<(), StorageError> {
    sqlx::query("UPDATE workflows SET user_edited_at = NULL WHERE id = ?")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn stamp_workflow_extension(
    pool: &SqlitePool,
    id: &str,
    extension_id: &str,
    extension_version: &str,
    first_seen_at: &str,
) -> Result<(), StorageError> {
    sqlx::query(
        "UPDATE workflows SET extension_id = ?, extension_version = ?, \
         extension_version_first_seen = COALESCE(extension_version_first_seen, ?) \
         WHERE id = ?",
    )
    .bind(extension_id)
    .bind(extension_version)
    .bind(first_seen_at)
    .bind(id)
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn get_canvas_state(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<Option<String>, StorageError> {
    let row = sqlx::query("SELECT payload FROM workflow_canvas_state WHERE workflow_id = ?")
        .bind(workflow_id)
        .fetch_optional(pool)
        .await?;
    Ok(row.map(|r| {
        use sqlx::Row;
        r.get::<String, _>("payload")
    }))
}

pub async fn set_canvas_state(
    pool: &SqlitePool,
    workflow_id: &str,
    payload: &str,
    updated_at: &str,
) -> Result<(), StorageError> {
    sqlx::query(
        "INSERT INTO workflow_canvas_state (workflow_id, payload, updated_at) \
         VALUES (?, ?, ?) \
         ON CONFLICT(workflow_id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
    )
    .bind(workflow_id)
    .bind(payload)
    .bind(updated_at)
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn insert_workflow_version(
    pool: &SqlitePool,
    r: &WorkflowVersionRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/workflows/insert_version.sql"))
        .bind(&r.workflow_id)
        .bind(&r.version)
        .bind(&r.canonical_hash)
        .bind(&r.operator_schema_hash)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.stages)
        .bind(&r.author_kind)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_workflow_version(
    pool: &SqlitePool,
    workflow_id: &str,
    version: &str,
) -> Result<WorkflowVersionRecord, StorageError> {
    sqlx::query(include_str!("../../queries/workflows/get_version.sql"))
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

pub async fn list_workflow_versions(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<Vec<WorkflowVersionRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/workflows/list_versions.sql"))
            .bind(workflow_id)
            .map(map_workflow_version_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn get_workflow_current_version(
    pool: &SqlitePool,
    id: &str,
) -> Result<Option<String>, StorageError> {
    use sqlx::Row;
    let row = sqlx::query(include_str!(
        "../../queries/workflows/get_current_version.sql"
    ))
    .bind(id)
    .fetch_optional(pool)
    .await?;
    Ok(row.and_then(|r| {
        r.try_get::<Option<String>, _>("current_version")
            .ok()
            .flatten()
    }))
}

pub async fn set_workflow_current_version(
    pool: &SqlitePool,
    id: &str,
    version: &str,
    updated_at: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!(
        "../../queries/workflows/set_current_version.sql"
    ))
    .bind(version)
    .bind(updated_at)
    .bind(id)
    .execute(pool)
    .await?;
    Ok(())
}
