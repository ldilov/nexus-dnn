//! Cluster-C — "Paint Filters" matcher inference.
//!
//! Given a set of selected events (the brush selection), derive the
//! tightest filter that would match all of them — the operator's
//! gestural shortcut to building a `/source` + `/grep` + `/level`
//! filter from a handful of examples.
//!
//! Inferences (in precedence order):
//!
//! 1. **Source** — if every event shares the same `source`, the
//!    inference is an exact-match glob (`/source <source>`). If the
//!    sources differ but share a common dotted/colon-separated
//!    prefix (`host.foo` + `host.bar` → `host.*`), emit the glob.
//! 2. **Level floor** — the *minimum* severity present in the
//!    selection. Operators want every event at-or-above that level.
//! 3. **Grep substring** — the longest whitespace-separated token
//!    that appears in *every* summary AND is at least 4 characters
//!    long. (Tokens like `the`, `to`, `=`, `1` are too generic.)
//!
//! All three are independent — the caller composes them.

use crate::stream::event_line::EventLine;
use crate::stream::severity::Severity;

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct InferredFilter {
    pub source: Option<String>,
    pub level_floor: Option<Severity>,
    pub grep: Option<String>,
}

impl InferredFilter {
    pub fn is_empty(&self) -> bool {
        self.source.is_none() && self.level_floor.is_none() && self.grep.is_none()
    }

    /// Render as a sequence of slash commands the operator can run
    /// (or that `/yank` runs on their behalf).
    pub fn as_slash_commands(&self) -> Vec<String> {
        let mut out = Vec::new();
        if let Some(s) = &self.source {
            out.push(format!("/source {s}"));
        }
        if let Some(lvl) = self.level_floor {
            out.push(format!("/level {}", severity_arg(lvl)));
        }
        if let Some(g) = &self.grep {
            out.push(format!("/grep {g}"));
        }
        out
    }
}

fn severity_arg(s: Severity) -> &'static str {
    match s {
        Severity::Debug => "debug",
        Severity::Info => "info",
        Severity::Warn => "warn",
        Severity::Error => "error",
        Severity::Fatal => "fatal",
    }
}

pub fn infer_from(events: &[&EventLine]) -> InferredFilter {
    if events.is_empty() {
        return InferredFilter::default();
    }
    InferredFilter {
        source: infer_source(events),
        level_floor: infer_level_floor(events),
        grep: infer_grep_substring(events),
    }
}

fn infer_source(events: &[&EventLine]) -> Option<String> {
    let first = events[0].source.clone();
    if events.iter().all(|e| e.source == first) {
        return Some(first);
    }
    // Look for shared prefix bounded by `.` or `:`.
    let prefix = longest_common_prefix(events.iter().map(|e| e.source.as_str()));
    let trimmed = trim_to_segment_boundary(&prefix);
    if trimmed.len() >= 3 {
        Some(format!("{trimmed}*"))
    } else {
        None
    }
}

fn infer_level_floor(events: &[&EventLine]) -> Option<Severity> {
    events.iter().map(|e| e.severity).min()
}

fn infer_grep_substring(events: &[&EventLine]) -> Option<String> {
    // Tokenise the first event's summary; for each token, check it
    // appears in every other summary. Return the longest qualifying
    // token (≥4 chars).
    let first = events[0].summary.as_str();
    let mut best: Option<&str> = None;
    for token in first.split_whitespace() {
        if token.len() < 4 {
            continue;
        }
        if events.iter().skip(1).all(|e| e.summary.contains(token)) {
            best = match best {
                None => Some(token),
                Some(prev) if token.len() > prev.len() => Some(token),
                Some(prev) => Some(prev),
            };
        }
    }
    best.map(escape_grep)
}

fn longest_common_prefix<'a>(strs: impl IntoIterator<Item = &'a str>) -> String {
    let mut iter = strs.into_iter();
    let Some(first) = iter.next() else {
        return String::new();
    };
    let mut prefix = first.to_string();
    for s in iter {
        let new_len = prefix
            .chars()
            .zip(s.chars())
            .take_while(|(a, b)| a == b)
            .count();
        prefix.truncate(prefix.chars().take(new_len).map(char::len_utf8).sum());
    }
    prefix
}

/// Trim the prefix back to the last `.` or `:` segment boundary, so
/// `host.banner` + `host.scheduler` → `host.` rather than `host.b`.
fn trim_to_segment_boundary(prefix: &str) -> String {
    let last_boundary = prefix.rfind([':', '.']).map(|i| i + 1).unwrap_or(0);
    prefix[..last_boundary].to_string()
}

