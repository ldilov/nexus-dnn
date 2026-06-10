import { type ReactElement, useCallback, useEffect } from "react";
import useSWR from "swr";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import { FIELDS, TIERS } from "../../domain/fields";
import { presetRequiresLastImage } from "../../domain/validation";
import { listRenderJobs } from "../../services/history_client";
import { listPresets } from "../../services/presets_client";
import type { RenderJob } from "../../services/types";
import { useRenderRequest } from "../../store/render_request_store";
import { AnchorInputs } from "./components/anchor_inputs";
import { BaseModelSelect } from "./components/base_model_select";
import { HistoryList } from "./components/history_list";
import { LengthControl } from "./components/length_control";
import { PresetGallery } from "./components/preset_gallery";
import { PromptInput } from "./components/prompt_input";
import { QwenEditPanel } from "./components/qwen_edit_panel";
import { RenderProgress } from "./components/render_progress";
import { ResolutionControl } from "./components/resolution_control";
import { TierForm } from "./components/tier_form";
import { type FocusRequest, useRenderOrchestration } from "./hooks/use_render_orchestration";
import * as styles from "./recipe.css";

const ANCHOR_PANEL_ID = "svi2-anchor-panel";
const PROMPT_INPUT_ID = "svi2-prompt-input";

export function RecipeView(): ReactElement {
  const { presetId, presetApplied, params, render, applyPresetById, resetRender, showJobResult } =
    useRenderRequest();
  const { issues, blocked, busy, submit, cancel, focusRequest } = useRenderOrchestration();

  useFocusOnBlock(focusRequest);

  const presetsQuery = useSWR("svi2/presets", listPresets);
  const historyQuery = useSWR("svi2/history", () => listRenderJobs(25));

  const presets = presetsQuery.data?.presets ?? [];

  useEffect(() => {
    if (presetApplied || presets.length === 0) return;
    const current = presets.find((p) => p.id === presetId) ?? presets[0];
    if (current) applyPresetById(current);
  }, [presetApplied, presets, presetId, applyPresetById]);
  const jobs = historyQuery.data?.jobs ?? [];
  const lastImageRequired = presetRequiresLastImage(presetId, params);
  const refError = issues.find((i) => i.field === "ref_image_path")?.message;
  const lastError = issues.find((i) => i.field === "last_image_path")?.message;
  const promptError = issues.find((i) => i.field === "prompts")?.message;
  const resolutionWarning = issues.find(
    (i) => i.field === "width" && i.severity === "warning",
  )?.message;

  const handleOpenJob = useCallback(
    (job: RenderJob) => {
      void showJobResult(job);
    },
    [showJobResult],
  );

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <Panel
          title="Preset"
          description="Starting points for a render. Every field stays nudgeable after you apply one."
        >
          <PresetGallery presets={presets} selectedId={presetId} onSelect={applyPresetById} />
        </Panel>

        <div id={ANCHOR_PANEL_ID}>
          <Panel
            title="Anchor"
            description="The reference image defines identity for the whole take."
          >
            <AnchorInputs
              lastImageRequired={lastImageRequired}
              refError={refError}
              lastError={lastError}
            />
          </Panel>
        </div>

        <Panel title="Prompt" description="One prompt for a coherent take, or per-clip when needed.">
          <PromptInput error={promptError} textareaId={PROMPT_INPUT_ID} />
        </Panel>

        <Panel title="Transform" description="Edit the anchor before animating it.">
          <QwenEditPanel />
        </Panel>

        <Panel title="Parameters" description="Grouped by tier. Advanced tiers stay collapsed.">
          {resolutionWarning && (
            <output className={styles.resolutionWarning}>{resolutionWarning}</output>
          )}
          <div className={styles.quickControls}>
            <LengthControl />
            <ResolutionControl presets={presets} />
            <BaseModelSelect />
          </div>
          <TierForm issues={issues} />
        </Panel>
      </div>

      <div className={styles.rightColumn}>
        <Panel
          title="Render"
          description={busy ? "Render in progress." : "Live progress and output."}
        >
          <RenderProgress state={render} onCancel={cancel} onReset={resetRender} />
          {!busy && (
            <div className={styles.renderCta}>
              <Button
                variant="primary"
                disabled={blocked}
                title={blocked ? "Fix the highlighted fields before rendering" : undefined}
                onClick={() => void submit()}
              >
                Render
              </Button>
            </div>
          )}
        </Panel>

        <Panel title="History" description="Past renders for this deployment.">
          <HistoryList jobs={jobs} onOpen={handleOpenJob} />
        </Panel>
      </div>
    </div>
  );
}

const PANEL_FIELDS: Partial<Record<FocusRequest["field"], string>> = {
  ref_image_path: ANCHOR_PANEL_ID,
  last_image_path: ANCHOR_PANEL_ID,
  prompts: PROMPT_INPUT_ID,
};

function useFocusOnBlock(focusRequest: FocusRequest | null): void {
  useEffect(() => {
    if (!focusRequest) return;
    if (typeof document === "undefined") return;

    const directId = PANEL_FIELDS[focusRequest.field];
    if (directId) {
      const el = document.getElementById(directId);
      focusElement(el);
      return;
    }

    expandTierForField(focusRequest.field);
    const target = window.requestAnimationFrame(() => {
      const invalid = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      focusElement(invalid);
    });
    return () => window.cancelAnimationFrame(target);
  }, [focusRequest]);
}

function expandTierForField(field: FocusRequest["field"]): void {
  const spec = FIELDS.find((f) => f.key === field);
  if (!spec) return;
  const tier = TIERS.find((t) => t.id === spec.tier);
  if (!tier) return;
  const headers = document.querySelectorAll<HTMLButtonElement>(
    'button[aria-expanded="false"][aria-controls]',
  );
  for (const header of headers) {
    if (header.textContent?.includes(tier.title)) {
      header.click();
      return;
    }
  }
}

function focusElement(el: HTMLElement | null): void {
  if (!el) return;
  const focusable =
    el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT"
      ? el
      : el.querySelector<HTMLElement>("input, textarea, select, button");
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  focusable?.focus({ preventScroll: true });
}
