use axum::Json;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use nexus_civitai::{CivitaiError, CivitaiRef, CivitaiResolved, parse_civitai_url};
use nexus_models_store::ids::{ArtifactId, FamilyId, VariantId};
use nexus_models_store::model::{Artifact, ModelFamily, ModelRepository, SourceProvider, Variant};
use nexus_models_store::normalize::classify::classify_format;
use nexus_models_store::types::{
    CompatibilityStatus, DependencyRole, DownloadState, Modality, Precision, PrecisionSource,
    VariantType,
};
use serde::Deserialize;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize)]
pub struct ResolveUrlRequest {
    pub url: String,
}

pub struct DirectHeadMeta {
    pub filename: String,
    pub size_bytes: Option<u64>,
}

fn modality_from_str(s: &str) -> Modality {
    match s {
        "image" => Modality::Image,
        "video" => Modality::Video,
        "audio" => Modality::Audio,
        "upscaler" => Modality::Upscaler,
        "embedding" => Modality::Embedding,
        "llm" => Modality::Llm,
        "lora" => Modality::Lora,
        _ => Modality::Other,
    }
}

/// Extract the bare host from an http(s) URL: strips the scheme, takes the
/// authority up to the first `/`, drops any `userinfo@` prefix and `:port`
/// suffix, and lowercases the result.
fn host_of(url: &str) -> &str {
    let after_scheme = url.split_once("://").map_or(url, |(_, rest)| rest);
    let authority = after_scheme
        .split(['/', '?', '#'])
        .next()
        .unwrap_or(after_scheme);
    let host_port = authority
        .rsplit_once('@')
        .map_or(authority, |(_, host)| host);
    host_port
        .rsplit_once(':')
        .map_or(host_port, |(host, _)| host)
}

/// `true` only when the URL's host is exactly `civitai.com` or a subdomain
/// of it — never for look-alikes like `not-civitai.com`.
fn is_civitai_host(url: &str) -> bool {
    let host = host_of(url).to_ascii_lowercase();
    host == "civitai.com" || host.ends_with(".civitai.com")
}

/// The catalog reference to resolve through the Civitai API, or `None` when the
/// URL should go through the generic direct-download path instead. A civitai
/// subdomain that isn't a catalog URL — notably the `b2.civitai.com` file CDN
/// that serves signed `.safetensors` download links — is a direct download, not
/// a catalog lookup, so it falls through rather than erroring.
fn civitai_catalog_ref(url: &str) -> Option<CivitaiRef> {
    if is_civitai_host(url) {
        parse_civitai_url(url).ok()
    } else {
        None
    }
}

pub fn build_direct_family(url: &str, meta: &DirectHeadMeta) -> ModelFamily {
    let format = classify_format(&meta.filename);
    let family_id_str = format!("direct_url:{}", meta.filename);

    let artifact_id = ArtifactId::from(format!("{family_id_str}#0"));
    let variant_id = VariantId::from(format!("{family_id_str}@default"));
    let family_id = FamilyId::from(family_id_str);

    let artifact = Artifact {
        artifact_id: artifact_id.clone(),
        role: DependencyRole::Primary,
        format,
        precision: Precision::Unknown,
        precision_source: PrecisionSource::Unknown,
        size_bytes: meta.size_bytes,
        filename: meta.filename.clone(),
        download_url: url.to_owned(),
        sha256: None,
        install_state: DownloadState::NotDownloaded,
    };

    let variant = Variant {
        variant_id,
        variant_type: VariantType::Other,
        label: meta.filename.clone(),
        artifact_ids: vec![artifact_id],
        is_default: true,
        install_state: DownloadState::NotDownloaded,
    };

    let repository = ModelRepository {
        repo_id: meta.filename.clone(),
        source_provider: SourceProvider::DirectUrl,
        owner: String::new(),
        name: meta.filename.clone(),
        description: None,
        license: None,
        tags: vec![],
        downloads: None,
        likes: None,
        last_updated: None,
        modality: Modality::Other,
    };

    ModelFamily {
        family_id,
        repository,
        artifacts: vec![artifact],
        variants: vec![variant],
        dependencies: vec![],
        compat: CompatibilityStatus::DownloadableButNotRunnable,
        warnings: vec![],
    }
}

