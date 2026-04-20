import type { ReactNode } from "react";
import { Button } from "../button";
import { dispatchLayoutAction } from "../../layout/action_dispatch";
import * as styles from "./layout_styles.css";

type ActionDef = {
  label: string;
  icon?: string;
  action?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
};

type ActionBarProps = {
  actions?: ActionDef[];
  children?: ReactNode;
};

export function ActionBar({ actions = [], children }: ActionBarProps) {
  return (
    <div className={styles.actionBar}>
      {actions.map((action, i) => (
        <Button
          key={i}
          variant={action.variant ?? "ghost"}
          size="sm"
          disabled={action.disabled}
          data-action={action.action}
          onClick={() => {
            if (action.action) {
              void dispatchLayoutAction(action.action);
            }
          }}
        >
          {action.label}
        </Button>
      ))}
      {children}
    </div>
  );
}
