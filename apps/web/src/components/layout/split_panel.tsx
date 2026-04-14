import type { ReactNode } from "react";
import * as styles from "./layout_styles.css";

type SplitPanelProps = {
  direction?: "horizontal" | "vertical";
  sizes?: (string | number)[];
  children: ReactNode[];
};

function parseSizeValue(size: string | number): string {
  if (typeof size === "number") {
    return `${size}px`;
  }
  return size;
}

export function SplitPanel({ direction = "horizontal", sizes = [], children }: SplitPanelProps) {
  const cls = direction === "vertical"
    ? `${styles.splitPanel} ${styles.splitPanelVertical}`
    : styles.splitPanel;

  return (
    <div className={cls}>
      {children.map((child, i) => {
        const sizeVal = sizes[i];
        const flex = sizeVal !== undefined ? `0 0 ${parseSizeValue(sizeVal)}` : "1 1 0%";
        const width = sizeVal !== undefined && direction === "horizontal"
          ? parseSizeValue(sizeVal)
          : undefined;
        const height = sizeVal !== undefined && direction === "vertical"
          ? parseSizeValue(sizeVal)
          : undefined;

        return (
          <div
            key={i}
            className={styles.splitPanelChild}
            style={{
              flex: sizeVal === "1fr" ? "1 1 0%" : flex,
              width: sizeVal === "1fr" ? undefined : width,
              height: sizeVal === "1fr" ? undefined : height,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
