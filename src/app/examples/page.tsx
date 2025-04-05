"use client";

import React from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { motion } from 'framer-motion';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';
import { ArrowRight, Mic, Code, Bot, FileText, Database, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import Link from 'next/link';
import { cn } from "@/lib/utils"; // Import cn utility
import { ShineBorder } from '@/components/magicui/shine-border'; // Import ShineBorder for effect

// Enhanced example data with Lucide icons
const exampleWorkflows = [
  {
    title: "Privacy-Preserving Meeting Summaries",
    description: "Record and transcribe meetings locally, generating summaries without sending sensitive data to the cloud. Perfect for confidential discussions.",
    steps: [
      "Initiate recording on GURU.",
      "Speech-to-text processes audio locally.",
      "On-device LLM summarizes the transcript.",
      "Summary available instantly on GURU, securely."
    ],
    icon: <Mic size={28} className="text-cyan-400" />,
    tags: ["Productivity", "Privacy", "Meetings"],
  },
  {
    title: "Secure Code Generation & Review",
    description: "Generate code snippets or review code for vulnerabilities entirely on-device, keeping proprietary code private and accelerating development.",
    steps: [
      "Input code prompt or existing code snippet.",
      "GURU's local models process the request.",
      "Receive generated code or security feedback.",
      "No code leaves the local environment."
    ],
    icon: <Code size={28} className="text-green-400" />,
    tags: ["Development", "Security", "Coding"],
  },
  {
    title: "On-Device Personalized Assistant",
    description: "GURU learns your preferences and habits locally to provide truly personalized assistance without invasive cloud profiling or data collection.",
    steps: [
      "Interact with GURU for daily tasks.",
      "Preferences and data stored securely on-device.",
      "AI adapts locally based on your interactions.",
      "Get tailored suggestions while maintaining privacy."
    ],
    icon: <Bot size={28} className="text-purple-400" />,
    tags: ["Personalization", "AI Assistant", "Privacy"],
  },
  {
    title: "Local Document Analysis & Q&A",
    description: "Analyze sensitive documents (contracts, reports) and ask questions about their content without uploading them anywhere.",
    steps: [
      "Load document onto GURU.",
      "On-device models index and understand the content.",
      "Ask questions in natural language.",
      "Receive answers based solely on local data."
    ],
    icon: <FileText size={28} className="text-yellow-400" />,
    tags: ["Documents", "Analysis", "Q&A"],
  },
  {
    title: "Private Knowledge Base Creation",
    description: "Build a personal or team knowledge base from notes, files, and web clippings that remains entirely offline and searchable.",
    steps: [
      "Add notes, PDFs, or web content to GURU.",
      "GURU indexes information locally.",
      "Search your knowledge base using natural language.",
      "Access information instantly without cloud sync."
    ],
    icon: <Database size={28} className="text-orange-400" />,
    tags: ["Knowledge Management", "Offline", "Search"],
  },
  {
    title: "Enhanced On-Premise Security Monitoring",
    description: "Connect GURU to local security camera feeds or sensor networks for intelligent, private monitoring and anomaly detection.",
    steps: [
      "Integrate GURU with local data streams.",
      "Configure on-device AI models for specific alerts.",
      "Receive real-time notifications on GURU.",
      "Security footage and data remain on-premise."
    ],
    icon: <ShieldCheck size={28} className="text-red-400" />,
    tags: ["Security", "IoT", "Monitoring"],
  },
];

export default function ExamplesPage() {
  // Dummy refs and function for Navbar compatibility - NO LONGER NEEDED
  // const dummyRef = React.useRef(null);
  // const scrollToSection = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <ScrollProgress />
      <BackToTop />
      {/* Navbar no longer needs dummy props */}
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            GURU in Action
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore practical workflows showcasing how GURU's on-device AI delivers powerful capabilities while upholding strict data privacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {exampleWorkflows.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 flex flex-col h-full shadow-lg overflow-hidden"
            >
              <ShineBorder 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                borderWidth={1}
                shineColor={["#6366f1", "#a855f7", "#ec4899"]}
                duration={8}
              />
              <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit shadow-inner">
                    {example.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-white">{example.title}</h2>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">{example.description}</p>
                  <div className="mb-4 mt-auto">
                    <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Key Steps:</h3>
                    <ul className="space-y-1 text-gray-300 text-xs list-none">
                      {example.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <ArrowRight size={12} className="mr-2 mt-0.5 text-cyan-500 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                     <div className="flex flex-wrap gap-2">
                      {example.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Enhanced */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-24 md:mt-32 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-purple-900/30 border border-white/10 rounded-xl py-12 px-6 max-w-4xl mx-auto shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Redefine Your AI Experience?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Join the exclusive waitlist for GURU. Be the first to access truly private, powerful on-device artificial intelligence.</p>
          <Link href="/#waitlist"> 
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105">
              Reserve Your GURU Now
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 