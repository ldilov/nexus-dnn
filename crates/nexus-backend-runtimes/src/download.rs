use futures_util::StreamExt;
use std::path::Path;
use std::time::{Duration, Instant};
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use tokio_util::sync::CancellationToken;

use crate::checksum::{ChecksumVerification, Hasher};
use crate::error::InstallError;

pub struct DownloadOutcome {
    pub bytes_total: Option<u64>,
    pub bytes_downloaded: u64,
    pub verification: ChecksumVerification,
}

pub async fn download<F>(
    url: &str,
    expected_sha256: Option<&str>,
    destination: &Path,
    cancel: &CancellationToken,
    mut on_progress: F,
) -> Result<DownloadOutcome, InstallError>
where
    F: FnMut(u64, Option<u64>, u64),
{
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(300))
        .build()
        .map_err(|e| InstallError::Download(e.to_string()))?;

    let response = client
        .get(url)
        .send()
        .await
        .map_err(|e| InstallError::Download(e.to_string()))?
        .error_for_status()
        .map_err(|e| InstallError::Download(e.to_string()))?;

    let bytes_total = response.content_length();
    let mut file = File::create(destination).await?;
    let mut hasher = Hasher::default();
    let mut bytes_downloaded: u64 = 0;
    let started = Instant::now();
    let mut last_emit = Instant::now()
        .checked_sub(Duration::from_millis(1_000))
        .unwrap_or_else(Instant::now);

    let mut stream = response.bytes_stream();
    while let Some(chunk) = stream.next().await {
        if cancel.is_cancelled() {
            drop(file);
            let _ = tokio::fs::remove_file(destination).await;
            return Err(InstallError::Cancelled);
        }
        let bytes = chunk.map_err(|e| InstallError::Download(e.to_string()))?;
        hasher.update(&bytes);
        file.write_all(&bytes).await?;
        bytes_downloaded += bytes.len() as u64;
        if last_emit.elapsed() >= Duration::from_millis(250) {
            on_progress(
                bytes_downloaded,
                bytes_total,
                started.elapsed().as_millis() as u64,
            );
            last_emit = Instant::now();
        }
    }
    file.flush().await?;
    on_progress(
        bytes_downloaded,
        bytes_total,
        started.elapsed().as_millis() as u64,
    );

    let actual = hasher.finalize_hex();
    Ok(DownloadOutcome {
        bytes_total,
        bytes_downloaded,
        verification: ChecksumVerification {
            expected: expected_sha256.map(|s| s.to_string()),
            actual,
        },
    })
}
