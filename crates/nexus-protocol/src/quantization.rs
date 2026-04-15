#![allow(non_camel_case_types)]

use std::fmt;
use std::str::FromStr;
use std::sync::OnceLock;

use serde::{Deserialize, Deserializer, Serialize, Serializer};

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum Quantization {
    Q2_K,
    Q3_K_S,
    Q3_K_M,
    Q3_K_L,
    Q4_K_S,
    Q4_K_M,
    Q5_K_S,
    Q5_K_M,
    Q6_K,
    Q8_0,
    Q4_0,
    Q4_1,
    Q5_0,
    Q5_1,
    GPTQ4,
    GPTQ8,
    AWQ4,
    AWQ8,
    F16,
    BF16,
    F32,
    NVFP4,
    MXFP4,
    MXFP6,
    MXFP8,
    FP8_E4M3,
    FP8_E5M2,
    Other(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MatchQuality {
    Exact,
    Family,
    None,
}

impl Quantization {
    /// Family token used for family-level matching. Two values share a family
    /// when this token matches exactly. Returns `None` for `Other` (exact-only).
    fn family(&self) -> Option<&'static str> {
        Some(match self {
            Self::Q2_K => "Q2_K",
            Self::Q3_K_S | Self::Q3_K_M | Self::Q3_K_L => "Q3_K",
            Self::Q4_K_S | Self::Q4_K_M => "Q4_K",
            Self::Q5_K_S | Self::Q5_K_M => "Q5_K",
            Self::Q6_K => "Q6_K",
            Self::Q8_0 => "Q8_0",
            Self::Q4_0 => "Q4_0",
            Self::Q4_1 => "Q4_1",
            Self::Q5_0 => "Q5_0",
            Self::Q5_1 => "Q5_1",
            Self::GPTQ4 | Self::GPTQ8 => "GPTQ",
            Self::AWQ4 | Self::AWQ8 => "AWQ",
            Self::F16 => "F16",
            Self::BF16 => "BF16",
            Self::F32 => "F32",
            Self::NVFP4 => "NVFP4",
            Self::MXFP4 | Self::MXFP6 | Self::MXFP8 => "MXFP",
            Self::FP8_E4M3 | Self::FP8_E5M2 => "FP8",
            Self::Other(_) => return None,
        })
    }

    pub fn match_quality(dep: Option<&Self>, install: Option<&Self>) -> MatchQuality {
        match (dep, install) {
            (None, _) | (_, None) => MatchQuality::Family,
            (Some(a), Some(b)) if a == b => MatchQuality::Exact,
            (Some(a), Some(b)) => match (a.family(), b.family()) {
                (Some(fa), Some(fb)) if fa == fb => MatchQuality::Family,
                _ => MatchQuality::None,
            },
        }
    }
}

impl fmt::Display for Quantization {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Q2_K => "Q2_K",
            Self::Q3_K_S => "Q3_K_S",
            Self::Q3_K_M => "Q3_K_M",
            Self::Q3_K_L => "Q3_K_L",
            Self::Q4_K_S => "Q4_K_S",
            Self::Q4_K_M => "Q4_K_M",
            Self::Q5_K_S => "Q5_K_S",
            Self::Q5_K_M => "Q5_K_M",
            Self::Q6_K => "Q6_K",
            Self::Q8_0 => "Q8_0",
            Self::Q4_0 => "Q4_0",
            Self::Q4_1 => "Q4_1",
            Self::Q5_0 => "Q5_0",
            Self::Q5_1 => "Q5_1",
            Self::GPTQ4 => "GPTQ4",
            Self::GPTQ8 => "GPTQ8",
            Self::AWQ4 => "AWQ4",
            Self::AWQ8 => "AWQ8",
            Self::F16 => "F16",
            Self::BF16 => "BF16",
            Self::F32 => "F32",
            Self::NVFP4 => "NVFP4",
            Self::MXFP4 => "MXFP4",
            Self::MXFP6 => "MXFP6",
            Self::MXFP8 => "MXFP8",
            Self::FP8_E4M3 => "FP8_E4M3",
            Self::FP8_E5M2 => "FP8_E5M2",
            Self::Other(s) => s,
        };
        f.write_str(s)
    }
}

static SEEN_OTHER: OnceLock<std::sync::Mutex<std::collections::HashSet<String>>> = OnceLock::new();

fn warn_once_other(tag: &str) {
    let set = SEEN_OTHER.get_or_init(|| std::sync::Mutex::new(Default::default()));
    let mut guard = set.lock().unwrap();
    if guard.insert(tag.to_string()) {
        tracing::warn!(
            quantization = tag,
            "unknown quantization tag; falling back to Other"
        );
    }
}

impl FromStr for Quantization {
    type Err = std::convert::Infallible;

