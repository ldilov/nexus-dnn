use std::borrow::Cow;
use std::fmt;

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

use crate::domain::audio_edit::EditChain;

const EMPTY_HEX: &str = "cbf26a909e1b15c955b7cba8b21bd58ceb71ac25dc38f509d81f8f86a2fc5de6";

#[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ChainDigest(Cow<'static, str>);

impl ChainDigest {
    pub const EMPTY: Self = Self(Cow::Borrowed(EMPTY_HEX));

    #[must_use]
    pub fn of(chain: &EditChain) -> Self {
        let canonical = canonical_json_for_digest(chain);
        let digest = Sha256::digest(canonical.as_bytes());
        Self(Cow::Owned(hex::encode(digest)))
    }

    #[must_use]
    pub fn as_str(&self) -> &str {
        self.0.as_ref()
    }

    #[must_use]
    pub fn into_inner(self) -> String {
        self.0.into_owned()
    }

    pub(crate) fn from_validated_hex(hex: String) -> Self {
        Self(Cow::Owned(hex))
    }
}

fn canonical_json_for_digest(chain: &EditChain) -> String {
    let value = serde_json::to_value(chain)
        .expect("EditChain → serde_json::Value: only primitive fields, infallible");
    serde_json::to_string(&value)
        .expect("serde_json::Value → String: tree built from primitives, infallible")
}

impl Default for ChainDigest {
    fn default() -> Self {
        Self::EMPTY.clone()
    }
}

impl fmt::Display for ChainDigest {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.0.as_ref())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::audio_edit::{EditOp, OperationId};

    #[test]
    fn empty_const_matches_runtime_compute() {
        let runtime = ChainDigest::of(&EditChain {
            version: 1,
            ops: vec![],
        });
        assert_eq!(runtime.as_str(), EMPTY_HEX);
        assert_eq!(runtime, ChainDigest::EMPTY);
    }

    #[test]
    fn empty_clone_yields_equal_value() {
        let a = ChainDigest::EMPTY.clone();
        let b = ChainDigest::EMPTY.clone();
        assert_eq!(a, b);
    }

    #[test]
    fn digest_is_64_lower_hex() {
        let chain = EditChain {
            version: 1,
            ops: vec![EditOp::FadeIn {
                id: OperationId::new(),
                duration_ms: 100,
            }],
        };
        let d = ChainDigest::of(&chain);
        assert_eq!(d.as_str().len(), 64);
        assert!(d
            .as_str()
            .chars()
            .all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase()));
    }

    #[test]
    fn canonical_json_keys_are_alphabetically_ordered() {
        let chain = EditChain {
            version: 1,
            ops: vec![EditOp::Trim {
                id: OperationId::new(),
                start_ms: 100,
                end_ms: 500,
            }],
        };
        let canonical = canonical_json_for_digest(&chain);
        let ops_idx = canonical.find("\"ops\"").expect("ops key present");
        let version_idx = canonical.find("\"version\"").expect("version key present");
        assert!(
            ops_idx < version_idx,
            "alphabetical order: ops < version, got {canonical}"
        );
    }
}
