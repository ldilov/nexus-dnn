//! Identity newtypes for the TUI's session-local event store.

use std::fmt;
use std::num::NonZeroUsize;

use ulid::Ulid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct EventId(Ulid);

impl EventId {
    pub fn new() -> Self {
        Self(Ulid::new())
    }

    pub fn from_ulid(value: Ulid) -> Self {
        Self(value)
    }

    pub fn timestamp_ms(&self) -> u64 {
        self.0.timestamp_ms()
    }

    pub fn into_inner(self) -> Ulid {
        self.0
    }
}

impl Default for EventId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for EventId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::Display::fmt(&self.0, f)
    }
}

#[derive(Debug, thiserror::Error)]
pub enum RingBufferCapacityError {
    #[error("ring buffer capacity must be greater than zero")]
    Zero,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct RingBufferCapacity(NonZeroUsize);

impl RingBufferCapacity {
    pub fn new(value: usize) -> Result<Self, RingBufferCapacityError> {
        NonZeroUsize::new(value)
            .map(Self)
            .ok_or(RingBufferCapacityError::Zero)
    }

    pub fn from_non_zero(value: NonZeroUsize) -> Self {
        Self(value)
    }

    pub fn get(&self) -> usize {
        self.0.get()
    }
}
