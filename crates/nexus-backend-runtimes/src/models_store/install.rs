use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};
use tokio::sync::{Mutex, Semaphore};

use super::blobs::{self, FileManifestEntry};
use super::download::{DownloadSpec, download_and_verify};
use super::errors::{ModelStoreError, ModelStoreResult};

/// Identity tuple uniquely naming a model install (matches the unique index on
/// `host_model_installs`).
#[derive(Debug, Clone, Hash, Eq, PartialEq)]
pub struct IdentityKey {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub sha256_root: String,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
}

#[derive(Debug, Clone)]
pub struct InstallModelRequest {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub private: bool,
    pub owner_extension_id: Option<String>,
    pub files: Vec<PlannedFile>,
}

#[derive(Debug, Clone)]
pub struct PlannedFile {
    /// Path relative to install root.
    pub path: String,
    pub sha256: String,
    pub size_bytes: u64,
    pub source_url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct InstalledModelDto {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub install_root: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub state: String,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
}

/// Per-tuple serialization lock map so concurrent callers for the same
/// identity share one install + one download.
type InflightMap = Arc<Mutex<HashMap<IdentityKey, Arc<Mutex<()>>>>>;

/// Pluggable fetcher so tests can bypass HTTP. The default implementation uses
/// [`download_and_verify`].
#[async_trait]
pub trait ModelFetcher: Send + Sync {
    async fn fetch_file(&self, spec: &DownloadSpec, limiter: &Semaphore) -> ModelStoreResult<()>;
}

pub struct HttpFetcher;

#[async_trait]
impl ModelFetcher for HttpFetcher {
    async fn fetch_file(&self, spec: &DownloadSpec, limiter: &Semaphore) -> ModelStoreResult<()> {
        download_and_verify(spec, limiter).await.map(|_| ())
    }
}

/// Context wired once per process.
#[derive(Clone)]
pub struct ModelStoreCtx {
    pub pool: SqlitePool,
    pub installs_root: PathBuf,
    pub blobs_root: PathBuf,
    pub limiter: Arc<Semaphore>,
    pub inflight: InflightMap,
    pub fetcher: Arc<dyn ModelFetcher>,
}

impl ModelStoreCtx {
    pub fn new(
        pool: SqlitePool,
        installs_root: PathBuf,
        blobs_root: PathBuf,
        concurrency: usize,
        fetcher: Arc<dyn ModelFetcher>,
    ) -> Self {
        Self {
            pool,
            installs_root,
            blobs_root,
            limiter: super::download::make_limiter(concurrency),
            inflight: Arc::new(Mutex::new(HashMap::new())),
            fetcher,
        }
    }
}

fn key_of(req: &InstallModelRequest) -> IdentityKey {
    IdentityKey {
        family: req.family.clone(),
        version: req.version.clone(),
        quantization: req.quantization.clone(),
        variant: req.variant.clone(),
        sha256_root: req.sha256_root.clone(),
        private_model: req.private,
        owner_extension_id: req.owner_extension_id.clone(),
    }
}

async fn acquire_key_lock(map: &InflightMap, key: &IdentityKey) -> Arc<Mutex<()>> {
    let mut guard = map.lock().await;
    guard
        .entry(key.clone())
        .or_insert_with(|| Arc::new(Mutex::new(())))
        .clone()
}

async fn release_key_lock(map: &InflightMap, key: &IdentityKey) {
    let mut guard = map.lock().await;
    if let Some(lock) = guard.get(key)
        && Arc::strong_count(lock) == 1
    {
        guard.remove(key);
    }
}

async fn find_existing(
    pool: &SqlitePool,
    key: &IdentityKey,
) -> ModelStoreResult<Option<InstalledModelDto>> {
    let row = sqlx::query(
        "SELECT install_id, family, version, quantization, variant, install_root, \
                sha256_root, source_revision, state, private_model, owner_extension_id \
         FROM host_model_installs \
         WHERE family = $1 AND version = $2 AND COALESCE(quantization,'') = COALESCE($3,'') \
           AND variant = $4 AND sha256_root = $5 AND private_model = $6 \
           AND COALESCE(owner_extension_id,'') = COALESCE($7,'')",
    )
    .bind(&key.family)
    .bind(&key.version)
    .bind(&key.quantization)
    .bind(&key.variant)
    .bind(&key.sha256_root)
    .bind(key.private_model as i64)
    .bind(&key.owner_extension_id)
    .fetch_optional(pool)
    .await?;

    Ok(row.map(|r| InstalledModelDto {
        install_id: r.try_get("install_id").unwrap_or_default(),
        family: r.try_get("family").unwrap_or_default(),
        version: r.try_get("version").unwrap_or_default(),
        quantization: r.try_get("quantization").ok(),
        variant: r.try_get("variant").unwrap_or_default(),
        install_root: r.try_get("install_root").unwrap_or_default(),
        sha256_root: r.try_get("sha256_root").unwrap_or_default(),
        source_revision: r.try_get("source_revision").unwrap_or_default(),
        state: r.try_get("state").unwrap_or_default(),
        private_model: r
            .try_get::<i64, _>("private_model")
            .map(|v| v != 0)
            .unwrap_or(false),
        owner_extension_id: r.try_get("owner_extension_id").ok(),
    }))
}

/// Install a new model or return the existing row for the same identity tuple.
///
/// Concurrent callers for the same tuple serialize on a per-key mutex; only
/// one of them runs the download — the rest observe the persisted `ready` row
pub async fn install_model(
    ctx: &ModelStoreCtx,
    req: InstallModelRequest,
) -> ModelStoreResult<InstalledModelDto> {
    let key = key_of(&req);
    let lock = acquire_key_lock(&ctx.inflight, &key).await;
    let _guard = lock.lock().await;

    if let Some(existing) = find_existing(&ctx.pool, &key).await? {
        release_key_lock(&ctx.inflight, &key).await;
        return Ok(existing);
    }

    let install_id = format!("mdl-{}", ulid::Ulid::new());
    let install_root = ctx.installs_root.join(&install_id);
    let manifest_entries: Vec<FileManifestEntry> = req
        .files
        .iter()
        .map(|f| FileManifestEntry {
            path: f.path.clone(),
            sha256: f.sha256.clone(),
            size_bytes: f.size_bytes,
        })
        .collect();
    let manifest_json = serde_json::to_string(&manifest_entries)
        .map_err(|e| ModelStoreError::ManifestInvalid(e.to_string()))?;
    let now = Utc::now().to_rfc3339();

    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
             install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
             source_url, private_model, owner_extension_id, created_at, updated_at) \
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'queued',$10,$11,$12,$13,$14,$14)",
    )
    .bind(&install_id)
    .bind(&req.family)
    .bind(&req.version)
    .bind(&req.quantization)
    .bind(&req.variant)
    .bind(install_root.to_string_lossy().as_ref())
    .bind(&manifest_json)
    .bind(&req.sha256_root)
    .bind(&req.source_revision)
    .bind(&req.source_kind)
    .bind(&req.source_url)
    .bind(req.private as i64)
    .bind(&req.owner_extension_id)
    .bind(&now)
    .execute(&ctx.pool)
    .await?;

    let fetch_result = run_fetch(ctx, &install_id, &install_root, &req).await;
    let new_state = if fetch_result.is_ok() {
        "ready"
    } else {
        "failed"
    };

    sqlx::query("UPDATE host_model_installs SET state = $1, updated_at = $2 WHERE install_id = $3")
        .bind(new_state)
        .bind(Utc::now().to_rfc3339())
        .bind(&install_id)
        .execute(&ctx.pool)
        .await?;

    release_key_lock(&ctx.inflight, &key).await;

    fetch_result?;

    find_existing(&ctx.pool, &key)
        .await?
        .ok_or_else(|| ModelStoreError::InstallNotFound(install_id.clone()))
}

