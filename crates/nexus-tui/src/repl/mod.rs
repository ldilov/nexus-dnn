//! REPL-side primitives: ANSI palette + color-depth detection.
//!
//! Submodules added in later phases own the line-editor prompt, slash
//! command parser, and command queue.

pub mod ansi;
pub mod completion;
pub mod editor;
pub mod inspect;
pub mod mouse_edit_mode;
pub mod prompt;
pub mod queue;
pub mod slash;
