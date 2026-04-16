use async_trait::async_trait;

use super::errors::{ModelStoreError, ModelStoreResult};
use super::install::InstallModelRequest;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LicenseInfo {
    pub license_spdx: String,
    pub license_url: Option<String>,
    pub provenance_note: Option<String>,
}

#[derive(Debug, Clone)]
pub struct HfMetadata {
    pub revision: String,
    pub license: Option<String>,
    pub total_bytes: u64,
}

#[async_trait]
pub trait HfProbe: Send + Sync {
    async fn fetch_metadata(
        &self,
        repo_id: &str,
        revision: Option<&str>,
    ) -> ModelStoreResult<HfMetadata>;
}

pub fn resolve_license(
    source_kind: &str,
    request: &InstallModelRequest,
    hf: Option<&HfMetadata>,
) -> LicenseInfo {
    if let Some(spdx) = request.license_spdx.as_deref()
        && !spdx.is_empty()
    {
        return LicenseInfo {
            license_spdx: spdx.to_string(),
            license_url: request.license_url.clone(),
            provenance_note: request.provenance_note.clone(),
        };
    }

    if source_kind == "huggingface"
        && let Some(meta) = hf
        && let Some(spdx) = meta.license.as_deref()
        && !spdx.is_empty()
    {
        return LicenseInfo {
            license_spdx: spdx.to_string(),
            license_url: Some(format!("https://spdx.org/licenses/{spdx}.html")),
            provenance_note: None,
        };
    }

    let source_detail = request.source_url.as_deref().unwrap_or(source_kind);
    LicenseInfo {
        license_spdx: "UNKNOWN".into(),
        license_url: None,
        provenance_note: Some(format!("license metadata unavailable at {source_detail}")),
    }
}

pub struct ZeroHfProbe;

#[async_trait]
impl HfProbe for ZeroHfProbe {
    async fn fetch_metadata(
        &self,
        _repo_id: &str,
        revision: Option<&str>,
    ) -> ModelStoreResult<HfMetadata> {
        Err(ModelStoreError::SourceUnreachable {
            source_url: format!("hf://{}", revision.unwrap_or("main")),
            detail: "ZeroHfProbe: no HF probe configured".into(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::install::PlannedFile;

    fn req(license: Option<&str>, note: Option<&str>) -> InstallModelRequest {
        InstallModelRequest {
            family: "f".into(),
            version: "v".into(),
            quantization: None,
            variant: "default".into(),
            sha256_root: "sha".into(),
            source_revision: "sha".into(),
            source_kind: "huggingface".into(),
            source_url: Some("hf://org/model".into()),
            private: false,
            owner_extension_id: None,
            license_spdx: license.map(str::to_string),
            license_url: None,
            provenance_note: note.map(str::to_string),
            param_count: None,
            files: vec![PlannedFile {
                path: "m".into(),
                sha256: "s".into(),
                size_bytes: 1,
                source_url: "u".into(),
            }],
        }
    }

    #[test]
    fn user_supplied_license_passes_through() {
        let r = req(Some("apache-2.0"), None);
        let info = resolve_license("huggingface", &r, None);
        assert_eq!(info.license_spdx, "apache-2.0");
        assert!(info.provenance_note.is_none());
    }

    #[test]
    fn hf_metadata_populates_license_when_request_omits_it() {
        let r = req(None, None);
        let meta = HfMetadata {
            revision: "abc".into(),
            license: Some("mit".into()),
            total_bytes: 0,
        };
        let info = resolve_license("huggingface", &r, Some(&meta));
        assert_eq!(info.license_spdx, "mit");
        assert_eq!(
            info.license_url.as_deref(),
            Some("https://spdx.org/licenses/mit.html")
        );
    }

    #[test]
    fn missing_everywhere_yields_unknown_with_note() {
        let r = req(None, None);
        let info = resolve_license("direct_url", &r, None);
        assert_eq!(info.license_spdx, "UNKNOWN");
        assert!(
            info.provenance_note
                .as_deref()
                .is_some_and(|s| s.contains("unavailable"))
        );
    }
}
