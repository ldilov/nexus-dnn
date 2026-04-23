//! T061 — dependency install phase. Shells out to `uv` against the
//! worker directory staged by the extract phase, running
//! `uv sync --all-extras` to materialise the worker's declared
//! dependencies against the embedded interpreter staged by bootstrap.
//!
//! Platform policy (upstream guidance): on Windows we omit
//! `--extra deepspeed` because that extra depends on a toolchain that
//! doesn't currently ship a Windows wheel. The `deepspeed_extra_on_windows`
//! knob on [`UvInvocation`] lets a caller override this per-install.
//!
//! Failures map to [`PipelineFailureCategory::DependencyInstallFailed`]
//! with uv's stderr truncated to [`UV_STDERR_TRUNCATE_LIMIT`] bytes.

use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use std::process::Stdio;

use tokio::process::Command;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

use super::handler::python_exe_in;

const PHASE: &str = "install_deps";
/// Worker directory relative to the pipeline's `partial_path`.
pub const WORKER_DIR: &str = "worker";
/// Upper bound on uv stderr retained in failure details.
pub const UV_STDERR_TRUNCATE_LIMIT: usize = 2048;
/// Default `uv` invocation used in production. Tests may build their own.
pub const DEFAULT_UV_PROGRAM: &str = "uv";
/// Extra that depends on a toolchain not available on Windows.
const WINDOWS_EXCLUDED_EXTRA: &str = "deepspeed";

/// Dependency-install knob surface. Constructed per call from
/// [`FamilyPythonHandler`](super::FamilyPythonHandler) configuration +
/// host platform facts.
#[derive(Debug, Clone)]
pub struct UvInvocation {
    /// Path (or PATH-lookup name) of the uv binary.
    pub program: PathBuf,
    /// Whether to attempt `--extra deepspeed` when running on Windows.
    /// Defaults to `false` per upstream warning.
    pub deepspeed_extra_on_windows: bool,
}

impl Default for UvInvocation {
    fn default() -> Self {
        Self {
            program: PathBuf::from(DEFAULT_UV_PROGRAM),
            deepspeed_extra_on_windows: false,
        }
    }
}

pub async fn run(
    ctx: &mut InstallCtx,
    invocation: &UvInvocation,
) -> Result<(), GenericInstallError> {
    let worker_dir = ctx.partial_path.join(WORKER_DIR);
    if !worker_dir.is_dir() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::DependencyInstallFailed,
            format!(
                "worker directory missing at `{}` — extract phase did not stage `worker/`",
                worker_dir.display()
            ),
        ));
    }

    let python = python_exe_in(&ctx.partial_path);
    if !python.is_file() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::DependencyInstallFailed,
            format!(
                "embedded python executable missing at `{}` — bootstrap did not stage the interpreter",
                python.display()
            ),
        ));
    }

    let args = sync_args(invocation);
    let output = spawn_uv(&invocation.program, &args, &worker_dir, &python).await?;
    if !output.status.success() {
        let stderr = truncate_utf8(&output.stderr, UV_STDERR_TRUNCATE_LIMIT);
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::DependencyInstallFailed,
            format!("uv sync failed ({}): {stderr}", output.status),
        ));
    }
    Ok(())
}

async fn spawn_uv(
    program: &Path,
    args: &[String],
    cwd: &Path,
    python: &Path,
) -> Result<std::process::Output, GenericInstallError> {
    let mut cmd = Command::new(program);
    cmd.args(args.iter().map(OsStr::new));
    cmd.current_dir(cwd);
    // Pin uv onto the embedded interpreter so it does not resolve the
    // host's system python.
    cmd.env("UV_PYTHON", python);
    cmd.env("VIRTUAL_ENV", cwd.join(".venv"));
    cmd.stdin(Stdio::null());
    cmd.stdout(Stdio::piped());
    cmd.stderr(Stdio::piped());
    let child = cmd.spawn().map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::DependencyInstallFailed,
            format!("spawn `{}`: {e}", program.display()),
        )
    })?;
    child.wait_with_output().await.map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::DependencyInstallFailed,
            format!("wait on uv: {e}"),
        )
    })
}

/// Build the argv for `uv sync` based on platform policy.
pub(crate) fn sync_args(invocation: &UvInvocation) -> Vec<String> {
    let mut args = vec!["sync".to_string(), "--all-extras".to_string()];
    let skip_deepspeed = cfg!(windows) && !invocation.deepspeed_extra_on_windows;
    if skip_deepspeed {
        args.push(format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}"));
    }
    args
}

fn truncate_utf8(bytes: &[u8], limit: usize) -> String {
    let text = String::from_utf8_lossy(bytes);
    if text.len() <= limit {
        return text.into_owned();
    }
    // Truncate at a char boundary.
    let mut end = limit;
    while !text.is_char_boundary(end) && end > 0 {
        end -= 1;
    }
    format!("{}…(truncated)", &text[..end])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sync_args_always_contains_all_extras() {
        let args = sync_args(&UvInvocation::default());
        assert_eq!(args[0], "sync");
        assert!(args.contains(&"--all-extras".into()));
    }

    #[test]
    fn sync_args_respects_deepspeed_knob_on_windows() {
        if cfg!(windows) {
            let default = sync_args(&UvInvocation::default());
            assert!(
                default
                    .iter()
                    .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}")),
                "windows default must skip deepspeed extra"
            );

            let opt_in = sync_args(&UvInvocation {
                program: PathBuf::from(DEFAULT_UV_PROGRAM),
                deepspeed_extra_on_windows: true,
            });
            assert!(
                !opt_in
                    .iter()
                    .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}")),
                "opting in must keep deepspeed extra"
            );
        }
    }

    #[test]
    fn sync_args_on_unix_keeps_deepspeed() {
        if !cfg!(windows) {
            let args = sync_args(&UvInvocation::default());
            assert!(
                !args
                    .iter()
                    .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}"))
            );
        }
    }

    #[test]
    fn truncate_utf8_respects_char_boundaries() {
        let long = "αβγδε".repeat(1024);
        let out = truncate_utf8(long.as_bytes(), UV_STDERR_TRUNCATE_LIMIT);
        assert!(out.ends_with("…(truncated)"));
        // Confirm no panic + a non-empty prefix.
        assert!(out.len() > 12);
    }

    #[test]
    fn truncate_utf8_under_limit_passes_through() {
        let s = "short message";
        let out = truncate_utf8(s.as_bytes(), UV_STDERR_TRUNCATE_LIMIT);
        assert_eq!(out, s);
    }
}
