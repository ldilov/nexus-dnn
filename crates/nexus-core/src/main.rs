mod app;
mod config;

use anyhow::Context;
use clap::Parser;
use tracing_subscriber::fmt::format::Writer;
use tracing_subscriber::fmt::time::FormatTime;
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

use crate::app::NexusApp;
use crate::config::NexusConfig;

/// Compact local-time formatter: `15:59:42.448` instead of the default
/// full RFC-3339 string. Easier to scan when tailing the host log.
struct CompactLocalTime;

impl FormatTime for CompactLocalTime {
    fn format_time(&self, w: &mut Writer<'_>) -> std::fmt::Result {
        write!(w, "{}", chrono::Local::now().format("%H:%M:%S%.3f"))
    }
}

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
    // RUST_LOG wins when set. Otherwise build a sensible default that:
    //   - keeps host crates at the configured level (info/debug/...)
    //   - elevates spec-035 install-flow targets to DEBUG so we never lose the
    //     download / extract / probe trail
    //   - silences noisy third-party HTTP/TLS/WS layers that otherwise drown
    //     out the install logs at DEBUG level
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| {
        let directives = [
            default_level,
            // Spec 035 dep installer — always verbose
            "spec_035=debug",
            "spec_035::probe=debug",
            "spec_035::bootstrap_python=debug",
            "nexus_extension_deps=debug",
            "nexus_extension_deps::runner=debug",
            "nexus_extension_deps::handlers=debug",
            // Our own HTTP handlers — keep at info
            "nexus_api::handlers::extension_dependencies=debug",
            // Silence the third-party HTTP/TLS/WS noise. These default to
            // emitting per-request DEBUG spam that drowns the install trail.
            "hyper=info",
            "hyper_util=info",
            "h2=info",
            "reqwest=info",
            "rustls=info",
            "tokio_util=info",
            "tower_http=info",
            "tungstenite=info",
            "tokio_tungstenite=info",
            "axum::rejection=info",
            "want=info",
        ];
        EnvFilter::new(directives.join(","))
    });

    // ANSI colors are auto-disabled when stdout is not a TTY (e.g.,
    // `cargo run | tee log.txt` or systemd journal capture). The
    // `compact()` style folds structured fields onto the same line as
    // the message, which trims the noisy lease_id=... tail and makes
    // each event a single readable line. The local-time formatter
    // drops the date prefix and the redundant microseconds.
    tracing_subscriber::registry()
        .with(
            fmt::layer()
                .compact()
                .with_target(true)
                .with_thread_ids(false)
                .with_level(true)
                .with_ansi(true)
                .with_timer(CompactLocalTime),
        )
        .with(env_filter)
        .init();
}
