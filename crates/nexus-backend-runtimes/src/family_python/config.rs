use std::env;
use std::path::PathBuf;

use super::asset::{PythonArchiveKind, PythonAsset};

pub const ENV_URL: &str = "NEXUS_EMBEDDED_PYTHON_URL";
pub const ENV_SHA256: &str = "NEXUS_EMBEDDED_PYTHON_SHA256";
pub const ENV_SIZE: &str = "NEXUS_EMBEDDED_PYTHON_SIZE";
pub const ENV_KIND: &str = "NEXUS_EMBEDDED_PYTHON_KIND";
pub const ENV_STRIP: &str = "NEXUS_EMBEDDED_PYTHON_STRIP";
pub const ENV_EXTRACT: &str = "NEXUS_EMBEDDED_PYTHON_EXTRACT";

const DEFAULT_KIND: PythonArchiveKind = PythonArchiveKind::TarGz;
const DEFAULT_STRIP: &str = "python";
const DEFAULT_EXTRACT: &str = "python";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PythonAssetConfig {
    pub url: Option<String>,
    pub sha256: Option<String>,
    pub size: Option<String>,
    pub kind: Option<String>,
    pub strip: Option<String>,
    pub extract: Option<String>,
}

impl PythonAssetConfig {
    pub fn from_env() -> Self {
        Self {
            url: env::var(ENV_URL).ok().filter(|s| !s.is_empty()),
            sha256: env::var(ENV_SHA256).ok().filter(|s| !s.is_empty()),
            size: env::var(ENV_SIZE).ok().filter(|s| !s.is_empty()),
            kind: env::var(ENV_KIND).ok().filter(|s| !s.is_empty()),
            strip: env::var(ENV_STRIP).ok().filter(|s| !s.is_empty()),
            extract: env::var(ENV_EXTRACT).ok().filter(|s| !s.is_empty()),
        }
    }

    pub fn load(&self) -> Result<Option<PythonAsset>, String> {
        let any_required = self.url.is_some() || self.sha256.is_some() || self.size.is_some();
        if !any_required {
            return Ok(None);
        }

        let url = self
            .url
            .as_deref()
            .ok_or_else(|| format!("{ENV_URL} missing"))?
            .to_string();
        let sha256 = self
            .sha256
            .as_deref()
            .ok_or_else(|| format!("{ENV_SHA256} missing"))?
            .to_ascii_lowercase();
        if sha256.len() != 64 || !sha256.chars().all(|c| c.is_ascii_hexdigit()) {
            return Err(format!("{ENV_SHA256} must be 64 lowercase hex chars"));
        }
        let size_raw = self
            .size
            .as_deref()
            .ok_or_else(|| format!("{ENV_SIZE} missing"))?;
        let size: u64 = size_raw
            .parse()
            .map_err(|_| format!("{ENV_SIZE}=`{size_raw}` is not a valid u64"))?;

        let kind = match self.kind.as_deref() {
            None => DEFAULT_KIND,
            Some("tar.gz") | Some("tgz") => PythonArchiveKind::TarGz,
            Some("zip") => PythonArchiveKind::Zip,
            Some(other) => {
                return Err(format!(
                    "{ENV_KIND}=`{other}` must be `tar.gz` / `tgz` / `zip`"
                ));
            }
        };

        let strip = self
            .strip
            .clone()
            .or_else(|| Some(DEFAULT_STRIP.into()))
            .filter(|s| !s.is_empty());
        let extract_dir = self
            .extract
            .clone()
            .unwrap_or_else(|| DEFAULT_EXTRACT.into());

        Ok(Some(PythonAsset {
            url,
            sha256,
            size,
            kind,
            extract_dir: PathBuf::from(extract_dir),
            archive_root_component: strip,
        }))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn valid() -> PythonAssetConfig {
        PythonAssetConfig {
            url: Some("file:///tmp/cpython.tar.gz".into()),
            sha256: Some("a".repeat(64)),
            size: Some("1024".into()),
            kind: None,
            strip: None,
            extract: None,
        }
    }

    #[test]
    fn load_returns_none_when_no_env_vars_set() {
        let cfg = PythonAssetConfig {
            url: None,
            sha256: None,
            size: None,
            kind: None,
            strip: None,
            extract: None,
        };
        assert_eq!(cfg.load(), Ok(None));
    }

    #[test]
    fn load_produces_asset_with_defaults_from_minimal_config() {
        let asset = valid().load().unwrap().unwrap();
        assert_eq!(asset.url, "file:///tmp/cpython.tar.gz");
        assert_eq!(asset.sha256, "a".repeat(64));
        assert_eq!(asset.size, 1024);
        assert_eq!(asset.kind, PythonArchiveKind::TarGz);
        assert_eq!(asset.extract_dir, PathBuf::from("python"));
        assert_eq!(asset.archive_root_component.as_deref(), Some("python"));
    }

    #[test]
    fn load_rejects_partial_config_with_clear_error() {
        let partial = PythonAssetConfig {
            url: Some("file:///x".into()),
            sha256: None,
            size: None,
            kind: None,
            strip: None,
            extract: None,
        };
        let err = partial.load().unwrap_err();
        assert!(err.contains(ENV_SHA256));
    }

    #[test]
    fn load_rejects_non_hex_sha256() {
        let bad = PythonAssetConfig {
            sha256: Some("g".repeat(64)),
            ..valid()
        };
        let err = bad.load().unwrap_err();
        assert!(err.contains("hex"));
    }

    #[test]
    fn load_rejects_bad_size() {
        let bad = PythonAssetConfig {
            size: Some("not a number".into()),
            ..valid()
        };
        assert!(bad.load().is_err());
    }

    #[test]
    fn load_honours_zip_kind_override() {
        let cfg = PythonAssetConfig {
            kind: Some("zip".into()),
            ..valid()
        };
        let asset = cfg.load().unwrap().unwrap();
        assert_eq!(asset.kind, PythonArchiveKind::Zip);
    }

    #[test]
    fn load_honours_empty_strip_meaning_no_strip() {
        let cfg = PythonAssetConfig {
            strip: Some(String::new()),
            ..valid()
        };
        let asset = cfg.load().unwrap().unwrap();
        assert_eq!(asset.archive_root_component, None);
    }

    #[test]
    fn load_rejects_unknown_kind() {
        let cfg = PythonAssetConfig {
            kind: Some("rar".into()),
            ..valid()
        };
        assert!(cfg.load().is_err());
    }
}
