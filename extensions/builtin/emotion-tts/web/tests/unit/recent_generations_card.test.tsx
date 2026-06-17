import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

vi.mock("../../src/services/voice_assets_client", () => ({
  listVoiceAssets: () => Promise.resolve({ voiceAssets: [] }),
}));

import { RecentGenerationsCard } from "../../src/views/recipe/components/recent_generations_card";

interface FetchCall {
  url: string;
  method: string;
}

const calls: FetchCall[] = [];

const ARTIFACT = {
  utteranceId: "utt_1",
  runId: "run_1",
  globalIndex: 1,
  characterDisplay: "Aether",
  text: "Hello world",
  outputFormat: "wav",
  durationMs: 1200,
  finishedAt: 1_700_000_000,
  filename: "aether_001.wav",
  edited: false,
  voiceAssetId: null,
};

function artifactsResponse(): Response {
  return {
    ok: true,
    status: 200,
    json: async () => ({ artifacts: [ARTIFACT], total: 1 }),
  } as Response;
}

let downloadResponse: Response = { ok: true, status: 200 } as Response;
let deleteResponse: Response = { ok: true, status: 204 } as Response;

function installFetch(): void {
  calls.length = 0;
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method ?? "GET").toUpperCase();
    calls.push({ url, method });
    if (method === "DELETE") return deleteResponse;
    if (url.includes("/download")) {
      return { ...downloadResponse, blob: async () => new Blob(["x"], { type: "audio/wav" }) } as Response;
    }
    return artifactsResponse();
  }) as unknown as typeof fetch;
}

const realCreate = URL.createObjectURL;
const realRevoke = URL.revokeObjectURL;
const realConfirm = globalThis.confirm;
let clickSpy: ReturnType<typeof vi.spyOn>;
let createObjectUrlSpy: ReturnType<typeof vi.fn>;
let revokeObjectUrlSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  installFetch();
  downloadResponse = { ok: true, status: 200 } as Response;
  deleteResponse = { ok: true, status: 204 } as Response;
  createObjectUrlSpy = vi.fn(() => "blob:mock-url");
  revokeObjectUrlSpy = vi.fn();
  URL.createObjectURL = createObjectUrlSpy as unknown as typeof URL.createObjectURL;
  URL.revokeObjectURL = revokeObjectUrlSpy as unknown as typeof URL.revokeObjectURL;
  clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  clickSpy.mockRestore();
  URL.createObjectURL = realCreate;
  URL.revokeObjectURL = realRevoke;
  globalThis.confirm = realConfirm;
  vi.clearAllMocks();
});

async function renderCard(): Promise<void> {
  render(<RecentGenerationsCard deploymentId="dep_x" />);
  await screen.findByText("Hello world");
}

describe("RecentGenerationsCard download (FIX-6)", () => {
  it("downloads via fetch→blob→objectURL→programmatic click on the Download control", async () => {
    await renderCard();

    const download = screen.getByRole("button", { name: /Download aether_001\.wav/ });
    await act(async () => {
      download.click();
    });

    await waitFor(() => {
      expect(
        calls.some(
          (c) =>
            c.method === "GET" &&
            c.url.includes("/deployments/dep_x/artifacts/utt_1/download"),
        ),
      ).toBe(true);
    });
    expect(createObjectUrlSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    await waitFor(() => expect(revokeObjectUrlSpy).toHaveBeenCalledWith("blob:mock-url"));
  });

  it("surfaces an error when the download request fails", async () => {
    await renderCard();
    downloadResponse = { ok: false, status: 500 } as Response;

    const download = screen.getByRole("button", { name: /Download aether_001\.wav/ });
    await act(async () => {
      download.click();
    });

    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});

describe("RecentGenerationsCard clear list (FIX-5)", () => {
  it("DELETEs the shown utterance ids then refetches after confirm", async () => {
    globalThis.confirm = vi.fn(() => true);
    await renderCard();

    const clear = screen.getByRole("button", { name: /Clear/ });
    await act(async () => {
      clear.click();
    });

    await waitFor(() => {
      expect(
        calls.some(
          (c) =>
            c.method === "DELETE" &&
            c.url.includes("/deployments/dep_x/artifacts") &&
            c.url.includes("utteranceIds=utt_1"),
        ),
      ).toBe(true);
    });
    const getCount = calls.filter((c) => c.method === "GET" && c.url.includes("artifacts?limit")).length;
    expect(getCount).toBeGreaterThanOrEqual(2);
  });

  it("does nothing when the confirm is declined", async () => {
    globalThis.confirm = vi.fn(() => false);
    await renderCard();

    const clear = screen.getByRole("button", { name: /Clear/ });
    await act(async () => {
      clear.click();
    });

    expect(calls.some((c) => c.method === "DELETE")).toBe(false);
  });
});
