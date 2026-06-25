import { type ReactElement, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import { useGenerateOrchestration } from "../../hooks/use_generate_orchestration";
import { useHistory } from "../../hooks/use_history";
import { useGenerateRequest } from "../../store/generate_request_store";
import type { GenerationJob } from "../../services/types";
import { GenerateForm } from "./components/generate_form";
import { GenerateProgress } from "./components/generate_progress";
import { HistoryList } from "./components/history_list";
import { PreviewStage } from "./components/preview_stage";
import * as styles from "./generate.css";

export function GenerateView(): ReactElement {
  const { generate, resetGenerate, showJobResult } = useGenerateRequest();
  const { blocked, busy, submit, cancel } = useGenerateOrchestration();
  const history = useHistory(generate.phase);

  const handleOpen = useCallback(
    (job: GenerationJob) => {
      void showJobResult(job);
    },
    [showJobResult],
  );

  const handleDelete = useCallback(
    async (job: GenerationJob) => {
      try {
        await history.remove(job.id);
      } catch {
        toast.error("Could not delete that generation.");
        history.reload();
      }
    },
    [history],
  );

  return (
    <div className={styles.view}>
      <PreviewStage state={generate} />
      <div className={styles.layout}>
        <div className={styles.column}>
          <Panel
            eyebrow="OPERATOR · TRELLIS2.GENERATE_3D"
            title="New mesh"
            description="One image in, one watertight GLB out."
          >
            <GenerateForm />
            <div className={styles.submitRow}>
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

          <Panel elevation="raised" title="Progress" description="Live state mirrors the worker.">
            <GenerateProgress
              state={generate}
              onCancel={() => void cancel()}
              onReset={resetGenerate}
            />
          </Panel>
        </div>

        <div className={styles.column}>
          <Panel title="History" description="Past generations and their GLB downloads.">
            <HistoryList jobs={history.jobs} onOpen={handleOpen} onDelete={handleDelete} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
