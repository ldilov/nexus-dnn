//! Contract tests for `GET /api/v1/model-store/models/:family_id`
//! (spec 025-models-search-refactor, T060 + T061 + T062).

mod common;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_huggingface::{RepoFile, SearchResult};
use tower::ServiceExt;

use crate::common::{StubHf, gguf_result, harness_with};

async fn get(state: nexus_api::AppState, family_id: &str) -> (StatusCode, serde_json::Value) {
    let encoded = urlencoding_encode(family_id);
    let uri = format!("/api/v1/model-store/models/{encoded}");
    let router = nexus_api::create_router(state);
    let response = router
        .oneshot(Request::builder().uri(&uri).body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let json = if bytes.is_empty() {
        serde_json::Value::Null
    } else {
        serde_json::from_slice(&bytes).unwrap_or(serde_json::Value::Null)
    };
    (status, json)
}

/// Minimal %-encoder for the test path parameter — just enough to
/// round-trip `:` and `/` which the handler re-decodes.
fn urlencoding_encode(s: &str) -> String {
    let mut out = String::with_capacity(s.len() * 2);
    for b in s.bytes() {
        match b {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' => {
                out.push(b as char);
            }
            _ => out.push_str(&format!("%{b:02X}")),
        }
    }
    out
}

fn sdxl_result() -> SearchResult {
    SearchResult {
        repo_id: "stabilityai/sdxl".into(),
        author: Some("stabilityai".into()),
        license: Some("openrail++".into()),
        downloads_30d: Some(500_000),
        last_modified: Some("2026-01-01T00:00:00Z".into()),
        files: vec![
            RepoFile {
                path: "sd_xl_base_1.0.safetensors".into(),
                size_bytes: Some(6_900_000_000),
            },
            RepoFile {
                path: "vae/diffusion_pytorch_model.safetensors".into(),
                size_bytes: Some(335_000_000),
            },
            RepoFile {
                path: "text_encoder/model.safetensors".into(),
                size_bytes: Some(246_000_000),
            },
            RepoFile {
                path: "tokenizer/vocab.json".into(),
                size_bytes: Some(500_000),
            },
        ],
        formats: vec!["safetensors".into()],
        quantizations: vec![],
        pipeline_tag: Some("text-to-image".into()),
    }
}

/// T-D1 — FR-104. Returns the fully normalized family: repository
/// + artifacts + variants + deps + compat.
#[tokio::test]
async fn t_d1_returns_full_family_detail() {
    let harness = harness_with(StubHf::with_results(vec![gguf_result(
        "acme/llama-3-8b-gguf",
        &[
            ("Q4_K_M", 4_900_000_000),
            ("Q5_K_M", 5_700_000_000),
            ("Q8_0", 8_500_000_000),
        ],
    )]))
    .await;

    let (status, body) = get(harness.state, "huggingface:acme/llama-3-8b-gguf").await;
    assert_eq!(status, StatusCode::OK);

    let fam = &body["data"];
    assert_eq!(fam["family_id"], "huggingface:acme/llama-3-8b-gguf");
    assert_eq!(fam["compat"], "compatible");
    let artifacts = fam["artifacts"].as_array().unwrap();
    assert_eq!(artifacts.len(), 3);
    let variants = fam["variants"].as_array().unwrap();
    assert_eq!(variants.len(), 3);
    let labels: Vec<&str> = variants
        .iter()
        .map(|v| v["label"].as_str().unwrap())
        .collect();
    assert!(labels.contains(&"Q4_K_M"));
    assert!(labels.contains(&"Q5_K_M"));
    assert!(labels.contains(&"Q8_0"));
    let default: Vec<&serde_json::Value> = variants
        .iter()
        .filter(|v| v["is_default"].as_bool().unwrap_or(false))
        .collect();
    assert_eq!(default.len(), 1);
    assert_eq!(default[0]["label"], "Q4_K_M");
}

/// T-D2 — family unknown to upstream → 404 with code
/// `family_not_found`.
#[tokio::test]
async fn t_d2_unknown_family_returns_404_with_typed_code() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let (status, body) = get(harness.state, "huggingface:ghost/nothing-here").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert!(
        body["error"]["message"]
            .as_str()
            .unwrap_or("")
            .contains("family_not_found"),
        "error message should reference family_not_found, got {body}"
    );
}

/// T-D3 — SDXL fixture: a dependency-bearing family returns a
/// non-empty `dependencies` array with at least the VAE flagged
/// `required`. Exercises FR-040 + FR-041 end-to-end through the
/// detail handler.
#[tokio::test]
async fn t_d3_sdxl_detail_exposes_required_vae_dependency() {
    let harness = harness_with(StubHf::with_results(vec![sdxl_result()])).await;
    let (status, body) = get(harness.state, "huggingface:stabilityai/sdxl").await;
    assert_eq!(status, StatusCode::OK);

    let fam = &body["data"];
    assert_eq!(fam["repository"]["modality"], "image");

    let deps = fam["dependencies"].as_array().unwrap();
    assert!(!deps.is_empty(), "SDXL must yield at least one dependency");

    let vae = deps
        .iter()
        .find(|d| d["role"] == "vae")
        .expect("VAE dependency present");
    assert_eq!(vae["requirement"], "required");
    assert!(
        vae["target_artifact_id"]
            .as_str()
            .unwrap_or("")
            .contains("diffusion_pytorch_model"),
        "VAE target should point at the vae safetensors artifact"
    );

    let tokenizer = deps.iter().find(|d| d["role"] == "tokenizer");
    assert!(tokenizer.is_some(), "tokenizer dep surfaced when present");
    let text_encoder = deps.iter().find(|d| d["role"] == "text_encoder");
    assert!(
        text_encoder.is_some(),
        "text_encoder dep surfaced when present"
    );

    assert_eq!(fam["compat"], "downloadable_but_not_runnable");
}

/// Extra smoke: invalid family_id (no `:` separator) returns 400 with
/// a typed error, not a crash.
#[tokio::test]
async fn detail_rejects_malformed_family_id() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let (status, _body) = get(harness.state, "not-a-valid-id").await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
}
