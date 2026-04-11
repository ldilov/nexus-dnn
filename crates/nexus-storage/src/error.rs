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
}
