"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Shield, Menu, X } from 'lucide-react';
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
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ waitlistRef, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll-based animations
  const headerHeight = useTransform(scrollY, [0, 100], ["4.5rem", "3.5rem"]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 100], [0, 16]);

  // Update scroll state
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
    <motion.header
      style={{ 
        height: headerHeight,
        backgroundColor: headerBg,
        backdropFilter: `blur(${blur}px)`,
      }}
      className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        "border-b border-transparent",
          isScrolled && "border-cyan-500/20 glass-panel"
      )}
    >
      <nav className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
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
              transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-1"
          >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
              <Button
                variant="ghost"
                asChild
                    className="text-sm text-white/80 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent relative group"
              >
                <Link href={item.href}>
                  {item.label}
                      <div className="absolute inset-0 cyber-border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </Button>
                </motion.div>
            ))}
            
            {/* Admin Login Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigationItems.length * 0.1, duration: 0.3 }}
              >
            <Button
              variant="ghost"
              asChild
                  className="text-sm text-purple-400 hover:text-purple-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent relative group"
            >
              <Link href="/admin">
                <Shield className="h-3 w-3 mr-1" />
                Admin
                    <div className="absolute inset-0 border border-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </Link>
            </Button>
              </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            initial={false}
            animate={{ 
              y: isScrolled ? 0 : -50,
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0.8,
            }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-sm text-white/80 hover:text-cyan-400 transition-all duration-300 p-2 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
            >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>

          {/* Get Started Button */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
            <ShineBorder 
              className={cn(
                  "absolute inset-0 rounded-full transition-all duration-500",
                isScrolled ? "opacity-100" : "opacity-0"
              )}
              borderWidth={1}
                shineColor={["rgba(0, 255, 255, 0.3)", "rgba(139, 92, 246, 0.6)"]}
                duration={8}
            />
            <Button
              className={cn(
                  "relative font-semibold px-6 py-2 rounded-full transition-all duration-500 text-sm btn-cyber",
                isScrolled
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/50 hover:border-cyan-400 hover:shadow-cyan-strong"
                    : "bg-gradient-to-r from-white/10 to-cyan-500/10 text-white border-white/20 hover:border-cyan-400/50"
              )}
              size="sm"
              asChild
            >
                <Link href="/contact" className="relative z-10">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed top-[3.5rem] left-0 right-0 z-[90] lg:hidden",
          "glass-panel-strong border-b border-cyan-500/20",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-white/80 hover:text-cyan-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: navigationItems.length * 0.1, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start text-purple-400 hover:text-purple-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Link>
            </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
} 