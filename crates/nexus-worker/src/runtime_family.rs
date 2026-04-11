use std::path::Path;

use tokio::process::Command;

use crate::error::WorkerError;
use nexus_protocol::StdioTransport;

pub trait RuntimeSpawner: Send + Sync {
    fn spawn_worker(
        &self,
        extension_dir: &Path,
        entrypoint: &str,
    ) -> impl std::future::Future<
        Output = Result<(tokio::process::Child, StdioTransport), WorkerError>,
    > + Send;
}

pub struct PythonRuntimeSpawner;

impl RuntimeSpawner for PythonRuntimeSpawner {
    async fn spawn_worker(
        &self,
        extension_dir: &Path,
        entrypoint: &str,
    ) -> Result<(tokio::process::Child, StdioTransport), WorkerError> {
        let python_bin = if cfg!(windows) { "python" } else { "python3" };
        spawn_child_with_stdio(extension_dir, python_bin, &[entrypoint]).await
    }
}

pub struct NativeRuntimeSpawner;

impl RuntimeSpawner for NativeRuntimeSpawner {
    async fn spawn_worker(
        &self,
        extension_dir: &Path,
        entrypoint: &str,
    ) -> Result<(tokio::process::Child, StdioTransport), WorkerError> {
        let binary_path = extension_dir.join(entrypoint);
        let binary_str = binary_path
            .to_str()
            .ok_or_else(|| WorkerError::SpawnFailed("invalid binary path encoding".to_owned()))?;
        spawn_child_with_stdio(extension_dir, binary_str, &[]).await
    }
}

async fn spawn_child_with_stdio(
    working_dir: &Path,
    program: &str,
    args: &[&str],
) -> Result<(tokio::process::Child, StdioTransport), WorkerError> {
    let mut child = Command::new(program)
        .args(args)
        .current_dir(working_dir)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .kill_on_drop(true)
        .spawn()
        .map_err(|e| WorkerError::SpawnFailed(e.to_string()))?;

    let stdin = child
        .stdin
        .take()
        .ok_or_else(|| WorkerError::SpawnFailed("failed to capture stdin".to_owned()))?;
    let stdout = child
        .stdout
        .take()
        .ok_or_else(|| WorkerError::SpawnFailed("failed to capture stdout".to_owned()))?;

    let transport = StdioTransport::new(stdin, stdout);
    Ok((child, transport))
}
