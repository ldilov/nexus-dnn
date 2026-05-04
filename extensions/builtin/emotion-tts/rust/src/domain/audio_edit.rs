use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};

use crate::domain::ids::IdError;
use crate::domain::{EmotionTtsError, Result};

const MAX_OPS: usize = 32;
const MIN_TRIM_DURATION_MS: u32 = 100;
const SPEED_FACTOR_MIN: f32 = 0.5;
const SPEED_FACTOR_MAX: f32 = 2.0;
const TARGET_LUFS_MIN: f32 = -30.0;
const TARGET_LUFS_MAX: f32 = -6.0;
const SUPPORTED_VERSION: u8 = 1;
const OPERATION_ID_MAX_LEN: usize = 32;

#[derive(Debug, Clone, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct OperationId(String);

impl OperationId {
    #[must_use]
    pub fn new() -> Self {
        Self(ulid::Ulid::new().to_string())
    }

    #[must_use]
    pub fn as_str(&self) -> &str {
        &self.0
    }

    #[must_use]
    pub fn into_inner(self) -> String {
        self.0
    }
}

impl Default for OperationId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for OperationId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

fn validate_operation_id(value: &str) -> std::result::Result<(), IdError> {
    if value.is_empty() || value.len() > OPERATION_ID_MAX_LEN {
        return Err(IdError::InvalidId(format!(
            "operation id must be 1..={OPERATION_ID_MAX_LEN} chars, got {} chars",
            value.len()
        )));
    }
    if !value.chars().all(|c| c.is_ascii_alphanumeric()) {
        return Err(IdError::InvalidId(format!(
            "operation id must be ASCII alphanumeric, got {value:?}"
        )));
    }
    Ok(())
}

impl TryFrom<&str> for OperationId {
    type Error = IdError;
    fn try_from(value: &str) -> std::result::Result<Self, Self::Error> {
        validate_operation_id(value)?;
        Ok(Self(value.to_string()))
    }
}

impl TryFrom<String> for OperationId {
    type Error = IdError;
    fn try_from(value: String) -> std::result::Result<Self, Self::Error> {
        validate_operation_id(&value)?;
        Ok(Self(value))
    }
}

impl FromStr for OperationId {
    type Err = IdError;
    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        Self::try_from(s)
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "mode", rename_all = "snake_case")]
#[non_exhaustive]
pub enum EditOp {
    Trim {
        id: OperationId,
        start_ms: u32,
        end_ms: u32,
    },
    Crop {
        id: OperationId,
        start_ms: u32,
        end_ms: u32,
    },
    Normalize {
        id: OperationId,
        target_lufs: f32,
    },
    Speed {
        id: OperationId,
        factor: f32,
    },
    FadeIn {
        id: OperationId,
        duration_ms: u32,
    },
    FadeOut {
        id: OperationId,
        duration_ms: u32,
    },
    Mute {
        id: OperationId,
        start_ms: u32,
        end_ms: u32,
    },
}

impl EditOp {
    pub fn validate(&self) -> Result<()> {
        match self {
            Self::Trim {
                start_ms, end_ms, ..
            } => validate_range(*start_ms, *end_ms, "trim/crop result"),
            Self::Crop {
                start_ms, end_ms, ..
            } => validate_range(*start_ms, *end_ms, "trim/crop result"),
            Self::Mute {
                start_ms, end_ms, ..
            } => validate_range(*start_ms, *end_ms, "mute span"),
            Self::Normalize { target_lufs, .. } => validate_target_lufs(*target_lufs),
            Self::Speed { factor, .. } => validate_speed_factor(*factor),
            Self::FadeIn { duration_ms, .. } | Self::FadeOut { duration_ms, .. } => {
                validate_fade_duration(*duration_ms)
            }
        }
    }
}

fn validate_range(start_ms: u32, end_ms: u32, label: &str) -> Result<()> {
    if start_ms >= end_ms {
        return Err(EmotionTtsError::validation(format!(
            "{label} start_ms ({start_ms}) must be < end_ms ({end_ms})"
        )));
    }
    if end_ms - start_ms < MIN_TRIM_DURATION_MS {
        return Err(EmotionTtsError::validation(format!(
            "{label} must be ≥ {MIN_TRIM_DURATION_MS} ms, got {} ms",
            end_ms - start_ms
        )));
    }
    Ok(())
}

fn validate_target_lufs(target_lufs: f32) -> Result<()> {
    if !target_lufs.is_finite() || !(TARGET_LUFS_MIN..=TARGET_LUFS_MAX).contains(&target_lufs) {
        return Err(EmotionTtsError::validation(format!(
            "target_lufs must be in [{TARGET_LUFS_MIN}, {TARGET_LUFS_MAX}], got {target_lufs}"
        )));
    }
    Ok(())
}

fn validate_speed_factor(factor: f32) -> Result<()> {
    if !factor.is_finite() || !(SPEED_FACTOR_MIN..=SPEED_FACTOR_MAX).contains(&factor) {
        return Err(EmotionTtsError::validation(format!(
            "speed factor must be in [{SPEED_FACTOR_MIN}, {SPEED_FACTOR_MAX}], got {factor}"
        )));
    }
    Ok(())
}

