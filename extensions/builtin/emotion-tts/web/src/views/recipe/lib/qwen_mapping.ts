import {
  AXIS_KEYS,
  type AxisKey,
  type EmotionVec,
  EMPTY_VEC,
  clampVec,
} from "./preset_naming";

interface KeywordMapping {
  axis: AxisKey;
  weight: number;
  keywords: readonly string[];
}

const KEYWORD_TABLE: readonly KeywordMapping[] = [
  {
    axis: "happy",
    weight: 0.8,
    keywords: [
      "happy",
      "joyful",
      "cheerful",
      "upbeat",
      "smiling",
      "giggle",
      "delighted",
      "thrilled",
      "warm",
      "friendly",
      "sunny",
      "glad",
    ],
  },
  {
    axis: "angry",
    weight: 0.8,
    keywords: [
      "angry",
      "furious",
      "rage",
      "irritated",
      "pissed",
      "annoyed",
      "snarl",
      "hostile",
      "aggressive",
      "snap",
      "scold",
    ],
  },
  {
    axis: "sad",
    weight: 0.8,
    keywords: [
      "sad",
      "tearful",
      "sorrow",
      "grief",
      "mourning",
      "weep",
      "crying",
      "hurt",
      "broken",
      "down",
      "depressed",
    ],
  },
  {
    axis: "afraid",
    weight: 0.8,
    keywords: [
      "afraid",
      "fearful",
      "scared",
      "terrified",
      "panic",
      "anxious",
      "worried",
      "nervous",
      "shaky",
      "trembling",
      "frightened",
    ],
  },
  {
    axis: "disgusted",
    weight: 0.7,
    keywords: [
      "disgusted",
      "repulsed",
      "sick",
      "revolted",
      "grossed",
      "appalled",
      "loathing",
      "contempt",
      "sneer",
    ],
  },
  {
    axis: "melancholic",
    weight: 0.7,
    keywords: [
      "melancholic",
      "wistful",
      "bittersweet",
      "yearning",
      "longing",
      "pensive",
      "nostalgic",
      "dreamy",
      "hazy",
      "soft sad",
    ],
  },
  {
    axis: "surprised",
    weight: 0.7,
    keywords: [
      "surprised",
      "shocked",
      "astonished",
      "stunned",
      "amazed",
      "bewildered",
      "wonder",
      "wow",
      "gasp",
      "startled",
    ],
  },
  {
    axis: "calm",
    weight: 0.7,
    keywords: [
      "calm",
      "relaxed",
      "serene",
      "peaceful",
      "neutral",
      "steady",
      "even",
      "measured",
      "quiet",
      "composed",
      "settled",
    ],
  },
];

const INTENSIFIERS = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so",
];
const HEDGES = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely",
];
const NEGATIONS = ["not", "no", "never", "without", "lack", "lacking", "free of"];

export function mapPromptToVector(prompt: string): EmotionVec {
  const normalized = prompt.toLowerCase().trim();
  if (!normalized) return { ...EMPTY_VEC };

  const tokens = normalized.split(/\s+/);
  const intensifierBoost = tokens.some((t) => INTENSIFIERS.includes(t)) ? 1.2 : 1.0;
  const hedgeDamp = HEDGES.some((h) => normalized.includes(h)) ? 0.55 : 1.0;

  const out: EmotionVec = { ...EMPTY_VEC };
  for (const mapping of KEYWORD_TABLE) {
    let hits = 0;
    for (const keyword of mapping.keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
      const wordRe = new RegExp(`\\b${escaped}\\b`);
      const match = wordRe.exec(normalized);
      if (!match) continue;
      const idx = match.index;
      const before = normalized.slice(0, idx);
      const lastClauseStart = Math.max(
        before.lastIndexOf(","),
        before.lastIndexOf(";"),
        before.lastIndexOf(" but "),
        before.lastIndexOf(" yet "),
      );
      const clauseHead = before.slice(lastClauseStart >= 0 ? lastClauseStart : 0);
      const tail = clauseHead.slice(-30);
      if (NEGATIONS.some((n) => new RegExp(`\\b${n}\\b`).test(tail))) {
        continue;
      }
      hits += 1;
    }
    if (hits > 0) {
      const raw = mapping.weight * Math.min(1, 0.55 + 0.2 * (hits - 1)) * intensifierBoost * hedgeDamp;
      out[mapping.axis] = Math.min(1, raw);
    }
  }

  if (AXIS_KEYS.every((k) => out[k] === 0)) {
    out.calm = 0.4;
  }

  return clampVec(out);
}
