# Multi-Source Model Foundry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the host Model Foundry install models from a direct URL and from Civitai (paste-link), not only Hugging Face, and slim the filter bar to Source · Search · Downloaded · Sort/View.

**Architecture:** A new `POST /api/v1/model-store/resolve-url` endpoint turns a pasted URL into a synthetic single-artifact `ModelFamily` — Civitai links go through a new resolve-only `nexus-civitai` crate (which supplies the file's SHA256); any other link becomes a direct file with no hash. The existing download **orchestrator** already tolerates `sha256 = None` (trust-on-download), so no install-pipeline change is needed. Downloads of resolved families are created by extending the existing `POST /downloads` request with an inline `direct` target. The orchestrator's token application is made **host-aware** so the HF token never leaks to arbitrary pasted hosts. Frontend gains a Source dropdown (`Hugging Face | From URL`) and a paste→Resolve→single-card flow; the format/backend/modality/compat chips and the repo input are removed.

**Tech Stack:** Rust (axum, reqwest 0.12, serde, thiserror, sqlx, async-trait, wiremock for tests), TypeScript/React (react-router data APIs, vanilla-extract, vitest, @testing-library/react).

> **Supersedes design §4.4 / §9.5:** the live install path is the **orchestrator** (`crates/nexus-models-store/src/downloads/`), not `install/pipeline.rs`; trust-on-download is already present there. The design's "change `download_and_verify`" item is dropped. New required item: host-aware token selection (Task 5, security). `apps/web/dist` is not committed, so no dist-rebuild task.

---

## File Structure

**New files:**
- `crates/nexus-civitai/Cargo.toml` — new crate manifest (peer of `nexus-huggingface`).
- `crates/nexus-civitai/src/lib.rs` — `CivitaiClient`, `CivitaiCapability` trait, public exports.
- `crates/nexus-civitai/src/url.rs` — `CivitaiRef` + `parse_civitai_url` (pure).
- `crates/nexus-civitai/src/resolve.rs` — response types + `parse_version_response` (pure) + modality/role mapping.
- `crates/nexus-civitai/src/error.rs` — `CivitaiError`.
- `crates/nexus-api/src/handlers/model_store/resolve.rs` — the `resolve-url` handler + synthetic-family builders.
- `apps/web/src/views/models-search/components/SourceSelect.tsx` — the Source dropdown.
- `apps/web/src/views/models-search/components/UrlResolvePanel.tsx` — paste + Resolve + single resolved card.
- `apps/web/src/views/models-search/components/__tests__/FilterBar.test.tsx` — slimmed-bar tests.

**Modified files:**
- `crates/nexus-models-store/src/model.rs` — add `Civitai`, `DirectUrl` to `SourceProvider`.
- `crates/nexus-models-store/src/downloads/orchestrator.rs` — host-aware token selection + second token store.
- `crates/nexus-models-store/src/downloads/mod.rs` — re-export the token selector if needed.
- `crates/nexus-api/src/handlers/model_store/mod.rs` — `pub mod resolve;`.
- `crates/nexus-api/src/handlers/model_store/downloads.rs` — accept inline `direct` target.
- `crates/nexus-api/src/handlers/model_store/settings.rs` — civitai-token endpoints.
- `crates/nexus-api/src/router.rs` — mount `resolve-url` + `settings/civitai-token`.
- `crates/nexus-api/src/lib.rs` — `AppState.civitai` + `AppState.civitai_token_store`.
- `crates/nexus-api/Cargo.toml` — depend on `nexus-civitai`.
- `crates/nexus-core/src/app.rs` — construct `CivitaiClient` + civitai `TokenStore`, pass civitai token store to orchestrator, assign new AppState fields.
- `Cargo.toml` (workspace) — `nexus-civitai` is covered by `crates/*`; no edit required (verify).
- `apps/web/src/services/model_store.ts` — `source` param, `resolveUrl`, `direct` download body, civitai-token fetchers, `SourceProvider` union.
- `apps/web/src/views/models-search/components/FilterBar.tsx` — strip chip groups + repo input, add Source select + URL mode.
- `apps/web/src/views/models-search/models_search.ui.tsx` — drop removed toggle props, add source/resolve props.
- `apps/web/src/views/models-search/models_search.view.tsx` — source state, resolve flow, single-card render.
- `apps/web/src/views/models-search/components/__tests__/` — extend `model_store.test.ts`.

---

## Task 1: SourceProvider variants (Rust + TS)

**Files:**
- Modify: `crates/nexus-models-store/src/model.rs:39-47`
- Modify: `apps/web/src/services/model_store.ts:75`

- [ ] **Step 1: Write the failing test** — append to the `tests` module at the bottom of `crates/nexus-models-store/src/model.rs`:

```rust
    #[test]
    fn source_provider_civitai_and_direct_url_round_trip() {
        assert_eq!(
            serde_json::to_string(&SourceProvider::Civitai).unwrap(),
            "\"civitai\""
        );
        assert_eq!(
            serde_json::to_string(&SourceProvider::DirectUrl).unwrap(),
            "\"direct_url\""
        );
        let c: SourceProvider = serde_json::from_str("\"civitai\"").unwrap();
        assert_eq!(c, SourceProvider::Civitai);
        let d: SourceProvider = serde_json::from_str("\"direct_url\"").unwrap();
        assert_eq!(d, SourceProvider::DirectUrl);
        // unknown still maps to Other
        let o: SourceProvider = serde_json::from_str("\"weird\"").unwrap();
        assert_eq!(o, SourceProvider::Other);
    }
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test -p nexus-models-store source_provider_civitai_and_direct_url_round_trip`
Expected: FAIL — `no variant named Civitai`.

- [ ] **Step 3: Add the variants** — edit `crates/nexus-models-store/src/model.rs`, the `SourceProvider` enum (keep `#[serde(other)] Other` LAST):

```rust
pub enum SourceProvider {
    #[default]
    Huggingface,
    Civitai,
    DirectUrl,
    #[serde(other)]
    Other,
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cargo test -p nexus-models-store source_provider`
Expected: PASS.

- [ ] **Step 5: Update the TS union** — `apps/web/src/services/model_store.ts:75`:

```typescript
export type SourceProvider = "huggingface" | "civitai" | "direct_url" | "other";
```

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-models-store/src/model.rs apps/web/src/services/model_store.ts
git commit -m "feat(model-store): add civitai + direct_url source providers"
```

---

## Task 2: `nexus-civitai` crate — URL parsing

**Files:**
- Create: `crates/nexus-civitai/Cargo.toml`
- Create: `crates/nexus-civitai/src/lib.rs`
- Create: `crates/nexus-civitai/src/url.rs`
- Create: `crates/nexus-civitai/src/error.rs`

- [ ] **Step 1: Create the crate manifest** — `crates/nexus-civitai/Cargo.toml`:

```toml
[package]
name = "nexus-civitai"
version = "0.1.0"
edition = "2024"
license = "GPL-3.0-only"
description = "Resolve-only Civitai client for the Nexus-DNN host model store"

[dependencies]
serde = { workspace = true }
serde_json = { workspace = true }
thiserror = { workspace = true }
tracing = { workspace = true }
async-trait = "0.1"
reqwest = { version = "0.12", default-features = false, features = ["json", "rustls-tls"] }

[dev-dependencies]
tokio = { workspace = true, features = ["test-util", "macros", "rt-multi-thread"] }
wiremock = "0.6"
```

- [ ] **Step 2: Create the error type** — `crates/nexus-civitai/src/error.rs`:

```rust
use thiserror::Error;

#[derive(Debug, Error)]
pub enum CivitaiError {
    #[error("not a civitai url: {0}")]
    NotCivitai(String),
    #[error("could not parse a civitai model or version id from: {0}")]
    Unparseable(String),
    #[error("civitai resource not found")]
    NotFound,
    #[error("civitai requires an api token for this resource")]
    AuthRequired,
    #[error("civitai unreachable")]
    Unreachable,
    #[error("transport error: {0}")]
    Transport(#[from] reqwest::Error),
    #[error("json parse error: {0}")]
    Parse(#[from] serde_json::Error),
    #[error("invalid response: {0}")]
    InvalidResponse(String),
}

pub type CivitaiResult<T> = Result<T, CivitaiError>;
```

- [ ] **Step 3: Write the failing URL-parse test** — `crates/nexus-civitai/src/url.rs`:

```rust
use crate::error::{CivitaiError, CivitaiResult};

/// A parsed pointer into Civitai's catalog.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CivitaiRef {
    /// A specific model version (preferred — resolves directly to files).
    Version(u64),
    /// A model id; the resolver picks the latest/default version.
    Model(u64),
}

/// Parse any civitai.com URL form into a [`CivitaiRef`].
///
/// Accepts: `/models/{id}`, `/models/{id}?modelVersionId={vid}`,
/// `/api/v1/model-versions/{vid}`, and `/api/download/models/{vid}`.
pub fn parse_civitai_url(input: &str) -> CivitaiResult<CivitaiRef> {
    let trimmed = input.trim();
    let lower = trimmed.to_ascii_lowercase();
    if !lower.contains("civitai.com") {
        return Err(CivitaiError::NotCivitai(trimmed.to_string()));
    }
    let (path, query) = split_path_query(trimmed);

    if let Some(vid) = query_param_u64(query, "modelversionid") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(vid) = segment_after(&path, "model-versions") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(vid) = segment_after(&path, "download/models") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(id) = segment_after(&path, "models") {
        return Ok(CivitaiRef::Model(id));
    }
    Err(CivitaiError::Unparseable(trimmed.to_string()))
}

fn split_path_query(url: &str) -> (String, &str) {
    let no_scheme = url.split("://").last().unwrap_or(url);
    match no_scheme.split_once('?') {
        Some((p, q)) => (p.to_ascii_lowercase(), q),
        None => (no_scheme.to_ascii_lowercase(), ""),
    }
}

fn query_param_u64(query: &str, key_lower: &str) -> Option<u64> {
    query.split('&').find_map(|pair| {
        let (k, v) = pair.split_once('=')?;
        if k.to_ascii_lowercase() == key_lower {
            v.parse().ok()
        } else {
            None
        }
    })
}

fn segment_after(path_lower: &str, marker: &str) -> Option<u64> {
    let idx = path_lower.find(marker)?;
    let rest = &path_lower[idx + marker.len()..];
    rest.trim_start_matches('/')
        .split('/')
        .next()
        .and_then(|s| s.split('?').next())
        .and_then(|s| s.parse().ok())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_model_url() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/models/4201").unwrap(),
            CivitaiRef::Model(4201)
        );
    }

    #[test]
    fn version_query_wins_over_model() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/models/4201?modelVersionId=130072").unwrap(),
            CivitaiRef::Version(130072)
        );
    }

    #[test]
    fn parses_api_version_and_download_forms() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/api/v1/model-versions/130072").unwrap(),
            CivitaiRef::Version(130072)
        );
        assert_eq!(
            parse_civitai_url("https://civitai.com/api/download/models/130072?type=Model").unwrap(),
            CivitaiRef::Version(130072)
        );
    }

    #[test]
    fn rejects_non_civitai() {
        assert!(matches!(
            parse_civitai_url("https://example.com/models/1"),
            Err(CivitaiError::NotCivitai(_))
        ));
    }

    #[test]
    fn rejects_civitai_without_id() {
        assert!(matches!(
            parse_civitai_url("https://civitai.com/user/foo"),
            Err(CivitaiError::Unparseable(_))
        ));
    }
}
```

- [ ] **Step 4: Create a minimal lib.rs so the crate compiles** — `crates/nexus-civitai/src/lib.rs`:

```rust
pub mod error;
pub mod url;

