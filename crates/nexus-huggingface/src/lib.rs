pub mod cache;
pub mod checksum;
pub mod detail;
pub mod download;
pub mod error;
pub mod progress;
pub mod search;
pub mod token;

use std::pin::Pin;
use std::sync::Arc;
use std::time::Duration as StdDuration;

use async_trait::async_trait;
use chrono::Duration;
use futures_util::Stream;
use reqwest::{Client, StatusCode};
use sqlx::SqlitePool;
use tracing::{debug, warn};

pub use cache::{CachedBody, CatalogCacheRepo};
pub use detail::RepoMetadata;
pub use download::{DownloadFileSpec, DownloadSpec, DownloadedArtifact, DownloadedFile};
pub use error::{HfError, HfResult};
pub use progress::ProgressEvent;
pub use search::{HF_API_BASE, RepoFile, SearchFilters, SearchPage, SearchReq, SearchResult};
pub use token::HfToken;

pub type ProgressStream = Pin<Box<dyn Stream<Item = ProgressEvent> + Send>>;

#[async_trait]
pub trait HuggingFaceCapability: Send + Sync {
    async fn search(&self, req: SearchReq) -> HfResult<SearchPage>;

    async fn detail(&self, repo_id: &str, revision: Option<&str>) -> HfResult<RepoMetadata>;

    async fn download(&self, spec: DownloadSpec) -> HfResult<DownloadedArtifact>;
}

pub struct HuggingFaceClient {
    http: Client,
    cache: CatalogCacheRepo,
    token: HfToken,
    base_url: String,
}

impl HuggingFaceClient {
    pub fn new(pool: SqlitePool, token: HfToken) -> Self {
        let http = Client::builder()
            .user_agent(concat!(
                "nexus-dnn/",
                env!("CARGO_PKG_VERSION"),
                " (+https://github.com/nexus-dnn)"
            ))
            .timeout(StdDuration::from_secs(30))
            .build()
            .expect("reqwest client builds with default config");
        let cache = CatalogCacheRepo::new(pool, Duration::minutes(10));
        Self {
            http,
            cache,
            token,
            base_url: HF_API_BASE.to_owned(),
        }
    }

    pub fn with_base_url(mut self, base: impl Into<String>) -> Self {
        self.base_url = base.into();
        self
    }

    pub fn token(&self) -> &HfToken {
        &self.token
    }

    fn cache_key_for_search(&self, req: &SearchReq) -> String {
        let page = req.page.to_string();
        let limit = req.limit.to_string();
        let format = req.filters.format.clone().unwrap_or_default();
        let license = req.filters.license.clone().unwrap_or_default();
        CatalogCacheRepo::cache_key(
            "search",
            &[
                ("q", req.query.as_str()),
                ("format", format.as_str()),
                ("license", license.as_str()),
                ("page", page.as_str()),
                ("limit", limit.as_str()),
            ],
        )
    }

    fn cache_key_for_detail(&self, repo_id: &str, revision: &str) -> String {
        CatalogCacheRepo::cache_key("detail", &[("repo", repo_id), ("rev", revision)])
    }

    fn apply_auth(&self, req: reqwest::RequestBuilder) -> reqwest::RequestBuilder {
        match self.token.as_bearer() {
            Some(bearer) => req.header("Authorization", bearer),
            None => req,
        }
    }

    fn classify_response_error(status: StatusCode, had_token: bool) -> HfError {
        match status {
            StatusCode::UNAUTHORIZED | StatusCode::FORBIDDEN if !had_token => {
                HfError::GatedNeedsToken
            }
            StatusCode::NOT_FOUND => HfError::RepoNotFound(String::new()),
            StatusCode::TOO_MANY_REQUESTS => HfError::RateLimited {
                retry_after_seconds: 30,
            },
            StatusCode::SERVICE_UNAVAILABLE
            | StatusCode::BAD_GATEWAY
            | StatusCode::GATEWAY_TIMEOUT => HfError::Unreachable {
                retry_after_seconds: Some(30),
            },
            other => HfError::InvalidResponse(format!("unexpected status {other}")),
        }
    }
}

