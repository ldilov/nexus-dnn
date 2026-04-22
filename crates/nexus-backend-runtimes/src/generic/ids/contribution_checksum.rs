use std::fmt;

use serde::{Deserialize, Serialize};

/// SHA-256 checksum of a canonicalised extension `backend_runtime` manifest
/// entry. Used to detect contribution drift on re-activation (data-model §2).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ContributionChecksum(String);

impl ContributionChecksum {
    /// Construct from a 64-char lowercase hex SHA-256 string.
    pub fn new(hex: impl Into<String>) -> Result<Self, &'static str> {
        let s = hex.into();
        if s.len() != 64 {
            return Err("contribution_checksum must be exactly 64 hex chars");
        }
        if !s.bytes().all(|b| matches!(b, b'0'..=b'9' | b'a'..=b'f')) {
            return Err("contribution_checksum must be lowercase hex");
        }
        Ok(Self(s))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for ContributionChecksum {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_64_hex_lowercase() {
        let s = "a".repeat(64);
        assert!(ContributionChecksum::new(&s).is_ok());
    }

    #[test]
    fn rejects_wrong_length() {
        assert!(ContributionChecksum::new("abc").is_err());
    }

    #[test]
    fn rejects_uppercase() {
        let s = "A".repeat(64);
        assert!(ContributionChecksum::new(&s).is_err());
    }

    #[test]
    fn rejects_non_hex() {
        let s = "z".repeat(64);
        assert!(ContributionChecksum::new(&s).is_err());
    }
}
