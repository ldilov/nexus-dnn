import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactElement, useEffect } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface StartBody {
  image: string;
  params: Record<string, unknown>;
}

const { startGenerate, cancelGenerate, subscribeGenerateStream } = vi.hoisted(() => ({
  startGenerate: vi.fn(async (_body: StartBody) => ({ jobId: "job-test" })),
  cancelGenerate: vi.fn(async () => ({ status: "cancelled" as const })),
  subscribeGenerateStream: vi.fn(() => () => undefined),
}));

vi.mock("../../src/services/generate_client", () => ({
  startGenerate,
  cancelGenerate,
  subscribeGenerateStream,
}));

vi.mock("../../src/services/history_client", () => ({
  getGenerationJob: vi.fn(async () => {
    throw new Error("no job");
  }),
}));

import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import {
  GenerateRequestProvider,
  useGenerateRequest,
} from "../../src/store/generate_request_store";
import { GenerateForm } from "../../src/views/generate/components/generate_form";

function SeedImage({ ref, name }: { ref: string; name: string }): null {
  const { setImage } = useGenerateRequest();
  useEffect(() => {
    setImage(ref, name);
  }, [setImage, ref, name]);
  return null;
}

function StartButton(): ReactElement {
  const { startJob } = useGenerateRequest();
  return (
    <button type="button" onClick={() => void startJob()}>
      run
    </button>
  );
}

function firstCall(): [StartBody] {
  const call = startGenerate.mock.calls[0];
  if (!call) throw new Error("startGenerate was not called");
  return call;
}

function renderForm(withImage = false): void {
  render(
    <GenerateRequestProvider>
      {withImage ? <SeedImage ref="img-ref-1" name="cube.png" /> : null}
      <GenerateForm />
      <StartButton />
    </GenerateRequestProvider>,
  );
}

describe("GenerateForm", () => {
  beforeEach(() => {
    startGenerate.mockClear();
    sessionStorage.clear();
  });
  afterEach(() => {
    sessionStorage.clear();
  });

  test("renders primary controls and hides advanced fields by default", () => {
    renderForm();
    expect(screen.getByText("Seed")).toBeTruthy();
    expect(screen.getByText("Sparse steps")).toBeTruthy();
    expect(screen.queryByText("Detail preset")).toBeNull();
    expect(screen.queryByText("Metallic")).toBeNull();
  });

  test("expands the Advanced / Quality section to reveal the new controls", () => {
    renderForm();
    const header = screen.getByRole("button", { name: /Advanced \/ Quality/ });
    expect(header.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(header);

    expect(header.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Detail preset")).toBeTruthy();
    expect(screen.getByText("Texture steps")).toBeTruthy();
    expect(screen.getByText("Texture resolution")).toBeTruthy();
    expect(screen.getByText("Metallic")).toBeTruthy();
    expect(screen.getByText("Max tokens")).toBeTruthy();
  });

  test("sends the full default param set when nothing is changed", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [body] = firstCall();
    expect(body.image).toBe("img-ref-1");
    expect(body.params).toEqual(DEFAULT_PARAMS);
  });

  test("changed advanced fields flow into the payload with correct types", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: /Advanced \/ Quality/ }));

    const pipeline = screen.getByLabelText("Detail preset") as HTMLSelectElement;
    fireEvent.change(pipeline, { target: { value: "1536_cascade" } });

    const textureSize = screen.getByLabelText("Texture resolution") as HTMLSelectElement;
    fireEvent.change(textureSize, { target: { value: "4096" } });

    const metallic = screen.getByLabelText("Metallic") as HTMLInputElement;
    fireEvent.change(metallic, { target: { value: "0.5" } });

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.pipeline_type).toBe("1536_cascade");
    expect(params.texture_size).toBe(4096);
    expect(params.metallic).toBe(0.5);
  });

  test("applies a quality preset to the whole param set", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: /Fast/ }));

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.pipeline_type).toBe("512");
    expect(params.shape_steps).toBe(8);
    expect(params.texture_size).toBe(1024);
    expect(params.simplify_target).toBe(100_000);
  });

  test("gates Max tokens behind the 1536 cascade", () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /Advanced \/ Quality/ }));

    const maxTokens = screen.getByLabelText("Max tokens") as HTMLInputElement;
    expect(maxTokens.disabled).toBe(true);

    const pipeline = screen.getByLabelText("Detail preset") as HTMLSelectElement;
    fireEvent.change(pipeline, { target: { value: "1536_cascade" } });
    expect(maxTokens.disabled).toBe(false);
  });
});
