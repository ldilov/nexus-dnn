//! Domain identifier newtypes for the run-event protocol.
//!
//! Wrapping primitive integers and strings prevents accidental field
//! confusion at the API boundary and gives every identifier a single
//! validation site.

use serde::{Deserialize, Serialize};
use thiserror::Error;

/// Errors raised when constructing a validating identifier newtype.
#[derive(Debug, Error, PartialEq, Eq)]
#[non_exhaustive]
pub enum IdError {
    /// The provided identifier was empty after trimming.
    #[error("identifier must not be empty")]
    Empty,
    /// The provided identifier contained characters outside the allowed
    /// ASCII letter / digit / `-` / `.` / `_` set.
    #[error("identifier contains invalid character: {0:?}")]
    InvalidChar(char),
}

/// Worker-side monotonic sequence number. Authoritative for ordering of
/// events within a single run.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SeqNum(u64);

impl SeqNum {
    /// Construct a sequence number from a raw `u64`.
    pub const fn new(v: u64) -> Self {
        Self(v)
    }

    /// Return the underlying raw value.
    pub const fn value(self) -> u64 {
        self.0
    }

    /// Return the next sequence number, saturating at `u64::MAX`.
    pub const fn next(self) -> Self {
        Self(self.0.saturating_add(1))
    }
}

/// Identifier for a single end-to-end worker run (e.g. one model load,
/// one synth invocation, one dependency install).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct RunId(String);

impl RunId {
    /// Construct a `RunId` from any string-like input, validating that
    /// it is non-empty and uses only the allowed character set.
    pub fn try_new(s: impl Into<String>) -> Result<Self, IdError> {
        let inner = validate_identifier(s.into())?;
        Ok(Self(inner))
    }

    /// Return the underlying string slice.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// Logical source within a run (e.g. `"llamacpp.scraper"`,
/// `"synth.worker"`).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SourceId(String);

impl SourceId {
    /// Construct a `SourceId`, validating the identifier character set.
    pub fn try_new(s: impl Into<String>) -> Result<Self, IdError> {
        let inner = validate_identifier(s.into())?;
        Ok(Self(inner))
    }

    /// Return the underlying string slice.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// Index of a transformer layer within a model. Bounded by the model's
/// `n_layer`; out-of-range values surface as `ScraperUnknown` events
/// from the scraper layer rather than being constructed here.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct LayerIndex(u32);

impl LayerIndex {
    /// Construct a layer index from a raw `u32`.
    pub const fn new(v: u32) -> Self {
        Self(v)
    }

    /// Return the underlying raw value.
    pub const fn value(self) -> u32 {
        self.0
    }
}

fn validate_identifier(s: String) -> Result<String, IdError> {
    let trimmed = s.trim();
    if trimmed.is_empty() {
        return Err(IdError::Empty);
    }
    if let Some(bad) = trimmed
        .chars()
        .find(|c| !(c.is_ascii_alphanumeric() || matches!(c, '-' | '.' | '_')))
    {
        return Err(IdError::InvalidChar(bad));
    }
    Ok(trimmed.to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn seq_num_next_saturates() {
        assert_eq!(SeqNum::new(0).next(), SeqNum::new(1));
        assert_eq!(SeqNum::new(u64::MAX).next(), SeqNum::new(u64::MAX));
    }

    #[test]
    fn run_id_rejects_empty() {
        assert_eq!(RunId::try_new(""), Err(IdError::Empty));
        assert_eq!(RunId::try_new("   "), Err(IdError::Empty));
    }

    #[test]
    fn run_id_rejects_invalid_char() {
        assert_eq!(RunId::try_new("bad/id"), Err(IdError::InvalidChar('/')));
    }

    #[test]
    fn run_id_accepts_valid() {
        let id = RunId::try_new("run-2026.05_08").expect("valid id");
        assert_eq!(id.as_str(), "run-2026.05_08");
    }

    #[test]
    fn source_id_validates_same_set() {
        assert!(SourceId::try_new("llamacpp.scraper").is_ok());
        assert!(matches!(
            SourceId::try_new("has space"),
            Err(IdError::InvalidChar(' '))
        ));
    }
}
