import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Button } from "./button";
import type { ButtonVariant } from "./button";
import * as s from "./overflow_menu.css";

export interface OverflowMenuItem {
  /** Stable identity for the React key and focus bookkeeping. */
  id: string;
  /** Visible label. */
  label: string;
  /** Material Symbols ligature rendered before the label, when provided. */
  icon?: string;
  /** Styles the item as a destructive action (danger tone). */
  danger?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export interface OverflowMenuProps {
  /** Accessible name for the trigger and the menu. */
  label: string;
  /** Material Symbols ligature for the trigger. Defaults to `more_horiz`. */
  triggerIcon?: string;
  triggerVariant?: ButtonVariant;
  /** Optional visible trigger text; omit for an icon-only trigger. */
  triggerText?: ReactNode;
  items: readonly OverflowMenuItem[];
  className?: string;
}

/**
 * Generic "More" overflow menu — a trigger plus a floating glass dropdown of
 * actions. Fully keyboard-accessible: opens on click/Enter/Space, roves with
 * Arrow/Home/End, closes on Escape (restoring focus to the trigger) and on
 * outside click. Carries no domain knowledge; callers pass plain item descriptors.
 */
export function OverflowMenu({
  label,
  triggerIcon = "more_horiz",
  triggerVariant = "secondary",
  triggerText,
  items,
  className,
}: OverflowMenuProps): ReactNode {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Move keyboard focus into the menu once it opens, landing on the first
  // enabled item per the ARIA menu pattern (falls back to index 0).
  useEffect(() => {
    if (!open) return;
    const firstEnabled = items.findIndex((item) => !item.disabled);
    itemRefs.current[firstEnabled === -1 ? 0 : firstEnabled]?.focus();
  }, [open, items]);

  // Step from `from` in `dir` (+1/-1) to the nearest enabled item, wrapping
  // around. Returns -1 when no item is enabled.
  const enabledIndexFrom = useCallback(
    (from: number, dir: 1 | -1) => {
      const count = items.length;
      for (let step = 1; step <= count; step += 1) {
        const idx = (((from + dir * step) % count) + count) % count;
        if (!items[idx]?.disabled) return idx;
      }
      return -1;
    },
    [items],
  );

  const focusIndex = useCallback((index: number) => {
    if (index >= 0) itemRefs.current[index]?.focus();
  }, []);

  const onMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const current = itemRefs.current.findIndex(
        (el) => el === document.activeElement,
      );
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusIndex(enabledIndexFrom(current, 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          focusIndex(enabledIndexFrom(current, -1));
          break;
        case "Home":
          event.preventDefault();
          // From just-before-first, stepping forward yields the first enabled.
          focusIndex(enabledIndexFrom(-1, 1));
          break;
        case "End":
          event.preventDefault();
          // From just-after-last, stepping backward yields the last enabled.
          focusIndex(enabledIndexFrom(items.length, -1));
          break;
        case "Escape":
          event.preventDefault();
          close(true);
          break;
        case "Tab":
          close(false);
          break;
        default:
          break;
      }
    },
    [close, enabledIndexFrom, focusIndex, items.length],
  );

  // Drop stale slots so a shrunk `items` list never leaves dangling refs.
  itemRefs.current.length = items.length;

  return (
    <div className={[s.wrap, className].filter(Boolean).join(" ")} ref={wrapRef}>
      <Button
        ref={triggerRef}
        type="button"
        variant={triggerVariant}
        size="sm"
        iconOnly={!triggerText}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`material-symbols-outlined ${s.triggerIcon}`}
          aria-hidden="true"
        >
          {triggerIcon}
        </span>
        {triggerText}
      </Button>

      {open && (
        <div
          id={menuId}
          className={s.menu}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={[s.item, item.danger ? s.itemDanger : null]
                .filter(Boolean)
                .join(" ")}
              role="menuitem"
              type="button"
              tabIndex={-1}
              disabled={item.disabled}
              onClick={() => {
                item.onSelect();
                close(true);
              }}
            >
              {item.icon && (
                <span
                  className={`material-symbols-outlined ${s.itemIcon}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
