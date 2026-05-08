/**
 * Spec 042 — CursorRoot wrapper (T065 + T068).
 *
 * Single mount point at the application root. Reads the focused-block
 * id from `useFocusedBlockId()` and the live activity level from
 * `useSystemActivity()` and forwards both to the prop-driven `Cursor`
 * primitive. The Cursor itself stays unaware of either source — see
 * `cursor.tsx` for the visual layer.
 *
 * The dev-mode singleton invariant check still lives inside `Cursor`
 * (T068 verification target). Any consumer rendering more than one
 * `<CursorRoot />` will trip that warning.
 */

import { type ReactElement, useEffect, useRef, useState } from "react";
import { Cursor } from "./cursor";
import { useSystemActivity } from "../../hooks/use_system_activity";
import { useFocusedBlockId } from "../../hooks/use_focused_block";
import { cursorRootMount } from "./cursor_root.css";

interface CursorAnchor {
  left: number;
  top: number;
}

function readBlockAnchor(blockId: string): CursorAnchor | null {
  if (typeof document === "undefined") return null;
  const selector = `[data-block-id="${cssEscape(blockId)}"]`;
  const block = document.querySelector(selector);
  if (block === null) return null;
  const rect = (block as HTMLElement).getBoundingClientRect();
  return {
    left: rect.left + 8,
    top: rect.top + 8,
  };
}

function cssEscape(value: string): string {
  if (typeof window !== "undefined" && typeof window.CSS?.escape === "function") {
    return window.CSS.escape(value);
  }
  return value.replace(/(["\\])/g, "\\$1");
}

export function CursorRoot(): ReactElement | null {
  const focusedBlockId = useFocusedBlockId();
  const activityLevel = useSystemActivity();
  const [anchor, setAnchor] = useState<CursorAnchor | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (focusedBlockId === null) {
      setAnchor(null);
      return;
    }
    const update = (): void => {
      const next = readBlockAnchor(focusedBlockId);
      setAnchor((prev) => {
        if (prev === null && next === null) return prev;
        if (prev !== null && next !== null && prev.left === next.left && prev.top === next.top) {
          return prev;
        }
        return next;
      });
    };
    update();
    const onScroll = (): void => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [focusedBlockId]);

  if (focusedBlockId === null || anchor === null) {
    return <Cursor ownerBlockId={null} activityLevel={activityLevel} />;
  }

  return (
    <div
      className={cursorRootMount}
      style={{ left: anchor.left, top: anchor.top }}
      data-cursor-root=""
    >
      <Cursor ownerBlockId={focusedBlockId} activityLevel={activityLevel} />
    </div>
  );
}
