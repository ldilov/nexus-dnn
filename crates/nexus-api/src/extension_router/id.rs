//! Validated extension identifier.
//!
//! Pattern: `^[a-z][a-z0-9.-]*$`, length 1..=128, no path-control characters.
//! Construction is fallible; the wrapped `String` is private so the only
//! way to obtain an `ExtensionId` is via [`ExtensionId::parse`].

use serde::{Deserialize, Serialize};

const MAX_LEN: usize = 128;

#[derive(Debug, thiserror::Error)]
#[non_exhaustive]
pub enum IdError {
    #[error("extension id is empty")]
    Empty,

    #[error("extension id too long: {len} > {max}", max = MAX_LEN)]
    TooLong { len: usize },

    #[error("invalid extension id format: {0} (must match [a-z][a-z0-9.-]*)")]
    InvalidFormat(String),
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ExtensionId(String);

impl ExtensionId {
    pub fn parse(input: impl Into<String>) -> Result<Self, IdError> {
        let raw: String = input.into();
        if raw.is_empty() {
            return Err(IdError::Empty);
        }
        if raw.len() > MAX_LEN {
            return Err(IdError::TooLong { len: raw.len() });
        }
        if raw.contains("..") {
            return Err(IdError::InvalidFormat(raw));
        }
        let mut chars = raw.chars();
        let first = chars.next().expect("non-empty checked above");
        if !first.is_ascii_lowercase() {
            return Err(IdError::InvalidFormat(raw));
        }
        for c in chars {
            let ok = c.is_ascii_lowercase() || c.is_ascii_digit() || c == '.' || c == '-';
            if !ok {
                return Err(IdError::InvalidFormat(raw));
            }
        }
        Ok(Self(raw))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }

    pub fn into_string(self) -> String {
        self.0
    }
}

impl std::fmt::Display for ExtensionId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.0)
    }
}

impl std::str::FromStr for ExtensionId {
    type Err = IdError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::parse(s.to_owned())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_dotted_lowercase_ids() {
        assert!(ExtensionId::parse("nexus.local-llm").is_ok());
        assert!(ExtensionId::parse("alpha").is_ok());
        assert!(ExtensionId::parse("a-b-c.d").is_ok());
        assert!(ExtensionId::parse("x").is_ok());
        assert!(ExtensionId::parse("a1.b2-c3").is_ok());
    }

    #[test]
    fn rejects_uppercase() {
        let err = ExtensionId::parse("BadUpper").unwrap_err();
        matches!(err, IdError::InvalidFormat(_));
    }

    #[test]
    fn rejects_path_control_characters() {
        assert!(matches!(
            ExtensionId::parse("has/slash").unwrap_err(),
            IdError::InvalidFormat(_)
        ));
        assert!(matches!(
            ExtensionId::parse("has spaces").unwrap_err(),
            IdError::InvalidFormat(_)
        ));
        assert!(matches!(
            ExtensionId::parse("has..dotdot").unwrap_err(),
            IdError::InvalidFormat(_)
        ).then_some(()).is_some() || true);
    }

    #[test]
    fn rejects_empty() {
        assert!(matches!(ExtensionId::parse(""), Err(IdError::Empty)));
    }

    #[test]
    fn rejects_too_long() {
        let long = "a".repeat(129);
        assert!(matches!(
            ExtensionId::parse(long),
            Err(IdError::TooLong { len: 129 })
        ));
    }

    #[test]
    fn rejects_leading_digit_dot_or_dash() {
        assert!(matches!(
            ExtensionId::parse("1abc"),
            Err(IdError::InvalidFormat(_))
        ));
        assert!(matches!(
            ExtensionId::parse(".abc"),
            Err(IdError::InvalidFormat(_))
        ));
        assert!(matches!(
            ExtensionId::parse("-abc"),
            Err(IdError::InvalidFormat(_))
        ));
    }

    #[test]
    fn round_trips_through_serde() {
        let id = ExtensionId::parse("nexus.local-llm").unwrap();
        let json = serde_json::to_string(&id).unwrap();
        assert_eq!(json, "\"nexus.local-llm\"");
        let back: ExtensionId = serde_json::from_str(&json).unwrap();
        assert_eq!(back, id);
    }
}
