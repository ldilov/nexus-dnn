//! Typed IPC error envelope.
//!
//! Every `#[tauri::command]` defined in [`crate::ipc`] returns
//! `Result<T, IpcError>`. The error serialises to the wire shape mandated by
//! [`contracts/ipc-commands.md`](../../specs/042-neo-terminal-shell/contracts/ipc-commands.md):
//!
//! ```json
//! { "code": "validation", "message": "...", "retriable": false }
//! ```
//!
//! `serde::Serialize` is implemented manually so the JSON shape stays stable
//! independently of the internal [`thiserror`] enum layout.

use serde::Serialize;

/// Convenience alias for command return types.
pub type IpcResult<T> = Result<T, IpcError>;

/// Stable error code strings used on the wire.
///
/// Adding a new variant requires a contract update — frontend adapters match
/// on the `code` field.
#[derive(Debug, thiserror::Error)]
pub enum IpcError {
    /// Input validation failed (mis-shape, out-of-range, missing required field).
    #[error("validation: {0}")]
    Validation(String),

    /// The frontend sent a `schema` value the host does not recognise.
    #[error("schema_mismatch: {0}")]
    SchemaMismatch(String),

    /// A run id passed by the frontend does not exist in the host.
    #[error("run_not_found: {0}")]
    RunNotFound(String),

    /// A deployment id passed by the frontend does not exist in the host.
    #[error("deployment_not_found: {0}")]
    DeploymentNotFound(String),

    /// A `RuntimeTuning` patch failed validation against the spec-039 surface.
    #[error("tuning_validation_failed: {0}")]
    TuningValidationFailed(String),

    /// A 4-character mnemonic was not in the required A–Z set.
    #[error("mnemonic_invalid: {0}")]
    MnemonicInvalid(String),

    /// A 4-character mnemonic was already registered to a different Block.
    #[error("mnemonic_conflict: existing={0}")]
    MnemonicConflict(String),

    /// The command surface is registered but not yet wired (Phase 2 stub state).
    #[error("not_implemented: {0}")]
    NotImplemented(String),

    /// Catch-all for unexpected internal errors.
    #[error("internal: {0}")]
    Internal(String),
}

impl IpcError {
    /// Convenience constructor for the Phase 2 stub state.
    pub fn not_implemented(command_name: impl Into<String>) -> Self {
        Self::NotImplemented(command_name.into())
    }

    /// Stable wire-format code string.
    pub fn code(&self) -> &'static str {
        match self {
            Self::Validation(_) => "validation",
            Self::SchemaMismatch(_) => "schema_mismatch",
            Self::RunNotFound(_) => "run_not_found",
            Self::DeploymentNotFound(_) => "deployment_not_found",
            Self::TuningValidationFailed(_) => "tuning_validation_failed",
            Self::MnemonicInvalid(_) => "mnemonic_invalid",
            Self::MnemonicConflict(_) => "mnemonic_conflict",
            Self::NotImplemented(_) => "not_implemented",
            Self::Internal(_) => "internal",
        }
    }

    /// Whether the frontend should retry the same call after a backoff.
    pub fn retriable(&self) -> bool {
        matches!(self, Self::Internal(_))
    }

    fn message(&self) -> String {
        match self {
            Self::Validation(m)
            | Self::SchemaMismatch(m)
            | Self::RunNotFound(m)
            | Self::DeploymentNotFound(m)
            | Self::TuningValidationFailed(m)
            | Self::MnemonicInvalid(m)
            | Self::MnemonicConflict(m)
            | Self::NotImplemented(m)
            | Self::Internal(m) => m.clone(),
        }
    }
}

impl Serialize for IpcError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use serde::ser::SerializeStruct;
        let mut s = serializer.serialize_struct("IpcError", 3)?;
        s.serialize_field("code", self.code())?;
        s.serialize_field("message", &self.message())?;
        s.serialize_field("retriable", &self.retriable())?;
        s.end()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn serialises_to_wire_envelope() {
        let err = IpcError::not_implemented("cmd_window_show");
        let json = serde_json::to_value(&err).expect("serialise");
        assert_eq!(json["code"], "not_implemented");
        assert_eq!(json["message"], "cmd_window_show");
        assert_eq!(json["retriable"], false);
    }

    #[test]
    fn internal_is_retriable() {
        let err = IpcError::Internal("transient".into());
        assert!(err.retriable());
    }

    #[test]
    fn validation_is_not_retriable() {
        let err = IpcError::Validation("bad input".into());
        assert!(!err.retriable());
    }
}
