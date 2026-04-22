use std::fmt;

use serde::{Deserialize, Serialize};

/// Extension-supplied identifier for a release within a runtime's version
/// manifest (e.g. `"v0_1_0"`). Opaque to the host — no format enforcement
/// beyond non-empty + reasonable length.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ReleaseId(String);

impl ReleaseId {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl TryFrom<&str> for ReleaseId {
    type Error = &'static str;

    fn try_from(raw: &str) -> Result<Self, Self::Error> {
        if raw.is_empty() {
            return Err("release_id must not be empty");
        }
        if raw.len() > 128 {
            return Err("release_id must be <= 128 chars");
        }
        Ok(Self(raw.to_string()))
    }
}

impl fmt::Display for ReleaseId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
