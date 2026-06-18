use serde::Deserialize;

use crate::error::{CivitaiError, CivitaiResult};

/// A single downloadable file on a Civitai model version.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CivitaiFile {
    pub name: String,
    pub size_bytes: u64,
    pub sha256: Option<String>,
    pub download_url: String,
    pub primary: bool,
}

/// Normalized result of resolving a Civitai model version.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CivitaiResolved {
    pub model_id: u64,
    pub version_id: u64,
    pub name: String,
    pub model_type: String,
    pub license: Option<String>,
    pub files: Vec<CivitaiFile>,
}

impl CivitaiResolved {
    /// The primary file if flagged, else the first file.
    #[must_use]
    pub fn primary_file(&self) -> Option<&CivitaiFile> {
        self.files
            .iter()
            .find(|f| f.primary)
            .or_else(|| self.files.first())
    }

    /// Map the Civitai model type to a model-store modality token.
    #[must_use]
    pub fn modality(&self) -> &'static str {
        match self.model_type.to_ascii_lowercase().as_str() {
            "checkpoint" => "image",
            "lora" | "locon" | "lycoris" | "dora" => "lora",
            "textualinversion" => "embedding",
            "vae" => "other",
            "controlnet" => "other",
            "upscaler" => "upscaler",
            _ => "other",
        }
    }
}

#[derive(Debug, Deserialize)]
struct RawVersion {
    id: u64,
    #[serde(rename = "modelId")]
    model_id: Option<u64>,
    name: Option<String>,
    #[serde(default)]
    model: RawModel,
    #[serde(default)]
    files: Vec<RawFile>,
}

#[derive(Debug, Default, Deserialize)]
struct RawModel {
    name: Option<String>,
    #[serde(rename = "type")]
    type_: Option<String>,
}

#[derive(Debug, Deserialize)]
struct RawFile {
    name: String,
    #[serde(rename = "sizeKB")]
    size_kb: Option<f64>,
    #[serde(default)]
    hashes: RawHashes,
    #[serde(rename = "downloadUrl")]
    download_url: Option<String>,
    #[serde(default)]
    primary: bool,
}

#[derive(Debug, Default, Deserialize)]
struct RawHashes {
    #[serde(rename = "SHA256")]
    sha256: Option<String>,
}

/// Parse a Civitai `/model-versions/{id}` JSON body into [`CivitaiResolved`].
pub fn parse_version_response(body: &str) -> CivitaiResult<CivitaiResolved> {
    let raw: RawVersion = serde_json::from_str(body)?;
    let files: Vec<CivitaiFile> = raw
        .files
        .into_iter()
        .filter_map(|f| {
            let download_url = f.download_url?;
            let size_bytes = f.size_kb.map(|kb| (kb * 1024.0) as u64).unwrap_or(0);
            Some(CivitaiFile {
                name: f.name,
                size_bytes,
                sha256: f.hashes.sha256.map(|s| s.to_ascii_lowercase()),
                download_url,
                primary: f.primary,
            })
        })
        .collect();
    if files.is_empty() {
        return Err(CivitaiError::InvalidResponse(
            "version has no downloadable files".into(),
        ));
    }
    Ok(CivitaiResolved {
        model_id: raw.model_id.unwrap_or(0),
        version_id: raw.id,
        name: raw
            .name
            .or(raw.model.name)
            .unwrap_or_else(|| format!("civitai-{}", raw.id)),
        model_type: raw.model.type_.unwrap_or_else(|| "Other".into()),
        license: None,
        files,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const VERSION_JSON: &str = r#"{
        "id": 130072,
        "modelId": 4201,
        "name": "v2.0",
        "model": { "name": "DreamModel", "type": "Checkpoint" },
        "files": [
            { "name": "low.safetensors", "sizeKB": 1024.0,
              "hashes": { "SHA256": "AABBCC" },
              "downloadUrl": "https://civitai.com/api/download/models/130072?type=Pruned",
              "primary": false },
            { "name": "main.safetensors", "sizeKB": 2048.0,
              "hashes": { "SHA256": "DDEEFF" },
              "downloadUrl": "https://civitai.com/api/download/models/130072",
              "primary": true }
        ]
    }"#;

    #[test]
    fn parses_version_and_picks_primary() {
        let r = parse_version_response(VERSION_JSON).unwrap();
        assert_eq!(r.model_id, 4201);
        assert_eq!(r.version_id, 130072);
        assert_eq!(r.model_type, "Checkpoint");
        assert_eq!(r.modality(), "image");
        let p = r.primary_file().unwrap();
        assert_eq!(p.name, "main.safetensors");
        assert_eq!(p.size_bytes, 2048 * 1024);
        assert_eq!(p.sha256.as_deref(), Some("ddeeff"));
    }

    #[test]
    fn lora_type_maps_to_lora_modality() {
        let json = VERSION_JSON.replace("Checkpoint", "LORA");
        let r = parse_version_response(&json).unwrap();
        assert_eq!(r.modality(), "lora");
    }

    #[test]
    fn empty_files_is_error() {
        let json = r#"{ "id": 1, "model": { "type": "Checkpoint" }, "files": [] }"#;
        assert!(matches!(
            parse_version_response(json),
            Err(CivitaiError::InvalidResponse(_))
        ));
    }
}
