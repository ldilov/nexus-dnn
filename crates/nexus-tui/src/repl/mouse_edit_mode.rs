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

use crossterm::event::{Event, KeyCode, KeyEvent, KeyEventKind, KeyModifiers, MouseEvent};
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

/// Shared, lock-free flag toggled by the filter controller. While `true`
/// the incremental filter bar owns the keyboard — reedline is paused and
/// every key event is forwarded to the filter-key channel.
///
/// Opened automatically by `MouseAwareEditMode` when the user presses
/// `/` on an empty prompt buffer (Define spec 044 Q1: modal-with-fallback).
/// Closed by the filter controller on Esc / Enter.
#[derive(Debug, Default, Clone)]
pub struct FilterFocus(Arc<AtomicBool>);

impl FilterFocus {
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

/// A single keystroke routed to the filter controller while
/// [`FilterFocus`] is open.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FilterKey {
    Char(char),
    Backspace,
    Enter,
    Esc,
    /// Ctrl+U or Ctrl+W — clear the entire filter buffer.
    Clear,
}

impl FilterKey {
    fn from_key_event(evt: &KeyEvent) -> Option<Self> {
        if evt.kind == KeyEventKind::Release {
            return None;
        }
        if evt.modifiers.contains(KeyModifiers::CONTROL) {
            return match evt.code {
                KeyCode::Char('u') | KeyCode::Char('w') => Some(FilterKey::Clear),
                KeyCode::Char('c') => Some(FilterKey::Esc),
                _ => None,
            };
        }
        match evt.code {
            KeyCode::Char(c) => Some(FilterKey::Char(c)),
            KeyCode::Backspace => Some(FilterKey::Backspace),
            KeyCode::Enter => Some(FilterKey::Enter),
            KeyCode::Esc => Some(FilterKey::Esc),
            _ => None,
        }
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
///
/// Also owns the filter-mode bridge: tracks a best-effort mirror of the
/// prompt buffer length so that `/` on an empty buffer can be promoted
/// into a filter-mode open (per spec 044 Define Q1 — `/` opens the
/// incremental filter bar; modal-with-fallback otherwise).
pub struct MouseAwareEditMode {
    inner: Box<dyn EditMode>,
    mouse_tx: TokioSender<MouseEvent>,
    menu_focus: MenuFocus,
    menu_key_tx: TokioSender<MenuKey>,
    filter_focus: Option<FilterFocus>,
    filter_key_tx: Option<TokioSender<FilterKey>>,
    /// Best-effort character count of the live prompt buffer. We can't
    /// query reedline for its buffer, so we count printable Char events
    /// and decrement on Backspace. Reset to 0 on Enter / Esc. Heuristic
    /// only — paste, history recall, and other reedline edit actions
    /// will drift the mirror; that's acceptable per the Define spec
    /// since the only thing it gates is "is `/` the first keystroke?"
    buffer_chars: usize,
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
            filter_focus: None,
            filter_key_tx: None,
            buffer_chars: 0,
        }
    }

