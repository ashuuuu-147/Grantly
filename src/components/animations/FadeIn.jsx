import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, slideLeft, slideRight } from './variants';

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.35,
  direction = 'up',
  className = '',
  ...props
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return fadeUp;
      case 'left':
        return slideLeft;
      case 'right':
        return slideRight;
      case 'none':
      default:
        return fadeIn;
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
