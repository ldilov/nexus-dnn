import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { EXTENSION_PREFIX } from "../../src/services/http";
import type { PresetSummary } from "../../src/services/types";

const toastWarning = vi.fn();
const getRenderJob = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    warning: (...args: unknown[]) => toastWarning(...args),
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../../src/services/history_client", () => ({
  getRenderJob: (...args: unknown[]) => getRenderJob(...args),
}));

vi.mock("../../src/services/render_client", () => ({
  subscribeRenderStream: vi.fn().mockReturnValue(vi.fn()),
  startRender: vi.fn().mockResolvedValue({ jobId: "j" }),
  cancelRender: vi.fn(),
}));

import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";
import { AnchorInputs } from "../../src/views/recipe/components/anchor_inputs";

const canonical: PresetSummary = {
  id: "svi-canonical",
  label: "Canonical",
  description: "x",
  params: {},
};

let captured: ReturnType<typeof useRenderRequest> | null = null;
function Probe(): null {
  captured = useRenderRequest();
  return null;
}

// Seed a restored ref path through the store (no local File), mirroring a
// historical run where the anchor must display from a server media path.
function harness(refPath: string | null = "/ws/uploads/anchor.png") {
  const result = render(
    <RenderRequestProvider initialPreset={canonical}>
      <Probe />
      <AnchorInputs refImageRequired lastImageRequired={false} />
    </RenderRequestProvider>,
  );
  if (refPath !== null) {
    act(() => captured?.setRefImage("anchor.png", refPath));
  }
  return result;
}

beforeEach(() => {
  sessionStorage.clear();
  toastWarning.mockReset();
  getRenderJob.mockReset();
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
});

afterEach(() => {
  captured = null;
  cleanup();
});

describe("AnchorInputs remote preview", () => {
  test("renders a remote preview img from params.ref_image_path with no File", () => {
    harness();
    const img = screen.getByAltText("reference preview") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe(
      `${EXTENSION_PREFIX}/media?path=${encodeURIComponent("/ws/uploads/anchor.png")}`,
    );
    expect(screen.getByText(/Restored from a past run/)).toBeDefined();
  });

  test("onError on the remote preview clears the ref path and warns", () => {
    harness();
    const img = screen.getByAltText("reference preview");
    act(() => {
      fireEvent.error(img);
    });
    expect(toastWarning).toHaveBeenCalledTimes(1);
    expect(captured?.params.ref_image_path).toBe("");
    expect(captured?.refImageName).toBeNull();
  });

  test("no remote preview when there is no ref path", () => {
    harness(null);
    expect(screen.queryByAltText("reference preview")).toBeNull();
  });
});
