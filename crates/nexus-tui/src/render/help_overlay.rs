use crate::mouse::targets::ClickTarget;
use crate::EventId;

pub fn all_click_target_examples() -> Vec<ClickTarget> {
    vec![
        ClickTarget::EventLineBody {
            event_id: EventId::new(),
        },
        ClickTarget::SourceLabel {
            source: "<source>".to_string(),
        },
        ClickTarget::RunIdReference {
            run_id: "<run-id>".to_string(),
        },
        ClickTarget::FilterIndicator,
        ClickTarget::Sparkline,
        ClickTarget::InspectorHeading {
            event_id: EventId::new(),
        },
    ]
}

pub fn render_help_overlay() -> String {
    let mut out = String::new();
    out.push_str("interactive surfaces:\n");
    for target in all_click_target_examples() {
        let label = target_label(&target);
        let shortcut = target
            .keyboard_shortcut()
            .map(|s| s.to_string())
            .unwrap_or_else(|| "(mouse only)".to_string());
        let hint = target.whisper_hint();
        out.push_str(&format!("  {label:<22} {shortcut:<14} {hint}\n"));
    }
    out
}

fn target_label(target: &ClickTarget) -> &'static str {
    match target {
        ClickTarget::EventLineBody { .. } => "event row",
        ClickTarget::SourceLabel { .. } => "source label",
        ClickTarget::RunIdReference { .. } => "run-id reference",
        ClickTarget::FilterIndicator => "filter indicator",
        ClickTarget::Sparkline => "sparkline",
        ClickTarget::InspectorHeading { .. } => "inspector heading",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn overlay_lists_every_click_target_variant() {
        let out = render_help_overlay();
        let lines: Vec<&str> = out.lines().collect();
        assert!(lines.len() >= 7);
        assert!(out.contains("event row"));
        assert!(out.contains("source label"));
        assert!(out.contains("filter indicator"));
        assert!(out.contains("sparkline"));
    }

    #[test]
    fn overlay_shows_keyboard_shortcut_or_mouse_only() {
        let out = render_help_overlay();
        assert!(out.contains("Ctrl+G"));
        assert!(out.contains("(mouse only)"));
    }

    #[test]
    fn overlay_includes_whisper_hint_actions() {
        let out = render_help_overlay();
        assert!(out.contains("spotlight"));
        assert!(out.contains("inspect"));
        assert!(out.contains("pause"));
    }

    #[test]
    fn examples_cover_all_six_variants() {
        let examples = all_click_target_examples();
        assert_eq!(examples.len(), 6);
    }
}
