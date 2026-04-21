import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { CodeBlock } from "./code_block";

afterEach(() => cleanup());

describe("CodeBlock syntax highlighting", () => {
  it("renders plain <pre><code> immediately before highlighting resolves", () => {
    const { container } = render(
      <CodeBlock code={'println!("hi");'} language="rust" />,
    );
    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toContain('println!("hi");');
  });

  it("renders the language label in the header", () => {
    render(<CodeBlock code="let x = 1;" language="rust" />);
    expect(screen.getByText("rust")).toBeInTheDocument();
  });

  it("applies shiki syntax highlighting after async load for supported language", async () => {
    const { container } = render(
      <CodeBlock code={'fn main() { println!("hi"); }'} language="rust" />,
    );
    await waitFor(
      () => {
        const shikiPre = container.querySelector("pre.shiki");
        expect(shikiPre).not.toBeNull();
      },
      { timeout: 5000 },
    );
    const shikiPre = container.querySelector("pre.shiki");
    expect(shikiPre?.querySelectorAll("span").length ?? 0).toBeGreaterThan(1);
  });

  it("does not attempt highlighting for unsupported languages", async () => {
    const { container } = render(
      <CodeBlock code="raw text" language="klingon" />,
    );
    await new Promise((r) => setTimeout(r, 200));
    expect(container.querySelector("pre.shiki")).toBeNull();
    expect(container.querySelector("pre")?.textContent).toContain("raw text");
  });

  it("does not attempt highlighting for 'plain' language", async () => {
    const { container } = render(
      <CodeBlock code="just text" language="plain" />,
    );
    await new Promise((r) => setTimeout(r, 200));
    expect(container.querySelector("pre.shiki")).toBeNull();
  });
});
