//! Reedline `EditMode` that intercepts crossterm mouse events and routes
//! them to a channel before delegating keyboard events to a wrapped inner
//! mode (Emacs by default).
//!
//! Spec 044 wire-up: `crossterm` enables SGR mouse mode 1006 inside the
//! `TerminalGuard`, so reedline already receives `Event::Mouse` payloads.
//! Reedline itself has no mouse vocabulary — without this shim those
//! events would be parsed as no-ops by the inner mode and lost. This
//! mode siphons them off into a `TokioSender` so the runtime's mouse
//! dispatcher can act on them while reedline keeps the input cursor
//! responsive.
//!
//! The mode also supports a *modal-key intercept* hook: when the
//! right-click context menu is open the dispatcher sets a flag and our
//! `parse_event` returns `ReedlineEvent::None` for arrow / Enter / Esc
//! key events, sending them to the menu controller's input channel
//! instead. That keeps reedline from reacting to navigation keystrokes
//! while the menu is the active focus.

use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};

use crossterm::event::{Event, KeyCode, KeyEvent, KeyEventKind, MouseEvent};
use reedline::{EditMode, PromptEditMode, ReedlineEvent, ReedlineRawEvent};
use tokio::sync::mpsc::Sender as TokioSender;

/// Shared, lock-free flag toggled by the menu controller. While `true`
/// the right-click context menu owns the keyboard — reedline is paused.
#[derive(Debug, Default, Clone)]
pub struct MenuFocus(Arc<AtomicBool>);

impl MenuFocus {
    pub fn new() -> Self {
        Self(Arc::new(AtomicBool::new(false)))
    }

    pub fn open(&self) {
        self.0.store(true, Ordering::Release);
    }

    pub fn close(&self) {
        self.0.store(false, Ordering::Release);
    }

    pub fn is_open(&self) -> bool {
        self.0.load(Ordering::Acquire)
    }
}

/// Modal navigation key the menu cares about.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MenuKey {
    Up,
    Down,
    Enter,
    Esc,
}

impl MenuKey {
    fn from_key_event(evt: &KeyEvent) -> Option<Self> {
        if evt.kind == KeyEventKind::Release {
            return None;
        }
        match evt.code {
            KeyCode::Up => Some(MenuKey::Up),
            KeyCode::Down => Some(MenuKey::Down),
            KeyCode::Enter => Some(MenuKey::Enter),
            KeyCode::Esc => Some(MenuKey::Esc),
            _ => None,
        }
    }
}

/// Intercepts crossterm mouse events into `mouse_tx` and modal menu keys
/// into `menu_key_tx` while delegating ordinary keyboard input to `inner`.
pub struct MouseAwareEditMode {
    inner: Box<dyn EditMode>,
    mouse_tx: TokioSender<MouseEvent>,
    menu_focus: MenuFocus,
    menu_key_tx: TokioSender<MenuKey>,
}

impl MouseAwareEditMode {
    pub fn new(
        inner: Box<dyn EditMode>,
        mouse_tx: TokioSender<MouseEvent>,
        menu_focus: MenuFocus,
        menu_key_tx: TokioSender<MenuKey>,
    ) -> Self {
        Self {
            inner,
            mouse_tx,
            menu_focus,
            menu_key_tx,
        }
    }
}

impl EditMode for MouseAwareEditMode {
    fn parse_event(&mut self, event: ReedlineRawEvent) -> ReedlineEvent {
        let inner_event: Event = event.into();

        if let Event::Mouse(me) = inner_event {
            // try_send drops if the receiver is full or gone; we never block
            // reedline's input loop on dispatch backpressure.
            let _ = self.mouse_tx.try_send(me);
            return ReedlineEvent::None;
        }

        if self.menu_focus.is_open()
            && let Event::Key(key_event) = inner_event
            && let Some(menu_key) = MenuKey::from_key_event(&key_event)
        {
            let _ = self.menu_key_tx.try_send(menu_key);
            return ReedlineEvent::None;
        }

        match ReedlineRawEvent::convert_from(inner_event) {
            Some(raw) => self.inner.parse_event(raw),
            None => ReedlineEvent::None,
        }
    }

    fn edit_mode(&self) -> PromptEditMode {
        self.inner.edit_mode()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crossterm::event::{KeyEvent, KeyModifiers, MouseButton, MouseEventKind};
    use reedline::{Emacs, default_emacs_keybindings};
    use tokio::sync::mpsc;

    fn make_mode() -> (
        MouseAwareEditMode,
        mpsc::Receiver<MouseEvent>,
        mpsc::Receiver<MenuKey>,
        MenuFocus,
    ) {
        let (mouse_tx, mouse_rx) = mpsc::channel::<MouseEvent>(8);
        let (menu_tx, menu_rx) = mpsc::channel::<MenuKey>(8);
        let focus = MenuFocus::new();
        let inner: Box<dyn EditMode> = Box::new(Emacs::new(default_emacs_keybindings()));
        let mode = MouseAwareEditMode::new(inner, mouse_tx, focus.clone(), menu_tx);
        (mode, mouse_rx, menu_rx, focus)
    }

    fn raw(event: Event) -> ReedlineRawEvent {
        ReedlineRawEvent::convert_from(event).expect("convertible event")
    }

    #[test]
    fn forwards_mouse_event_into_channel() {
        let (mut mode, mut mouse_rx, _menu_rx, _focus) = make_mode();
        let me = MouseEvent {
            kind: MouseEventKind::Down(MouseButton::Left),
            column: 5,
            row: 0,
            modifiers: KeyModifiers::NONE,
        };
        let evt = mode.parse_event(raw(Event::Mouse(me)));
        assert!(matches!(evt, ReedlineEvent::None));
        let received = mouse_rx.try_recv().expect("mouse event delivered");
        assert!(matches!(
            received.kind,
            MouseEventKind::Down(MouseButton::Left)
        ));
    }

    #[test]
    fn intercepts_arrow_keys_when_menu_open() {
        let (mut mode, _mouse_rx, mut menu_rx, focus) = make_mode();
        focus.open();
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Down,
            KeyModifiers::NONE,
        ))));
        assert!(matches!(evt, ReedlineEvent::None));
        assert_eq!(menu_rx.try_recv().ok(), Some(MenuKey::Down));
    }

    #[test]
    fn ignores_arrow_keys_when_menu_closed() {
        let (mut mode, _mouse_rx, mut menu_rx, _focus) = make_mode();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Down,
            KeyModifiers::NONE,
        ))));
        assert!(menu_rx.try_recv().is_err(), "menu rx must be empty");
    }

    #[test]
    fn esc_closes_menu_via_intercept() {
        let (mut mode, _mouse_rx, mut menu_rx, focus) = make_mode();
        focus.open();
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Esc,
            KeyModifiers::NONE,
        ))));
        assert!(matches!(evt, ReedlineEvent::None));
        assert_eq!(menu_rx.try_recv().ok(), Some(MenuKey::Esc));
    }

    #[test]
    fn enter_intercepted_when_menu_open() {
        let (mut mode, _mouse_rx, mut menu_rx, focus) = make_mode();
        focus.open();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Enter,
            KeyModifiers::NONE,
        ))));
        assert_eq!(menu_rx.try_recv().ok(), Some(MenuKey::Enter));
    }

    #[test]
    fn menu_focus_default_closed() {
        let focus = MenuFocus::new();
        assert!(!focus.is_open());
        focus.open();
        assert!(focus.is_open());
        focus.close();
        assert!(!focus.is_open());
    }
}
