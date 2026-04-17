import { useMemo, useState } from "react";
import type { LayoutSummary, ModuleSummary } from "../../../api/client";
import {
  useDeployment,
  useLayouts,
  useModules,
  useWorkflow,
} from "../../../hooks/use_api";
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

  return (
    <DeploymentDetailUI
      deploymentId={deploymentId}
      displayName={deployment?.display_name ?? null}
      slug={deployment?.slug ?? null}
      tab={tab}
      onTabChange={setTab}
      onBack={onBack}
      workflow={workflow ?? null}
      workflowLoading={workflowLoading}
      extensionLayout={extensionLayout}
    />
  );
}
