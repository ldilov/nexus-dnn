import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { InspectorPanel, type InspectorPanelProps } from "../inspector_panel";

function makeProps(overrides: Partial<InspectorPanelProps> = {}): InspectorPanelProps {
  return {
    modelLabel: "claude-haiku-4-5",
    modelSub: "anthropic · cloud",
    loadPhase: "ready",
    contextUsed: 0,
    contextMax: 0,
    sampler: { temperature: 0.42, topP: 0.95, maxTokens: 1024 },
    onSamplerChange: vi.fn(),
    systemPromptInherited: true,
    systemPrompt: "",
    onSystemPromptChange: vi.fn(),
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
});

describe("InspectorPanel", () => {
  it("renders_three_section_eyebrows", () => {
    render(<InspectorPanel {...makeProps()} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("MODEL")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("PARAMETERS")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("SYSTEM PROMPT")).toBeInTheDocument();
  });

  it("displays_model_label", () => {
    render(<InspectorPanel {...makeProps({ modelLabel: "claude-haiku-4-5" })} />);
    expect(screen.getByText("claude-haiku-4-5")).toBeInTheDocument();
  });

  it("hides_meter_when_contextMax_zero", () => {
    render(<InspectorPanel {...makeProps({ contextMax: 0, contextUsed: 0 })} />);
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("shows_meter_when_contextMax_positive", () => {
    render(
      <InspectorPanel {...makeProps({ contextMax: 8192, contextUsed: 4096 })} />,
    );
    const bar = screen.getByRole("progressbar", { name: /context used/i });
    expect(bar).toHaveAttribute("aria-valuenow", "50");
  });

  it("loading_phase_shows_loading_chip", () => {
    render(<InspectorPanel {...makeProps({ loadPhase: "loading" })} />);
    expect(
      screen.getByLabelText(/model status: loading/i),
    ).toBeInTheDocument();
  });

  it("temperature_change_calls_onSamplerChange", () => {
    const onSamplerChange = vi.fn();
    render(<InspectorPanel {...makeProps({ onSamplerChange })} />);
    const input = screen.getByLabelText(/temperature/i, { selector: "input" });
    fireEvent.change(input, { target: { value: "0.7" } });
    expect(onSamplerChange).toHaveBeenCalledWith(
      expect.objectContaining({ temperature: 0.7, topP: 0.95, maxTokens: 1024 }),
    );
  });

  it("system_prompt_textarea_change_calls_onSystemPromptChange", () => {
    const onSystemPromptChange = vi.fn();
    render(
      <InspectorPanel
        {...makeProps({ systemPrompt: "", onSystemPromptChange })}
      />,
    );
    const textarea = screen.getByLabelText(/system prompt/i, {
      selector: "textarea",
    });
    fireEvent.change(textarea, { target: { value: "Be terse." } });
    expect(onSystemPromptChange).toHaveBeenCalledWith("Be terse.");
  });

  it("system_prompt_indicator_shows_inherited_when_default", () => {
    const { rerender } = render(
      <InspectorPanel {...makeProps({ systemPromptInherited: true })} />,
    );
    expect(screen.getByText(/inherits/i)).toBeInTheDocument();

    rerender(<InspectorPanel {...makeProps({ systemPromptInherited: false })} />);
    expect(screen.getByText(/overridden/i)).toBeInTheDocument();
  });

  it("unload_button_hidden_when_loadPhase_not_ready", () => {
    render(
      <InspectorPanel
        {...makeProps({ loadPhase: "idle", onUnload: vi.fn() })}
      />,
    );
    expect(screen.queryByRole("button", { name: /unload model/i })).toBeNull();
  });

  it("unload_button_hidden_when_onUnload_not_provided", () => {
    render(<InspectorPanel {...makeProps({ loadPhase: "ready" })} />);
    expect(screen.queryByRole("button", { name: /unload model/i })).toBeNull();
  });

  it("unload_button_calls_onUnload_when_clicked", () => {
    const onUnload = vi.fn();
    render(
      <InspectorPanel
        {...makeProps({ loadPhase: "ready", onUnload })}
      />,
    );
    const btn = screen.getByRole("button", { name: /unload model/i });
    fireEvent.click(btn);
    expect(onUnload).toHaveBeenCalledTimes(1);
  });
});
