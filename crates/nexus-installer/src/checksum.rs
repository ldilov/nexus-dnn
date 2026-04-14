use std::path::Path;

use sha2::{Digest, Sha256};
use tokio::io::AsyncReadExt;

use crate::error::InstallerError;

const BUF_SIZE: usize = 8192;

pub async fn sha256_file(path: &Path) -> Result<String, InstallerError> {
    let mut file = tokio::fs::File::open(path).await?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; BUF_SIZE];

    loop {
        let n = file.read(&mut buf).await?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
    }

    Ok(format!("{:x}", hasher.finalize()))
}

pub async fn verify_checksum(
    path: &Path,
    expected: &str,
) -> Result<(), InstallerError> {
    let actual = sha256_file(path).await?;
    if actual != expected {
        return Err(InstallerError::ChecksumMismatch {
            expected: expected.to_owned(),
            actual,
        });
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;

    #[tokio::test]
    async fn sha256_file_produces_correct_hash() {
        let mut tmp = NamedTempFile::new().unwrap();
        tmp.write_all(b"hello world").unwrap();
        tmp.flush().unwrap();

        let hash = sha256_file(tmp.path()).await.unwrap();
        let expected =
            "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
        assert_eq!(hash, expected);
    }

    #[tokio::test]
    async fn sha256_file_empty_file() {
        let tmp = NamedTempFile::new().unwrap();
        let hash = sha256_file(tmp.path()).await.unwrap();
        let expected =
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
        assert_eq!(hash, expected);
    }

    #[tokio::test]
    async fn verify_checksum_succeeds_on_match() {
        let mut tmp = NamedTempFile::new().unwrap();
        tmp.write_all(b"test data").unwrap();
        tmp.flush().unwrap();

        let hash = sha256_file(tmp.path()).await.unwrap();
        let result = verify_checksum(tmp.path(), &hash).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn verify_checksum_fails_on_mismatch() {
        let mut tmp = NamedTempFile::new().unwrap();
        tmp.write_all(b"test data").unwrap();
        tmp.flush().unwrap();

        let result = verify_checksum(tmp.path(), "bad_checksum").await;
        assert!(result.is_err());

        let err = result.unwrap_err();
        let msg = err.to_string();
        assert!(msg.contains("checksum mismatch"));
        assert!(msg.contains("bad_checksum"));
    }

    #[tokio::test]
    async fn sha256_file_returns_error_for_missing_file() {
        let result = sha256_file(Path::new("/nonexistent/path")).await;
        assert!(result.is_err());
    }
}
