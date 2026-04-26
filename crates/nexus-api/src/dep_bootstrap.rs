//! Spec 035 — bootstrap wiring for the generic extension dependency installer.
//!
//! Provides the `Arc<...>` services that populate `AppState.dep_*` fields.
//!
//! Real adapters delegate to existing host crates for the **probe** path so an
//! already-installed prerequisite (runtime in `host_runtime_installs`, model
//! artifact in `model_store_installed_artifacts`) flips the dep gate green
//! immediately. The **action** path (running a runtime install pipeline,
//! starting a model download) requires richer context than this trait
//! surfaces (full `InstallCtx` with version manifest selection, full
//! `CreateJobParams` with variant + URL selection) so it returns a
//! categorised error pointing the user at the existing UI surface that owns
//! that orchestration (Backends page, Models Search page).

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use sqlx::SqlitePool;
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::runtime_installs_store;
use nexus_extension_deps::{
    DepError, HandlerRegistry, HandshakeError, ModelDownloadProgress, ModelStoreClient,
    RuntimeBootstrapResult, RuntimeBootstrapper, StepArtifact, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
};
use nexus_models_store::downloads::{DownloadOrchestrator, InstallMap};
use nexus_models_store::ids::FamilyId;

/// Build the default registry — registers all five built-in handlers.
pub fn default_dep_handler_registry() -> Arc<HandlerRegistry> {
    Arc::new(HandlerRegistry::default())
}

/// Wrap the crate-level `fetch_artifact` function in the trait-object closure
/// shape required by `StepContext::fetch_artifact`.
pub fn default_fetch_artifact() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

/// Real `RuntimeBootstrapper` — `probe` queries `host_runtime_installs` via
/// `runtime_installs_store::resolve_dependency` so an already-installed
/// runtime flips the gate green. `bootstrap` returns a categorised error
/// directing the user to the Backends page (the full install pipeline needs a
/// version manifest + InstallCtx that the dep installer's flat trait does not
/// surface).
pub struct RealRuntimeBootstrapper {
    pool: SqlitePool,
}

impl RealRuntimeBootstrapper {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl RuntimeBootstrapper for RealRuntimeBootstrapper {
    async fn probe(
        &self,
        family: &str,
        version: Option<&str>,
        accelerator_profiles: &[String],
        _target_dir: &std::path::Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        // Reject runtime families the host catalog does not recognise — keeps
        // probe results faithful to spec-032's canonical set instead of
        // returning false negatives for typos.
        if RuntimeFamily::canonical(family).is_none() {
            return Ok(None);
        }

        let row = runtime_installs_store::resolve_dependency(
            &self.pool,
            family,
            version,
            accelerator_profiles,
        )
        .await
        .map_err(|e| DepError::Backend(format!("resolve_dependency: {e}")))?;

        Ok(row.map(|r| RuntimeBootstrapResult {
            install_dir: PathBuf::from(r.install_root),
            resolved_version: r.version,
            resolved_profile: Some(r.accelerator),
            // Install row does not track post-extract bytes; report 0 rather
            // than fabricating a value. Probe artifacts are about identity
            // and location, not size accounting.
            bytes_placed: 0,
        }))
    }

