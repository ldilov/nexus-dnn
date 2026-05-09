//! `/snapshot` artifact writer.
//!
//! Writes a deterministic header + JSON-Lines body of `EventLine`s to
//! a path. Atomic via temp-file + rename. Sensitive fields are
//! redacted at the source (the host-side tracing bridge already
//! replaces values with `<redacted>` per FR-036c); this writer only
//! serialises what the ring buffer holds.

use std::fs::{self, File};
use std::io::{self, Write};
use std::path::{Path, PathBuf};

use serde::Serialize;

use crate::stream::event_line::{EventLine, RawPayload};
use crate::stream::filter::{FilterState, FollowTarget};
use crate::stream::ring_buffer::RingBuffer;

const ARTIFACT_HEADER: &str = "# nexus snapshot";

pub struct SnapshotInputs<'a> {
    pub host_url: &'a str,
    pub path: &'a Path,
}

#[derive(Debug, thiserror::Error)]
pub enum SnapshotError {
    #[error("missing parent directory: {0}")]
    MissingParent(PathBuf),
    #[error("permission denied: {path}")]
    PermissionDenied { path: PathBuf },
    #[error("io error: {0}")]
    Io(#[from] io::Error),
    #[error("serialise failed: {0}")]
    Serialise(#[from] serde_json::Error),
}

pub fn write_snapshot(
    inputs: &SnapshotInputs<'_>,
    ring: &RingBuffer,
    filter: &FilterState,
) -> Result<(), SnapshotError> {
    let target = inputs.path;
    let parent = target.parent().filter(|p| !p.as_os_str().is_empty());
    if let Some(dir) = parent
        && !dir.exists()
    {
        return Err(SnapshotError::MissingParent(dir.to_path_buf()));
    }

    let temp_name = match target.file_name() {
        Some(name) => format!(".{}.partial", name.to_string_lossy()),
        None => ".snapshot.partial".to_string(),
    };
    let temp_path = match parent {
        Some(dir) => dir.join(temp_name),
        None => PathBuf::from(temp_name),
    };

    let write_result = (|| -> Result<(), SnapshotError> {
        let mut f = match File::create(&temp_path) {
            Ok(f) => f,
            Err(err) if err.kind() == io::ErrorKind::PermissionDenied => {
                return Err(SnapshotError::PermissionDenied {
                    path: target.to_path_buf(),
                });
            }
            Err(err) => return Err(SnapshotError::Io(err)),
        };
        write_header(&mut f, inputs, ring, filter)?;
        writeln!(f)?;
        write_body(&mut f, ring)?;
        Ok(())
    })();
    if let Err(err) = write_result {
        let _ = fs::remove_file(&temp_path);
        return Err(err);
    }

    if let Err(err) = fs::rename(&temp_path, target) {
        match err.kind() {
            io::ErrorKind::PermissionDenied => {
                let _ = fs::remove_file(&temp_path);
                return Err(SnapshotError::PermissionDenied {
                    path: target.to_path_buf(),
                });
            }
            _ if is_cross_device(&err) => {
                if let Err(copy_err) = fs::copy(&temp_path, target) {
                    let _ = fs::remove_file(&temp_path);
                    return Err(SnapshotError::Io(copy_err));
                }
                let _ = fs::remove_file(&temp_path);
                return Ok(());
            }
            _ => {
                let _ = fs::remove_file(&temp_path);
                return Err(SnapshotError::Io(err));
            }
        }
    }
    Ok(())
}

fn is_cross_device(err: &io::Error) -> bool {
    #[cfg(unix)]
    {
        if err.raw_os_error() == Some(libc_exdev()) {
            return true;
        }
    }
    err.to_string().contains("cross-device")
}

#[cfg(unix)]
const fn libc_exdev() -> i32 {
    18
}

fn write_header<W: Write>(
    w: &mut W,
    inputs: &SnapshotInputs<'_>,
    ring: &RingBuffer,
    filter: &FilterState,
) -> Result<(), SnapshotError> {
    writeln!(w, "{ARTIFACT_HEADER}")?;
    writeln!(w, "host: {}", inputs.host_url)?;
    writeln!(w, "written_at: {}", current_timestamp_ms())?;
    writeln!(w, "event_count: {}", ring.len())?;
    writeln!(w, "level_floor: {}", filter.level_floor())?;
    if let Some(g) = filter.source_glob_text() {
        writeln!(w, "source_glob: {g}")?;
    }
    if let Some(g) = filter.grep_text() {
        writeln!(w, "grep: {g}")?;
    }
    if let Some(target) = filter.follow_ref() {
        writeln!(w, "follow: {}", describe_follow(target))?;
    }
    writeln!(w, "paused: {}", filter.paused())?;
    Ok(())
}

fn write_body<W: Write>(w: &mut W, ring: &RingBuffer) -> Result<(), SnapshotError> {
    for line in ring.iter() {
        let record = SnapshotRecord::from(line);
        let json = serde_json::to_string(&record)?;
        writeln!(w, "{json}")?;
    }
    Ok(())
}

fn describe_follow(target: &FollowTarget) -> String {
    match target {
        FollowTarget::Run(id) => format!("run:{id}"),
        FollowTarget::Deploy(id) => format!("deploy:{id}"),
        FollowTarget::Extension(id) => format!("extension:{id}"),
    }
}

fn current_timestamp_ms() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0)
}

