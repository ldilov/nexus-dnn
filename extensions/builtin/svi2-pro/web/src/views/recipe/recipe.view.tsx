import { type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { Button } from "../../components/ui/button";
import { ConfirmDialog } from "../../components/ui/confirm_dialog";
import { Panel } from "../../components/ui/panel";
import { FIELDS, TIERS } from "../../domain/fields";
import { presetRequiresLastImage } from "../../domain/validation";
import { deleteRenderJob, listRenderJobs } from "../../services/history_client";
import { listPresets } from "../../services/presets_client";
import { cancelRender } from "../../services/render_client";
import type { RenderJob } from "../../services/types";
import { useRenderRequest } from "../../store/render_request_store";
import { AnchorInputs } from "./components/anchor_inputs";
import { BaseModelSelect } from "./components/base_model_select";
import { LoraControls } from "./components/lora_controls";
import { DistributionBanner } from "./components/distribution_banner";
import { GenerationModeToggle } from "./components/generation_mode_toggle";
import { HistoryList } from "./components/history_list";
import { LengthControl } from "./components/length_control";
import { OutputSpecBar } from "./components/output_spec_bar";
import { PresetGallery } from "./components/preset_gallery";
import { PromptInput } from "./components/prompt_input";
import { QwenEditPanel } from "./components/qwen_edit_panel";
import { RenderProgress } from "./components/render_progress";
import { ResolutionControl } from "./components/resolution_control";
import { SeedControl } from "./components/seed_control";
import { TierForm } from "./components/tier_form";
import { type FocusRequest, useRenderOrchestration } from "./hooks/use_render_orchestration";
import * as styles from "./recipe.css";

const ANCHOR_PANEL_ID = "svi2-anchor-panel";
const PROMPT_INPUT_ID = "svi2-prompt-input";

export function RecipeView(): ReactElement {
  const {
    presetId,
    presetApplied,
    params,
    render,
    applyPresetById,
    setMode,
    resetRender,
    showJobResult,
    restoreJobIntoForm,
    getIsDirty,
  } = useRenderRequest();
  const { issues, blocked, busy, submit, cancel, focusRequest } = useRenderOrchestration();
  const [pendingRestoreId, setPendingRestoreId] = useState<string | null>(null);

  useFocusOnBlock(focusRequest);

  const presetsQuery = useSWR("svi2/presets", listPresets);
  const historyQuery = useSWR("svi2/history", () => listRenderJobs(25));

  const presets = presetsQuery.data?.presets ?? [];

  useEffect(() => {
    if (presetApplied || presets.length === 0) return;
    const current = presets.find((p) => p.id === presetId) ?? presets[0];
    // System auto-apply on mount must NOT mark the form dirty — an SWR/route
    // -loader miss firing this is not a user action.
    if (current) applyPresetById(current, { markDirty: false });
  }, [presetApplied, presets, presetId, applyPresetById]);
  const jobs = historyQuery.data?.jobs ?? [];
  const mode = params.mode ?? "image_to_video";
  const refImageRequired = mode !== "text_to_video";
  const lastImageRequired = presetRequiresLastImage(presetId, params);
  const refError = issues.find((i) => i.field === "ref_image_path")?.message;
  const lastError = issues.find((i) => i.field === "last_image_path")?.message;
  const promptError = issues.find((i) => i.field === "prompts")?.message;
  const resolutionWarning = issues.find(
    (i) => i.field === "width" && i.severity === "warning",
  )?.message;

  // Read dirty via the store's stable getIsDirty() at click time so this
  // callback stays stable across keystrokes (HistoryList is memoized).
  const handleOpenJob = useCallback(
    (job: RenderJob) => {
      if (job.status !== "succeeded") {
        void showJobResult(job);
        return;
      }
      if (getIsDirty()) {
        setPendingRestoreId(job.id);
        return;
      }
      void restoreJobIntoForm(job);
    },
    [showJobResult, restoreJobIntoForm, getIsDirty],
  );

  const confirmRestore = useCallback(() => {
    const job = jobs.find((j) => j.id === pendingRestoreId);
    setPendingRestoreId(null);
    if (job) void restoreJobIntoForm(job);
  }, [pendingRestoreId, jobs, restoreJobIntoForm]);

  const cancelRestore = useCallback(() => setPendingRestoreId(null), []);

  // Delete-from-history with an undo window: hide the row immediately and only
  // commit the delete after UNDO_MS, so Undo just cancels the pending delete.
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(() => new Set());
  const deleteTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const refreshHistory = historyQuery.mutate;

  useEffect(() => {
    const timers = deleteTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const handleDeleteJob = useCallback(
    (job: RenderJob) => {
      const id = job.id;
      const wasActive = job.status === "running" || job.status === "queued";
      setHiddenIds((prev) => new Set(prev).add(id));
      const existing = deleteTimers.current.get(id);
      if (existing) clearTimeout(existing);
      const unhide = (target: string) =>
        setHiddenIds((prev) => {
          const next = new Set(prev);
          next.delete(target);
          return next;
        });
      const timer = setTimeout(() => {
        deleteTimers.current.delete(id);
        void (async () => {
          try {
            // Running renders are cancelled before the row is dropped.
            if (wasActive) await cancelRender(id).catch(() => undefined);
            await deleteRenderJob(id);
            await refreshHistory();
            unhide(id);
          } catch {
            unhide(id);
            toast.error("Couldn't delete that render.");
          }
        })();
      }, 5000);
      deleteTimers.current.set(id, timer);
      toast.success("Render removed", {
        action: {
          label: "Undo",
          onClick: () => {
            const t = deleteTimers.current.get(id);
            if (t) clearTimeout(t);
            deleteTimers.current.delete(id);
            unhide(id);
          },
        },
      });
    },
    [refreshHistory],
  );

  const visibleJobs = hiddenIds.size === 0 ? jobs : jobs.filter((j) => !hiddenIds.has(j.id));

  return (
    <div className={styles.layout}>
      <ConfirmDialog
        open={pendingRestoreId !== null}
        title="Load this run into the form?"
        message="Unsaved changes will be replaced."
        confirmLabel="Load run"
        cancelLabel="Keep editing"
        onConfirm={confirmRestore}
        onCancel={cancelRestore}
      />
      <div className={styles.column}>
        <Panel
          title="Preset"
          description="Starting points for a render. Every field stays nudgeable after you apply one."
        >
          <PresetGallery presets={presets} selectedId={presetId} onSelect={applyPresetById} />
        </Panel>

        <Panel
          title="Mode"
          description="Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt."
        >
          <GenerationModeToggle value={mode} onChange={setMode} />
          {mode === "text_to_video" && <SeedControl />}
        </Panel>

        <div id={ANCHOR_PANEL_ID}>
          <Panel
            title="Anchor"
            description="The reference image defines identity for the whole take."
          >
            <AnchorInputs
              refImageRequired={refImageRequired}
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

        <Panel
          title={
            <>
              <span className={styles.panelEyebrow}>Inference · Parameters</span>
              Parameters
            </>
          }
          description="Grouped by tier. Advanced tiers stay collapsed."
          actions={
            <Button
              variant="secondary"
              size="sm"
              title="Re-apply the active preset's defaults"
              onClick={() => {
                const current = presets.find((p) => p.id === presetId);
                if (current) applyPresetById(current);
              }}
            >
              Reset to defaults
            </Button>
          }
        >
          <DistributionBanner presets={presets} warningText={resolutionWarning} />
          <div className={styles.quickControls}>
            <LengthControl />
            <ResolutionControl presets={presets} />
            <BaseModelSelect />
            <LoraControls />
          </div>
          <TierForm issues={issues} />
          <OutputSpecBar presets={presets} />
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
          <HistoryList jobs={visibleJobs} onOpen={handleOpenJob} onDelete={handleDeleteJob} />
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
