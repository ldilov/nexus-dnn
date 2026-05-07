import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { cleanup, fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import { ModelLoadDialog } from "../model_load_dialog";
import type {
  AvailableModel,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../../services/local_llm_chat";

const cudaDefaults: RuntimeDefaults = {
  hardware_concurrency: 16,
  threads_default: 8,
  supports_cuda: true,
  platform: "windows",
};

const modelA: AvailableModel = {
  family_id: "meta-llama/Llama-3.1-8B-Instruct",
  variant_id: "Q4_K_M",
  label: "Llama 3.1 8B Instruct",
  format: "gguf",
  size_bytes: 4_500_000_000,
  max_context: 131_072,
  is_moe: false,
  expert_layer_count: null,
};

const modelB: AvailableModel = {
  family_id: "Qwen/Qwen2.5-7B-Instruct",
  variant_id: "Q5_K_M",
  label: "Qwen 2.5 7B Instruct",
  format: "gguf",
  size_bytes: 5_200_000_000,
  max_context: 32_768,
  is_moe: false,
  expert_layer_count: null,
};

afterEach(() => cleanup());

describe("ModelLoadDialog", () => {
  it("renders_nothing_when_closed", () => {
    render(
      <ModelLoadDialog
        open={false}
        models={[modelA]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders_model_list_when_open", () => {
    render(
      <ModelLoadDialog
        open
        models={[modelA, modelB]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    const listbox = screen.getByRole("listbox");
    const options = listbox.querySelectorAll('[role="option"]');
    expect(options.length).toBe(2);
  });

  it("selecting_model_renders_form", () => {
    render(
      <ModelLoadDialog
        open
        models={[modelA, modelB]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.queryByLabelText(/context length/i)).toBeNull();
    const options = screen.getAllByRole("option");
    fireEvent.click(options[0]!);
    expect(screen.getByLabelText(/context length/i)).toBeInTheDocument();
  });

  it("load_button_disabled_until_selection", () => {
    render(
      <ModelLoadDialog
        open
        models={[modelA, modelB]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    const button = screen.getByRole("button", { name: /load model/i });
    expect(button).toBeDisabled();
  });

  it("load_button_invokes_onLoad_with_tuning", () => {
    const onLoad = vi.fn();
    render(
      <ModelLoadDialog
        open
        models={[modelA, modelB]}
        defaults={cudaDefaults}
        onLoad={onLoad}
        onClose={() => {}}
      />,
    );
    fireEvent.click(screen.getAllByRole("option")[0]!);
    fireEvent.click(screen.getByRole("button", { name: /load model/i }));
    expect(onLoad).toHaveBeenCalledTimes(1);
    const [calledModel, calledTuning] = onLoad.mock.calls[0] as [
      AvailableModel,
      RuntimeTuning,
    ];
    expect(calledModel.family_id).toBe(modelA.family_id);
    expect(calledTuning.ctx_size).toBeDefined();
    expect(calledTuning.cache_type_k).toBeDefined();
    expect(calledTuning.cache_type_v).toBeDefined();
    expect(calledTuning.flash_attn).toBeDefined();
    expect(calledTuning.threads).toBeDefined();
    expect(calledTuning.mmap).toBeDefined();
    expect(calledTuning.cont_batching).toBeDefined();
  });

  it("escape_key_closes", () => {
    const onClose = vi.fn();
    render(
      <ModelLoadDialog
        open
        models={[modelA]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={onClose}
      />,
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("clicking_scrim_closes", () => {
    const onClose = vi.fn();
    const { container } = render(
      <ModelLoadDialog
        open
        models={[modelA]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={onClose}
      />,
    );
    const scrim = container.querySelector('[role="presentation"]') as HTMLElement;
    fireEvent.click(scrim);
    expect(onClose).toHaveBeenCalled();
  });

  it("clicking_dialog_body_does_not_close", () => {
    const onClose = vi.fn();
    render(
      <ModelLoadDialog
        open
        models={[modelA]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("seed_with_initial_tuning_uses_it", () => {
    render(
      <ModelLoadDialog
        open
        models={[modelA]}
        defaults={cudaDefaults}
        initialTuningByFamily={{
          [modelA.family_id]: {
            ctx_size: 1024,
            cache_type_k: "q8_0",
            cache_type_v: "q8_0",
          },
        }}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    fireEvent.click(screen.getAllByRole("option")[0]!);
    const ctx = screen.getByLabelText(/context length/i) as HTMLInputElement;
    expect(ctx.value).toBe("1024");
  });

  it("renders_empty_state_when_no_models", () => {
    render(
      <MemoryRouter>
        <ModelLoadDialog
          open
          models={[]}
          defaults={cudaDefaults}
          onLoad={() => {}}
          onClose={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/no gguf models downloaded/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open models search/i })).toHaveAttribute(
      "href",
      "/models-search",
    );
  });

  it("restores_focus_to_trigger_on_close", () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button
            type="button"
            data-testid="trigger"
            onClick={() => setOpen(true)}
          >
            Open
          </button>
          <ModelLoadDialog
            open={open}
            models={[modelA]}
            defaults={cudaDefaults}
            onLoad={() => {}}
            onClose={() => setOpen(false)}
          />
        </div>
      );
    }
    render(<Harness />);
    const trigger = screen.getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    act(() => {
      fireEvent.click(trigger);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => {
      fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    });
    expect(document.activeElement).toBe(trigger);
  });

  it("tab_cycles_within_dialog", () => {
    render(
      <ModelLoadDialog
        open
        models={[modelA, modelB]}
        defaults={cudaDefaults}
        onLoad={() => {}}
        onClose={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    last.focus();
    expect(document.activeElement).toBe(last);
    act(() => {
      fireEvent.keyDown(dialog, { key: "Tab" });
    });
    expect(document.activeElement).toBe(first);

    first.focus();
    act(() => {
      fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    });
    expect(document.activeElement).toBe(last);
  });

  it("metadata_by_install_id_passes_to_form", () => {
    const onLoad = vi.fn();
    render(
      <ModelLoadDialog
        open
        models={[modelA]}
        defaults={cudaDefaults}
        metadataByKey={{
          [modelA.family_id]: {
            install_id: modelA.family_id,
            format: "gguf",
            layer_count: 32,
            max_context: 131_072,
            architecture: "llama",
            hidden_size: 4096,
            extraction_status: "ok",
            extracted_at: 0,
          },
        }}
        onLoad={onLoad}
        onClose={() => {}}
      />,
    );
    fireEvent.click(screen.getAllByRole("option")[0]!);
    const gpu = screen.getByLabelText(/gpu offload/i) as HTMLInputElement;
    expect(gpu.max).toBe("32");
  });
});
