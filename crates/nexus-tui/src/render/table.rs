//! Terminal-native table renderer.
//!
//! No box-drawing borders — those fight terminal scrollback. Instead:
//! a heavy `┃` left gutter, dim slate column headers, a thin `─`
//! divider rule, right-aligned numeric columns with thousands
//! separators, and an optional 6-cell Braille density bar per row so
//! the eye can scan totals at a glance.
//!
//! Used by `/pressure`, `/mixer`, and future drawers.

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_BOLD: &str = "\x1b[1m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";
const GUTTER: &str = "┃";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Align {
    Left,
    Right,
}

#[derive(Debug, Clone)]
pub struct Column {
    pub header: &'static str,
    pub min_width: usize,
    pub align: Align,
}

#[derive(Debug, Clone)]
pub struct Cell {
    pub text: String,
    pub color: &'static str,
}

impl Cell {
    pub fn plain(text: impl Into<String>) -> Self {
        Self {
            text: text.into(),
            color: ANSI_SLATE,
        }
    }

    pub fn colored(text: impl Into<String>, color: &'static str) -> Self {
        Self {
            text: text.into(),
            color,
        }
    }
}

#[derive(Debug, Default, Clone)]
pub struct Row {
    pub cells: Vec<Cell>,
    /// Optional density value — when set, the row gets a trailing
    /// 6-cell Braille bar normalised against `density_max` passed
    /// into [`render_table`].
    pub density: Option<u64>,
}

impl Row {
    pub fn new(cells: Vec<Cell>) -> Self {
        Self {
            cells,
            density: None,
        }
    }

    pub fn with_density(mut self, value: u64) -> Self {
        self.density = Some(value);
        self
    }
}

#[derive(Debug, Clone)]
pub struct TableSpec<'a> {
    pub title: Option<&'a str>,
    pub columns: &'a [Column],
    pub indent: usize,
    pub show_density: bool,
}

pub fn render_table(spec: &TableSpec<'_>, rows: &[Row]) -> String {
    let mut out = String::new();

    // Header line (optional). Caller passes a fully-composed title
    // including any leading icon (`⚡ pressure · totals`, `✎ brush`,
    if let Some(title) = spec.title {
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push_str(GUTTER);
        out.push_str(ANSI_RESET);
        out.push(' ');
        out.push_str(ANSI_BOLD);
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push_str(title);
        out.push_str(ANSI_RESET);
        out.push('\n');
    }

    // Compute effective widths — max of column header / min_width / cell content.
    let widths = compute_widths(spec.columns, rows);

    // Header row.
    push_indent(&mut out, spec.indent);
    for (i, col) in spec.columns.iter().enumerate() {
        push_cell(
            &mut out,
            col.header,
            widths[i],
            col.align,
            ANSI_GRAPHITE_DIM,
        );
        if i + 1 < spec.columns.len() {
            out.push_str("  ");
        }
    }
    if spec.show_density {
        out.push_str("  ");
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str("density");
        out.push_str(ANSI_RESET);
    }
    out.push('\n');

    // Divider line.
    push_indent(&mut out, spec.indent);
    for (i, _col) in spec.columns.iter().enumerate() {
        out.push_str(ANSI_GRAPHITE_DIM);
        for _ in 0..widths[i] {
            out.push('─');
        }
        out.push_str(ANSI_RESET);
        if i + 1 < spec.columns.len() {
            out.push_str("  ");
        }
    }
    if spec.show_density {
        out.push_str("  ");
        out.push_str(ANSI_GRAPHITE_DIM);
        for _ in 0..6 {
            out.push('─');
        }
        out.push_str(ANSI_RESET);
    }
    out.push('\n');

    // Body rows.
    let density_max = rows
        .iter()
        .filter_map(|r| r.density)
        .max()
        .unwrap_or(1)
        .max(1);
    for row in rows {
        push_indent(&mut out, spec.indent);
        for (i, col) in spec.columns.iter().enumerate() {
            let cell = row.cells.get(i).cloned().unwrap_or_else(|| Cell::plain(""));
            push_cell(&mut out, &cell.text, widths[i], col.align, cell.color);
            if i + 1 < spec.columns.len() {
                out.push_str("  ");
            }
        }
        if spec.show_density {
            out.push_str("  ");
            out.push_str(ANSI_GRAPHITE_BLUE);
            out.push_str(&density_bar(row.density.unwrap_or(0), density_max));
            out.push_str(ANSI_RESET);
        }
        out.push('\n');
    }

    out
}

fn compute_widths(columns: &[Column], rows: &[Row]) -> Vec<usize> {
    columns
        .iter()
        .enumerate()
        .map(|(i, col)| {
            let header_w = visible_width(col.header);
            let max_content = rows
                .iter()
                .map(|r| r.cells.get(i).map(|c| visible_width(&c.text)).unwrap_or(0))
                .max()
                .unwrap_or(0);
            header_w.max(max_content).max(col.min_width)
        })
        .collect()
}

fn push_indent(out: &mut String, indent: usize) {
    out.push_str(ANSI_GRAPHITE_BLUE);
    out.push_str(GUTTER);
    out.push_str(ANSI_RESET);
    for _ in 0..indent {
        out.push(' ');
    }
}

