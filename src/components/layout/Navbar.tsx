"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Navbar props type
interface NavbarProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef: React.RefObject<HTMLElement | null>;
  howItWorksRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

export default function Navbar({ scrollToSection, featuresRef, howItWorksRef, waitlistRef }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-white"
          >
            <span className="text-white">Aether</span>
            <span className="font-light text-gray-400">Inc</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection(featuresRef)} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection(howItWorksRef)} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection(waitlistRef)}
              className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
            >
              Join Waitlist
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button 
                onClick={() => {
                  scrollToSection(featuresRef);
                  setMobileMenuOpen(false);
                }} 
                className="py-2 text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  scrollToSection(howItWorksRef);
                  setMobileMenuOpen(false);
                }} 
                className="py-2 text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <Button 
                variant="outline" 
                onClick={() => {
                  scrollToSection(waitlistRef);
                  setMobileMenuOpen(false);
                }}
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 w-full"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 