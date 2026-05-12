//! Cursor-stable input choreography (FR-014).
//!
//! When ambient events print above the prompt the input cursor must not
//! drift. The standard pattern (used by `htop`, `mc`, Nushell) is:
//!
//!   save-cursor → move-up N → clear-line → print ambient line →
//!   restore-cursor → redraw prompt.
//!
//! The choreography is a sequence of crossterm primitives — pure
//! command construction, side-effect emission via the writer.
//!
//! On SIGWINCH the saved cursor coordinates may no longer be valid
//! (terminal emulators differ). The runtime must call
//! [`recompute_after_resize`] to re-establish the prompt anchor on
//! resize before the next ambient line lands.

use std::io::{self, Write};

use crossterm::cursor::{MoveToColumn, MoveUp, RestorePosition, SavePosition};
use crossterm::queue;
use crossterm::terminal::{Clear, ClearType, size};

const MIN_TERMINAL_WIDTH: u16 = 1;

/// Persistent state for the choreography. Tracks the current
/// terminal width so resize events can recompute the prompt anchor
/// without relying on the previously-saved cursor.
#[derive(Debug, Clone, Copy)]
pub struct CursorChoreography {
    terminal_width: u16,
    prompt_height: u16,
}

impl Default for CursorChoreography {
    fn default() -> Self {
        let (cols, _) = size().unwrap_or((80, 24));
        Self {
            terminal_width: cols.max(MIN_TERMINAL_WIDTH),
            prompt_height: 1,
        }
    }
}

impl CursorChoreography {
    pub fn new(terminal_width: u16, prompt_height: u16) -> Self {
        Self {
            terminal_width: terminal_width.max(MIN_TERMINAL_WIDTH),
            prompt_height: prompt_height.max(1),
        }
    }

    pub fn terminal_width(&self) -> u16 {
        self.terminal_width
    }

    pub fn prompt_height(&self) -> u16 {
        self.prompt_height
    }

    /// Recompute the cached terminal size after SIGWINCH. The caller
    /// is responsible for redrawing the prompt at its new anchor on
    /// the next render tick.
    pub fn recompute_after_resize(&mut self) {
        let (cols, _) = size().unwrap_or((self.terminal_width, 24));
        self.terminal_width = cols.max(MIN_TERMINAL_WIDTH);
    }

    pub fn set_prompt_height(&mut self, height: u16) {
        self.prompt_height = height.max(1);
    }
}

/// Render the ambient line above the prompt and restore the cursor.
///
/// Sequence:
///   1. SavePosition — remember where the input cursor is
///   2. MoveUp(prompt_height) — move above the prompt block
///   3. MoveToColumn(0) — anchor at column 0
///   4. Clear(CurrentLine) — wipe whatever was on this row
///   5. write the line + newline
///   6. RestorePosition — input cursor goes back where it was
///
/// The caller must redraw the prompt after this returns since the
/// ambient line clobbered the row above the original prompt.
pub fn render_ambient_above_prompt<W: Write>(
    writer: &mut W,
    choreo: &CursorChoreography,
    line: &str,
) -> io::Result<()> {
    queue!(writer, SavePosition)?;
    queue!(writer, MoveUp(choreo.prompt_height))?;
    queue!(writer, MoveToColumn(0))?;
    queue!(writer, Clear(ClearType::CurrentLine))?;
    writer.write_all(line.as_bytes())?;
    writer.write_all(b"\n")?;
    queue!(writer, RestorePosition)?;
    writer.flush()?;
    Ok(())
}

/// Clear the prompt area before redrawing.
///
/// Used by the runtime after resize so a stale prompt at the old
/// width does not leave residue when the new prompt is drawn.
pub fn clear_prompt_area<W: Write>(writer: &mut W, choreo: &CursorChoreography) -> io::Result<()> {
    for _ in 0..choreo.prompt_height {
        queue!(writer, MoveToColumn(0))?;
        queue!(writer, Clear(ClearType::CurrentLine))?;
        writer.write_all(b"\n")?;
    }
    writer.flush()?;
    Ok(())
}
