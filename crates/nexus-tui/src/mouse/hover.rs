//! Spec 044 T100 — hover affordance state.
//!
//! Pre-render styling of source labels and run-id glyphs requires
//! knowing what the mouse is currently over. crossterm's default mouse
//! capture (SGR 1006 + button-event tracking) emits `MouseEventKind::Moved`
//! only while a button is held; truly motion-without-button reporting
//! needs the heavier `?1003h` "any motion" mode, which we leave off by
//! default per research.md decision 5 (event volume).
//!
//! This module exposes a small atomic snapshot of the *most recently
//! observed pointer position* plus a derived "hovered target" lookup
//! resolved against the live `ClickRegistry`. Renderers that emit a
//! source label or run-id glyph consult [`HoverState::active_for`] at
//! print time and apply the affordance (underline / bright accent) when
//! the predicted column range matches the hover target.
//!
//! When any-motion mode is *not* enabled (the default) the hover state
//! still captures Down/Up/Drag positions, which is enough to give a
//! click-feedback style on press — useful for the keyboard-only triage
//! flow described in FR-046.

use std::sync::Mutex;

use crate::mouse::targets::{ClickRegistry, ClickTarget};

#[derive(Debug, Default)]
pub struct HoverState {
    inner: Mutex<HoverInner>,
}

#[derive(Debug, Default, Clone)]
struct HoverInner {
    last_pos: Option<(u16, u16)>,
    last_target: Option<ClickTarget>,
}

impl HoverState {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn observe(&self, row: u16, col: u16, registry: &ClickRegistry) {
        let target = registry.lookup(row, col);
        let mut inner = self.inner.lock().unwrap_or_else(|p| p.into_inner());
        inner.last_pos = Some((row, col));
        inner.last_target = target;
    }

    pub fn clear(&self) {
        let mut inner = self.inner.lock().unwrap_or_else(|p| p.into_inner());
        inner.last_pos = None;
        inner.last_target = None;
    }

    pub fn active_for(&self, candidate: &ClickTarget) -> bool {
        let inner = self.inner.lock().unwrap_or_else(|p| p.into_inner());
        inner.last_target.as_ref() == Some(candidate)
    }

    pub fn snapshot(&self) -> (Option<(u16, u16)>, Option<ClickTarget>) {
        let inner = self.inner.lock().unwrap_or_else(|p| p.into_inner());
        (inner.last_pos, inner.last_target.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::EventId;

    fn registry_with(target: ClickTarget, row: u16, range: std::ops::Range<u16>) -> ClickRegistry {
        let mut reg = ClickRegistry::default();
        reg.register(row, range, target);
        reg
    }

    #[test]
    fn observe_records_hovered_target() {
        let target = ClickTarget::SourceLabel {
            source: "scheduler".into(),
        };
        let reg = registry_with(target.clone(), 0, 4..12);
        let hover = HoverState::new();
        hover.observe(0, 6, &reg);
        assert!(hover.active_for(&target));
    }

    #[test]
    fn observe_outside_range_clears_target() {
        let target = ClickTarget::SourceLabel {
            source: "scheduler".into(),
        };
        let reg = registry_with(target.clone(), 0, 4..12);
        let hover = HoverState::new();
        hover.observe(0, 6, &reg);
        assert!(hover.active_for(&target));

        hover.observe(0, 30, &reg);
        assert!(!hover.active_for(&target));
    }

    #[test]
    fn clear_resets_state() {
        let target = ClickTarget::EventLineBody {
            event_id: EventId::new(),
        };
        let reg = registry_with(target.clone(), 1, 0..40);
        let hover = HoverState::new();
        hover.observe(1, 5, &reg);
        assert!(hover.active_for(&target));
        hover.clear();
        assert!(!hover.active_for(&target));
        assert_eq!(hover.snapshot().0, None);
    }

    #[test]
    fn snapshot_returns_last_pos_and_target() {
        let target = ClickTarget::Sparkline;
        let reg = registry_with(target.clone(), 1, 70..80);
        let hover = HoverState::new();
        hover.observe(1, 75, &reg);
        let (pos, t) = hover.snapshot();
        assert_eq!(pos, Some((1, 75)));
        assert_eq!(t, Some(target));
    }
}
