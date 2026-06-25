import { type ReactElement, useMemo } from "react";
import { DagCanvas } from "../../components/primitives/dag_canvas";
import { Badge, type BadgeTone } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import type { StageState } from "../../domain/generate_state";
import { useGenerateOrchestration } from "../../hooks/use_generate_orchestration";
import { PIPELINE_STAGES } from "../../services/generate_events";
import { useGenerateRequest } from "../../store/generate_request_store";
import { buildPipelineGraph } from "./build_graph";
import { TRELLIS2_NODE_TYPES } from "./pipeline_node";
import * as styles from "./pipeline.css";

const STATE_TONE: Record<StageState, BadgeTone> = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning",
};

const STAGE_TITLES: Record<string, string> = {
  preprocess: "Preprocess",
  dinov3: "DINOv3",
  sparse: "Sparse structure",
  shape: "Shape",
  decode: "Decode",
  mesh: "Mesh",
  texture: "Texture",
  glb: "Export GLB",
};

export function PipelineView(): ReactElement {
  const { params, generate } = useGenerateRequest();
  const { busy, blocked, submit, cancel } = useGenerateOrchestration();
  const textureEnabled = Boolean(params.texture);

  const graph = useMemo(
    () =>
      buildPipelineGraph({ stageStates: generate.stageStates, textureEnabled }),
    [generate.stageStates, textureEnabled],
  );

  const visibleStages = PIPELINE_STAGES.filter(
    (stage) => stage !== "texture" || textureEnabled,
  );

  return (
    <div className={styles.layout}>
      <div className={styles.canvasWrap}>
        <DagCanvas
          nodes={graph.nodes}
          edges={graph.edges}
          nodeTypes={TRELLIS2_NODE_TYPES}
          ariaLabel="TRELLIS 2 generation pipeline"
        />
      </div>

      <div className={styles.side}>
        <Panel
          elevation="raised"
          title="Workflow"
          description="preprocess → dinov3 → sparse → shape → decode → mesh → glb. Live state mirrors the worker."
        >
          <div className={styles.stageList}>
            {visibleStages.map((stage) => (
              <div className={styles.stageRow} key={stage}>
                <span>{STAGE_TITLES[stage]}</span>
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
