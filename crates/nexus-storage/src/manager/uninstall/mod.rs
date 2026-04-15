use nexus_events::types::NexusEvent;

use crate::database::Database;
use crate::error::StorageError;

use super::{StorageManager, UninstallReport};

mod archive;
mod drop;
mod retain;

impl StorageManager {
    pub async fn uninstall_namespace(
        &self,
        namespace_id: &str,
        policy: &str,
    ) -> Result<UninstallReport, StorageError> {
        let ns = self.db.get_namespace(namespace_id).await?;

        let op_id = self
            .journal_start(namespace_id, "uninstall_namespace")
            .await
            .ok();

        self.emit(NexusEvent::StorageUninstallStarted {
            extension_id: ns.extension_id.clone(),
            namespace_id: namespace_id.to_owned(),
        });

        let result = match policy {
            "retain" => self.uninstall_retain(namespace_id).await,
            "drop_namespace_objects" => self.uninstall_drop(namespace_id).await,
            "archive_then_drop" => self.uninstall_archive_then_drop(namespace_id).await,
            other => Err(StorageError::ApplyFailed {
                detail: format!("unknown uninstall policy: {other}"),
            }),
        };

        match &result {
            Ok(_) => {
                self.emit(NexusEvent::StorageUninstallCompleted {
                    extension_id: ns.extension_id,
                    namespace_id: namespace_id.to_owned(),
                });
                if let Some(ref id) = op_id {
                    self.journal_complete(id, "completed", None).await;
                }
            }
            Err(_) => {
                if let Some(ref id) = op_id {
                    self.journal_complete(id, "failed", None).await;
                }
            }
        }

        result
    }
}
