import { type ReactElement, useMemo } from "react";
import { DagCanvas } from "../../components/primitives/dag_canvas";
import { Badge, type BadgeTone } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import type { StageState } from "../../domain/generate_state";
import { useGenerateOrchestration } from "../../hooks/use_generate_orchestration";
import { WORKFLOW_STAGES, type WorkflowStage } from "../../services/generate_events";
import { useGenerateRequest } from "../../store/generate_request_store";
import { buildDagGraph } from "./build_graph";
import * as styles from "./dag.css";
import { TRELLIS2_NODE_TYPES } from "./dag_node";

const STATE_TONE: Record<StageState, BadgeTone> = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning",
};

/** Friendly labels for the real worker vocab (emission order). */
const STAGE_TITLES: Record<WorkflowStage, string> = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB",
};

export function DagView(): ReactElement {
  const { params, generate } = useGenerateRequest();
  const { busy, blocked, submit, cancel } = useGenerateOrchestration();
  const textureEnabled = Boolean(params.texture);

  const graph = useMemo(
    () => buildDagGraph({ stageStates: generate.stageStates, textureEnabled }),
    [generate.stageStates, textureEnabled],
  );

  const visibleStages = WORKFLOW_STAGES.filter(
    (stage) => stage !== "texture" || textureEnabled,
  );

  return (
    <div className={styles.layout}>
      <div className={styles.canvasWrap}>
        <DagCanvas
          nodes={graph.nodes}
          edges={graph.edges}
          nodeTypes={TRELLIS2_NODE_TYPES}
          ariaLabel="TRELLIS 2 image-to-3D workflow graph"
        />
      </div>

      <div className={styles.side}>
        <Panel
          elevation="raised"
          title="Workflow"
          description="load → encode → sparse → shape → texture → decode → glb. Live state mirrors the worker."
        >
          <div className={styles.stageList}>
            {visibleStages.map((stage, index) => (
              <div className={styles.stageRow} key={stage}>
                <span className={styles.stageName}>
                  <span className={styles.stageIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{STAGE_TITLES[stage]}</span>
                </span>
                <Badge tone={STATE_TONE[generate.stageStates[stage]]}>
                  {generate.stageStates[stage]}
                </Badge>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            {busy ? (
              <Button variant="danger" onClick={() => void cancel()}>
                Cancel generation
              </Button>
            ) : (
              <Button onClick={() => void submit()} disabled={blocked}>
                Generate
              </Button>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
