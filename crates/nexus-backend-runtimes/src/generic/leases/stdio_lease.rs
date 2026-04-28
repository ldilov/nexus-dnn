//! Concrete [`BackendRuntimeLease`] over a stdio subprocess (T076).
//!
//! Spawns the worker via `tokio::process::Command` with `kill_on_drop(true)`,
//! pipes stdin/stdout/stderr, and wires three internal tasks:
//!
//! - **writer** — serialises outbound RPC + shutdown frames through the
//!   framer and flushes to the subprocess stdin.
//! - **reader** — pulls NDJSON frames from stdout, dispatches responses
//!   to the [`Matchmaker`] and notifications to the [`NotificationFanout`].
//! - **stderr forwarder** — forwards worker stderr to the host's
//!   `tracing::info!` pipeline so worker logs land in the same sink as
//!   the rest of the backend.
//!
//! State transitions: `Starting → Ready → Busy ⇄ Ready → Stopping →
//! Released`; worker crash / reader EOF unwinds to `Failed → Released`.

use std::collections::HashMap;
use std::process::Stdio;
use std::sync::{Arc, Mutex};
use std::time::Duration;

use async_trait::async_trait;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::process::{Child, ChildStdin, Command};
use tokio::sync::{Mutex as TokioMutex, broadcast, mpsc};
use tokio::task::JoinHandle;

use super::error::LeaseError;
use super::framer::{IncomingFrame, RpcRequest, read_frame};
use super::matchmaker::{Matchmaker, MatchmakerFailure};
use super::notifications::NotificationFanout;
use super::trait_def::{BackendRuntimeLease, LeaseNotification};
use crate::generic::enums::LeaseState;
use crate::generic::ids::RuntimeLeaseId;
use crate::generic::install_ctx::LaunchSpec;

/// Default per-request RPC timeout. Individual calls may override via
/// [`StdioLease::send_rpc_with_timeout`].
pub const DEFAULT_RPC_TIMEOUT: Duration = Duration::from_secs(30);

/// Grace period for cooperative shutdown after closing stdin. Past this
/// the subprocess is SIGKILLed (R-04).
pub const SHUTDOWN_GRACE: Duration = Duration::from_secs(5);

/// Concrete stdio-transport lease. Cloneable via `Arc`; lease-owning
/// callers hold `Arc<StdioLease>` and hand off `&dyn BackendRuntimeLease`
/// to RPC consumers.
pub struct StdioLease {
    lease_id: RuntimeLeaseId,
    state: Arc<Mutex<LeaseState>>,
    matchmaker: Arc<Matchmaker>,
    fanout: NotificationFanout,
    writer_tx: mpsc::Sender<WriterCmd>,
    child: Arc<TokioMutex<Option<Child>>>,
    pid: Option<u32>,
    rpc_timeout: Duration,
    // Join handles kept for graceful teardown / aborting on release.
    #[allow(dead_code)]
    reader_task: Arc<TokioMutex<Option<JoinHandle<()>>>>,
    #[allow(dead_code)]
    writer_task: Arc<TokioMutex<Option<JoinHandle<()>>>>,
}

enum WriterCmd {
    Frame(serde_json::Value),
    Shutdown,
}

impl StdioLease {
    /// Spawn the worker subprocess and wire all three internal tasks.
    /// Returns the lease in `Starting` state; callers run the handshake
    /// via [`super::handshake::do_handshake`] to transition to `Ready`.
    pub async fn spawn(
        spec: LaunchSpec,
        lease_id: RuntimeLeaseId,
    ) -> Result<Arc<Self>, LeaseError> {
        let mut cmd = Command::new(&spec.program);
        cmd.args(&spec.args)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .kill_on_drop(true);
        for (k, v) in &spec.env {
            cmd.env(k, v);
        }
        if let Some(dir) = &spec.working_dir {
            cmd.current_dir(dir);
        }

        let mut child = cmd.spawn().map_err(|e| {
            LeaseError::Internal(format!("spawn `{}`: {e}", spec.program.display()))
        })?;
        let pid = child.id();
        let stdin = child
            .stdin
            .take()
            .ok_or_else(|| LeaseError::Internal("child stdin missing".into()))?;
        let stdout = child
            .stdout
            .take()
            .ok_or_else(|| LeaseError::Internal("child stdout missing".into()))?;
        let stderr = child
            .stderr
            .take()
            .ok_or_else(|| LeaseError::Internal("child stderr missing".into()))?;

        let matchmaker = Arc::new(Matchmaker::new());
        let fanout = NotificationFanout::new(lease_id);
        let (writer_tx, writer_rx) = mpsc::channel::<WriterCmd>(64);

        // Writer task — owns ChildStdin.
        let writer_task = tokio::spawn(writer_loop(stdin, writer_rx));

        // Reader task — owns ChildStdout, dispatches to matchmaker + fanout.
        let matchmaker_rd = matchmaker.clone();
        let fanout_rd = fanout.clone();
        let reader_task = tokio::spawn(reader_loop(stdout, matchmaker_rd, fanout_rd));

        // Stderr forwarder — log to tracing. Small dedicated task.
        tokio::spawn(stderr_forwarder(stderr, lease_id));

        Ok(Arc::new(Self {
            lease_id,
            state: Arc::new(Mutex::new(LeaseState::Starting)),
            matchmaker,
            fanout,
            writer_tx,
            child: Arc::new(TokioMutex::new(Some(child))),
            pid,
            rpc_timeout: DEFAULT_RPC_TIMEOUT,
            reader_task: Arc::new(TokioMutex::new(Some(reader_task))),
            writer_task: Arc::new(TokioMutex::new(Some(writer_task))),
        }))
    }

