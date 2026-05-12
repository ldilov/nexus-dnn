use std::collections::BTreeSet;

use crate::stream::event_line::{CorrelationKeys, EventLine};

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct SpotlightOverlay {
    sources: BTreeSet<String>,
    correlation_keys: BTreeSet<String>,
}

impl SpotlightOverlay {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn add(&mut self, line: &EventLine) {
        self.sources.insert(line.source.clone());
        for key in correlation_values(&line.correlation) {
            self.correlation_keys.insert(key);
        }
    }

    pub fn remove(&mut self, line: &EventLine) {
        self.sources.remove(&line.source);
        for key in correlation_values(&line.correlation) {
            self.correlation_keys.remove(&key);
        }
    }

    pub fn clear(&mut self) {
        self.sources.clear();
        self.correlation_keys.clear();
    }

    pub fn is_active(&self) -> bool {
        !self.sources.is_empty() || !self.correlation_keys.is_empty()
    }

    pub fn includes(&self, line: &EventLine) -> bool {
        if !self.is_active() {
            return true;
        }
        if self.sources.contains(&line.source) {
            return true;
        }
        correlation_values(&line.correlation)
            .iter()
            .any(|key| self.correlation_keys.contains(key))
    }

    pub fn source_count(&self) -> usize {
        self.sources.len()
    }

    pub fn correlation_count(&self) -> usize {
        self.correlation_keys.len()
    }
}

fn correlation_values(keys: &CorrelationKeys) -> Vec<String> {
    [
        keys.run_id.clone(),
        keys.deployment_id.clone(),
        keys.extension_id.clone(),
        keys.install_run_id.clone(),
    ]
    .into_iter()
    .flatten()
    .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::event_id::EventId;
    use crate::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
    use crate::stream::severity::Severity;
    use crate::stream::significance::Significance;
    use crate::stream::source_category::SourceCategory;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;
    use std::sync::Arc;

    fn line(source: &str, run_id: Option<&str>) -> EventLine {
        let correlation = CorrelationKeys {
            run_id: run_id.map(|s| s.to_string()),
            deployment_id: None,
            extension_id: None,
            install_run_id: None,
        };
        EventLine {
            id: EventId::new(),
            timestamp_ms: 0,
            severity: Severity::Info,
            significance: Significance::Normal,
            category: SourceCategory::Storage,
            source: source.into(),
            summary: "summary".into(),
            correlation,
            raw_payload: Arc::new(RawPayload::NexusEvent(NexusEvent::HostLog {
                timestamp_ms: 0,
                level: "info".into(),
                target: "test".into(),
                message: "msg".into(),
                fields: BTreeMap::new(),
                span_path: None,
            })),
        }
    }

    #[test]
    fn empty_overlay_includes_everything() {
        let overlay = SpotlightOverlay::new();
        let event = line("anything", Some("abc"));
        assert!(overlay.includes(&event));
        assert!(!overlay.is_active());
    }

    #[test]
    fn add_widens_to_include_source_and_run_id() {
        let mut overlay = SpotlightOverlay::new();
        overlay.add(&line("runtime", Some("corr-1")));
        assert!(overlay.is_active());
        assert_eq!(overlay.source_count(), 1);
        assert_eq!(overlay.correlation_count(), 1);
    }

    #[test]
    fn active_overlay_excludes_non_matching_events() {
        let mut overlay = SpotlightOverlay::new();
        overlay.add(&line("runtime", Some("corr-1")));
        let other = line("scheduler", Some("corr-9"));
        assert!(!overlay.includes(&other));
    }

    #[test]
    fn active_overlay_includes_events_matching_source() {
        let mut overlay = SpotlightOverlay::new();
        overlay.add(&line("runtime", Some("corr-1")));
        let same_source = line("runtime", Some("corr-9"));
        assert!(overlay.includes(&same_source));
    }

    #[test]
    fn active_overlay_includes_events_sharing_a_correlation_key() {
        let mut overlay = SpotlightOverlay::new();
        overlay.add(&line("runtime", Some("corr-1")));
        let shared_corr = line("scheduler", Some("corr-1"));
        assert!(overlay.includes(&shared_corr));
    }

    #[test]
    fn remove_narrows_overlay() {
        let mut overlay = SpotlightOverlay::new();
        let event = line("runtime", Some("corr-1"));
        overlay.add(&event);
        overlay.remove(&event);
        assert!(!overlay.is_active());
    }

    #[test]
    fn clear_resets_overlay_to_empty() {
        let mut overlay = SpotlightOverlay::new();
        overlay.add(&line("runtime", Some("corr-1")));
        overlay.add(&line("scheduler", Some("corr-2")));
        overlay.clear();
        assert!(!overlay.is_active());
    }
}
