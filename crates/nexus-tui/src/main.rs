use clap::Parser;
use nexus_tui::runtime::{ExitReason, RuntimeConfig, run};
use nexus_tui::stream::severity::Severity;
use nexus_tui::terminal::TerminalGuard;

#[derive(Debug, Parser)]
#[command(
    name = "nexus",
    version,
    about = "Streaming terminal console for nexus-dnn host events."
)]
struct Cli {
    /// Base URL of the host (e.g. http://127.0.0.1:7878). May also be set via NEXUS_HOST_URL.
    #[arg(long, env = "NEXUS_HOST_URL", default_value = "http://127.0.0.1:7878")]
    host_url: String,

    /// Initial level floor (debug, info, warn, error, fatal).
    #[arg(long, default_value = "info")]
    level: String,

    /// Ring buffer capacity (events).
    #[arg(long, default_value_t = 50_000)]
    ring_buffer: usize,

    /// Skip the host reachability probe at startup.
    #[arg(long)]
    no_probe: bool,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    let level_floor = cli.level.parse::<Severity>().unwrap_or(Severity::Info);
    let cfg = RuntimeConfig {
        host_url: cli.host_url,
        ring_buffer_capacity: cli.ring_buffer,
        level_floor,
        probe_host_on_startup: !cli.no_probe,
    };

    let _guard = match TerminalGuard::new() {
        Ok(g) => Some(g),
        Err(err) => {
            eprintln!("nexus: warning — could not enable raw mode: {err}");
            None
        }
    };

    let outcome = run(cfg).await?;
    match outcome {
        ExitReason::OperatorQuit => Ok(()),
        ExitReason::HostUnreachable(reason) => {
            eprintln!("nexus: {reason}");
            std::process::exit(2);
        }
    }
}
