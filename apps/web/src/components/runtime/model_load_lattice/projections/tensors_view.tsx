import { LatticeUi, type LatticeUiProps } from "../lattice.ui";
import * as styles from "./projections.css";

export interface TensorsViewProps {
  ui: LatticeUiProps;
}

export function TensorsView({ ui }: TensorsViewProps) {
  return (
    <div className={styles.tensorsHost}>
      <LatticeUi {...ui} />
    </div>
  );
}
