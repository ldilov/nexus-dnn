//! Live release scanner for upstream llama.cpp builds.
//!
//! Hits the GitHub releases API, parses each asset name, and projects the
//! results into the same [`VersionManifest`] shape that the on-disk
//! `versions.yaml` produces. The rest of the install pipeline — variant
//! projection, asset resolution, download, extract — is oblivious to where
//! the manifest came from.
//!
//! Caching: the last successful scan is held in-process for
//! [`ScannerConfig::cache_ttl`]. GitHub unauthenticated rate limit is 60
//! req/hour/IP, so a 1 h default keeps us well under the ceiling even under
//! rapid UI revalidation.

use std::sync::Arc;
use std::time::{Duration, Instant};

use reqwest::Client;
use serde::Deserialize;
use tokio::sync::RwLock;

use crate::manifest::version::{ArchiveKind, Release, ReleaseAsset, VersionManifest};
use crate::settings::AcceleratorProfile;

#[derive(Debug, thiserror::Error)]
pub enum ScannerError {
    #[error("http request failed: {0}")]
    Http(String),
    #[error("github api returned status {status}")]
    ApiStatus { status: u16 },
    #[error("failed to decode github response: {0}")]
    Decode(String),
    #[error("no usable releases found upstream")]
    NoUsableReleases,
}

impl From<reqwest::Error> for ScannerError {
    fn from(e: reqwest::Error) -> Self {
        Self::Http(e.to_string())
    }
}

#[derive(Debug, Clone)]
pub struct ScannerConfig {
    pub api_base: String,
    pub owner: String,
    pub repo: String,
    pub per_page: u32,
    pub cache_ttl: Duration,
    pub request_timeout: Duration,
    pub user_agent: String,
}

impl ScannerConfig {
    pub fn llama_cpp_default() -> Self {
        Self {
            api_base: "https://api.github.com".into(),
            owner: "ggml-org".into(),
            repo: "llama.cpp".into(),
            per_page: 8,
            cache_ttl: Duration::from_secs(60 * 60),
            request_timeout: Duration::from_secs(15),
            user_agent: "nexus-dnn-release-scanner".into(),
        }
    }
}

#[derive(Debug, Deserialize)]
struct ApiRelease {
    tag_name: String,
    #[serde(default)]
    prerelease: bool,
    #[serde(default)]
    draft: bool,
    #[serde(default)]
    assets: Vec<ApiAsset>,
}

#[derive(Debug, Deserialize)]
struct ApiAsset {
    name: String,
    browser_download_url: String,
    #[serde(default)]
    size: Option<u64>,
}

struct CacheEntry {
    manifest: VersionManifest,
    fetched_at: Instant,
}

pub struct ReleaseScanner {
    client: Client,
    config: ScannerConfig,
    cache: RwLock<Option<CacheEntry>>,
}

impl ReleaseScanner {
    pub fn new(config: ScannerConfig) -> Result<Self, ScannerError> {
        let client = Client::builder()
            .user_agent(config.user_agent.clone())
            .timeout(config.request_timeout)
            .build()?;
        Ok(Self {
            client,
            config,
            cache: RwLock::new(None),
        })
    }

    pub async fn fetch_manifest(&self) -> Result<VersionManifest, ScannerError> {
        if let Some(cached) = self.cached_if_fresh().await {
            return Ok(cached);
        }
        let manifest = self.fetch_live().await?;
        let mut guard = self.cache.write().await;
        *guard = Some(CacheEntry {
            manifest: manifest.clone(),
            fetched_at: Instant::now(),
        });
        Ok(manifest)
    }

    async fn cached_if_fresh(&self) -> Option<VersionManifest> {
        let guard = self.cache.read().await;
        guard
            .as_ref()
            .filter(|e| e.fetched_at.elapsed() < self.config.cache_ttl)
            .map(|e| e.manifest.clone())
    }

