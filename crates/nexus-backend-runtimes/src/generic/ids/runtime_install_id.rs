use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use ulid::Ulid;

/// Host-minted identifier for one runtime install row.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct RuntimeInstallId(Ulid);

impl RuntimeInstallId {
    pub fn new() -> Self {
        Self(Ulid::new())
    }

    pub fn as_ulid(&self) -> Ulid {
        self.0
    }
}

impl Default for RuntimeInstallId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for RuntimeInstallId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl FromStr for RuntimeInstallId {
    type Err = ulid::DecodeError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ulid::from_str(s).map(Self)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_produces_unique_ids() {
        let a = RuntimeInstallId::new();
        let b = RuntimeInstallId::new();
        assert_ne!(a, b);
    }

    #[test]
    fn display_parse_roundtrip() {
        let id = RuntimeInstallId::new();
        let s = id.to_string();
        let back: RuntimeInstallId = s.parse().unwrap();
        assert_eq!(id, back);
    }
}
