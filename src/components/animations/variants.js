/**
 * GRANTLY ANIMATION SYSTEM
 * Reusable Framer Motion variants tuned for a calm, premium education-fintech feel.
 */

// Custom cubic-bezier easings
export const EASINGS = {
  smooth: [0.16, 1, 0.3, 1], // easeOutExpo-like feel
  gentle: [0.25, 0.1, 0.25, 1],
  anticipate: [0.36, 0.66, 0.04, 1],
};

// Check if user prefers reduced motion (client-side safe)
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.3,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: prefersReducedMotion ? 0 : 0.2 },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.4,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -8,
    transition: { duration: 0.2 },
  },
};

export const slideLeft = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : -10,
    transition: { duration: 0.2 },
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : 10,
    transition: { duration: 0.2 },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.25,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.18 },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
      delayChildren: prefersReducedMotion ? 0 : delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: EASINGS.smooth,
    },
  },
};

export const pageTransition = {
  initial: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.3,
      ease: EASINGS.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

