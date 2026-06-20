import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { FilterBar } from "../FilterBar";
import {
  DEFAULT_SEARCH_PARAMS,
  type ParsedSearchParams,
} from "../../../../services/model_store";

afterEach(() => cleanup());
const noop = vi.fn();

function renderBar(
  params: Partial<ParsedSearchParams> = {},
  overrides: { onSourceChange?: (source: ParsedSearchParams["source"]) => void } = {},
) {
  const merged = { ...DEFAULT_SEARCH_PARAMS, ...params };
  return render(
    <FilterBar
      query=""
      params={merged}
      onQueryChange={noop}
      onSourceChange={overrides.onSourceChange ?? noop}
      onCycleInstalled={noop}
      onClearAll={noop}
      onResolveUrl={noop}
      onUpload={noop}
      resolving={false}
      uploading={false}
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
  it("emits onUpload with the selected file in from_url mode", () => {
    const onUpload = vi.fn();
    render(
      <FilterBar
        query=""
        params={{ ...DEFAULT_SEARCH_PARAMS, source: "from_url" }}
        onQueryChange={noop}
        onSourceChange={noop}
        onCycleInstalled={noop}
        onClearAll={noop}
        onResolveUrl={noop}
        onUpload={onUpload}
        resolving={false}
        uploading={false}
        degraded={false}
      />,
    );
    expect(screen.getByText(/upload file/i)).toBeInTheDocument();
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["weights"], "m.safetensors");
    fireEvent.change(input, { target: { files: [file] } });
    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload.mock.calls[0]?.[0]?.name).toBe("m.safetensors");
  });
  it("clears the URL field and emits onSourceChange when switching mode", () => {
    const onSourceChange = vi.fn();
    renderBar({ source: "from_url" }, { onSourceChange });
    const input = screen.getByPlaceholderText(/paste/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://example.test/m.gguf" } });
    expect(input.value).toBe("https://example.test/m.gguf");
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { value: "huggingface" },
    });
    expect(onSourceChange).toHaveBeenCalledWith("huggingface");
  });
});
