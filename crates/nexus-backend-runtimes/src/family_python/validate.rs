use std::path::{Path, PathBuf};
use std::process::Stdio;

use tokio::process::Command;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

use super::handler::python_exe_in;

const PHASE: &str = "validate_env";
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
