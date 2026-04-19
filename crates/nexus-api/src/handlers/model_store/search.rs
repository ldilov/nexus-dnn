use std::collections::HashMap;

use axum::extract::{RawQuery, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use nexus_huggingface::{SearchFilters, SearchReq};
use nexus_models_store::model::ModelFamily;
use nexus_models_store::normalize::normalize_family;
use nexus_models_store::types::{CompatibilityStatus, DependencyRole, Format};
use serde::Serialize;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Default)]
pub struct SearchQuery {
    pub q: Option<String>,
    pub format: Vec<String>,
    pub backend: Vec<String>,
    pub modality: Vec<String>,
    pub license: Vec<String>,
    pub compat: Vec<String>,
    pub show_unsupported: Option<bool>,
    pub sort: Option<String>,
    pub page: Option<u32>,
    pub page_size: Option<u32>,
}

fn parse_query_string(raw: Option<&str>) -> SearchQuery {
    let mut out = SearchQuery::default();
    let Some(raw) = raw else { return out };
    for pair in raw.split('&') {
        let Some((key, value)) = pair.split_once('=') else {
            continue;
        };
        let value = percent_decode(value);
        match key {
            "q" => out.q = Some(value),
            "format" => out.format.push(value),
            "backend" => out.backend.push(value),
            "modality" => out.modality.push(value),
            "license" => out.license.push(value),
            "compat" => out.compat.push(value),
            "show_unsupported" => out.show_unsupported = Some(value == "true"),
            "sort" => out.sort = Some(value),
            "page" => out.page = value.parse().ok(),
            "page_size" => out.page_size = value.parse().ok(),
            _ => {}
        }
    }
    out
}

fn percent_decode(input: &str) -> String {
    let bytes = input.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        match bytes[i] {
            b'+' => {
                out.push(b' ');
                i += 1;
            }
            b'%' if i + 2 < bytes.len() => {
                let hex = &input[i + 1..i + 3];
                match u8::from_str_radix(hex, 16) {
                    Ok(byte) => {
                        out.push(byte);
                        i += 3;
                    }
                    Err(_) => {
                        out.push(bytes[i]);
                        i += 1;
                    }
                }
            }
            other => {
                out.push(other);
                i += 1;
            }
        }
    }
    String::from_utf8_lossy(&out).into_owned()
}

#[derive(Debug, Default, Serialize)]
pub struct SearchFacets {
    pub formats: HashMap<String, u64>,
    pub licenses: HashMap<String, u64>,
    pub modalities: HashMap<String, u64>,
}

#[derive(Debug, Serialize)]
pub struct SearchPageDto {
    pub page: u32,
    pub page_size: u32,
    pub total_results: Option<u64>,
    pub families: Vec<ModelFamily>,
    pub facets: SearchFacets,
}

fn primary_format(f: &ModelFamily) -> Option<Format> {
    f.artifacts
        .iter()
        .find(|a| a.role == DependencyRole::Primary)
        .map(|a| a.format)
}

fn format_to_string(fmt: Format) -> &'static str {
    match fmt {
        Format::Gguf => "gguf",
        Format::Ggml => "ggml",
        Format::Safetensors => "safetensors",
        Format::PytorchBin => "pytorch_bin",
        Format::Pth => "pth",
        _ => "unknown",
    }
}

fn parse_format(token: &str) -> Format {
    match token.to_ascii_lowercase().as_str() {
        "gguf" => Format::Gguf,
        "ggml" => Format::Ggml,
        "safetensors" => Format::Safetensors,
        "pytorch_bin" | "pytorch-bin" | "bin" => Format::PytorchBin,
        "pth" => Format::Pth,
        _ => Format::Unknown,
    }
}

/// Rank used by `sort=compatible_first` (T074/T093). Lower rank sorts
/// earlier. The gap between `Compatible` and the non-runnable tiers
/// is intentional — users asking for this sort almost always want the
/// runnable set bunched tightly at the top.
fn compat_rank(status: CompatibilityStatus) -> u8 {
    match status {
        CompatibilityStatus::Compatible => 0,
        CompatibilityStatus::CompatibleWithRequirements => 1,
        CompatibilityStatus::DownloadableButNotRunnable => 10,
        CompatibilityStatus::Unsupported => 20,
        _ => 30,
    }
}

fn parse_compat(token: &str) -> Option<CompatibilityStatus> {
    match token {
        "compatible" => Some(CompatibilityStatus::Compatible),
        "compatible_with_requirements" => Some(CompatibilityStatus::CompatibleWithRequirements),
        "downloadable_but_not_runnable" => Some(CompatibilityStatus::DownloadableButNotRunnable),
        "unsupported" => Some(CompatibilityStatus::Unsupported),
        "unknown" => Some(CompatibilityStatus::Unknown),
        _ => None,
    }
}

