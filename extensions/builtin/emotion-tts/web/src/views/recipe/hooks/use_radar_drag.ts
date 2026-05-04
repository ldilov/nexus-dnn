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

export interface SurfacePing {
  /** Local x in SVG user-units (0..size). */
  x: number;
  /** Local y in SVG user-units (0..size). */
  y: number;
  /** Strictly increasing key so consumers can re-trigger the same animation. */
  key: number;
}

export interface UseRadarDragResult {
  liveVec: EmotionVec;
  activeAxis: AxisKey | null;
  setActiveAxis: (axis: AxisKey | null) => void;
  onPointerDown: (axis: AxisKey, event: React.PointerEvent<SVGElement>) => void;
  onKeyDown: (axis: AxisKey, event: React.KeyboardEvent<SVGElement>) => void;
  onSurfacePointerDown: (event: React.PointerEvent<SVGElement>) => void;
  /** Most recent valid surface-click projection, for visual feedback. */
  surfacePing: SurfacePing | null;
}

const KEYBOARD_STEP = 0.05;
const KEYBOARD_PAGE = 0.2;
/** Max angular distance (deg) from an axis spoke for a click to count. Matches the design reference. */
const INFLUENCE_CONE_DEG = 22;
/** How long the surface-click ping stays mounted before auto-clearing. */
const SURFACE_PING_LIFETIME_MS = 320;
/** Visual axis tips render at (size/2) * AXIS_RADIUS_FRACTION (matches etts_radar.tsx). */
const AXIS_RADIUS_FRACTION = 0.78;

/** Project (dx, dy) onto the unit vector at axisAngleRad and normalise by axisRadius. */
function projectAxisValue(dx: number, dy: number, axisAngleRad: number, axisRadius: number): number {
  const ux = Math.cos(axisAngleRad);
  const uy = Math.sin(axisAngleRad);
  const proj = dx * ux + dy * uy;
  return Math.max(0, Math.min(1, proj / axisRadius));
}

function axisAngleFor(axis: AxisKey): number {
  const i = AXIS_KEYS.indexOf(axis);
  return (i / AXIS_KEYS.length) * Math.PI * 2 - Math.PI / 2;
}

