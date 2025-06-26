"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'cyber' | 'neural' | 'glass';
  glowColor?: 'cyan' | 'purple' | 'green' | 'pink';
  animated?: boolean;
}

export const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, variant = 'cyber', glowColor = 'cyan', animated = true, children, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'cyber':
          return 'card-cyber';
        case 'neural':
          return 'card-neural';
        case 'glass':
          return 'glass-panel-strong';
        default:
          return 'card-cyber';
      }
    };

    const getGlowClasses = () => {
      switch (glowColor) {
        case 'cyan':
          return 'hover:shadow-cyber-strong';
        case 'purple':
          return 'hover:shadow-[0_8px_32px_rgba(139,92,246,0.3)]';
        case 'green':
          return 'hover:shadow-[0_8px_32px_rgba(0,255,0,0.3)]';
        case 'pink':
          return 'hover:shadow-[0_8px_32px_rgba(255,0,255,0.3)]';
        default:
          return 'hover:shadow-cyber-strong';
      }
    };

    const CardComponent = animated ? motion.div : 'div';
    const motionProps = animated ? {
      whileHover: { scale: 1.02, y: -5 },
      transition: { duration: 0.3 }
    } : {};

    return (
      <CardComponent
        ref={ref}
        className={cn(
          getVariantClasses(),
          getGlowClasses(),
          'transition-all duration-300 rounded-xl p-6',
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </CardComponent>
    );
  }
);

CyberCard.displayName = 'CyberCard'; 