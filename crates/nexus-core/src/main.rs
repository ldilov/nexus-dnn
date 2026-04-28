mod app;
mod config;

use std::path::Path;

use anyhow::Context;
use clap::Parser;
use tracing_appender::non_blocking::WorkerGuard;
use tracing_subscriber::fmt::format::Writer;
use tracing_subscriber::fmt::time::FormatTime;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

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
    // The `_appender_guard` keeps the non-blocking writer alive. Dropping
    // it would close the channel and silently lose buffered log lines
    // before they hit disk. Hold it for the lifetime of `main`.
    let _appender_guard = initialize_tracing(&config);

    tracing::info!("nexus-dnn starting");

    let app = NexusApp::new(config);
    app.run().await.context("nexus-dnn failed")?;

    Ok(())
}

/// Returns the tracing-appender `WorkerGuard` so the caller can keep it
/// alive — dropping it flushes pending writes and closes the file.
/// Returns `None` when the console-subscriber owns the dispatcher
/// (debug-async mode bypasses our layers entirely) or when the logs
/// directory could not be created (terminal logging continues).
fn initialize_tracing(config: &NexusConfig) -> Option<WorkerGuard> {
    if config.debug_async {
        return install_console_subscriber();
    }

    let env_filter = build_env_filter(&config.log_level);
    let logs_dir = config.logs_dir();
    let file_appender_outcome = create_file_appender(&logs_dir);

    let stdout_layer = fmt::layer()
        .compact()
        .with_target(true)
        .with_thread_ids(false)
        .with_level(true)
        .with_ansi(true)
        .with_timer(CompactLocalTime);

    // Build the registry. tracing-subscriber's `Option<Layer>`
    // implementation lets us conditionally include the file layer
    // without resorting to a boxed trait object (which doesn't compose
    // cleanly with chained `.with()` calls on a layered subscriber).
    let file_layer = file_appender_outcome.as_ref().map(|(non_blocking, _)| {
        fmt::layer()
            .with_writer(non_blocking.clone())
            .with_ansi(false)
            .with_target(true)
            .with_thread_ids(false)
            .with_level(true)
            .with_timer(CompactLocalTime)
    });

    tracing_subscriber::registry()
        .with(stdout_layer)
        .with(file_layer)
        .with(env_filter)
        .init();

    match &file_appender_outcome {
        Some(_) => tracing::info!(
            target: "nexus_core::startup",
            logs_dir = %logs_dir.display(),
            "rotating log file installed (daily rotation, ANSI off)"
        ),
        None => tracing::warn!(
            target: "nexus_core::startup",
            logs_dir = %logs_dir.display(),
            "could not create log directory; file logging disabled (terminal logging continues)"
        ),
    }

    file_appender_outcome.map(|(_, guard)| guard)
}

fn build_env_filter(default_level: &str) -> EnvFilter {
    // RUST_LOG wins when set. Otherwise build a sensible default that:
    //   - keeps host crates at the configured level (info/debug/...)
    //   - elevates spec-035 install-flow targets to DEBUG so we never lose the
    //     download / extract / probe trail
    //   - silences noisy third-party HTTP/TLS/WS layers that otherwise drown
    //     out the install logs at DEBUG level
    EnvFilter::try_from_default_env().unwrap_or_else(|_| {
        let directives = [
            default_level,
            "spec_035=debug",
            "spec_035::probe=debug",
            "spec_035::bootstrap_python=debug",
            "nexus_extension_deps=debug",
            "nexus_extension_deps::runner=debug",
            "nexus_extension_deps::handlers=debug",
            "nexus_api::handlers::extension_dependencies=debug",
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
    })
}

/// Build a non-blocking, daily-rotating file appender writing to
/// `<logs_dir>/nexus-dnn.log.YYYY-MM-DD`. Returns the writer and its
/// `WorkerGuard`; the guard MUST be retained or pending writes are
/// silently dropped on shutdown.
fn create_file_appender(
    logs_dir: &Path,
) -> Option<(tracing_appender::non_blocking::NonBlocking, WorkerGuard)> {
    if let Err(e) = std::fs::create_dir_all(logs_dir) {
        eprintln!(
            "[startup] could not create logs dir {}: {e} — file logging disabled",
            logs_dir.display()
        );
        return None;
    }
    let file_appender = tracing_appender::rolling::daily(logs_dir, "nexus-dnn.log");
    let (non_blocking, guard) = tracing_appender::non_blocking(file_appender);
    Some((non_blocking, guard))
}

#[cfg(feature = "console")]
fn install_console_subscriber() -> Option<WorkerGuard> {
    eprintln!(
        "[startup] --debug-async: installing console-subscriber. \
         Compact terminal logs and rotating file output are disabled \
         until restart without this flag. Connect with `tokio-console`."
    );
    console_subscriber::init();
    None
}

#[cfg(not(feature = "console"))]
fn install_console_subscriber() -> Option<WorkerGuard> {
    eprintln!(
        "[startup] --debug-async was passed but `nexus-core` was built \
         without the `console` feature. Rebuild with \
         `RUSTFLAGS=\"--cfg tokio_unstable\" cargo build --features console` \
         to enable. Falling back to env-filter terminal logging — file \
         rotation is also disabled in this fallback path."
    );
    let env_filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info"));
    tracing_subscriber::registry()
        .with(
            fmt::layer()
                .compact()
                .with_target(true)
                .with_level(true)
                .with_ansi(true)
                .with_timer(CompactLocalTime),
        )
        .with(env_filter)
        .init();
    None
}
