//! Typed errors for the Draft AI suggestion stream handler family.
//! `ErrorCode` strings are wire-stable: they appear in HTTP-503
//! `NoBackendError.code` payloads and in SSE `error.code` fields per
//! `contracts/draft_suggestions.openapi.yaml` and
//! `contracts/draft_suggestions.events.md`.

use serde::Serialize;

#[derive(Debug, Clone, thiserror::Error)]
pub enum DraftSuggestionError {
    #[error("no backend leasable for draft suggestions")]
    NoEligibleBackend,
    #[error("lease acquisition failed: {0}")]
    LeaseAcquisitionFailed(String),
    #[error("lease revoked mid-stream: {0}")]
    LeaseRevoked(String),
    #[error("model unavailable: {0}")]
    ModelUnavailable(String),
    #[error("prompt too long: {0}")]
    PromptTooLong(String),
    /// Callers MUST pass operator-safe text — `ui_message` echoes this
    /// payload verbatim to the client. Never include raw upstream text,
    /// stack frames, or internal paths.
    #[error("validation error: {0}")]
    Validation(String),
    #[error("internal error: {0}")]
    Internal(String),
}

impl DraftSuggestionError {
    pub fn code(&self) -> ErrorCode {
        match self {
            Self::NoEligibleBackend => ErrorCode::NoBackendLeasable,
            Self::LeaseAcquisitionFailed(_) => ErrorCode::NoBackendLeasable,
            Self::LeaseRevoked(_) => ErrorCode::LeaseRevoked,
            Self::ModelUnavailable(_) => ErrorCode::ModelUnavailable,
            Self::PromptTooLong(_) => ErrorCode::PromptTooLong,
            Self::Validation(_) => ErrorCode::ValidationError,
            Self::Internal(_) => ErrorCode::Internal,
        }
    }

    /// User-safe message — never surfaces internal stack frames.
    pub fn ui_message(&self) -> String {
        match self {
            Self::NoEligibleBackend => {
                "No AI backend is currently configured. Open Backends to add one.".to_string()
            }
            Self::LeaseAcquisitionFailed(_) => {
                "Could not acquire an inference backend right now. Try again in a moment."
                    .to_string()
            }
            Self::LeaseRevoked(_) => "The inference backend was released mid-stream.".to_string(),
            Self::ModelUnavailable(_) => {
                "The model is unavailable. Pick a different model.".to_string()
            }
            Self::PromptTooLong(_) => {
                "The current draft exceeds the model's prompt limit.".to_string()
            }
            Self::Validation(msg) => msg.clone(),
            Self::Internal(_) => {
                "An internal error occurred while generating the suggestion.".to_string()
            }
        }
    }

    pub fn retryable(&self) -> bool {
        matches!(
            self,
            Self::LeaseAcquisitionFailed(_) | Self::LeaseRevoked(_) | Self::Internal(_)
        )
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ErrorCode {
    NoBackendLeasable,
    LeaseRevoked,
    ModelUnavailable,
    PromptTooLong,
    ValidationError,
    Internal,
}

impl ErrorCode {
    pub fn as_wire_str(&self) -> &'static str {
        match self {
            Self::NoBackendLeasable => "no_backend_leasable",
            Self::LeaseRevoked => "lease_revoked",
            Self::ModelUnavailable => "model_unavailable",
            Self::PromptTooLong => "prompt_too_long",
            Self::ValidationError => "validation_error",
            Self::Internal => "internal",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn error_codes_match_contract_strings() {
        assert_eq!(
            ErrorCode::NoBackendLeasable.as_wire_str(),
            "no_backend_leasable"
        );
        assert_eq!(ErrorCode::LeaseRevoked.as_wire_str(), "lease_revoked");
        assert_eq!(
            ErrorCode::ModelUnavailable.as_wire_str(),
            "model_unavailable"
        );
        assert_eq!(ErrorCode::PromptTooLong.as_wire_str(), "prompt_too_long");
        assert_eq!(ErrorCode::ValidationError.as_wire_str(), "validation_error");
        assert_eq!(ErrorCode::Internal.as_wire_str(), "internal");
    }

    #[test]
    fn no_eligible_backend_serializes_as_no_backend_leasable() {
        let err = DraftSuggestionError::NoEligibleBackend;
        assert_eq!(err.code(), ErrorCode::NoBackendLeasable);
    }

    #[test]
    fn lease_acquisition_failure_is_retryable() {
        let err = DraftSuggestionError::LeaseAcquisitionFailed("conn reset".into());
        assert!(err.retryable());
    }

    #[test]
    fn validation_error_is_not_retryable() {
        let err = DraftSuggestionError::Validation("cursor_line < 1".into());
        assert!(!err.retryable());
    }

    #[test]
    fn ui_message_does_not_leak_internal_text() {
        let err = DraftSuggestionError::Internal("stack frame: blah blah".into());
        assert!(!err.ui_message().contains("stack frame"));
    }
}
