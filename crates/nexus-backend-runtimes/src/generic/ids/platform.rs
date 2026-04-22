use std::fmt;

use serde::{Deserialize, Serialize};

/// Opaque platform identifier (e.g. `"windows-x64"`, `"linux-x64"`). The
/// host does not enumerate valid values — extensions declare what they
/// ship in their version manifests.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct PlatformId(String);

impl PlatformId {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl TryFrom<&str> for PlatformId {
    type Error = &'static str;

    fn try_from(raw: &str) -> Result<Self, Self::Error> {
        if raw.is_empty() || raw.len() > 64 {
            return Err("platform must be 1..=64 chars");
        }
        Ok(Self(raw.to_string()))
    }
}

impl fmt::Display for PlatformId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
