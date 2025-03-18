"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TwitterIcon, 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  GithubIcon,
  ChevronUp
} from 'lucide-react';

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image 
                src="/logo-guru.svg" 
                alt="GURU Logo"
                width={120}
                height={40}
                className="mb-4"
              />
              <p className="text-gray-400 max-w-md">
                GURU revolutionizes AI processing with a privacy-first approach, 
                bringing powerful edge computing to your fingertips without compromising data security.
              </p>
            </div>
            <div className="flex space-x-4">
              <SocialIcon icon={<TwitterIcon size={18} />} />
              <SocialIcon icon={<FacebookIcon size={18} />} />
              <SocialIcon icon={<InstagramIcon size={18} />} />
              <SocialIcon icon={<LinkedinIcon size={18} />} />
              <SocialIcon icon={<GithubIcon size={18} />} />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#use-cases">Use Cases</FooterLink>
              <FooterLink href="#waitlist">Join Waitlist</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">API</FooterLink>
              <FooterLink href="#">Developer Tools</FooterLink>
              <FooterLink href="#">Community</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} GURU AI, Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <button
                onClick={scrollToTop}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition duration-300"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} className="text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
    </footer>
  );
}

// Footer link component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-gray-400 hover:text-cyan-400 transition duration-300"
    >
      {children}
    </Link>
  </li>
);

// Social icon component
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <motion.a
    href="#"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-cyan-500 text-gray-400 hover:text-white transition duration-300"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
); 