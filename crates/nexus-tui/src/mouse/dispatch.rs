//! Pure mapping from a `(ClickTarget, double_click_state)` to the
//! slash command that should run.
//!
//! The runtime owns the keyboard / mouse event loop; this module owns
//! the *decision* about what each click means. Toggle semantics for
//! `/source` come from the caller's filter snapshot.

use crate::mouse::targets::ClickTarget;
use crate::repl::slash::ParsedCommand;
use crate::stream::filter::FollowTarget;

#[derive(Debug, Clone)]
pub enum ClickAction {
    Command(ParsedCommand),
    OpenContextMenu(ClickTarget),
    Noop,
}

pub fn left_click_action(target: &ClickTarget, current_source_filter: Option<&str>) -> ClickAction {
    match target {
        ClickTarget::EventLineBody { event_id } => {
            ClickAction::Command(ParsedCommand::Inspect(format!("{event_id}")))
        }
        ClickTarget::InspectorHeading { event_id } => {
            ClickAction::Command(ParsedCommand::Inspect(format!("{event_id}")))
        }
        ClickTarget::SourceLabel { source } => {
            if current_source_filter == Some(source.as_str()) {
                ClickAction::Command(ParsedCommand::ClearFilter)
            } else {
                ClickAction::Command(ParsedCommand::Source(source.clone()))
            }
        }
        ClickTarget::RunIdReference { run_id } => {
            ClickAction::Command(ParsedCommand::Follow(FollowTarget::Run(run_id.clone())))
        }
        ClickTarget::FilterIndicator => ClickAction::Command(ParsedCommand::ClearFilter),
        ClickTarget::Sparkline => ClickAction::Noop,
    }
}

pub fn right_click_action(target: &ClickTarget) -> ClickAction {
    ClickAction::OpenContextMenu(target.clone())
}
