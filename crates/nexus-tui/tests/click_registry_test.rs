//! T089 — `ClickRegistry` add / remove / lookup / row-shift bookkeeping.

use nexus_tui::EventId;
use nexus_tui::mouse::targets::{ClickRegistry, ClickTarget};
use ulid::Ulid;

fn evid(seed: u128) -> EventId {
    EventId::from_ulid(Ulid::from(seed))
}

#[test]
fn register_and_lookup_by_coords() {
    let mut reg = ClickRegistry::default();
    let id = evid(1);
    reg.register(10, 4..40, ClickTarget::EventLineBody { event_id: id });
    let hit = reg.lookup(10, 12);
    assert!(matches!(hit, Some(ClickTarget::EventLineBody { event_id }) if event_id == id));
}

#[test]
fn lookup_outside_col_range_misses() {
    let mut reg = ClickRegistry::default();
    let id = evid(1);
    reg.register(10, 4..40, ClickTarget::EventLineBody { event_id: id });
    assert!(reg.lookup(10, 50).is_none());
    assert!(reg.lookup(10, 0).is_none());
}

#[test]
fn lookup_wrong_row_misses() {
    let mut reg = ClickRegistry::default();
    reg.register(10, 4..40, ClickTarget::EventLineBody { event_id: evid(1) });
    assert!(reg.lookup(11, 12).is_none());
}

#[test]
fn shift_rows_up_after_new_render() {
    let mut reg = ClickRegistry::default();
    reg.register(10, 4..40, ClickTarget::EventLineBody { event_id: evid(1) });
    reg.shift_rows_up(2);
    assert!(reg.lookup(10, 12).is_none());
    assert!(reg.lookup(8, 12).is_some());
}

#[test]
fn entries_at_or_below_zero_after_shift_are_evicted() {
    let mut reg = ClickRegistry::default();
    reg.register(1, 0..10, ClickTarget::EventLineBody { event_id: evid(1) });
    reg.shift_rows_up(5);
    assert!(reg.lookup(0, 5).is_none());
}

#[test]
fn clear_drops_all_entries() {
    let mut reg = ClickRegistry::default();
    reg.register(10, 4..40, ClickTarget::EventLineBody { event_id: evid(1) });
    reg.clear();
    assert!(reg.lookup(10, 12).is_none());
}

#[test]
fn source_label_target_round_trip() {
    let mut reg = ClickRegistry::default();
    reg.register(
        5,
        50..70,
        ClickTarget::SourceLabel {
            source: "deploy:foo".into(),
        },
    );
    let hit = reg.lookup(5, 60);
    assert!(matches!(hit, Some(ClickTarget::SourceLabel { source }) if source == "deploy:foo"));
}
