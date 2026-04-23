use std::collections::HashMap;
use std::sync::{LazyLock, Mutex};
use std::time::{Duration, Instant};

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

const CACHE_TTL: Duration = Duration::from_secs(60);
const CACHE_CAPACITY: usize = 64;

struct CachedFamilies {
    inserted_at: Instant,
    families: Vec<ModelFamily>,
}

static FAMILY_CACHE: LazyLock<Mutex<HashMap<String, CachedFamilies>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

fn fingerprint(params: &SearchQuery) -> String {
    let mut parts: Vec<String> = vec![
        format!("q={}", params.q.as_deref().unwrap_or("")),
        format!("sort={}", params.sort.as_deref().unwrap_or("")),
        format!(
            "show_unsupported={}",
            params.show_unsupported.unwrap_or(false)
        ),
        format!("installed={}", params.installed.as_deref().unwrap_or("any")),
    ];
    let mut fmts = params.format.clone();
    fmts.sort();
    parts.push(format!("format={}", fmts.join(",")));
    let mut backends = params.backend.clone();
    backends.sort();
    parts.push(format!("backend={}", backends.join(",")));
    let mut mods = params.modality.clone();
    mods.sort();
    parts.push(format!("modality={}", mods.join(",")));
    let mut lics = params.license.clone();
    lics.sort();
    parts.push(format!("license={}", lics.join(",")));
    let mut compats = params.compat.clone();
    compats.sort();
    parts.push(format!("compat={}", compats.join(",")));
    parts.join("|")
}

fn cache_get(key: &str) -> Option<Vec<ModelFamily>> {
    let mut guard = FAMILY_CACHE.lock().ok()?;
    match guard.get(key) {
        Some(entry) if entry.inserted_at.elapsed() < CACHE_TTL => Some(entry.families.clone()),
        Some(_) => {
            guard.remove(key);
            None
        }
        None => None,
    }
}

fn cache_put(key: String, families: Vec<ModelFamily>) {
    let Ok(mut guard) = FAMILY_CACHE.lock() else {
        return;
    };
    if guard.len() >= CACHE_CAPACITY {
        if let Some(oldest) = guard
            .iter()
            .min_by_key(|(_, v)| v.inserted_at)
            .map(|(k, _)| k.clone())
        {
            guard.remove(&oldest);
        }
    }
    guard.insert(
        key,
        CachedFamilies {
            inserted_at: Instant::now(),
            families,
        },
    );
}

#[cfg(test)]
pub(crate) fn clear_cache_for_tests() {
    if let Ok(mut guard) = FAMILY_CACHE.lock() {
        guard.clear();
    }
}

#[derive(Debug, Default)]
pub struct SearchQuery {
    pub q: Option<String>,
    pub format: Vec<String>,
    pub backend: Vec<String>,
    pub modality: Vec<String>,
    pub license: Vec<String>,
    pub compat: Vec<String>,
    pub show_unsupported: Option<bool>,
    pub installed: Option<String>,
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
            "installed" => out.installed = Some(value),
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

pub async fn search(State(state): State<AppState>, RawQuery(raw): RawQuery) -> Response {
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

    let registry = state.capability_registry.as_ref();
    let cache_key = fingerprint(&params);

    let mut families: Vec<ModelFamily> = if let Some(cached) = cache_get(&cache_key) {
        cached
    } else {
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

        let fetched: Vec<ModelFamily> = upstream
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

        cache_put(cache_key, fetched.clone());
        fetched
    };

    let requested_formats: Vec<Format> = params.format.iter().map(|s| parse_format(s)).collect();
    if !requested_formats.is_empty() {
        families.retain(|f| {
            f.artifacts
                .iter()
                .any(|a| requested_formats.contains(&a.format))
        });
    }

    if !params.backend.is_empty()
        && let Some(reg) = registry
    {
        let compat_formats: Vec<Format> = reg
            .list()
            .filter(|cap| {
                params
                    .backend
                    .iter()
                    .any(|id| cap.backend_id.as_str() == id)
            })
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

    let installed_mode = params.installed.as_deref().unwrap_or("any");
    if installed_mode != "any"
        && let Some(install_map) = state.install_map.as_ref()
    {
        let rows = install_map.list_all(500).await.unwrap_or_default();
        let installed_family_ids: std::collections::HashSet<String> =
            rows.into_iter().map(|r| r.family_id).collect();
        families.retain(|f| {
            let is_installed = installed_family_ids.contains(f.family_id.as_str());
            match installed_mode {
                "installed" => is_installed,
                "not_installed" => !is_installed,
                _ => true,
            }
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
            *formats
                .entry(format_to_string(fmt).to_string())
                .or_insert(0) += 1;
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

#[cfg(test)]
mod cache_tests {
    use super::*;

    fn q(q: &str) -> SearchQuery {
        SearchQuery {
            q: Some(q.to_string()),
            ..SearchQuery::default()
        }
    }

    #[test]
    fn fingerprint_changes_with_query() {
        assert_ne!(fingerprint(&q("llama")), fingerprint(&q("mistral")));
    }

    #[test]
    fn fingerprint_is_stable_for_same_filters_in_different_order() {
        let mut a = q("llama");
        a.format = vec!["gguf".into(), "safetensors".into()];
        a.license = vec!["mit".into(), "apache-2.0".into()];
        let mut b = q("llama");
        b.format = vec!["safetensors".into(), "gguf".into()];
        b.license = vec!["apache-2.0".into(), "mit".into()];
        assert_eq!(fingerprint(&a), fingerprint(&b));
    }

    #[test]
    fn fingerprint_ignores_pagination() {
        let mut a = q("llama");
        a.page = Some(1);
        a.page_size = Some(10);
        let mut b = q("llama");
        b.page = Some(5);
        b.page_size = Some(30);
        assert_eq!(fingerprint(&a), fingerprint(&b));
    }

    #[test]
    fn cache_round_trips_within_ttl() {
        clear_cache_for_tests();
        let key = "round_trip_test".to_string();
        assert!(cache_get(&key).is_none());
        cache_put(key.clone(), vec![]);
        assert!(cache_get(&key).is_some());
    }

    #[test]
    fn cache_capacity_evicts_oldest() {
        clear_cache_for_tests();
        for i in 0..(CACHE_CAPACITY + 5) {
            cache_put(format!("k-{i}"), vec![]);
        }
        let guard = FAMILY_CACHE.lock().unwrap();
        assert!(guard.len() <= CACHE_CAPACITY);
    }
}
