//! T081 / T082 / T085 / T086 / T080 end-to-end tests for the lease
//! lifecycle HTTP surface.
//!
//! Uses the real test-echo extension + the system Python interpreter,
//! registered via a test-only `RuntimeFamilyHandler` (the real
//! `FamilyPythonHandler` with embedded Python is T059+).

mod common;

use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::str::FromStr;
use std::sync::Arc;
use std::time::Duration;

use async_trait::async_trait;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use sqlx::sqlite::SqlitePool;
use tower::ServiceExt;

use nexus_api::AppState;
use nexus_api::create_router;
use nexus_api::handlers::backend_runtimes::registration::{
    deactivate_contributions_with_drain, register_contributions,
};
use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::enums::{InstallStatus, LeaseState};
use nexus_backend_runtimes::generic::errors::GenericInstallError;
use nexus_backend_runtimes::generic::family_handler::{
    FamilyHandlerRegistry, RuntimeFamilyHandler,
};
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId, SourceExtensionId,
};
use nexus_backend_runtimes::generic::install_ctx::{InstallCtx, LaunchSpec};
use nexus_backend_runtimes::generic::installs::{
    BackendRuntimeInstallsRepo, InstallRecord, SqliteInstallsRepo,
};
use nexus_backend_runtimes::generic::leases::BackendRuntimeLeasesRepo;
use nexus_backend_runtimes::generic::settings::RuntimeSettings;
use nexus_extension::manifest::BackendRuntimeContribution;

use common::{StubHf, TestHarness, harness_with};

fn python_executable() -> &'static str {
    if cfg!(windows) { "python" } else { "python3" }
}

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

/// Test-only handler — uses system python to run the worker script.
/// Real `FamilyPythonHandler` (T059+) will bootstrap an embedded
/// Python distribution.
struct PythonViaPathHandler;

#[async_trait]
impl RuntimeFamilyHandler for PythonViaPathHandler {
    fn family(&self) -> RuntimeFamily {
        RuntimeFamily::Python
    }
    async fn bootstrap_runtime(&self, _ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        Ok(())
    }
    async fn install_deps(&self, _ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        Ok(())
    }
    async fn validate_env(&self, _ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        Ok(())
    }
    fn spawn_launch_spec(
        &self,
        install: &InstallRecord,
        _settings: &RuntimeSettings,
    ) -> LaunchSpec {
        let entry = install
            .entrypoint_path
            .clone()
            .unwrap_or_else(|| install.install_path.clone());
        LaunchSpec {
            program: PathBuf::from(python_executable()),
            args: vec!["-u".into(), entry],
            env: HashMap::new(),
            working_dir: None,
        }
    }
}

fn test_echo_contribution() -> BackendRuntimeContribution {
    BackendRuntimeContribution {
        runtime_id: "test.echo".into(),
        display_name: "Test Echo".into(),
        family: "python".into(),
        transport: "stdio".into(),
        worker_entrypoint: "worker/src/echo_worker/main.py".into(),
        version_manifest: "backends/echo/versions.yaml".into(),
        capability_tags: vec!["echo".into()],
        supported_roles: vec!["test".into()],
    }
}

struct LifecycleHarness {
    state: AppState,
    router: axum::Router,
    pool: SqlitePool,
    install_id: RuntimeInstallId,
    _inner: TestHarness,
}

