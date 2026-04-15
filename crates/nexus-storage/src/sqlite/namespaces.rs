use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;
use crate::records::*;

pub async fn insert_namespace(pool: &SqlitePool, r: &NamespaceRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/storage/insert_namespace.sql"))
        .bind(&r.id)
        .bind(&r.extension_id)
        .bind(&r.extension_version_first_seen)
        .bind(&r.namespace_alias)
        .bind(&r.effective_prefix)
        .bind(&r.engine)
        .bind(&r.storage_spec_version)
        .bind(&r.sql_profile)
        .bind(&r.status)
        .bind(&r.uninstall_policy)
        .bind(&r.created_at)
        .bind(&r.updated_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_namespace(pool: &SqlitePool, id: &str) -> Result<NamespaceRecord, StorageError> {
    sqlx::query_as::<_, NamespaceRecord>(include_str!("../../queries/storage/get_namespace.sql"))
        .bind(id)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "namespace".into(),
            id: id.into(),
        })
}

pub async fn get_namespace_by_extension(
    pool: &SqlitePool,
    extension_id: &str,
) -> Result<Option<NamespaceRecord>, StorageError> {
    Ok(sqlx::query_as::<_, NamespaceRecord>(include_str!(
        "../../queries/storage/get_namespace_by_extension.sql"
    ))
    .bind(extension_id)
    .fetch_optional(pool)
    .await?)
}

pub async fn list_namespaces(pool: &SqlitePool) -> Result<Vec<NamespaceRecord>, StorageError> {
    Ok(sqlx::query_as::<_, NamespaceRecord>(include_str!(
        "../../queries/storage/list_namespaces.sql"
    ))
    .fetch_all(pool)
    .await?)
}

pub async fn update_namespace_status(
    pool: &SqlitePool,
    id: &str,
    status: &str,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!(
        "../../queries/storage/update_namespace_status.sql"
    ))
    .bind(status)
    .bind(id)
    .execute(pool)
    .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "namespace".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn update_namespace_policy(
    pool: &SqlitePool,
    id: &str,
    policy: &str,
) -> Result<(), StorageError> {
    let now = chrono::Utc::now().to_rfc3339();
    let result = sqlx::query(include_str!(
        "../../queries/storage/update_namespace_policy.sql"
    ))
    .bind(policy)
    .bind(&now)
    .bind(id)
    .execute(pool)
    .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "namespace".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn insert_migration_record(
    pool: &SqlitePool,
    r: &MigrationRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/storage/insert_migration.sql"))
        .bind(&r.id)
        .bind(&r.namespace_id)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.migration_id)
        .bind(&r.path)
        .bind(&r.raw_checksum_sha256)
        .bind(&r.expanded_checksum_sha256)
        .bind(&r.status)
        .bind(&r.applied_at)
        .bind(&r.error_json)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_migrations_for_namespace(
    pool: &SqlitePool,
    namespace_id: &str,
) -> Result<Vec<MigrationRecord>, StorageError> {
    Ok(sqlx::query_as::<_, MigrationRecord>(include_str!(
        "../../queries/storage/get_migrations.sql"
    ))
    .bind(namespace_id)
    .fetch_all(pool)
    .await?)
}

pub async fn get_migration_record(
    pool: &SqlitePool,
    namespace_id: &str,
    migration_id: &str,
) -> Result<Option<MigrationRecord>, StorageError> {
    Ok(sqlx::query_as::<_, MigrationRecord>(include_str!(
        "../../queries/storage/get_migration_record.sql"
    ))
    .bind(namespace_id)
    .bind(migration_id)
    .fetch_optional(pool)
    .await?)
}

pub async fn insert_object_record(pool: &SqlitePool, r: &ObjectRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/storage/insert_object.sql"))
        .bind(&r.id)
        .bind(&r.namespace_id)
        .bind(&r.object_name)
        .bind(&r.object_type)
        .bind(&r.created_by_migration_id)
        .bind(&r.sql_hash)
        .bind(&r.status)
        .bind(&r.recorded_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_objects_for_namespace(
    pool: &SqlitePool,
    namespace_id: &str,
) -> Result<Vec<ObjectRecord>, StorageError> {
    Ok(
        sqlx::query_as::<_, ObjectRecord>(include_str!("../../queries/storage/get_objects.sql"))
            .bind(namespace_id)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn update_object_status(
    pool: &SqlitePool,
    id: &str,
    status: &str,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!(
        "../../queries/storage/update_object_status.sql"
    ))
    .bind(status)
    .bind(id)
    .execute(pool)
    .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "object".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn insert_operation(pool: &SqlitePool, r: &OperationRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/storage/insert_operation.sql"))
        .bind(&r.id)
        .bind(&r.namespace_id)
        .bind(&r.operation_type)
        .bind(&r.status)
        .bind(&r.plan_json)
        .bind(&r.result_json)
        .bind(&r.started_at)
        .bind(&r.completed_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn update_operation(
    pool: &SqlitePool,
    id: &str,
    status: &str,
    result_json: Option<&str>,
    completed_at: Option<&str>,
) -> Result<(), StorageError> {
    let result = sqlx::query(include_str!("../../queries/storage/update_operation.sql"))
        .bind(status)
        .bind(result_json)
        .bind(completed_at)
        .bind(id)
        .execute(pool)
        .await?;
    if result.rows_affected() == 0 {
        return Err(StorageError::NotFound {
            entity: "operation".into(),
            id: id.into(),
        });
    }
    Ok(())
}

pub async fn insert_archive(pool: &SqlitePool, r: &ArchiveRecord) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/storage/insert_archive.sql"))
        .bind(&r.id)
        .bind(&r.namespace_id)
        .bind(&r.archive_format)
        .bind(&r.archive_path)
        .bind(&r.content_hash)
        .bind(r.table_count)
        .bind(r.row_count)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn list_archives_for_namespace(
    pool: &SqlitePool,
    namespace_id: &str,
) -> Result<Vec<ArchiveRecord>, StorageError> {
    Ok(
        sqlx::query_as::<_, ArchiveRecord>(include_str!("../../queries/storage/get_archives.sql"))
            .bind(namespace_id)
            .fetch_all(pool)
            .await?,
    )
}
