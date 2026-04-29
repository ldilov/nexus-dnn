use emotion_tts_extension::domain::emotion::{
    resolve, EmotionPayload, GlobalEmotion, InlineOverrides, VECTOR_KEYS,
};

fn vector_from_inline(raw: &str) -> [f64; 8] {
    let inline = InlineOverrides {
        emotion_vector: Some(raw.into()),
        ..Default::default()
    };
    let resolved = resolve(&inline, None, None, &GlobalEmotion::default());
    match resolved.payload {
        EmotionPayload::EmotionVector { vector, .. } => vector,
        other => panic!("expected EmotionVector, got {other:?}"),
    }
}

#[test]
fn upstream_vector_key_order_is_fixed() {
    assert_eq!(
        VECTOR_KEYS,
        [
            "happy",
            "angry",
            "sad",
            "afraid",
            "disgusted",
            "melancholic",
            "surprised",
            "calm",
        ]
    );
}

#[test]
fn every_key_lands_at_its_upstream_index() {
    for (idx, key) in VECTOR_KEYS.iter().enumerate() {
        let vector = vector_from_inline(&format!("{key}=1.0"));
        for (j, value) in vector.iter().enumerate() {
            if j == idx {
                assert!(
                    (value - 1.0).abs() < 1e-9,
                    "key {key:?} must land at index {idx} (got {value} at {j})"
                );
            } else {
                assert!(
                    value.abs() < 1e-9,
                    "only index {idx} should be set for key {key:?} (got {value} at {j})"
                );
            }
        }
    }
}

#[test]
fn wire_json_serialises_vector_as_ordered_array() {
    let vector = vector_from_inline("happy=0.7,surprised=0.2");
    let payload = EmotionPayload::EmotionVector { vector, alpha: 1.0 };
    let wire = serde_json::to_value(&payload).expect("serialises");
    let arr = wire["vector"].as_array().expect("vector field is an array");
    assert_eq!(arr.len(), 8);
    assert!((arr[0].as_f64().unwrap() - 0.7).abs() < 1e-9);
    assert!((arr[6].as_f64().unwrap() - 0.2).abs() < 1e-9);
    for i in [1, 2, 3, 4, 5, 7] {
        assert!(arr[i].as_f64().unwrap().abs() < 1e-9);
    }
}
