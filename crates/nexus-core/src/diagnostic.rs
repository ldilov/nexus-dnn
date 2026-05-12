//! Startup self-diagnostic — gathers a small set of environment facts
//! and emits them as a structured banner so any "why is X broken?"
//! debugging session has the answers in the log without re-running
//! anything.
//!
//! Checks:
//!   - OS + architecture
//!   - Data directory writability
//!   - Database file presence + size
//!   - Logs directory
//!   - `ffmpeg` on PATH (used by EmotionTTS for voice asset probe + decode)
//!   - `nvcc` on PATH (CUDA Toolkit; informs which extensions can JIT
//!     custom CUDA kernels — see worker `_resolve_use_cuda_kernel`)
//!
//! Each check resolves to one of:
//!   - `Status::Ok`   — fact captured, no action needed
//!   - `Status::Warn` — fact suggests degraded behavior (e.g. nvcc
//!     missing → BigVGAN custom kernel disabled)
//!   - `Status::Info` — neutral fact (a path, a count) without
//!     pass/fail semantics
//!
//! Emits via `target: BANNER_TARGET` so the formatter drops the
//! standard timestamp/icon/level prefix per line.

use std::path::Path;

use crate::config::NexusConfig;
use crate::log_format::BANNER_TARGET;

#[derive(Debug, Clone, Copy)]
enum Status {
    Ok,
    Warn,
    Info,
}

impl Status {
    fn glyph(self) -> &'static str {
        match self {
            Status::Ok => "●",
            Status::Warn => "⚠",
            Status::Info => "·",
        }
    }
}

struct Check {
    status: Status,
    name: &'static str,
    detail: String,
}

/// Run the full diagnostic and emit results to the log via
/// `BANNER_TARGET`. Called from `NexusApp::initialize()` after data
/// directory creation completes so every check has a stable workspace.
pub fn run_and_log(config: &NexusConfig) {
    let checks = collect_checks(config);
    log_banner(&checks);
}

fn collect_checks(config: &NexusConfig) -> Vec<Check> {
    vec![
        check_os(),
        check_data_dir(config),
        check_data_dir_writable(&config.resolved_data_dir()),
        check_database(config),
        check_logs_dir(config),
        check_ffmpeg(),
        check_nvcc(),
    ]
}

fn check_os() -> Check {
    Check {
        status: Status::Info,
        name: "os",
        detail: format!("{} ({})", std::env::consts::OS, std::env::consts::ARCH),
    }
}

fn check_data_dir(config: &NexusConfig) -> Check {
    let dir = config.resolved_data_dir();
    let exists = dir.exists();
    Check {
        status: if exists { Status::Info } else { Status::Warn },
        name: "data_dir",
        detail: format!(
            "{}{}",
            dir.display(),
            if exists { "" } else { " (missing)" }
        ),
    }
}

fn check_data_dir_writable(dir: &Path) -> Check {
    let probe = dir.join(".nexus-write-probe");
    let writable = std::fs::create_dir_all(dir).is_ok() && std::fs::write(&probe, b"1").is_ok();
    let _ = std::fs::remove_file(&probe);
    Check {
        status: if writable { Status::Ok } else { Status::Warn },
        name: "data_dir.writable",
        detail: if writable {
            "yes".to_string()
        } else {
            "no — startup will fail to persist state".to_string()
        },
    }
}

fn check_database(config: &NexusConfig) -> Check {
    let db_path = config.resolved_data_dir().join("db").join("nexus.db");
    match std::fs::metadata(&db_path) {
        Ok(meta) => Check {
            status: Status::Info,
            name: "database",
            detail: format!(
                "{} ({:.1} MiB)",
                db_path.display(),
                meta.len() as f64 / (1024.0 * 1024.0)
            ),
        },
        Err(_) => Check {
            status: Status::Info,
            name: "database",
            detail: format!("{} (will be created)", db_path.display()),
        },
    }
}

fn check_logs_dir(config: &NexusConfig) -> Check {
    Check {
        status: Status::Info,
        name: "logs_dir",
        detail: config.logs_dir().display().to_string(),
    }
}

fn check_ffmpeg() -> Check {
    match which("ffmpeg") {
        Some(path) => Check {
            status: Status::Ok,
            name: "ffmpeg",
            detail: format!("{path} (system PATH)"),
        },
        None => Check {
            status: Status::Warn,
            name: "ffmpeg",
            detail: "not on PATH — extensions needing it must bundle their own (EmotionTTS does)"
                .to_string(),
        },
    }
}

fn check_nvcc() -> Check {
    match which("nvcc") {
        Some(path) => Check {
            status: Status::Ok,
            name: "nvcc",
            detail: format!(
                "{path} (CUDA Toolkit found; BigVGAN custom kernel JIT will be attempted)"
            ),
        },
        None => Check {
            status: Status::Warn,
            name: "nvcc",
            detail: "not on PATH (CUDA Toolkit missing; BigVGAN custom kernel disabled — \
                 vocoder uses torch fallback, ~10-30% slower)"
                .to_string(),
        },
    }
}

/// Tiny `which`-equivalent. Walks `PATH`, looking for `name` (or
/// `name.exe` on Windows). Returns the first hit. Avoids pulling in
/// the `which` crate for two call sites.
fn which(name: &str) -> Option<String> {
    let exe = if cfg!(windows) {
        format!("{name}.exe")
    } else {
        name.to_string()
    };
    let path_env = std::env::var_os("PATH")?;
    for dir in std::env::split_paths(&path_env) {
        let candidate = dir.join(&exe);
        if candidate.is_file() {
            return Some(candidate.display().to_string());
        }
    }
    None
}

fn log_banner(checks: &[Check]) {
    let name_width = checks.iter().map(|c| c.name.len()).max().unwrap_or(0);
    let rule = "─".repeat(60);

    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(target: BANNER_TARGET, "  {rule}");
    tracing::info!(target: BANNER_TARGET, "    Self-Diagnostic");
    tracing::info!(target: BANNER_TARGET, "  {rule}");
    for check in checks {
        let glyph = check.status.glyph();
        let line = format!(
            "    {glyph}  {name:<name_width$}  {detail}",
            name = check.name,
            detail = check.detail,
        );
        match check.status {
            Status::Warn => tracing::warn!(target: BANNER_TARGET, "{}", line),
            _ => tracing::info!(target: BANNER_TARGET, "{}", line),
        }
    }
    tracing::info!(target: BANNER_TARGET, "  {rule}");
    tracing::info!(target: BANNER_TARGET, "");
}
