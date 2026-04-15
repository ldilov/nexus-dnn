use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::path::PathBuf;

use crate::settings::{PortMode, RuntimeSettings};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct LlamaServerLaunchSpec {
    pub binary: String,
    pub args: Vec<String>,
}

pub fn generate(
    settings: &RuntimeSettings,
    effective_port: u16,
    binary_path: &str,
) -> LlamaServerLaunchSpec {
    let port_string = match settings.port_mode {
        PortMode::Fixed => settings
            .fixed_port
            .expect("fixed_port enforced by validate()")
            .to_string(),
        PortMode::Auto => effective_port.to_string(),
    };

    let mut args: Vec<String> = Vec::with_capacity(12 + settings.extra_args.len());
    args.push("--host".into());
    args.push(settings.bind_address.clone());
    args.push("--port".into());
    args.push(port_string);
    args.push("--threads".into());
    args.push(settings.threads.to_string());
    args.push("--threads-batch".into());
    args.push(settings.threads_batch.to_string());
    args.push("--ctx-size".into());
    args.push(settings.default_context.to_string());
    args.push("--parallel".into());
    args.push(settings.parallel_requests.to_string());
    args.extend(settings.extra_args.iter().cloned());

    LlamaServerLaunchSpec {
        binary: binary_path.to_string(),
        args,
    }
}

///
/// The adapter resolves the backend binary and any family-specific base args /
/// env. The spawner then layers host-managed flags (port, bind host, metrics,
/// log dir) and the extension's raw argv/env on top, after reserved-policy
/// validation.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LaunchSpec {
    pub binary: PathBuf,
    pub base_args: Vec<String>,
    pub base_env: BTreeMap<String, String>,
    pub working_dir: Option<PathBuf>,
}