#[async_trait]
impl HuggingFaceCapability for HuggingFaceClient {
    async fn search(&self, req: SearchReq) -> HfResult<SearchPage> {
        let now = chrono::Utc::now();
        let key = self.cache_key_for_search(&req);

        if let Some(cached) = self.cache.get(&key).await?
            && CatalogCacheRepo::is_fresh(&cached, now)
        {
            debug!(cache_key = %key, "hf search cache hit");
            return serde_json::from_str::<SearchPage>(&cached.body).map_err(HfError::from);
        }

        let url = search::build_search_url(&self.base_url, &req);
        let mut builder = self.http.get(&url);
        builder = self.apply_auth(builder);

        let response = builder.send().await.map_err(|e| {
            if e.is_connect() || e.is_timeout() {
                HfError::Unreachable {
                    retry_after_seconds: Some(15),
                }
            } else {
                HfError::Transport(e)
            }
        })?;

        if !response.status().is_success() {
            return Err(Self::classify_response_error(
                response.status(),
                self.token.is_present(),
            ));
        }

        let etag = response
            .headers()
            .get("etag")
            .and_then(|v| v.to_str().ok())
            .map(str::to_owned);

        let body_text = response.text().await?;
        let raw: Vec<serde_json::Value> = serde_json::from_str(&body_text)
            .map_err(|e| HfError::InvalidResponse(format!("search body: {e}")))?;

        let results = raw
            .into_iter()
            .map(map_raw_to_search_result)
            .collect::<Vec<_>>();

        let page = SearchPage {
            query: req.query.clone(),
            page: req.page,
            has_next: results.len() as u32 >= req.limit,
            results,
        };

        let serialized = serde_json::to_string(&page)?;
        if let Err(e) = self.cache.put(&key, &serialized, etag.as_deref()).await {
            warn!(error = %e, "failed to persist hf search cache entry");
        }

        Ok(page)
    }

    async fn detail(&self, repo_id: &str, revision: Option<&str>) -> HfResult<RepoMetadata> {
        let rev = revision.unwrap_or("main");
        let now = chrono::Utc::now();
        let key = self.cache_key_for_detail(repo_id, rev);

        if let Some(cached) = self.cache.get(&key).await?
            && CatalogCacheRepo::is_fresh(&cached, now)
        {
            return serde_json::from_str::<RepoMetadata>(&cached.body).map_err(HfError::from);
        }

        let url = format!("{}/api/models/{}/revision/{}", self.base_url, repo_id, rev);
        let mut builder = self.http.get(&url);
        builder = self.apply_auth(builder);

        let response = builder.send().await.map_err(|e| {
            if e.is_connect() || e.is_timeout() {
                HfError::Unreachable {
                    retry_after_seconds: Some(15),
                }
            } else {
                HfError::Transport(e)
            }
        })?;

        if !response.status().is_success() {
            return Err(match response.status() {
                StatusCode::NOT_FOUND => HfError::RepoNotFound(repo_id.to_owned()),
                s => Self::classify_response_error(s, self.token.is_present()),
            });
        }

        let body_text = response.text().await?;
        let mut meta: RepoMetadata = serde_json::from_str(&body_text)
            .map_err(|e| HfError::InvalidResponse(format!("detail body: {e}")))?;
        if meta.repo_id.is_empty() {
            meta.repo_id = repo_id.to_owned();
        }
        if meta.revision.is_empty() {
            meta.revision = rev.to_owned();
        }

        let serialized = serde_json::to_string(&meta)?;
        let _ = self.cache.put(&key, &serialized, None).await;

        Ok(meta)
    }

    async fn download(&self, spec: DownloadSpec) -> HfResult<DownloadedArtifact> {
        use futures_util::StreamExt;
        use std::fs::OpenOptions;
        use std::io::Write;

        std::fs::create_dir_all(&spec.staging_dir)?;

        let mut downloaded_files = Vec::with_capacity(spec.files.len());
        let mut total_bytes: u64 = 0;

        for file_spec in &spec.files {
            if spec.cancel_token.is_cancelled() {
                return Err(HfError::Cancelled);
            }

            let url = format!(
                "{}/{}/resolve/{}/{}",
                self.base_url, spec.repo_id, spec.revision, file_spec.path
            );
            let local_path = spec.staging_dir.join(file_spec.path.replace('/', "_"));

            let mut builder = self.http.get(&url);
            builder = self.apply_auth(builder);

            let response = builder.send().await.map_err(|e| {
                if e.is_connect() || e.is_timeout() {
                    HfError::Unreachable {
                        retry_after_seconds: Some(15),
                    }
                } else {
                    HfError::Transport(e)
                }
            })?;

            if !response.status().is_success() {
                return Err(Self::classify_response_error(
                    response.status(),
                    self.token.is_present(),
                ));
            }

            let bytes_total = response.content_length();
            let mut file = OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(&local_path)?;
            let mut hasher = checksum::Hasher::new();
            let mut bytes_done: u64 = 0;
            let mut stream = response.bytes_stream();

            while let Some(chunk) = stream.next().await {
                if spec.cancel_token.is_cancelled() {
                    drop(file);
                    let _ = std::fs::remove_file(&local_path);
                    return Err(HfError::Cancelled);
                }
                let bytes = chunk?;
                hasher.update(&bytes);
                file.write_all(&bytes)?;
                bytes_done += bytes.len() as u64;
                tracing::trace!(
                    task_id = %spec.task_id,
                    file = %file_spec.path,
                    bytes_done,
                    bytes_total = ?bytes_total,
                    "hf download progress"
                );
            }
            file.flush()?;
            drop(file);

            let sha256 = hasher.finalize_hex();
            checksum::verify_hex(file_spec.expected_sha256.as_deref(), &sha256)?;

            total_bytes += bytes_done;
            downloaded_files.push(DownloadedFile {
                path: file_spec.path.clone(),
                local_path,
                size_bytes: bytes_done,
                sha256,
            });
        }

        Ok(DownloadedArtifact {
            task_id: spec.task_id,
            repo_id: spec.repo_id,
            revision: spec.revision,
            files: downloaded_files,
            total_bytes,
        })
    }
}

