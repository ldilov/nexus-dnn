//! `--with-host` orchestration.
//!
//! Spawns the `nexus-dnn` host as a child process, waits up to
//! [`HOST_PROBE_TIMEOUT`] for `/api/host/info` to respond `200 OK`, and
//! tears the child down when the [`HostChild`] handle is dropped (via
//! tokio's `kill_on_drop`). Stdout + stderr are appended to
//! `~/.nexus/host.log` so any panics or non-tracing prints survive the
//! TUI session — the structured event stream still arrives via SSE.
//!
//! The default binary lookup walks the same directory as the current
//! `nexus` executable (so a `target/debug/nexus.exe` invocation finds
//! `target/debug/nexus-dnn.exe` next door), then climbs up to three
//! parent directories to handle `cargo test` deps-prefixed paths.
//! Operators can bypass discovery via `--host-bin <PATH>`.

use std::path::{Path, PathBuf};
use std::process::Stdio;
use std::time::{Duration, Instant};

use tokio::process::{Child, Command};

const HOST_BIN_NAME: &str = if cfg!(windows) {
    "nexus-dnn.exe"
} else {
    "nexus-dnn"
};
const HOST_PROBE_TIMEOUT: Duration = Duration::from_secs(15);
const HOST_PROBE_INTERVAL: Duration = Duration::from_millis(250);

#[derive(Debug, thiserror::Error)]
pub enum HostChildError {
    #[error(
        "nexus-dnn binary not found alongside `nexus`. Searched: {searched:?}. \
         Run `cargo build --bin nexus-dnn` first, or pass --host-bin <PATH>."
    )]
    BinaryNotFound { searched: Vec<PathBuf> },
    #[error("failed to determine current executable path: {0}")]
    CurrentExe(#[source] std::io::Error),
    #[error("failed to open host log {path}: {source}")]
    LogOpen {
        path: PathBuf,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to spawn nexus-dnn at {bin}: {source}")]
    Spawn {
        bin: PathBuf,
        #[source]
        source: std::io::Error,
    },
    #[error("host did not become reachable on {host_url} within {timeout:?}")]
    HostNotReady { host_url: String, timeout: Duration },
}

/// RAII guard over a spawned `nexus-dnn` child process. Tokio's
/// `kill_on_drop(true)` ensures the process is terminated when this
/// handle goes out of scope, so the TUI's normal exit path
/// (Ctrl+D / `/quit`) takes the host down with it.
pub struct HostChild {
    child: Child,
    log_path: PathBuf,
    bin: PathBuf,
}

impl HostChild {
    pub fn log_path(&self) -> &Path {
        &self.log_path
    }

    pub fn bin_path(&self) -> &Path {
        &self.bin
    }

    /// Best-effort graceful shutdown. Sends a kill signal and waits up
    /// to 3 s for the child to exit. After that the handle is dropped
    /// (which triggers `kill_on_drop` in case the process is still up).
    pub async fn shutdown(mut self) {
        let _ = self.child.start_kill();
        let _ = tokio::time::timeout(Duration::from_secs(3), self.child.wait()).await;
    }
}

/// Spawn the host and block until it is reachable, or return an error
/// after [`HOST_PROBE_TIMEOUT`].
pub async fn spawn_host_and_wait(
    explicit_bin: Option<&Path>,
    host_url: &str,
) -> Result<HostChild, HostChildError> {
    let bin = match explicit_bin {
        Some(p) => p.to_path_buf(),
        None => find_host_binary()?,
    };

    let log_path = host_log_path();
    if let Some(parent) = log_path.parent() {
        let _ = std::fs::create_dir_all(parent);
    }

    let stdout_log = open_log_file(&log_path)?;
    let stderr_log = stdout_log
        .try_clone()
        .map_err(|e| HostChildError::LogOpen {
            path: log_path.clone(),
            source: e,
        })?;

    eprintln!(
        "nexus: --with-host → starting {} (log: {})",
        bin.display(),
        log_path.display()
    );

    let mut cmd = Command::new(&bin);
    cmd.stdin(Stdio::null())
        .stdout(Stdio::from(stdout_log))
        .stderr(Stdio::from(stderr_log))
        .kill_on_drop(true);

    let child = cmd.spawn().map_err(|e| HostChildError::Spawn {
        bin: bin.clone(),
        source: e,
    })?;

    wait_for_host_ready(host_url).await?;

    Ok(HostChild {
        child,
        log_path,
        bin,
    })
}

fn open_log_file(path: &Path) -> Result<std::fs::File, HostChildError> {
    std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(path)
        .map_err(|e| HostChildError::LogOpen {
            path: path.to_path_buf(),
            source: e,
        })
}

fn find_host_binary() -> Result<PathBuf, HostChildError> {
    let exe = std::env::current_exe().map_err(HostChildError::CurrentExe)?;
    let dir = exe
        .parent()
        .map(Path::to_path_buf)
        .unwrap_or_else(|| PathBuf::from("."));
    find_host_binary_in(&dir).map_err(|searched| HostChildError::BinaryNotFound { searched })
}

/// Pure-fn search used by the public discovery + by unit tests.
/// Returns the first matching path; on miss, returns the list of
/// candidates probed so the caller can surface them in the error.
pub fn find_host_binary_in(start_dir: &Path) -> Result<PathBuf, Vec<PathBuf>> {
    let mut searched: Vec<PathBuf> = Vec::new();

    let primary = start_dir.join(HOST_BIN_NAME);
    searched.push(primary.clone());
    if primary.is_file() {
        return Ok(primary);
    }

    let mut cursor = start_dir;
    for _ in 0..3 {
        match cursor.parent() {
            Some(parent) => {
                let candidate = parent.join(HOST_BIN_NAME);
                searched.push(candidate.clone());
                if candidate.is_file() {
                    return Ok(candidate);
                }
                cursor = parent;
            }
            None => break,
        }
    }

    Err(searched)
}

async fn wait_for_host_ready(host_url: &str) -> Result<(), HostChildError> {
    let url = format!("{}/api/host/info", host_url.trim_end_matches('/'));
    let client = match reqwest::Client::builder()
        .timeout(Duration::from_secs(2))
        .build()
    {
        Ok(c) => c,
        Err(e) => {
            return Err(HostChildError::Spawn {
                bin: PathBuf::from("<reqwest>"),
                source: std::io::Error::other(e),
            });
        }
    };
    let started = Instant::now();
    loop {
        if let Ok(r) = client.get(&url).send().await
            && r.status().is_success()
        {
            return Ok(());
        }
        if started.elapsed() >= HOST_PROBE_TIMEOUT {
            return Err(HostChildError::HostNotReady {
                host_url: host_url.to_string(),
                timeout: HOST_PROBE_TIMEOUT,
            });
        }
        tokio::time::sleep(HOST_PROBE_INTERVAL).await;
    }
}

fn host_log_path() -> PathBuf {
    dirs_home()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".nexus")
        .join("host.log")
}

fn dirs_home() -> Option<PathBuf> {
    std::env::var_os("HOME")
        .or_else(|| std::env::var_os("USERPROFILE"))
        .map(PathBuf::from)
}
