use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_extension(pool: &SqlitePool, r: &ExtensionRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/extensions/insert.sql"))
        .bind(&r.id)
        .bind(&r.name)
        .bind(&r.version)
        .bind(&r.description)
        .bind(&r.publisher)
        .bind(&r.host_api_compat)
        .bind(&r.protocol_compat)
        .bind(&r.runtime_family)
        .bind(&r.entrypoint)
        .bind(&r.capabilities)
        .bind(&r.status)
        .bind(&r.directory)
        .bind(&r.installed_at)
        .bind(r.recipe_count)
        .bind(r.ui_contribution_count)
        .bind(&r.validation_errors)
        .bind(&r.primary_recipe_id)
        .bind(&r.default_workflow_id)
        .bind(r.icon_kind.map(|k| k.as_str()))
        .bind(&r.icon_symbol)
        .bind(&r.icon_svg)
        .execute(pool)
        .await?;
    Ok(())
}

/// Update the `primary_recipe_id` and `default_workflow_id` columns for an
/// existing extension row. Used by the manifest loader and the ZIP install
/// pipeline to record default blueprint references after the row already
/// exists (spec 019 FR-034).
pub async fn upsert_primary_refs(
    pool: &SqlitePool,
    id: &str,
    primary_recipe_id: Option<&str>,
    default_workflow_id: Option<&str>,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!(
        "../../queries/extensions/upsert_primary_refs.sql"
    ))
    .bind(primary_recipe_id)
    .bind(default_workflow_id)
    .bind(id)
    .execute(pool)
    .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "extension".into(),
            id: id.into(),
        });
    }
    Ok(())
}

/// Update the three icon columns for an existing extension row. Invariant
/// INV-019-5 is enforced by the caller: `kind='symbol'` requires `symbol` set
/// and `svg` unset; `kind='svg'` requires `svg` set and `symbol` unset; `None`
/// requires both other fields to be `None`.
pub async fn upsert_icon(
    pool: &SqlitePool,
    id: &str,
    kind: Option<IconKind>,
    symbol: Option<&str>,
    svg: Option<&str>,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/extensions/upsert_icon.sql"))
        .bind(kind.map(|k| k.as_str()))
        .bind(symbol)
        .bind(svg)
        .bind(id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "extension".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn get_extension(pool: &SqlitePool, id: &str) -> Result<ExtensionRecord, StorageError> {
    sqlx::query(include_str!("../../queries/extensions/get_by_id.sql"))
        .bind(id)
        .map(map_extension_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "extension".into(),
            id: id.into(),
        })
}

pub async fn list_extensions(pool: &SqlitePool) -> Result<Vec<ExtensionRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/extensions/list.sql"))
            .map(map_extension_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn update_extension_status(
    pool: &SqlitePool,
    id: &str,
    status: &str,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/extensions/update_status.sql"))
        .bind(status)
        .bind(id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "extension".into(),
            id: id.into(),
        });
    }
    Ok(())
}