async fn body_to_json(body: Body) -> Value {
    let bytes = body.collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

/// Build a harness with test-echo registered + a validated install row
/// in place so `POST /start` can immediately acquire.
async fn lifecycle_harness() -> LifecycleHarness {
    let inner = harness_with(Arc::new(StubHf::default())).await;
    let pool = inner.state.db.pool().clone();
    let mut state = inner.state.clone();
    state.extensions_dir = Some(workspace_root().join("extensions/builtin"));
    state
        .family_handlers
        .register(Arc::new(PythonViaPathHandler))
        .await;

    // Seed catalog + a pre-validated install row.
    let catalog = SqliteCatalogRepo::new(pool.clone());
    register_contributions(
        &catalog,
        &SourceExtensionId::from("test-echo-runtime"),
        "0.0.1",
        &[test_echo_contribution()],
        1_700_000_000,
    )
    .await
    .unwrap();

    let installs = SqliteInstallsRepo::new(pool.clone());
    let install_id = RuntimeInstallId::new();
    let now = chrono::Utc::now().timestamp();
    let entry = workspace_root()
        .join("extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py");
    let record = InstallRecord {
        runtime_install_id: install_id,
        runtime_id: RuntimeId::try_from("test.echo").unwrap(),
        release_id: ReleaseId::try_from("v0_0_1").unwrap(),
        platform: PlatformId::try_from("linux-x64").unwrap(),
        accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
        install_path: entry.display().to_string(),
        entrypoint_path: Some(entry.display().to_string()),
        artifact_hash: Some("a".repeat(64)),
        status: InstallStatus::Validated,
        current_phase: None,
        validated_at: Some(now),
        last_failure_category: None,
        last_failure_detail: None,
        created_at: now,
        updated_at: now,
    };
    installs.insert(&record).await.unwrap();

    let router = create_router(state.clone());
    LifecycleHarness {
        state,
        router,
        pool,
        install_id,
        _inner: inner,
    }
}

#[tokio::test]
async fn start_endpoint_acquires_lease_and_registers_in_manager() {
    let h = lifecycle_harness().await;

    // Empty body (no content-type) — handler treats missing body as
    // default `StartRequest {}` and uses the default preview_session owner.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    let lease_id_str = body["data"]["lease_id"].as_str().unwrap().to_string();
    assert_eq!(body["data"]["state"], "ready");
    assert!(body["data"]["pid"].is_i64());

    // Manager now has the handle.
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    // Release so we don't leak a subprocess.
    use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
    let lease_id = RuntimeLeaseId::from_str(&lease_id_str).unwrap();
    h.state.lease_manager.release(&lease_id).await.unwrap();
}

#[tokio::test]
async fn start_returns_400_on_invalid_install_id() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtime-installs/not-ulid/start")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn start_returns_404_when_install_missing() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtime-installs/01ARZ3NDEKTSV4RRFFQ69G5FAV/start")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn stop_endpoint_drains_every_live_lease() {
    let h = lifecycle_harness().await;

    // Start a lease via the endpoint.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    // Stop — draining_leases = 1, manager empties.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/stop",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["draining_leases"], 1);
    assert_eq!(h.state.lease_manager.live_count().await, 0);

    // Second stop — zero drained, still OK.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/stop",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["draining_leases"], 0);
}

#[tokio::test]
async fn leases_list_endpoint_surfaces_live_and_filters_by_install() {
    let h = lifecycle_harness().await;

    // Empty list initially.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtime-leases")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["leases"].as_array().unwrap().len(), 0);

    // Start → list returns one live lease.
    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtime-leases")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    let leases = body["data"]["leases"].as_array().unwrap();
    assert_eq!(leases.len(), 1);
    assert_eq!(leases[0]["state"], "ready");
    assert_eq!(leases[0]["runtime_install_id"], h.install_id.to_string());
    assert_eq!(leases[0]["transport"], "stdio");

    // Filter by a different install id → empty result.
    let other = RuntimeInstallId::new();
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!(
                    "/api/v1/backend-runtime-leases?runtime_install_id={other}"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["leases"].as_array().unwrap().len(), 0);

    // Clean up.
    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

#[tokio::test]
async fn delete_lease_releases_and_returns_204_then_404() {
    let h = lifecycle_harness().await;

    // Start a lease.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let start_body = body_to_json(resp.into_body()).await;
    let lease_id_str = start_body["data"]["lease_id"].as_str().unwrap().to_string();

    // DELETE → 204.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-leases/{lease_id_str}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);
    assert_eq!(h.state.lease_manager.live_count().await, 0);

    // Row now in released; second DELETE → 409 (already terminal).
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-leases/{lease_id_str}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CONFLICT);

    // Unknown lease → 404.
    let random = nexus_backend_runtimes::generic::ids::RuntimeLeaseId::new();
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-leases/{random}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn get_lease_returns_row_or_404() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    let lease_id_str = body["data"]["lease_id"].as_str().unwrap().to_string();

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/api/v1/backend-runtime-leases/{lease_id_str}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["lease_id"], lease_id_str);

    // Cleanup.
    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

// -----------------------------------------------------------------------------
// T080 — deactivate cascade drains leases
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// T087a — DELETE /install/:id (uninstall)
// -----------------------------------------------------------------------------

#[tokio::test]
async fn uninstall_returns_204_on_clean_install() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-installs/{}", h.install_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NO_CONTENT);

    // Install row flipped to Abandoned.
    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let row = installs.get(&h.install_id).await.unwrap().unwrap();
    assert_eq!(row.status, InstallStatus::Abandoned);
}

