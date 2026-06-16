//! SQLite-backed persistence for `download_jobs` + `download_job_artifacts`
//! (migration `013_model_store_download_jobs.sql`).
//!
//! The store owns the rows; the [`crate::downloads::orchestrator`] owns
//! the execution semaphore and worker lifecycle. They interact only
//! through this type — no shared mutable state.

use std::sync::Arc;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use crate::ids::{ArtifactId, FamilyId, JobId};
use crate::types::{DependencyRole, DownloadState};

/// Request shape handed to [`JobStore::create`]. Built via
/// [`CreateJobParams::builder`] per Principle XI (builder pattern).
#[derive(Debug, Clone)]
pub struct CreateJobParams {
    pub family_id: FamilyId,
    pub source_provider: String,
    pub source_repo: String,
    pub requested_kind: RequestedKind,
    pub include_dependencies: bool,
    pub targets: Vec<JobTargetInput>,
}

impl CreateJobParams {
    #[must_use]
    pub fn builder(
        family_id: FamilyId,
        source_provider: impl Into<String>,
        source_repo: impl Into<String>,
        requested_kind: RequestedKind,
    ) -> CreateJobParamsBuilder {
        CreateJobParamsBuilder {
            family_id,
            source_provider: source_provider.into(),
            source_repo: source_repo.into(),
            requested_kind,
            include_dependencies: false,
            targets: Vec::new(),
        }
    }
}

pub struct CreateJobParamsBuilder {
    family_id: FamilyId,
    source_provider: String,
    source_repo: String,
    requested_kind: RequestedKind,
    include_dependencies: bool,
    targets: Vec<JobTargetInput>,
}

impl CreateJobParamsBuilder {
    #[must_use]
    pub fn include_dependencies(mut self, yes: bool) -> Self {
        self.include_dependencies = yes;
        self
    }

    #[must_use]
    pub fn target(mut self, target: JobTargetInput) -> Self {
        self.targets.push(target);
        self
    }

    #[must_use]
    pub fn targets(mut self, targets: impl IntoIterator<Item = JobTargetInput>) -> Self {
        self.targets.extend(targets);
        self
    }

    #[must_use]
    pub fn build(self) -> CreateJobParams {
        CreateJobParams {
            family_id: self.family_id,
            source_provider: self.source_provider,
            source_repo: self.source_repo,
            requested_kind: self.requested_kind,
            include_dependencies: self.include_dependencies,
            targets: self.targets,
        }
    }
}

/// The three request kinds accepted by `POST /model-store/downloads`.
/// Matches `data-model.md §1.8` + Clarify Q1 v1 action set.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RequestedKind {
    Primary,
    Variant,
    Bundle,
}

impl RequestedKind {
    fn as_str(self) -> &'static str {
        match self {
            Self::Primary => "primary",
            Self::Variant => "variant",
            Self::Bundle => "bundle",
        }
    }

    fn parse(s: &str) -> Option<Self> {
        match s {
            "primary" => Some(Self::Primary),
            "variant" => Some(Self::Variant),
            "bundle" => Some(Self::Bundle),
            _ => None,
        }
    }
}

/// One concrete file the orchestrator is going to stream to disk.
#[derive(Debug, Clone)]
pub struct JobTargetInput {
    pub artifact_id: ArtifactId,
    pub filename: String,
    pub role: DependencyRole,
    pub download_url: String,
    pub expected_bytes: Option<u64>,
    pub sha256: Option<String>,
}

/// In-memory snapshot of a persisted job, produced by
/// [`JobStore::get`] / [`JobStore::list_non_terminal`].
#[derive(Debug, Clone, Serialize)]
pub struct PersistedJob {
    pub job_id: JobId,
    pub family_id: FamilyId,
    pub source_provider: String,
    pub source_repo: String,
    pub requested_kind: RequestedKind,
    pub include_dependencies: bool,
    pub state: DownloadState,
    pub progress_bytes: u64,
    pub total_bytes: Option<u64>,
    pub error_reason: Option<String>,
    pub warnings: Vec<String>,
    pub created_at: DateTime<Utc>,
    pub started_at: Option<DateTime<Utc>>,
    pub finished_at: Option<DateTime<Utc>>,
    pub targets: Vec<PersistedTarget>,
}

