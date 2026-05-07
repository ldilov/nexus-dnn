//! FR-086 — reverse mapping from an installed artifact back to its
//! upstream identity (family / variant / format / source).
//!
//! Populated by the [`crate::downloads::orchestrator`] on every
//! `Downloaded` target transition. Queried by the UI to know which
//! variant row should render as "installed" after a page reload or by
//! callers asking "where did this file come from?".
//!
//! Table: `model_store_installed_artifacts` (migration 014). This is
//! deliberately a separate table from the extension-oriented
//! `host_models` — different lifecycle, different invariants (no
//! leases, artifact-level grain).

use std::sync::Arc;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use crate::downloads::store::JobStoreResult;
use crate::ids::{ArtifactId, FamilyId, JobId, VariantId};
use crate::types::Format;

/// The input shape the orchestrator hands to [`InstallMap::record`].
#[derive(Debug, Clone)]
pub struct InstalledArtifactRecord {
    pub artifact_id: ArtifactId,
    pub family_id: FamilyId,
    pub variant_id: Option<VariantId>,
    pub format: Format,
    pub source_provider: String,
    pub source_repo: String,
    pub source_revision: Option<String>,
    pub filename: String,
    pub job_id: JobId,
    pub sha256: Option<String>,
    pub size_bytes: Option<u64>,
}

/// A row read back from the install-map — every attribute needed to
/// render the UI's "installed" affordance without re-hitting HF.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstalledArtifactRow {
    pub artifact_id: String,
    pub family_id: String,
    pub variant_id: Option<String>,
    pub format: String,
    pub source_provider: String,
    pub source_repo: String,
    pub source_revision: Option<String>,
    pub filename: String,
    pub job_id: String,
    pub sha256: Option<String>,
    pub size_bytes: Option<u64>,
    pub installed_at: DateTime<Utc>,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub is_moe: Option<bool>,
    pub expert_layer_count: Option<u32>,
    pub extraction_status: Option<String>,
    pub extracted_at: Option<i64>,
}

fn extraction_status_str(status: nexus_model_metadata::ExtractionStatus) -> &'static str {
    match status {
        nexus_model_metadata::ExtractionStatus::Ok => "ok",
        nexus_model_metadata::ExtractionStatus::Partial => "partial",
        nexus_model_metadata::ExtractionStatus::Failed => "failed",
        _ => "failed",
    }
}

fn format_as_str(f: Format) -> &'static str {
    match f {
        Format::Gguf => "gguf",
        Format::Ggml => "ggml",
        Format::Safetensors => "safetensors",
        Format::PytorchBin => "pytorch_bin",
        Format::Pth => "pth",
        _ => "unknown",
    }
}

/// Thin wrapper around the SQLite pool. Shares the pool handle with
/// [`crate::downloads::store::JobStore`]; constructed from the same
/// [`Arc<SqlitePool>`] at host-assembly time.
#[derive(Clone)]
pub struct InstallMap {
    pool: Arc<SqlitePool>,
}

