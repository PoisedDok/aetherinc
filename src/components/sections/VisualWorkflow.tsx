"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, AudioLines, FileCog, FileCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Workflow steps data
const workflowSteps = [
  { icon: Mic, label: "Record Meeting", description: "Initiate audio recording directly on GURU." },
  { icon: AudioLines, label: "Local Speech-to-Text", description: "Audio is transcribed into text entirely on the device." },
  { icon: FileCog, label: "On-Device Summarization", description: "The local LLM processes the transcript to create a concise summary." },
  { icon: FileCheck, label: "Secure Summary Ready", description: "The private summary is instantly available only on your GURU." },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // Time between each child animation
      delayChildren: 0.2,   // Initial delay before first child starts
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const arrowVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeInOut" } 
  },
};

export default function VisualWorkflow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-black to-black relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Visualize the Privacy
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            See how GURU handles a common task like meeting summarization, keeping your data entirely on-device at every step.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {workflowSteps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Workflow Step Card */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-xl shadow-lg w-full md:w-52 lg:w-60"
              >
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 shadow-inner">
                  <step.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">{step.label}</h3>
                <p className="text-xs text-gray-400">{step.description}</p>
              </motion.div>

              {/* Connecting Arrow (not shown after the last item) */}
              {index < workflowSteps.length - 1 && (
                <motion.div 
                    className="hidden md:block mx-2 lg:mx-4"
                    variants={itemVariants} // Reuse item animation slightly delayed
                >
                    <ArrowRight size={32} className="text-gray-600" />
                    {/* Advanced: Replace with animated SVG line later if desired */}
                    {/* <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.path 
                        d="M0 15 Q 25 0, 50 15" 
                        stroke="rgba(255, 255, 255, 0.3)" 
                        strokeWidth="2" 
                        variants={arrowVariants}
                      />
                    </svg> */}
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 