#[derive(Debug, Clone, Serialize)]
pub struct PersistedTarget {
    pub artifact_id: ArtifactId,
    pub filename: String,
    pub role: DependencyRole,
    pub download_url: String,
    pub expected_bytes: Option<u64>,
    pub downloaded_bytes: u64,
    pub sha256: Option<String>,
    pub state: TargetState,
}

#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TargetState {
    Queued,
    Downloading,
    Downloaded,
    Failed,
    Skipped,
}

impl TargetState {
    fn as_str(self) -> &'static str {
        match self {
            Self::Queued => "queued",
            Self::Downloading => "downloading",
            Self::Downloaded => "downloaded",
            Self::Failed => "failed",
            Self::Skipped => "skipped",
        }
    }

    fn parse(s: &str) -> Option<Self> {
        match s {
            "queued" => Some(Self::Queued),
            "downloading" => Some(Self::Downloading),
            "downloaded" => Some(Self::Downloaded),
            "failed" => Some(Self::Failed),
            "skipped" => Some(Self::Skipped),
            _ => None,
        }
    }
}

fn state_as_str(s: DownloadState) -> &'static str {
    match s {
        DownloadState::Queued => "queued",
        DownloadState::Downloading => "downloading",
        DownloadState::Paused => "paused",
        DownloadState::Downloaded => "downloaded",
        DownloadState::Failed => "failed",
        DownloadState::Incompatible => "incompatible",
        DownloadState::AuthRequired => "auth_required",
        _ => "queued",
    }
}

fn parse_state(s: &str) -> DownloadState {
    match s {
        "queued" => DownloadState::Queued,
        "downloading" => DownloadState::Downloading,
        "paused" => DownloadState::Paused,
        "downloaded" => DownloadState::Downloaded,
        "failed" => DownloadState::Failed,
        "incompatible" => DownloadState::Incompatible,
        "auth_required" => DownloadState::AuthRequired,
        _ => DownloadState::Queued,
    }
}

/// Typed errors surfaced from the store layer. The HTTP layer maps
/// these onto appropriate status codes.
#[derive(Debug, thiserror::Error)]
pub enum JobStoreError {
    #[error("database error: {0}")]
    Db(#[from] sqlx::Error),
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
    #[error("job not found: {0}")]
    NotFound(String),
    #[error("duplicate job: existing_job_id={0}")]
    Duplicate(JobId),
}

pub type JobStoreResult<T> = Result<T, JobStoreError>;

/// SQLite-backed job repository.
#[derive(Clone)]
pub struct JobStore {
    pool: Arc<SqlitePool>,
}

impl JobStore {
    #[must_use]
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    /// Signature for duplicate detection (FR-085). Any change in the
    /// form should be reflected in T-J3 contract test.
    fn target_signature(params: &CreateJobParams) -> String {
        let kind = params.requested_kind.as_str();
        let key = params
            .targets
            .first()
            .map(|t| t.artifact_id.as_str())
            .unwrap_or("");
        format!("{}|{}|{}", kind, params.include_dependencies, key)
    }

    /// Return the non-terminal job that already matches this request,
    /// if any — used to convert re-clicks into idempotent no-ops.
    pub async fn find_active_duplicate(
        &self,
        params: &CreateJobParams,
    ) -> JobStoreResult<Option<JobId>> {
        let sig = Self::target_signature(params);
        let family = params.family_id.as_str();
        let rows = sqlx::query(
            "SELECT j.job_id
             FROM download_jobs j
             LEFT JOIN download_job_artifacts a ON a.job_id = j.job_id
             WHERE j.family_id = ?1
               AND j.state IN ('queued', 'downloading', 'paused')
               AND j.requested_kind = ?2
               AND j.include_dependencies = ?3
             GROUP BY j.job_id
             HAVING MIN(a.artifact_id) = ?4 OR ?4 = ''
             LIMIT 1",
        )
        .bind(family)
        .bind(params.requested_kind.as_str())
        .bind(params.include_dependencies as i32)
        .bind(
            params
                .targets
                .first()
                .map(|t| t.artifact_id.as_str())
                .unwrap_or(""),
        )
        .fetch_optional(self.pool.as_ref())
        .await?;

        let _ = sig;
        if let Some(row) = rows {
            let id: String = row.try_get("job_id")?;
            let uuid = uuid::Uuid::parse_str(&id)
                .map_err(|e| JobStoreError::Db(sqlx::Error::Decode(Box::new(e))))?;
            Ok(Some(JobId::from_uuid(uuid)))
        } else {
            Ok(None)
        }
    }