    /// Attach the filter-mode bridge. When `focus` is opened by either
    /// (a) the user pressing `/` on an empty buffer, or (b) an external
    /// trigger calling `focus.open()`, all subsequent key events are
    /// converted to [`FilterKey`] and forwarded to `key_tx` until the
    /// focus closes.
    pub fn with_filter_bridge(
        mut self,
        focus: FilterFocus,
        key_tx: TokioSender<FilterKey>,
    ) -> Self {
        self.filter_focus = Some(focus);
        self.filter_key_tx = Some(key_tx);
        self
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

        // Filter mode — already open: route every key event to the
        // filter controller, do NOT let reedline see it.
        if let (Some(focus), Some(tx)) = (&self.filter_focus, &self.filter_key_tx)
            && focus.is_open()
            && let Event::Key(key_event) = inner_event
            && let Some(fk) = FilterKey::from_key_event(&key_event)
        {
            let _ = tx.try_send(fk);
            // Filter Enter/Esc close the focus, but the controller
            // performs the close — we just relay the keystroke.
            return ReedlineEvent::None;
        }

        // Filter mode — closed: `/` on an empty buffer promotes to a
        // filter-mode open. The keystroke is consumed (reedline doesn't
        // see it; no `/` appears in the buffer).
        if let (Some(focus), Some(tx)) = (&self.filter_focus, &self.filter_key_tx)
            && !focus.is_open()
            && self.buffer_chars == 0
            && let Event::Key(key_event) = inner_event
            && key_event.kind != KeyEventKind::Release
            && key_event.modifiers.is_empty()
            && let KeyCode::Char('/') = key_event.code
        {
            focus.open();
            // Wake the controller so it can clear the prompt area and
            // start rendering the filter bar. If the controller's
            // receiver is gone (task panicked or shutdown beat us),
            // roll the focus flag back to closed so reedline keeps
            // the keyboard — otherwise the prompt would freeze
            // (review H3 — flag-vs-consumer desync).
            use tokio::sync::mpsc::error::TrySendError;
            match tx.try_send(FilterKey::Backspace) {
                Ok(()) | Err(TrySendError::Full(_)) => {}
                Err(TrySendError::Closed(_)) => {
                    focus.close();
                    // Let the `/` keystroke fall through to reedline
                    // as a normal character; user sees `/` in buffer.
                    self.buffer_chars = self.buffer_chars.saturating_add(1);
                    match ReedlineRawEvent::convert_from(inner_event) {
                        Some(raw) => return self.inner.parse_event(raw),
                        None => return ReedlineEvent::None,
                    }
                }
            }
            return ReedlineEvent::None;
        }

        if let Event::Key(key_event) = inner_event
            && key_event.kind != KeyEventKind::Release
        {
            self.track_buffer(&key_event);
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

impl MouseAwareEditMode {
    /// Mirror reedline's buffer length to enable empty-buffer detection
    /// for `/` to promote into filter mode. Best-effort: we cannot read
    /// reedline's real buffer, so we approximate by counting Char events
    /// and decrementing on Backspace. Any event that *might* leave the
    /// buffer in an unknown state (history recall, cursor jumps that
    /// usually accompany content replacement, paste-style keys) forces
    /// the mirror to a defensive HIGH value — this prevents the
    /// "false-zero" failure mode where the user recalls a previous
    /// command via Up, then types `/` in the middle and unexpectedly
    /// captures keyboard into filter mode.
    fn track_buffer(&mut self, evt: &KeyEvent) {
        if evt.modifiers.contains(KeyModifiers::CONTROL) {
            match evt.code {
                // Ctrl+U / Ctrl+W clear-to-BOL semantics — buffer empty.
                KeyCode::Char('u') | KeyCode::Char('w') => self.buffer_chars = 0,
                // Ctrl+A / Ctrl+E (BOL/EOL motion) suggest the user is
                // operating on an already-populated line — force the
                // mirror non-zero so `/` here does NOT open filter.
                KeyCode::Char('a') | KeyCode::Char('e') => {
                    self.buffer_chars = self.buffer_chars.max(1);
                }
                _ => {}
            }
            return;
        }
        match evt.code {
            KeyCode::Char(_) => self.buffer_chars = self.buffer_chars.saturating_add(1),
            KeyCode::Backspace => self.buffer_chars = self.buffer_chars.saturating_sub(1),
            // Enter / Esc commits / aborts the line — true reset.
            KeyCode::Enter | KeyCode::Esc => self.buffer_chars = 0,
            // History recall, end-of-line motion, and other navigation
            // that may have just replaced the buffer with non-empty
            // content. Force non-zero so `/` after these does NOT
            // hijack focus into filter mode (review H2).
            KeyCode::Up | KeyCode::Down | KeyCode::Home | KeyCode::End => {
                self.buffer_chars = self.buffer_chars.max(1);
            }
            _ => {}
        }
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

    fn make_filter_mode() -> (MouseAwareEditMode, mpsc::Receiver<FilterKey>, FilterFocus) {
        let (mouse_tx, _mouse_rx) = mpsc::channel::<MouseEvent>(8);
        let (menu_tx, _menu_rx) = mpsc::channel::<MenuKey>(8);
        let (filter_tx, filter_rx) = mpsc::channel::<FilterKey>(16);
        let focus = FilterFocus::new();
        let inner: Box<dyn EditMode> = Box::new(Emacs::new(default_emacs_keybindings()));
        let mode = MouseAwareEditMode::new(inner, mouse_tx, MenuFocus::new(), menu_tx)
            .with_filter_bridge(focus.clone(), filter_tx);
        (mode, filter_rx, focus)
    }

    #[test]
    fn slash_on_empty_buffer_opens_filter_focus() {
        let (mut mode, mut filter_rx, focus) = make_filter_mode();
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('/'),
            KeyModifiers::NONE,
        ))));
        assert!(matches!(evt, ReedlineEvent::None));
        assert!(
            focus.is_open(),
            "FilterFocus must open on `/` first-keystroke"
        );
        // Initial wake-up event is sent so the controller redraws.
        assert!(filter_rx.try_recv().is_ok());
    }

