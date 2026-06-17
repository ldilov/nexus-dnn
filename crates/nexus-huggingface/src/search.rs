use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SearchFilters {
    pub format: Option<String>,
    pub license: Option<String>,
    pub max_size_bytes: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchReq {
    pub query: String,
    #[serde(default)]
    pub filters: SearchFilters,
    #[serde(default = "default_limit")]
    pub limit: u32,
    #[serde(default = "default_page")]
    pub page: u32,
}

fn default_limit() -> u32 {
    20
}
fn default_page() -> u32 {
    1
}

#[derive(Debug, Clone, Serialize)]
pub struct RepoFile {
    pub path: String,
    pub size_bytes: Option<u64>,
}

impl<'de> serde::Deserialize<'de> for RepoFile {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        #[derive(Deserialize)]
        struct LfsBlock {
            size: Option<u64>,
        }

        #[derive(Deserialize)]
        struct Raw {
            #[serde(alias = "rfilename")]
            path: String,
            #[serde(alias = "size", default)]
            size_bytes: Option<u64>,
            #[serde(default)]
            lfs: Option<LfsBlock>,
        }

        use serde::Deserialize;
        let raw = Raw::deserialize(deserializer)?;
        let size_bytes = raw.size_bytes.or_else(|| raw.lfs.and_then(|l| l.size));
        Ok(RepoFile {
            path: raw.path,
            size_bytes,
        })
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub repo_id: String,
    pub author: Option<String>,
    pub license: Option<String>,
    pub downloads_30d: Option<u64>,
    pub last_modified: Option<String>,
    #[serde(default)]
    pub files: Vec<RepoFile>,
    #[serde(default)]
    pub formats: Vec<String>,
    #[serde(default)]
    pub quantizations: Vec<String>,
    pub pipeline_tag: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchPage {
    pub query: String,
    pub page: u32,
    pub has_next: bool,
    pub results: Vec<SearchResult>,
}

pub const HF_API_BASE: &str = "https://huggingface.co";

pub fn build_search_url(base: &str, req: &SearchReq) -> String {
    // `full=true` is required to include `siblings` (file list) in the search
    // response. Without it every result returns zero files, so the format and
    let mut url = format!(
        "{base}/api/models?search={}&limit={}&sort=downloads&direction=-1&full=true",
        urlencode(&req.query),
        req.limit
    );
    if let Some(format) = &req.filters.format {
        url.push_str(&format!("&filter={}", urlencode(format)));
    }
    if let Some(license) = &req.filters.license {
        url.push_str(&format!("&filter=license:{}", urlencode(license)));
    }
    if req.page > 1 {
        url.push_str(&format!("&page={}", req.page));
    }
    url
}

fn urlencode(value: &str) -> String {
    let mut out = String::with_capacity(value.len());
    for ch in value.chars() {
        if ch.is_ascii_alphanumeric() || ch == '-' || ch == '_' || ch == '.' || ch == '~' {
            out.push(ch);
        } else {
            for b in ch.to_string().as_bytes() {
                out.push_str(&format!("%{b:02X}"));
            }
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encodes_search_query() {
        let req = SearchReq {
            query: "qwen2.5 instruct".into(),
            filters: SearchFilters::default(),
            limit: 20,
            page: 1,
        };
        let url = build_search_url(HF_API_BASE, &req);
        assert!(url.contains("search=qwen2.5%20instruct"));
        assert!(!url.contains("page="));
        assert!(
            url.contains("full=true"),
            "search URL must request siblings via full=true (got `{url}`)",
        );
    }

    #[test]
    fn includes_format_filter_when_set() {
        let req = SearchReq {
            query: "llama".into(),
            filters: SearchFilters {
                format: Some("gguf".into()),
                license: Some("apache-2.0".into()),
                max_size_bytes: None,
            },
            limit: 10,
            page: 2,
        };
        let url = build_search_url(HF_API_BASE, &req);
        assert!(url.contains("filter=gguf"));
        assert!(url.contains("filter=license:apache-2.0"));
        assert!(url.contains("page=2"));
        assert!(url.contains("limit=10"));
    }

    #[test]
    fn repo_file_deserialises_hf_rfilename_form() {
        let raw = r#"{"rfilename": "model.safetensors", "size": 12345}"#;
        let f: RepoFile = serde_json::from_str(raw).unwrap();
        assert_eq!(f.path, "model.safetensors");
        assert_eq!(f.size_bytes, Some(12345));
    }

    #[test]
    fn repo_file_still_deserialises_canonical_form() {
        let raw = r#"{"path": "model.gguf", "size_bytes": 99}"#;
        let f: RepoFile = serde_json::from_str(raw).unwrap();
        assert_eq!(f.path, "model.gguf");
        assert_eq!(f.size_bytes, Some(99));
    }

    #[test]
    fn repo_file_deserialises_lfs_size_form() {
        let raw = r#"{"rfilename": "w.safetensors", "lfs": {"size": 12345, "sha256": "abc", "pointerSize": 132}}"#;
        let f: RepoFile = serde_json::from_str(raw).unwrap();
        assert_eq!(f.path, "w.safetensors");
        assert_eq!(f.size_bytes, Some(12345));
    }

    #[test]
    fn repo_file_top_level_size_wins_over_lfs_size() {
        let raw = r#"{"rfilename": "w.safetensors", "size": 99999, "lfs": {"size": 12345}}"#;
        let f: RepoFile = serde_json::from_str(raw).unwrap();
        assert_eq!(f.size_bytes, Some(99999));
    }

    #[test]
    fn repo_file_roundtrips_through_canonical_serialization() {
        let original = RepoFile {
            path: "model.safetensors".into(),
            size_bytes: Some(12345),
        };
        let json = serde_json::to_string(&original).unwrap();
        let roundtripped: RepoFile = serde_json::from_str(&json).unwrap();
        assert_eq!(roundtripped.path, original.path);
        assert_eq!(roundtripped.size_bytes, original.size_bytes);
    }
}