pub use error::{CivitaiError, CivitaiResult};
pub use url::{CivitaiRef, parse_civitai_url};
```

- [ ] **Step 5: Run the tests**

Run: `cargo test -p nexus-civitai url::`
Expected: PASS (5 tests).

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-civitai/
git commit -m "feat(nexus-civitai): scaffold crate + civitai URL parsing"
```

---

## Task 3: `nexus-civitai` — version response parsing + client

**Files:**
- Create: `crates/nexus-civitai/src/resolve.rs`
- Modify: `crates/nexus-civitai/src/lib.rs`

- [ ] **Step 1: Write the failing parser test** — `crates/nexus-civitai/src/resolve.rs`:

```rust
use serde::Deserialize;

use crate::error::{CivitaiError, CivitaiResult};

/// A single downloadable file on a Civitai model version.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CivitaiFile {
    pub name: String,
    pub size_bytes: u64,
    pub sha256: Option<String>,
    pub download_url: String,
    pub primary: bool,
}

/// Normalized result of resolving a Civitai model version.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CivitaiResolved {
    pub model_id: u64,
    pub version_id: u64,
    pub name: String,
    pub model_type: String,
    pub license: Option<String>,
    pub files: Vec<CivitaiFile>,
}

impl CivitaiResolved {
    /// The primary file if flagged, else the first file.
    #[must_use]
    pub fn primary_file(&self) -> Option<&CivitaiFile> {
        self.files
            .iter()
            .find(|f| f.primary)
            .or_else(|| self.files.first())
    }

    /// Map the Civitai model type to a model-store modality token.
    #[must_use]
    pub fn modality(&self) -> &'static str {
        match self.model_type.to_ascii_lowercase().as_str() {
            "checkpoint" => "image",
            "lora" | "locon" | "lycoris" | "dora" => "lora",
            "textualinversion" => "embedding",
            "vae" => "other",
            "controlnet" => "other",
            "upscaler" => "upscaler",
            _ => "other",
        }
    }
}

#[derive(Debug, Deserialize)]
struct RawVersion {
    id: u64,
    #[serde(rename = "modelId")]
    model_id: Option<u64>,
    name: Option<String>,
    #[serde(default)]
    model: RawModel,
    #[serde(default)]
    files: Vec<RawFile>,
}

#[derive(Debug, Default, Deserialize)]
struct RawModel {
    name: Option<String>,
    #[serde(rename = "type")]
    type_: Option<String>,
}

#[derive(Debug, Deserialize)]
struct RawFile {
    name: String,
    #[serde(rename = "sizeKB")]
    size_kb: Option<f64>,
    #[serde(default)]
    hashes: RawHashes,
    #[serde(rename = "downloadUrl")]
    download_url: Option<String>,
    #[serde(default)]
    primary: bool,
}

#[derive(Debug, Default, Deserialize)]
struct RawHashes {
    #[serde(rename = "SHA256")]
    sha256: Option<String>,
}

/// Parse a Civitai `/model-versions/{id}` JSON body into [`CivitaiResolved`].
pub fn parse_version_response(body: &str) -> CivitaiResult<CivitaiResolved> {
    let raw: RawVersion = serde_json::from_str(body)?;
    let files: Vec<CivitaiFile> = raw
        .files
        .into_iter()
        .filter_map(|f| {
            let download_url = f.download_url?;
            let size_bytes = f.size_kb.map(|kb| (kb * 1024.0) as u64).unwrap_or(0);
            Some(CivitaiFile {
                name: f.name,
                size_bytes,
                sha256: f.hashes.sha256.map(|s| s.to_ascii_lowercase()),
                download_url,
                primary: f.primary,
            })
        })
        .collect();
    if files.is_empty() {
        return Err(CivitaiError::InvalidResponse(
            "version has no downloadable files".into(),
        ));
    }
    Ok(CivitaiResolved {
        model_id: raw.model_id.unwrap_or(0),
        version_id: raw.id,
        name: raw
            .name
            .or(raw.model.name)
            .unwrap_or_else(|| format!("civitai-{}", raw.id)),
        model_type: raw.model.type_.unwrap_or_else(|| "Other".into()),
        license: None,
        files,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const VERSION_JSON: &str = r#"{
        "id": 130072,
        "modelId": 4201,
        "name": "v2.0",
        "model": { "name": "DreamModel", "type": "Checkpoint" },
        "files": [
            { "name": "low.safetensors", "sizeKB": 1024.0,
              "hashes": { "SHA256": "AABBCC" },
              "downloadUrl": "https://civitai.com/api/download/models/130072?type=Pruned",
              "primary": false },
            { "name": "main.safetensors", "sizeKB": 2048.0,
              "hashes": { "SHA256": "DDEEFF" },
              "downloadUrl": "https://civitai.com/api/download/models/130072",
              "primary": true }
        ]
    }"#;

    #[test]
    fn parses_version_and_picks_primary() {
        let r = parse_version_response(VERSION_JSON).unwrap();
        assert_eq!(r.model_id, 4201);
        assert_eq!(r.version_id, 130072);
        assert_eq!(r.model_type, "Checkpoint");
        assert_eq!(r.modality(), "image");
        let p = r.primary_file().unwrap();
        assert_eq!(p.name, "main.safetensors");
        assert_eq!(p.size_bytes, 2048 * 1024);
        assert_eq!(p.sha256.as_deref(), Some("ddeeff"));
    }

    #[test]
    fn lora_type_maps_to_lora_modality() {
        let json = VERSION_JSON.replace("Checkpoint", "LORA");
        let r = parse_version_response(&json).unwrap();
        assert_eq!(r.modality(), "lora");
    }

    #[test]
    fn empty_files_is_error() {
        let json = r#"{ "id": 1, "model": { "type": "Checkpoint" }, "files": [] }"#;
        assert!(matches!(
            parse_version_response(json),
            Err(CivitaiError::InvalidResponse(_))
        ));
    }
}
```

