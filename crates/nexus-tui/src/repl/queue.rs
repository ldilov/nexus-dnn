//! Command lifecycle bookkeeping.
//!
//! Ctrl+C semantics (FR-018):
//! - in_flight present  → cancel that command; do not touch pending
//! - in_flight absent + pending non-empty → drop pending head
//! - both empty → no-op
//!
//! The actual cancellation work is owned by the runtime — the queue
//! signals via `cancel_token`.

use std::collections::VecDeque;
use std::time::Instant;

use tokio_util::sync::CancellationToken;

use crate::repl::slash::ParsedCommand;

#[derive(Debug)]
pub struct RunningCommand {
    pub command: ParsedCommand,
    pub cancel_token: CancellationToken,
    pub started_at: Instant,
}

#[derive(Debug, Default)]
pub struct CommandQueue {
    in_flight: Option<RunningCommand>,
    pending: VecDeque<ParsedCommand>,
}

#[derive(Debug)]
pub struct DispatchResult {
    pub started: bool,
}

#[derive(Debug)]
pub enum CtrlCOutcome {
    CancelledInFlight,
    DroppedQueueHead(ParsedCommand),
    Idle,
}

impl CommandQueue {
    pub fn dispatch(&mut self, command: ParsedCommand) -> DispatchResult {
        if self.in_flight.is_some() {
            self.pending.push_back(command);
            DispatchResult { started: false }
        } else {
            self.in_flight = Some(RunningCommand {
                command,
                cancel_token: CancellationToken::new(),
                started_at: Instant::now(),
            });
            DispatchResult { started: true }
        }
    }

    pub fn finish_in_flight(&mut self) -> Option<ParsedCommand> {
        self.in_flight = None;
        let next = self.pending.pop_front();
        if let Some(cmd) = next.clone() {
            self.in_flight = Some(RunningCommand {
                command: cmd,
                cancel_token: CancellationToken::new(),
                started_at: Instant::now(),
            });
        }
        next
    }

    pub fn handle_ctrl_c(&mut self) -> CtrlCOutcome {
        if let Some(running) = self.in_flight.as_ref() {
            running.cancel_token.cancel();
            return CtrlCOutcome::CancelledInFlight;
        }
        if let Some(dropped) = self.pending.pop_front() {
            return CtrlCOutcome::DroppedQueueHead(dropped);
        }
        CtrlCOutcome::Idle
    }

    pub fn in_flight(&self) -> Option<&RunningCommand> {
        self.in_flight.as_ref()
    }

    pub fn pending(&self) -> &VecDeque<ParsedCommand> {
        &self.pending
    }
}
