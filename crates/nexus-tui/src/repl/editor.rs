use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use crossterm::event::MouseEvent;
use nu_ansi_term::Style as NuStyle;
use reedline::{
    ColumnarMenu, DefaultHinter, EditCommand, EditMode, Emacs, FileBackedHistory, KeyCode,
    KeyModifiers, MenuBuilder, Reedline, ReedlineEvent, ReedlineMenu, Signal,
    default_emacs_keybindings,
};
use tokio::sync::mpsc::Sender as TokioSender;

use crate::repl::ansi::ColorDepth;
use crate::repl::completion::SlashCompleter;
use crate::repl::mouse_edit_mode::{MenuFocus, MenuKey, MouseAwareEditMode};
use crate::repl::prompt::AmbientPrompt;
use crate::stream::ring_buffer::RingBuffer;
use crate::theme::loader::{ThemePaths, theme_paths};
use crate::theme::tokens::{MenuTokens, SpectralTheme};

const HISTORY_CAPACITY: usize = 1000;
const COMPLETION_MENU_NAME: &str = "completion_menu";

#[derive(Clone)]
pub struct MouseHooks {
    pub mouse_tx: TokioSender<MouseEvent>,
    pub menu_focus: MenuFocus,
    pub menu_key_tx: TokioSender<MenuKey>,
}

pub fn build_editor() -> anyhow::Result<Reedline> {
    build_editor_with_mouse(None, None)
}

pub fn build_editor_with_mouse(
    mouse_hooks: Option<MouseHooks>,
    ring: Option<Arc<Mutex<RingBuffer>>>,
) -> anyhow::Result<Reedline> {
    build_editor_with_theme(
        mouse_hooks,
        ring,
        SpectralTheme::default(),
        ColorDepth::Color256,
    )
}

pub fn build_editor_with_theme(
    mouse_hooks: Option<MouseHooks>,
    ring: Option<Arc<Mutex<RingBuffer>>>,
    theme: SpectralTheme,
    color_depth: ColorDepth,
) -> anyhow::Result<Reedline> {
    let history_path = history_path()?;
    let history = FileBackedHistory::with_file(HISTORY_CAPACITY, history_path)?;
    let completer: Box<SlashCompleter> = match ring {
        Some(r) => Box::new(SlashCompleter::with_ring(r)),
        None => Box::new(SlashCompleter::new()),
    };
    let menu = build_completion_menu(&theme.menu, color_depth);
    let keybindings = build_keybindings();
    let emacs: Box<dyn EditMode> = Box::new(Emacs::new(keybindings));
    let edit_mode: Box<dyn EditMode> = match mouse_hooks {
        Some(hooks) => Box::new(MouseAwareEditMode::new(
            emacs,
            hooks.mouse_tx,
            hooks.menu_focus,
            hooks.menu_key_tx,
        )),
        None => emacs,
    };
    let editor = Reedline::create()
        .with_history(Box::new(history))
        .with_completer(completer)
        .with_menu(ReedlineMenu::EngineCompleter(Box::new(menu)))
        .with_hinter(Box::new(DefaultHinter::default()))
        .with_edit_mode(edit_mode);
    Ok(editor)
}

fn build_completion_menu(tokens: &MenuTokens, depth: ColorDepth) -> ColumnarMenu {
    let inactive_fg = tokens.inactive_fg.as_nu_color(depth);
    let selected_fg = tokens.selected_fg.as_nu_color(depth);
    let selected_bg = tokens.selected_bg.as_nu_color(depth);
    let description_fg = tokens.description_fg.as_nu_color(depth);
    let match_fg = tokens.match_highlight_fg.as_nu_color(depth);

    ColumnarMenu::default()
        .with_name(COMPLETION_MENU_NAME)
        .with_marker("  › ")
        .with_column_padding(2)
        .with_text_style(NuStyle::new().fg(inactive_fg).bold())
        .with_selected_text_style(NuStyle::new().fg(selected_fg).on(selected_bg).bold())
        .with_description_text_style(NuStyle::new().fg(description_fg))
        .with_match_text_style(NuStyle::new().fg(match_fg).bold().underline())
        .with_selected_match_text_style(
            NuStyle::new()
                .fg(match_fg)
                .on(selected_bg)
                .bold()
                .underline(),
        )
}

