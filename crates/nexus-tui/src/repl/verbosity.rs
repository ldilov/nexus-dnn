#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub enum VerbosityLevel {
    Silent,
    Quiet,
    #[default]
    Default,
    Verbose,
    Debug,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DensityMode {
    Compact,
    Comfortable,
    Prose,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HintMode {
    Off,
    HoverOnly,
    Full,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MotionBudget {
    None,
    FatalOnly,
    Standard,
    Full,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GlyphMode {
    Ascii,
    Unicode,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct VerbosityPreset {
    pub density: DensityMode,
    pub sparkline_visible: bool,
    pub ribbon_visible: bool,
    pub pressure_meter_visible: bool,
    pub timeline_visible: bool,
    pub pinned_correlations_visible: bool,
    pub hints: HintMode,
    pub motion: MotionBudget,
    pub glyphs: GlyphMode,
}

impl VerbosityLevel {
    pub fn preset(self) -> VerbosityPreset {
        match self {
            VerbosityLevel::Silent => VerbosityPreset {
                density: DensityMode::Compact,
                sparkline_visible: false,
                ribbon_visible: false,
                pressure_meter_visible: false,
                timeline_visible: false,
                pinned_correlations_visible: false,
                hints: HintMode::Off,
                motion: MotionBudget::None,
                glyphs: GlyphMode::Unicode,
            },
            VerbosityLevel::Quiet => VerbosityPreset {
                density: DensityMode::Compact,
                sparkline_visible: true,
                ribbon_visible: true,
                pressure_meter_visible: false,
                timeline_visible: false,
                pinned_correlations_visible: false,
                hints: HintMode::Off,
                motion: MotionBudget::FatalOnly,
                glyphs: GlyphMode::Unicode,
            },
            VerbosityLevel::Default => VerbosityPreset {
                density: DensityMode::Comfortable,
                sparkline_visible: true,
                ribbon_visible: true,
                pressure_meter_visible: true,
                timeline_visible: false,
                pinned_correlations_visible: false,
                hints: HintMode::HoverOnly,
                motion: MotionBudget::Standard,
                glyphs: GlyphMode::Unicode,
            },
            VerbosityLevel::Verbose => VerbosityPreset {
                density: DensityMode::Prose,
                sparkline_visible: true,
                ribbon_visible: true,
                pressure_meter_visible: true,
                timeline_visible: true,
                pinned_correlations_visible: true,
                hints: HintMode::Full,
                motion: MotionBudget::Standard,
                glyphs: GlyphMode::Unicode,
            },
            VerbosityLevel::Debug => VerbosityPreset {
                density: DensityMode::Prose,
                sparkline_visible: true,
                ribbon_visible: true,
                pressure_meter_visible: true,
                timeline_visible: true,
                pinned_correlations_visible: true,
                hints: HintMode::Full,
                motion: MotionBudget::Full,
                glyphs: GlyphMode::Unicode,
            },
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            VerbosityLevel::Silent => "silent",
            VerbosityLevel::Quiet => "quiet",
            VerbosityLevel::Default => "default",
            VerbosityLevel::Verbose => "verbose",
            VerbosityLevel::Debug => "debug",
        }
    }

    pub fn raise(self) -> VerbosityLevel {
        match self {
            VerbosityLevel::Silent => VerbosityLevel::Quiet,
            VerbosityLevel::Quiet => VerbosityLevel::Default,
            VerbosityLevel::Default => VerbosityLevel::Verbose,
            VerbosityLevel::Verbose => VerbosityLevel::Debug,
            VerbosityLevel::Debug => VerbosityLevel::Debug,
        }
    }

    pub fn lower(self) -> VerbosityLevel {
        match self {
            VerbosityLevel::Silent => VerbosityLevel::Silent,
            VerbosityLevel::Quiet => VerbosityLevel::Silent,
            VerbosityLevel::Default => VerbosityLevel::Quiet,
            VerbosityLevel::Verbose => VerbosityLevel::Default,
            VerbosityLevel::Debug => VerbosityLevel::Verbose,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn raise_climbs_until_debug_then_stops() {
        let mut level = VerbosityLevel::Silent;
        for expected in [
            VerbosityLevel::Quiet,
            VerbosityLevel::Default,
            VerbosityLevel::Verbose,
            VerbosityLevel::Debug,
            VerbosityLevel::Debug,
        ] {
            level = level.raise();
            assert_eq!(level, expected);
        }
    }

    #[test]
    fn lower_descends_until_silent_then_stops() {
        let mut level = VerbosityLevel::Debug;
        for expected in [
            VerbosityLevel::Verbose,
            VerbosityLevel::Default,
            VerbosityLevel::Quiet,
            VerbosityLevel::Silent,
            VerbosityLevel::Silent,
        ] {
            level = level.lower();
            assert_eq!(level, expected);
        }
    }

    #[test]
    fn silent_disables_all_drawers_and_motion() {
        let preset = VerbosityLevel::Silent.preset();
        assert!(!preset.sparkline_visible);
        assert!(!preset.ribbon_visible);
        assert!(!preset.pressure_meter_visible);
        assert!(!preset.timeline_visible);
        assert!(!preset.pinned_correlations_visible);
        assert_eq!(preset.hints, HintMode::Off);
        assert_eq!(preset.motion, MotionBudget::None);
    }

    #[test]
    fn default_keeps_three_core_drawers() {
        let preset = VerbosityLevel::Default.preset();
        assert!(preset.sparkline_visible);
        assert!(preset.ribbon_visible);
        assert!(preset.pressure_meter_visible);
        assert!(!preset.timeline_visible);
        assert_eq!(preset.density, DensityMode::Comfortable);
    }

    #[test]
    fn verbose_unlocks_all_drawers_with_prose_density() {
        let preset = VerbosityLevel::Verbose.preset();
        assert!(preset.timeline_visible);
        assert!(preset.pinned_correlations_visible);
        assert_eq!(preset.density, DensityMode::Prose);
        assert_eq!(preset.motion, MotionBudget::Standard);
    }

    #[test]
    fn debug_lifts_motion_to_full() {
        let debug = VerbosityLevel::Debug.preset();
        let verbose = VerbosityLevel::Verbose.preset();
        assert_eq!(debug.motion, MotionBudget::Full);
        assert_eq!(verbose.motion, MotionBudget::Standard);
    }

    #[test]
    fn default_level_is_default_variant() {
        let preset = VerbosityLevel::default().preset();
        assert_eq!(preset, VerbosityLevel::Default.preset());
    }

    #[test]
    fn labels_are_lowercase_ascii() {
        for level in [
            VerbosityLevel::Silent,
            VerbosityLevel::Quiet,
            VerbosityLevel::Default,
            VerbosityLevel::Verbose,
            VerbosityLevel::Debug,
        ] {
            let label = level.label();
            assert!(label.chars().all(|c| c.is_ascii_lowercase()));
        }
    }
}
