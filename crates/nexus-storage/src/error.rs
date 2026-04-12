#[derive(Debug, thiserror::Error)]
pub enum StorageError {
    #[error("database error: {0}")]
    Database(#[from] sqlx::Error),
    #[error("migration error: {0}")]
    Migration(#[from] sqlx::migrate::MigrateError),
    #[error("record not found: {entity} with id {id}")]
    NotFound { entity: String, id: String },
    #[error("duplicate record: {entity} with id {id}")]
    Duplicate { entity: String, id: String },
    #[error("serialization error: {0}")]
    Serialization(String),
    #[error("namespace prefix collision: {prefix}")]
    NamespaceCollision { prefix: String },
    #[error("migration checksum mismatch for {migration_id}: expected {expected}, got {actual}")]
    MigrationChecksum {
        migration_id: String,
        expected: String,
        actual: String,
    },
    #[error("SQL validation failed: {detail}")]
    SqlValidation { detail: String },
    #[error("prefix violation: {object_name} does not start with {prefix}")]
    PrefixViolation {
        object_name: String,
        prefix: String,
    },
    #[error("storage apply failed: {detail}")]
    ApplyFailed { detail: String },
    #[error("dry run failed: {detail}")]
    DryRunFailed { detail: String },
    #[error("integrity drift detected in namespace {namespace_id}")]
    IntegrityDrift { namespace_id: String },
    #[error("archive failed: {detail}")]
    ArchiveFailed { detail: String },
}
