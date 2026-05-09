use std::io::IsTerminal;
use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use nexus_core::app::NexusApp;
use nexus_core::config::NexusConfig;
use nexus_core::log_format::PrettyFormat;
use nexus_core::tracing_bridge::{TargetFilter, TracingBridgeLayer};
use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::redaction::SensitiveNameAllowlist;
use tracing_appender::non_blocking::WorkerGuard;
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = NexusConfig::load()?;
    let event_bus = Arc::new(BroadcastEventBus::with_capacities(
        1024,
        config.tui.ring_buffer_capacity,
    ));
    let shared_event_bus: Arc<dyn EventBus> = event_bus.clone();
    let _appender_guard = initialize_tracing(&config, Some(shared_event_bus.clone()));

    tracing::info!("nexus-dnn starting");

    let app = NexusApp::new(config, shared_event_bus);
    app.run().await.context("nexus-dnn failed")?;

    Ok(())
}

fn initialize_tracing(
    config: &NexusConfig,
    event_bus: Option<Arc<dyn EventBus>>,
) -> Option<WorkerGuard> {
    if config.debug_async {
        return install_console_subscriber();
    }

    let env_filter = build_env_filter(&config.log_level);
    let logs_dir = config.logs_dir();
    let file_appender_outcome = create_file_appender(&logs_dir);
    let stdout_use_ansi = std::io::stdout().is_terminal() && std::env::var_os("NO_COLOR").is_none();
    let stdout_layer = fmt::layer()
        .with_ansi(stdout_use_ansi)
        .event_format(PrettyFormat {
            use_ansi: stdout_use_ansi,
        });

    let file_layer = file_appender_outcome.as_ref().map(|(non_blocking, _)| {
        fmt::layer()
            .with_writer(non_blocking.clone())
            .with_ansi(false)
            .event_format(PrettyFormat { use_ansi: false })
    });

    let bridge_layer = if config.tui.tracing_bridge.enabled {
        event_bus.map(|bus| {
            TracingBridgeLayer::new(
                bus,
                SensitiveNameAllowlist::new(
                    config
                        .tui
                        .tracing_bridge
                        .extra_sensitive_patterns
                        .iter()
                        .cloned(),
                ),
                TargetFilter::default(),
            )
        })
    } else {
        None
    };

    tracing_subscriber::registry()
        .with(stdout_layer)
        .with(file_layer)
        .with(env_filter)
        .with(bridge_layer)
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

fn create_file_appender(
    logs_dir: &Path,
) -> Option<(tracing_appender::non_blocking::NonBlocking, WorkerGuard)> {
    if let Err(error) = std::fs::create_dir_all(logs_dir) {
        eprintln!(
            "[startup] could not create logs dir {}: {error} - file logging disabled",
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
        "[startup] --debug-async: installing console-subscriber. Compact terminal logs and rotating file output are disabled until restart without this flag. Connect with `tokio-console`."
    );
    console_subscriber::init();
    None
}

#[cfg(not(feature = "console"))]
fn install_console_subscriber() -> Option<WorkerGuard> {
    eprintln!(
        "[startup] --debug-async was passed but `nexus-core` was built without the `console` feature. Rebuild with `RUSTFLAGS=\"--cfg tokio_unstable\" cargo build --features console` to enable. Falling back to env-filter terminal logging - file rotation is also disabled in this fallback path."
    );
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
    let use_ansi = std::io::stdout().is_terminal() && std::env::var_os("NO_COLOR").is_none();
    tracing_subscriber::registry()
        .with(
            fmt::layer()
                .with_ansi(use_ansi)
                .event_format(PrettyFormat { use_ansi }),
        )
        .with(env_filter)
        .init();
    None
}
