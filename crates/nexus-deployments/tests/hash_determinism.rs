use nexus_deployments::hash::{hex, sha256_jcs};
use serde_json::json;

#[test]
fn primitive_value_hash_is_stable() {
    let h = sha256_jcs(&json!(42)).unwrap();
    assert_eq!(
        hex(&h),
        "73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049"
    );
}

#[test]
fn object_key_order_does_not_affect_hash() {
    let a = json!({ "alpha": 1, "beta": 2, "gamma": 3 });
    let b = json!({ "gamma": 3, "alpha": 1, "beta": 2 });
    assert_eq!(sha256_jcs(&a).unwrap(), sha256_jcs(&b).unwrap());
}

#[test]
fn nested_objects_have_stable_hash() {
    let value = json!({
        "outer": { "inner": [1, 2, 3], "scalar": "x" },
        "list": [{"k": 1}, {"k": 2}],
    });
    let first = sha256_jcs(&value).unwrap();
    let second = sha256_jcs(&value).unwrap();
    assert_eq!(first, second);
}

#[test]
fn whitespace_in_input_object_does_not_affect_hash() {
    let a: serde_json::Value = serde_json::from_str(r#"{"a":1,"b":2}"#).unwrap();
    let b: serde_json::Value = serde_json::from_str("{ \"a\" : 1 ,\n  \"b\" : 2 }").unwrap();
    assert_eq!(sha256_jcs(&a).unwrap(), sha256_jcs(&b).unwrap());
}

#[test]
fn unicode_strings_are_serialized_consistently() {
    let value = json!({ "emoji": "🚀", "cyrillic": "Лазар" });
    let first = sha256_jcs(&value).unwrap();
    let second = sha256_jcs(&value).unwrap();
    assert_eq!(first, second);
}

#[test]
fn hex_round_trip_is_lowercase_64_chars() {
    let h = sha256_jcs(&json!("hello")).unwrap();
    let s = hex(&h);
    assert_eq!(s.len(), 64);
    assert!(s.chars().all(|c| matches!(c, '0'..='9' | 'a'..='f')));
}
