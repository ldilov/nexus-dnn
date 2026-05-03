import { useMemo, useState } from "react";
import type { LayoutSummary, ModuleSummary } from "../../../api/client";
import {
  useDeployment,
  useLayouts,
  useModules,
  useWorkflow,
} from "../../../hooks/use_api";
import { useRuntimeStatus } from "../../../hooks/use_runtime_status";
import type { StatusKind } from "../../../components/base/status_chip";
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
  // Also strip the module-name prefix from displayName if it leads with
  // "<module> — " (some deployments embed the module in the display name).
  const moduleName = linkedModule?.display_name ?? null;
  const rawDisplayName = deployment?.display_name ?? null;
  const cleanedDisplayName = useMemo<string | null>(() => {
    if (!rawDisplayName) return null;
    if (!moduleName) return rawDisplayName;
    const prefix = `${moduleName} — `;
    return rawDisplayName.startsWith(prefix)
      ? rawDisplayName.slice(prefix.length)
      : rawDisplayName;
  }, [rawDisplayName, moduleName]);

  // Host-wide runtime liveness drives the deployment's pill. This is a
  // close-enough proxy until a per-deployment lease query exists — see
  // useRuntimeStatus for the polled contract.
  const runtime = useRuntimeStatus();
  const status: StatusKind =
    runtime.kind === "live"
      ? "live"
      : runtime.kind === "failed"
        ? "failed"
        : "idle";
  const statusLabel = runtime.kind === "live" ? "live" : "ready";

  return (
    <DeploymentDetailUI
      deploymentId={deploymentId}
      displayName={cleanedDisplayName}
      slug={deployment?.slug ?? null}
      moduleName={moduleName}
      status={status}
      statusLabel={statusLabel}
      tab={tab}
      onTabChange={setTab}
      onBack={onBack}
      workflow={workflow ?? null}
      workflowLoading={workflowLoading}
      extensionLayout={extensionLayout}
    />
  );
}
