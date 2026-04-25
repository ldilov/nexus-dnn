//! `package_set` step handler — runs the declared package manager against an
//! in-extension manifest path. v1 supports `manager: uv`. New managers
//! (`npm`/`pnpm`/`mvn`/`gradle`/`dotnet`/`cargo`) are new match arms here.

use std::path::{Path, PathBuf};

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;
use tokio::process::Command;

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::StepArtifact;

#[derive(Debug, Deserialize)]
struct PackageSetSpec {
    manager: String,
    manifest_path: String,
    #[serde(default)]
    lock_path: Option<String>,
    #[serde(default = "default_target")]
    target: String,
}

fn default_target() -> String {
    "extension_local".to_owned()
}

pub struct PackageSetHandler;

impl PackageSetHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for PackageSetHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<PackageSetSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

fn venv_dir(ctx: &StepContext<'_>) -> PathBuf {
    ctx.extension_data_dir
        .join("runtime")
        .join("packages")
        .join(".venv")
}

fn marker_path(ctx: &StepContext<'_>) -> PathBuf {
    ctx.extension_data_dir
        .join("runtime")
        .join("packages")
        .join(".synced.json")
}

#[async_trait]
impl StepHandler for PackageSetHandler {
    fn step_type(&self) -> &'static str {
        "package_set"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.manager.trim().is_empty() {
            return Err(DepError::invalid_spec("", "manager", "empty"));
        }
        if parsed.manager != "uv" {
            return Err(DepError::invalid_spec(
                "",
                "manager",
                format!(
                    "v1 only supports 'uv'; got '{}'. New managers register as new match arms in the same handler.",
                    parsed.manager
                ),
            ));
        }
        if parsed.manifest_path.trim().is_empty() {
            return Err(DepError::invalid_spec("", "manifest_path", "empty"));
        }
        if parsed.target != "extension_local" {
            return Err(DepError::invalid_spec(
                "",
                "target",
                "v1 only supports 'extension_local'",
            ));
        }
        Ok(())
    }

    async fn probe(
        &self,
        ctx: &StepContext<'_>,
        spec: &Value,
    ) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let marker = marker_path(ctx);
        let venv = venv_dir(ctx);
        if !venv.exists() || !marker.exists() {
            return Ok(ProbeResult::NotSatisfied);
        }
        // Compare the marker's recorded manifest sha256 against the current manifest
        // file. If they differ, packages are stale and we re-run sync.
        let manifest_full = ctx.extension_dir.join(&parsed.manifest_path);
        let current_sha = file_sha256(&manifest_full).await?;
        let marker_bytes = tokio::fs::read(&marker).await?;
        let marker_json: serde_json::Value = serde_json::from_slice(&marker_bytes)?;
        let recorded = marker_json
            .get("manifest_sha256")
            .and_then(Value::as_str)
            .unwrap_or("");
        if recorded != current_sha {
            return Ok(ProbeResult::NotSatisfied);
        }
        let total_bytes = dir_size(&venv).await.unwrap_or(0);
        Ok(ProbeResult::Satisfied {
            artifact: StepArtifact {
                path: Some(venv),
                bytes_placed: total_bytes,
                summary: format!("uv venv synced from {}", parsed.manifest_path),
                metadata: Value::Null,
            },
        })
    }

    async fn run(
        &self,
        ctx: &StepContext<'_>,
        spec: &Value,
    ) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let manifest_full = ctx.extension_dir.join(&parsed.manifest_path);
        if !manifest_full.exists() {
            return Err(DepError::Backend(format!(
                "package_set manifest_path not found: {}",
                manifest_full.display()
            )));
        }
        let venv = venv_dir(ctx);
        tokio::fs::create_dir_all(venv.parent().expect("parent")).await?;

        // Locate `uv`. The runtime handler installs uv into the Python install dir;
        // we look there first, then fall back to PATH.
        let uv_bin = locate_uv(ctx)?;

        // `uv sync` installs from the manifest into a venv. Prefer
        // `--project <ext-dir>` to anchor the workspace and `UV_PROJECT_ENVIRONMENT`
        // to point to our externally-managed venv.
        let project_dir = manifest_full
            .parent()
            .unwrap_or(ctx.extension_dir)
            .to_path_buf();
        let mut cmd = Command::new(&uv_bin);
        cmd.arg("sync")
            .arg("--project")
            .arg(&project_dir)
            .arg("--no-progress")
            .env("UV_PROJECT_ENVIRONMENT", &venv);

        // Honour cancellation: spawn so the child can be killed when the token fires.
        let mut child = cmd
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .spawn()?;

        let cancel = ctx.cancellation_token.clone();
        let status = tokio::select! {
            _ = cancel.cancelled() => {
                let _ = child.kill().await;
                return Err(DepError::Cancelled);
            }
            res = child.wait() => res?,
        };
        if !status.success() {
            return Err(DepError::Backend(format!("uv sync exited with {status}")));
        }

        // Stamp the marker file with the manifest sha256 so probe() can detect drift.
        let manifest_sha = file_sha256(&manifest_full).await?;
        let marker_payload = serde_json::json!({
            "manifest_path": parsed.manifest_path,
            "manifest_sha256": manifest_sha,
            "lock_path": parsed.lock_path,
            "synced_at": chrono::Utc::now().to_rfc3339(),
        });
        tokio::fs::write(
            marker_path(ctx),
            serde_json::to_vec_pretty(&marker_payload)?,
        )
        .await?;

        let total_bytes = dir_size(&venv).await.unwrap_or(0);
        Ok(StepArtifact {
            path: Some(venv),
            bytes_placed: total_bytes,
            summary: format!("uv venv synced from {}", parsed.manifest_path),
            metadata: Value::Null,
        })
    }
}

fn locate_uv(ctx: &StepContext<'_>) -> Result<PathBuf, DepError> {
    // Scripts/uv.exe (Windows) or bin/uv (POSIX) inside the python runtime install.
    let py_runtime = ctx.extension_data_dir.join("runtime").join("python");
    let candidates = if cfg!(windows) {
        vec![
            py_runtime.join("Scripts").join("uv.exe"),
            py_runtime.join("python").join("Scripts").join("uv.exe"),
        ]
    } else {
        vec![
            py_runtime.join("bin").join("uv"),
            py_runtime.join("python").join("bin").join("uv"),
        ]
    };
    for c in &candidates {
        if c.exists() {
            return Ok(c.clone());
        }
    }
    // Fallback to PATH lookup.
    Ok(PathBuf::from("uv"))
}

async fn file_sha256(path: &Path) -> Result<String, DepError> {
    use sha2::{Digest, Sha256};
    let bytes = tokio::fs::read(path).await?;
    let digest = Sha256::digest(&bytes);
    let mut s = String::with_capacity(digest.len() * 2);
    for b in digest {
        s.push_str(&format!("{b:02x}"));
    }
    Ok(s)
}

async fn dir_size(path: &Path) -> Result<u64, DepError> {
    let mut total = 0u64;
    let mut stack = vec![path.to_path_buf()];
    while let Some(dir) = stack.pop() {
        let mut rd = match tokio::fs::read_dir(&dir).await {
            Ok(rd) => rd,
            Err(_) => continue,
        };
        while let Some(entry) = rd.next_entry().await? {
            let meta = entry.metadata().await?;
            if meta.is_dir() {
                stack.push(entry.path());
            } else {
                total += meta.len();
            }
        }
    }
    Ok(total)
}
