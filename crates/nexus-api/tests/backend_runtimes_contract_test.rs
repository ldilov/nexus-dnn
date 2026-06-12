//! Contract + integration tests for the spec 032 catalog HTTP surface.
//!
//! Covers T029 (`GET /api/v1/backend-runtimes` filters + schema), T030
//! (`GET /api/v1/backend-runtimes/:id` 200 + 404), and T032 (registration
//! cascades through the bridge: register → deactivate → re-activate with
//! changed checksum → abandon).

mod common;

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use serde_json::Value;
use sqlx::sqlite::SqlitePool;
use tower::ServiceExt;

use nexus_api::create_router;
use nexus_api::handlers::backend_runtimes::registration::{
    abandon_contributions, deactivate_contributions, register_contributions,
};
use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::ids::{RuntimeId, SourceExtensionId};
use nexus_backend_runtimes::generic::installs::SqliteInstallsRepo;
use nexus_extension::manifest::BackendRuntimeContribution;

use common::{StubHf, TestHarness, harness_with};

struct CatalogHarness {
    router: axum::Router,
    pool: SqlitePool,
    // Keeps the underlying tempdir + AppState alive for the duration
    // of the test; never read directly.
    _inner: TestHarness,
}

async fn harness() -> CatalogHarness {
    let h = harness_with(Arc::new(StubHf::default())).await;
    let pool = h.state.db.pool().clone();
    let router = create_router(h.state.clone());
    CatalogHarness {
        router,
        pool,
        _inner: h,
    }
}

fn sample(runtime_id: &str, family: &str) -> BackendRuntimeContribution {
    BackendRuntimeContribution {
        runtime_id: runtime_id.into(),
        display_name: format!("Display for {runtime_id}"),
        family: family.into(),
        transport: "stdio".into(),
        worker_entrypoint: "worker/main.py".into(),
        version_manifest: "backends/v.yaml".into(),
        capability_tags: vec!["echo".into()],
        supported_roles: vec!["test".into()],
    }
}

async fn body_to_json(body: Body) -> Value {
    let bytes = body.collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

#[tokio::test]
async fn list_returns_envelope_with_runtimes_array() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert!(body["data"]["runtimes"].is_array(), "{body}");
}