/// `GET /api/v1/model-store/search` — normalized universal search.
pub async fn search(
    State(state): State<AppState>,
    RawQuery(raw): RawQuery,
) -> Response {
    let params = parse_query_string(raw.as_deref());
    let Some(hf) = state.huggingface.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "upstream_unavailable",
            "upstream",
            "Hugging Face client is not configured".into(),
        )
        .into_response();
    };

    let page = params.page.unwrap_or(1).max(1);
    let page_size = params.page_size.unwrap_or(30).clamp(10, 50);
    let query = params.q.clone().unwrap_or_default();

    let req = SearchReq {
        query: query.clone(),
        filters: SearchFilters {
            format: params.format.first().cloned(),
            license: params.license.first().cloned(),
            max_size_bytes: None,
        },
        limit: page_size,
        page,
    };

    let upstream = match hf.search(req).await {
        Ok(p) => p,
        Err(e) => {
            tracing::warn!(error = %e, "model-store search upstream failure");
            return ApiResponse::<()>::err(
                StatusCode::BAD_GATEWAY,
                "upstream_unavailable",
                "upstream",
                format!("Upstream failed: {e}"),
            )
            .into_response();
        }
    };

    let registry = state.capability_registry.as_ref();

    let mut families: Vec<ModelFamily> = upstream
        .results
        .iter()
        .map(|raw| match registry {
            Some(reg) => normalize_family(raw, reg),
            None => {
                let empty = nexus_models_store::capabilities::CapabilityRegistry::new();
                normalize_family(raw, &empty)
            }
        })
        .collect();

    let requested_formats: Vec<Format> =
        params.format.iter().map(|s| parse_format(s)).collect();
    if !requested_formats.is_empty() {
        families.retain(|f| {
            f.artifacts
                .iter()
                .any(|a| requested_formats.contains(&a.format))
        });
    }

    if !params.backend.is_empty() {
        if let Some(reg) = registry {
            let compat_formats: Vec<Format> = reg
                .list()
                .filter(|cap| params.backend.iter().any(|id| cap.backend_id.as_str() == id))
                .flat_map(|cap| cap.supported_formats.iter().copied())
                .collect();
            if !compat_formats.is_empty() {
                families.retain(|f| {
                    f.artifacts
                        .iter()
                        .any(|a| compat_formats.contains(&a.format))
                });
            }
        }
    }

    if !params.license.is_empty() {
        let allowed: Vec<&str> = params.license.iter().map(|s| s.as_str()).collect();
        families.retain(|f| {
            f.repository
                .license
                .as_deref()
                .is_some_and(|l| allowed.contains(&l))
        });
    }

    let compat_filter: Vec<CompatibilityStatus> = params
        .compat
        .iter()
        .filter_map(|s| parse_compat(s))
        .collect();
    if !compat_filter.is_empty() {
        families.retain(|f| compat_filter.contains(&f.compat));
    }

    if !params.show_unsupported.unwrap_or(false) {
        families.retain(|f| {
            !matches!(
                f.compat,
                CompatibilityStatus::Unsupported | CompatibilityStatus::Unknown
            )
        });
    }

    if params.sort.as_deref() == Some("compatible_first") {
        families.sort_by_key(|f| compat_rank(f.compat));
    }

    let mut formats = HashMap::new();
    let mut licenses = HashMap::new();
    let mut modalities = HashMap::new();
    for f in &families {
        if let Some(fmt) = primary_format(f) {
            *formats.entry(format_to_string(fmt).to_string()).or_insert(0) += 1;
        }
        if let Some(lic) = &f.repository.license {
            *licenses.entry(lic.clone()).or_insert(0) += 1;
        }
        let m = match f.repository.modality {
            nexus_models_store::types::Modality::Llm => "llm",
            nexus_models_store::types::Modality::Image => "image",
            nexus_models_store::types::Modality::Video => "video",
            nexus_models_store::types::Modality::Audio => "audio",
            nexus_models_store::types::Modality::Upscaler => "upscaler",
            nexus_models_store::types::Modality::Embedding => "embedding",
            _ => "other",
        };
        *modalities.entry(m.to_string()).or_insert(0) += 1;
    }

    let dto = SearchPageDto {
        page,
        page_size,
        total_results: Some(families.len() as u64),
        families,
        facets: SearchFacets {
            formats,
            licenses,
            modalities,
        },
    };

    ApiResponse::ok(dto).into_response()
}
