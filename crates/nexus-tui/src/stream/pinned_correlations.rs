//! Cluster-B — "Causal Pin" persistent attention state.
//!
//! Pinning a correlation key (`run:<id>`, `deploy:<slug>`, `ext:<id>`)
//! does two things:
//!
//! 1. **Bypass filtering** — any event sharing a pinned correlation
//!    key always renders, regardless of `/level`, `/grep`, `/source`,
//!    `/follow`, or mute state. The pin is louder than the filter.
//! 2. **Visual rail** — the renderer prepends a coloured pin glyph
//!    (`┃` in column 0) in the pin's assigned hue so the operator can
//!    track the thread across the stream.
//!
//! Pin colours cycle through a small palette so two simultaneous pins
//! are visually distinct.

use std::collections::BTreeMap;

use crate::stream::correlation_threader::CorrelationKind;
use crate::stream::event_line::EventLine;

/// Foreground colour assigned to each pinned correlation key. Rotates
/// across this palette in pin-order so two simultaneous pins read as
/// different threads.
const PIN_PALETTE: &[(&str, &str)] = &[
    ("violet", "\x1b[38;5;141m"),
    ("amber", "\x1b[38;5;215m"),
    ("green", "\x1b[38;5;84m"),
    ("rose", "\x1b[38;5;211m"),
    ("teal", "\x1b[38;5;80m"),
];

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct PinKey {
    pub kind: CorrelationKind,
    pub value: String,
}

impl PinKey {
    pub fn kind_label(&self) -> &'static str {
        match self.kind {
            CorrelationKind::Run => "run",
            CorrelationKind::Deploy => "deploy",
            CorrelationKind::Extension => "ext",
            CorrelationKind::InstallRun => "install",
        }
    }
}

impl std::str::FromStr for PinKey {
    type Err = String;

    fn from_str(input: &str) -> Result<Self, Self::Err> {
        let (kind, value) = input
            .split_once(':')
            .ok_or_else(|| "expected kind:id (run|deploy|ext)".to_string())?;
        let kind = match kind {
            "run" => CorrelationKind::Run,
            "deploy" | "deployment" => CorrelationKind::Deploy,
            "ext" | "extension" => CorrelationKind::Extension,
            "install" => CorrelationKind::InstallRun,
            other => return Err(format!("unknown kind '{other}'")),
        };
        if value.is_empty() {
            return Err("id is empty".into());
        }
        Ok(Self {
            kind,
            value: value.to_string(),
        })
    }
}

impl std::fmt::Display for PinKey {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}:{}", self.kind_label(), self.value)
    }
}

#[derive(Debug, Default)]
pub struct PinnedSet {
    /// Ordered map keyed by insertion-position for deterministic
    /// colour assignment. BTreeMap key includes a monotonic counter
    /// to preserve insertion order across edits.
    entries: Vec<PinEntry>,
}

#[derive(Debug, Clone)]
struct PinEntry {
    key: PinKey,
    palette_idx: usize,
}

