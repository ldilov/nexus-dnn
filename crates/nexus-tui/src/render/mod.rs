//! Pure render functions producing ANSI-coloured strings for the TUI.
//!
//! Every submodule here returns `String`s — no I/O, no terminal handles.
//! The main loop is responsible for writing to stdout.

pub mod brand;
pub mod brush_drawer;
pub mod cursor;
pub mod event_line;
pub mod gutter;
pub mod inspector;
pub mod pressure_meter;
pub mod source_mixer;
pub mod sparkline;
pub mod status_ribbon;
pub mod table;
pub mod timeline;