pub fn build_civitai_family(r: &CivitaiResolved) -> Option<ModelFamily> {
    let file = r.primary_file()?;
    let modality = modality_from_str(r.modality());
    let role = if r.modality() == "lora" {
        DependencyRole::Lora
    } else {
        DependencyRole::Primary
    };
    let format = classify_format(&file.name);

    let family_id_str = format!("civitai:{}/{}", r.model_id, r.version_id);

    let artifact_id = ArtifactId::from(format!("{}#{}", family_id_str, file.name));
    let variant_id = VariantId::from(format!("{family_id_str}@default"));
    let family_id = FamilyId::from(family_id_str);

    let artifact = Artifact {
        artifact_id: artifact_id.clone(),
        role,
        format,
        precision: Precision::Unknown,
        precision_source: PrecisionSource::Unknown,
        size_bytes: Some(file.size_bytes),
        filename: file.name.clone(),
        download_url: file.download_url.clone(),
        sha256: file.sha256.clone(),
        install_state: DownloadState::NotDownloaded,
    };

    let variant = Variant {
        variant_id,
        variant_type: VariantType::Other,
        label: r.name.clone(),
        artifact_ids: vec![artifact_id],
        is_default: true,
        install_state: DownloadState::NotDownloaded,
    };

    let repository = ModelRepository {
        repo_id: format!("{}/{}", r.model_id, r.version_id),
        source_provider: SourceProvider::Civitai,
        owner: String::new(),
        name: r.name.clone(),
        description: None,
        license: r.license.clone(),
        tags: vec![],
        downloads: None,
        likes: None,
        last_updated: None,
        modality,
    };

    Some(ModelFamily {
        family_id,
        repository,
        artifacts: vec![artifact],
        variants: vec![variant],
        dependencies: vec![],
        compat: CompatibilityStatus::DownloadableButNotRunnable,
        warnings: vec![],
    })
}

pub async fn resolve_url(
    State(state): State<AppState>,
    Json(req): Json<ResolveUrlRequest>,
) -> Response {
    let url = req.url.trim().to_owned();

    if !url.starts_with("http://") && !url.starts_with("https://") {
        return ApiResponse::<()>::bad_request(
            "url must begin with http:// or https://".to_owned(),
        )
        .into_response();
    }

    if let Some(reference) = civitai_catalog_ref(&url) {
        let client = match state.civitai.as_ref() {
            Some(c) => c,
            None => {
                return ApiResponse::<()>::err(
                    StatusCode::SERVICE_UNAVAILABLE,
                    "CIVITAI_UNAVAILABLE",
                    "unavailable",
                    "civitai integration is not configured".to_owned(),
                )
                .into_response();
            }
        };

        return match client.resolve(reference).await {
            Ok(resolved) => match build_civitai_family(&resolved) {
                Some(family) => ApiResponse::ok(family).into_response(),
                None => ApiResponse::<()>::not_found(
                    "civitai version has no downloadable files".to_owned(),
                )
                .into_response(),
            },
            Err(CivitaiError::AuthRequired) => ApiResponse::<()>::err(
                StatusCode::UNAUTHORIZED,
                "AUTH_REQUIRED",
                "auth",
                "civitai api token required for this resource".to_owned(),
            )
            .into_response(),
            Err(CivitaiError::NotFound) => {
                ApiResponse::<()>::not_found("civitai model version not found".to_owned())
                    .into_response()
            }
            Err(e) => ApiResponse::<()>::err(
                StatusCode::BAD_GATEWAY,
                "CIVITAI_ERROR",
                "upstream",
                format!("civitai request failed: {e}"),
            )
            .into_response(),
        };
    }

    let http = reqwest::Client::builder()
        .user_agent(concat!("nexus-dnn/", env!("CARGO_PKG_VERSION")))
        .timeout(std::time::Duration::from_secs(15))
        .redirect(reqwest::redirect::Policy::limited(3))
        .build()
        .expect("reqwest client builds");
    let head_resp = match http.head(&url).send().await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_GATEWAY,
                "UNREACHABLE",
                "upstream",
                format!("could not reach url: {e}"),
            )
            .into_response();
        }
    };

    let size_bytes = head_resp
        .headers()
        .get(reqwest::header::CONTENT_LENGTH)
        .and_then(|v| v.to_str().ok())
        .and_then(|s| s.parse::<u64>().ok());

    let filename = extract_filename(&url, head_resp.headers());

    let meta = DirectHeadMeta {
        filename,
        size_bytes,
    };

    ApiResponse::ok(build_direct_family(&url, &meta)).into_response()
}

fn extract_filename(url: &str, headers: &reqwest::header::HeaderMap) -> String {
    if let Some(cd) = headers.get(reqwest::header::CONTENT_DISPOSITION)
        && let Ok(cd_str) = cd.to_str()
    {
        for part in cd_str.split(';') {
            let part = part.trim();
            if let Some(rest) = part.strip_prefix("filename=") {
                let name = rest.trim_matches('"').trim();
                if !name.is_empty() {
                    return name.to_owned();
                }
            }
        }
    }

    let path = url.split('?').next().unwrap_or(url);
    path.split('/')
        .next_back()
        .filter(|s| !s.is_empty())
        .unwrap_or("download.bin")
        .to_owned()
}

