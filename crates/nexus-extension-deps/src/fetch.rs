//! `fetch_artifact` primitive — streaming HTTP download with on-the-fly sha256, atomic
//! placement, archive extraction, and HTTP Range resume.
//!
//! See `specs/035-extension-dependency-installer/research.md` § D-10 for retry-resume
//! semantics. The sidecar `<target>.partial.meta` records `bytes_consumed` for the
//! running sha256 stream and a `mismatch` flag set after a sha256 verification failure.

use std::path::{Path, PathBuf};
use std::sync::Arc;

use futures_util::StreamExt;
use sha2::{Digest, Sha256};
use tokio::fs;
use tokio::io::{AsyncReadExt, AsyncSeekExt, AsyncWriteExt};
use tokio_util::sync::CancellationToken;
use tracing::{debug, warn};

use crate::error::DepError;
use crate::types::{ArchiveFormat, ProgressEvent, ProgressSink, StepProgress};

/// Function-object alias for the host-shared download primitive. Constructed once at
/// host startup and shared via [`crate::context::StepContext::fetch_artifact`].
pub type FetchArtifact = dyn Fn(FetchRequest) -> futures_util::future::BoxFuture<'static, Result<PathBuf, DepError>>
    + Send
    + Sync;

/// One download request — caller fills url/sha256/target_dir; optional progress sink
/// and archive format. Cancellation is plumbed via the caller's [`StepContext`].
#[derive(Clone)]
pub struct FetchRequest {
    pub url: String,
    pub sha256: String,
    pub size: Option<u64>,
    pub target_dir: PathBuf,
    pub archive: ArchiveFormat,
    pub progress: Option<Arc<dyn ProgressSink>>,
    pub progress_step_id: Option<String>,
    pub progress_phase: String,
    pub cancellation: Option<CancellationToken>,
    pub progress_run_id: Option<uuid::Uuid>,
    pub progress_extension_id: Option<String>,
}

impl FetchRequest {
    pub fn new(
        url: impl Into<String>,
        sha256: impl Into<String>,
        target_dir: impl Into<PathBuf>,
    ) -> Self {
        Self {
            url: url.into(),
            sha256: sha256.into(),
            size: None,
            target_dir: target_dir.into(),
            archive: ArchiveFormat::None,
            progress: None,
            progress_step_id: None,
            progress_phase: "download".to_owned(),
            cancellation: None,
            progress_run_id: None,
            progress_extension_id: None,
        }
    }
}

/// Sidecar marker stored next to a `.partial` to record sha256 stream state and
/// previous mismatch. Tiny on disk (~16 bytes once serialised). Atomically removed
/// together with `.partial` on success.
#[derive(Debug, Clone, Default, serde::Serialize, serde::Deserialize)]
struct PartialMeta {
    bytes_consumed: u64,
    sha256_mismatch_at: Option<u64>,
}

