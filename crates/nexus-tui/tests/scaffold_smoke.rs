#[test]
fn binary_name_matches_spec() {
    assert_eq!(nexus_tui::binary_name(), "nexus");
}

#[test]
fn scaffold_notice_points_to_spec() {
    let mut output = Vec::new();
    nexus_tui::write_scaffold_notice(&mut output).expect("scaffold notice should write");

    let text = String::from_utf8(output).expect("scaffold notice should be utf-8");
    assert_eq!(
        text,
        "nexus-tui scaffold ready. See specs/044-tui-streaming-console/spec.md\n"
    );
}
