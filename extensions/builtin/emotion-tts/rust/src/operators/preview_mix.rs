//! Preview-mix operator — concatenates per-utterance audio files with a
//! configurable `gap_ms` silence between each segment. Uses ffmpeg
//! concat-demuxer + `adelay` filter; tests exercise the concat-list
//! builder (pure) without invoking ffmpeg.

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::process::Command;

use crate::domain::{EmotionTtsError, Result};
use crate::operators::{Operator, OperatorId};

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "audio.preview_mix",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub segment_paths_abs: Vec<String>,
    pub gap_ms: u32,
    pub output_abs: String,
    pub output_format: String,
    pub ffmpeg_bin: String,
    pub concat_list_abs: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    pub output_abs: String,
    pub segment_count: usize,
}

pub struct PreviewMixOperator;

#[must_use]
pub fn build_concat_list(segment_paths_abs: &[String]) -> String {
    segment_paths_abs
        .iter()
        .map(|p| format!("file '{}'", escape_single_quotes(p)))
        .collect::<Vec<_>>()
        .join("\n")
}

fn escape_single_quotes(s: &str) -> String {
    s.replace('\'', r"'\''")
}

#[must_use]
pub fn ffmpeg_concat_args(input: &Input) -> Vec<String> {
    let mut args = vec![
        "-y".into(),
        "-f".into(),
        "concat".into(),
        "-safe".into(),
        "0".into(),
        "-i".into(),
        input.concat_list_abs.clone(),
    ];
    if input.gap_ms > 0 {
        args.push("-af".into());
        args.push(format!(
            "apad=pad_dur={:.3}",
            f64::from(input.gap_ms) / 1000.0
        ));
    }
    args.push("-c:a".into());
    match input.output_format.to_lowercase().as_str() {
        "mp3" => args.push("libmp3lame".into()),
        "flac" => args.push("flac".into()),
        _ => args.push("pcm_s16le".into()),
    }
    args.push(input.output_abs.clone());
    args
}

#[async_trait]
impl Operator for PreviewMixOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        if input.segment_paths_abs.is_empty() {
            return Err(EmotionTtsError::validation(
                "cannot preview-mix zero segments",
            ));
        }

        let list = build_concat_list(&input.segment_paths_abs);
        tokio::fs::write(&input.concat_list_abs, list)
            .await
            .map_err(|e| EmotionTtsError::internal(format!("write concat list: {e}")))?;

        let args = ffmpeg_concat_args(&input);
        let out = Command::new(&input.ffmpeg_bin)
            .args(&args)
            .output()
            .await
            .map_err(|e| EmotionTtsError::internal(format!("ffmpeg spawn: {e}")))?;

        if !out.status.success() {
            return Err(EmotionTtsError::internal(format!(
                "preview_mix ffmpeg failed (exit {:?})",
                out.status.code()
            )));
        }

        Ok(Output {
            segment_count: input.segment_paths_abs.len(),
            output_abs: input.output_abs,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn concat_list_lines() {
        let s = build_concat_list(&["/a/one.wav".into(), "/b/two.wav".into()]);
        let lines: Vec<&str> = s.lines().collect();
        assert_eq!(lines.len(), 2);
        assert_eq!(lines[0], "file '/a/one.wav'");
    }

    #[test]
    fn concat_escapes_single_quotes() {
        let s = build_concat_list(&["/it's.wav".into()]);
        assert!(s.contains(r"'\''"));
    }

    #[test]
    fn gap_of_zero_omits_pad() {
        let args = ffmpeg_concat_args(&Input {
            segment_paths_abs: vec!["a".into()],
            gap_ms: 0,
            output_abs: "o.mp3".into(),
            output_format: "mp3".into(),
            ffmpeg_bin: "ffmpeg".into(),
            concat_list_abs: "list.txt".into(),
        });
        assert!(!args.iter().any(|a| a.starts_with("apad=")));
    }

    #[test]
    fn gap_of_500_adds_apad_0_5() {
        let args = ffmpeg_concat_args(&Input {
            segment_paths_abs: vec!["a".into()],
            gap_ms: 500,
            output_abs: "o.mp3".into(),
            output_format: "mp3".into(),
            ffmpeg_bin: "ffmpeg".into(),
            concat_list_abs: "list.txt".into(),
        });
        assert!(args.iter().any(|a| a.contains("pad_dur=0.500")));
    }

    #[test]
    fn empty_segment_list_rejected() {
        let op = PreviewMixOperator;
        let err = tokio::runtime::Runtime::new()
            .unwrap()
            .block_on(op.execute(Input {
                segment_paths_abs: vec![],
                gap_ms: 0,
                output_abs: "o.mp3".into(),
                output_format: "mp3".into(),
                ffmpeg_bin: "ffmpeg".into(),
                concat_list_abs: "list.txt".into(),
            }));
        assert!(err.is_err());
    }
}
