import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearDeploymentModel,
  persistDeploymentModel,
  readDeploymentModel,
  type StickyModel,
} from "../sticky_model";

const STORAGE_KEY = "local-llm:deployment-active-model";

const sampleModel: StickyModel = {
  family_id: "meta/llama",
  variant_id: "Q4",
  tuning: {
    ctx_size: 8192,
    n_gpu_layers: 0,
    threads: 4,
    cache_type_k: "fp16",
    cache_type_v: "fp16",
    flash_attn: false,
    mlock: false,
    mmap: true,
    n_batch: 512,
    n_parallel: 1,
    seed: 0,
  },
  saved_at: "2026-05-07T12:00:00Z",
};

let storage: Record<string, string>;
let originalLocalStorage: Storage;

beforeEach(() => {
  storage = {};
  originalLocalStorage = window.localStorage;
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
      clear: () => {
        for (const k of Object.keys(storage)) delete storage[k];
      },
      key: (i: number) => Object.keys(storage)[i] ?? null,
      get length() {
        return Object.keys(storage).length;
      },
    },
  });
});

afterEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: originalLocalStorage,
  });
});

describe("sticky_model", () => {
  it("returns null when no entry exists", () => {
    expect(readDeploymentModel("dep-1")).toBeNull();
  });

  it("returns null for empty deployment id", () => {
    expect(readDeploymentModel(null)).toBeNull();
    expect(readDeploymentModel("")).toBeNull();
    expect(readDeploymentModel(undefined)).toBeNull();
  });

  it("persists and reads back a model for a deployment", () => {
    persistDeploymentModel("dep-1", sampleModel);
    const retrieved = readDeploymentModel("dep-1");
    expect(retrieved).toEqual(sampleModel);
  });

  it("scopes entries per deployment id", () => {
    const second: StickyModel = { ...sampleModel, family_id: "qwen/qwen3" };
    persistDeploymentModel("dep-1", sampleModel);
    persistDeploymentModel("dep-2", second);
    expect(readDeploymentModel("dep-1")?.family_id).toBe("meta/llama");
    expect(readDeploymentModel("dep-2")?.family_id).toBe("qwen/qwen3");
  });

  it("ignores writes when deployment id is missing", () => {
    persistDeploymentModel(null, sampleModel);
    persistDeploymentModel("", sampleModel);
    expect(storage[STORAGE_KEY]).toBeUndefined();
  });

  it("clears a single deployment without affecting others", () => {
    persistDeploymentModel("dep-1", sampleModel);
    persistDeploymentModel("dep-2", { ...sampleModel, family_id: "qwen/qwen3" });
    clearDeploymentModel("dep-1");
    expect(readDeploymentModel("dep-1")).toBeNull();
    expect(readDeploymentModel("dep-2")?.family_id).toBe("qwen/qwen3");
  });

  it("returns null when stored value is not a JSON object", () => {
    storage[STORAGE_KEY] = "[]";
    expect(readDeploymentModel("dep-1")).toBeNull();
    storage[STORAGE_KEY] = "not-json";
    expect(readDeploymentModel("dep-1")).toBeNull();
  });
});