async fn run_fetch(
    ctx: &ModelStoreCtx,
    _install_id: &str,
    install_root: &PathBuf,
    req: &InstallModelRequest,
) -> ModelStoreResult<()> {
    tokio::fs::create_dir_all(install_root).await?;
    let staging = install_root.join(".staging");
    tokio::fs::create_dir_all(&staging).await?;

    for f in &req.files {
        let stage_path = staging.join(&f.sha256);
        let spec = DownloadSpec {
            source_url: f.source_url.clone(),
            expected_sha256: f.sha256.clone(),
            destination: stage_path.clone(),
            expected_size: Some(f.size_bytes),
        };
        ctx.fetcher.fetch_file(&spec, &ctx.limiter).await?;
        let target = install_root.join(&f.path);
        blobs::materialize_blob(&f.sha256, &stage_path, &target, &ctx.blobs_root).await?;
    }
    let _ = tokio::fs::remove_dir_all(&staging).await;
    Ok(())
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct HostModelRow {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub install_root: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub state: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub license_spdx: Option<String>,
    pub license_url: Option<String>,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
    pub created_at: String,
}

pub async fn list_all_visible(
    pool: &SqlitePool,
    caller_extension_id: Option<&str>,
) -> ModelStoreResult<Vec<HostModelRow>> {
    let rows = sqlx::query(
        "SELECT install_id, family, version, quantization, variant, install_root, sha256_root, \
                source_revision, state, source_kind, source_url, license_spdx, license_url, \
                private_model, owner_extension_id, created_at \
         FROM host_model_installs \
         WHERE private_model = 0 OR owner_extension_id = $1 \
         ORDER BY datetime(created_at) DESC",
    )
    .bind(caller_extension_id.unwrap_or(""))
    .fetch_all(pool)
    .await?;

    let mut out = Vec::with_capacity(rows.len());
    for r in rows {
        out.push(HostModelRow {
            install_id: r.try_get("install_id")?,
            family: r.try_get("family")?,
            version: r.try_get("version")?,
            quantization: r.try_get("quantization").ok(),
            variant: r.try_get("variant")?,
            install_root: r.try_get("install_root")?,
            sha256_root: r.try_get("sha256_root")?,
            source_revision: r.try_get("source_revision")?,
            state: r.try_get("state")?,
            source_kind: r.try_get("source_kind")?,
            source_url: r.try_get("source_url").ok(),
            license_spdx: r.try_get("license_spdx").ok(),
            license_url: r.try_get("license_url").ok(),
            private_model: r.try_get::<i64, _>("private_model")? != 0,
            owner_extension_id: r.try_get("owner_extension_id").ok(),
            created_at: r.try_get("created_at")?,
        });
    }
    Ok(out)
}

pub async fn uninstall_model(ctx: &ModelStoreCtx, install_id: &str) -> ModelStoreResult<()> {
    let row = sqlx::query("SELECT install_root FROM host_model_installs WHERE install_id = $1")
        .bind(install_id)
        .fetch_optional(&ctx.pool)
        .await?;
    let Some(row) = row else {
        return Err(ModelStoreError::InstallNotFound(install_id.to_string()));
    };
    let install_root: String = row.try_get("install_root")?;

    let leases = sqlx::query(
        "SELECT DISTINCT extension_id FROM host_model_leases \
         WHERE install_id = $1 AND released_at IS NULL",
    )
    .bind(install_id)
    .fetch_all(&ctx.pool)
    .await?;
    if !leases.is_empty() {
        let exts = leases
            .iter()
            .filter_map(|r| r.try_get::<String, _>("extension_id").ok())
            .collect();
        return Err(ModelStoreError::LeasedByExtensions {
            install_id: install_id.to_string(),
            extensions: exts,
        });
    }

    if !install_root.is_empty() {
        let _ = tokio::fs::remove_dir_all(&install_root).await;
    }
    sqlx::query("DELETE FROM host_model_installs WHERE install_id = $1")
        .bind(install_id)
        .execute(&ctx.pool)
        .await?;
    Ok(())
}

pub mod test_support {
    use super::*;
    use std::sync::atomic::{AtomicUsize, Ordering};

    pub struct FakeFetcher {
        pub calls: AtomicUsize,
        pub files: std::sync::Mutex<HashMap<String, Vec<u8>>>,
    }

    impl FakeFetcher {
        pub fn new(files: Vec<(String, Vec<u8>)>) -> Arc<Self> {
            Arc::new(Self {
                calls: AtomicUsize::new(0),
                files: std::sync::Mutex::new(files.into_iter().collect()),
            })
        }
        pub fn call_count(&self) -> usize {
            self.calls.load(Ordering::SeqCst)
        }
    }

    #[async_trait]
    impl ModelFetcher for FakeFetcher {
        async fn fetch_file(
            &self,
            spec: &DownloadSpec,
            _limiter: &Semaphore,
        ) -> ModelStoreResult<()> {
            self.calls.fetch_add(1, Ordering::SeqCst);
            let bytes = self
                .files
                .lock()
                .unwrap()
                .get(&spec.source_url)
                .cloned()
                .ok_or_else(|| ModelStoreError::SourceUnreachable {
                    source_url: spec.source_url.clone(),
                    detail: "no stub registered".into(),
                })?;
            if let Some(parent) = spec.destination.parent() {
                tokio::fs::create_dir_all(parent).await?;
            }
            tokio::fs::write(&spec.destination, &bytes).await?;
            // Verify hash matches
            use sha2::{Digest, Sha256};
            let mut h = Sha256::new();
            h.update(&bytes);
            let got: String = h.finalize().iter().map(|b| format!("{b:02x}")).collect();
            if !got.eq_ignore_ascii_case(&spec.expected_sha256) {
                return Err(ModelStoreError::ChecksumMismatch {
                    file: spec.destination.clone(),
                    expected: spec.expected_sha256.clone(),
                    actual: got,
                });
            }
            Ok(())
        }
    }
}

#[cfg(test)]
mod tests {
    use super::test_support::FakeFetcher;
    use super::*;
    use sha2::{Digest, Sha256};
    use sqlx::sqlite::SqlitePoolOptions;
    use tempfile::TempDir;

    fn sha(bytes: &[u8]) -> String {
        let mut h = Sha256::new();
        h.update(bytes);
        h.finalize().iter().map(|b| format!("{b:02x}")).collect()
    }

    async fn make_ctx(fetcher: Arc<dyn ModelFetcher>) -> (ModelStoreCtx, TempDir) {
        let tmp = TempDir::new().unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(4)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        for stmt in include_str!("../../../../migrations/009_host_model_store.sql").split(';') {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }
        let ctx = ModelStoreCtx::new(
            pool,
            tmp.path().join("installs"),
            tmp.path().join("blobs"),
            2,
            fetcher,
        );
        (ctx, tmp)
    }

    fn sample_request(url: &str, bytes: &[u8]) -> InstallModelRequest {
        InstallModelRequest {
            family: "llama-cpp-gguf".into(),
            version: "llama-3-8b-instruct".into(),
            quantization: Some("Q4_K_M".into()),
            variant: "default".into(),
            sha256_root: sha(bytes),
            source_revision: sha(bytes),
            source_kind: "direct_url".into(),
            source_url: Some(url.to_string()),
            private: false,
            owner_extension_id: None,
            files: vec![PlannedFile {
                path: "model.gguf".into(),
                sha256: sha(bytes),
                size_bytes: bytes.len() as u64,
                source_url: url.to_string(),
            }],
        }
    }

    #[tokio::test]
    async fn install_new_tuple_creates_ready_row() {
        let bytes = b"hello model" as &[u8];
        let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
        let (ctx, _tmp) = make_ctx(fetcher.clone()).await;

        let dto = install_model(&ctx, sample_request("http://x/f", bytes))
            .await
            .unwrap();
        assert_eq!(dto.state, "ready");
        assert_eq!(fetcher.call_count(), 1);
    }

    #[tokio::test]
    async fn install_existing_ready_tuple_returns_existing() {
        let bytes = b"shared" as &[u8];
        let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
        let (ctx, _tmp) = make_ctx(fetcher.clone()).await;

        let a = install_model(&ctx, sample_request("http://x/f", bytes))
            .await
            .unwrap();
        let b = install_model(&ctx, sample_request("http://x/f", bytes))
            .await
            .unwrap();
        assert_eq!(a.install_id, b.install_id);
        assert_eq!(fetcher.call_count(), 1, "second call reuses existing row");
    }

    #[tokio::test]
    async fn concurrent_installs_collapse_to_one_row_and_one_fetch() {
        let bytes = b"concurrent" as &[u8];
        let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
        let (ctx, _tmp) = make_ctx(fetcher.clone()).await;

        let req = sample_request("http://x/f", bytes);
        let ctx1 = ctx.clone();
        let r1 = req.clone();
        let ctx2 = ctx.clone();
        let r2 = req.clone();
        let (a, b) = tokio::join!(
            tokio::spawn(async move { install_model(&ctx1, r1).await }),
            tokio::spawn(async move { install_model(&ctx2, r2).await }),
        );
        let a = a.unwrap().unwrap();
        let b = b.unwrap().unwrap();
        assert_eq!(a.install_id, b.install_id);
        assert_eq!(fetcher.call_count(), 1);

        let count: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
            .fetch_one(&ctx.pool)
            .await
            .unwrap()
            .try_get("n")
            .unwrap();
        assert_eq!(count, 1);
    }

    #[tokio::test]
    async fn corrupt_fetch_marks_row_failed() {
        // fake fetcher serving bytes that hash differently from claimed sha
        struct Corrupt;
        #[async_trait]
        impl ModelFetcher for Corrupt {
            async fn fetch_file(
                &self,
                spec: &DownloadSpec,
                _limiter: &Semaphore,
            ) -> ModelStoreResult<()> {
                Err(ModelStoreError::ChecksumMismatch {
                    file: spec.destination.clone(),
                    expected: spec.expected_sha256.clone(),
                    actual: "deadbeef".into(),
                })
            }
        }
        let (ctx, _tmp) = make_ctx(Arc::new(Corrupt)).await;
        let req = sample_request("http://x/f", b"hello");
        let err = install_model(&ctx, req).await.unwrap_err();
        assert!(matches!(err, ModelStoreError::ChecksumMismatch { .. }));

        let state: String = sqlx::query("SELECT state FROM host_model_installs LIMIT 1")
            .fetch_one(&ctx.pool)
            .await
            .unwrap()
            .try_get("state")
            .unwrap();
        assert_eq!(state, "failed");
    }

    #[tokio::test]
    async fn uninstall_without_leases_removes_row() {
        let bytes = b"gone" as &[u8];
        let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
        let (ctx, _tmp) = make_ctx(fetcher).await;
        let dto = install_model(&ctx, sample_request("http://x/f", bytes))
            .await
            .unwrap();
        uninstall_model(&ctx, &dto.install_id).await.unwrap();
        let n: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
            .fetch_one(&ctx.pool)
            .await
            .unwrap()
            .try_get("n")
            .unwrap();
        assert_eq!(n, 0);
    }

    #[tokio::test]
    async fn uninstall_blocked_by_active_lease() {
        let bytes = b"leased" as &[u8];
        let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
        let (ctx, _tmp) = make_ctx(fetcher).await;
        let dto = install_model(&ctx, sample_request("http://x/f", bytes))
            .await
            .unwrap();

        sqlx::query(
            "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
             vram_reserved_bytes, acquired_at) VALUES ('l1',$1,'ext-alpha','cuda:0',0,$2)",
        )
        .bind(&dto.install_id)
        .bind(Utc::now().to_rfc3339())
        .execute(&ctx.pool)
        .await
        .unwrap();

        let err = uninstall_model(&ctx, &dto.install_id).await.unwrap_err();
        match err {
            ModelStoreError::LeasedByExtensions { extensions, .. } => {
                assert_eq!(extensions, vec!["ext-alpha".to_string()]);
            }
            other => panic!("expected LeasedByExtensions, got {other:?}"),
        }
    }
}
