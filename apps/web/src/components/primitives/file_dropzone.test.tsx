import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileDropzone } from "./file_dropzone";

function makeFile(name: string, type: string, size = 10): File {
  const file = new File(["x".repeat(size)], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("FileDropzone", () => {
  it("renders an accessible button with the default label", () => {
    render(<FileDropzone onFiles={vi.fn()} />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    expect(zone).toBeInTheDocument();
    expect(screen.getByText(/drop a file or click to browse/i)).toBeInTheDocument();
  });

  it("renders a custom label and hint", () => {
    render(<FileDropzone onFiles={vi.fn()} label="Drop anchor image" hint="PNG, /16 dims" />);
    expect(screen.getByText("Drop anchor image")).toBeInTheDocument();
    expect(screen.getByText("PNG, /16 dims")).toBeInTheDocument();
  });

  it("calls onFiles when a dropped file matches accept", () => {
    const onFiles = vi.fn();
    render(<FileDropzone onFiles={onFiles} accept="image/*" />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    const file = makeFile("anchor.png", "image/png");
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it("rejects a file with a disallowed type and shows an error", () => {
    const onFiles = vi.fn();
    render(<FileDropzone onFiles={onFiles} accept="image/*" />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    const file = makeFile("doc.pdf", "application/pdf");
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/not an accepted file type/i);
  });

  it("rejects a file that exceeds maxSizeBytes", () => {
    const onFiles = vi.fn();
    render(<FileDropzone onFiles={onFiles} maxSizeBytes={5} />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    const file = makeFile("big.bin", "application/octet-stream", 100);
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/exceeds the maximum size/i);
  });

  it("keeps only one file when multiple is false", () => {
    const onFiles = vi.fn();
    render(<FileDropzone onFiles={onFiles} />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    const a = makeFile("a.png", "image/png");
    const b = makeFile("b.png", "image/png");
    fireEvent.drop(zone, { dataTransfer: { files: [a, b] } });
    expect(onFiles).toHaveBeenCalledWith([a]);
  });

  it("does not respond to drops when disabled", () => {
    const onFiles = vi.fn();
    render(<FileDropzone onFiles={onFiles} disabled />);
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    fireEvent.drop(zone, { dataTransfer: { files: [makeFile("a.png", "image/png")] } });
    expect(onFiles).not.toHaveBeenCalled();
  });

  it("renders a preview via the render-prop after files are accepted", () => {
    render(
      <FileDropzone
        onFiles={vi.fn()}
        renderPreview={(files) => <span>preview:{files[0]?.name}</span>}
      />,
    );
    const zone = screen.getByRole("button", { name: /file dropzone/i });
    fireEvent.drop(zone, { dataTransfer: { files: [makeFile("a.png", "image/png")] } });
    expect(screen.getByText("preview:a.png")).toBeInTheDocument();
  });
});
