//! JSON-RPC error-code mapping + well-known method names.
//!
//! The wire frame itself is handled by the host's lease. This module carries
//! the worker-facing vocabulary: method names, standard error codes, and the
//! mapping from lease-level errors into [`EmotionTtsError`].

use crate::domain::EmotionTtsError;
use crate::host_contract::LeaseError;

pub mod methods {
    pub const HANDSHAKE: &str = "handshake";
    pub const HEALTH: &str = "health";
    pub const SHUTDOWN: &str = "shutdown";
    pub const SETTINGS_APPLY: &str = "settings.apply";
    pub const MODEL_LOAD: &str = "model.load";
    pub const MODEL_UNLOAD: &str = "model.unload";
    pub const SYNTHESIZE: &str = "synthesize";
    pub const SYNTHESIZE_BATCH: &str = "synthesize.batch";
    pub const VOICE_PROBE: &str = "voice.probe";
    pub const CANCEL: &str = "cancel";
}

pub mod error_codes {
    pub const PARSE_ERROR: i32 = -32700;
    pub const INVALID_REQUEST: i32 = -32600;
    pub const METHOD_NOT_FOUND: i32 = -32601;
    pub const INVALID_PARAMS: i32 = -32602;
    pub const INTERNAL_ERROR: i32 = -32603;

    pub const RUNTIME_UNAVAILABLE: i32 = -33000;
    pub const MODEL_MISSING: i32 = -33001;
    pub const CANCELLED: i32 = -33002;
    pub const VALIDATION_FAILED: i32 = -33010;
    pub const SYNTHESIS_FAILED: i32 = -33020;
}

#[must_use]
pub fn lease_error_to_domain(err: LeaseError) -> EmotionTtsError {
    match err {
        LeaseError::Rpc { code, message } => match code {
            error_codes::PARSE_ERROR => {
                EmotionTtsError::internal(format!("worker framing error: {message}"))
            }
            error_codes::INVALID_REQUEST => {
                EmotionTtsError::internal(format!("malformed rpc envelope: {message}"))
            }
            error_codes::METHOD_NOT_FOUND => {
                EmotionTtsError::internal(format!("worker does not implement method: {message}"))
            }
            error_codes::INTERNAL_ERROR => EmotionTtsError::internal(message),
            error_codes::VALIDATION_FAILED | error_codes::INVALID_PARAMS => {
                EmotionTtsError::validation(message)
            }
            error_codes::RUNTIME_UNAVAILABLE => EmotionTtsError::RuntimeUnavailable(message),
            error_codes::MODEL_MISSING => EmotionTtsError::ModelMissing(message),
            error_codes::CANCELLED => EmotionTtsError::Cancelled,
            error_codes::SYNTHESIS_FAILED => EmotionTtsError::internal(format!("synthesis failed: {message}")),
            _ => EmotionTtsError::Rpc { code, message },
        },
        LeaseError::Timeout => EmotionTtsError::Timeout { op: "send_rpc".into() },
        LeaseError::Cancelled => EmotionTtsError::Cancelled,
        LeaseError::WorkerCrashed => EmotionTtsError::RuntimeUnavailable("worker crashed".into()),
        LeaseError::InvalidState { state, op } => EmotionTtsError::RuntimeUnavailable(format!(
            "lease {state:?} cannot perform {op}"
        )),
        LeaseError::Transport(msg) => EmotionTtsError::RuntimeUnavailable(format!("transport: {msg}")),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn maps_method_not_found_to_internal() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::METHOD_NOT_FOUND,
            message: "foo".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Internal(_)));
    }

    #[test]
    fn maps_validation_code() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::VALIDATION_FAILED,
            message: "bad".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Validation(_)));
    }

    #[test]
    fn maps_model_missing() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::MODEL_MISSING,
            message: "IndexTTS-2".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::ModelMissing(_)));
    }

    #[test]
    fn maps_timeout() {
        let mapped = lease_error_to_domain(LeaseError::Timeout);
        assert!(matches!(mapped, EmotionTtsError::Timeout { .. }));
    }

    #[test]
    fn unmapped_code_passes_through() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: -99999,
            message: "x".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Rpc { code: -99999, .. }));
    }

    #[test]
    fn parse_error_maps_to_internal() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::PARSE_ERROR,
            message: "bad json".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Internal(_)));
        assert_eq!(mapped.status_code(), 500);
    }

    #[test]
    fn invalid_request_maps_to_internal() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::INVALID_REQUEST,
            message: "missing jsonrpc".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Internal(_)));
    }

    #[test]
    fn synthesis_failed_maps_to_internal() {
        let mapped = lease_error_to_domain(LeaseError::Rpc {
            code: error_codes::SYNTHESIS_FAILED,
            message: "nan in mel".into(),
        });
        assert!(matches!(mapped, EmotionTtsError::Internal(_)));
    }
}
