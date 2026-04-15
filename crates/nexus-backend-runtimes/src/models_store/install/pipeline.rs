use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use chrono::Utc;
use sqlx::{Row, SqlitePool};
use tokio::sync::{Mutex, Semaphore};

use super::dedup::{InflightMap, acquire_key_lock, find_existing, release_key_lock};
use super::dto::{InstallModelRequest, InstalledModelDto, key_of};
use super::fetcher::ModelFetcher;
use crate::models_store::blobs::{self, FileManifestEntry};
use crate::models_store::download::{self, DownloadSpec};
use crate::models_store::errors::{ModelStoreError, ModelStoreResult};
use crate::models_store::provenance::{HfProbe, resolve_license};

#[derive(Clone)]
pub struct ModelStoreCtx {
    pub pool: SqlitePool,
    pub installs_root: PathBuf,
    pub blobs_root: PathBuf,
    pub limiter: Arc<Semaphore>,
    pub(super) inflight: InflightMap,
    pub fetcher: Arc<dyn ModelFetcher>,
    pub hf_probe: Option<Arc<dyn HfProbe>>,
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
            limiter: download::make_limiter(concurrency),
            inflight: Arc::new(Mutex::new(HashMap::new())),
            fetcher,
            hf_probe: None,
        }
    }

    pub fn with_hf_probe(mut self, probe: Arc<dyn HfProbe>) -> Self {
        self.hf_probe = Some(probe);
        self
    }
}

pub async fn install_model(
    ctx: &ModelStoreCtx,
    mut req: InstallModelRequest,
) -> ModelStoreResult<InstalledModelDto> {
    enrich_request_from_hf(ctx, &mut req).await;
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
             source_url, license_spdx, license_url, provenance_note, private_model, \
             owner_extension_id, param_count, created_at, updated_at) \
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'queued',$10,$11,$12,$13,$14,$15,$16,$17,$18,$18)",
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
    .bind(&req.license_spdx)
    .bind(&req.license_url)
    .bind(&req.provenance_note)
    .bind(req.private as i64)
    .bind(&req.owner_extension_id)
    .bind(req.param_count.map(|n| n as i64))
    .bind(&now)
    .execute(&ctx.pool)
    .await?;

    let fetch_result = run_fetch(ctx, &install_root, &req).await;
    let license_ok = license_invariant_holds(&req);
    let new_state = if !license_ok {
        "failed"
    } else if fetch_result.is_ok() {
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

    if !license_ok {
        return Err(ModelStoreError::ManifestInvalid(
            "license_spdx required on ready state; UNKNOWN requires non-empty provenance_note"
                .into(),
        ));
    }
    fetch_result?;

    find_existing(&ctx.pool, &key)
        .await?
        .ok_or_else(|| ModelStoreError::InstallNotFound(install_id.clone()))
}

async fn enrich_request_from_hf(ctx: &ModelStoreCtx, req: &mut InstallModelRequest) {
    if req.source_kind != "huggingface" {
        apply_license_fallback(req);
        return;
    }
    let Some(probe) = ctx.hf_probe.as_ref() else {
        apply_license_fallback(req);
        return;
    };
    let repo_id = req.source_url.as_deref().unwrap_or("").to_string();
    let want_revision = if req.source_revision.is_empty() || req.source_revision == "main" {
        None
    } else {
        Some(req.source_revision.clone())
    };
    match probe
        .fetch_metadata(&repo_id, want_revision.as_deref())
        .await
    {
        Ok(meta) => {
            if req.source_revision.is_empty() || req.source_revision == "main" {
                tracing::warn!(
                    repo = %repo_id,
                    resolved_sha = %meta.revision,
                    "unpinned HF dep resolved to current SHA",
                );
                req.source_revision = meta.revision.clone();
            }
            let info = resolve_license(&req.source_kind, req, Some(&meta));
            req.license_spdx = Some(info.license_spdx);
            req.license_url = info.license_url;
            req.provenance_note = info.provenance_note;
        }
        Err(e) => {
            tracing::warn!(repo = %repo_id, error = %e, "HF metadata fetch failed; falling back to UNKNOWN license");
            apply_license_fallback(req);
        }
    }
}

fn apply_license_fallback(req: &mut InstallModelRequest) {
    let info = resolve_license(&req.source_kind, req, None);
    req.license_spdx = Some(info.license_spdx);
    req.license_url = info.license_url;
    req.provenance_note = info.provenance_note;
}

fn license_invariant_holds(req: &InstallModelRequest) -> bool {
    match req.license_spdx.as_deref() {
        None => false,
        Some("UNKNOWN") => req
            .provenance_note
            .as_deref()
            .is_some_and(|s| !s.is_empty()),
        Some(_) => true,
    }
}

async fn run_fetch(
    ctx: &ModelStoreCtx,
    install_root: &Path,
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