impl InstallMap {
    #[must_use]
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    /// Upsert a mapping. `artifact_id` is the primary key, so a
    /// re-download of the same artifact (whether by retry or a fresh
    /// job) replaces the row and keeps `installed_at` current.
    pub async fn record(&self, record: InstalledArtifactRecord) -> JobStoreResult<()> {
        let now = Utc::now().to_rfc3339();
        sqlx::query(
            "INSERT INTO model_store_installed_artifacts (
                artifact_id, family_id, variant_id, format,
                source_provider, source_repo, source_revision,
                filename, job_id, sha256, size_bytes, installed_at
             ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
             ON CONFLICT(artifact_id) DO UPDATE SET
                family_id = excluded.family_id,
                variant_id = excluded.variant_id,
                format = excluded.format,
                source_provider = excluded.source_provider,
                source_repo = excluded.source_repo,
                source_revision = excluded.source_revision,
                filename = excluded.filename,
                job_id = excluded.job_id,
                sha256 = excluded.sha256,
                size_bytes = excluded.size_bytes,
                installed_at = excluded.installed_at",
        )
        .bind(record.artifact_id.as_str())
        .bind(record.family_id.as_str())
        .bind(record.variant_id.as_ref().map(|v| v.as_str()))
        .bind(format_as_str(record.format))
        .bind(&record.source_provider)
        .bind(&record.source_repo)
        .bind(record.source_revision.as_deref())
        .bind(&record.filename)
        .bind(record.job_id.to_string())
        .bind(record.sha256.as_deref())
        .bind(record.size_bytes.and_then(|v| i64::try_from(v).ok()))
        .bind(&now)
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    /// Lookup by `artifact_id`. The UI's variant row uses this to
    /// show the acid-green "installed" indicator on page load.
    pub async fn find_by_artifact(
        &self,
        artifact_id: &ArtifactId,
    ) -> JobStoreResult<Option<InstalledArtifactRow>> {
        let row = sqlx::query(
            "SELECT artifact_id, family_id, variant_id, format,
                    source_provider, source_repo, source_revision,
                    filename, job_id, sha256, size_bytes, installed_at,
                    layer_count, max_context, architecture, hidden_size,
                    is_moe, expert_layer_count,
                    extraction_status, extracted_at
             FROM model_store_installed_artifacts
             WHERE artifact_id = ?1",
        )
        .bind(artifact_id.as_str())
        .fetch_optional(self.pool.as_ref())
        .await?;
        Ok(row.map(parse_row))
    }

    pub async fn list_all(
        &self,
        limit: usize,
    ) -> JobStoreResult<Vec<InstalledArtifactRow>> {
        let rows = sqlx::query(
            "SELECT artifact_id, family_id, variant_id, format,
                    source_provider, source_repo, source_revision,
                    filename, job_id, sha256, size_bytes, installed_at,
                    layer_count, max_context, architecture, hidden_size,
                    is_moe, expert_layer_count,
                    extraction_status, extracted_at
             FROM model_store_installed_artifacts
             ORDER BY installed_at DESC, artifact_id ASC
             LIMIT ?1",
        )
        .bind(limit as i64)
        .fetch_all(self.pool.as_ref())
        .await?;
        Ok(rows.into_iter().map(parse_row).collect())
    }

    /// Backfill the six extraction-metadata columns on an existing
    /// artifact row. Called fire-and-forget from the orchestrator after
    /// `record()` commits, so extraction latency never blocks install.
    pub async fn update_extraction_metadata(
        &self,
        artifact_id: &ArtifactId,
        metadata: &nexus_model_metadata::ExtractedMetadata,
    ) -> JobStoreResult<()> {
        sqlx::query(
            "UPDATE model_store_installed_artifacts
             SET layer_count = ?1,
                 max_context = ?2,
                 architecture = ?3,
                 hidden_size = ?4,
                 is_moe = ?5,
                 expert_layer_count = ?6,
                 extraction_status = ?7,
                 extracted_at = ?8
             WHERE artifact_id = ?9",
        )
        .bind(metadata.layer_count.map(i64::from))
        .bind(metadata.max_context.map(i64::from))
        .bind(metadata.architecture.as_deref())
        .bind(metadata.hidden_size.map(i64::from))
        .bind(metadata.is_moe.map(i64::from))
        .bind(metadata.expert_layer_count.map(i64::from))
        .bind(extraction_status_str(metadata.extraction_status))
        .bind(metadata.extracted_at)
        .bind(artifact_id.as_str())
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    pub async fn list_for_family(
        &self,
        family_id: &FamilyId,
    ) -> JobStoreResult<Vec<InstalledArtifactRow>> {
        let rows = sqlx::query(
            "SELECT artifact_id, family_id, variant_id, format,
                    source_provider, source_repo, source_revision,
                    filename, job_id, sha256, size_bytes, installed_at,
                    layer_count, max_context, architecture, hidden_size,
                    is_moe, expert_layer_count,
                    extraction_status, extracted_at
             FROM model_store_installed_artifacts
             WHERE family_id = ?1
             ORDER BY installed_at DESC",
        )
        .bind(family_id.as_str())
        .fetch_all(self.pool.as_ref())
        .await?;
        Ok(rows.into_iter().map(parse_row).collect())
    }
}

fn parse_row(r: sqlx::sqlite::SqliteRow) -> InstalledArtifactRow {
    InstalledArtifactRow {
        artifact_id: r.get("artifact_id"),
        family_id: r.get("family_id"),
        variant_id: r.get("variant_id"),
        format: r.get("format"),
        source_provider: r.get("source_provider"),
        source_repo: r.get("source_repo"),
        source_revision: r.get("source_revision"),
        filename: r.get("filename"),
        job_id: r.get("job_id"),
        sha256: r.get("sha256"),
        size_bytes: r
            .get::<Option<i64>, _>("size_bytes")
            .and_then(|v| u64::try_from(v).ok()),
        installed_at: DateTime::parse_from_rfc3339(&r.get::<String, _>("installed_at"))
            .map(|dt| dt.with_timezone(&Utc))
            .unwrap_or_else(|_| Utc::now()),
        layer_count: r
            .get::<Option<i64>, _>("layer_count")
            .map(|v| v as u32),
        max_context: r
            .get::<Option<i64>, _>("max_context")
            .map(|v| v as u32),
        architecture: r.get("architecture"),
        hidden_size: r
            .get::<Option<i64>, _>("hidden_size")
            .map(|v| v as u32),
        is_moe: r.get::<Option<i64>, _>("is_moe").map(|v| v != 0),
        expert_layer_count: r
            .get::<Option<i64>, _>("expert_layer_count")
            .map(|v| v as u32),
        extraction_status: r.get("extraction_status"),
        extracted_at: r.get("extracted_at"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
    use std::str::FromStr;

    async fn memory_pool() -> Arc<SqlitePool> {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        sqlx::query(include_str!(
            "../../../../migrations/014_model_store_installed_artifacts.sql"
        ))
        .execute(&pool)
        .await
        .unwrap();
        for stmt in include_str!(
            "../../../../migrations/015_installed_artifact_extraction_metadata.sql"
        )
        .split(';')
        {
            let trimmed = stmt.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&pool).await.unwrap();
        }
        for stmt in include_str!(
            "../../../../migrations/021_installed_artifact_moe_metadata.sql"
        )
        .split(';')
        {
            let trimmed = stmt.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&pool).await.unwrap();
        }
        Arc::new(pool)
    }

    fn sample(artifact: &str, family: &str, variant: Option<&str>) -> InstalledArtifactRecord {
        InstalledArtifactRecord {
            artifact_id: ArtifactId::from(artifact),
            family_id: FamilyId::from(family),
            variant_id: variant.map(VariantId::from),
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: Some("main".into()),
            filename: "model.Q4_K_M.gguf".into(),
            job_id: JobId::new(),
            sha256: Some("deadbeef".into()),
            size_bytes: Some(4_900_000_000),
        }
    }

    #[tokio::test]
    async fn record_and_find_round_trips_all_fields() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.record(sample("hf:a/m#file", "hf:a/m", Some("hf:a/m@Q4_K_M")))
            .await
            .unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/m#file"))
            .await
            .unwrap()
            .unwrap();
        assert_eq!(row.family_id, "hf:a/m");
        assert_eq!(row.variant_id.as_deref(), Some("hf:a/m@Q4_K_M"));
        assert_eq!(row.format, "gguf");
        assert_eq!(row.source_repo, "acme/model");
        assert_eq!(row.size_bytes, Some(4_900_000_000));
        assert!(row.layer_count.is_none());
        assert!(row.max_context.is_none());
        assert!(row.architecture.is_none());
        assert!(row.hidden_size.is_none());
        assert!(row.extraction_status.is_none());
        assert!(row.extracted_at.is_none());
    }

    #[tokio::test]
    async fn record_is_upsert_on_artifact_id() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let mut a = sample("hf:a/m#file", "hf:a/m", Some("hf:a/m@Q4"));
        map.record(a.clone()).await.unwrap();
        a.size_bytes = Some(10);
        map.record(a).await.unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/m#file"))
            .await
            .unwrap()
            .unwrap();
        assert_eq!(row.size_bytes, Some(10));
    }

