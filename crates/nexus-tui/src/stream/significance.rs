//! Intrinsic significance rating for events and the display predicate.
//!
//! Each event variant gets a hardcoded `Significance` that, composed with
//! the operator's severity floor, decides whether the event prints to
//! ambient. The composition is a pure function — no I/O, no globals.

use nexus_events::types::NexusEvent;

use crate::stream::severity::Severity;
use crate::stream::source_category::{
    SourceCategory, classify_nexus_event, classify_nexus_event_significance,
};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Significance {
    Silent,
    Hum,
    Normal,
    Loud,
    Critical,
}

pub fn should_display(significance: Significance, severity: Severity, floor: Severity) -> bool {
    let visible_at_level = match significance {
        Significance::Silent => false,
        Significance::Hum => floor <= Severity::Debug,
        Significance::Normal => floor <= Severity::Info,
        Significance::Loud => floor <= Severity::Error,
        Significance::Critical => true,
    };
    visible_at_level && severity >= floor
}

/// Public lookup of `(Significance, SourceCategory)` for any
/// `NexusEvent`. Composes the two pure functions already declared on
/// `source_category` so callers have a single dispatch point.
pub fn classify(event: &NexusEvent) -> (Significance, SourceCategory) {
    (
        classify_nexus_event_significance(event),
        classify_nexus_event(event),
    )
}
