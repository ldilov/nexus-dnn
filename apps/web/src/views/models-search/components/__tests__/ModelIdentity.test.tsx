import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ModelIdentity } from "../ModelIdentity";

afterEach(() => cleanup());

describe("ModelIdentity — spec 054 G7.3 legibility", () => {
  it("renders family, on-disk path, and job id when all are present", () => {
    render(
      <ModelIdentity
        familyId="acme/tiny-gpt2"
        onDiskPath="/home/u/.nexus/host-models/blobs/model-store-downloads/abcd-1234/model.gguf"
        jobId="abcd-1234"
      />,
    );
    expect(
      screen.getByRole("group", { name: /on-disk model identity/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("acme/tiny-gpt2")).toBeInTheDocument();
    expect(screen.getByText(/abcd-1234\/model\.gguf/)).toBeInTheDocument();
    expect(screen.getByText("abcd-1234")).toBeInTheDocument();
  });

  it("renders nothing when no identity field is present (legacy row)", () => {
    const { container } = render(<ModelIdentity />);
    expect(container).toBeEmptyDOMElement();
  });

  it("hides absent fields gracefully and shows only what is known", () => {
    render(<ModelIdentity familyId="acme/tiny-gpt2" />);
    expect(screen.getByText("Family")).toBeInTheDocument();
    expect(screen.getByText("acme/tiny-gpt2")).toBeInTheDocument();
    expect(screen.queryByText("Path")).not.toBeInTheDocument();
    expect(screen.queryByText("Job")).not.toBeInTheDocument();
  });
});
