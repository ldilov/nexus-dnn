use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use serde::Serialize;

use super::chat::SamplingParams;

#[derive(Debug, Clone, Serialize)]
pub struct SamplerCall {
    pub sampling: SamplingParams,
    pub system_prompt: Option<String>,
    pub user_content: String,
    pub model_path: PathBuf,
}

#[derive(Debug, Clone)]
pub struct InferenceRequest {
    pub sampling: SamplingParams,
    pub system_prompt: Option<String>,
    pub user_content: String,
    pub model_path: PathBuf,
}

#[derive(Debug, Clone, Serialize)]
pub struct InferenceResponse {
    pub content: String,
}

#[derive(Debug, thiserror::Error)]
pub enum InferenceError {
    #[error("model unavailable: {0}")]
    ModelUnavailable(String),
    #[error("backend failure: {0}")]
    Backend(String),
}

pub trait InferenceBackend: Send + Sync {
    fn generate<'a>(
        &'a self,
        req: InferenceRequest,
    ) -> std::pin::Pin<
        Box<
            dyn std::future::Future<Output = Result<InferenceResponse, InferenceError>>
                + Send
                + 'a,
        >,
    >;
}

pub struct StubInferenceBackend;

impl InferenceBackend for StubInferenceBackend {
    fn generate<'a>(
        &'a self,
        _req: InferenceRequest,
    ) -> std::pin::Pin<
        Box<
            dyn std::future::Future<Output = Result<InferenceResponse, InferenceError>>
                + Send
                + 'a,
        >,
    > {
        Box::pin(async {
            Ok(InferenceResponse {
                content: "hello".to_string(),
            })
        })
    }
}

#[derive(Clone, Default)]
pub struct RecordingInferenceBackend {
    calls: Arc<Mutex<Vec<SamplerCall>>>,
}

impl RecordingInferenceBackend {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn last_call(&self) -> Option<SamplerCall> {
        self.calls.lock().ok()?.last().cloned()
    }

    pub fn call_count(&self) -> usize {
        self.calls.lock().map(|g| g.len()).unwrap_or(0)
    }
}

impl InferenceBackend for RecordingInferenceBackend {
    fn generate<'a>(
        &'a self,
        req: InferenceRequest,
    ) -> std::pin::Pin<
        Box<
            dyn std::future::Future<Output = Result<InferenceResponse, InferenceError>>
                + Send
                + 'a,
        >,
    > {
        let calls = self.calls.clone();
        Box::pin(async move {
            let snapshot = SamplerCall {
                sampling: req.sampling.clone(),
                system_prompt: req.system_prompt.clone(),
                user_content: req.user_content.clone(),
                model_path: req.model_path.clone(),
            };
            if let Ok(mut guard) = calls.lock() {
                guard.push(snapshot);
            }
            Ok(InferenceResponse {
                content: "hello".to_string(),
            })
        })
    }
}
