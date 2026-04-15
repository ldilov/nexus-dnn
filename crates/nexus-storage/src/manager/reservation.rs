use nexus_events::types::NexusEvent;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::NamespaceRecord;

use super::StorageManager;

impl StorageManager {
    pub async fn update_namespace_policy(
        &self,
        namespace_id: &str,
        policy: &str,
    ) -> Result<(), StorageError> {
        self.db.update_namespace_policy(namespace_id, policy).await
    }

    pub async fn reserve_namespace(&self, record: &NamespaceRecord) -> Result<(), StorageError> {
        let op_id = self
            .journal_start(&record.id, "reserve_namespace")
            .await
            .ok();

        let prefix_pattern = format!("{}%", record.effective_prefix);
        let collision: Option<(String,)> = sqlx::query_as(include_str!(
            "../../queries/storage/check_namespace_collision.sql"
        ))
        .bind(&prefix_pattern)
        .fetch_optional(self.db.pool())
        .await?;

        if let Some((colliding_name,)) = collision {
            if let Some(ref id) = op_id {
                self.journal_complete(id, "failed", None).await;
            }
            return Err(StorageError::NamespaceCollision {
                prefix: format!(
                    "{} (collides with existing object '{colliding_name}')",
                    record.effective_prefix
                ),
            });
        }

        self.db.insert_namespace(record).await?;

        self.emit(NexusEvent::StorageNamespaceReserved {
            extension_id: record.extension_id.clone(),
            namespace_id: record.id.clone(),
            effective_prefix: record.effective_prefix.clone(),
        });

        if let Some(ref id) = op_id {
            self.journal_complete(id, "completed", None).await;
        }

        Ok(())
    }
}
