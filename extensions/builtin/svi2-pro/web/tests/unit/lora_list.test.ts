import { describe, expect, it } from "vitest";
import type { UserLoraParam } from "../../src/services/types";
import {
  MAX_LORAS,
  addLora,
  loraWeightHigh,
  loraWeightLow,
  removeLora,
  setLoraPath,
  setLoraWeightHigh,
  setLoraWeightLow,
} from "../../src/views/recipe/components/lora_list";

const make = (n: number): UserLoraParam[] =>
  Array.from({ length: n }, (_, i) => ({
    path: `/loras/l${i}.safetensors`,
    weight_high: 1.0,
    weight_low: 1.0,
  }));

describe("addLora", () => {
  it("appends a blank entry with per-expert weights", () => {
    const result = addLora([]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ path: "", weight_high: 1.0, weight_low: 1.0 });
  });

  it("appends up to MAX_LORAS", () => {
    let list: UserLoraParam[] = [];
    for (let i = 0; i < MAX_LORAS; i++) list = addLora(list);
    expect(list).toHaveLength(MAX_LORAS);
  });

  it("is a no-op when the list is already at MAX_LORAS", () => {
    const full = make(MAX_LORAS);
    const result = addLora(full);
    expect(result).toHaveLength(MAX_LORAS);
    expect(result).toBe(full);
  });

  it("does not mutate the original list", () => {
    const original: UserLoraParam[] = [];
    addLora(original);
    expect(original).toHaveLength(0);
  });
});

describe("removeLora", () => {
  it("drops the entry at the given index", () => {
    const list = make(3);
    const result = removeLora(list, 1);
    expect(result).toHaveLength(2);
    expect(result[0]?.path).toBe("/loras/l0.safetensors");
    expect(result[1]?.path).toBe("/loras/l2.safetensors");
  });

  it("does not mutate the original list", () => {
    const original = make(2);
    removeLora(original, 0);
    expect(original).toHaveLength(2);
  });
});

describe("setLoraPath", () => {
  it("updates only the entry at the given index, preserving weights", () => {
    const list = make(3);
    const result = setLoraPath(list, 1, "/new/path.safetensors");
    expect(result[1]?.path).toBe("/new/path.safetensors");
    expect(result[1]?.weight_high).toBe(1.0);
    expect(result[0]?.path).toBe("/loras/l0.safetensors");
  });
});

describe("per-expert weights", () => {
  it("setLoraWeightHigh updates only the high weight at the index", () => {
    const result = setLoraWeightHigh(make(2), 1, 3.0);
    expect(result[1]?.weight_high).toBe(3.0);
    expect(result[1]?.weight_low).toBe(1.0);
    expect(result[0]?.weight_high).toBe(1.0);
  });

  it("setLoraWeightLow updates only the low weight at the index", () => {
    const result = setLoraWeightLow(make(2), 0, 1.5);
    expect(result[0]?.weight_low).toBe(1.5);
    expect(result[0]?.weight_high).toBe(1.0);
  });

  it("does not mutate the original list", () => {
    const original = make(1);
    setLoraWeightHigh(original, 0, 2.0);
    expect(original[0]?.weight_high).toBe(1.0);
  });

  it("loraWeightHigh/Low fall back to legacy single weight then 1.0", () => {
    expect(loraWeightHigh({ path: "/a", weight: 0.8 })).toBe(0.8);
    expect(loraWeightLow({ path: "/a", weight: 0.8 })).toBe(0.8);
    expect(loraWeightHigh({ path: "/a", weight_high: 3.0, weight: 0.8 })).toBe(3.0);
    expect(loraWeightLow({ path: "/a" })).toBe(1.0);
  });
});
