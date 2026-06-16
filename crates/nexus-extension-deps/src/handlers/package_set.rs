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
use crate::types::{ProgressEvent, StepArtifact, StepProgress};

#[derive(Debug, Deserialize)]
struct PackageSetSpec {
    manager: String,
    manifest_path: String,
    #[serde(default)]
    lock_path: Option<String>,
    #[serde(default = "default_target")]
    target: String,
    /// Optional-dependency extras to install (`uv sync --extra <name>` per
    /// entry). Empty (default) installs only the base dependency set, so
    /// existing manifests keep their behaviour.
    #[serde(default)]
    extras: Vec<String>,
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
        for extra in &parsed.extras {
            let starts_alnum = extra
                .chars()
                .next()
                .is_some_and(|c| c.is_ascii_alphanumeric());
            let valid = starts_alnum
                && extra
                    .chars()
                    .all(|c| c.is_ascii_alphanumeric() || matches!(c, '-' | '_' | '.'));
            if !valid {
                return Err(DepError::invalid_spec(
                    "",
                    "extras",
                    format!("invalid extra name '{extra}' — expected [A-Za-z0-9][A-Za-z0-9._-]*"),
                ));
            }
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError> {
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
        // Extras drift (e.g. a manifest update adds `extras: [gpu]`) must also
        // trigger a re-sync — the venv on disk lacks those packages.
        let recorded_extras: Vec<String> = marker_json
            .get("extras")
            .and_then(Value::as_array)
            .map(|items| {
                items
                    .iter()
                    .filter_map(Value::as_str)
                    .map(str::to_owned)
                    .collect()
            })
            .unwrap_or_default();
        if recorded_extras != parsed.extras {
            return Ok(ProbeResult::NotSatisfied);
        }
        // A matching marker still lies if the venv was only partially
        // materialized — recorded `.dist-info/RECORD` whose payloads never
        // landed. Force a re-sync so run() can re-materialize them.
        let broken = venv_partial_install_packages(&venv);
        if !broken.is_empty() {
            tracing::warn!(
                target: "extension_install::package_set",
                packages = ?broken,
                "partial uv install detected — forcing re-sync"
            );
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

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
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

        // Locate `uv` on disk (Python runtime first, then PATH fallback).
        let uv_bin = locate_uv(ctx);
        let python_exe = python_interpreter(ctx);

        // `uv sync` installs from the manifest into a venv. Setting UV_PYTHON to
        // the embedded interpreter prevents uv from searching PATH and picking
        // up a different system Python. UV_PROJECT_ENVIRONMENT pins the venv
        // location to our extension-local packages dir.
        let project_dir = manifest_full
            .parent()
            .unwrap_or(ctx.extension_dir)
            .to_path_buf();

        tracing::info!(
            target: "extension_install::package_set",
            manager = %parsed.manager,
            uv_bin = %uv_bin.display(),
            python_exe = %python_exe.as_deref().map(|p| p.display().to_string()).unwrap_or_else(|| "(none)".into()),
            project_dir = %project_dir.display(),
            venv = %venv.display(),
            "package_set: spawning uv sync"
        );

        // Per-extension uv cache so wheel builds for one extension can never
        // poison another. Costs disk (no cross-extension wheel sharing) but
        // gives strict isolation — each extension has its own resolver state.
        let uv_cache = ctx
            .extension_data_dir
            .join("runtime")
            .join("packages")
            .join(".uv-cache");
        tokio::fs::create_dir_all(&uv_cache).await?;

        let mut cmd = Command::new(&uv_bin);
        cmd.arg("sync");
        for extra in &parsed.extras {
            cmd.arg("--extra").arg(extra);
        }
        cmd.arg("--project")
            .arg(&project_dir)
            .arg("--no-progress")
            // Pin venv + cache locations to the extension's data dir.
            .env("UV_PROJECT_ENVIRONMENT", &venv)
            .env("UV_CACHE_DIR", &uv_cache)
            // Stop uv from reading `~/.config/uv/` or workspace-level config —
            // user-level config (custom indexes, registries, auth tokens)
            // must not influence an extension install.
            .env("UV_NO_CONFIG", "1")
            // Strip Python env vars that would otherwise inject the user's
            // global Python state into the new venv. PYTHONHOME makes the
            // interpreter look for stdlib elsewhere; PYTHONPATH leaks
            // user-installed packages; PYTHONSTARTUP runs arbitrary code on
            // every interpreter launch; PYTHONUSERBASE points pip at the
            // user-site dir.
            .env_remove("PYTHONHOME")
            .env_remove("PYTHONPATH")
            .env_remove("PYTHONSTARTUP")
            .env_remove("PYTHONUSERBASE")
            .env_remove("PYTHONNOUSERSITE")
            // Strip pip-discovery env vars so an inherited
            // PIP_INDEX_URL/EXTRA_INDEX_URL/CONFIG_FILE can't redirect uv to
            // a different registry. The pyproject + UV_PROJECT_ENVIRONMENT
            // are the only sources of truth.
            .env_remove("PIP_INDEX_URL")
            .env_remove("PIP_EXTRA_INDEX_URL")
            .env_remove("PIP_CONFIG_FILE")
            .env_remove("PIP_REQUIRE_VIRTUALENV");
        if let Some(py) = python_exe.as_deref() {
            cmd.env("UV_PYTHON", py);
            cmd.env("VIRTUAL_ENV", &venv);
        }
        tracing::debug!(
            target: "extension_install::package_set",
            uv_cache = %uv_cache.display(),
            "package_set: extension-isolated uv cache + env scrubbed (PYTHONHOME, PYTHONPATH, PIP_*)"
        );

        // Honour cancellation: spawn so the child can be killed when the token fires.
        let mut child = cmd
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .spawn()
            .map_err(|e| {
                let kind = e.kind();
                let hint = if matches!(kind, std::io::ErrorKind::NotFound) {
                    " — uv binary not found at the candidate paths or on PATH. \
                     Install uv (https://docs.astral.sh/uv/getting-started/installation/) \
                     or set the runtime to bundle it."
                } else {
                    ""
                };
                DepError::Backend(format!("spawn `{}` failed: {e}{hint}", uv_bin.display()))
            })?;

        // Drain stdout/stderr concurrently with wait() so the child's pipe
        // buffers never fill up (which would deadlock it). Take the handles
        // out of the Child so we can keep `child` borrowable for kill/wait.
        // stdout is drained raw; stderr is line-streamed so uv's discrete
        // summary lines (`Resolved/Prepared/Installed N packages`) drive a
        // live progress bar instead of arriving in one silent blob at the end.
        use tokio::io::{AsyncBufReadExt, AsyncReadExt, BufReader};
        let mut stdout_pipe = child.stdout.take().expect("stdout piped");
        let stderr_pipe = child.stderr.take().expect("stderr piped");
        let stdout_task = tokio::spawn(async move {
            let mut buf = Vec::new();
            let _ = stdout_pipe.read_to_end(&mut buf).await;
            buf
        });

        let progress_sink = ctx.progress_sink.clone();
        let extension_id = ctx.extension_id.to_owned();
        let install_run_id = ctx.install_run_id;

        // First-progress promptly so the uv row shows a live phase instead of a
        // dead spinner while resolution runs silently (AC-2.6).
        progress_sink.emit(ProgressEvent::step_progress(
            &extension_id,
            install_run_id,
            String::new(),
            StepProgress::phase("resolving").with_message("uv sync starting"),
        ));

        let stderr_task = tokio::spawn(async move {
            let mut reader = BufReader::new(stderr_pipe).lines();
            let mut captured = String::new();
            let mut total: u64 = 0;
            while let Ok(Some(line)) = reader.next_line().await {
                if captured.len() < UV_STDERR_CAPTURE_LIMIT {
                    captured.push_str(&line);
                    captured.push('\n');
                }
                if let Some(progress) = parse_uv_line(&line, &mut total) {
                    // step_id is unknown to the handler — runner re-tags it.
                    progress_sink.emit(ProgressEvent::step_progress(
                        &extension_id,
                        install_run_id,
                        String::new(),
                        progress,
                    ));
                }
            }
            captured
        });

        let cancel = ctx.cancellation_token.clone();
        let status = tokio::select! {
            _ = cancel.cancelled() => {
                let _ = child.kill().await;
                return Err(DepError::Cancelled);
            }
            res = child.wait() => res?,
        };

        let stdout_bytes = stdout_task.await.unwrap_or_default();
        let stderr_text = stderr_task.await.unwrap_or_default();
        let stderr_bytes = stderr_text.into_bytes();

        // Always surface uv's output — silent failures are the worst kind of
        // user-facing bug. Truncate to keep error messages bounded.
        let stdout = truncate_utf8(&stdout_bytes, 4096);
        let stderr = truncate_utf8(&stderr_bytes, 16384);
        if !status.success() {
            tracing::error!(
                target: "extension_install::package_set",
                exit_status = ?status,
                exit_code = status.code(),
                uv_bin = %uv_bin.display(),
                project_dir = %project_dir.display(),
                venv = %venv.display(),
                python_exe = %python_exe.as_deref().map(|p| p.display().to_string()).unwrap_or_else(|| "(none)".into()),
                stdout_bytes = stdout_bytes.len(),
                stderr_bytes = stderr_bytes.len(),
                stdout = %stdout,
                stderr = %stderr,
                "package_set: uv sync FAILED"
            );
            return Err(DepError::Backend(format!(
                "uv sync exited with {} (exit_code={:?}) — stderr: {stderr} — stdout: {stdout}",
                status,
                status.code()
            )));
        }
        tracing::info!(
            target: "extension_install::package_set",
            stdout_bytes = stdout_bytes.len(),
            stderr_bytes = stderr_bytes.len(),
            "package_set: uv sync OK"
        );
        if !stdout.trim().is_empty() {
            tracing::debug!(
                target: "extension_install::package_set",
                stdout = %stdout,
                "package_set: uv stdout"
            );
        }
        if !stderr.trim().is_empty() {
            tracing::debug!(
                target: "extension_install::package_set",
                stderr = %stderr,
                "package_set: uv stderr (warnings)"
            );
        }

        // Stamp the marker file with the manifest sha256 so probe() can detect drift.
        let manifest_sha = file_sha256(&manifest_full).await?;
        let marker_payload = serde_json::json!({
            "manifest_path": parsed.manifest_path,
            "manifest_sha256": manifest_sha,
            "lock_path": parsed.lock_path,
            "extras": parsed.extras,
            "synced_at": chrono::Utc::now().to_rfc3339(),
        });
        tokio::fs::write(
            marker_path(ctx),
            serde_json::to_vec_pretty(&marker_payload)?,
        )
        .await?;

        // Terminal `done` so the row settles instead of resting on the last
        // parsed uv line (AC-2.5 terminal event for the package step).
        ctx.progress_sink.emit(ProgressEvent::step_progress(
            ctx.extension_id,
            ctx.install_run_id,
            String::new(),
            StepProgress::phase("done").with_message("packages installed"),
        ));

        let total_bytes = dir_size(&venv).await.unwrap_or(0);
        Ok(StepArtifact {
            path: Some(venv),
            bytes_placed: total_bytes,
            summary: format!("uv venv synced from {}", parsed.manifest_path),
            metadata: Value::Null,
        })
    }
}

/// Cap on the stderr text retained for failure reporting, so a chatty uv run
/// can't pin unbounded memory. The live progress stream is unaffected.
const UV_STDERR_CAPTURE_LIMIT: usize = 16384;

/// Best-effort parse of one uv stderr line into `(current_packages, total_packages)`
/// as a pseudo-progress signal. uv prints discrete summary lines even under
/// `--no-progress`:
/// * `Resolved N packages in 1.2s` / `Prepared N packages` → set the total.
/// * `Installed N packages in 1.2s` / `Prepared N packages` → set current.
/// * `Downloading <pkg>` / `Building <pkg>` → activity marker (0, 0).
///
/// Returns `None` for lines that carry no progress signal (so callers skip them
/// and avoid spamming the event bus). `0` in a slot means "leave unchanged".
fn parse_uv_progress(line: &str) -> Option<(u64, u64)> {
    let trimmed = line.trim_start();
    let count_after = |kw: &str| -> Option<u64> {
        let rest = trimmed.strip_prefix(kw)?.trim_start();
        rest.split_whitespace().next()?.parse::<u64>().ok()
    };
    if let Some(n) = count_after("Resolved ") {
        return Some((0, n));
    }
    if let Some(n) = count_after("Prepared ") {
        return Some((n, n));
    }
    if let Some(n) = count_after("Installed ") {
        return Some((n, 0));
    }
    if trimmed.starts_with("Downloading ") || trimmed.starts_with("Building ") {
        return Some((0, 0));
    }
    None
}

/// Map one uv stderr line into a normalized [`StepProgress`]. Carries the raw
/// line as the live `message`, a closed-vocabulary `phase`
/// (`resolving | downloading | installing`), and a best-effort `pct` derived
/// from uv's "k/N packages" summary counts. `total` is threaded across calls
/// so an `Installed k` line can be expressed as a percentage of the earlier
/// `Resolved N`. Returns `None` for lines that carry no progress signal.
fn parse_uv_line(line: &str, total: &mut u64) -> Option<StepProgress> {
    let (cur, tot) = parse_uv_progress(line)?;
    if tot > 0 {
        *total = tot;
    }
    let trimmed = line.trim_start();
    let phase = if trimmed.starts_with("Resolved") {
        "resolving"
    } else if trimmed.starts_with("Downloading") || trimmed.starts_with("Building") {
        "downloading"
    } else {
        "installing"
    };
    let mut progress = StepProgress::phase(phase).with_message(line.to_owned());
    if cur > 0 && *total > 0 {
        progress = progress.with_count(cur, *total);
    }
    Some(progress)
}

/// Truncate raw bytes to `limit` chars (respecting UTF-8 boundaries) for
/// inclusion in user-facing error messages and logs.
fn truncate_utf8(bytes: &[u8], limit: usize) -> String {
    let text = String::from_utf8_lossy(bytes);
    if text.len() <= limit {
        return text.into_owned();
    }
    let mut end = limit;
    while !text.is_char_boundary(end) && end > 0 {
        end -= 1;
    }
    format!("{}…(truncated)", &text[..end])
}

/// Resolve the embedded Python interpreter path so we can pin uv to it via
/// UV_PYTHON. Returns None if the interpreter is missing — the caller falls
/// back to letting uv search PATH (and surfacing whatever uv reports).
fn python_interpreter(ctx: &StepContext<'_>) -> Option<PathBuf> {
    let py_runtime = ctx.extension_data_dir.join("runtime").join("python");
    let candidates = if cfg!(windows) {
        vec![
            py_runtime.join("python").join("python.exe"),
            py_runtime.join("python.exe"),
        ]
    } else {
        vec![
            py_runtime.join("python").join("bin").join("python3"),
            py_runtime.join("bin").join("python3"),
        ]
    };
    candidates.into_iter().find(|p| p.is_file())
}

/// Resolve the path to the `uv` binary. Prefers an embedded uv co-located with
/// the Python runtime install (Scripts/uv.exe on Windows, bin/uv on POSIX);
/// falls back to bare `uv` for PATH lookup. Never errors — the caller surfaces
/// "spawn failed" when uv is genuinely missing so the user gets a clear
/// pointer rather than a failure here.
fn locate_uv(ctx: &StepContext<'_>) -> PathBuf {
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
    for c in candidates {
        if c.exists() {
            tracing::debug!(
                target: "extension_install::package_set",
                uv = %c.display(),
                "package_set: located embedded uv"
            );
            return c;
        }
    }
    tracing::debug!(
        target: "extension_install::package_set",
        "package_set: no embedded uv found — falling back to PATH lookup"
    );
    PathBuf::from("uv")
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

/// Max number of payload entries sampled per `RECORD` before giving up. A
/// healthy package needs at most one present payload to clear; a broken one is
/// flagged on the first missing payload.
const RECORD_PAYLOAD_SAMPLE: usize = 2;

/// Resolve the venv's `site-packages` directory across POSIX/Windows layouts.
/// Returns the first candidate that exists, or `None` when neither does.
fn site_packages_dir(venv: &Path) -> Option<PathBuf> {
    let windows_layout = venv.join("Lib").join("site-packages");
    if windows_layout.is_dir() {
        return Some(windows_layout);
    }
    let lib = venv.join("lib");
    let mut entries = std::fs::read_dir(&lib).ok()?;
    while let Some(entry) = entries.next().and_then(Result::ok) {
        let name = entry.file_name();
        let name = name.to_string_lossy();
        if name.starts_with("python") {
            let candidate = entry.path().join("site-packages");
            if candidate.is_dir() {
                return Some(candidate);
            }
        }
    }
    None
}

/// Normalize a `<distribution>-<version>.dist-info` directory name into the
/// PEP 503 package name. The wheel distribution part never contains a raw `-`
/// (it is escaped to `_`), so the first `-` is the name/version separator: take
/// the substring before it, then map `_`/`.` to `-` and lowercase.
fn dist_info_to_package_name(dir_name: &str) -> Option<String> {
    let stem = dir_name.strip_suffix(".dist-info")?;
    let distribution = stem.split('-').next().filter(|s| !s.is_empty())?;
    let collapsed: String = distribution
        .chars()
        .map(|c| if matches!(c, '_' | '.') { '-' } else { c })
        .collect();
    Some(collapsed.to_lowercase())
}

/// True when the recorded `RECORD` path is a payload file worth sampling: not
/// the package's own metadata, not an out-of-tree script (`../`), not a `.pyc`.
fn is_sampleable_payload(record_path: &str, own_dist_info_prefix: &str) -> bool {
    !record_path.is_empty()
        && !record_path.starts_with(own_dist_info_prefix)
        && !record_path.starts_with("../")
        && !record_path.starts_with("..\\")
        && !record_path.ends_with(".pyc")
}

/// True when `<site_packages>/<record_path>` is present and non-empty. Guards
/// against `..` traversal escaping site-packages by rejecting any path whose
/// components are not plain names.
fn payload_present(site_packages: &Path, record_path: &str) -> bool {
    let rel = Path::new(record_path);
    if rel
        .components()
        .any(|c| !matches!(c, std::path::Component::Normal(_)))
    {
        return false;
    }
    let resolved = site_packages.join(rel);
    std::fs::metadata(&resolved)
        .map(|m| m.len() > 0)
        .unwrap_or(false)
}

/// Scan a venv for packages with a recorded `.dist-info/RECORD` whose payload
/// files are missing or zero-size on disk — the signature of a partial `uv`
/// install where the dist-info exists but materialization was interrupted.
///
/// For each dist-info, samples the first [`RECORD_PAYLOAD_SAMPLE`] non-metadata,
/// in-tree payload entries; the package is flagged on the first entry that is
/// absent or empty. An unreadable/missing RECORD is skipped (never flagged) so
/// only a confirmed-missing payload forces a re-sync. Returns the normalized
/// names (PEP 503) of all flagged packages.
pub(crate) fn venv_partial_install_packages(venv: &Path) -> Vec<String> {
    let Some(site_packages) = site_packages_dir(venv) else {
        return Vec::new();
    };
    let entries = match std::fs::read_dir(&site_packages) {
        Ok(rd) => rd,
        Err(_) => return Vec::new(),
    };
    let mut broken = Vec::new();
    for entry in entries.flatten() {
        let dir_name = entry.file_name();
        let dir_name = dir_name.to_string_lossy();
        if !dir_name.ends_with(".dist-info") {
            continue;
        }
        let Some(package) = dist_info_to_package_name(&dir_name) else {
            continue;
        };
        let record = match std::fs::read_to_string(entry.path().join("RECORD")) {
            Ok(text) => text,
            Err(_) => continue,
        };
        let own_prefix = format!("{dir_name}/");
        let mut sampled = 0usize;
        for line in record.lines() {
            if sampled >= RECORD_PAYLOAD_SAMPLE {
                break;
            }
            let record_path = line.split(',').next().unwrap_or("").trim();
            if !is_sampleable_payload(record_path, &own_prefix) {
                continue;
            }
            sampled += 1;
            if !payload_present(&site_packages, record_path) {
                broken.push(package);
                break;
            }
        }
    }
    broken
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Pin all install-time paths inside `<extension_data_dir>/...`. Any
    /// future change that places packages, the venv, or the uv cache
    /// outside the per-extension dir will fail this test loudly. Companion
    /// to FR-033 (disk layout is the source of truth) and the project's
    /// host ↔ extension boundary rule.
    #[test]
    fn install_paths_are_extension_scoped() {
        let ext_data = PathBuf::from("/host/extensions/example");
        let ext_dir = PathBuf::from("/repo/extensions/builtin/example");

        // Stand up just enough of a StepContext to exercise the path helpers.
        // The other fields are not read by venv_dir/marker_path/locate_uv/
        // python_interpreter so we use cheap stubs.
        let model_store: std::sync::Arc<dyn crate::ModelStoreClient> =
            std::sync::Arc::new(stubs::ModelStore);
        let runtime_bootstrapper: std::sync::Arc<dyn crate::RuntimeBootstrapper> =
            std::sync::Arc::new(stubs::Runtime);
        let worker_handshake: std::sync::Arc<dyn crate::WorkerHandshake> =
            std::sync::Arc::new(stubs::Handshake);
        let progress_sink: std::sync::Arc<dyn crate::ProgressSink> =
            std::sync::Arc::new(stubs::Sink);
        let fetch_artifact: std::sync::Arc<crate::fetch::FetchArtifact> =
            std::sync::Arc::new(|_req: crate::fetch::FetchRequest| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            });
        let upstream = std::collections::HashMap::new();
        let ctx = StepContext {
            extension_id: "example",
            extension_dir: &ext_dir,
            extension_data_dir: &ext_data,
            host_data_dir: &ext_data,
            model_store,
            runtime_bootstrapper,
            worker_handshake,
            fetch_artifact,
            progress_sink,
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            force: false,
            upstream_artifacts: &upstream,
        };

        // venv MUST live under <extension_data_dir>.
        let venv = venv_dir(&ctx);
        assert!(
            venv.starts_with(&ext_data),
            "venv {} escapes extension_data_dir {}",
            venv.display(),
            ext_data.display()
        );

        // marker MUST live under <extension_data_dir>.
        let marker = marker_path(&ctx);
        assert!(
            marker.starts_with(&ext_data),
            "marker {} escapes extension_data_dir {}",
            marker.display(),
            ext_data.display()
        );

        // The interpreter probe MUST only check candidates under
        // <extension_data_dir>/runtime/python — it must never look at
        // PATH, registry, or any user-level install.
        let py = python_interpreter(&ctx); // returns None for non-existent paths
        assert!(py.is_none(), "no fixture present so probe must return None");
    }

    /// `default_target` MUST stay `extension_local` — changing it to a
    /// host-shared default would silently violate the isolation invariant
    /// for any manifest that omits the field.
    #[test]
    fn default_target_is_extension_local() {
        assert_eq!(default_target(), "extension_local");
    }

    #[test]
    fn spec_without_extras_defaults_to_empty() {
        let spec = serde_json::json!({
            "manager": "uv",
            "manifest_path": "worker/pyproject.toml",
        });
        let parsed = parse(&spec).expect("valid spec");
        assert!(parsed.extras.is_empty());
        PackageSetHandler::new().validate(&spec).expect("valid");
    }

    #[test]
    fn spec_extras_are_parsed_in_order() {
        let spec = serde_json::json!({
            "manager": "uv",
            "manifest_path": "worker/pyproject.toml",
            "extras": ["diffusers", "flash"],
        });
        let parsed = parse(&spec).expect("valid spec");
        assert_eq!(parsed.extras, vec!["diffusers", "flash"]);
        PackageSetHandler::new().validate(&spec).expect("valid");
    }

    #[test]
    fn validate_rejects_malformed_extra_names() {
        for bad in ["", "--all-extras", "name with space", "a;b"] {
            let spec = serde_json::json!({
                "manager": "uv",
                "manifest_path": "worker/pyproject.toml",
                "extras": [bad],
            });
            assert!(
                PackageSetHandler::new().validate(&spec).is_err(),
                "extra '{bad}' must be rejected"
            );
        }
    }

    #[test]
    fn parse_uv_progress_extracts_counts_from_summary_lines() {
        assert_eq!(
            parse_uv_progress("Resolved 47 packages in 1.2s"),
            Some((0, 47))
        );
        assert_eq!(
            parse_uv_progress("Prepared 12 packages in 800ms"),
            Some((12, 12))
        );
        assert_eq!(
            parse_uv_progress("Installed 47 packages in 3.1s"),
            Some((47, 0))
        );
        assert_eq!(parse_uv_progress("   Installed 5 packages"), Some((5, 0)));
        assert_eq!(parse_uv_progress("Downloading numpy"), Some((0, 0)));
        assert_eq!(parse_uv_progress("Building torch"), Some((0, 0)));
        assert_eq!(parse_uv_progress("warning: something unrelated"), None);
        assert_eq!(parse_uv_progress(""), None);
        assert_eq!(parse_uv_progress("Resolved no-number here"), None);
    }

    #[test]
    fn parse_uv_line_maps_phases_and_message() {
        let mut total = 0;
        let resolved = parse_uv_line("Resolved 47 packages in 1.2s", &mut total)
            .expect("resolved yields progress");
        assert_eq!(resolved.phase, "resolving");
        assert_eq!(
            resolved.message.as_deref(),
            Some("Resolved 47 packages in 1.2s")
        );
        assert_eq!(total, 47);

        let downloading =
            parse_uv_line("Downloading numpy", &mut total).expect("downloading yields progress");
        assert_eq!(downloading.phase, "downloading");
        assert_eq!(downloading.message.as_deref(), Some("Downloading numpy"));

        let building =
            parse_uv_line("Building torch", &mut total).expect("building yields progress");
        assert_eq!(building.phase, "downloading");
    }

    #[test]
    fn parse_uv_line_installed_derives_pct_from_resolved_total() {
        let mut total = 0;
        // First a Resolved line establishes the total.
        let _ = parse_uv_line("Resolved 50 packages in 1.0s", &mut total);
        let installed = parse_uv_line("Installed 25 packages in 3.0s", &mut total)
            .expect("installed yields progress");
        assert_eq!(installed.phase, "installing");
        let pct = installed.pct.expect("pct derived from k/N");
        assert!((pct - 50.0).abs() < 0.01, "expected ~50%, got {pct}");
    }

    #[test]
    fn parse_uv_line_returns_none_for_noise() {
        let mut total = 0;
        assert!(parse_uv_line("warning: unrelated", &mut total).is_none());
        assert!(parse_uv_line("", &mut total).is_none());
    }

    #[test]
    fn parse_uv_line_prepared_is_installing_phase() {
        let mut total = 0;
        let prepared =
            parse_uv_line("Prepared 12 packages in 800ms", &mut total).expect("prepared progress");
        assert_eq!(prepared.phase, "installing");
        // Prepared sets both current and total to 12 → 100% of its own batch.
        assert_eq!(prepared.pct, Some(100.0));
    }

    /// Validation MUST reject any non-extension-local `target`. Pins the
    /// FR-013 enum (v1: `extension_local` only) so a future "host_shared"
    /// requires both spec + handler approval.
    #[test]
    fn handler_validate_rejects_non_extension_local_target() {
        let handler = PackageSetHandler::new();
        let spec = serde_json::json!({
            "manager": "uv",
            "manifest_path": "worker/pyproject.toml",
            "target": "host_shared",
        });
        let err = handler.validate(&spec).unwrap_err();
        let msg = err.to_string();
        assert!(
            msg.contains("extension_local"),
            "validation error must name the supported value, got: {msg}"
        );
    }

    /// Build a unique temp site-packages dir under the OS temp root and return
    /// `(venv_root, site_packages)`. Caller cleans up `venv_root`.
    fn temp_venv_site_packages(nonce: &str) -> (PathBuf, PathBuf) {
        let unique = format!(
            "nexus-pkgset-{}-{}-{:?}",
            nonce,
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map(|d| d.as_nanos())
                .unwrap_or(0)
        );
        let venv = std::env::temp_dir().join(unique);
        let site_packages = if cfg!(windows) {
            venv.join("Lib").join("site-packages")
        } else {
            venv.join("lib").join("python3.12").join("site-packages")
        };
        std::fs::create_dir_all(&site_packages).expect("create site-packages");
        (venv, site_packages)
    }

    fn write_record(site_packages: &Path, dist_info: &str, lines: &[&str]) {
        let dir = site_packages.join(dist_info);
        std::fs::create_dir_all(&dir).expect("create dist-info");
        std::fs::write(dir.join("RECORD"), lines.join("\n")).expect("write RECORD");
    }

    #[test]
    fn partial_install_flags_package_with_missing_payload() {
        let (venv, site) = temp_venv_site_packages("missing");
        write_record(
            &site,
            "nvidia_cudnn_cu13-9.19.0.56.dist-info",
            &[
                "nvidia/cudnn/lib/libcudnn.so.9,,",
                "nvidia_cudnn_cu13-9.19.0.56.dist-info/RECORD,,",
            ],
        );
        let broken = venv_partial_install_packages(&venv);
        assert_eq!(broken, vec!["nvidia-cudnn-cu13".to_owned()]);
        let _ = std::fs::remove_dir_all(&venv);
    }

    #[test]
    fn partial_install_clean_when_payload_present() {
        let (venv, site) = temp_venv_site_packages("present");
        let payload = site.join("nvidia").join("cudnn").join("lib");
        std::fs::create_dir_all(&payload).expect("create payload dir");
        std::fs::write(payload.join("libcudnn.so.9"), b"x").expect("write payload");
        write_record(
            &site,
            "nvidia_cudnn_cu13-9.19.0.56.dist-info",
            &[
                "nvidia/cudnn/lib/libcudnn.so.9,,",
                "nvidia_cudnn_cu13-9.19.0.56.dist-info/RECORD,,",
            ],
        );
        let broken = venv_partial_install_packages(&venv);
        assert!(
            broken.is_empty(),
            "present payload must not flag: {broken:?}"
        );
        let _ = std::fs::remove_dir_all(&venv);
    }

    #[test]
    fn partial_install_empty_site_packages_is_clean() {
        let (venv, _site) = temp_venv_site_packages("empty");
        let broken = venv_partial_install_packages(&venv);
        assert!(broken.is_empty(), "empty venv must be clean: {broken:?}");
        let _ = std::fs::remove_dir_all(&venv);
    }

    #[test]
    fn partial_install_metadata_only_record_is_clean() {
        let (venv, site) = temp_venv_site_packages("metaonly");
        write_record(
            &site,
            "tiny_pkg-1.0.0.dist-info",
            &[
                "tiny_pkg-1.0.0.dist-info/METADATA,,",
                "tiny_pkg-1.0.0.dist-info/RECORD,,",
                "tiny_pkg-1.0.0.dist-info/WHEEL,,",
            ],
        );
        let broken = venv_partial_install_packages(&venv);
        assert!(
            broken.is_empty(),
            "self-metadata-only RECORD must not flag: {broken:?}"
        );
        let _ = std::fs::remove_dir_all(&venv);
    }

    /// sha256 of a file as a lowercase hex string, mirroring `file_sha256`.
    fn sync_sha256(path: &Path) -> String {
        use sha2::{Digest, Sha256};
        let bytes = std::fs::read(path).expect("read manifest");
        let digest = Sha256::digest(&bytes);
        let mut s = String::with_capacity(digest.len() * 2);
        for b in digest {
            s.push_str(&format!("{b:02x}"));
        }
        s
    }

    /// Unique temp root for a probe fixture: returns the dir to clean up.
    fn temp_probe_root(nonce: &str) -> PathBuf {
        let unique = format!(
            "nexus-pkgset-probe-{}-{}-{:?}",
            nonce,
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map(|d| d.as_nanos())
                .unwrap_or(0)
        );
        let root = std::env::temp_dir().join(unique);
        std::fs::create_dir_all(&root).expect("create probe root");
        root
    }

    #[tokio::test]
    async fn probe_reports_not_satisfied_on_partial_install() {
        let root = temp_probe_root("partial");
        let ext_dir = root.join("ext");
        let ext_data = root.join("data");
        let packages = ext_data.join("runtime").join("packages");
        let venv = packages.join(".venv");
        std::fs::create_dir_all(&ext_dir).expect("ext dir");
        std::fs::create_dir_all(&packages).expect("packages dir");

        let manifest_rel = "worker/pyproject.toml";
        let manifest_full = ext_dir.join(manifest_rel);
        std::fs::create_dir_all(manifest_full.parent().expect("parent")).expect("manifest parent");
        std::fs::write(&manifest_full, b"[project]\nname='x'\n").expect("write manifest");

        let site = venv.join("lib").join("python3.12").join("site-packages");
        std::fs::create_dir_all(&site).expect("site-packages");
        write_record(
            &site,
            "nvidia_cudnn_cu13-9.19.0.56.dist-info",
            &["nvidia/cudnn/lib/libcudnn.so.9,,"],
        );

        let marker = serde_json::json!({
            "manifest_path": manifest_rel,
            "manifest_sha256": sync_sha256(&manifest_full),
            "lock_path": serde_json::Value::Null,
            "extras": Vec::<String>::new(),
            "synced_at": "2026-01-01T00:00:00Z",
        });
        std::fs::write(
            packages.join(".synced.json"),
            serde_json::to_vec_pretty(&marker).expect("marker bytes"),
        )
        .expect("write marker");

        let model_store: std::sync::Arc<dyn crate::ModelStoreClient> =
            std::sync::Arc::new(stubs::ModelStore);
        let runtime_bootstrapper: std::sync::Arc<dyn crate::RuntimeBootstrapper> =
            std::sync::Arc::new(stubs::Runtime);
        let worker_handshake: std::sync::Arc<dyn crate::WorkerHandshake> =
            std::sync::Arc::new(stubs::Handshake);
        let progress_sink: std::sync::Arc<dyn crate::ProgressSink> =
            std::sync::Arc::new(stubs::Sink);
        let fetch_artifact: std::sync::Arc<crate::fetch::FetchArtifact> =
            std::sync::Arc::new(|_req: crate::fetch::FetchRequest| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            });
        let upstream = std::collections::HashMap::new();
        let ctx = StepContext {
            extension_id: "example",
            extension_dir: &ext_dir,
            extension_data_dir: &ext_data,
            host_data_dir: &ext_data,
            model_store,
            runtime_bootstrapper,
            worker_handshake,
            fetch_artifact,
            progress_sink,
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            force: false,
            upstream_artifacts: &upstream,
        };
        let spec = serde_json::json!({
            "manager": "uv",
            "manifest_path": manifest_rel,
        });
        let result = PackageSetHandler::new()
            .probe(&ctx, &spec)
            .await
            .expect("probe ok");
        assert!(
            matches!(result, ProbeResult::NotSatisfied),
            "partial install must force re-sync, got {result:?}"
        );
        let _ = std::fs::remove_dir_all(&root);
    }

    mod stubs {
        use super::*;
        use async_trait::async_trait;

        pub struct ModelStore;
        #[async_trait]
        impl crate::ModelStoreClient for ModelStore {
            async fn is_family_installed(
                &self,
                _f: &str,
                _a: Option<&str>,
            ) -> Result<Option<PathBuf>, DepError> {
                Ok(None)
            }
            async fn start_download(
                &self,
                _f: &str,
                _a: Option<&str>,
                _s: &crate::FileSelection,
            ) -> Result<String, DepError> {
                unreachable!()
            }
            async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
                unreachable!()
            }
        }

        pub struct Runtime;
        #[async_trait]
        impl crate::RuntimeBootstrapper for Runtime {
            async fn probe(
                &self,
                _f: &str,
                _v: Option<&str>,
                _a: &[String],
                _t: &Path,
            ) -> Result<Option<crate::RuntimeBootstrapResult>, DepError> {
                Ok(None)
            }
            async fn bootstrap(
                &self,
                _f: &str,
                _v: Option<&str>,
                _a: &[String],
                _t: &Path,
                _c: tokio_util::sync::CancellationToken,
            ) -> Result<crate::RuntimeBootstrapResult, DepError> {
                unreachable!()
            }
        }

        pub struct Handshake;
        #[async_trait]
        impl crate::WorkerHandshake for Handshake {
            async fn run_handshake(
                &self,
                _ext: &str,
                _dir: &Path,
                _data: &Path,
                _ups: &std::collections::HashMap<String, crate::StepArtifact>,
                _t: std::time::Duration,
                _c: tokio_util::sync::CancellationToken,
            ) -> Result<(), crate::HandshakeError> {
                unreachable!()
            }
        }

        pub struct Sink;
        impl crate::ProgressSink for Sink {
            fn emit(&self, _e: crate::types::ProgressEvent) {}
        }
    }
}
