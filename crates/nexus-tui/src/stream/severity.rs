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

    pub fn glyph(self, ascii: bool) -> &'static str {
        if ascii {
            match self {
                Self::Debug => "[DEBUG]",
                Self::Info => "[INFO]",
                Self::Warn => "[WARN]",
                Self::Error => "[ERROR]",
                Self::Fatal => "[FATAL]",
            }
        } else {
            match self {
                Self::Debug => "·",
                Self::Info => "·",
                Self::Warn => "▲",
                Self::Error => "●",
                Self::Fatal => "✸",
            }
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

#[cfg(test)]
mod glyph_tests {
    use super::*;

    #[test]
    fn unicode_glyphs_distinguish_severity() {
        assert_eq!(Severity::Fatal.glyph(false), "✸");
        assert_eq!(Severity::Error.glyph(false), "●");
        assert_eq!(Severity::Warn.glyph(false), "▲");
        assert_eq!(Severity::Info.glyph(false), "·");
    }

    #[test]
    fn ascii_glyphs_use_bracketed_labels() {
        assert_eq!(Severity::Fatal.glyph(true), "[FATAL]");
        assert_eq!(Severity::Error.glyph(true), "[ERROR]");
        assert_eq!(Severity::Warn.glyph(true), "[WARN]");
        assert_eq!(Severity::Info.glyph(true), "[INFO]");
        assert_eq!(Severity::Debug.glyph(true), "[DEBUG]");
    }
}
