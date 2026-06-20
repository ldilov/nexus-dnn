import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearDeploymentModel,
  hydrateDeploymentModel,
  persistDeploymentModel,
  readDeploymentModel,
  type StickyModel,
} from "../sticky_model";

const { mockFetch, mockPut, mockDelete } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
  mockPut: vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock("../../../services/deployment_extension_settings", () => ({
  fetchDeploymentExtensionSettings: mockFetch,
  putDeploymentExtensionSettings: mockPut,
  deleteDeploymentExtensionSettings: mockDelete,
}));

const STORAGE_KEY = "local-llm:deployment-active-model";
const EXTENSION_ID = "nexus.local-llm";

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

function remoteEnvelope(settings: unknown, updatedAt: string | null) {
  return {
    deployment_id: "dep-1",
    extension_id: EXTENSION_ID,
    settings,
    schema_fingerprint: null,
    updated_at: updatedAt,
  };
}

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
  mockFetch.mockReset();
  mockPut.mockReset().mockResolvedValue(undefined);
  mockDelete.mockReset().mockResolvedValue(undefined);
});

afterEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: originalLocalStorage,
  });
});

describe("sticky_model — local cache", () => {
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
    expect(readDeploymentModel("dep-1")).toEqual(sampleModel);
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

describe("sticky_model — server sync", () => {
  it("mirrors writes to the server under the local-llm extension id", () => {
    persistDeploymentModel("dep-1", sampleModel);
    expect(mockPut).toHaveBeenCalledWith("dep-1", EXTENSION_ID, sampleModel);
  });

  it("mirrors clears to the server", () => {
    clearDeploymentModel("dep-1");
    expect(mockDelete).toHaveBeenCalledWith("dep-1", EXTENSION_ID);
  });

  it("hydrate prefers the server row and refreshes the local cache", async () => {
    const serverModel: StickyModel = { ...sampleModel, family_id: "server/win" };
    mockFetch.mockResolvedValue(remoteEnvelope(serverModel, "2026-06-20T00:00:00Z"));

    const result = await hydrateDeploymentModel("dep-1");

    expect(result?.family_id).toBe("server/win");
    expect(readDeploymentModel("dep-1")?.family_id).toBe("server/win");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("hydrate migrates a cached localStorage value up when the server has no row", async () => {
    storage[STORAGE_KEY] = JSON.stringify({ "dep-1": sampleModel });
    mockFetch.mockResolvedValue(remoteEnvelope({}, null));

    const result = await hydrateDeploymentModel("dep-1");

    expect(result).toEqual(sampleModel);
    expect(mockPut).toHaveBeenCalledWith("dep-1", EXTENSION_ID, sampleModel);
  });

  it("hydrate falls back to the local cache when the server is unreachable", async () => {
    storage[STORAGE_KEY] = JSON.stringify({ "dep-1": sampleModel });
    mockFetch.mockRejectedValue(new Error("network down"));

    const result = await hydrateDeploymentModel("dep-1");

    expect(result).toEqual(sampleModel);
  });

  it("hydrate returns null for a missing deployment id", async () => {
    expect(await hydrateDeploymentModel(null)).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("hydrate rejects a partial server blob and migrates the cache instead", async () => {
    storage[STORAGE_KEY] = JSON.stringify({ "dep-1": sampleModel });
    mockFetch.mockResolvedValue(remoteEnvelope({ family_id: "partial" }, "2026-06-20T00:00:00Z"));

    const result = await hydrateDeploymentModel("dep-1");

    expect(result).toEqual(sampleModel);
    expect(mockPut).toHaveBeenCalledWith("dep-1", EXTENSION_ID, sampleModel);
  });

  it("hydrate skips the migration write when the signal is already aborted", async () => {
    storage[STORAGE_KEY] = JSON.stringify({ "dep-1": sampleModel });
    mockFetch.mockResolvedValue(remoteEnvelope({}, null));
    const controller = new AbortController();
    controller.abort();

    const result = await hydrateDeploymentModel("dep-1", controller.signal);

    expect(result).toEqual(sampleModel);
    expect(mockPut).not.toHaveBeenCalled();
  });
});
