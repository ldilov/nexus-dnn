import { cleanup, render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { RenderParams } from "../../src/services/types";
import { loadPersistedParams, savePersistedParams } from "../../src/store/recipe_persistence";

vi.mock("../../src/services/render_client", () => ({
  subscribeRenderStream: vi.fn(() => vi.fn()),
  startRender: vi.fn(),
  cancelRender: vi.fn(),
}));

vi.mock("../../src/services/history_client", () => ({
  getRenderJob: vi.fn(),
}));

import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";

function paramsOf(overrides: Partial<RenderParams>): RenderParams {
  return {
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    num_inference_steps: 50,
    cfg_scale: 4.0,
    ...overrides,
  } as RenderParams;
}

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => (map.has(k) ? (map.get(k) as string) : null),
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => map.delete(k),
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
  };
}

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: memoryStorage(),
  });
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => "hidden",
  });
});

afterEach(() => {
  captured = null;
  cleanup();
});

describe("recipe_persistence module", () => {
  test("round-trips params for a deployment", () => {
    savePersistedParams("dep-a", paramsOf({ num_inference_steps: 12 }));
    expect(loadPersistedParams("dep-a")?.num_inference_steps).toBe(12);
  });

  test("isolates by deployment id", () => {
    savePersistedParams("dep-a", paramsOf({ cfg_scale: 9 }));
    expect(loadPersistedParams("dep-b")).toBeNull();
  });

  test("never persists transient anchor paths", () => {
    savePersistedParams("dep-a", paramsOf({ ref_image_path: "/tmp/a.png", cfg_scale: 6 }));
    const loaded = loadPersistedParams("dep-a");
    expect(loaded?.ref_image_path).toBeUndefined();
    expect(loaded?.cfg_scale).toBe(6);
  });

  test("undefined deployment id is a no-op", () => {
    savePersistedParams(undefined, paramsOf({ cfg_scale: 7 }));
    expect(loadPersistedParams(undefined)).toBeNull();
  });

  test("ignores a payload written under a different version", () => {
    window.localStorage.setItem(
      "nexus.video.svi2-pro.recipe.dep-a",
      JSON.stringify({ v: 999, params: { cfg_scale: 3 } }),
    );
    expect(loadPersistedParams("dep-a")).toBeNull();
  });
});

describe("provider persists and rehydrates the recipe per deployment", () => {
  test("an edited param survives a remount under the same deployment", async () => {
    const { unmount } = render(
      <RenderRequestProvider deploymentId="dep-a">
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      captured?.updateParam("num_inference_steps", 8);
    });
    expect(loadPersistedParams("dep-a")?.num_inference_steps).toBe(8);
    unmount();

    render(
      <RenderRequestProvider deploymentId="dep-a">
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.params.num_inference_steps).toBe(8);
  });

  test("a different deployment falls back to defaults", async () => {
    render(
      <RenderRequestProvider deploymentId="dep-a">
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      captured?.updateParam("num_inference_steps", 8);
    });
    cleanup();

    render(
      <RenderRequestProvider deploymentId="dep-b">
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.params.num_inference_steps).toBe(50);
  });
});
