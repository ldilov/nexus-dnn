import { describe, expect, it } from "vitest";
import {
  MAX_LORAS,
  addLora,
  removeLora,
  setLoraPath,
  setLoraWeight,
  type UserLora,
} from "../../src/views/recipe/components/lora_list";

const make = (n: number): UserLora[] =>
  Array.from({ length: n }, (_, i) => ({ path: `/loras/l${i}.safetensors`, weight: 1.0 }));

describe("addLora", () => {
  it("appends a blank entry to an empty list", () => {
    const result = addLora([]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ path: "", weight: 1.0 });
  });

  it("appends up to MAX_LORAS", () => {
    let list: UserLora[] = [];
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
    const original: UserLora[] = [];
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

  it("returns an empty list when removing the only entry", () => {
    const result = removeLora(make(1), 0);
    expect(result).toHaveLength(0);
  });

  it("does not mutate the original list", () => {
    const original = make(2);
    removeLora(original, 0);
    expect(original).toHaveLength(2);
  });
});

describe("setLoraPath", () => {
  it("updates only the entry at the given index", () => {
    const list = make(3);
    const result = setLoraPath(list, 1, "/new/path.safetensors");
    expect(result[0]?.path).toBe("/loras/l0.safetensors");
    expect(result[1]?.path).toBe("/new/path.safetensors");
    expect(result[2]?.path).toBe("/loras/l2.safetensors");
  });

  it("preserves weight on the updated row", () => {
    const list: UserLora[] = [{ path: "/old.safetensors", weight: 0.75 }];
    const result = setLoraPath(list, 0, "/new.safetensors");
    expect(result[0]?.weight).toBe(0.75);
  });

  it("does not mutate the original list", () => {
    const original = make(2);
    setLoraPath(original, 0, "/new.safetensors");
    expect(original[0]?.path).toBe("/loras/l0.safetensors");
  });
});

describe("setLoraWeight", () => {
  it("updates only the weight at the given index", () => {
    const list = make(3);
    const result = setLoraWeight(list, 2, 0.5);
    expect(result[0]?.weight).toBe(1.0);
    expect(result[1]?.weight).toBe(1.0);
    expect(result[2]?.weight).toBe(0.5);
  });

  it("preserves path on the updated row", () => {
    const list: UserLora[] = [{ path: "/keep.safetensors", weight: 1.0 }];
    const result = setLoraWeight(list, 0, 0.25);
    expect(result[0]?.path).toBe("/keep.safetensors");
  });

  it("does not mutate the original list", () => {
    const original = make(2);
    setLoraWeight(original, 0, 0.0);
    expect(original[0]?.weight).toBe(1.0);
  });
});