#[tokio::test]
async fn list_filters_by_source_extension_and_family() {
    let h = harness().await;
    let repo = SqliteCatalogRepo::new(h.pool.clone());

    register_contributions(
        &repo,
        &SourceExtensionId::from("ext.alpha"),
        "0.1.0",
        &[
            sample("alpha.echo", "python"),
            sample("alpha.cpp", "llama.cpp"),
        ],
        1_700_000_000,
    )
    .await
    .unwrap();
    register_contributions(
        &repo,
        &SourceExtensionId::from("ext.beta"),
        "0.1.0",
        &[sample("beta.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    // Filter by source_extension_id
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes?source_extension_id=ext.alpha")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    let runtimes = body["data"]["runtimes"].as_array().unwrap();
    assert_eq!(runtimes.len(), 2);

    // Filter by source_extension_id + runtime_family
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes?source_extension_id=ext.alpha&runtime_family=python")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    let runtimes = body["data"]["runtimes"].as_array().unwrap();
    assert_eq!(runtimes.len(), 1);
    assert_eq!(runtimes[0]["runtime_id"], "alpha.echo");
    assert_eq!(runtimes[0]["runtime_family"], "python");
}

#[tokio::test]
async fn list_dto_matches_contract_schema_required_fields() {
    let h = harness().await;
    let repo = SqliteCatalogRepo::new(h.pool.clone());
    register_contributions(
        &repo,
        &SourceExtensionId::from("ext.test"),
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = body_to_json(resp.into_body()).await;
    let entry = &body["data"]["runtimes"][0];

    // Every required field per backend_runtimes.yaml#CatalogEntry
    for field in [
        "runtime_id",
        "display_name",
        "runtime_family",
        "implementation_status",
        "source_extension_id",
        "source_extension_version",
        "created_at",
        "updated_at",
    ] {
        assert!(
            !entry[field].is_null(),
            "required field `{field}` missing in DTO: {entry}"
        );
    }
    assert_eq!(entry["transport"], "stdio");
    assert_eq!(entry["implementation_status"], "available");
}

#[tokio::test]
async fn get_by_id_returns_200_when_present() {
    let h = harness().await;
    let repo = SqliteCatalogRepo::new(h.pool.clone());
    register_contributions(
        &repo,
        &SourceExtensionId::from("ext.test"),
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes/test.echo")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["runtime_id"], "test.echo");
    assert_eq!(body["data"]["runtime_family"], "python");
}

#[tokio::test]
async fn get_by_id_returns_404_when_missing() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes/nope.missing")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["error"]["code"], "runtime_not_found");
}

#[tokio::test]
async fn get_by_id_returns_400_on_invalid_id() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtimes/Bad.Id.Caps")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn register_then_deactivate_flips_status_to_unavailable() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("ext.test");

    register_contributions(
        &catalog,
        &ext,
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    deactivate_contributions(&catalog, &ext).await.unwrap();

    let entry = catalog
        .find_by_id(&RuntimeId::try_from("test.echo").unwrap())
        .await
        .unwrap()
        .unwrap();
    assert_eq!(entry.implementation_status.as_str(), "unavailable");
}

#[tokio::test]
async fn re_register_with_same_checksum_does_not_duplicate_row() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("ext.test");

    let contributions = [sample("test.echo", "python")];
    register_contributions(&catalog, &ext, "0.1.0", &contributions, 1_700_000_000)
        .await
        .unwrap();
    register_contributions(&catalog, &ext, "0.1.0", &contributions, 1_700_000_100)
        .await
        .unwrap();
    register_contributions(&catalog, &ext, "0.1.0", &contributions, 1_700_000_200)
        .await
        .unwrap();

    let all = catalog.list_all().await.unwrap();
    assert_eq!(all.len(), 1);
}

#[tokio::test]
async fn re_register_with_changed_checksum_updates_row_in_place() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("ext.test");

    let mut contributions = vec![sample("test.echo", "python")];
    register_contributions(&catalog, &ext, "0.1.0", &contributions, 1_700_000_000)
        .await
        .unwrap();

    contributions[0].display_name = "Renamed Echo".into();
    contributions[0].capability_tags.push("new_tag".into());
    register_contributions(&catalog, &ext, "0.2.0", &contributions, 1_700_000_500)
        .await
        .unwrap();

    let entry = catalog
        .find_by_id(&RuntimeId::try_from("test.echo").unwrap())
        .await
        .unwrap()
        .unwrap();
    assert_eq!(entry.display_name, "Renamed Echo");
    assert!(entry.capability_tags.contains(&"new_tag".to_string()));
    assert_eq!(entry.source_extension_version, "0.2.0");
}

#[tokio::test]
async fn cross_extension_duplicate_runtime_id_is_rejected() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());

    register_contributions(
        &catalog,
        &SourceExtensionId::from("ext.first"),
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    let err = register_contributions(
        &catalog,
        &SourceExtensionId::from("ext.second"),
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_100,
    )
    .await
    .unwrap_err();

    let msg = err.to_string();
    assert!(
        msg.contains("ext.first"),
        "expected ext.first in error: {msg}"
    );
}

async fn seed_runtime(h: &CatalogHarness, runtime_id: &str) {
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    register_contributions(
        &catalog,
        &SourceExtensionId::from("ext.test"),
        "0.1.0",
        &[sample(runtime_id, "python")],
        1_700_000_000,
    )
    .await
    .unwrap();
}

#[tokio::test]
async fn install_returns_202_with_runtime_install_id() {
    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let body = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
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
    let install_id = body["data"]["runtime_install_id"]
        .as_str()
        .expect("install_id missing");
    assert!(!install_id.is_empty());
    let pipeline_status = body["data"]["pipeline_status"].as_str().unwrap();
    assert!(
        matches!(pipeline_status, "unwired" | "running"),
        "unexpected pipeline_status: {pipeline_status}"
    );
}

#[tokio::test]
async fn install_returns_404_for_unknown_runtime() {
    let h = harness().await;
    let body = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
        "accelerator_profile": "cpu"
    });
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/missing.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn install_returns_409_when_runtime_unavailable() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("ext.test");
    register_contributions(
        &catalog,
        &ext,
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();
    deactivate_contributions(&catalog, &ext).await.unwrap();

    let body = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
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
    assert_eq!(resp.status(), StatusCode::CONFLICT);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["error"]["code"], "runtime_unavailable");
}

#[tokio::test]
async fn install_returns_409_on_in_flight_duplicate() {
    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let body_json = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
        "accelerator_profile": "cpu"
    });
    let make_req = || {
        Request::builder()
            .method("POST")
            .uri("/api/v1/backend-runtimes/test.echo/install")
            .header("content-type", "application/json")
            .body(Body::from(serde_json::to_vec(&body_json).unwrap()))
            .unwrap()
    };
    let first = h.router.clone().oneshot(make_req()).await.unwrap();
    assert_eq!(first.status(), StatusCode::ACCEPTED);

    let second = h.router.clone().oneshot(make_req()).await.unwrap();
    assert_eq!(second.status(), StatusCode::CONFLICT);
    let body = body_to_json(second.into_body()).await;
    assert_eq!(body["error"]["code"], "install_already_in_flight");
}