    fn from_str(raw: &str) -> Result<Self, Self::Err> {
        let canon = raw.trim().to_ascii_uppercase();
        Ok(match canon.as_str() {
            "Q2_K" => Self::Q2_K,
            "Q3_K_S" => Self::Q3_K_S,
            "Q3_K_M" => Self::Q3_K_M,
            "Q3_K_L" => Self::Q3_K_L,
            "Q4_K_S" => Self::Q4_K_S,
            "Q4_K_M" => Self::Q4_K_M,
            "Q5_K_S" => Self::Q5_K_S,
            "Q5_K_M" => Self::Q5_K_M,
            "Q6_K" => Self::Q6_K,
            "Q8_0" => Self::Q8_0,
            "Q4_0" => Self::Q4_0,
            "Q4_1" => Self::Q4_1,
            "Q5_0" => Self::Q5_0,
            "Q5_1" => Self::Q5_1,
            "GPTQ4" => Self::GPTQ4,
            "GPTQ8" => Self::GPTQ8,
            "AWQ4" => Self::AWQ4,
            "AWQ8" => Self::AWQ8,
            "F16" => Self::F16,
            "BF16" => Self::BF16,
            "F32" => Self::F32,
            "NVFP4" => Self::NVFP4,
            "MXFP4" => Self::MXFP4,
            "MXFP6" => Self::MXFP6,
            "MXFP8" => Self::MXFP8,
            "FP8_E4M3" => Self::FP8_E4M3,
            "FP8_E5M2" => Self::FP8_E5M2,
            _ => {
                warn_once_other(raw);
                Self::Other(raw.to_string())
            }
        })
    }
}

impl Serialize for Quantization {
    fn serialize<S: Serializer>(&self, s: S) -> Result<S::Ok, S::Error> {
        s.collect_str(self)
    }
}

impl<'de> Deserialize<'de> for Quantization {
    fn deserialize<D: Deserializer<'de>>(d: D) -> Result<Self, D::Error> {
        let raw = String::deserialize(d)?;
        Ok(Self::from_str(&raw).unwrap())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exact_beats_family_beats_none() {
        let dep = Some(Quantization::Q4_K_M);
        let exact = Some(Quantization::Q4_K_M);
        let family = Some(Quantization::Q4_K_S);
        let none = Some(Quantization::Q5_K_M);
        assert_eq!(
            Quantization::match_quality(dep.as_ref(), exact.as_ref()),
            MatchQuality::Exact
        );
        assert_eq!(
            Quantization::match_quality(dep.as_ref(), family.as_ref()),
            MatchQuality::Family
        );
        assert_eq!(
            Quantization::match_quality(dep.as_ref(), none.as_ref()),
            MatchQuality::None
        );
    }

    #[test]
    fn nvfp4_and_mxfp4_are_distinct() {
        let a = Some(Quantization::NVFP4);
        let b = Some(Quantization::MXFP4);
        assert_eq!(
            Quantization::match_quality(a.as_ref(), b.as_ref()),
            MatchQuality::None
        );
    }

    #[test]
    fn unknown_round_trips_as_other() {
        let q: Quantization = "Q42_FOO".parse().unwrap();
        assert_eq!(q, Quantization::Other("Q42_FOO".to_string()));
        assert_eq!(q.to_string(), "Q42_FOO");
        let a = Some(Quantization::Other("Q42_FOO".into()));
        let b = Some(Quantization::Other("Q42_FOO".into()));
        let c = Some(Quantization::Other("OTHER".into()));
        assert_eq!(
            Quantization::match_quality(a.as_ref(), b.as_ref()),
            MatchQuality::Exact
        );
        assert_eq!(
            Quantization::match_quality(a.as_ref(), c.as_ref()),
            MatchQuality::None
        );
    }

    #[test]
    fn case_insensitive_parse() {
        let a: Quantization = "q4_k_m".parse().unwrap();
        let b: Quantization = "Q4_K_M".parse().unwrap();
        let c: Quantization = "Q4_k_M".parse().unwrap();
        assert_eq!(a, Quantization::Q4_K_M);
        assert_eq!(b, Quantization::Q4_K_M);
        assert_eq!(c, Quantization::Q4_K_M);
    }

    #[test]
    fn missing_either_side_is_family_match() {
        let q = Some(Quantization::Q4_K_M);
        assert_eq!(
            Quantization::match_quality(None, q.as_ref()),
            MatchQuality::Family
        );
        assert_eq!(
            Quantization::match_quality(q.as_ref(), None),
            MatchQuality::Family
        );
    }

    #[test]
    fn serde_json_roundtrip() {
        let q = Quantization::Q4_K_M;
        let s = serde_json::to_string(&q).unwrap();
        assert_eq!(s, "\"Q4_K_M\"");
        let back: Quantization = serde_json::from_str(&s).unwrap();
        assert_eq!(back, q);
        let other: Quantization = serde_json::from_str("\"weird\"").unwrap();
        assert_eq!(other, Quantization::Other("weird".into()));
    }
}
