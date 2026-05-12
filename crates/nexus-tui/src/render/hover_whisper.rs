use crate::mouse::targets::ClickTarget;
use crate::repl::ansi::ColorDepth;

pub fn render_hover_whisper(target: Option<&ClickTarget>, depth: ColorDepth) -> String {
    match target {
        None => String::new(),
        Some(t) => decorate(t.whisper_hint(), depth),
    }
}

fn decorate(hint: &str, depth: ColorDepth) -> String {
    match depth {
        ColorDepth::NoColor => hint.to_string(),
        _ => format!("\x1b[2m{hint}\x1b[0m"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::EventId;

    #[test]
    fn none_target_renders_empty_string() {
        let out = render_hover_whisper(None, ColorDepth::Color256);
        assert!(out.is_empty());
    }

    #[test]
    fn filter_indicator_whisper_lists_three_actions() {
        let target = ClickTarget::FilterIndicator;
        let out = render_hover_whisper(Some(&target), ColorDepth::NoColor);
        assert!(out.contains("click"));
        assert!(out.contains("shift-click"));
        assert!(out.contains("drag"));
    }

    #[test]
    fn event_line_whisper_lists_keyboard_shortcuts() {
        let target = ClickTarget::EventLineBody {
            event_id: EventId::new(),
        };
        let out = render_hover_whisper(Some(&target), ColorDepth::NoColor);
        assert!(out.contains("f:"));
        assert!(out.contains("i:"));
        assert!(out.contains("b:"));
    }

    #[test]
    fn sparkline_whisper_includes_pause_action() {
        let target = ClickTarget::Sparkline;
        let out = render_hover_whisper(Some(&target), ColorDepth::NoColor);
        assert!(out.contains("pause"));
    }

    #[test]
    fn color_depth_wraps_in_dim_ansi() {
        let target = ClickTarget::Sparkline;
        let dim = render_hover_whisper(Some(&target), ColorDepth::Color256);
        let plain = render_hover_whisper(Some(&target), ColorDepth::NoColor);
        assert!(dim.starts_with("\x1b[2m"));
        assert!(dim.ends_with("\x1b[0m"));
        assert!(!plain.contains("\x1b"));
    }
}
