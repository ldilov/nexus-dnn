//! Production `SuggestionStreamProvider` implementations.
//!
//! Currently exposes only [`NullStreamProvider`] — always returns
//! `NoEligibleBackend` so operators see the documented "no AI backend
//! configured" CTA instead of a 404 while a real lease-manager-backed
//! adapter is still pending.

use async_trait::async_trait;

use super::errors::DraftSuggestionError;
use super::prompt_template::PromptPair;
use super::provider::{CancelFlag, StreamHandle, SuggestionStreamProvider};
use super::types::SuggestionRequest;

/// Placeholder provider that always reports `NoEligibleBackend` so the
/// endpoint returns 503 with the generic CTA payload defined in the
/// OpenAPI fragment.
pub struct NullStreamProvider;

impl NullStreamProvider {
    pub fn new() -> Self {
        Self
    }
}

impl Default for NullStreamProvider {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl SuggestionStreamProvider for NullStreamProvider {
    async fn open_stream(
        &self,
        _request: &SuggestionRequest,
        _prompt: PromptPair,
        _cancel: CancelFlag,
    ) -> Result<StreamHandle, DraftSuggestionError> {
        Err(DraftSuggestionError::NoEligibleBackend)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn null_provider_always_returns_no_eligible_backend() {
        use super::super::prompt_template::PromptPair;
        use super::super::types::{SuggestionContext, SuggestionIntent};

        let provider = NullStreamProvider::new();
        let req = SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "x".into(),
                active_line_text: "x".into(),
                preceding_lines: 0,
            },
            max_tokens: 96,
        };
        let prompt = PromptPair {
            system: "s".into(),
            user: "u".into(),
        };
        let result = provider.open_stream(&req, prompt, CancelFlag::new()).await;
        assert!(matches!(result, Err(DraftSuggestionError::NoEligibleBackend)));
    }
}
