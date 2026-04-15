use crate::database::Database;
use crate::error::StorageError;
use crate::records::OperationRecord;

use super::{StorageManager, chrono_now};

impl StorageManager {
    pub(super) async fn journal_start(
        &self,
        namespace_id: &str,
        operation_type: &str,
    ) -> Result<String, StorageError> {
        let op_id = format!("op-{namespace_id}-{}", chrono_now().replace(':', "-"));
        let record = OperationRecord {
            id: op_id.clone(),
            namespace_id: namespace_id.to_owned(),
            operation_type: operation_type.to_owned(),
            status: "in_progress".to_owned(),
            plan_json: None,
            result_json: None,
            started_at: chrono_now(),
            completed_at: None,
        };
        self.db.insert_operation(&record).await?;
        Ok(op_id)
    }

    pub(super) async fn journal_complete(
        &self,
        op_id: &str,
        status: &str,
        result_json: Option<&str>,
    ) {
        if let Err(e) = self
            .db
            .update_operation(op_id, status, result_json, Some(&chrono_now()))
            .await
        {
            tracing::warn!(op_id, status, error = %e, "journal_complete failed");
        }
    }

    pub(super) async fn check_quarantine_threshold(
        &self,
        namespace_id: &str,
    ) -> Result<(), StorageError> {
        let threshold = self.quarantine_threshold as i64;
        let row: Option<(i64,)> = sqlx::query_as(include_str!(
            "../../queries/storage/check_quarantine_threshold.sql"
        ))
        .bind(namespace_id)
        .bind(threshold)
        .fetch_optional(self.db.pool())
        .await
        .map_err(StorageError::Database)?;

        if let Some((count,)) = row
            && count >= threshold
        {
            self.db
                .update_namespace_status(namespace_id, "quarantined_storage")
                .await?;
        }
        Ok(())
    }
}
