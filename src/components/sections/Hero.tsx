"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { MorphingText } from '@/components/magicui/morphing-text';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Hero section props type
interface HeroProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

// Typing animation phrases
const typingPhrases = [
  "The world's first privacy-first AI device.",
  "Powerful AI without the cloud.",
  "Your data never leaves your device.",
  "67 TOPS of on-device compute power."
];

// Morphing text options
const morphingTexts = [
  "Meet GURU",
  "Experience GURU",
  "Discover GURU"
];

export default function Hero({ scrollToSection, featuresRef, waitlistRef }: HeroProps) {
  // Refs for animation
  const heroRef = useRef<HTMLElement | null>(null);
  const [gridSize, setGridSize] = useState(20);
  
  // Check if we're on mobile - client-side only
  useEffect(() => {
    const handleResize = () => {
      setGridSize(window.innerWidth < 768 ? 15 : 20);
    };
    
    // Set the initial size
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle Grid Pattern behind hero */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity: heroOpacity }}
      >
        <InteractiveGridPattern 
          className="w-full h-full" 
          dotColor="rgba(255, 255, 255, 0.08)"
          size={gridSize}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="container mx-auto z-10 text-center px-4 sm:px-6"
        style={{ y: heroY }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <Badge variant="outline" className="text-white border-white/30 px-4 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            By AetherInc
          </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 relative"
        >
          <MorphingText 
            texts={morphingTexts}
            className="heading-1 font-bold text-white"
          />
          <motion.span 
            className="absolute -bottom-2 left-0 right-0 mx-auto w-40 h-1 bg-white"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </motion.div>

        {/* Dynamic tagline with typing animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-12 sm:h-16 mb-6"
        >
          <TypingAnimation phrases={typingPhrases} className="body-text text-gray-400" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="body-text text-gray-300 max-w-3xl mx-auto mb-8"
        >
          The revolutionary, <strong className="text-white">privacy-first AI assistant</strong> that keeps your data where it belongs — with you.
          <span className="block mt-2 text-gray-400 font-medium">Pre-orders starting Q3 2025</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="relative overflow-hidden touch-target">
            <Button
              onClick={() => scrollToSection(waitlistRef)}
              className="bg-white hover:bg-white/90 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-glow-subtle text-base sm:text-lg h-auto"
              size="lg"
            >
              Reserve Yours Now
            </Button>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shine-slow" />
            </div>
          </div>

          <div className="relative touch-target">
            <ShineBorder className="absolute inset-0 rounded-full" borderWidth={1} />
            <Button
              variant="outline"
              onClick={() => scrollToSection(featuresRef)}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 text-base sm:text-lg h-auto backdrop-blur-md"
              size="lg"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 1 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
} 