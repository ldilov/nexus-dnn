use nexus_local_llm_chat_history::{merge_sampler, SamplerBlock, SamplerOverride};

fn baseline() -> SamplerBlock {
    SamplerBlock::new(0.7, 0.05, 64, 42).with_top_p(0.95)
}

#[test]
fn none_override_passes_through() {
    assert_eq!(merge_sampler(&baseline(), None), baseline());
}

#[test]
fn temperature_only_override_leaves_others_intact() {
    let ov = SamplerOverride::empty().with_temperature(1.2);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.temperature, 1.2);
    assert_eq!(merged.min_p, 0.05);
    assert_eq!(merged.top_k, 64);
    assert_eq!(merged.seed, 42);
    assert_eq!(merged.top_p, Some(0.95));
}

#[test]
fn min_p_only_override() {
    let ov = SamplerOverride::empty().with_min_p(0.11);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.min_p, 0.11);
    assert_eq!(merged.temperature, 0.7);
}

#[test]
fn top_k_only_override() {
    let ov = SamplerOverride::empty().with_top_k(10);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.top_k, 10);
    assert_eq!(merged.seed, 42);
}

#[test]
fn seed_only_override() {
    let ov = SamplerOverride::empty().with_seed(999);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.seed, 999);
}

#[test]
fn tier_2_top_p_override_passes_through() {
    let ov = SamplerOverride::empty().with_top_p(0.5);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.top_p, Some(0.5));
}

#[test]
fn tier_2_repeat_penalty_adds_where_baseline_has_none() {
    let ov = SamplerOverride::empty().with_repeat_penalty(1.1);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.repeat_penalty, Some(1.1));
}

#[test]
fn all_tier_1_overridden_at_once() {
    let ov = SamplerOverride::empty()
        .with_temperature(0.1)
        .with_min_p(0.2)
        .with_top_k(10)
        .with_seed(1);
    let merged = merge_sampler(&baseline(), Some(&ov));
    assert_eq!(merged.temperature, 0.1);
    assert_eq!(merged.min_p, 0.2);
    assert_eq!(merged.top_k, 10);
    assert_eq!(merged.seed, 1);
}

#[test]
fn empty_override_struct_is_identity() {
    let ov = SamplerOverride::empty();
    assert_eq!(merge_sampler(&baseline(), Some(&ov)), baseline());
}

#[test]
fn override_wins_even_when_baseline_tier_2_is_set() {
    let base = SamplerBlock::new(0.7, 0.05, 64, 42).with_top_p(0.95);
    let ov = SamplerOverride::empty().with_top_p(0.3);
    let merged = merge_sampler(&base, Some(&ov));
    assert_eq!(merged.top_p, Some(0.3));
}
