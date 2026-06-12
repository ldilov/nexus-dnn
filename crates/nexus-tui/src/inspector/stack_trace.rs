//! Parse multi-line stack-trace text into structured frames for the
//! sub-sectioned inspector (`InspectorSection::StackTrace`).
//!
//! Recognises three shapes (matching the classifier's detection):
//!
//! 1. **Rust panic `at` frames** — emitted by `std::panicking` and
//!    `color-eyre` / `anyhow` with backtrace enabled:
//!    ```text
//!    error: ...
//!       at my_crate::foo (src/foo.rs:10:5)
//!       at my_crate::bar (src/bar.rs:33:1)
//!    ```
//!
//! 2. **Rust numbered backtrace** — `RUST_BACKTRACE=1` output:
//!    ```text
//!       0: my_crate::foo
//!                at src/foo.rs:10
//!       1: my_crate::bar
//!                at src/bar.rs:33
//!    ```
//!
//! 3. **Python traceback**:
//!    ```text
//!    Traceback (most recent call last):
//!      File "/foo.py", line 7, in handler
//!        result = bar()
//!      File "/bar.py", line 3, in bar
//!        raise RuntimeError("nope")
//!    RuntimeError: nope
//!    ```
//!
//! The parser is best-effort and FORGIVING: unknown lines are skipped,
//! malformed file:line:col falls back to "file only" or omits entirely.
//! Output is always a `Vec<StackFrame>` in source order (top frame
//! first); the renderer is responsible for truncation, dimming, and
//! OSC-8 wrapping (latter is S5).

use std::sync::LazyLock;

use regex::Regex;

/// One parsed frame. `file` and `function` are best-effort; either may
/// be missing if the source shape didn't carry it.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StackFrame {
    /// Logical function or module name (`my_crate::foo`, `handler`,
    /// `<module>`). Empty string when the source shape didn't have one.
    pub function: String,
    /// Absolute or repo-relative path. None if unparseable.
    pub file: Option<String>,
    /// 1-based line number.
    pub line: Option<u32>,
    /// 1-based column. Rarely present; almost never in Python.
    pub column: Option<u32>,
}

impl StackFrame {
    /// True when this frame looks like it belongs to user code rather
    /// than a registry / toolchain dependency. Used by the renderer to
    /// dim non-workspace frames at ~40% luminance per Define Q3.
    pub fn is_workspace_frame(&self) -> bool {
        let Some(path) = self.file.as_deref() else {
            return true; // unknown — don't dim by default
        };
        let lowered = path.replace('\\', "/").to_ascii_lowercase();
        // Dim if it looks like a registry path; everything else is
        // treated as workspace code.
        let registry_markers = [
            "/.cargo/registry/",
            "/.rustup/toolchains/",
            "/site-packages/",
            "/python3",
            "/lib/python",
        ];
        !registry_markers.iter().any(|m| lowered.contains(m))
    }
}

/// Parse a multi-line message body into a stack-trace frame list.
/// Returns an empty vec when no recognisable frames are found —
/// callers can short-circuit on `frames.is_empty()`.
pub fn parse(text: &str) -> Vec<StackFrame> {
    if text.contains("Traceback (most recent call last):") {
        return parse_python(text);
    }
    if RUST_NUMBERED_HEADER.is_match(text) {
        return parse_rust_numbered(text);
    }
    if RUST_AT_FRAME.is_match(text) {
        return parse_rust_at(text);
    }
    Vec::new()
}

fn parse_rust_at(text: &str) -> Vec<StackFrame> {
    let mut frames = Vec::new();
    for cap in RUST_AT_FRAME.captures_iter(text) {
        let function = cap
            .get(1)
            .map(|m| m.as_str().to_string())
            .unwrap_or_default();
        let file = cap.get(2).map(|m| m.as_str().to_string());
        let line = cap.get(3).and_then(|m| m.as_str().parse::<u32>().ok());
        let column = cap.get(4).and_then(|m| m.as_str().parse::<u32>().ok());
        frames.push(StackFrame {
            function,
            file,
            line,
            column,
        });
    }
    frames
}

fn parse_rust_numbered(text: &str) -> Vec<StackFrame> {
    let mut frames = Vec::new();
    let mut pending: Option<StackFrame> = None;
    for line in text.lines() {
        if let Some(cap) = RUST_NUMBERED_HEAD.captures(line) {
            // New frame starts — flush any pending.
            if let Some(p) = pending.take() {
                frames.push(p);
            }
            pending = Some(StackFrame {
                function: cap
                    .get(1)
                    .map(|m| m.as_str().trim().to_string())
                    .unwrap_or_default(),
                file: None,
                line: None,
                column: None,
            });
        } else if let Some(cap) = RUST_NUMBERED_AT.captures(line)
            && let Some(p) = pending.as_mut()
        {
            p.file = cap.get(1).map(|m| m.as_str().to_string());
            p.line = cap.get(2).and_then(|m| m.as_str().parse::<u32>().ok());
        }
    }
    if let Some(p) = pending.take() {
        frames.push(p);
    }
    frames
}

fn parse_python(text: &str) -> Vec<StackFrame> {
    let mut frames = Vec::new();
    for cap in PYTHON_FRAME.captures_iter(text) {
        let file = cap.get(1).map(|m| m.as_str().to_string());
        let line = cap.get(2).and_then(|m| m.as_str().parse::<u32>().ok());
        let function = cap
            .get(3)
            .map(|m| m.as_str().to_string())
            .unwrap_or_default();
        frames.push(StackFrame {
            function,
            file,
            line,
            column: None,
        });
    }
    frames
}

