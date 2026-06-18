use crate::error::{CivitaiError, CivitaiResult};

/// A parsed pointer into Civitai's catalog.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CivitaiRef {
    /// A specific model version (preferred — resolves directly to files).
    Version(u64),
    /// A model id; the resolver picks the latest/default version.
    Model(u64),
}

/// Parse any civitai.com URL form into a [`CivitaiRef`].
///
/// Accepts: `/models/{id}`, `/models/{id}?modelVersionId={vid}`,
/// `/api/v1/model-versions/{vid}`, and `/api/download/models/{vid}`.
pub fn parse_civitai_url(input: &str) -> CivitaiResult<CivitaiRef> {
    let trimmed = input.trim();
    let lower = trimmed.to_ascii_lowercase();
    if !lower.contains("civitai.com") {
        return Err(CivitaiError::NotCivitai(trimmed.to_string()));
    }
    let (path, query) = split_path_query(trimmed);

    if let Some(vid) = query_param_u64(query, "modelversionid") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(vid) = segment_after(&path, "model-versions") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(vid) = segment_after(&path, "download/models") {
        return Ok(CivitaiRef::Version(vid));
    }
    if let Some(id) = segment_after(&path, "models") {
        return Ok(CivitaiRef::Model(id));
    }
    Err(CivitaiError::Unparseable(trimmed.to_string()))
}

fn split_path_query(url: &str) -> (String, &str) {
    let no_scheme = url.split("://").last().unwrap_or(url);
    match no_scheme.split_once('?') {
        Some((p, q)) => (p.to_ascii_lowercase(), q),
        None => (no_scheme.to_ascii_lowercase(), ""),
    }
}

fn query_param_u64(query: &str, key_lower: &str) -> Option<u64> {
    query.split('&').find_map(|pair| {
        let (k, v) = pair.split_once('=')?;
        if k.to_ascii_lowercase() == key_lower {
            v.parse().ok()
        } else {
            None
        }
    })
}

fn segment_after(path_lower: &str, marker: &str) -> Option<u64> {
    let idx = path_lower.find(marker)?;
    let rest = &path_lower[idx + marker.len()..];
    rest.trim_start_matches('/')
        .split('/')
        .next()
        .and_then(|s| s.split('?').next())
        .and_then(|s| s.parse().ok())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_model_url() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/models/4201").unwrap(),
            CivitaiRef::Model(4201)
        );
    }

    #[test]
    fn version_query_wins_over_model() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/models/4201?modelVersionId=130072").unwrap(),
            CivitaiRef::Version(130072)
        );
    }

    #[test]
    fn parses_api_version_and_download_forms() {
        assert_eq!(
            parse_civitai_url("https://civitai.com/api/v1/model-versions/130072").unwrap(),
            CivitaiRef::Version(130072)
        );
        assert_eq!(
            parse_civitai_url("https://civitai.com/api/download/models/130072?type=Model").unwrap(),
            CivitaiRef::Version(130072)
        );
    }

    #[test]
    fn rejects_non_civitai() {
        assert!(matches!(
            parse_civitai_url("https://example.com/models/1"),
            Err(CivitaiError::NotCivitai(_))
        ));
    }

    #[test]
    fn rejects_civitai_without_id() {
        assert!(matches!(
            parse_civitai_url("https://civitai.com/user/foo"),
            Err(CivitaiError::Unparseable(_))
        ));
    }
}
