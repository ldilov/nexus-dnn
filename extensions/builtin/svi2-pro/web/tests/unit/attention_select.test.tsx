import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type ReactElement, act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SWRConfig } from "swr";
import type { AttentionCapabilities } from "../../src/services/capabilities_client";
import { DEFAULT_SETTINGS } from "../../src/domain/settings_defaults";
import { saveSettings } from "../../src/services/settings_client";
import {
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";
import { AttentionSelect } from "../../src/views/recipe/components/attention_select";

vi.mock("../../src/services/capabilities_client", () => ({
  getAttentionCapabilities: vi.fn(),
}));

vi.mock("../../src/services/settings_client", () => ({
  saveSettings: vi.fn().mockResolvedValue(DEFAULT_SETTINGS),
}));

import { getAttentionCapabilities } from "../../src/services/capabilities_client";

const CONTRACT_CAPS: AttentionCapabilities = {
  sm: [12, 0],
  cuda_available: true,
  default: "flash2",
  auto_chain: ["flash2", "sdpa"],
  backends: [
    {
      id: "sdpa",
      installed: true,
      supported: true,
      reason: null,
      min_arch: [0, 0],
      needs_triton: false,
      bf16_only: false,
    },
    {
      id: "flash2",
      installed: true,
      supported: true,
      reason: null,
      min_arch: [8, 0],
      needs_triton: false,
      bf16_only: false,
    },
    {
      id: "flash3_fp4",
      installed: false,
      supported: false,
      reason: "flash3_fp4 requires sm_90 (got sm_120)",
      min_arch: [9, 0],
      needs_triton: false,
      bf16_only: false,
    },
    {
      id: "sage2",
      installed: false,
      supported: false,
      reason: "sage2 not installed",
      min_arch: [8, 0],
      needs_triton: true,
      bf16_only: false,
    },
    {
      id: "sage3_fp4",
      installed: true,
      supported: true,
      reason: null,
      min_arch: [12, 0],
      needs_triton: true,
      bf16_only: true,
    },
  ],
};

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function Harness({ attentionBackend }: { attentionBackend?: string } = {}): ReactElement {
  const initialSettings =
    attentionBackend === undefined
      ? undefined
      : { ...DEFAULT_SETTINGS, attentionBackend };
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <RenderRequestProvider initialSettings={initialSettings}>
        <Probe />
        <AttentionSelect />
      </RenderRequestProvider>
    </SWRConfig>
  );
}

afterEach(() => {
  captured = null;
  cleanup();
  vi.clearAllMocks();
});

describe("AttentionSelect — capabilities resolved (200)", () => {
  beforeEach(() => {
    vi.mocked(getAttentionCapabilities).mockResolvedValue(CONTRACT_CAPS);
  });

  test("renders auto plus all 5 backends", async () => {
    render(<Harness />);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Auto (flash2 → sdpa)" })).toBeDefined();
      expect(screen.getByRole("option", { name: "SDPA (always works)" })).toBeDefined();
      expect(screen.getByRole("option", { name: "Flash Attention 2 (recommended)" })).toBeDefined();
      expect(screen.getByRole("option", { name: "FlashAttention 3 FP4" })).toBeDefined();
      expect(screen.getByRole("option", { name: "SageAttention 2" })).toBeDefined();
      expect(screen.getByRole("option", { name: "SageAttention 3 FP4" })).toBeDefined();
    });
  });

  test("flash3_fp4 and sage2 options are disabled", async () => {
    render(<Harness />);
    await waitFor(() => {
      const flash3 = screen.getByRole("option", {
        name: "FlashAttention 3 FP4",
      }) as HTMLOptionElement;
      const sage2 = screen.getByRole("option", {
        name: "SageAttention 2",
      }) as HTMLOptionElement;
      expect(flash3.disabled).toBe(true);
      expect(sage2.disabled).toBe(true);
    });
  });

  test("supported options are enabled", async () => {
    render(<Harness />);
    await waitFor(() => {
      const sdpa = screen.getByRole("option", { name: "SDPA (always works)" }) as HTMLOptionElement;
      const flash2 = screen.getByRole("option", {
        name: "Flash Attention 2 (recommended)",
      }) as HTMLOptionElement;
      const sage3 = screen.getByRole("option", {
        name: "SageAttention 3 FP4",
      }) as HTMLOptionElement;
      expect(sdpa.disabled).toBe(false);
      expect(flash2.disabled).toBe(false);
      expect(sage3.disabled).toBe(false);
    });
  });

  test("disabled options carry the reason as title", async () => {
    render(<Harness />);
    await waitFor(() => {
      const flash3 = screen.getByRole("option", {
        name: "FlashAttention 3 FP4",
      }) as HTMLOptionElement;
      const sage2 = screen.getByRole("option", {
        name: "SageAttention 2",
      }) as HTMLOptionElement;
      expect(flash3.title).toBe("flash3_fp4 requires sm_90 (got sm_120)");
      expect(sage2.title).toBe("sage2 not installed");
    });
  });

  test("selecting an option calls updateParam with the chosen id", async () => {
    render(<Harness />);
    await waitFor(() => screen.getByRole("option", { name: "SDPA (always works)" }));

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    act(() => {
      fireEvent.change(select, { target: { value: "sdpa" } });
    });

    expect(captured?.params.attention).toBe("sdpa");
  });

  test("selecting an option persists the sticky default via saveSettings", async () => {
    render(<Harness />);
    await waitFor(() => screen.getByRole("option", { name: "SDPA (always works)" }));

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    act(() => {
      fireEvent.change(select, { target: { value: "sdpa" } });
    });

    expect(saveSettings).toHaveBeenCalledWith(
      expect.objectContaining({ attentionBackend: "sdpa" }),
    );
  });

  test("keeps a saved unsupported backend selected and warns it will fall back", async () => {
    render(<Harness attentionBackend="flash3_fp4" />);
    await waitFor(() => screen.getByRole("option", { name: "FlashAttention 3 FP4" }));

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("flash3_fp4");

    const flash3 = screen.getByRole("option", {
      name: "FlashAttention 3 FP4",
    }) as HTMLOptionElement;
    expect(flash3.disabled).toBe(true);
    expect(flash3.title).toBe("flash3_fp4 requires sm_90 (got sm_120)");

    expect(screen.getByText(/will fall\s+back to sdpa at render time/i)).toBeDefined();
  });
});

describe("AttentionSelect — capabilities unavailable (503 / error)", () => {
  beforeEach(() => {
    vi.mocked(getAttentionCapabilities).mockRejectedValue(new Error("503 Service Unavailable"));
  });

  test("falls back to static ATTENTION_OPTIONS list, all options enabled", async () => {
    render(<Harness />);
    await waitFor(() => {
      const options = screen.getAllByRole("option") as HTMLOptionElement[];
      expect(options.length).toBeGreaterThanOrEqual(5);
      for (const opt of options) {
        expect(opt.disabled, `option '${opt.value}' should not be disabled`).toBe(false);
      }
    });
  });

  test("shows the unavailability hint when caps fail", async () => {
    render(<Harness />);
    await waitFor(() => {
      expect(screen.getByText(/gpu capabilities unavailable/i)).toBeDefined();
    });
  });
});
