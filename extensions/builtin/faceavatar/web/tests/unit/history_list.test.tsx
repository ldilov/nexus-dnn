import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HistoryList } from "../../src/views/generate/components/history_list";
import type { GenerationJob } from "../../src/services/types";

function job(overrides: Partial<GenerationJob>): GenerationJob {
  return {
    id: "job-1",
    inputImageRef: "img-1",
    params: { seed: 3, sparse_steps: 12, texture: false },
    status: "succeeded",
    glbRef: "glb-1",
    metadata: { mesh: { vertices: 500, faces: 1000 } },
    errorCode: null,
    errorMessage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("HistoryList", () => {
  test("renders an empty state with no jobs", () => {
    render(<HistoryList jobs={[]} onOpen={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("No meshes yet")).toBeTruthy();
  });

  test("exposes a working GLB download link for finished jobs", () => {
    render(<HistoryList jobs={[job({})]} onOpen={vi.fn()} onDelete={vi.fn()} />);
    const link = screen.getByLabelText("Download GLB for job-1") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe(
      "/api/v1/extensions/nexus.3d.faceavatar/media/glb-1",
    );
    expect(link.getAttribute("download")).toBe("glb-1.glb");
  });

  test("disables the download link when no GLB ref exists", () => {
    render(
      <HistoryList
        jobs={[job({ glbRef: null, status: "failed" })]}
        onOpen={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    const link = screen.getByLabelText("Download GLB for job-1");
    expect(link.getAttribute("aria-disabled")).toBe("true");
  });
});
