import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { FilterBar } from "../FilterBar";
import {
  DEFAULT_SEARCH_PARAMS,
  type ParsedSearchParams,
} from "../../../../services/model_store";

afterEach(() => cleanup());
const noop = vi.fn();

function renderBar(params: Partial<ParsedSearchParams> = {}) {
  const merged = { ...DEFAULT_SEARCH_PARAMS, ...params };
  return render(
    <FilterBar
      query=""
      params={merged}
      onQueryChange={noop}
      onSourceChange={noop}
      onCycleInstalled={noop}
      onClearAll={noop}
      onResolveUrl={noop}
      resolving={false}
      degraded={false}
    />,
  );
}

describe("FilterBar (slim)", () => {
  it("renders the source selector and no format/modality chips", () => {
    renderBar();
    expect(screen.getByLabelText(/source/i)).toBeInTheDocument();
    expect(screen.queryByText(/safetensors/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Modality")).not.toBeInTheDocument();
  });
  it("shows the URL paste field in from_url mode", () => {
    renderBar({ source: "from_url" });
    expect(screen.getByPlaceholderText(/paste/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resolve/i })).toBeInTheDocument();
  });
});
