//! T117 — cursor save/move/clear/restore choreography for ambient lines.

use nexus_tui::render::cursor::{
    clear_prompt_area, render_ambient_above_prompt, CursorChoreography,
};

#[test]
fn ambient_render_includes_save_and_restore() {
    let choreo = CursorChoreography::new(120, 1);
    let mut buf: Vec<u8> = Vec::new();
    render_ambient_above_prompt(&mut buf, &choreo, "hello").unwrap();
    let output = String::from_utf8(buf).unwrap();
    assert!(output.contains('\u{1b}'), "must emit ANSI escapes");
    assert!(output.contains("hello"));
    assert!(output.contains("[s") || output.contains("7"), "save-cursor expected");
    assert!(output.contains("[u") || output.contains("8"), "restore-cursor expected");
}

#[test]
fn ambient_render_clears_target_row() {
    let choreo = CursorChoreography::new(120, 1);
    let mut buf: Vec<u8> = Vec::new();
    render_ambient_above_prompt(&mut buf, &choreo, "x").unwrap();
    let output = String::from_utf8(buf).unwrap();
    assert!(output.contains("[2K") || output.contains("K"));
}

#[test]
fn ambient_render_payload_terminated_by_newline() {
    let choreo = CursorChoreography::new(120, 1);
    let mut buf: Vec<u8> = Vec::new();
    render_ambient_above_prompt(&mut buf, &choreo, "hello").unwrap();
    let output = String::from_utf8(buf).unwrap();
    let line_end = output.find("hello").unwrap() + "hello".len();
    let after = &output[line_end..];
    assert!(after.starts_with('\n'), "line must be newline-terminated");
}

#[test]
fn recompute_after_resize_does_not_lose_existing_prompt_height() {
    let mut choreo = CursorChoreography::new(120, 3);
    choreo.recompute_after_resize();
    assert_eq!(choreo.prompt_height(), 3);
}

#[test]
fn set_prompt_height_clamps_to_at_least_one() {
    let mut choreo = CursorChoreography::default();
    choreo.set_prompt_height(0);
    assert_eq!(choreo.prompt_height(), 1);
}

#[test]
fn clear_prompt_area_emits_one_clear_per_row() {
    let choreo = CursorChoreography::new(80, 2);
    let mut buf: Vec<u8> = Vec::new();
    clear_prompt_area(&mut buf, &choreo).unwrap();
    let output = String::from_utf8(buf).unwrap();
    let clear_count = output.matches("[2K").count() + output.matches("\u{1b}[K").count();
    assert!(clear_count >= 2, "expected ≥2 clear ops for 2-row prompt, got {clear_count}");
}
