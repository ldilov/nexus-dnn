use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum IdError {
    #[error("expected ULID (26 chars, Crockford base32), got {0:?}")]
    NotUlid(String),
    #[error("expected 64-char lowercase hex SHA-256, got {0:?}")]
    NotSha256(String),
}

macro_rules! ulid_newtype {
    ($name:ident, $prefix:literal) => {
        #[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
        #[serde(transparent)]
        pub struct $name(String);

        impl $name {
            #[must_use]
            pub fn new() -> Self {
                Self(ulid::Ulid::new().to_string())
            }

            #[must_use]
            pub fn as_str(&self) -> &str {
                &self.0
            }

            #[must_use]
            pub fn into_inner(self) -> String {
                self.0
            }

            #[must_use]
            pub const fn prefix() -> &'static str {
                $prefix
            }
        }

        impl Default for $name {
            fn default() -> Self {
                Self::new()
            }
        }

        impl fmt::Display for $name {
            fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                f.write_str(&self.0)
            }
        }

        impl TryFrom<&str> for $name {
            type Error = IdError;
            fn try_from(value: &str) -> std::result::Result<Self, Self::Error> {
                ulid::Ulid::from_str(value).map_err(|_| IdError::NotUlid(value.to_string()))?;
                Ok(Self(value.to_string()))
            }
        }

        impl TryFrom<String> for $name {
            type Error = IdError;
            fn try_from(value: String) -> std::result::Result<Self, Self::Error> {
                ulid::Ulid::from_str(&value).map_err(|_| IdError::NotUlid(value.clone()))?;
                Ok(Self(value))
            }
        }

        impl FromStr for $name {
            type Err = IdError;
            fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
                Self::try_from(s)
            }
        }
    };
}

ulid_newtype!(DeploymentId, "dep");
ulid_newtype!(VoiceAssetId, "va");
ulid_newtype!(MappingId, "map");
ulid_newtype!(PresetId, "pre");
ulid_newtype!(RunId, "run");
ulid_newtype!(UtteranceId, "utt");
ulid_newtype!(ExportId, "exp");
ulid_newtype!(RuntimeLeaseId, "lease");

#[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ContentHash(String);

impl ContentHash {
    pub fn from_hex(hex: impl Into<String>) -> std::result::Result<Self, IdError> {
        let hex = hex.into();
        if hex.len() != 64 || !hex.chars().all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase()) {
            return Err(IdError::NotSha256(hex));
        }
        Ok(Self(hex))
    }

    #[must_use]
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for ContentHash {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

impl TryFrom<&str> for ContentHash {
    type Error = IdError;
    fn try_from(value: &str) -> std::result::Result<Self, Self::Error> {
        Self::from_hex(value)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ulid_newtype_roundtrip() {
        let id = DeploymentId::new();
        let as_str = id.to_string();
        let parsed = DeploymentId::try_from(as_str.as_str()).unwrap();
        assert_eq!(id, parsed);
    }

    #[test]
    fn rejects_non_ulid() {
        assert!(matches!(
            DeploymentId::try_from("not-a-ulid"),
            Err(IdError::NotUlid(_))
        ));
    }

    #[test]
    fn content_hash_rejects_wrong_len() {
        assert!(ContentHash::from_hex("abc").is_err());
    }

    #[test]
    fn content_hash_rejects_uppercase() {
        assert!(ContentHash::from_hex("A".repeat(64)).is_err());
    }

    #[test]
    fn content_hash_accepts_lower_hex() {
        let h = "a".repeat(64);
        assert_eq!(ContentHash::from_hex(&h).unwrap().as_str(), h);
    }

    #[test]
    fn ids_are_distinct_types() {
        let a = DeploymentId::new();
        let b = MappingId::new();
        let _ = (a.as_str(), b.as_str());
    }
}
