//! Cluster-B — "Source Mixer" mute set.
//!
//! Holds a set of source-label patterns (literal or glob) that the
//! operator has explicitly silenced via `/mute <pattern>` or the
//! `/mixer` drawer. Events whose `source` matches any pattern are
//! hidden from the ambient stream but still captured by the ring
//! buffer for historical queries.
//!
//! Pin precedence: a pin overrides mute (see `lib::is_visible`).

use std::collections::BTreeSet;

use glob::Pattern;

use crate::stream::event_line::EventLine;

#[derive(Debug, Default, Clone)]
pub struct MutedSources {
    /// Raw operator-typed patterns, kept for `/mixer` display and
    /// for accurate `/unmute <pattern>` removal.
    patterns_text: BTreeSet<String>,
    /// Compiled patterns. Kept in sync with `patterns_text`; both
    /// always have the same cardinality.
    compiled: Vec<Pattern>,
}

impl MutedSources {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn is_empty(&self) -> bool {
        self.patterns_text.is_empty()
    }

    pub fn len(&self) -> usize {
        self.patterns_text.len()
    }

    pub fn patterns(&self) -> impl Iterator<Item = &str> + '_ {
        self.patterns_text.iter().map(String::as_str)
    }

    /// Mute a literal source label or glob pattern. Returns
    /// `Ok(true)` when newly added, `Ok(false)` when already present,
    /// `Err` on invalid glob.
    pub fn mute(&mut self, pattern: &str) -> Result<bool, String> {
        let trimmed = pattern.trim();
        if trimmed.is_empty() {
            return Err("pattern is empty".into());
        }
        if self.patterns_text.contains(trimmed) {
            return Ok(false);
        }
        let compiled = Pattern::new(trimmed).map_err(|e| format!("invalid glob: {e}"))?;
        self.patterns_text.insert(trimmed.to_string());
        self.compiled.push(compiled);
        Ok(true)
    }

    /// Unmute by exact pattern text. Returns `true` when removed.
    pub fn unmute(&mut self, pattern: &str) -> bool {
        let trimmed = pattern.trim();
        if !self.patterns_text.remove(trimmed) {
            return false;
        }
        if let Some(idx) = self.compiled.iter().position(|p| p.as_str() == trimmed) {
            self.compiled.remove(idx);
        }
        true
    }

    pub fn clear(&mut self) -> usize {
        let n = self.patterns_text.len();
        self.patterns_text.clear();
        self.compiled.clear();
        n
    }

    pub fn matches_source(&self, source: &str) -> bool {
        self.compiled.iter().any(|p| p.matches(source))
    }

    pub fn matches(&self, line: &EventLine) -> bool {
        self.matches_source(&line.source)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;

    fn host_log(target: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::HostLog {
            level: "info".into(),
            target: target.into(),
            message: "m".into(),
            fields: BTreeMap::new(),
            span_path: None,
            timestamp_ms: 0,
        })
    }

    #[test]
    fn mute_adds_literal_pattern() {
        let mut m = MutedSources::new();
        assert!(m.mute("host.banner").unwrap());
        assert!(m.matches_source("host.banner"));
        assert!(!m.matches_source("host.scheduler"));
    }

    #[test]
    fn mute_supports_glob_wildcards() {
        let mut m = MutedSources::new();
        m.mute("host.*").unwrap();
        assert!(m.matches_source("host.banner"));
        assert!(m.matches_source("host.scheduler"));
        assert!(!m.matches_source("run:abc"));
    }

    #[test]
    fn mute_duplicate_is_idempotent() {
        let mut m = MutedSources::new();
        assert!(m.mute("host.banner").unwrap());
        assert!(!m.mute("host.banner").unwrap());
        assert_eq!(m.len(), 1);
    }

    #[test]
    fn unmute_removes_pattern() {
        let mut m = MutedSources::new();
        m.mute("host.banner").unwrap();
        assert!(m.unmute("host.banner"));
        assert!(!m.matches_source("host.banner"));
    }

    #[test]
    fn unmute_missing_returns_false() {
        let mut m = MutedSources::new();
        assert!(!m.unmute("nothing"));
    }

    #[test]
    fn matches_event_line() {
        let mut m = MutedSources::new();
        m.mute("host.*").unwrap();
        assert!(m.matches(&host_log("scheduler")));
    }

    #[test]
    fn rejects_empty_pattern() {
        let mut m = MutedSources::new();
        assert!(m.mute("").is_err());
        assert!(m.mute("   ").is_err());
    }
}
