use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;
use crate::row_mapping::*;

pub async fn insert_recipe(pool: &SqlitePool, r: &RecipeRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/recipes/insert.sql"))
        .bind(&r.id)
        .bind(&r.version)
        .bind(&r.display_name)
        .bind(&r.summary)
        .bind(&r.category)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.workflow_template_ref)
        .bind(&r.thumbnail)
        .bind(&r.input_summary)
        .bind(&r.bindings)
        .bind(&r.workflow_id)
        .bind(&r.workflow_version)
        .bind(r.projection_schema_version)
        .bind(&r.projection)
        .bind(&r.status)
        .bind(&r.author_kind)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_recipe(pool: &SqlitePool, id: &str) -> Result<RecipeRecord, StorageError> {
    sqlx::query(include_str!("../../queries/recipes/get_by_id.sql"))
        .bind(id)
        .map(map_recipe_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "recipe".into(),
            id: id.into(),
        })
}

pub async fn list_recipes(pool: &SqlitePool) -> Result<Vec<RecipeRecord>, StorageError> {
    Ok(sqlx::query(include_str!("../../queries/recipes/list.sql"))
        .map(map_recipe_row)
        .fetch_all(pool)
        .await?)
}

pub async fn list_recipes_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<Vec<RecipeRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/recipes/list_by_extension.sql"))
            .bind(extension_id)
            .map(map_recipe_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn delete_recipes_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!(
        "../../queries/recipes/delete_by_extension.sql"
    ))
    .bind(extension_id)
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn update_recipe_pin(
    pool: &SqlitePool,
    id: &str,
    workflow_id: Option<&str>,
    workflow_version: Option<&str>,
    status: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/recipes/update_pin.sql"))
        .bind(workflow_id)
        .bind(workflow_version)
        .bind(status)
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn insert_ui_contribution(
    pool: &SqlitePool,
    r: &UIContributionRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/ui_contributions/insert.sql"))
        .bind(&r.id)
        .bind(&r.kind)
        .bind(&r.extension_id)
        .bind(&r.display_name)
        .bind(&r.description)
        .bind(&r.target)
        .bind(&r.supported_types)
        .bind(r.priority)
        .bind(&r.metadata)
        .bind(&r.availability)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_ui_contributions(
    pool: &SqlitePool,
) -> Result<Vec<UIContributionRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/ui_contributions/list.sql"))
            .map(map_ui_contribution_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn list_ui_contributions_by_kind(
    pool: &SqlitePool,
    kind: &str,
) -> Result<Vec<UIContributionRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/ui_contributions/list_by_kind.sql"
    ))
    .bind(kind)
    .map(map_ui_contribution_row)
    .fetch_all(pool)
    .await?)
}

pub async fn list_ui_contributions_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<Vec<UIContributionRecord>, StorageError> {
    Ok(sqlx::query(include_str!(
        "../../queries/ui_contributions/list_by_extension.sql"
    ))
    .bind(extension_id)
    .map(map_ui_contribution_row)
    .fetch_all(pool)
    .await?)
}

pub async fn delete_ui_contributions_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!(
        "../../queries/ui_contributions/delete_by_extension.sql"
    ))
    .bind(extension_id)
    .execute(pool)
    .await?;
    Ok(())
}