    async fn fetch_live(&self) -> Result<VersionManifest, ScannerError> {
        let url = format!(
            "{}/repos/{}/{}/releases?per_page={}",
            self.config.api_base, self.config.owner, self.config.repo, self.config.per_page
        );
        let resp = self
            .client
            .get(&url)
            .header("Accept", "application/vnd.github+json")
            .header("X-GitHub-Api-Version", "2022-11-28")
            .send()
            .await?;
        let status = resp.status();
        if !status.is_success() {
            return Err(ScannerError::ApiStatus {
                status: status.as_u16(),
            });
        }
        let bytes = resp.bytes().await?;
        let api_releases: Vec<ApiRelease> =
            serde_json::from_slice(&bytes).map_err(|e| ScannerError::Decode(e.to_string()))?;
        project_manifest(&api_releases).ok_or(ScannerError::NoUsableReleases)
    }
}

fn project_manifest(releases: &[ApiRelease]) -> Option<VersionManifest> {
    let mut out = Vec::new();
    let mut default_release_id: Option<String> = None;
    for r in releases {
        if r.draft {
            continue;
        }
        let assets = project_release_assets(&r.assets);
        if assets.is_empty() {
            continue;
        }
        if default_release_id.is_none() && !r.prerelease {
            default_release_id = Some(r.tag_name.clone());
        }
        out.push(Release {
            release_id: r.tag_name.clone(),
            release_notes_url: Some(format!(
                "https://github.com/ggml-org/llama.cpp/releases/tag/{}",
                r.tag_name
            )),
            assets,
        });
    }
    if out.is_empty() {
        return None;
    }
    if default_release_id.is_none() {
        default_release_id = out.first().map(|r| r.release_id.clone());
    }
    Some(VersionManifest {
        backend: "llama.cpp".into(),
        default_release_id,
        releases: out,
    })
}

fn project_release_assets(api_assets: &[ApiAsset]) -> Vec<ReleaseAsset> {
    api_assets
        .iter()
        .filter_map(|a| {
            let parsed = parse_asset_name(&a.name)?;
            Some(ReleaseAsset {
                platform: parsed.platform.into(),
                accelerator_profile: parsed.accelerator_profile,
                url: a.browser_download_url.clone(),
                archive_kind: Some(parsed.archive_kind),
                checksum_sha256: None,
                size_bytes: a.size,
                binary_relpath: None,
            })
        })
        .collect()
}

#[derive(Debug, PartialEq, Eq)]
struct ParsedAsset {
    platform: &'static str,
    accelerator_profile: AcceleratorProfile,
    archive_kind: ArchiveKind,
}

/// Parses an llama.cpp release asset filename into a structured variant.
///
/// Accepts the historical `-cuda-cu12.4-` and current `-cuda-12.4-` naming
/// schemes, Windows `.zip` and Linux `.tar.gz` archives, and only x64
/// cpu / cuda12 / cuda13 combinations. Everything else (vulkan, hip, sycl,
/// rocm, openvino, arm64, macos, xcframework, cudart runtime bundles, cuda11)
/// returns `None` so it never surfaces in the install picker.
fn parse_asset_name(name: &str) -> Option<ParsedAsset> {
    let (stem, archive_kind) = strip_archive_suffix(name)?;
    let rest = stem.strip_prefix("llama-")?;
    let body_start = rest.find("-bin-")?;
    let after_bin = &rest[body_start + "-bin-".len()..];
    let (os_token, after_os) = split_once(after_bin, '-')?;
    let platform = match os_token {
        "win" => "windows-x64",
        "ubuntu" => "linux-x64",
        _ => return None,
    };
    let (accelerator_profile, tail) = parse_accelerator(after_os)?;
    if tail != "x64" {
        return None;
    }
    Some(ParsedAsset {
        platform,
        accelerator_profile,
        archive_kind,
    })
}

fn strip_archive_suffix(name: &str) -> Option<(&str, ArchiveKind)> {
    if let Some(stem) = name.strip_suffix(".tar.gz") {
        Some((stem, ArchiveKind::TarGz))
    } else if let Some(stem) = name.strip_suffix(".zip") {
        Some((stem, ArchiveKind::Zip))
    } else {
        None
    }
}

