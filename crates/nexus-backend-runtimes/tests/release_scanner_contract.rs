//! Integration test for [`ReleaseScanner`] against a faked GitHub endpoint.
//!
//! Verifies:
//!
//! * Asset-name → variant projection for both the legacy `-cuda-cuXX.Y-`
//!   and the current `-cuda-XX.Y-` naming schemes the upstream llama.cpp
//!   tooling has shipped.
//! * Non-x64 / non-CUDA-12/13 artefacts are filtered out, so the install
//!   picker never offers a 404-bound variant.
//! * The in-process TTL cache suppresses repeated HTTP traffic inside the
//!   same window.

use std::time::Duration;

use nexus_backend_runtimes::manifest::release_scanner::{ReleaseScanner, ScannerConfig};
use nexus_backend_runtimes::settings::AcceleratorProfile;
use serde_json::json;
use wiremock::matchers::{method, path, query_param};
use wiremock::{Mock, MockServer, ResponseTemplate};

fn sample_releases_payload() -> serde_json::Value {
    json!([
        {
            "tag_name": "b8827",
            "prerelease": false,
            "draft": false,
            "assets": [
                {
                    "name": "llama-b8827-bin-win-cpu-x64.zip",
                    "browser_download_url": "https://example/b8827/win-cpu.zip",
                    "size": 8_123_456
                },
                {
                    "name": "llama-b8827-bin-win-cuda-12.4-x64.zip",
                    "browser_download_url": "https://example/b8827/win-cu12.zip",
                    "size": 312_000_000_u64
                },
                {
                    "name": "llama-b8827-bin-win-cuda-13.1-x64.zip",
                    "browser_download_url": "https://example/b8827/win-cu13.zip",
                    "size": 333_000_000_u64
                },
                {
                    "name": "llama-b8827-bin-ubuntu-x64.tar.gz",
                    "browser_download_url": "https://example/b8827/ubuntu-cpu.tar.gz",
                    "size": 7_900_000
                },
                {
                    "name": "llama-b8827-bin-win-hip-radeon-x64.zip",
                    "browser_download_url": "https://example/b8827/win-hip.zip",
                    "size": 1
                },
                {
                    "name": "llama-b8827-bin-win-vulkan-x64.zip",
                    "browser_download_url": "https://example/b8827/win-vulkan.zip",
                    "size": 1
                },
                {
                    "name": "llama-b8827-bin-macos-arm64.tar.gz",
                    "browser_download_url": "https://example/b8827/macos.tar.gz",
                    "size": 1
                },
                {
                    "name": "cudart-llama-bin-win-cuda-12.4-x64.zip",
                    "browser_download_url": "https://example/b8827/cudart.zip",
                    "size": 1
                }
            ]
        },
        {
            "tag_name": "b4970",
            "prerelease": false,
            "draft": false,
            "assets": [
                {
                    "name": "llama-b4970-bin-win-cuda-cu12.4-x64.zip",
                    "browser_download_url": "https://example/b4970/win-cu12.zip",
                    "size": 177_000_000_u64
                },
                {
                    "name": "llama-b4970-bin-win-cuda-cu11.7-x64.zip",
                    "browser_download_url": "https://example/b4970/win-cu11.zip",
                    "size": 176_000_000_u64
                },
                {
                    "name": "llama-b4970-bin-ubuntu-x64.zip",
                    "browser_download_url": "https://example/b4970/ubuntu-cpu.zip",
                    "size": 29_000_000
                }
            ]
        }
    ])
}

async fn scanner_for(server: &MockServer, ttl: Duration) -> ReleaseScanner {
    let config = ScannerConfig {
        api_base: server.uri(),
        owner: "ggml-org".into(),
        repo: "llama.cpp".into(),
        per_page: 8,
        cache_ttl: ttl,
        request_timeout: Duration::from_secs(5),
        user_agent: "nexus-dnn-test".into(),
    };
    ReleaseScanner::new(config).expect("scanner builds")
}

