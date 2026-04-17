import type { Transition } from "motion/react";

export const durations = {
  routeFast: 0.16,
  routeNormal: 0.22,
  modalShared: 0.28,
} as const;

export const easings = {
  standard: [0.4, 0, 0.2, 1],
  decel: [0, 0, 0.2, 1],
  accel: [0.4, 0, 1, 1],
} as const;

export const routeTransitionIn = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: {
    duration: durations.routeNormal,
    ease: easings.standard,
  } satisfies Transition,
} as const;

export const routeTransitionReduced = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 } satisfies Transition,
} as const;

export const sharedModalTransition = {
  duration: durations.modalShared,
  ease: easings.decel,
} satisfies Transition;
