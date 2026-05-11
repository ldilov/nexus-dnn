use std::io::ErrorKind;
use std::path::{Path, PathBuf};

use serde::Deserialize;

use crate::repl::ansi::PaletteColor;
use crate::theme::tokens::{
    AccentTokens, ChromeTokens, MotionTokens, SeverityTokens, SpectralTheme, SurfaceTokens,
};

const MIN_SEVERITY_CONTRAST: f32 = 4.5;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ThemePaths {
    pub config_dir: PathBuf,
    pub theme_file: PathBuf,
    pub history_file: PathBuf,
    pub legacy_history_file: PathBuf,
}

#[derive(Debug, Clone, PartialEq)]
pub struct LoadedTheme {
    pub theme: SpectralTheme,
    pub report: ContrastReport,
    pub source: ThemeSource,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ThemeSource {
    Default,
    File,
}

#[derive(Debug, Clone, PartialEq, Default)]
pub struct ContrastReport {
    pub checks: Vec<ContrastCheck>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ContrastCheck {
    pub token: &'static str,
    pub ratio: f32,
    pub minimum: f32,
}

#[derive(Debug)]
pub enum ThemeLoadError {
    Io(std::io::Error),
    Parse(String),
    Contrast(ContrastReport),
}

impl std::fmt::Display for ThemeLoadError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Io(err) => write!(f, "{err}"),
            Self::Parse(err) => write!(f, "{err}"),
            Self::Contrast(report) => write!(f, "theme contrast validation failed: {report}"),
        }
    }
}

impl std::error::Error for ThemeLoadError {}

impl std::fmt::Display for ContrastReport {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut first = true;
        for check in self.failing_checks() {
            if !first {
                write!(f, ", ")?;
            }
            first = false;
            write!(
                f,
                "{}={:.2}:1 < {:.1}:1",
                check.token, check.ratio, check.minimum
            )?;
        }
        if first {
            write!(f, "ok")?;
        }
        Ok(())
    }
}

impl ContrastReport {
    pub fn for_theme(theme: &SpectralTheme) -> Self {
        let background = theme.surfaces.canvas;
        let checks = [
            ("severity.debug", theme.severity.debug),
            ("severity.info", theme.severity.info),
            ("severity.warn", theme.severity.warn),
            ("severity.error", theme.severity.error),
            ("severity.fatal", theme.severity.fatal),
        ]
        .into_iter()
        .map(|(token, color)| ContrastCheck {
            token,
            ratio: color.contrast_ratio(background),
            minimum: MIN_SEVERITY_CONTRAST,
        })
        .collect();
        Self { checks }
    }

    pub fn is_passing(&self) -> bool {
        self.checks.iter().all(|check| check.ratio >= check.minimum)
    }

    pub fn failing_checks(&self) -> impl Iterator<Item = &ContrastCheck> {
        self.checks
            .iter()
            .filter(|check| check.ratio < check.minimum)
    }
}

pub fn theme_paths() -> ThemePaths {
    resolve_theme_paths(
        std::env::var_os("XDG_CONFIG_HOME").map(PathBuf::from),
        std::env::var_os("APPDATA").map(PathBuf::from),
        std::env::var_os("HOME")
            .or_else(|| std::env::var_os("USERPROFILE"))
            .map(PathBuf::from),
    )
}

pub fn resolve_theme_paths(
    xdg_config_home: Option<PathBuf>,
    appdata: Option<PathBuf>,
    home: Option<PathBuf>,
) -> ThemePaths {
    let config_root = xdg_config_home
        .or(appdata)
        .or_else(|| home.clone().map(|base| base.join(".config")))
        .unwrap_or_else(|| PathBuf::from("."));
    let config_dir = config_root.join("nexus-tui");
    let legacy_root = home.unwrap_or_else(|| PathBuf::from("."));
    ThemePaths {
        theme_file: config_dir.join("theme.toml"),
        history_file: config_dir.join("history"),
        legacy_history_file: legacy_root.join(".nexus").join("history"),
        config_dir,
    }
}

pub fn load_theme() -> Result<LoadedTheme, ThemeLoadError> {
    let paths = theme_paths();
    load_theme_from_path(&paths.theme_file)
}

