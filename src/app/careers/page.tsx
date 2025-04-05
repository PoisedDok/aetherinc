"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Briefcase, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block p-3 bg-gradient-to-r from-pink-600 to-orange-500 rounded-full mb-6 shadow-lg"
          >
            <Briefcase className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Join Our Mission
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            We're building the future of privacy-first AI and looking for passionate co-founders to shape AetherInc.
          </p>
        </motion.div>

        {/* Co-founder Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 shadow-xl text-center"
        >
          <Users className="h-12 w-12 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold mb-4 text-white">Seeking Co-Founders</h2>
          <p className="text-gray-300 text-lg mb-6">
            Are you an expert in AI/ML, hardware engineering, software development, or business strategy with a passion for privacy and innovation?
            We're looking for dedicated individuals to join our core founding team.
          </p>
          <p className="text-gray-300 text-lg mb-8">
            If you're ready to build something revolutionary from the ground up, fill out our waitlist form and clearly state your interest in a co-founder role in the message section.
          </p>
          <Link href="/#waitlist" passHref>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            >
               <Rocket className="mr-2 h-5 w-5"/> Express Interest
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            (Please mention "Co-founder Interest" and your area of expertise when filling out the form on the home page.)
          </p>
        </motion.div>

      </main>
      <Footer />
    </div>
  );
} 