    async fn bootstrap(
        &self,
        family: &str,
        _version: Option<&str>,
        _accelerator_profiles: &[String],
        _target_dir: &std::path::Path,
        _cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        Err(DepError::Backend(format!(
            "runtime '{family}' is not installed; install it from the Backends page. \
             The dep installer probes the host's runtime store but does not run the \
             full install pipeline (version manifest + accelerator selection happens \
             in the Backends UI)."
        )))
    }
}

/// Real `ModelStoreClient` — `is_family_installed` queries
/// `model_store_installed_artifacts` via `InstallMap::list_for_family`.
/// `start_download` / `poll_job` return categorised errors directing the user
/// to the Models Search page (creating a download job needs variant + URL
/// selection that lives in that UI).
pub struct RealModelStoreClient {
    install_map: InstallMap,
    orchestrator: Arc<DownloadOrchestrator>,
}

impl RealModelStoreClient {
    pub fn new(install_map: InstallMap, orchestrator: Arc<DownloadOrchestrator>) -> Self {
        Self {
            install_map,
            orchestrator,
        }
    }
}

#[async_trait]
impl ModelStoreClient for RealModelStoreClient {
    async fn is_family_installed(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        let family = FamilyId::from(family_id);
        let rows = self
            .install_map
            .list_for_family(&family)
            .await
            .map_err(|e| DepError::Backend(format!("install_map.list_for_family: {e}")))?;

        // Pick the first row — `list_for_family` orders by `installed_at DESC`,
        // so this is the most recently installed artifact for the family. The
        // accelerator argument is not yet part of the install-map schema; a
        // follow-up can filter rows by `variant_id` once spec-025 stamps the
        // accelerator profile onto the variant id.
        Ok(rows.into_iter().next().map(|row| {
            self.orchestrator
                .sink_root()
                .join(&row.job_id)
                .join(&row.filename)
        }))
    }

    async fn start_download(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<String, DepError> {
        Err(DepError::Backend(format!(
            "model family '{family_id}' is not installed; download it from the Models \
             Search page. The dep installer probes the host's install map but does not \
             create download jobs directly (variant + URL selection happens in the \
             Models Search UI)."
        )))
    }

    async fn poll_job(&self, _job_id: &str) -> Result<ModelDownloadProgress, DepError> {
        Ok(ModelDownloadProgress::Failed {
            category: "delegation_unavailable".into(),
            message: "model store delegation does not yet poll jobs from the dep \
                      installer; track download progress on the Models Search page"
                .into(),
        })
    }
}

/// `WorkerHandshake` stub — returns a categorised error. A real
/// implementation needs to spawn the extension's worker (runtime entrypoint
/// resolved against an upstream `runtime` step's `install_dir`) and run
/// `do_handshake` against it. That orchestration does not exist as a
/// standalone helper today — `acquire_lease` requires a `RuntimeInstallId`
/// looked up from `host_runtime_installs`, but extension-worker handshake
/// runs against the **extension's** binary, not the runtime's install row.
/// Carve-out tracked alongside spec-035 follow-ups.
pub struct StubWorkerHandshake;

#[async_trait]
impl WorkerHandshake for StubWorkerHandshake {
    async fn run_handshake(
        &self,
        _extension_id: &str,
        _extension_dir: &std::path::Path,
        _upstream_artifacts: &std::collections::HashMap<String, StepArtifact>,
        _timeout: std::time::Duration,
        _cancellation: CancellationToken,
    ) -> Result<(), HandshakeError> {
        Err(HandshakeError {
            category: "validation_unavailable".into(),
            message: "worker-handshake validation is not yet wired through the dep \
                      installer; the extension activates and the worker handshakes \
                      via the existing lease path on first use"
                .into(),
        })
    }
}

/// Convenience bundle — every `Option<Arc<dyn ...>>` field on `AppState`
/// populated with the default registry + real probe adapters + handshake stub.
pub struct DefaultDepBootstrap {
    pub handler_registry: Arc<HandlerRegistry>,
    pub runtime_bootstrapper: Arc<dyn RuntimeBootstrapper>,
    pub model_store: Arc<dyn ModelStoreClient>,
    pub worker_handshake: Arc<dyn WorkerHandshake>,
    pub fetch_artifact: Arc<FetchArtifact>,
    pub host_data_dir: PathBuf,
}

impl DefaultDepBootstrap {
    pub fn new(
        host_data_dir: PathBuf,
        pool: SqlitePool,
        install_map: InstallMap,
        orchestrator: Arc<DownloadOrchestrator>,
    ) -> Self {
        Self {
            handler_registry: default_dep_handler_registry(),
            runtime_bootstrapper: Arc::new(RealRuntimeBootstrapper::new(pool)),
            model_store: Arc::new(RealModelStoreClient::new(install_map, orchestrator)),
            worker_handshake: Arc::new(StubWorkerHandshake),
            fetch_artifact: default_fetch_artifact(),
            host_data_dir,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
    use std::str::FromStr;

    async fn fresh_pool_with_runtime_installs() -> SqlitePool {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        // Minimum schema for runtime_installs_store::resolve_dependency.
        sqlx::query(
            "CREATE TABLE host_runtime_installs (
                install_id TEXT PRIMARY KEY,
                family TEXT NOT NULL,
                version TEXT NOT NULL,
                accelerator TEXT NOT NULL,
                install_root TEXT NOT NULL,
                binary_paths TEXT NOT NULL DEFAULT '[]',
                state TEXT NOT NULL,
                validation_result TEXT,
                last_failure_category TEXT,
                source_url TEXT,
                checksum TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )",
        )
        .execute(&pool)
        .await
        .unwrap();
        pool
    }

    #[tokio::test]
    async fn runtime_probe_unknown_family_returns_none() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "totally-fake-runtime",
                None,
                &[],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();
        assert!(result.is_none());
    }