    /// Create a new job in state `queued` with all target rows in
    /// state `queued`. Caller decides whether to enqueue the returned
    /// `JobId` on the orchestrator.
    pub async fn create(&self, params: CreateJobParams) -> JobStoreResult<PersistedJob> {
        if let Some(existing) = self.find_active_duplicate(&params).await? {
            return Err(JobStoreError::Duplicate(existing));
        }

        let job_id = JobId::new();
        let now = Utc::now();
        let now_iso = now.to_rfc3339();
        let total: Option<i64> = {
            let sum: u64 = params.targets.iter().filter_map(|t| t.expected_bytes).sum();
            if sum == 0 {
                None
            } else {
                i64::try_from(sum).ok()
            }
        };

        let mut tx = self.pool.begin().await?;

        sqlx::query(
            "INSERT INTO download_jobs (
                job_id, family_id, source_provider, source_repo, requested_kind,
                include_dependencies, state, progress_bytes, total_bytes,
                error_reason, warnings_json, created_at, started_at, finished_at
             ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 0, ?8, NULL, '[]', ?9, NULL, NULL)",
        )
        .bind(job_id.to_string())
        .bind(params.family_id.as_str())
        .bind(&params.source_provider)
        .bind(&params.source_repo)
        .bind(params.requested_kind.as_str())
        .bind(params.include_dependencies as i32)
        .bind("queued")
        .bind(total)
        .bind(&now_iso)
        .execute(&mut *tx)
        .await?;

        for target in &params.targets {
            sqlx::query(
                "INSERT INTO download_job_artifacts (
                    job_id, artifact_id, filename, role, download_url,
                    expected_bytes, downloaded_bytes, sha256, state
                 ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7, 'queued')",
            )
            .bind(job_id.to_string())
            .bind(target.artifact_id.as_str())
            .bind(&target.filename)
            .bind(role_as_str(target.role))
            .bind(&target.download_url)
            .bind(target.expected_bytes.and_then(|v| i64::try_from(v).ok()))
            .bind(&target.sha256)
            .execute(&mut *tx)
            .await?;
        }
        tx.commit().await?;

