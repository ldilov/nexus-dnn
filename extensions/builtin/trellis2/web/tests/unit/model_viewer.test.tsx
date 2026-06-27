import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { ModelViewer } from "../../src/components/media/model_viewer";

/** Register a no-op `model-viewer` element so the component renders in the
 * "ready" path without pulling in `@google/model-viewer` (three.js + WebGL),
 * which jsdom cannot run. */
beforeAll(() => {
  if (!customElements.get("model-viewer")) {
    customElements.define("model-viewer", class extends HTMLElement {});
  }
});

function fireMeshLoaded(): void {
  const node = document.querySelector("model-viewer");
  expect(node).not.toBeNull();
  act(() => {
    node?.dispatchEvent(new Event("load"));
  });
}

describe("ModelViewer", () => {
  test("renders the viewer with neutral IBL and PBR-friendly defaults", () => {
    render(<ModelViewer url="/media/mesh.glb" alt="mesh" />);
    const node = document.querySelector("model-viewer");
    expect(node).not.toBeNull();
    expect(node?.getAttribute("src")).toBe("/media/mesh.glb");
    expect(node?.getAttribute("environment-image")).toBe("neutral");
    expect(node?.getAttribute("tone-mapping")).toBe("neutral");
    expect(node?.getAttribute("exposure")).toBe("1.00");
    expect(node?.hasAttribute("camera-controls")).toBe(true);
    expect(node?.hasAttribute("auto-rotate")).toBe(true);
    expect(node?.getAttribute("shadow-intensity")).toBe("1");
  });

  test("hides controls until the mesh loads, then shows them", () => {
    render(<ModelViewer url="/media/mesh.glb" alt="mesh" />);
    expect(screen.queryByLabelText("Exposure")).toBeNull();
    expect(screen.getByText("Loading mesh…")).toBeTruthy();

    fireMeshLoaded();

    expect(screen.getByLabelText("Exposure")).toBeTruthy();
    expect(screen.queryByText("Loading mesh…")).toBeNull();
  });

  test("exposure slider updates the model-viewer exposure attribute", () => {
    render(<ModelViewer url="/media/mesh.glb" alt="mesh" />);
    fireMeshLoaded();

    const slider = screen.getByLabelText("Exposure") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "1.5" } });

    const node = document.querySelector("model-viewer");
    expect(node?.getAttribute("exposure")).toBe("1.50");
  });

  test("tone-mapping toggle switches the operator", () => {
    render(<ModelViewer url="/media/mesh.glb" alt="mesh" />);
    fireMeshLoaded();

    const aces = screen.getByRole("button", { name: "ACES" });
    expect(aces.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(aces);

    expect(aces.getAttribute("aria-pressed")).toBe("true");
    const node = document.querySelector("model-viewer");
    expect(node?.getAttribute("tone-mapping")).toBe("aces");
  });
});