    #[tokio::test]
    async fn runtime_probe_canonical_family_with_no_install_returns_none() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe("python", None, &[], std::path::Path::new("/tmp"))
            .await
            .unwrap();
        assert!(result.is_none());
    }

    #[tokio::test]
    async fn runtime_probe_returns_install_dir_when_installed() {
        let pool = fresh_pool_with_runtime_installs().await;
        sqlx::query(
            "INSERT INTO host_runtime_installs (install_id, family, version, accelerator, install_root, state, created_at, updated_at) \
             VALUES ('id1', 'python', '3.11.13', 'cpu', '/opt/runtimes/py311', 'installed', '2026-04-25T00:00:00Z', '2026-04-25T00:00:00Z')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();

        let result = result.expect("expected matching install");
        assert_eq!(result.install_dir, PathBuf::from("/opt/runtimes/py311"));
        assert_eq!(result.resolved_version, "3.11.13");
        assert_eq!(result.resolved_profile.as_deref(), Some("cpu"));
    }

    #[tokio::test]
    async fn runtime_probe_returns_none_when_version_predicate_excludes_installed_row() {
        // A row exists for python 3.10.x but the manifest asks for >=3.11. The
        // resolver MUST reject the row and return None — otherwise the dep gate
        // would flip green for an incompatible runtime.
        let pool = fresh_pool_with_runtime_installs().await;
        sqlx::query(
            "INSERT INTO host_runtime_installs (install_id, family, version, accelerator, install_root, state, created_at, updated_at) \
             VALUES ('id-py310', 'python', '3.10.14', 'cpu', '/opt/runtimes/py310', 'installed', '2026-04-25T00:00:00Z', '2026-04-25T00:00:00Z')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let result = bootstrapper
            .probe(
                "python",
                Some(">=3.11"),
                &["cpu".into()],
                std::path::Path::new("/tmp"),
            )
            .await
            .unwrap();
        assert!(
            result.is_none(),
            "version predicate '>=3.11' must reject installed 3.10.14 row, got: {result:?}"
        );
    }

    #[tokio::test]
    async fn runtime_bootstrap_returns_categorised_error_pointing_at_backends_ui() {
        let pool = fresh_pool_with_runtime_installs().await;
        let bootstrapper = RealRuntimeBootstrapper::new(pool);

        let err = bootstrapper
            .bootstrap(
                "python",
                None,
                &[],
                std::path::Path::new("/tmp"),
                CancellationToken::new(),
            )
            .await
            .unwrap_err();

        let msg = err.to_string();
        assert!(msg.contains("Backends page"), "msg = {msg}");
        assert!(msg.contains("python"), "msg = {msg}");
    }

    #[tokio::test]
    async fn worker_handshake_returns_validation_unavailable_category() {
        let stub = StubWorkerHandshake;
        let err = stub
            .run_handshake(
                "ext.example",
                std::path::Path::new("/tmp"),
                &std::collections::HashMap::new(),
                std::time::Duration::from_secs(1),
                CancellationToken::new(),
            )
            .await
            .unwrap_err();
        assert_eq!(err.category, "validation_unavailable");
    }
}
