import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { PromptInput } from "../../src/views/recipe/components/prompt_input";
import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";

function ClipsControl(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  return (
    <input
      aria-label="clips"
      type="number"
      value={params.num_clips ?? 1}
      onChange={(e) => updateParam("num_clips", Number(e.target.value))}
    />
  );
}

function Harness(): ReactElement {
  return (
    <RenderRequestProvider>
      <ClipsControl />
      <PromptInput />
    </RenderRequestProvider>
  );
}

afterEach(cleanup);

function setClips(value: number): void {
  fireEvent.change(screen.getByLabelText("clips"), { target: { value: String(value) } });
}

describe("PromptInput per-clip persistence", () => {
  test("lowering then raising clips preserves prompt text", () => {
    render(<Harness />);
    setClips(3);
    fireEvent.click(screen.getByRole("switch", { name: "per-clip prompts" }));

    fireEvent.change(screen.getByLabelText("prompt for clip 1"), {
      target: { value: "first" },
    });
    fireEvent.change(screen.getByLabelText("prompt for clip 2"), {
      target: { value: "second" },
    });
    fireEvent.change(screen.getByLabelText("prompt for clip 3"), {
      target: { value: "third" },
    });

    setClips(1);
    expect(screen.queryByLabelText("prompt for clip 3")).toBeNull();

    setClips(3);
    expect((screen.getByLabelText("prompt for clip 3") as HTMLTextAreaElement).value).toBe("third");
  });

  test("surfaces a notice when filled prompts exceed the clip count", () => {
    render(<Harness />);
    setClips(2);
    fireEvent.click(screen.getByRole("switch", { name: "per-clip prompts" }));

    fireEvent.change(screen.getByLabelText("prompt for clip 1"), {
      target: { value: "a" },
    });
    fireEvent.change(screen.getByLabelText("prompt for clip 2"), {
      target: { value: "b" },
    });

    setClips(1);
    expect(screen.getByText(/kept but hidden/i)).toBeDefined();
  });
});