fn map_raw_to_search_result(value: serde_json::Value) -> SearchResult {
    let repo_id = value
        .get("modelId")
        .and_then(|v| v.as_str())
        .or_else(|| value.get("id").and_then(|v| v.as_str()))
        .unwrap_or("")
        .to_owned();
    let author = value
        .get("author")
        .and_then(|v| v.as_str())
        .map(str::to_owned);
    let license = value
        .get("cardData")
        .and_then(|c| c.get("license"))
        .and_then(|v| v.as_str())
        .map(str::to_owned);
    let downloads_30d = value.get("downloads").and_then(|v| v.as_u64());
    let last_modified = value
        .get("lastModified")
        .and_then(|v| v.as_str())
        .map(str::to_owned);
    let pipeline_tag = value
        .get("pipeline_tag")
        .and_then(|v| v.as_str())
        .map(str::to_owned);

    let files = value
        .get("siblings")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|s| {
                    s.get("rfilename")
                        .and_then(|p| p.as_str())
                        .map(|p| RepoFile {
                            path: p.to_owned(),
                            size_bytes: s.get("size").and_then(|b| b.as_u64()),
                        })
                })
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();

    let formats = infer_formats(&files);
    let quantizations = infer_quantizations(&files);

    SearchResult {
        repo_id,
        author,
        license,
        downloads_30d,
        last_modified,
        files,
        formats,
        quantizations,
        pipeline_tag,
    }
}

fn infer_formats(files: &[RepoFile]) -> Vec<String> {
    let mut formats = Vec::new();
    let mut has_gguf = false;
    let mut has_safetensors = false;
    let mut has_trt = false;
    for f in files {
        let p = f.path.to_ascii_lowercase();
        if p.ends_with(".gguf") {
            has_gguf = true;
        } else if p.ends_with(".safetensors") {
            has_safetensors = true;
        } else if p.ends_with(".engine") || p.contains("trt_llm") {
            has_trt = true;
        }
    }
    if has_gguf {
        formats.push("gguf".into());
    }
    if has_safetensors {
        formats.push("safetensors".into());
    }
    if has_trt {
        formats.push("trt-engine".into());
    }
    formats
}

fn infer_quantizations(files: &[RepoFile]) -> Vec<String> {
    let mut quants = Vec::new();
    for f in files {
        let upper = f.path.to_ascii_uppercase();
        for tag in [
            "Q2_K", "Q3_K_S", "Q3_K_M", "Q3_K_L", "Q4_0", "Q4_K_S", "Q4_K_M", "Q5_0", "Q5_K_S",
            "Q5_K_M", "Q6_K", "Q8_0", "F16", "F32",
        ] {
            if upper.contains(tag) && !quants.iter().any(|q: &String| q == tag) {
                quants.push(tag.to_owned());
            }
        }
    }
    quants
}

pub fn boxed_capability(client: HuggingFaceClient) -> Arc<dyn HuggingFaceCapability> {
    Arc::new(client)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct StubCapability;

    #[async_trait]
    impl HuggingFaceCapability for StubCapability {
        async fn search(&self, req: SearchReq) -> HfResult<SearchPage> {
            Ok(SearchPage {
                query: req.query,
                page: req.page,
                has_next: false,
                results: vec![],
            })
        }

        async fn detail(&self, repo_id: &str, revision: Option<&str>) -> HfResult<RepoMetadata> {
            Ok(RepoMetadata {
                repo_id: repo_id.to_owned(),
                revision: revision.unwrap_or("main").to_owned(),
                author: None,
                license: None,
                pipeline_tag: None,
                library_name: None,
                tags: vec![],
                siblings: vec![],
                config: None,
                downloads: None,
                last_modified: None,
            })
        }

        async fn download(&self, _spec: DownloadSpec) -> HfResult<DownloadedArtifact> {
            Err(HfError::Cancelled)
        }
    }

    #[tokio::test]
    async fn stub_capability_compiles_and_is_mockable() {
        let cap: Arc<dyn HuggingFaceCapability> = Arc::new(StubCapability);
        let page = cap
            .search(SearchReq {
                query: "llama".into(),
                filters: SearchFilters::default(),
                limit: 10,
                page: 1,
            })
            .await
            .unwrap();
        assert_eq!(page.query, "llama");
        assert!(page.results.is_empty());
    }
}