pub fn load_theme_from_path(path: &Path) -> Result<LoadedTheme, ThemeLoadError> {
    match std::fs::read_to_string(path) {
        Ok(contents) => load_theme_from_str(&contents, ThemeSource::File),
        Err(err) if err.kind() == ErrorKind::NotFound => {
            let theme = SpectralTheme::default();
            let report = ContrastReport::for_theme(&theme);
            Ok(LoadedTheme {
                theme,
                report,
                source: ThemeSource::Default,
            })
        }
        Err(err) => Err(ThemeLoadError::Io(err)),
    }
}

fn load_theme_from_str(
    contents: &str,
    source: ThemeSource,
) -> Result<LoadedTheme, ThemeLoadError> {
    let overrides: ThemeOverrides = toml::from_str(contents)
        .map_err(|err| ThemeLoadError::Parse(format!("invalid theme.toml: {err}")))?;
    let theme = overrides.apply_to(SpectralTheme::default())?;
    let report = ContrastReport::for_theme(&theme);
    if !report.is_passing() {
        return Err(ThemeLoadError::Contrast(report));
    }
    Ok(LoadedTheme {
        theme,
        report,
        source,
    })
}

#[derive(Debug, Default, Deserialize)]
struct ThemeOverrides {
    severity: Option<SeverityOverrides>,
    surfaces: Option<SurfaceOverrides>,
    accents: Option<AccentOverrides>,
    chrome: Option<ChromeOverrides>,
    motion: Option<MotionOverrides>,
}

impl ThemeOverrides {
    fn apply_to(self, mut theme: SpectralTheme) -> Result<SpectralTheme, ThemeLoadError> {
        if let Some(severity) = self.severity {
            theme.severity = severity.apply_to(theme.severity)?;
        }
        if let Some(surfaces) = self.surfaces {
            theme.surfaces = surfaces.apply_to(theme.surfaces)?;
        }
        if let Some(accents) = self.accents {
            theme.accents = accents.apply_to(theme.accents)?;
        }
        if let Some(chrome) = self.chrome {
            theme.chrome = chrome.apply_to(theme.chrome)?;
        }
        if let Some(motion) = self.motion {
            theme.motion = motion.apply_to(theme.motion);
        }
        Ok(theme)
    }
}

#[derive(Debug, Default, Deserialize)]
struct SeverityOverrides {
    debug: Option<String>,
    info: Option<String>,
    warn: Option<String>,
    error: Option<String>,
    fatal: Option<String>,
}

impl SeverityOverrides {
    fn apply_to(self, mut tokens: SeverityTokens) -> Result<SeverityTokens, ThemeLoadError> {
        if let Some(value) = self.debug {
            tokens.debug = parse_color("severity.debug", &value)?;
        }
        if let Some(value) = self.info {
            tokens.info = parse_color("severity.info", &value)?;
        }
        if let Some(value) = self.warn {
            tokens.warn = parse_color("severity.warn", &value)?;
        }
        if let Some(value) = self.error {
            tokens.error = parse_color("severity.error", &value)?;
        }
        if let Some(value) = self.fatal {
            tokens.fatal = parse_color("severity.fatal", &value)?;
        }
        Ok(tokens)
    }
}

#[derive(Debug, Default, Deserialize)]
struct SurfaceOverrides {
    canvas: Option<String>,
    panel: Option<String>,
    subtle: Option<String>,
    dim_text: Option<String>,
}

impl SurfaceOverrides {
    fn apply_to(self, mut tokens: SurfaceTokens) -> Result<SurfaceTokens, ThemeLoadError> {
        if let Some(value) = self.canvas {
            tokens.canvas = parse_color("surfaces.canvas", &value)?;
        }
        if let Some(value) = self.panel {
            tokens.panel = parse_color("surfaces.panel", &value)?;
        }
        if let Some(value) = self.subtle {
            tokens.subtle = parse_color("surfaces.subtle", &value)?;
        }
        if let Some(value) = self.dim_text {
            tokens.dim_text = parse_color("surfaces.dim_text", &value)?;
        }
        Ok(tokens)
    }
}

#[derive(Debug, Default, Deserialize)]
struct AccentOverrides {
    primary: Option<String>,
    secondary: Option<String>,
    tertiary: Option<String>,
    success: Option<String>,
    danger: Option<String>,
    info: Option<String>,
}