export function useRadarDrag(options: UseRadarDragOptions): UseRadarDragResult {
  const { vec, onChange, size, reduceMotion = false } = options;
  const [liveVec, setLiveVec] = useState<EmotionVec>(vec);
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const [surfacePing, setSurfacePing] = useState<SurfacePing | null>(null);
  const draggingRef = useRef<{ axis: AxisKey; pointerId: number; centerX: number; centerY: number; angle: number } | null>(null);
  const liveVecRef = useRef<EmotionVec>(vec);
  const reduceMotionRef = useRef(reduceMotion);
  const pingTimerRef = useRef<number | null>(null);
  const pingKeyRef = useRef(0);
  reduceMotionRef.current = reduceMotion;

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
      if (reduceMotionRef.current) return;
      const dx = event.clientX - drag.centerX;
      const dy = event.clientY - drag.centerY;
      const axisRadius = (size / 2) * AXIS_RADIUS_FRACTION;
      const value = projectAxisValue(dx, dy, drag.angle, axisRadius);
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
      if (reduceMotionRef.current) {
        const dx = event.clientX - drag.centerX;
        const dy = event.clientY - drag.centerY;
        const axisRadius = (size / 2) * AXIS_RADIUS_FRACTION;
        const value = projectAxisValue(dx, dy, drag.angle, axisRadius);
        const final = { ...liveVecRef.current, [drag.axis]: value };
        draggingRef.current = null;
        commit(final);
        return;
      }
      draggingRef.current = null;
      commit(liveVecRef.current);
    },
    [commit, handlePointerMove, size],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      draggingRef.current = null;
      if (pingTimerRef.current !== null) {
        window.clearTimeout(pingTimerRef.current);
        pingTimerRef.current = null;
      }
    };
  }, [handlePointerMove, handlePointerUp]);

  const triggerSurfacePing = useCallback((x: number, y: number) => {
    if (reduceMotionRef.current) return;
    pingKeyRef.current += 1;
    setSurfacePing({ x, y, key: pingKeyRef.current });
    if (pingTimerRef.current !== null) {
      window.clearTimeout(pingTimerRef.current);
    }
    pingTimerRef.current = window.setTimeout(() => {
      setSurfacePing(null);
      pingTimerRef.current = null;
    }, SURFACE_PING_LIFETIME_MS);
  }, []);

  const beginDrag = useCallback(
    (
      axis: AxisKey,
      pointerId: number,
      svg: SVGSVGElement,
      initialClientX?: number,
      initialClientY?: number,
    ) => {
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleIndex = AXIS_KEYS.indexOf(axis);
      const angle = (angleIndex / AXIS_KEYS.length) * Math.PI * 2 - Math.PI / 2;
      draggingRef.current = {
        axis,
        pointerId,
        centerX,
        centerY,
        angle,
      };
      setActiveAxis(axis);
      if (initialClientX !== undefined && initialClientY !== undefined) {
        const dx = initialClientX - centerX;
        const dy = initialClientY - centerY;
        const axisRadius = (size / 2) * AXIS_RADIUS_FRACTION;
        const value = projectAxisValue(dx, dy, angle, axisRadius);
        const next = { ...liveVecRef.current, [axis]: value };
        if (reduceMotionRef.current) {
          commit(next);
        } else {
          updateLive(next);
        }
      }
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    },
    [commit, handlePointerMove, handlePointerUp, size, updateLive],
  );

  const onPointerDown = useCallback(
    (axis: AxisKey, event: React.PointerEvent<SVGElement>) => {
      event.preventDefault();
      const target = event.currentTarget;
      const ownerSvg = target.ownerSVGElement ?? (target as unknown as SVGSVGElement);
      beginDrag(axis, event.pointerId, ownerSvg);
    },
    [beginDrag],
  );

  const onSurfacePointerDown = useCallback(
    (event: React.PointerEvent<SVGElement>) => {
      const target = event.currentTarget;
      const svg =
        target instanceof SVGSVGElement
          ? target
          : (target.ownerSVGElement ?? (target as unknown as SVGSVGElement));
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 8) return;
      let pointerAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      pointerAngle = ((pointerAngle + 90) % 360 + 360) % 360;
      let nearest: AxisKey | null = null;
      let bestDelta = 999;
      for (let i = 0; i < AXIS_KEYS.length; i++) {
        const axis = AXIS_KEYS[i];
        if (!axis) continue;
        const axisAngleDeg = (i / AXIS_KEYS.length) * 360;
        const delta = Math.abs(((axisAngleDeg - pointerAngle + 540) % 360) - 180);
        if (delta < bestDelta) {
          bestDelta = delta;
          nearest = axis;
        }
      }
      if (!nearest) return;
      // Dead-zone: clicks more than INFLUENCE_CONE_DEG off any spoke are ignored,
      // matching the design reference. No ping, no value update — avoids the
      // "I clicked the gap, why did Sad change?" surprise.
      if (bestDelta > INFLUENCE_CONE_DEG) return;
      event.preventDefault();
      // Convert client→SVG-local coords for the ping. The viewBox matches `size`
      // and the SVG has no transform, so a uniform scale by rect width is correct.
      const localX = ((event.clientX - rect.left) / rect.width) * size;
      const localY = ((event.clientY - rect.top) / rect.height) * size;
      triggerSurfacePing(localX, localY);
      beginDrag(nearest, event.pointerId, svg, event.clientX, event.clientY);
    },
    [beginDrag, size, triggerSurfacePing],
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
    onSurfacePointerDown,
    surfacePing,
  };
}
