use std::sync::atomic::{AtomicBool, Ordering};

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

use nexus_models_store::downloads::{InstallMap, InstalledArtifactRow};
use nexus_models_store::ids::ArtifactId;

use crate::AppState;
use crate::envelope::ApiResponse;

const MAX_ROWS: usize = 500;

/// One-shot guard: the O(files) sink reconcile runs once per process the first
/// time `GET /model-store/installed` is served, so later listings stay cheap
/// (just `list_all` + truncation). The `POST .../models/revalidate` route
/// remains the explicit way to re-run a reconcile on demand.
static RECONCILED_ONCE: AtomicBool = AtomicBool::new(false);

/// Reconcile the install map with the on-disk sink at most once per process so
/// orphaned-on-disk files become listed AND deletable, then keep listing O(rows).
async fn reconcile_once(install_map: &InstallMap, sink_root: Option<&std::path::Path>) {
    let Some(sink_root) = sink_root else {
        return;
    };
    if RECONCILED_ONCE.swap(true, Ordering::AcqRel) {
        return;
    }
    if let Err(e) = install_map.reconcile_installed_with_sink(sink_root).await {
        tracing::warn!(
            target: "model_store",
            error = %e,
            "get_installed: sink reconcile failed — listing install-map rows as-is"
        );
    }
}

#[derive(Debug, Clone, Serialize)]
#[non_exhaustive]
pub struct InstalledArtifactDto {
    pub artifact_id: String,
    pub family_id: String,
    pub variant_id: Option<String>,
    pub format: String,
    pub role: String,
    pub filename: String,
    pub size_bytes: Option<u64>,
    pub source_repo: String,
    pub source_revision: Option<String>,
    pub installed_at: String,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub extraction_status: Option<String>,
    pub extracted_at: Option<i64>,
    pub install_path: Option<String>,
}

