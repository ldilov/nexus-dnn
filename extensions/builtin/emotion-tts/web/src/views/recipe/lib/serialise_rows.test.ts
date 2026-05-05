import { describe, expect, it } from "vitest";
import type { VectorPreset } from "../../../services/presets_client";
import { newEmptyRow, rowToLine, serialiseRowsToScript } from "./serialise_rows";

function preset(presetId: string, presetName: string, vector: VectorPreset["vector"]): VectorPreset {
  return {
    presetId,
    deploymentId: "dep_1",
    presetName,
    vector,
    createdAt: 0,
    updatedAt: 0,
  };
}

const happyPreset = preset("p_happy", "Happy", [0.7, 0, 0, 0, 0, 0, 0, 0.3]);
const sadPreset = preset("p_sad", "Sad", [0, 0, 0.6, 0, 0, 0.2, 0, 0]);

describe("serialiseRowsToScript", () => {
  it("emits a bare tag when no preset and alpha=1", () => {
    const rows = [{ ...newEmptyRow(), character: "Bob", text: "hello" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Bob] hello");
  });

  it("emits emotion_vector + alpha when preset selected", () => {
    const rows = [
      { ...newEmptyRow(), character: "Bob", presetId: "p_happy", alpha: 0.5, text: "hi" },
    ];
    const out = serialiseRowsToScript(rows, [happyPreset]);
    expect(out).toBe("[Bob|emotion_vector:happy=0.7,calm=0.3|emotion_alpha:0.5] hi");
  });

  it("emits only emotion_alpha when alpha != 1 and no preset", () => {
    const rows = [{ ...newEmptyRow(), character: "Bob", alpha: 0.6, text: "hi" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Bob|emotion_alpha:0.6] hi");
  });

  it("multi-line: three characters distinct", () => {
    const rows = [
      { ...newEmptyRow(), character: "Bob", text: "first" },
      { ...newEmptyRow(), character: "Alice", presetId: "p_sad", alpha: 0.8, text: "second" },
      { ...newEmptyRow(), character: "Bob", text: "third" },
    ];
    const out = serialiseRowsToScript(rows, [sadPreset]);
    expect(out.split("\n")).toEqual([
      "[Bob] first",
      "[Alice|emotion_vector:sad=0.6,melancholic=0.2|emotion_alpha:0.8] second",
      "[Bob] third",
    ]);
  });

  it("skips empty-text rows silently", () => {
    const rows = [
      { ...newEmptyRow(), character: "Bob", text: "kept" },
      { ...newEmptyRow(), character: "Alice", text: "   " },
      { ...newEmptyRow(), character: "Carol", text: "kept too" },
    ];
    expect(serialiseRowsToScript(rows, []).split("\n")).toEqual([
      "[Bob] kept",
      "[Carol] kept too",
    ]);
  });

  it("falls back to Narrator on blank character", () => {
    const rows = [{ ...newEmptyRow(), character: "  ", text: "untagged" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Narrator] untagged");
  });

  it("strips bracket-like characters from names to keep parser happy", () => {
    const rows = [{ ...newEmptyRow(), character: "Bo[b]|", text: "hi" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Bob] hi");
  });

  it("collapses newlines in text to spaces", () => {
    const rows = [{ ...newEmptyRow(), character: "Bob", text: "line\nbreak" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Bob] line break");
  });

  it("clamps alpha to [0,1]", () => {
    const high = rowToLine(
      { ...newEmptyRow(), character: "X", alpha: 5, text: "hi" },
      new Map(),
    );
    const low = rowToLine(
      { ...newEmptyRow(), character: "X", alpha: -2, text: "hi" },
      new Map(),
    );
    expect(high).toBe("[X] hi");
    expect(low).toBe("[X|emotion_alpha:0.0] hi");
  });

  it("ignores unknown presetId", () => {
    const rows = [{ ...newEmptyRow(), character: "Bob", presetId: "p_missing", text: "hi" }];
    expect(serialiseRowsToScript(rows, [])).toBe("[Bob] hi");
  });
});
