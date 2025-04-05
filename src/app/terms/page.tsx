"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center pt-20 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Clock className="h-16 w-16 md:h-24 md:w-24 mx-auto mb-8 text-gray-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Terms of Service Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The legal eagles are working on our Terms of Service. These will outline the conditions for using AetherInc products and services.
          </p>
           <Link href="/#waitlist" passHref>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            >
              Get Notified
            </Button>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
} 