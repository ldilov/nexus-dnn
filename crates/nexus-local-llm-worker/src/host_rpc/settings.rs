use std::fmt;

use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;
use crate::transport::WorkerTransport;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
#[non_exhaustive]
pub enum SettingsKey {
    PoolCap,
    PoolIdleTimeoutSecs,
    AcquireLeaseTimeoutSecs,
    RuntimePreferenceFor(&'static str),
}

impl SettingsKey {
    pub fn as_key(&self) -> String {
        match self {
            SettingsKey::PoolCap => "local-llm.pool.cap".into(),
            SettingsKey::PoolIdleTimeoutSecs => "local-llm.pool.idle_timeout_secs".into(),
            SettingsKey::AcquireLeaseTimeoutSecs => {
                "local-llm.pool.acquire_lease_timeout_secs".into()
            }
            SettingsKey::RuntimePreferenceFor(model_id) => {
                format!("local-llm.runtime_preferences.{model_id}")
            }
        }
    }
}

impl fmt::Display for SettingsKey {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.as_key())
    }
}

#[derive(Debug, Serialize)]
struct GetRequest<'a> {
    key: &'a str,
}

#[derive(Debug, Deserialize)]
pub struct GetResponse {
    #[serde(default)]
    pub value: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
struct SetRequest<'a> {
    key: &'a str,
    value: serde_json::Value,
}

#[derive(Debug, Deserialize)]
struct SetResponse {
    #[serde(default)]
    pub ok: bool,
}

pub struct SettingsClient<'a> {
    transport: &'a WorkerTransport,
}

impl<'a> SettingsClient<'a> {
    pub fn new(transport: &'a WorkerTransport) -> Self {
        Self { transport }
    }

    pub async fn get(&self, key: SettingsKey) -> WorkerResult<Option<serde_json::Value>> {
        let k = key.as_key();
        let resp: GetResponse = self
            .transport
            .call("host.settings.get", GetRequest { key: &k })
            .await?;
        Ok(resp.value)
    }

    pub async fn set(&self, key: SettingsKey, value: serde_json::Value) -> WorkerResult<bool> {
        let k = key.as_key();
        let resp: SetResponse = self
            .transport
            .call("host.settings.set", SetRequest { key: &k, value })
            .await?;
        Ok(resp.ok)
    }
}