fn split_once(s: &str, sep: char) -> Option<(&str, &str)> {
    let idx = s.find(sep)?;
    Some((&s[..idx], &s[idx + 1..]))
}

fn parse_accelerator(after_os: &str) -> Option<(AcceleratorProfile, &str)> {
    if let Some(cpu_tail) = after_os.strip_prefix("cpu-") {
        return Some((AcceleratorProfile::Cpu, cpu_tail));
    }
    if let Some(cuda_rest) = after_os.strip_prefix("cuda-") {
        let major_end = cuda_rest.find(['-', '.'])?;
        let version_token = &cuda_rest[..major_end];
        let after_dash = cuda_rest[major_end..].find('-')?;
        let after_version = &cuda_rest[major_end + after_dash + 1..];
        let profile = match cuda_major(version_token)? {
            12 => AcceleratorProfile::Cuda12,
            13 => AcceleratorProfile::Cuda13,
            _ => return None,
        };
        return Some((profile, after_version));
    }
    if after_os.starts_with("x64") {
        return Some((AcceleratorProfile::Cpu, after_os));
    }
    None
}

fn cuda_major(token: &str) -> Option<u32> {
    let trimmed = token.strip_prefix("cu").unwrap_or(token);
    let major_end = trimmed.find('.').unwrap_or(trimmed.len());
    trimmed[..major_end].parse().ok()
}

pub type SharedScanner = Arc<ReleaseScanner>;

#[cfg(test)]
mod tests {
    use super::*;

    fn w(profile: AcceleratorProfile) -> ParsedAsset {
        ParsedAsset {
            platform: "windows-x64",
            accelerator_profile: profile,
            archive_kind: ArchiveKind::Zip,
        }
    }

    fn l(profile: AcceleratorProfile, kind: ArchiveKind) -> ParsedAsset {
        ParsedAsset {
            platform: "linux-x64",
            accelerator_profile: profile,
            archive_kind: kind,
        }
    }