    pub fn pid(&self) -> Option<u32> {
        self.pid
    }

    /// Overwrite the default per-request timeout. Useful for tests.
    pub fn set_rpc_timeout(&mut self, d: Duration) {
        self.rpc_timeout = d;
    }

    /// Override the lease state. Callers (handshake, acquire) use this
    /// to flip `Starting → Ready` after handshake success.
    pub fn set_state(&self, new: LeaseState) {
        *self.state.lock().expect("lease state mutex poisoned") = new;
    }

    pub async fn send_rpc_with_timeout(
        &self,
        method: &str,
        params: serde_json::Value,
        timeout: Duration,
    ) -> Result<serde_json::Value, LeaseError> {
        let current = *self.state.lock().expect("lease state mutex poisoned");
        if matches!(current, LeaseState::Released | LeaseState::Failed) {
            return Err(LeaseError::RuntimeUnavailable);
        }

        let (id, rx) = self.matchmaker.allocate();
        let request = RpcRequest::new(id, method, params);
        let frame =
            serde_json::to_value(&request).map_err(|e| LeaseError::Internal(e.to_string()))?;

        if self.writer_tx.send(WriterCmd::Frame(frame)).await.is_err() {
            self.matchmaker.cancel(id);
            return Err(LeaseError::WorkerCrashed);
        }

        let outcome = match tokio::time::timeout(timeout, rx).await {
            Ok(Ok(Ok(resp))) => resp,
            Ok(Ok(Err(f))) => return Err(LeaseError::from(f)),
            Ok(Err(_)) => return Err(LeaseError::WorkerCrashed),
            Err(_) => {
                self.matchmaker.cancel(id);
                return Err(LeaseError::Timeout);
            }
        };

        if let Some(err) = outcome.error {
            return Err(LeaseError::Rpc {
                code: err.code,
                message: err.message,
                data: err.data,
            });
        }
        Ok(outcome.result.unwrap_or(serde_json::Value::Null))
    }
}

#[async_trait]
impl BackendRuntimeLease for StdioLease {
    fn id(&self) -> RuntimeLeaseId {
        self.lease_id
    }

    fn state(&self) -> LeaseState {
        *self.state.lock().expect("lease state mutex poisoned")
    }

    async fn send_rpc(
        &self,
        method: &str,
        params: serde_json::Value,
    ) -> Result<serde_json::Value, LeaseError> {
        self.send_rpc_with_timeout(method, params, self.rpc_timeout)
            .await
    }

    fn subscribe_notifications(&self) -> broadcast::Receiver<LeaseNotification> {
        self.fanout.subscribe()
    }

