use thiserror::Error;

#[derive(Debug, Error)]
pub enum CivitaiError {
    #[error("not a civitai url: {0}")]
    NotCivitai(String),
    #[error("could not parse a civitai model or version id from: {0}")]
    Unparseable(String),
    #[error("civitai resource not found")]
    NotFound,
    #[error("civitai requires an api token for this resource")]
    AuthRequired,
    #[error("civitai unreachable")]
    Unreachable,
    #[error("transport error: {0}")]
    Transport(#[from] reqwest::Error),
    #[error("json parse error: {0}")]
    Parse(#[from] serde_json::Error),
    #[error("invalid response: {0}")]
    InvalidResponse(String),
}

pub type CivitaiResult<T> = Result<T, CivitaiError>;
