import { describe, expect, it } from "vitest";
import {
  assignCharacterColors,
  CHARACTER_PALETTE,
  lineCountByCharacter,
  overrideKind,
  parseDialogue,
  uniqueCharacters,
} from "../../src/views/recipe/lib/parse_dialogue";

describe("parseDialogue", () => {
  it("returns empty for empty script", () => {
    expect(parseDialogue("")).toEqual([]);
  });

  it("treats narration-only line as character: null", () => {
    const out = parseDialogue("Once upon a time the rain came.");
    expect(out).toHaveLength(1);
    expect(out[0].character).toBeNull();
    expect(out[0].text).toBe("Once upon a time the rain came.");
    expect(out[0].override).toBeNull();
  });

  it("parses [Char] text", () => {
    const [line] = parseDialogue("[Bob] Hello there.");
    expect(line.character).toBe("Bob");
    expect(line.text).toBe("Hello there.");
    expect(line.override).toBeNull();
  });

  it("parses [Char|emotion_vector:happy=0.7] text", () => {
    const [line] = parseDialogue("[Alice|emotion_vector:happy=0.7] How nice.");
    expect(line.character).toBe("Alice");
    expect(line.text).toBe("How nice.");
    expect(line.override).toEqual({ kind: "vector", label: "happy=0.7" });
  });

  it("parses [Char|qwen:warm] text", () => {
    const [line] = parseDialogue("[Bob|qwen:warm] Welcome.");
    expect(line.override).toEqual({ kind: "qwen", label: "warm" });
  });

  it("parses [Char|preset:Bittersweet] text", () => {
    const [line] = parseDialogue("[Bob|preset:Bittersweet] Goodbye.");
    expect(line.override).toEqual({ kind: "preset", label: "Bittersweet" });
  });

  it("parses [Char|audio:slow_breath.wav] text", () => {
    const [line] = parseDialogue("[Bob|audio:slow_breath.wav] (sigh)");
    expect(line.override).toEqual({ kind: "audio", label: "slow_breath.wav" });
  });

  it("treats malformed tag as raw narration", () => {
    const [line] = parseDialogue("[unclosed text");
    expect(line.character).toBeNull();
  });

  it("multiple lines round-trip distinct characters", () => {
    const out = parseDialogue("[Bob] hi\n[Alice] hello\n[Bob] bye");
    expect(out).toHaveLength(3);
    expect(out.map((l) => l.character)).toEqual(["Bob", "Alice", "Bob"]);
  });

  it("overrideKind classifies prefixes", () => {
    expect(overrideKind("vector:happy=0.5").kind).toBe("vector");
    expect(overrideKind("emotion_vector:angry=0.8").kind).toBe("vector");
    expect(overrideKind("qwen:cheerful").kind).toBe("qwen");
    expect(overrideKind("preset:Friendly").kind).toBe("preset");
    expect(overrideKind("audio:bark.wav").kind).toBe("audio");
    expect(overrideKind("nonsense").kind).toBe("raw");
  });

  it("uniqueCharacters preserves first-seen order", () => {
    const lines = parseDialogue("[Bob] a\n[Alice] b\n[Bob] c\n[Carol] d");
    expect(uniqueCharacters(lines)).toEqual(["Bob", "Alice", "Carol"]);
  });

  it("assignCharacterColors uses deterministic palette modulo", () => {
    const colors = assignCharacterColors(["A", "B", "C", "D", "E", "F", "G"]);
    expect(colors.A).toBe(CHARACTER_PALETTE[0]);
    expect(colors.B).toBe(CHARACTER_PALETTE[1]);
    expect(colors.G).toBe(CHARACTER_PALETTE[0]);
  });

  it("lineCountByCharacter counts correctly", () => {
    const lines = parseDialogue("[Bob] a\n[Alice] b\n[Bob] c");
    expect(lineCountByCharacter(lines)).toEqual({ Bob: 2, Alice: 1 });
  });
});
