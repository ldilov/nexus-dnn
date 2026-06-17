use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tower::ServiceExt;

mod common;

async fn build_state() -> AppState {
    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let ext_dir = tempfile::tempdir().expect("tempdir");
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (extension_registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .expect("empty extension registry");

    let artifact_dir = ext_dir.path().join("artifacts");
    std::fs::create_dir_all(&artifact_dir).expect("artifact dir");
    let artifact_store = Arc::new(FilesystemArtifactStore::new(artifact_dir));

    let scheduler: Arc<RoundRobinScheduler> = Arc::new(RoundRobinScheduler);
    let run_engine = Arc::new(DefaultRunEngine::new(
        db.clone(),
        worker_manager.clone(),
        artifact_store.clone(),
        event_bus.clone(),
        scheduler.clone(),
    ));

    let backend_event_bus = Arc::new(nexus_backend_runtimes::events::BackendEventBus::new(1024));

    AppState {
        health_status_fn: Arc::new(|| serde_json::json!({ "status": "ok" })),
        db,
        event_bus,
        extension_registry: Arc::new(extension_registry),
        run_engine,
        worker_manager,
        scheduler,
        artifact_store,
        extensions_dir: None,
        storage_manager: None,
        backend_adapter_registry: None,
        spawner: None,
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_publisher: backend_event_bus.clone(),
        backend_event_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        extension_router_registry: {
            use nexus_api::extension_router::ExtensionRouterRegistry as _;
            let r = std::sync::Arc::new(nexus_api::extension_router::DefaultRegistry::new());
            r.seal();
            r as nexus_api::extension_router::SharedRegistry
        },
        family_handlers:
            nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry::new(),
        pipeline_events: {
            let (tx, _) = tokio::sync::broadcast::channel(nexus_api::PIPELINE_EVENT_CAPACITY);
            std::sync::Arc::new(tx)
        },
        lease_manager: std::sync::Arc::new(
            nexus_backend_runtimes::generic::leases::LeaseManager::new(),
        ),
        dep_handler_registry: None,
        dep_install_state: std::sync::Arc::new(dashmap::DashMap::new()),
        dep_runtime_bootstrapper: None,
        dep_model_store: None,
        dep_worker_handshake: None,
        dep_fetch_artifact: None,
        dep_host_data_dir: None,
    }
}

async fn seed_install(db: &SqliteDatabase, install_id: &str, private: bool, owner: Option<&str>) {
    let now = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
         install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
         source_url, license_spdx, license_url, private_model, owner_extension_id, created_at, \
         updated_at) VALUES ($1,'llama','3-8b','Q4_K_M','default','/t','[]',$2,$2,'ready',\
         'huggingface','hf://meta/llama-3-8b','apache-2.0','https://spdx.org/licenses/Apache-2.0',\
         $3,$4,$5,$5)",
    )
    .bind(install_id)
    .bind(format!("sha-{install_id}"))
    .bind(private as i64)
    .bind(owner)
    .bind(&now)
    .execute(db.pool())
    .await
    .expect("seed install");
}

async fn collect_body(body: Body) -> serde_json::Value {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
}

async fn count_rows(db: &SqliteDatabase) -> i64 {
    use sqlx::Row;
    sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(db.pool())
        .await
        .unwrap()
        .try_get("n")
        .unwrap()
}

#[tokio::test]
async fn list_host_models_includes_license_source_and_sha() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let router = nexus_api::create_router(state);
    let request = Request::builder()
        .uri("/api/v1/host-models")
        .body(Body::empty())
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let first = &body["data"]["installs"][0];
    assert_eq!(first["install_id"], "pub-1");
    assert_eq!(first["license_spdx"], "apache-2.0");
    assert!(first["license_url"].is_string());
    assert!(first["sha256_root"].is_string());
    assert_eq!(first["source_kind"], "huggingface");
    assert!(first["source_url"].is_string());
    assert!(first["source_revision"].is_string());
}

#[tokio::test]
async fn private_model_hidden_from_anonymous_listing() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;
    seed_install(&state.db, "priv-1", true, Some("ext-alpha")).await;

    let router = nexus_api::create_router(state);
    let request = Request::builder()
        .uri("/api/v1/host-models")
        .body(Body::empty())
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    let body = collect_body(response.into_body()).await;
    let ids: Vec<&str> = body["data"]["installs"]
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v["install_id"].as_str().unwrap())
        .collect();
    assert!(ids.contains(&"pub-1"));
    assert!(!ids.contains(&"priv-1"));
}

#[tokio::test]
async fn resolve_endpoint_does_not_mutate_state() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let before = count_rows(&state.db).await;
    let db_handle = state.db.clone();
    let router = nexus_api::create_router(state);

    let payload = serde_json::json!({
        "dependencies": [
            { "family": "llama", "version": "3-8b", "allow_unpinned": true,
              "quantization": "Q4_K_M" },
            { "family": "missing-fam", "version": "v", "allow_unpinned": true }
        ]
    });
    let request = Request::builder()
        .method("POST")
        .uri("/api/v1/host-models/resolve")
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_vec(&payload).unwrap()))
        .unwrap();
    let response = router.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let data = &body["data"];
    assert_eq!(data["matched"].as_array().unwrap().len(), 1);
    assert_eq!(data["missing"].as_array().unwrap().len(), 1);

    let after = count_rows(&db_handle).await;
    assert_eq!(before, after);
}