    async fn release(&self) -> Result<(), LeaseError> {
        let already = {
            let mut st = self.state.lock().expect("lease state mutex poisoned");
            if matches!(*st, LeaseState::Released) {
                true
            } else {
                *st = LeaseState::Stopping;
                false
            }
        };
        if already {
            return Ok(());
        }

        // Cooperative: ask the worker to shutdown, best-effort. Failures
        // (worker already dead, stdin closed) are ignored — we're about
        // to reap anyway.
        let _ = tokio::time::timeout(
            Duration::from_secs(1),
            self.send_rpc_with_timeout("shutdown", serde_json::Value::Null, Duration::from_secs(1)),
        )
        .await;

        // Close writer channel so the writer task drops stdin → child
        // sees EOF and should exit cleanly.
        let _ = self.writer_tx.send(WriterCmd::Shutdown).await;
        drop(self.writer_tx.clone()); // also helps propagate close

        // Wait up to SHUTDOWN_GRACE for the child to exit; SIGKILL if it
        // lingers. `child` is Option because we take it to run wait()
        // exclusively.
        let mut guard = self.child.lock().await;
        if let Some(mut child) = guard.take() {
            match tokio::time::timeout(SHUTDOWN_GRACE, child.wait()).await {
                Ok(Ok(_status)) => {}
                Ok(Err(e)) => {
                    tracing::warn!(
                        lease_id = %self.lease_id,
                        error = %e,
                        "child wait returned error during release"
                    );
                }
                Err(_) => {
                    // Grace expired — kill.
                    let _ = child.kill().await;
                    let _ = child.wait().await;
                    tracing::warn!(
                        lease_id = %self.lease_id,
                        "worker didn't exit within {SHUTDOWN_GRACE:?}; SIGKILLed"
                    );
                }
            }
        }

        // Fail any still-pending RPCs (shouldn't be any, but be defensive).
        self.matchmaker.fail_all(MatchmakerFailure::Cancelled);

        *self.state.lock().expect("lease state mutex poisoned") = LeaseState::Released;
        Ok(())
    }
}

async fn writer_loop(mut stdin: ChildStdin, mut rx: mpsc::Receiver<WriterCmd>) {
    while let Some(cmd) = rx.recv().await {
        match cmd {
            WriterCmd::Frame(value) => {
                // Write frame inline — re-implementing framer::write_frame
                // here avoids holding stdin across an .await inside a
                // generic writer. Same 8 MB cap applies.
                let bytes = match serde_json::to_vec(&value) {
                    Ok(b) => b,
                    Err(e) => {
                        tracing::warn!(error = %e, "frame encode failed");
                        continue;
                    }
                };
                if bytes.len() + 1 > super::framer::MAX_FRAME_BYTES {
                    tracing::warn!(size = bytes.len(), "outbound frame exceeds MAX_FRAME_BYTES");
                    continue;
                }
                if stdin.write_all(&bytes).await.is_err()
                    || stdin.write_all(b"\n").await.is_err()
                    || stdin.flush().await.is_err()
                {
                    break;
                }
            }
            WriterCmd::Shutdown => break,
        }
    }
    // Dropping stdin here closes the subprocess's input — many workers
    // treat EOF as a shutdown signal.
}

async fn reader_loop(
    stdout: tokio::process::ChildStdout,
    matchmaker: Arc<Matchmaker>,
    fanout: NotificationFanout,
) {
    let mut buf = BufReader::new(stdout);
    loop {
        match read_frame(&mut buf).await {
            Ok(Some(IncomingFrame::Response(resp))) => matchmaker.resolve(resp),
            Ok(Some(IncomingFrame::Notification(n))) => {
                fanout.publish(n);
            }
            Ok(Some(IncomingFrame::ParseError(e))) => {
                tracing::warn!(error = e, "worker emitted malformed frame");
            }
            Ok(None) => {
                // EOF — worker closed stdout.
                matchmaker.fail_all(MatchmakerFailure::WorkerCrashed);
                return;
            }
            Err(e) => {
                tracing::warn!(error = %e, "reader loop terminated");
                matchmaker.fail_all(MatchmakerFailure::WorkerCrashed);
                return;
            }
        }
    }
}

