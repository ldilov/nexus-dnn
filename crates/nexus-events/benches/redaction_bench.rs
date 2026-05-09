//! Spec 044 T119 — redaction microbenchmark.
//!
//! Target (per `tasks.md`): p95 ≤ 5 µs for a 5-field event with 0 redactions.
//! Scenarios:
//!   * `clean_5_fields`        — five non-sensitive fields, no redaction performed.
//!   * `single_redaction`      — five fields, one matches a default sensitive pattern.
//!   * `wildcard_match`        — wildcard pattern hit (`*_token`).
//!   * `pathological_20_fields` — 20 fields with five redactions, exercises hot path under load.

use std::collections::BTreeMap;

use criterion::{BenchmarkId, Criterion, Throughput, black_box, criterion_group, criterion_main};
use nexus_events::redaction::SensitiveNameAllowlist;

fn build_clean_5() -> BTreeMap<String, String> {
    let mut fields = BTreeMap::new();
    fields.insert(
        "run_id".to_string(),
        "01HK3QABRT9XSPK7C8FNJ6QYZ4".to_string(),
    );
    fields.insert("status".to_string(), "ok".to_string());
    fields.insert("latency_ms".to_string(), "42".to_string());
    fields.insert("backend".to_string(), "llamacpp".to_string());
    fields.insert("workflow_id".to_string(), "wf-abc".to_string());
    fields
}

fn build_single_redaction() -> BTreeMap<String, String> {
    let mut fields = build_clean_5();
    fields.insert("api_key".to_string(), "sk-not-a-real-secret".to_string());
    fields
}

fn build_wildcard_match() -> BTreeMap<String, String> {
    let mut fields = build_clean_5();
    fields.insert("hf_token".to_string(), "hf_abcdefghijklmnop".to_string());
    fields
}

fn build_pathological_20() -> BTreeMap<String, String> {
    let mut fields = BTreeMap::new();
    for i in 0..15 {
        fields.insert(format!("field_{i:02}"), format!("value-{i}"));
    }
    fields.insert("password".to_string(), "p".to_string());
    fields.insert("session_token".to_string(), "t".to_string());
    fields.insert("private_key".to_string(), "k".to_string());
    fields.insert("api_key".to_string(), "a".to_string());
    fields.insert("authorization".to_string(), "z".to_string());
    fields
}

fn bench_redaction(c: &mut Criterion) {
    let allowlist = SensitiveNameAllowlist::default();

    let mut group = c.benchmark_group("redaction");
    group.throughput(Throughput::Elements(1));

    let clean = build_clean_5();
    group.bench_with_input(
        BenchmarkId::new("clean", "5_fields"),
        &clean,
        |b, fields| {
            b.iter_batched(
                || fields.clone(),
                |mut fields| {
                    allowlist.redact_in_place(black_box(&mut fields));
                    fields
                },
                criterion::BatchSize::SmallInput,
            )
        },
    );

    let single = build_single_redaction();
    group.bench_with_input(
        BenchmarkId::new("single_redaction", "6_fields"),
        &single,
        |b, fields| {
            b.iter_batched(
                || fields.clone(),
                |mut fields| {
                    allowlist.redact_in_place(black_box(&mut fields));
                    fields
                },
                criterion::BatchSize::SmallInput,
            )
        },
    );

    let wildcard = build_wildcard_match();
    group.bench_with_input(
        BenchmarkId::new("wildcard_match", "6_fields"),
        &wildcard,
        |b, fields| {
            b.iter_batched(
                || fields.clone(),
                |mut fields| {
                    allowlist.redact_in_place(black_box(&mut fields));
                    fields
                },
                criterion::BatchSize::SmallInput,
            )
        },
    );

    let pathological = build_pathological_20();
    group.bench_with_input(
        BenchmarkId::new("pathological", "20_fields_5_redactions"),
        &pathological,
        |b, fields| {
            b.iter_batched(
                || fields.clone(),
                |mut fields| {
                    allowlist.redact_in_place(black_box(&mut fields));
                    fields
                },
                criterion::BatchSize::SmallInput,
            )
        },
    );

    group.finish();
}

fn bench_is_sensitive(c: &mut Criterion) {
    let allowlist = SensitiveNameAllowlist::default();

    let mut group = c.benchmark_group("is_sensitive");
    let cases = [
        ("hit_exact", "password"),
        ("hit_wildcard", "session_token"),
        ("miss_short", "id"),
        ("miss_long", "deployment_request_payload_size"),
    ];

    for (name, candidate) in cases {
        group.bench_function(name, |b| {
            b.iter(|| black_box(allowlist.is_sensitive(black_box(candidate))))
        });
    }

    group.finish();
}

criterion_group!(benches, bench_redaction, bench_is_sensitive);
criterion_main!(benches);
