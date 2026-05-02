//! In-memory registry of in-flight suggestion streams.
//!
//! Maps `StreamId` → `CancelFlag` so the cancel endpoint can flip the
//! flag without round-tripping through the streaming task. Entries are
//! removed when the stream task finishes (either cleanly or via cancel /
//! disconnect) — the cancel endpoint is idempotent on missing ids per
//! `contracts/draft_suggestions.openapi.yaml`.
//!
//! Lifetime: bound to the `AppState` (one registry per host process).

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use super::provider::CancelFlag;
use super::types::StreamId;

#[derive(Default)]
pub struct StreamRegistry {
    inner: Mutex<HashMap<StreamId, CancelFlag>>,
}

impl StreamRegistry {
    pub fn new() -> Arc<Self> {
        Arc::new(Self::default())
    }

    pub fn insert(&self, id: StreamId, flag: CancelFlag) {
        self.inner
            .lock()
            .expect("registry mutex poisoned")
            .insert(id, flag);
    }

    pub fn remove(&self, id: &StreamId) -> Option<CancelFlag> {
        self.inner
            .lock()
            .expect("registry mutex poisoned")
            .remove(id)
    }

    /// Idempotent. Returns true if a stream was present and got
    /// signalled; false otherwise (already finished or unknown).
    pub fn cancel(&self, id: &StreamId) -> bool {
        let flag = self.inner.lock().expect("registry mutex poisoned").get(id).cloned();
        if let Some(f) = flag {
            f.cancel();
            true
        } else {
            false
        }
    }

    pub fn live_count(&self) -> usize {
        self.inner.lock().expect("registry mutex poisoned").len()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cancel_unknown_id_is_idempotent_false() {
        let reg = StreamRegistry::new();
        assert!(!reg.cancel(&StreamId::new()));
    }

    #[test]
    fn insert_then_cancel_flips_flag() {
        let reg = StreamRegistry::new();
        let id = StreamId::new();
        let flag = CancelFlag::new();
        reg.insert(id, flag.clone());
        assert!(reg.cancel(&id));
        assert!(flag.is_cancelled());
    }

    #[test]
    fn remove_returns_flag_once() {
        let reg = StreamRegistry::new();
        let id = StreamId::new();
        let flag = CancelFlag::new();
        reg.insert(id, flag);
        assert!(reg.remove(&id).is_some());
        assert!(reg.remove(&id).is_none());
    }

    #[test]
    fn live_count_tracks_inserts_and_removes() {
        let reg = StreamRegistry::new();
        assert_eq!(reg.live_count(), 0);
        let id1 = StreamId::new();
        let id2 = StreamId::new();
        reg.insert(id1, CancelFlag::new());
        reg.insert(id2, CancelFlag::new());
        assert_eq!(reg.live_count(), 2);
        reg.remove(&id1);
        assert_eq!(reg.live_count(), 1);
    }
}
