//! Bounded FIFO event store for the running TUI session.
//!
//! Events flow in unconditionally; eviction is oldest-first when capacity
//! is exceeded. The id-index lets `/inspect <event-id>` resolve in
//! O(log n) without scanning the deque.

use std::collections::{BTreeMap, VecDeque};

use crate::EventId;
use crate::stream::event_id::RingBufferCapacity;
use crate::stream::event_line::EventLine;

#[derive(Debug)]
pub struct RingBuffer {
    capacity: RingBufferCapacity,
    items: VecDeque<EventLine>,
    id_index: BTreeMap<EventId, usize>,
}

impl RingBuffer {
    pub fn new(capacity: RingBufferCapacity) -> Self {
        Self {
            capacity,
            items: VecDeque::with_capacity(capacity.get()),
            id_index: BTreeMap::new(),
        }
    }

    pub fn capacity(&self) -> usize {
        self.capacity.get()
    }

    pub fn len(&self) -> usize {
        self.items.len()
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }

    pub fn push(&mut self, event: EventLine) {
        if self.items.len() == self.capacity.get()
            && let Some(evicted) = self.items.pop_front()
        {
            self.id_index.remove(&evicted.id);
            self.shift_indices_left();
        }
        let id = event.id;
        let new_index = self.items.len();
        self.items.push_back(event);
        self.id_index.insert(id, new_index);
    }

    pub fn inspect_by_id(&self, id: EventId) -> Option<&EventLine> {
        let idx = self.id_index.get(&id).copied()?;
        self.items.get(idx)
    }

    pub fn iter(&self) -> impl DoubleEndedIterator<Item = &EventLine> {
        self.items.iter()
    }

    pub fn last(&self) -> Option<&EventLine> {
        self.items.back()
    }

    fn shift_indices_left(&mut self) {
        for value in self.id_index.values_mut() {
            *value = value.saturating_sub(1);
        }
    }
}
