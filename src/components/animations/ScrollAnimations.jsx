import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * GRANTLY SCROLL ANIMATION SUITE - PHASE 13
 * 
 * Failsafe Rule:
 * If prefers-reduced-motion is active or viewport measurement is constrained,
 * all content renders immediately at full opacity without transform delay.
 */

const EASINGS = {
  smooth: [0.16, 1, 0.3, 1],
  spring: [0.25, 0.1, 0.25, 1],
  gentle: [0.22, 1, 0.36, 1],
};

/**
 * 1. ScrollReveal Component
 * General scroll-triggered reveal with selectable variants.
 */
export const ScrollReveal = ({
  children,
  variant = 'fadeUp', // 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' | 'blur' | 'fadeIn'
  delay = 0,
  duration = 0.45,
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    switch (variant) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 22 },
          visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASINGS.smooth } },
        };
      case 'fadeDown':
        return {
          hidden: { opacity: 0, y: -22 },
          visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASINGS.smooth } },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 28 },
          visible: { opacity: 1, x: 0, transition: { duration, delay, ease: EASINGS.smooth } },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -28 },
          visible: { opacity: 1, x: 0, transition: { duration, delay, ease: EASINGS.smooth } },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: EASINGS.spring } },
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(6px)', y: 12 },
          visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: duration + 0.1, delay, ease: EASINGS.smooth } },
        };
      case 'fadeIn':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay, ease: EASINGS.gentle } },
        };
    }
  };

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * 2. FadeInOnScroll
 */
export const FadeInOnScroll = ({ children, delay = 0, duration = 0.4, threshold = 0.15, className = '', ...props }) => (
  <ScrollReveal variant="fadeIn" delay={delay} duration={duration} threshold={threshold} className={className} {...props}>
    {children}
  </ScrollReveal>
);

/**
 * 3. SlideUpOnScroll
 */
export const SlideUpOnScroll = ({ children, delay = 0, duration = 0.45, threshold = 0.15, className = '', ...props }) => (
  <ScrollReveal variant="fadeUp" delay={delay} duration={duration} threshold={threshold} className={className} {...props}>
    {children}
  </ScrollReveal>
);

/**
 * 4. StaggerReveal & StaggerRevealItem
 * Stagger entrance for card collections (Scholarships, Stats, Milestones)
 */
export const StaggerReveal = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.04,
  threshold = 0.15,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerRevealItem = ({ children, className = '', ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASINGS.smooth },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

/**
 * 5. BlurReveal
 */
export const BlurReveal = ({ children, delay = 0, duration = 0.5, threshold = 0.15, className = '', ...props }) => (
  <ScrollReveal variant="blur" delay={delay} duration={duration} threshold={threshold} className={className} {...props}>
    {children}
  </ScrollReveal>
);

/**
 * 6. ParallaxElement
 * Creates subtle, controlled scroll-based vertical parallax movement.
 * Automatically disabled on small mobile screens (<768px) and when reduced motion is preferred.
 */
export const ParallaxElement = ({
  children,
  speed = 0.15, // positive = drifts up; negative = drifts down
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate subtle shift range (e.g. -25px to 25px)
  const range = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (shouldReduceMotion || isMobile || !isClient) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...props}>
      {children}
    </motion.div>
  );
};

/**
 * 7. ScrollProgressBar
 * Thin coral progress bar fixed at the very top of the window.
 * Non-blocking, smooth spring motion.
 */
export const ScrollProgressBar = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 450,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--coral)] via-[var(--primary)] to-[var(--gold)] z-50 origin-left pointer-events-none shadow-[0_0_8px_rgba(242,140,120,0.5)] ${className}`}
      aria-hidden="true"
    />
  );
};

export default {
  ScrollReveal,
  FadeInOnScroll,
  SlideUpOnScroll,
  StaggerReveal,
  StaggerRevealItem,
  BlurReveal,
  ParallaxElement,
  ScrollProgressBar,
};

