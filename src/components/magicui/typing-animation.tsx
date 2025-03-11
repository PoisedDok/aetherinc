"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  /** An array of phrases to type out in sequence. */
  phrases: string[];

  /** Optional styles/class names to be applied to the container. */
  className?: string;

  /** Delay (in ms) before typing begins (default: 0). */
  delay?: number;

  /** Typing speed in ms per character (default: 100). */
  duration?: number;

  /** The HTML element or React component to render as (default: "div"). */
  as?: React.ElementType;

  /** If true, typing won't start until the component is scrolled into view (default: false). */
  startOnView?: boolean;
}

/**
 * A typing animation component that cycles through an array of phrases, typing
 * each one out character-by-character. Once a phrase finishes, it moves to the next.
 */
export function TypingAnimation({
  phrases,
  className,
  delay = 0,
  duration = 100,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  // We create a motion-enabled version of the specified Component
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState<string>("");
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [started, setStarted] = useState(false);

  const elementRef = useRef<HTMLElement | null>(null);

  // Decide when we start the typing process
  useEffect(() => {
    if (!startOnView) {
      // Start typing after 'delay' if we do NOT wait for scroll
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }

    // Otherwise, wait until the component is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Main typing logic
  useEffect(() => {
    // If we haven't begun typing, or we have no phrases, do nothing
    if (!started || !phrases.length) return;

    // Only type if we still have phrases to show
    const currentPhrase = phrases[phraseIndex];
    if (!currentPhrase) return;

    // If we still have characters left in the current phrase, type the next one
    if (charIndex < currentPhrase.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(prev => prev + currentPhrase[charIndex]);
        setCharIndex(prev => prev + 1);
      }, duration);

      return () => clearTimeout(typingTimer);
    }

    // If we've finished this phrase, move to the next one after a small pause
    // (Adjust to your preference if you want a longer gap between phrases)
    if (phraseIndex < phrases.length - 1) {
      const nextPhraseTimer = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setPhraseIndex(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(nextPhraseTimer);
    }

    // If we've finished typing all phrases, do nothing (or reset if you want to loop)
  }, [started, phrases, phraseIndex, charIndex, duration]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {displayText}
    </MotionComponent>
  );
}
