use std::fmt;

use serde::{Deserialize, Serialize};

/// Opaque accelerator-profile identifier (e.g. `"cpu"`, `"cuda13_1"`,
/// `"cuda12"`). Extensions declare profiles in their version manifests;
/// host treats as an exact-match string when resolving install assets.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct AcceleratorProfile(String);

impl AcceleratorProfile {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl TryFrom<&str> for AcceleratorProfile {
    type Error = &'static str;

    fn try_from(raw: &str) -> Result<Self, Self::Error> {
        if raw.is_empty() || raw.len() > 64 {
            return Err("accelerator_profile must be 1..=64 chars");
        }
        Ok(Self(raw.to_string()))
    }
}

impl fmt::Display for AcceleratorProfile {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}
