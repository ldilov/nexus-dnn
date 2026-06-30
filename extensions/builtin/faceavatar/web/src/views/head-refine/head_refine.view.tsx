import { type ReactElement, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import { ImageUploader } from "../generate/components/image_uploader";
import { GenerateProgress } from "../generate/components/generate_progress";
import { ExtensionApiError } from "../../services/http";
import { useGenerateRequest } from "../../store/generate_request_store";
import { BaseMeshSource } from "./components/base_mesh_source";
import { BeforeAfter } from "./components/before_after";
import { GraftControls } from "./components/graft_controls";
import { assembleGraftParams, useGraftForm } from "./use_graft_form";
import * as styles from "./head_refine.css";

export function HeadRefineView(): ReactElement {
  const { imageRef, generate, startGraft, cancelJob, resetGenerate } = useGenerateRequest();
  const graftForm = useGraftForm();
  const [baseMeshRef, setBaseMeshRef] = useState<string | null>(null);
  const [baseMeshLabel, setBaseMeshLabel] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [params] = useSearchParams();

  useEffect(() => {
    const fromUrl = params.get("baseMesh");
    if (fromUrl && !baseMeshRef) {
      setBaseMeshRef(fromUrl);
      setBaseMeshLabel(fromUrl);
    }
  }, [params, baseMeshRef]);

  const busy = generate.phase === "running";
  const blocked = !baseMeshRef || !imageRef || busy;

  const selectBase = useCallback((ref: string, label: string) => {
    setBaseMeshRef(ref);
    setBaseMeshLabel(label);
  }, []);
  const clearBase = useCallback(() => {
    setBaseMeshRef(null);
    setBaseMeshLabel(null);
  }, []);

  const submit = useCallback(async () => {
    if (!baseMeshRef || !imageRef) {
      toast.error("Pick a base mesh and upload a photo before refining.");
      return;
    }
    setSubmitting(true);
    try {
      await startGraft(baseMeshRef, imageRef, assembleGraftParams(graftForm.form));
      toast.success("Head refine started.");
    } catch (err) {
      const message =
        err instanceof ExtensionApiError ? err.message : "Could not start the head refine.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }, [baseMeshRef, imageRef, graftForm.form, startGraft]);

  const cancel = useCallback(async () => {
    try {
      await cancelJob();
    } catch {
      toast.error("Could not cancel the head refine.");
    }
  }, [cancelJob]);

  return (
    <div className={styles.view}>
      <BeforeAfter baseMeshRef={baseMeshRef} state={generate} />
      <div className={styles.layout}>
        <div className={styles.column}>
          <Panel
            eyebrow="OPERATOR · FACEAVATAR.GRAFT_HEAD"
            title="Refine head"
            description="Weld a photo's identity face onto a base mesh."
          >
            <div className={styles.section}>
              <BaseMeshSource
                value={baseMeshRef}
                label={baseMeshLabel}
                onSelect={selectBase}
                onClear={clearBase}
                disabled={busy}
              />
              <span className={styles.sectionLabel}>Identity photo</span>
              <ImageUploader />
              <span className={styles.sectionLabel}>Graft controls</span>
              <GraftControls handle={graftForm} disabled={busy} />
            </div>
            <div className={styles.submitRow}>
              <Button onClick={() => void submit()} disabled={blocked} loading={submitting}>
                Refine head
              </Button>
            </div>
          </Panel>
        </div>
        <div className={styles.column}>
          <Panel elevation="raised" title="Progress" description="Live state mirrors the worker.">
            <GenerateProgress
              state={generate}
              onCancel={() => void cancel()}
              onReset={resetGenerate}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
