import type { DependencyStep } from "../../../types/extension_dependencies";
import * as s from "./plan_strip.css";

export type PlanSegmentState = "pending" | "running" | "ok" | "fail" | "partial";

export function segmentStateFor(step: DependencyStep): PlanSegmentState {
  if (step.status === "running") return "running";
  if (step.status === "failed") return "fail";
  if (step.status === "ok" || step.status === "skipped" || step.satisfied) return "ok";
  const hasPartialBytes = step.progress !== null && step.progress.current_bytes > 0;
  const hasPartialFiles = (step.files_present ?? 0) > 0;
  return hasPartialBytes || hasPartialFiles ? "partial" : "pending";
}

const SEGMENT_CLASS: Record<PlanSegmentState, string> = {
  pending: s.segPending,
  running: s.segRunning,
  ok: s.segOk,
  fail: s.segFail,
  partial: s.segPartial,
};

export interface PlanStripProps {
  steps: DependencyStep[];
}

export function PlanStrip({ steps }: PlanStripProps) {
  return (
    <div className={s.strip} aria-hidden="true" data-testid="plan-strip">
      {steps.map((step) => {
        const state = segmentStateFor(step);
        return (
          <span
            key={step.id}
            className={`${s.seg} ${SEGMENT_CLASS[state]}`}
            data-state={state}
          />
        );
      })}
    </div>
  );
}
