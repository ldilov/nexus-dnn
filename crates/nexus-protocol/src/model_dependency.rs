use serde::{Deserialize, Serialize};

use crate::quantization::Quantization;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ModelDependency {
    pub family: String,
    pub version: String,
    #[serde(default)]
    pub revision: Option<String>,
    #[serde(default)]
    pub allow_unpinned: bool,
    #[serde(default, deserialize_with = "deserialize_param_count")]
    pub min_params: Option<u64>,
    #[serde(default)]
    pub quantization: Option<Quantization>,
    #[serde(default)]
    pub variant: Option<String>,
    #[serde(default = "default_required")]
    pub required: bool,
}

fn default_required() -> bool {
    true
}

fn deserialize_param_count<'de, D>(d: D) -> Result<Option<u64>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    use serde::de::Error;
    let raw: Option<serde_json::Value> = Option::deserialize(d)?;
    let Some(v) = raw else { return Ok(None) };
    match v {
        serde_json::Value::Null => Ok(None),
        serde_json::Value::Number(n) => n
            .as_u64()
            .map(Some)
            .ok_or_else(|| D::Error::custom("min_params must be non-negative")),
        serde_json::Value::String(s) => parse_param_count(&s).map(Some).map_err(D::Error::custom),
        _ => Err(D::Error::custom(
            "min_params must be number or string like '7B'",
        )),
    }
}

pub fn parse_param_count(s: &str) -> Result<u64, String> {
    let s = s.trim();
    if s.is_empty() {
        return Err("empty param_count".into());
    }
    let (num_part, mult) = match s.chars().last().unwrap().to_ascii_uppercase() {
        'B' => (&s[..s.len() - 1], 1_000_000_000u64),
        'M' => (&s[..s.len() - 1], 1_000_000u64),
        'K' => (&s[..s.len() - 1], 1_000u64),
        _ => (s, 1u64),
    };
    let n: f64 = num_part
        .parse()
        .map_err(|e: std::num::ParseFloatError| e.to_string())?;
    Ok((n * mult as f64) as u64)
}

pub fn validate_revision_pinning(dep: &ModelDependency) -> Result<(), String> {
    if dep.revision.is_none() && !dep.allow_unpinned {
        return Err("revision required; set allow_unpinned: true to opt out".to_string());
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_b_k_m_suffixes() {
        assert_eq!(parse_param_count("7B").unwrap(), 7_000_000_000);
        assert_eq!(parse_param_count("500M").unwrap(), 500_000_000);
        assert_eq!(parse_param_count("1K").unwrap(), 1_000);
        assert_eq!(parse_param_count("42").unwrap(), 42);
    }

    #[test]
    fn rejects_missing_revision_without_opt_in() {
        let dep = ModelDependency {
            family: "f".into(),
            version: "v".into(),
            revision: None,
            allow_unpinned: false,
            min_params: None,
            quantization: None,
            variant: None,
            required: true,
        };
        assert!(validate_revision_pinning(&dep).is_err());
    }

    #[test]
    fn accepts_allow_unpinned() {
        let dep = ModelDependency {
            family: "f".into(),
            version: "v".into(),
            revision: None,
            allow_unpinned: true,
            min_params: None,
            quantization: None,
            variant: None,
            required: true,
        };
        assert!(validate_revision_pinning(&dep).is_ok());
    }
}
