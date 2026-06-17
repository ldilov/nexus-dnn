//! T097 — HTTP contract tests for /families endpoints (spec 034 US5).
//!
//! Drives the real router with the on-disk YAML descriptors plus a mock
//! reconciler so we can assert the shipped contract shape without
//! standing up a host model-store.

use std::path::PathBuf;
use std::sync::Arc;

use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use emotion_tts_extension::families::{FamilyRegistry, FamilyStatus, FamilyStatusSnapshot};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::{build_router_with_families, families::BoxReconciler};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use futures::FutureExt;
use serde_json::Value;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql).execute(&pool).await.unwrap();
    }
    pool
}

fn families_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .join("recipes")
        .join("families")
}

fn mixed_reconciler() -> BoxReconciler {
    Arc::new(|id: &str| {
        let id = id.to_string();
        async move {
            let snap = match id.as_str() {
                "indextts-2" => FamilyStatusSnapshot::available(),
                "indextts-2-5" => FamilyStatusSnapshot::not_installed(),
                _ => FamilyStatusSnapshot::partial(vec!["gpt.pth".into()]),
            };
            Ok(snap)
        }
        .boxed()
    })
}

async fn build_test_router() -> axum::Router {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(FamilyRegistry::load_from_dir(&families_dir()).expect("load"));
    build_router_with_families(
        repos,
        queue,
        "0.2.0",
        None,
        None,
        None,
        Arc::new(emotion_tts_extension::dispatcher::RunChannelRegistry::new()),
        registry,
        mixed_reconciler(),
    )
}

#[tokio::test]
async fn get_families_lists_reconciled_entries() {
    let router = build_test_router().await;

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/families")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();

    let families = body["families"].as_array().expect("families array");
    assert!(families.len() >= 2);
    let v2 = families
        .iter()
        .find(|f| f["familyId"] == "indextts-2")
        .unwrap();
    assert_eq!(v2["status"], "available");
    assert_eq!(v2["modelFamilyRef"], "IndexTeam/IndexTTS-2");
    assert!(v2["supportedLanguages"]
        .as_array()
        .unwrap()
        .contains(&Value::String("zh".into())));
    let v25 = families
        .iter()
        .find(|f| f["familyId"] == "indextts-2-5")
        .unwrap();
    assert_eq!(v25["status"], "not_installed");
    assert!(v25["supportedLanguages"]
        .as_array()
        .unwrap()
        .contains(&Value::String("ja".into())));
}

#[tokio::test]
async fn get_family_id_returns_single_entry() {
    let router = build_test_router().await;
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/families/indextts-2")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    assert_eq!(body["familyId"], "indextts-2");
    assert_eq!(body["status"], "available");
    assert!(body["expectedArtifacts"].as_array().unwrap().len() >= 14);
}

#[tokio::test]
async fn get_unknown_family_returns_404() {
    let router = build_test_router().await;
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/families/fictional-v3")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn get_install_hint_returns_encoded_host_path() {
    let router = build_test_router().await;
    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/families/indextts-2/install-hint")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    assert_eq!(body["modelFamilyRef"], "IndexTeam/IndexTTS-2");
    let host_endpoint = body["hostEndpoint"].as_str().unwrap();
    assert!(host_endpoint.starts_with("/api/v1/model-store/families/"));
    assert!(host_endpoint.ends_with("/download"));
    assert!(
        host_endpoint.contains("IndexTeam%2FIndexTTS-2")
            || host_endpoint.contains("IndexTeam/IndexTTS-2"),
        "install hint should carry the URL-encoded or raw ref; got {host_endpoint}",
    );
}

#[tokio::test]
async fn partial_status_propagates_missing_detail() {
    // Force every descriptor through the `partial` branch via a custom
    // reconciler (the shipped YAMLs both hit other branches in
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let registry = Arc::new(FamilyRegistry::load_from_dir(&families_dir()).expect("load"));
    let reconciler: BoxReconciler = Arc::new(|_id: &str| {
        async {
            Ok(FamilyStatusSnapshot::partial(vec![
                "gpt.pth".into(),
                "bpe.model".into(),
            ]))
        }
        .boxed()
    });

    let router = build_router_with_families(
        repos,
        queue,
        "0.2.0",
        None,
        None,
        None,
        Arc::new(emotion_tts_extension::dispatcher::RunChannelRegistry::new()),
        registry,
        reconciler,
    );

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/families")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();
    for entry in body["families"].as_array().unwrap() {
        assert_eq!(entry["status"], "partial");
        let detail = entry["statusDetail"].as_str().unwrap();
        assert!(detail.contains("gpt.pth"));
    }

    // FamilyStatus enum round-trip sanity.
    for variant in [
        FamilyStatus::Available,
        FamilyStatus::NotInstalled,
        FamilyStatus::Partial,
    ] {
        let v = serde_json::to_value(variant).unwrap();
        assert!(v.is_string());
    }
}
