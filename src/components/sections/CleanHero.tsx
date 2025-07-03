"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { MorphingText } from '@/components/magicui/morphing-text';
import { ShineBorder } from '@/components/magicui/shine-border';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

interface CleanHeroProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  visionRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

const morphingTexts = [
  "Join The Race",
  "Privacy-First AI"
];

export default function CleanHero({ scrollToSection, visionRef, waitlistRef }: CleanHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [gridSize, setGridSize] = useState(20);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setGridSize(window.innerWidth < 768 ? 15 : 20);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  const gridX = useTransform(
    mouseX,
    [0, windowSize.width],
    [-10, 10]
  );
  const gridY = useTransform(
    mouseY,
    [0, windowSize.height],
    [-10, 10]
  );

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* All background elements removed to allow Jarvis background to show through */}
      
      {/* Hero Content */}
      <motion.div
        className="container relative mx-auto z-10 text-center px-4 sm:px-6 max-w-5xl"
        style={{ y: heroY }}
      >
        {/* Company Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={8}
            />
            <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
              <Sparkles className="w-4 h-4 mr-2 text-white/70" />
              AetherInc Limited
            </Badge>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
            AetherInc
          </h1>
          
          <div className="relative">
            <MorphingText 
              texts={morphingTexts}
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-400"
            />
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Meet AetherInc's privacy-first AI that runs <strong>100% offline</strong>. No clouds, no snooping—just blazing-fast intelligence that stays on your computer.
          </p>
          <div className="mt-4 text-gray-500 text-sm">
            Founded in Glasgow, Scotland • Registered Company SC851680
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <div className="relative overflow-hidden rounded-full">
            <ShineBorder 
              className="absolute inset-0 opacity-100" 
              borderWidth={2}
              shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
              duration={10}
            />
            <Button
              onClick={() => scrollToSection(visionRef)}
              className="relative bg-white hover:bg-gray-100 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 text-base h-auto min-w-[200px] transform hover:scale-105 shadow-xl"
              size="lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Discover Our Vision
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-full">
            <ShineBorder 
              className="absolute inset-0" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
              duration={14}
            />
            <Button
              variant="outline"
              onClick={() => scrollToSection(waitlistRef)}
              className="relative bg-black/30 hover:bg-black/50 text-white border border-white/30 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-base h-auto backdrop-blur-md min-w-[200px] transform hover:scale-105"
              size="lg"
            >
              Join the Future
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm">Learn more about us</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 