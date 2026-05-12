//! Right-click context menu.
//!
//! Renders an inline ANSI menu with arrow-key navigation. Selecting an
//! entry returns a `MenuChoice` so the caller can dispatch the
//! appropriate slash command.

use crate::mouse::targets::ClickTarget;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum MenuChoice {
    Inspect,
    CopyLine,
    CopyRawPayload,
    FilterToSource,
    FollowRun,
    OpenInDesktop,
    ClearFilter,
    Cancel,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MenuItem {
    pub label: &'static str,
    pub choice: MenuChoice,
}

pub fn menu_items_for(target: &ClickTarget) -> Vec<MenuItem> {
    let mut items: Vec<MenuItem> = Vec::new();
    match target {
        ClickTarget::EventLineBody { .. } | ClickTarget::InspectorHeading { .. } => {
            items.push(MenuItem {
                label: "Inspect",
                choice: MenuChoice::Inspect,
            });
            items.push(MenuItem {
                label: "Copy line",
                choice: MenuChoice::CopyLine,
            });
            items.push(MenuItem {
                label: "Copy raw payload",
                choice: MenuChoice::CopyRawPayload,
            });
            items.push(MenuItem {
                label: "Filter to source",
                choice: MenuChoice::FilterToSource,
            });
            items.push(MenuItem {
                label: "Follow run",
                choice: MenuChoice::FollowRun,
            });
            items.push(MenuItem {
                label: "Open in desktop UI",
                choice: MenuChoice::OpenInDesktop,
            });
        }
        ClickTarget::SourceLabel { .. } => {
            items.push(MenuItem {
                label: "Filter to source",
                choice: MenuChoice::FilterToSource,
            });
            items.push(MenuItem {
                label: "Copy label",
                choice: MenuChoice::CopyLine,
            });
        }
        ClickTarget::RunIdReference { .. } => {
            items.push(MenuItem {
                label: "Follow run",
                choice: MenuChoice::FollowRun,
            });
            items.push(MenuItem {
                label: "Copy run id",
                choice: MenuChoice::CopyLine,
            });
        }
        ClickTarget::FilterIndicator => {
            items.push(MenuItem {
                label: "Clear active filters",
                choice: MenuChoice::ClearFilter,
            });
            items.push(MenuItem {
                label: "Cancel",
                choice: MenuChoice::Cancel,
            });
        }
        ClickTarget::Sparkline => {
            items.push(MenuItem {
                label: "Cancel",
                choice: MenuChoice::Cancel,
            });
        }
        ClickTarget::InspectorSection { .. } => {
            items.push(MenuItem {
                label: "Toggle section",
                choice: MenuChoice::Inspect,
            });
            items.push(MenuItem {
                label: "Cancel",
                choice: MenuChoice::Cancel,
            });
        }
    }
    items
}

pub fn render_menu(items: &[MenuItem], selected: usize) -> String {
    debug_assert!(
        items.is_empty() || selected < items.len(),
        "render_menu: selected={selected} out of bounds for {} items",
        items.len()
    );
    let clamped = if items.is_empty() {
        0
    } else {
        selected.min(items.len() - 1)
    };
    let mut out = String::new();
    for (i, item) in items.iter().enumerate() {
        let marker = if i == clamped { "▶" } else { " " };
        out.push_str(&format!("  {marker} {}\n", item.label));
    }
    out
}
