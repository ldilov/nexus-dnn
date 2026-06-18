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
