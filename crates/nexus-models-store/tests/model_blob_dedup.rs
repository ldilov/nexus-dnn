use std::sync::Arc;

use nexus_models_store::install::test_support::FakeFetcher;
use nexus_models_store::{
    InstallModelRequest, ModelStoreCtx, PlannedFile, gc_blobs, install_model,
};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

async fn make_ctx(
    fetcher: Arc<dyn nexus_models_store::ModelFetcher>,
    tmp: &tempfile::TempDir,
) -> ModelStoreCtx {
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
    ModelStoreCtx::new(
        pool,
        tmp.path().join("installs"),
        tmp.path().join("blobs"),
        2,
        fetcher,
    )
}

#[tokio::test]
async fn two_installs_share_tokenizer_blob() {
    let tmp = tempfile::TempDir::new().unwrap();
    let tokenizer_bytes = b"{\"vocab\":{}}" as &[u8];
    let model_a = b"weights-a" as &[u8];
    let model_b = b"weights-b" as &[u8];

    let fetcher = FakeFetcher::new(vec![
        ("http://x/tokenizer".into(), tokenizer_bytes.to_vec()),
        ("http://x/model-a".into(), model_a.to_vec()),
        ("http://x/model-b".into(), model_b.to_vec()),
    ]);
    let ctx = make_ctx(fetcher, &tmp).await;

    let req_a = InstallModelRequest {
        family: "f".into(),
        version: "1".into(),
        quantization: None,
        variant: "a".into(),
        sha256_root: sha(model_a),
        source_revision: sha(model_a),
        source_kind: "direct_url".into(),
        source_url: Some("http://x/model-a".into()),
        private: false,
        owner_extension_id: None,
        license_spdx: Some("apache-2.0".into()),
        license_url: None,
        provenance_note: None,
        param_count: None,
        files: vec![
            PlannedFile {
                path: "tokenizer.json".into(),
                sha256: sha(tokenizer_bytes),
                size_bytes: tokenizer_bytes.len() as u64,
                source_url: "http://x/tokenizer".into(),
            },
            PlannedFile {
                path: "model.bin".into(),
                sha256: sha(model_a),
                size_bytes: model_a.len() as u64,
                source_url: "http://x/model-a".into(),
            },
        ],
    };
    let mut req_b = req_a.clone();
    req_b.variant = "b".into();
    req_b.sha256_root = sha(model_b);
    req_b.source_revision = sha(model_b);
    req_b.source_url = Some("http://x/model-b".into());
    req_b.files[1].sha256 = sha(model_b);
    req_b.files[1].source_url = "http://x/model-b".into();

    install_model(&ctx, req_a).await.unwrap();
    install_model(&ctx, req_b).await.unwrap();

    let tok_sha = sha(tokenizer_bytes);
    let cas = tmp.path().join("blobs").join(&tok_sha[..2]).join(&tok_sha);
    assert!(cas.exists(), "shared tokenizer lives in CAS");

    let mut rd = tokio::fs::read_dir(cas.parent().unwrap()).await.unwrap();
    let mut n = 0;
    while rd.next_entry().await.unwrap().is_some() {
        n += 1;
    }
    assert_eq!(n, 1, "exactly one blob for the shared tokenizer content");
}

#[tokio::test]
async fn gc_blobs_reclaims_unreferenced() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"only-ref" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let ctx = make_ctx(fetcher, &tmp).await;

    let req = InstallModelRequest {
        family: "f".into(),
        version: "1".into(),
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
            path: "only.bin".into(),
            sha256: sha(bytes),
            size_bytes: bytes.len() as u64,
            source_url: "http://x/f".into(),
        }],
    };
    install_model(&ctx, req).await.unwrap();

    let blobs = tmp.path().join("blobs");
    let orphan_sha = sha(b"orphan");
    let orphan_dir = blobs.join(&orphan_sha[..2]);
    tokio::fs::create_dir_all(&orphan_dir).await.unwrap();
    let orphan = orphan_dir.join(&orphan_sha);
    tokio::fs::write(&orphan, b"orphan").await.unwrap();

    let report = gc_blobs(&ctx.pool, &blobs).await.unwrap();
    assert!(!orphan.exists());
    assert!(!report.removed_blobs.is_empty());
}
