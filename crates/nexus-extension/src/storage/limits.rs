#[derive(Debug, Clone)]
pub struct StorageLimits {
    pub max_migrations_per_extension: usize,
    pub max_statements_per_migration: usize,
    pub max_migration_file_bytes: u64,
    pub quarantine_threshold: u32,
}

impl Default for StorageLimits {
    fn default() -> Self {
        Self {
            max_migrations_per_extension: 64,
            max_statements_per_migration: 128,
            max_migration_file_bytes: 1_048_576,
            quarantine_threshold: 3,
        }
    }
}
