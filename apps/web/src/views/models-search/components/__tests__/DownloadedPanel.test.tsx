import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  DownloadedPanel,
  type DownloadedArtifact,
} from "../DownloadedPanel";

afterEach(() => cleanup());

function makeArtifact(
  overrides: Partial<DownloadedArtifact> = {},
): DownloadedArtifact {
  return {
    artifact_id: "art-1",
    family_id: "fam-1",
    variant_id: null,
    format: "gguf",
    role: "primary",
    filename: "model.gguf",
    size_bytes: 1024 * 1024 * 1024,
    source_repo: "acme/tiny",
    source_revision: null,
    installed_at: "2026-06-21T00:00:00Z",
    install_path: "/sink/job-1/model.gguf",
    ...overrides,
  };
}

const baseProps = {
  loading: false,
  error: null,
  truncated: false,
  deletingId: null,
  onDelete: vi.fn(),
  onRetry: vi.fn(),
};

describe("DownloadedPanel — render", () => {
  it("lists each installed artifact with filename, size, source, and path", () => {
    render(
      <DownloadedPanel
        {...baseProps}
        artifacts={[
          makeArtifact(),
          makeArtifact({
            artifact_id: "art-2",
            filename: "weights.safetensors",
            source_repo: "",
            size_bytes: 1024 * 1024 * 512,
            install_path: "/sink/job-2/weights.safetensors",
          }),
        ]}
      />,
    );
    const list = screen.getByRole("list");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(screen.getByText("model.gguf")).toBeInTheDocument();
    expect(screen.getByText("acme/tiny")).toBeInTheDocument();
    expect(screen.getByText("/sink/job-1/model.gguf")).toBeInTheDocument();
    // Empty source_repo falls back to a generic local-upload label.
    expect(screen.getByText("local upload")).toBeInTheDocument();
    expect(screen.getByText("2 files")).toBeInTheDocument();
    // Reuses DownloadedChip: one "Downloaded" pill per row, size in the label.
    const chips = screen.getAllByRole("status", { name: /downloaded/i });
    expect(chips).toHaveLength(2);
    expect(screen.getByText(/1\.0 GB/)).toBeInTheDocument();
    expect(screen.getByText(/512 MB/)).toBeInTheDocument();
  });

  it("exposes list semantics and labelled per-row delete buttons", () => {
    render(
      <DownloadedPanel {...baseProps} artifacts={[makeArtifact()]} />,
    );
    expect(
      screen.getByRole("region", { name: /downloaded models/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete model\.gguf/i }),
    ).toBeInTheDocument();
  });
});

describe("DownloadedPanel — delete", () => {
  it("invokes onDelete with the artifact id and filename", () => {
    const onDelete = vi.fn();
    render(
      <DownloadedPanel
        {...baseProps}
        onDelete={onDelete}
        artifacts={[makeArtifact()]}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /delete model\.gguf/i }),
    );
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith("art-1", "model.gguf");
  });

  it("disables and relabels the row being deleted", () => {
    render(
      <DownloadedPanel
        {...baseProps}
        deletingId="art-1"
        artifacts={[makeArtifact()]}
      />,
    );
    const button = screen.getByRole("button", { name: /delete model\.gguf/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/deleting/i);
  });
});

describe("DownloadedPanel — empty / loading / error", () => {
  it("renders a clean empty state when nothing is installed", () => {
    render(<DownloadedPanel {...baseProps} artifacts={[]} />);
    expect(screen.getByText(/no models downloaded yet/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("shows a loading skeleton on the first load", () => {
    render(<DownloadedPanel {...baseProps} loading artifacts={null} />);
    expect(
      screen.getByLabelText(/loading downloaded models/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders an error alert with a retry control", () => {
    const onRetry = vi.fn();
    render(
      <DownloadedPanel
        {...baseProps}
        artifacts={null}
        error={{ message: "model store unavailable" }}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "model store unavailable",
    );
    fireEvent.click(
      screen.getByRole("button", { name: /retry loading downloaded models/i }),
    );
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("surfaces a truncation hint when the host caps the listing", () => {
    render(
      <DownloadedPanel {...baseProps} truncated artifacts={[makeArtifact()]} />,
    );
    expect(screen.getByText(/some older files are not listed/i)).toBeInTheDocument();
  });
});
