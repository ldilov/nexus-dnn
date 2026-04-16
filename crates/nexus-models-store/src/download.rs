use std::path::{Path, PathBuf};
use std::sync::Arc;

use futures_util::StreamExt;
use sha2::{Digest, Sha256};
use tokio::fs::{File, OpenOptions};
use tokio::io::{AsyncSeekExt, AsyncWriteExt, SeekFrom};
use tokio::sync::Semaphore;

use super::errors::{ModelStoreError, ModelStoreResult};

#[derive(Debug, Clone)]
pub struct DownloadSpec {
    pub source_url: String,
    pub expected_sha256: String,
    pub destination: PathBuf,
    pub expected_size: Option<u64>,
}

#[derive(Debug, Clone)]
pub struct DownloadOutcome {
    pub bytes_written: u64,
    pub resumed: bool,
}

/// Global download limiter. Construct once per `models_store` and clone the
/// `Arc` into every caller.
pub fn make_limiter(concurrency: usize) -> Arc<Semaphore> {
    Arc::new(Semaphore::new(concurrency.max(1)))
}

/// Download `spec.source_url` to `spec.destination`, streaming SHA-256
/// verification. Resumes from partial prefix when the server supports ranges.
/// Returns `ModelStoreError::ChecksumMismatch` on verify failure; the partial
/// file is left on disk so the caller can surface the concrete state.
pub async fn download_and_verify(
    spec: &DownloadSpec,
    limiter: &Semaphore,
) -> ModelStoreResult<DownloadOutcome> {
    let _permit = limiter
        .acquire()
        .await
        .map_err(|e| ModelStoreError::Storage(format!("semaphore closed: {e}")))?;

    if let Some(parent) = spec.destination.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }

    let client = reqwest::Client::builder()
        .build()
        .map_err(|e| unreachable(&spec.source_url, e))?;

    let existing_len = match tokio::fs::metadata(&spec.destination).await {
        Ok(m) => m.len(),
        Err(_) => 0,
    };

    let mut request = client.get(&spec.source_url);
    if existing_len > 0 {
        request = request.header(reqwest::header::RANGE, format!("bytes={existing_len}-"));
    }

    let response = request
        .send()
        .await
        .map_err(|e| unreachable(&spec.source_url, e))?;
    let status = response.status();
    if !(status.is_success() || status == reqwest::StatusCode::PARTIAL_CONTENT) {
        return Err(unreachable(&spec.source_url, status));
    }

    let resumed = status == reqwest::StatusCode::PARTIAL_CONTENT && existing_len > 0;

    let mut file = if resumed {
        let mut f = OpenOptions::new()
            .write(true)
            .open(&spec.destination)
            .await?;
        f.seek(SeekFrom::Start(existing_len)).await?;
        f
    } else {
        File::create(&spec.destination).await?
    };

    let mut hasher = Sha256::new();
    if resumed {
        hash_existing_prefix(&mut hasher, &spec.destination, existing_len).await?;
    }

    let mut bytes_written = if resumed { existing_len } else { 0 };
    let mut stream = response.bytes_stream();
    while let Some(chunk) = stream.next().await {
        let bytes = chunk.map_err(|e| unreachable(&spec.source_url, e))?;
        hasher.update(&bytes);
        file.write_all(&bytes).await?;
        bytes_written += bytes.len() as u64;
    }
    file.flush().await?;

    let actual: String = hasher
        .finalize()
        .iter()
        .map(|b| format!("{b:02x}"))
        .collect();
    if !actual.eq_ignore_ascii_case(&spec.expected_sha256) {
        return Err(ModelStoreError::ChecksumMismatch {
            file: spec.destination.clone(),
            expected: spec.expected_sha256.clone(),
            actual,
        });
    }

    Ok(DownloadOutcome {
        bytes_written,
        resumed,
    })
}

async fn hash_existing_prefix(hasher: &mut Sha256, path: &Path, len: u64) -> ModelStoreResult<()> {
    use tokio::io::AsyncReadExt;
    let mut f = File::open(path).await?;
    let mut remaining = len;
    let mut buf = vec![0u8; 64 * 1024];
    while remaining > 0 {
        let to_read = remaining.min(buf.len() as u64) as usize;
        let n = f.read(&mut buf[..to_read]).await?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
        remaining -= n as u64;
    }
    Ok(())
}

fn unreachable(url: &str, e: impl std::fmt::Display) -> ModelStoreError {
    ModelStoreError::SourceUnreachable {
        source_url: url.to_string(),
        detail: e.to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sha2::{Digest, Sha256};
    use tempfile::TempDir;
    use wiremock::matchers::{header, method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    fn sha(bytes: &[u8]) -> String {
        let mut h = Sha256::new();
        h.update(bytes);
        h.finalize().iter().map(|b| format!("{b:02x}")).collect()
    }

    #[tokio::test]
    async fn corrupt_download_returns_checksum_mismatch() {
        let server = MockServer::start().await;
        Mock::given(method("GET"))
            .and(path("/m.bin"))
            .respond_with(ResponseTemplate::new(200).set_body_bytes(b"corrupted bytes".to_vec()))
            .mount(&server)
            .await;

        let tmp = TempDir::new().unwrap();
        let dest = tmp.path().join("m.bin");
        let spec = DownloadSpec {
            source_url: format!("{}/m.bin", server.uri()),
            expected_sha256: sha(b"real bytes"),
            destination: dest.clone(),
            expected_size: None,
        };
        let limiter = make_limiter(1);
        let err = download_and_verify(&spec, &limiter).await.unwrap_err();
        assert!(matches!(err, ModelStoreError::ChecksumMismatch { .. }));
    }

    #[tokio::test]
    async fn range_resume_completes_to_full_hash() {
        let full = b"abcdefghij".to_vec();
        let server = MockServer::start().await;
        Mock::given(method("GET"))
            .and(path("/m.bin"))
            .and(header("range", "bytes=4-"))
            .respond_with(
                ResponseTemplate::new(206)
                    .insert_header("content-range", "bytes 4-9/10")
                    .insert_header("accept-ranges", "bytes")
                    .set_body_bytes(full[4..].to_vec()),
            )
            .mount(&server)
            .await;

        let tmp = TempDir::new().unwrap();
        let dest = tmp.path().join("m.bin");
        tokio::fs::write(&dest, &full[..4]).await.unwrap();

        let spec = DownloadSpec {
            source_url: format!("{}/m.bin", server.uri()),
            expected_sha256: sha(&full),
            destination: dest.clone(),
            expected_size: Some(full.len() as u64),
        };
        let limiter = make_limiter(1);
        let out = download_and_verify(&spec, &limiter).await.unwrap();
        assert!(out.resumed);
        assert_eq!(out.bytes_written, full.len() as u64);
        assert_eq!(tokio::fs::read(&dest).await.unwrap(), full);
    }
}
