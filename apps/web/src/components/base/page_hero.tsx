import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import {
  hero,
  heroRow,
  heroTitle,
  heroMeta,
  heroActions,
} from "./page_hero.css";

interface PageHeroProps {
  eyebrow?: ReactNode;
  eyebrowAccent?: boolean;
  title: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}

export function PageHero({ eyebrow: eyebrowText, eyebrowAccent, title, meta, actions }: PageHeroProps) {
  return (
    <header className={hero}>
      {eyebrowText ? <Eyebrow accent={eyebrowAccent}>{eyebrowText}</Eyebrow> : null}
      <div className={heroRow}>
        <h1 className={heroTitle}>{title}</h1>
        {actions ? <div className={heroActions}>{actions}</div> : null}
      </div>
      {meta ? <div className={heroMeta}>{meta}</div> : null}
    </header>
  );
}
