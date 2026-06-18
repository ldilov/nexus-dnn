mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_models_store::downloads::InstalledArtifactRecord;
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId, VariantId};
use nexus_models_store::types::{DependencyRole, Format};
use tower::ServiceExt;

use crate::common::{StubHf, harness_with};

async fn get_installed_body(state: nexus_api::AppState) -> serde_json::Value {
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(
            Request::builder()
                .uri("/api/v1/model-store/installed")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap()
}

fn sample_record(artifact_id: &str, family_id: &str, variant_id: &str) -> InstalledArtifactRecord {
    InstalledArtifactRecord {
        artifact_id: ArtifactId::from(artifact_id.to_string()),
        family_id: FamilyId::from(family_id.to_string()),
        variant_id: Some(VariantId::from(variant_id.to_string())),
        format: Format::Gguf,
        role: DependencyRole::Primary,
        source_provider: "huggingface".into(),
        source_repo: format!("owner/{family_id}"),
        source_revision: Some("main".into()),
        filename: format!("{variant_id}.gguf"),
        job_id: JobId::new(),
        sha256: None,
        size_bytes: Some(5_379_129_344),
    }
}

#[tokio::test]
async fn t_i1_empty_table_returns_empty_index() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let body = get_installed_body(harness.state).await;

    let data = &body["data"];
    assert_eq!(data["family_ids"], serde_json::json!([]));
    assert_eq!(data["installed"], serde_json::json!([]));
    assert_eq!(data["truncated"], serde_json::json!(false));
}

#[tokio::test]
async fn t_i2_single_record_appears_exactly_once() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    harness
        .install_map
        .record(sample_record("a_1", "llama-3-8b", "Q5_K_M"))
        .await
        .unwrap();

    let body = get_installed_body(harness.state).await;
    let installed = body["data"]["installed"].as_array().unwrap();
    assert_eq!(installed.len(), 1);
    assert_eq!(installed[0]["artifact_id"], "a_1");
    assert_eq!(installed[0]["family_id"], "llama-3-8b");
    assert_eq!(installed[0]["variant_id"], "Q5_K_M");
    assert_eq!(installed[0]["format"], "gguf");
    assert_eq!(
        body["data"]["family_ids"],
        serde_json::json!(["llama-3-8b"])
    );
}

#[tokio::test]
async fn t_i4_ordering_is_installed_at_desc() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    harness
        .install_map
        .record(sample_record("a_old", "fam-a", "Q4"))
        .await
        .unwrap();
    tokio::time::sleep(std::time::Duration::from_millis(1100)).await;
    harness
        .install_map
        .record(sample_record("a_new", "fam-b", "Q8"))
        .await
        .unwrap();

    let body = get_installed_body(harness.state).await;
    let installed = body["data"]["installed"].as_array().unwrap();
    assert_eq!(installed[0]["artifact_id"], "a_new");
    assert_eq!(installed[1]["artifact_id"], "a_old");
}

#[tokio::test]
async fn t_i2_family_ids_dedup() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    harness
        .install_map
        .record(sample_record("a_1", "llama-3-8b", "Q4"))
        .await
        .unwrap();
    harness
        .install_map
        .record(sample_record("a_2", "llama-3-8b", "Q8"))
        .await
        .unwrap();

    let body = get_installed_body(harness.state).await;
    let family_ids = body["data"]["family_ids"].as_array().unwrap();
    assert_eq!(family_ids.len(), 1);
    assert_eq!(family_ids[0], "llama-3-8b");
}
