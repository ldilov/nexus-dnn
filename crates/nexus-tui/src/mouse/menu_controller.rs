//! Stateful right-click menu navigation.
//!
//! The pure-fn rendering and item assembly already live in
//! [`super::menu`]. This module owns the modal *navigation state* the
//! runtime task drives: which items are showing, which row is currently
//! highlighted, and what to emit when the user picks one.
//!
//! Driven by [`super::super::repl::mouse_edit_mode::MenuKey`] events
//! delivered from the EditMode shim while
//! [`super::super::repl::mouse_edit_mode::MenuFocus`] is open.

use crate::mouse::menu::{MenuChoice, MenuItem, menu_items_for};
use crate::mouse::targets::ClickTarget;

#[derive(Debug, Default)]
pub struct MenuController {
    state: Option<OpenMenu>,
}

#[derive(Debug, Clone)]
pub struct OpenMenu {
    pub target: ClickTarget,
    pub items: Vec<MenuItem>,
    pub selected: usize,
    pub anchor: (u16, u16),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum NavOutcome {
    Closed,
    Selected(MenuChoice, ClickTarget),
    StillOpen,
}

impl MenuController {
    pub fn open(&mut self, target: ClickTarget, anchor: (u16, u16)) -> Option<&OpenMenu> {
        let items = menu_items_for(&target);
        if items.is_empty() {
            return None;
        }
        self.state = Some(OpenMenu {
            target,
            items,
            selected: 0,
            anchor,
        });
        self.state.as_ref()
    }

    pub fn snapshot(&self) -> Option<&OpenMenu> {
        self.state.as_ref()
    }

    pub fn is_open(&self) -> bool {
        self.state.is_some()
    }

    pub fn move_up(&mut self) {
        if let Some(open) = self.state.as_mut() {
            if open.items.is_empty() {
                return;
            }
            if open.selected == 0 {
                open.selected = open.items.len() - 1;
            } else {
                open.selected -= 1;
            }
        }
    }

    pub fn move_down(&mut self) {
        if let Some(open) = self.state.as_mut() {
            if open.items.is_empty() {
                return;
            }
            open.selected = (open.selected + 1) % open.items.len();
        }
    }

    pub fn confirm(&mut self) -> NavOutcome {
        let Some(open) = self.state.take() else {
            return NavOutcome::Closed;
        };
        let Some(item) = open.items.get(open.selected) else {
            return NavOutcome::Closed;
        };
        if matches!(item.choice, MenuChoice::Cancel) {
            return NavOutcome::Closed;
        }
        NavOutcome::Selected(item.choice.clone(), open.target)
    }

    pub fn cancel(&mut self) -> NavOutcome {
        self.state = None;
        NavOutcome::Closed
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::EventId;

    fn body_target() -> ClickTarget {
        ClickTarget::EventLineBody {
            event_id: EventId::new(),
        }
    }

    #[test]
    fn open_returns_items_and_anchor() {
        let mut ctl = MenuController::default();
        let snap = ctl.open(body_target(), (3, 4)).cloned();
        assert!(snap.is_some());
        let snap = snap.unwrap();
        assert!(!snap.items.is_empty());
        assert_eq!(snap.selected, 0);
        assert_eq!(snap.anchor, (3, 4));
        assert!(ctl.is_open());
    }

    #[test]
    fn move_down_wraps() {
        let mut ctl = MenuController::default();
        ctl.open(body_target(), (0, 0));
        let len = ctl.snapshot().unwrap().items.len();
        for _ in 0..len {
            ctl.move_down();
        }
        assert_eq!(ctl.snapshot().unwrap().selected, 0);
    }

    #[test]
    fn move_up_from_zero_wraps_to_last() {
        let mut ctl = MenuController::default();
        ctl.open(body_target(), (0, 0));
        let len = ctl.snapshot().unwrap().items.len();
        ctl.move_up();
        assert_eq!(ctl.snapshot().unwrap().selected, len - 1);
    }

    #[test]
    fn confirm_returns_selected_choice_and_closes() {
        let mut ctl = MenuController::default();
        let target = body_target();
        ctl.open(target.clone(), (0, 0));
        ctl.move_down();
        let selected_choice = ctl.snapshot().unwrap().items[1].choice.clone();
        let outcome = ctl.confirm();
        assert_eq!(outcome, NavOutcome::Selected(selected_choice, target));
        assert!(!ctl.is_open());
    }

    #[test]
    fn cancel_closes_without_emit() {
        let mut ctl = MenuController::default();
        ctl.open(body_target(), (0, 0));
        let outcome = ctl.cancel();
        assert_eq!(outcome, NavOutcome::Closed);
        assert!(!ctl.is_open());
    }

    #[test]
    fn confirm_on_cancel_choice_closes_silently() {
        let mut ctl = MenuController::default();
        ctl.open(ClickTarget::FilterIndicator, (0, 0));
        let snap = ctl.snapshot().unwrap();
        let cancel_idx = snap
            .items
            .iter()
            .position(|i| matches!(i.choice, MenuChoice::Cancel))
            .expect("FilterIndicator menu has Cancel");
        for _ in 0..cancel_idx {
            ctl.move_down();
        }
        let outcome = ctl.confirm();
        assert_eq!(outcome, NavOutcome::Closed);
        assert!(!ctl.is_open());
    }
}
