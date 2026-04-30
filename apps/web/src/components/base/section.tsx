import type { ReactNode } from "react";
import {
  section,
  sectionDense,
  sectionHead,
  sectionNum,
  sectionTitle,
  sectionRight,
  sectionBody,
} from "./section.css";

interface SectionProps {
  number?: string;
  title: ReactNode;
  right?: ReactNode;
  dense?: boolean;
  children: ReactNode;
}

export function Section({ number, title, right, dense = false, children }: SectionProps) {
  const cls = [section, dense ? sectionDense : ""].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <header className={sectionHead}>
        {number ? <div className={sectionNum}>{number}</div> : null}
        <h2 className={sectionTitle}>{title}</h2>
        {right ? <div className={sectionRight}>{right}</div> : null}
      </header>
      <div className={sectionBody}>{children}</div>
    </section>
  );
}
