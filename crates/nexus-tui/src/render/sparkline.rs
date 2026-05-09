//! Braille event-rate sparkline.
//!
//! Reads an N-second history of per-second event counts and renders an
//! 8-cell Braille bar chart. Uses U+2800..U+28FF such that vertical
//! bar height maps to two columns × four rows of dots.

const SAMPLE_CAPACITY: usize = 60;
const BAR_CELLS: usize = 8;
const BRAILLE_BLANK: char = '\u{2800}';
const BRAILLE_EMPTY: char = '⠀'; // explicit blank

const BAR_GLYPHS: [char; 5] = [' ', '⡀', '⡄', '⡆', '⡇'];

#[derive(Debug, Clone, Default)]
pub struct SparklineSamples {
    counts: Vec<u32>,
}

impl SparklineSamples {
    pub fn from_per_second(mut counts: Vec<u32>) -> Self {
        if counts.len() > SAMPLE_CAPACITY {
            let drop = counts.len() - SAMPLE_CAPACITY;
            counts.drain(0..drop);
        }
        Self { counts }
    }

    pub fn len(&self) -> usize {
        self.counts.len()
    }

    pub fn is_empty(&self) -> bool {
        self.counts.is_empty()
    }
}

pub fn render_sparkline(samples: &SparklineSamples) -> String {
    if samples.counts.is_empty() {
        return std::iter::repeat_n(BRAILLE_EMPTY, BAR_CELLS).collect();
    }
    let max = *samples.counts.iter().max().unwrap_or(&0);
    if max == 0 {
        return std::iter::repeat_n(BRAILLE_BLANK, BAR_CELLS).collect();
    }
    let stride = (samples.counts.len() as f32 / BAR_CELLS as f32).max(1.0);
    let mut out = String::with_capacity(BAR_CELLS * 4);
    for cell in 0..BAR_CELLS {
        let start = (cell as f32 * stride) as usize;
        let end = (((cell as f32) + 1.0) * stride) as usize;
        let end = end.min(samples.counts.len());
        let slice = &samples.counts[start..end.max(start)];
        let cell_max = slice.iter().copied().max().unwrap_or(0);
        let level = ((cell_max as f32 / max as f32) * 4.0).round() as usize;
        let level = level.min(BAR_GLYPHS.len() - 1);
        out.push(BAR_GLYPHS[level]);
    }
    out
}
