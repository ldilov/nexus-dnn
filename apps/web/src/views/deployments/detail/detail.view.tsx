import { useCallback, useMemo, useRef, useState } from "react";
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
import {
  downloadJson,
  exportDeployment,
  importIntoDeployment,
  isExportEnvelope,
  type ExportEnvelope,
} from "../../../services/deployment_transfer";
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
  const [importOpen, setImportOpen] = useState(false);
  const [importBusy, setImportBusy] = useState(false);
  const pendingEnvelope = useRef<ExportEnvelope | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const slug = deployment?.slug ?? null;
  const titleName = cleanedDisplayName ?? slug ?? deploymentId;

  // TODO(per-deployment lease): replace with deployment-scoped status when
  // the API exposes a per-deployment lease query. Today this is host-wide
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

  const exportBusyRef = useRef(false);
  const handleExport = useCallback(async () => {
    if (exportBusyRef.current) return;
    exportBusyRef.current = true;
    try {
      const envelope = await exportDeployment(deploymentId);
      const stamp = new Date().toISOString().slice(0, 10);
      const base = (slug ?? cleanedDisplayName ?? deploymentId).replace(/[^a-zA-Z0-9._-]+/g, "_");
      downloadJson(`${base}-${stamp}.nexus-deployment.json`, envelope);
      toast.success("Deployment exported");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to export deployment";
      toast.error(message);
    } finally {
      exportBusyRef.current = false;
    }
  }, [cleanedDisplayName, deploymentId, slug]);

  const handleRequestImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChosen = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Reset the input so re-selecting the same file fires `change` again.
      event.target.value = "";
      if (!file) return;
      try {
        const parsed: unknown = JSON.parse(await file.text());
        if (!isExportEnvelope(parsed)) {
          toast.error("That file isn't a valid deployment export.");
          return;
        }
        pendingEnvelope.current = parsed;
        setImportOpen(true);
      } catch {
        toast.error("Couldn't read that file as JSON.");
      }
    },
    [],
  );

  const handleConfirmImport = useCallback(async () => {
    const envelope = pendingEnvelope.current;
    if (!envelope) return;
    setImportBusy(true);
    try {
      const result = await importIntoDeployment(deploymentId, envelope);
      void globalMutate(["deployment", deploymentId]);
      void globalMutate("deployments");
      setImportOpen(false);
      pendingEnvelope.current = null;
      toast.success(
        result.diagnostics_count > 0
          ? `Deployment replaced — ${result.diagnostics_count} missing dependency(ies)`
          : "Deployment replaced from file",
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to import deployment";
      toast.error(message);
    } finally {
      setImportBusy(false);
    }
  }, [deploymentId]);

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
        onRequestExport={handleExport}
        onRequestImport={handleRequestImport}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={handleFileChosen}
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
      <ConfirmDialog
        open={importOpen}
        eyebrow="Destructive action"
        title="Replace this deployment from file?"
        description="The uploaded export file replaces this deployment's configuration and extension settings. This cannot be undone from here."
        impactLines={[
          "This deployment's configuration is replaced by a new revision from the file.",
          "All extension settings for this deployment are replaced by the file's settings.",
          "Identity (name, slug) and past revisions are kept.",
        ]}
        confirmLabel="Replace from file"
        destructive
        busy={importBusy}
        onConfirm={handleConfirmImport}
        onCancel={() => {
          if (!importBusy) {
            setImportOpen(false);
            pendingEnvelope.current = null;
          }
        }}
      />
    </>
  );
}