/// Default implementation of [`FetchArtifact`]. Owns no state — pass into an
/// `Arc::new(move |req| Box::pin(fetch_artifact(req)))` closure.
pub async fn fetch_artifact(req: FetchRequest) -> Result<PathBuf, DepError> {
    let FetchRequest {
        url,
        sha256: expected_sha256,
        size: declared_size,
        target_dir,
        archive,
        progress,
        progress_step_id,
        progress_phase,
        cancellation,
        progress_run_id,
        progress_extension_id,
    } = req;

    fs::create_dir_all(&target_dir).await?;
    let partial_path = target_dir.join(".download.partial");
    let meta_path = target_dir.join(".download.partial.meta");

    let mut meta = read_meta(&meta_path).await.unwrap_or_default();

    // Per research D-10: a previous sha256 mismatch invalidates the partial bytes.
    if meta.sha256_mismatch_at.is_some() {
        debug!(
            "previous sha256 mismatch recorded — discarding {:?}",
            partial_path
        );
        let _ = fs::remove_file(&partial_path).await;
        let _ = fs::remove_file(&meta_path).await;
        meta = PartialMeta::default();
    }

    let resume_offset = match fs::metadata(&partial_path).await {
        Ok(m) if m.is_file() && meta.bytes_consumed == m.len() => m.len(),
        Ok(_) => {
            // Either not a file or the meta and partial disagree. Restart cleanly.
            let _ = fs::remove_file(&partial_path).await;
            let _ = fs::remove_file(&meta_path).await;
            meta = PartialMeta::default();
            0
        }
        Err(_) => 0,
    };

    let client = reqwest::Client::builder().build().map_err(DepError::Http)?;

    let mut request = client.get(&url);
    if resume_offset > 0 {
        request = request.header(reqwest::header::RANGE, format!("bytes={resume_offset}-"));
    }

    let response = request.send().await.map_err(DepError::Http)?;

    let status = response.status();
    if !(status.is_success() || status == reqwest::StatusCode::PARTIAL_CONTENT) {
        return Err(DepError::Backend(format!(
            "HTTP {} fetching {url}",
            status.as_u16()
        )));
    }

    let server_supports_range = status == reqwest::StatusCode::PARTIAL_CONTENT && resume_offset > 0;
    if resume_offset > 0 && !server_supports_range {
        // Server ignored our Range header. Discard the partial and start over.
        warn!("server ignored Range request — restarting download from byte 0");
        let _ = fs::remove_file(&partial_path).await;
        let _ = fs::remove_file(&meta_path).await;
        return Box::pin(fetch_artifact(FetchRequest {
            url,
            sha256: expected_sha256,
            size: declared_size,
            target_dir,
            archive,
            progress,
            progress_step_id,
            progress_phase,
            cancellation,
            progress_run_id,
            progress_extension_id,
        }))
        .await;
    }

    let total_bytes = declared_size
        .or_else(|| response.content_length().map(|c| c + resume_offset))
        .unwrap_or(0);

    let mut hasher = Sha256::new();
    if resume_offset > 0 {
        // Re-hash whatever is already on disk so the running hash is correct on resume.
        let mut existing = fs::File::open(&partial_path).await?;
        let mut buf = vec![0u8; 64 * 1024];
        loop {
            let n = existing.read(&mut buf).await?;
            if n == 0 {
                break;
            }
            hasher.update(&buf[..n]);
        }
    }

    let mut out = fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(&partial_path)
        .await?;

    if resume_offset == 0 {
        out.seek(std::io::SeekFrom::Start(0)).await?;
    }

    let mut stream = response.bytes_stream();
    let mut current_bytes = resume_offset;
    let mut last_progress_emit = current_bytes;

    // First-progress promptly: emit one event before the byte loop so the row
    // never sits blank between `running` and the first 256 KB chunk (AC-2.6).
    emit_progress(
        progress.as_ref(),
        progress_extension_id.as_deref(),
        progress_run_id,
        progress_step_id.as_deref(),
        &progress_phase,
        current_bytes,
        total_bytes,
    );

    while let Some(chunk_res) = stream.next().await {
        if let Some(token) = cancellation.as_ref()
            && token.is_cancelled()
        {
            return Err(DepError::Cancelled);
        }
        let chunk = chunk_res.map_err(DepError::Http)?;
        out.write_all(&chunk).await?;
        hasher.update(&chunk);
        current_bytes += chunk.len() as u64;
        meta.bytes_consumed = current_bytes;

        // Throttle progress emits to ~10 Hz worth of bytes (every 256 KB).
        if current_bytes - last_progress_emit >= 256 * 1024 {
            emit_progress(
                progress.as_ref(),
                progress_extension_id.as_deref(),
                progress_run_id,
                progress_step_id.as_deref(),
                &progress_phase,
                current_bytes,
                total_bytes,
            );
            last_progress_emit = current_bytes;
        }
    }

    out.flush().await?;
    drop(out);
    write_meta(&meta_path, &meta).await?;

    let computed = hasher.finalize();
    let computed_hex = hex_lower(&computed);
    if !expected_sha256.eq_ignore_ascii_case(&computed_hex) {
        meta.sha256_mismatch_at = Some(current_bytes);
        write_meta(&meta_path, &meta).await?;
        return Err(DepError::Sha256Mismatch);
    }

    // Atomically move .partial → final placement.
    let final_target = match archive {
        ArchiveFormat::None => target_dir.join("artifact"),
        _ => partial_path.clone(),
    };

    if matches!(archive, ArchiveFormat::None) {
        fs::rename(&partial_path, &final_target).await?;
    }

    if !matches!(archive, ArchiveFormat::None) {
        extract_archive(&partial_path, &target_dir, archive)?;
        // Archive extracted; drop the .partial.
        let _ = fs::remove_file(&partial_path).await;
    }

    let _ = fs::remove_file(&meta_path).await;

    emit_progress(
        progress.as_ref(),
        progress_extension_id.as_deref(),
        progress_run_id,
        progress_step_id.as_deref(),
        &progress_phase,
        current_bytes,
        total_bytes.max(current_bytes),
    );

    Ok(if matches!(archive, ArchiveFormat::None) {
        final_target
    } else {
        target_dir
    })
}

