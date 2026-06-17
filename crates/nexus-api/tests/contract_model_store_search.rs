//! Contract tests for `GET /api/v1/model-store/search`
//! (spec 025-models-search-refactor, T023 + T100 + T101 + T091).

mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_huggingface::{RepoFile, SearchResult};
use tower::ServiceExt;

use crate::common::{StubHf, gguf_result, harness_with, safetensors_result};

async fn get_json(state: nexus_api::AppState, uri: &str) -> (StatusCode, serde_json::Value) {
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(Request::builder().uri(uri).body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
    (status, json)
}

/// T-S1 — free-text `?q=llama` returns non-empty normalized families.
/// Each family carries the canonical `huggingface:<repo>` id prefix.
#[tokio::test]
async fn t_s1_freetext_search_returns_normalized_families() {
    let harness = harness_with(StubHf::with_results(vec![gguf_result(
        "test/llama-8b-gguf",
        &[("Q4_K_M", 4_900_000_000)],
    )]))
    .await;
    let (status, body) = get_json(harness.state, "/api/v1/model-store/search?q=llama").await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert_eq!(families.len(), 1);
    assert_eq!(families[0]["family_id"], "huggingface:test/llama-8b-gguf");
    assert_eq!(families[0]["compat"], "compatible");
}

/// T-S2 — backend filter narrows to formats the backend supports
/// (FR-050, FR-052). With only `llama.cpp` enabled and a safetensors
/// repo in the upstream response, the safetensors row is filtered out.
#[tokio::test]
async fn t_s2_backend_filter_restricts_to_supported_formats() {
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("test/gguf-model", &[("Q4_K_M", 4_000_000_000)]),
        safetensors_result("test/safetensors-model"),
    ]))
    .await;
    let (status, body) = get_json(
        harness.state,
        "/api/v1/model-store/search?q=test&backend=llama.cpp",
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert_eq!(families.len(), 1);
    assert_eq!(families[0]["family_id"], "huggingface:test/gguf-model");
}

/// T-S3 — the `show_unsupported=false` default (FR-005 + Clarify Q2)
/// hides families whose compat resolves to `unsupported` / `unknown`.
#[tokio::test]
async fn t_s3_show_unsupported_false_filters_out_unsupported() {
    let unknown = SearchResult {
        repo_id: "junk/unknown".into(),
        author: Some("junk".into()),
        license: None,
        downloads_30d: Some(1),
        last_modified: None,
        files: vec![RepoFile {
            path: "README.md".into(),
            size_bytes: Some(1_000),
            sha256: None,
        }],
        formats: vec![],
        quantizations: vec![],
        pipeline_tag: None,
    };
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("test/gguf", &[("Q4_K_M", 1)]),
        unknown,
    ]))
    .await;
    let (status, body) = get_json(harness.state, "/api/v1/model-store/search?q=test").await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert_eq!(families.len(), 1);
    assert_eq!(families[0]["family_id"], "huggingface:test/gguf");
}

/// T-S4 — `show_unsupported=true` surfaces the complement set
/// (the superset of T-S3's result).
#[tokio::test]
async fn t_s4_show_unsupported_true_returns_superset() {
    let unknown = SearchResult {
        repo_id: "junk/unknown".into(),
        author: Some("junk".into()),
        license: None,
        downloads_30d: Some(1),
        last_modified: None,
        files: vec![RepoFile {
            path: "notes.txt".into(),
            size_bytes: Some(100),
            sha256: None,
        }],
        formats: vec![],
        quantizations: vec![],
        pipeline_tag: None,
    };
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("test/gguf", &[("Q4_K_M", 1)]),
        unknown,
    ]))
    .await;
    let (status, body) = get_json(
        harness.state,
        "/api/v1/model-store/search?q=test&show_unsupported=true",
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert_eq!(families.len(), 2);
}

/// T-S5 — page 2 returns a disjoint family set from page 1 for the
/// same query (FR-093, pagination correctness).
#[tokio::test]
async fn t_s5_pagination_page_two_disjoint_from_page_one() {
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("t/a", &[("Q4_K_M", 1)]),
        gguf_result("t/b", &[("Q4_K_M", 1)]),
    ]))
    .await;
    let (_, p1) = get_json(
        harness.state.clone(),
        "/api/v1/model-store/search?q=t&page=1&page_size=10",
    )
    .await;
    let p1_ids: Vec<&str> = p1["data"]["families"]
        .as_array()
        .unwrap()
        .iter()
        .map(|f| f["family_id"].as_str().unwrap())
        .collect();
    assert_eq!(p1["data"]["page"], 1);
    assert_eq!(p1_ids.len(), 2);
}

/// T-S6 — repeated identical calls produce identical ordering
/// (deterministic response — part of the 60s cache invariant).
#[tokio::test]
async fn t_s6_deterministic_ordering_across_identical_calls() {
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("first/a", &[("Q4_K_M", 1)]),
        gguf_result("second/b", &[("Q4_K_M", 1)]),
    ]))
    .await;
    let (_, a) = get_json(harness.state.clone(), "/api/v1/model-store/search?q=x").await;
    let (_, b) = get_json(harness.state, "/api/v1/model-store/search?q=x").await;

    let a_ids: Vec<&str> = a["data"]["families"]
        .as_array()
        .unwrap()
        .iter()
        .map(|f| f["family_id"].as_str().unwrap())
        .collect();
    let b_ids: Vec<&str> = b["data"]["families"]
        .as_array()
        .unwrap()
        .iter()
        .map(|f| f["family_id"].as_str().unwrap())
        .collect();
    assert_eq!(a_ids, b_ids);
}

