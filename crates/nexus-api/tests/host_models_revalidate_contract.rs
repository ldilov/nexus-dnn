//! Spec 054 G2 — `POST /api/v1/host/models/revalidate` contract.
//!
//! The route sweeps every install-map row, prunes those whose on-disk file
//! vanished (shared self-heal path), and returns `{ checked, pruned }`. Also
//! covers AC-1.2/1.3/1.5 end-to-end: the stale row + its refs are gone after
//! the sweep.

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_models_store::downloads::{InstallMap, InstalledArtifactRecord};
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId};
use nexus_models_store::types::Format;
use tower::ServiceExt;

mod common;

const JOB_KEEP: &str = "00000000-0000-7000-8000-0000000000a1";
const JOB_GONE: &str = "00000000-0000-7000-8000-0000000000a2";

async fn seed_row(
    map: &InstallMap,
    sink_root: &std::path::Path,
    family: &str,
    job_id: &str,
    filename: &str,
    on_disk: bool,
) {
    map.record(InstalledArtifactRecord {
        artifact_id: ArtifactId::from(format!("{family}#{filename}")),
        family_id: FamilyId::from(family),
        variant_id: None,
        format: Format::Gguf,
        source_provider: "huggingface".into(),
        source_repo: "owner/repo".into(),
        source_revision: Some("main".into()),
        filename: filename.into(),
        job_id: JobId::from_uuid(uuid::Uuid::parse_str(job_id).unwrap()),
        sha256: None,
        size_bytes: Some(7),
    })
    .await
    .unwrap();
    if on_disk {
        let dir = sink_root.join(job_id);
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join(filename), b"weights").await.unwrap();
    }
}

async fn collect_body(body: Body) -> serde_json::Value {
    let bytes = body.collect().await.expect("collect body").to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
}

#[tokio::test]
async fn revalidate_prunes_missing_rows_and_is_idempotent() {
    let hf = std::sync::Arc::new(common::StubHf::default());
    let h = common::harness_with(hf).await;
    let map = h.install_map.clone();
    let sink_root = h.orchestrator.sink_root().to_path_buf();

    seed_row(&map, &sink_root, "hf:a/keep", JOB_KEEP, "keep.gguf", true).await;
    seed_row(&map, &sink_root, "hf:a/gone", JOB_GONE, "gone.gguf", false).await;
    map.add_ref(JOB_GONE, "ext.alpha").await.unwrap();

    let router = nexus_api::create_router(h.state);

    let resp = router
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/host/models/revalidate")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::OK);
    let body = collect_body(resp.into_body()).await;
    assert_eq!(body["checked"], 2);
    assert_eq!(body["pruned"], 1);

    // AC-1.2/1.3 — stale row and its refs are gone after self-heal.
    assert!(
        map.list_for_family(&FamilyId::from("hf:a/gone"))
            .await
            .unwrap()
            .is_empty(),
        "missing-file row pruned"
    );
    assert_eq!(map.refcount(JOB_GONE).await.unwrap(), 0, "no orphan refs");
    assert_eq!(
        map.list_for_family(&FamilyId::from("hf:a/keep"))
            .await
            .unwrap()
            .len(),
        1,
        "present-file row retained"
    );

    // AC-2.4 — idempotent: a second sweep prunes nothing.
    let resp2 = router
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/host/models/revalidate")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp2.status(), StatusCode::OK);
    let body2 = collect_body(resp2.into_body()).await;
    assert_eq!(body2["checked"], 1);
    assert_eq!(body2["pruned"], 0);
}