fn push_cell(out: &mut String, text: &str, width: usize, align: Align, color: &str) {
    let pad = width.saturating_sub(visible_width(text));
    if align == Align::Right {
        for _ in 0..pad {
            out.push(' ');
        }
    }
    out.push_str(color);
    out.push_str(text);
    out.push_str(ANSI_RESET);
    if align == Align::Left {
        for _ in 0..pad {
            out.push(' ');
        }
    }
}

fn visible_width(s: &str) -> usize {
    s.chars().count()
}

/// 6-cell Braille bar of `value / max`. `0` renders as 6 dots, `max`
/// renders as 6 full blocks.
fn density_bar(value: u64, max: u64) -> String {
    if max == 0 {
        return "······".to_string();
    }
    const CELLS: usize = 6;
    let ratio = (value as f64 / max as f64).clamp(0.0, 1.0);
    let level = (ratio * (CELLS as f64) * 8.0).round() as usize;
    let full = level / 8;
    let remainder = level % 8;
    let mut out = String::with_capacity(CELLS * 3);
    for i in 0..CELLS {
        if i < full {
            out.push('█');
        } else if i == full {
            out.push(partial_glyph(remainder));
        } else {
            out.push('·');
        }
    }
    out
}

fn partial_glyph(level: usize) -> char {
    match level {
        0 => '·',
        1 => '▁',
        2 => '▂',
        3 => '▃',
        4 => '▄',
        5 => '▅',
        6 => '▆',
        _ => '▇',
    }
}

/// Format an integer with thousands separators (`,`).
pub fn fmt_thousands(n: u64) -> String {
    let s = n.to_string();
    let mut out = String::with_capacity(s.len() + s.len() / 3);
    for (i, c) in s.chars().rev().enumerate() {
        if i > 0 && i % 3 == 0 {
            out.push(',');
        }
        out.push(c);
    }
    out.chars().rev().collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fmt_thousands_under_1000_is_unchanged() {
        assert_eq!(fmt_thousands(0), "0");
        assert_eq!(fmt_thousands(42), "42");
        assert_eq!(fmt_thousands(999), "999");
    }

    #[test]
    fn fmt_thousands_inserts_separators() {
        assert_eq!(fmt_thousands(1_000), "1,000");
        assert_eq!(fmt_thousands(10_234), "10,234");
        assert_eq!(fmt_thousands(1_234_567), "1,234,567");
    }

    #[test]
    fn density_bar_empty_value() {
        assert_eq!(density_bar(0, 100), "······");
    }

    #[test]
    fn density_bar_full_value_uses_block() {
        let bar = density_bar(100, 100);
        assert!(bar.starts_with('█'));
    }

    #[test]
    fn density_bar_handles_zero_max() {
        assert_eq!(density_bar(5, 0), "······");
    }

    #[test]
    fn renders_header_divider_and_rows() {
        let columns = &[
            Column {
                header: "source",
                min_width: 0,
                align: Align::Left,
            },
            Column {
                header: "count",
                min_width: 0,
                align: Align::Right,
            },
        ];
        let rows = vec![
            Row::new(vec![Cell::plain("alpha"), Cell::plain("42")]),
            Row::new(vec![Cell::plain("bravo"), Cell::plain("1,234")]),
        ];
        let out = render_table(
            &TableSpec {
                title: Some("✦ test"),
                columns,
                indent: 3,
                show_density: false,
            },
            &rows,
        );
        assert!(out.contains("✦ test"));
        assert!(out.contains("source"));
        assert!(out.contains("count"));
        assert!(out.contains("─"));
        assert!(out.contains("alpha"));
        assert!(out.contains("bravo"));
        assert!(out.contains("1,234"));
    }

    #[test]
    fn density_column_renders_when_show_density() {
        let columns = &[Column {
            header: "src",
            min_width: 0,
            align: Align::Left,
        }];
        let rows = vec![
            Row::new(vec![Cell::plain("a")]).with_density(10),
            Row::new(vec![Cell::plain("b")]).with_density(100),
        ];
        let out = render_table(
            &TableSpec {
                title: None,
                columns,
                indent: 3,
                show_density: true,
            },
            &rows,
        );
        assert!(out.contains("density"));
        assert!(out.contains('█') || out.contains('▇'));
    }

    #[test]
    fn right_aligned_numbers_get_left_padding() {
        let columns = &[Column {
            header: "n",
            min_width: 6,
            align: Align::Right,
        }];
        let rows = vec![Row::new(vec![Cell::plain("42")])];
        let out = render_table(
            &TableSpec {
                title: None,
                columns,
                indent: 0,
                show_density: false,
            },
            &rows,
        );
        // After ANSI stripping there should be 4 spaces of padding
        // before "42" (width 6 minus the 2-char value).
        let stripped = strip_ansi(&out);
        assert!(
            stripped.contains("    42"),
            "must left-pad right-aligned: {stripped}"
        );
    }

    pub(super) fn strip_ansi(s: &str) -> String {
        let mut out = String::with_capacity(s.len());
        let mut chars = s.chars().peekable();
        while let Some(c) = chars.next() {
            if c == '\x1b' && chars.peek() == Some(&'[') {
                chars.next();
                for ch in chars.by_ref() {
                    if ch.is_ascii_alphabetic() {
                        break;
                    }
                }
            } else {
                out.push(c);
            }
        }
        out
    }
}
