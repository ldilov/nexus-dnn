//! Click → command dispatch (T095-T098 logic).

use nexus_tui::EventId;
use nexus_tui::mouse::dispatch::{ClickAction, left_click_action, right_click_action};
use nexus_tui::mouse::targets::ClickTarget;
use nexus_tui::repl::slash::ParsedCommand;
use nexus_tui::stream::filter::FollowTarget;
use ulid::Ulid;

fn evid(seed: u128) -> EventId {
    EventId::from_ulid(Ulid::from(seed))
}

#[test]
fn event_line_body_click_opens_inspect() {
    let id = evid(42);
    let action = left_click_action(&ClickTarget::EventLineBody { event_id: id }, None);
    assert!(matches!(
        action,
        ClickAction::Command(ParsedCommand::Inspect(_))
    ));
}

#[test]
fn source_label_first_click_sets_source_filter() {
    let action = left_click_action(
        &ClickTarget::SourceLabel {
            source: "deploy:foo".into(),
        },
        None,
    );
    assert!(matches!(
        action,
        ClickAction::Command(ParsedCommand::Source(s)) if s == "deploy:foo"
    ));
}

#[test]
fn source_label_second_click_clears_filter() {
    let action = left_click_action(
        &ClickTarget::SourceLabel {
            source: "deploy:foo".into(),
        },
        Some("deploy:foo"),
    );
    assert!(matches!(
        action,
        ClickAction::Command(ParsedCommand::ClearFilter)
    ));
}

#[test]
fn run_id_click_follows_run() {
    let action = left_click_action(
        &ClickTarget::RunIdReference {
            run_id: "run_a".into(),
        },
        None,
    );
    assert!(matches!(
        action,
        ClickAction::Command(ParsedCommand::Follow(FollowTarget::Run(id))) if id == "run_a"
    ));
}

#[test]
fn filter_indicator_click_clears_all_filters() {
    let action = left_click_action(&ClickTarget::FilterIndicator, Some("anything"));
    assert!(matches!(
        action,
        ClickAction::Command(ParsedCommand::ClearFilter)
    ));
}

#[test]
fn sparkline_click_is_noop() {
    let action = left_click_action(&ClickTarget::Sparkline, None);
    assert!(matches!(action, ClickAction::Noop));
}

#[test]
fn right_click_opens_context_menu() {
    let action = right_click_action(&ClickTarget::EventLineBody { event_id: evid(1) });
    assert!(matches!(action, ClickAction::OpenContextMenu(_)));
}
