"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import VisualWorkflow from '@/components/sections/VisualWorkflow';
import PersonaPrinciples from '@/components/sections/PersonaPrinciples';
import Terminal from '@/components/sections/Terminal';
import Waitlist from '@/components/sections/Waitlist';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';

export default function Home() {
  // Section refs for smooth scrolling
  const featuresRef = useRef<HTMLElement | null>(null);
  const waitlistRef = useRef<HTMLElement | null>(null);

  // Prevent automatic scrolling to sections on initial page load
  useEffect(() => {
    // Reset scroll position when page loads
    window.scrollTo(0, 0);
    
    // Clear any URL hash that might trigger automatic scrolling
    if (window.location.hash) {
      const cleanUrl = window.location.href.split('#')[0];
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      const navHeight = 80; // Height of sticky header
      const elementPosition = ref.current.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <BackToTop />
      <Navbar 
        scrollToSection={scrollToSection}
        featuresRef={featuresRef}
        waitlistRef={waitlistRef}
      />
      <main className="flex-grow pt-20">
        <Hero 
          scrollToSection={scrollToSection}
          featuresRef={featuresRef}
          waitlistRef={waitlistRef}
        />
        <Features featuresRef={featuresRef} />
        <VisualWorkflow />
        <PersonaPrinciples />
        <Terminal />
        <Waitlist waitlistRef={waitlistRef} />
      </main>
      <Footer />
    </div>
  );
}
