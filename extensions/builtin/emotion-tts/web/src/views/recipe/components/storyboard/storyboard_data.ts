import type { VoiceAsset } from "../../../../services/voice_assets_client";
import type { VectorPreset } from "../../../../services/presets_client";

export type AccentName = "primary" | "secondary" | "tertiary";

export type JobStatus = "queued" | "rendering" | "ready" | "failed";

export interface Voice {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  rgb: string;
  onColor: string;
  initial: string;
  lib: string;
}

export interface EmotionOption {
  id: string;
  label: string;
}

export interface StatusMeta {
  label: string;
  color: string;
  glow: string;
  pulse: boolean;
}

export interface Segment {
  id: string;
  text: string;
  kind: "narration" | "dialogue";
}

export interface Paragraph {
  id: string;
  segs: Segment[];
}

/** Persisted assignment: a contiguous range of script segments cast to one
 * voice + emotion. `segIds` is ordered by script position. Mirrors AC-0.2. */
export interface Job {
  id: string;
  segIds: string[];
  voiceId: string;
  emotion: string;
  status: JobStatus;
}

export const STATUS_META: Record<JobStatus, StatusMeta> = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: false },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: true },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: false },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: false },
};

interface Swatch {
  color: string;
  rgb: string;
  onColor: string;
}

/** Voice colours are drawn from the Spectral Graphite triad + modality hues so
 * the palette stays inside the design system (AC-5.1). */
const VOICE_SWATCHES: readonly Swatch[] = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" },
];

const VOICE_ICONS: readonly string[] = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio",
];

export const DEMO_VOICES: readonly Voice[] = [
  { id: "aether", name: "Aether", role: "Protagonist", icon: "record_voice_over", color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e", initial: "A", lib: "Aether_v4" },
  { id: "vesper", name: "Vesper", role: "Narrator", icon: "graphic_eq", color: "#9093ff", rgb: "144,147,255", onColor: "#080079", initial: "V", lib: "Vesper_Base" },
  { id: "luminous", name: "Luminous", role: "Antagonist", icon: "mic_external_on", color: "#ff8439", rgb: "255,132,57", onColor: "#471a00", initial: "L", lib: "Lumin_Synth" },
];

export const DEMO_EMOTIONS: readonly EmotionOption[] = [
  { id: "neutral", label: "Neutral" },
  { id: "calm", label: "Calm" },
  { id: "tense", label: "Tense" },
  { id: "intense", label: "Intense" },
];

export const DEMO_SCRIPT =
  "The chronometer flashed red, reflecting off the graphite console. " +
  "“We have approximately thirty seconds before the hull breaches,” she stated, " +
  "her voice devoid of panic — a purely mathematical assessment of their impending doom.\n\n" +
  "Kael didn’t look up from the diagnostic panel. " +
  "“Divert auxiliary power from life support to the forward deflectors.”\n\n" +
  "“That will reduce atmospheric integrity by forty percent.”\n\n" +
  "“If the hull breaches, it’s reduced by a hundred percent,” he shot back, " +
  "his fingers flying across the haptic interface. " +
  "The ship shuddered violently, throwing sparks from the overhead conduits.";

function roleForIndex(i: number): string {
  if (i === 0) return "Lead";
  if (i === 1) return "Support";
  return "Voice";
}

function initialOf(name: string): string {
  const c = name.trim().charAt(0);
  return c ? c.toUpperCase() : "?";
}

/** Build the casting palette from the deployment's real voice library. Speaker
 * + mixed assets become voices; pure-emotion assets are excluded. Falls back to
 * the vision demo cast when the deployment has none (AC-2.2). */
export function buildVoices(assets: readonly VoiceAsset[]): readonly Voice[] {
  const usable = assets.filter((a) => a.isActive && (a.kind === "speaker" || a.kind === "mixed"));
  // No demo fallback — an empty deployment shows a real empty state, not
  // fabricated voices the user never created.
  if (usable.length === 0) return [];
  return usable.map((a, i) => {
    const sw = VOICE_SWATCHES[i % VOICE_SWATCHES.length] as Swatch;
    const icon = VOICE_ICONS[i % VOICE_ICONS.length] as string;
    return {
      id: a.voiceAssetId,
      name: a.displayName || `Voice ${i + 1}`,
      role: roleForIndex(i),
      icon,
      color: sw.color,
      rgb: sw.rgb,
      onColor: sw.onColor,
      initial: initialOf(a.displayName || "V"),
      lib: a.displayName || a.voiceAssetId,
    };
  });
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}

/** Emotion options from the deployment's vector presets, deduped by name; falls
 * back to the vision demo set when the deployment has none (AC-2.3). */
export function buildEmotions(presets: readonly VectorPreset[]): readonly EmotionOption[] {
  const seen = new Set<string>();
  const out: EmotionOption[] = [];
  for (const p of presets) {
    const id = slug(p.presetName);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ id, label: p.presetName });
  }
  return out;
}

export function presetVectorForEmotionId(
  presets: readonly VectorPreset[],
  emotionId: string,
): number[] | null {
  const match = presets.find((p) => slug(p.presetName) === emotionId);
  if (!match) return null;
  const vector = match.vector;
  return Array.isArray(vector) && vector.length === 8 ? vector : null;
}

