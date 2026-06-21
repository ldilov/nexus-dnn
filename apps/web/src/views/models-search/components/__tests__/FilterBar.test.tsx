import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { FilterBar } from "../FilterBar";
import {
  DEFAULT_SEARCH_PARAMS,
  type ActiveUpload,
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
      onCancelUpload={noop}
      resolving={false}
      uploads={{}}
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
        onCancelUpload={noop}
        resolving={false}
        uploads={{}}
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

function renderWithUploads(
  uploads: Record<string, ActiveUpload>,
  onCancelUpload = vi.fn(),
) {
  render(
    <FilterBar
      query=""
      params={{ ...DEFAULT_SEARCH_PARAMS, source: "from_url" }}
      onQueryChange={noop}
      onSourceChange={noop}
      onCycleInstalled={noop}
      onClearAll={noop}
      onResolveUrl={noop}
      onUpload={noop}
      onCancelUpload={onCancelUpload}
      resolving={false}
      uploads={uploads}
      degraded={false}
    />,
  );
  return { onCancelUpload };
}

describe("FilterBar uploads", () => {
  it("renders a determinate progress bar + percent for an in-flight upload", () => {
    renderWithUploads({
      u1: {
        id: "u1",
        filename: "weights.gguf",
        pct: 42,
        loaded: 42,
        total: 100,
        status: "uploading",
      },
    });
    expect(screen.getByText("weights.gguf")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(screen.getByText(/· 42%/)).toBeInTheDocument();
    expect(screen.getByText(/uploading…/i)).toBeInTheDocument();
  });

  it("renders an indeterminate bar (no fake percent) when total is unknown", () => {
    renderWithUploads({
      u1: {
        id: "u1",
        filename: "blob.bin",
        pct: null,
        loaded: 1024,
        total: null,
        status: "uploading",
      },
    });
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(screen.getByText(/uploaded/i)).toBeInTheDocument();
  });

  it("invokes onCancelUpload with the row id when Cancel is clicked", () => {
    const { onCancelUpload } = renderWithUploads({
      u1: {
        id: "u1",
        filename: "m.safetensors",
        pct: 10,
        loaded: 10,
        total: 100,
        status: "uploading",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: /cancel upload/i }));
    expect(onCancelUpload).toHaveBeenCalledWith("u1");
  });

  it("shows the error message and a Dismiss control for a failed upload", () => {
    const { onCancelUpload } = renderWithUploads({
      u1: {
        id: "u1",
        filename: "bad.gguf",
        pct: null,
        loaded: 0,
        total: null,
        status: "error",
        error: "upload timed out",
      },
    });
    expect(screen.getByText("upload timed out")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(onCancelUpload).toHaveBeenCalledWith("u1");
  });

  it("renders independent rows for concurrent uploads", () => {
    renderWithUploads({
      a: {
        id: "a",
        filename: "first.gguf",
        pct: 25,
        loaded: 25,
        total: 100,
        status: "uploading",
      },
      b: {
        id: "b",
        filename: "second.safetensors",
        pct: 80,
        loaded: 80,
        total: 100,
        status: "uploading",
      },
    });
    expect(screen.getByText("first.gguf")).toBeInTheDocument();
    expect(screen.getByText("second.safetensors")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
  });
});
