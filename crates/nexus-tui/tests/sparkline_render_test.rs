//! T035 — Snapshot tests for sparkline rendering across rate windows.
//!
//! The sparkline takes a 60-second history of per-second event counts and
//! renders an 8-cell Braille bar chart. Three fixtures: idle (zeros),
//! steady mid-rate, and a recent burst.

use nexus_tui::render::sparkline::{SparklineSamples, render_sparkline};

#[test]
fn snapshot_idle_sparkline() {
    let samples = SparklineSamples::from_per_second(vec![0; 60]);
    insta::assert_snapshot!(render_sparkline(&samples));
}

#[test]
fn snapshot_steady_midrate_sparkline() {
    let samples = SparklineSamples::from_per_second(vec![3; 60]);
    insta::assert_snapshot!(render_sparkline(&samples));
}

#[test]
fn snapshot_recent_burst_sparkline() {
    let mut history = vec![1u32; 50];
    history.extend(std::iter::repeat_n(20u32, 10));
    let samples = SparklineSamples::from_per_second(history);
    insta::assert_snapshot!(render_sparkline(&samples));
}

#[test]
fn from_per_second_truncates_to_capacity() {
    let big = vec![1u32; 500];
    let samples = SparklineSamples::from_per_second(big);
    assert!(samples.len() <= 60, "sparkline must keep ≤ 60 samples");
}

#[test]
fn empty_history_renders_without_panic() {
    let samples = SparklineSamples::from_per_second(Vec::new());
    let output = render_sparkline(&samples);
    assert!(!output.is_empty());
}
