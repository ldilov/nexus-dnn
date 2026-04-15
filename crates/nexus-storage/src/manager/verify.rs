use nexus_events::types::NexusEvent;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::ObjectRecord;

use super::{IntegrityReport, StorageManager};

impl StorageManager {
    pub async fn verify_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<IntegrityReport, StorageError> {
        let op_id = self
            .journal_start(namespace_id, "verify_namespace")
            .await
            .ok();

        let ns = self.db.get_namespace(namespace_id).await?;
        let prefix_pattern = format!("{}%", ns.effective_prefix);

        let actual_objects: Vec<(String, String)> = sqlx::query_as(include_str!(
            "../../queries/storage/verify_actual_objects.sql"
        ))
        .bind(&prefix_pattern)
        .fetch_all(self.db.pool())
        .await?;

        let recorded_objects = self.db.list_objects_for_namespace(namespace_id).await?;
        let present_objects: Vec<&ObjectRecord> = recorded_objects
            .iter()
            .filter(|o| o.status == "present")
            .collect();

        let actual_names: std::collections::HashSet<String> = actual_objects
            .iter()
            .map(|(name, _)| name.clone())
            .collect();
        let recorded_names: std::collections::HashSet<String> = present_objects
            .iter()
            .map(|o| o.object_name.clone())
            .collect();

        let missing: Vec<String> = recorded_names.difference(&actual_names).cloned().collect();
        let unexpected: Vec<String> = actual_names.difference(&recorded_names).cloned().collect();

        for obj in &present_objects {
            if missing.contains(&obj.object_name) {
                self.db.update_object_status(&obj.id, "drifted").await?;
            }
        }

        let status = if missing.is_empty() {
            self.emit(NexusEvent::StorageIntegrityVerified {
                extension_id: ns.extension_id.clone(),
                namespace_id: namespace_id.to_owned(),
            });
            "healthy".to_owned()
        } else {
            self.db
                .update_namespace_status(namespace_id, "repair_required")
                .await?;
            self.emit(NexusEvent::StorageIntegrityDriftDetected {
                extension_id: ns.extension_id.clone(),
                namespace_id: namespace_id.to_owned(),
                objects: missing.clone(),
            });
            "repair_required".to_owned()
        };

        if let Some(ref id) = op_id {
            self.journal_complete(id, "completed", None).await;
        }

        Ok(IntegrityReport {
            namespace_id: namespace_id.to_owned(),
            status,
            objects_verified: present_objects.len(),
            objects_missing: missing,
            objects_unexpected: unexpected,
        })
    }
}
