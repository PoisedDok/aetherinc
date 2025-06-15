"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Shield } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  waitlistRef?: React.RefObject<HTMLElement | null>;
  scrollToSection?: (ref: React.RefObject<HTMLElement | null>) => void;
}

const navigationItems = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ waitlistRef, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll-based animations
  const headerHeight = useTransform(scrollY, [0, 100], ["4.5rem", "3.5rem"]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
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
          <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white font-extrabold">A</span>ether<span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white font-extrabold">I</span>nc
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Navigation */}
          <motion.div
            initial={false}
            animate={{ 
              y: isScrolled ? 0 : -50,
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2"
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </Button>
            ))}
            
            {/* Admin Login Button */}
            <Button
              variant="ghost"
              asChild
              className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2"
            >
              <Link href="/admin">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Link>
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            initial={false}
            animate={{ 
              y: isScrolled ? 0 : -50,
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              className="text-sm text-white/80 hover:text-white"
            >
              Menu
            </Button>
          </motion.div>

          {/* Join Waitlist Button */}
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
              onClick={() => {
                if (waitlistRef && scrollToSection) {
                  scrollToSection(waitlistRef);
                } else {
                  // If no ref available, try to scroll to waitlist section
                  const waitlistSection = document.querySelector('[data-section="waitlist"]');
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={cn(
                "relative font-semibold px-5 py-2 rounded-full transition-all duration-300 text-sm",
                isScrolled
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              size="sm"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
} 