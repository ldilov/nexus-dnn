import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { mutate as globalMutate } from "swr";
import type { LayoutSummary, ModuleSummary } from "../../../api/client";
import { ConfirmDialog } from "../../../components/base/confirm_dialog";
import {
  useDeployment,
  useLayouts,
  useModules,
  useWorkflow,
} from "../../../hooks/use_api";
import { useRuntimeStatus } from "../../../hooks/use_runtime_status";
import type { StatusKind } from "../../../components/base/status_chip";
import { deleteDeployment } from "../../../services/deployments";
import { useRootOutletContext } from "../../../root_layout";
import { DeploymentDetailUI, type DetailTabId } from "./detail.ui";

export interface DeploymentDetailPlaceholderProps {
  deploymentId: string;
  onBack: () => void;
}

export function DeploymentDetailPlaceholder({
  deploymentId,
  onBack,
}: DeploymentDetailPlaceholderProps) {
  const [tab, setTab] = useState<DetailTabId>("recipe");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // Live execution state from the host event bus (shared root subscription).
  // Lights up the Workflow Graph tab with per-node run status (P0 wire-up).
  const { nodeProgress, runId } = useRootOutletContext();

  const { data: deployment } = useDeployment(deploymentId);
  const { data: modulesEnvelope } = useModules({ limit: 200 });
  const { data: layouts } = useLayouts();

  const linkedModule = useMemo<ModuleSummary | null>(() => {
    if (!deployment || !modulesEnvelope) return null;
    if (deployment.source_extension_id) {
      return (
        modulesEnvelope.modules.find(
          (m) => m.extension_id === deployment.source_extension_id,
        ) ?? null
      );
    }
    if (deployment.source_workflow_id) {
      return (
        modulesEnvelope.modules.find(
          (m) => m.module_id === `user:${deployment.source_workflow_id}`,
        ) ?? null
      );
    }
    return null;
  }, [deployment, modulesEnvelope]);

  const workflowId = linkedModule?.workflow_id ?? null;
  const { data: workflow, isLoading: workflowLoading } = useWorkflow(workflowId);

  const extensionLayout = useMemo<LayoutSummary | null>(() => {
    if (!deployment?.source_extension_id || !layouts) return null;
    const extId = deployment.source_extension_id;
    return (
      layouts.find((l) => l.extension_id === extId && l.is_default) ??
      layouts.find((l) => l.extension_id === extId) ??
      null
    );
  }, [deployment, layouts]);

  // Module name for the title's left-of-dash slot. Prefer the linked
  // module's display_name (clean for both EmotionTTS + Local LLM); fall
  // back to null when no module is linked (rendered as just the name).
  // Strip a leading "<module><sep> " prefix where <sep> is one of "—",
  // "–", "-". This is intentionally permissive: a deployment created with
  // one module name then later renamed (or persisted with an em-dash but
  // displayed with a hyphen, etc.) should still render cleanly.
  const moduleName = linkedModule?.display_name ?? null;
  const rawDisplayName = deployment?.display_name ?? null;
  const cleanedDisplayName = useMemo<string | null>(() => {
    if (!rawDisplayName) return null;
    if (!moduleName) return rawDisplayName;
    const SEPARATORS: readonly string[] = [" — ", " – ", " - "];
    for (const sep of SEPARATORS) {
      const idx = rawDisplayName.indexOf(sep);
      if (idx === -1) continue;
      const left = rawDisplayName.slice(0, idx);
      // Case-insensitive equality to absorb minor moduleName case changes.
      if (left.toLowerCase() === moduleName.toLowerCase()) {
        return rawDisplayName.slice(idx + sep.length);
      }
    }
    return rawDisplayName;
  }, [rawDisplayName, moduleName]);

  // When displayName resolves to null but we have a moduleName, prefer the
  // slug as a user-meaningful fallback over a generic "Deployment detail"
  // string — slugs are short, scoped, and grep-able.
  const slug = deployment?.slug ?? null;
  const titleName = cleanedDisplayName ?? slug ?? deploymentId;

  // TODO(per-deployment lease): replace with deployment-scoped status when
  // the API exposes a per-deployment lease query. Today this is host-wide
  // runtime liveness — every deployment header would otherwise show the
  // same pill. The label is explicitly scoped to "host runtime" so the
  // surfaced data isn't misread as a per-deployment liveness indicator.
  const runtime = useRuntimeStatus();
  const status: StatusKind =
    runtime.host.kind === "live"
      ? "live"
      : runtime.host.kind === "failed"
        ? "failed"
        : "idle";
  const statusLabel =
    runtime.host.kind === "live"
      ? "host runtime · live"
      : runtime.host.kind === "failed"
        ? "host runtime · failed"
        : "host runtime · idle";

  const handleConfirmDelete = useCallback(async () => {
    setDeleteBusy(true);
    try {
      await deleteDeployment(deploymentId);
      toast.success(
        cleanedDisplayName
          ? `Deleted "${cleanedDisplayName}"`
          : "Deployment deleted",
      );
      // Drop both list + detail caches; the back navigation triggers a fresh fetch.
      void globalMutate("deployments");
      void globalMutate(["deployment", deploymentId]);
      setDeleteOpen(false);
      onBack();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete deployment";
      toast.error(message);
    } finally {
      setDeleteBusy(false);
    }
  }, [cleanedDisplayName, deploymentId, onBack]);

  return (
    <>
      <DeploymentDetailUI
        deploymentId={deploymentId}
        displayName={titleName}
        slug={slug}
        moduleName={moduleName}
        status={status}
        statusLabel={statusLabel}
        tab={tab}
        onTabChange={setTab}
        onBack={onBack}
        workflow={workflow ?? null}
        workflowLoading={workflowLoading}
        nodeProgress={nodeProgress}
        runId={runId}
        extensionLayout={extensionLayout}
        extensionId={deployment?.source_extension_id ?? null}
        onRequestDelete={() => setDeleteOpen(true)}
      />
      <ConfirmDialog
        open={deleteOpen}
        eyebrow="Destructive action"
        title={
          cleanedDisplayName
            ? `Delete "${cleanedDisplayName}"?`
            : "Delete deployment?"
        }
        description="The deployment will be removed from the operator surface. Past runs and produced artifacts stay in storage but stop being shown alongside this deployment."
        impactLines={[
          "The deployment row disappears from the deployments list.",
          "Past runs and artifacts are kept (no cascade in this step).",
          "Source recipe / workflow stays untouched.",
        ]}
        confirmLabel="Delete deployment"
        destructive
        busy={deleteBusy}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!deleteBusy) setDeleteOpen(false);
        }}
      />
    </>
  );
}
