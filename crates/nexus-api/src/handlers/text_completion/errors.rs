use axum::http::StatusCode;
use serde::Serialize;

#[derive(Debug, Clone, thiserror::Error)]
pub enum TextCompletionError {
    #[error("no eligible text-completion lease")]
    NoEligibleBackend,
    #[error("lease acquisition failed: {0}")]
    LeaseAcquisitionFailed(String),
    #[error("lease revoked mid-stream: {0}")]
    LeaseRevoked(String),
    #[error("model unavailable: {0}")]
    ModelUnavailable(String),
    #[error("prompt too long: {0}")]
    PromptTooLong(String),
    #[error("request timed out after {0} ms")]
    Timeout(u32),
    #[error("validation error: {0}")]
    Validation(String),
    #[error("internal error: {0}")]
    Internal(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ErrorCode {
    NoEligibleBackend,
    LeaseRevoked,
    ModelUnavailable,
    PromptTooLong,
    Timeout,
    ValidationError,
    Internal,
}

impl ErrorCode {
    pub fn as_wire_str(&self) -> &'static str {
        match self {
            Self::NoEligibleBackend => "no_eligible_backend",
            Self::LeaseRevoked => "lease_revoked",
            Self::ModelUnavailable => "model_unavailable",
            Self::PromptTooLong => "prompt_too_long",
            Self::Timeout => "timeout",
            Self::ValidationError => "validation_error",
            Self::Internal => "internal",
        }
    }
}

impl TextCompletionError {
    pub fn code(&self) -> ErrorCode {
        match self {
            Self::NoEligibleBackend | Self::LeaseAcquisitionFailed(_) => {
                ErrorCode::NoEligibleBackend
            }
            Self::LeaseRevoked(_) => ErrorCode::LeaseRevoked,
            Self::ModelUnavailable(_) => ErrorCode::ModelUnavailable,
            Self::PromptTooLong(_) => ErrorCode::PromptTooLong,
            Self::Timeout(_) => ErrorCode::Timeout,
            Self::Validation(_) => ErrorCode::ValidationError,
            Self::Internal(_) => ErrorCode::Internal,
        }
    }

    pub fn ui_message(&self) -> String {
        match self {
            Self::NoEligibleBackend => {
                "No text-completion backend is available. Validate a runtime with the \
                 text-completion capability."
                    .to_string()
            }
            Self::LeaseAcquisitionFailed(_) => {
                "Could not acquire a text-completion backend. Try again shortly.".to_string()
            }
            Self::LeaseRevoked(_) => {
                "The text-completion backend was released mid-stream.".to_string()
            }
            Self::ModelUnavailable(_) => "The model is unavailable.".to_string(),
            Self::PromptTooLong(_) => "Prompt exceeds the model's context window.".to_string(),
            Self::Timeout(ms) => format!("Request exceeded the {ms} ms timeout."),
            Self::Validation(msg) => msg.clone(),
            Self::Internal(_) => "An internal error occurred.".to_string(),
        }
    }
}

pub fn status_code(err: &TextCompletionError) -> StatusCode {
    match err {
        TextCompletionError::NoEligibleBackend | TextCompletionError::LeaseAcquisitionFailed(_) => {
            StatusCode::SERVICE_UNAVAILABLE
        }
        TextCompletionError::LeaseRevoked(_) | TextCompletionError::ModelUnavailable(_) => {
            StatusCode::BAD_GATEWAY
        }
        TextCompletionError::Timeout(_) => StatusCode::GATEWAY_TIMEOUT,
        TextCompletionError::PromptTooLong(_) | TextCompletionError::Validation(_) => {
            StatusCode::BAD_REQUEST
        }
        TextCompletionError::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn no_eligible_backend_maps_to_503() {
        assert_eq!(
            status_code(&TextCompletionError::NoEligibleBackend),
            StatusCode::SERVICE_UNAVAILABLE
        );
    }

    #[test]
    fn timeout_maps_to_504() {
        assert_eq!(
            status_code(&TextCompletionError::Timeout(15000)),
            StatusCode::GATEWAY_TIMEOUT
        );
    }

    #[test]
    fn model_unavailable_maps_to_502() {
        assert_eq!(
            status_code(&TextCompletionError::ModelUnavailable("not loaded".into())),
            StatusCode::BAD_GATEWAY
        );
    }

    #[test]
    fn lease_revoked_maps_to_502() {
        assert_eq!(
            status_code(&TextCompletionError::LeaseRevoked("gone".into())),
            StatusCode::BAD_GATEWAY
        );
    }

    #[test]
    fn prompt_too_long_maps_to_400() {
        assert_eq!(
            status_code(&TextCompletionError::PromptTooLong("over".into())),
            StatusCode::BAD_REQUEST
        );
    }

    #[test]
    fn validation_maps_to_400() {
        assert_eq!(
            status_code(&TextCompletionError::Validation("bad".into())),
            StatusCode::BAD_REQUEST
        );
    }

    #[test]
    fn internal_maps_to_500() {
        assert_eq!(
            status_code(&TextCompletionError::Internal("oops".into())),
            StatusCode::INTERNAL_SERVER_ERROR
        );
    }

    #[test]
    fn ui_message_for_internal_does_not_leak_inner_text() {
        let err = TextCompletionError::Internal("stack frame leak".into());
        assert!(!err.ui_message().contains("stack"));
    }

    #[test]
    fn error_code_wire_strings_are_stable() {
        assert_eq!(ErrorCode::NoEligibleBackend.as_wire_str(), "no_eligible_backend");
        assert_eq!(ErrorCode::LeaseRevoked.as_wire_str(), "lease_revoked");
        assert_eq!(ErrorCode::ModelUnavailable.as_wire_str(), "model_unavailable");
        assert_eq!(ErrorCode::PromptTooLong.as_wire_str(), "prompt_too_long");
        assert_eq!(ErrorCode::Timeout.as_wire_str(), "timeout");
        assert_eq!(ErrorCode::ValidationError.as_wire_str(), "validation_error");
        assert_eq!(ErrorCode::Internal.as_wire_str(), "internal");
    }
}
