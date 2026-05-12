use crate::stream::severity::Severity;

const ZONE_HEIGHT: u16 = 5;
const INDENT_STEP: usize = 2;
const MAX_INDENT_LEVELS: usize = 3;
const ERROR_BAR: char = '\u{258C}';

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct LadderConfig {
    pub zone_bands: bool,
}

pub fn zone_index(row: u16) -> u16 {
    row / ZONE_HEIGHT
}

pub fn zone_is_elevated(row: u16) -> bool {
    zone_index(row) % 2 == 1
}

pub fn correlation_indent(depth: u8) -> String {
    let levels = (depth as usize).min(MAX_INDENT_LEVELS);
    " ".repeat(levels * INDENT_STEP)
}

pub fn error_left_bar(severity: Severity) -> Option<char> {
    if severity >= Severity::Error {
        Some(ERROR_BAR)
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn zones_cycle_every_five_rows() {
        assert!(!zone_is_elevated(0));
        assert!(!zone_is_elevated(4));
        assert!(zone_is_elevated(5));
        assert!(zone_is_elevated(9));
        assert!(!zone_is_elevated(10));
    }

    #[test]
    fn zone_index_returns_correct_zone() {
        assert_eq!(zone_index(0), 0);
        assert_eq!(zone_index(4), 0);
        assert_eq!(zone_index(5), 1);
        assert_eq!(zone_index(14), 2);
    }

    #[test]
    fn correlation_indent_grows_with_depth() {
        assert_eq!(correlation_indent(0), "");
        assert_eq!(correlation_indent(1), "  ");
        assert_eq!(correlation_indent(2), "    ");
        assert_eq!(correlation_indent(3), "      ");
    }

    #[test]
    fn correlation_indent_caps_at_three_levels() {
        assert_eq!(correlation_indent(3).len(), 6);
        assert_eq!(correlation_indent(5).len(), 6);
        assert_eq!(correlation_indent(99).len(), 6);
    }

    #[test]
    fn error_left_bar_appears_only_for_error_or_above() {
        assert_eq!(error_left_bar(Severity::Debug), None);
        assert_eq!(error_left_bar(Severity::Info), None);
        assert_eq!(error_left_bar(Severity::Warn), None);
        assert_eq!(error_left_bar(Severity::Error), Some(ERROR_BAR));
        assert_eq!(error_left_bar(Severity::Fatal), Some(ERROR_BAR));
    }
}
