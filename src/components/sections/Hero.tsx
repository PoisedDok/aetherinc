"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
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
  "Your AI Companion.",
  "Solve Real-World Tasks.",
  "Meet GURU."
];

// Bento grid items
const bentoItems = [
  {
    title: "Local AI Processing",
    description: "All AI tasks process directly on your device for instant responses.",
    icon: <Cpu className="h-6 w-6 text-cyan-400" />,
    className: "md:col-span-1",
    iconColor: "text-cyan-400",
    background: null  // Remove background gradient
  },
  {
    title: "Complete Privacy",
    description: "Your data never leaves your possession. No cloud dependency.",
    icon: <ShieldCheck className="h-6 w-6 text-green-400" />,
    className: "md:col-span-1", 
    iconColor: "text-green-400",
    background: null  // Remove background gradient
  },
  {
    title: "Powerful Automation",
    description: "Browser automation, data extraction, and workflow integration.",
    icon: <Database className="h-6 w-6 text-yellow-400" />,
    className: "md:col-span-1",
    iconColor: "text-yellow-400",
    background: null  // Remove background gradient
  },
  {
    title: "One-Time Purchase",
    description: "No subscriptions or recurring costs for core AI functions.",
    icon: <Infinity className="h-6 w-6 text-purple-400" />,
    className: "md:col-span-1",
    iconColor: "text-purple-400",
    background: null  // Remove background gradient
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
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // Adjust grid size based on screen width
      if (window.innerWidth < 640) {
        setGridSize(30);
      } else {
        setGridSize(40);
      }
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
  }, [mouseX, mouseY]);

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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pb-20 pt-32 md:pt-40"
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
          <div className="relative">
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={8}
            />
            <Badge variant="outline" className="text-white border-white/30 px-4 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm bg-black/10 hover:bg-white/10 transition-all duration-300">
              Introducing GURU
            </Badge>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 mt-4 relative"
        >
          <MorphingText 
            texts={morphingTexts}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight whitespace-nowrap"
          />
        </motion.div>

        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 mt-6"
        >
          <div className="relative overflow-hidden rounded-xl inline-block">
            <ShineBorder 
              className="absolute inset-0 opacity-60" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={12}
            />
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 sm:gap-x-10 text-sm sm:text-base text-gray-400 py-4 px-8 bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <BrainCircuit size={18} className="text-cyan-400" />
                <span className="font-semibold text-white">99%+</span> Contract Accuracy
              </div>
              <div className="flex items-center gap-2">
                <Database size={18} className="text-yellow-400" />
                <span className="font-semibold text-white">Complete</span> Privacy
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-400" />
                Professional Grade
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative mb-10"
        >
          <div className="relative overflow-hidden rounded-xl">
            <ShineBorder 
              className="absolute inset-0 opacity-60" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={16}
            />
            <div className="body-text text-gray-300 max-w-2xl mx-auto py-6 px-8 bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm rounded-xl">
              Your revolutionary AI companion that solves real-world tasks through natural conversation. With powerful browser automation, file management, and seamless API integration—all processed locally for complete privacy. GURU isn't just AI, it's your digital partner that understands what you need and delivers results instant and secure.
              
              <div className="block mt-3 text-gray-500 text-sm font-medium">Pre-orders Q3 2025</div>
            </div>
          </div>
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
                className="relative group"
              > 
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18}
                />
                <div className="relative h-full rounded-xl overflow-hidden bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/10 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full p-5">
                    <div className="flex flex-col h-full">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 mb-4">
                        <div className={item.iconColor}>{item.icon}</div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </div>
                  </div>
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
              className="relative w-full sm:w-auto bg-white hover:bg-white/90 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-glow-subtle text-base sm:text-lg h-auto min-w-[180px] sm:min-w-[180px] transform hover:scale-105"
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
              className="relative w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition duration-300 text-base sm:text-lg h-auto backdrop-blur-md min-w-[180px] sm:min-w-[180px] transform hover:scale-105"
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