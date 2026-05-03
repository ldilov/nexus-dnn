import { useCallback, useEffect, useRef, useState } from "react";
import {
  AXIS_KEYS,
  type AxisKey,
  type EmotionVec,
  clampVec,
} from "../lib/preset_naming";

export interface UseRadarDragOptions {
  vec: EmotionVec;
  onChange: (next: EmotionVec) => void;
  size: number;
  reduceMotion?: boolean;
}

export interface UseRadarDragResult {
  liveVec: EmotionVec;
  activeAxis: AxisKey | null;
  setActiveAxis: (axis: AxisKey | null) => void;
  onPointerDown: (axis: AxisKey, event: React.PointerEvent<SVGElement>) => void;
  onKeyDown: (axis: AxisKey, event: React.KeyboardEvent<SVGElement>) => void;
}

const KEYBOARD_STEP = 0.05;
const KEYBOARD_PAGE = 0.2;

export function useRadarDrag(options: UseRadarDragOptions): UseRadarDragResult {
  const { vec, onChange, size } = options;
  const [liveVec, setLiveVec] = useState<EmotionVec>(vec);
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const draggingRef = useRef<{ axis: AxisKey; pointerId: number; centerX: number; centerY: number; angle: number } | null>(null);
  const liveVecRef = useRef<EmotionVec>(vec);

  useEffect(() => {
    setLiveVec(vec);
    liveVecRef.current = vec;
  }, [vec]);

  const commit = useCallback(
    (next: EmotionVec) => {
      const clamped = clampVec(next);
      setLiveVec(clamped);
      liveVecRef.current = clamped;
      onChange(clamped);
    },
    [onChange],
  );

  const updateLive = useCallback((next: EmotionVec) => {
    const clamped = clampVec(next);
    setLiveVec(clamped);
    liveVecRef.current = clamped;
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const drag = draggingRef.current;
      if (!drag) return;
      const dx = event.clientX - drag.centerX;
      const dy = event.clientY - drag.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = size / 2;
      const value = Math.max(0, Math.min(1, distance / radius));
      const next = { ...liveVecRef.current, [drag.axis]: value };
      updateLive(next);
    },
    [size, updateLive],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      const drag = draggingRef.current;
      if (!drag) return;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      draggingRef.current = null;
      commit(liveVecRef.current);
      void event;
    },
    [commit, handlePointerMove],
  );

  const onPointerDown = useCallback(
    (axis: AxisKey, event: React.PointerEvent<SVGElement>) => {
      event.preventDefault();
      const target = event.currentTarget;
      const ownerSvg = target.ownerSVGElement ?? (target as unknown as SVGSVGElement);
      const rect = ownerSvg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleIndex = AXIS_KEYS.indexOf(axis);
      const angle = (angleIndex / AXIS_KEYS.length) * Math.PI * 2 - Math.PI / 2;
      draggingRef.current = {
        axis,
        pointerId: event.pointerId,
        centerX,
        centerY,
        angle,
      };
      setActiveAxis(axis);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    },
    [handlePointerMove, handlePointerUp],
  );

  const onKeyDown = useCallback(
    (axis: AxisKey, event: React.KeyboardEvent<SVGElement>) => {
      const current = liveVecRef.current[axis];
      let next = current;
      switch (event.key) {
        case "ArrowUp":
        case "ArrowRight":
          next = current + KEYBOARD_STEP;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          next = current - KEYBOARD_STEP;
          break;
        case "PageUp":
          next = current + KEYBOARD_PAGE;
          break;
        case "PageDown":
          next = current - KEYBOARD_PAGE;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      setActiveAxis(axis);
      commit({ ...liveVecRef.current, [axis]: next });
    },
    [commit],
  );

  return {
    liveVec,
    activeAxis,
    setActiveAxis,
    onPointerDown,
    onKeyDown,
  };
}
