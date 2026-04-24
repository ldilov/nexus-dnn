//! ffmpeg-backed post-processor (R-05).
//!
//! Pure functions build the filter graph + encoder argument vector; the
//! shell-out to ffmpeg happens in `execute`. Unit tests exercise the pure
//! builders; integration tests (later) verify the actual ffmpeg call.

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::process::Command;

use crate::domain::{EmotionTtsError, Result};
use crate::operators::{Operator, OperatorId};

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "audio.postprocess",
    version: "1.0.0",
};

pub const MIN_SPEED: f64 = 0.5;
pub const MAX_SPEED: f64 = 2.0;
pub const ATEMPO_MIN: f64 = 0.5;
pub const ATEMPO_MAX: f64 = 2.0;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub input_wav_abs: String,
    pub output_abs: String,
    pub output_format: String,
    pub speed_factor: f64,
    pub ffmpeg_bin: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    pub output_abs: String,
    pub applied_speed: f64,
    pub applied_filter_chain: String,
}

pub struct AudioPostprocessOperator;

#[must_use]
pub fn atempo_chain(speed_factor: f64) -> Vec<f64> {
    if (speed_factor - 1.0).abs() < f64::EPSILON {
        return Vec::new();
    }
    let mut remaining = speed_factor.clamp(MIN_SPEED, MAX_SPEED);
    let mut parts = Vec::new();
    while remaining < ATEMPO_MIN {
        parts.push(ATEMPO_MIN);
        remaining /= ATEMPO_MIN;
    }
    while remaining > ATEMPO_MAX {
        parts.push(ATEMPO_MAX);
        remaining /= ATEMPO_MAX;
    }
    parts.push(remaining);
    parts
}

#[must_use]
pub fn filter_graph(speed_factor: f64) -> Option<String> {
    let chain = atempo_chain(speed_factor);
    if chain.is_empty() {
        return None;
    }
    Some(
        chain
            .iter()
            .map(|f| format!("atempo={f:.6}"))
            .collect::<Vec<_>>()
            .join(","),
    )
}

#[must_use]
pub fn ffmpeg_args(input: &Input) -> Vec<String> {
    let mut args = vec![
        "-y".into(),
        "-i".into(),
        input.input_wav_abs.clone(),
    ];

    if let Some(graph) = filter_graph(input.speed_factor) {
        args.push("-filter:a".into());
        args.push(graph);
    }

    match input.output_format.to_lowercase().as_str() {
        "mp3" => {
            args.push("-c:a".into());
            args.push("libmp3lame".into());
            args.push("-q:a".into());
            args.push("2".into());
        }
        "flac" => {
            args.push("-c:a".into());
            args.push("flac".into());
            args.push("-compression_level".into());
            args.push("5".into());
        }
        _ => {
            args.push("-c:a".into());
            args.push("pcm_s16le".into());
        }
    }

    args.push(input.output_abs.clone());
    args
}

#[async_trait]
impl Operator for AudioPostprocessOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        let args = ffmpeg_args(&input);
        let filter = filter_graph(input.speed_factor).unwrap_or_default();

        let out = Command::new(&input.ffmpeg_bin)
            .args(&args)
            .output()
            .await
            .map_err(|e| EmotionTtsError::internal(format!("ffmpeg spawn: {e}")))?;

        if !out.status.success() {
            let stderr = String::from_utf8_lossy(&out.stderr);
            return Err(EmotionTtsError::internal(format!(
                "ffmpeg failed (exit {:?}): {}",
                out.status.code(),
                stderr.lines().next_back().unwrap_or("").trim()
            )));
        }

        Ok(Output {
            output_abs: input.output_abs,
            applied_speed: input.speed_factor,
            applied_filter_chain: filter,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn speed_1_0_yields_empty_chain() {
        assert!(atempo_chain(1.0).is_empty());
        assert!(filter_graph(1.0).is_none());
    }

    #[test]
    fn speed_in_range_single_atempo() {
        let chain = atempo_chain(1.25);
        assert_eq!(chain.len(), 1);
        assert!((chain[0] - 1.25).abs() < 1e-9);
    }

    #[test]
    fn speed_clamped_to_max() {
        let chain = atempo_chain(4.0);
        let product: f64 = chain.iter().product();
        assert!((product - 2.0).abs() < 1e-6);
    }

    #[test]
    fn speed_clamped_to_min() {
        let chain = atempo_chain(0.25);
        let product: f64 = chain.iter().product();
        assert!((product - 0.5).abs() < 1e-6);
    }

    #[test]
    fn mp3_args_use_libmp3lame() {
        let args = ffmpeg_args(&Input {
            input_wav_abs: "in.wav".into(),
            output_abs: "out.mp3".into(),
            output_format: "mp3".into(),
            speed_factor: 1.0,
            ffmpeg_bin: "ffmpeg".into(),
        });
        assert!(args.contains(&"libmp3lame".to_string()));
    }

    #[test]
    fn flac_args_use_flac_codec() {
        let args = ffmpeg_args(&Input {
            input_wav_abs: "in.wav".into(),
            output_abs: "out.flac".into(),
            output_format: "flac".into(),
            speed_factor: 1.0,
            ffmpeg_bin: "ffmpeg".into(),
        });
        assert!(args.contains(&"flac".to_string()));
    }

    #[test]
    fn wav_args_use_pcm_s16le() {
        let args = ffmpeg_args(&Input {
            input_wav_abs: "in.wav".into(),
            output_abs: "out.wav".into(),
            output_format: "wav".into(),
            speed_factor: 1.0,
            ffmpeg_bin: "ffmpeg".into(),
        });
        assert!(args.contains(&"pcm_s16le".to_string()));
    }

    #[test]
    fn filter_graph_at_speed_1_25_has_single_atempo() {
        let g = filter_graph(1.25).unwrap();
        assert!(g.contains("atempo=1.250000"));
    }

    #[test]
    fn filter_absent_when_speed_1() {
        let args = ffmpeg_args(&Input {
            input_wav_abs: "in.wav".into(),
            output_abs: "out.mp3".into(),
            output_format: "mp3".into(),
            speed_factor: 1.0,
            ffmpeg_bin: "ffmpeg".into(),
        });
        assert!(!args.iter().any(|a| a == "-filter:a"));
    }

    #[test]
    fn filter_present_when_speed_not_1() {
        let args = ffmpeg_args(&Input {
            input_wav_abs: "in.wav".into(),
            output_abs: "out.mp3".into(),
            output_format: "mp3".into(),
            speed_factor: 1.5,
            ffmpeg_bin: "ffmpeg".into(),
        });
        assert!(args.iter().any(|a| a == "-filter:a"));
    }
}
