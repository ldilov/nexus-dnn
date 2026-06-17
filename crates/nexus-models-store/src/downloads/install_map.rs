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

impl InstalledArtifactRow {
    /// Absolute on-disk location of the installed file. The sink layout is
    /// `<sink_root>/<job_id>/<filename>` — the same convention
    /// [`InstallMap::reconcile_row_present`] checks against.
    #[must_use]
    pub fn install_path(&self, sink_root: &std::path::Path) -> std::path::PathBuf {
        sink_root.join(&self.job_id).join(&self.filename)
    }
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

    pub async fn list_all(&self, limit: usize) -> JobStoreResult<Vec<InstalledArtifactRow>> {
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

    /// Record that `extension_id` references the artifact identified by
    /// `job_id` (the download-job grain that owns one on-disk sink dir).
    ///
    /// The artifact identity for ref-counting is the **`job_id`**: a single
    /// family snapshot install produces many `model_store_installed_artifacts`
    /// rows (one per file) that all share one `job_id`, and the sink dir
    /// `<sink_root>/<job_id>/` is exactly the unit GC deletes. Two extensions
    /// installing the same family resolve to the same `job_id` (duplicate-job
    /// detection), so they produce ONE on-disk copy and TWO refs.
    ///
    /// Idempotent: re-recording the same `(job_id, extension_id)` is a no-op
    /// (UNIQUE constraint + `ON CONFLICT DO NOTHING`).
    pub async fn add_ref(&self, job_id: &str, extension_id: &str) -> JobStoreResult<()> {
        let now = Utc::now().to_rfc3339();
        sqlx::query(
            "INSERT INTO model_store_artifact_refs (job_id, extension_id, created_at)
             VALUES (?1, ?2, ?3)
             ON CONFLICT(job_id, extension_id) DO NOTHING",
        )
        .bind(job_id)
        .bind(extension_id)
        .bind(&now)
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    /// All artifact `job_id`s referenced by `extension_id`.
    pub async fn refs_for_extension(&self, extension_id: &str) -> JobStoreResult<Vec<String>> {
        let rows = sqlx::query(
            "SELECT DISTINCT job_id FROM model_store_artifact_refs WHERE extension_id = ?1",
        )
        .bind(extension_id)
        .fetch_all(self.pool.as_ref())
        .await?;
        Ok(rows
            .into_iter()
            .map(|r| r.get::<String, _>("job_id"))
            .collect())
    }

    /// Number of distinct extensions referencing the artifact `job_id`.
    pub async fn refcount(&self, job_id: &str) -> JobStoreResult<u64> {
        let row =
            sqlx::query("SELECT COUNT(*) AS n FROM model_store_artifact_refs WHERE job_id = ?1")
                .bind(job_id)
                .fetch_one(self.pool.as_ref())
                .await?;
        let n: i64 = row.get("n");
        Ok(u64::try_from(n).unwrap_or(0))
    }

    /// Drop a single `(job_id, extension_id)` ref. Idempotent: removing a ref
    /// that was never present is a no-op. Used by a forced single-family
    /// reinstall to release just that family's artifact before GC, leaving the
    /// extension's other refs intact.
    pub async fn remove_ref(&self, job_id: &str, extension_id: &str) -> JobStoreResult<()> {
        sqlx::query(
            "DELETE FROM model_store_artifact_refs WHERE job_id = ?1 AND extension_id = ?2",
        )
        .bind(job_id)
        .bind(extension_id)
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    /// Drop every ref held by `extension_id`. Returns the distinct artifact
    /// `job_id`s that the extension referenced (so the caller can run
    /// [`Self::gc_artifact_if_unreferenced`] on each).
    pub async fn remove_refs_for_extension(
        &self,
        extension_id: &str,
    ) -> JobStoreResult<Vec<String>> {
        let affected = self.refs_for_extension(extension_id).await?;
        sqlx::query("DELETE FROM model_store_artifact_refs WHERE extension_id = ?1")
            .bind(extension_id)
            .execute(self.pool.as_ref())
            .await?;
        Ok(affected)
    }

    /// Reconcile a single install-map row against disk: `true` if its resolved
    /// file `<sink_root>/<job_id>/<filename>` still exists and passes the size
    /// check, `false` (after deleting the row AND its artifact-refs) if the file
    /// is missing or its on-disk size differs from the recorded `size_bytes`.
    ///
    /// Disk is the source of truth (AC-1.1/1.2/1.3). A self-heal that left the
    /// `model_store_artifact_refs` rows behind would strand orphan refs, so the
    /// delete covers both tables for the row's `job_id`.
    pub async fn reconcile_row_present(
        &self,
        row: &InstalledArtifactRow,
        sink_root: &std::path::Path,
    ) -> JobStoreResult<bool> {
        let path = sink_root.join(&row.job_id).join(&row.filename);
        enum PruneReason {
            Missing,
            Truncated { on_disk: u64, expected: u64 },
        }
        let prune = match tokio::fs::metadata(&path).await {
            Err(_) => Some(PruneReason::Missing),
            Ok(meta) => match row.size_bytes {
                Some(expected) if expected > 0 && meta.len() != expected => {
                    Some(PruneReason::Truncated {
                        on_disk: meta.len(),
                        expected,
                    })
                }
                _ => None,
            },
        };
        let Some(reason) = prune else {
            return Ok(true);
        };
        sqlx::query("DELETE FROM model_store_installed_artifacts WHERE artifact_id = ?1")
            .bind(&row.artifact_id)
            .execute(self.pool.as_ref())
            .await?;
        sqlx::query("DELETE FROM model_store_artifact_refs WHERE job_id = ?1")
            .bind(&row.job_id)
            .execute(self.pool.as_ref())
            .await?;
        if let Err(e) =
            crate::downloads::legibility::remove_index_entry(sink_root, &row.job_id).await
        {
            tracing::warn!(
                target: "model_store",
                job_id = %row.job_id,
                error = %e,
                "reconcile: index.json entry prune failed"
            );
        }
        match reason {
            PruneReason::Missing => tracing::info!(
                target: "model_store",
                artifact_id = %row.artifact_id,
                job_id = %row.job_id,
                path = %path.display(),
                "reconcile: file missing on disk — pruned stale row + refs"
            ),
            PruneReason::Truncated { on_disk, expected } => tracing::info!(
                target: "model_store",
                artifact_id = %row.artifact_id,
                job_id = %row.job_id,
                on_disk_bytes = on_disk,
                expected_bytes = expected,
                path = %path.display(),
                "reconcile: on-disk size != expected — pruned truncated row + refs"
            ),
        }
        Ok(false)
    }

    /// Sweep every install-map row, pruning those whose resolved file vanished.
    /// Returns `(checked, pruned)`. Idempotent: a second sweep with nothing
    /// missing prunes 0 (AC-2.4). Backs the `POST .../models/revalidate` route.
    pub async fn prune_missing(&self, sink_root: &std::path::Path) -> JobStoreResult<PruneReport> {
        let rows = self.list_all(usize::MAX).await?;
        let checked = rows.len();
        let mut pruned = 0usize;
        for row in &rows {
            if !self.reconcile_row_present(row, sink_root).await? {
                pruned += 1;
            }
        }
        tracing::info!(
            target: "model_store",
            checked,
            pruned,
            "revalidate: install-map sweep complete"
        );
        Ok(PruneReport { checked, pruned })
    }

    /// Garbage-collect an artifact ONLY when no extension references it.
    ///
    /// With `refcount > 0` this is a no-op (neither the rows nor the files
    /// are touched) and returns `GcOutcome::retained`. With `refcount == 0`
    /// it deletes the `model_store_installed_artifacts` rows for the job AND
    /// the on-disk sink dir `<sink_root>/<job_id>/`, returning the freed byte
    /// count.
    ///
    /// Legacy policy (AC-4.6): rows whose `job_id` has **no** refs at all are
    /// pre-ref-tracking installs. They are GC-eligible by refcount==0, so an
    /// EXPLICIT call here (driven by revalidate / uninstall) may reclaim them.
    /// Callers MUST NOT surprise-GC every unreferenced row during routine
    /// probes — only sweep the job_ids a deliberate action targets.
    pub async fn gc_artifact_if_unreferenced(
        &self,
        job_id: &str,
        sink_root: &std::path::Path,
    ) -> JobStoreResult<GcOutcome> {
        if self.refcount(job_id).await? > 0 {
            return Ok(GcOutcome::retained());
        }

        let sink_dir = sink_root.join(job_id);
        let freed_bytes = dir_size_bytes(&sink_dir).await;
        if sink_dir.exists() {
            let _ = tokio::fs::remove_dir_all(&sink_dir).await;
        }

        sqlx::query("DELETE FROM model_store_installed_artifacts WHERE job_id = ?1")
            .bind(job_id)
            .execute(self.pool.as_ref())
            .await?;

        if let Err(e) = crate::downloads::legibility::remove_index_entry(sink_root, job_id).await {
            tracing::warn!(
                target: "model_store",
                job_id,
                error = %e,
                "gc: index.json entry prune failed"
            );
        }

        tracing::info!(
            target: "model_store",
            job_id,
            freed_bytes,
            sink_dir = %sink_dir.display(),
            "gc: artifact unreferenced — deleted rows + on-disk files"
        );

        Ok(GcOutcome {
            deleted: true,
            freed_bytes,
        })
    }

    /// Adopt store-sink bytes back into the install map (the complement of
    /// [`Self::prune_missing`]). Walks every `<sink_root>/<job_id>/` dir, reads
    /// its legibility sidecar for `family_id`/`source_repo`, and re-records an
    /// [`InstalledArtifactRecord`] for each on-disk file (size>0) that lacks a
    /// row. The recorded `artifact_id` is `{family_id}#{filename}` — the same
    /// form the download path and `find_by_artifact` use, so per-file presence
    /// checks see the file without a re-download.
    ///
    /// Store-authoritative and byte-safe: it never moves, deletes, or fabricates
    /// bytes (a declared-but-absent file is not recorded) and only touches
    /// `model_store_installed_artifacts`. Idempotent — a second run records
    /// nothing. A job dir with no/unreadable sidecar is skipped (logged), never
    /// failing the whole scan.
    pub async fn backfill_install_map_from_sink(
        &self,
        sink_root: &std::path::Path,
    ) -> JobStoreResult<BackfillReport> {
        let mut report = BackfillReport::default();
        let mut dir = match tokio::fs::read_dir(sink_root).await {
            Ok(d) => d,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(report),
            Err(e) => return Err(e.into()),
        };

        loop {
            let entry = match dir.next_entry().await {
                Ok(Some(entry)) => entry,
                Ok(None) => break,
                // A mid-walk read error truncates the scan rather than silently
                // logging "complete"; mark it so callers can tell incomplete
                Err(e) => {
                    report.scan_truncated = true;
                    tracing::warn!(
                        target: "model_store",
                        error = %e,
                        "backfill: sink dir read error — scan may be incomplete"
                    );
                    break;
                }
            };

            let job_path = entry.path();
            if !entry.file_type().await.map(|t| t.is_dir()).unwrap_or(false) {
                continue;
            }
            let Some(job_id) = job_path
                .file_name()
                .and_then(|n| n.to_str())
                .map(str::to_owned)
            else {
                continue;
            };
            report.scanned_jobs += 1;

            let manifest = match read_sidecar(&job_path).await {
                Some(m) => m,
                None => {
                    report.skipped_no_sidecar += 1;
                    tracing::warn!(
                        target: "model_store",
                        job_id = %job_id,
                        "backfill: job dir has no readable manifest.json sidecar — skipping"
                    );
                    continue;
                }
            };

            self.backfill_one_job(sink_root, &job_id, &manifest, &mut report)
                .await?;
        }

        tracing::info!(
            target: "model_store",
            scanned_jobs = report.scanned_jobs,
            recorded = report.recorded,
            skipped_existing = report.skipped_existing,
            skipped_no_sidecar = report.skipped_no_sidecar,
            skipped_non_uuid = report.skipped_non_uuid,
            scan_truncated = report.scan_truncated,
            "backfill: sink-scan adopt-from-disk complete"
        );
        Ok(report)
    }

    /// Re-record any present-on-disk file declared by one job's sidecar that
    /// lacks a row. Files the sidecar declares but that are absent (or zero
    /// size) on disk are left alone — backfill adopts bytes, never fabricates.
    async fn backfill_one_job(
        &self,
        sink_root: &std::path::Path,
        job_id_str: &str,
        manifest: &crate::downloads::legibility::ManifestSidecar,
        report: &mut BackfillReport,
    ) -> JobStoreResult<()> {
        let Ok(uuid) = uuid::Uuid::parse_str(job_id_str) else {
            report.skipped_non_uuid += 1;
            tracing::warn!(
                target: "model_store",
                job_id = %job_id_str,
                "backfill: sink dir name is not a job UUID — skipping"
            );
            return Ok(());
        };
        let job_id = JobId::from_uuid(uuid);

        for filename in &manifest.files {
            // `filename` is arbitrary JSON from the sidecar — reject anything
            // that isn't a plain relative path so a `../` entry can't stat (or
            let fname = std::path::Path::new(filename.as_str());
            if fname
                .components()
                .any(|c| !matches!(c, std::path::Component::Normal(_)))
            {
                tracing::warn!(
                    target: "model_store",
                    job_id = %job_id_str,
                    filename = %filename,
                    "backfill: sidecar filename is not a plain relative path — skipping"
                );
                continue;
            }

            let path = sink_root.join(job_id_str).join(fname);
            let size = match tokio::fs::metadata(&path).await {
                Ok(meta) => meta.len(),
                Err(_) => continue,
            };
            if size == 0 {
                continue;
            }

            let artifact_id = ArtifactId::from(format!("{}#{filename}", manifest.family_id));
            if self.find_by_artifact(&artifact_id).await?.is_some() {
                report.skipped_existing += 1;
                continue;
            }

            self.record(InstalledArtifactRecord {
                artifact_id,
                family_id: FamilyId::from(manifest.family_id.clone()),
                variant_id: None,
                format: crate::normalize::classify::classify_format(filename),
                source_provider: provider_from_family(&manifest.family_id),
                source_repo: manifest.source_repo.clone(),
                source_revision: None,
                filename: filename.clone(),
                job_id,
                sha256: None,
                size_bytes: Some(size),
            })
            .await?;
            report.recorded += 1;
            tracing::info!(
                target: "model_store",
                family_id = %manifest.family_id,
                job_id = %job_id_str,
                filename = %filename,
                size_bytes = size,
                "backfill: adopted orphaned sink file into install map"
            );
        }
        Ok(())
    }
}

/// Read and parse `<job_path>/manifest.json`. Returns `None` when the sidecar
/// is absent or unparseable so the caller can skip the job without failing.
async fn read_sidecar(
    job_path: &std::path::Path,
) -> Option<crate::downloads::legibility::ManifestSidecar> {
    let path = job_path.join(crate::downloads::legibility::MANIFEST_FILENAME);
    let bytes = tokio::fs::read(&path).await.ok()?;
    serde_json::from_slice(&bytes).ok()
}

/// Derive the `source_provider` from a `{provider}:{repo}` family id, defaulting
/// to `"huggingface"` when the family id carries no provider prefix.
fn provider_from_family(family_id: &str) -> String {
    match family_id.split_once(':') {
        Some((p, _)) => p.to_owned(),
        None => {
            tracing::debug!(
                target: "model_store",
                family_id = %family_id,
                "backfill: family has no provider prefix, defaulting to huggingface"
            );
            "huggingface".to_owned()
        }
    }
}

/// Result of [`InstallMap::prune_missing`] — a revalidate sweep summary.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct PruneReport {
    /// Rows inspected against disk.
    pub checked: usize,
    /// Rows whose file was missing and were deleted (with their refs).
    pub pruned: usize,
}

/// Result of [`InstallMap::backfill_install_map_from_sink`] — a sink-scan
/// adopt-from-disk summary.
///
/// Job dirs are partitioned exactly: every counted dir lands in exactly one of
/// `skipped_no_sidecar`, `skipped_non_uuid`, or "had a readable sidecar +
/// UUID" (whose files then split across `recorded` / `skipped_existing`).
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Deserialize)]
pub struct BackfillReport {
    /// Job dirs found under the sink root and inspected.
    pub scanned_jobs: usize,
    /// Job dirs skipped because their sidecar was absent or unreadable.
    pub skipped_no_sidecar: usize,
    /// Job dirs skipped because the dir name was not a job UUID.
    pub skipped_non_uuid: usize,
    /// On-disk files (size>0) that lacked a row and were re-recorded.
    pub recorded: usize,
    /// On-disk files that already had a row and were left untouched.
    pub skipped_existing: usize,
    /// True when a mid-walk directory-read error cut the scan short — the
    /// counts reflect only what was inspected before the error, so callers can
    /// distinguish "nothing to adopt" from "scan incomplete".
    pub scan_truncated: bool,
}