/** Split a script into paragraphs of clickable WORD segments — each word keeps
 * its trailing whitespace, so concatenating segments in order reproduces the
 * source losslessly (previews + ordering stay exact). Word granularity lets a
 * user cast an arbitrary contiguous subset of words via click + shift-click.
 * Quote-aware: words inside “…” are tagged dialogue. Ids are deterministic. */
export function segmentScript(text: string): Paragraph[] {
  const paraChunks = text.split(/\n\s*\n/);
  const paragraphs: Paragraph[] = [];
  let pi = 0;
  for (const chunk of paraChunks) {
    if (!chunk.trim()) continue;
    const words = chunk.match(/\S+\s*/g) ?? [chunk];
    let inQuote = false;
    const segs: Segment[] = words.map((w, si) => {
      const kind: Segment["kind"] = inQuote || /[“”"]/.test(w) ? "dialogue" : "narration";
      for (const ch of w) {
        if (ch === "“") inQuote = true;
        else if (ch === "”") inQuote = false;
        else if (ch === '"') inQuote = !inQuote;
      }
      return { id: `p${pi}s${si}`, text: w, kind };
    });
    paragraphs.push({ id: `p${pi}`, segs });
    pi += 1;
  }
  return paragraphs;
}

export function flatSegments(paragraphs: readonly Paragraph[]): Segment[] {
  const out: Segment[] = [];
  for (const p of paragraphs) for (const s of p.segs) out.push(s);
  return out;
}

export function orderIndex(paragraphs: readonly Paragraph[], segId: string): number {
  let i = 0;
  for (const p of paragraphs) {
    for (const s of p.segs) {
      if (s.id === segId) return i;
      i += 1;
    }
  }
  return Number.MAX_SAFE_INTEGER;
}

export function segsInRange(paragraphs: readonly Paragraph[], lo: number, hi: number): string[] {
  const out: string[] = [];
  let i = 0;
  for (const p of paragraphs) {
    for (const s of p.segs) {
      if (i >= lo && i <= hi) out.push(s.id);
      i += 1;
    }
  }
  return out;
}

export function segText(paragraphs: readonly Paragraph[], segId: string): string {
  for (const p of paragraphs) for (const s of p.segs) if (s.id === segId) return s.text;
  return "";
}

export function rangeText(paragraphs: readonly Paragraph[], segIds: readonly string[]): string {
  return [...segIds]
    .sort((a, b) => orderIndex(paragraphs, a) - orderIndex(paragraphs, b))
    .map((id) => segText(paragraphs, id))
    .join("")
    .trim();
}

export function minOrder(paragraphs: readonly Paragraph[], job: Job): number {
  return Math.min(...job.segIds.map((s) => orderIndex(paragraphs, s)));
}

export function jobOfSegment(jobs: readonly Job[], segId: string): Job | undefined {
  return jobs.find((j) => j.segIds.includes(segId));
}

/** A range is assignable only when none of its segments already belong to a job
 * — enforces AC-8.1 (no overlap) and AC-8.2 (no duplicate). */
export function rangeIsFree(jobs: readonly Job[], range: readonly string[]): boolean {
  return range.every((id) => !jobOfSegment(jobs, id));
}

export function jobsInScriptOrder(paragraphs: readonly Paragraph[], jobs: readonly Job[]): Job[] {
  return [...jobs].sort((a, b) => minOrder(paragraphs, a) - minOrder(paragraphs, b));
}

/** Stable SEG-001… labels assigned in script order (AC-4.3). */
export function segmentLabels(paragraphs: readonly Paragraph[], jobs: readonly Job[]): Record<string, string> {
  const labels: Record<string, string> = {};
  jobsInScriptOrder(paragraphs, jobs).forEach((j, i) => {
    labels[j.id] = `SEG-${String(i + 1).padStart(3, "0")}`;
  });
  return labels;
}

export function countWords(paragraphs: readonly Paragraph[]): number {
  return flatSegments(paragraphs).reduce(
    (n, s) => n + s.text.trim().split(/\s+/).filter(Boolean).length,
    0,
  );
}

export function statusSummary(jobs: readonly Job[]): string {
  const counts: Record<JobStatus, number> = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const j of jobs) counts[j.status] += 1;
  const parts: string[] = [];
  if (counts.queued) parts.push(`${counts.queued} queued`);
  if (counts.rendering) parts.push(`${counts.rendering} rendering`);
  if (counts.ready) parts.push(`${counts.ready} ready`);
  if (counts.failed) parts.push(`${counts.failed} failed`);
  return parts.join("  ·  ");
}

/// Neutral placeholder used when a deployment has no voices yet, or a job
/// references a voice that no longer exists — keeps every `voiceById` caller
/// crash-safe (it always gets a real Voice with all fields populated).
export const FALLBACK_VOICE: Voice = {
  id: "",
  name: "Unassigned",
  role: "",
  icon: "graphic_eq",
  color: "var(--on-surface-variant, #c4c7c5)",
  rgb: "120,124,128",
  onColor: "#15171a",
  initial: "—",
  lib: "",
};

export function voiceById(voices: readonly Voice[], id: string): Voice {
  return voices.find((v) => v.id === id) ?? voices[0] ?? FALLBACK_VOICE;
}

export function emotionLabel(emotions: readonly EmotionOption[], id: string): string {
  return emotions.find((e) => e.id === id)?.label ?? id;
}
