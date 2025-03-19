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
    <footer className="relative bg-black text-gray-300 border-t border-white/5">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image 
                src="/logo.svg" 
                alt="aetherinc Logo"
                width={100}
                height={32}
                className="mb-4"
              />
              <p className="text-gray-400 max-w-md text-sm">
                aetherinc revolutionizes AI with cutting-edge technology, 
                delivering powerful AI solutions that transform how you interact with technology.
              </p>
            </div>
            <div className="flex space-x-4">
              <SocialIcon icon={<TwitterIcon size={16} />} />
              <SocialIcon icon={<FacebookIcon size={16} />} />
              <SocialIcon icon={<InstagramIcon size={16} />} />
              <SocialIcon icon={<LinkedinIcon size={16} />} />
              <SocialIcon icon={<GithubIcon size={16} />} />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#use-cases">Use Cases</FooterLink>
              <FooterLink href="#waitlist">Join Waitlist</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
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
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} aetherinc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <button
                onClick={scrollToTop}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition duration-300"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} className="text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer link component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-gray-400 hover:text-white transition duration-300"
    >
      {children}
    </Link>
  </li>
);

// Social icon component
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <motion.a
    href="#"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition duration-300"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
); 