#[tokio::test]
async fn uninstall_returns_409_when_lease_is_live() {
    let h = lifecycle_harness().await;

    // Start a lease so uninstall sees live consumer.
    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-installs/{}", h.install_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CONFLICT);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["error"]["code"], "install_has_live_leases");

    // Cleanup.
    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

#[tokio::test]
async fn uninstall_returns_404_when_install_missing() {
    let h = lifecycle_harness().await;
    let other = RuntimeInstallId::new();
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/v1/backend-runtime-installs/{other}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

// -----------------------------------------------------------------------------
// T083 — POST /restart
// -----------------------------------------------------------------------------

#[tokio::test]
async fn restart_drains_existing_lease_and_spawns_a_new_one() {
    let h = lifecycle_harness().await;

    // Start → one live lease.
    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    // Restart → stopped_leases=1 and a fresh lease_id.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/restart",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["stopped_leases"], 1);
    assert_eq!(body["data"]["state"], "ready");
    let new_lease_id = body["data"]["new_lease_id"].as_str().unwrap();
    assert!(!new_lease_id.is_empty());

    // Still exactly one live lease (the fresh one).
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    // Cleanup.
    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

#[tokio::test]
async fn restart_works_even_when_no_prior_lease() {
    let h = lifecycle_harness().await;

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/restart",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["stopped_leases"], 0);
    assert_eq!(body["data"]["state"], "ready");

    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

#[tokio::test]
async fn t080_deactivate_contributions_with_drain_releases_leases_and_flips_status() {
    let h = lifecycle_harness().await;

    // Start a lease so the drain has something to do.
    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("test-echo-runtime");

    let drained =
        deactivate_contributions_with_drain(&catalog, &installs, &h.state.lease_manager, &ext)
            .await
            .unwrap();
    assert_eq!(drained, 1);
    assert_eq!(h.state.lease_manager.live_count().await, 0);

    // Catalog row flipped to unavailable.
    let entry = catalog
        .find_by_id(&RuntimeId::try_from("test.echo").unwrap())
        .await
        .unwrap()
        .unwrap();
    assert_eq!(entry.implementation_status.as_str(), "unavailable");
}

#[tokio::test]
async fn health_returns_400_on_invalid_install_id() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/backend-runtime-installs/not-a-ulid/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body: serde_json::Value = serde_json::from_slice(
        &axum::body::to_bytes(resp.into_body(), usize::MAX)
            .await
            .unwrap(),
    )
    .unwrap();
    assert_eq!(body["error"]["code"], "invalid_install_id");
}

#[tokio::test]
async fn health_returns_404_when_install_missing() {
    let h = lifecycle_harness().await;
    let bogus = RuntimeInstallId::new();
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri(format!("/api/v1/backend-runtime-installs/{bogus}/health"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn health_returns_no_live_leases_when_none_held() {
    let h = lifecycle_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/health",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body: serde_json::Value = serde_json::from_slice(
        &axum::body::to_bytes(resp.into_body(), usize::MAX)
            .await
            .unwrap(),
    )
    .unwrap();
    assert_eq!(body["data"]["live_lease_count"], 0);
    assert_eq!(body["data"]["aggregate"], "no_live_leases");
    assert_eq!(body["data"]["leases"].as_array().unwrap().len(), 0);
}

#[tokio::test]
async fn health_reports_healthy_after_start_when_echo_worker_responds() {
    let h = lifecycle_harness().await;

    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/health",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body: serde_json::Value = serde_json::from_slice(
        &axum::body::to_bytes(resp.into_body(), usize::MAX)
            .await
            .unwrap(),
    )
    .unwrap();
    assert_eq!(body["data"]["live_lease_count"], 1);
    assert_eq!(body["data"]["aggregate"], "healthy");
    let leases = body["data"]["leases"].as_array().unwrap();
    assert_eq!(leases.len(), 1);
    assert_eq!(leases[0]["healthy"], true);
    assert!(leases[0]["latency_ms"].as_u64().is_some());

    h.state
        .lease_manager
        .release_all_for_install(&h.install_id)
        .await
        .unwrap();
}

#[tokio::test]
async fn drain_completes_within_sc_007_budget() {
    let h = lifecycle_harness().await;

    h.router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{}/start",
                    h.install_id
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(h.state.lease_manager.live_count().await, 1);

    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("test-echo-runtime");

    let start = std::time::Instant::now();
    let drained =
        deactivate_contributions_with_drain(&catalog, &installs, &h.state.lease_manager, &ext)
            .await
            .unwrap();
    let elapsed = start.elapsed();

    assert_eq!(drained, 1);
    assert!(
        elapsed <= Duration::from_millis(500),
        "SC-007 drain budget exceeded: {elapsed:?} > 500 ms"
    );
    assert_eq!(h.state.lease_manager.live_count().await, 0);
}

#[tokio::test]
async fn free_all_on_empty_manager_returns_zeros() {
    let h = lifecycle_harness().await;
    assert_eq!(h.state.lease_manager.live_count().await, 0);

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/host/gc/free-all")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["workers_notified"], 0);
    assert_eq!(body["data"]["total_freed_mb"], 0);
}

#[allow(dead_code)]
fn _keep_duration_import() -> Duration {
    Duration::from_secs(0)
}

#[allow(dead_code)]
fn _keep_lease_state_import() -> LeaseState {
    LeaseState::Ready
}

#[allow(dead_code)]
fn _keep_repo_import() -> std::marker::PhantomData<&'static dyn BackendRuntimeLeasesRepo> {
    std::marker::PhantomData
}