#[derive(Serialize)]
struct SnapshotRecord<'a> {
    id: String,
    timestamp_ms: i64,
    severity: &'a str,
    significance: &'a str,
    category: &'a str,
    source: &'a str,
    summary: &'a str,
    correlation: SnapshotCorrelation<'a>,
    payload: serde_json::Value,
}

#[derive(Serialize)]
struct SnapshotCorrelation<'a> {
    run_id: Option<&'a str>,
    deployment_id: Option<&'a str>,
    extension_id: Option<&'a str>,
    install_run_id: Option<&'a str>,
}

impl<'a> From<&'a EventLine> for SnapshotRecord<'a> {
    fn from(line: &'a EventLine) -> Self {
        let payload = match line.raw_payload.as_ref() {
            RawPayload::NexusEvent(e) => serde_json::to_value(e).unwrap_or_else(
                |err| serde_json::json!({ "error": format!("serialise failed: {err}") }),
            ),
            RawPayload::RunEventItem(item) => serde_json::to_value(item).unwrap_or_else(
                |err| serde_json::json!({ "error": format!("serialise failed: {err}") }),
            ),
        };
        Self {
            id: format!("{}", line.id),
            timestamp_ms: line.timestamp_ms,
            severity: severity_label(line.severity),
            significance: significance_label(line.significance),
            category: category_label(line.category),
            source: &line.source,
            summary: &line.summary,
            correlation: SnapshotCorrelation {
                run_id: line.correlation.run_id.as_deref(),
                deployment_id: line.correlation.deployment_id.as_deref(),
                extension_id: line.correlation.extension_id.as_deref(),
                install_run_id: line.correlation.install_run_id.as_deref(),
            },
            payload,
        }
    }
}

fn severity_label(severity: crate::stream::severity::Severity) -> &'static str {
    use crate::stream::severity::Severity;
    match severity {
        Severity::Debug => "debug",
        Severity::Info => "info",
        Severity::Warn => "warn",
        Severity::Error => "error",
        Severity::Fatal => "fatal",
    }
}

fn significance_label(significance: crate::stream::significance::Significance) -> &'static str {
    use crate::stream::significance::Significance;
    match significance {
        Significance::Silent => "silent",
        Significance::Hum => "hum",
        Significance::Normal => "normal",
        Significance::Loud => "loud",
        Significance::Critical => "critical",
    }
}

fn category_label(category: crate::stream::source_category::SourceCategory) -> &'static str {
    use crate::stream::source_category::SourceCategory;
    match category {
        SourceCategory::Runtime => "runtime",
        SourceCategory::Worker => "worker",
        SourceCategory::Deploy => "deploy",
        SourceCategory::Extension => "extension",
        SourceCategory::Run => "run",
        SourceCategory::Host => "host",
        SourceCategory::Storage => "storage",
        SourceCategory::Model => "model",
        SourceCategory::Backend => "backend",
        SourceCategory::Other => "other",
    }
}