#[cfg(test)]
mod tests {
    use nexus_civitai::parse_version_response;
    use nexus_models_store::types::Format;

    use super::*;

    #[test]
    fn direct_family_infers_format_and_has_no_hash() {
        let meta = DirectHeadMeta {
            filename: "model.gguf".to_owned(),
            size_bytes: None,
        };
        let family = build_direct_family("https://example.com/model.gguf", &meta);

        assert_eq!(family.repository.source_provider, SourceProvider::DirectUrl);
        assert_eq!(family.artifacts.len(), 1);
        assert_eq!(family.artifacts[0].sha256, None);
        assert_eq!(family.artifacts[0].format, Format::Gguf);
        assert!(family.variants[0].is_default);
    }

    /// BUG-3 backend: a HEAD Content-Length surfaced by the resolver must
    /// land on the artifact's `size_bytes`, which becomes the download
    /// target's `expected_bytes` so the UI can render a real percent.
    #[test]
    fn direct_family_threads_head_content_length_into_size_bytes() {
        let meta = DirectHeadMeta {
            filename: "model.safetensors".to_owned(),
            size_bytes: Some(123_456_789),
        };
        let family = build_direct_family("https://example.com/model.safetensors", &meta);
        assert_eq!(family.artifacts[0].size_bytes, Some(123_456_789));
    }

    #[test]
    fn civitai_family_carries_hash() {
        let fixture = r#"{
            "id": 7, "modelId": 3, "name": "n",
            "model": { "type": "Checkpoint" },
            "files": [ {
                "name": "m.safetensors",
                "sizeKB": 1.0,
                "hashes": { "SHA256": "AB" },
                "downloadUrl": "https://civitai.com/api/download/models/7",
                "primary": true
            } ]
        }"#;
        let resolved = parse_version_response(fixture).expect("valid fixture");
        let family = build_civitai_family(&resolved).expect("has primary file");

        assert_eq!(family.repository.source_provider, SourceProvider::Civitai);
        assert_eq!(family.artifacts[0].sha256, Some("ab".to_owned()));
    }

    #[test]
    fn civitai_lora_family_tags_role_and_modality() {
        let json = r#"{ "id": 7, "modelId": 3, "name": "n",
            "model": { "type": "LORA" },
            "files": [ { "name": "x.safetensors", "sizeKB": 1.0,
                "hashes": { "SHA256": "AB" },
                "downloadUrl": "https://civitai.com/api/download/models/7",
                "primary": true } ] }"#;
        let resolved = nexus_civitai::parse_version_response(json).unwrap();
        let f = build_civitai_family(&resolved).unwrap();
        assert_eq!(
            f.repository.modality,
            nexus_models_store::types::Modality::Lora
        );
        assert_eq!(
            f.artifacts[0].role,
            nexus_models_store::types::DependencyRole::Lora
        );
    }

    #[test]
    fn civitai_host_matches_exact_and_subdomain_only() {
        assert!(is_civitai_host("https://civitai.com/models/4201"));
        assert!(is_civitai_host("https://www.civitai.com/models/4201"));
        assert!(is_civitai_host(
            "https://user:pass@civitai.com:443/models/4201"
        ));
        assert!(!is_civitai_host("https://not-civitai.com/models/1"));
        assert!(!is_civitai_host("https://civitai.com.evil.test/models/1"));
        assert!(!is_civitai_host("https://example.com/?civitai.com"));
    }

    #[test]
    fn b2_civitai_file_url_falls_through_to_direct() {
        // Signed Backblaze download link on civitai's file CDN — a civitai
        // subdomain, but not a catalog URL, so it must NOT route to the API.
        let url = "https://b2.civitai.com/file/civitai-modelfiles/model/7445037/\
                   x.safetensors?Authorization=tok&b2ContentDisposition=attachment";
        assert!(is_civitai_host(url));
        assert!(
            civitai_catalog_ref(url).is_none(),
            "file CDN download links go through the direct-download path"
        );
    }

    #[test]
    fn civitai_catalog_urls_resolve_through_api() {
        assert_eq!(
            civitai_catalog_ref("https://civitai.com/models/4201?modelVersionId=130072"),
            Some(CivitaiRef::Version(130072))
        );
        assert_eq!(
            civitai_catalog_ref("https://civitai.com/models/4201"),
            Some(CivitaiRef::Model(4201))
        );
        assert!(civitai_catalog_ref("https://example.com/x.safetensors").is_none());
    }
}
