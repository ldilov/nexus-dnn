//! StorageManager `uninstall_retain` methods extracted per spec 014.

use crate::database::Database;
use crate::error::StorageError;

use super::super::{StorageManager, UninstallReport};

impl StorageManager {
    pub(super) async fn uninstall_retain(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        self.db
            .update_namespace_status(namespace_id, "retained")
            .await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "retain".to_owned(),
            objects_dropped: 0,
            archive_path: None,
        })
    }
}
