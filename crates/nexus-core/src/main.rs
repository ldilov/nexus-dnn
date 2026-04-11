mod app;
mod config;

use anyhow::Context;
use clap::Parser;
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

use crate::app::NexusApp;
use crate::config::NexusConfig;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = NexusConfig::parse();
    initialize_tracing(&config.log_level);

    tracing::info!("nexus-dnn starting");

    let app = NexusApp::new(config);
    app.run().await.context("nexus-dnn failed")?;

    Ok(())
}

fn initialize_tracing(default_level: &str) {
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(default_level));

    tracing_subscriber::registry()
        .with(fmt::layer())
        .with(env_filter)
        .init();
}
