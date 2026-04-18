use tracing_subscriber::EnvFilter;
use tracing_subscriber::fmt;
use tracing_subscriber::prelude::*;

pub const EXTENSION_ID: &str = "nexus.local-llm";

pub fn init() {
    let filter = EnvFilter::try_from_default_env()
        .or_else(|_| EnvFilter::try_new("info"))
        .unwrap_or_else(|_| EnvFilter::new("info"));

    let json_layer = fmt::layer()
        .json()
        .flatten_event(true)
        .with_target(true)
        .with_current_span(true)
        .with_writer(std::io::stderr);

    let _ = tracing_subscriber::registry()
        .with(filter)
        .with(json_layer)
        .try_init();
}

pub fn worker_pid() -> u32 {
    std::process::id()
}