    #[test]
    fn parses_new_pattern_win_cpu() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-win-cpu-x64.zip"),
            Some(w(AcceleratorProfile::Cpu))
        );
    }

    #[test]
    fn parses_new_pattern_win_cuda12() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-win-cuda-12.4-x64.zip"),
            Some(w(AcceleratorProfile::Cuda12))
        );
    }

    #[test]
    fn parses_new_pattern_win_cuda13() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-win-cuda-13.1-x64.zip"),
            Some(w(AcceleratorProfile::Cuda13))
        );
    }

    #[test]
    fn parses_old_pattern_win_cuda12_prefixed() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-win-cuda-cu12.4-x64.zip"),
            Some(w(AcceleratorProfile::Cuda12))
        );
    }

    #[test]
    fn parses_old_pattern_win_cuda12_with_patch() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-win-cuda-cu12.4.1-x64.zip"),
            Some(w(AcceleratorProfile::Cuda12))
        );
    }

    #[test]
    fn parses_old_pattern_win_cuda13_with_patch() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-win-cuda-cu13.0.0-x64.zip"),
            Some(w(AcceleratorProfile::Cuda13))
        );
    }

    #[test]
    fn parses_new_linux_cpu_tar_gz() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-ubuntu-x64.tar.gz"),
            Some(l(AcceleratorProfile::Cpu, ArchiveKind::TarGz))
        );
    }

    #[test]
    fn parses_old_linux_cpu_zip() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-ubuntu-x64.zip"),
            Some(l(AcceleratorProfile::Cpu, ArchiveKind::Zip))
        );
    }

    #[test]
    fn parses_old_linux_cuda12_zip() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-ubuntu-cuda-cu12.4.1-x64.zip"),
            Some(l(AcceleratorProfile::Cuda12, ArchiveKind::Zip))
        );
    }

    #[test]
    fn rejects_cuda11() {
        assert_eq!(
            parse_asset_name("llama-b4970-bin-win-cuda-cu11.7-x64.zip"),
            None
        );
    }

    #[test]
    fn rejects_cudart_runtime_bundle() {
        assert_eq!(
            parse_asset_name("cudart-llama-bin-win-cu12.4-x64.zip"),
            None
        );
    }

    #[test]
    fn rejects_vulkan() {
        assert_eq!(parse_asset_name("llama-b8827-bin-win-vulkan-x64.zip"), None);
    }

    #[test]
    fn rejects_sycl() {
        assert_eq!(parse_asset_name("llama-b8827-bin-win-sycl-x64.zip"), None);
    }

    #[test]
    fn rejects_hip() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-win-hip-radeon-x64.zip"),
            None
        );
    }

    #[test]
    fn rejects_arm64() {
        assert_eq!(parse_asset_name("llama-b8827-bin-win-cpu-arm64.zip"), None);
        assert_eq!(
            parse_asset_name("llama-b8827-bin-ubuntu-arm64.tar.gz"),
            None
        );
    }

    #[test]
    fn rejects_macos() {
        assert_eq!(parse_asset_name("llama-b8827-bin-macos-x64.tar.gz"), None);
        assert_eq!(parse_asset_name("llama-b8827-bin-macos-arm64.tar.gz"), None);
    }

    #[test]
    fn rejects_xcframework() {
        assert_eq!(parse_asset_name("llama-b8827-xcframework.zip"), None);
    }

    #[test]
    fn rejects_openeuler_and_vendor_linux_builds() {
        assert_eq!(
            parse_asset_name("llama-b8827-bin-310p-openEuler-x86.tar.gz"),
            None
        );
        assert_eq!(
            parse_asset_name("llama-b8827-bin-ubuntu-openvino-2026.0-x64.tar.gz"),
            None
        );
        assert_eq!(
            parse_asset_name("llama-b8827-bin-ubuntu-rocm-7.2-x64.tar.gz"),
            None
        );
    }

    #[test]
    fn project_manifest_skips_releases_with_no_usable_assets() {
        let releases = vec![
            ApiRelease {
                tag_name: "b_empty".into(),
                prerelease: false,
                draft: false,
                assets: vec![ApiAsset {
                    name: "llama-b_empty-bin-macos-x64.tar.gz".into(),
                    browser_download_url: "https://example/macos".into(),
                    size: Some(1),
                }],
            },
            ApiRelease {
                tag_name: "b_good".into(),
                prerelease: false,
                draft: false,
                assets: vec![ApiAsset {
                    name: "llama-b_good-bin-win-cpu-x64.zip".into(),
                    browser_download_url: "https://example/win".into(),
                    size: Some(42),
                }],
            },
        ];
        let manifest = project_manifest(&releases).expect("usable release present");
        assert_eq!(manifest.releases.len(), 1);
        assert_eq!(manifest.releases[0].release_id, "b_good");
        assert_eq!(manifest.default_release_id.as_deref(), Some("b_good"));
    }

    #[test]
    fn project_manifest_prefers_stable_release_as_default() {
        let releases = vec![
            ApiRelease {
                tag_name: "b_pre".into(),
                prerelease: true,
                draft: false,
                assets: vec![ApiAsset {
                    name: "llama-b_pre-bin-win-cpu-x64.zip".into(),
                    browser_download_url: "https://example/pre".into(),
                    size: Some(1),
                }],
            },
            ApiRelease {
                tag_name: "b_stable".into(),
                prerelease: false,
                draft: false,
                assets: vec![ApiAsset {
                    name: "llama-b_stable-bin-win-cpu-x64.zip".into(),
                    browser_download_url: "https://example/stable".into(),
                    size: Some(1),
                }],
            },
        ];
        let manifest = project_manifest(&releases).expect("manifest");
        assert_eq!(manifest.default_release_id.as_deref(), Some("b_stable"));
    }
}
