//! `system_binary` step handler — extension declares per-platform sources, host
//! provides the generic [`crate::fetch::fetch_artifact`] primitive.
//!
//! Each successful install lands at
//! `<host_data>/extensions/<ext-id>/runtime/binaries/<id>/<sha256-prefix>/`
//! (content-addressed; reinstalls are atomic).

use std::path::PathBuf;

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::fetch::FetchRequest;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::{ArchiveFormat, PlatformTuple, StepArtifact};

#[derive(Debug, Deserialize)]
struct SystemBinarySpec {
    id: String,
    #[serde(default)]
    version: Option<String>,
    sources: Vec<SourceEntry>,
    /// When true, `probe()` first looks for `id` on the host's `PATH` and
    /// declares the step satisfied if found. Falls back to the bundled
    /// content-addressed install when no system binary exists. Off by
    /// default — extensions that genuinely need the pinned bundled artifact
    /// (security, version-locking) keep the original strict behavior.
    ///
    /// Used today by the EmotionTTS `ffmpeg` step where the upstream URLs
    /// are `latest` releases that can't be sha256-pinned, and the operator
    /// is content with whatever ffmpeg the user already has.
    #[serde(default)]
    allow_system_path: bool,
}

#[derive(Debug, Deserialize)]
struct SourceEntry {
    platform: String,
    url: String,
    sha256: String,
    #[serde(default)]
    size: Option<u64>,
    #[serde(default)]
    archive: Option<String>,
}

pub struct SystemBinaryHandler;

impl SystemBinaryHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for SystemBinaryHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<SystemBinarySpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

fn select_source<'a>(
    parsed: &'a SystemBinarySpec,
    host: &PlatformTuple,
) -> Option<&'a SourceEntry> {
    let want = host.as_canonical();
    parsed.sources.iter().find(|s| s.platform == want)
}

fn target_dir(ctx: &StepContext<'_>, id: &str, sha256: &str) -> PathBuf {
    target_dir_for(ctx.extension_data_dir, id, sha256)
}

/// Resolve `id` against the host's `PATH` env var. Returns the absolute path
/// to the first matching executable, or `None` if not found. Cross-platform:
/// on Windows we also try common executable suffixes (`.exe`, `.cmd`, `.bat`).
fn locate_on_path(id: &str) -> Option<PathBuf> {
    let path = std::env::var_os("PATH")?;
    let candidates: Vec<String> = if cfg!(windows) {
        // Already-suffixed names skip the suffix loop.
        if id.contains('.') {
            vec![id.to_owned()]
        } else {
            vec![
                format!("{id}.exe"),
                format!("{id}.cmd"),
                format!("{id}.bat"),
                id.to_owned(),
            ]
        }
    } else {
        vec![id.to_owned()]
    };
    for dir in std::env::split_paths(&path) {
        for name in &candidates {
            let candidate = dir.join(name);
            if candidate.is_file() {
                return Some(candidate);
            }
        }
    }
    None
}

/// Pure form of [`target_dir`] — content-addressed binary install path under
/// the per-extension data dir. Carved out so the extension-scope invariant
/// is testable without a full `StepContext`.
pub(crate) fn target_dir_for(
    extension_data_dir: &std::path::Path,
    id: &str,
    sha256: &str,
) -> PathBuf {
    let prefix = sha256.get(..8).unwrap_or(sha256);
    extension_data_dir
        .join("runtime")
        .join("binaries")
        .join(id)
        .join(prefix)
}