        Ok(PersistedJob {
            job_id,
            family_id: params.family_id,
            source_provider: params.source_provider,
            source_repo: params.source_repo,
            requested_kind: params.requested_kind,
            include_dependencies: params.include_dependencies,
            state: DownloadState::Queued,
            progress_bytes: 0,
            total_bytes: total.and_then(|v| u64::try_from(v).ok()),
            error_reason: None,
            warnings: vec![],
            created_at: now,
            started_at: None,
            finished_at: None,
            targets: params
                .targets
                .into_iter()
                .map(|t| PersistedTarget {
                    artifact_id: t.artifact_id,
                    filename: t.filename,
                    role: t.role,
                    download_url: t.download_url,
                    expected_bytes: t.expected_bytes,
                    downloaded_bytes: 0,
                    sha256: t.sha256,
                    state: TargetState::Queued,
                })
                .collect(),
        })
    }

    /// The most-recently-created job for a family, in any state, or `None`. Used by the
    /// dep installer's cheap no-network partial-state probe to surface "what's already
    /// downloaded" without re-enumerating the upstream repo.
    pub async fn latest_for_family(&self, family_id: &FamilyId) -> JobStoreResult<Option<JobId>> {
        let row = sqlx::query(
            "SELECT job_id FROM download_jobs
             WHERE family_id = ?1
             ORDER BY created_at DESC
             LIMIT 1",
        )
        .bind(family_id.as_str())
        .fetch_optional(self.pool.as_ref())
        .await?;
        Ok(row.and_then(|r| {
            uuid::Uuid::parse_str(&r.get::<String, _>("job_id"))
                .ok()
                .map(JobId::from_uuid)
        }))
    }

    pub async fn get(&self, id: &JobId) -> JobStoreResult<Option<PersistedJob>> {
        let Some(job_row) = sqlx::query(
            "SELECT job_id, family_id, source_provider, source_repo, requested_kind,
                    include_dependencies, state, progress_bytes, total_bytes,
                    error_reason, warnings_json, created_at, started_at, finished_at
             FROM download_jobs WHERE job_id = ?1",
        )
        .bind(id.to_string())
        .fetch_optional(self.pool.as_ref())
        .await?
        else {
            return Ok(None);
        };

        let target_rows = sqlx::query(
            "SELECT artifact_id, filename, role, download_url, expected_bytes,
                    downloaded_bytes, sha256, state
             FROM download_job_artifacts WHERE job_id = ?1",
        )
        .bind(id.to_string())
        .fetch_all(self.pool.as_ref())
        .await?;

        let targets = target_rows
            .into_iter()
            .map(|r| PersistedTarget {
                artifact_id: ArtifactId::from(r.get::<String, _>("artifact_id")),
                filename: r.get::<String, _>("filename"),
                role: role_from_str(&r.get::<String, _>("role")),
                download_url: r.get::<String, _>("download_url"),
                expected_bytes: r
                    .get::<Option<i64>, _>("expected_bytes")
                    .and_then(|v| u64::try_from(v).ok()),
                downloaded_bytes: u64::try_from(r.get::<i64, _>("downloaded_bytes")).unwrap_or(0),
                sha256: r.get::<Option<String>, _>("sha256"),
                state: TargetState::parse(&r.get::<String, _>("state"))
                    .unwrap_or(TargetState::Queued),
            })
            .collect();

        let warnings_json: String = job_row.get("warnings_json");
        let warnings: Vec<String> = serde_json::from_str(&warnings_json).unwrap_or_default();

        Ok(Some(PersistedJob {
            job_id: *id,
            family_id: FamilyId::from(job_row.get::<String, _>("family_id")),
            source_provider: job_row.get("source_provider"),
            source_repo: job_row.get("source_repo"),
            requested_kind: RequestedKind::parse(&job_row.get::<String, _>("requested_kind"))
                .unwrap_or(RequestedKind::Primary),
            include_dependencies: job_row.get::<i64, _>("include_dependencies") != 0,
            state: parse_state(&job_row.get::<String, _>("state")),
            progress_bytes: u64::try_from(job_row.get::<i64, _>("progress_bytes")).unwrap_or(0),
            total_bytes: job_row
                .get::<Option<i64>, _>("total_bytes")
                .and_then(|v| u64::try_from(v).ok()),
            error_reason: job_row.get::<Option<String>, _>("error_reason"),
            warnings,
            created_at: parse_time(job_row.get::<String, _>("created_at").as_str())
                .unwrap_or_else(Utc::now),
            started_at: job_row
                .get::<Option<String>, _>("started_at")
                .and_then(|s| parse_time(&s)),
            finished_at: job_row
                .get::<Option<String>, _>("finished_at")
                .and_then(|s| parse_time(&s)),
            targets,
        }))
    }

    /// Every job currently in the given state, ordered by creation
    /// time. Used by the orchestrator to drive FR-114 re-queue of
    /// `auth_required` jobs when the token changes.
    pub async fn list_by_state(&self, state: DownloadState) -> JobStoreResult<Vec<JobId>> {
        let rows = sqlx::query(
            "SELECT job_id FROM download_jobs WHERE state = ?1 ORDER BY created_at ASC",
        )
        .bind(state_as_str(state))
        .fetch_all(self.pool.as_ref())
        .await?;
        Ok(rows
            .into_iter()
            .filter_map(|r| {
                uuid::Uuid::parse_str(&r.get::<String, _>("job_id"))
                    .ok()
                    .map(JobId::from_uuid)
            })
            .collect())
    }

    pub async fn list_non_terminal(&self) -> JobStoreResult<Vec<JobId>> {
        let rows = sqlx::query(
            "SELECT job_id FROM download_jobs
             WHERE state IN ('queued','downloading','paused','auth_required')
             ORDER BY created_at ASC",
        )
        .fetch_all(self.pool.as_ref())
        .await?;
        Ok(rows
            .into_iter()
            .filter_map(|r| {
                uuid::Uuid::parse_str(&r.get::<String, _>("job_id"))
                    .ok()
                    .map(JobId::from_uuid)
            })
            .collect())
    }

    pub async fn update_state(
        &self,
        id: &JobId,
        state: DownloadState,
        error_reason: Option<&str>,
    ) -> JobStoreResult<()> {
        let now = Utc::now().to_rfc3339();
        let terminal = state.is_terminal();
        sqlx::query(
            "UPDATE download_jobs
                SET state = ?2,
                    error_reason = COALESCE(?3, error_reason),
                    started_at = COALESCE(started_at, CASE WHEN ?2 = 'downloading' THEN ?4 ELSE NULL END),
                    finished_at = CASE WHEN ?5 = 1 THEN ?4 ELSE finished_at END
                WHERE job_id = ?1",
        )
        .bind(id.to_string())
        .bind(state_as_str(state))
        .bind(error_reason)
        .bind(&now)
        .bind(terminal as i32)
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    pub async fn update_target_state(
        &self,
        id: &JobId,
        artifact_id: &ArtifactId,
        state: TargetState,
    ) -> JobStoreResult<()> {
        sqlx::query(
            "UPDATE download_job_artifacts
                SET state = ?3
                WHERE job_id = ?1 AND artifact_id = ?2",
        )
        .bind(id.to_string())
        .bind(artifact_id.as_str())
        .bind(state.as_str())
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    /// Startup rehydration (T083). Flip every row stuck in
    /// `downloading` (because the host was killed mid-stream) back to
    /// `paused` so the user can opt into a resume. Also flip matching
    /// per-artifact rows to `queued`.
    pub async fn rehydrate_downloading_to_paused(&self) -> JobStoreResult<()> {
        sqlx::query(
            "UPDATE download_jobs
                SET state = 'paused',
                    error_reason = 'host restart — resume to continue'
                WHERE state = 'downloading'",
        )
        .execute(self.pool.as_ref())
        .await?;
        sqlx::query(
            "UPDATE download_job_artifacts
                SET state = 'queued'
                WHERE state = 'downloading'",
        )
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }

    pub async fn update_target_progress(
        &self,
        id: &JobId,
        artifact_id: &ArtifactId,
        downloaded_bytes: u64,
    ) -> JobStoreResult<()> {
        let dl = i64::try_from(downloaded_bytes).unwrap_or(i64::MAX);
        sqlx::query(
            "UPDATE download_job_artifacts
                SET downloaded_bytes = ?3
                WHERE job_id = ?1 AND artifact_id = ?2",
        )
        .bind(id.to_string())
        .bind(artifact_id.as_str())
        .bind(dl)
        .execute(self.pool.as_ref())
        .await?;
        sqlx::query(
            "UPDATE download_jobs
                SET progress_bytes = COALESCE(
                    (SELECT SUM(downloaded_bytes) FROM download_job_artifacts WHERE job_id = ?1),
                    0
                )
                WHERE job_id = ?1",
        )
        .bind(id.to_string())
        .execute(self.pool.as_ref())
        .await?;
        Ok(())
    }
}

fn role_as_str(role: DependencyRole) -> &'static str {
    match role {
        DependencyRole::Primary => "primary",
        DependencyRole::Vae => "vae",
        DependencyRole::TextEncoder => "text_encoder",
        DependencyRole::Tokenizer => "tokenizer",
        DependencyRole::Controlnet => "controlnet",
        DependencyRole::Lora => "lora",
        DependencyRole::Scheduler => "scheduler",
        _ => "other",
    }
}

