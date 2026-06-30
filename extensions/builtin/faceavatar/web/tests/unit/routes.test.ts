import { describe, expect, test } from "vitest";
import { defaultViewForRecipe } from "../../src/routes";

describe("defaultViewForRecipe", () => {
  test("head-refine recipe defaults to the head-refine view", () => {
    expect(defaultViewForRecipe("faceavatar_head_refine")).toBe("head-refine");
  });
  test("generate recipe defaults to the generate view", () => {
    expect(defaultViewForRecipe("faceavatar_generate")).toBe("generate");
  });
  test("unknown / null recipe falls back to generate", () => {
    expect(defaultViewForRecipe(null)).toBe("generate");
    expect(defaultViewForRecipe("something-else")).toBe("generate");
  });
});
