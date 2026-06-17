use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use std::process::Stdio;

use tokio::process::Command;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

use super::handler::python_exe_in;

const PHASE: &str = "install_deps";
pub const WORKER_DIR: &str = "worker";
pub const UV_STDERR_TRUNCATE_LIMIT: usize = 2048;
pub const DEFAULT_UV_PROGRAM: &str = "uv";
const WINDOWS_EXCLUDED_EXTRA: &str = "deepspeed";

#[derive(Debug, Clone)]
pub struct UvInvocation {
    pub program: PathBuf,
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

    let pyproject_path = worker_dir.join("pyproject.toml");
    let pyproject_extras = read_pyproject_extras(&pyproject_path).await;
    let args = sync_args_for(invocation, &pyproject_extras);
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

/// Build `uv sync` args for an invocation given the set of extras the
/// project's pyproject.toml actually declares. Emits
/// `--no-extra=deepspeed` ONLY when deepspeed is in `available_extras`
/// AND the operator hasn't opted in — uv 0.6+ errors out on
/// `--no-extra=X` if X isn't declared.
pub(crate) fn sync_args_for(invocation: &UvInvocation, available_extras: &[String]) -> Vec<String> {
    let mut args = vec!["sync".to_string(), "--all-extras".to_string()];
    let skip_deepspeed = cfg!(windows)
        && !invocation.deepspeed_extra_on_windows
        && available_extras.iter().any(|e| e == WINDOWS_EXCLUDED_EXTRA);
    if skip_deepspeed {
        args.push(format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}"));
    }
    args
}

/// Best-effort read of `[project.optional-dependencies]` keys from a
/// pyproject.toml. Returns the extra names; on any IO / parse error
/// returns an empty list (caller falls back to skip-emit behaviour).
async fn read_pyproject_extras(path: &Path) -> Vec<String> {
    let bytes = match tokio::fs::read(path).await {
        Ok(b) => b,
        Err(_) => return Vec::new(),
    };
    let text = match std::str::from_utf8(&bytes) {
        Ok(t) => t,
        Err(_) => return Vec::new(),
    };
    parse_optional_dependency_extras(text)
}

/// Pure-function extras extraction. Walks the TOML line-by-line to
/// avoid a hard dependency on the `toml` crate. Recognises the
/// `[project.optional-dependencies]` table and collects keys until the
/// next `[...]` header. Robust enough for the limited shapes we ship.
fn parse_optional_dependency_extras(text: &str) -> Vec<String> {
    let mut extras = Vec::new();
    let mut in_table = false;
    for raw_line in text.lines() {
        let line = raw_line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        if let Some(header) = line.strip_prefix('[').and_then(|s| s.strip_suffix(']')) {
            in_table = header.trim() == "project.optional-dependencies";
            continue;
        }
        if !in_table {
            continue;
        }
        // Match `name = [...` — keep name up to '='.
        if let Some(eq_pos) = line.find('=') {
            let key = line[..eq_pos].trim().trim_matches('"').trim_matches('\'');
            if !key.is_empty() {
                extras.push(key.to_string());
            }
        }
    }
    extras
}

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sync_args_always_contains_all_extras() {
        let args = sync_args_for(&UvInvocation::default(), &["deepspeed".into()]);
        assert_eq!(args[0], "sync");
        assert!(args.contains(&"--all-extras".into()));
    }

    #[test]
    fn sync_args_respects_deepspeed_knob_on_windows() {
        if cfg!(windows) {
            let default = sync_args_for(&UvInvocation::default(), &["deepspeed".into()]);
            assert!(
                default
                    .iter()
                    .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}")),
                "windows default must skip deepspeed extra"
            );

            let opt_in = sync_args_for(
                &UvInvocation {
                    program: PathBuf::from(DEFAULT_UV_PROGRAM),
                    deepspeed_extra_on_windows: true,
                },
                &["deepspeed".into()],
            );
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
            let args = sync_args_for(&UvInvocation::default(), &["deepspeed".into()]);
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
        assert!(out.len() > 12);
    }

    #[test]
    fn truncate_utf8_under_limit_passes_through() {
        let s = "short message";
        let out = truncate_utf8(s.as_bytes(), UV_STDERR_TRUNCATE_LIMIT);
        assert_eq!(out, s);
    }

    #[test]
    fn extras_parser_finds_declared_keys() {
        let toml = r#"
[project]
name = "x"

[project.optional-dependencies]
dev = ["pytest"]
deepspeed = ["deepspeed>=0.15"]
"trt-llm" = ["tensorrt-llm"]

[build-system]
requires = ["hatchling"]
"#;
        let extras = parse_optional_dependency_extras(toml);
        assert_eq!(extras, vec!["dev", "deepspeed", "trt-llm"]);
    }

    #[test]
    fn extras_parser_empty_when_section_absent() {
        let toml = r#"
[project]
name = "x"
dependencies = ["foo"]
"#;
        assert!(parse_optional_dependency_extras(toml).is_empty());
    }

    #[test]
    fn sync_args_for_skips_deepspeed_only_when_declared() {
        if !cfg!(windows) {
            return;
        }
        let inv = UvInvocation::default();
        // Project declares deepspeed → must emit --no-extra
        let with = sync_args_for(&inv, &["dev".into(), "deepspeed".into()]);
        assert!(
            with.iter()
                .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}"))
        );
        // Project does NOT declare deepspeed → must NOT emit --no-extra
        let without = sync_args_for(&inv, &["dev".into()]);
        assert!(
            !without
                .iter()
                .any(|a| a == &format!("--no-extra={WINDOWS_EXCLUDED_EXTRA}"))
        );
    }
}
