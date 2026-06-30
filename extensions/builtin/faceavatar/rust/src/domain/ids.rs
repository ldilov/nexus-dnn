use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum IdError {
    #[error("invalid id: {0}")]
    InvalidId(String),
}

fn validate_external_id(value: &str) -> std::result::Result<(), IdError> {
    if value.is_empty() || value.len() > 128 {
        return Err(IdError::InvalidId(format!(
            "id must be 1..=128 chars, got {} chars",
            value.len()
        )));
    }
    if !value
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
    {
        return Err(IdError::InvalidId(format!(
            "id must be ASCII alphanumeric + `-`/`_`, got {value:?}"
        )));
    }
    Ok(())
}

#[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct JobId(String);

impl JobId {
    #[must_use]
    pub fn new() -> Self {
        Self(ulid::Ulid::new().to_string())
    }

    #[must_use]
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl Default for JobId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for JobId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

impl TryFrom<&str> for JobId {
    type Error = IdError;
    fn try_from(value: &str) -> std::result::Result<Self, Self::Error> {
        validate_external_id(value)?;
        Ok(Self(value.to_string()))
    }
}

impl TryFrom<String> for JobId {
    type Error = IdError;
    fn try_from(value: String) -> std::result::Result<Self, Self::Error> {
        validate_external_id(&value)?;
        Ok(Self(value))
    }
}

impl FromStr for JobId {
    type Err = IdError;
    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        Self::try_from(s)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn job_id_roundtrip() {
        let id = JobId::new();
        let parsed = JobId::try_from(id.as_str()).unwrap();
        assert_eq!(id, parsed);
    }

    #[test]
    fn rejects_path_traversal() {
        assert!(JobId::try_from("../etc/passwd").is_err());
        assert!(JobId::try_from("").is_err());
        assert!(JobId::try_from("a".repeat(200).as_str()).is_err());
    }
}
