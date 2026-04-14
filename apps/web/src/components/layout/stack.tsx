import type { ReactNode } from "react";
import * as styles from "./layout_styles.css";

type StackProps = {
  gap?: string;
  children: ReactNode;
};

export function Stack({ gap, children }: StackProps) {
  return (
    <div className={styles.stack} style={gap ? { gap } : undefined}>
      {children}
    </div>
  );
}