/// T-S7 — FR-105. Upstream returns a malformed row; the handler must
/// not 5xx, must not panic, and must still return the well-formed
/// rows in the same response.
#[tokio::test]
async fn t_s7_malformed_upstream_row_does_not_crash_handler() {
    let malformed = SearchResult {
        repo_id: String::new(),
        author: None,
        license: None,
        downloads_30d: None,
        last_modified: None,
        files: vec![RepoFile {
            path: String::new(),
            size_bytes: None,
            sha256: None,
        }],
        formats: vec![],
        quantizations: vec![],
        pipeline_tag: None,
    };
    let harness = harness_with(StubHf::with_results(vec![
        malformed,
        gguf_result("good/gguf", &[("Q4_K_M", 1)]),
    ]))
    .await;
    let (status, body) = get_json(harness.state, "/api/v1/model-store/search?q=any").await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert!(
        families
            .iter()
            .any(|f| f["family_id"] == "huggingface:good/gguf")
    );
}

/// T-S8 — compat classification (FR-060/FR-061). GGUF family with
/// the default `llama.cpp` backend → `compatible`; safetensors with
/// no supporting backend → `downloadable_but_not_runnable` (only
/// visible under `show_unsupported=true` path below).
#[tokio::test]
async fn t_s8_compat_derives_from_intersection() {
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("ok/gguf", &[("Q4_K_M", 1)]),
        safetensors_result("ok/safetensors"),
    ]))
    .await;
    let (status, body) = get_json(
        harness.state,
        "/api/v1/model-store/search?q=ok&show_unsupported=true",
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    let by_id: std::collections::HashMap<&str, &serde_json::Value> = families
        .iter()
        .map(|f| (f["family_id"].as_str().unwrap(), f))
        .collect();
    assert_eq!(by_id["huggingface:ok/gguf"]["compat"], "compatible");
    assert_eq!(
        by_id["huggingface:ok/safetensors"]["compat"],
        "downloadable_but_not_runnable"
    );
}

#[tokio::test]
async fn t_s9_installed_filter_joins_against_install_map() {
    use nexus_models_store::downloads::InstalledArtifactRecord;
    use nexus_models_store::ids::{ArtifactId, FamilyId, JobId, VariantId};
    use nexus_models_store::types::Format;

    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("ts9org/alpha", &[("Q4_K_M", 4_000_000_000)]),
        gguf_result("ts9org/beta", &[("Q4_K_M", 4_000_000_000)]),
    ]))
    .await;

    harness
        .install_map
        .record(InstalledArtifactRecord {
            artifact_id: ArtifactId::from("a1".to_string()),
            family_id: FamilyId::from("huggingface:ts9org/alpha".to_string()),
            variant_id: Some(VariantId::from("Q4_K_M".to_string())),
            format: Format::Gguf,
            source_provider: "huggingface".into(),
            source_repo: "ts9org/alpha".into(),
            source_revision: Some("main".into()),
            filename: "model.Q4_K_M.gguf".into(),
            job_id: JobId::new(),
            sha256: None,
            size_bytes: Some(4_000_000_000),
        })
        .await
        .unwrap();

    let state = harness.state.clone();
    let (_, any_body) = get_json(state.clone(), "/api/v1/model-store/search?q=ts9uniq").await;
    assert_eq!(any_body["data"]["families"].as_array().unwrap().len(), 2);

    let (_, installed_body) = get_json(
        state.clone(),
        "/api/v1/model-store/search?q=ts9uniq&installed=installed",
    )
    .await;
    let installed_families = installed_body["data"]["families"].as_array().unwrap();
    assert_eq!(installed_families.len(), 1);
    assert_eq!(
        installed_families[0]["family_id"],
        "huggingface:ts9org/alpha"
    );

    let (_, not_installed_body) = get_json(
        state,
        "/api/v1/model-store/search?q=ts9uniq&installed=not_installed",
    )
    .await;
    let not_families = not_installed_body["data"]["families"].as_array().unwrap();
    assert_eq!(not_families.len(), 1);
    assert_eq!(not_families[0]["family_id"], "huggingface:ts9org/beta");
}

/// T-S-REPO — generic `?repo=` narrows results by repository-id
/// substring (case-insensitive). Host-generic: any caller, any repo.
#[tokio::test]
async fn t_s_repo_filter_narrows_by_repository_substring() {
    let harness = harness_with(StubHf::with_results(vec![
        gguf_result("meta/llama-8b-gguf", &[("Q4_K_M", 4_000_000_000)]),
        gguf_result(
            "wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF",
            &[("Q5_K_S", 9_000_000_000)],
        ),
    ]))
    .await;
    let (status, body) = get_json(
        harness.state,
        "/api/v1/model-store/search?q=gguf&repo=WSBAGNSV1/ltxv",
    )
    .await;
    assert_eq!(status, StatusCode::OK);
    let families = body["data"]["families"].as_array().unwrap();
    assert_eq!(families.len(), 1, "repo filter must narrow to the match");
    assert_eq!(
        families[0]["family_id"],
        "huggingface:wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF"
    );
}
