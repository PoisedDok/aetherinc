"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from '@/components/magicui/shine-border';
import Link from 'next/link';

interface NavbarProps {
  scrollToSection?: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef?: React.RefObject<HTMLElement | null>;
  waitlistRef?: React.RefObject<HTMLElement | null>;
  howItWorksRef?: React.RefObject<HTMLElement | null>;
}

export default function Navbar({ 
  scrollToSection, 
  featuresRef, 
  waitlistRef, 
  howItWorksRef
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll-based animations
  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 100], [0, 8]);

  // Update scroll state
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.header
      style={{ 
        height: headerHeight,
        backgroundColor: headerBg,
        backdropFilter: `blur(${blur}px)`,
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        "border-b border-transparent",
        isScrolled && "border-white/10"
      )}
    >
      <nav className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        <motion.div 
          style={{ scale: logoScale }}
          className="flex items-center"
        >
          <a href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white font-extrabold">A</span>ether<span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white font-extrabold">I</span>nc
            </span>
          </a>
        </motion.div>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            initial={false}
            animate={{ 
              y: isScrolled ? 0 : -50,
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-4"
          >
            {scrollToSection && featuresRef && (
              <Button
                variant="ghost"
                onClick={() => scrollToSection(featuresRef)}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Features
              </Button>
            )}
            {scrollToSection && howItWorksRef && (
              <Button
                variant="ghost"
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                How It Works
              </Button>
            )}
          </motion.div>

          <div className="relative">
            <ShineBorder 
              className={cn(
                "absolute inset-0 rounded-full transition-opacity duration-300",
                isScrolled ? "opacity-100" : "opacity-0"
              )}
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.6)"]}
              duration={10}
            />
            <Button
              onClick={() => scrollToSection && waitlistRef && scrollToSection(waitlistRef)}
              disabled={!scrollToSection || !waitlistRef}
              className={cn(
                "relative font-semibold px-4 py-2 rounded-full transition-all duration-300",
                isScrolled
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              size="sm"
            >
              Reserve Now
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
} 