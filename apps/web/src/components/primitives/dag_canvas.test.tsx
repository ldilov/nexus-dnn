import { describe, it, expect, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import type { Edge, Node } from "@xyflow/react";
import { DagCanvas } from "./dag_canvas";

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const nodes: Node[] = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "A" } },
  { id: "b", position: { x: 160, y: 0 }, data: { label: "B" } },
];
const edges: Edge[] = [{ id: "a-b", source: "a", target: "b" }];

describe("DagCanvas", () => {
  it("mounts with the provided aria label", () => {
    render(<DagCanvas nodes={nodes} edges={edges} ariaLabel="render pipeline" />);
    expect(screen.getByLabelText("render pipeline")).toBeInTheDocument();
  });

  it("renders the supplied node labels", () => {
    render(<DagCanvas nodes={nodes} edges={edges} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("falls back to a default aria label", () => {
    render(<DagCanvas nodes={[]} edges={[]} />);
    expect(screen.getByLabelText("node graph")).toBeInTheDocument();
  });
});
