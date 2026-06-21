import { afterEach, describe, expect, it, vi } from "vitest";
import {
  importIntoDeployment,
  isExportEnvelope,
  type ExportEnvelope,
  type ImportResult,
} from "./deployment_transfer";

interface Captured {
  url: string;
  method: string;
  body: unknown;
}

function envelope(): ExportEnvelope {
  return {
    package_version: 1,
    deployment: { display_name: "x" },
    revisions: [{}],
    extension_settings: [],
    integrity: { hash_algo: "sha256-jcs-rfc8785", digest: "0".repeat(64) },
  };
}

function stubFetch(result: ImportResult): { captured: Captured[]; restore: () => void } {
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
    // apiFetch unwraps `data` from an envelope (presence of `meta` required).
    return new Response(JSON.stringify({ data: result, error: null, meta: {} }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  globalThis.fetch = stub as unknown as typeof fetch;
  return {
    captured,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

describe("importIntoDeployment", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("POSTs the envelope to /deployments/{id}/import and returns the ImportResult", async () => {
    const result: ImportResult = {
      deployment_id: "dep-7",
      state: "saved",
      diagnostics_count: 0,
    };
    const { captured, restore } = stubFetch(result);
    try {
      const env = envelope();
      const got = await importIntoDeployment("dep-7", env);

      expect(got).toEqual(result);
      expect(captured).toHaveLength(1);
      const [call] = captured;
      expect(call?.url).toBe("/api/v1/deployments/dep-7/import");
      expect(call?.method).toBe("POST");
      expect(call?.body).toEqual({ envelope: env });
    } finally {
      restore();
    }
  });

  it("url-encodes the deployment id", async () => {
    const { captured, restore } = stubFetch({
      deployment_id: "a/b",
      state: "stale",
      diagnostics_count: 2,
    });
    try {
      const got = await importIntoDeployment("a/b", envelope());
      expect(got.diagnostics_count).toBe(2);
      expect(captured[0]?.url).toBe("/api/v1/deployments/a%2Fb/import");
    } finally {
      restore();
    }
  });
});

describe("isExportEnvelope", () => {
  it("accepts a well-formed envelope and rejects junk", () => {
    expect(isExportEnvelope(envelope())).toBe(true);
    expect(isExportEnvelope(null)).toBe(false);
    expect(isExportEnvelope({ package_version: 1 })).toBe(false);
    expect(isExportEnvelope({ what: "ever" })).toBe(false);
  });
});
