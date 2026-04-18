use serde::Deserialize;

use crate::ids::{LeaseId, ModelId, RuntimeInstallId};
use crate::lease_client::LeaseState;

pub const EVENT_BACKEND_STATE: &str = "backend.state";
pub const EVENT_MODEL_REMOVED: &str = "model.removed";
pub const EVENT_RUNTIME_REMOVED: &str = "runtime.removed";
pub const EVENT_HOST_SHUTDOWN: &str = "host.shutdown";
pub const EVENT_SETTINGS_CHANGED: &str = "settings.changed";

#[derive(Debug, Deserialize)]
pub struct BackendStatePayload {
    pub lease_id: LeaseId,
    pub state: LeaseState,
    #[serde(default)]
    pub since: Option<String>,
    #[serde(default)]
    pub detail: Option<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
pub struct ModelRemovedPayload {
    pub model_id: ModelId,
    #[serde(default)]
    pub reason: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct RuntimeRemovedPayload {
    pub install_id: RuntimeInstallId,
    #[serde(default)]
    pub codename: Option<String>,
    #[serde(default)]
    pub variant: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct HostShutdownPayload {
    #[serde(default)]
    pub deadline: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct SettingsChangedPayload {
    pub key: String,
    #[serde(default)]
    pub old_value: Option<serde_json::Value>,
    #[serde(default)]
    pub new_value: Option<serde_json::Value>,
}
