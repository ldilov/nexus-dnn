use std::path::PathBuf;

use serde::{Deserialize, Serialize};

use crate::error::SettingsError;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AcceleratorProfile {
    Cpu,
    Vulkan,
    Cuda12,
    Cuda13,
}

impl AcceleratorProfile {
    pub fn as_wire(&self) -> &'static str {
        match self {
            Self::Cpu => "cpu",
            Self::Vulkan => "vulkan",
            Self::Cuda12 => "cuda12",
            Self::Cuda13 => "cuda13",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PortMode {
    Auto,
    Fixed,
}

pub const MANAGED_FLAGS: &[&str] = &[
    "--host",
    "--port",
    "--threads",
    "--threads-batch",
    "--ctx-size",
    "--parallel",
    "--n-gpu-layers",
    "-m",
    "--model",
    "--lora",
    "--draft-model",
    "--embedding",
    "--rerank",
    "--grammar",
    "--grammar-file",
    "--chat-template",
    "--chat-template-file",
];

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RuntimeSettings {
    pub backend: String,
    pub install_ref: Option<String>,
    pub threads: u32,
    pub threads_batch: u32,
    pub default_context: u32,
    pub parallel_requests: u32,
    pub bind_address: String,
    pub port_mode: PortMode,
    pub fixed_port: Option<u16>,
    pub extra_args: Vec<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub api_key: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tls_cert_path: Option<PathBuf>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tls_key_path: Option<PathBuf>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub media_path: Option<PathBuf>,
    #[serde(default)]
    pub tools_enabled: bool,
    #[serde(default)]
    pub mcp_proxy_enabled: bool,
}

impl RuntimeSettings {
    pub fn llamacpp_defaults() -> Self {
        Self {
            backend: crate::family::RuntimeFamily::LLAMA_CPP.to_string(),
            install_ref: None,
            threads: 8,
            threads_batch: 8,
            default_context: 4096,
            parallel_requests: 1,
            bind_address: "127.0.0.1".to_string(),
            port_mode: PortMode::Auto,
            fixed_port: None,
            extra_args: Vec::new(),
            api_key: None,
            tls_cert_path: None,
            tls_key_path: None,
            media_path: None,
            tools_enabled: false,
            mcp_proxy_enabled: false,
        }
    }

    pub fn validate(&self) -> Result<(), SettingsError> {
        if !(1..=1024).contains(&self.threads) {
            return Err(SettingsError::Invalid(
                "threads out of range [1,1024]".into(),
            ));
        }
        if !(1..=1024).contains(&self.threads_batch) {
            return Err(SettingsError::Invalid(
                "threads_batch out of range [1,1024]".into(),
            ));
        }
        if !(128..=1_048_576).contains(&self.default_context) {
            return Err(SettingsError::Invalid(
                "default_context out of range [128,1048576]".into(),
            ));
        }
        if !(1..=64).contains(&self.parallel_requests) {
            return Err(SettingsError::Invalid(
                "parallel_requests out of range [1,64]".into(),
            ));
        }
        if self.bind_address.trim().is_empty() {
            return Err(SettingsError::Invalid(
                "bind_address cannot be empty".into(),
            ));
        }
        match (self.port_mode, self.fixed_port) {
            (PortMode::Auto, None) => {}
            (PortMode::Fixed, Some(p)) if (1..=65535).contains(&p) => {}
            (PortMode::Fixed, Some(_)) => {
                return Err(SettingsError::Invalid("fixed_port out of range".into()));
            }
            (PortMode::Fixed, None) => {
                return Err(SettingsError::Invalid(
                    "fixed_port required when port_mode is fixed".into(),
                ));
            }
            (PortMode::Auto, Some(_)) => {
                return Err(SettingsError::Invalid(
                    "fixed_port must be null when port_mode is auto".into(),
                ));
            }
        }
        for arg in &self.extra_args {
            let token = arg.split('=').next().unwrap_or(arg);
            if MANAGED_FLAGS.contains(&token) {
                return Err(SettingsError::ConflictWithManagedFlag(token.to_string()));
            }
        }
        Ok(())
    }
}
