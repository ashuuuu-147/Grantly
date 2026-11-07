import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * GRANTLY 3D FLOATING SPHERES - PHASE 13
 * Reusable spheres with multi-stop radial illumination, ambient shadows,
 * specular highlights, and slow, tranquil floating motion.
 */

export const PeachSphere = ({
  size = 'w-32 h-32',
  className = '',
  floatDuration = 11,
  style = {},
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`sphere-3d sphere-peach ${size} ${shouldReduceMotion ? '' : 'animate-float-a'} ${className}`}
      style={{ animationDuration: `${floatDuration}s`, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};

export const IvorySphere = ({
  size = 'w-28 h-28',
  className = '',
  floatDuration = 13,
  style = {},
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`sphere-3d sphere-ivory ${size} ${shouldReduceMotion ? '' : 'animate-float-b'} ${className}`}
      style={{ animationDuration: `${floatDuration}s`, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};

export const CoralSphere = ({
  size = 'w-20 h-20',
  className = '',
  floatDuration = 9,
  style = {},
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`sphere-3d sphere-coral ${size} ${shouldReduceMotion ? '' : 'animate-float-gentle'} ${className}`}
      style={{ animationDuration: `${floatDuration}s`, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};

export const GoldSphere = ({
  size = 'w-24 h-24',
  className = '',
  floatDuration = 14,
  style = {},
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`sphere-3d sphere-gold ${size} ${shouldReduceMotion ? '' : 'animate-float-a'} ${className}`}
      style={{ animationDuration: `${floatDuration}s`, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};

/**
 * AmbientSpheresCluster
 * Ready-to-use 4-sphere constellation with depth layering.
 */
export const AmbientSpheresCluster = ({ className = '', density = 'full' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}>
      {/* 1. Large Peach Sphere (Top-Right) */}
      <PeachSphere
        size="w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48"
        className="-top-8 right-6 sm:right-16 md:right-28 opacity-90 shadow-2xl"
        floatDuration={11}
      />

      {/* 2. Translucent Ivory Glass Sphere (Left-Center) */}
      <IvorySphere
        size="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
        className="top-36 -left-6 sm:left-4 md:left-12 opacity-85"
        floatDuration={13}
      />

      {density === 'full' && (
        <>
          {/* 3. Coral-Pink Sphere (Bottom-Left) */}
          <CoralSphere
            size="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22"
            className="bottom-24 left-8 sm:left-24 opacity-80"
            floatDuration={9}
          />

          {/* 4. Soft Golden Sphere (Bottom-Right) */}
          <GoldSphere
            size="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
            className="top-2/3 -right-6 sm:right-8 lg:right-20 opacity-75"
            floatDuration={14}
          />
        </>
      )}
    </div>
  );
};

export default {
  PeachSphere,
  IvorySphere,
  CoralSphere,
  GoldSphere,
  AmbientSpheresCluster,
};

