import type { ReactNode } from "react";
import * as css from "./empty_state.css";

interface EmptyStateProps {
  count?: ReactNode;
  title: ReactNode;
  hint?: ReactNode;
}

export function EmptyState({ count = "0", title, hint }: EmptyStateProps): JSX.Element {
  return (
    <div className={css.root}>
      <span className={css.glyph} aria-hidden="true">
        {count}
      </span>
      <p className={css.title}>{title}</p>
      {hint ? <p className={css.hint}>{hint}</p> : null}
    </div>
  );
}
