import { describe, expect, it } from "vitest";
import { mapPromptToVector } from "../../src/views/recipe/lib/qwen_mapping";

describe("mapPromptToVector (FR-047)", () => {
  it("empty prompt returns identity vector", () => {
    expect(mapPromptToVector("")).toEqual({
      happy: 0,
      angry: 0,
      sad: 0,
      afraid: 0,
      disgusted: 0,
      melancholic: 0,
      surprised: 0,
      calm: 0,
    });
  });

  it("recognizes a single emotion keyword", () => {
    const vec = mapPromptToVector("very cheerful");
    expect(vec.happy).toBeGreaterThan(0);
    expect(vec.sad).toBe(0);
  });

  it("amplifies intensity with intensifier", () => {
    const plain = mapPromptToVector("happy").happy;
    const amped = mapPromptToVector("very happy").happy;
    expect(amped).toBeGreaterThan(plain);
  });

  it("dampens with hedges", () => {
    const plain = mapPromptToVector("happy").happy;
    const hedged = mapPromptToVector("a bit happy").happy;
    expect(hedged).toBeLessThan(plain);
  });

  it("respects negation", () => {
    const vec = mapPromptToVector("not angry, just sad");
    expect(vec.angry).toBe(0);
    expect(vec.sad).toBeGreaterThan(0);
  });

  it("captures the spec example: 'exhausted but trying to stay upbeat'", () => {
    const vec = mapPromptToVector("exhausted but trying to stay upbeat");
    expect(vec.happy).toBeGreaterThan(0);
  });

  it("captures 'Friendly teen, slightly skeptical'", () => {
    const vec = mapPromptToVector("Friendly teen, slightly skeptical");
    expect(vec.happy).toBeGreaterThan(0);
  });

  it("falls back to calm baseline when no keywords match", () => {
    const vec = mapPromptToVector("the weather is changing");
    expect(vec.calm).toBe(0.4);
  });

  it("clamps to [0, 1]", () => {
    const vec = mapPromptToVector(
      "extremely happy joyful cheerful warm friendly upbeat thrilled glad",
    );
    expect(vec.happy).toBeLessThanOrEqual(1);
    expect(vec.happy).toBeGreaterThan(0);
  });

  it("does not match keywords inside other words (word-boundary regex)", () => {
    // "broken" should not match inside "unbroken"
    const v1 = mapPromptToVector("unbroken spirit");
    expect(v1.sad).toBe(0);
    // "snap" should not match inside "snapshot"
    const v2 = mapPromptToVector("take a snapshot");
    expect(v2.angry).toBe(0);
    // "down" should not match inside "downtown"
    const v3 = mapPromptToVector("downtown energy");
    expect(v3.sad).toBe(0);
  });

  it("matches multi-word keywords across whitespace variants", () => {
    const v1 = mapPromptToVector("kind of happy");
    const v2 = mapPromptToVector("kind  of  happy");
    expect(v1.happy).toBeGreaterThan(0);
    expect(v2.happy).toBeGreaterThan(0);
  });
});