fn build_keybindings() -> reedline::Keybindings {
    let mut keybindings = default_emacs_keybindings();
    keybindings.add_binding(
        KeyModifiers::NONE,
        KeyCode::Tab,
        ReedlineEvent::UntilFound(vec![
            ReedlineEvent::Menu(COMPLETION_MENU_NAME.into()),
            ReedlineEvent::MenuNext,
        ]),
    );
    keybindings.add_binding(
        KeyModifiers::CONTROL,
        KeyCode::Char('e'),
        ReedlineEvent::Multiple(vec![
            ReedlineEvent::Edit(vec![
                EditCommand::Clear,
                EditCommand::InsertString("/last 1 error".to_string()),
            ]),
            ReedlineEvent::Submit,
        ]),
    );
    keybindings.add_binding(
        KeyModifiers::CONTROL,
        KeyCode::Char('g'),
        ReedlineEvent::Multiple(vec![
            ReedlineEvent::Edit(vec![
                EditCommand::Clear,
                EditCommand::InsertString("/pause".to_string()),
            ]),
            ReedlineEvent::Submit,
        ]),
    );
    keybindings.add_binding(
        KeyModifiers::CONTROL,
        KeyCode::Char('t'),
        ReedlineEvent::Multiple(vec![
            ReedlineEvent::Edit(vec![
                EditCommand::Clear,
                EditCommand::InsertString("/where".to_string()),
            ]),
            ReedlineEvent::Submit,
        ]),
    );
    keybindings
}

fn history_path() -> std::io::Result<PathBuf> {
    prepare_history_path(&theme_paths())
}

fn prepare_history_path(paths: &ThemePaths) -> std::io::Result<PathBuf> {
    std::fs::create_dir_all(&paths.config_dir)?;

    if paths.history_file.exists() {
        return Ok(paths.history_file.clone());
    }

    if paths.legacy_history_file.exists() {
        migrate_legacy_history(&paths.legacy_history_file, &paths.history_file)?;
    }

    Ok(paths.history_file.clone())
}

fn migrate_legacy_history(legacy: &PathBuf, target: &PathBuf) -> std::io::Result<()> {
    match std::fs::rename(legacy, target) {
        Ok(()) => Ok(()),
        Err(_) => {
            std::fs::copy(legacy, target)?;
            if let Err(err) = std::fs::remove_file(legacy) {
                tracing::warn!(
                    legacy = %legacy.display(),
                    error = %err,
                    "history copied to new location but legacy file could not be removed",
                );
            }
            Ok(())
        }
    }
}

pub fn read_one(editor: &mut Reedline, prompt: &AmbientPrompt) -> std::io::Result<EditorOutcome> {
    match editor.read_line(prompt) {
        Ok(Signal::Success(line)) => Ok(EditorOutcome::Line(line)),
        Ok(Signal::CtrlC) => Ok(EditorOutcome::Interrupt),
        Ok(Signal::CtrlD) => Ok(EditorOutcome::Quit),
        Err(err) => Err(err),
    }
}

#[derive(Debug)]
pub enum EditorOutcome {
    Line(String),
    Interrupt,
    Quit,
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::theme::loader::resolve_theme_paths;

    #[test]
    fn history_path_moves_to_nexus_tui_config_home() {
        let paths = resolve_theme_paths(
            Some(PathBuf::from("/cfg")),
            None,
            Some(PathBuf::from("/home/alice")),
        );
        assert_eq!(paths.history_file, PathBuf::from("/cfg/nexus-tui/history"));
    }

    #[test]
    fn legacy_history_is_migrated_to_new_config_home() {
        let temp = tempfile::tempdir().unwrap();
        let home = temp.path().join("home");
        let config = temp.path().join("cfg");
        let legacy_history = home.join(".nexus").join("history");
        std::fs::create_dir_all(legacy_history.parent().unwrap()).unwrap();
        std::fs::write(&legacy_history, "old commands").unwrap();

        let paths = resolve_theme_paths(Some(config.clone()), None, Some(home.clone()));
        let migrated = prepare_history_path(&paths).unwrap();
        assert_eq!(migrated, paths.history_file);
        assert!(paths.history_file.exists());
        let contents = std::fs::read_to_string(&paths.history_file).unwrap();
        assert_eq!(contents, "old commands");
        assert!(!legacy_history.exists());
    }

    #[test]
    fn build_editor_with_theme_uses_menu_tokens_via_palette_conversion() {
        let theme = SpectralTheme::default();
        let inactive = theme.menu.inactive_fg.as_nu_color(ColorDepth::Color256);
        assert!(matches!(inactive, nu_ansi_term::Color::Fixed(75)));
        let selected_bg = theme.menu.selected_bg.as_nu_color(ColorDepth::Color256);
        assert!(matches!(selected_bg, nu_ansi_term::Color::Fixed(33)));
    }
}
