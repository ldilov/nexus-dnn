//! Integration tests for `fetch_artifact` (T021).
//!
//! Covers: streaming download with sha256 verification, sha256 mismatch rejection,
//! atomic placement, all four supported archive formats, range resume after a
//! transient mid-stream failure, and full-restart semantics after a previous sha256
//! mismatch (per research D-10).

use std::io::Write;
use std::path::Path;

use sha2::{Digest, Sha256};
use tempfile::TempDir;
use wiremock::matchers::{header, method, path};
use wiremock::{Mock, MockServer, ResponseTemplate};

use nexus_extension_deps::DepError;
use nexus_extension_deps::fetch::{FetchRequest, fetch_artifact};
use nexus_extension_deps::types::ArchiveFormat;

fn sha256_hex(bytes: &[u8]) -> String {
    let digest = Sha256::digest(bytes);
    let mut s = String::with_capacity(digest.len() * 2);
    for b in digest {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

#[tokio::test]
async fn downloads_and_verifies_sha256() {
    let server = MockServer::start().await;
    let payload = b"hello, world\n".to_vec();
    let expected = sha256_hex(&payload);

    Mock::given(method("GET"))
        .and(path("/blob.bin"))
        .respond_with(
            ResponseTemplate::new(200)
                .set_body_bytes(payload.clone())
                .insert_header("content-length", payload.len().to_string()),
        )
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let req = FetchRequest::new(
        format!("{}/blob.bin", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    let placed = fetch_artifact(req).await.unwrap();
    let bytes = std::fs::read(&placed).unwrap();
    assert_eq!(bytes, payload);
    // .partial and .meta should be cleaned up on success.
    assert!(!target.path().join(".download.partial").exists());
    assert!(!target.path().join(".download.partial.meta").exists());
}

#[tokio::test]
async fn rejects_sha256_mismatch_and_records_meta() {
    let server = MockServer::start().await;
    let payload = b"actual bytes".to_vec();
    let wrong_sha256 = "0".repeat(64);

    Mock::given(method("GET"))
        .and(path("/bad.bin"))
        .respond_with(
            ResponseTemplate::new(200)
                .set_body_bytes(payload.clone())
                .insert_header("content-length", payload.len().to_string()),
        )
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let req = FetchRequest::new(
        format!("{}/bad.bin", server.uri()),
        wrong_sha256,
        target.path().to_path_buf(),
    );
    let err = fetch_artifact(req).await.unwrap_err();
    assert!(matches!(err, DepError::Sha256Mismatch));
    // Meta file MUST exist with the mismatch flag set so the next attempt restarts
    // from byte 0 (research D-10).
    let meta_bytes =
        std::fs::read(target.path().join(".download.partial.meta")).expect("meta file");
    let meta_json: serde_json::Value = serde_json::from_slice(&meta_bytes).unwrap();
    assert!(
        meta_json
            .get("sha256_mismatch_at")
            .is_some_and(|v| !v.is_null())
    );
}

#[tokio::test]
async fn restarts_from_byte_zero_after_previous_mismatch() {
    let server = MockServer::start().await;
    let payload = b"second-attempt-payload".to_vec();
    let expected = sha256_hex(&payload);

    let mismatch_template = ResponseTemplate::new(200).set_body_bytes(payload.clone());
    Mock::given(method("GET"))
        .and(path("/blob.bin"))
        .respond_with(mismatch_template)
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();

    // Pre-seed a known-bad partial + meta-with-mismatch-flag (simulating a prior
    // failed attempt with different bytes).
    let partial = target.path().join(".download.partial");
    let meta = target.path().join(".download.partial.meta");
    std::fs::write(&partial, b"corrupted-prefix").unwrap();
    std::fs::write(
        &meta,
        serde_json::to_vec(&serde_json::json!({
            "bytes_consumed": "corrupted-prefix".len(),
            "sha256_mismatch_at": "corrupted-prefix".len()
        }))
        .unwrap(),
    )
    .unwrap();

    // Mark wiremock to NOT honour Range — server returns 200 always — and we should
    // still complete because the implementation discards the partial when meta has a
    // mismatch flag.
    let req = FetchRequest::new(
        format!("{}/blob.bin", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    let placed = fetch_artifact(req).await.unwrap();
    let bytes = std::fs::read(&placed).unwrap();
    assert_eq!(bytes, payload);
}

#[tokio::test]
async fn extracts_zip_archive() {
    let server = MockServer::start().await;
    let archive = build_zip(&[("hello.txt", b"hi from zip\n")]);
    let expected = sha256_hex(&archive);
    Mock::given(method("GET"))
        .and(path("/a.zip"))
        .respond_with(ResponseTemplate::new(200).set_body_bytes(archive.clone()))
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let mut req = FetchRequest::new(
        format!("{}/a.zip", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    req.archive = ArchiveFormat::Zip;
    fetch_artifact(req).await.unwrap();

    let extracted = std::fs::read(target.path().join("hello.txt")).unwrap();
    assert_eq!(extracted, b"hi from zip\n");
}

#[tokio::test]
async fn extracts_tar_gz_archive() {
    let server = MockServer::start().await;
    let archive = build_tar_gz(&[("hello.txt", b"hi from tar.gz\n")]);
    let expected = sha256_hex(&archive);
    Mock::given(method("GET"))
        .and(path("/a.tar.gz"))
        .respond_with(ResponseTemplate::new(200).set_body_bytes(archive.clone()))
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let mut req = FetchRequest::new(
        format!("{}/a.tar.gz", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    req.archive = ArchiveFormat::TarGz;
    fetch_artifact(req).await.unwrap();

    let extracted = std::fs::read(target.path().join("hello.txt")).unwrap();
    assert_eq!(extracted, b"hi from tar.gz\n");
}

#[tokio::test]
async fn extracts_tar_xz_archive() {
    let server = MockServer::start().await;
    let archive = build_tar_xz(&[("hello.txt", b"hi from tar.xz\n")]);
    let expected = sha256_hex(&archive);
    Mock::given(method("GET"))
        .and(path("/a.tar.xz"))
        .respond_with(ResponseTemplate::new(200).set_body_bytes(archive.clone()))
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let mut req = FetchRequest::new(
        format!("{}/a.tar.xz", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    req.archive = ArchiveFormat::TarXz;
    fetch_artifact(req).await.unwrap();

    let extracted = std::fs::read(target.path().join("hello.txt")).unwrap();
    assert_eq!(extracted, b"hi from tar.xz\n");
}

#[tokio::test]
async fn extracts_tar_bz2_archive() {
    let server = MockServer::start().await;
    let archive = build_tar_bz2(&[("hello.txt", b"hi from tar.bz2\n")]);
    let expected = sha256_hex(&archive);
    Mock::given(method("GET"))
        .and(path("/a.tar.bz2"))
        .respond_with(ResponseTemplate::new(200).set_body_bytes(archive.clone()))
        .mount(&server)
        .await;

    let target = TempDir::new().unwrap();
    let mut req = FetchRequest::new(
        format!("{}/a.tar.bz2", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    req.archive = ArchiveFormat::TarBz2;
    fetch_artifact(req).await.unwrap();

    let extracted = std::fs::read(target.path().join("hello.txt")).unwrap();
    assert_eq!(extracted, b"hi from tar.bz2\n");
}

#[tokio::test]
async fn resumes_via_range_header_when_partial_exists() {
    let server = MockServer::start().await;
    let payload = b"the quick brown fox jumps over the lazy dog".to_vec();
    let expected = sha256_hex(&payload);

    // First mock: range request returns the tail (206)
    let prefix_len = 20usize;
    let tail = payload[prefix_len..].to_vec();
    Mock::given(method("GET"))
        .and(path("/big.bin"))
        .and(header("range", format!("bytes={prefix_len}-")))
        .respond_with(
            ResponseTemplate::new(206)
                .set_body_bytes(tail.clone())
                .insert_header("content-length", tail.len().to_string())
                .insert_header(
                    "content-range",
                    format!(
                        "bytes {}-{}/{}",
                        prefix_len,
                        payload.len() - 1,
                        payload.len()
                    ),
                ),
        )
        .mount(&server)
        .await;

    // Pre-seed a valid prefix in `.partial` + meta.
    let target = TempDir::new().unwrap();
    let partial = target.path().join(".download.partial");
    let meta = target.path().join(".download.partial.meta");
    std::fs::write(&partial, &payload[..prefix_len]).unwrap();
    std::fs::write(
        &meta,
        serde_json::to_vec(&serde_json::json!({
            "bytes_consumed": prefix_len,
            "sha256_mismatch_at": null
        }))
        .unwrap(),
    )
    .unwrap();

    let req = FetchRequest::new(
        format!("{}/big.bin", server.uri()),
        expected,
        target.path().to_path_buf(),
    );
    let placed = fetch_artifact(req).await.unwrap();
    let bytes = std::fs::read(&placed).unwrap();
    assert_eq!(bytes, payload);
}

// ─────── archive helpers ───────

fn build_zip(entries: &[(&str, &[u8])]) -> Vec<u8> {
    let mut buf = std::io::Cursor::new(Vec::new());
    {
        let mut zw = zip::ZipWriter::new(&mut buf);
        let opts: zip::write::SimpleFileOptions = zip::write::SimpleFileOptions::default()
            .compression_method(zip::CompressionMethod::Stored);
        for (name, content) in entries {
            zw.start_file(*name, opts).unwrap();
            zw.write_all(content).unwrap();
        }
        zw.finish().unwrap();
    }
    buf.into_inner()
}

fn build_tar(entries: &[(&str, &[u8])]) -> Vec<u8> {
    let mut tar_buf = Vec::new();
    {
        let mut builder = tar::Builder::new(&mut tar_buf);
        for (name, content) in entries {
            let mut header = tar::Header::new_gnu();
            header.set_path(name).unwrap();
            header.set_size(content.len() as u64);
            header.set_mode(0o644);
            header.set_cksum();
            builder.append(&header, *content).unwrap();
        }
        builder.finish().unwrap();
    }
    tar_buf
}

fn build_tar_gz(entries: &[(&str, &[u8])]) -> Vec<u8> {
    let tar_buf = build_tar(entries);
    let mut gz = flate2::write::GzEncoder::new(Vec::new(), flate2::Compression::default());
    gz.write_all(&tar_buf).unwrap();
    gz.finish().unwrap()
}

fn build_tar_xz(entries: &[(&str, &[u8])]) -> Vec<u8> {
    let tar_buf = build_tar(entries);
    let mut xz = xz2::write::XzEncoder::new(Vec::new(), 6);
    xz.write_all(&tar_buf).unwrap();
    xz.finish().unwrap()
}

fn build_tar_bz2(entries: &[(&str, &[u8])]) -> Vec<u8> {
    let tar_buf = build_tar(entries);
    let mut bz = bzip2::write::BzEncoder::new(Vec::new(), bzip2::Compression::default());
    bz.write_all(&tar_buf).unwrap();
    bz.finish().unwrap()
}

#[allow(dead_code)]
fn _enforce_path_use(_p: &Path) {}
