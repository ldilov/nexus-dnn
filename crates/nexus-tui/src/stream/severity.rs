//! Severity ordering for the unified event stream.
//!
//! The variant declaration order encodes the total ordering: `Debug` is
//! the lowest, `Fatal` is the highest. `derive(PartialOrd, Ord)` honors
//! that order so the level-floor filter expresses as a simple `>=`.

use std::fmt;
use std::str::FromStr;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub enum Severity {
    Debug,
    #[default]
    Info,
    Warn,
    Error,
    Fatal,
}

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
#[error("unknown severity level: {0}")]
pub struct ParseSeverityError(String);

impl Severity {
    pub fn parse(input: &str) -> Option<Self> {
        Self::from_str(input).ok()
    }

    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Debug => "debug",
            Self::Info => "info",
            Self::Warn => "warn",
            Self::Error => "error",
            Self::Fatal => "fatal",
        }
    }
}

impl FromStr for Severity {
    type Err = ParseSeverityError;

    fn from_str(input: &str) -> Result<Self, Self::Err> {
        match input.trim().to_ascii_lowercase().as_str() {
            "debug" => Ok(Self::Debug),
            "info" => Ok(Self::Info),
            "warn" | "warning" => Ok(Self::Warn),
            "error" => Ok(Self::Error),
            "fatal" => Ok(Self::Fatal),
            other => Err(ParseSeverityError(other.to_string())),
        }
    }
}

impl fmt::Display for Severity {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}
