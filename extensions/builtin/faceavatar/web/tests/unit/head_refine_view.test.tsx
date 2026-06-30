import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { type ReactElement, useEffect } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { GenerationJob } from "../../src/services/types";

// Register a no-op `model-viewer` element so the before/after panes render in
// the "ready" path without pulling in @google/model-viewer (three.js + WebGL).
if (typeof customElements !== "undefined" && !customElements.get("model-viewer")) {
  customElements.define("model-viewer", class extends HTMLElement {});
}

interface GraftBody {
  base_mesh: string;
  image: string;
  params: Record<string, unknown>;
}

const { startGraft } = vi.hoisted(() => ({
  startGraft: vi.fn(async (_b: GraftBody) => ({ jobId: "graft-test" })),
}));
vi.mock("../../src/services/graft_client", () => ({ startGraft }));
vi.mock("../../src/services/generate_client", () => ({
  startGenerate: vi.fn(async () => ({ jobId: "g" })),
  cancelGenerate: vi.fn(async () => ({ status: "cancelled" as const })),
  subscribeGenerateStream: vi.fn(() => () => undefined),
}));

const sampleMesh: GenerationJob = {
  id: "head-0001",
  kind: "generate",
  inputImageRef: "photo-a",
  baseMeshRef: null,
  params: { seed: 0 },
  status: "succeeded",
  glbRef: "glb-head-0001",
  metadata: { mesh: { vertices: 10_000, faces: 20_000 } },
  errorCode: null,
  errorMessage: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
vi.mock("../../src/services/history_client", () => ({
  listGenerationJobs: vi.fn(async () => ({ jobs: [sampleMesh] })),
  getGenerationJob: vi.fn(async () => {
    throw new Error("no job");
  }),
  deleteGenerationJob: vi.fn(async () => undefined),
}));
vi.mock("../../src/services/upload_client", () => ({
  uploadImage: vi.fn(async () => ({ ref: "photo-up" })),
}));

import {
  GenerateRequestProvider,
  useGenerateRequest,
} from "../../src/store/generate_request_store";
import { HeadRefineView } from "../../src/views/head-refine/head_refine.view";

function SeedPhoto(): null {
  const { setImage } = useGenerateRequest();
  useEffect(() => setImage("photo-up", "face.png"), [setImage]);
  return null;
}

function renderView(withPhoto: boolean): void {
  const router = createMemoryRouter(
    [
      {
        path: "/:deploymentId/head-refine",
        element: (
          <GenerateRequestProvider>
            {withPhoto ? <SeedPhoto /> : null}
            <HeadRefineView />
          </GenerateRequestProvider>
        ) as ReactElement,
      },
    ],
    { initialEntries: ["/preview/head-refine"] },
  );
  render(<RouterProvider router={router} />);
}

describe("HeadRefineView", () => {
  beforeEach(() => {
    startGraft.mockClear();
    sessionStorage.clear();
  });
  afterEach(() => sessionStorage.clear());

  test("lists a recent succeeded head in the base-mesh dropdown", async () => {
    renderView(false);
    await waitFor(() => expect(screen.getByRole("option", { name: /head-0001/ })).toBeTruthy());
  });

  test("blocks Refine head until base mesh + photo are set", () => {
    renderView(false);
    const btn = screen.getByRole("button", { name: "Refine head" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  test("submits the graft with assembled params once base + photo are present", async () => {
    renderView(true);
    // pick the base mesh
    const select = screen.getByLabelText("Base mesh") as HTMLSelectElement;
    await waitFor(() => expect(select.querySelectorAll("option").length).toBeGreaterThan(2));
    fireEvent.change(select, { target: { value: "glb-head-0001" } });
    // flip a knob
    const seam = screen.getByLabelText("Seam") as HTMLSelectElement;
    fireEvent.change(seam, { target: { value: "hairline" } });

    const btn = screen.getByRole("button", { name: "Refine head" });
    await waitFor(() => expect((btn as HTMLButtonElement).disabled).toBe(false));
    fireEvent.click(btn);

    await waitFor(() => expect(startGraft).toHaveBeenCalledTimes(1));
    const [body] = startGraft.mock.calls[0] ?? [];
    expect(body?.base_mesh).toBe("glb-head-0001");
    expect(body?.image).toBe("photo-up");
    expect(body?.params.seam).toBe("hairline");
    expect(body?.params.keep_hair).toBe(true);
  });
});
