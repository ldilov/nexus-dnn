#[derive(Debug, thiserror::Error, PartialEq)]
pub enum BindingError {
    #[error("unknown control: {0}")]
    UnknownControl(String),
    #[error("locked control cannot be overridden: {0}")]
    LockedOverride(String),
    #[error("control is not user-settable: {0}")]
    NotSettable(String),
    #[error("malformed target path: {0}")]
    BadTarget(String),
    #[error("target node not found: {0}")]
    UnknownNode(String),
    #[error("preset not found: {0}")]
    UnknownPreset(String),
    #[error("workflow validation failed: {0}")]
    Validation(String),
    #[error("input {name}: value does not match port type {expected}")]
    InputTypeMismatch { name: String, expected: String },
}