#[tokio::test]
async fn get_install_returns_record_after_install() {
    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let body_json = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
        "accelerator_profile": "cpu"
    });
    let install_resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/test.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body_json).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let install_body = body_to_json(install_resp.into_body()).await;
    let install_id = install_body["data"]["runtime_install_id"].as_str().unwrap();

    let get_resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!("/api/v1/backend-runtime-installs/{install_id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(get_resp.status(), StatusCode::OK);
    let get_body = body_to_json(get_resp.into_body()).await;
    assert_eq!(get_body["data"]["status"], "pending");
    assert_eq!(get_body["data"]["release_id"], "v0_1_0");
}

#[tokio::test]
async fn get_install_returns_404_when_missing() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/backend-runtime-installs/01ARZ3NDEKTSV4RRFFQ69G5FAV")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn retry_only_permitted_on_failed_status() {
    use nexus_backend_runtimes::generic::enums::{InstallStatus, PipelineFailureCategory};
    use nexus_backend_runtimes::generic::installs::SqliteInstallsRepo;

    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let body_json = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
        "accelerator_profile": "cpu"
    });
    let install_resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/backend-runtimes/test.echo/install")
                .header("content-type", "application/json")
                .body(Body::from(serde_json::to_vec(&body_json).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    let install_body = body_to_json(install_resp.into_body()).await;
    let install_id_str = install_body["data"]["runtime_install_id"]
        .as_str()
        .unwrap()
        .to_string();

    // Pending → retry is rejected as 409.
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{install_id_str}/retry"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CONFLICT);

    // Force-fail the install row, then retry succeeds.
    use std::str::FromStr;
    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let install_id =
        nexus_backend_runtimes::generic::ids::RuntimeInstallId::from_str(&install_id_str).unwrap();
    use nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo as _;
    installs
        .record_failure(
            &install_id,
            PipelineFailureCategory::HandshakeFailed,
            "synthetic test failure",
        )
        .await
        .unwrap();

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri(format!(
                    "/api/v1/backend-runtime-installs/{install_id_str}/retry"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::ACCEPTED);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["data"]["resumed_from_phase"], "resolve");

    let after = installs.get(&install_id).await.unwrap().unwrap();
    assert_eq!(after.status, InstallStatus::Pending);
}

#[tokio::test]
async fn installs_list_returns_400_when_runtime_id_is_missing() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/backend-runtime-installs")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["error"]["code"], "missing_runtime_id");
}

#[tokio::test]
async fn installs_list_returns_empty_for_runtime_with_no_installs() {
    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/backend-runtime-installs?runtime_id=test.echo")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = body_to_json(resp.into_body()).await;
    let installs = body["data"]["installs"].as_array().unwrap();
    assert!(installs.is_empty());
}

#[tokio::test]
async fn installs_list_returns_rows_in_order_after_install_post() {
    let h = harness().await;
    seed_runtime(&h, "test.echo").await;

    let req_body = serde_json::json!({
        "release_id": "v0_1_0",
        "platform": "windows-x64",
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
                .body(Body::from(serde_json::to_vec(&req_body).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::ACCEPTED);

    let list_resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/backend-runtime-installs?runtime_id=test.echo")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(list_resp.status(), StatusCode::OK);
    let body = body_to_json(list_resp.into_body()).await;
    let installs = body["data"]["installs"].as_array().unwrap();
    assert_eq!(installs.len(), 1);
    assert_eq!(installs[0]["runtime_id"], "test.echo");
    assert_eq!(installs[0]["release_id"], "v0_1_0");
    assert_eq!(installs[0]["platform"], "windows-x64");
}

#[tokio::test]
async fn installs_list_rejects_invalid_runtime_id() {
    let h = harness().await;
    let resp = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method("GET")
                .uri("/api/v1/backend-runtime-installs?runtime_id=INVALID%21")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    let body = body_to_json(resp.into_body()).await;
    assert_eq!(body["error"]["code"], "invalid_runtime_id");
}

#[tokio::test]
async fn abandon_cascade_marks_catalog_and_installs() {
    let h = harness().await;
    let catalog = SqliteCatalogRepo::new(h.pool.clone());
    let installs = SqliteInstallsRepo::new(h.pool.clone());
    let ext = SourceExtensionId::from("ext.test");

    register_contributions(
        &catalog,
        &ext,
        "0.1.0",
        &[sample("test.echo", "python")],
        1_700_000_000,
    )
    .await
    .unwrap();

    abandon_contributions(&catalog, &installs, &ext)
        .await
        .unwrap();

    let entry = catalog
        .find_by_id(&RuntimeId::try_from("test.echo").unwrap())
        .await
        .unwrap()
        .unwrap();
    assert_eq!(entry.implementation_status.as_str(), "abandoned");
}