    #[test]
    fn slash_after_typing_passes_through() {
        let (mut mode, _filter_rx, focus) = make_filter_mode();
        // User types `g` first — buffer is no longer empty.
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('g'),
            KeyModifiers::NONE,
        ))));
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('/'),
            KeyModifiers::NONE,
        ))));
        // Reedline must process the `/` normally — not consumed.
        assert!(!matches!(evt, ReedlineEvent::None));
        assert!(!focus.is_open(), "FilterFocus must NOT open mid-line");
    }

    #[test]
    fn typed_keys_route_to_filter_channel_when_focus_open() {
        let (mut mode, mut filter_rx, focus) = make_filter_mode();
        focus.open();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('e'),
            KeyModifiers::NONE,
        ))));
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('m'),
            KeyModifiers::NONE,
        ))));
        assert_eq!(filter_rx.try_recv().ok(), Some(FilterKey::Char('e')));
        assert_eq!(filter_rx.try_recv().ok(), Some(FilterKey::Char('m')));
    }

    #[test]
    fn enter_in_filter_mode_routes_as_enter() {
        let (mut mode, mut filter_rx, focus) = make_filter_mode();
        focus.open();
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Enter,
            KeyModifiers::NONE,
        ))));
        assert!(matches!(evt, ReedlineEvent::None));
        assert_eq!(filter_rx.try_recv().ok(), Some(FilterKey::Enter));
    }

    #[test]
    fn esc_in_filter_mode_routes_as_esc() {
        let (mut mode, mut filter_rx, focus) = make_filter_mode();
        focus.open();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Esc,
            KeyModifiers::NONE,
        ))));
        assert_eq!(filter_rx.try_recv().ok(), Some(FilterKey::Esc));
    }

    #[test]
    fn ctrl_u_in_filter_mode_routes_as_clear() {
        let (mut mode, mut filter_rx, focus) = make_filter_mode();
        focus.open();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('u'),
            KeyModifiers::CONTROL,
        ))));
        assert_eq!(filter_rx.try_recv().ok(), Some(FilterKey::Clear));
    }

    #[test]
    fn filter_focus_default_closed() {
        let focus = FilterFocus::new();
        assert!(!focus.is_open());
        focus.open();
        assert!(focus.is_open());
        focus.close();
        assert!(!focus.is_open());
    }

    #[test]
    fn history_recall_then_slash_does_not_hijack_focus() {
        // Review H2: if the user presses Up to recall a previous
        // command, the buffer is non-empty (reedline replaced it) but
        // the mirror would have been 0 — `/` must NOT open filter.
        let (mut mode, _filter_rx, focus) = make_filter_mode();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Up,
            KeyModifiers::NONE,
        ))));
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('/'),
            KeyModifiers::NONE,
        ))));
        // `/` falls through to reedline; filter focus stays closed.
        assert!(!matches!(evt, ReedlineEvent::None));
        assert!(!focus.is_open(), "Up + / must not open filter mode");
    }

    #[test]
    fn ctrl_e_marks_buffer_dirty_so_slash_falls_through() {
        // Ctrl+E (move-to-EOL) implies the buffer has content; `/` after
        // it must NOT open filter.
        let (mut mode, _filter_rx, focus) = make_filter_mode();
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('e'),
            KeyModifiers::CONTROL,
        ))));
        let evt = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('/'),
            KeyModifiers::NONE,
        ))));
        assert!(!matches!(evt, ReedlineEvent::None));
        assert!(!focus.is_open(), "Ctrl+E + / must not open filter mode");
    }

    #[test]
    fn backspace_reduces_mirror_so_slash_can_open() {
        let (mut mode, _filter_rx, focus) = make_filter_mode();
        // Type one char then delete it.
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('x'),
            KeyModifiers::NONE,
        ))));
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Backspace,
            KeyModifiers::NONE,
        ))));
        let _ = mode.parse_event(raw(Event::Key(KeyEvent::new(
            KeyCode::Char('/'),
            KeyModifiers::NONE,
        ))));
        assert!(
            focus.is_open(),
            "after typing-then-deleting, `/` should still open filter"
        );
    }
}
