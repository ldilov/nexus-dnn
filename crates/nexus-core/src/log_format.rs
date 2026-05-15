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
    FmtContext,
    format::{FormatEvent, FormatFields, Writer},
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
// Bright-black (ANSI 90) — readable grey on dark terminal themes while
// still receding behind cyan-coloured first-party targets. The previous
// value used the additional `2;` (dim) attribute on top of bright-black,
// which collapsed to near-pure-black on most dark schemes and made the
// noisy `worker.stderr` bridge target effectively invisible.
const DIM_GREY: &str = "\x1b[90m";
const CYAN: &str = "\x1b[36m";

/// Reserved target for events that should render WITHOUT the standard
/// timestamp/icon/level/target prefix. Used by the startup banner so
/// box-drawing characters and indented columns aren't broken up by
/// per-line metadata. Emit with `tracing::info!(target: BANNER_TARGET, ...)`.
pub const BANNER_TARGET: &str = "nexus_dnn::banner";

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
        let meta = event.metadata();

        // Banner target opts out of the standard prefix. The message is
        // emitted verbatim so the caller has full control over visual
        // layout (alignment, indents, box-drawing). Banner messages may
        // include inline ANSI escapes for status coloring; on the
        // non-ANSI path we strip them so the on-disk log file stays
        // plain text.
        if meta.target() == BANNER_TARGET {
            if self.use_ansi {
                ctx.format_fields(writer.by_ref(), event)?;
            } else {
                let mut buf = String::new();
                let mut dyn_buf: &mut dyn fmt::Write = &mut buf;
                ctx.format_fields(Writer::new(&mut dyn_buf), event)?;
                write_ansi_stripped(&mut writer, &buf)?;
            }
            return writeln!(writer);
        }

        // 1. Timestamp — local time, millisecond precision.
        write!(writer, "{} ", chrono::Local::now().format("%H:%M:%S%.3f"))?;

        // 2. Icon + level word, colored by severity.
        let (icon, level_color) = level_glyph_and_color(*meta.level());
        if self.use_ansi {
            write!(
                writer,
                "{level_color}{icon} {:<5}{RESET} ",
                meta.level().as_str()
            )?;
        } else {
            write!(writer, "{icon} {:<5} ", meta.level().as_str())?;
        }

        // 3. Target — dim grey for the worker stderr forwarder, cyan
        //    for everything else. Uncolored when ANSI is disabled.
        let target = meta.target();
        if self.use_ansi {
            let target_color = if target == "worker.stderr" {
                DIM_GREY
            } else {
                CYAN
            };
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

/// Write `input` to `writer` with all ANSI CSI escape sequences removed.
///
/// CSI runs start with `ESC [` (`\x1b[`) and end at the first byte in
/// the range `0x40..=0x7E` (`@` through `~`). This covers SGR (`m`),
/// cursor movement, etc. — every CSI we'd plausibly emit. Non-CSI
/// escapes (OSC `]`, single-shifts) aren't generated by our code paths,
/// so the cheap CSI-only stripper is sufficient.
fn write_ansi_stripped(writer: &mut Writer<'_>, input: &str) -> fmt::Result {
    let mut chars = input.chars();
    while let Some(c) = chars.next() {
        if c == '\x1b' {
            // Look for the `[` that opens a CSI run; if we don't find
            // one, fall through and re-emit the ESC byte (defensive —
            // shouldn't happen with our message generators).
            match chars.next() {
                Some('[') => {
                    for end in chars.by_ref() {
                        if matches!(end as u32, 0x40..=0x7E) {
                            break;
                        }
                    }
                }
                Some(other) => {
                    writer.write_char(c)?;
                    writer.write_char(other)?;
                }
                None => writer.write_char(c)?,
            }
        } else {
            writer.write_char(c)?;
        }
    }
    Ok(())
}

/// Convenience for callers (the banner code in app.rs) that want to
/// wrap a token in ANSI green / red / dim-grey only when ANSI is on.
/// Returns the input unchanged when `use_ansi` is `false` so the same
/// formatted string can be passed to both terminal and file sinks.
pub fn paint(use_ansi: bool, color: PaintColor, text: &str) -> String {
    if use_ansi {
        format!("{}{}{}", color.code(), text, RESET)
    } else {
        text.to_string()
    }
}

#[derive(Clone, Copy)]
#[allow(dead_code)] // Yellow/Cyan reserved for future banner sections.
pub enum PaintColor {
    Green,
    Red,
    Yellow,
    Cyan,
    DimGrey,
}

impl PaintColor {
    fn code(self) -> &'static str {
        match self {
            PaintColor::Green => "\x1b[32m",
            PaintColor::Red => "\x1b[31m",
            PaintColor::Yellow => "\x1b[33m",
            PaintColor::Cyan => CYAN,
            PaintColor::DimGrey => DIM_GREY,
        }
    }
}

fn level_glyph_and_color(level: Level) -> (&'static str, &'static str) {
    // ANSI 8-color palette is universal. Avoid 256-color codes for max
    // compatibility (Windows cmd.exe still gets the colors right).
    match level {
        Level::ERROR => ("✗", "\x1b[31m"), // red
        Level::WARN => ("⚠", "\x1b[33m"),  // yellow
        Level::INFO => ("●", "\x1b[32m"),  // green
        Level::DEBUG => ("·", "\x1b[36m"), // cyan
        Level::TRACE => ("·", DIM_GREY),   // dim grey, same glyph
    }
}