#[tokio::test]
async fn projects_live_github_response_into_version_manifest() {
    let server = MockServer::start().await;
    Mock::given(method("GET"))
        .and(path("/repos/ggml-org/llama.cpp/releases"))
        .and(query_param("per_page", "8"))
        .respond_with(ResponseTemplate::new(200).set_body_json(sample_releases_payload()))
        .expect(1)
        .mount(&server)
        .await;

    let scanner = scanner_for(&server, Duration::from_secs(60 * 60)).await;
    let manifest = scanner.fetch_manifest().await.expect("manifest");

    assert_eq!(manifest.backend, "llama.cpp");
    assert_eq!(manifest.default_release_id.as_deref(), Some("b8827"));
    assert_eq!(manifest.releases.len(), 2);

    let newest = &manifest.releases[0];
    assert_eq!(newest.release_id, "b8827");
    let by_profile: Vec<_> = newest
        .assets
        .iter()
        .map(|a| (a.platform.as_str(), a.accelerator_profile))
        .collect();
    assert!(by_profile.contains(&("windows-x64", AcceleratorProfile::Cpu)));
    assert!(by_profile.contains(&("windows-x64", AcceleratorProfile::Cuda12)));
    assert!(by_profile.contains(&("windows-x64", AcceleratorProfile::Cuda13)));
    assert!(by_profile.contains(&("linux-x64", AcceleratorProfile::Cpu)));
    assert_eq!(
        newest.assets.len(),
        4,
        "hip / vulkan / macos / cudart must be filtered out: {by_profile:?}"
    );

    let old = &manifest.releases[1];
    assert_eq!(old.release_id, "b4970");
    let old_profiles: Vec<_> = old
        .assets
        .iter()
        .map(|a| (a.platform.as_str(), a.accelerator_profile))
        .collect();
    assert!(old_profiles.contains(&("windows-x64", AcceleratorProfile::Cuda12)));
    assert!(old_profiles.contains(&("linux-x64", AcceleratorProfile::Cpu)));
    assert!(
        !old_profiles
            .iter()
            .any(|(_, p)| matches!(p, AcceleratorProfile::Cuda13)),
        "b4970 never shipped a cuda13 asset — scanner must not invent one"
    );
    assert_eq!(
        old.assets.len(),
        2,
        "cuda11 asset must be filtered out: {old_profiles:?}"
    );
}

#[tokio::test]
async fn subsequent_calls_within_ttl_are_served_from_cache() {
    let server = MockServer::start().await;
    Mock::given(method("GET"))
        .and(path("/repos/ggml-org/llama.cpp/releases"))
        .respond_with(ResponseTemplate::new(200).set_body_json(sample_releases_payload()))
        .expect(1)
        .mount(&server)
        .await;

    let scanner = scanner_for(&server, Duration::from_secs(60 * 60)).await;
    let first = scanner.fetch_manifest().await.expect("first fetch");
    let second = scanner.fetch_manifest().await.expect("second fetch cached");

    assert_eq!(first.releases.len(), second.releases.len());
    assert_eq!(first.default_release_id, second.default_release_id);
    // The `.expect(1)` on the mock asserts exactly one upstream hit occurred.
}

#[tokio::test]
async fn expired_cache_triggers_refetch() {
    let server = MockServer::start().await;
    Mock::given(method("GET"))
        .and(path("/repos/ggml-org/llama.cpp/releases"))
        .respond_with(ResponseTemplate::new(200).set_body_json(sample_releases_payload()))
        .expect(2)
        .mount(&server)
        .await;

    let scanner = scanner_for(&server, Duration::from_millis(1)).await;
    scanner.fetch_manifest().await.expect("first fetch");
    tokio::time::sleep(Duration::from_millis(10)).await;
    scanner.fetch_manifest().await.expect("second fetch");
}

#[tokio::test]
async fn returns_http_error_when_github_responds_non_2xx() {
    let server = MockServer::start().await;
    Mock::given(method("GET"))
        .and(path("/repos/ggml-org/llama.cpp/releases"))
        .respond_with(ResponseTemplate::new(502))
        .mount(&server)
        .await;

    let scanner = scanner_for(&server, Duration::from_secs(60)).await;
    let result = scanner.fetch_manifest().await;
    assert!(result.is_err(), "upstream 502 must surface as ScannerError");
}