impl InstalledArtifactDto {
    fn from_row(row: InstalledArtifactRow, sink_root: Option<&std::path::Path>) -> Self {
        let install_path = sink_root.map(|root| row.install_path(root).display().to_string());
        Self {
            install_path,
            artifact_id: row.artifact_id,
            family_id: row.family_id,
            variant_id: row.variant_id,
            format: row.format,
            role: row.role,
            filename: row.filename,
            size_bytes: row.size_bytes,
            source_repo: row.source_repo,
            source_revision: row.source_revision,
            installed_at: row.installed_at.to_rfc3339(),
            layer_count: row.layer_count,
            max_context: row.max_context,
            architecture: row.architecture,
            hidden_size: row.hidden_size,
            extraction_status: row.extraction_status,
            extracted_at: row.extracted_at,
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct InstalledIndexDto {
    pub family_ids: Vec<String>,
    pub installed: Vec<InstalledArtifactDto>,
    pub truncated: bool,
}

pub async fn get_installed(State(state): State<AppState>) -> Response {
    let Some(install_map) = state.install_map.as_ref() else {
        return ApiResponse::ok(InstalledIndexDto {
            family_ids: vec![],
            installed: vec![],
            truncated: false,
        })
        .into_response();
    };

    let sink_root = state
        .download_orchestrator
        .as_ref()
        .map(|o| o.sink_root().to_path_buf());

    reconcile_once(install_map, sink_root.as_deref()).await;

    let rows = match install_map.list_all(MAX_ROWS + 1).await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::internal(format!("list_all: {e}")).into_response();
        }
    };

    let truncated = rows.len() > MAX_ROWS;
    let installed: Vec<InstalledArtifactDto> = rows
        .into_iter()
        .take(MAX_ROWS)
        .map(|row| InstalledArtifactDto::from_row(row, sink_root.as_deref()))
        .collect();

    let mut family_ids: Vec<String> = installed.iter().map(|a| a.family_id.clone()).collect();
    family_ids.sort();
    family_ids.dedup();

    ApiResponse::ok(InstalledIndexDto {
        family_ids,
        installed,
        truncated,
    })
    .into_response()
}

#[derive(Debug, Serialize)]
pub struct DeleteInstalledDto {
    pub artifact_id: String,
    pub job_id: String,
    pub freed_bytes: u64,
}

/// `DELETE /api/v1/model-store/installed/:artifact_id` — delete a downloaded
/// model. Resolves the artifact to its download job, then removes the job's
/// sink files, install-map rows, and legibility index entry. Returns 404 when
/// the artifact isn't installed and 409 when an extension still references it.
pub async fn delete_installed(
    State(state): State<AppState>,
    Path(artifact_id): Path<String>,
) -> Response {
    let Some(install_map) = state.install_map.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "model_store",
            "Model store not yet initialised.".into(),
        )
        .into_response();
    };
    let Some(orchestrator) = state.download_orchestrator.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "model_store",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };

    let row = match install_map
        .find_by_artifact(&ArtifactId::from(artifact_id.clone()))
        .await
    {
        Ok(Some(r)) => r,
        Ok(None) => {
            return ApiResponse::<()>::not_found(format!("artifact not installed: {artifact_id}"))
                .into_response();
        }
        Err(e) => return ApiResponse::<()>::internal(format!("lookup: {e}")).into_response(),
    };
    let job_id = row.job_id;

    match install_map
        .gc_artifact_if_unreferenced(&job_id, orchestrator.sink_root())
        .await
    {
        Ok(outcome) if outcome.deleted => ApiResponse::ok(DeleteInstalledDto {
            artifact_id,
            job_id,
            freed_bytes: outcome.freed_bytes,
        })
        .into_response(),
        Ok(_) => {
            let refs = install_map.refcount(&job_id).await.unwrap_or(1);
            ApiResponse::<()>::err(
                StatusCode::CONFLICT,
                "in_use",
                "model_store",
                format!(
                    "model is in use by {refs} extension(s); uninstall those before deleting it"
                ),
            )
            .into_response()
        }
        Err(e) => ApiResponse::<()>::internal(format!("delete: {e}")).into_response(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;
    use std::path::Path;

    fn row() -> InstalledArtifactRow {
        InstalledArtifactRow {
            artifact_id: "fam::variant::file".into(),
            family_id: "huggingface:acme/family".into(),
            variant_id: None,
            format: "safetensors".into(),
            role: "primary".into(),
            source_provider: "huggingface".into(),
            source_repo: "acme/family".into(),
            source_revision: None,
            filename: "model.safetensors".into(),
            job_id: "job-123".into(),
            sha256: None,
            size_bytes: Some(42),
            installed_at: Utc::now(),
            layer_count: None,
            max_context: None,
            architecture: None,
            hidden_size: None,
            is_moe: None,
            expert_layer_count: None,
            extraction_status: None,
            extracted_at: None,
        }
    }

    #[test]
    fn install_path_joins_sink_root_job_id_and_filename() {
        let root = std::env::temp_dir().join("nexus-sink-root-test");
        let dto = InstalledArtifactDto::from_row(row(), Some(root.as_path()));
        let path = dto.install_path.expect("path present when sink root known");
        assert_eq!(
            Path::new(&path),
            root.join("job-123").join("model.safetensors")
        );
        assert!(Path::new(&path).is_absolute());
    }

    #[test]
    fn install_path_absent_without_sink_root() {
        let dto = InstalledArtifactDto::from_row(row(), None);
        assert!(dto.install_path.is_none());
    }

    use std::sync::Arc;

    use sqlx::SqlitePool;
    use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
    use std::str::FromStr;

    /// The reconcile guard is a process-global atomic; serialize the tests that
    /// reset and observe it so they don't race within the test binary.
    static GUARD_LOCK: tokio::sync::Mutex<()> = tokio::sync::Mutex::const_new(());

    /// Resets the process-global reconcile guard on drop so a panicking test
    /// can't leak `true` into the next serialized test. Declared AFTER the
    /// GUARD_LOCK guard so it resets the atomic before the lock is released.
    struct ResetGuard;
    impl Drop for ResetGuard {
        fn drop(&mut self) {
            RECONCILED_ONCE.store(false, Ordering::SeqCst);
        }
    }

    async fn model_store_pool() -> Arc<SqlitePool> {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        for migration in [
            include_str!("../../../../../migrations/014_model_store_installed_artifacts.sql"),
            include_str!(
                "../../../../../migrations/015_installed_artifact_extraction_metadata.sql"
            ),
            include_str!("../../../../../migrations/021_installed_artifact_moe_metadata.sql"),
            include_str!("../../../../../migrations/022_model_store_artifact_refs.sql"),
            include_str!("../../../../../migrations/023_installed_artifact_role.sql"),
        ] {
            for stmt in migration.split(';') {
                let trimmed = stmt.trim();
                if trimmed.is_empty() {
                    continue;
                }
                let _ = sqlx::query(trimmed).execute(&pool).await;
            }
        }
        Arc::new(pool)
    }

    /// `reconcile_once` adopts a sidecar-less orphan placed at
    /// `<sink_root>/<job_id>/<file>` so a later `list_all` would surface it AND
    /// it is resolvable by the artifact-id-keyed delete path.
    #[tokio::test]
    async fn reconcile_once_adopts_orphaned_on_disk_file() {
        let _guard = GUARD_LOCK.lock().await;
        let _reset = ResetGuard;
        RECONCILED_ONCE.store(false, Ordering::SeqCst);
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let map = InstallMap::new(model_store_pool().await);

        let job = "00000000-0000-7000-8000-0000000000a1";
        let dir = sink_root.join(job);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("dropped.gguf"), b"on-disk-weights")
            .await
            .unwrap();

        reconcile_once(&map, Some(sink_root)).await;

        let rows = map.list_all(MAX_ROWS).await.unwrap();
        assert_eq!(rows.len(), 1, "orphan adopted into the listing");
        let row = &rows[0];
        assert_eq!(row.artifact_id, format!("{job}#dropped.gguf"));
        assert_eq!(row.job_id, job);

        let found = map
            .find_by_artifact(&ArtifactId::from(row.artifact_id.clone()))
            .await
            .unwrap();
        assert!(found.is_some(), "stable artifact id resolves for delete");
    }

    /// The reconcile runs at most once per process: after the first call sets
    /// the guard, a second call is a no-op even though a new orphan appeared.
    #[tokio::test]
    async fn reconcile_once_runs_at_most_once_per_process() {
        let _guard = GUARD_LOCK.lock().await;
        let _reset = ResetGuard;
        RECONCILED_ONCE.store(false, Ordering::SeqCst);
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path();
        let map = InstallMap::new(model_store_pool().await);

        // First call with an empty sink trips the guard.
        reconcile_once(&map, Some(sink_root)).await;

        // Now an orphan appears, but the guard is already set — no adoption.
        let job = "00000000-0000-7000-8000-0000000000a2";
        let dir = sink_root.join(job);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("late.gguf"), b"weights")
            .await
            .unwrap();
        reconcile_once(&map, Some(sink_root)).await;

        assert!(
            map.list_all(MAX_ROWS).await.unwrap().is_empty(),
            "second reconcile is a no-op (explicit revalidate re-runs it)"
        );
    }

    /// With no sink root configured, reconcile is a no-op and never trips the
    /// once-guard (so a later configured call still reconciles).
    #[tokio::test]
    async fn reconcile_once_is_noop_without_sink_root() {
        let _guard = GUARD_LOCK.lock().await;
        let _reset = ResetGuard;
        RECONCILED_ONCE.store(false, Ordering::SeqCst);
        let map = InstallMap::new(model_store_pool().await);
        reconcile_once(&map, None).await;
        assert!(
            !RECONCILED_ONCE.load(Ordering::SeqCst),
            "missing sink root must not consume the one-shot guard"
        );
    }
}
