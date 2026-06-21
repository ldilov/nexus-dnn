import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { defaultParamsFromSettings } from "../../src/domain/build_params";
import { DEFAULT_SETTINGS } from "../../src/domain/settings_defaults";
import { initialRenderState } from "../../src/domain/render_state";
import type { RenderJob } from "../../src/services/types";

const restoreJobIntoForm = vi.fn();
const showJobResult = vi.fn();
let storeIsDirty = false;

const storeValue = () => ({
  settings: DEFAULT_SETTINGS,
  presetId: "svi-canonical",
  presetApplied: true,
  params: defaultParamsFromSettings(DEFAULT_SETTINGS),
  refImageName: null,
  lastImageName: null,
  qwenEdit: { enabled: false, prompt: "" },
  render: initialRenderState(),
  isDirty: storeIsDirty,
  getIsDirty: () => storeIsDirty,
  applyPresetById: vi.fn(),
  setMode: vi.fn(),
  updateParam: vi.fn(),
  setPrompts: vi.fn(),
  setRefImage: vi.fn(),
  setLastImage: vi.fn(),
  clearRefImageSilent: vi.fn(),
  clearLastImageSilent: vi.fn(),
  setQwenEdit: vi.fn(),
  setSettings: vi.fn(),
  startRenderJob: vi.fn(),
  cancelRenderJob: vi.fn(),
  resetRender: vi.fn(),
  showJobResult,
  restoreJobIntoForm,
});

vi.mock("../../src/store/render_request_store", () => ({
  useRenderRequest: () => storeValue(),
}));

vi.mock("../../src/views/recipe/hooks/use_render_orchestration", () => ({
  useRenderOrchestration: () => ({
    issues: [],
    blocked: false,
    busy: false,
    submit: vi.fn(),
    cancel: vi.fn(),
    focusRequest: null,
  }),
}));

const succeeded: RenderJob = {
  id: "job-9",
  presetId: "svi-canonical",
  params: { ref_image_path: "/ws/a.png", prompts: ["p"] },
  status: "succeeded",
  outputPath: "/ws/out.mp4",
  renderReport: null,
  errorCode: null,
  errorMessage: null,
  createdAt: "2026-06-21T00:00:00Z",
  updatedAt: "2026-06-21T00:01:00Z",
};

const failed: RenderJob = { ...succeeded, id: "job-x", status: "failed", outputPath: null };

vi.mock("swr", () => ({
  default: (key: string) => {
    if (key === "svi2/history") return { data: { jobs: [succeeded, failed] } };
    return { data: { presets: [] } };
  },
}));

vi.mock("../../src/services/history_client", () => ({ listRenderJobs: vi.fn() }));
vi.mock("../../src/services/presets_client", () => ({ listPresets: vi.fn() }));

// Stub the parameter-heavy children — the gating logic lives in RecipeView's
// handleOpenJob + HistoryList + ConfirmDialog, which stay real.
vi.mock("../../src/views/recipe/components/anchor_inputs", () => ({ AnchorInputs: () => null }));
vi.mock("../../src/views/recipe/components/base_model_select", () => ({ BaseModelSelect: () => null }));
vi.mock("../../src/views/recipe/components/lora_controls", () => ({ LoraControls: () => null }));
vi.mock("../../src/views/recipe/components/distribution_banner", () => ({ DistributionBanner: () => null }));
vi.mock("../../src/views/recipe/components/generation_mode_toggle", () => ({ GenerationModeToggle: () => null }));
vi.mock("../../src/views/recipe/components/length_control", () => ({ LengthControl: () => null }));
vi.mock("../../src/views/recipe/components/output_spec_bar", () => ({ OutputSpecBar: () => null }));
vi.mock("../../src/views/recipe/components/preset_gallery", () => ({ PresetGallery: () => null }));
vi.mock("../../src/views/recipe/components/prompt_input", () => ({ PromptInput: () => null }));
vi.mock("../../src/views/recipe/components/qwen_edit_panel", () => ({ QwenEditPanel: () => null }));
vi.mock("../../src/views/recipe/components/render_progress", () => ({ RenderProgress: () => null }));
vi.mock("../../src/views/recipe/components/resolution_control", () => ({ ResolutionControl: () => null }));
vi.mock("../../src/views/recipe/components/seed_control", () => ({ SeedControl: () => null }));
vi.mock("../../src/views/recipe/components/tier_form", () => ({ TierForm: () => null }));

import { RecipeView } from "../../src/views/recipe/recipe.view";

beforeEach(() => {
  restoreJobIntoForm.mockReset();
  showJobResult.mockReset();
  storeIsDirty = false;
});

afterEach(cleanup);

describe("RecipeView history click gating", () => {
  test("clean + succeeded → restoreJobIntoForm directly, no confirm", () => {
    render(<RecipeView />);
    fireEvent.click(screen.getByText("succeeded"));
    expect(restoreJobIntoForm).toHaveBeenCalledWith(succeeded);
    expect(showJobResult).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  test("dirty + succeeded → confirm gate, restore only after confirm", () => {
    storeIsDirty = true;
    render(<RecipeView />);
    fireEvent.click(screen.getByText("succeeded"));
    expect(restoreJobIntoForm).not.toHaveBeenCalled();

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toBeDefined();
    fireEvent.click(screen.getByText("Load run"));
    expect(restoreJobIntoForm).toHaveBeenCalledWith(succeeded);
  });

  test("dirty + succeeded → cancel keeps editing, no restore", () => {
    storeIsDirty = true;
    render(<RecipeView />);
    fireEvent.click(screen.getByText("succeeded"));
    fireEvent.click(screen.getByText("Keep editing"));
    expect(restoreJobIntoForm).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  test("non-succeeded job → showJobResult (video-only), never restore", () => {
    render(<RecipeView />);
    fireEvent.click(screen.getByText("failed"));
    expect(showJobResult).toHaveBeenCalledWith(failed);
    expect(restoreJobIntoForm).not.toHaveBeenCalled();
  });
});
