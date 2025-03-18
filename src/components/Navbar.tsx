"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollingText } from '@/components/ui/scrolling-text';
import { Button } from '@/components/ui/button';
import { ShineBorder } from '@/components/magicui/shine-border';

interface NavbarProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef: React.RefObject<HTMLElement | null>;
  workingRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

// Announcement messages for the scrolling text
const announcements = [
  "GURU - Coming in Q3 2025",
  "Join the waitlist for early access to GURU",
  "AetherInc - Redefining privacy-first AI",
  "67 TOPS of on-device compute power"
];

export default function Navbar({ scrollToSection, featuresRef, workingRef, waitlistRef }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll to show/hide navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Mobile menu animation variants
  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Announcement banner */}
      {scrolled && (
        <div className="w-full bg-white/5 backdrop-blur-sm py-1 border-b border-white/10">
          <ScrollingText 
            messages={announcements}
            speed={15}
            className="text-sm"
            textClassName="text-white/80 font-medium"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-2xl flex items-center">
            <span className="relative">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                GURU
              </motion.span>
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </span>
            <motion.span 
              className="ml-2 text-sm text-white/60 font-normal hidden sm:inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              by AetherInc
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <button 
                onClick={() => scrollToSection(workingRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="relative">
                <ShineBorder
                  className="absolute inset-0 rounded-full"
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.4)"]}
                />
                <Button
                  onClick={() => scrollToSection(waitlistRef)}
                  variant="outline"
                  className="border border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full px-5 py-2 text-sm h-auto backdrop-blur-sm"
                >
                  Join Waitlist
                </Button>
              </div>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end space-y-1.5">
                <motion.span 
                  className="h-0.5 bg-white block" 
                  animate={{ width: mobileMenuOpen ? '24px' : '16px' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="h-0.5 bg-white block" 
                  animate={{ 
                    width: '24px',
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? -6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="h-0.5 bg-white block" 
                  animate={{ 
                    width: '24px',
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0,
                    opacity: mobileMenuOpen ? 1 : 0.75
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 pt-20"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(featuresRef);
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl text-white font-medium"
                  >
                    Features
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(workingRef);
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl text-white font-medium"
                  >
                    How It Works
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => {
                      scrollToSection(waitlistRef);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 text-lg font-semibold mt-4"
                  >
                    Join Waitlist
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 