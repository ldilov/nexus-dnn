//! SGR mouse mode 1006 capture wiring.
//!
//! Strategy (per research.md decision 5): enable capture unconditionally
//! on terminals that look capable based on `TERM` / `COLORTERM`; print a
//! one-time notice on `dumb` / `linux` terminals where keyboard fallback
//! is the only input path.

use std::io::{self, Write};

use crossterm::event::{
    DisableMouseCapture, EnableMouseCapture, KeyModifiers, MouseEvent, MouseEventKind,
};
use crossterm::{execute, terminal::supports_keyboard_enhancement};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MouseSupport {
    Enabled,
    UnknownTerminal,
    Disabled,
}

pub fn detect_support_from(term: Option<&str>) -> MouseSupport {
    let value = term.unwrap_or("").trim().to_ascii_lowercase();
    if value.is_empty() || value == "dumb" || value == "linux" || value == "vt100" {
        return MouseSupport::Disabled;
    }
    if value == "screen" || value == "tmux" {
        return MouseSupport::UnknownTerminal;
    }
    MouseSupport::Enabled
}

pub fn detect_support() -> MouseSupport {
    detect_support_from(std::env::var("TERM").ok().as_deref())
}

pub fn enable_mouse_capture<W: Write>(out: &mut W) -> io::Result<MouseSupport> {
    let support = detect_support();
    if support == MouseSupport::Enabled {
        execute!(out, EnableMouseCapture)?;
    }
    Ok(support)
}

pub fn disable_mouse_capture<W: Write>(out: &mut W) -> io::Result<()> {
    execute!(out, DisableMouseCapture)?;
    Ok(())
}

pub fn should_bypass(event: &MouseEvent) -> bool {
    if event.modifiers.contains(KeyModifiers::SHIFT) {
        return true;
    }
    matches!(
        event.kind,
        MouseEventKind::Drag(_)
            | MouseEventKind::ScrollUp
            | MouseEventKind::ScrollDown
            | MouseEventKind::ScrollLeft
            | MouseEventKind::ScrollRight
    )
}

pub fn keyboard_enhancement_available() -> bool {
    supports_keyboard_enhancement().unwrap_or(false)
}
