//! Library surface for the `nexus` terminal binary.
//!
//! Modules:
//! - [`stream`] — event-line domain types, severity ordering, significance,
//!   source-category classification.
//! - [`terminal`] — RAII guards over terminal raw mode.
//! - [`repl`] — ANSI palette + color-depth detection (line-editor and
//!   slash command modules land in later phases).

use std::io::{self, Write};

pub mod controller;
pub mod inspector;
pub mod mouse;
pub mod render;
pub mod repl;
pub mod runtime;
pub mod snapshot;
pub mod stream;
pub mod terminal;

pub use stream::event_id::{EventId, RingBufferCapacity};
pub use stream::event_line::{CorrelationKeys, EventLine, RawPayload};
pub use stream::severity::Severity;
pub use stream::significance::{Significance, should_display};
pub use stream::source_category::{
    SourceCategory, category_glyph, classify_nexus_event, classify_nexus_event_significance,
};
pub use terminal::{TerminalGuard, TerminalGuardError};

const BINARY_NAME: &str = "nexus";
const SPEC_PATH: &str = "specs/044-tui-streaming-console/spec.md";

pub fn binary_name() -> &'static str {
    BINARY_NAME
}

pub fn scaffold_notice() -> &'static str {
    "nexus-tui scaffold ready. See specs/044-tui-streaming-console/spec.md"
}

pub fn write_scaffold_notice<W>(writer: &mut W) -> io::Result<()>
where
    W: Write,
{
    writeln!(writer, "{}", scaffold_notice())
}

pub fn spec_path() -> &'static str {
    SPEC_PATH
}
