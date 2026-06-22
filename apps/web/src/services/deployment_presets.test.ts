import { afterEach, describe, expect, it, vi } from "vitest";
import {
  applyPreset,
  createPresetFromCurrent,
  createPresetFromEnvelope,
  deletePreset,
  listPresets,
  renamePreset,
  type PresetSummary,
} from "./deployment_presets";
import type { ExportEnvelope } from "./deployment_transfer";

interface Captured {
  url: string;
  method: string;
  body: unknown;
}

function stubFetch(data: unknown): { captured: Captured[]; restore: () => void } {
  const captured: Captured[] = [];
  const original = globalThis.fetch;
  const stub = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const raw = init?.body;
    captured.push({
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      body: typeof raw === "string" ? JSON.parse(raw) : raw,
    });
    return new Response(JSON.stringify({ data, error: null, meta: {} }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  globalThis.fetch = stub as unknown as typeof fetch;
  return { captured, restore: () => { globalThis.fetch = original; } };
}

const preset: PresetSummary = {
  id: "depreset_1",
  name: "Cinematic",
  description: null,
  recipe_key: "nexus.video.svi2-pro",
  source_extension_id: "nexus.video.svi2-pro",
  created_at: "t",
  updated_at: "t",
};

afterEach(() => vi.restoreAllMocks());

describe("deployment_presets client", () => {
  it("listPresets unwraps the {presets} envelope", async () => {
    const { captured, restore } = stubFetch({ presets: [preset] });
    try {
      const got = await listPresets("dep-1");
      expect(got).toEqual([preset]);
      expect(captured[0]?.url).toBe("/api/v1/deployments/dep-1/presets");
      expect(captured[0]?.method).toBe("GET");
    } finally {
      restore();
    }
  });

  it("createPresetFromCurrent POSTs source=current", async () => {
    const { captured, restore } = stubFetch(preset);
    try {
      const got = await createPresetFromCurrent("dep-1", "Cinematic", "nice");
      expect(got).toEqual(preset);
      expect(captured[0]?.url).toBe("/api/v1/deployments/dep-1/presets");
      expect(captured[0]?.method).toBe("POST");
      expect(captured[0]?.body).toEqual({ source: "current", name: "Cinematic", description: "nice" });
    } finally {
      restore();
    }
  });

  it("createPresetFromEnvelope POSTs source=envelope", async () => {
    const env: ExportEnvelope = {
      package_version: 1,
      deployment: {},
      revisions: [{}],
      integrity: { hash_algo: "x", digest: "0" },
    };
    const { captured, restore } = stubFetch(preset);
    try {
      await createPresetFromEnvelope("dep-1", "FromFile", env);
      expect(captured[0]?.body).toEqual({ source: "envelope", name: "FromFile", description: undefined, envelope: env });
    } finally {
      restore();
    }
  });

  it("applyPreset POSTs to the apply path and returns ImportResult", async () => {
    const { captured, restore } = stubFetch({ deployment_id: "dep-1", state: "saved", diagnostics_count: 0 });
    try {
      const got = await applyPreset("dep-1", "depreset_1");
      expect(got.state).toBe("saved");
      expect(captured[0]?.url).toBe("/api/v1/deployments/dep-1/presets/depreset_1/apply");
      expect(captured[0]?.method).toBe("POST");
    } finally {
      restore();
    }
  });

  it("renamePreset PATCHes the preset path", async () => {
    const { captured, restore } = stubFetch(preset);
    try {
      await renamePreset("dep-1", "depreset_1", "NewName", "newdesc");
      expect(captured[0]?.url).toBe("/api/v1/deployments/dep-1/presets/depreset_1");
      expect(captured[0]?.method).toBe("PATCH");
      expect(captured[0]?.body).toEqual({ name: "NewName", description: "newdesc" });
    } finally {
      restore();
    }
  });

  it("deletePreset DELETEs the preset path", async () => {
    const { captured, restore } = stubFetch(null);
    try {
      await deletePreset("dep-1", "depreset_1");
      expect(captured[0]?.url).toBe("/api/v1/deployments/dep-1/presets/depreset_1");
      expect(captured[0]?.method).toBe("DELETE");
    } finally {
      restore();
    }
  });
});