fn extract_archive(src: &Path, target_dir: &Path, format: ArchiveFormat) -> Result<(), DepError> {
    use std::fs::File;

    match format {
        ArchiveFormat::Zip => {
            let file = File::open(src)?;
            let mut zip = zip::ZipArchive::new(file)
                .map_err(|e| DepError::Backend(format!("zip open: {e}")))?;
            zip.extract(target_dir)
                .map_err(|e| DepError::Backend(format!("zip extract: {e}")))?;
        }
        ArchiveFormat::TarGz => {
            let file = File::open(src)?;
            let dec = flate2::read::GzDecoder::new(file);
            tar::Archive::new(dec).unpack(target_dir)?;
        }
        ArchiveFormat::TarXz => {
            let file = File::open(src)?;
            let dec = xz2::read::XzDecoder::new(file);
            tar::Archive::new(dec).unpack(target_dir)?;
        }
        ArchiveFormat::TarBz2 => {
            let file = File::open(src)?;
            let dec = bzip2::read::BzDecoder::new(file);
            tar::Archive::new(dec).unpack(target_dir)?;
        }
        ArchiveFormat::None => {}
    }
    Ok(())
}

async fn read_meta(path: &Path) -> Option<PartialMeta> {
    let bytes = fs::read(path).await.ok()?;
    serde_json::from_slice(&bytes).ok()
}

async fn write_meta(path: &Path, meta: &PartialMeta) -> Result<(), DepError> {
    let bytes = serde_json::to_vec(meta)?;
    fs::write(path, bytes).await?;
    Ok(())
}

fn emit_progress(
    sink: Option<&Arc<dyn ProgressSink>>,
    extension_id: Option<&str>,
    install_run_id: Option<uuid::Uuid>,
    step_id: Option<&str>,
    phase: &str,
    current_bytes: u64,
    total_bytes: u64,
) {
    let (Some(sink), Some(extension_id), Some(install_run_id), Some(step_id)) =
        (sink, extension_id, install_run_id, step_id)
    else {
        return;
    };
    let progress = StepProgress::bytes(phase, current_bytes, total_bytes)
        .with_message(format!("{current_bytes}/{total_bytes} bytes"));
    sink.emit(ProgressEvent::step_progress(
        extension_id,
        install_run_id,
        step_id,
        progress,
    ));
}

fn hex_lower(bytes: &[u8]) -> String {
    let mut out = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        out.push_str(&format!("{b:02x}"));
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::Mutex;

    #[test]
    fn hex_lower_encodes_correctly() {
        assert_eq!(hex_lower(&[0xab, 0xcd, 0x01]), "abcd01");
        assert_eq!(hex_lower(&[]), "");
    }

    #[derive(Default)]
    struct CapturingSink {
        events: Mutex<Vec<ProgressEvent>>,
    }
    impl ProgressSink for CapturingSink {
        fn emit(&self, e: ProgressEvent) {
            self.events.lock().expect("lock").push(e);
        }
    }

    /// AC-2.2: the byte-download path (used by `system_binary`) emits normalized
    /// progress with `bytes_done`/`bytes_total` and a derived `pct`.
    #[test]
    fn emit_progress_produces_normalized_byte_event_with_derived_pct() {
        let typed = Arc::new(CapturingSink::default());
        let sink: Arc<dyn ProgressSink> = typed.clone();
        emit_progress(
            Some(&sink),
            Some("ext"),
            Some(uuid::Uuid::nil()),
            Some("ffmpeg"),
            "downloading",
            250,
            1000,
        );
        let events = typed.events.lock().expect("lock");
        let event = events.first().expect("one event");
        match event {
            ProgressEvent::StepProgress {
                step_id,
                phase,
                current_bytes,
                total_bytes,
                pct,
                ..
            } => {
                assert_eq!(step_id, "ffmpeg");
                assert_eq!(phase, "downloading");
                assert_eq!(*current_bytes, 250);
                assert_eq!(*total_bytes, 1000);
                assert_eq!(*pct, Some(25.0));
            }
            other => panic!("expected StepProgress, got {other:?}"),
        }
    }

    /// PATH-found / no-sink case must not panic and must emit nothing.
    #[test]
    fn emit_progress_noops_without_sink_or_ids() {
        emit_progress(None, Some("ext"), None, Some("id"), "downloading", 1, 2);
    }
}
