"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center pt-20 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Clock className="h-16 w-16 md:h-24 md:w-24 mx-auto mb-8 text-cyan-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Pricing Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're putting the final touches on our pricing plans. GURU will offer exceptional value with a focus on a one-time hardware purchase and zero recurring AI fees.
          </p>
          <p className="text-md text-gray-400 mb-10 max-w-lg mx-auto">
             Sign up for the waitlist to be the first to know when pricing is announced and secure early bird offers!
          </p>
          <Link href="/#waitlist" passHref>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            >
              Join Waitlist
            </Button>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
} 