- [ ] **Step 2: Run the parser test (compile fails — not yet in lib)**

Run: `cargo test -p nexus-civitai resolve::`
Expected: FAIL to compile — `module resolve not found`.

- [ ] **Step 3: Wire the module + client into lib.rs** — replace `crates/nexus-civitai/src/lib.rs`:

```rust
use std::time::Duration;

use async_trait::async_trait;

pub mod error;
pub mod resolve;
pub mod url;

pub use error::{CivitaiError, CivitaiResult};
pub use resolve::{CivitaiFile, CivitaiResolved, parse_version_response};
pub use url::{CivitaiRef, parse_civitai_url};

pub const CIVITAI_API_BASE: &str = "https://civitai.com/api/v1";

#[async_trait]
pub trait CivitaiCapability: Send + Sync {
    async fn resolve(&self, reference: CivitaiRef) -> CivitaiResult<CivitaiResolved>;
}

pub struct CivitaiClient {
    http: reqwest::Client,
    base_url: String,
    token: Option<String>,
}

impl CivitaiClient {
    #[must_use]
    pub fn new(token: Option<String>) -> Self {
        let http = reqwest::Client::builder()
            .user_agent(concat!("nexus-dnn/", env!("CARGO_PKG_VERSION")))
            .timeout(Duration::from_secs(30))
            .build()
            .expect("reqwest client builds");
        Self {
            http,
            base_url: CIVITAI_API_BASE.to_owned(),
            token,
        }
    }

    #[must_use]
    pub fn with_base_url(mut self, base: impl Into<String>) -> Self {
        self.base_url = base.into();
        self
    }

    async fn get_version(&self, version_id: u64) -> CivitaiResult<CivitaiResolved> {
        let url = format!("{}/model-versions/{version_id}", self.base_url);
        let body = self.get_text(&url).await?;
        parse_version_response(&body)
    }

    async fn get_text(&self, url: &str) -> CivitaiResult<String> {
        let mut req = self.http.get(url);
        if let Some(tok) = &self.token {
            req = req.bearer_auth(tok);
        }
        let resp = req.send().await.map_err(|_| CivitaiError::Unreachable)?;
        match resp.status().as_u16() {
            200 => Ok(resp.text().await?),
            401 | 403 => Err(CivitaiError::AuthRequired),
            404 => Err(CivitaiError::NotFound),
            _ => Err(CivitaiError::Unreachable),
        }
    }
}

#[async_trait]
impl CivitaiCapability for CivitaiClient {
    async fn resolve(&self, reference: CivitaiRef) -> CivitaiResult<CivitaiResolved> {
        match reference {
            CivitaiRef::Version(v) => self.get_version(v).await,
            CivitaiRef::Model(m) => {
                let url = format!("{}/models/{m}", self.base_url);
                let body = self.get_text(&url).await?;
                let v: serde_json::Value = serde_json::from_str(&body)?;
                let version_id = v
                    .get("modelVersions")
                    .and_then(|a| a.as_array())
                    .and_then(|a| a.first())
                    .and_then(|x| x.get("id"))
                    .and_then(serde_json::Value::as_u64)
                    .ok_or_else(|| {
                        CivitaiError::InvalidResponse("model has no versions".into())
                    })?;
                self.get_version(version_id).await
            }
        }
    }
}
```

- [ ] **Step 4: Run the parser tests**

Run: `cargo test -p nexus-civitai`
Expected: PASS (url + resolve tests).

- [ ] **Step 5: Write a wiremock client test** — append to `crates/nexus-civitai/src/lib.rs`:

```rust
#[cfg(test)]
mod client_tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn resolves_version_via_http() {
        let server = MockServer::start().await;
        let body = r#"{ "id": 7, "modelId": 3, "name": "n",
            "model": { "type": "Checkpoint" },
            "files": [ { "name": "m.safetensors", "sizeKB": 1.0,
                "hashes": { "SHA256": "AB" },
                "downloadUrl": "https://civitai.com/api/download/models/7",
                "primary": true } ] }"#;
        Mock::given(method("GET"))
            .and(path("/model-versions/7"))
            .respond_with(ResponseTemplate::new(200).set_body_string(body))
            .mount(&server)
            .await;

        let client = CivitaiClient::new(None).with_base_url(server.uri());
        let r = client.resolve(CivitaiRef::Version(7)).await.unwrap();
        assert_eq!(r.version_id, 7);
        assert_eq!(r.primary_file().unwrap().sha256.as_deref(), Some("ab"));
    }

    #[tokio::test]
    async fn maps_403_to_auth_required() {
        let server = MockServer::start().await;
        Mock::given(method("GET"))
            .and(path("/model-versions/9"))
            .respond_with(ResponseTemplate::new(403))
            .mount(&server)
            .await;
        let client = CivitaiClient::new(None).with_base_url(server.uri());
        assert!(matches!(
            client.resolve(CivitaiRef::Version(9)).await,
            Err(CivitaiError::AuthRequired)
        ));
    }
}
```

- [ ] **Step 6: Run + commit**

Run: `cargo test -p nexus-civitai`
Expected: PASS (all url, resolve, client tests).

```bash
git add crates/nexus-civitai/
git commit -m "feat(nexus-civitai): version resolve + client with fixture/wiremock tests"
```

---

## Task 4: Resolve handler + synthetic family builders

**Files:**
- Create: `crates/nexus-api/src/handlers/model_store/resolve.rs`
- Modify: `crates/nexus-api/src/handlers/model_store/mod.rs`
- Modify: `crates/nexus-api/src/router.rs:477`
- Modify: `crates/nexus-api/Cargo.toml`
- Modify: `crates/nexus-api/src/lib.rs` (AppState field — see Task 7 for construction)

