//! Settings repository trait. Concrete impls live under T016.

use async_trait::async_trait;
use serde_json::Value;

use super::RuntimeSettings;
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::RuntimeId;

/// Storage contract for `backend_runtime_settings`. Per-runtime settings are
/// lazy: row is created on first write and updated thereafter.
#[async_trait]
pub trait BackendRuntimeSettingsRepo: Send + Sync {
    /// Fetch settings for `runtime_id`, or `None` if the runtime has never
    /// had settings written.
    async fn get(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Option<RuntimeSettings>, GenericRepoError>;

    /// Idempotent upsert keyed by `runtime_id` (UNIQUE). Inserts with a
    /// freshly minted ULID on first call; updates the existing row on
    /// subsequent calls. Returns the persisted view.
    async fn upsert(
        &self,
        runtime_id: &RuntimeId,
        default_device: Option<&str>,
        default_model_family_id: Option<&str>,
        env_overrides: Value,
    ) -> Result<RuntimeSettings, GenericRepoError>;

    async fn delete(&self, runtime_id: &RuntimeId) -> Result<(), GenericRepoError>;
}