async fn stderr_forwarder(stderr: tokio::process::ChildStderr, lease_id: RuntimeLeaseId) {
    let mut lines = BufReader::new(stderr).lines();
    while let Ok(Some(line)) = lines.next_line().await {
        // Classify the line so warnings + errors don't all show up as INFO.
        // Most worker output is from Python's `logging` module, which formats
        // as `<timestamp> <LEVEL> <module> <msg>` — that's the easy case.
        // We also catch a few other heuristic cues (`Traceback`,
        // `RuntimeError(`, leading `>> Failed`, etc.) that appear in libraries
        // like indextts/BigVGAN that print directly to stderr.
        match classify_stderr_line(&line) {
            StderrLevel::Error => {
                tracing::error!(target: "worker.stderr", lease_id = %lease_id, "{line}");
            }
            StderrLevel::Warn => {
                tracing::warn!(target: "worker.stderr", lease_id = %lease_id, "{line}");
            }
            StderrLevel::Info => {
                tracing::info!(target: "worker.stderr", lease_id = %lease_id, "{line}");
            }
            StderrLevel::Debug => {
                tracing::debug!(target: "worker.stderr", lease_id = %lease_id, "{line}");
            }
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StderrLevel {
    Error,
    Warn,
    Info,
    Debug,
}

/// Heuristic mapping from a worker stderr line to a tracing level.
///
/// First looks for the Python `logging` module's standard format
/// (`YYYY-MM-DD HH:MM:SS,mmm LEVEL module msg`) and extracts the level
/// token. Falls back to substring matches for common error indicators
/// (Traceback, RuntimeError, `>> Failed`, etc.) for libraries that
/// `print()` to stderr instead of using `logging`.
fn classify_stderr_line(line: &str) -> StderrLevel {
    if let Some(level) = extract_python_logging_level(line) {
        return level;
    }
    let trimmed = line.trim_start();
    // Tracebacks and explicit error names → ERROR.
    if trimmed.starts_with("Traceback (most recent call last)")
        || trimmed.starts_with("RuntimeError(")
        || trimmed.starts_with("Error:")
    {
        return StderrLevel::Error;
    }
    // BigVGAN / indextts use `>> Failed ...` for non-fatal degradation
    // and `>> X restored from: Y` for status updates. Treat the failed
    // prefix as a warning, the restored prefix as info.
    if trimmed.starts_with(">> Failed") || trimmed.starts_with(">>> Failed") {
        return StderrLevel::Warn;
    }
    StderrLevel::Info
}

fn extract_python_logging_level(line: &str) -> Option<StderrLevel> {
    // Tokenize on whitespace; find the first token that's a level word.
    // Python `logging`'s default format puts level after timestamp:
    //   "2026-04-28 22:16:43,191 WARNING indextts.gpt..."
    // The timestamp consumes the first two whitespace-separated tokens
    // (date + "HH:MM:SS,mmm"); the third is the level.
    for token in line.split_ascii_whitespace().take(5) {
        match token {
            "DEBUG" => return Some(StderrLevel::Debug),
            "INFO" => return Some(StderrLevel::Info),
            "WARNING" | "WARN" => return Some(StderrLevel::Warn),
            "ERROR" | "CRITICAL" | "FATAL" => return Some(StderrLevel::Error),
            _ => continue,
        }
    }
    None
}

#[cfg(test)]
mod stderr_classify_tests {
    use super::*;

    #[test]
    fn python_logging_warning_classifies_warn() {
        let line = "2026-04-28 22:16:43,191 WARNING indextts.gpt.transformers_modeling_utils GPT2InferenceModel ...";
        assert_eq!(classify_stderr_line(line), StderrLevel::Warn);
    }

    #[test]
    fn python_logging_info_classifies_info() {
        let line = "2026-04-28 22:24:08,191 INFO accelerate.utils.modeling We will use 90% of the memory ...";
        assert_eq!(classify_stderr_line(line), StderrLevel::Info);
    }

    #[test]
    fn python_logging_error_classifies_error() {
        let line = "2026-04-28 22:24:08,191 ERROR torch.distributed something exploded";
        assert_eq!(classify_stderr_line(line), StderrLevel::Error);
    }

    #[test]
    fn double_arrow_failed_classifies_warn() {
        let line = ">> Failed to load custom CUDA kernel for BigVGAN. Falling back to torch.";
        assert_eq!(classify_stderr_line(line), StderrLevel::Warn);
    }

    #[test]
    fn runtime_error_classifies_error() {
        let line = "RuntimeError('Ninja is required to load C++ extensions ...')";
        assert_eq!(classify_stderr_line(line), StderrLevel::Error);
    }

    #[test]
    fn traceback_classifies_error() {
        let line = "Traceback (most recent call last):";
        assert_eq!(classify_stderr_line(line), StderrLevel::Error);
    }

    #[test]
    fn plain_status_line_classifies_info() {
        let line = ">> GPT weights restored from: C:\\Users\\foo\\gpt.pth";
        assert_eq!(classify_stderr_line(line), StderrLevel::Info);
    }

    #[test]
    fn empty_line_classifies_info() {
        assert_eq!(classify_stderr_line(""), StderrLevel::Info);
    }
}

// Silence unused-import in non-test configurations.
#[allow(dead_code)]
fn _type_check() -> HashMap<(), ()> {
    HashMap::new()
}