/// Result of [`InstallMap::gc_artifact_if_unreferenced`].
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct GcOutcome {
    /// Whether the artifact rows + on-disk files were deleted.
    pub deleted: bool,
    /// Bytes reclaimed from disk (0 when retained or already absent).
    pub freed_bytes: u64,
}

impl GcOutcome {
    #[must_use]
    fn retained() -> Self {
        Self {
            deleted: false,
            freed_bytes: 0,
        }
    }
}

/// Recursively sum the size of every file under `dir`. Missing dir → 0.
async fn dir_size_bytes(dir: &std::path::Path) -> u64 {
    let mut total: u64 = 0;
    let mut stack = vec![dir.to_path_buf()];
    while let Some(current) = stack.pop() {
        let Ok(mut entries) = tokio::fs::read_dir(&current).await else {
            continue;
        };
        while let Ok(Some(entry)) = entries.next_entry().await {
            let Ok(meta) = entry.metadata().await else {
                continue;
            };
            if meta.is_dir() {
                stack.push(entry.path());
            } else {
                total = total.saturating_add(meta.len());
            }
        }
    }
    total
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
        layer_count: r.get::<Option<i64>, _>("layer_count").map(|v| v as u32),
        max_context: r.get::<Option<i64>, _>("max_context").map(|v| v as u32),
        architecture: r.get("architecture"),
        hidden_size: r.get::<Option<i64>, _>("hidden_size").map(|v| v as u32),
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
        for stmt in
            include_str!("../../../../migrations/015_installed_artifact_extraction_metadata.sql")
                .split(';')
        {
            let trimmed = stmt.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&pool).await.unwrap();
        }
        for stmt in include_str!("../../../../migrations/021_installed_artifact_moe_metadata.sql")
            .split(';')
        {
            let trimmed = stmt.trim();
            if trimmed.is_empty() {
                continue;
            }
            sqlx::query(trimmed).execute(&pool).await.unwrap();
        }
        for stmt in
            include_str!("../../../../migrations/022_model_store_artifact_refs.sql").split(';')
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
        map.record(sample(
            "hf:a/mixtral#file",
            "hf:a/mixtral",
            Some("hf:a/mixtral@Q4"),
        ))
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

    /// Build an install-map row for a known job_id and write a real file into
    /// `<sink_root>/<job_id>/<filename>` so GC has bytes to free.
    async fn seed_install(
        map: &InstallMap,
        sink_root: &std::path::Path,
        family: &str,
        job_id: &str,
        filename: &str,
        contents: &[u8],
    ) {
        let record = InstalledArtifactRecord {
            artifact_id: ArtifactId::from(format!("{family}#{filename}")),
            family_id: FamilyId::from(family),
            variant_id: None,
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: Some("main".into()),
            filename: filename.into(),
            job_id: JobId::from_uuid(uuid::Uuid::parse_str(job_id).unwrap()),
            sha256: None,
            size_bytes: Some(contents.len() as u64),
        };
        map.record(record).await.unwrap();
        let dir = sink_root.join(job_id);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join(filename), contents)
            .await
            .unwrap();
    }

    const JOB_A: &str = "00000000-0000-7000-8000-00000000000a";

    #[tokio::test]
    async fn add_ref_is_idempotent_and_refcount_counts_distinct_extensions() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.add_ref(JOB_A, "ext.one").await.unwrap();
        map.add_ref(JOB_A, "ext.one").await.unwrap();
        map.add_ref(JOB_A, "ext.two").await.unwrap();
        assert_eq!(map.refcount(JOB_A).await.unwrap(), 2);
    }

    #[tokio::test]
    async fn refs_for_extension_lists_only_that_extensions_jobs() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let job_b = "00000000-0000-7000-8000-00000000000b";
        map.add_ref(JOB_A, "ext.one").await.unwrap();
        map.add_ref(job_b, "ext.two").await.unwrap();
        let one = map.refs_for_extension("ext.one").await.unwrap();
        assert_eq!(one, vec![JOB_A.to_string()]);
    }

    /// AC-4.3 — two extensions installing the same family share ONE artifact
    /// (job_id) on disk and produce TWO refs.
    #[tokio::test]
    async fn two_extensions_same_family_one_artifact_two_refs() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(
            &map,
            sink_root,
            "hf:a/shared",
            JOB_A,
            "model.gguf",
            b"weights",
        )
        .await;
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();
        map.add_ref(JOB_A, "ext.beta").await.unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/shared"))
            .await
            .unwrap();
        assert_eq!(rows.len(), 1, "single artifact row on disk for the family");
        assert_eq!(rows[0].job_id, JOB_A);
        assert_eq!(map.refcount(JOB_A).await.unwrap(), 2, "two refs");
    }

    /// AC-4.4 — refcount > 0 deletes neither rows nor files.
    #[tokio::test]
    async fn gc_retains_when_referenced() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(
            &map,
            sink_root,
            "hf:a/keep",
            JOB_A,
            "model.gguf",
            b"weights",
        )
        .await;
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();

        let outcome = map
            .gc_artifact_if_unreferenced(JOB_A, sink_root)
            .await
            .unwrap();
        assert!(!outcome.deleted);
        assert_eq!(outcome.freed_bytes, 0);
        assert!(sink_root.join(JOB_A).join("model.gguf").exists());
        assert_eq!(
            map.list_for_family(&FamilyId::from("hf:a/keep"))
                .await
                .unwrap()
                .len(),
            1
        );
    }

    /// AC-4.4 — refcount == 0 deletes both rows and on-disk files, reports bytes.
    #[tokio::test]
    async fn gc_deletes_when_unreferenced() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let payload = b"some-weights-bytes";
        seed_install(&map, sink_root, "hf:a/gone", JOB_A, "model.gguf", payload).await;
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();
        let dropped = map.remove_refs_for_extension("ext.alpha").await.unwrap();
        assert_eq!(dropped, vec![JOB_A.to_string()]);

        let outcome = map
            .gc_artifact_if_unreferenced(JOB_A, sink_root)
            .await
            .unwrap();
        assert!(outcome.deleted);
        assert_eq!(outcome.freed_bytes, payload.len() as u64);
        assert!(!sink_root.join(JOB_A).exists());
        assert!(
            map.list_for_family(&FamilyId::from("hf:a/gone"))
                .await
                .unwrap()
                .is_empty()
        );
    }

    /// Forced-reinstall purge — `remove_ref` drops just one holder's ref. An
    /// exclusively-owned family is then GC-deletable (delete + fresh download);
    /// a shared family survives because the other extension still references it.
    #[tokio::test]
    async fn remove_ref_then_gc_deletes_exclusive_keeps_shared() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        // Exclusive family: only ext.alpha references it.
        seed_install(&map, sink_root, "hf:a/solo", JOB_A, "solo.gguf", b"solo").await;
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();

        // Shared family: both ext.alpha and ext.beta reference it.
        let job_shared = "00000000-0000-0000-0000-0000000000bb";
        seed_install(
            &map,
            sink_root,
            "hf:a/shared",
            job_shared,
            "shared.gguf",
            b"shared",
        )
        .await;
        map.add_ref(job_shared, "ext.alpha").await.unwrap();
        map.add_ref(job_shared, "ext.beta").await.unwrap();

        // ext.alpha reinstalls both families: drop its ref, GC each.
        for job in [JOB_A, job_shared] {
            map.remove_ref(job, "ext.alpha").await.unwrap();
            map.gc_artifact_if_unreferenced(job, sink_root)
                .await
                .unwrap();
        }

        // Exclusive copy is gone (will be re-downloaded fresh).
        assert!(!sink_root.join(JOB_A).exists());
        assert!(
            map.list_for_family(&FamilyId::from("hf:a/solo"))
                .await
                .unwrap()
                .is_empty()
        );
        // Shared copy survives for ext.beta; one ref remains.
        assert!(sink_root.join(job_shared).join("shared.gguf").exists());
        assert_eq!(map.refcount(job_shared).await.unwrap(), 1);
    }

    /// `remove_ref` is idempotent — dropping a ref that was never added is a
    /// no-op and never errors.
    #[tokio::test]
    async fn remove_ref_is_idempotent() {
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        map.remove_ref(JOB_A, "ext.absent").await.unwrap();
        assert_eq!(map.refcount(JOB_A).await.unwrap(), 0);
    }

    /// AC-4.6 — a legacy install-map row with NO refs is GC-eligible by
    /// refcount==0, but only via an explicit GC call (this test simulates the
    /// deliberate revalidate/uninstall path). Routine probes never call GC.
    #[tokio::test]
    async fn gc_reclaims_legacy_unreferenced_row_only_when_explicitly_invoked() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(
            &map,
            sink_root,
            "hf:a/legacy",
            JOB_A,
            "model.gguf",
            b"legacy",
        )
        .await;

        assert_eq!(
            map.refcount(JOB_A).await.unwrap(),
            0,
            "legacy row has no refs"
        );
        assert!(
            sink_root.join(JOB_A).join("model.gguf").exists(),
            "legacy row + files survive until an explicit GC sweep"
        );

        let outcome = map
            .gc_artifact_if_unreferenced(JOB_A, sink_root)
            .await
            .unwrap();
        assert!(
            outcome.deleted,
            "explicit GC reclaims the unreferenced legacy row"
        );
    }

    /// AC-1.1/1.2 — a row whose on-disk file is gone reconciles to `false` and
    /// the install-map row is deleted (self-heal).
    #[tokio::test]
    async fn reconcile_deletes_row_when_file_missing() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(&map, sink_root, "hf:a/gone", JOB_A, "model.gguf", b"w").await;
        tokio::fs::remove_dir_all(sink_root.join(JOB_A))
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/gone"))
            .await
            .unwrap();
        let present = map
            .reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert!(!present, "missing file reconciles to absent");
        assert!(
            map.list_for_family(&FamilyId::from("hf:a/gone"))
                .await
                .unwrap()
                .is_empty(),
            "stale row deleted"
        );
    }

    /// AC-7.2 — self-heal of a vanished row also prunes its `index.json` entry.
    #[tokio::test]
    async fn reconcile_prunes_index_entry_on_self_heal() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(&map, sink_root, "hf:a/gone", JOB_A, "model.gguf", b"w").await;
        crate::downloads::legibility::upsert_index_entry(
            sink_root,
            JOB_A,
            crate::downloads::legibility::IndexEntry {
                family_id: "hf:a/gone".into(),
                repo: "a/gone".into(),
            },
        )
        .await
        .unwrap();
        tokio::fs::remove_dir_all(sink_root.join(JOB_A))
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/gone"))
            .await
            .unwrap();
        map.reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        let index = crate::downloads::legibility::read_index(sink_root)
            .await
            .unwrap();
        assert!(
            index.get(JOB_A).is_none(),
            "index entry pruned on self-heal"
        );
    }

    /// AC-7.2 — refcount==0 GC also prunes the `index.json` entry.
    #[tokio::test]
    async fn gc_prunes_index_entry_when_unreferenced() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(&map, sink_root, "hf:a/gone", JOB_A, "model.gguf", b"w").await;
        crate::downloads::legibility::upsert_index_entry(
            sink_root,
            JOB_A,
            crate::downloads::legibility::IndexEntry {
                family_id: "hf:a/gone".into(),
                repo: "a/gone".into(),
            },
        )
        .await
        .unwrap();

        let outcome = map
            .gc_artifact_if_unreferenced(JOB_A, sink_root)
            .await
            .unwrap();
        assert!(outcome.deleted);
        let index = crate::downloads::legibility::read_index(sink_root)
            .await
            .unwrap();
        assert!(index.get(JOB_A).is_none(), "index entry pruned on GC");
    }

    /// AC-1.1 — a row whose file is present reconciles to `true` and is kept.
    #[tokio::test]
    async fn reconcile_keeps_row_when_file_present() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(&map, sink_root, "hf:a/keep", JOB_A, "model.gguf", b"w").await;

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/keep"))
            .await
            .unwrap();
        let present = map
            .reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert!(present);
        assert_eq!(
            map.list_for_family(&FamilyId::from("hf:a/keep"))
                .await
                .unwrap()
                .len(),
            1
        );
    }

    /// AC-1.3 — self-heal also drops the row's artifact-refs (no orphan refs).
    #[tokio::test]
    async fn reconcile_removes_refs_on_self_heal() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_install(&map, sink_root, "hf:a/gone", JOB_A, "model.gguf", b"w").await;
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();
        tokio::fs::remove_dir_all(sink_root.join(JOB_A))
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/gone"))
            .await
            .unwrap();
        map.reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert_eq!(
            map.refcount(JOB_A).await.unwrap(),
            0,
            "no orphan refs after self-heal"
        );
    }

    /// AC-2.1/2.4 — prune_missing sweeps all rows, reports `{checked, pruned}`,
    /// and is idempotent (a second sweep prunes 0).
    #[tokio::test]
    async fn prune_missing_sweeps_and_is_idempotent() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let job_b = "00000000-0000-7000-8000-00000000000b";
        seed_install(&map, sink_root, "hf:a/keep", JOB_A, "keep.gguf", b"w").await;
        seed_install(&map, sink_root, "hf:a/gone", job_b, "gone.gguf", b"w").await;
        tokio::fs::remove_dir_all(sink_root.join(job_b))
            .await
            .unwrap();

        let first = map.prune_missing(sink_root).await.unwrap();
        assert_eq!(first.checked, 2);
        assert_eq!(first.pruned, 1);

        let second = map.prune_missing(sink_root).await.unwrap();
        assert_eq!(second.checked, 1, "kept row remains");
        assert_eq!(second.pruned, 0, "idempotent — nothing left to prune");
    }

    /// Write a job dir with files on disk and a valid `manifest.json` sidecar
    /// but NO install-map rows — the "bytes survived, rows lost" state the
    /// backfill heals.
    async fn seed_orphan_sink_job(
        sink_root: &std::path::Path,
        family: &str,
        job_id: &str,
        files: &[(&str, &[u8])],
    ) {
        let dir = sink_root.join(job_id);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        for (name, contents) in files {
            let path = dir.join(name);
            if let Some(parent) = path.parent() {
                tokio::fs::create_dir_all(parent).await.unwrap();
            }
            tokio::fs::write(&path, contents).await.unwrap();
        }
        let repo = family.split_once(':').map(|(_, r)| r).unwrap_or(family);
        let manifest = crate::downloads::legibility::ManifestSidecar {
            family_id: family.to_owned(),
            source_repo: repo.to_owned(),
            accelerator: None,
            files: files.iter().map(|(n, _)| (*n).to_owned()).collect(),
            created_at: "2026-06-16T00:00:00Z".to_owned(),
        };
        crate::downloads::legibility::write_manifest(sink_root, job_id, &manifest)
            .await
            .unwrap();
    }

    /// Backfill re-records an install-map row for an on-disk sink file that has
    /// no row, deriving family/repo from the sidecar and size from disk. The
    /// artifact_id matches the `{family_id}#{filename}` form `find_by_artifact`
    /// (and the verify path) queries.
    #[tokio::test]
    async fn backfill_records_row_for_orphaned_sink_file() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("t2v.safetensors", b"weights-bytes")],
        )
        .await;

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.recorded, 1, "one orphaned file adopted");
        assert!(report.scanned_jobs >= 1);

        let row = map
            .find_by_artifact(&ArtifactId::from("huggingface:Owner/Repo#t2v.safetensors"))
            .await
            .unwrap()
            .expect("backfill recorded a row");
        assert_eq!(row.family_id, "huggingface:Owner/Repo");
        assert_eq!(row.source_repo, "Owner/Repo");
        assert_eq!(row.filename, "t2v.safetensors");
        assert_eq!(row.job_id, JOB_A);
        assert_eq!(row.size_bytes, Some(b"weights-bytes".len() as u64));
    }

    /// Backfill is idempotent — a second run records nothing.
    #[tokio::test]
    async fn backfill_is_idempotent() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("t2v.safetensors", b"weights")],
        )
        .await;

        let first = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(first.recorded, 1);
        let second = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(second.recorded, 0, "idempotent — nothing new to record");
        assert_eq!(second.skipped_existing, 1, "the file already has a row");
    }

    /// A file that already has an install-map row is left untouched (not
    /// re-recorded), even when re-running the backfill.
    #[tokio::test]
    async fn backfill_leaves_existing_rows_untouched() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        // A genuine prior install: row + file + sidecar all present.
        seed_install(
            &map,
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            "i2v.safetensors",
            b"i2v-weights",
        )
        .await;
        let manifest = crate::downloads::legibility::ManifestSidecar {
            family_id: "huggingface:Owner/Repo".into(),
            source_repo: "Owner/Repo".into(),
            accelerator: None,
            files: vec!["i2v.safetensors".into()],
            created_at: "2026-06-16T00:00:00Z".into(),
        };
        crate::downloads::legibility::write_manifest(sink_root, JOB_A, &manifest)
            .await
            .unwrap();

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.recorded, 0, "existing row not re-recorded");
        assert_eq!(report.skipped_existing, 1);
    }

    /// A job dir with no sidecar (or a corrupt one) is skipped without failing
    /// the whole scan — other valid jobs still get backfilled.
    #[tokio::test]
    async fn backfill_skips_jobs_without_or_with_corrupt_sidecar() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        // Job with no sidecar at all.
        let job_no_sidecar = "00000000-0000-7000-8000-00000000000b";
        let dir = sink_root.join(job_no_sidecar);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("loose.safetensors"), b"x")
            .await
            .unwrap();

        // Job with a corrupt sidecar.
        let job_corrupt = "00000000-0000-7000-8000-00000000000c";
        let dir_c = sink_root.join(job_corrupt);
        tokio::fs::create_dir_all(&dir_c).await.unwrap();
        tokio::fs::write(dir_c.join("loose.safetensors"), b"x")
            .await
            .unwrap();
        tokio::fs::write(
            dir_c.join(crate::downloads::legibility::MANIFEST_FILENAME),
            b"{ this is not valid json",
        )
        .await
        .unwrap();

        // A valid job alongside the broken ones.
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("t2v.safetensors", b"weights")],
        )
        .await;

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.recorded, 1, "only the valid job is adopted");
        assert_eq!(
            report.skipped_no_sidecar, 2,
            "missing + corrupt sidecars both skipped"
        );
        // The valid job's row exists; the broken jobs' files have no rows.
        assert!(
            map.find_by_artifact(&ArtifactId::from("huggingface:Owner/Repo#t2v.safetensors"))
                .await
                .unwrap()
                .is_some()
        );
    }

    /// A zero-size on-disk file is NOT adopted (a truncated/empty file is not a
    /// real install).
    #[tokio::test]
    async fn backfill_ignores_zero_size_files() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("empty.safetensors", b"")],
        )
        .await;

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.recorded, 0, "zero-size file is not a real install");
        assert!(
            map.find_by_artifact(&ArtifactId::from(
                "huggingface:Owner/Repo#empty.safetensors"
            ))
            .await
            .unwrap()
            .is_none()
        );
    }

    /// A sidecar that declares a file which is NOT on disk does not fabricate a
    /// row — backfill only adopts bytes that physically exist.
    #[tokio::test]
    async fn backfill_does_not_record_declared_but_absent_files() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        // Sidecar declares two files but only one is on disk.
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("present.safetensors"), b"weights")
            .await
            .unwrap();
        let manifest = crate::downloads::legibility::ManifestSidecar {
            family_id: "huggingface:Owner/Repo".into(),
            source_repo: "Owner/Repo".into(),
            accelerator: None,
            files: vec!["present.safetensors".into(), "absent.safetensors".into()],
            created_at: "2026-06-16T00:00:00Z".into(),
        };
        crate::downloads::legibility::write_manifest(sink_root, JOB_A, &manifest)
            .await
            .unwrap();

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.recorded, 1, "only the present file is adopted");
        assert!(
            map.find_by_artifact(&ArtifactId::from(
                "huggingface:Owner/Repo#absent.safetensors"
            ))
            .await
            .unwrap()
            .is_none(),
            "declared-but-absent file must not be fabricated"
        );
    }

    /// A sidecar filename with a `..` (or absolute) component is rejected: no
    /// row is recorded and no metadata() is performed outside the sink.
    #[tokio::test]
    async fn backfill_rejects_path_traversal_filename() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path().join("sink");
        tokio::fs::create_dir_all(&sink_root).await.unwrap();
        // A real "secret" file one level above the sink that a `../` entry
        // would otherwise reach.
        tokio::fs::write(tmp.path().join("secret.bin"), b"do-not-adopt")
            .await
            .unwrap();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        // Sidecar declares a traversal path plus a legitimate sibling file.
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("good.safetensors"), b"weights")
            .await
            .unwrap();
        let manifest = crate::downloads::legibility::ManifestSidecar {
            family_id: "huggingface:Owner/Repo".into(),
            source_repo: "Owner/Repo".into(),
            accelerator: None,
            files: vec!["../secret.bin".into(), "good.safetensors".into()],
            created_at: "2026-06-16T00:00:00Z".into(),
        };
        crate::downloads::legibility::write_manifest(&sink_root, JOB_A, &manifest)
            .await
            .unwrap();

        let report = map
            .backfill_install_map_from_sink(&sink_root)
            .await
            .unwrap();
        assert_eq!(report.recorded, 1, "only the in-sink file is adopted");
        // The traversal entry produced no row under any plausible artifact id.
        assert!(
            map.find_by_artifact(&ArtifactId::from("huggingface:Owner/Repo#../secret.bin"))
                .await
                .unwrap()
                .is_none(),
            "traversal filename must not be recorded"
        );
        assert!(
            map.find_by_artifact(&ArtifactId::from("huggingface:Owner/Repo#good.safetensors"))
                .await
                .unwrap()
                .is_some()
        );
    }

    /// A sink dir whose name is not a job UUID is counted as `skipped_non_uuid`
    /// (not silently dropped), keeping the report self-consistent:
    /// `scanned_jobs == skipped_no_sidecar + skipped_non_uuid + jobs-processed`.
    #[tokio::test]
    async fn backfill_counts_non_uuid_dir_and_report_is_self_consistent() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        // A non-UUID dir that nonetheless has a valid sidecar (so it passes the
        // sidecar gate and reaches the UUID check).
        let bad_dir = sink_root.join("not-a-uuid");
        tokio::fs::create_dir_all(&bad_dir).await.unwrap();
        tokio::fs::write(bad_dir.join("x.safetensors"), b"weights")
            .await
            .unwrap();
        let manifest = crate::downloads::legibility::ManifestSidecar {
            family_id: "huggingface:Owner/Repo".into(),
            source_repo: "Owner/Repo".into(),
            accelerator: None,
            files: vec!["x.safetensors".into()],
            created_at: "2026-06-16T00:00:00Z".into(),
        };
        crate::downloads::legibility::write_manifest(sink_root, "not-a-uuid", &manifest)
            .await
            .unwrap();

        // A valid orphaned job alongside it.
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("t2v.safetensors", b"weights")],
        )
        .await;

        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert_eq!(report.scanned_jobs, 2);
        assert_eq!(report.skipped_non_uuid, 1, "the non-uuid dir is counted");
        assert_eq!(report.recorded, 1, "the valid job is adopted");
        assert!(!report.scan_truncated, "clean scan is not truncated");
        // Partition invariant: every scanned dir is accounted for exactly once.
        // The valid job had a readable sidecar + UUID (1 processed dir); the
        let processed_dirs =
            report.scanned_jobs - report.skipped_no_sidecar - report.skipped_non_uuid;
        assert_eq!(processed_dirs, 1, "exactly one dir reached file processing");
    }

    /// A clean scan reports `scan_truncated = false`.
    #[tokio::test]
    async fn backfill_clean_scan_is_not_truncated() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        seed_orphan_sink_job(
            sink_root,
            "huggingface:Owner/Repo",
            JOB_A,
            &[("t2v.safetensors", b"weights")],
        )
        .await;
        let report = map.backfill_install_map_from_sink(sink_root).await.unwrap();
        assert!(!report.scan_truncated);
    }

    /// A row whose on-disk file is shorter than `size_bytes` reconciles to
    /// `false` and is pruned (the DGX i2v-low truncated-blob scenario).
    #[tokio::test]
    async fn reconcile_prunes_row_when_file_truncated() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        let real_contents: &[u8] = b"short";
        let big_expected: u64 = 1_000_000;
        let record = InstalledArtifactRecord {
            artifact_id: ArtifactId::from("hf:a/trunc#model.gguf"),
            family_id: FamilyId::from("hf:a/trunc"),
            variant_id: None,
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: None,
            filename: "model.gguf".into(),
            job_id: JobId::from_uuid(uuid::Uuid::parse_str(JOB_A).unwrap()),
            sha256: None,
            size_bytes: Some(big_expected),
        };
        map.record(record).await.unwrap();
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("model.gguf"), real_contents)
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/trunc"))
            .await
            .unwrap();
        assert_eq!(rows.len(), 1);
        let present = map
            .reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert!(!present, "truncated blob reconciles to absent");
        assert!(
            map.list_for_family(&FamilyId::from("hf:a/trunc"))
                .await
                .unwrap()
                .is_empty(),
            "truncated row deleted"
        );
    }

    /// A row whose on-disk file size exactly matches `size_bytes` keeps the row.
    #[tokio::test]
    async fn reconcile_keeps_row_when_size_matches() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);
        let contents: &[u8] = b"exact-weights";
        seed_install(&map, sink_root, "hf:a/exact", JOB_A, "model.gguf", contents).await;

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/exact"))
            .await
            .unwrap();
        let present = map
            .reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert!(present, "size-matching file reconciles to present");
        assert_eq!(
            map.list_for_family(&FamilyId::from("hf:a/exact"))
                .await
                .unwrap()
                .len(),
            1
        );
    }

    /// A row with `size_bytes = None` falls back to presence-only: file exists →
    /// returns `true` regardless of size.
    #[tokio::test]
    async fn reconcile_keeps_row_when_size_unknown() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        let record = InstalledArtifactRecord {
            artifact_id: ArtifactId::from("hf:a/nosize#model.gguf"),
            family_id: FamilyId::from("hf:a/nosize"),
            variant_id: None,
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: None,
            filename: "model.gguf".into(),
            job_id: JobId::from_uuid(uuid::Uuid::parse_str(JOB_A).unwrap()),
            sha256: None,
            size_bytes: None,
        };
        map.record(record).await.unwrap();
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("model.gguf"), b"any-bytes")
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/nosize"))
            .await
            .unwrap();
        let present = map
            .reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert!(present, "unknown size falls back to presence-only");
        assert_eq!(
            map.list_for_family(&FamilyId::from("hf:a/nosize"))
                .await
                .unwrap()
                .len(),
            1
        );
    }

    /// Truncation prune also cleans up the row's `index.json` entry, mirroring
    /// the missing-file self-heal path.
    #[tokio::test]
    async fn reconcile_prunes_index_entry_on_truncation() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        let record = InstalledArtifactRecord {
            artifact_id: ArtifactId::from("hf:a/trunc3#model.gguf"),
            family_id: FamilyId::from("hf:a/trunc3"),
            variant_id: None,
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: None,
            filename: "model.gguf".into(),
            job_id: JobId::from_uuid(uuid::Uuid::parse_str(JOB_A).unwrap()),
            sha256: None,
            size_bytes: Some(1_000_000),
        };
        map.record(record).await.unwrap();
        crate::downloads::legibility::upsert_index_entry(
            sink_root,
            JOB_A,
            crate::downloads::legibility::IndexEntry {
                family_id: "hf:a/trunc3".into(),
                repo: "a/trunc3".into(),
            },
        )
        .await
        .unwrap();
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("model.gguf"), b"short")
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/trunc3"))
            .await
            .unwrap();
        map.reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        let index = crate::downloads::legibility::read_index(sink_root)
            .await
            .unwrap();
        assert!(
            index.get(JOB_A).is_none(),
            "index entry pruned on truncation prune"
        );
    }

    /// Truncation prune also drops the row's artifact-refs (no orphan refs).
    #[tokio::test]
    async fn reconcile_removes_refs_on_truncation_prune() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let pool = memory_pool().await;
        let map = InstallMap::new(pool);

        let record = InstalledArtifactRecord {
            artifact_id: ArtifactId::from("hf:a/trunc2#model.gguf"),
            family_id: FamilyId::from("hf:a/trunc2"),
            variant_id: None,
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            source_revision: None,
            filename: "model.gguf".into(),
            job_id: JobId::from_uuid(uuid::Uuid::parse_str(JOB_A).unwrap()),
            sha256: None,
            size_bytes: Some(999_999),
        };
        map.record(record).await.unwrap();
        map.add_ref(JOB_A, "ext.alpha").await.unwrap();
        let dir = sink_root.join(JOB_A);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("model.gguf"), b"truncated")
            .await
            .unwrap();

        let rows = map
            .list_for_family(&FamilyId::from("hf:a/trunc2"))
            .await
            .unwrap();
        map.reconcile_row_present(&rows[0], sink_root)
            .await
            .unwrap();
        assert_eq!(
            map.refcount(JOB_A).await.unwrap(),
            0,
            "no orphan refs after truncation prune"
        );
    }
}
