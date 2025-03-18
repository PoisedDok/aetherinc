"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollingTextProps {
  messages: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  textClassName?: string;
  separator?: React.ReactNode;
}

export function ScrollingText({
  messages,
  direction = 'left',
  speed = 25,
  className,
  textClassName,
  separator = '•'
}: ScrollingTextProps) {
  // Combine messages with separator
  const textWithSeparators = messages.flatMap((message, index) => 
    index === messages.length - 1 
      ? [message] 
      : [message, ` ${separator} `]
  );

  // Calculate animation properties
  const distance = 1000; // The total distance to move
  const duration = distance / speed; // Duration based on speed
  const directionMultiplier = direction === 'left' ? -1 : 1;

  // Safely convert separator to string for comparison
  const separatorString = separator ? separator.toString().trim() : '';

  return (
    <div className={cn("overflow-hidden relative whitespace-nowrap", className)}>
      <motion.div
        className="inline-block"
        animate={{
          x: [0, directionMultiplier * distance]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {textWithSeparators.map((text, index) => (
          <span 
            key={index} 
            className={cn(
              "inline-block",
              typeof text === 'string' && separatorString && text.trim() === separatorString
                ? "text-gray-500 mx-2" 
                : textClassName
            )}
          >
            {text}
          </span>
        ))}
      </motion.div>
      
      {/* Duplicate for seamless loop */}
      <motion.div
        className="inline-block"
        animate={{
          x: [directionMultiplier * -distance, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {textWithSeparators.map((text, index) => (
          <span 
            key={index} 
            className={cn(
              "inline-block",
              typeof text === 'string' && separatorString && text.trim() === separatorString
                ? "text-gray-500 mx-2" 
                : textClassName
            )}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
} 