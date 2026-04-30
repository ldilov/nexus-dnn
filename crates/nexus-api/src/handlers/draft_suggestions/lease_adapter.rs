//! Spec 037 / T078 — production `SuggestionStreamProvider` impls.
//!
//! Currently exposes only [`NullStreamProvider`] — a placeholder that
//! always returns `NoEligibleBackend`. This lets the host wire the
//! endpoint family at startup before the real lease-manager-backed
//! provider lands; operators get the documented "no AI backend
//! configured" CTA instead of a 404.
//!
//! The full lease-manager-backed adapter (lease acquisition with the
//! "≥ 2k context, supports text completion" policy + OpenAI-style
//! streaming endpoint client) lands as a follow-up to this scaffolding.

use async_trait::async_trait;

use super::errors::DraftSuggestionError;
use super::prompt_template::PromptPair;
use super::provider::{CancelFlag, StreamHandle, SuggestionStreamProvider};
use super::types::SuggestionRequest;

/// Default production provider until [`LeaseBackedStreamProvider`] (T078
/// follow-up) lands. Always reports `NoEligibleBackend` so the endpoint
/// returns 503 with the generic CTA payload defined in the OpenAPI
/// fragment.
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
