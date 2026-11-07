/**
 * GRANTLY GLOBAL MOTION DESIGN SYSTEM
 * Natural spring curves, fluid easings, and accessible motion tokens.
 */

export const transitions = {
  micro: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  card: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  entrance: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  page: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  modal: { type: 'spring', damping: 25, stiffness: 350 },
  springQuick: { type: 'spring', damping: 20, stiffness: 300 },
  springBouncy: { type: 'spring', damping: 15, stiffness: 220 },
};

// 1. Fade In
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.entrance },
  exit: { opacity: 0, transition: transitions.micro },
};

// 2. Fade Up
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: transitions.entrance },
  exit: { opacity: 0, y: 8, transition: transitions.micro },
};

// 3. Fade Down
export const fadeDown = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0, transition: transitions.entrance },
  exit: { opacity: 0, y: -8, transition: transitions.micro },
};

// 4. Slide Left (From Right to Left)
export const slideLeft = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: transitions.entrance },
  exit: { opacity: 0, x: -24, transition: transitions.card },
};

// 5. Slide Right (From Left to Right)
export const slideRight = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition: transitions.entrance },
  exit: { opacity: 0, x: 24, transition: transitions.card },
};

// 6. Scale In
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: transitions.springQuick },
  exit: { opacity: 0, scale: 0.95, transition: transitions.micro },
};

// 7. Stagger Container & Stagger Item
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0.05) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: transitions.entrance },
};

// 8. Blur Reveal (Blur-to-Clear effect)
export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 10 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, filter: 'blur(6px)', transition: transitions.micro },
};

// 9. Page Transition
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitions.page },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// 10. Modal Transition
export const modalTransition = {
  initial: { opacity: 0, scale: 0.94, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: transitions.modal },
  exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.2 } },
};

// 11. Drawer Transition (Mobile Navigation / Side Panels)
export const drawerTransition = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] } },
};

export default {
  transitions,
  fadeIn,
  fadeUp,
  fadeDown,
  slideLeft,
  slideRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  blurReveal,
  pageTransition,
  modalTransition,
  drawerTransition,
};

