use std::collections::HashMap;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use tokio::process::Command;

use crate::error::InstallerError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EnvRequest {
    pub python_version: Option<String>,
    pub target_dir: PathBuf,
    pub pip_dependencies: Vec<String>,
    pub env_vars: HashMap<String, String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EnvResult {
    pub env_dir: PathBuf,
    pub python_path: PathBuf,
    pub pip_path: PathBuf,
    pub installed_packages: Vec<String>,
}

pub struct PythonEnvProvisioner;

impl PythonEnvProvisioner {
    pub async fn provision(
        request: &EnvRequest,
    ) -> Result<EnvResult, InstallerError> {
        let python =
            Self::find_system_python(request.python_version.as_deref())
                .await?;

        create_venv(&python, &request.target_dir).await?;

        let pip = Self::venv_pip_path(&request.target_dir);
        let installed =
            install_dependencies(&pip, &request.pip_dependencies, &request.env_vars)
                .await?;

        Ok(EnvResult {
            env_dir: request.target_dir.clone(),
            python_path: Self::venv_python_path(&request.target_dir),
            pip_path: pip,
            installed_packages: installed,
        })
    }

    pub async fn validate(env_dir: &Path) -> Result<bool, InstallerError> {
        let python = Self::venv_python_path(env_dir);
        if !python.is_file() {
            return Ok(false);
        }

        let output = Command::new(&python)
            .args(["--version"])
            .output()
            .await?;

        Ok(output.status.success())
    }

    pub fn venv_python_path(env_dir: &Path) -> PathBuf {
        if cfg!(windows) {
            env_dir.join("Scripts").join("python.exe")
        } else {
            env_dir.join("bin").join("python")
        }
    }

    pub fn venv_pip_path(env_dir: &Path) -> PathBuf {
        if cfg!(windows) {
            env_dir.join("Scripts").join("pip.exe")
        } else {
            env_dir.join("bin").join("pip")
        }
    }

    pub async fn find_system_python(
        version: Option<&str>,
    ) -> Result<PathBuf, InstallerError> {
        let candidates = system_python_candidates(version);

        for candidate in &candidates {
            if let Ok(path) = try_python(candidate, version).await {
                return Ok(path);
            }
        }

        Err(InstallerError::PythonNotFound(format!(
            "no suitable python found (wanted: {})",
            version.unwrap_or("any")
        )))
    }
}

fn system_python_candidates(version: Option<&str>) -> Vec<String> {
    let mut candidates = Vec::new();

    if let Some(ver) = version {
        candidates.push(format!("python{ver}"));
    }

    candidates.push("python3".to_owned());
    candidates.push("python".to_owned());

    if cfg!(windows) {
        candidates.push("py".to_owned());
    }

    candidates
}

async fn try_python(
    command: &str,
    required_version: Option<&str>,
) -> Result<PathBuf, InstallerError> {
    let output = Command::new(command)
        .args(["--version"])
        .output()
        .await
        .map_err(|e| InstallerError::PythonNotFound(e.to_string()))?;

    if !output.status.success() {
        return Err(InstallerError::PythonNotFound(format!(
            "{command} returned non-zero"
        )));
    }

    let version_str = String::from_utf8_lossy(&output.stdout);
    tracing::debug!(command, version = %version_str.trim(), "found python");

    if let Some(required) = required_version
        && !version_str.contains(required)
    {
        return Err(InstallerError::PythonNotFound(format!(
            "{command} version {version_str} does not match {required}"
        )));
    }

    resolve_python_path(command).await
}

async fn resolve_python_path(
    command: &str,
) -> Result<PathBuf, InstallerError> {
    let which_cmd = if cfg!(windows) { "where" } else { "which" };

    let output = Command::new(which_cmd)
        .arg(command)
        .output()
        .await
        .map_err(|e| InstallerError::PythonNotFound(e.to_string()))?;

    let path_str = String::from_utf8_lossy(&output.stdout);
    let first_line = path_str.lines().next().unwrap_or("").trim();

    if first_line.is_empty() {
        return Ok(PathBuf::from(command));
    }

    Ok(PathBuf::from(first_line))
}

async fn create_venv(
    python: &Path,
    target_dir: &Path,
) -> Result<(), InstallerError> {
    tracing::info!(python = %python.display(), dir = %target_dir.display(), "creating venv");

    let output = Command::new(python)
        .args(["-m", "venv"])
        .arg(target_dir)
        .output()
        .await?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(InstallerError::VenvCreation(stderr.into_owned()));
    }

    Ok(())
}

async fn install_dependencies(
    pip: &Path,
    deps: &[String],
    env_vars: &HashMap<String, String>,
) -> Result<Vec<String>, InstallerError> {
    if deps.is_empty() {
        return Ok(Vec::new());
    }

    tracing::info!(count = deps.len(), "installing pip dependencies");

    let output = Command::new(pip)
        .args(["install", "--no-input"])
        .args(deps)
        .envs(env_vars)
        .output()
        .await?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(InstallerError::PipInstall(stderr.into_owned()));
    }

    Ok(deps.to_vec())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn venv_python_path_platform_correct() {
        let base = Path::new("/envs/test-env");
        let path = PythonEnvProvisioner::venv_python_path(base);

        if cfg!(windows) {
            assert!(path.ends_with("Scripts/python.exe") || path.ends_with("Scripts\\python.exe"));
        } else {
            assert_eq!(path, base.join("bin").join("python"));
        }
    }

    #[test]
    fn venv_pip_path_platform_correct() {
        let base = Path::new("/envs/test-env");
        let path = PythonEnvProvisioner::venv_pip_path(base);

        if cfg!(windows) {
            assert!(path.ends_with("Scripts/pip.exe") || path.ends_with("Scripts\\pip.exe"));
        } else {
            assert_eq!(path, base.join("bin").join("pip"));
        }
    }

    #[test]
    fn system_python_candidates_includes_versioned() {
        let candidates = system_python_candidates(Some("3.12"));
        assert_eq!(candidates[0], "python3.12");
        assert!(candidates.contains(&"python3".to_owned()));
        assert!(candidates.contains(&"python".to_owned()));
    }

    #[test]
    fn system_python_candidates_no_version() {
        let candidates = system_python_candidates(None);
        assert!(!candidates.iter().any(|c| c.starts_with("python3.")));
        assert!(candidates.contains(&"python3".to_owned()));
        assert!(candidates.contains(&"python".to_owned()));
    }

    #[cfg(windows)]
    #[test]
    fn system_python_candidates_includes_py_on_windows() {
        let candidates = system_python_candidates(None);
        assert!(candidates.contains(&"py".to_owned()));
    }
}
