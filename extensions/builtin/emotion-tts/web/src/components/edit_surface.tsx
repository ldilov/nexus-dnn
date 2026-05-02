import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import {
  actions as actionsStyle,
  header as headerStyle,
  meta as metaStyle,
  rootVariant,
  titleStyle,
  type EditSurfaceVariant,
} from "./edit_surface.css";

export type { EditSurfaceVariant };

const VariantContext = createContext<EditSurfaceVariant>("standalone");

interface EditSurfaceProps {
  variant?: EditSurfaceVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "data-testid"?: string;
}

export function EditSurface({
  variant = "standalone",
  children,
  className,
  style,
  ...rest
}: EditSurfaceProps): JSX.Element {
  const cls = [rootVariant[variant], className].filter(Boolean).join(" ");
  return (
    <VariantContext.Provider value={variant}>
      <div className={cls} style={style} {...rest}>
        {children}
      </div>
    </VariantContext.Provider>
  );
}

interface EditSurfaceHeaderProps {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleId?: string;
}

export function EditSurfaceHeader({
  title,
  meta,
  children,
  className,
  titleId,
}: EditSurfaceHeaderProps): JSX.Element {
  const variant = useContext(VariantContext);
  const cls = [headerStyle, className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <h3 id={titleId} className={titleStyle[variant]}>
        {title}
      </h3>
      {meta ? <span className={metaStyle}>{meta}</span> : null}
      {children}
    </div>
  );
}

interface EditSurfaceActionsProps {
  children: ReactNode;
  className?: string;
}

export function EditSurfaceActions({ children, className }: EditSurfaceActionsProps): JSX.Element {
  const cls = [actionsStyle, className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
