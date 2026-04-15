use crate::database::Database;
use crate::error::StorageError;
use crate::records::ObjectRecord;

use super::super::{StorageManager, UninstallReport};

impl StorageManager {
    pub(super) async fn uninstall_drop(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        let objects = self.db.list_objects_for_namespace(namespace_id).await?;

        let mut tables: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "table" && o.status == "present")
            .collect();
        let indexes: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "index" && o.status == "present")
            .collect();

        tables.reverse();

        let pool = self.db.pool();
        let mut dropped = 0;

        for idx in &indexes {
            let sql = format!("DROP INDEX IF EXISTS {}", idx.object_name);
            sqlx::query(&sql)
                .execute(pool)
                .await
                .map_err(|e| StorageError::ApplyFailed {
                    detail: format!("failed to drop index {}: {e}", idx.object_name),
                })?;
            self.db.update_object_status(&idx.id, "dropped").await?;
            dropped += 1;
        }

        for tbl in &tables {
            let sql = format!("DROP TABLE IF EXISTS {}", tbl.object_name);
            sqlx::query(&sql)
                .execute(pool)
                .await
                .map_err(|e| StorageError::ApplyFailed {
                    detail: format!("failed to drop table {}: {e}", tbl.object_name),
                })?;
            self.db.update_object_status(&tbl.id, "dropped").await?;
            dropped += 1;
        }

        self.db
            .update_namespace_status(namespace_id, "dropped")
            .await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "drop_namespace_objects".to_owned(),
            objects_dropped: dropped,
            archive_path: None,
        })
    }
}
