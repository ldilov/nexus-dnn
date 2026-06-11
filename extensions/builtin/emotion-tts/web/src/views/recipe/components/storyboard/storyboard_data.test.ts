import { describe, expect, it } from "vitest";
import type { VoiceAsset } from "../../../../services/voice_assets_client";
import type { VectorPreset } from "../../../../services/presets_client";
import {
  buildEmotions,
  buildVoices,
  DEMO_EMOTIONS,
  DEMO_VOICES,
  flatSegments,
  jobOfSegment,
  orderIndex,
  rangeIsFree,
  rangeText,
  segmentLabels,
  segmentScript,
  segsInRange,
  type Job,
} from "./storyboard_data";

function voiceAsset(over: Partial<VoiceAsset>): VoiceAsset {
  return {
    voiceAssetId: over.voiceAssetId ?? "va1",
    deploymentId: "dep",
    displayName: over.displayName ?? "Voice",
    kind: over.kind ?? "speaker",
    audioArtifactRef: "ref",
    contentSha256: "sha",
    sourceType: "upload",
    isActive: over.isActive ?? true,
    createdAt: 0,
    updatedAt: 0,
    ...over,
  };
}

function preset(name: string): VectorPreset {
  return { presetId: name, deploymentId: "dep", presetName: name, vector: [0, 0, 0, 0, 0, 0, 0, 0], createdAt: 0, updatedAt: 0 };
}

describe("segmentScript", () => {
  it("splits paragraphs on blank lines and is lossless within a paragraph", () => {
    const text = "Hello world. Second phrase!\n\nNew paragraph here.";
    const paras = segmentScript(text);
    expect(paras).toHaveLength(2);
    const rejoinedP0 = paras[0]!.segs.map((s) => s.text).join("");
    expect(rejoinedP0).toBe("Hello world. Second phrase!");
  });

  it("produces deterministic, unique ids by position", () => {
    const a = segmentScript("One. Two. Three.");
    const b = segmentScript("One. Two. Three.");
    expect(a[0]!.segs.map((s) => s.id)).toEqual(b[0]!.segs.map((s) => s.id));
    const ids = flatSegments(a).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("returns no paragraphs for empty / whitespace text (AC-8.3)", () => {
    expect(segmentScript("")).toHaveLength(0);
    expect(segmentScript("   \n\n  ")).toHaveLength(0);
  });
});

describe("ordering + ranges", () => {
  const paras = segmentScript("A one. B two. C three.\n\nD four.");
  const ids = flatSegments(paras).map((s) => s.id);

  it("orderIndex is monotonic in script position (AC-4.3)", () => {
    for (let i = 1; i < ids.length; i += 1) {
      expect(orderIndex(paras, ids[i]!)).toBeGreaterThan(orderIndex(paras, ids[i - 1]!));
    }
  });

  it("segsInRange returns the contiguous slice", () => {
    const range = segsInRange(paras, 0, 1);
    expect(range).toEqual([ids[0], ids[1]]);
  });

  it("rangeText concatenates in script order and trims", () => {
    const txt = rangeText(paras, [ids[1]!, ids[0]!]);
    expect(txt.startsWith("A one.")).toBe(true);
  });
});

describe("overlap + duplicate guards (AC-8.1 / AC-8.2)", () => {
  const paras = segmentScript("One. Two. Three.");
  const ids = flatSegments(paras).map((s) => s.id);
  const jobs: Job[] = [{ id: "j1", segIds: [ids[0]!], voiceId: "aether", emotion: "neutral", status: "queued" }];

  it("rangeIsFree is false when any segment already cast", () => {
    expect(rangeIsFree(jobs, [ids[0]!, ids[1]!])).toBe(false);
    expect(rangeIsFree(jobs, [ids[1]!, ids[2]!])).toBe(true);
  });

  it("jobOfSegment finds the owning job", () => {
    expect(jobOfSegment(jobs, ids[0]!)?.id).toBe("j1");
    expect(jobOfSegment(jobs, ids[1]!)).toBeUndefined();
  });
});

describe("segmentLabels", () => {
  it("labels jobs SEG-00n in script order, not creation order (AC-4.3)", () => {
    const paras = segmentScript("One. Two. Three.");
    const ids = flatSegments(paras).map((s) => s.id);
    const jobs: Job[] = [
      { id: "late", segIds: [ids[2]!], voiceId: "aether", emotion: "neutral", status: "queued" },
      { id: "early", segIds: [ids[0]!], voiceId: "aether", emotion: "neutral", status: "queued" },
    ];
    const labels = segmentLabels(paras, jobs);
    expect(labels["early"]).toBe("SEG-001");
    expect(labels["late"]).toBe("SEG-002");
  });
});

describe("buildVoices", () => {
  it("falls back to the demo cast when no usable assets (AC-2.2)", () => {
    expect(buildVoices([])).toBe(DEMO_VOICES);
    expect(buildVoices([voiceAsset({ kind: "emotion" })])).toBe(DEMO_VOICES);
    expect(buildVoices([voiceAsset({ isActive: false })])).toBe(DEMO_VOICES);
  });

  it("maps real speaker/mixed assets to voices with palette colours", () => {
    const voices = buildVoices([
      voiceAsset({ voiceAssetId: "a", displayName: "Nova", kind: "speaker" }),
      voiceAsset({ voiceAssetId: "b", displayName: "Echo", kind: "mixed" }),
    ]);
    expect(voices.map((v) => v.id)).toEqual(["a", "b"]);
    expect(voices[0]!.initial).toBe("N");
    expect(voices[0]!.color).not.toBe(voices[1]!.color);
  });
});

describe("buildEmotions", () => {
  it("falls back to demo emotions when no presets (AC-2.3)", () => {
    expect(buildEmotions([])).toBe(DEMO_EMOTIONS);
  });

  it("derives deduped options from preset names", () => {
    const out = buildEmotions([preset("Joyful"), preset("Joyful"), preset("Wistful")]);
    expect(out.map((e) => e.label)).toEqual(["Joyful", "Wistful"]);
  });
});
