//! SQLite-backed [`BackendRuntimeCatalogRepo`] impl.

use async_trait::async_trait;
use sqlx::Row;
use sqlx::sqlite::SqlitePool;

use super::{CatalogEntry, repo::BackendRuntimeCatalogRepo};
use crate::family::RuntimeFamily;
use crate::generic::enums::{ImplementationStatus, Transport};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{ContributionChecksum, RuntimeId, SourceExtensionId};

#[derive(Clone)]
pub struct SqliteCatalogRepo {
    pool: SqlitePool,
}

impl SqliteCatalogRepo {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    fn row_to_entry(row: sqlx::sqlite::SqliteRow) -> Result<CatalogEntry, GenericRepoError> {
        let runtime_id_raw: String = row.try_get("runtime_id")?;
        let runtime_id = RuntimeId::try_from(runtime_id_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let source_extension_id: String = row.try_get("source_extension_id")?;
        let checksum_raw: String = row.try_get("contribution_checksum")?;
        let contribution_checksum = ContributionChecksum::new(checksum_raw)
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let family_raw: String = row.try_get("runtime_family")?;
        let runtime_family = RuntimeFamily::canonical(&family_raw).ok_or_else(|| {
            GenericRepoError::Serialization(format!("unknown runtime_family: {family_raw}"))
        })?;

        let transport_raw: String = row.try_get("transport")?;
        let transport = match transport_raw.as_str() {
            "stdio" => Transport::Stdio,
            other => {
                return Err(GenericRepoError::Serialization(format!(
                    "unknown transport: {other}"
                )));
            }
        };

        let status_raw: String = row.try_get("implementation_status")?;
        let implementation_status = match status_raw.as_str() {
            "available" => ImplementationStatus::Available,
            "unavailable" => ImplementationStatus::Unavailable,
            "deprecated" => ImplementationStatus::Deprecated,
            "abandoned" => ImplementationStatus::Abandoned,
            other => {
                return Err(GenericRepoError::Serialization(format!(
                    "unknown implementation_status: {other}"
                )));
            }
        };

        let capability_tags_json: String = row.try_get("capability_tags_json")?;
        let capability_tags: Vec<String> = serde_json::from_str(&capability_tags_json)?;

        let supported_roles_json: String = row.try_get("supported_roles_json")?;
        let supported_roles: Vec<String> = serde_json::from_str(&supported_roles_json)?;

        Ok(CatalogEntry {
            runtime_id,
            display_name: row.try_get("display_name")?,
            source_extension_id: SourceExtensionId::from(source_extension_id),
            source_extension_version: row.try_get("source_extension_version")?,
            contribution_checksum,
            runtime_family,
            transport,
            implementation_status,
            version_manifest_path: row.try_get("version_manifest_path")?,
            worker_entrypoint: row.try_get("worker_entrypoint")?,
            capability_tags,
            supported_roles,
            created_at: row.try_get("created_at")?,
            updated_at: row.try_get("updated_at")?,
        })
    }
}

#[async_trait]
impl BackendRuntimeCatalogRepo for SqliteCatalogRepo {
    async fn upsert(&self, entry: &CatalogEntry) -> Result<(), GenericRepoError> {
        let capability_tags_json = serde_json::to_string(&entry.capability_tags)?;
        let supported_roles_json = serde_json::to_string(&entry.supported_roles)?;

        sqlx::query(
            r#"
            INSERT INTO backend_runtime_catalog (
                runtime_id, display_name, source_extension_id,
                source_extension_version, contribution_checksum,
                runtime_family, transport, implementation_status,
                version_manifest_path, worker_entrypoint,
                capability_tags_json, supported_roles_json,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(runtime_id) DO UPDATE SET
                display_name              = excluded.display_name,
                source_extension_id       = excluded.source_extension_id,
                source_extension_version  = excluded.source_extension_version,
                contribution_checksum     = excluded.contribution_checksum,
                runtime_family            = excluded.runtime_family,
                transport                 = excluded.transport,
                implementation_status     = excluded.implementation_status,
                version_manifest_path     = excluded.version_manifest_path,
                worker_entrypoint         = excluded.worker_entrypoint,
                capability_tags_json      = excluded.capability_tags_json,
                supported_roles_json      = excluded.supported_roles_json,
                updated_at                = excluded.updated_at
            "#,
        )
        .bind(entry.runtime_id.as_str())
        .bind(&entry.display_name)
        .bind(entry.source_extension_id.as_str())
        .bind(&entry.source_extension_version)
        .bind(entry.contribution_checksum.as_str())
        .bind(entry.runtime_family.as_str())
        .bind(entry.transport.as_str())
        .bind(entry.implementation_status.as_str())
        .bind(&entry.version_manifest_path)
        .bind(&entry.worker_entrypoint)
        .bind(&capability_tags_json)
        .bind(&supported_roles_json)
        .bind(entry.created_at)
        .bind(entry.updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn find_by_id(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Option<CatalogEntry>, GenericRepoError> {
        let row = sqlx::query("SELECT * FROM backend_runtime_catalog WHERE runtime_id = ?")
            .bind(runtime_id.as_str())
            .fetch_optional(&self.pool)
            .await?;
        row.map(Self::row_to_entry).transpose()
    }

    async fn list_all(&self) -> Result<Vec<CatalogEntry>, GenericRepoError> {
        let rows = sqlx::query("SELECT * FROM backend_runtime_catalog ORDER BY runtime_id ASC")
            .fetch_all(&self.pool)
            .await?;
        rows.into_iter().map(Self::row_to_entry).collect()
    }

    async fn list_by_source_extension(
        &self,
        source_extension_id: &SourceExtensionId,
    ) -> Result<Vec<CatalogEntry>, GenericRepoError> {
        let rows = sqlx::query(
            "SELECT * FROM backend_runtime_catalog
             WHERE source_extension_id = ?
             ORDER BY runtime_id ASC",
        )
        .bind(source_extension_id.as_str())
        .fetch_all(&self.pool)
        .await?;
        rows.into_iter().map(Self::row_to_entry).collect()
    }

    async fn set_status(
        &self,
        runtime_id: &RuntimeId,
        status: ImplementationStatus,
    ) -> Result<(), GenericRepoError> {
        let now = chrono::Utc::now().timestamp();
        let result = sqlx::query(
            "UPDATE backend_runtime_catalog
             SET implementation_status = ?, updated_at = ?
             WHERE runtime_id = ?",
        )
        .bind(status.as_str())
        .bind(now)
        .bind(runtime_id.as_str())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn delete(&self, runtime_id: &RuntimeId) -> Result<(), GenericRepoError> {
        let result = sqlx::query("DELETE FROM backend_runtime_catalog WHERE runtime_id = ?")
            .bind(runtime_id.as_str())
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }
}