impl AccentOverrides {
    fn apply_to(self, mut tokens: AccentTokens) -> Result<AccentTokens, ThemeLoadError> {
        if let Some(value) = self.primary {
            tokens.primary = parse_color("accents.primary", &value)?;
        }
        if let Some(value) = self.secondary {
            tokens.secondary = parse_color("accents.secondary", &value)?;
        }
        if let Some(value) = self.tertiary {
            tokens.tertiary = parse_color("accents.tertiary", &value)?;
        }
        if let Some(value) = self.success {
            tokens.success = parse_color("accents.success", &value)?;
        }
        if let Some(value) = self.danger {
            tokens.danger = parse_color("accents.danger", &value)?;
        }
        if let Some(value) = self.info {
            tokens.info = parse_color("accents.info", &value)?;
        }
        Ok(tokens)
    }
}

#[derive(Debug, Default, Deserialize)]
struct ChromeOverrides {
    gutter: Option<String>,
    indicator: Option<String>,
    link: Option<String>,
    thread_leaf: Option<String>,
}

impl ChromeOverrides {
    fn apply_to(self, mut tokens: ChromeTokens) -> Result<ChromeTokens, ThemeLoadError> {
        if let Some(value) = self.gutter {
            tokens.gutter = parse_color("chrome.gutter", &value)?;
        }
        if let Some(value) = self.indicator {
            tokens.indicator = parse_color("chrome.indicator", &value)?;
        }
        if let Some(value) = self.link {
            tokens.link = parse_color("chrome.link", &value)?;
        }
        if let Some(value) = self.thread_leaf {
            tokens.thread_leaf = parse_color("chrome.thread_leaf", &value)?;
        }
        Ok(tokens)
    }
}

#[derive(Debug, Default, Deserialize)]
struct MotionOverrides {
    reduce_motion: Option<bool>,
    pulse_frames: Option<u16>,
    hover_frames: Option<u16>,
}

impl MotionOverrides {
    fn apply_to(self, mut tokens: MotionTokens) -> MotionTokens {
        if let Some(value) = self.reduce_motion {
            tokens.reduce_motion = value;
        }
        if let Some(value) = self.pulse_frames {
            tokens.pulse_frames = value;
        }
        if let Some(value) = self.hover_frames {
            tokens.hover_frames = value;
        }
        tokens
    }
}

fn parse_color(token: &'static str, value: &str) -> Result<PaletteColor, ThemeLoadError> {
    let rgb = parse_hex_color(value)
        .ok_or_else(|| ThemeLoadError::Parse(format!("invalid color for {token}: {value}")))?;
    Ok(PaletteColor::from_truecolor(rgb))
}

fn parse_hex_color(value: &str) -> Option<(u8, u8, u8)> {
    let hex = value.trim().strip_prefix('#')?;
    if hex.len() != 6 {
        return None;
    }
    let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
    let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
    let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
    Some((r, g, b))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn missing_theme_file_falls_back_to_default_theme() {
        let temp = tempfile::tempdir().unwrap();
        let loaded = load_theme_from_path(&temp.path().join("missing-theme.toml")).unwrap();
        assert_eq!(loaded.source, ThemeSource::Default);
        assert_eq!(loaded.theme, SpectralTheme::default());
    }

    #[test]
    fn theme_loader_rejects_severity_colors_below_wcag_threshold() {
        let temp = tempfile::tempdir().unwrap();
        let theme_path = temp.path().join("theme.toml");
        std::fs::write(
            &theme_path,
            r##"
[surfaces]
canvas = "#101317"

[severity]
error = "#121416"
"##,
        )
        .unwrap();

        let err = load_theme_from_path(&theme_path).unwrap_err();
        match err {
            ThemeLoadError::Contrast(report) => {
                assert!(
                    report
                        .checks
                        .iter()
                        .any(|check| check.token == "severity.error" && check.ratio < 4.5),
                    "expected severity.error contrast failure, got {report:?}"
                );
            }
            other => panic!("expected contrast error, got {other:?}"),
        }
    }

    #[test]
    fn resolve_theme_paths_prefers_config_home_and_keeps_legacy_history_separate() {
        let paths = resolve_theme_paths(
            Some(PathBuf::from("/cfg")),
            Some(PathBuf::from("/appdata")),
            Some(PathBuf::from("/home/alice")),
        );
        assert_eq!(paths.config_dir, PathBuf::from("/cfg/nexus-tui"));
        assert_eq!(paths.theme_file, PathBuf::from("/cfg/nexus-tui/theme.toml"));
        assert_eq!(paths.history_file, PathBuf::from("/cfg/nexus-tui/history"));
        assert_eq!(
            paths.legacy_history_file,
            PathBuf::from("/home/alice/.nexus/history")
        );
    }
}
