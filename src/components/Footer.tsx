"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { ShineBorder } from '@/components/magicui/shine-border';

// Footer link type
interface FooterLink {
  label: string;
  href: string;
}

// Social link type
interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Footer links - Updated
const products: FooterLink[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'ROI Calculator', href: '/roi-calculator' },
];

const company: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/coming-soon' },
];

// Renamed from resources to support/legal
const support: FooterLink[] = [
  { label: 'Documentation', href: '/documentation' },
];

const social: SocialLink[] = [
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter size={20} />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/your-wordsmith',
    icon: <Linkedin size={20} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <Github size={20} />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent text-white overflow-hidden pt-16 pb-8">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <RetroGrid 
          className="h-full w-full"
          cellSize={80}
          opacity={0.3}
          angle={-10}
          lightLineColor="rgba(255, 255, 255, 0.05)"
          darkLineColor="rgba(255, 255, 255, 0.03)"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Company Info */}
          <div className="max-w-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link href="/" className="text-3xl font-bold flex items-center">
                <span className="relative mr-1">
                  GURU
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-white"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </span>
                <span className="text-sm text-white/60">by AetherInc</span>
              </Link>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 mb-6"
            >
              GURU: Your revolutionary AI companion that solves real-world tasks through natural conversation. 
              <div className="mt-2 text-sm text-gray-300">
                Founded by Krish Dokania with a mission to transform how you interact with AI.
              </div>
            </motion.p>
            
            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-4"
            >
              {social.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={item.label}
                >
                  <ShineBorder 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                  />
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                    <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
          
          {/* Links Columns - Updated */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
            {/* Products */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-bold text-lg mb-4">Products</h3>
              <ul className="space-y-3">
                {products.map((link, index) => (
                  <li key={index} className="opacity-80 hover:opacity-100 transition-opacity">
                    <Link href={link.href} className="text-gray-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Company */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {company.map((link, index) => (
                  <li key={index} className="opacity-80 hover:opacity-100 transition-opacity">
                    <Link href={link.href} className="text-gray-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Support & Legal (Renamed from Resources) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-bold text-lg mb-4">Support & Legal</h3> {/* Renamed Header */}
              <ul className="space-y-3">
                {support.map((link, index) => ( /* Use updated support array */
                  <li key={index} className="opacity-80 hover:opacity-100 transition-opacity">
                    <Link href={link.href} className="text-gray-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Copyright - Updated Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} AetherInc. All rights reserved. | Founded by Krish Dokania
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> {/* Updated Link */}
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link> {/* Updated Link */}
            {/* Removed Cookies Link for now */}
            {/* <span>•</span>
            <Link href="/coming-soon" className="hover:text-white">Cookies</Link> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 