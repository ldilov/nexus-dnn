//! T064b end-to-end test: `POST /api/v1/backend-runtimes/test.echo/install`
//! actually spawns the install pipeline and the install row transitions
//! through `pending → downloading → validated` against the bundled
//! test-echo-runtime extension.
//!
//! Setup builds a custom harness whose `extensions_dir` points at the
//! workspace's `extensions/builtin/` directory and registers a
//! `FamilyNativeHandler` for `RuntimeFamily::Python` so the test-echo
//! manifest's `family: python` resolves to a runnable handler.

mod common;

use std::path::PathBuf;
use std::sync::Arc;
use std::time::{Duration, Instant};

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use sqlx::sqlite::SqlitePool;
use tower::ServiceExt;

use nexus_api::AppState;
use nexus_api::create_router;
use nexus_api::handlers::backend_runtimes::registration::register_contributions;
use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::family_native::FamilyNativeHandler;
use nexus_backend_runtimes::generic::catalog::SqliteCatalogRepo;
use nexus_backend_runtimes::generic::enums::InstallStatus;
use nexus_backend_runtimes::generic::ids::{RuntimeId, RuntimeInstallId, SourceExtensionId};
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_extension::manifest::BackendRuntimeContribution;
use std::str::FromStr;

use common::{StubHf, TestHarness, harness_with};

struct SpawnHarness {
    state: AppState,
    router: axum::Router,
    pool: SqlitePool,
    _inner: TestHarness,
    _installs_tmp: tempfile::TempDir,
}

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(std::path::Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

async fn spawn_harness() -> SpawnHarness {
    let inner = harness_with(Arc::new(StubHf::default())).await;
    let pool = inner.state.db.pool().clone();
    let installs_tmp = tempfile::tempdir().unwrap();
    let mut state = inner.state.clone();

    // Point at the real test-echo extension dir on disk.
    state.extensions_dir = Some(workspace_root().join("extensions/builtin"));
    // Isolate install output in a tempdir so successive test runs and
    // parallel tests don't collide at the install path.
    state.host_install_paths = Some(nexus_api::HostInstallPaths {
        installs_root: installs_tmp.path().join("installs"),
        blobs_root: installs_tmp.path().join("blobs"),
    });

    // Register a FamilyNativeHandler bound to RuntimeFamily::Python so the
    // test-echo manifest (`family: python`) resolves to a runnable handler.
    state
        .family_handlers
        .register(Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python)))
        .await;

    let router = create_router(state.clone());
    SpawnHarness {
        state,
        router,
        pool,
        _inner: inner,
        _installs_tmp: installs_tmp,
    }
}

fn test_echo_contribution() -> BackendRuntimeContribution {
    // Mirrors extensions/builtin/test-echo-runtime/manifest.yaml so the
    // catalog row matches the on-disk fixture exactly.
    BackendRuntimeContribution {
        runtime_id: "test.echo".into(),
        display_name: "Test Echo Runtime".into(),
        family: "python".into(),
        transport: "stdio".into(),
        worker_entrypoint: "worker/src/echo_worker/main.py".into(),
        version_manifest: "backends/echo/versions.yaml".into(),
        capability_tags: vec!["echo".into()],
        supported_roles: vec!["test".into()],
    }
}

async fn body_to_json(body: Body) -> Value {
    let bytes = body.collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

async fn poll_until_validated(
    repo: &SqliteInstallsRepo,
    install_id: &RuntimeInstallId,
    timeout: Duration,
) -> InstallStatus {
    let start = Instant::now();
    loop {
        let row = repo.get(install_id).await.unwrap().unwrap();
        if matches!(
            row.status,
            InstallStatus::Validated | InstallStatus::Failed | InstallStatus::Abandoned
        ) {
            return row.status;
        }
        if start.elapsed() > timeout {
            panic!(
                "install did not reach terminal state within {timeout:?}; current = {:?}",
                row.status
            );
        }
        tokio::time::sleep(Duration::from_millis(25)).await;
    }
}

#[tokio::test]
async fn install_spawns_pipeline_and_transitions_to_validated() {
    let h = spawn_harness().await;

    // Seed the catalog with the test-echo runtime contributed by the
    // `test-echo-runtime` extension (matches the on-disk extension dir).
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    register_contributions(
        &catalog,
        &SourceExtensionId::from("test-echo-runtime"),
        "0.0.1",
        &[test_echo_contribution()],
        1_700_000_000,
    )
    .await
    .unwrap();

    let body = serde_json::json!({
        "release_id": "v0_0_1",
        "platform": "linux-x64",
        "accelerator_profile": "cpu"
    });
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/test.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::ACCEPTED);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["pipeline_status"], "running");
    let install_id_str = body["data"]["runtime_install_id"]
        .as_str()
        .unwrap()
        .to_string();
    let install_id = RuntimeInstallId::from_str(&install_id_str).unwrap();

    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let final_status = poll_until_validated(&installs, &install_id, Duration::from_secs(10)).await;
    assert_eq!(
        final_status,
        InstallStatus::Validated,
        "pipeline should land in Validated"
    );

    let row = installs.get(&install_id).await.unwrap().unwrap();
    assert!(
        row.artifact_hash.is_some(),
        "verify phase wrote artifact_hash"
    );
    assert_eq!(row.runtime_id, RuntimeId::try_from("test.echo").unwrap());
    assert!(row.validated_at.is_some());
}