static RUST_AT_FRAME: LazyLock<Regex> = LazyLock::new(|| {
    // `   at fn_path (file:line:col)` or `   at fn_path (file:line)`.
    // function: greedy non-paren run; file/line/col captured inside ().
    Regex::new(r"(?m)^\s*at\s+([^\s(]+)\s*\(([^:()]+):(\d+)(?::(\d+))?\)").expect("RUST_AT_FRAME")
});

static RUST_NUMBERED_HEADER: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(?m)^\s*\d+:\s+\S").expect("RUST_NUMBERED_HEADER"));

static RUST_NUMBERED_HEAD: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^\s*\d+:\s+(.+)$").expect("RUST_NUMBERED_HEAD"));

static RUST_NUMBERED_AT: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^\s+at\s+([^:]+):(\d+)(?::(\d+))?\s*$").expect("RUST_NUMBERED_AT")
});

static PYTHON_FRAME: LazyLock<Regex> = LazyLock::new(|| {
    // `  File "<path>", line <n>, in <fn>`
    Regex::new(r#"File\s+"([^"]+)",\s+line\s+(\d+),\s+in\s+(\S+)"#).expect("PYTHON_FRAME")
});

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_rust_at_frames() {
        let trace =
            "error\n   at my_crate::foo (src/foo.rs:10:5)\n   at my_crate::bar (src/bar.rs:33:1)";
        let frames = parse(trace);
        assert_eq!(frames.len(), 2);
        assert_eq!(frames[0].function, "my_crate::foo");
        assert_eq!(frames[0].file.as_deref(), Some("src/foo.rs"));
        assert_eq!(frames[0].line, Some(10));
        assert_eq!(frames[0].column, Some(5));
        assert_eq!(frames[1].function, "my_crate::bar");
    }

    #[test]
    fn parses_rust_at_frame_without_col() {
        let trace = "panic\n   at my_crate::baz (src/baz.rs:7)";
        let frames = parse(trace);
        assert_eq!(frames.len(), 1);
        assert_eq!(frames[0].line, Some(7));
        assert_eq!(frames[0].column, None);
    }

    #[test]
    fn parses_rust_numbered_backtrace() {
        let trace = "error\n   0: my_crate::foo\n             at src/foo.rs:10\n   1: my_crate::bar\n             at src/bar.rs:33";
        let frames = parse(trace);
        assert_eq!(frames.len(), 2);
        assert_eq!(frames[0].function, "my_crate::foo");
        assert_eq!(frames[0].file.as_deref(), Some("src/foo.rs"));
        assert_eq!(frames[0].line, Some(10));
        assert_eq!(frames[1].function, "my_crate::bar");
    }

    #[test]
    fn parses_python_traceback() {
        let trace = "Traceback (most recent call last):\n  File \"/foo.py\", line 7, in handler\n    result = bar()\n  File \"/bar.py\", line 3, in bar\n    raise RuntimeError(\"nope\")\nRuntimeError: nope";
        let frames = parse(trace);
        assert_eq!(frames.len(), 2);
        assert_eq!(frames[0].function, "handler");
        assert_eq!(frames[0].file.as_deref(), Some("/foo.py"));
        assert_eq!(frames[0].line, Some(7));
        assert_eq!(frames[1].function, "bar");
    }

    #[test]
    fn returns_empty_for_plain_message() {
        let frames = parse("nothing interesting happened");
        assert!(frames.is_empty());
    }

    #[test]
    fn workspace_classifier_dims_registry_paths() {
        let workspace = StackFrame {
            function: "x".into(),
            file: Some("crates/nexus-tui/src/lib.rs".into()),
            line: Some(1),
            column: None,
        };
        let registry = StackFrame {
            function: "x".into(),
            file: Some("/home/u/.cargo/registry/src/tokio-1.0/src/runtime.rs".into()),
            line: Some(99),
            column: None,
        };
        let toolchain = StackFrame {
            function: "x".into(),
            file: Some("/home/u/.rustup/toolchains/stable/lib/rustlib/src/panic.rs".into()),
            line: Some(7),
            column: None,
        };
        let python_pkg = StackFrame {
            function: "x".into(),
            file: Some("/usr/lib/python3.11/site-packages/requests/api.py".into()),
            line: Some(50),
            column: None,
        };
        let unknown = StackFrame {
            function: "x".into(),
            file: None,
            line: None,
            column: None,
        };
        assert!(workspace.is_workspace_frame());
        assert!(!registry.is_workspace_frame());
        assert!(!toolchain.is_workspace_frame());
        assert!(!python_pkg.is_workspace_frame());
        assert!(
            unknown.is_workspace_frame(),
            "unknown defaults to workspace"
        );
    }

    #[test]
    fn python_takes_precedence_over_rust_at() {
        // A Python traceback with content that includes "at" should
        // still parse as Python frames.
        let trace = "Traceback (most recent call last):\n  File \"/x.py\", line 1, in main\n    print(\"at the bar\")";
        let frames = parse(trace);
        assert_eq!(frames.len(), 1);
        assert_eq!(frames[0].file.as_deref(), Some("/x.py"));
    }
}