#[tokio::test]
async fn lease_endpoints_mirror_runtime_lease_shape() {
    let state = build_state().await;
    seed_install(&state.db, "leasable-1", false, None).await;
    let db_handle = state.db.clone();
    let router = nexus_api::create_router(state);

    let acquire_payload = serde_json::json!({
        "extension_id": "ext.test",
        "device": "cuda:0",
        "vram_reserved_bytes": 1024,
        "device_budget_bytes": 12u64 * 1024 * 1024 * 1024,
    });
    let acquire_req = Request::builder()
        .method("POST")
        .uri("/api/v1/host-models/leasable-1/leases")
        .header("Content-Type", "application/json")
        .body(Body::from(serde_json::to_vec(&acquire_payload).unwrap()))
        .unwrap();
    let acquire_resp = router.clone().oneshot(acquire_req).await.unwrap();
    assert_eq!(acquire_resp.status(), StatusCode::OK);
    let acquire_body = collect_body(acquire_resp.into_body()).await;
    let lease_id = acquire_body["data"]["lease_id"]
        .as_str()
        .expect("lease_id")
        .to_string();
    assert!(lease_id.starts_with("ml-"));

    let release_req = Request::builder()
        .method("DELETE")
        .uri(format!("/api/v1/host-models/leases/{lease_id}"))
        .body(Body::empty())
        .unwrap();
    let release_resp = router.oneshot(release_req).await.unwrap();
    assert_eq!(release_resp.status(), StatusCode::OK);
    let release_body = collect_body(release_resp.into_body()).await;
    assert_eq!(release_body["data"]["lease_id"], lease_id);

    use sqlx::Row;
    let released: Option<String> =
        sqlx::query("SELECT released_at FROM host_model_leases WHERE lease_id = $1")
            .bind(&lease_id)
            .fetch_one(db_handle.pool())
            .await
            .unwrap()
            .try_get("released_at")
            .ok();
    assert!(released.is_some(), "released_at populated after DELETE");
}

#[tokio::test]
async fn host_runtimes_and_host_models_are_independent_top_level_lists() {
    let state = build_state().await;
    seed_install(&state.db, "pub-1", false, None).await;

    let router = nexus_api::create_router(state);
    let resp_m = router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp_m.status(), StatusCode::OK);

    let resp_r = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/backends")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp_r.status(), StatusCode::OK);
}

async fn seed_install_family(db: &SqliteDatabase, install_id: &str, family: &str) {
    let now = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
         install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
         source_url, license_spdx, license_url, private_model, owner_extension_id, created_at, \
         updated_at) VALUES ($1,$2,'v','q','default','/t','[]',$3,$3,'ready','huggingface',\
         'hf://x','apache-2.0','https://x',0,NULL,$4,$4)",
    )
    .bind(install_id)
    .bind(family)
    .bind(format!("sha-{install_id}"))
    .bind(&now)
    .execute(db.pool())
    .await
    .expect("seed install family");
}

#[tokio::test]
async fn family_query_param_filters_installs_server_side() {
    let state = build_state().await;
    seed_install_family(&state.db, "llama-1", "llama").await;
    seed_install_family(&state.db, "ltxv-1", "ltxv-13b-0.9.7-dev-gguf").await;

    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models?family=ltxv-13b-0.9.7-dev-gguf")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let installs = body["data"]["installs"].as_array().expect("installs array");
    assert_eq!(
        installs.len(),
        1,
        "only the matching family must be returned"
    );
    assert_eq!(installs[0]["family"], "ltxv-13b-0.9.7-dev-gguf");
}

#[tokio::test]
async fn absent_family_query_param_returns_all_installs() {
    let state = build_state().await;
    seed_install_family(&state.db, "a", "fam-a").await;
    seed_install_family(&state.db, "b", "fam-b").await;

    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = collect_body(response.into_body()).await;
    assert_eq!(
        body["data"]["installs"].as_array().expect("installs").len(),
        2
    );
}

async fn seed_install_src(db: &SqliteDatabase, install_id: &str, source_url: &str) {
    let now = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
         install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
         source_url, license_spdx, license_url, private_model, owner_extension_id, created_at, \
         updated_at) VALUES ($1,'llama','v','gguf','default','/t','[]',$2,$2,'ready',\
         'huggingface',$3,'apache-2.0','https://x',0,NULL,$4,$4)",
    )
    .bind(install_id)
    .bind(format!("sha-{install_id}"))
    .bind(source_url)
    .bind(&now)
    .execute(db.pool())
    .await
    .expect("seed install src");
}

