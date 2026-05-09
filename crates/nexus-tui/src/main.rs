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

    /// Enable cursor save/restore choreography so ambient lines print above
    /// the prompt without disturbing the input cursor. Default off — some
    /// terminal emulators handle save/restore inconsistently mid-read.
    #[arg(long)]
    cursor_choreography: bool,

    /// Disable mouse capture (SGR 1006 click triage + right-click menu).
    /// Default: enabled. Use `--no-mouse` if your terminal mishandles
    /// mouse events or you need uninterrupted text-selection.
    #[arg(long = "no-mouse", action = clap::ArgAction::SetTrue)]
    no_mouse: bool,

    /// Replace Unicode severity + source-category glyphs with ASCII proxies
    /// (e.g. `*`, `>`, `!`, `X`, `#`). Use on terminals that cannot render
    /// the Unicode set. Box-drawing and Braille sparkline glyphs are NOT
    /// affected by this flag — see spec 044 FR-008a.
    #[arg(long = "no-glyphs", action = clap::ArgAction::SetTrue)]
    no_glyphs: bool,

    /// Spawn the `nexus-dnn` host as a child process and tear it down on
    /// TUI exit. Looks for the binary next to `nexus` itself unless
    /// `--host-bin <PATH>` overrides. Stdout + stderr go to
    /// `~/.nexus/host.log`; structured events arrive normally via SSE.
    #[arg(long)]
    with_host: bool,

    /// Override the path to the `nexus-dnn` host binary used by
    /// `--with-host`. Useful when running from a release build whose
    /// `nexus-dnn` lives outside the workspace `target/` tree.
    #[arg(long, value_name = "PATH")]
    host_bin: Option<std::path::PathBuf>,
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
        cursor_choreography: cli.cursor_choreography,
        enable_mouse: !cli.no_mouse,
        ascii_glyphs: cli.no_glyphs,
        spawn_host: cli.with_host,
        host_bin: cli.host_bin,
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
