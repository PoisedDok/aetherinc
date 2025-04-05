"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Code, GitBranch, Package } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define the open source software used
const openSourceSoftware = [
  { name: "Next.js", description: "The React framework for production.", icon: <Code size={24} />, category: "Framework" },
  { name: "React", description: "A JavaScript library for building user interfaces.", icon: <Code size={24} />, category: "Library" },
  { name: "Tailwind CSS", description: "A utility-first CSS framework.", icon: <Code size={24} />, category: "CSS Framework" },
  { name: "Framer Motion", description: "A production-ready motion library for React.", icon: <Code size={24} />, category: "Animation" },
  { name: "Lucide React", description: "Beautiful & consistent icons.", icon: <Package size={24} />, category: "Icons" },
  { name: "Ollama", description: "Run large language models locally.", icon: <GitBranch size={24} />, category: "AI/ML" },
  { name: "NVIDIA Orin Jetson SDKs", description: "Software development kits for the Jetson platform.", icon: <GitBranch size={24} />, category: "Hardware/AI" },
  { name: "Various LLMs (Llama, Mistral)", description: "Underlying open-source large language models.", icon: <GitBranch size={24} />, category: "AI/ML" },
  // Add other key open-source dependencies here
];

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Open Source Software
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            GURU is built upon the shoulders of giants. We proudly leverage the following open-source technologies to deliver a privacy-first AI experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {openSourceSoftware.map((software, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 flex flex-col shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 mr-3">
                  {software.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{software.name}</h2>
              </div>
              <p className="text-gray-300 text-sm mb-4 flex-grow">{software.description}</p>
              <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full self-start">
                {software.category}
              </span>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 