use crate::stream::event_line::EventLine;
use crate::stream::filter::FilterState;
use crate::stream::severity::Severity;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct FilterBreakdown {
    pub total: usize,
    pub visible: usize,
    pub hidden_debug: usize,
    pub hidden_info: usize,
    pub hidden_warn: usize,
    pub hidden_error: usize,
    pub hidden_fatal: usize,
}

impl FilterBreakdown {
    pub fn hidden(&self) -> usize {
        self.total.saturating_sub(self.visible)
    }

    pub fn dominant_hidden_severity(&self) -> Option<(Severity, usize)> {
        let candidates = [
            (Severity::Fatal, self.hidden_fatal),
            (Severity::Error, self.hidden_error),
            (Severity::Warn, self.hidden_warn),
            (Severity::Info, self.hidden_info),
            (Severity::Debug, self.hidden_debug),
        ];
        candidates
            .into_iter()
            .filter(|(_, count)| *count > 0)
            .max_by_key(|(_, count)| *count)
    }
}

pub fn compute_breakdown<'a, I>(filter: &FilterState, events: I) -> FilterBreakdown
where
    I: IntoIterator<Item = &'a EventLine>,
{
    let mut report = FilterBreakdown::default();
    for line in events {
        report.total += 1;
        if filter.is_visible(line) {
            report.visible += 1;
        } else {
            match line.severity {
                Severity::Debug => report.hidden_debug += 1,
                Severity::Info => report.hidden_info += 1,
                Severity::Warn => report.hidden_warn += 1,
                Severity::Error => report.hidden_error += 1,
                Severity::Fatal => report.hidden_fatal += 1,
            }
        }
    }
    report
}

pub fn format_breakdown(report: FilterBreakdown) -> String {
    let total = report.total;
    let visible = report.visible;
    let hidden = report.hidden();
    if hidden == 0 {
        return format!("{visible}/{total} visible");
    }
    match report.dominant_hidden_severity() {
        Some((severity, count)) => {
            let pct = ((count as f32 / hidden as f32) * 100.0).round() as u32;
            format!(
                "{visible}/{total} visible · {hidden} hidden ({pct}% {label})",
                label = severity.as_str(),
            )
        }
        None => format!("{visible}/{total} visible · {hidden} hidden"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::event_id::EventId;
    use crate::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
    use crate::stream::significance::Significance;
    use crate::stream::source_category::SourceCategory;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;
    use std::sync::Arc;

    fn make_event(severity: Severity, _id: &str) -> EventLine {
        EventLine {
            id: EventId::new(),
            timestamp_ms: 0,
            severity,
            significance: Significance::Normal,
            category: SourceCategory::Storage,
            source: "test".into(),
            summary: "summary".into(),
            correlation: CorrelationKeys::default(),
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
    fn breakdown_counts_visible_against_filter_floor() {
        let mut filter = FilterState::default();
        filter.set_level_floor(Severity::Warn);
        let events = vec![
            make_event(Severity::Info, "a"),
            make_event(Severity::Warn, "b"),
            make_event(Severity::Error, "c"),
            make_event(Severity::Debug, "d"),
        ];
        let report = compute_breakdown(&filter, &events);
        assert_eq!(report.total, 4);
        assert_eq!(report.visible, 2);
        assert_eq!(report.hidden_info, 1);
        assert_eq!(report.hidden_debug, 1);
    }

    #[test]
    fn dominant_hidden_severity_returns_highest_count() {
        let report = FilterBreakdown {
            total: 10,
            visible: 2,
            hidden_info: 6,
            hidden_warn: 2,
            ..Default::default()
        };
        let (severity, count) = report.dominant_hidden_severity().unwrap();
        assert_eq!(severity, Severity::Info);
        assert_eq!(count, 6);
    }

    #[test]
    fn format_breakdown_lists_counts_and_dominant_share() {
        let mut filter = FilterState::default();
        filter.set_level_floor(Severity::Warn);
        let events: Vec<_> = (0..10)
            .map(|i| {
                let severity = if i < 7 {
                    Severity::Info
                } else {
                    Severity::Warn
                };
                make_event(severity, &format!("e{i}"))
            })
            .collect();
        let report = compute_breakdown(&filter, &events);
        let formatted = format_breakdown(report);
        assert!(formatted.contains("3/10 visible"));
        assert!(formatted.contains("7 hidden"));
        assert!(formatted.contains("info"));
    }

    #[test]
    fn format_breakdown_collapses_when_nothing_hidden() {
        let report = FilterBreakdown {
            total: 5,
            visible: 5,
            ..Default::default()
        };
        let formatted = format_breakdown(report);
        assert_eq!(formatted, "5/5 visible");
    }
}
