use nexus_models_store::{MatchQuality, Quantization};

#[test]
fn exact_beats_family_beats_none() {
    let dep = Some(Quantization::Q4_K_M);
    assert_eq!(
        Quantization::match_quality(dep.as_ref(), Some(&Quantization::Q4_K_M)),
        MatchQuality::Exact
    );
    assert_eq!(
        Quantization::match_quality(dep.as_ref(), Some(&Quantization::Q4_K_S)),
        MatchQuality::Family
    );
    assert_eq!(
        Quantization::match_quality(dep.as_ref(), Some(&Quantization::Q5_K_M)),
        MatchQuality::None
    );
}

#[test]
fn nvfp4_and_mxfp4_do_not_match() {
    assert_eq!(
        Quantization::match_quality(Some(&Quantization::NVFP4), Some(&Quantization::MXFP4),),
        MatchQuality::None
    );
}

#[test]
fn unknown_quantization_round_trips_as_other() {
    let q: Quantization = "Q42_FOO".parse().unwrap();
    assert_eq!(q, Quantization::Other("Q42_FOO".into()));
    assert_eq!(q.to_string(), "Q42_FOO");
}
