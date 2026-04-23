//! Per-runtime settings — one row per runtime, created lazily on first write
//! (data-model.md §4). Forward-compat columns (`keep_warm_default`,
//! `idle_timeout_seconds`) are persisted but MUST NOT be read by v1
//! codepaths per A-11.

pub mod repo;
pub mod sqlite;

pub use sqlite::SqliteSettingsRepo;

use crate::generic::ids::RuntimeId;

/// In-memory projection of a settings row.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RuntimeSettings {
    /// ULID primary key. Present only after first write; not exposed via
    /// HTTP (callers address settings by `runtime_id`).
    pub runtime_settings_id: String,
    pub runtime_id: RuntimeId,
    pub default_device: Option<String>,
    pub default_model_family_id: Option<String>,
    /// Forward-compat (A-11). v1 MUST NOT read.
    pub keep_warm_default: i32,
    /// Forward-compat (A-11). v1 MUST NOT read.
    pub idle_timeout_seconds: i32,
    /// Free-form key/value map merged into the spawned subprocess env.
    /// JSON-encoded at the SQL layer; callers validate that no restricted
    /// keys (PATH, PYTHONHOME, PYTHONPATH) are present.
    pub env_overrides: serde_json::Value,
    pub created_at: i64,
    pub updated_at: i64,
}

pub use repo::BackendRuntimeSettingsRepo;