/// Escape a substring for `/grep` use — regex metacharacters get
/// `\` prefix so a literal token doesn't accidentally match as a
/// regex pattern.
fn escape_grep(token: &str) -> String {
    let mut out = String::with_capacity(token.len() + 4);
    for ch in token.chars() {
        if matches!(
            ch,
            '.' | '+' | '*' | '?' | '(' | ')' | '[' | ']' | '{' | '}' | '|' | '^' | '$' | '\\'
        ) {
            out.push('\\');
        }
        out.push(ch);
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;

    fn host_log(target: &str, level: &str, message: &str) -> EventLine {
        // EventLine::source for HostLog is `host.{target}` — fixtures
        // pass the bare suffix (e.g. "scheduler") which renders as
        // `host.scheduler`.
        EventLine::from_nexus_event(NexusEvent::HostLog {
            level: level.into(),
            target: target.into(),
            message: message.into(),
            fields: BTreeMap::new(),
            span_path: None,
            timestamp_ms: 0,
        })
    }

    fn deploy_event(slug: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::DeploymentDeleted {
            deployment_id: slug.into(),
            deleted_at: "2026-05-11T00:00:00Z".into(),
        })
    }

    #[test]
    fn empty_selection_returns_empty_inference() {
        let r = infer_from(&[]);
        assert!(r.is_empty());
    }

    #[test]
    fn same_source_returns_exact_match() {
        let a = host_log("scheduler", "info", "tick");
        let b = host_log("scheduler", "info", "tock");
        let r = infer_from(&[&a, &b]);
        assert_eq!(r.source.as_deref(), Some("host.scheduler"));
    }

    #[test]
    fn divergent_sources_with_dot_prefix_emit_glob() {
        let a = host_log("banner", "info", "x");
        let b = host_log("scheduler", "info", "y");
        let r = infer_from(&[&a, &b]);
        assert_eq!(r.source.as_deref(), Some("host.*"));
    }

    #[test]
    fn divergent_sources_with_colon_prefix_emit_glob() {
        let a = deploy_event("chat-prod");
        let b = deploy_event("tts-prod");
        let r = infer_from(&[&a, &b]);
        assert_eq!(r.source.as_deref(), Some("deploy:*"));
    }

    #[test]
    fn fully_divergent_sources_emit_no_source_filter() {
        let a = host_log("banner", "info", "x");
        let b = deploy_event("foo");
        let r = infer_from(&[&a, &b]);
        assert!(r.source.is_none());
    }

    #[test]
    fn level_floor_is_minimum_severity() {
        let a = host_log("host.x", "info", "x");
        let b = host_log("host.x", "warn", "y");
        let c = host_log("host.x", "error", "z");
        let r = infer_from(&[&a, &b, &c]);
        assert_eq!(r.level_floor, Some(Severity::Info));
    }

    #[test]
    fn grep_picks_longest_token_in_every_summary() {
        let a = host_log("host.x", "info", "deployment chat-prod failed");
        let b = host_log("host.y", "info", "watching deployment closely");
        let r = infer_from(&[&a, &b]);
        assert_eq!(r.grep.as_deref(), Some("deployment"));
    }

    #[test]
    fn grep_ignores_short_tokens() {
        let a = host_log("host.x", "info", "a to b");
        let b = host_log("host.x", "info", "c to d");
        let r = infer_from(&[&a, &b]);
        assert!(
            r.grep.is_none(),
            "'to' is shorter than 4 chars; should be ignored"
        );
    }

    #[test]
    fn grep_escapes_regex_metacharacters() {
        let a = host_log("host.x", "info", "config.toml missing");
        let b = host_log("host.x", "info", "fallback config.toml restored");
        let r = infer_from(&[&a, &b]);
        // "config.toml" with the dot escaped.
        assert_eq!(r.grep.as_deref(), Some(r"config\.toml"));
    }

    #[test]
    fn slash_commands_render_in_precedence_order() {
        let f = InferredFilter {
            source: Some("host.*".into()),
            level_floor: Some(Severity::Warn),
            grep: Some("cuda".into()),
        };
        let cmds = f.as_slash_commands();
        assert_eq!(
            cmds,
            vec![
                "/source host.*".to_string(),
                "/level warn".to_string(),
                "/grep cuda".to_string(),
            ]
        );
    }

    #[test]
    fn no_inferences_returns_empty_command_list() {
        let f = InferredFilter::default();
        assert!(f.as_slash_commands().is_empty());
    }
}
