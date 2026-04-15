use std::sync::Arc;

use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelStoreCtx, ModelStoreError, PlannedFile, install_model, verify_install,
};
use sha2::{Digest, Sha256};
use sqlx::Row;
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

async fn build_ctx(
    tmp: &tempfile::TempDir,
    files: Vec<(String, Vec<u8>)>,
) -> (ModelStoreCtx, sqlx::SqlitePool) {
    let fetcher: Arc<dyn nexus_backend_runtimes::models_store::ModelFetcher> =
        FakeFetcher::new(files);
    let pool = SqlitePoolOptions::new()
        .max_connections(4)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    for stmt in include_str!("../../../migrations/010_host_model_store_provenance.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    (
        ModelStoreCtx::new(
            pool.clone(),
            tmp.path().join("installs"),
            tmp.path().join("blobs"),
            2,
            fetcher,
        ),
        pool,
    )
}

#[tokio::test]
async fn multi_file_repo_installs_all_files_and_verifies() {
    let tmp = tempfile::TempDir::new().unwrap();
    let shards: Vec<(String, Vec<u8>)> = (0..5)
        .map(|i| {
            (
                format!("http://x/shard{i}"),
                format!("shard-bytes-{i}").into_bytes(),
            )
        })
        .chain(std::iter::once((
            "http://x/config".into(),
            b"{\"arch\":\"llama\"}".to_vec(),
        )))
        .chain(std::iter::once((
            "http://x/tokenizer".into(),
            b"{\"vocab\":{}}".to_vec(),
        )))
        .collect();
    let (ctx, pool) = build_ctx(&tmp, shards.clone()).await;

    let files: Vec<PlannedFile> = shards
        .iter()
        .enumerate()
        .map(|(i, (url, bytes))| PlannedFile {
            path: if url.ends_with("config") {
                "config.json".into()
            } else if url.ends_with("tokenizer") {
                "tokenizer.json".into()
            } else {
                format!("model-{i}.safetensors")
            },
            sha256: sha(bytes),
            size_bytes: bytes.len() as u64,
            source_url: url.clone(),
        })
        .collect();

    let sha_root = sha(b"root-marker");
    let dto = install_model(
        &ctx,
        InstallModelRequest {
            family: "llama".into(),
            version: "3-8b".into(),
            quantization: None,
            variant: "default".into(),
            sha256_root: sha_root.clone(),
            source_revision: sha_root,
            source_kind: "huggingface".into(),
            source_url: Some("hf://meta-llama/llama-3-8b".into()),
            private: false,
            owner_extension_id: None,
            license_spdx: Some("apache-2.0".into()),
            license_url: None,
            provenance_note: None,
            param_count: None,
            files,
        },
    )
    .await
    .unwrap();
    assert_eq!(dto.state, "ready");

    verify_install(&pool, &dto.install_id).await.unwrap();
}

#[tokio::test]
async fn corrupt_file_post_install_flips_state_to_corrupt() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"intact" as &[u8];
    let (ctx, pool) = build_ctx(&tmp, vec![("http://x/f".into(), bytes.to_vec())]).await;

    let dto = install_model(
        &ctx,
        InstallModelRequest {
            family: "f".into(),
            version: "v".into(),
            quantization: None,
            variant: "default".into(),
            sha256_root: sha(bytes),
            source_revision: sha(bytes),
            source_kind: "direct_url".into(),
            source_url: Some("http://x/f".into()),
            private: false,
            owner_extension_id: None,
            license_spdx: Some("apache-2.0".into()),
            license_url: None,
            provenance_note: None,
            param_count: None,
            files: vec![PlannedFile {
                path: "m.bin".into(),
                sha256: sha(bytes),
                size_bytes: bytes.len() as u64,
                source_url: "http://x/f".into(),
            }],
        },
    )
    .await
    .unwrap();

    // Corrupt by replacing the target path with different content.
    let target = tmp
        .path()
        .join("installs")
        .join(&dto.install_id)
        .join("m.bin");
    tokio::fs::remove_file(&target).await.unwrap();
    tokio::fs::write(&target, b"corrupted-contents")
        .await
        .unwrap();

    let err = verify_install(&pool, &dto.install_id).await.unwrap_err();
    assert!(matches!(err, ModelStoreError::ChecksumMismatch { .. }));

    let state: String = sqlx::query("SELECT state FROM host_model_installs WHERE install_id = $1")
        .bind(&dto.install_id)
        .fetch_one(&pool)
        .await
        .unwrap()
        .try_get("state")
        .unwrap();
    assert_eq!(state, "corrupt");
}
