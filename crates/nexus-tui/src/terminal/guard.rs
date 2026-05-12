//! RAII guard that enters terminal raw mode and restores it on drop.
//!
//! The guard is panic-safe: even if the streaming render loop panics,
//! `Drop` runs and the terminal returns to cooked mode with the cursor
//! visible.

use std::io;

use crossterm::{
    cursor::Show,
    execute,
    terminal::{disable_raw_mode, enable_raw_mode},
};

#[derive(Debug, thiserror::Error)]
pub enum TerminalGuardError {
    #[error("failed to enter raw mode: {0}")]
    EnableRawMode(#[source] io::Error),
}

#[derive(Debug)]
pub struct TerminalGuard {
    armed: bool,
}

impl TerminalGuard {
    pub fn new() -> Result<Self, TerminalGuardError> {
        enable_raw_mode().map_err(TerminalGuardError::EnableRawMode)?;
        Ok(Self { armed: true })
    }
}

impl Drop for TerminalGuard {
    fn drop(&mut self) {
        if self.armed {
            let _ = disable_raw_mode();
            let _ = execute!(io::stdout(), Show);
        }
    }
}