#[async_trait]
impl StepHandler for SystemBinaryHandler {
    fn step_type(&self) -> &'static str {
        "system_binary"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.id.trim().is_empty() {
            return Err(DepError::invalid_spec("", "id", "empty"));
        }
        if parsed.sources.is_empty() {
            return Err(DepError::invalid_spec(
                "",
                "sources",
                "at least one source required",
            ));
        }
        for src in &parsed.sources {
            if src.url.trim().is_empty() {
                return Err(DepError::invalid_spec("", "sources[].url", "empty"));
            }
            if src.sha256.len() != 64 {
                return Err(DepError::invalid_spec(
                    "",
                    "sources[].sha256",
                    "must be 64-char hex sha256",
                ));
            }
            if let Some(archive) = src.archive.as_deref()
                && ArchiveFormat::parse(archive).is_none()
            {
                return Err(DepError::invalid_spec(
                    "",
                    "sources[].archive",
                    format!("unsupported archive format: {archive}"),
                ));
            }
            if PlatformTuple::parse(&src.platform).is_none() {
                return Err(DepError::invalid_spec(
                    "",
                    "sources[].platform",
                    format!("not a canonical platform tuple: {}", src.platform),
                ));
            }
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let host = PlatformTuple::host();

        // Opt-in: resolve via system PATH first. This takes precedence over a
        // declared source, so a binary present on PATH satisfies the step even
        if parsed.allow_system_path
            && let Some(found) = locate_on_path(&parsed.id)
        {
            return Ok(ProbeResult::Satisfied {
                artifact: StepArtifact {
                    path: Some(found),
                    bytes_placed: 0,
                    summary: format!(
                        "{} {} (system path)",
                        parsed.id,
                        parsed.version.as_deref().unwrap_or("any"),
                    ),
                    metadata: Value::Null,
                },
            });
        }

        let Some(source) = select_source(&parsed, &host) else {
            return Ok(ProbeResult::Unsupported {
                reason: format!("no source declared for {}", host.as_canonical()),
            });
        };

        let dir = target_dir(ctx, &parsed.id, &source.sha256);
        if dir.exists() && tokio::fs::read_dir(&dir).await.is_ok() {
            // Content-addressed dir exists. Treat as satisfied. Bytes already verified
            // when first placed.
            return Ok(ProbeResult::Satisfied {
                artifact: StepArtifact {
                    path: Some(dir),
                    bytes_placed: source.size.unwrap_or(0),
                    summary: format!(
                        "{} {} ({})",
                        parsed.id,
                        parsed.version.as_deref().unwrap_or("any"),
                        host.as_canonical(),
                    ),
                    metadata: Value::Null,
                },
            });
        }
        Ok(ProbeResult::NotSatisfied)
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let host = PlatformTuple::host();

        // PATH-fallback runs before source selection. The runner skips
        // `probe()` entirely under force-reinstall (`force=true`), so without
        if parsed.allow_system_path
            && let Some(found) = locate_on_path(&parsed.id)
        {
            tracing::info!(
                target: "extension_install::probe",
                id = %parsed.id,
                path = %found.display(),
                "system_binary: PATH hit during run() — skipping bundled download \
                 (system-owned binary, not handler-managed)"
            );
            return Ok(StepArtifact {
                path: Some(found),
                bytes_placed: 0,
                summary: format!(
                    "{} {} (system path)",
                    parsed.id,
                    parsed.version.as_deref().unwrap_or("any"),
                ),
                metadata: Value::Null,
            });
        }

        let Some(source) = select_source(&parsed, &host) else {
            return Err(DepError::UnsupportedPlatform {
                platform: host.as_canonical(),
            });
        };

        let dir = target_dir(ctx, &parsed.id, &source.sha256);
        let archive = source
            .archive
            .as_deref()
            .map(|s| ArchiveFormat::parse(s).unwrap_or(ArchiveFormat::None))
            .unwrap_or(ArchiveFormat::None);

        let mut req = FetchRequest::new(&source.url, &source.sha256, &dir);
        req.size = source.size;
        req.archive = archive;
        req.progress = Some(ctx.progress_sink.clone());
        req.cancellation = Some(ctx.cancellation_token.clone());
        req.progress_run_id = Some(ctx.install_run_id);
        req.progress_extension_id = Some(ctx.extension_id.to_owned());

        let placed = (ctx.fetch_artifact)(req).await?;

        Ok(StepArtifact {
            path: Some(placed),
            bytes_placed: source.size.unwrap_or(0),
            summary: format!(
                "{} {} ({})",
                parsed.id,
                parsed.version.as_deref().unwrap_or("any"),
                host.as_canonical(),
            ),
            metadata: Value::Null,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Pin: every system binary lands under the per-extension data dir.
    /// Two extensions installing ffmpeg get two separate copies (content-
    /// addressed by sha256 prefix so reinstall is atomic) — never a shared
    /// `/usr/local/bin` style write.
    #[test]
    fn target_dir_is_extension_scoped_and_content_addressed() {
        let ext_data = std::path::Path::new("/host/extensions/example");
        let sha = "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";
        let dir = target_dir_for(ext_data, "ffmpeg", sha);
        assert!(
            dir.starts_with(ext_data),
            "system_binary target {} escapes extension_data_dir {}",
            dir.display(),
            ext_data.display()
        );
        // Sha-prefix is the content-address; deeper than the binary id so
        // a hash bump produces a sibling dir, not an overwrite.
        assert!(dir.ends_with("deadbeef"));
    }

    /// Two extensions installing the same binary id (with the same sha)
    /// land in two distinct dirs — the per-extension scope wins over any
    /// cross-extension dedupe.
    #[test]
    fn target_dirs_for_two_extensions_do_not_alias() {
        let sha = "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";
        let a = target_dir_for(std::path::Path::new("/host/extensions/a"), "ffmpeg", sha);
        let b = target_dir_for(std::path::Path::new("/host/extensions/b"), "ffmpeg", sha);
        assert_ne!(a, b);
    }

    /// A short sha (or non-hex) still lands inside the per-extension dir —
    /// the content-address prefix fallback never escapes.
    #[test]
    fn target_dir_handles_short_sha_safely() {
        let dir = target_dir_for(std::path::Path::new("/host/x"), "id", "abc");
        assert!(dir.starts_with("/host/x"));
    }
}