> Context: `ModelFamily`, `Artifact`, `Variant`, `ModelRepository` live in `nexus_models_store::model`. `Format`/`Modality`/`DependencyRole`/`Precision`/`PrecisionSource`/`CompatibilityStatus`/`DownloadState` in `nexus_models_store::types`. `classify_format(filename)` is in `nexus_models_store::normalize::classify` (returns `Format`). The handler returns `ApiResponse::ok(family)` (see `crates/nexus-api/src/envelope.rs`). Resolved families set `compat = CompatibilityStatus::DownloadableButNotRunnable` (honest: the host can't promise a backend runs an arbitrary file). IDs use the crate's id newtypes (`FamilyId`, `ArtifactId`, `VariantId`) constructed via `::from(String)`.

- [ ] **Step 1: Add the crate dependency** — `crates/nexus-api/Cargo.toml`, under `[dependencies]`:

```toml
nexus-civitai = { path = "../nexus-civitai" }
```

- [ ] **Step 2: Add the AppState field** — `crates/nexus-api/src/lib.rs`, inside `pub struct AppState` (next to `huggingface`):

```rust
    pub civitai: Option<Arc<dyn nexus_civitai::CivitaiCapability>>,
```

(Construction is wired in Task 7. Until then the field defaults to `None` everywhere `AppState` is built — add `civitai: None,` to every `AppState { .. }` literal that fails to compile; there is one production site in `crates/nexus-core/src/app.rs` and test builders.)

- [ ] **Step 3: Write the failing builder tests** — create `crates/nexus-api/src/handlers/model_store/resolve.rs`:

```rust
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde::Deserialize;

use nexus_civitai::{CivitaiError, CivitaiRef, CivitaiResolved};
use nexus_models_store::ids::{ArtifactId, FamilyId, VariantId};
use nexus_models_store::model::{
    Artifact, ModelFamily, ModelRepository, SourceProvider, Variant,
};
use nexus_models_store::normalize::classify::classify_format;
use nexus_models_store::types::{
    CompatibilityStatus, DependencyRole, DownloadState, Modality, Precision, PrecisionSource,
    VariantType,
};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize)]
pub struct ResolveUrlRequest {
    pub url: String,
}

/// Metadata probed from a plain HTTP HEAD/GET on a direct file URL.
#[derive(Debug, Clone)]
pub struct DirectHeadMeta {
    pub filename: String,
    pub size_bytes: Option<u64>,
}

fn modality_from_str(token: &str) -> Modality {
    match token {
        "image" => Modality::Image,
        "video" => Modality::Video,
        "audio" => Modality::Audio,
        "upscaler" => Modality::Upscaler,
        "embedding" => Modality::Embedding,
        "llm" => Modality::Llm,
        _ => Modality::Other,
    }
}

/// Build a one-artifact family for a plain direct URL (no upstream hash).
pub fn build_direct_family(url: &str, meta: &DirectHeadMeta) -> ModelFamily {
    let format = classify_format(&meta.filename);
    let family_id = format!("direct_url:{}", meta.filename);
    let artifact_id = format!("{family_id}#0");
    let artifact = Artifact {
        artifact_id: ArtifactId::from(artifact_id.clone()),
        role: DependencyRole::Primary,
        format,
        precision: Precision::Unknown,
        precision_source: PrecisionSource::Unknown,
        size_bytes: meta.size_bytes,
        filename: meta.filename.clone(),
        download_url: url.to_string(),
        sha256: None,
        install_state: DownloadState::NotDownloaded,
    };
    let variant = Variant {
        variant_id: VariantId::from(format!("{family_id}:default")),
        variant_type: VariantType::Other,
        label: meta.filename.clone(),
        artifact_ids: vec![ArtifactId::from(artifact_id)],
        is_default: true,
        install_state: DownloadState::NotDownloaded,
    };
    ModelFamily {
        family_id: FamilyId::from(family_id),
        repository: ModelRepository {
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
        },
        artifacts: vec![artifact],
        variants: vec![variant],
        dependencies: vec![],
        compat: CompatibilityStatus::DownloadableButNotRunnable,
        warnings: vec![],
    }
}

/// Build a one-artifact family from a resolved Civitai version (has hash).
pub fn build_civitai_family(r: &CivitaiResolved) -> Option<ModelFamily> {
    let file = r.primary_file()?;
    let modality = modality_from_str(r.modality());
    let format = classify_format(&file.name);
    let family_id = format!("civitai:{}/{}", r.model_id, r.version_id);
    let artifact_id = format!("{family_id}#0");
    let artifact = Artifact {
        artifact_id: ArtifactId::from(artifact_id.clone()),
        role: DependencyRole::Primary,
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
        variant_id: VariantId::from(format!("{family_id}:default")),
        variant_type: VariantType::Other,
        label: file.name.clone(),
        artifact_ids: vec![ArtifactId::from(artifact_id)],
        is_default: true,
        install_state: DownloadState::NotDownloaded,
    };
    Some(ModelFamily {
        family_id: FamilyId::from(family_id),
        repository: ModelRepository {
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
        },
        artifacts: vec![artifact],
        variants: vec![variant],
        dependencies: vec![],
        compat: CompatibilityStatus::DownloadableButNotRunnable,
        warnings: vec![],
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn direct_family_infers_format_and_has_no_hash() {
        let meta = DirectHeadMeta {
            filename: "model.gguf".into(),
            size_bytes: Some(123),
        };
        let f = build_direct_family("https://x/model.gguf", &meta);
        assert_eq!(f.repository.source_provider, SourceProvider::DirectUrl);
        assert_eq!(f.artifacts.len(), 1);
        assert!(f.artifacts[0].sha256.is_none());
        assert_eq!(
            f.artifacts[0].format,
            nexus_models_store::types::Format::Gguf
        );
        assert!(f.variants[0].is_default);
    }

    #[test]
    fn civitai_family_carries_hash() {
        let json = r#"{ "id": 7, "modelId": 3, "name": "n",
            "model": { "type": "Checkpoint" },
            "files": [ { "name": "m.safetensors", "sizeKB": 1.0,
                "hashes": { "SHA256": "AB" },
                "downloadUrl": "https://civitai.com/api/download/models/7",
                "primary": true } ] }"#;
        let resolved = nexus_civitai::parse_version_response(json).unwrap();
        let f = build_civitai_family(&resolved).unwrap();
        assert_eq!(f.repository.source_provider, SourceProvider::Civitai);
        assert_eq!(f.artifacts[0].sha256.as_deref(), Some("ab"));
    }
}
```

- [ ] **Step 4: Verify the `VariantType` import exists** — confirm `VariantType` is exported from `nexus_models_store::types` (it is, per `model_store.ts` mirror). If the compiler reports it lives elsewhere, fix the `use`.

Run: `cargo test -p nexus-api resolve::tests`
Expected: FAIL first to compile (module not declared), then after Step 5, PASS.

- [ ] **Step 5: Declare the module + add the async handler** — append the handler to `resolve.rs`:

```rust
fn filename_from_url(url: &str) -> String {
    url.split('?')
        .next()
        .unwrap_or(url)
        .rsplit('/')
        .next()
        .filter(|s| !s.is_empty())
        .unwrap_or("download.bin")
        .to_string()
}

async fn head_direct(state: &AppState, url: &str) -> Result<DirectHeadMeta, Response> {
    let client = reqwest::Client::new();
    let resp = client.head(url).send().await.map_err(|_| {
        ApiResponse::<()>::err(
            StatusCode::BAD_GATEWAY,
            "upstream_unavailable",
            "upstream",
            "could not reach the URL".into(),
        )
        .into_response()
    })?;
    let _ = state; // reserved for future per-host auth on HEAD
    let filename = resp
        .headers()
        .get(reqwest::header::CONTENT_DISPOSITION)
        .and_then(|v| v.to_str().ok())
        .and_then(parse_content_disposition_filename)
        .unwrap_or_else(|| filename_from_url(url));
    let size_bytes = resp
        .headers()
        .get(reqwest::header::CONTENT_LENGTH)
        .and_then(|v| v.to_str().ok())
        .and_then(|s| s.parse().ok());
    Ok(DirectHeadMeta {
        filename,
        size_bytes,
    })
}

fn parse_content_disposition_filename(value: &str) -> Option<String> {
    value.split(';').find_map(|part| {
        let part = part.trim();
        let rest = part.strip_prefix("filename=")?;
        Some(rest.trim_matches('"').to_string())
    })
}

pub async fn resolve_url(
    State(state): State<AppState>,
    Json(req): Json<ResolveUrlRequest>,
) -> Response {
    let url = req.url.trim().to_string();
    if !url.starts_with("http://") && !url.starts_with("https://") {
        return ApiResponse::<()>::bad_request("url must start with http(s)://".into())
            .into_response();
    }

    if url.to_ascii_lowercase().contains("civitai.com") {
        let reference = match nexus_civitai::parse_civitai_url(&url) {
            Ok(r) => r,
            Err(e) => {
                return ApiResponse::<()>::bad_request(e.to_string()).into_response();
            }
        };
        let Some(client) = state.civitai.as_ref() else {
            return ApiResponse::<()>::err(
                StatusCode::SERVICE_UNAVAILABLE,
                "upstream_unavailable",
                "upstream",
                "Civitai client is not configured".into(),
            )
            .into_response();
        };
        return match client.resolve(reference).await {
            Ok(resolved) => match build_civitai_family(&resolved) {
                Some(family) => ApiResponse::ok(family).into_response(),
                None => ApiResponse::<()>::bad_request(
                    "civitai version has no downloadable file".into(),
                )
                .into_response(),
            },
            Err(CivitaiError::AuthRequired) => ApiResponse::<()>::err(
                StatusCode::UNAUTHORIZED,
                "auth_required",
                "auth",
                "this Civitai resource needs an API token".into(),
            )
            .into_response(),
            Err(CivitaiError::NotFound) => {
                ApiResponse::<()>::not_found("civitai resource not found".into()).into_response()
            }
            Err(e) => ApiResponse::<()>::err(
                StatusCode::BAD_GATEWAY,
                "upstream_unavailable",
                "upstream",
                e.to_string(),
            )
            .into_response(),
        };
    }

    match head_direct(&state, &url).await {
        Ok(meta) => ApiResponse::ok(build_direct_family(&url, &meta)).into_response(),
        Err(resp) => resp,
    }
}
```

Then `crates/nexus-api/src/handlers/model_store/mod.rs` — add:

```rust
pub mod resolve;
```

- [ ] **Step 6: Mount the route** — `crates/nexus-api/src/router.rs`, immediately before the `"/model-store/settings/hf-token"` route (~line 477):

```rust
        .route(
            "/model-store/resolve-url",
            post(handlers::model_store::resolve::resolve_url),
        )
```

- [ ] **Step 7: Build + run tests**

Run: `cargo test -p nexus-api resolve::`
Expected: PASS (2 builder tests). Then `cargo build -p nexus-api` — fix any `AppState { .. }` literals missing `civitai: None,`.

- [ ] **Step 8: Commit**

```bash
git add crates/nexus-api/ crates/nexus-core/
git commit -m "feat(model-store): POST /resolve-url for civitai + direct URLs"
```

---

## Task 5: Host-aware token selection in the orchestrator (SECURITY)

> **Why CRITICAL:** `orchestrator.rs:392-395` applies the HF bearer token to *every* `download_url`. Once arbitrary pasted URLs flow through the orchestrator, the HF token would be sent to any host. This task scopes each token to its own host and adds the Civitai token.

**Files:**
- Modify: `crates/nexus-models-store/src/downloads/orchestrator.rs`
- Modify: `crates/nexus-models-store/src/downloads/mod.rs` (export selector if needed)

- [ ] **Step 1: Write the failing selector test** — add near the top of `orchestrator.rs` (in its `#[cfg(test)]` module, or create one):

```rust
#[cfg(test)]
mod token_select_tests {
    use super::token_for_url;

    #[test]
    fn hf_token_only_for_huggingface_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(
            token_for_url("https://huggingface.co/x/y/resolve/main/m.gguf", &hf, &cv),
            Some("HF".to_string())
        );
        assert_eq!(
            token_for_url("https://cdn-lfs.huggingface.co/abc", &hf, &cv),
            Some("HF".to_string())
        );
    }

    #[test]
    fn civitai_token_only_for_civitai_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(
            token_for_url("https://civitai.com/api/download/models/7", &hf, &cv),
            Some("CV".to_string())
        );
    }

    #[test]
    fn no_token_for_arbitrary_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(token_for_url("https://example.com/m.gguf", &hf, &cv), None);
    }
}
```

- [ ] **Step 2: Run it (fails to compile)**

Run: `cargo test -p nexus-models-store token_select_tests`
Expected: FAIL — `token_for_url` not found.

- [ ] **Step 3: Implement the selector** — add to `orchestrator.rs` (module scope):

```rust
/// Choose which stored token (if any) may be sent to a given download URL.
/// Tokens are host-scoped so a pasted third-party URL never receives the
/// Hugging Face or Civitai bearer.
fn token_for_url(
    url: &str,
    hf_token: &Option<String>,
    civitai_token: &Option<String>,
) -> Option<String> {
    let host = url
        .split("://")
        .nth(1)
        .unwrap_or(url)
        .split('/')
        .next()
        .unwrap_or("")
        .to_ascii_lowercase();
    if host.ends_with("huggingface.co") || host.ends_with("hf.co") {
        hf_token.clone()
    } else if host.ends_with("civitai.com") {
        civitai_token.clone()
    } else {
        None
    }
}
```

- [ ] **Step 4: Add a civitai token field to `Inner` + constructor** — in `orchestrator.rs`:

In `struct Inner` add after `tokens: TokenStore,`:

```rust
    civitai_tokens: TokenStore,
```

Change `DownloadOrchestrator::new` and `with_cancel` signatures to take an extra `civitai_tokens: TokenStore` and thread it into `Inner`. Update the doc/order so `civitai_tokens` follows `tokens`.

- [ ] **Step 5: Replace the unconditional bearer** — in the download worker (~line 392-395), replace:

```rust
let mut req = self.inner.http.get(&target.download_url).headers(headers);
if let Some(tok) = self.inner.tokens.current().await {
    req = req.bearer_auth(tok);
}
```

with:

```rust
let hf_tok = self.inner.tokens.current().await;
let cv_tok = self.inner.civitai_tokens.current().await;
let mut req = self.inner.http.get(&target.download_url).headers(headers);
if let Some(tok) = token_for_url(&target.download_url, &hf_tok, &cv_tok) {
    req = req.bearer_auth(tok);
}
```

- [ ] **Step 6: Run tests**

Run: `cargo test -p nexus-models-store`
Expected: PASS (selector tests + existing suite). Fix the one construction site (`crates/nexus-core/src/app.rs`) in Task 7.

- [ ] **Step 7: Commit**

```bash
git add crates/nexus-models-store/
git commit -m "fix(model-store): host-scope download tokens; add civitai token store"
```

---

## Task 6: Inline `direct` download target

> Context: `create_download` (downloads.rs) resolves an HF family from `family_id`. A resolved URL/Civitai family is NOT in HF, so we let the request carry the target inline. When `direct` is present, build `CreateJobParams` straight from it and skip `resolve_family`.

**Files:**
- Modify: `crates/nexus-api/src/handlers/model_store/downloads.rs`

- [ ] **Step 1: Write the failing test** — in the `#[cfg(test)]` module of `downloads.rs` (or add one), test the request deserializes the new shape and the params builder maps it:

```rust
#[cfg(test)]
mod direct_target_tests {
    use super::*;

    #[test]
    fn parses_direct_download_request() {
        let json = r#"{
            "family_id": "direct_url:m.gguf",
            "direct": {
                "source_provider": "direct_url",
                "source_repo": "m.gguf",
                "artifact_id": "direct_url:m.gguf#0",
                "filename": "m.gguf",
                "role": "primary",
                "download_url": "https://example.com/m.gguf",
                "sha256": null,
                "size_bytes": 10
            }
        }"#;
        let req: CreateDownloadRequest = serde_json::from_str(json).unwrap();
        let direct = req.direct.expect("direct present");
        assert_eq!(direct.source_provider, "direct_url");
        assert!(direct.sha256.is_none());
        let params = direct.into_params(&req.family_id);
        assert_eq!(params.targets.len(), 1);
        assert_eq!(params.source_provider, "direct_url");
        assert!(params.targets[0].sha256.is_none());
    }
}
```

- [ ] **Step 2: Run it (fails)**

Run: `cargo test -p nexus-api direct_target_tests`
Expected: FAIL — no field `direct`.

- [ ] **Step 3: Add the DTO + builder + request field** — in `downloads.rs`:

```rust
#[derive(Debug, Deserialize)]
pub struct DirectDownloadTarget {
    pub source_provider: String,
    pub source_repo: String,
    pub artifact_id: String,
    pub filename: String,
    pub role: nexus_models_store::types::DependencyRole,
    pub download_url: String,
    #[serde(default)]
    pub sha256: Option<String>,
    #[serde(default)]
    pub size_bytes: Option<u64>,
}

impl DirectDownloadTarget {
    pub fn into_params(
        self,
        family_id: &str,
    ) -> nexus_models_store::downloads::CreateJobParams {
        use nexus_models_store::downloads::{CreateJobParams, JobTargetInput, RequestedKind};
        use nexus_models_store::ids::{ArtifactId, FamilyId};
        let target = JobTargetInput {
            artifact_id: ArtifactId::from(self.artifact_id),
            filename: self.filename,
            role: self.role,
            download_url: self.download_url,
            expected_bytes: self.size_bytes,
            sha256: self.sha256,
        };
        CreateJobParams::builder(
            FamilyId::from(family_id.to_string()),
            self.source_provider,
            self.source_repo,
            RequestedKind::Primary,
        )
        .targets(vec![target])
        .build()
    }
}
```

Add to `CreateDownloadRequest` (make `target` optional since direct requests omit it):

```rust
#[derive(Debug, Deserialize)]
pub struct CreateDownloadRequest {
    pub family_id: String,
    #[serde(default)]
    pub target: Option<DownloadTarget>,
    #[serde(default)]
    pub include_dependencies: bool,
    #[serde(default)]
    pub direct: Option<DirectDownloadTarget>,
}
```

- [ ] **Step 4: Branch in `create_download`** — at the top of the handler body, before the HF `resolve_family` path:

```rust
    if let Some(direct) = req.direct {
        let Some(store) = state.download_job_store.as_ref() else {
            return ApiResponse::<()>::err(
                StatusCode::SERVICE_UNAVAILABLE,
                "unavailable",
                "internal",
                "download store unavailable".into(),
            )
            .into_response();
        };
        let Some(orchestrator) = state.download_orchestrator.as_ref() else {
            return ApiResponse::<()>::err(
                StatusCode::SERVICE_UNAVAILABLE,
                "unavailable",
                "internal",
                "download orchestrator unavailable".into(),
            )
            .into_response();
        };
        let params = direct.into_params(&req.family_id);
        let job = match store.create(params).await {
            Ok(j) => j,
            Err(e) => {
                return ApiResponse::<()>::internal(format!("create job failed: {e}"))
                    .into_response();
            }
        };
        orchestrator.enqueue(job.job_id).await;
        return ApiResponse::created(job_to_dto(&job)).into_response();
    }
```

> Adjust `job_to_dto` to the existing job→DTO mapper name used by the other handlers in `downloads.rs` (reuse whatever `create_download` currently returns for HF jobs). If the existing path uses `Json(JobDto::from(&job))` or similar, mirror it exactly. Also unwrap `req.target` (now `Option`) in the HF path with a clear 400 when both `target` and `direct` are absent.

- [ ] **Step 5: Run + build**

Run: `cargo test -p nexus-api direct_target_tests` then `cargo build -p nexus-api`
Expected: PASS + clean build. Fix the HF path's `req.target` unwrap.

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-api/
git commit -m "feat(model-store): inline direct download target for resolved families"
```

---

## Task 7: Wire CivitaiClient + civitai token store into AppState

**Files:**
- Modify: `crates/nexus-api/src/lib.rs` (add `civitai_token_store` field)
- Modify: `crates/nexus-api/src/handlers/model_store/settings.rs` (civitai-token endpoints)
- Modify: `crates/nexus-api/src/router.rs` (mount civitai-token route)
- Modify: `crates/nexus-core/src/app.rs` (construct + assign)

- [ ] **Step 1: Add the token-store AppState field** — `crates/nexus-api/src/lib.rs`, next to `hf_token_store`:

```rust
    pub civitai_token_store: Option<nexus_models_store::downloads::TokenStore>,
```

- [ ] **Step 2: Write the failing settings test** — in `settings.rs` `#[cfg(test)]`:

```rust
    #[test]
    fn civitai_token_request_deserializes() {
        let r: SetCivitaiTokenRequest =
            serde_json::from_str(r#"{ "token": "abc" }"#).unwrap();
        assert_eq!(r.token, "abc");
    }
```

- [ ] **Step 3: Run (fails)**

Run: `cargo test -p nexus-api civitai_token_request_deserializes`
Expected: FAIL — type missing.

- [ ] **Step 4: Add civitai-token handlers** — `settings.rs`, mirroring the hf-token trio:

```rust
#[derive(Debug, Serialize)]
pub struct CivitaiTokenStatusDto {
    pub configured: bool,
}

#[derive(Debug, Deserialize)]
pub struct SetCivitaiTokenRequest {
    pub token: String,
}

pub async fn get_civitai_token_status(State(state): State<AppState>) -> Response {
    let configured = match state.civitai_token_store.as_ref() {
        Some(s) => s.current().await.is_some(),
        None => false,
    };
    ApiResponse::ok(CivitaiTokenStatusDto { configured }).into_response()
}

pub async fn set_civitai_token(
    State(state): State<AppState>,
    Json(req): Json<SetCivitaiTokenRequest>,
) -> Response {
    let trimmed = req.token.trim();
    if trimmed.is_empty() {
        return ApiResponse::<()>::bad_request("token must not be empty".into()).into_response();
    }
    let Some(store) = state.civitai_token_store.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "unavailable",
            "internal",
            "civitai token store unavailable".into(),
        )
        .into_response();
    };
    store.set(trimmed.to_owned()).await;
    ApiResponse::ok(CivitaiTokenStatusDto { configured: true }).into_response()
}

pub async fn clear_civitai_token(State(state): State<AppState>) -> Response {
    if let Some(store) = state.civitai_token_store.as_ref() {
        store.clear().await;
    }
    ApiResponse::<()>::no_content().into_response()
}
```

(Match the exact `use` set already at the top of `settings.rs` — `State`, `Json`, `Response`, `IntoResponse`, `StatusCode`, `ApiResponse`, `AppState`, serde derives.)

- [ ] **Step 5: Mount the route** — `router.rs`, after the hf-token route:

```rust
        .route(
            "/model-store/settings/civitai-token",
            get(handlers::model_store::settings::get_civitai_token_status)
                .put(handlers::model_store::settings::set_civitai_token)
                .delete(handlers::model_store::settings::clear_civitai_token),
        )
```

- [ ] **Step 6: Construct in app.rs** — `crates/nexus-core/src/app.rs`, near the HF/orchestrator block (~L262, ~L295-309):

```rust
let civitai_token_store =
    nexus_models_store::downloads::TokenStore::new(std::env::var("CIVITAI_TOKEN").ok());
let civitai: Arc<dyn nexus_civitai::CivitaiCapability> = Arc::new(
    nexus_civitai::CivitaiClient::new(
        std::env::var("CIVITAI_TOKEN").ok(),
    ),
);
```

Pass `civitai_token_store.clone()` as the new `DownloadOrchestrator::new(..)` argument (added in Task 5), and add to the `AppState { .. }` literal:

```rust
    civitai: Some(civitai),
    civitai_token_store: Some(civitai_token_store),
```

Add `nexus-civitai` to `crates/nexus-core/Cargo.toml` `[dependencies]`:

```toml
nexus-civitai = { path = "../nexus-civitai" }
```

- [ ] **Step 7: Build the whole workspace + run**

Run: `cargo build` then `cargo test -p nexus-api -p nexus-models-store -p nexus-civitai`
Expected: clean build; all tests PASS. Fix any remaining `AppState { .. }` test-builders missing the two new fields (`civitai: None, civitai_token_store: None,`).

- [ ] **Step 8: Commit**

```bash
git add crates/
git commit -m "feat(model-store): wire CivitaiClient + civitai token settings into AppState"
```

---

## Task 8: Frontend service — source param, resolveUrl, direct download, civitai token

**Files:**
- Modify: `apps/web/src/services/model_store.ts`
- Modify: `apps/web/src/services/model_store.test.ts`

- [ ] **Step 1: Write the failing test** — add to `apps/web/src/services/model_store.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import {
  parseSearchParams,
  serializeSearchParams,
  DEFAULT_SEARCH_PARAMS,
} from "./model_store";

describe("source param", () => {
  it("defaults to huggingface and round-trips from-url", () => {
    expect(DEFAULT_SEARCH_PARAMS.source).toBe("huggingface");
    const qs = serializeSearchParams({
      ...DEFAULT_SEARCH_PARAMS,
      source: "from_url",
    });
    expect(qs.get("source")).toBe("from_url");
    const parsed = parseSearchParams(new URLSearchParams("source=from_url"));
    expect(parsed.source).toBe("from_url");
  });

  it("ignores unknown source values", () => {
    const parsed = parseSearchParams(new URLSearchParams("source=bogus"));
    expect(parsed.source).toBe("huggingface");
  });
});
```

- [ ] **Step 2: Run it (fails)**

Run: `cd apps/web && pnpm test src/services/model_store.test.ts`
Expected: FAIL — `source` missing.

- [ ] **Step 3: Add `source` to params + parse/serialize** — `model_store.ts`:

In `ParsedSearchParams` add: `source: "huggingface" | "from_url";`
In `DEFAULT_SEARCH_PARAMS` add: `source: "huggingface",`
In `parseSearchParams`, before the return:

```typescript
  const sourceRaw = qs.get("source") ?? "huggingface";
  const source: ParsedSearchParams["source"] =
    sourceRaw === "from_url" ? "from_url" : "huggingface";
```

…and include `source` in the returned object.
In `serializeSearchParams`, add: `if (p.source !== "huggingface") qs.set("source", p.source);`

- [ ] **Step 4: Add `resolveUrl` + `direct` download body + civitai-token fetchers** — `model_store.ts`:

```typescript
export function resolveUrl(
  url: string,
  signal?: AbortSignal,
): Promise<ModelFamily> {
  return apiFetch("/model-store/resolve-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
    signal,
  });
}

export interface DirectDownloadTarget {
  source_provider: string;
  source_repo: string;
  artifact_id: string;
  filename: string;
  role: DependencyRole;
  download_url: string;
  sha256: string | null;
  size_bytes: number | null;
}

export function createDirectDownload(
  familyId: string,
  direct: DirectDownloadTarget,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch("/model-store/downloads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ family_id: familyId, direct }),
    signal,
  });
}

export interface TokenStatus {
  configured: boolean;
}

export function fetchCivitaiTokenStatus(
  signal?: AbortSignal,
): Promise<TokenStatus> {
  return apiFetch("/model-store/settings/civitai-token", { signal });
}

export function setCivitaiToken(
  token: string,
  signal?: AbortSignal,
): Promise<TokenStatus> {
  return apiFetch("/model-store/settings/civitai-token", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
    signal,
  });
}
```

Add a helper to derive a `DirectDownloadTarget` from a resolved family's primary artifact:

```typescript
export function directTargetFromFamily(
  family: ModelFamily,
): DirectDownloadTarget | null {
  const primary =
    family.artifacts.find((a) => a.role === "primary") ?? family.artifacts[0];
  if (!primary) return null;
  return {
    source_provider: family.repository.source_provider,
    source_repo: family.repository.repo_id,
    artifact_id: primary.artifact_id,
    filename: primary.filename,
    role: primary.role,
    download_url: primary.download_url,
    sha256: primary.sha256,
    size_bytes: primary.size_bytes,
  };
}
```

- [ ] **Step 5: Run the tests**

Run: `cd apps/web && pnpm test src/services/model_store.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/services/
git commit -m "feat(web/model-store): source param, resolveUrl, direct download, civitai token"
```

---

## Task 9: Slim FilterBar + Source dropdown + URL panel

**Files:**
- Modify: `apps/web/src/views/models-search/components/FilterBar.tsx`
- Create: `apps/web/src/views/models-search/components/__tests__/FilterBar.test.tsx`
- Modify: `apps/web/src/views/models-search/models_search.css.ts` (add a `.sourceSelect` style)

- [ ] **Step 1: Write the failing test** — `apps/web/src/views/models-search/components/__tests__/FilterBar.test.tsx`:

```typescript
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { FilterBar } from "../FilterBar";
import {
  DEFAULT_SEARCH_PARAMS,
  type ParsedSearchParams,
} from "../../../../services/model_store";

afterEach(() => cleanup());

const noop = vi.fn();

function renderBar(params: Partial<ParsedSearchParams> = {}) {
  const merged = { ...DEFAULT_SEARCH_PARAMS, ...params };
  return render(
    <FilterBar
      query=""
      params={merged}
      onQueryChange={noop}
      onSourceChange={noop}
      onCycleInstalled={noop}
      onClearAll={noop}
      onResolveUrl={noop}
      resolving={false}
      degraded={false}
    />,
  );
}

describe("FilterBar (slim)", () => {
  it("renders the source selector and no format/modality chips", () => {
    renderBar();
    expect(screen.getByLabelText(/source/i)).toBeInTheDocument();
    expect(screen.queryByText(/safetensors/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Modality")).not.toBeInTheDocument();
  });

  it("shows the URL paste field in from_url mode", () => {
    renderBar({ source: "from_url" });
    expect(screen.getByPlaceholderText(/paste/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resolve/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it (fails)**

Run: `cd apps/web && pnpm test src/views/models-search/components/__tests__/FilterBar.test.tsx`
Expected: FAIL — current FilterBar props differ (no `onSourceChange`/`onResolveUrl`).

- [ ] **Step 3: Rewrite FilterBar** — replace `FilterBar.tsx` with the slimmed version:

```typescript
import { useState } from "react";
import type { ParsedSearchParams } from "../../../services/model_store";
import * as s from "../models_search.css";

interface FilterBarProps {
  query: string;
  params: ParsedSearchParams;
  onQueryChange: (q: string) => void;
  onSourceChange: (source: ParsedSearchParams["source"]) => void;
  onCycleInstalled: () => void;
  onClearAll: () => void;
  onResolveUrl: (url: string) => void;
  resolving: boolean;
  degraded: boolean;
}

export function FilterBar({
  query,
  params,
  onQueryChange,
  onSourceChange,
  onCycleInstalled,
  onClearAll,
  onResolveUrl,
  resolving,
  degraded,
}: FilterBarProps) {
  const [url, setUrl] = useState("");
  const isUrl = params.source === "from_url";
  const hasActive =
    params.installed !== "any" || params.q.trim().length > 0;

  return (
    <div className={s.filterBar} role="search" aria-label="Model filters">
      <div className={s.filterRow}>
        <label className={s.screenReaderOnly} htmlFor="models-source">
          Source
        </label>
        <select
          id="models-source"
          className={s.sourceSelect}
          value={params.source}
          onChange={(e) =>
            onSourceChange(e.target.value as ParsedSearchParams["source"])
          }
          aria-label="Source"
        >
          <option value="huggingface">Hugging Face</option>
          <option value="from_url">From URL</option>
        </select>

        {!isUrl && (
          <>
            <label className={s.screenReaderOnly} htmlFor="models-search-q">
              Search models
            </label>
            <input
              id="models-search-q"
              type="text"
              className={s.queryInput}
              placeholder="search neural registry..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            <button
              type="button"
              className={
                params.installed !== "any"
                  ? `${s.chip} ${s.chipActive}`
                  : s.chip
              }
              aria-pressed={params.installed !== "any"}
              onClick={onCycleInstalled}
            >
              {params.installed === "not_installed"
                ? "Not downloaded"
                : "Downloaded"}
            </button>
            {hasActive && (
              <button
                type="button"
                className={s.chip}
                onClick={onClearAll}
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            )}
          </>
        )}

        {isUrl && (
          <>
            <label className={s.screenReaderOnly} htmlFor="models-url">
              Model URL
            </label>
            <input
              id="models-url"
              type="text"
              className={s.queryInput}
              placeholder="paste a Hugging Face file URL, a civitai.com link, or a direct .gguf/.safetensors URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && url.trim()) onResolveUrl(url.trim());
              }}
            />
            <button
              type="button"
              className={`${s.chip} ${s.chipActive}`}
              disabled={resolving || url.trim().length === 0}
              onClick={() => onResolveUrl(url.trim())}
            >
              {resolving ? "Resolving…" : "Resolve"}
            </button>
          </>
        )}
      </div>

      {degraded && !isUrl && (
        <div className={s.bannerDegraded} role="status">
          <span className="material-symbols-outlined" aria-hidden="true">
            warning
          </span>
          Backend registry unavailable — basic filtering in effect.
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Add the `.sourceSelect` style** — append to `models_search.css.ts`:

```typescript
export const sourceSelect = style([
  chip,
  {
    cursor: "pointer",
    paddingRight: "1.5rem",
  },
]);
```

(`chip` is already defined in this file; reuse it for visual consistency.)

- [ ] **Step 5: Run the tests**

Run: `cd apps/web && pnpm test src/views/models-search/components/__tests__/FilterBar.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/views/models-search/components/FilterBar.tsx apps/web/src/views/models-search/components/__tests__/FilterBar.test.tsx apps/web/src/views/models-search/models_search.css.ts
git commit -m "feat(web/foundry): slim FilterBar to Source/Search/Downloaded + URL mode"
```

---

## Task 10: Controller + UI wiring (source state, resolve flow, single card)

**Files:**
- Modify: `apps/web/src/views/models-search/models_search.ui.tsx`
- Modify: `apps/web/src/views/models-search/models_search.view.tsx`

> Context: `models_search.ui.tsx` currently passes 8 toggle props to `FilterBar` and renders the grid + SortMenu + Paginator. We remove the toggle props, pass the new FilterBar props, and in `from_url` mode render a single resolved `ModelCard` (or empty/error state) with no SortMenu/Paginator. `models_search.view.tsx` owns the source + resolve state.

- [ ] **Step 1: Update `ModelsSearchUIProps` + FilterBar usage** — in `models_search.ui.tsx`:

Remove from the props interface: `onToggleFormat`, `onToggleBackend`, `onToggleModality`, `onToggleCompat`, `onToggleShowUnsupported`, `onRepoChange`, `repo`, `backends` (if only used by FilterBar). Add:

```typescript
  resolved: ModelFamily | null;
  resolveError: { message: string } | null;
  resolving: boolean;
  onSourceChange: (source: ParsedSearchParams["source"]) => void;
  onResolveUrl: (url: string) => void;
```

Replace the `<FilterBar .../>` element with:

```tsx
      <FilterBar
        query={query}
        params={params}
        onQueryChange={onQueryChange}
        onSourceChange={onSourceChange}
        onCycleInstalled={onCycleInstalled}
        onClearAll={onClearAll}
        onResolveUrl={onResolveUrl}
        resolving={resolving}
        degraded={degraded}
      />
```

- [ ] **Step 2: Branch the results region for `from_url`** — in `models_search.ui.tsx`, wrap the SortMenu row + grid + Paginator so they only render when `params.source !== "from_url"`. For `from_url`, render:

```tsx
      {params.source === "from_url" && (
        <div className={gridCls}>
          {resolveError && (
            <ErrorState
              error={{ message: resolveError.message }}
              onRetry={onRetry}
            />
          )}
          {!resolveError && resolving && <SkeletonGrid />}
          {!resolveError && !resolving && resolved && (
            <ModelCard
              key={resolved.family_id}
              family={resolved}
              jobStateByVariant={jobStateByVariant}
              jobIdByVariant={jobIdByVariant}
              jobByVariant={jobByVariant}
              jobStateByFamily={jobStateByFamily}
              jobIdByFamily={jobIdByFamily}
              jobByFamily={jobByFamily}
              jobStateByArtifact={jobStateByArtifact}
              jobIdByArtifact={jobIdByArtifact}
              jobByArtifact={jobByArtifact}
              identity={identityByFamily[resolved.family_id]}
              onDownload={onDownload}
              onPause={onPause}
              onResume={onResume}
              onAuthRequired={onAuthRequired}
            />
          )}
        </div>
      )}
```

- [ ] **Step 3: Update the controller** — in `models_search.view.tsx`:

Add state:

```typescript
  const [resolved, setResolved] = useState<ModelFamily | null>(null);
  const [resolving, setResolving] = useState(false);
  const [resolveError, setResolveError] = useState<{ message: string } | null>(
    null,
  );
```

Add handlers (inside the `handlers` useMemo or as callbacks):

```typescript
  const onSourceChange = (source: ParsedSearchParams["source"]) => {
    setResolved(null);
    setResolveError(null);
    mutateParams({ source, page: 1 });
  };

  const onResolveUrl = async (url: string) => {
    setResolving(true);
    setResolveError(null);
    setResolved(null);
    try {
      const family = await resolveUrl(url);
      setResolved(family);
    } catch (e) {
      setResolveError({
        message: e instanceof Error ? e.message : "could not resolve URL",
      });
    } finally {
      setResolving(false);
    }
  };
```

Update `startDownload` so a resolved (non-HF) family uses the direct path. At the top of the existing download handler:

```typescript
    if (family.repository.source_provider !== "huggingface") {
      const direct = directTargetFromFamily(family);
      if (!direct) return;
      const job = await createDirectDownload(family.family_id, direct);
      // reuse existing job-tracking state updates (mirror the HF branch):
      setActiveJobs((m) => ({ ...m, [job.job_id]: job }));
      // map the job to its variant/artifact key exactly as the HF path does
      return;
    }
```

Remove the now-unused toggle handlers (`onToggleFormat`, `onToggleBackend`, `onToggleModality`, `onToggleCompat`, `onToggleShowUnsupported`, `onRepoChange`) and the `repoFilter` state + its debounce effect. Pass the new props (`resolved`, `resolving`, `resolveError`, `onSourceChange`, `onResolveUrl`) into `ModelsSearchUI`.

Add imports at the top of `models_search.view.tsx`:

```typescript
import {
  resolveUrl,
  createDirectDownload,
  directTargetFromFamily,
} from "../../services/model_store";
```

- [ ] **Step 4: Type-check + run the full web test suite**

Run: `cd apps/web && pnpm test`
Then: `cd apps/web && pnpm exec tsc --noEmit -p tsconfig.json` (or `pnpm build` if tsc is wired there)
Expected: all vitest green; no TS errors. Fix prop mismatches surfaced by tsc (e.g. `models_search.ui.tsx` still referencing removed props).

- [ ] **Step 5: Manual smoke (optional, if a dev server is available)**

Switch Source → From URL, paste a `.gguf` URL → Resolve → one card → Download starts. Paste a `civitai.com/models/...` link → resolves to a card.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/views/models-search/
git commit -m "feat(web/foundry): source-aware controller with URL resolve + single card"
```

---

## Task 11: Final review

- [ ] **Step 1: Full build + test**

Run:
```bash
cargo build
cargo test -p nexus-civitai -p nexus-models-store -p nexus-api
cd apps/web && pnpm test && pnpm exec tsc --noEmit
```
Expected: all green.

- [ ] **Step 2: Boundary grep** — confirm no extension-id literals leaked into host code:

Run: `grep -rn "local-llm\|local_llm" crates/nexus-civitai crates/nexus-api/src/handlers/model_store/resolve.rs apps/web/src/views/models-search/ --exclude-dir=node_modules || echo "clean"`
Expected: `clean`.

- [ ] **Step 3: Security re-check** — confirm the HF token is host-scoped:

Run: `grep -n "bearer_auth\|token_for_url" crates/nexus-models-store/src/downloads/orchestrator.rs`
Expected: the only `bearer_auth` call is guarded by `token_for_url`.

- [ ] **Step 4: Dispatch the final code reviewer** (subagent-driven-development final step), then use superpowers:finishing-a-development-branch.

---

## Self-Review (against spec)

**Spec coverage:**
- Direct URL install → Tasks 4 (resolve), 6 (direct download), trust-on-download already present (Task 5 doc).
- Civitai paste-link → Tasks 2/3 (crate), 4 (handler branch), 7 (wiring + token).
- Slim filter bar → Tasks 8/9 (params + FilterBar), 10 (UI drop of removed props).
- Source dropdown HF | From URL → Task 9.
- Secrets (civitai token, host-scoped HF token) → Tasks 5, 7, 8.
- Compat unknown not hidden → resolved families bypass `search` filters (returned by `resolve-url`); compat set to `DownloadableButNotRunnable`.
- Boundary clean, host-only → Task 11 grep.

**Placeholder scan:** the only soft spots are deliberate "match the existing X" notes (job→DTO mapper name in Task 6; HF job-tracking state updates in Task 10) because those names must be read from the current `downloads.rs`/controller at implement time — each names exactly what to mirror and where. No `TODO`/`TBD`.

**Type consistency:** `source` value is `"from_url"` everywhere (TS param, FilterBar, controller). `SourceProvider` adds `civitai`/`direct_url` in both Rust and TS. `JobTargetInput.sha256` is `Option<String>` (Rust) / `string | null` (TS). `CreateJobParams::builder(family_id, source_provider, source_repo, RequestedKind)` arg order matches downloads.rs. `token_for_url` signature identical in test and impl.
