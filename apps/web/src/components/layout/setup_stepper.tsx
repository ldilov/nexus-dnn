import type { ReactNode } from "react";
import * as styles from "./backend_styles.css";

type Step = {
  label: string;
  status: string;
};

type SetupStepperProps = {
  steps?: Step[];
  children?: ReactNode;
};

const CIRCLE_CLASS: Record<string, string> = {
  not_started: styles.stepCircle,
  in_progress: `${styles.stepCircle} ${styles.stepCircleInProgress}`,
  completed: `${styles.stepCircle} ${styles.stepCircleCompleted}`,
  blocked: `${styles.stepCircle} ${styles.stepCircleBlocked}`,
  failed: `${styles.stepCircle} ${styles.stepCircleFailed}`,
};

function circleContent(status: string, index: number): string {
  if (status === "completed") return "\u2713";
  if (status === "failed") return "\u2717";
  return String(index + 1);
}

export function SetupStepper({ steps = [], children }: SetupStepperProps) {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, i) => {
        const isActive = step.status === "in_progress" || step.status === "completed";
        const labelCls = isActive
          ? `${styles.stepLabel} ${styles.stepLabelActive}`
          : styles.stepLabel;

        const prev = i > 0 ? steps[i - 1] : undefined;
        const prevCompleted = prev !== undefined && prev.status === "completed";
        const connectorCls = prevCompleted
          ? `${styles.stepConnector} ${styles.stepConnectorCompleted}`
          : styles.stepConnector;

        return (
          <div key={i} className={styles.stepItem}>
            {i > 0 && <div className={connectorCls} />}
            <div className={CIRCLE_CLASS[step.status] ?? styles.stepCircle}>
              {circleContent(step.status, i)}
            </div>
            <span className={labelCls}>{step.label}</span>
          </div>
        );
      })}
      {children}
    </div>
  );
}
