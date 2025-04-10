"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { MorphingText } from '@/components/magicui/morphing-text';
import { ShineBorder } from '@/components/magicui/shine-border';
import { BentoGrid, BentoGridItem } from '@/components/magicui/bento-grid';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Server, ShieldCheck, Zap, Database, Infinity, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Hero section props type
interface HeroProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

// Morphing text options
const morphingTexts = [
  "Your Private AI Partner.",
  "Meet GURU."
];

// Bento grid items
const bentoItems = [
  {
    title: "Local AI Processing",
    description: "All AI tasks, from LLMs to vision, run directly on GURU.",
    icon: <Cpu className="h-6 w-6 text-cyan-400" />,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 to-transparent"></div>
  },
  {
    title: "Uncompromising Privacy",
    description: "Your data never leaves the device. Period.",
    icon: <ShieldCheck className="h-6 w-6 text-green-400" />,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    title: "10TB Local Storage",
    description: "Build a vast, private knowledge base accessible instantly.",
    icon: <Database className="h-6 w-6 text-yellow-400" />,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-yellow-900/15 to-transparent"></div>
  },
  {
    title: "Zero Recurring Costs",
    description: "One device, lifetime access. No subscriptions for core AI.",
    icon: <Infinity className="h-6 w-6 text-purple-400" />,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>
  },
];

export default function Hero({ scrollToSection, featuresRef, waitlistRef }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Refs for animation
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pb-20 pt-24 md:pt-32"
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
        className="container relative mx-auto z-10 text-center px-4 sm:px-6"
        style={{ y: heroY }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <Badge variant="outline" className="text-white border-white/30 px-4 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            Introducing GURU
          </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 mt-4 relative"
        >
          <MorphingText 
            texts={morphingTexts}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          />
        </motion.div>

        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 sm:gap-x-10 text-sm sm:text-base text-gray-400 mb-8 mt-6"
        >
          <div className="flex items-center gap-2">
            <BrainCircuit size={18} className="text-cyan-400" />
            <span className="font-semibold text-white">67</span> TOPS NPU
          </div>
          <div className="flex items-center gap-2">
            <Database size={18} className="text-yellow-400" />
            <span className="font-semibold text-white">10TB</span> Local Storage
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-400" />
            100% On-Device AI
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="body-text text-gray-300 max-w-2xl mx-auto mb-10"
        >
          GURU isn't just an AI assistant; it's your secure, hyper-intelligent digital partner. Like Jarvis, it learns, assists, and empowers across all aspects of your life or work—all while guaranteeing absolute privacy and operating safely with built-in reasoning guardrails.
          
          <div className="block mt-3 text-gray-500 text-sm font-medium">Pre-orders Q3 2025</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <BentoGrid className="grid-cols-2 md:grid-cols-4 gap-4">
            {bentoItems.map((item, i) => (
              <motion.div
                key={`hero-bento-${i}`}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="relative rounded-lg overflow-hidden"
              > 
                {item.background}
                <div className="relative z-10 h-full">
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={<div className="p-2 rounded-md bg-black/20 flex items-center justify-center">{item.icon}</div>}
                    className={cn("group/bento hover:shadow-xl transition-shadow duration-200 h-full", item.className)}
                  />
                </div>
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
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
              className="relative bg-white hover:bg-white/90 text-black font-semibold py-3 px-8 rounded-full transition duration-300 shadow-glow-subtle text-base sm:text-lg h-auto min-w-[180px] transform hover:scale-105"
              size="lg"
            >
              Reserve Your GURU
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
              className="relative bg-white/5 hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-8 rounded-full transition duration-300 text-base sm:text-lg h-auto backdrop-blur-md min-w-[180px] transform hover:scale-105"
              size="lg"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 