use super::model::{SamplerBlock, SamplerOverride};

pub fn merge_sampler(per_model: &SamplerBlock, override_block: Option<&SamplerOverride>) -> SamplerBlock {
    let ov = override_block;

    SamplerBlock {
        temperature: ov.and_then(|o| o.temperature).unwrap_or(per_model.temperature),
        min_p: ov.and_then(|o| o.min_p).unwrap_or(per_model.min_p),
        top_k: ov.and_then(|o| o.top_k).unwrap_or(per_model.top_k),
        seed: ov.and_then(|o| o.seed).unwrap_or(per_model.seed),
        top_p: ov.and_then(|o| o.top_p).or(per_model.top_p),
        repeat_penalty: ov.and_then(|o| o.repeat_penalty).or(per_model.repeat_penalty),
        presence_penalty: ov.and_then(|o| o.presence_penalty).or(per_model.presence_penalty),
        frequency_penalty: ov.and_then(|o| o.frequency_penalty).or(per_model.frequency_penalty),
        typical_p: ov.and_then(|o| o.typical_p).or(per_model.typical_p),
        dynatemp_range: ov.and_then(|o| o.dynatemp_range).or(per_model.dynatemp_range),
        dynatemp_exponent: ov.and_then(|o| o.dynatemp_exponent).or(per_model.dynatemp_exponent),
        xtc_threshold: ov.and_then(|o| o.xtc_threshold).or(per_model.xtc_threshold),
        xtc_probability: ov.and_then(|o| o.xtc_probability).or(per_model.xtc_probability),
        dry_multiplier: ov.and_then(|o| o.dry_multiplier).or(per_model.dry_multiplier),
        dry_base: ov.and_then(|o| o.dry_base).or(per_model.dry_base),
        dry_allowed_length: ov.and_then(|o| o.dry_allowed_length).or(per_model.dry_allowed_length),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn baseline() -> SamplerBlock {
        SamplerBlock {
            temperature: 0.7,
            min_p: 0.05,
            top_k: 64,
            seed: 42,
            top_p: Some(0.95),
            repeat_penalty: None,
            presence_penalty: None,
            frequency_penalty: None,
            typical_p: None,
            dynatemp_range: None,
            dynatemp_exponent: None,
            xtc_threshold: None,
            xtc_probability: None,
            dry_multiplier: None,
            dry_base: None,
            dry_allowed_length: None,
        }
    }

    #[test]
    fn none_override_returns_per_model_values() {
        let merged = merge_sampler(&baseline(), None);
        assert_eq!(merged, baseline());
    }

    #[test]
    fn temperature_only_override_keeps_other_fields() {
        let override_block = SamplerOverride {
            temperature: Some(1.2),
            ..Default::default()
        };
        let merged = merge_sampler(&baseline(), Some(&override_block));
        assert_eq!(merged.temperature, 1.2);
        assert_eq!(merged.min_p, 0.05);
        assert_eq!(merged.top_k, 64);
        assert_eq!(merged.seed, 42);
        assert_eq!(merged.top_p, Some(0.95));
    }

    #[test]
    fn override_wins_for_every_field_when_all_set() {
        let override_block = SamplerOverride {
            temperature: Some(0.1),
            min_p: Some(0.2),
            top_k: Some(10),
            seed: Some(1),
            top_p: Some(0.3),
            ..Default::default()
        };
        let merged = merge_sampler(&baseline(), Some(&override_block));
        assert_eq!(merged.temperature, 0.1);
        assert_eq!(merged.min_p, 0.2);
        assert_eq!(merged.top_k, 10);
        assert_eq!(merged.seed, 1);
        assert_eq!(merged.top_p, Some(0.3));
    }
}
