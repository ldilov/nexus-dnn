pub mod error;
pub mod messages;
pub mod model_dependency;
pub mod quantization;
pub mod stdio;
pub mod transport;

pub use model_dependency::{ModelDependency, parse_param_count, validate_revision_pinning};
pub use quantization::{MatchQuality, Quantization};
pub use stdio::StdioTransport;

use std::fmt;

use serde::{Deserialize, Deserializer, Serialize, Serializer};

pub use semver::{Version, VersionReq};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum RuntimeFamily {
    Python,
    Native,
    Builtin,
    ExternalService,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum Capability {
    FilesystemRead,
    FilesystemWrite,
    NetworkLoopback,
    NetworkRemote,
    GpuCompute,
    ProcessSpawn,
    ModelRegistryRead,
    WorkspaceRead,
    WorkspaceWrite,
}

impl Capability {
    fn as_dot_str(&self) -> &'static str {
        match self {
            Self::FilesystemRead => "filesystem.read",
            Self::FilesystemWrite => "filesystem.write",
            Self::NetworkLoopback => "network.loopback",
            Self::NetworkRemote => "network.remote",
            Self::GpuCompute => "gpu.compute",
            Self::ProcessSpawn => "process.spawn",
            Self::ModelRegistryRead => "model_registry.read",
            Self::WorkspaceRead => "workspace.read",
            Self::WorkspaceWrite => "workspace.write",
        }
    }

    fn from_dot_str(s: &str) -> Result<Self, String> {
        match s {
            "filesystem.read" => Ok(Self::FilesystemRead),
            "filesystem.write" => Ok(Self::FilesystemWrite),
            "network.loopback" => Ok(Self::NetworkLoopback),
            "network.remote" => Ok(Self::NetworkRemote),
            "gpu.compute" => Ok(Self::GpuCompute),
            "process.spawn" => Ok(Self::ProcessSpawn),
            "model_registry.read" => Ok(Self::ModelRegistryRead),
            "workspace.read" => Ok(Self::WorkspaceRead),
            "workspace.write" => Ok(Self::WorkspaceWrite),
            other => Err(format!("unknown capability: {other}")),
        }
    }
}

impl Serialize for Capability {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(self.as_dot_str())
    }
}

impl<'de> Deserialize<'de> for Capability {
    fn deserialize<D: Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let s = String::deserialize(deserializer)?;
        Self::from_dot_str(&s).map_err(serde::de::Error::custom)
    }
}

impl fmt::Display for Capability {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_dot_str())
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PortType(pub String);

impl PortType {
    pub fn new(value: impl Into<String>) -> Self {
        Self(value.into())
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for PortType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
