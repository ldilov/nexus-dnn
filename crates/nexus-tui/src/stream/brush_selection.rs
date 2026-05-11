//! Cluster-C — "Paint Filters" brush selection.
//!
//! Holds an ordered list of event IDs the operator has picked as
//! examples. `/yank` consumes the selection, resolves each ID against
//! the ring buffer, and runs `filter_inference::infer_from` to derive
//! a `/source` + `/level` + `/grep` filter.
//!
//! Selections are intentionally unbounded (operators rarely brush more
//! than a dozen events at once; the ring buffer is the size cap).

use crate::EventId;

#[derive(Debug, Default, Clone)]
pub struct BrushSelection {
    ids: Vec<EventId>,
}

impl BrushSelection {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn len(&self) -> usize {
        self.ids.len()
    }

    pub fn is_empty(&self) -> bool {
        self.ids.is_empty()
    }

    pub fn as_slice(&self) -> &[EventId] {
        &self.ids
    }

    /// Add an event ID to the selection. Idempotent — duplicates are
    /// silently skipped so brush gestures can be called repeatedly
    /// without bookkeeping.
    pub fn add(&mut self, id: EventId) -> bool {
        if self.ids.contains(&id) {
            return false;
        }
        self.ids.push(id);
        true
    }

    /// Remove a specific event from the selection.
    pub fn remove(&mut self, id: &EventId) -> bool {
        if let Some(idx) = self.ids.iter().position(|x| x == id) {
            self.ids.remove(idx);
            true
        } else {
            false
        }
    }

    pub fn clear(&mut self) -> usize {
        let n = self.ids.len();
        self.ids.clear();
        n
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use ulid::Ulid;

    fn fresh_id() -> EventId {
        EventId::from_ulid(Ulid::new())
    }

    #[test]
    fn fresh_selection_is_empty() {
        let s = BrushSelection::new();
        assert!(s.is_empty());
        assert_eq!(s.len(), 0);
    }

    #[test]
    fn add_appends_id() {
        let mut s = BrushSelection::new();
        let id = fresh_id();
        assert!(s.add(id));
        assert_eq!(s.len(), 1);
    }

    #[test]
    fn add_is_idempotent_on_duplicates() {
        let mut s = BrushSelection::new();
        let id = fresh_id();
        assert!(s.add(id));
        assert!(!s.add(id), "duplicate must return false");
        assert_eq!(s.len(), 1);
    }

    #[test]
    fn remove_returns_true_when_present() {
        let mut s = BrushSelection::new();
        let id = fresh_id();
        s.add(id);
        assert!(s.remove(&id));
        assert!(s.is_empty());
    }

    #[test]
    fn remove_returns_false_when_absent() {
        let mut s = BrushSelection::new();
        let id = fresh_id();
        assert!(!s.remove(&id));
    }

    #[test]
    fn clear_drains_and_reports_count() {
        let mut s = BrushSelection::new();
        s.add(fresh_id());
        s.add(fresh_id());
        s.add(fresh_id());
        assert_eq!(s.clear(), 3);
        assert!(s.is_empty());
    }

    #[test]
    fn preserves_insertion_order() {
        let mut s = BrushSelection::new();
        let a = fresh_id();
        let b = fresh_id();
        let c = fresh_id();
        s.add(a);
        s.add(b);
        s.add(c);
        assert_eq!(s.as_slice(), &[a, b, c]);
    }
}
