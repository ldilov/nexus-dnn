//! T062 — validate_env phase. Confirms the embedded interpreter
//! bootstrapped in [`super::bootstrap`] actually runs, then records an
//! absolute path to the worker's entrypoint on [`InstallCtx`].
//!
//! The probe is intentionally minimal — `python -c "import sys;
//! print(sys.version)"` — and any failure (spawn error, non-zero exit,
//! absent probe output) is mapped to
//! [`PipelineFailureCategory::PythonBootstrapFailed`] since a broken
//! interpreter is a bootstrap-layer defect even when it surfaces at
//! validate time.
//!
//! Entrypoint path policy: when the incoming
//! [`InstallCtx::entrypoint_path`] is set and relative, it is rewritten
//! as an absolute path rooted at [`InstallCtx::partial_path`] — the
//! `partial_path → install_path` rename at the final pipeline phase is
//! deterministic, so recording the path under `partial_path` at this
//! stage would point at a soon-to-disappear staging dir. The validate
//! phase therefore always records the post-rename absolute path so
//! downstream lease-acquire logic resolves it unambiguously.

use std::path::{Path, PathBuf};
use std::process::Stdio;

use tokio::process::Command;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

use super::handler::python_exe_in;

const PHASE: &str = "validate_env";
/// Short sys-probe run against the embedded interpreter. A successful
/// run prints the CPython version banner to stdout.
const VERSION_PROBE: &str = "import sys; print(sys.version)";

pub async fn run(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    let python = python_exe_in(&ctx.partial_path);
    if !python.is_file() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!(
                "embedded python executable missing at `{}`",
                python.display()
            ),
        ));
    }

    probe_interpreter(&python).await?;

    if let Some(existing) = ctx.entrypoint_path.clone() {
        ctx.entrypoint_path = Some(absolutise_entrypoint(&existing, &ctx.install_path));
    }
    Ok(())
}

async fn probe_interpreter(python: &Path) -> Result<(), GenericInstallError> {
    let mut cmd = Command::new(python);
    cmd.arg("-c").arg(VERSION_PROBE);
    cmd.stdin(Stdio::null());
    cmd.stdout(Stdio::piped());
    cmd.stderr(Stdio::piped());
    let child = cmd.spawn().map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("spawn `{}`: {e}", python.display()),
        )
    })?;
    let output = child.wait_with_output().await.map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("wait on python probe: {e}"),
        )
    })?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!(
                "python probe failed ({}): {}",
                output.status,
                stderr.trim()
            ),
        ));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    if stdout.trim().is_empty() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            "python probe produced no output",
        ));
    }
    Ok(())
}

/// Convert an entrypoint (absolute or relative) into an absolute path
/// rooted at `install_path`. Relative entrypoints are joined with
/// `install_path`; already-absolute paths pass through untouched.
pub(crate) fn absolutise_entrypoint(entrypoint: &Path, install_path: &Path) -> PathBuf {
    if entrypoint.is_absolute() {
        return entrypoint.to_path_buf();
    }
    install_path.join(entrypoint)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;

    #[test]
    fn relative_entrypoint_is_joined_with_install_path() {
        let rewritten = absolutise_entrypoint(
            Path::new("worker/src/echo_worker/main.py"),
            Path::new("/opt/runtimes/echo"),
        );
        assert_eq!(
            rewritten,
            PathBuf::from("/opt/runtimes/echo/worker/src/echo_worker/main.py")
        );
    }

    #[test]
    fn absolute_entrypoint_passes_through() {
        let abs = if cfg!(windows) {
            PathBuf::from("C:/opt/other/main.py")
        } else {
            PathBuf::from("/opt/other/main.py")
        };
        let rewritten = absolutise_entrypoint(&abs, Path::new("/opt/runtimes/echo"));
        assert_eq!(rewritten, abs);
    }
}
