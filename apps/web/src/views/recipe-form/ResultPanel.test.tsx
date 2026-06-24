import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultPanel } from "./ResultPanel";
import type { Output } from "../../api/generated/Output";

function makeOutput(overrides: Partial<Output> = {}): Output {
  return {
    primary_artifact: "result_video",
    secondary: [],
    preview_style: "player",
    show_intermediate: false,
    ...overrides,
  };
}

describe("ResultPanel", () => {
  it("renders primary artifact first", () => {
    render(
      <ResultPanel
        output={makeOutput({ primary_artifact: "main_output", secondary: ["thumbnail"] })}
        artifacts={{ main_output: "/api/v1/artifacts/1", thumbnail: "/api/v1/artifacts/2" }}
      />,
    );
    const items = screen.getAllByTestId("artifact-item");
    expect(items[0]!.getAttribute("data-artifact-key")).toBe("main_output");
    expect(items[1]!.getAttribute("data-artifact-key")).toBe("thumbnail");
  });

  it("renders secondary artifacts after primary", () => {
    render(
      <ResultPanel
        output={makeOutput({ secondary: ["sec_a", "sec_b"] })}
        artifacts={{ result_video: "/a", sec_a: "/b", sec_b: "/c" }}
      />,
    );
    const items = screen.getAllByTestId("artifact-item");
    expect(items).toHaveLength(3);
  });

  it("uses player renderer for preview_style=player", () => {
    render(
      <ResultPanel
        output={makeOutput({ preview_style: "player" })}
        artifacts={{ result_video: "/api/v1/artifacts/vid1" }}
      />,
    );
    const media = screen.getByTestId("artifact-player");
    expect(media).toBeInTheDocument();
  });

  it("uses img renderer for preview_style=image", () => {
    render(
      <ResultPanel
        output={makeOutput({ preview_style: "image" })}
        artifacts={{ result_video: "/api/v1/artifacts/img1" }}
      />,
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("uses text renderer for preview_style=text", () => {
    render(
      <ResultPanel
        output={makeOutput({ preview_style: "text" })}
        artifacts={{ result_video: "hello world" }}
      />,
    );
    expect(screen.getByTestId("text-output")).toBeInTheDocument();
  });

  it("falls back gracefully for unknown preview_style", () => {
    render(
      <ResultPanel
        output={makeOutput({ preview_style: "unknown_style" })}
        artifacts={{ result_video: "/api/v1/artifacts/x" }}
      />,
    );
    // Falls back to a generic link/download affordance
    expect(screen.getByTestId("artifact-fallback")).toBeInTheDocument();
  });

  it("hides intermediate node outputs when show_intermediate is false", () => {
    render(
      <ResultPanel
        output={makeOutput({ show_intermediate: false })}
        artifacts={{ result_video: "/a" }}
        nodeOutputs={{ node_a: "intermediate_data" }}
      />,
    );
    expect(screen.queryByTestId("node-outputs")).toBeNull();
  });

  it("shows intermediate node outputs when show_intermediate is true", () => {
    render(
      <ResultPanel
        output={makeOutput({ show_intermediate: true })}
        artifacts={{ result_video: "/a" }}
        nodeOutputs={{ node_a: "intermediate_data" }}
      />,
    );
    expect(screen.getByTestId("node-outputs")).toBeInTheDocument();
  });

  it("renders empty state when artifacts object is empty", () => {
    render(
      <ResultPanel
        output={makeOutput()}
        artifacts={{}}
      />,
    );
    expect(screen.getByTestId("result-empty")).toBeInTheDocument();
  });
});
