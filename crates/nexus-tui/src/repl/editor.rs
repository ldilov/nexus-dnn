//! Reedline editor wrapper with persistent history at `~/.nexus/history`.
//!
//! Phase 3 only handles ambient streaming + clean exit; slash commands
//! land in Phase 4. The editor here exists so Ctrl+D resolves to a
//! clean signal that the main loop can observe.

use std::path::PathBuf;

use reedline::{
    ColumnarMenu, Emacs, FileBackedHistory, KeyCode, KeyModifiers, MenuBuilder, Reedline,
    ReedlineEvent, ReedlineMenu, Signal, default_emacs_keybindings,
};

use crate::repl::completion::SlashCompleter;
use crate::repl::prompt::AmbientPrompt;

const HISTORY_CAPACITY: usize = 1000;
const COMPLETION_MENU_NAME: &str = "completion_menu";

pub fn build_editor() -> anyhow::Result<Reedline> {
    let history_path = history_path();
    if let Some(parent) = history_path.parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    let history = FileBackedHistory::with_file(HISTORY_CAPACITY, history_path)?;
    let completer = Box::<SlashCompleter>::default();
    let menu = ColumnarMenu::default().with_name(COMPLETION_MENU_NAME);
    let mut keybindings = default_emacs_keybindings();
    keybindings.add_binding(
        KeyModifiers::NONE,
        KeyCode::Tab,
        ReedlineEvent::UntilFound(vec![
            ReedlineEvent::Menu(COMPLETION_MENU_NAME.into()),
            ReedlineEvent::MenuNext,
        ]),
    );
    let edit_mode = Box::new(Emacs::new(keybindings));
    let editor = Reedline::create()
        .with_history(Box::new(history))
        .with_completer(completer)
        .with_menu(ReedlineMenu::EngineCompleter(Box::new(menu)))
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
