import { describe, expect, it } from "vitest";
import {
  activeTriggerAt,
  sanitizeTokenName,
  tokeniseStory,
} from "./story_tokens";

describe("tokeniseStory", () => {
  it("captures @character + text", () => {
    const out = tokeniseStory("@bob hello");
    expect(out).toEqual([
      { kind: "character", start: 0, end: 4, value: "bob" },
      { kind: "text", start: 4, end: 10, value: " hello" },
    ]);
  });

  it("captures @character + /emotion + text", () => {
    const out = tokeniseStory("@bob /happy hi");
    expect(out.map((t) => [t.kind, t.value])).toEqual([
      ["character", "bob"],
      ["text", " "],
      ["emotion", "happy"],
      ["text", " hi"],
    ]);
  });

  it("does not trigger inside emails", () => {
    const out = tokeniseStory("email bob@example.com please");
    expect(out.length).toBe(1);
    expect(out[0]?.kind).toBe("text");
  });

  it("does not trigger / inside text", () => {
    const out = tokeniseStory("@bob 1/2 of the time");
    const triggers = out.filter((t) => t.kind === "emotion");
    expect(triggers).toHaveLength(0);
  });

  it("supports unicode names", () => {
    const out = tokeniseStory("@佐藤 こんにちは");
    expect(out[0]).toEqual({ kind: "character", start: 0, end: 3, value: "佐藤" });
  });

  it("supports hyphenated names", () => {
    const out = tokeniseStory("@bob-the-builder /very-happy hi");
    expect(out[0]?.value).toBe("bob-the-builder");
    expect(out[2]?.value).toBe("very-happy");
  });

  it("preserves text positions for overlay alignment", () => {
    const input = "first @bob second";
    const out = tokeniseStory(input);
    for (const t of out) {
      expect(input.slice(t.start, t.end)).toBe(t.kind === "text" ? t.value : (t.kind === "character" ? `@${t.value}` : `/${t.value}`));
    }
  });
});

describe("activeTriggerAt", () => {
  it("detects @ trigger at start", () => {
    const trig = activeTriggerAt("@bo", 3);
    expect(trig).toEqual({ kind: "character", start: 0, query: "bo" });
  });

  it("detects @ trigger after space", () => {
    const trig = activeTriggerAt("hi @al", 6);
    expect(trig).toEqual({ kind: "character", start: 3, query: "al" });
  });

  it("detects / trigger after space", () => {
    const trig = activeTriggerAt("@bob /ha", 8);
    expect(trig).toEqual({ kind: "emotion", start: 5, query: "ha" });
  });

  it("returns null when caret is not in a trigger word", () => {
    expect(activeTriggerAt("@bob hello", 10)).toBeNull();
  });

  it("returns null when @ is mid-word (email)", () => {
    expect(activeTriggerAt("user@example", 8)).toBeNull();
  });

  it("empty query right after the symbol", () => {
    const trig = activeTriggerAt("@", 1);
    expect(trig).toEqual({ kind: "character", start: 0, query: "" });
  });
});

describe("sanitizeTokenName", () => {
  it("keeps valid name chars unchanged", () => {
    expect(sanitizeTokenName("Angry")).toBe("Angry");
    expect(sanitizeTokenName("very-happy")).toBe("very-happy");
    expect(sanitizeTokenName("ヒロイン")).toBe("ヒロイン");
  });

  it("replaces + with _ so preset names tokenize as one pill", () => {
    expect(sanitizeTokenName("Angry+Happy")).toBe("Angry_Happy");
  });

  it("collapses runs of non-name chars and surrounding underscores", () => {
    expect(sanitizeTokenName("Sad + afraid")).toBe("Sad_afraid");
    expect(sanitizeTokenName("Sad_+_afraid")).toBe("Sad_afraid");
    expect(sanitizeTokenName("a   b")).toBe("a_b");
    expect(sanitizeTokenName("a_+b")).toBe("a_b");
  });

  it("trims leading and trailing underscores or hyphens", () => {
    expect(sanitizeTokenName("_hello_")).toBe("hello");
    expect(sanitizeTokenName("--mix--")).toBe("mix");
  });

  it("returns empty string when nothing usable remains", () => {
    expect(sanitizeTokenName("+++")).toBe("");
    expect(sanitizeTokenName("   ")).toBe("");
  });

  it("output round-trips through the tokenizer as a single pill", () => {
    const safe = sanitizeTokenName("Angry+Happy");
    const tokens = tokeniseStory(`/${safe}`);
    expect(tokens).toEqual([
      { kind: "emotion", start: 0, end: safe.length + 1, value: safe },
    ]);
  });
});
