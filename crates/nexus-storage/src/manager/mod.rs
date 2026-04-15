use std::path::PathBuf;
use std::sync::Arc;

use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;

use crate::sqlite::SqliteDatabase;

pub struct UninstallReport {
    pub namespace_id: String,
    pub policy_executed: String,
    pub objects_dropped: usize,
    pub archive_path: Option<String>,
}

#[derive(Debug, Clone)]
pub struct IntegrityReport {
    pub namespace_id: String,
    pub status: String,
    pub objects_verified: usize,
    pub objects_missing: Vec<String>,
    pub objects_unexpected: Vec<String>,
}

pub struct StorageManager {
    pub(super) db: Arc<SqliteDatabase>,
    pub(super) data_dir: Option<PathBuf>,
    pub(super) event_bus: Option<Arc<dyn EventBus>>,
    pub(super) quarantine_threshold: u32,
}

#[derive(Debug, Clone)]
pub struct ApplyReport {
    pub namespace_id: String,
    pub action: String,
    pub migrations_applied: usize,
    pub objects_created: usize,
    pub status: String,
}

#[derive(Debug, Clone)]
pub struct MigrationInput {
    pub record_id: String,
    pub namespace_id: String,
    pub extension_id: String,
    pub extension_version: String,
    pub migration_id: String,
    pub path: String,
    pub raw_checksum: String,
    pub expanded_checksum: String,
    pub expanded_sql: String,
    pub objects: Vec<ObjectInput>,
}

#[derive(Debug, Clone)]
pub struct ObjectInput {
    pub record_id: String,
    pub object_name: String,
    pub object_type: String,
    pub migration_id: String,
}

mod apply;
mod journal;
mod reservation;
mod uninstall;
mod verify;

const DEFAULT_QUARANTINE_THRESHOLD: u32 = 3;

/// Fluent builder for [`StorageManager`] (per Constitution Appendix B).
pub struct StorageManagerBuilder {
    db: Arc<SqliteDatabase>,
    data_dir: Option<PathBuf>,
    event_bus: Option<Arc<dyn EventBus>>,
    quarantine_threshold: u32,
}

impl StorageManagerBuilder {
    pub fn event_bus(mut self, bus: Arc<dyn EventBus>) -> Self {
        self.event_bus = Some(bus);
        self
    }

    pub fn data_dir(mut self, dir: PathBuf) -> Self {
        self.data_dir = Some(dir);
        self
    }

    pub fn quarantine_threshold(mut self, threshold: u32) -> Self {
        self.quarantine_threshold = threshold;
        self
    }

    pub fn build(self) -> StorageManager {
        StorageManager {
            db: self.db,
            data_dir: self.data_dir,
            event_bus: self.event_bus,
            quarantine_threshold: self.quarantine_threshold,
        }
    }
}

impl StorageManager {
    /// Recommended entry point. See [`StorageManagerBuilder`].
    pub fn builder(db: Arc<SqliteDatabase>) -> StorageManagerBuilder {
        StorageManagerBuilder {
            db,
            data_dir: None,
            event_bus: None,
            quarantine_threshold: DEFAULT_QUARANTINE_THRESHOLD,
        }
    }

    pub fn new(db: Arc<SqliteDatabase>) -> Self {
        Self::builder(db).build()
    }

    #[deprecated(note = "use StorageManager::builder(db).event_bus(bus).build()")]
    pub fn with_event_bus(db: Arc<SqliteDatabase>, event_bus: Arc<dyn EventBus>) -> Self {
        Self::builder(db).event_bus(event_bus).build()
    }

    #[deprecated(note = "use StorageManager::builder(db).data_dir(dir).build()")]
    pub fn with_data_dir(db: Arc<SqliteDatabase>, data_dir: PathBuf) -> Self {
        Self::builder(db).data_dir(data_dir).build()
    }

    #[deprecated(note = "use StorageManager::builder(db).quarantine_threshold(n).build()")]
    pub fn with_quarantine_threshold(mut self, threshold: u32) -> Self {
        self.quarantine_threshold = threshold;
        self
    }

    pub(crate) fn emit(&self, event: NexusEvent) {
        if let Some(bus) = &self.event_bus {
            bus.publish(event);
        }
    }

    pub fn db(&self) -> &SqliteDatabase {
        &self.db
    }
}

pub(crate) fn sha256_bytes(data: &[u8]) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}

pub(crate) fn chrono_now() -> String {
    chrono::Utc::now().to_rfc3339()
}

#[cfg(test)]
mod tests;

#[cfg(test)]
mod archive_tests;
