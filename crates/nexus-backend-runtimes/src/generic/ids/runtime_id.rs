use std::fmt;

use serde::{Deserialize, Serialize};
use thiserror::Error;

/// Globally unique, extension-supplied runtime identifier.
/// Wire form matches regex `^[a-z][a-z0-9._-]{2,63}$` (spec R-12).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct RuntimeId(String);

#[derive(Debug, Error, PartialEq, Eq)]
pub enum RuntimeIdError {
    #[error("runtime_id must be 3..=64 chars; got {0}")]
    InvalidLength(usize),
    #[error("runtime_id must start with [a-z]; got `{0}`")]
    InvalidFirstChar(char),
    #[error("runtime_id contains illegal character `{0}` (allowed: [a-z0-9._-])")]
    IllegalChar(char),
}

impl RuntimeId {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl TryFrom<&str> for RuntimeId {
    type Error = RuntimeIdError;

    fn try_from(raw: &str) -> Result<Self, Self::Error> {
        let len = raw.len();
        if !(3..=64).contains(&len) {
            return Err(RuntimeIdError::InvalidLength(len));
        }
        let mut chars = raw.chars();
        let first = chars.next().ok_or(RuntimeIdError::InvalidLength(0))?;
        if !first.is_ascii_lowercase() {
            return Err(RuntimeIdError::InvalidFirstChar(first));
        }
        for c in raw.chars() {
            let ok =
                c.is_ascii_lowercase() || c.is_ascii_digit() || c == '.' || c == '_' || c == '-';
            if !ok {
                return Err(RuntimeIdError::IllegalChar(c));
            }
        }
        Ok(Self(raw.to_string()))
    }
}

impl TryFrom<String> for RuntimeId {
    type Error = RuntimeIdError;

    fn try_from(raw: String) -> Result<Self, Self::Error> {
        Self::try_from(raw.as_str())
    }
}

impl fmt::Display for RuntimeId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_valid_ids() {
        for good in [
            "test.echo",
            "indextts.python",
            "whisper-cpp",
            "rag_v2",
            "abc",
        ] {
            RuntimeId::try_from(good).unwrap_or_else(|e| panic!("{good} rejected: {e}"));
        }
    }

    #[test]
    fn rejects_short_and_long() {
        assert!(matches!(
            RuntimeId::try_from("ab"),
            Err(RuntimeIdError::InvalidLength(2))
        ));
        let long: String = "a".repeat(65);
        assert!(matches!(
            RuntimeId::try_from(long.as_str()),
            Err(RuntimeIdError::InvalidLength(65))
        ));
    }

    #[test]
    fn rejects_bad_first_char() {
        assert!(matches!(
            RuntimeId::try_from("1abc"),
            Err(RuntimeIdError::InvalidFirstChar('1'))
        ));
        assert!(matches!(
            RuntimeId::try_from(".abc"),
            Err(RuntimeIdError::InvalidFirstChar('.'))
        ));
        assert!(matches!(
            RuntimeId::try_from("Abc"),
            Err(RuntimeIdError::InvalidFirstChar('A'))
        ));
    }

    #[test]
    fn rejects_illegal_chars() {
        assert!(matches!(
            RuntimeId::try_from("test/slash"),
            Err(RuntimeIdError::IllegalChar('/'))
        ));
        assert!(matches!(
            RuntimeId::try_from("test space"),
            Err(RuntimeIdError::IllegalChar(' '))
        ));
    }

    #[test]
    fn serde_is_transparent() {
        let id = RuntimeId::try_from("test.echo").unwrap();
        let v = serde_json::to_value(&id).unwrap();
        assert_eq!(v, serde_json::json!("test.echo"));
        let back: RuntimeId = serde_json::from_value(v).unwrap();
        assert_eq!(back, id);
    }
}
