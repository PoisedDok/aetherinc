"use client";

import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Waitlist from '@/components/sections/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  // Refs for scroll targets
  const featuresRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const waitlistRef = useRef<HTMLElement | null>(null);

  // Scroll to section handler
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        scrollToSection={scrollToSection}
        featuresRef={featuresRef}
        workingRef={howItWorksRef}
        waitlistRef={waitlistRef}
      />
      
      <main className="flex-grow">
        <Hero 
          scrollToSection={scrollToSection}
          featuresRef={featuresRef}
          waitlistRef={waitlistRef}
        />
        
        <Features 
          featuresRef={featuresRef}
        />
        
        <HowItWorks 
          innerRef={howItWorksRef}
        />
        
        <Waitlist 
          innerRef={waitlistRef}
        />
      </main>
      
      <Footer />
    </div>
  );
}
