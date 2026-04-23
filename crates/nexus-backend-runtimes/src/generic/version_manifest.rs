//! Version-manifest schema + asset resolver.
//!
//! Each contributed runtime ships a `versions.yaml` (or `.json`) file that
//! enumerates releases × platform × accelerator_profile. The install
//! pipeline's resolve phase loads this, picks the matching entry, and
//! produces a [`ResolvedAsset`] the download/verify/extract phases consume.

use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VersionManifest {
    pub releases: Vec<Release>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Release {
    pub release_id: String,
    #[serde(default)]
    pub semver: Option<String>,
    #[serde(default)]
    pub notes: Option<String>,
    pub targets: Vec<Target>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Target {
    pub platform: String,
    pub accelerator_profile: String,
    pub asset: ManifestAsset,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManifestAsset {
    /// `file://path` (relative to extension root) or `http(s)://...`.
    pub url: String,
    /// 64-char lowercase hex SHA-256.
    pub sha256: String,
    pub size: u64,
}

/// Resolved asset reference handed off to the download phase. Absolute
/// — `file://` URLs have been resolved against the extension root.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ResolvedAsset {
    pub url: String,
    pub sha256: String,
    pub size: u64,
}

#[derive(Debug, thiserror::Error, PartialEq, Eq)]
pub enum ResolveError {
    #[error("version manifest is malformed: {0}")]
    Malformed(String),
    #[error("release `{0}` not found")]
    UnknownRelease(String),
    #[error(
        "no target matches platform=`{platform}` accelerator_profile=`{profile}` for release `{release}`"
    )]
    UnknownTarget {
        release: String,
        platform: String,
        profile: String,
    },
    #[error("asset url `{0}`: {1}")]
    InvalidUrl(String, &'static str),
    #[error("asset sha256 `{0}` is not 64-char lowercase hex")]
    InvalidChecksum(String),
}

impl VersionManifest {
    /// Parse from a YAML or JSON `serde_json::Value`. JSON parses directly;
    /// YAML callers convert via [`crate::generic::version_manifest::parse_yaml`]
    /// before passing to the pipeline.
    pub fn from_value(v: &serde_json::Value) -> Result<Self, ResolveError> {
        serde_json::from_value(v.clone()).map_err(|e| ResolveError::Malformed(e.to_string()))
    }

    /// Pick the asset for the requested `(release, platform, profile)`.
    /// `extension_root` is used to resolve `file://` URLs into absolute
    /// paths.
    pub fn resolve(
        &self,
        release_id: &str,
        platform: &str,
        accelerator_profile: &str,
        extension_root: Option<&Path>,
    ) -> Result<ResolvedAsset, ResolveError> {
        let release = self
            .releases
            .iter()
            .find(|r| r.release_id == release_id)
            .ok_or_else(|| ResolveError::UnknownRelease(release_id.to_string()))?;

        let target = release
            .targets
            .iter()
            .find(|t| t.platform == platform && t.accelerator_profile == accelerator_profile)
            .ok_or_else(|| ResolveError::UnknownTarget {
                release: release_id.to_string(),
                platform: platform.to_string(),
                profile: accelerator_profile.to_string(),
            })?;

        // Validate checksum shape (cheap rejection of obvious typos).
        let csum = &target.asset.sha256;
        if csum.len() != 64 || !csum.bytes().all(|b| matches!(b, b'0'..=b'9' | b'a'..=b'f')) {
            return Err(ResolveError::InvalidChecksum(csum.clone()));
        }

        let url = canonicalise_url(&target.asset.url, extension_root)?;
        Ok(ResolvedAsset {
            url,
            sha256: csum.clone(),
            size: target.asset.size,
        })
    }
}

/// Convert relative `file://` URLs into absolute paths under
/// `extension_root`. http(s) URLs pass through unchanged. Rejects
/// `file://` that escapes the extension root via `..` segments.
fn canonicalise_url(url: &str, extension_root: Option<&Path>) -> Result<String, ResolveError> {
    if let Some(rest) = url.strip_prefix("file://") {
        // Reject path-traversal attempts.
        if rest.split(['/', '\\']).any(|seg| seg == "..") {
            return Err(ResolveError::InvalidUrl(
                url.to_string(),
                "`..` segments not permitted in file:// urls",
            ));
        }
        let path = if Path::new(rest).is_absolute() {
            PathBuf::from(rest)
        } else {
            let root = extension_root.ok_or(ResolveError::InvalidUrl(
                url.to_string(),
                "relative file:// url requires extension_root",
            ))?;
            root.join(rest)
        };
        return Ok(format!("file://{}", path.display()));
    }
    if url.starts_with("http://") || url.starts_with("https://") {
        return Ok(url.to_string());
    }
    Err(ResolveError::InvalidUrl(
        url.to_string(),
        "unsupported scheme (use file:// or http(s)://)",
    ))
}

/// Parse a version manifest from raw YAML text into a `serde_json::Value`
/// the resolve phase can consume.
pub fn parse_yaml(yaml: &str) -> Result<serde_json::Value, ResolveError> {
    let manifest: VersionManifest = serde_saphyr::from_str(yaml)
        .map_err(|e| ResolveError::Malformed(format!("yaml parse: {e}")))?;
    serde_json::to_value(&manifest).map_err(|e| ResolveError::Malformed(e.to_string()))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fixture() -> VersionManifest {
        VersionManifest {
            releases: vec![Release {
                release_id: "v0_0_1".into(),
                semver: Some("0.0.1".into()),
                notes: None,
                targets: vec![
                    Target {
                        platform: "windows-x64".into(),
                        accelerator_profile: "cpu".into(),
                        asset: ManifestAsset {
                            url: "file://assets/win.zip".into(),
                            sha256: "a".repeat(64),
                            size: 100,
                        },
                    },
                    Target {
                        platform: "linux-x64".into(),
                        accelerator_profile: "cpu".into(),
                        asset: ManifestAsset {
                            url: "https://cdn.example/linux.tar.gz".into(),
                            sha256: "b".repeat(64),
                            size: 200,
                        },
                    },
                ],
            }],
        }
    }

    #[test]
    fn resolves_relative_file_url_against_root() {
        let m = fixture();
        let root = Path::new("/ext/root");
        let asset = m
            .resolve("v0_0_1", "windows-x64", "cpu", Some(root))
            .unwrap();
        assert!(asset.url.contains("/ext/root"), "{asset:?}");
        assert_eq!(asset.size, 100);
    }

    #[test]
    fn passes_through_https_url() {
        let m = fixture();
        let asset = m.resolve("v0_0_1", "linux-x64", "cpu", None).unwrap();
        assert_eq!(asset.url, "https://cdn.example/linux.tar.gz");
    }

    #[test]
    fn rejects_unknown_release() {
        let m = fixture();
        assert!(matches!(
            m.resolve("missing", "windows-x64", "cpu", None),
            Err(ResolveError::UnknownRelease(_))
        ));
    }

    #[test]
    fn rejects_unknown_target() {
        let m = fixture();
        assert!(matches!(
            m.resolve("v0_0_1", "macos-arm", "metal", None),
            Err(ResolveError::UnknownTarget { .. })
        ));
    }

    #[test]
    fn rejects_relative_file_url_without_root() {
        let m = fixture();
        assert!(matches!(
            m.resolve("v0_0_1", "windows-x64", "cpu", None),
            Err(ResolveError::InvalidUrl(_, _))
        ));
    }

    #[test]
    fn rejects_path_traversal_file_url() {
        let mut m = fixture();
        m.releases[0].targets[0].asset.url = "file://../../etc/passwd".into();
        let err = m
            .resolve("v0_0_1", "windows-x64", "cpu", Some(Path::new("/r")))
            .unwrap_err();
        assert!(matches!(err, ResolveError::InvalidUrl(_, _)));
    }

    #[test]
    fn rejects_invalid_checksum() {
        let mut m = fixture();
        m.releases[0].targets[0].asset.sha256 = "not-hex".into();
        assert!(matches!(
            m.resolve("v0_0_1", "windows-x64", "cpu", Some(Path::new("/r"))),
            Err(ResolveError::InvalidChecksum(_))
        ));
    }

    #[test]
    fn parses_yaml_round_trip() {
        let yaml = r#"
releases:
  - release_id: "v0_0_1"
    semver: "0.0.1"
    targets:
      - platform: "linux-x64"
        accelerator_profile: "cpu"
        asset:
          url: "https://cdn.example/x.zip"
          sha256: "0000000000000000000000000000000000000000000000000000000000000000"
          size: 0
"#;
        let v = parse_yaml(yaml).unwrap();
        let m = VersionManifest::from_value(&v).unwrap();
        assert_eq!(m.releases.len(), 1);
        assert_eq!(m.releases[0].release_id, "v0_0_1");
    }
}