fn role_from_str(s: &str) -> DependencyRole {
    match s {
        "primary" => DependencyRole::Primary,
        "vae" => DependencyRole::Vae,
        "text_encoder" => DependencyRole::TextEncoder,
        "tokenizer" => DependencyRole::Tokenizer,
        "controlnet" => DependencyRole::Controlnet,
        "lora" => DependencyRole::Lora,
        "scheduler" => DependencyRole::Scheduler,
        _ => DependencyRole::Other,
    }
}

fn parse_time(s: &str) -> Option<DateTime<Utc>> {
    DateTime::parse_from_rfc3339(s)
        .ok()
        .map(|dt| dt.with_timezone(&Utc))
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
            "../../../../migrations/013_model_store_download_jobs.sql"
        ))
        .execute(&pool)
        .await
        .unwrap();
        Arc::new(pool)
    }

    fn sample_params() -> CreateJobParams {
        CreateJobParams::builder(
            FamilyId::from("hf:test/model"),
            "huggingface",
            "test/model",
            RequestedKind::Variant,
        )
        .target(JobTargetInput {
            artifact_id: ArtifactId::from("hf:test/model#m.gguf"),
            filename: "m.gguf".into(),
            role: DependencyRole::Primary,
            download_url: "https://example/m.gguf".into(),
            expected_bytes: Some(1_000_000),
            sha256: None,
        })
        .build()
    }

    #[tokio::test]
    async fn create_persists_job_and_targets() {
        let pool = memory_pool().await;
        let store = JobStore::new(pool);
        let job = store.create(sample_params()).await.unwrap();
        assert_eq!(job.state, DownloadState::Queued);
        assert_eq!(job.targets.len(), 1);
        let refetched = store.get(&job.job_id).await.unwrap().unwrap();
        assert_eq!(refetched.targets[0].filename, "m.gguf");
    }

    #[tokio::test]
    async fn duplicate_active_job_is_refused() {
        let pool = memory_pool().await;
        let store = JobStore::new(pool);
        let first = store.create(sample_params()).await.unwrap();
        let err = store.create(sample_params()).await.unwrap_err();
        match err {
            JobStoreError::Duplicate(id) => assert_eq!(id, first.job_id),
            other => panic!("expected Duplicate, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn terminal_state_clears_dup_lock() {
        let pool = memory_pool().await;
        let store = JobStore::new(pool);
        let first = store.create(sample_params()).await.unwrap();
        store
            .update_state(&first.job_id, DownloadState::Downloaded, None)
            .await
            .unwrap();
        let second = store.create(sample_params()).await.unwrap();
        assert_ne!(first.job_id, second.job_id);
    }

    #[tokio::test]
    async fn latest_for_family_returns_most_recent_job_in_any_state() {
        let pool = memory_pool().await;
        let store = JobStore::new(pool);
        let family = FamilyId::from("hf:test/model");
        assert!(store.latest_for_family(&family).await.unwrap().is_none());

        let first = store.create(sample_params()).await.unwrap();
        store
            .update_state(&first.job_id, DownloadState::Downloaded, None)
            .await
            .unwrap();
        let second = store.create(sample_params()).await.unwrap();

        let latest = store.latest_for_family(&family).await.unwrap().unwrap();
        assert_eq!(latest, second.job_id);
    }

    #[tokio::test]
    async fn update_progress_sums_into_job() {
        let pool = memory_pool().await;
        let store = JobStore::new(pool);
        let job = store.create(sample_params()).await.unwrap();
        store
            .update_target_progress(
                &job.job_id,
                &ArtifactId::from("hf:test/model#m.gguf"),
                512_000,
            )
            .await
            .unwrap();
        let j = store.get(&job.job_id).await.unwrap().unwrap();
        assert_eq!(j.progress_bytes, 512_000);
        assert_eq!(j.targets[0].downloaded_bytes, 512_000);
    }
}
