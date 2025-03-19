"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { MorphingText } from '@/components/magicui/morphing-text';
import { ShineBorder } from '@/components/magicui/shine-border';
import { BentoGrid, BentoGridItem } from '@/components/magicui/bento-grid';
import { HyperText } from '@/components/magicui/hyper-text';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Server, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ParticleBackground } from '@/components/magicui/particle-background';

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
  "67 TOPS of on-device compute power.",
  "Ollama and OmniParser on NVIDIA Orin Jetson Super."
];

// Morphing text options
const morphingTexts = [
  "Meet GURU",
  "Experience GURU",
  "Discover GURU"
];

// Bento grid items
const bentoItems = [
  {
    title: "Local Processing",
    description: "On-device LLM inference via Ollama and screen parsing via OmniParser",
    icon: <Cpu className="h-8 w-8 text-white" />,
    className: "md:col-span-1",
  },
  {
    title: "Privacy Focused",
    description: "All your data stays on your device, with no cloud dependencies",
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    className: "md:col-span-1",
  },
  {
    title: "Low Power",
    description: "Optimized for battery operation with efficient power management",
    icon: <Zap className="h-8 w-8 text-white" />,
    className: "md:col-span-1",
  },
  {
    title: "Modular Design",
    description: "Expandable with cameras, sensors, and industry-specific modules",
    icon: <Server className="h-8 w-8 text-white" />,
    className: "md:col-span-1",
  },
];

export default function Hero({ scrollToSection, featuresRef, waitlistRef }: HeroProps) {
  // Refs for animation
  const heroRef = useRef<HTMLElement | null>(null);
  const [gridSize, setGridSize] = useState(20);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Check if we're on mobile - client-side only
  useEffect(() => {
    const handleResize = () => {
      setGridSize(window.innerWidth < 768 ? 15 : 20);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set the initial size
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Add mouse move listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  // Mouse-follow effect for grid
  const gridX = useTransform(
    mouseX,
    [0, windowSize.width],
    [-20, 20]
  );
  const gridY = useTransform(
    mouseY,
    [0, windowSize.height],
    [-20, 20]
  );

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black pb-20"
    >
      {/* Subtle Grid Pattern behind hero */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          opacity: heroOpacity,
          x: gridX,
          y: gridY
        }}
      >
        <InteractiveGridPattern 
          className="w-full h-full" 
          dotColor="rgba(255, 255, 255, 0.08)"
          size={gridSize}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="container relative mx-auto z-10 text-center px-4 sm:px-6 pt-20"
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
          <div className="absolute inset-0 -z-10">
            <ParticleBackground 
              className="w-full h-full"
              particleCount={30}
              particleSize={1.5}
              particleSpeed={0.3}
              particleOpacity={0.15}
            />
          </div>
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="body-text text-gray-300 max-w-3xl mx-auto mb-8"
        >
          <span className="text-white font-semibold">GURU</span> is a revolutionary <strong className="text-white">privacy-first AI assistant</strong> powered by advanced local inference engines running on NVIDIA hardware. Experience powerful on-device AI that keeps your data where it belongs — with you.
          <div className="block mt-2 text-gray-400 font-medium">Pre-orders starting Q3 2025</div>
        </motion.div>

        {/* Bento Grid for Key Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-10 max-w-4xl mx-auto"
        >
          <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={
                  <div className="flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-lg">
                    {item.icon}
                  </div>
                }
                className={cn(
                  "group/bento hover:border-white/20 transition-all overflow-hidden bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm",
                  item.className
                )}
              />
            ))}
          </BentoGrid>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-8 mb-16"
        >
          <div className="relative overflow-hidden rounded-full">
            <ShineBorder 
              className="absolute inset-0 opacity-100" 
              borderWidth={1.5}
              shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.6)"]}
              duration={10}
            />
            <Button
              onClick={() => scrollToSection(waitlistRef)}
              className="relative bg-white hover:bg-white/90 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-glow-subtle text-base sm:text-lg h-auto min-w-[180px]"
              size="lg"
            >
              Reserve Yours Now
            </Button>
          </div>

          <div className="relative rounded-full">
            <ShineBorder 
              className="absolute inset-0" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
              duration={14}
            />
            <Button
              variant="outline"
              onClick={() => scrollToSection(featuresRef)}
              className="relative bg-white/5 hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 text-base sm:text-lg h-auto backdrop-blur-md min-w-[180px]"
              size="lg"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 bottom-8"
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