    #[tokio::test]
    async fn list_for_family_returns_all_matching_artifacts() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let f = "hf:a/m";
        map.record(sample("hf:a/m#q4", f, Some("hf:a/m@Q4")))
            .await
            .unwrap();
        map.record(sample("hf:a/m#q5", f, Some("hf:a/m@Q5")))
            .await
            .unwrap();
        map.record(sample("hf:other/x#f", "hf:other/x", None))
            .await
            .unwrap();
        let rows = map.list_for_family(&FamilyId::from(f)).await.unwrap();
        assert_eq!(rows.len(), 2);
        let ids: Vec<&str> = rows.iter().map(|r| r.artifact_id.as_str()).collect();
        assert!(ids.contains(&"hf:a/m#q4"));
        assert!(ids.contains(&"hf:a/m#q5"));
    }

    #[tokio::test]
    async fn update_extraction_metadata_round_trips() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.record(sample("hf:a/m#file", "hf:a/m", Some("hf:a/m@Q4")))
            .await
            .unwrap();
        let mut meta = nexus_model_metadata::ExtractedMetadata::ok(
            "hf:a/m#file",
            nexus_model_metadata::ArtifactFormat::Gguf,
        );
        meta.layer_count = Some(32);
        meta.max_context = Some(8192);
        meta.architecture = Some("llama".to_string());
        meta.hidden_size = Some(4096);
        meta.extracted_at = 1_700_000_000_000;
        map.update_extraction_metadata(&ArtifactId::from("hf:a/m#file"), &meta)
            .await
            .unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/m#file"))
            .await
            .unwrap()
            .unwrap();
        assert_eq!(row.layer_count, Some(32));
        assert_eq!(row.max_context, Some(8192));
        assert_eq!(row.architecture.as_deref(), Some("llama"));
        assert_eq!(row.hidden_size, Some(4096));
        assert_eq!(row.extraction_status.as_deref(), Some("ok"));
        assert_eq!(row.extracted_at, Some(1_700_000_000_000));
    }

    #[tokio::test]
    async fn update_extraction_metadata_persists_moe_fields() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.record(sample("hf:a/mixtral#file", "hf:a/mixtral", Some("hf:a/mixtral@Q4")))
            .await
            .unwrap();
        let mut meta = nexus_model_metadata::ExtractedMetadata::ok(
            "hf:a/mixtral#file",
            nexus_model_metadata::ArtifactFormat::Gguf,
        );
        meta.layer_count = Some(32);
        meta.architecture = Some("mixtral".to_string());
        meta.is_moe = Some(true);
        meta.expert_layer_count = Some(32);
        meta.extracted_at = 1_700_000_000_000;
        map.update_extraction_metadata(&ArtifactId::from("hf:a/mixtral#file"), &meta)
            .await
            .unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/mixtral#file"))
            .await
            .unwrap()
            .unwrap();
        assert_eq!(row.is_moe, Some(true));
        assert_eq!(row.expert_layer_count, Some(32));
    }

    #[tokio::test]
    async fn moe_fields_default_null_before_update() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.record(sample("hf:a/dense#file", "hf:a/dense", None))
            .await
            .unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/dense#file"))
            .await
            .unwrap()
            .unwrap();
        assert_eq!(row.is_moe, None);
        assert_eq!(row.expert_layer_count, None);
    }

    #[tokio::test]
    async fn variant_id_null_is_preserved() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.record(sample("hf:a/m#primary", "hf:a/m", None))
            .await
            .unwrap();
        let row = map
            .find_by_artifact(&ArtifactId::from("hf:a/m#primary"))
            .await
            .unwrap()
            .unwrap();
        assert!(row.variant_id.is_none());
    }
}
