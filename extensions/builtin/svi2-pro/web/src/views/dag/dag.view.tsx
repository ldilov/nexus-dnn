import { type ReactElement, useMemo } from "react";
import { Badge, type BadgeTone } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DagCanvas } from "../../components/primitives/dag_canvas";
import { Panel } from "../../components/ui/panel";
import { PIPELINE_STAGES, type StageState } from "../../domain/render_state";
import { useRenderRequest } from "../../store/render_request_store";
import { useRenderOrchestration } from "../recipe/hooks/use_render_orchestration";
import { buildPipelineGraph } from "./build_graph";
import { SVI2_NODE_TYPES } from "./nodes/pipeline_node";
import * as styles from "./dag.css";

const STATE_TONE: Record<StageState, BadgeTone> = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning",
};

const STAGE_TITLES: Record<string, string> = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux",
};

export function DagView(): ReactElement {
  const { render, params, qwenEdit } = useRenderRequest();
  const { busy, blocked, submit, cancel } = useRenderOrchestration();

  const graph = useMemo(
    () => buildPipelineGraph({ render, params, qwenEditEnabled: qwenEdit.enabled }),
    [render, params, qwenEdit.enabled],
  );

  const visibleStages = PIPELINE_STAGES.filter(
    (stage) => stage !== "qwen_edit" || qwenEdit.enabled,
  );

  return (
    <div className={styles.layout}>
      <div className={styles.canvasWrap}>
        <DagCanvas
          nodes={graph.nodes}
          edges={graph.edges}
          nodeTypes={SVI2_NODE_TYPES}
          ariaLabel="SVI 2.0 Pro render pipeline"
        />
      </div>

      <div className={styles.side}>
        <Panel
          elevation="raised"
          title="Pipeline"
          description="anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render."
        >
          <div className={styles.stageList}>
            {visibleStages.map((stage) => (
              <div className={styles.stageRow} key={stage}>
                <span>{STAGE_TITLES[stage]}</span>
                <Badge tone={STATE_TONE[render.stageStates[stage]]}>
                  {render.stageStates[stage]}
                </Badge>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            {busy ? (
              <Button variant="danger" onClick={() => void cancel()}>
                Cancel render
              </Button>
            ) : (
              <Button onClick={() => void submit()} disabled={blocked}>
                Render
              </Button>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
