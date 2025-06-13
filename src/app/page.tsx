"use client";

import React, { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';

// Dynamically load sections for better performance
const CleanHero = dynamic(() => import('@/components/sections/CleanHero'), { ssr: false });
const CompanyVision = dynamic(() => import('@/components/sections/CompanyVision'), { ssr: false });
const Waitlist = dynamic(() => import('@/components/sections/Waitlist'), { ssr: false });

export default function Home() {
  // Section refs for smooth scrolling
  const visionRef = useRef<HTMLElement | null>(null);
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
      const navHeight = 120;
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
        waitlistRef={waitlistRef}
        scrollToSection={scrollToSection}
      />
      <main className="flex-grow pt-28">
        <CleanHero 
          scrollToSection={scrollToSection}
          visionRef={visionRef}
          waitlistRef={waitlistRef}
        />
        <section ref={visionRef}>
          <CompanyVision />
        </section>
        <Waitlist waitlistRef={waitlistRef} />
      </main>
      <Footer />
    </div>
  );
}
