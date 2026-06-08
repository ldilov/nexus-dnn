import type { ReactElement } from "react";
import useSWR from "swr";
import { Panel } from "../../components/ui/panel";
import { presetRequiresLastImage } from "../../domain/validation";
import { listRenderJobs } from "../../services/history_client";
import { listPresets } from "../../services/presets_client";
import { useRenderRequest } from "../../store/render_request_store";
import { AnchorInputs } from "./components/anchor_inputs";
import { HistoryList } from "./components/history_list";
import { PresetGallery } from "./components/preset_gallery";
import { PromptInput } from "./components/prompt_input";
import { QwenEditPanel } from "./components/qwen_edit_panel";
import { RenderProgress } from "./components/render_progress";
import { TierForm } from "./components/tier_form";
import { useRenderOrchestration } from "./hooks/use_render_orchestration";
import * as styles from "./recipe.css";

export function RecipeView(): ReactElement {
  const { presetId, render, applyPresetById, resetRender } = useRenderRequest();
  const { issues, busy, cancel } = useRenderOrchestration();

  const presetsQuery = useSWR("svi2/presets", listPresets);
  const historyQuery = useSWR("svi2/history", () => listRenderJobs(25));

  const presets = presetsQuery.data?.presets ?? [];
  const jobs = historyQuery.data?.jobs ?? [];
  const lastImageRequired = presetRequiresLastImage(presetId);
  const refError = issues.find((i) => i.field === "ref_image_path")?.message;
  const lastError = issues.find((i) => i.field === "last_image_path")?.message;
  const promptError = issues.find((i) => i.field === "prompts")?.message;
  const resolutionWarning = issues.find(
    (i) => i.field === "width" && i.severity === "warning",
  )?.message;

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <Panel
          title="Preset"
          description="Starting points for a render. Every field stays nudgeable after you apply one."
        >
          <PresetGallery presets={presets} selectedId={presetId} onSelect={applyPresetById} />
        </Panel>

        <Panel title="Anchor" description="The reference image defines identity for the whole take.">
          <AnchorInputs
            lastImageRequired={lastImageRequired}
            refError={refError}
            lastError={lastError}
          />
        </Panel>

        <Panel title="Prompt">
          <PromptInput error={promptError} />
        </Panel>

        <Panel title="Transform" description="Edit the anchor before animating it.">
          <QwenEditPanel />
        </Panel>

        <Panel title="Parameters" description="Grouped by tier. Advanced tiers stay collapsed.">
          {resolutionWarning && (
            <output className={styles.resolutionWarning}>{resolutionWarning}</output>
          )}
          <TierForm issues={issues} />
        </Panel>
      </div>

      <div className={styles.rightColumn}>
        <Panel title="Render" description={busy ? "Render in progress." : "Live progress and output."}>
          <RenderProgress state={render} onCancel={cancel} onReset={resetRender} />
        </Panel>

        <Panel title="History" description="Past renders for this deployment.">
          <HistoryList jobs={jobs} onOpen={() => undefined} />
        </Panel>
      </div>
    </div>
  );
}
