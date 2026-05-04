import { useEffect, useState } from "react";

type ScrollTarget = Window | HTMLElement;

function readScrollTop(target: ScrollTarget): number {
  if (target === window) {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }
  return (target as HTMLElement).scrollTop;
}

function collectScrollTargets(): ScrollTarget[] {
  const out: ScrollTarget[] = [window];
  if (typeof document === "undefined") return out;
  let el: HTMLElement | null = document.querySelector("emotion-tts-app");
  while (el) {
    const style = window.getComputedStyle(el);
    if (
      /(auto|scroll|overlay)/.test(style.overflowY) ||
      /(auto|scroll|overlay)/.test(style.overflow)
    ) {
      out.push(el);
    }
    el = el.parentElement;
  }
  return out;
}

export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  const targets = collectScrollTargets();
  for (const t of targets) {
    if (t === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      (t as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

/**
 * Returns true once the active scroll container has moved past `threshold`.
 * The recipe lives inside a stack of host panels (custom element → panel
 * iframe → app_canvasContent) and any of them could own the active scrollbar
 * depending on layout. Listening on all of them is robust to host shell
 * changes.
 */
export function useScrollPastThreshold(threshold: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const targets = collectScrollTargets();

    const update = (): void => {
      const maxScroll = targets.reduce<number>((acc, t) => {
        const v = readScrollTop(t);
        return v > acc ? v : acc;
      }, 0);
      setPast(maxScroll > threshold);
    };

    update();
    const opts: AddEventListenerOptions = { passive: true };
    for (const t of targets) {
      t.addEventListener("scroll", update, opts);
    }
    return () => {
      for (const t of targets) {
        t.removeEventListener("scroll", update, opts);
      }
    };
  }, [threshold]);
  return past;
}

export const STICKY_BAR_THRESHOLD = 360;
