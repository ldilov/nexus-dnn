//! Ambient event hold queue used while a slash command is rendering.
//!
//! When a command is in flight, ambient events are deferred so the
//! command's output is not interleaved. Cap at 50; events past the cap
//! are still recorded by the ring buffer (this queue does not own
//! ring-buffer-side state) but are counted as overflow.

use std::collections::VecDeque;

use crate::stream::event_line::EventLine;

pub const HOLD_QUEUE_CAP: usize = 50;

#[derive(Debug)]
pub struct HoldQueue {
    capacity: usize,
    items: VecDeque<EventLine>,
    overflow: u64,
    holding: bool,
}

impl Default for HoldQueue {
    fn default() -> Self {
        Self {
            capacity: HOLD_QUEUE_CAP,
            items: VecDeque::with_capacity(HOLD_QUEUE_CAP),
            overflow: 0,
            holding: false,
        }
    }
}

#[derive(Debug)]
pub enum EnqueueResult {
    Held,
    Overflow,
    Passthrough(EventLine),
}

#[derive(Debug, Default)]
pub struct FlushReport {
    pub flushed: Vec<EventLine>,
    pub overflow_count: u64,
}

impl HoldQueue {
    pub fn set_holding(&mut self, holding: bool) {
        self.holding = holding;
    }

    pub fn is_holding(&self) -> bool {
        self.holding
    }

    pub fn try_enqueue(&mut self, line: EventLine) -> EnqueueResult {
        if !self.holding {
            return EnqueueResult::Passthrough(line);
        }
        if self.items.len() < self.capacity {
            self.items.push_back(line);
            EnqueueResult::Held
        } else {
            self.overflow = self.overflow.saturating_add(1);
            EnqueueResult::Overflow
        }
    }

    pub fn flush(&mut self) -> FlushReport {
        let flushed: Vec<EventLine> = self.items.drain(..).collect();
        let overflow_count = self.overflow;
        self.overflow = 0;
        FlushReport {
            flushed,
            overflow_count,
        }
    }

    pub fn pending(&self) -> usize {
        self.items.len()
    }
}
