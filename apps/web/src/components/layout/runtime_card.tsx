import type { ReactNode } from "react";
import * as styles from "./backend_styles.css";
import * as layoutStyles from "./layout_styles.css";

type RuntimeField = {
  label: string;
  value: string;
};

type RuntimeCardProps = {
  title?: string;
  fields?: RuntimeField[];
  children?: ReactNode;
};

export function RuntimeCard({
  title = "Runtime",
  fields = [],
  children,
}: RuntimeCardProps) {
  return (
    <div className={styles.runtimeCardContainer}>
      <div className={styles.runtimeCardHeader}>
        <span className={`material-symbols-outlined ${layoutStyles.accentIcon}`}>
          deployed_code
        </span>
        <span className={styles.runtimeCardTitle}>{title}</span>
      </div>
      <div className={styles.runtimeCardBody}>
        {fields.map((field, i) => (
          <div key={i} className={styles.runtimeField}>
            <span className={styles.runtimeFieldLabel}>{field.label}</span>
            <span className={styles.runtimeFieldValue}>{field.value}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
