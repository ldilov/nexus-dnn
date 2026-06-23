import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { SWRConfig } from "swr";
import { afterEach, describe, expect, test, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../../src/domain/settings_defaults";
import { saveSettings } from "../../src/services/settings_client";
import type { InstalledModelArtifact, InstalledModelsIndex } from "../../src/services/types";
import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";
import { BaseModelSelect } from "../../src/views/recipe/components/base_model_select";

vi.mock("../../src/services/model_store_client", () => ({
  listInstalledModels: vi.fn(),
}));

vi.mock("../../src/services/settings_client", () => ({
  saveSettings: vi.fn().mockResolvedValue(DEFAULT_SETTINGS),
}));

import { listInstalledModels } from "../../src/services/model_store_client";

function artifact(filename: string, installPath: string, familyId: string): InstalledModelArtifact {
  return {
    artifact_id: filename,
    family_id: familyId,
    variant_id: null,
    format: "safetensors",
    role: "dit",
    filename,
    size_bytes: 1,
    source_repo: "",
    install_path: installPath,
  };
}

const SMOOTH_PATH = "/models/smoothmix_v3.safetensors";
const HIGH_PATH = "/models/wan22_high_noise.safetensors";
const LOW_PATH = "/models/wan22_low_noise.safetensors";

const INSTALLED: InstalledModelsIndex = {
  family_ids: [],
  truncated: false,
  installed: [
    artifact("smoothmix_v3.safetensors", SMOOTH_PATH, "civitai:SmoothMix"),
    artifact("wan22_high_noise.safetensors", HIGH_PATH, "hf:Wan2.2"),
    artifact("wan22_low_noise.safetensors", LOW_PATH, "hf:Wan2.2"),
  ],
};

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function Harness({ settings }: { settings?: typeof DEFAULT_SETTINGS } = {}): ReactElement {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <RenderRequestProvider initialSettings={settings}>
        <Probe />
        <BaseModelSelect />
      </RenderRequestProvider>
    </SWRConfig>
  );
}

async function openHighPicker(): Promise<HTMLElement> {
  fireEvent.click(screen.getByLabelText(/high-noise expert/i));
  // Options appear once the popover is open AND the installed-models SWR resolves.
  await screen.findByRole("option", { name: /wan22_high_noise/i });
  return screen.getByRole("listbox");
}

async function openLowPicker(): Promise<HTMLElement> {
  fireEvent.click(screen.getByLabelText(/low-noise expert/i));
  await screen.findByRole("option", { name: /wan22_low_noise/i });
  return screen.getByRole("listbox");
}

afterEach(() => {
  captured = null;
  cleanup();
  vi.clearAllMocks();
});

