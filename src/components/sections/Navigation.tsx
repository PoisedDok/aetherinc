"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  featuresRef: React.RefObject<HTMLElement | null>;
  howItWorksRef: React.RefObject<HTMLElement | null>;
  useCasesRef: React.RefObject<HTMLElement | null>;
  waitlistRef: React.RefObject<HTMLElement | null>;
}

export default function Navigation({ 
  scrollToSection, 
  featuresRef, 
  howItWorksRef, 
  useCasesRef, 
  waitlistRef 
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Logo - replace with your actual logo */}
            <Image 
              src="/logo-guru.svg" 
              alt="GURU Logo"
              width={120}
              height={40}
              className="filter drop-shadow-glow"
            />
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem onClick={() => scrollToSection(featuresRef)}>Features</NavItem>
            <NavItem onClick={() => scrollToSection(howItWorksRef)}>How It Works</NavItem>
            <NavItem onClick={() => scrollToSection(useCasesRef)}>Use Cases</NavItem>
            <Button
              onClick={() => scrollToSection(waitlistRef)}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-full transition shadow-glow-cyan"
            >
              Join Waitlist
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavItem onClick={() => {
                scrollToSection(featuresRef);
                setMobileMenuOpen(false);
              }}>
                Features
              </MobileNavItem>
              <MobileNavItem onClick={() => {
                scrollToSection(howItWorksRef);
                setMobileMenuOpen(false);
              }}>
                How It Works
              </MobileNavItem>
              <MobileNavItem onClick={() => {
                scrollToSection(useCasesRef);
                setMobileMenuOpen(false);
              }}>
                Use Cases
              </MobileNavItem>
              <Button
                onClick={() => {
                  scrollToSection(waitlistRef);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-3 rounded-full transition shadow-glow-cyan text-center"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Desktop Nav Item Component
const NavItem = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <motion.button 
    onClick={onClick}
    className="text-gray-300 hover:text-cyan-400 transition relative group"
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    {children}
    <motion.span 
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 opacity-0 group-hover:w-full group-hover:opacity-100"
      initial={{ width: 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
);

// Mobile Nav Item Component
const MobileNavItem = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <motion.button 
    onClick={onClick}
    className="text-gray-200 hover:text-cyan-400 transition py-3 w-full text-left border-b border-slate-800"
    whileTap={{ x: 5 }}
  >
    {children}
  </motion.button>
); 