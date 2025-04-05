"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building, Users, Target, Sparkles, ShieldCheck } from 'lucide-react';
import Image from 'next/image'; // Import Image component

// Placeholder for team images - replace with actual image paths
const teamImages = [
  '/images/team-placeholder-1.jpg', // Example path
  '/images/team-placeholder-2.jpg',
  '/images/team-placeholder-3.jpg'
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-28 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block p-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full mb-6 shadow-lg"
          >
             <Building className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            About AetherInc
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
             An <span className="font-bold text-purple-400">Aether</span> for Future <span className="font-bold text-cyan-400">AI</span>.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We are building the next generation of artificial intelligence – one that respects your privacy, empowers individuals, and operates securely at the edge.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl"
          >
            <Target className="h-10 w-10 text-purple-400 mb-4" />
            <h2 className="text-3xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              To democratize powerful AI by creating accessible, secure, and privacy-preserving hardware and software that puts users back in control of their digital lives and data.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl"
          >
            <Sparkles className="h-10 w-10 text-cyan-400 mb-4" />
            <h2 className="text-3xl font-semibold mb-4 text-white">Our Vision</h2>
            <p className="text-gray-300 text-lg">
              A future where AI is a ubiquitous, trustworthy partner, enhancing human potential without compromising individual sovereignty. An ether of intelligent systems working for people, not platforms.
            </p>
          </motion.div>
        </div>

        {/* Core Values/Principles (Simplified) */}
        <div className="text-center mb-24 md:mb-32 max-w-4xl mx-auto">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-3xl md:text-4xl font-bold mb-12 text-white"
           >
              What Drives Us
           </motion.h2>
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.2 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
           >
              {/* Value 1 */}
              <div className="text-center p-6 border border-white/10 rounded-lg bg-black/20">
                  <ShieldCheck className="h-10 w-10 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Privacy First</h3>
                  <p className="text-gray-400 text-sm">Your data belongs to you. Period. Our architecture ensures local processing and user control.</p>
              </div>
              {/* Value 2 */}
              <div className="text-center p-6 border border-white/10 rounded-lg bg-black/20">
                  <Sparkles className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Innovation at the Edge</h3>
                  <p className="text-gray-400 text-sm">Pushing the boundaries of on-device AI to deliver powerful capabilities without the cloud.</p>
              </div>
              {/* Value 3 */}
              <div className="text-center p-6 border border-white/10 rounded-lg bg-black/20">
                  <Users className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">User Empowerment</h3>
                  <p className="text-gray-400 text-sm">Building tools that augment human intelligence and creativity, giving users superpowers.</p>
              </div>
           </motion.div>
        </div>

         {/* Team Section Placeholder - Add real content later */}
        <div className="text-center max-w-4xl mx-auto">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-3xl md:text-4xl font-bold mb-12 text-white"
           >
              Meet the Team (Founding Stage)
           </motion.h2>
           <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="text-lg text-gray-400 mb-12"
           >
             We are a passionate group of engineers and innovators dedicated to building a better future for AI. (More details coming soon!)
           </motion.p>
           {/* Placeholder image grid */}
           {/* 
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             {teamImages.map((src, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                 className="aspect-square rounded-lg overflow-hidden border-2 border-white/10 shadow-lg"
               >
                 <Image src={src} alt={`Team member ${index + 1}`} width={400} height={400} className="object-cover w-full h-full" />
               </motion.div>
             ))}
           </div>
           */}
        </div>

      </main>
      <Footer />
    </div>
  );
} 