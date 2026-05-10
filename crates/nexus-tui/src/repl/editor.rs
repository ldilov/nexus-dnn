//! Reedline editor wrapper with persistent history at `~/.nexus/history`.
//!
//! Phase 3 only handles ambient streaming + clean exit; slash commands
//! land in Phase 4. The editor here exists so Ctrl+D resolves to a
//! clean signal that the main loop can observe.

use std::path::PathBuf;

use nu_ansi_term::{Color as NuColor, Style as NuStyle};
use reedline::{
    ColumnarMenu, DefaultHinter, EditCommand, EditMode, Emacs, FileBackedHistory, KeyCode,
    KeyModifiers, MenuBuilder, Reedline, ReedlineEvent, ReedlineMenu, Signal,
    default_emacs_keybindings,
};

use std::sync::{Arc, Mutex};

use crate::repl::completion::SlashCompleter;
use crate::repl::mouse_edit_mode::{MenuFocus, MenuKey, MouseAwareEditMode};
use crate::repl::prompt::AmbientPrompt;
use crate::stream::ring_buffer::RingBuffer;
use crossterm::event::MouseEvent;
use tokio::sync::mpsc::Sender as TokioSender;

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
    let history_path = history_path();
    if let Some(parent) = history_path.parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    let history = FileBackedHistory::with_file(HISTORY_CAPACITY, history_path)?;
    let completer: Box<SlashCompleter> = match ring {
        Some(r) => Box::new(SlashCompleter::with_ring(r)),
        None => Box::new(SlashCompleter::new()),
    };
    let menu = ColumnarMenu::default()
        .with_name(COMPLETION_MENU_NAME)
        .with_marker("  › ")
        .with_column_padding(2)
        .with_text_style(NuStyle::new().fg(NuColor::Fixed(245)))
        .with_selected_text_style(
            NuStyle::new()
                .fg(NuColor::Black)
                .on(NuColor::Fixed(75))
                .bold(),
        )
        .with_description_text_style(NuStyle::new().fg(NuColor::Fixed(141)).italic())
        .with_match_text_style(NuStyle::new().fg(NuColor::Fixed(75)).underline())
        .with_selected_match_text_style(
            NuStyle::new()
                .fg(NuColor::Black)
                .on(NuColor::Fixed(75))
                .bold()
                .underline(),
        );
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

fn history_path() -> PathBuf {
    let home = dirs_home().unwrap_or_else(|| PathBuf::from("."));
    home.join(".nexus").join("history")
}

fn dirs_home() -> Option<PathBuf> {
    std::env::var_os("HOME")
        .or_else(|| std::env::var_os("USERPROFILE"))
        .map(PathBuf::from)
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