fn validate_fade_duration(duration_ms: u32) -> Result<()> {
    if duration_ms == 0 {
        return Err(EmotionTtsError::validation(
            "fade duration_ms must be ≥ 1".to_string(),
        ));
    }
    Ok(())
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EditChain {
    pub version: u8,
    pub ops: Vec<EditOp>,
}

impl EditChain {
    pub fn validate(&self) -> Result<()> {
        if self.version != SUPPORTED_VERSION {
            return Err(EmotionTtsError::validation(format!(
                "unsupported edit chain version {} (expected {SUPPORTED_VERSION})",
                self.version
            )));
        }
        if self.ops.len() > MAX_OPS {
            return Err(EmotionTtsError::validation(format!(
                "edit chain length {} exceeds maximum {MAX_OPS}",
                self.ops.len()
            )));
        }
        for op in &self.ops {
            op.validate()?;
        }
        Ok(())
    }

    #[must_use]
    pub fn operation_count(&self) -> u16 {
        u16::try_from(self.ops.len()).unwrap_or(u16::MAX)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn id() -> OperationId {
        OperationId::new()
    }

    #[test]
    fn operation_id_roundtrip() {
        let oid = OperationId::new();
        let parsed = OperationId::try_from(oid.as_str()).expect("valid ulid");
        assert_eq!(oid, parsed);
    }

    #[test]
    fn operation_id_rejects_empty() {
        assert!(OperationId::try_from("").is_err());
    }

    #[test]
    fn operation_id_rejects_long() {
        let long = "a".repeat(OPERATION_ID_MAX_LEN + 1);
        assert!(OperationId::try_from(long.as_str()).is_err());
    }

    #[test]
    fn operation_id_rejects_non_alnum() {
        assert!(OperationId::try_from("abc-def").is_err());
    }

    #[test]
    fn validates_supported_version() {
        let chain = EditChain {
            version: 1,
            ops: vec![],
        };
        assert!(chain.validate().is_ok());
    }

    #[test]
    fn rejects_unsupported_version() {
        let chain = EditChain {
            version: 2,
            ops: vec![],
        };
        assert!(matches!(
            chain.validate(),
            Err(EmotionTtsError::Validation(_))
        ));
    }

    #[test]
    fn rejects_too_many_ops() {
        let chain = EditChain {
            version: 1,
            ops: (0..=MAX_OPS)
                .map(|_| EditOp::Trim {
                    id: id(),
                    start_ms: 0,
                    end_ms: 1_000,
                })
                .collect(),
        };
        assert!(matches!(
            chain.validate(),
            Err(EmotionTtsError::Validation(_))
        ));
    }

    #[test]
    fn rejects_inverted_trim() {
        let op = EditOp::Trim {
            id: id(),
            start_ms: 500,
            end_ms: 100,
        };
        assert!(op.validate().is_err());
    }

    #[test]
    fn rejects_too_short_trim() {
        let op = EditOp::Trim {
            id: id(),
            start_ms: 0,
            end_ms: 50,
        };
        assert!(op.validate().is_err());
    }

    #[test]
    fn accepts_trim_at_exact_minimum_duration() {
        let op = EditOp::Trim {
            id: id(),
            start_ms: 0,
            end_ms: MIN_TRIM_DURATION_MS,
        };
        assert!(
            op.validate().is_ok(),
            "boundary condition: end - start == MIN must be accepted"
        );
    }

    #[test]
    fn rejects_out_of_range_lufs() {
        let too_low = EditOp::Normalize {
            id: id(),
            target_lufs: -40.0,
        };
        let too_high = EditOp::Normalize {
            id: id(),
            target_lufs: 0.0,
        };
        assert!(too_low.validate().is_err());
        assert!(too_high.validate().is_err());
    }

    #[test]
    fn accepts_in_range_lufs() {
        let op = EditOp::Normalize {
            id: id(),
            target_lufs: -16.0,
        };
        assert!(op.validate().is_ok());
    }

    #[test]
    fn rejects_out_of_range_speed() {
        let too_slow = EditOp::Speed {
            id: id(),
            factor: 0.4,
        };
        let too_fast = EditOp::Speed {
            id: id(),
            factor: 2.5,
        };
        assert!(too_slow.validate().is_err());
        assert!(too_fast.validate().is_err());
    }

    #[test]
    fn accepts_zero_duration_fade_rejected() {
        let op = EditOp::FadeIn {
            id: id(),
            duration_ms: 0,
        };
        assert!(op.validate().is_err());
    }

    #[test]
    fn operation_count_equals_two_for_two_ops() {
        let chain = EditChain {
            version: 1,
            ops: vec![
                EditOp::FadeIn {
                    id: id(),
                    duration_ms: 100,
                },
                EditOp::FadeOut {
                    id: id(),
                    duration_ms: 100,
                },
            ],
        };
        assert_eq!(chain.operation_count(), 2);
    }

    #[test]
    fn serde_round_trip_preserves_ops() {
        let chain = EditChain {
            version: 1,
            ops: vec![EditOp::Speed {
                id: id(),
                factor: 1.25,
            }],
        };
        let s = serde_json::to_string(&chain).expect("serialize");
        let back: EditChain = serde_json::from_str(&s).expect("deserialize");
        assert_eq!(chain, back);
    }
}
