use std::io::IsTerminal;
use std::path::{Path, PathBuf};
use std::process::Stdio;
use std::sync::Arc;
use std::time::{Duration, Instant};

use anyhow::Context;
use nexus_core::app::NexusApp;
use nexus_core::config::{NexusConfig, RuntimeMode};
use nexus_core::log_format::PrettyFormat;
use nexus_core::tracing_bridge::{TargetFilter, TracingBridgeLayer};
use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::redaction::SensitiveNameAllowlist;
use tokio::process::Command;
use tracing_appender::non_blocking::WorkerGuard;
use tracing_subscriber::{EnvFilter, fmt, layer::SubscriberExt, util::SubscriberInitExt};

const TUI_BIN_NAME: &str = if cfg!(windows) { "nexus.exe" } else { "nexus" };
const TUI_HOST_PROBE_TIMEOUT: Duration = Duration::from_secs(60);
const TUI_HOST_PROBE_INTERVAL: Duration = Duration::from_millis(250);

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let (config, runtime_mode) = NexusConfig::load_with_runtime()?;
    let port = config.port;
    let event_bus = Arc::new(BroadcastEventBus::with_capacities(
        1024,
        config.tui.ring_buffer_capacity,
    ));
    let shared_event_bus: Arc<dyn EventBus> = event_bus.clone();
    let _appender_guard = initialize_tracing(
        &config,
        Some(shared_event_bus.clone()),
        runtime_mode.with_tui,
    );

    tracing::info!("nexus-dnn starting");

    let app = NexusApp::new(config, shared_event_bus);

    if runtime_mode.with_tui {
        return run_with_tui(app, port, &runtime_mode).await;
    }

    app.run().await.context("nexus-dnn failed")?;
    Ok(())
}

async fn run_with_tui(app: NexusApp, port: u16, runtime_mode: &RuntimeMode) -> anyhow::Result<()> {
    let host_url = format!("http://127.0.0.1:{port}");
    let tui_bin = match runtime_mode.tui_bin.clone() {
        Some(p) => p,
        None => find_tui_binary()?,
    };

    let host_handle = tokio::spawn(async move { app.run().await });

    if let Err(err) = wait_for_host_ready(&host_url).await {
        host_handle.abort();
        anyhow::bail!("--with-tui: host never bound {host_url}: {err}");
    }

    let mut tui = Command::new(&tui_bin)
        .arg("--host-url")
        .arg(&host_url)
        .arg("--no-probe")
        .stdin(Stdio::inherit())
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .kill_on_drop(true)
        .spawn()
        .with_context(|| format!("failed to spawn TUI binary {}", tui_bin.display()))?;

    let exit = tui.wait().await.context("TUI process wait failed")?;

    host_handle.abort();
    let _ = host_handle.await;

    if !exit.success() {
        let code = exit.code().unwrap_or(1);
        std::process::exit(code);
    }
    Ok(())
}

fn find_tui_binary() -> anyhow::Result<PathBuf> {
    let exe = std::env::current_exe().context("could not resolve current executable path")?;
    let dir = exe
        .parent()
        .map(Path::to_path_buf)
        .unwrap_or_else(|| PathBuf::from("."));
    let mut searched: Vec<PathBuf> = Vec::new();

    let primary = dir.join(TUI_BIN_NAME);
    searched.push(primary.clone());
    if primary.is_file() {
        return Ok(primary);
    }
    let mut cursor = dir.as_path();
    for _ in 0..3 {
        let Some(parent) = cursor.parent() else {
            break;
        };
        let candidate = parent.join(TUI_BIN_NAME);
        searched.push(candidate.clone());
        if candidate.is_file() {
            return Ok(candidate);
        }
        cursor = parent;
    }
    anyhow::bail!(
        "{TUI_BIN_NAME} not found alongside `nexus-dnn`. Searched: {searched:?}. \
         Run `cargo build --bin nexus` first or pass --tui-bin <PATH>."
    )
}

async fn wait_for_host_ready(host_url: &str) -> Result<(), String> {
    let url = format!("{}/api/host/info", host_url.trim_end_matches('/'));
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(2))
        .build()
        .map_err(|e| format!("client build failed: {e}"))?;
    let started = Instant::now();
    loop {
        if let Ok(r) = client.get(&url).send().await
            && r.status().is_success()
        {
            return Ok(());
        }
        if started.elapsed() >= TUI_HOST_PROBE_TIMEOUT {
            return Err(format!("timed out after {:?}", TUI_HOST_PROBE_TIMEOUT));
        }
        tokio::time::sleep(TUI_HOST_PROBE_INTERVAL).await;
    }
}

fn initialize_tracing(
    config: &NexusConfig,
    event_bus: Option<Arc<dyn EventBus>>,
    suppress_stdout: bool,
) -> Option<WorkerGuard> {
    if config.debug_async {
        return install_console_subscriber();
    }

    let env_filter = build_env_filter(&config.log_level);
    let logs_dir = config.logs_dir();
    let file_appender_outcome = create_file_appender(&logs_dir);
    let stdout_use_ansi = std::io::stdout().is_terminal() && std::env::var_os("NO_COLOR").is_none();
    let stdout_layer = if suppress_stdout {
        None
    } else {
        Some(
            fmt::layer()
                .with_ansi(stdout_use_ansi)
                .event_format(PrettyFormat {
                    use_ansi: stdout_use_ansi,
                }),
        )
    };

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
            "extension_install=debug",
            "extension_install::probe=debug",
            "extension_install::bootstrap_python=debug",
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
