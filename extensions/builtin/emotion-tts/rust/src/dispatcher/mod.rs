//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels; // TODO(Task 2): channels module not yet implemented
pub mod events;

pub use events::RunEvent;
