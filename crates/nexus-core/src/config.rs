use std::path::{Path, PathBuf};

use anyhow::{Context, Result};
use clap::Parser;
use serde::Deserialize;

const DEFAULT_PORT: u16 = 3000;
const DEFAULT_LOG_LEVEL: &str = "info,tower_http=debug";
const DATA_DIR_NAME: &str = ".nexus";
const DEFAULT_TUI_RING_BUFFER_CAPACITY: usize = 50_000;

#[derive(Debug, Clone)]
pub struct NexusConfig {
    pub data_dir: Option<PathBuf>,
    pub port: u16,
    pub log_level: String,
    pub debug_async: bool,
    pub tui: TuiConfig,
}

impl NexusConfig {
    pub fn load() -> Result<Self> {
        let cli = CliConfig::parse();
        let file_config = load_file_config(&cli)?;
        let file_tui = file_config.tui.clone().unwrap_or_default();

        Ok(Self {
            data_dir: cli.data_dir.or(file_config.data_dir),
            port: cli.port.or(file_config.port).unwrap_or(DEFAULT_PORT),
            log_level: cli
                .log_level
                .or(file_config.log_level)
                .unwrap_or_else(|| DEFAULT_LOG_LEVEL.to_string()),
            debug_async: if cli.debug_async {
                true
            } else {
                file_config.debug_async.unwrap_or(false)
            },
            tui: TuiConfig {
                ring_buffer_capacity: cli
                    .tui_ring_buffer_capacity
                    .unwrap_or(file_tui.ring_buffer_capacity),
                tracing_bridge: TracingBridgeConfig {
                    enabled: cli
                        .tui_tracing_bridge_enabled
                        .unwrap_or(file_tui.tracing_bridge.enabled),
                    extra_sensitive_patterns: if cli
                        .tui_tracing_bridge_extra_sensitive_patterns
                        .is_empty()
                    {
                        file_tui.tracing_bridge.extra_sensitive_patterns
                    } else {
                        cli.tui_tracing_bridge_extra_sensitive_patterns.clone()
                    },
                },
            },
        })
    }

    pub fn resolved_data_dir(&self) -> PathBuf {
        self.data_dir.clone().unwrap_or_else(default_data_directory)
    }

    pub fn database_url(&self) -> String {
        let db_path = self.resolved_data_dir().join("db").join("nexus.db");
        format!("sqlite:{}?mode=rwc", db_path.display())
    }

    pub fn artifacts_dir(&self) -> PathBuf {
        self.resolved_data_dir().join("artifacts")
    }

    pub fn extensions_dir(&self) -> PathBuf {
        self.resolved_data_dir().join("extensions")
    }

    pub fn builtin_extensions_dir(&self) -> PathBuf {
        let from_env = std::env::var("NEXUS_BUILTIN_EXTENSIONS_DIR")
            .ok()
            .map(PathBuf::from);

        if let Some(dir) = from_env {
            return dir;
        }

        let workspace_root = PathBuf::from(env!("NEXUS_WORKSPACE_ROOT"));
        workspace_root.join("extensions").join("builtin")
    }

    pub fn logs_dir(&self) -> PathBuf {
        self.resolved_data_dir().join("logs")
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct TuiConfig {
    #[serde(default = "default_tui_ring_buffer_capacity")]
    pub ring_buffer_capacity: usize,
    #[serde(default)]
    pub tracing_bridge: TracingBridgeConfig,
}

impl Default for TuiConfig {
    fn default() -> Self {
        Self {
            ring_buffer_capacity: default_tui_ring_buffer_capacity(),
            tracing_bridge: TracingBridgeConfig::default(),
        }
    }
}

impl Default for TracingBridgeConfig {
    fn default() -> Self {
        Self {
            enabled: true,
            extra_sensitive_patterns: Vec::new(),
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct TracingBridgeConfig {
    #[serde(default = "default_tracing_bridge_enabled")]
    pub enabled: bool,
    #[serde(default)]
    pub extra_sensitive_patterns: Vec<String>,
}

#[derive(Parser, Debug, Clone)]
#[command(
    name = "nexus-dnn",
    about = "Local-first extensible AI workflow platform"
)]
struct CliConfig {
    #[arg(long, env = "NEXUS_CONFIG")]
    config: Option<PathBuf>,

    #[arg(long, env = "NEXUS_DATA_DIR")]
    data_dir: Option<PathBuf>,

    #[arg(long, env = "NEXUS_PORT")]
    port: Option<u16>,

    #[arg(long, env = "NEXUS_LOG_LEVEL")]
    log_level: Option<String>,

    #[arg(long, env = "NEXUS_DEBUG_ASYNC", default_value_t = false)]
    debug_async: bool,

    #[arg(long, env = "NEXUS_TUI_RING_BUFFER_CAPACITY")]
    tui_ring_buffer_capacity: Option<usize>,

    #[arg(long, env = "NEXUS_TUI_TRACING_BRIDGE_ENABLED")]
    tui_tracing_bridge_enabled: Option<bool>,

    #[arg(
        long,
        env = "NEXUS_TUI_TRACING_BRIDGE_EXTRA_SENSITIVE_PATTERNS",
        value_delimiter = ','
    )]
    tui_tracing_bridge_extra_sensitive_patterns: Vec<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
struct FileConfig {
    data_dir: Option<PathBuf>,
    port: Option<u16>,
    log_level: Option<String>,
    debug_async: Option<bool>,
    #[serde(default)]
    tui: Option<TuiConfig>,
}

fn load_file_config(cli: &CliConfig) -> Result<FileConfig> {
    let path = cli
        .config
        .clone()
        .unwrap_or_else(|| default_config_path(cli.data_dir.as_deref()));

    if !path.exists() {
        if cli.config.is_some() {
            anyhow::bail!("config file not found: {}", path.display());
        }
        return Ok(FileConfig::default());
    }

    let body = std::fs::read_to_string(&path)
        .with_context(|| format!("failed to read config file: {}", path.display()))?;

    toml::from_str(&body)
        .with_context(|| format!("failed to parse config file: {}", path.display()))
}

fn default_config_path(data_dir: Option<&Path>) -> PathBuf {
    data_dir
        .map(Path::to_path_buf)
        .unwrap_or_else(default_data_directory)
        .join("config.toml")
}

fn default_data_directory() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(DATA_DIR_NAME)
}

fn default_tui_ring_buffer_capacity() -> usize {
    DEFAULT_TUI_RING_BUFFER_CAPACITY
}

fn default_tracing_bridge_enabled() -> bool {
    true
}
