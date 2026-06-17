use std::path::{Path, PathBuf};

use anyhow::{Context, Result};
use clap::Parser;
use serde::Deserialize;

/// Runtime-mode flags that do not belong in the persisted config file.
/// Returned alongside [`NexusConfig`] from [`NexusConfig::load_with_runtime`].
#[derive(Debug, Clone, Default)]
pub struct RuntimeMode {
    /// Spawn the TUI (`nexus`) as a child process after the host is ready.
    /// Suppresses the stdout tracing layer so the terminal is clean for the
    /// TUI; structured events still flow via the file appender + tracing
    /// bridge.
    pub with_tui: bool,
    /// Override path to the `nexus` (TUI) binary. Default: discovered next
    /// to the current `nexus-dnn` executable.
    pub tui_bin: Option<PathBuf>,
}

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
        Self::load_with_runtime().map(|(cfg, _)| cfg)
    }

    /// Like [`load`] but also returns the runtime-mode flags
    /// (`--with-tui`, `--tui-bin`).
    pub fn load_with_runtime() -> Result<(Self, RuntimeMode)> {
        let cli = CliConfig::parse();
        let runtime = RuntimeMode {
            with_tui: cli.with_tui,
            tui_bin: cli.tui_bin.clone(),
        };
        let file_config = load_file_config(&cli)?;
        let file_tui = file_config.tui.clone().unwrap_or_default();

        let cfg = Self {
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
        };
        Ok((cfg, runtime))
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
        if let Some(dir) = std::env::var_os("NEXUS_BUILTIN_EXTENSIONS_DIR") {
            return PathBuf::from(dir);
        }

        // Installed / container layout: built-in extensions ship alongside the
        // executable. Probe the common relative locations before falling back
        if let Ok(exe) = std::env::current_exe()
            && let Some(exe_dir) = exe.parent()
        {
            for rel in [
                "extensions/builtin",
                "../share/nexus-dnn/extensions/builtin",
                "../lib/nexus-dnn/extensions/builtin",
            ] {
                let candidate = exe_dir.join(rel);
                if candidate.is_dir() {
                    return candidate;
                }
            }
        }

        workspace_root().join("extensions").join("builtin")
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

    /// Spawn the `nexus` TUI as a child process after the host is bound.
    /// On TUI exit (`Ctrl+D` / `/quit`) the host shuts down too.
    #[arg(long, default_value_t = false)]
    with_tui: bool,

    /// Override the path to the `nexus` (TUI) binary used by `--with-tui`.
    /// Default: discovered next to the running `nexus-dnn` executable.
    #[arg(long, value_name = "PATH")]
    tui_bin: Option<PathBuf>,
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

/// Resolve the dev-time workspace root: runtime `NEXUS_WORKSPACE_ROOT` wins,
/// then the value baked in at compile time (set by `build.rs`), then the
/// current working directory. Never panics when the env var is absent.
fn workspace_root() -> PathBuf {
    if let Some(dir) = std::env::var_os("NEXUS_WORKSPACE_ROOT") {
        return PathBuf::from(dir);
    }
    if let Some(dir) = option_env!("NEXUS_WORKSPACE_ROOT") {
        return PathBuf::from(dir);
    }
    std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."))
}

fn default_tui_ring_buffer_capacity() -> usize {
    DEFAULT_TUI_RING_BUFFER_CAPACITY
}

fn default_tracing_bridge_enabled() -> bool {
    true
}