#[tokio::test]
async fn repo_query_param_filters_by_source_url_substring() {
    let state = build_state().await;
    seed_install_src(
        &state.db,
        "llm-1",
        "https://huggingface.co/TheBloke/Llama-3-8B-GGUF",
    )
    .await;
    seed_install_src(
        &state.db,
        "ltxv-1",
        "https://huggingface.co/wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF",
    )
    .await;

    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models?repo=wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body = collect_body(response.into_body()).await;
    let installs = body["data"]["installs"].as_array().expect("installs array");
    assert_eq!(installs.len(), 1, "only the matching repo must be returned");
    assert_eq!(installs[0]["install_id"], "ltxv-1");
}

async fn write_existing(dir: &std::path::Path, rel: &str, bytes: &[u8]) {
    let p = dir.join(rel);
    tokio::fs::create_dir_all(p.parent().unwrap())
        .await
        .unwrap();
    tokio::fs::write(&p, bytes).await.unwrap();
}

fn register_existing_payload(repo: &str, root: &std::path::Path) -> serde_json::Value {
    serde_json::json!({
        "source": "huggingface",
        "repo_id": repo,
        "files": ["model.Q5_K_M.gguf", "sub/vae.safetensors"],
        "existing_root": root.to_string_lossy(),
    })
}

#[tokio::test]
async fn register_existing_adopts_on_disk_tree_and_dedups_with_foundry() {
    let hf = Arc::new(common::StubHf::default());
    let mut h = common::harness_with(hf).await;

    let work = tempfile::tempdir().expect("workdir");
    let existing = work.path().join("ext-owned/org/repo");
    write_existing(&existing, "model.Q5_K_M.gguf", b"transformer").await;
    write_existing(&existing, "sub/vae.safetensors", b"vae").await;
    let installs = work.path().join("installs");
    let blobs = work.path().join("blobs");
    h.state.host_install_paths = Some(nexus_api::HostInstallPaths {
        installs_root: installs,
        blobs_root: blobs,
    });

    let db_handle = h.state.db.clone();
    let router = nexus_api::create_router(h.state);

    // First registration -> 201 Created, fresh install.
    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/host-models/register-existing")
                .header("Content-Type", "application/json")
                .body(Body::from(
                    serde_json::to_vec(&register_existing_payload("org/repo", &existing)).unwrap(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CREATED);
    let body = collect_body(resp.into_body()).await;
    let install_id = body["data"]["install_id"]
        .as_str()
        .expect("install_id")
        .to_string();
    assert!(install_id.starts_with("hmi_"));
    assert_eq!(body["data"]["already_installed"], false);
    assert_eq!(body["data"]["routed_backend"], "llama.cpp");
    assert!(body["data"]["sha256_root"].is_string());

    // Source tree the host does not own MUST survive untouched.
    assert!(existing.join("model.Q5_K_M.gguf").is_file());
    assert!(existing.join("sub/vae.safetensors").is_file());

    // Surfaces in the generic ?repo= listing as a ready local_import row.
    let listed = router
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models?repo=org/repo")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let listed_body = collect_body(listed.into_body()).await;
    let installs_arr = listed_body["data"]["installs"]
        .as_array()
        .expect("installs");
    assert_eq!(installs_arr.len(), 1);
    assert_eq!(installs_arr[0]["install_id"], install_id);
    assert_eq!(installs_arr[0]["source_kind"], "local_import");
    assert_eq!(installs_arr[0]["state"], "ready");

    // Re-register the same repo+tree -> 200 OK, SAME install_id (the
    // convergence guarantee: an extension's own download dedups against a
    let again = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/host-models/register-existing")
                .header("Content-Type", "application/json")
                .body(Body::from(
                    serde_json::to_vec(&register_existing_payload("org/repo", &existing)).unwrap(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(again.status(), StatusCode::OK);
    let again_body = collect_body(again.into_body()).await;
    assert_eq!(again_body["data"]["already_installed"], true);
    assert_eq!(again_body["data"]["install_id"], install_id);

    let n = count_rows(&db_handle).await;
    assert_eq!(n, 1, "idempotent — exactly one row after re-register");
}

#[tokio::test]
async fn register_existing_rejects_path_traversal_before_touching_store() {
    let hf = Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let router = nexus_api::create_router(h.state);

    let payload = serde_json::json!({
        "source": "huggingface",
        "repo_id": "org/repo",
        "files": ["../escape.gguf"],
        "existing_root": "/tmp/whatever",
    });
    let resp = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/host-models/register-existing")
                .header("Content-Type", "application/json")
                .body(Body::from(serde_json::to_vec(&payload).unwrap()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn family_and_repo_filters_combine_as_and() {
    let state = build_state().await;
    seed_install_src(
        &state.db,
        "ltxv-1",
        "https://huggingface.co/wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF",
    )
    .await;

    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/host-models?family=llama&repo=does-not-match")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body = collect_body(response.into_body()).await;
    assert_eq!(
        body["data"]["installs"].as_array().expect("installs").len(),
        0,
        "family matches but repo does not -> AND yields empty"
    );
}
