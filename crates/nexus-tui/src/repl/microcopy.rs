pub fn empty_filter_result() -> &'static str {
    "Nothing matched — try /filter level:warn or widen the time range"
}

pub fn sse_reconnecting(attempt: u32, max_attempts: u32) -> String {
    format!("Stream interrupted — reconnecting (attempt {attempt}/{max_attempts})")
}

pub fn snapshot_in_progress(event_count: u64) -> String {
    format!("Snapshotting {event_count} events… (this takes a moment for large feeds)")
}

pub fn filter_parse_error_with_suggestion(unknown_field: &str, suggestion: &str) -> String {
    format!("Unrecognised field {unknown_field:?} — did you mean {suggestion}:?")
}

pub fn yank_success(line_count: usize) -> String {
    let pluralizer = if line_count == 1 { "line" } else { "lines" };
    format!("Copied {line_count} {pluralizer} — paste anywhere")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_filter_microcopy_offers_next_action() {
        let copy = empty_filter_result();
        assert!(copy.contains("/filter"));
        assert!(copy.contains("widen"));
    }

    #[test]
    fn sse_reconnect_includes_attempt_counts() {
        let copy = sse_reconnecting(2, 5);
        assert!(copy.contains("attempt 2/5"));
        assert!(copy.contains("reconnecting"));
    }

    #[test]
    fn snapshot_progress_includes_event_count() {
        let copy = snapshot_in_progress(4821);
        assert!(copy.contains("4821"));
        assert!(copy.contains("Snapshotting"));
    }

    #[test]
    fn filter_parse_error_quotes_bad_field_and_suggests() {
        let copy = filter_parse_error_with_suggestion("lvl", "level");
        assert!(copy.contains("\"lvl\""));
        assert!(copy.contains("level:"));
    }

    #[test]
    fn yank_success_singular_and_plural_forms() {
        assert!(yank_success(1).contains("1 line"));
        assert!(!yank_success(1).contains("1 lines"));
        assert!(yank_success(12).contains("12 lines"));
    }
}
