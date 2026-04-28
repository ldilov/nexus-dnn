//! Spec 036 — deterministic [`ChainDigest`] over an [`EditChain`].
//!
//! The digest is the lowercase hex SHA-256 of the canonical JSON serialization
//! produced by `serde_json::to_string` (compact form, no whitespace insertion).
//! `serde_json` 1.x emits a stable compact representation — relying on it makes
//! the digest stable across environments without a hand-rolled canonicalizer.
//!
//! [`ChainDigest::EMPTY`] is the digest of `EditChain { version: 1, ops: vec![] }`
//! and is used as the "no chain" sentinel in cache-key composition (SC-004).
//! The hex value is hard-coded so that `EMPTY` is a true `pub const` —
//! the unit test [`tests::empty_const_matches_runtime_compute`] asserts
//! parity with the runtime computation, catching any accidental drift in
//! `serde_json`'s compact-form output.

use std::borrow::Cow;
use std::fmt;

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

use crate::domain::audio_edit::EditChain;

const EMPTY_HEX: &str = "0c329c3438f5bb772f3c2861e9be9526dcec2dd50d997f2297a8f624535645a2";

#[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ChainDigest(Cow<'static, str>);

impl ChainDigest {
    pub const EMPTY: Self = Self(Cow::Borrowed(EMPTY_HEX));

    #[must_use]
    pub fn of(chain: &EditChain) -> Self {
        let canonical = serde_json::to_string(chain).expect("EditChain is always serializable");
        let digest = Sha256::digest(canonical.as_bytes());
        Self(Cow::Owned(hex::encode(digest)))
    }

    #[must_use]
    pub fn as_str(&self) -> &str {
        self.0.as_ref()
    }

    /// Consume the digest, returning the owned hex string. Reserved for Phase 4
    /// callers that need to move the digest into a serialisable response payload
    /// without an additional clone.
    #[must_use]
    pub fn into_inner(self) -> String {
        self.0.into_owned()
    }

    /// Construct from a hex string the caller has already validated (64-char
    /// lowercase). Used by repository code that reads stored audit-log rows
    /// where the format invariant is enforced by a `CHECK` constraint at the
    /// SQL layer. Crate-private to keep the validation contract explicit.
    #[must_use]
    pub(crate) fn from_validated_hex(hex: String) -> Self {
        Self(Cow::Owned(hex))
    }
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
}
