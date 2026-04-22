use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use ulid::Ulid;

/// Host-minted identifier for one lease.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct RuntimeLeaseId(Ulid);

impl RuntimeLeaseId {
    pub fn new() -> Self {
        Self(Ulid::new())
    }

    pub fn as_ulid(&self) -> Ulid {
        self.0
    }
}

impl Default for RuntimeLeaseId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for RuntimeLeaseId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl FromStr for RuntimeLeaseId {
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
        assert_ne!(RuntimeLeaseId::new(), RuntimeLeaseId::new());
    }

    #[test]
    fn display_parse_roundtrip() {
        let id = RuntimeLeaseId::new();
        assert_eq!(id, id.to_string().parse().unwrap());
    }
}
