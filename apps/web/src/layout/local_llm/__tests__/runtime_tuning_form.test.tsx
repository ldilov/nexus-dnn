import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { RuntimeTuningForm } from "../runtime_tuning_form";
import { defaultTuningFor } from "../default_tuning";
import type {
  AvailableModel,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../../services/local_llm_chat";
import type { ModelMetadata } from "../../../services/host_api";

const model: AvailableModel = {
  family_id: "meta-llama/Llama-3.1-8B-Instruct",
  variant_id: "Q4_K_M",
  label: "Llama 3.1 8B Instruct",
  format: "gguf",
  size_bytes: 4_500_000_000,
  max_context: 262_144,
};

const cudaDefaults: RuntimeDefaults = {
  hardware_concurrency: 16,
  threads_default: 8,
  supports_cuda: true,
  platform: "windows",
};

const cpuDefaults: RuntimeDefaults = {
  hardware_concurrency: 16,
  threads_default: 8,
  supports_cuda: false,
  platform: "linux",
};

const metadata: ModelMetadata = {
  install_id: "install-1",
  format: "gguf",
  layer_count: 40,
  max_context: 262_144,
  architecture: "llama",
  hidden_size: 4096,
  extraction_status: "ok",
  extracted_at: 0,
};

function buildValue(
  defaults: RuntimeDefaults,
  meta?: ModelMetadata,
  m: AvailableModel = model,
): RuntimeTuning {
  return defaultTuningFor(m, defaults, meta);
}

afterEach(() => cleanup());

describe("RuntimeTuningForm", () => {
  it("renders_all_basic_controls", () => {
    const value = buildValue(cudaDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText(/context length/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gpu offload/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kv cache/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/flash attention/i)).toBeInTheDocument();
  });

  it("ctx_slider_max_equals_model_max_context", () => {
    const value = buildValue(cudaDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/context length/i) as HTMLInputElement;
    expect(slider.max).toBe("262144");
  });

  it("gpu_layers_disabled_when_no_cuda", () => {
    const value = buildValue(cpuDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cpuDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/gpu offload/i) as HTMLInputElement;
    expect(slider).toBeDisabled();
  });

  it("gpu_layers_max_uses_metadata_layer_count", () => {
    const value = buildValue(cudaDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/gpu offload/i) as HTMLInputElement;
    expect(slider.max).toBe("40");
  });

  it("gpu_layers_falls_back_when_metadata_missing", () => {
    const value = buildValue(cudaDefaults, undefined);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/gpu offload/i) as HTMLInputElement;
    expect(slider.max).toBe("128");
  });

  it("kv_cache_changing_updates_both_k_and_v", () => {
    const value = buildValue(cudaDefaults, metadata);
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const select = screen.getByLabelText(/kv cache/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "q4_0" } });
    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.cache_type_k).toBe("q4_0");
    expect(next.cache_type_v).toBe("q4_0");
  });

  it("advanced_section_is_collapsed_by_default", () => {
    const value = buildValue(cudaDefaults, metadata);
    const { container } = render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const details = container.querySelector("details");
    expect(details).not.toBeNull();
    expect(details?.hasAttribute("open")).toBe(false);
  });

  it("mmap_checkbox_defaults_on_and_toggle_emits_false", () => {
    const value = buildValue(cudaDefaults, metadata);
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const checkbox = screen.getByLabelText(/mmap/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.mmap).toBe(false);
  });

  it("seed_empty_string_emits_undefined_not_zero", () => {
    const value: RuntimeTuning = { ...buildValue(cudaDefaults, metadata), seed: 42 };
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const seed = screen.getByLabelText(/seed/i) as HTMLInputElement;
    fireEvent.change(seed, { target: { value: "" } });
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.seed).toBeUndefined();
  });

  it("seed_number_emits_value", () => {
    const value = buildValue(cudaDefaults, metadata);
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const seed = screen.getByLabelText(/seed/i) as HTMLInputElement;
    fireEvent.change(seed, { target: { value: "42" } });
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.seed).toBe(42);
  });

  it("ctx_change_emits_new_ctx_size", () => {
    const value = buildValue(cudaDefaults, metadata);
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const ctx = screen.getByLabelText(/context length/i) as HTMLInputElement;
    fireEvent.change(ctx, { target: { value: "16384" } });
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.ctx_size).toBe(16384);
  });

  it("threads_slider_max_uses_hardware_concurrency", () => {
    const value = buildValue(cudaDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/threads/i) as HTMLInputElement;
    expect(slider.max).toBe("16");
  });

  it("ctx_slider_max_is_at_least_128k_when_metadata_low", () => {
    const lowModel: AvailableModel = { ...model, max_context: 4096 };
    const value: RuntimeTuning = { ...buildValue(cudaDefaults, metadata, lowModel) };
    render(
      <RuntimeTuningForm
        model={lowModel}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/context length/i) as HTMLInputElement;
    expect(slider.max).toBe("131072");
  });

  it("ctx_slider_max_uses_metadata_when_higher", () => {
    const value = buildValue(cudaDefaults, metadata);
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const slider = screen.getByLabelText(/context length/i) as HTMLInputElement;
    expect(slider.max).toBe("262144");
  });

  it("vram_warning_appears_above_8k", () => {
    const value: RuntimeTuning = {
      ...buildValue(cudaDefaults, metadata),
      ctx_size: 16384,
    };
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    expect(
      screen.getByText(/Above 8K context significantly increases KV-cache VRAM use/i),
    ).toBeInTheDocument();
  });

  it("vram_warning_hidden_at_or_below_8k", () => {
    const value: RuntimeTuning = {
      ...buildValue(cudaDefaults, metadata),
      ctx_size: 8192,
    };
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    expect(
      screen.queryByText(/Above 8K context significantly increases KV-cache VRAM use/i),
    ).toBeNull();
  });

  it("metadata_override_note_appears_when_value_exceeds_metadata", () => {
    const lowModel: AvailableModel = { ...model, max_context: 4096 };
    const value: RuntimeTuning = {
      ...buildValue(cudaDefaults, metadata, lowModel),
      ctx_size: 16384,
    };
    render(
      <RuntimeTuningForm
        model={lowModel}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={() => {}}
      />,
    );
    const noteText = document.body.textContent ?? "";
    expect(noteText).toMatch(/Above this model.s reported max \(4,?096\)/i);
  });

  it("reset_button_emits_default_tuning", () => {
    const value: RuntimeTuning = {
      ...buildValue(cudaDefaults, metadata),
      ctx_size: 1024,
      seed: 99,
    };
    const onChange = vi.fn();
    render(
      <RuntimeTuningForm
        model={model}
        value={value}
        defaults={cudaDefaults}
        modelMetadata={metadata}
        onChange={onChange}
      />,
    );
    const reset = screen.getByRole("button", { name: /reset to defaults/i });
    fireEvent.click(reset);
    const next = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as RuntimeTuning;
    expect(next.ctx_size).toBe(8192);
    expect(next.seed).toBeUndefined();
  });
});