describe("BaseModelSelect — searchable model file pickers", () => {
  test("defaults both expert pickers to the bundled model", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);

    const high = screen.getByLabelText(/high-noise expert/i);
    const low = screen.getByLabelText(/low-noise expert/i);
    await waitFor(() => expect(high.textContent).toMatch(/bundled wan2\.2/i));
    expect(low.textContent).toMatch(/bundled wan2\.2/i);
  });

  test("opening a picker lists the bundled option plus every installed file", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    const listbox = await openHighPicker();

    expect(within(listbox).getByRole("option", { name: /bundled wan2\.2/i })).toBeDefined();
    expect(within(listbox).getByRole("option", { name: /smoothmix_v3/i })).toBeDefined();
    expect(within(listbox).getByRole("option", { name: /wan22_high_noise/i })).toBeDefined();
    expect(within(listbox).getByRole("option", { name: /wan22_low_noise/i })).toBeDefined();
  });

  test("typing in the search box filters the option list", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    const listbox = await openHighPicker();

    const search = screen.getByRole("combobox");
    fireEvent.change(search, { target: { value: "smooth" } });

    expect(within(listbox).getByRole("option", { name: /smoothmix_v3/i })).toBeDefined();
    expect(within(listbox).queryByRole("option", { name: /wan22_high_noise/i })).toBeNull();
    expect(within(listbox).queryByRole("option", { name: /bundled wan2\.2/i })).toBeNull();
  });

  test("a no-match query shows the empty state", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    const listbox = await openHighPicker();

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "zzz-nope" } });
    expect(within(listbox).queryAllByRole("option")).toHaveLength(0);
    expect(within(listbox).getByText(/no matches/i)).toBeDefined();
  });

  test("clicking a file sets dit_high_path and persists it", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    const listbox = await openHighPicker();

    fireEvent.click(within(listbox).getByRole("option", { name: /smoothmix_v3/i }));

    await waitFor(() => expect(captured?.params.dit_high_path).toBe(SMOOTH_PATH));
    expect(saveSettings).toHaveBeenCalledWith(
      expect.objectContaining({ ditHighPath: SMOOTH_PATH }),
    );
    // Picker closed: the trigger now reflects the chosen file.
    expect(screen.getByLabelText(/high-noise expert/i).textContent).toMatch(/smoothmix_v3/i);
  });

  test("keyboard: arrow-down then Enter selects the first installed file", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    await openHighPicker();

    const search = screen.getByRole("combobox");
    fireEvent.keyDown(search, { key: "ArrowDown" });
    fireEvent.keyDown(search, { key: "Enter" });

    // Options are sorted alphabetically; bundled is index 0, so the first
    // installed file is smoothmix_v3.
    await waitFor(() => expect(captured?.params.dit_high_path).toBe(SMOOTH_PATH));
  });

  test("selecting the bundled option clears the chosen path", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    let listbox = await openHighPicker();
    fireEvent.click(within(listbox).getByRole("option", { name: /smoothmix_v3/i }));
    await waitFor(() => expect(captured?.params.dit_high_path).toBe(SMOOTH_PATH));

    fireEvent.click(screen.getByLabelText(/high-noise expert/i));
    listbox = await screen.findByRole("listbox");
    fireEvent.click(within(listbox).getByRole("option", { name: /bundled wan2\.2/i }));

    await waitFor(() => expect(captured?.params.dit_high_path).toBeUndefined());
    expect(saveSettings).toHaveBeenCalledWith(expect.objectContaining({ ditHighPath: "" }));
  });

  test("the low picker sets dit_low_path and leaves dit_high_path untouched", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    const listbox = await openLowPicker();
    fireEvent.click(within(listbox).getByRole("option", { name: /wan22_low_noise/i }));

    await waitFor(() => expect(captured?.params.dit_low_path).toBe(LOW_PATH));
    expect(captured?.params.dit_high_path).toBeUndefined();
  });

  test("the linked single-file picker omits bundled and sets both experts", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    await openHighPicker();
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });

    fireEvent.click(screen.getByRole("switch", { name: /one model file for both experts/i }));

    const base = await screen.findByLabelText(/base model/i);
    fireEvent.click(base);
    const listbox = screen.getByRole("listbox");
    expect(within(listbox).queryByRole("option", { name: /bundled/i })).toBeNull();

    fireEvent.click(within(listbox).getByRole("option", { name: /wan22_high_noise/i }));
    await waitFor(() => {
      expect(captured?.params.dit_high_path).toBe(HIGH_PATH);
      expect(captured?.params.dit_low_path).toBe(HIGH_PATH);
    });
  });

  test("Escape closes the picker and returns focus to the trigger", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    await openHighPicker();

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(screen.getByLabelText(/high-noise expert/i));
  });

  test("an outside mousedown closes the picker", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    await openHighPicker();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole("listbox")).toBeNull();
  });

  test("a saved path that is no longer installed stays visible as 'not installed'", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness settings={{ ...DEFAULT_SETTINGS, ditHighPath: "/models/gone.safetensors" }} />);

    await waitFor(() =>
      expect(screen.getByLabelText(/high-noise expert/i).textContent).toMatch(
        /gone\.safetensors.*not installed/i,
      ),
    );
  });

  test("the highlight returns after a no-match query is cleared", async () => {
    vi.mocked(listInstalledModels).mockResolvedValue(INSTALLED);
    render(<Harness />);
    await openHighPicker();
    const search = screen.getByRole("combobox");

    fireEvent.change(search, { target: { value: "zzz-nope" } });
    fireEvent.keyDown(search, { key: "ArrowDown" });
    fireEvent.change(search, { target: { value: "" } });

    await waitFor(() => expect(search.getAttribute("aria-activedescendant")).toBeTruthy());
  });
});
