//! Run dispatcher — pops `RuntimeQueue` entries and drives them to terminal state.

pub mod channels;
pub mod events;

pub use channels::{RunChannelRegistry, RunEventSender, RunEventReceiver};
pub use events::RunEvent;
