use std::path::PathBuf;

use clap::Parser;

const DEFAULT_PORT: u16 = 3000;
const DEFAULT_LOG_LEVEL: &str = "info,tower_http=debug";
const DATA_DIR_NAME: &str = ".nexus";

#[derive(Parser, Debug, Clone)]
#[command(
    name = "nexus-dnn",
    about = "Local-first extensible AI workflow platform"
)]
pub struct NexusConfig {
    #[arg(long, env = "NEXUS_DATA_DIR")]
    pub data_dir: Option<PathBuf>,

    #[arg(long, env = "NEXUS_PORT", default_value_t = DEFAULT_PORT)]
    pub port: u16,

    #[arg(long, env = "NEXUS_LOG_LEVEL", default_value = DEFAULT_LOG_LEVEL)]
    pub log_level: String,
}

impl NexusConfig {
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

    pub fn logs_dir(&self) -> PathBuf {
        self.resolved_data_dir().join("logs")
    }
}

fn default_data_directory() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(DATA_DIR_NAME)
}