#[tokio::test]
async fn install_records_failure_when_family_handler_is_missing() {
    // Build a harness WITHOUT registering the family handler.
    let inner = harness_with(Arc::new(StubHf::default())).await;
    let pool = inner.state.db.pool().clone();
    let mut state = inner.state.clone();
    state.extensions_dir = Some(workspace_root().join("extensions/builtin"));
    // Note: family_handlers stays empty.
    let router = create_router(state.clone());

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

    let body = serde_json::json!({
        "release_id": "v0_0_1",
        "platform": "linux-x64",
        "accelerator_profile": "cpu"
    });
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/test.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::ACCEPTED);
    let body = body_to_json(resp.into_body()).await;
    let install_id =
        RuntimeInstallId::from_str(body["data"]["runtime_install_id"].as_str().unwrap()).unwrap();

    let installs = SqliteInstallsRepo::new(pool);
    let final_status = poll_until_validated(&installs, &install_id, Duration::from_secs(5)).await;
    assert_eq!(final_status, InstallStatus::Failed);

    let row = installs.get(&install_id).await.unwrap().unwrap();
    let cat = row
        .last_failure_category
        .expect("failure category recorded");
    assert_eq!(cat.to_wire(), "runtime_not_installed", "{:?}", cat);

    // Keep `_inner` alive
    drop(inner);
}

// -----------------------------------------------------------------------------
// T066 — SSE progress stream
// -----------------------------------------------------------------------------

#[tokio::test]
async fn progress_stream_emits_phase_events_and_terminates_with_done() {
    let h = spawn_harness().await;

    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    register_contributions(
        &catalog,
        &SourceExtensionId::from("test-echo-runtime"),
        "0.0.1",
        &[test_echo_contribution()],
        1_700_000_000,
    )
    .await
    .unwrap();

    // Subscribe BEFORE kicking the install so we don't miss early events.
    let mut rx = h.state.pipeline_events.subscribe();

    let body = serde_json::json!({
        "release_id": "v0_0_1",
        "platform": "linux-x64",
        "accelerator_profile": "cpu"
    });
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/test.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::ACCEPTED);
    let body = body_to_json(resp.into_body()).await;
    let install_id =
        RuntimeInstallId::from_str(body["data"]["runtime_install_id"].as_str().unwrap()).unwrap();

    // Drain the broadcast directly: each phase emits started + completed,
    // and the final Complete/Completed event terminates the stream.
    let mut started_count = 0;
    let mut completed_count = 0;
    let mut saw_terminal = false;
    let deadline = Instant::now() + Duration::from_secs(10);
    while Instant::now() < deadline {
        let event = match tokio::time::timeout(Duration::from_millis(200), rx.recv()).await {
            Ok(Ok(e)) => e,
            Ok(Err(_)) => break,
            Err(_) => continue,
        };
        if event.install_id != install_id {
            continue;
        }
        use nexus_backend_runtimes::generic::install_pipeline::{Phase, PhaseState};
        match event.state {
            PhaseState::Started => started_count += 1,
            PhaseState::Completed => {
                completed_count += 1;
                if matches!(event.phase, Phase::Complete) {
                    saw_terminal = true;
                    break;
                }
            }
            PhaseState::Failed => {
                saw_terminal = true;
                break;
            }
        }
    }
    assert!(saw_terminal, "expected terminal event within timeout");
    assert_eq!(started_count, 10, "10 started events");
    assert_eq!(completed_count, 10, "10 completed events");
}

#[tokio::test]
async fn progress_endpoint_returns_event_stream_content_type() {
    let h = spawn_harness().await;
    let install_id = RuntimeInstallId::new();
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{install_id}/progress"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let ct = resp
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");
    assert!(
        ct.starts_with("text/event-stream"),
        "expected text/event-stream, got `{ct}`"
    );
}

#[tokio::test]
async fn progress_endpoint_rejects_invalid_install_id() {
    let h = spawn_harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtime-installs/not-a-ulid/progress")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}
