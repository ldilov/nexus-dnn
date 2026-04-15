use std::fmt;

/// A canonical runtime family identifier.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[non_exhaustive]
pub enum RuntimeFamily {
    /// llama.cpp (alias "llamacpp")
    LlamaCpp,
}

impl RuntimeFamily {
    /// Canonical wire form. Stable — used in DB columns, JSON, HTTP.
    pub const LLAMA_CPP: &'static str = "llama.cpp";

    /// Parse a raw family string (wire or alias) into the canonical enum.
    /// Returns `None` for unknown families.
    pub fn canonical(raw: &str) -> Option<Self> {
        match raw {
            "llama.cpp" | "llamacpp" => Some(Self::LlamaCpp),
            _ => None,
        }
    }

    /// The canonical wire form for this family.
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::LlamaCpp => Self::LLAMA_CPP,
        }
    }

    /// True iff `raw` is the canonical form OR a known alias for any family.
    pub fn is_alias_of(raw: &str) -> bool {
        Self::canonical(raw).is_some()
    }
}

impl fmt::Display for RuntimeFamily {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn canonical_accepts_wire_and_alias() {
        assert_eq!(
            RuntimeFamily::canonical("llama.cpp"),
            Some(RuntimeFamily::LlamaCpp)
        );
        assert_eq!(
            RuntimeFamily::canonical("llamacpp"),
            Some(RuntimeFamily::LlamaCpp)
        );
    }

    #[test]
    fn canonical_rejects_unknown() {
        assert!(RuntimeFamily::canonical("vllm").is_none());
        assert!(RuntimeFamily::canonical("").is_none());
        assert!(RuntimeFamily::canonical("LLAMA.CPP").is_none()); // case-sensitive
    }

    #[test]
    fn as_str_returns_wire_form() {
        assert_eq!(RuntimeFamily::LlamaCpp.as_str(), "llama.cpp");
    }

    #[test]
    fn is_alias_of_covers_both() {
        assert!(RuntimeFamily::is_alias_of("llama.cpp"));
        assert!(RuntimeFamily::is_alias_of("llamacpp"));
        assert!(!RuntimeFamily::is_alias_of("vllm"));
    }

    #[test]
    fn display_emits_canonical_form() {
        assert_eq!(format!("{}", RuntimeFamily::LlamaCpp), "llama.cpp");
    }
}
