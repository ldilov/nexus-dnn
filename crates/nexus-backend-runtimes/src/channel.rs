use std::path::PathBuf;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum RuntimeChannelKind {
    HttpTcp,
    HttpUnixSocket,
    StdioJsonRpc,
    GrpcTcp,
    CustomNative { tag: String },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "dialect", rename_all = "snake_case")]
pub enum ApiDialect {
    OpenAiCompatible,
    AnthropicMessagesCompatible,
    NativeLlamaServer,
    Custom { tag: String },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum RuntimeAddress {
    Tcp { host: String, port: u16 },
    UnixSocket { path: PathBuf },
    Stdio,
    Custom { value: String },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeEndpoint {
    pub path: String,
}

impl RuntimeEndpoint {
    pub fn path(p: impl Into<String>) -> Self {
        Self { path: p.into() }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeChannelDescriptor {
    pub kind: RuntimeChannelKind,
    pub api_dialects: Vec<ApiDialect>,
    pub address: RuntimeAddress,
    pub health: Option<RuntimeEndpoint>,
    pub metrics: Option<RuntimeEndpoint>,
    pub ready: bool,
}

#[derive(Debug, Clone)]
pub struct ChannelBuildCtx {
    pub bind_host: String,
    pub port: u16,
    pub metrics_enabled: bool,
}
