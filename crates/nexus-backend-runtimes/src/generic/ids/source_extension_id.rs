use std::fmt;

use serde::{Deserialize, Serialize};

/// Soft foreign key onto the host's extension registry. Opaque string —
/// this crate does NOT validate format (the extension system owns that).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SourceExtensionId(String);

impl SourceExtensionId {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl From<&str> for SourceExtensionId {
    fn from(raw: &str) -> Self {
        Self(raw.to_string())
    }
}

impl From<String> for SourceExtensionId {
    fn from(raw: String) -> Self {
        Self(raw)
    }
}

impl fmt::Display for SourceExtensionId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