impl PinnedSet {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn is_empty(&self) -> bool {
        self.entries.is_empty()
    }

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn iter(&self) -> impl Iterator<Item = (&PinKey, &'static str, &'static str)> + '_ {
        self.entries.iter().map(|e| {
            let (name, color) = PIN_PALETTE[e.palette_idx % PIN_PALETTE.len()];
            (&e.key, name, color)
        })
    }

    /// Pin a key. Returns `Some(color)` when the pin was newly added,
    /// `None` when the key was already pinned.
    pub fn pin(&mut self, key: PinKey) -> Option<&'static str> {
        if self.entries.iter().any(|e| e.key == key) {
            return None;
        }
        let idx = self.entries.len();
        self.entries.push(PinEntry {
            key,
            palette_idx: idx,
        });
        let (_, color) = PIN_PALETTE[idx % PIN_PALETTE.len()];
        Some(color)
    }

    /// Unpin a key. Returns `true` when the key was removed.
    pub fn unpin(&mut self, key: &PinKey) -> bool {
        if let Some(pos) = self.entries.iter().position(|e| &e.key == key) {
            self.entries.remove(pos);
            true
        } else {
            false
        }
    }

    pub fn clear(&mut self) -> usize {
        let n = self.entries.len();
        self.entries.clear();
        n
    }

    /// Returns the pin color this event matches (if any). Match order:
    /// run > deploy > extension > install_run.
    pub fn match_color(&self, line: &EventLine) -> Option<&'static str> {
        for entry in &self.entries {
            let value = match entry.key.kind {
                CorrelationKind::Run => line.correlation.run_id.as_deref(),
                CorrelationKind::Deploy => line.correlation.deployment_id.as_deref(),
                CorrelationKind::Extension => line.correlation.extension_id.as_deref(),
                CorrelationKind::InstallRun => line.correlation.install_run_id.as_deref(),
            };
            if value == Some(entry.key.value.as_str()) {
                let (_, color) = PIN_PALETTE[entry.palette_idx % PIN_PALETTE.len()];
                return Some(color);
            }
        }
        None
    }

    pub fn matches(&self, line: &EventLine) -> bool {
        self.match_color(line).is_some()
    }

    /// Render a tiny summary string for the `/pin` slash response and
    /// the `/mixer` drawer footer.
    pub fn summary(&self) -> BTreeMap<String, &'static str> {
        self.entries
            .iter()
            .map(|e| {
                let (_, color) = PIN_PALETTE[e.palette_idx % PIN_PALETTE.len()];
                (e.key.to_string(), color)
            })
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_events::types::NexusEvent;

    fn run_evt(run: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::NodeProgress {
            run_id: run.into(),
            node_id: "n".into(),
            percent: 0,
            message: "m".into(),
        })
    }

    fn pk(s: &str) -> Result<PinKey, String> {
        s.parse::<PinKey>()
    }

    #[test]
    fn pin_key_parses_known_kinds() {
        assert!(pk("run:abc").is_ok());
        assert!(pk("deploy:slug").is_ok());
        assert!(pk("ext:nexus.audio").is_ok());
    }

    #[test]
    fn pin_key_rejects_unknown_kind() {
        assert!(pk("garbage:abc").is_err());
    }

    #[test]
    fn pin_key_rejects_missing_value() {
        assert!(pk("run:").is_err());
    }

    #[test]
    fn pinning_assigns_distinct_colors() {
        let mut set = PinnedSet::new();
        let c1 = set.pin(pk("run:a").unwrap()).unwrap();
        let c2 = set.pin(pk("run:b").unwrap()).unwrap();
        assert_ne!(c1, c2, "second pin must receive a different colour");
    }

    #[test]
    fn duplicate_pin_returns_none() {
        let mut set = PinnedSet::new();
        let key = pk("run:a").unwrap();
        assert!(set.pin(key.clone()).is_some());
        assert!(set.pin(key).is_none());
    }

    #[test]
    fn unpin_removes_existing_key() {
        let mut set = PinnedSet::new();
        let key = pk("run:a").unwrap();
        set.pin(key.clone());
        assert!(set.unpin(&key));
        assert!(set.is_empty());
    }

    #[test]
    fn unpin_returns_false_for_missing_key() {
        let mut set = PinnedSet::new();
        let key = pk("run:missing").unwrap();
        assert!(!set.unpin(&key));
    }

    #[test]
    fn matches_returns_true_when_run_id_present() {
        let mut set = PinnedSet::new();
        set.pin("run:abc".parse::<PinKey>().unwrap());
        assert!(set.matches(&run_evt("abc")));
        assert!(!set.matches(&run_evt("other")));
    }

    #[test]
    fn match_color_returns_assigned_palette_color() {
        let mut set = PinnedSet::new();
        let expected = set.pin("run:abc".parse::<PinKey>().unwrap()).unwrap();
        let got = set.match_color(&run_evt("abc")).unwrap();
        assert_eq!(got, expected);
    }
}
