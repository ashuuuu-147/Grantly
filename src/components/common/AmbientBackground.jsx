import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PeachSphere, IvorySphere, CoralSphere, GoldSphere } from './FloatingSpheres';

/**
 * AmbientBackground Component - PHASE 13
 * Reusable full-page or sectional 3D atmospheric background system with
 * subtle, multi-layered parallax drifting, 3D spheres, and soft lighting.
 * 
 * Layer 1: Large soft peach gradient blob
 * Layer 2: Coral ambient glow
 * Layer 3: Translucent ivory 3D sphere
 * Layer 4: Small floating coral-pink sphere
 * Layer 5: Subtle golden ambient light
 * 
 * Variants: 'hero' | 'dashboard' | 'explore' | 'eligibility' | 'applications' | 'details' | 'profile' | 'minimal'
 */
export const AmbientBackground = ({
  variant = 'hero',
  className = '',
  enableParallax = true,
  children,
}) => {
  const containerRef = useRef(null);
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
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layer Parallax Shifts (subtle, tranquil speeds)
  const canParallax = enableParallax && !shouldReduceMotion && !isMobile && isClient;
  
  // Layer 1: Large soft peach gradient blob (speed: 0.08)
  const yLayer1 = useTransform(scrollYProgress, [0, 1], canParallax ? [-20, 30] : [0, 0]);
  
  // Layer 2: Coral ambient glow (speed: 0.12)
  const yLayer2 = useTransform(scrollYProgress, [0, 1], canParallax ? [25, -35] : [0, 0]);
  
  // Layer 3: Translucent ivory 3D sphere (speed: 0.18)
  const yLayer3 = useTransform(scrollYProgress, [0, 1], canParallax ? [30, -40] : [0, 0]);
  
  // Layer 4: Small floating coral-pink sphere (speed: 0.22)
  const yLayer4 = useTransform(scrollYProgress, [0, 1], canParallax ? [-25, 35] : [0, 0]);
  
  // Layer 5: Subtle golden ambient light (speed: 0.10)
  const yLayer5 = useTransform(scrollYProgress, [0, 1], canParallax ? [15, -25] : [0, 0]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background Noise Texture */}
      <div className="background-noise absolute inset-0 -z-20 opacity-30 pointer-events-none" aria-hidden="true" />

      {/* ============================================================== */}
      {/* 1. HERO VARIANT: 5-Layer Parallax Ambient 3D Experience        */}
      {/* ============================================================== */}
      {variant === 'hero' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          {/* Layer 1: Large Soft Peach Gradient Blob */}
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow blob-glow-lg -top-32 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-[var(--coral)]/25 via-[var(--surface-secondary)]/60 to-transparent animate-blob-float opacity-75"
            aria-hidden="true"
          />

          {/* Layer 2: Coral Ambient Glow */}
          <motion.div
            style={{ y: yLayer2 }}
            className="blob-glow blob-glow-lg top-1/4 -right-24 w-[650px] h-[650px] bg-gradient-to-bl from-[var(--surface-secondary)]/70 via-[var(--peach-tint)]/50 to-[var(--gold)]/20 animate-blob-delayed opacity-70"
            aria-hidden="true"
          />

          {/* Layer 5: Subtle Golden Ambient Light */}
          <motion.div
            style={{ y: yLayer5 }}
            className="blob-glow bottom-10 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-[var(--coral)]/15 via-[var(--peach-tint)]/40 to-transparent animate-pulse-glow opacity-60"
            aria-hidden="true"
          />

          {/* Layer 3: Translucent Ivory 3D Sphere & Large Peach Sphere */}
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <PeachSphere
              size="w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48"
              className="-top-8 right-6 sm:right-16 md:right-28 opacity-90 shadow-2xl"
              floatDuration={11}
            />
            <IvorySphere
              size="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
              className="top-36 -left-6 sm:left-4 md:left-12 opacity-85"
              floatDuration={13}
            />
          </motion.div>

          {/* Layer 4: Small Floating Coral-Pink Sphere & Golden Sphere */}
          <motion.div style={{ y: yLayer4 }} className="absolute inset-0 pointer-events-none">
            <CoralSphere
              size="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
              className="bottom-24 left-8 sm:left-24 opacity-80"
              floatDuration={9}
            />
            <GoldSphere
              size="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
              className="top-2/3 -right-6 sm:right-8 lg:right-20 opacity-75"
              floatDuration={14}
            />
          </motion.div>

          {/* Subtle Grid Pattern Overlay with Center Fade Mask */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full stroke-[var(--border)]/35 [mask-image:radial-gradient(100%_90%_at_top_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern id="ambient-grid-hero" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M.5 48V.5H48" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#ambient-grid-hero)" />
          </svg>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. DASHBOARD VARIANT: Subtle Peach Glow + Parallax Depth       */}
      {/* ============================================================== */}
      {variant === 'dashboard' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-20 -right-20 w-[500px] h-[500px] bg-[var(--surface-secondary)]/50 opacity-60 animate-blob-float"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: yLayer2 }}
            className="blob-glow top-1/2 -left-28 w-[450px] h-[450px] bg-[var(--coral)]/10 opacity-50 animate-blob-delayed"
            aria-hidden="true"
          />
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <PeachSphere
              size="w-16 h-16 sm:w-24 sm:h-24"
              className="-top-6 right-8 opacity-60 hidden sm:block"
              floatDuration={10}
            />
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. EXPLORE VARIANT: Clean Cream with Soft Coral Blobs          */}
      {/* ============================================================== */}
      {variant === 'explore' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[var(--surface-secondary)]/45 via-[var(--peach-tint)]/30 to-transparent opacity-60"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: yLayer2 }}
            className="blob-glow bottom-20 -left-16 w-[400px] h-[400px] bg-[var(--coral)]/8 opacity-50"
            aria-hidden="true"
          />
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <IvorySphere
              size="w-20 h-20"
              className="top-28 right-12 opacity-45 hidden lg:block"
              floatDuration={12}
            />
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. ELIGIBILITY VARIANT: Peach Gradient with Floating Spheres   */}
      {/* ============================================================== */}
      {variant === 'eligibility' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-[var(--surface-secondary)]/65 via-[var(--peach-tint)]/45 to-transparent opacity-75 animate-blob-float"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: yLayer2 }}
            className="blob-glow top-1/2 -right-16 w-[450px] h-[450px] bg-[var(--coral)]/12 opacity-60 animate-blob-delayed"
            aria-hidden="true"
          />
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <PeachSphere
              size="w-24 h-24 sm:w-32 sm:h-32"
              className="-top-8 right-16 opacity-70"
              floatDuration={11}
            />
            <GoldSphere
              size="w-16 h-16 sm:w-20 sm:h-20"
              className="bottom-32 -left-6 opacity-60 hidden sm:block"
              floatDuration={13}
            />
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. APPLICATIONS VARIANT: Clean Cream with Subtle Blur          */}
      {/* ============================================================== */}
      {variant === 'applications' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-20 right-10 w-[450px] h-[450px] bg-[var(--peach-tint)]/40 opacity-55"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: yLayer2 }}
            className="blob-glow bottom-24 -left-10 w-[380px] h-[380px] bg-[var(--surface-secondary)]/35 opacity-40"
            aria-hidden="true"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. DETAILS / SCHOLARSHIP VARIANT: Minimal Warm Background      */}
      {/* ============================================================== */}
      {variant === 'details' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-24 right-1/3 w-[500px] h-[400px] bg-[var(--peach-tint)]/35 opacity-45"
            aria-hidden="true"
          />
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <IvorySphere
              size="w-16 h-16"
              className="top-16 right-8 opacity-35 hidden md:block"
              floatDuration={10}
            />
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. PROFILE VARIANT: Soft Peach Ambient Background              */}
      {/* ============================================================== */}
      {variant === 'profile' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-16 left-1/3 w-[450px] h-[450px] bg-[var(--surface-secondary)]/45 opacity-60"
            aria-hidden="true"
          />
          <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
            <PeachSphere
              size="w-20 h-20"
              className="top-10 right-12 opacity-50 hidden sm:block"
              floatDuration={12}
            />
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. MINIMAL VARIANT: Bare Clean Warm Cream                      */}
      {/* ============================================================== */}
      {variant === 'minimal' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
          <motion.div
            style={{ y: yLayer1 }}
            className="blob-glow -top-20 right-10 w-[350px] h-[350px] bg-[var(--peach-tint)]/25 opacity-30"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Content Layer (Always positioned relative and z-10 above decorative effects) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AmbientBackground;
