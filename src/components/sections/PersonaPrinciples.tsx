"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserCheck, Sparkles, Lock, ShieldAlert, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

const principles = [
  {
    icon: Lock,
    title: "Absolute Privacy",
    description: "Your world stays yours. All processing happens locally. GURU sees only what you allow, and shares nothing."
  },
  {
    icon: Database,
    title: "Complete Ownership",
    description: "With 10TB of secure local storage, your knowledge base, memories, and creations belong solely to you."
  },
  {
    icon: ShieldAlert,
    title: "Responsible Reasoning",
    description: "GURU is designed with ethical guardrails to prevent misuse and promote helpful, safe interactions."
  }
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PersonaPrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: The Partner */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
               <UserCheck size={16} />
              Your Digital Partner
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
               More Than an Assistant, <br />Your Autonomous Partner.
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Think of GURU like Jarvis – an ever-present, adaptable intelligence designed to amplify *you*. It connects securely to your digital life (computer, phone, workspaces), learns your context, anticipates needs, and autonomously manages complex tasks.
            </p>
            <p className="text-lg text-gray-300 mb-6">
               Whether you're coding, designing, managing operations, or simply navigating your day, GURU integrates seamlessly via voice or contextual awareness, aiming for 20x productivity gains with minimal power and zero recurring AI fees.
            </p>
            <div className="flex items-center gap-3 text-cyan-400">
               <Sparkles size={20} />
               <span className="font-medium">Unlock your superhuman potential.</span>
            </div>
          </motion.div>

          {/* Right Column: The Principles */}
          <motion.div 
            className="space-y-8"
             initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                 hidden: { opacity: 0 },
                 visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.3 } }
             }}
          >
            {principles.map((principle, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-lg shadow-md backdrop-blur-sm"
                variants={variants}
              >
                <div className={cn(
                    "mt-1 p-2 rounded-md w-fit h-fit",
                    index === 0 ? "bg-blue-500/20 text-blue-400" :
                    index === 1 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                   <principle.icon size={24} />
                 </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white">{principle.title}</h3>
                  <p className="text-sm text-gray-400">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 