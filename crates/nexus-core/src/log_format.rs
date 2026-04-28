//! Custom tracing-subscriber event format for the host log stream.
//!
//! Produces lines shaped like:
//!
//! ```text
//! HH:MM:SS.mmm ICON LEVEL target: message key=value …
//! ```
//!
//! Visual upgrades over `tracing_subscriber::fmt::format::Compact`:
//!
//! - **Level icons** — a single unicode glyph per severity (✗ / ⚠ / ● / · / ·)
//!   so the eye can locate warnings and errors faster than scanning level
//!   words. Glyphs are plain unicode (no emoji), safe in any modern
//!   terminal and any text editor or `grep` output.
//!
//! - **Per-target color** — `worker.stderr` (the noisy bridge target for
//!   forwarded subprocess output) renders in dim grey so it visually
//!   recedes behind first-party host events. All other targets render in
//!   cyan, the default tracing-subscriber convention.
//!
//! - **ANSI-aware** — when `use_ansi = false`, all escape codes are
//!   suppressed. This is what the rotating file appender uses so the
//!   on-disk log file is plain text. `cat` / `grep` / `less` see the
//!   icons (unicode) but no escape codes.
//!
//! ## Why a custom `FormatEvent` instead of customizing `Compact`?
//!
//! `tracing_subscriber::fmt::Layer` exposes hooks for the timestamp
//! formatter, the field formatter, and on/off toggles for level/target/
//! thread/etc. — but no hook for prepending a per-level glyph. To add
//! one you have to implement `FormatEvent` yourself; that's ~80 lines.
//! Done once, here.

use std::fmt;

use tracing::{Event, Level, Subscriber};
use tracing_subscriber::fmt::{
    format::{FormatEvent, FormatFields, Writer},
    FmtContext,
};
use tracing_subscriber::registry::LookupSpan;

/// Single-line pretty event formatter. Cheap to clone (`Copy`).
#[derive(Clone, Copy)]
pub struct PrettyFormat {
    /// Emit ANSI escape codes for color/dim. Caller toggles based on
    /// whether the writer is a TTY (terminal layer) or not (file
    /// appender layer).
    pub use_ansi: bool,
}

const RESET: &str = "\x1b[0m";
const DIM_GREY: &str = "\x1b[2;90m";
const CYAN: &str = "\x1b[36m";

impl<S, N> FormatEvent<S, N> for PrettyFormat
where
    S: Subscriber + for<'a> LookupSpan<'a>,
    N: for<'a> FormatFields<'a> + 'static,
{
    fn format_event(
        &self,
        ctx: &FmtContext<'_, S, N>,
        mut writer: Writer<'_>,
        event: &Event<'_>,
    ) -> fmt::Result {
        // 1. Timestamp — local time, millisecond precision.
        write!(writer, "{} ", chrono::Local::now().format("%H:%M:%S%.3f"))?;

        // 2. Icon + level word, colored by severity.
        let meta = event.metadata();
        let (icon, level_color) = level_glyph_and_color(*meta.level());
        if self.use_ansi {
            write!(writer, "{level_color}{icon} {:<5}{RESET} ", meta.level().as_str())?;
        } else {
            write!(writer, "{icon} {:<5} ", meta.level().as_str())?;
        }

        // 3. Target — dim grey for the worker stderr forwarder, cyan
        //    for everything else. Uncolored when ANSI is disabled.
        let target = meta.target();
        if self.use_ansi {
            let target_color = if target == "worker.stderr" { DIM_GREY } else { CYAN };
            write!(writer, "{target_color}{target}{RESET}: ")?;
        } else {
            write!(writer, "{target}: ")?;
        }

        // 4. Message + structured fields, compact-style on the same line.
        //    `format_fields` writes the message first, then `key=value`
        //    pairs separated by spaces.
        ctx.format_fields(writer.by_ref(), event)?;
        writeln!(writer)
    }
}

fn level_glyph_and_color(level: Level) -> (&'static str, &'static str) {
    // ANSI 8-color palette is universal. Avoid 256-color codes for max
    // compatibility (Windows cmd.exe still gets the colors right).
    match level {
        Level::ERROR => ("✗", "\x1b[31m"),     // red
        Level::WARN => ("⚠", "\x1b[33m"),      // yellow
        Level::INFO => ("●", "\x1b[32m"),      // green
        Level::DEBUG => ("·", "\x1b[36m"),     // cyan
        Level::TRACE => ("·", DIM_GREY),       // dim grey, same glyph
    }
}
